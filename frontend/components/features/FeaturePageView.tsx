"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { m } from 'framer-motion';
import {
    ArrowLeft,
    ArrowRight,
    Bell,
    Check,
    Clock,
    Globe,
    HandCoins,
    MessagesSquare,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Footer from '../layout/Footer';
import { FlipMotionButton } from '../ui/Text3DFlip';
import { fadeUp, staggerContainer } from '../../lib/motion';
import {
    FEATURES,
    FEATURE_BY_SLUG,
    type FeatureIconName,
    type FeatureSlug,
} from '../../lib/featuresContent';

const FEATURE_ICONS: Record<FeatureIconName, LucideIcon> = {
    'hand-coins': HandCoins,
    bell: Bell,
    globe: Globe,
    clock: Clock,
    'messages-square': MessagesSquare,
};

type FeaturePageViewProps = {
    slug: FeatureSlug;
};

export default function FeaturePageView({ slug }: FeaturePageViewProps) {
    const router = useRouter();
    const feature = FEATURE_BY_SLUG[slug];
    const Icon = FEATURE_ICONS[feature.iconName];
    const otherFeatures = FEATURES.filter((f) => f.slug !== feature.slug);

    return (
        <div className="min-h-dvh bg-gray-50 text-gray-900 transition-colors duration-200 dark:bg-[#050505] dark:text-[#f2f2ed]">
            <m.article
                className="mx-auto max-w-3xl px-4 py-12 sm:px-8 sm:py-16"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
            >
                <m.div variants={fadeUp} custom={0}>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900 dark:text-white/45 dark:hover:text-white"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to home
                    </Link>
                </m.div>

                <m.div variants={fadeUp} custom={1} className="mt-8 flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-gray-200 bg-white dark:border-white/10 dark:bg-white/[0.04]">
                        <Icon className="h-7 w-7 text-brand-green dark:text-[#d4ff00]" strokeWidth={1.25} />
                    </div>
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500 dark:text-white/45">
                            Feature
                        </p>
                        <h1 className="font-mier text-3xl font-semibold tracking-tight text-gray-900 dark:text-[#f2f2ed] sm:text-4xl">
                            {feature.title}
                        </h1>
                    </div>
                </m.div>

                <m.p
                    variants={fadeUp}
                    custom={2}
                    className="mt-6 text-xl font-medium leading-snug text-gray-800 dark:text-white/80 sm:text-2xl"
                >
                    {feature.tagline}
                </m.p>

                <m.p
                    variants={fadeUp}
                    custom={3}
                    className="mt-4 text-base leading-relaxed text-gray-600 dark:text-white/55 sm:text-lg"
                >
                    {feature.summary}
                </m.p>

                <m.section
                    variants={fadeUp}
                    custom={4}
                    className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 dark:border-white/10 dark:bg-white/[0.03] sm:rounded-3xl sm:p-8"
                >
                    <h2 className="font-mier text-lg font-semibold text-gray-900 dark:text-[#f2f2ed] sm:text-xl">
                        What this means
                    </h2>
                    <p className="mt-4 text-base leading-relaxed text-gray-600 dark:text-white/55 sm:text-lg">
                        {feature.whatItMeans}
                    </p>
                </m.section>

                <m.section variants={fadeUp} custom={5} className="mt-10">
                    <h2 className="font-mier text-lg font-semibold text-gray-900 dark:text-[#f2f2ed] sm:text-xl">
                        How it helps your group
                    </h2>
                    <ul className="mt-5 space-y-4">
                        {feature.highlights.map((item) => (
                            <li key={item} className="flex gap-3 text-sm leading-relaxed text-gray-600 dark:text-white/55 sm:text-base">
                                <Check
                                    className="mt-0.5 h-5 w-5 shrink-0 text-brand-green dark:text-[#d4ff00]"
                                    strokeWidth={2}
                                />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </m.section>

                <m.div variants={fadeUp} custom={6} className="mt-12 flex flex-wrap gap-4">
                    <FlipMotionButton
                        type="button"
                        whileTap={{ scale: 0.97 }}
                        onClick={() => router.push(feature.ctaHref)}
                        className="inline-flex items-center gap-2 rounded-full bg-brand-green px-7 py-3.5 text-sm font-bold text-gray-900 dark:bg-[#d4ff00] sm:text-base"
                    >
                        {feature.ctaLabel}
                        <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
                    </FlipMotionButton>
                    <FlipMotionButton
                        type="button"
                        whileTap={{ scale: 0.98 }}
                        onClick={() => router.push('/register')}
                        className="rounded-full border border-gray-300 px-7 py-3.5 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-50 dark:border-white/20 dark:text-[#f2f2ed] dark:hover:bg-white/10 sm:text-base"
                    >
                        Get started free
                    </FlipMotionButton>
                </m.div>

                <m.section variants={fadeUp} custom={7} className="mt-16 border-t border-gray-200 pt-10 dark:border-white/10">
                    <h2 className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500 dark:text-white/45">
                        More features
                    </h2>
                    <ul className="mt-5 flex flex-col gap-3">
                        {otherFeatures.map((item) => (
                            <li key={item.slug}>
                                <Link
                                    href={`/features/${item.slug}`}
                                    className="text-sm font-medium text-gray-700 transition-colors hover:text-brand-green dark:text-white/65 dark:hover:text-[#d4ff00] sm:text-base"
                                >
                                    {item.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </m.section>
            </m.article>

            <Footer />
        </div>
    );
}
