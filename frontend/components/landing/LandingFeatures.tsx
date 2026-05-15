"use client";

import { m, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
    Plane,
    LayoutDashboard,
    Wallet,
    UtensilsCrossed,
    Receipt,
    Share2,
} from 'lucide-react';
import { fadeUp, staggerContainer, viewportOnce } from '../../lib/motion';

const features = [
    {
        icon: Plane,
        title: 'Trip expenses',
        description: 'Create trips, invite friends, log who paid for flights, hotels, and meals — settlements calculated automatically.',
        accent: 'from-sky-500/20 to-emerald-500/10',
        span: 'lg:col-span-2',
    },
    {
        icon: LayoutDashboard,
        title: 'Dashboard overview',
        description: 'See total spend, active trips, and pending settlements across every module in one glance.',
        accent: 'from-violet-500/20 to-brand-blue/10',
        span: '',
    },
    {
        icon: Wallet,
        title: 'Daily expenses',
        description: 'Track personal spending day-to-day with categories and recurring items that stay in sync.',
        accent: 'from-amber-500/15 to-orange-500/10',
        span: '',
    },
    {
        icon: UtensilsCrossed,
        title: 'Activities',
        description: 'Dining, movies, and outings — each event gets its own log so group costs stay fair and transparent.',
        accent: 'from-rose-500/15 to-pink-500/10',
        span: '',
    },
    {
        icon: Receipt,
        title: 'Bills & subscriptions',
        description: 'Rent, Wi‑Fi, streaming — track shared bills with autopay flags and split them across roommates.',
        accent: 'from-teal-500/15 to-cyan-500/10',
        span: '',
    },
    {
        icon: Share2,
        title: 'Share & settle',
        description: 'Generate share links, convert currencies, and use built-in calculators so nobody chases spreadsheets.',
        accent: 'from-brand-green/25 to-brand-blue/10',
        span: 'lg:col-span-2',
    },
];

export default function LandingFeatures() {
    const ref = useRef(null);
    const inView = useInView(ref, viewportOnce);

    return (
        <section
            id="features"
            ref={ref}
            className="relative border-t border-gray-200 bg-white px-4 py-24 transition-colors dark:border-white/10 dark:bg-[#050505] sm:px-8 sm:py-32"
        >
            <m.div
                className="pointer-events-none absolute inset-0 overflow-hidden"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 1 }}
            >
                <div className="absolute -right-32 top-20 h-72 w-72 rounded-full bg-brand-green/10 blur-[100px] dark:bg-[#d4ff00]/8" />
                <m.div
                    animate={{ y: [0, -18, 0] }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute -left-24 bottom-32 h-64 w-64 rounded-full bg-brand-blue/10 blur-[90px]"
                />
            </m.div>

            <m.div
                className="relative mx-auto max-w-6xl"
                variants={staggerContainer}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
            >
                <m.p variants={fadeUp} custom={0} className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-gray-500 dark:text-white/45">
                    What you get
                </m.p>
                <m.h2
                    variants={fadeUp}
                    custom={1}
                    className="max-w-3xl font-mier text-4xl font-semibold leading-[1.08] tracking-tight text-gray-900 dark:text-[#f2f2ed] sm:text-5xl md:text-6xl"
                >
                    Everything your group needs —{' '}
                    <span className="text-gray-500 dark:text-white/50">built in.</span>
                </m.h2>
                <m.p
                    variants={fadeUp}
                    custom={2}
                    className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-white/55 sm:text-xl"
                >
                    SmartSplit isn&apos;t just a calculator. It&apos;s trips, roommates, nights out, bills, and daily spend — connected in one ledger.
                </m.p>

                <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, i) => (
                        <m.div
                            key={feature.title}
                            variants={fadeUp}
                            custom={3 + i}
                            whileHover={{ y: -6, transition: { duration: 0.25 } }}
                            className={feature.span}
                        >
                            <article
                                className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 p-8 dark:border-white/10 dark:bg-white/[0.03] sm:rounded-3xl sm:p-10`}
                            >
                                <m.div
                                    className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${feature.accent} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                                />
                                <div className="relative">
                                    <feature.icon
                                        className="mb-6 h-8 w-8 text-brand-green dark:text-[#d4ff00]"
                                        strokeWidth={1.25}
                                    />
                                    <h3 className="font-mier text-xl font-semibold text-gray-900 dark:text-[#f2f2ed] sm:text-2xl">
                                        {feature.title}
                                    </h3>
                                    <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-white/50 sm:text-base">
                                        {feature.description}
                                    </p>
                                </div>
                            </article>
                        </m.div>
                    ))}
                </div>
            </m.div>
        </section>
    );
}
