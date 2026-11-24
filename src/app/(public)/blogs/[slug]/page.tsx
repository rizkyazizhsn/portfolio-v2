import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/page-shell";
import { BlogArticle } from "@/features/blog/components/blog-article";
import { posts } from "@/features/blog/data/posts";
import { articles } from "@/features/blog/data/articles";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((item) => item.slug === slug);
  if (!post || !articles[slug]) notFound();
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blogs/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: new URL(`/blogs/${post.slug}`, site.url).href,
      siteName: "Rizky Aziz Portfolio",
      authors: [site.name],
      images: [{ url: "/images/og-preview.png", alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: ["/images/og-preview.png"],
    },
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const index = posts.findIndex((post) => post.slug === slug);
  const post = posts[index];
  const content = articles[slug];
  if (!post || !content) notFound();

  const nextPost = posts.length > 1 ? posts[(index + 1) % posts.length] : undefined;
  return (
    <PageShell key={post.slug}>
      <BlogArticle post={post} content={content} nextPost={nextPost} />
    </PageShell>
  );
}
