import type { Metadata } from "next";
import { notFound } from "next/navigation";
import RoadmapDetailClient from "@/components/RoadmapDetailClient";
import {
    getAllRoadmapSlugs,
    getRoadmapBannerPath,
    getRoadmap,
} from "@/lib/roadmaps";

const SITE_URL = "https://blog.xdev.asia";

export function generateStaticParams() {
    return getAllRoadmapSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const roadmap = getRoadmap(slug);
    if (!roadmap) return {};

    const canonicalUrl = `${SITE_URL}/roadmap/${slug}/`;
    const imageUrl = getRoadmapBannerPath(slug);

    return {
        title: `${roadmap.title} Roadmap | xDev Asia`,
        description: roadmap.description,
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            title: `${roadmap.title} Roadmap | xDev Asia`,
            description: roadmap.description,
            url: canonicalUrl,
            siteName: "xDev Asia",
            locale: "vi_VN",
            type: "article",
            images: [{ url: imageUrl, width: 1920, height: 1080, alt: roadmap.title }],
        },
        twitter: {
            card: "summary_large_image",
            title: `${roadmap.title} Roadmap | xDev Asia`,
            description: roadmap.description,
            images: [imageUrl],
        },
    };
}

export default async function RoadmapDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const roadmap = getRoadmap(slug);
    const bannerImage = getRoadmapBannerPath(slug);

    if (!roadmap) notFound();

    return <RoadmapDetailClient roadmap={roadmap} bannerImage={bannerImage} />;
}
