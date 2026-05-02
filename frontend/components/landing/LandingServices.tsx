"use client";

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Plane, Home, Receipt, Users, Calculator, Sparkles } from 'lucide-react';

const services = [
    {
        icon: Plane,
        title: 'Trip expenses',
        body: 'Road trips, flights, hotels — track who paid what without a spreadsheet meltdown.',
    },
    {
        icon: Home,
        title: 'Rent & utilities',
        body: 'Roommates, leases, Wi‑Fi. Same roof, clear balances.',
    },
    {
        icon: Receipt,
        title: 'Bills & subscriptions',
        body: 'Streaming, groceries, group gifts — split and settle in one flow.',
    },
    {
        icon: Users,
        title: 'Groups that scale',
        body: 'Add people, share trips, and keep history so nobody argues later.',
    },
    {
        icon: Calculator,
        title: 'Fair math',
        body: 'Built-in tools so splits stay transparent — no awkward follow-up texts.',
    },
    {
        icon: Sparkles,
        title: 'Daily & recurring',
        body: 'Everyday spend and habits in sync with how your crew actually lives.',
    },
];

export default function LandingServices() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });

    return (
        <section
            id="features"
            ref={ref}
            className="border-t border-gray-200 bg-gray-50 px-4 py-24 transition-colors dark:border-white/10 dark:bg-[#080808] sm:px-8 sm:py-32"
        >
            <div className="mx-auto max-w-6xl">
                <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.45 }}
                    className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-gray-500 dark:text-white/45"
                >
                    Our toolkit
                </motion.p>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.55, delay: 0.05 }}
                    className="max-w-3xl font-mier text-4xl font-semibold leading-[1.08] tracking-tight text-gray-900 dark:text-[#f2f2ed] sm:text-5xl md:text-6xl"
                >
                    From chaos to settled.
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-white/55 sm:text-xl"
                >
                    We take care of the messy part — who owes whom, in which currency, across trips and everyday life — so you
                    can focus on the fun part.
                </motion.p>

                <div className="mt-16 grid gap-px bg-gray-200 dark:bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
                    {services.map((s, i) => (
                        <motion.article
                            key={s.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.45, delay: 0.08 + i * 0.05 }}
                            className="group bg-gray-50 p-8 transition-colors hover:bg-gray-100 dark:bg-[#080808] dark:hover:bg-white/[0.03] sm:p-10"
                        >
                            <s.icon
                                className="mb-6 h-8 w-8 text-brand-green dark:text-[#d4ff00]"
                                strokeWidth={1.25}
                            />
                            <h3 className="font-mier text-xl font-semibold text-gray-900 dark:text-[#f2f2ed]">{s.title}</h3>
                            <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-white/50 sm:text-base">{s.body}</p>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}
