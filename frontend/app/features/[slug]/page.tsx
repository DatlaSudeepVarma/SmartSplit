import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import FeaturePageView from '../../../components/features/FeaturePageView';
import {
    FEATURES,
    FEATURE_BY_SLUG,
    isFeatureSlug,
} from '../../../lib/featuresContent';

type PageProps = {
    params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
    return FEATURES.map((feature) => ({ slug: feature.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    if (!isFeatureSlug(slug)) {
        return { title: 'Feature | SmartSplit' };
    }

    const feature = FEATURE_BY_SLUG[slug];
    return {
        title: `${feature.title} | SmartSplit`,
        description: feature.summary,
    };
}

export default async function FeaturePage({ params }: PageProps) {
    const { slug } = await params;
    if (!isFeatureSlug(slug)) {
        notFound();
    }

    return <FeaturePageView feature={FEATURE_BY_SLUG[slug]} />;
}
