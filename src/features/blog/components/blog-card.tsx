import type { BlogPost } from "../data/posts";
import Link from "next/link";
import { formatPostDate } from "../lib/article-format";

type BlogCardProps = {
  post: BlogPost;
  headingLevel?: 2 | 3;
  index?: number;
};

export function BlogCard({ post, headingLevel = 3, index }: BlogCardProps) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  const date = formatPostDate(post.date);

  return (
    <article data-animate="fade-up" className="flex min-w-0 flex-col">
      <Link
        href={`/blogs/${post.slug}`}
        aria-label={post.title}
        className="group flex min-w-0 flex-1 flex-col rounded-2xl border border-foreground/15 p-6 hover:border-accent/50 hover:bg-accent/5 focus-visible:border-accent/50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent motion-safe:transition-colors motion-safe:duration-300 md:p-8"
      >
        <div className="flex-between gap-4 text-xs uppercase tracking-wider">
          <span className="text-accent">{post.category}</span>
          <span className="text-foreground/60">
            Draft{index !== undefined ? ` / ${String(index + 1).padStart(2, "0")}` : ""}
          </span>
        </div>
        <Heading className="mt-10 text-3xl font-medium leading-tight tracking-tight group-hover:text-accent group-focus-visible:text-accent md:text-4xl">
          {post.title}
        </Heading>
        <p className="mb-8 mt-5 text-base leading-relaxed text-foreground/60">{post.excerpt}</p>
        <time dateTime={post.date} className="mt-auto pt-5 text-xs uppercase tracking-wider text-foreground/60">
          {date}
        </time>
      </Link>
    </article>
  );
}
