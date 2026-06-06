"use client";

import React from 'react';
import { m, type HTMLMotionProps } from 'framer-motion';

interface CardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
    children: React.ReactNode;
}

const Card = ({ children, className = '', onClick, ...rest }: CardProps) => (
    <m.div
        onClick={onClick}
        whileHover={{ y: onClick ? -6 : -3, transition: { duration: 0.25, ease: 'easeOut' } }}
        whileTap={onClick ? { scale: 0.98 } : undefined}
        className={`
            group relative overflow-hidden
            bg-white dark:bg-gray-800 rounded-[32px] p-6 sm:p-8
            border border-gray-100/80 dark:border-gray-700/80
            shadow-sm hover:shadow-xl hover:border-brand-blue/25 dark:hover:border-brand-blue/35
            transition-[box-shadow,border-color] duration-300
            ${onClick ? 'cursor-pointer hover:shadow-2xl' : ''}
            ${className}
        `}
        {...rest}
    >
        <div
            aria-hidden
            className="pointer-events-none absolute -top-20 -right-20 h-48 w-48 rounded-full bg-gradient-to-br from-brand-blue/15 via-brand-skyblue/5 to-transparent blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
        <div className="relative">{children}</div>
    </m.div>
);

export default Card;
