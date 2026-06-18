"use client";

import React, { useContext } from 'react';
import Navbar from '../components/layout/Navbar';
import SiteFrame from '../components/layout/SiteFrame';
import HeroSection from '../components/sections/HeroSection';
import LandingFeatures from '../components/landing/LandingFeatures';
import LandingHowItWorks from '../components/landing/LandingHowItWorks';
import LandingStats from '../components/landing/LandingStats';
import LandingCTA from '../components/landing/LandingCTA';
import Footer from '../components/layout/Footer';
import { AuthContext } from '../context/AppContext';
import { SITE_CONTENT_CLIP } from '../lib/siteFrame';

const LandingPage = () => {
    const { isAuthenticated, authReady } = useContext(AuthContext);
    const showFooter = authReady && !isAuthenticated;

    return (
        <div className="min-h-dvh bg-gray-50 text-gray-900 transition-colors duration-200 dark:bg-[#050505] dark:text-[#f2f2ed]">
            <SiteFrame />
            <Navbar variant="contained" />

            <div className={`relative z-0 min-h-dvh ${SITE_CONTENT_CLIP}`}>
                <HeroSection />
                <LandingFeatures />
                <LandingHowItWorks />
                <LandingStats />
                <LandingCTA />
                {showFooter && <Footer />}
            </div>
        </div>
    );
};

export default LandingPage;
