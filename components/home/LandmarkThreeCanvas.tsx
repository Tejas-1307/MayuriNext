'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface LandmarkThreeCanvasProps {
  isActive: boolean;
  mousePos: { x: number; y: number };
}

export const LandmarkThreeCanvas: React.FC<LandmarkThreeCanvasProps> = ({
  isActive,
  mousePos,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    mouseRef.current = mousePos;
  }, [mousePos]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene, Camera, Renderer setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0f172a, 0.0015);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 15);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // 1. Signature Cyan Volumetric Light Beam Plane
    const beamGeo = new THREE.PlaneGeometry(35, 35);
    const beamMat = new THREE.ShaderMaterial({
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(0x6CAFBF) },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uColor;
        varying vec2 vUv;
        void main() {
          // Angled sun beam gradient
          float beam = smoothstep(0.0, 0.5, vUv.x) * smoothstep(1.0, 0.5, vUv.x);
          float alpha = pow(vUv.y, 1.5) * beam * 0.18;
          alpha *= 0.8 + 0.2 * sin(uTime * 0.5 + vUv.x * 5.0);
          gl_FragColor = vec4(uColor, alpha);
        }
      `,
    });
    const sunBeam = new THREE.Mesh(beamGeo, beamMat);
    sunBeam.position.set(2, 2, -5);
    sunBeam.rotation.z = -Math.PI / 6;
    scene.add(sunBeam);

    // 2. Micro Light Particles
    const particleCount = 180;
    const particleGeo = new THREE.BufferGeometry();
    const posArray = new Float32Array(particleCount * 3);
    const scaleArray = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      posArray[i * 3] = (Math.random() - 0.5) * 25;
      posArray[i * 3 + 1] = (Math.random() - 0.5) * 15;
      posArray[i * 3 + 2] = (Math.random() - 0.5) * 10 + 2;
      scaleArray[i] = Math.random() * 0.08 + 0.02;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particleGeo.setAttribute('aScale', new THREE.BufferAttribute(scaleArray, 1));

    const particleMat = new THREE.ShaderMaterial({
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(0x8BC7D8) },
      },
      vertexShader: `
        attribute float aScale;
        uniform float uTime;
        varying float vAlpha;
        void main() {
          vec3 pos = position;
          pos.y += sin(uTime * 0.4 + pos.x) * 0.15;
          pos.x += cos(uTime * 0.3 + pos.y) * 0.1;
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = aScale * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
          vAlpha = 0.4 + 0.4 * sin(uTime * 1.5 + pos.x * 2.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        varying float vAlpha;
        void main() {
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;
          float strength = 1.0 - (dist * 2.0);
          strength = pow(strength, 2.0);
          gl_FragColor = vec4(uColor, strength * vAlpha);
        }
      `,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 3. Ground Atmospheric Fog Layer
    const fogGeo = new THREE.PlaneGeometry(30, 8);
    const fogMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color(0x1e293b) },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uColor;
        varying vec2 vUv;
        void main() {
          float alpha = (1.0 - vUv.y) * 0.25;
          alpha *= 0.7 + 0.3 * sin(uTime * 0.3 + vUv.x * 3.0);
          gl_FragColor = vec4(uColor, alpha);
        }
      `,
    });
    const groundFog = new THREE.Mesh(fogGeo, fogMat);
    groundFog.position.set(0, -4.5, 1);
    scene.add(groundFog);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Update Shader Uniforms
      beamMat.uniforms.uTime.value = elapsedTime;
      particleMat.uniforms.uTime.value = elapsedTime;
      fogMat.uniforms.uTime.value = elapsedTime;

      // Smooth Camera Drift reactive to mouse position
      const targetCamX = mouseRef.current.x * 0.35;
      const targetCamY = -mouseRef.current.y * 0.2;

      camera.position.x += (targetCamX - camera.position.x) * 0.04;
      camera.position.y += (targetCamY - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      scene.clear();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`absolute inset-0 z-0 pointer-events-none transition-opacity duration-1000 ${
        isActive ? 'opacity-100' : 'opacity-0'
      }`}
    />
  );
};
