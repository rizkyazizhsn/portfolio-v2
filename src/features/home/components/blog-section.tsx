import { SectionReveal } from "@/components/animations/section-reveal";
import { posts } from "@/features/blog/data/posts";
import { BlogCard } from "@/features/blog/components/blog-card";
import { SectionLink } from "@/components/ui/section-link";

export function BlogSection() {
  return (
    <SectionReveal id="blog" className="scroll-mt-28 py-16 md:py-28" stagger={0.12}>
      <div data-animate="fade-up" className="flex-between gap-6 text-sm uppercase">
        <p>N<span className="playfair-0">o</span>tes & ideas</p>
        <p className="text-foreground/50">On c<span className="playfair-0">o</span>de, m<span className="playfair-0">o</span>ti<span className="playfair-0">o</span>n & craft</p>
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
          <BlogCard key={post.slug} post={post} index={index} />
        ))}
      </div>
      <div data-animate="fade-up" className="mt-8 flex flex-wrap items-center justify-between gap-6 md:mt-10">
        <p className="text-sm text-foreground/40">Draft previews. Full articles coming soon.</p>
        <SectionLink href="/blogs">
          <span>All p<span className="playfair-0">o</span>sts</span>
        </SectionLink>
      </div>
    </SectionReveal>
  );
}
