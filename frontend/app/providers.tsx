"use client";

import React from 'react';
import { AppProvider } from "../context/AppContext";
import ErrorBoundary from "../components/ui/ErrorBoundary";
import MotionProvider from "../components/motion/MotionProvider";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ErrorBoundary>
            <MotionProvider>
                <AppProvider>
                    {children}
                </AppProvider>
            </MotionProvider>
        </ErrorBoundary>
    );
}
