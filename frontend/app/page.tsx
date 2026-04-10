"use client";

import React from 'react';
import HeroSection from '../components/sections/HeroSection';
import StatsSection from '../components/sections/StatsSection';
import HowItWorks from '../components/sections/HowItWorks';
import FeaturesSection from '../components/sections/FeaturesSection';
import CTASection from '../components/sections/CTASection';

const LandingPage = () => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gray-50 dark:bg-gray-950">
      {/* Background Gradients (Global) */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] bg-gradient-to-tr from-brand-green/30 to-brand-orange/20 rounded-full blur-[80px] will-change-transform transform-gpu" />
      </div>

      {/* Sections */}
      <HeroSection />
      <StatsSection />
      <HowItWorks />
      <FeaturesSection />
      <CTASection />
    </div>
  );
};

export default LandingPage;
