import { SectionReveal } from "@/components/animations/section-reveal";
import { posts } from "../data/posts";

export function BlogSection() {
  return (
    <SectionReveal id="blog" className="scroll-mt-28 py-16 md:py-28" stagger={0.12}>
      <div data-animate="fade-up" className="flex-between gap-6 text-sm uppercase">
        <p>Notes & ideas</p>
        <p className="text-foreground/50">On code, motion & craft</p>
      </div>

      <div className="grid items-end gap-6 py-10 md:grid-cols-[3fr_2fr] md:py-14">
        <div className="overflow-hidden leading-none">
          <h2 data-animate="reveal-up" className="text-6xl leading-none tracking-tight uppercase md:text-[8vw]">
            The j<span className="playfair-0">o</span>urnal
          </h2>
        </div>
        <p data-animate="fade-up" className="max-w-md text-lg leading-relaxed text-foreground/60 md:justify-self-end">
          Thoughts on building thoughtful interfaces, solving problems, and learning along the way.
        </p>
      </div>

      {/* <div data-animate="line" className="h-px w-full bg-foreground/20" /> */}
      <div className="grid grid-cols-1 gap-5 pt-8 md:grid-cols-3 md:gap-6">
        {posts.map((post, index) => (
          <article key={post.slug} data-animate="fade-up"
            className="group flex min-w-0 flex-col rounded-2xl border border-foreground/15 p-6 hover:border-accent/50 hover:bg-accent/5 focus-within:border-accent/50 motion-safe:transition-colors motion-safe:duration-300 md:p-8">
            <div className="flex-between gap-4 text-xs uppercase tracking-wider">
              <span className="text-accent">{post.category}</span>
              <span className="text-foreground/40">Draft / {String(index + 1).padStart(2, "0")}</span>
            </div>
            <h3 className="mt-10 text-3xl font-medium leading-tight tracking-tight md:text-4xl">
              {post.title}
            </h3>
            <p className="mb-8 mt-5 text-base leading-relaxed text-foreground/60">{post.excerpt}</p>

            {/* <details className="mt-auto border-t border-foreground/15 pt-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-sm text-sm uppercase hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent [&::-webkit-details-marker]:hidden">
                Read preview
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
                  className="size-5 shrink-0 motion-safe:transition-transform motion-safe:duration-300 in-open:rotate-180">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </summary>
              <p className="pt-5 text-base leading-relaxed text-foreground/70">{post.preview}</p>
            </details> */}
          </article>
        ))}
      </div>
      <p data-animate="fade-up" className="mt-6 text-sm text-foreground/40">Draft previews. Full articles coming soon.</p>
    </SectionReveal>
  );
}
