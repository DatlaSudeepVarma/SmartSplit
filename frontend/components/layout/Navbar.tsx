"use client";

import React, { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Moon, Sun, ArrowLeftRight, Calculator as CalcIcon } from 'lucide-react';
import Image from 'next/image';
import SmartSplitLogo from '../ui/SmartSplitLogo';
import Button from '../ui/Button';
import CalculatorModal from '../modals/CalculatorModal';
import CurrencyConverterModal from '../modals/CurrencyConverterModal';
import { AuthContext, ThemeContext, CurrencyContext } from '../../context/AppContext';
import { CURRENCIES } from '../../lib/constants';
import { Currency } from '../../types';

const Navbar = () => {
    const { user, guestName } = useContext(AuthContext);
    const { theme, toggleTheme } = useContext(ThemeContext);
    const { currency, setCurrency } = useContext(CurrencyContext);
    const router = useRouter();
    const [showCalc, setShowCalc] = useState(false);
    const [showConv, setShowConv] = useState(false);

    return (
        <>
            <motion.header
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
                className="fixed top-6 left-0 right-0 z-50 px-4 sm:px-6 pointer-events-none"
            >
                <nav className="max-w-[1400px] mx-auto bg-white/30 dark:bg-gray-900/30 backdrop-blur-2xl border border-white/40 dark:border-white/10 shadow-[0_8px_32px_0_rgba(31,38,135,0.05)] dark:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] rounded-[32px] overflow-hidden pointer-events-auto transition-all duration-500 hover:bg-white/40 dark:hover:bg-gray-900/40 hover:border-white/60 dark:hover:border-white/20 hover:shadow-[0_12px_48px_0_rgba(31,38,135,0.1)] group">
                    <div className="px-5 sm:px-8 h-16 sm:h-20 flex justify-between items-center">
                        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => user ? router.push('/dashboard') : router.push('/')}>
                            <motion.div whileHover={{ rotate: 15, scale: 1.1 }}>
                                <Image
                                    src="/SmartSplit-PNG.png"
                                    alt="SmartSplit Logo"
                                    width={140}
                                    height={140}
                                    className="object-contain"
                                />
                            </motion.div>

                        </div>

                        <div className="flex items-center gap-3 sm:gap-6">
                            <div className="flex items-center gap-2 bg-gray-100/50 dark:bg-gray-800/50 p-1.5 rounded-2xl backdrop-blur-sm border border-gray-200/20 dark:border-gray-700/20">
                                <button onClick={() => setShowCalc(true)} className="p-2.5 text-gray-500 hover:text-brand-blue hover:bg-white dark:hover:bg-gray-700 rounded-xl transition-all shadow-sm hover:shadow-md" title="Calculator">
                                    <CalcIcon size={20} />
                                </button>
                                <button onClick={() => setShowConv(true)} className="p-2.5 text-gray-500 hover:text-brand-blue hover:bg-white dark:hover:bg-gray-700 rounded-xl transition-all shadow-sm hover:shadow-md" title="Currency Converter">
                                    <ArrowLeftRight size={20} />
                                </button>
                            </div>

                            <div className="hidden md:block h-8 w-px bg-gray-200/50 dark:bg-gray-800/50"></div>

                            <div className="relative group">
                                <select
                                    value={currency}
                                    onChange={(e) => setCurrency(e.target.value as Currency)}
                                    className="bg-transparent font-black text-gray-700 dark:text-gray-200 text-sm outline-none cursor-pointer hover:text-brand-blue transition-all appearance-none pr-1"
                                >
                                    {Object.keys(CURRENCIES).map(c => <option key={c} value={c} className="dark:bg-gray-900">{c}</option>)}
                                </select>
                            </div>

                            <button onClick={toggleTheme} className="p-2.5 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all border border-transparent hover:border-gray-200 dark:hover:border-gray-700">
                                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                            </button>

                            {user ? (
                                <div className="flex items-center gap-4 pl-4 border-l border-gray-200/50 dark:border-gray-800/50">
                                    <button onClick={() => router.push('/profile')} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-blue to-brand-green text-white flex items-center justify-center font-black shadow-lg shadow-brand-blue/20">
                                            {user.name.charAt(0).toUpperCase()}
                                        </div>
                                        <span className="font-bold text-gray-800 dark:text-gray-100 hidden md:block tracking-tight">{user.name}</span>
                                    </button>
                                </div>
                            ) : (
                                guestName ? (
                                    <div className="flex items-center gap-3 bg-brand-orange/10 px-5 py-2.5 rounded-2xl border border-brand-orange/20">
                                        <span className="text-xs text-brand-orange font-black uppercase tracking-widest">Guest: {guestName}</span>
                                    </div>
                                ) : (
                                    <Button onClick={() => router.push('/login')} className="hidden sm:flex py-3 px-8 text-sm font-black rounded-2xl shadow-xl shadow-brand-blue/20">Sign In</Button>
                                )
                            )}
                        </div>
                    </div>
                </nav>
            </motion.header>
            <CalculatorModal isOpen={showCalc} onClose={() => setShowCalc(false)} />
            <CurrencyConverterModal isOpen={showConv} onClose={() => setShowConv(false)} />
        </>
    );
};

export default Navbar;
