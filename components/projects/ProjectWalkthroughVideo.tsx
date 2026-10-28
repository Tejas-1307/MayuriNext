'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, Film, AlertCircle, Calendar } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ProjectWalkthroughVideoProps {
  projectName: string;
  projectLabel?: string;
  videoSrc?: string;
  posterSrc?: string;
  projectType?: string;
  projectLocation?: string;
}

export const ProjectWalkthroughVideo: React.FC<ProjectWalkthroughVideoProps> = ({
  projectName,
  projectLabel,
  videoSrc,
  posterSrc,
  projectType = 'Residential Development',
  projectLocation = 'Pune, Maharashtra',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPortrait, setIsPortrait] = useState(false);

  const handleLoadedMetadata = useCallback((e: React.SyntheticEvent<HTMLVideoElement>) => {
    const target = e.currentTarget;
    if (target.videoHeight > target.videoWidth) {
      setIsPortrait(true);
    }
  }, []);

  // Animate card into view using existing GSAP + ScrollTrigger patterns
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 85%',
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Performance Safeguard: Auto-pause video when scrolled out of view
  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting && !videoEl.paused) {
            videoEl.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(videoEl);

    return () => {
      observer.disconnect();
    };
  }, []);

  const handlePlayClick = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      setIsLoading(true);
      video
        .play()
        .then(() => {
          setIsPlaying(true);
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
          setHasError(true);
        });
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, []);

  const handleVideoError = useCallback(() => {
    setIsLoading(false);
    setHasError(true);
  }, []);

  const handleVideoWaiting = useCallback(() => {
    setIsLoading(true);
  }, []);

  const handleVideoPlaying = useCallback(() => {
    setIsLoading(false);
    setIsPlaying(true);
  }, []);

  const handleVideoPause = useCallback(() => {
    setIsPlaying(false);
  }, []);

  const scrollToSiteVisit = useCallback(() => {
    const siteVisitSection = document.getElementById('schedule-site-visit');
    if (siteVisitSection) {
      siteVisitSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollBy({ top: 600, behavior: 'smooth' });
    }
  }, []);

  // If no video source is configured for this project, do not render an empty section
  if (!videoSrc) {
    return null;
  }

  return (
    <section
      ref={containerRef}
      id="project-walkthrough-section"
      aria-label={`${projectName} Cinematic Project Walkthrough`}
      className="w-full px-4 md:px-[8vw] py-[8vh] bg-[#F5F5F0] dark:bg-[#080808] transition-colors duration-1000 select-none"
    >
      <div
        ref={cardRef}
        className="w-full bg-white dark:bg-[#121212] border border-black/10 dark:border-white/10 rounded-[20px] md:rounded-[28px] p-6 md:p-12 shadow-xl overflow-hidden"
      >
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-12">
          <div className="flex flex-col gap-3 max-w-2xl">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[1px] bg-[#6CAFBF]" />
              <span className="text-[#6CAFBF] text-[10px] md:text-xs tracking-[0.35em] uppercase font-bold flex items-center gap-2">
                <Film className="w-3.5 h-3.5" />
                Official Project Walkthrough
              </span>
            </div>

            <h2 className="font-[magtis] uppercase font-extrabold text-2xl md:text-5xl text-black dark:text-white leading-tight tracking-tight">
              Cinematic Experience
            </h2>

            <p className="text-black/70 dark:text-white/70 text-xs md:text-sm font-medium leading-relaxed">
              Step inside <span className="font-bold text-black dark:text-white">{projectName}</span>. Explore architectural elevations, premium living configurations, and world-class communal amenities in seamless motion.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 md:gap-3 shrink-0">
            <span className="text-black/50 dark:text-white/50 text-[10px] md:text-xs tracking-[0.2em] uppercase font-mono px-3 py-1.5 rounded-full border border-black/10 dark:border-white/10">
              {projectType}
            </span>
            <span className="text-black/50 dark:text-white/50 text-[10px] md:text-xs tracking-[0.2em] uppercase font-mono px-3 py-1.5 rounded-full border border-black/10 dark:border-white/10">
              {projectLocation}
            </span>
          </div>
        </div>

        {/* Video Player Container: Dynamically adapts to 16:9 cinematic or 9:16 vertical reels */}
        <div className={`relative overflow-hidden bg-black shadow-2xl border border-black/15 dark:border-white/15 transition-all duration-500 rounded-xl md:rounded-2xl ${isPortrait ? 'max-w-md aspect-[9/16] mx-auto' : 'w-full aspect-video'}`}>
          {hasError ? (
            /* Graceful Fallback UI if media fails to load or is unserved */
            <div
              className="w-full h-full flex flex-col items-center justify-center p-6 md:p-12 text-center bg-neutral-950 text-white"
              role="alert"
              aria-live="polite"
            >
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/5 border border-white/15 flex items-center justify-center mb-4 text-[#6CAFBF]">
                <AlertCircle className="w-7 h-7" />
              </div>
              <h3 className="font-[magtis] uppercase font-extrabold text-xl md:text-2xl tracking-wide mb-2">
                Walkthrough Video In Preparation
              </h3>
              <p className="text-white/60 text-xs md:text-sm max-w-md mb-6 leading-relaxed">
                The high-definition video walkthrough for {projectName} is currently being prepared for streaming. You can explore the image gallery or schedule a private site visit below.
              </p>
              <button
                type="button"
                onClick={scrollToSiteVisit}
                className="inline-flex items-center gap-2.5 px-6 py-3 bg-[#6CAFBF] text-black font-bold text-xs uppercase tracking-[0.2em] rounded-full hover:bg-white transition-all duration-300 shadow-lg hover:scale-105 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Schedule Private Site Visit</span>
              </button>
            </div>
          ) : (
            <>
              {/* Native Accessible HTML5 Video Player */}
              <video
                ref={videoRef}
                src={videoSrc}
                poster={posterSrc}
                preload="none"
                playsInline
                controls={isPlaying}
                onLoadedMetadata={handleLoadedMetadata}
                onWaiting={handleVideoWaiting}
                onPlaying={handleVideoPlaying}
                onPause={handleVideoPause}
                onError={handleVideoError}
                aria-label={`${projectName} Walkthrough Video`}
                className="w-full h-full object-contain bg-black"
              >
                <p className="text-white p-4 text-xs">
                  Your browser does not support HTML video playback. Please upgrade to a modern browser to view the {projectName} walkthrough.
                </p>
              </video>

              {/* Initial Luxury Overlay: Only shown prior to user interaction */}
              {!isPlaying && (
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 flex flex-col justify-between p-6 md:p-10 cursor-pointer group"
                  onClick={handlePlayClick}
                  role="region"
                  aria-label={`Preview of ${projectName} Walkthrough`}
                >
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[10px] md:text-xs font-mono tracking-widest uppercase">
                      <span className="w-2 h-2 rounded-full bg-[#6CAFBF] animate-pulse" />
                      4K UHD Walkthrough
                    </span>

                    {projectLabel && (
                      <span className="font-[magtis] uppercase tracking-widest text-xs md:text-sm text-white/50 font-bold hidden sm:inline">
                        {projectLabel}
                      </span>
                    )}
                  </div>

                  {/* Centered Play Button */}
                  <div className="self-center flex flex-col items-center gap-3">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePlayClick();
                      }}
                      aria-label={`Play ${projectName} walkthrough video`}
                      className="w-16 h-16 md:w-22 md:h-22 rounded-full bg-white/90 hover:bg-[#6CAFBF] text-black flex items-center justify-center transition-all duration-300 shadow-[0_0_40px_rgba(0,0,0,0.6)] group-hover:scale-110 cursor-pointer focus:outline-none focus:ring-4 focus:ring-[#6CAFBF]/50"
                    >
                      <Play className="w-6 h-6 md:w-8 md:h-8 fill-black translate-x-0.5" />
                    </button>
                    <span className="text-white text-xs md:text-sm font-bold tracking-[0.25em] uppercase drop-shadow-md">
                      {isLoading ? 'Loading Footage...' : 'Watch Walkthrough'}
                    </span>
                  </div>

                  {/* Bottom Meta Bar */}
                  <div className="flex items-end justify-between text-white/80 text-[11px] font-mono tracking-wider">
                    <span>Click anywhere to begin playback with audio</span>
                    <span className="hidden sm:inline">Full Controls & Fullscreen Enabled</span>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectWalkthroughVideo;
