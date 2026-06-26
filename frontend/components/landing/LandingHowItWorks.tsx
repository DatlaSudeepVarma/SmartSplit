"use client";

import { m, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Users, PlusCircle, HandCoins } from 'lucide-react';
import { fadeUp, staggerContainer, viewportOnce } from '../../lib/motion';

const steps = [    
    {  
        icon: Users,
        step: '01',
        title: 'Start a group or trip',
        body: 'Add roommates, travel buddies, or dinner crew. Everyone gets a clear place in the ledger.',
    },
    {
        icon: PlusCircle,
        step: '02',
        title: 'Log every expense',
        body: 'Who paid, how much, and how to split — equal, custom, or per person. No more guessing in the group chat.',
    },
    {
        icon: HandCoins,
        step: '03',
        title: 'Settle with confidence',
        body: 'See who owes whom at a glance. Share summaries, convert currencies, and close the books without awkward follow-ups.',
    },
];

export default function LandingHowItWorks() {
    const ref = useRef(null);
    const inView = useInView(ref, viewportOnce);

    return (
        <section
            id="how-it-works"
            ref={ref}
            className="border-t border-gray-200 bg-gray-50 px-4 py-24 transition-colors dark:border-white/10 dark:bg-[#080808] sm:px-8 sm:py-32"
        >
            <m.div
                className="mx-auto max-w-6xl"
                variants={staggerContainer}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
            >
                <m.p variants={fadeUp} custom={0} className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-gray-500 dark:text-white/45">
                    How it works
                </m.p>
                <m.h2
                    variants={fadeUp}
                    custom={1}
                    className="max-w-2xl font-mier text-4xl font-semibold leading-[1.08] tracking-tight text-gray-900 dark:text-[#f2f2ed] sm:text-5xl"
                >
                    Three steps from chaos to settled.
                </m.h2>

                <div className="mt-16 grid gap-8 md:grid-cols-3">
                    {steps.map((item, i) => (
                        <m.article
                            key={item.step}
                            variants={fadeUp}
                            custom={2 + i}
                            whileHover={{ y: -4 }}
                            className="relative rounded-2xl border border-gray-200 bg-white p-8 dark:border-white/10 dark:bg-[#0c0c0c] sm:rounded-3xl sm:p-10"
                        >
                            <span className="font-mier text-5xl font-bold text-gray-100 dark:text-white/[0.06]">{item.step}</span>
                            <item.icon className="relative -mt-8 mb-6 h-9 w-9 text-brand-green dark:text-[#d4ff00]" strokeWidth={1.25} />
                            <h3 className="font-mier text-xl font-semibold text-gray-900 dark:text-[#f2f2ed]">{item.title}</h3>
                            <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-white/50 sm:text-base">{item.body}</p>
                            {i < steps.length - 1 && (
                                <m.div
                                    initial={{ scaleX: 0 }}
                                    animate={inView ? { scaleX: 1 } : {}}
                                    transition={{ delay: 0.4 + i * 0.15, duration: 0.6 }}
                                    className="absolute -right-4 top-1/2 hidden h-px w-8 origin-left bg-brand-green/40 md:block dark:bg-[#d4ff00]/30"
                                />
                            )}
                        </m.article>
                    ))}
                </div>
            </m.div>
        </section>
    );



    
}
