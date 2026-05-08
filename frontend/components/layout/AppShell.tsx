"use client";

import React, { useContext } from "react";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { AuthContext } from "../../context/AppContext";

export default function AppShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { isAuthenticated } = useContext(AuthContext);
    const isHome = pathname === "/";

    return (
        <>
            {!isHome && <Navbar />}
            <main className={isHome ? "min-h-screen pt-0" : "min-h-screen pt-14 sm:pt-16"}>{children}</main>
            {!isAuthenticated && <Footer />}
        </>
    );
}
