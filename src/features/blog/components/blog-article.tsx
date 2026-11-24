import Link from "next/link";
import type { BlogPost } from "../data/posts";
import type { ArticleContent } from "../data/articles";
import { formatPostDate, getReadingMinutes } from "../lib/article-format";
import { ArticleReader } from "./article-reader";
import { site } from "@/lib/site";
import { SectionReveal } from "@/components/animations/section-reveal";

const focusClass = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";

export function BlogArticle({ post, content, nextPost }: {
  post: BlogPost;
  content: ArticleContent;
  nextPost?: BlogPost;
}) {
  const headings = content.sections.map(({ id, title }) => ({ id, title }));

  return (
    <main className="pt-[8svh] pb-16 md:pt-[12svh] md:pb-24">
      <SectionReveal start="top 95%" distance={20} className="mx-auto max-w-7xl">
        <Link data-animate="fade-up" href="/blogs" className={`inline-flex items-center gap-3 text-sm uppercase hover:text-accent ${focusClass}`}>
          <span aria-hidden="true">←</span>All posts
        </Link>

        <header id="article-top" className="relative scroll-mt-28 pb-10 pt-10 md:pb-14 md:pt-14">
          <div data-animate="fade-up" className="mb-6 flex flex-wrap items-center gap-3 text-xs uppercase tracking-wider">
            <span className="text-accent">{post.category}</span>
            <span aria-hidden="true" className="size-1 rounded-full bg-foreground/30" />
            <span className="text-foreground/50">Draft note</span>
          </div>
          <div className="overflow-hidden pb-2">
            <h1 data-animate="reveal-up" className="max-w-[24ch] text-[clamp(2.25rem,5vw,5rem)] font-medium leading-[1.1] tracking-tight wrap-break-word">
              {post.title}
            </h1>
          </div>
          <p data-animate="fade-up" className="mt-7 max-w-[60ch] text-lg leading-relaxed text-foreground/65 md:text-2xl">{post.excerpt}</p>
          <div data-animate="fade-up" className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-foreground/55">
            <span className="text-foreground">By {site.name}</span>
            <time dateTime={post.date}>Draft dated {formatPostDate(post.date)}</time>
            <span>{getReadingMinutes(post, content)} min read</span>
          </div>
          <div data-animate="line" aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-foreground/20" />
        </header>
      </SectionReveal>

      <article aria-label={post.title}>
        <ArticleReader articleId={`article-${post.slug}`} headings={headings}>
          <SectionReveal start="top 90%" distance={16}>
            <p data-animate="fade-up" className="mb-10 text-[1.12em] leading-[1.8] text-foreground">{post.preview}</p>
          </SectionReveal>
          {content.sections.map((section) => (
            <SectionReveal key={section.id} id={section.id} aria-labelledby={`${section.id}-heading`} start="top 90%" distance={16} duration={0.6} stagger={0.08} className="scroll-mt-32 mb-12 md:mb-16">
              <h2 data-animate="fade-up" id={`${section.id}-heading`} className="mb-6 text-[1.55em] font-medium leading-[1.3] tracking-tight text-foreground">
                {section.title}
              </h2>
              <div data-animate="fade-up">
                {section.paragraphs.map((paragraph, index) => <p key={index} className="mb-6">{paragraph}</p>)}
                {section.bullets && (
                  <ul className="my-7 list-disc space-y-3 pl-6 marker:text-accent">
                    {section.bullets.map((bullet) => <li key={bullet} className="pl-2">{bullet}</li>)}
                  </ul>
                )}
              </div>
            </SectionReveal>
          ))}
          <SectionReveal as="aside" aria-label="Key takeaway" start="top 90%" distance={16} className="border-l-2 border-accent bg-accent/5 px-6 py-5 md:px-8">
            <p data-animate="fade-up" className="mb-3 text-xs font-medium uppercase tracking-widest text-accent">The takeaway</p>
            <p data-animate="fade-up" className="text-[1.1em] leading-relaxed text-foreground">{content.takeaway}</p>
          </SectionReveal>
          {/* <div className="mt-12 border-t border-foreground/20 pt-7 text-base">
            <p className="text-foreground/60">A draft from the journal. Have a different perspective?</p>
            <a href="mailto:rizkyaziz.hsn@gmail.com" className={`mt-3 inline-block rounded-sm text-accent underline underline-offset-4 ${focusClass}`}>Let&apos;s talk about it.</a>
          </div> */}
        </ArticleReader>
      </article>

      <SectionReveal start="top 90%" distance={20} className="relative mx-auto max-w-7xl pt-10 md:pt-14">
        {/* <div data-animate="line" aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-foreground/20" /> */}
        <div data-animate="fade-up" className="flex flex-wrap justify-between gap-5 text-sm">
          <Link href="/blogs" className={`rounded-sm text-foreground/60 hover:text-accent ${focusClass}`}>← Back to the journal</Link>
          <a href="#article-top" className={`rounded-sm text-foreground/60 hover:text-accent ${focusClass}`}>Back to top ↑</a>
        </div>
        {nextPost && (
          <nav data-animate="fade-up" aria-label="Next article" className="mt-10">
            <Link href={`/blogs/${nextPost.slug}`} className={`block rounded-2xl border border-foreground/20 p-6 hover:border-accent/60 md:p-10 ${focusClass}`}>
              <p className="mb-5 text-xs uppercase tracking-wider text-accent">Keep reading / {nextPost.category}</p>
              <div className="flex items-start justify-between gap-5">
                <h2 className="max-w-[30ch] text-2xl font-medium leading-tight md:text-4xl">{nextPost.title}</h2>
                <span aria-hidden="true" className="shrink-0 text-3xl text-accent">↗</span>
              </div>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-foreground/60">{nextPost.excerpt}</p>
            </Link>
          </nav>
        )}
      </SectionReveal>
    </main>
  );
}
