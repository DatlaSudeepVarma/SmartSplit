"use client";

import React from 'react';
import { m } from 'framer-motion';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

const Card = ({ children, className = '', onClick, ...rest }: CardProps) => (
    <m.div
        onClick={onClick}
        whileHover={onClick ? { y: -4, transition: { duration: 0.2 } } : undefined}
        whileTap={onClick ? { scale: 0.99 } : undefined}
        className={`bg-white dark:bg-gray-800 rounded-[32px] p-6 sm:p-8 transition-colors ${onClick ? 'cursor-pointer' : ''} ${className}`}
        {...rest}
    >
        {children}
    </m.div>
);

export default Card;
