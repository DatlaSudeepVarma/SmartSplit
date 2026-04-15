"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Users, Receipt, CheckCircle2 } from 'lucide-react';

const HowItWorks = () => {
    const workflowSteps = [
        {
          title: "Create a Trip",
          desc: "Add your friends and set a group name. No login required for them initially.",
          icon: Users
        },
        {
          title: "Add Expenses",
          desc: "Add who paid and how to split. Use our AI scan to save time.",
          icon: Receipt
        },
        {
          title: "Settle Up",
          desc: "One click to see the final tally. Use UPI or Apps to settle directly.",
          icon: CheckCircle2
        }
    ];

    return (
        <section className="py-32 px-6">
            <div className="max-w-[1200px] mx-auto">
                <div className="text-center mb-16 sm:mb-24">
                    <h2 className="text-3xl sm:text-6xl font-black text-gray-900 dark:text-white mb-4 italic uppercase">How it works</h2>
                    <div className="h-2 w-24 sm:w-32 bg-brand-green mx-auto rounded-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                    {workflowSteps.map((step, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative group"
                    >
                        <div className="text-6xl sm:text-8xl font-black text-gray-100 dark:text-gray-900 absolute -top-8 sm:-top-12 -left-2 sm:-left-4 z-0 group-hover:text-brand-green/20 transition-colors">
                            0{i+1}
                        </div>
                        <div className="relative z-10 flex flex-col items-start gap-4 sm:gap-6">
                            <div className="p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-[28px] sm:rounded-[32px] shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 border border-gray-100 dark:border-gray-700">
                                <step.icon size={36} className="text-brand-green sm:w-11 sm:h-11" />
                            </div>
                            <h3 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">{step.title}</h3>
                            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 font-medium leading-relaxed">{step.desc}</p>
                        </div>
                        {i < 2 && (
                            <div className="hidden md:block absolute top-1/2 -right-12 translate-y-[-50%] z-0">
                                <ArrowRight className="text-gray-200 dark:text-gray-800" size={40} />
                            </div>
                        )}
                    </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
