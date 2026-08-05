'use client';

import React, { useState, useEffect } from 'react';
import Home from '@/components/home/Home';
import Projects from '@/components/projects/Projects';
import Amenities from '@/components/Amenities/Amenities';
import Testimonials from '@/components/testimonials/Testimonials';
import WhyUs from '@/components/why-us/WhyUs';
import Services from '@/components/services/Services';
import Contact from '@/components/contact/Contact';
import Footer from '@/components/Footer/Footer';
import Navbar from '@/components/Nav/Navbar';
import Loader from '@/components/Loader/Loader';
import FloatingConversionBar from '@/components/Nav/FloatingConversionBar';
import EmiCalculator from '@/components/cro/EmiCalculator';
import ProjectFaq from '@/components/cro/ProjectFaq';

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(false);

  useEffect(() => {
    try {
      const hasLoadedBefore = sessionStorage.getItem('mayuri_has_loaded');
      if (!hasLoadedBefore) {
        setLoading(true);
        setIsFirstVisit(true);
      }
    } catch (e) {
      // In case sessionStorage is blocked/unavailable
      setLoading(false);
    }
  }, []);

  const handleLoaderComplete = () => {
    try {
      sessionStorage.setItem('mayuri_has_loaded', 'true');
    } catch (e) {}
    setLoading(false);
  };

  return (
    <>
      {loading && isFirstVisit && <Loader onComplete={handleLoaderComplete} />}
      <div
        className={`transition-opacity duration-1000 ${
          loading ? 'opacity-0 h-screen overflow-hidden' : 'opacity-100'
        }`}
      >
        <Navbar />
        <div id="section-home">
          <Home />
        </div>
        <div id="section-projects">
          <Projects />
        </div>
        <div id="section-amenities">
          <Amenities />
        </div>
        <div id="section-emi-calculator">
          <EmiCalculator />
        </div>
        <div id="section-testimonials">
          <Testimonials />
        </div>
        <div id="section-why-us">
          <WhyUs />
        </div>
        <div id="section-[#faq]">
          <ProjectFaq />
        </div>
        <div id="section-services">
          <Services />
        </div>
        <div id="section-contact">
          <Contact />
        </div>
        <Footer />
        <FloatingConversionBar />
      </div>
    </>
  );
}
