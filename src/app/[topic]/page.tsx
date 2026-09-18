import { IconArrowRight, IconChevronRight, IconCode } from "@/components/Icons";
import PostCard from "@/components/PostCard";
import { getAllPosts, getAvailableTopics, getPostsByTopic } from "@/lib/data";
import type { Metadata } from "next";
import Link from "next/link";

export const dynamicParams = false;

export function generateStaticParams() {
    return getAvailableTopics().map((topic) => ({ topic: topic.slug }));
}

const SITE_URL = "https://blog.xdev.asia";

export async function generateMetadata({ params }: { params: Promise<{ topic: string }> }): Promise<Metadata> {
    const { topic: topicSlug } = await params;
    const topics = getAvailableTopics();
    const topic = topics.find((t) => t.slug === topicSlug);
    const name = topic?.name || topicSlug;
    const description = topic?.description || `Bài viết về ${name}`;
    const canonicalUrl = `${SITE_URL}/${topicSlug}/`;

    return {
        title: `${name} — xDev`,
        description,
        alternates: { canonical: canonicalUrl },
        openGraph: {
            title: `${name} — xDev Asia`,
            description,
            url: canonicalUrl,
            siteName: "xDev Asia",
            locale: "vi_VN",
            type: "website",
        },
        twitter: {
            card: "summary",
            title: `${name} — xDev Asia`,
            description,
        },
    };
}

export default async function TopicPage({ params }: { params: Promise<{ topic: string }> }) {
    const { topic: topicSlug } = await params;
    const topics = getAvailableTopics();
    const allPosts = getAllPosts();
    const currentTopic = topics.find((t) => t.slug === topicSlug);
    const posts = getPostsByTopic(topicSlug);

    return (
        <div>
            {/* Hero */}
            <section className="hero-gradient py-10 lg:py-14">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex items-center gap-2 text-xs font-medium text-zinc-500 mb-6">
                        <Link href="/" className="hover:text-brand-600 transition-colors">Trang chủ</Link>
                        <IconChevronRight size={14} className="text-zinc-300" />
                        <span className="text-zinc-400">{currentTopic?.name || topicSlug}</span>
                    </nav>
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-9 h-9 rounded-xl bg-brand-100 flex items-center justify-center">
                            <IconCode size={18} className="text-brand-600" />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-widest text-brand-600">{currentTopic?.name || topicSlug}</span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-900 mb-2">
                        {currentTopic?.name || topicSlug}
                    </h1>
                    <p className="text-zinc-500 max-w-2xl text-sm md:text-base">
                        {currentTopic?.description || `${posts.length} bài viết về ${currentTopic?.name || topicSlug}.`}
                    </p>

                    {/* Topic tabs */}
                    <div className="mt-6 flex flex-wrap gap-2">
                        <Link href="/blog/" className="topic-tab">
                            Tất cả
                            <span className="topic-tab-count">{allPosts.length}</span>
                        </Link>
                        {topics.map((t) => (
                            <Link
                                key={t.slug}
                                href={`/${t.slug}/`}
                                className={`topic-tab ${t.slug === topicSlug ? "topic-tab-active" : ""}`}
                            >
                                {t.name}
                                {t.slug === topicSlug && (
                                    <span className="topic-tab-count">{posts.length}</span>
                                )}
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Posts Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {posts.map((post, index) => (
                        <PostCard key={post.id} post={post} priority={index < 3} />
                    ))}
                </div>
                {posts.length === 0 && (
                    <div className="text-center py-20">
                        <IconCode size={48} className="text-zinc-300 mx-auto mb-4" />
                        <h3 className="text-lg font-bold text-zinc-700 mb-2">Chưa có bài viết</h3>
                        <p className="text-zinc-500 mb-4">Chủ đề này đang được cập nhật nội dung.</p>
                        <Link href="/blog/" className="link-brand">
                            Xem tất cả bài viết
                            <IconArrowRight size={14} />
                        </Link>
                    </div>
                )}
            </section>
        </div>
    );
}
