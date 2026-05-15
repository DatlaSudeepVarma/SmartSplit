"use client";

import React, { useContext } from 'react';
import Navbar from '../components/layout/Navbar';
import HeroSection from '../components/sections/HeroSection';
import LandingFeatures from '../components/landing/LandingFeatures';
import LandingHowItWorks from '../components/landing/LandingHowItWorks';
import LandingStats from '../components/landing/LandingStats';
import LandingCTA from '../components/landing/LandingCTA';
import Footer from '../components/layout/Footer';
import { AuthContext } from '../context/AppContext';

const LandingPage = () => {
    const { isAuthenticated, authReady } = useContext(AuthContext);
    const showFooter = authReady && !isAuthenticated;

    return (
        <div className="min-h-screen bg-gray-50 p-3 text-gray-900 transition-colors duration-200 dark:bg-[#050505] dark:text-[#f2f2ed] sm:p-4 md:p-6">
            <div className="mx-auto max-w-[1400px] overflow-hidden rounded-[2.5rem] bg-[#8dc6e4] shadow-xl dark:bg-[#5a8eb0] sm:rounded-[3rem]">
                <Navbar variant="contained" />
                <HeroSection />
            </div>
            <LandingFeatures />
            <LandingHowItWorks />
            <LandingStats />
            <LandingCTA />
            {showFooter && <Footer />}
        </div>
    );
};

export default LandingPage;
