"use client";

import { useRouter } from 'next/navigation';
import { m, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { fadeUp, staggerContainer, viewportOnce } from '../../lib/motion';

export default function LandingCTA() {
    const router = useRouter();
    const ref = useRef(null);
    const inView = useInView(ref, viewportOnce);

    return (
        <section ref={ref} className="border-t border-gray-200 bg-white px-4 py-24 dark:border-white/10 dark:bg-[#050505] sm:px-8 sm:py-32">
            <m.div
                className="mx-auto max-w-4xl overflow-hidden rounded-[2rem] border border-gray-200 bg-gradient-to-br from-gray-50 via-white to-emerald-50/80 p-10 text-center shadow-xl dark:border-white/10 dark:from-[#0a0a0a] dark:via-[#0f1410] dark:to-emerald-950/30 sm:rounded-[2.5rem] sm:p-16"
                variants={staggerContainer}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
            >
                <m.p variants={fadeUp} custom={0} className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500 dark:text-white/45">
                    Ready when you are
                </m.p>
                <m.h2
                    variants={fadeUp}
                    custom={1}
                    className="mt-4 font-mier text-3xl font-semibold tracking-tight text-gray-900 dark:text-[#f2f2ed] sm:text-5xl"
                >
                    Stop spreadsheet-splitting. Start SmartSplit.
                </m.h2>
                <m.p variants={fadeUp} custom={2} className="mx-auto mt-4 max-w-lg text-base text-gray-600 dark:text-white/55 sm:text-lg">
                    Free to try — create an account and set up your first trip or roommate group in minutes.
                </m.p>
                <m.div variants={fadeUp} custom={3} className="mt-10 flex flex-wrap items-center justify-center gap-4">
                    <m.button
                        type="button"
                        whileHover={{ scale: 1.04, y: -3 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => router.push('/register')}
                        className="inline-flex items-center gap-2 rounded-full bg-brand-green px-8 py-4 text-sm font-bold text-gray-900 shadow-lg dark:bg-[#d4ff00] sm:text-base"
                    >
                        Create free account
                        <ArrowRight className="h-5 w-5" strokeWidth={2.5} />
                    </m.button>
                    <m.button
                        type="button"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => router.push('/login')}
                        className="rounded-full border border-gray-300 px-8 py-4 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-50 dark:border-white/20 dark:text-[#f2f2ed] dark:hover:bg-white/10 sm:text-base"
                    >
                        Sign in
                    </m.button>
                </m.div>
            </m.div>
        </section>
    );
}
