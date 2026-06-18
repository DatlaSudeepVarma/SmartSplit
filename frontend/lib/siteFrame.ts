/** Fixed inset frame — equal margin on all four sides of the viewport. */
export const SITE_FRAME_INSET =
    'inset-2.5 sm:inset-3.5 md:inset-5';

export const SITE_FRAME_RADIUS =
    'rounded-[1rem] sm:rounded-[1.5rem] md:rounded-[1.75rem]';

export const SITE_FRAME_BORDER_COLOR = 'border-gray-300/70 dark:border-white/15';

export const SITE_FRAME_BORDER = `border ${SITE_FRAME_BORDER_COLOR}`;

/** Content clips flush to the inner frame edge (no extra inset padding). */
export const SITE_CONTENT_CLIP = 'site-content-clip';

/** Reserved for navbar tab (added later). */
export const SITE_FRAME_INSET_X =
    'left-2.5 right-2.5 sm:left-3.5 sm:right-3.5 md:left-5 md:right-5';

export const SITE_FRAME_INSET_TOP = 'top-2.5 sm:top-3.5 md:top-5';

export const SITE_NAV_TAB_BORDER = `border-x border-b ${SITE_FRAME_BORDER_COLOR}`;

export const SITE_FRAME_OUTER_BG = 'bg-gray-50 dark:bg-[#050505]';

export const SITE_NAV_WIDTH = 'w-[min(74vw,36rem)]';
