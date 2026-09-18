import fs from "fs";
import path from "path";
import type { Roadmap, RoadmapMeta } from "@/lib/roadmap-shared";

interface UpcomingRoadmapPreview {
    slug: string;
    title: string;
    description: string;
    eta: string;
}

export {
    THEME,
    ITEM_TYPE_BADGE,
    ITEM_TYPE_LABEL,
    type RoadmapItemType,
    type ThemeKey,
    type ThemeConfig,
    type RoadmapItem,
    type RoadmapPhase,
    type RoadmapStats,
    type RoadmapFaq,
    type RoadmapMeta,
    type Roadmap,
} from "@/lib/roadmap-shared";

const DATA_DIR = path.join(process.cwd(), "data");
const BLOG_IMAGE_DIR = path.join(process.cwd(), "public", "images", "blog");
const UPCOMING_ROADMAPS: UpcomingRoadmapPreview[] = [
    {
        slug: "devops",
        title: "DevOps Engineer",
        description: "CI/CD, container platform, observability, SRE practice, security guardrails và production readiness.",
        eta: "Coming next",
    },
    {
        slug: "data-engineer",
        title: "Data Engineer",
        description: "ETL, streaming, lakehouse, data quality, orchestration và analytics platform foundations.",
        eta: "In preparation",
    },
    {
        slug: "product-manager",
        title: "Product Manager",
        description: "Discovery, prioritization, experimentation, metrics, AI product strategy và stakeholder alignment.",
        eta: "Planned",
    },
];

export function getRoadmapList(): RoadmapMeta[] {
    const raw = fs.readFileSync(path.join(DATA_DIR, "roadmaps.json"), "utf-8");
    return JSON.parse(raw) as RoadmapMeta[];
}

export function getRoadmap(slug: string): Roadmap | null {
    const filePath = path.join(DATA_DIR, "roadmaps", `${slug}.json`);
    if (!fs.existsSync(filePath)) return null;
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw) as Roadmap;
}

export function getAllRoadmapSlugs(): string[] {
    return getRoadmapList().map((r) => r.slug);
}

export function getRoadmapBannerPath(slug?: string): string {
    if (slug) {
        const slugImage = `roadmap-${slug}-featured.png`;
        if (fs.existsSync(path.join(BLOG_IMAGE_DIR, slugImage))) {
            return `/images/blog/${slugImage}`;
        }
    }

    return "/images/blog/roadmap-overview-featured.webp";
}

export function getUpcomingRoadmapPreviews(): Array<UpcomingRoadmapPreview & { image: string }> {
    return UPCOMING_ROADMAPS.map((item) => ({
        ...item,
        image: getRoadmapBannerPath(item.slug),
    }));
}
