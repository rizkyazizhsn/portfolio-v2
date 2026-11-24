import type { ArticleContent } from "../data/articles";
import type { BlogPost } from "../data/posts";

export function formatPostDate(date: string) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric", month: "short", year: "numeric", timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

export function getReadingMinutes(post: BlogPost, content: ArticleContent) {
  const text = [post.preview, content.takeaway, ...content.sections.flatMap((section) => [
    section.title, ...section.paragraphs, ...(section.bullets ?? []),
  ])].join(" ");
  return Math.max(1, Math.ceil(text.trim().split(/\s+/).length / 200));
}
