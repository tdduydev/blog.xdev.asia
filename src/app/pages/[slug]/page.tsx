import { getStaticPage, getStaticPageLanguageLinks } from "@/lib/data";
import ContentLanguageSwitcher from "@/components/ContentLanguageSwitcher";
import ContentRenderer from "@/components/ContentRenderer";
import { SITE_URL } from "@/lib/seo";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const dynamicParams = false;

const KNOWN_SLUGS = [
    "dieu-khoan-su-dung",
    "chinh-sach-quyen-rieng-tu",
    "privacy-policy",
    "arrow-escape-puzzle-privacy",
    "your-privacy-choices",
    "xoa-du-lieu-nguoi-dung",
    "ve-toi",
];

export function generateStaticParams() {
    return KNOWN_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const page = getStaticPage(slug);
    if (!page) return {};
    return {
        title: `${page.title} — xDev Asia`,
        alternates: { canonical: `${SITE_URL}/pages/${slug}/` },
    };
}

export default async function StaticPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const page = getStaticPage(slug);
    if (!page) notFound();

    return (
        <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
            <h1 className="text-3xl font-bold text-zinc-900 mb-8">{page.title}</h1>
            <ContentLanguageSwitcher
                links={getStaticPageLanguageLinks(slug)}
                currentLocale="vi"
                className="mb-8"
            />
            <ContentRenderer html={page.content} className="prose prose-zinc max-w-none" />
        </main>
    );
}
