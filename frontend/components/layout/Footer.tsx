"use client";

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { m } from 'framer-motion';
import { ArrowRight, Mail } from 'lucide-react';
import SmartSplitLogo from '../ui/SmartSplitLogo';
import { FlipMotionButton } from '../ui/Text3DFlip';
import { fadeUp, staggerContainer, viewportOnce } from '../../lib/motion';

const productLinks = [
    { label: 'Trip expenses' },
    { label: 'Dashboard & settlements' },
    { label: 'Daily spending' },
    { label: 'Activities & outings' },
    { label: 'Bills & subscriptions' },
];

const Footer = () => {
    const router = useRouter();

    return (
        <footer
            id="contact"
            className="w-full border-t border-gray-200 bg-white text-gray-900 transition-colors duration-200 dark:border-white/10 dark:bg-[#050505] dark:text-[#f2f2ed]"
        >
            <m.div
                className="mx-auto max-w-6xl px-6 py-16 sm:px-8 sm:py-20"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
            >
                <m.div variants={fadeUp} custom={0} className="grid gap-12 lg:grid-cols-[1.2fr_1fr_1fr_1fr] lg:gap-10">
                    <m.div variants={fadeUp} custom={0} className="max-w-sm">
                        <div className="mb-5 flex items-center gap-3">
                            <SmartSplitLogo className="h-10 w-10" />
                            <span className="font-mier text-xl font-semibold tracking-tight">SmartSplit</span>
                        </div>
                        <p className="text-sm leading-relaxed text-gray-600 dark:text-white/55 sm:text-base">
                            The smartest way to split rent, trips, and everyday expenses — without spreadsheets or awkward follow-ups.
                        </p>
                        <FlipMotionButton
                            type="button"
                            whileTap={{ scale: 0.98 }}
                            onClick={() => router.push('/register')}
                            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#f96b00] px-5 py-2.5 text-sm font-bold text-black transition-colors hover:bg-[#de6800] dark:bg-[#d4ff00] dark:text-gray-900 dark:hover:bg-[#d4ff00]/90"
                        >
                            Get started free
                            <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
                        </FlipMotionButton>
                    </m.div>

                    <m.div variants={fadeUp} custom={1}>
                        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-white/40">Product</p>
                        <ul className="flex flex-col gap-2.5 text-sm text-gray-600 dark:text-white/65">
                            {productLinks.map((item) => (
                                <li key={item.label}>{item.label}</li>
                            ))}
                        </ul>
                    </m.div>

                    <m.div variants={fadeUp} custom={2}>
                        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-white/40">Account</p>
                        <ul className="flex flex-col gap-2.5 text-sm font-medium text-gray-600 dark:text-white/65">
                            <li>
                                <Link href="/register" className="text-gray-600 dark:text-white/70 transition-colors hover:text-[#f96b00] dark:hover:text-[#d4ff00]">
                                    Create account
                                </Link>
                            </li>
                            <li>
                                <Link href="/login" className="text-gray-600 dark:text-white/70 transition-colors hover:text-[#f96b00] dark:hover:text-[#d4ff00]">
                                    Sign in
                                </Link>
                            </li>
                        </ul>
                    </m.div>

                    <m.div variants={fadeUp} custom={3}>
                        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-white/40">Contact</p>
                        <a
                            href="mailto:hello@smartsplit.app"
                            className="inline-flex items-center gap-2 text-sm font-medium text-[#f96b00] transition-colors hover:text-[#de6800] dark:text-[#d4ff00] dark:hover:text-[#e8ff4d]"
                        >
                            <Mail className="h-4 w-4" strokeWidth={1.5} />
                            hello@smartsplit.app
                        </a>
                        <p className="mt-3 text-sm text-gray-600 dark:text-white/45">Questions or feedback? We&apos;d love to hear from you.</p>

                        <p className="mb-3 mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-white/40">Legal</p>
                        <ul className="flex flex-col gap-2 text-sm text-gray-600 dark:text-white/65">
                            <li>
                                <a href="#" className="transition-colors hover:text-[#f96b00] dark:hover:text-white">
                                    Privacy policy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="transition-colors hover:text-[#f96b00] dark:hover:text-white">
                                    Terms of service
                                </a>
                            </li>
                        </ul>
                    </m.div>
                </m.div>

                <m.div
                    variants={fadeUp}
                    custom={4}
                    className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-gray-200/70 dark:border-white/10 pt-8 text-xs text-gray-500 dark:text-white/40 sm:flex-row sm:text-sm"
                >
                    <p>© {new Date().getFullYear()} SmartSplit. All rights reserved.</p>
                    <p className="text-center sm:text-right">Bill splitting, without the drama.</p>
                </m.div>
            </m.div>
        </footer>
    );
};

export default Footer;
