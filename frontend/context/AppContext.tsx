"use client";

import React, { createContext, useState, useEffect, useCallback } from 'react';
import { UserData, Currency } from '../types';
import { CURRENCIES } from '../lib/constants';
import { getUserStats } from '../lib/api/dashboard';
import { ApiError } from '../lib/api/client';

export const ThemeContext = createContext({ theme: 'light', toggleTheme: () => { } });
export const CurrencyContext = createContext({ currency: 'INR' as Currency, setCurrency: (_c: Currency) => { void _c; }, symbol: '₹' });
export const AuthContext = createContext({
    user: null as UserData | null,
    guestName: null as string | null,
    setGuestName: (_name: string | null) => { void _name; },
    login: (_u: UserData, _t: string) => { void _u; void _t; },
    logout: () => { },
    isAuthenticated: false,
    authReady: false,
});

/** Initial GIF loader must call `finishSplash` when done so the navbar can appear. */
export const SplashContext = createContext({
    splashFinished: false,
    finishSplash: () => {},
});

function clearStoredSession() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
}

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<UserData | null>(null);
    const [guestName, setGuestName] = useState<string | null>(null);
    const [currency, setCurrency] = useState<Currency>('INR');
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const [splashFinished, setSplashFinished] = useState(false);
    const [authReady, setAuthReady] = useState(false);
    const finishSplash = useCallback(() => setSplashFinished(true), []);

    const logout = useCallback(() => {
        clearStoredSession();
        setUser(null);
        setGuestName(null);
    }, []);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark' || savedTheme === 'light') {
            setTheme(savedTheme);
        } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setTheme('dark');
        }
    }, []);

    useEffect(() => {
        let cancelled = false;

        const restoreSession = async () => {
            const token = localStorage.getItem('token');
            const rawUser = localStorage.getItem('user');

            if (!token || !rawUser) {
                clearStoredSession();
                if (!cancelled) {
                    setUser(null);
                    setAuthReady(true);
                }
                return;
            }

            try {
                await getUserStats('');
                const parsed = JSON.parse(rawUser) as UserData;
                if (!cancelled) setUser(parsed);
            } catch (e) {
                if (e instanceof ApiError && (e.status === 401 || e.status === 403)) {
                    clearStoredSession();
                }
                if (!cancelled) setUser(null);
            } finally {
                if (!cancelled) setAuthReady(true);
            }
        };

        restoreSession();

        return () => {
            cancelled = true;
        };
    }, []);

    useEffect(() => {
        if (!splashFinished) {
            document.documentElement.className = 'light';
            return;
        }
        document.documentElement.className = theme;
    }, [theme, splashFinished]);

    const login = (u: UserData, t: string) => {
        localStorage.setItem('user', JSON.stringify(u));
        localStorage.setItem('token', t);
        setUser(u);
        setAuthReady(true);
    };

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    const isAuthenticated = authReady && !!user;

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <CurrencyContext.Provider value={{ currency, setCurrency, symbol: CURRENCIES[currency] }}>
                <AuthContext.Provider value={{ user, guestName, setGuestName, login, logout, isAuthenticated, authReady }}>
                    <SplashContext.Provider value={{ splashFinished, finishSplash }}>
                        {children}
                    </SplashContext.Provider>
                </AuthContext.Provider>
            </CurrencyContext.Provider>
        </ThemeContext.Provider>
    );
};
