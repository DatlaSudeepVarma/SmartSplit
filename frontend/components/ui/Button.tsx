"use client";

import React from 'react';
import { Loader2 } from 'lucide-react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof HTMLMotionProps<"button">> {
    variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'ghost';
    isLoading?: boolean;
    children?: React.ReactNode;
}

// Combine button props with motion props
type CombinedProps = ButtonProps & Omit<HTMLMotionProps<"button">, "children">;

const Button = ({ children, variant = 'primary', className = '', isLoading = false, ...props }: CombinedProps) => {
  const base = "px-6 py-3.5 rounded-xl font-mier font-semibold transition-colors duration-200 flex items-center justify-center gap-2 focus:ring-4 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed text-base md:text-lg";
  const variants = {
    primary: "bg-brand-blue text-white hover:bg-brand-skyblue shadow-lg shadow-brand-blue/20 focus:ring-brand-blue/50 dark:shadow-none",
    success: "bg-brand-green text-gray-900 hover:brightness-110 shadow-lg shadow-brand-green/20 focus:ring-brand-green/50 dark:shadow-none",
    secondary: "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:border-brand-blue/30 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-750 focus:ring-gray-200 dark:focus:ring-gray-700 shadow-sm",
    danger: "bg-brand-orange/10 text-brand-orange hover:bg-brand-orange/20 dark:bg-brand-orange/20 dark:hover:bg-brand-orange/30 focus:ring-brand-orange/30",
    ghost: "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 focus:ring-gray-200 dark:focus:ring-gray-700"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${base} ${variants[variant]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && <Loader2 className="animate-spin" size={20} />}
      {children}
    </motion.button>
  );
};

export default Button;
