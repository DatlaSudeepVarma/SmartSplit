"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function AppShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isHome = pathname === "/";

    return (
        <>
            {!isHome && <Navbar />}
            <main className={isHome ? "min-h-screen pt-0" : "min-h-screen pt-14 sm:pt-16"}>{children}</main>
        </>
    );
}
