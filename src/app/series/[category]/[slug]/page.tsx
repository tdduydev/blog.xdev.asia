import BookmarkButton from "@/components/BookmarkButton";
import ContentLanguageSwitcher from "@/components/ContentLanguageSwitcher";
import ContentRenderer from "@/components/ContentRenderer";
import DomainSeriesLayout from "@/components/DomainSeriesLayout";
import GiscusComments from "@/components/GiscusComments";
import { IconBook, IconChevronRight, IconClock, IconEye, IconStar } from "@/components/Icons";
import { SeriesProgressBar, LessonCheckbox } from "@/components/SeriesProgress";
import ShareButtons from "@/components/ShareButtons";
import TableOfContents from "@/components/TableOfContents";
import { getAuthorById, getSeries, getSeriesCategories, getSeriesLanguageLinks, getSeriesSlugsWithCategory } from "@/lib/data";
import { getLocalImageSize } from "@/lib/image-size";
import { SITE_URL } from "@/lib/seo";
import { getValidImageUrl } from "@/utils/image";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamicParams = false;

export function generateStaticParams() {
    return getSeriesSlugsWithCategory().map(({ category, slug }) => ({ category, slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string; slug: string }> }): Promise<Metadata> {
    const { category, slug } = await params;
    const series = getSeries(slug);
    if (!series) return {};

    const canonicalUrl = `${SITE_URL}/series/${category}/${slug}/`;
    const rawImageUrl = getValidImageUrl(series.featured_image ?? null, slug);
    const imageUrl = rawImageUrl.startsWith("http") ? rawImageUrl : `${SITE_URL}${rawImageUrl}`;

    return {
        title: series.title,
        description: series.description || series.title,
        alternates: { canonical: canonicalUrl },
        openGraph: {
            title: series.title,
            description: series.description || series.title,
            url: canonicalUrl,
            siteName: "xDev Asia",
            locale: "vi_VN",
            type: "article",
            // Cùng lý do như trong lib/seo.ts: đo từ file thật, thiếu thì bỏ width/height.
            images: [{ url: imageUrl, ...(getLocalImageSize(series.featured_image ?? "") ?? {}), alt: series.title }],
        },
        twitter: {
            card: "summary_large_image",
            title: series.title,
            description: series.description || series.title,
            images: [imageUrl],
        },
    };
}

export default async function SeriesDetailPage({ params }: { params: Promise<{ category: string; slug: string }> }) {
    const { category, slug } = await params;
    const series = getSeries(slug);
    if (!series) notFound();

    // Validate category matches
    const seriesCategory = series.category?.slug || "uncategorized";
    if (seriesCategory !== category) notFound();

    const categories = getSeriesCategories();
    const cat = categories.find((c) => c.slug === category);
    const fullAuthor = getAuthorById(series.author.id);

    // GitBook-style layout for domain category
    if (category === "domain") {
        return (
            <DomainSeriesLayout
                series={series}
                category={category}
                categoryName={cat?.name || category}
                fullAuthor={fullAuthor || null}
                siteUrl={SITE_URL}
            />
        );
    }

    const levelLabels: Record<string, string> = {
        beginner: "Cơ bản",
        intermediate: "Trung cấp",
        advanced: "Nâng cao",
    };

    const levelColors: Record<string, string> = {
        beginner: "text-white bg-emerald-500 border-emerald-500",
        intermediate: "text-white bg-brand-500 border-brand-500",
        advanced: "text-white bg-purple-500 border-purple-500",
    };

    const totalLessons = series.sections.reduce((sum, s) => sum + s.lessons.length, 0);
    const displayLessons = totalLessons || series.lesson_count || 0;

    return (
        <div>
            {/* Series Hero */}
            <div className="hero-gradient border-b border-zinc-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 text-xs font-medium text-zinc-500 mb-8">
                        <Link href="/" className="hover:text-brand-600 transition-colors">Trang chủ</Link>
                        <IconChevronRight size={14} className="text-zinc-300" />
                        <Link href="/series/" className="hover:text-brand-600 transition-colors">Series</Link>
                        <IconChevronRight size={14} className="text-zinc-300" />
                        <Link href={`/series/${category}/`} className="hover:text-brand-600 transition-colors">
                            {cat?.name || category}
                        </Link>
                        <IconChevronRight size={14} className="text-zinc-300" />
                        <span className="text-zinc-400 truncate max-w-50">{series.title}</span>
                    </nav>

                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
                        {/* Left: Series Info */}
                        <div className="lg:col-span-3">
                            <div className="flex flex-wrap items-center gap-2 mb-6">
                                <span className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider border backdrop-blur-sm ${levelColors[series.level] || levelColors.beginner}`}>
                                    {levelLabels[series.level] || series.level}
                                </span>
                                {!series.is_free && (
                                    <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-amber-500 border border-amber-500">
                                        {Number(series.price).toLocaleString("vi-VN")}đ
                                    </span>
                                )}
                            </div>

                            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-[1.15] text-zinc-900 mb-5">
                                {series.title}
                            </h1>

                            {series.description && (
                                <p className="text-lg text-zinc-500 leading-relaxed mb-8 max-w-2xl">
                                    {series.description}
                                </p>
                            )}

                            {/* Stats row */}
                            <div className="flex flex-wrap items-center gap-5 text-sm text-zinc-500 mb-6">
                                <Link href="/gioi-thieu/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                                    {fullAuthor?.avatar ? (
                                        <Image
                                            src={getValidImageUrl(fullAuthor.avatar, fullAuthor.name)}
                                            alt={fullAuthor.name}
                                            width={28}
                                            height={28}
                                            className="w-7 h-7 rounded-full object-cover ring-1 ring-zinc-200"
                                        />
                                    ) : (
                                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-400 to-brand-700 flex items-center justify-center text-white text-[10px] font-bold">
                                            {series.author.name.charAt(0)}
                                        </div>
                                    )}
                                    <span className="text-zinc-600">{series.author.name}</span>
                                </Link>
                                {displayLessons > 0 && (
                                    <div className="flex items-center gap-1.5">
                                        <IconBook size={15} className="text-zinc-400" />
                                        <span>{displayLessons} bài học</span>
                                    </div>
                                )}
                                {series.duration_hours && (
                                    <div className="flex items-center gap-1.5">
                                        <IconClock size={15} className="text-zinc-400" />
                                        <span>{series.duration_hours} giờ</span>
                                    </div>
                                )}
                                {series.view_count > 0 && (
                                    <div className="flex items-center gap-1.5">
                                        <IconEye size={15} className="text-zinc-400" />
                                        <span>{series.view_count.toLocaleString("vi-VN")} lượt xem</span>
                                    </div>
                                )}
                                {series.enrollment_count > 0 && (
                                    <div className="flex items-center gap-1.5">
                                        <IconEye size={15} className="text-zinc-400" />
                                        <span>{series.enrollment_count} học viên</span>
                                    </div>
                                )}
                                {series.average_rating > 0 && (
                                    <div className="flex items-center gap-1.5">
                                        <div className="flex items-center">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <IconStar key={star} size={14} className={star <= Math.round(Number(series.average_rating)) ? "text-amber-500 fill-current" : "text-zinc-300"} />
                                            ))}
                                        </div>
                                        <span>{Number(series.average_rating).toFixed(1)} ({series.review_count})</span>
                                    </div>
                                )}
                            </div>

                            {series.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {series.tags.map((tag) => (
                                        <Link key={tag.slug} href={`/tags/${tag.slug}/`} className="tag-pill">
                                            {tag.name}
                                        </Link>
                                    ))}
                                </div>
                            )}

                            <ContentLanguageSwitcher
                                links={getSeriesLanguageLinks(series)}
                                currentLocale="vi"
                                className="mt-6"
                            />
                        </div>

                        {/* Right: Featured Image */}
                        <div className="lg:col-span-2">
                            {series.featured_image && (
                                <div className="rounded-2xl overflow-hidden shadow-lg border border-zinc-200">
                                    <Image
                                        src={getValidImageUrl(series.featured_image, series.slug)}
                                        alt={series.title}
                                        width={800}
                                        height={450}
                                        style={{ height: "auto" }}
                                        className="w-full h-auto aspect-video object-cover"
                                        priority
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="relative flex gap-16">
                    {/* Main Content */}
                    <article className="min-w-0 flex-1 max-w-4xl">
                        {/* Curriculum Section */}
                        {series.sections.length > 0 && (
                            <section className="mb-16">
                                <h2 className="text-2xl font-extrabold tracking-tight text-zinc-900 mb-2 flex items-center gap-3">
                                    <span className="w-1 h-6 rounded-full bg-brand-500" />
                                    Nội dung series
                                </h2>
                                <p className="text-sm text-zinc-600 mb-4 ml-4">
                                    {series.sections.length} phần &middot; {totalLessons} bài học
                                </p>
                                <div className="mb-6 ml-4">
                                    <SeriesProgressBar seriesSlug={series.slug} totalLessons={totalLessons} />
                                </div>
                                <div className="space-y-3">
                                    {series.sections.map((section, sIdx) => (
                                        <div key={section.id} className="rounded-xl overflow-hidden glass-card" style={{ transform: "none" }}>
                                            <div className="px-5 py-4 flex items-center justify-between border-b border-zinc-100">
                                                <h3 className="font-semibold text-zinc-800">
                                                    <span className="text-brand-600 mr-2">{sIdx + 1}.</span>
                                                    {section.title}
                                                </h3>
                                                <span className="text-xs text-zinc-400 shrink-0 ml-3">{section.lessons.length} bài</span>
                                            </div>
                                            <ul>
                                                {section.lessons.map((lesson, lIdx) => (
                                                    <li key={lesson.id} className={lIdx < section.lessons.length - 1 ? "border-b border-zinc-50" : ""}>
                                                        <div className="flex items-center gap-3 px-5 py-3 text-sm hover:bg-brand-50 dark:hover:bg-brand-950/20 transition-colors group">
                                                            <LessonCheckbox seriesSlug={series.slug} lessonSlug={lesson.slug} />
                                                            <Link href={`/lessons/${series.slug}/${lesson.slug}/`} className="flex-1 text-zinc-600 group-hover:text-brand-600 transition-colors">
                                                                {lesson.title}
                                                            </Link>
                                                            {lesson.duration_minutes && (
                                                                <span className="text-xs text-zinc-400 shrink-0">{lesson.duration_minutes} phút</span>
                                                            )}
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Series Content (HTML) */}
                        {series.content && (
                            <ContentRenderer html={series.content} />
                        )}

                        {/* Share & Bookmark */}
                        <div className="mt-10 pt-8 border-t border-zinc-100 flex flex-wrap items-center justify-between gap-4">
                            <ShareButtons title={series.title} url={`${SITE_URL}/series/${category}/${slug}/`} />
                            <BookmarkButton
                                slug={`series-${series.slug}`}
                                title={series.title}
                                excerpt={series.description}
                                featured_image={series.featured_image}
                                category={cat?.name || null}
                            />
                        </div>

                        {/* Author Profile Card */}
                        {fullAuthor && (
                            <Link href="/gioi-thieu/" className="block mt-16 p-8 rounded-2xl glass-card hover:shadow-lg transition-shadow" style={{ transform: "none" }}>
                                <div className="flex flex-col sm:flex-row items-start gap-5">
                                    {fullAuthor.avatar ? (
                                        <Image
                                            src={getValidImageUrl(fullAuthor.avatar, fullAuthor.name)}
                                            alt={fullAuthor.name}
                                            width={72}
                                            height={72}
                                            style={{ height: "auto" }}
                                            className="rounded-2xl object-cover ring-2 ring-white shadow-lg shrink-0"
                                        />
                                    ) : (
                                        <div className="w-18 h-18 rounded-2xl bg-gradient-to-br from-brand-400 to-brand-700 flex items-center justify-center text-white font-bold text-2xl shadow-lg shrink-0">
                                            {fullAuthor.name.charAt(0)}
                                        </div>
                                    )}
                                    <div className="min-w-0">
                                        <div className="text-xs font-bold uppercase tracking-widest text-brand-600 mb-1">Tác giả</div>
                                        <h3 className="text-xl font-extrabold text-zinc-900 mb-2">{fullAuthor.name}</h3>
                                        {fullAuthor.bio && (
                                            <p className="text-sm text-zinc-500 leading-relaxed">{fullAuthor.bio}</p>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        )}

                        {/* Reviews */}
                        {series.reviews && series.reviews.length > 0 && (
                            <section className="mt-12 pt-10 border-t border-zinc-100">
                                <h2 className="text-2xl font-extrabold tracking-tight text-zinc-900 mb-8 flex items-center gap-3">
                                    <IconStar size={24} className="text-amber-500 fill-current" />
                                    Đánh giá ({series.reviews.length})
                                </h2>

                                {/* Rating summary */}
                                <div className="flex items-center gap-6 mb-10 p-6 rounded-2xl glass-card" style={{ transform: "none" }}>
                                    <div className="text-center">
                                        <div className="text-5xl font-extrabold text-zinc-900">{Number(series.average_rating).toFixed(1)}</div>
                                        <div className="flex items-center gap-0.5 mt-2 justify-center">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <IconStar key={star} size={18} className={star <= Math.round(Number(series.average_rating)) ? "text-amber-500 fill-current" : "text-zinc-300"} />
                                            ))}
                                        </div>
                                        <div className="text-sm text-zinc-500 mt-1">{series.review_count} đánh giá</div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    {series.reviews.map((review) => (
                                        <div key={review.id} className="p-5 rounded-xl glass-card" style={{ transform: "none" }}>
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-400 to-brand-700 flex items-center justify-center text-white text-xs font-bold">
                                                    {review.user.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="text-sm font-semibold text-zinc-800">{review.user.name}</div>
                                                    <div className="flex items-center gap-0.5">
                                                        {[1, 2, 3, 4, 5].map((star) => (
                                                            <IconStar key={star} size={12} className={star <= review.rating ? "text-amber-500 fill-current" : "text-zinc-300"} />
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                            {review.comment && (
                                                <p className="text-sm text-zinc-600 leading-relaxed">{review.comment}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Comments — Giscus (GitHub Discussions) */}
                        <GiscusComments term={`/series/${series.category?.slug || "uncategorized"}/${series.slug}/`} />
                    </article>

                    {/* Sidebar — Table of Contents */}
                    {series.content && (
                        <aside className="hidden lg:block w-72 shrink-0">
                            <div className="sticky top-24">
                                <TableOfContents html={series.content} />
                            </div>
                        </aside>
                    )}
                </div>
            </div>
        </div>
    );
}
