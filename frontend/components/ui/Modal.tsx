"use client";

import React, { useEffect, useRef } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { X } from 'lucide-react';
import Lenis from 'lenis';

const Modal = ({ isOpen, onClose, title, children, footer, maxWidth = 'max-w-xl' }: { isOpen: boolean, onClose: () => void, title: string, children: React.ReactNode, footer?: React.ReactNode, maxWidth?: string }) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';

            if (scrollRef.current) {
                lenisRef.current = new Lenis({
                    wrapper: scrollRef.current,
                    content: scrollRef.current,
                    duration: 1.2,
                    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                    smoothWheel: true,
                });

                const raf = (time: number) => {
                    lenisRef.current?.raf(time);
                    requestAnimationFrame(raf);
                };
                requestAnimationFrame(raf);
            }
        } else {
            document.body.style.overflow = '';
            lenisRef.current?.destroy();
            lenisRef.current = null;
        }

        return () => {
            document.body.style.overflow = '';
            lenisRef.current?.destroy();
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <m.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/40 p-4 backdrop-blur-md sm:p-6"
                    onClick={onClose}
                >
                    <m.div
                        initial={{ opacity: 0, scale: 0.95, y: 12 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 12 }}
                        transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                        className={`relative flex w-full ${maxWidth} flex-col overflow-hidden rounded-[28px] border border-gray-100 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-800`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex shrink-0 items-center justify-between border-b border-gray-50 p-5 dark:border-gray-750 sm:p-7">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white sm:text-2xl">{title}</h3>
                            <button onClick={onClose} className="rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700">
                                <X size={24} />
                            </button>
                        </div>
                        <div
                            ref={scrollRef}
                            className="custom-scrollbar max-h-[80vh] overflow-x-hidden overflow-y-auto p-4 sm:p-6"
                            data-lenis-prevent
                        >
                            <div className={`will-change-transform ${footer ? 'pb-24' : ''}`}>
                                {children}
                            </div>
                        </div>
                        {footer && (
                            <div className="pointer-events-none absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white/95 to-transparent p-4 pt-10 dark:from-gray-800 dark:via-gray-800/95 sm:p-6">
                                <div className="pointer-events-auto">{footer}</div>
                            </div>
                        )}
                    </m.div>
                </m.div>
            )}
        </AnimatePresence>
    );
};

export default Modal;
