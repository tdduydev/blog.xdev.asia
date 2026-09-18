import { IconBook, IconChevronRight, IconCode } from "@/components/Icons";
import PostCard from "@/components/PostCard";
import SeriesCard from "@/components/SeriesCard";
import {
    getActiveTagSlugs,
    getPostsByTag,
    getSeriesByTag,
    getTagBySlug,
} from "@/lib/data";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamicParams = false;

const SITE_URL = "https://blog.xdev.asia";

export function generateStaticParams() {
  return getActiveTagSlugs().map((tag) => ({ tag }));
}

export async function generateMetadata({ params }: { params: Promise<{ tag: string }> }): Promise<Metadata> {
  const { tag: tagSlug } = await params;
  const tag = getTagBySlug(tagSlug);
  if (!tag || tag.totalCount === 0) return {};

  const canonicalUrl = `${SITE_URL}/tags/${tagSlug}/`;
  const description = `${tag.totalCount} noi dung duoc gan tag ${tag.name} tren xDev Asia`;

  return {
    title: `Tag: ${tag.name}`,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: `Tag: ${tag.name} - xDev Asia`,
      description,
      url: canonicalUrl,
      siteName: "xDev Asia",
      locale: "vi_VN",
      type: "website",
    },
    twitter: {
      card: "summary",
      title: `Tag: ${tag.name} - xDev Asia`,
      description,
    },
  };
}

export default async function TagDetailPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag: tagSlug } = await params;
  const tagData = getTagBySlug(tagSlug);
  const posts = getPostsByTag(tagSlug);
  const series = getSeriesByTag(tagSlug);

  if (!tagData || (posts.length === 0 && series.length === 0)) {
    notFound();
  }

  const tag =
    tagData ??
    {
      slug: tagSlug,
      name: tagSlug,
      postCount: posts.length,
      seriesCount: series.length,
      totalCount: posts.length + series.length,
    };

  return (
    <div>
      <section className="hero-gradient py-10 lg:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs font-medium text-zinc-500 mb-6">
            <Link href="/" className="hover:text-brand-600 transition-colors">Trang chu</Link>
            <IconChevronRight size={14} className="text-zinc-300" />
            <Link href="/tags/" className="hover:text-brand-600 transition-colors">Tags</Link>
            <IconChevronRight size={14} className="text-zinc-300" />
            <span className="text-zinc-400">{tag.name}</span>
          </nav>

          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-xl bg-brand-100 flex items-center justify-center">
              <IconCode size={18} className="text-brand-600" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-600">Tag</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-900 mb-2">#{tag.name}</h1>
          <p className="text-zinc-500 max-w-2xl text-sm md:text-base">
            {tag.totalCount} noi dung ({tag.postCount} bai viet, {tag.seriesCount} series)
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        <div>
          <div className="flex items-center gap-2 mb-5">
            <IconCode size={18} className="text-brand-600" />
            <h2 className="text-xl font-bold text-zinc-900">Bai viet ({posts.length})</h2>
          </div>

          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {posts.map((post, index) => (
                <PostCard key={post.id} post={post} priority={index < 3} />
              ))}
            </div>
          ) : (
            <p className="text-zinc-500 text-sm">Chua co bai viet nao cho tag nay.</p>
          )}
        </div>

        <div>
          <div className="flex items-center gap-2 mb-5">
            <IconBook size={18} className="text-brand-600" />
            <h2 className="text-xl font-bold text-zinc-900">Series ({series.length})</h2>
          </div>

          {series.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {series.map((item, index) => (
                <SeriesCard key={item.id} series={item} priority={index < 2} />
              ))}
            </div>
          ) : (
            <p className="text-zinc-500 text-sm">Chua co series nao cho tag nay.</p>
          )}
        </div>
      </section>
    </div>
  );
}
