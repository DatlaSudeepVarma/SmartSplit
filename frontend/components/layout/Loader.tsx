"use client";

import React, { useState, useEffect, useContext } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { SplashContext } from '../../context/AppContext';

const Loader = () => {
    const [loading, setLoading] = useState(true);
    const { finishSplash } = useContext(SplashContext);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
            finishSplash();
        }, 3000); // GIF loads for 3 seconds

        return () => clearTimeout(timer);
    }, [finishSplash]);

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        transition: { duration: 0.8, ease: "easeInOut" }
                    }}
                    className="fixed inset-0 z-[250] flex items-center justify-center bg-white"
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="relative w-[400px] h-[400px] flex flex-col items-center justify-center"
                    >
                        <Image
                            src="/SmartSplit-GIF.gif"
                            alt="SmartSplit Loading..."
                            width={400}
                            height={400}
                            priority
                            unoptimized
                            className="object-contain"
                        />
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 1 }}
                            className="mt-4 flex items-center gap-2"
                        >

                        </motion.div>
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 2.5, ease: "easeInOut" }}
                            className="mt-8 h-1 w-64 bg-gradient-to-r from-brand-blue to-brand-green rounded-full opacity-50"
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Loader;
