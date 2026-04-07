"use client";

import React from 'react';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';

interface ScrollRevealProps {
    children: React.ReactNode;
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
    delay?: number;
    duration?: number;
    distance?: number;
    className?: string;
    once?: boolean;
}

export const ScrollReveal = ({ 
    children, 
    direction = 'up', 
    delay = 0, 
    duration = 0.6, 
    distance = 40,
    className = "",
    once = true
}: ScrollRevealProps) => {
    const directions = {
        up: { y: distance },
        down: { y: -distance },
        left: { x: distance },
        right: { x: -distance },
        none: {}
    };

    const variants: Variants = {
        hidden: { 
            opacity: 0, 
            ...directions[direction]
        },
        visible: { 
            opacity: 1, 
            x: 0, 
            y: 0,
            transition: { 
                duration, 
                delay, 
                ease: [0.25, 0.1, 0.25, 1] 
            }
        }
    };

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once, margin: "-100px" }}
            variants={variants}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export default ScrollReveal;
