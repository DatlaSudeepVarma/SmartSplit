"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Smartphone, Star } from 'lucide-react';

const HeroSection = () => {
    const router = useRouter();
    const [particles, setParticles] = useState<{ x: number, y: number, op: number, dur: number }[]>([]);

    useEffect(() => {
        setParticles([...Array(10)].map(() => ({
            x: Math.random() * 100,
            y: Math.random() * 100,
            op: 0.1 + Math.random() * 0.2,
            dur: 15 + Math.random() * 20
        })));
    }, []);

    return (
        <section className="pt-32 sm:pt-44 pb-20 sm:pb-32 px-6 relative overflow-visible">
            {/* Dynamic Background */}
            <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                        opacity: [0.1, 0.2, 0.1]
                    }}
                    transition={{ duration: 20, repeat: Infinity }}
                    className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-gradient-to-br from-brand-blue/30 to-brand-green/20 rounded-full blur-[80px] will-change-transform transform-gpu"
                />
            </div>

            {/* Floating Particles/Shapes Effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none -z-5">
                {particles.map((p, i) => (
                    <motion.div
                        key={i}
                        initial={{ 
                            x: `${p.x}%`, 
                            y: `${p.y}%`,
                            opacity: p.op
                        }}
                        animate={{
                            y: ["-20px", "20px", "-20px"],
                            x: ["-20px", "20px", "-20px"],
                            rotate: [0, 180, 360],
                            scale: [1, 1.2, 1]
                        }}
                        transition={{
                            duration: p.dur,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        className="absolute w-4 h-4 sm:w-8 sm:h-8 bg-brand-green/10 rounded-xl border border-brand-green/20 backdrop-blur-sm will-change-transform"
                        style={{
                            left: `${p.x}%`,
                            top: `${p.y}%`,
                        }}
                    />
                ))}
            </div>

            <div className="max-w-[1200px] mx-auto text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 1, type: "spring", bounce: 0.4 }}
                >
                    <h1 className="text-6xl sm:text-8xl md:text-9xl font-black mb-10 leading-[0.9] text-gray-900 dark:text-white tracking-tighter uppercase italic">
                        SPLIT <br />
                        <div className="relative inline-block h-[1.1em] overflow-hidden align-bottom">
                            <motion.div
                            animate={{ y: ["0%", "-33.33%", "-66.66%", "0%"] }}
                            transition={{ 
                                duration: 6, 
                                repeat: Infinity, 
                                ease: [0.76, 0, 0.24, 1],
                                times: [0, 0.3, 0.6, 1] 
                            }}
                            className="flex flex-col"
                            >
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green via-brand-blue to-brand-skyblue">RENT.</span>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-brand-skyblue to-brand-green">TRIPS.</span>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-skyblue via-brand-green to-brand-blue">BILLS.</span>
                            </motion.div>
                        </div>
                        <br />
                        SIMPLE.
                    </h1>
                </motion.div>

                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed font-bold"
                >
                    The world's most versatile money splitter. From epic road trips to shared subscriptions, 
                    track every cent and keep every friendship intact.
                </motion.p>

                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="flex flex-col sm:flex-row justify-center items-center gap-6"
                >
                    <motion.button 
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => router.push('/register')} 
                    className="group relative px-12 py-6 text-2xl font-black text-white bg-brand-green rounded-3xl shadow-[0_20px_50px_-10px_rgba(34,197,94,0.5)] transition-all overflow-hidden"
                    >
                    <span className="relative z-10 flex items-center gap-3">
                        Get Started <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.button>
                    <motion.button 
                    whileHover={{ scale: 1.05, border: "2px solid var(--color-brand-blue)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => router.push('/login')} 
                    className="px-12 py-6 text-2xl font-bold text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 border-2 border-transparent rounded-3xl shadow-xl transition-all"
                    >
                    Log In
                    </motion.button>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="mt-20 flex flex-wrap justify-center items-center gap-x-12 gap-y-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-700"
                >
                    <div className="flex items-center gap-2 font-black text-2xl"><ShieldCheck /> SECURE</div>
                    <div className="flex items-center gap-2 font-black text-2xl"><Smartphone /> MOBILE FIRST</div>
                    <div className="flex items-center gap-2 font-black text-2xl"><Star /> 4.9 RATING</div>
                </motion.div>
            </div>
        </section>
    );
};

export default HeroSection;
