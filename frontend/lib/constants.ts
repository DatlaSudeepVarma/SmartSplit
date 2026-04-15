import {
    Plane, Utensils, Film, Gamepad2, PiggyBank, TrendingUp, Car, Home,
    Pizza, Coffee, HelpCircle, ShoppingBag, Wallet, Sun, Moon, Wine,
    MoreHorizontal
} from 'lucide-react';


import { Currency } from '../types';

export const CURRENCIES: Record<Currency, string> = {
    USD: '$',
    INR: '₹',
    EUR: '€',
    GBP: '£',
    AED: '.د.إ'
};

export const TRIP_ICONS = {
    plane: Plane,
    utensils: Utensils,
    film: Film,
    gamepad: Gamepad2,
    piggy: PiggyBank,
    trending: TrendingUp,
    wallet: Wallet
};

export const CATEGORY_STYLES: Record<string, { icon: React.ElementType, bg: string, color: string, gif: string }> = {
    Food: { icon: Pizza, bg: 'bg-red-100 dark:bg-red-900/30', color: 'text-red-600 dark:text-red-400', gif: '/food.gif' },
    Travel: { icon: Car, bg: 'bg-blue-100 dark:bg-blue-900/30', color: 'text-blue-600 dark:text-blue-400', gif: '/travel.gif' },
    Rent: { icon: Home, bg: 'bg-purple-100 dark:bg-purple-900/30', color: 'text-purple-600 dark:text-purple-400', gif: '/rent.gif' },
    Entertainment: { icon: Film, bg: 'bg-pink-100 dark:bg-pink-900/30', color: 'text-pink-600 dark:text-pink-400', gif: '/entertainment.gif' },
    Shopping: { icon: ShoppingBag, bg: 'bg-amber-100 dark:bg-amber-900/30', color: 'text-amber-600 dark:text-amber-400', gif: '/shopping.gif' },
    Games: { icon: Gamepad2, bg: 'bg-cyan-100 dark:bg-cyan-900/30', color: 'text-cyan-600 dark:text-cyan-400', gif: '/games.gif' },
    Others: { icon: HelpCircle, bg: 'bg-indigo-100 dark:bg-indigo-900/30', color: 'text-indigo-600 dark:text-indigo-400', gif: '/Others.gif' },
    Payment: { icon: Coffee, bg: 'bg-emerald-100 dark:bg-emerald-900/30', color: 'text-emerald-600 dark:text-emerald-400', gif: '/Others.gif' }
};

export const getCategoryStyles = (category: string) => {
    return CATEGORY_STYLES[category] || CATEGORY_STYLES['Others'];
};

export const DAILY_EXPENSE_ICONS: Record<string, React.ElementType> = {
    Sun: Sun,
    Utensils: Utensils,
    Moon: Moon,
    Coffee: Coffee,
    Wine: Wine,
    ShoppingBag: ShoppingBag,
    MoreHorizontal: MoreHorizontal,
    Pizza: Pizza,
    Car: Car,
    Zap: HelpCircle,
    Home: Home,
    Frown: HelpCircle,
    Heart: HelpCircle,
    Gift: HelpCircle,
};
