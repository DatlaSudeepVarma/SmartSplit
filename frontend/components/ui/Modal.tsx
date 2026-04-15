import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import Lenis from 'lenis';

const Modal = ({ isOpen, onClose, title, children, footer, maxWidth = 'max-w-xl' }: { isOpen: boolean, onClose: () => void, title: string, children: React.ReactNode, footer?: React.ReactNode, maxWidth?: string }) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';

            // Initialize local Lenis for the modal content
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

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-gray-950/40 backdrop-blur-md animate-in fade-in duration-200" onClick={onClose}>
            <div
                className={`bg-white dark:bg-gray-800 w-full ${maxWidth} rounded-[28px] shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col relative`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center p-5 sm:p-7 border-b border-gray-50 dark:border-gray-750 shrink-0">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{title}</h3>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors text-gray-500">
                        <X size={24} />
                    </button>
                </div>
                <div
                    ref={scrollRef}
                    className="p-4 sm:p-6 overflow-y-auto overflow-x-hidden max-h-[80vh] custom-scrollbar"
                    data-lenis-prevent
                >
                    <div className={`will-change-transform ${footer ? 'pb-24' : ''}`}>
                        {children}
                    </div>
                </div>
                {footer && (
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-white dark:from-gray-800 via-white/95 dark:via-gray-800/95 to-transparent pt-10 pointer-events-none">
                        <div className="pointer-events-auto">
                            {footer}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Modal;
