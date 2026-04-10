"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Zap, Users } from 'lucide-react';

const CTASection = () => {
    const router = useRouter();

    return (
        <section className="py-32 px-6">
            <div className="max-w-[1200px] mx-auto bg-brand-blue rounded-[64px] p-12 sm:p-24 relative overflow-hidden">
                {/* Decorative stuff */}
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-skyblue/20 to-transparent pointer-events-none" />
                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 flex flex-col lg:flex-row items-center gap-16">
                    <div className="flex-1 text-center lg:text-left">
                        <h2 className="text-4xl sm:text-7xl font-black text-white mb-10 leading-tight uppercase italic tracking-tighter">
                            Ready to <br /> stop the math?
                        </h2>
                        <p className="text-2xl text-brand-blue-50 font-bold mb-12 text-blue-100">
                            Join 100,000+ users who split smarter with SmartSplit. 
                            Available on Web, iOS, and Android.
                        </p>
                        <div className="flex flex-wrap justify-center lg:justify-start gap-6">
                            <button onClick={() => router.push('/register')} className="px-12 py-6 bg-white text-brand-blue rounded-3xl font-black text-2xl hover:scale-105 transition-transform shadow-2xl">
                                Get Started Free
                            </button>
                            <button className="px-12 py-6 border-2 border-white/30 text-white rounded-3xl font-black text-2xl hover:bg-white/10 transition-colors">
                                View Demo
                            </button>
                        </div>
                    </div>
                    
                    <div className="flex-1 relative group">
                        <motion.div
                            initial={{ rotate: 10, y: 50, opacity: 0 }}
                            whileInView={{ rotate: -5, y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, type: "spring" }}
                            className="bg-white/20 backdrop-blur-md p-4 rounded-[40px] shadow-2xl border border-white/30"
                        >
                            {/* Mock Card UI */}
                            <div className="bg-gray-950 rounded-[40px] p-8 aspect-[9/16] w-full max-w-[340px] mx-auto flex flex-col text-white border-4 border-gray-800 shadow-2xl overflow-hidden relative group">
                                {/* Notch */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-2xl z-20" />
                                
                                <div className="flex justify-between items-center mb-10 mt-6 overflow-hidden">
                                    <div className="w-12 h-12 bg-gradient-to-br from-brand-green to-brand-blue rounded-full" />
                                    <div className="text-right">
                                        <div className="text-xs uppercase tracking-widest font-black opacity-40">Total Balance</div>
                                        <div className="text-2xl font-black">€ 3,420.90</div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="flex justify-between gap-4">
                                        <div className="h-14 bg-gray-900 rounded-3xl flex-1 flex items-center justify-center border border-white/5">
                                            <Zap size={18} className="text-brand-green mr-2" />
                                            <span className="text-xs font-bold uppercase">Pay</span>
                                        </div>
                                        <div className="h-14 bg-gray-900 rounded-3xl flex-1 flex items-center justify-center border border-white/5">
                                            <Users size={18} className="text-brand-blue mr-2" />
                                            <span className="text-xs font-bold uppercase">Split</span>
                                        </div>
                                    </div>

                                    <div className="p-6 bg-brand-blue/10 rounded-3xl border border-brand-blue/30 space-y-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-bold opacity-60">Trips Spend</span>
                                            <span className="text-sm font-black text-brand-blue">€ 890.00</span>
                                        </div>
                                        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                                            <motion.div 
                                                initial={{ width: 0 }}
                                                whileInView={{ width: "65%" }}
                                                transition={{ duration: 1.5, delay: 0.5 }}
                                                className="h-full bg-brand-blue" 
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="text-xs font-black uppercase opacity-40 mb-4">Recent Activity</div>
                                        {[1, 2, 3].map((i) => (
                                            <div key={i} className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl">
                                                <div className="w-10 h-10 bg-white/10 rounded-xl" />
                                                <div className="flex-1">
                                                    <div className="h-3 w-20 bg-white/20 rounded-full mb-2" />
                                                    <div className="h-2 w-32 bg-white/10 rounded-full" />
                                                </div>
                                                <div className="w-12 h-4 bg-brand-green/20 rounded-full" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTASection;
