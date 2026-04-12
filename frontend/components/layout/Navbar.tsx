"use client";

import React, { useContext, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Moon, Sun, ArrowLeftRight, LogOut, Calculator as CalcIcon, Shield } from 'lucide-react';
import Image from 'next/image';
import Button from '../ui/Button';
import CalculatorModal from '../modals/CalculatorModal';
import CurrencyConverterModal from '../modals/CurrencyConverterModal';
import { AuthContext, ThemeContext, CurrencyContext } from '../../context/AppContext';
import { CURRENCIES } from '../../lib/constants';
import { Currency } from '../../types';

const Navbar = () => {
    const { user, guestName, logout } = useContext(AuthContext); // Added logout
    const { theme, toggleTheme } = useContext(ThemeContext);
    const { currency, setCurrency } = useContext(CurrencyContext);
    const router = useRouter();
    const pathname = usePathname();
    const [showCalc, setShowCalc] = useState(false);
    const [showConv, setShowConv] = useState(false);

    // After log in (on the dashboard), the navbar should not appear
    if (pathname.startsWith('/dashboard')) return null;

    const handleLogout = () => {
        logout();
        router.push('/');
        router.refresh();
    };

    return (
        <>
            <motion.header
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
                className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 pointer-events-none"
            >
                <nav className="max-w-4xl mx-auto bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-lg rounded-[28px] overflow-hidden pointer-events-auto transition-all duration-500 hover:shadow-xl group">
                    <div className="px-4 sm:px-6 h-14 flex justify-between items-center">
                        <div className="flex items-center gap-4 sm:gap-6">
                            {/* Logo */}
                            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => user ? router.push('/dashboard') : router.push('/')}>
                                <motion.div whileHover={{ scale: 1.05 }}>
                                    <Image
                                        src="/SmartSplit-PNG.png"
                                        alt="SmartSplit Logo"
                                        width={100}
                                        height={100}
                                        className="object-contain"
                                    />
                                </motion.div>
                            </div>

                            {/* Tools (Calculator / Converter) */}
                            <div className="flex items-center gap-1 bg-gray-100/50 dark:bg-gray-800/50 p-1 rounded-xl border border-gray-200/20 dark:border-gray-700/20 shadow-sm">
                                <button onClick={() => setShowCalc(true)} className="p-2 text-gray-500 hover:text-brand-blue hover:bg-white dark:hover:bg-gray-700 rounded-lg transition-all" title="Calculator">
                                    <CalcIcon size={18} />
                                </button>
                                <button onClick={() => setShowConv(true)} className="p-2 text-gray-500 hover:text-brand-blue hover:bg-white dark:hover:bg-gray-700 rounded-lg transition-all" title="Currency Converter">
                                    <ArrowLeftRight size={18} />
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 sm:gap-4">
                            <div className="hidden md:block h-6 w-px bg-gray-200/50 dark:bg-gray-800/50"></div>

                            <div className="relative group">
                                <select
                                    value={currency}
                                    onChange={(e) => setCurrency(e.target.value as Currency)}
                                    className="bg-transparent font-black text-gray-700 dark:text-gray-200 text-xs outline-none cursor-pointer hover:text-brand-blue transition-all appearance-none pr-1"
                                >
                                    {Object.keys(CURRENCIES).map(c => <option key={c} value={c} className="dark:bg-gray-900">{c}</option>)}
                                </select>
                            </div>

                            <button onClick={toggleTheme} className="p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all border border-transparent hover:border-gray-200 dark:hover:border-gray-700">
                                {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
                            </button>

                            {user ? (
                                <div className="flex items-center gap-2 pl-3 border-l border-gray-200/50 dark:border-gray-800/50">
                                    {user.isAdmin && (
                                        <button
                                            onClick={() => router.push('/admin')}
                                            className="p-2 text-gray-500 hover:text-purple-500 hover:bg-purple-500/10 rounded-lg transition-all"
                                            title="Admin Panel"
                                        >
                                            <Shield size={18} />
                                        </button>
                                    )}
                                    {!user.isAdmin && (
                                        <button onClick={() => router.push('/profile')} className="flex items-center gap-2 hover:opacity-80 transition-opacity group">
                                            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-blue to-brand-green text-white flex items-center justify-center font-black shadow-md group-hover:scale-105 transition-all text-xs">
                                                {user.name.charAt(0).toUpperCase()}
                                            </div>
                                            <span className="font-bold text-gray-800 dark:text-gray-100 hidden md:block tracking-tight text-xs">{user.name}</span>
                                        </button>
                                    )}
                                    <button
                                        onClick={handleLogout}
                                        className="p-1.5 text-gray-400 hover:text-brand-orange hover:bg-brand-orange/10 rounded-lg transition-all"
                                        title="Sign Out"
                                    >
                                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                            <LogOut size={18} />
                                        </motion.div>
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2 pl-3 border-l border-gray-200/50 dark:border-gray-800/50">
                                    <Button
                                        variant="ghost"
                                        onClick={() => router.push('/login')}
                                        className="py-1.5 px-3 text-xs font-black rounded-lg"
                                    >
                                        Login
                                    </Button>
                                    <Button
                                        onClick={() => router.push('/register')}
                                        className="py-2 px-4 text-xs font-black rounded-xl shadow-md border-none"
                                    >
                                        Register
                                    </Button>
                                </div>
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
