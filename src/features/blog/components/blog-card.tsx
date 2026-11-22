import type { BlogPost } from "../data/posts";

type BlogCardProps = {
  post: BlogPost;
  headingLevel?: 2 | 3;
  index?: number;
};

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

export function BlogCard({ post, headingLevel = 3, index }: BlogCardProps) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  const date = dateFormatter.format(new Date(`${post.date}T00:00:00Z`));

  return (
    <article data-animate="fade-up"
      className="group flex min-w-0 flex-col rounded-2xl border border-foreground/15 p-6 hover:border-accent/50 hover:bg-accent/5 focus-within:border-accent/50 motion-safe:transition-colors motion-safe:duration-300 md:p-8">
      <div className="flex-between gap-4 text-xs uppercase tracking-wider">
        <span className="text-accent">{post.category}</span>
        <span className="text-foreground/40">
          Draft{index !== undefined ? ` / ${String(index + 1).padStart(2, "0")}` : ""}
        </span>
      </div>
      <Heading className="mt-10 text-3xl font-medium leading-tight tracking-tight md:text-4xl">
        {post.title}
      </Heading>
      <p className="mb-8 mt-5 text-base leading-relaxed text-foreground/60">{post.excerpt}</p>
      <time dateTime={post.date} className="mt-auto pt-5 text-xs uppercase tracking-wider text-foreground/50">
        {date}
      </time>
    </article>
  );
}
