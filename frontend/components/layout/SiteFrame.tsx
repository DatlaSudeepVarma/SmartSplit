"use client";

import {
    SITE_FRAME_BORDER,
    SITE_FRAME_INSET,
    SITE_FRAME_RADIUS,
} from '../../lib/siteFrame';

/**
 * Fixed rounded frame with an opaque gutter mat.
 * Content scrolls underneath the mat + border instead of bleeding into the corners.
 */
const SiteFrame = () => (
    <div
        aria-hidden
        className={`site-frame-mat pointer-events-none fixed z-[90] ${SITE_FRAME_INSET} ${SITE_FRAME_RADIUS} ${SITE_FRAME_BORDER}`}
    />
);

export default SiteFrame;
