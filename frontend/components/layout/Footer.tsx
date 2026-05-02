"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import SmartSplitLogo from '../ui/SmartSplitLogo';

const Footer = () => {
    return (
        <footer
            id="contact"
            className="w-full border-t border-gray-200 bg-gray-50 px-6 py-16 transition-colors dark:border-white/10 dark:bg-[#050505] sm:py-24"
        >
            <div className="mx-auto max-w-6xl">
                <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
                    <div className="max-w-md">
                        <motion.div
                            className="mb-6 flex items-center gap-3"
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: 'spring', stiffness: 400 }}
                        >
                            <SmartSplitLogo className="h-10 w-10" />
                            <span className="font-mier text-2xl font-semibold tracking-tight text-gray-900 dark:text-[#f2f2ed]">
                                SmartSplit
                            </span>
                        </motion.div>
                        <h2 className="font-mier text-3xl font-semibold leading-tight tracking-tight text-gray-900 dark:text-[#f2f2ed] sm:text-4xl">
                            Let&apos;s get to know each other
                        </h2>
                        <p className="mt-4 text-base leading-relaxed text-gray-600 dark:text-white/50 sm:text-lg">
                            Shared expenses, one calm ledger. Built for trips, roommates, and everyday groups.
                        </p>
                    </div>

                    <div className="flex flex-col gap-10 sm:flex-row sm:gap-20">
                        <div>
                            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-white/40">
                                Contact
                            </p>
                            <a
                                href="mailto:hello@smartsplit.app"
                                className="block text-lg font-medium text-brand-green transition-colors hover:text-brand-blue dark:text-[#d4ff00] dark:hover:text-[#e8ff4d]"
                            >
                                hello@smartsplit.app
                            </a>
                            <p className="mt-3 text-sm text-gray-500 dark:text-white/45">We&apos;re online — say hi anytime.</p>
                        </div>
                        <div>
                            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-white/40">
                                Explore
                            </p>
                            <ul className="flex flex-col gap-2 text-sm font-medium text-gray-600 dark:text-white/70">
                                <li>
                                    <Link href="/trips" className="transition-colors hover:text-gray-900 dark:hover:text-white">
                                        Trips
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/bills" className="transition-colors hover:text-gray-900 dark:hover:text-white">
                                        Bills
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/register" className="transition-colors hover:text-gray-900 dark:hover:text-white">
                                        Get started
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/login" className="transition-colors hover:text-gray-900 dark:hover:text-white">
                                        Sign in
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-white/40">
                                Legal
                            </p>
                            <ul className="flex flex-col gap-2 text-sm font-medium text-gray-600 dark:text-white/70">
                                <li>
                                    <a href="#" className="transition-colors hover:text-gray-900 dark:hover:text-white">
                                        Privacy
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="transition-colors hover:text-gray-900 dark:hover:text-white">
                                        Terms
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-8 text-sm text-gray-500 dark:border-white/10 dark:text-white/40 sm:flex-row">
                    <p>© {new Date().getFullYear()} SmartSplit. All rights reserved.</p>
                    <p className="text-center sm:text-right">Bill splitting, without the drama.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
