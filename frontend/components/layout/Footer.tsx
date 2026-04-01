"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const Footer = () => {
    return (
        <footer className="w-full bg-gray-50/50 dark:bg-gray-900/50 backdrop-blur-xl border-t border-gray-200/50 dark:border-gray-800/50 py-12 px-6">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex flex-col items-center md:items-start gap-4">
                    <div className="flex items-center gap-3">
                        <motion.div whileHover={{ scale: 1.1, rotate: 10 }}>
                            <Image 
                                src="/SmartSplit-PNG.png" 
                                alt="SmartSplit Logo" 
                                width={32} 
                                height={32} 
                                className="object-contain"
                            />
                        </motion.div>
                        <span className="font-black text-xl tracking-tight text-gray-900 dark:text-white">
                            SMART<span className="text-brand-green">SPLIT</span>
                        </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs text-center md:text-left">
                        Simplifying shared expenses for travelers, friends, and families worldwide.
                    </p>
                </div>

                <div className="flex gap-8">
                    <a href="#" className="text-sm font-bold text-gray-600 dark:text-gray-400 hover:text-brand-blue transition-colors">Privacy</a>
                    <a href="#" className="text-sm font-bold text-gray-600 dark:text-gray-400 hover:text-brand-blue transition-colors">Terms</a>
                    <a href="#" className="text-sm font-bold text-gray-600 dark:text-gray-400 hover:text-brand-blue transition-colors">Support</a>
                </div>

                <div className="text-sm font-bold text-gray-400 dark:text-gray-600">
                    © {new Date().getFullYear()} SmartSplit. AI-Powered Expense Control.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
