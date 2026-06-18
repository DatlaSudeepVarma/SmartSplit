"use client";

import React from 'react';
import { SITE_FRAME_BORDER_COLOR } from '../../lib/siteFrame';

type NavTabChromeProps = {
    children: React.ReactNode;
    navClassName: string;
};

/** Top frame rail + navbar tab (flush, no scoop notches). */
const NavTabChrome = ({ children, navClassName }: NavTabChromeProps) => (
    <div className="flex w-full items-start">
        <div className={`h-0 min-w-0 flex-1 border-t ${SITE_FRAME_BORDER_COLOR}`} />

        <nav className={`nav-tab-shell shrink-0 ${navClassName}`}>
            {children}
        </nav>

        <div className={`h-0 min-w-0 flex-1 border-t ${SITE_FRAME_BORDER_COLOR}`} />
    </div>
);

export default NavTabChrome;
