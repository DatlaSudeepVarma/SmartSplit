"use client";

import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function LandingFeatured() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <section
            id="featured"
            ref={ref}
            className="relative border-t border-gray-200 bg-white px-4 py-24 transition-colors dark:border-white/10 dark:bg-[#050505] sm:px-8 sm:py-32"
        >
            <div className="mx-auto max-w-6xl">
                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                    className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-gray-500 dark:text-white/45"
                >
                    Featured
                </motion.p>
                <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
                    <motion.h2
                        initial={{ opacity: 0, y: 24 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.05 }}
                        className="max-w-2xl font-mier text-4xl font-semibold leading-[1.1] tracking-tight text-gray-900 dark:text-[#f2f2ed] sm:text-5xl md:text-6xl"
                    >
                        Trips, roommates & nights out — <span className="text-gray-500 dark:text-white/50">one ledger.</span>
                    </motion.h2>
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.15 }}
                    >
                        <Link
                            href="/trips"
                            className="group inline-flex items-center gap-2 text-sm font-semibold text-brand-green transition-colors hover:text-brand-blue dark:text-[#d4ff00] dark:hover:text-[#e8ff4d]"
                        >
                            All trips
                            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </Link>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 32 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.12 }}
                    className="mt-14 overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-emerald-50 via-sky-50 to-violet-100 sm:rounded-3xl dark:border-white/10 dark:from-emerald-900/40 dark:via-[#0a1628] dark:to-violet-950/50"
                >
                    <Link href="/trips" className="group relative block aspect-[21/9] min-h-[200px] w-full sm:aspect-[2.4/1]">
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_40%,rgba(34,197,94,0.15),transparent)] dark:bg-[radial-gradient(ellipse_80%_60%_at_70%_40%,rgba(249,107,0,0.12),transparent)]" />
                        <div className="absolute inset-0 flex items-center justify-center p-8">
                            <span className="text-center font-mier text-3xl font-bold text-gray-900 transition-transform duration-500 group-hover:scale-[1.02] dark:text-white/90 sm:text-5xl md:text-6xl">
                                Split fairly.{' '}
                                <span className="text-brand-green dark:text-[#d4ff00]">Move on.</span>
                            </span>
                        </div>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
