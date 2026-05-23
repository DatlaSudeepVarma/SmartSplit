"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { m } from 'framer-motion';
import { ArrowRight, Mail, Github, Twitter, Linkedin, Instagram, Send, Check } from 'lucide-react';
import SmartSplitLogo from '../ui/SmartSplitLogo';
import { FlipMotionButton } from '../ui/Text3DFlip';
import { fadeUp, staggerContainer, viewportOnce } from '../../lib/motion';

const Footer = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim()) return;
        setSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setSubmitting(false);
            setSubscribed(true);
            setEmail('');
        }, 1000);
    };

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
                <m.div variants={fadeUp} custom={0} className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr] lg:gap-8">
                    <m.div variants={fadeUp} custom={0} className="max-w-sm">
                        <div className="mb-5 flex items-center gap-3">
                            <SmartSplitLogo className="h-10 w-10" />
                            <span className="font-mier text-xl font-semibold tracking-tight">SmartSplit</span>
                        </div>
                        <p className="text-sm leading-relaxed text-gray-600 dark:text-white/55 sm:text-base">
                            The smartest way to split rent, trips, and everyday expenses — without spreadsheets or awkward follow-ups.
                        </p>
                        
                        <div className="mt-8">
                            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-white/40">Newsletter</p>
                            <p className="mb-4 text-xs text-gray-600 dark:text-white/45">Get weekly smart spending tips and product updates.</p>
                            {subscribed ? (
                                <m.div 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/20 p-3 rounded-xl border border-emerald-200/50 dark:border-emerald-800/30 max-w-[280px]"
                                >
                                    <Check className="h-4 w-4 shrink-0 text-emerald-500" />
                                    <span>Awesome! You've subscribed.</span>
                                </m.div>
                            ) : (
                                <form onSubmit={handleSubscribe} className="relative flex items-center max-w-[280px]">
                                    <input
                                        type="email"
                                        required
                                        placeholder="your@email.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        disabled={submitting}
                                        className="w-full rounded-xl border border-gray-300 dark:border-white/10 bg-gray-50 dark:bg-white/5 py-2 pl-4 pr-10 text-sm text-gray-900 placeholder-gray-400 dark:placeholder-white/35 focus:border-[#f96b00] focus:ring-1 focus:ring-[#f96b00] dark:text-[#f2f2ed] dark:focus:border-[#d4ff00] dark:focus:ring-[#d4ff00] outline-none transition-all duration-200"
                                    />
                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="absolute right-1 p-1.5 rounded-lg bg-gray-900 text-white dark:bg-white dark:text-gray-900 hover:bg-[#f96b00] dark:hover:bg-[#d4ff00] hover:text-black dark:hover:text-black transition-colors duration-200 disabled:opacity-50"
                                        aria-label="Subscribe"
                                    >
                                        {submitting ? (
                                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                        ) : (
                                            <Send className="h-3.5 w-3.5" />
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>

                        <FlipMotionButton
                            type="button"
                            whileTap={{ scale: 0.98 }}
                            onClick={() => router.push('/register')}
                            className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#f96b00] px-5 py-2.5 text-sm font-bold text-black transition-colors hover:bg-[#de6800] dark:bg-[#d4ff00] dark:text-gray-900 dark:hover:bg-[#d4ff00]/90"
                        >
                            Get started free
                            <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
                        </FlipMotionButton>
                    </m.div>

                    <m.div variants={fadeUp} custom={1}>
                        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-white/40">Product</p>
                        <ul className="flex flex-col gap-2.5 text-sm">
                            <li>
                                <Link href="/trips" className="text-gray-600 dark:text-white/65 transition-colors hover:text-[#f96b00] dark:hover:text-[#d4ff00]">
                                    Trip expenses
                                </Link>
                            </li>
                            <li>
                                <Link href="/dashboard" className="text-gray-600 dark:text-white/65 transition-colors hover:text-[#f96b00] dark:hover:text-[#d4ff00]">
                                    Dashboard & settlements
                                </Link>
                            </li>
                            <li>
                                <Link href="/daily-expenses" className="text-gray-600 dark:text-white/65 transition-colors hover:text-[#f96b00] dark:hover:text-[#d4ff00]">
                                    Daily spending
                                </Link>
                            </li>
                            <li>
                                <Link href="/activities" className="text-gray-600 dark:text-white/65 transition-colors hover:text-[#f96b00] dark:hover:text-[#d4ff00]">
                                    Activities & outings
                                </Link>
                            </li>
                            <li>
                                <Link href="/bills" className="text-gray-600 dark:text-white/65 transition-colors hover:text-[#f96b00] dark:hover:text-[#d4ff00]">
                                    Bills & subscriptions
                                </Link>
                            </li>
                            <li>
                                <Link href="/sips" className="text-gray-600 dark:text-white/65 transition-colors hover:text-[#f96b00] dark:hover:text-[#d4ff00]">
                                    Smart Splits
                                </Link>
                            </li>
                        </ul>
                    </m.div>

                    <m.div variants={fadeUp} custom={2}>
                        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-white/40">Features</p>
                        <ul className="flex flex-col gap-2.5 text-sm text-gray-600 dark:text-white/65">
                            <li className="hover:text-[#f96b00] dark:hover:text-[#d4ff00] transition-colors cursor-default">Real-time settling</li>
                            <li className="hover:text-[#f96b00] dark:hover:text-[#d4ff00] transition-colors cursor-default">Smart reminders</li>
                            <li className="hover:text-[#f96b00] dark:hover:text-[#d4ff00] transition-colors cursor-default">Multi-currency support</li>
                            <li className="hover:text-[#f96b00] dark:hover:text-[#d4ff00] transition-colors cursor-default">Activity timelines</li>
                            <li className="hover:text-[#f96b00] dark:hover:text-[#d4ff00] transition-colors cursor-default">Group chats</li>
                        </ul>
                    </m.div>

                    <m.div variants={fadeUp} custom={3}>
                        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-white/40">Company</p>
                        <ul className="flex flex-col gap-2.5 text-sm">
                            <li>
                                <a href="#" className="text-gray-600 dark:text-white/65 transition-colors hover:text-[#f96b00] dark:hover:text-[#d4ff00]">
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 dark:text-white/65 transition-colors hover:text-[#f96b00] dark:hover:text-[#d4ff00] inline-flex items-center gap-1.5">
                                    Careers
                                    <span className="inline-flex items-center rounded-md bg-[#f96b00]/10 px-1.5 py-0.5 text-[10px] font-medium text-[#f96b00] ring-1 ring-inset ring-[#f96b00]/20 dark:bg-[#d4ff00]/10 dark:text-[#d4ff00] dark:ring-[#d4ff00]/20">
                                        Hiring
                                    </span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 dark:text-white/65 transition-colors hover:text-[#f96b00] dark:hover:text-[#d4ff00]">
                                    Blog
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-600 dark:text-white/65 transition-colors hover:text-[#f96b00] dark:hover:text-[#d4ff00]">
                                    Press kit
                                </a>
                            </li>
                            <li>
                                <Link href="/admin" className="text-gray-600 dark:text-white/65 transition-colors hover:text-[#f96b00] dark:hover:text-[#d4ff00]">
                                    Admin portal
                                </Link>
                            </li>
                        </ul>
                    </m.div>

                    <m.div variants={fadeUp} custom={4}>
                        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-white/40">Support</p>
                        <ul className="flex flex-col gap-2.5 text-sm text-gray-600 dark:text-white/65 mb-6">
                            <li>
                                <a
                                    href="mailto:hello@smartsplit.app"
                                    className="inline-flex items-center gap-2 font-medium text-[#f96b00] transition-colors hover:text-[#de6800] dark:text-[#d4ff00] dark:hover:text-[#e8ff4d]"
                                >
                                    <Mail className="h-4 w-4" strokeWidth={1.5} />
                                    hello@smartsplit.app
                                </a>
                            </li>
                            <li>
                                <a href="#" className="transition-colors hover:text-[#f96b00] dark:hover:text-[#d4ff00]">
                                    Help Center / FAQs
                                </a>
                            </li>
                            <li>
                                <a href="#" className="transition-colors hover:text-[#f96b00] dark:hover:text-[#d4ff00]">
                                    Developer API
                                </a>
                            </li>
                            <li>
                                <a href="#" className="transition-colors hover:text-[#f96b00] dark:hover:text-[#d4ff00] inline-flex items-center gap-1.5">
                                    System status
                                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                </a>
                            </li>
                        </ul>

                        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-white/40">Legal</p>
                        <ul className="flex flex-col gap-2 text-sm text-gray-600 dark:text-white/65">
                            <li>
                                <a href="#" className="transition-colors hover:text-[#f96b00] dark:hover:text-[#d4ff00]">
                                    Privacy policy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="transition-colors hover:text-[#f96b00] dark:hover:text-[#d4ff00]">
                                    Terms of service
                                </a>
                            </li>
                        </ul>
                    </m.div>
                </m.div>

                <m.div
                    variants={fadeUp}
                    custom={5}
                    className="mt-14 flex flex-col items-center justify-between gap-6 border-t border-gray-200/70 dark:border-white/10 pt-8 text-xs text-gray-500 dark:text-white/40 sm:flex-row sm:text-sm"
                >
                    <div className="flex flex-col gap-1 items-center sm:items-start">
                        <p>© {new Date().getFullYear()} SmartSplit. All rights reserved.</p>
                        <p className="text-gray-400 dark:text-white/30 text-[11px]">Bill splitting, without the drama.</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <m.a 
                            href="https://github.com" 
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.15, rotate: 5 }}
                            className="p-2 rounded-full bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-white/60 hover:text-black dark:hover:text-white hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
                        >
                            <Github className="h-4 w-4" />
                        </m.a>
                        <m.a 
                            href="https://twitter.com" 
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.15, rotate: -5 }}
                            className="p-2 rounded-full bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-white/60 hover:text-[#f96b00] dark:hover:text-[#d4ff00] hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
                        >
                            <Twitter className="h-4 w-4" />
                        </m.a>
                        <m.a 
                            href="https://linkedin.com" 
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.15, rotate: 5 }}
                            className="p-2 rounded-full bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-white/60 hover:text-[#f96b00] dark:hover:text-[#d4ff00] hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
                        >
                            <Linkedin className="h-4 w-4" />
                        </m.a>
                        <m.a 
                            href="https://instagram.com" 
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.15, rotate: -5 }}
                            className="p-2 rounded-full bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-white/60 hover:text-[#f96b00] dark:hover:text-[#d4ff00] hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
                        >
                            <Instagram className="h-4 w-4" />
                        </m.a>
                    </div>

                    <p className="text-center sm:text-right text-[11px] text-gray-400 dark:text-white/30">
                        Made with ❤️ for modern groups.
                    </p>
                </m.div>
            </m.div>
        </footer>
    );
};

export default Footer;
