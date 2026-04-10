"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Zap, Bot, Users } from 'lucide-react';

const StatsSection = () => {
    const stats = [
        { label: "Trips Created", value: "10K+", icon: Globe },
        { label: "Settled Bills", value: "50K+", icon: Zap },
        { label: "AI Suggestions", value: "2M+", icon: Bot },
        { label: "Active Users", value: "100K+", icon: Users }
    ];

    return (
        <section className="py-20 bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border-y border-gray-200 dark:border-gray-800">
            <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
            {stats.map((stat, i) => (
                <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="text-center"
                >
                    <div className="mb-4 inline-flex p-4 bg-brand-blue/10 rounded-2xl text-brand-blue">
                        <stat.icon size={32} />
                    </div>
                    <h4 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white mb-2">{stat.value}</h4>
                    <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">{stat.label}</p>
                </motion.div>
            ))}
            </div>
        </section>
    );
};

export default StatsSection;
