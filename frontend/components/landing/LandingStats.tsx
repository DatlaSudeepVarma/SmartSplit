"use client";

import { m, useInView } from 'framer-motion';
import { useRef } from 'react';
import { fadeUp, staggerContainer, viewportOnce } from '../../lib/motion';

const highlights = [
    { value: '6+', label: 'Modules', detail: 'Trips, bills, activities, daily spend & more' },
    { value: 'Fair', label: 'Splits', detail: 'Transparent math — equal or custom per person' },
    { value: 'Multi', label: 'Currency', detail: 'Convert and track across currencies' },
    { value: 'Share', label: 'Links', detail: 'Send summaries so everyone stays aligned' },
];

export default function LandingStats() {
    const ref = useRef(null);
    const inView = useInView(ref, viewportOnce);

    return (
        <section
            ref={ref}
            className="border-t border-gray-200 bg-[#8dc6e4] px-4 py-20 transition-colors dark:border-white/10 dark:bg-[#3d6a88] sm:px-8 sm:py-28"
        >
            <m.div
                className="mx-auto max-w-6xl"
                variants={staggerContainer}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
            >
                <m.h2
                    variants={fadeUp}
                    custom={0}
                    className="text-center font-mier text-3xl font-semibold tracking-tight text-gray-900 dark:text-[#f2f2ed] sm:text-4xl"
                >
                    Built for real-life splitting
                </m.h2>
                <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {highlights.map((item, i) => (
                        <m.div
                            key={item.label}
                            variants={fadeUp}
                            custom={1 + i}
                            whileHover={{ scale: 1.03 }}
                            className="rounded-2xl border border-white/40 bg-white/60 p-6 text-center backdrop-blur-sm dark:border-white/15 dark:bg-white/10 sm:rounded-3xl sm:p-8"
                        >
                            <p className="font-mier text-4xl font-bold text-brand-green dark:text-[#d4ff00] sm:text-5xl">{item.value}</p>
                            <p className="mt-2 text-sm font-semibold uppercase tracking-[0.15em] text-gray-700 dark:text-white/80">
                                {item.label}
                            </p>
                            <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-white/55">{item.detail}</p>
                        </m.div>
                    ))}
                </div>
            </m.div>
        </section>
    );
}
