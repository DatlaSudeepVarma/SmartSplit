"use client";

import React, { useContext, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { AuthContext } from '../../context/AppContext';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { user, authReady } = useContext(AuthContext);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (authReady && !user) {
            const loginUrl = pathname ? `/login?next=${encodeURIComponent(pathname)}` : '/login';
            router.replace(loginUrl);
        }
    }, [authReady, user, router, pathname]);

    if (!authReady) {
        return null;
    }

    if (!user) {
        return null;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
