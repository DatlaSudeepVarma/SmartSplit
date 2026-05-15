"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, m } from 'framer-motion';
import { pageVariants } from '../../lib/motion';

export default function PageTransition({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <AnimatePresence mode="wait" initial={false}>
            <m.div
                key={pathname}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
            >
                {children}
            </m.div>
        </AnimatePresence>
    );
}
