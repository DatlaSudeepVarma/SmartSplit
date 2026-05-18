"use client";

import React, { useContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeftRight, Calculator as CalcIcon, Shield, Menu, X } from 'lucide-react';
import SmartSplitLogo from '../ui/SmartSplitLogo';
import { FlipButton } from '../ui/Text3DFlip';
import { AnimatedThemeToggler } from '../ui/animated-theme-toggler';
import CalculatorModal from '../modals/CalculatorModal';
import CurrencyConverterModal from '../modals/CurrencyConverterModal';
import { AuthContext, ThemeContext, CurrencyContext, SplashContext } from '../../context/AppContext';
import { CURRENCIES } from '../../lib/constants';
import { Currency } from '../../types';

const SCROLL_THRESHOLD = 24;

export type NavbarVariant = "fixed" | "heroInset" | "contained";

type NavbarProps = {
    variant?: NavbarVariant;
};

const Navbar = ({ variant = "fixed" }: NavbarProps) => {
    const isInset = variant === "heroInset";
    const isContained = variant === "contained";
    const { user, isAuthenticated } = useContext(AuthContext);
    const { theme, toggleTheme } = useContext(ThemeContext);
    const { currency, setCurrency } = useContext(CurrencyContext);
    const { splashFinished } = useContext(SplashContext);
    const router = useRouter();
    const [showCalc, setShowCalc] = useState(false);
    const [showConv, setShowConv] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const onScroll = useCallback(() => {
        setScrolled(typeof window !== 'undefined' && window.scrollY > SCROLL_THRESHOLD);
    }, []);

    useEffect(() => {
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, [onScroll]);

    const goHome = () => (isAuthenticated ? router.push('/dashboard') : router.push('/'));

    const iconBtn =
        'rounded-md p-2 text-gray-600 transition-all hover:bg-black/5 hover:text-brand-blue dark:text-white/70 dark:hover:bg-white/10 dark:hover:text-white';

    const toolButtons = (
        <>
            <button
                type="button"
                data-calc-trigger
                onClick={() => {
                    setShowConv(false);
                    setShowCalc((open) => !open);
                }}
                className={`${iconBtn} ${showCalc ? 'bg-black/10 text-brand-blue dark:bg-white/15 dark:text-white' : ''}`}
                title="Calculator"
                aria-expanded={showCalc}
            >
                <CalcIcon size={18} className="shrink-0" />
            </button>
            <button
                type="button"
                onClick={() => {
                    setShowCalc(false);
                    setShowConv(true);
                }}
                className={iconBtn}
                title="Currency Converter"
            >
                <ArrowLeftRight size={18} className="shrink-0" />
            </button>
        </>
    );

    const currencySelect = (
        <label className="flex items-center gap-1.5 text-xs font-bold text-gray-700 dark:text-white/70">
            <span className="hidden uppercase tracking-wide text-gray-500 sm:inline dark:text-white/45">CCY</span>
            <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as Currency)}
                className="max-w-[3.5rem] cursor-pointer appearance-none bg-transparent py-0.5 pr-0.5 text-xs font-black text-gray-800 outline-none transition-all hover:text-brand-green dark:text-white/90 dark:hover:text-[#d4ff00]"
            >
                {Object.keys(CURRENCIES).map((c) => (
                    <option key={c} value={c} className="bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
                        {c}
                    </option>
                ))}
            </select>
        </label>
    );

    const themeToggle = (
        <motion.div className="flex scale-110 items-center justify-center">
            <AnimatedThemeToggler
                isDark={theme === 'dark'}
                onToggle={toggleTheme}
            />
        </motion.div>
    );

    const shellClassFixed = scrolled
        ? 'border-gray-200/90 bg-white/90 shadow-lg ring-1 ring-black/5 dark:border-white/15 dark:bg-[#0a0a0a]/90 dark:ring-white/10'
        : 'border-gray-200/70 bg-white/70 shadow-md ring-1 ring-black/[0.04] dark:border-white/10 dark:bg-[#0a0a0a]/75 dark:ring-white/5';

    const shellClassInset = scrolled
        ? 'border-gray-200/90 bg-white/95 shadow-xl dark:border-white/15 dark:bg-[#0a0a0a]/95'
        : 'border-gray-200/80 bg-white/80 shadow-lg dark:border-white/12 dark:bg-[#0a0a0a]/80';

    const shellClassContained = scrolled
        ? 'border-gray-200 bg-white shadow-xl dark:border-white/15 dark:bg-[#0a0a0a]'
        : 'border-gray-200/50 bg-white shadow-lg dark:border-white/10 dark:bg-[#0a0a0a]';

    const shellClass = isContained ? shellClassContained : (isInset ? shellClassInset : shellClassFixed);

    const navClassName = [
        'pointer-events-auto flex items-center transition-all duration-300',
        isContained
            ? 'sticky top-0 z-50 mx-auto w-full max-w-[720px] rounded-b-2xl border-x border-b px-5 py-2.5 sm:px-8 sm:py-3'
            : (isInset
                ? 'relative mx-auto w-[min(82vw,26rem)] rounded-full border px-6 py-2.5 backdrop-blur-md sm:py-3'
                : 'relative mx-auto max-w-[17.5rem] rounded-xl border px-2.5 py-2 backdrop-blur-xl sm:max-w-[22rem] sm:rounded-2xl sm:px-3.5 sm:py-2.5 dark:backdrop-blur-2xl'),
        shellClass,
    ].join(' ');

    const headerClassName = isContained
        ? 'sticky top-0 z-50 w-full'
        : (isInset
            ? 'pointer-events-none fixed inset-x-0 top-4 z-[100] flex w-full justify-center px-4 sm:top-8'
            : 'pointer-events-none fixed inset-x-0 top-3 z-[100] px-3 sm:top-4 sm:px-5');

    return (
        <>
            {splashFinished && (
                <motion.header
                    initial={isContained ? { opacity: 0 } : { y: -16, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className={headerClassName}
                >
                    <nav
                        className={navClassName}
                    >
                        {/* Left: calculator, converter, currency */}
                        <div className="flex min-w-0 max-w-[42%] flex-1 items-center justify-start gap-1 sm:max-w-none sm:gap-1.5">
                            <div className="flex items-center rounded-lg border border-gray-200/60 bg-gray-50/90 p-1 dark:border-white/10 dark:bg-white/[0.06]">
                                {toolButtons}
                            </div>
                            <div className="hidden h-5 w-px bg-gray-200/90 sm:block dark:bg-white/15" />
                            {currencySelect}
                        </div>

                        {/* Center: logo + text */}
                        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 justify-center">
                            <button
                                type="button"
                                onClick={goHome}
                                className="group flex items-center gap-1.5 sm:gap-2"
                            >
                                <SmartSplitLogo className="h-7 w-7 shrink-0 sm:h-8 sm:w-8" />
                                <span className="font-mier text-sm font-semibold tracking-tight text-gray-900 dark:text-white sm:text-base">
                                    SmartSplit
                                </span>
                            </button>
                        </div>

                        {/* Right: theme + sign in / account */}
                        <div className="flex min-w-0 max-w-[42%] flex-1 items-center justify-end gap-1 sm:max-w-none sm:gap-1.5">
                            <div className="hidden items-center sm:flex">{themeToggle}</div>
                            {isAuthenticated && user ? (
                                <>
                                    {user.isAdmin && (
                                        <button
                                            type="button"
                                            onClick={() => router.push('/admin')}
                                            className="rounded-md p-2 text-gray-500 hover:bg-purple-500/10 hover:text-purple-500 dark:text-gray-400"
                                            title="Admin"
                                        >
                                            <Shield size={18} />
                                        </button>
                                    )}
                                    {!user.isAdmin && (
                                        <button
                                            type="button"
                                            onClick={() => router.push('/profile')}
                                            className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-tr from-brand-blue to-brand-orange text-[11px] font-black text-white shadow-sm sm:h-9 sm:w-9 sm:text-sm"
                                        >
                                            {user.name.charAt(0).toUpperCase()}
                                        </button>
                                    )}
                                </>
                            ) : (
                                <FlipButton
                                    type="button"
                                    onClick={() => router.push('/login')}
                                    className="rounded-lg px-3 py-1.5 text-sm font-semibold text-gray-800 transition-colors hover:bg-black/[0.05] dark:text-white dark:hover:bg-white/10 sm:px-3.5 sm:text-base"
                                >
                                    Sign in
                                </FlipButton>
                            )}
                            <button
                                type="button"
                                className="rounded-lg p-2 text-gray-800 hover:bg-black/[0.05] sm:hidden dark:text-white dark:hover:bg-white/10"
                                onClick={() => setMobileOpen((o) => !o)}
                                aria-expanded={mobileOpen}
                                aria-label={mobileOpen ? 'Close menu' : 'Menu'}
                            >
                                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                            </button>
                        </div>
                    </nav>
                </motion.header>
            )}

            <AnimatePresence>
                {splashFinished && mobileOpen && (
                    <div className="pointer-events-none fixed inset-0 z-[110] sm:hidden">
                        <motion.button
                            type="button"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="pointer-events-auto absolute inset-0 bg-black/45 dark:bg-black/55"
                            aria-label="Close menu"
                            onClick={() => setMobileOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.2 }}
                            className={`pointer-events-auto absolute left-4 right-4 mx-auto max-w-[17.5rem] overflow-hidden rounded-xl border border-gray-200/80 bg-white/95 p-3 shadow-xl backdrop-blur-xl dark:border-white/12 dark:bg-[#0c0c0c]/95 sm:left-6 sm:right-6 ${isInset ? 'top-[calc(0.75rem+3.5rem+0.75rem)] sm:top-[calc(1rem+3.5rem+0.75rem)]' : 'top-[3.75rem]'}`}
                        >
                            <div className="flex items-center justify-between border-b border-gray-200/60 pb-3 dark:border-white/10">
                                <span className="text-[10px] font-bold uppercase tracking-wide text-gray-500">Theme</span>
                                {themeToggle}
                            </div>
                            <div className="flex items-center justify-between gap-2 border-b border-gray-200/60 py-3 dark:border-white/10">
                                <span className="text-[10px] font-bold uppercase tracking-wide text-gray-500">Tools</span>
                                <div className="flex items-center gap-1 rounded-lg border border-gray-200/50 bg-gray-100/90 p-1 dark:border-white/10 dark:bg-white/[0.06]">
                                    {toolButtons}
                                </div>
                            </div>
                            <div className="flex items-center justify-between py-3">
                                <span className="text-[10px] font-bold uppercase tracking-wide text-gray-500">Currency</span>
                                {currencySelect}
                            </div>
                            {!isAuthenticated && (
                                <FlipButton
                                    type="button"
                                    onClick={() => {
                                        setMobileOpen(false);
                                        router.push('/login');
                                    }}
                                    className="w-full rounded-lg bg-gray-100 py-2.5 text-sm font-semibold text-gray-900 dark:bg-white/10 dark:text-white"
                                >
                                    Sign in
                                </FlipButton>
                            )}
                            {isAuthenticated && user && !user.isAdmin && (
                                <FlipButton
                                    type="button"
                                    onClick={() => {
                                        setMobileOpen(false);
                                        router.push('/profile');
                                    }}
                                    className="w-full rounded-lg bg-gray-100 py-2.5 text-sm font-semibold text-gray-900 dark:bg-white/10 dark:text-white"
                                >
                                    Profile
                                </FlipButton>
                            )}
                            {isAuthenticated && user?.isAdmin && (
                                <FlipButton
                                    type="button"
                                    onClick={() => {
                                        setMobileOpen(false);
                                        router.push('/admin');
                                    }}
                                    className="w-full rounded-lg bg-purple-500/10 py-2.5 text-sm font-semibold text-purple-700 dark:text-purple-300"
                                >
                                    Admin
                                </FlipButton>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
            <CalculatorModal isOpen={showCalc} onClose={() => setShowCalc(false)} />
            <CurrencyConverterModal isOpen={showConv} onClose={() => setShowConv(false)} />
        </>
    );
};

export default Navbar;
