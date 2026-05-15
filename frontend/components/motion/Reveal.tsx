"use client";

import React from 'react';
import { m } from 'framer-motion';
import { fadeUp, viewportOnce } from '../../lib/motion';

type RevealProps = {
    children: React.ReactNode;
    className?: string;
    delay?: number;
};

export default function Reveal({ children, className = '', delay = 0 }: RevealProps) {
    return (
        <m.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            custom={delay}
            variants={fadeUp}
            className={className}
        >
            {children}
        </m.div>
    );
}
