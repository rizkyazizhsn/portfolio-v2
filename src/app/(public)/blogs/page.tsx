import { BlogCard } from "@/features/blog/components/blog-card";
import type { Metadata } from "next";
import Link from "next/link";
import { SectionReveal } from "@/components/animations/section-reveal";
import { PageShell } from "@/components/layout/page-shell";
import { posts } from "@/features/blog/data/posts";
import { ContactSection } from "@/features/home/components/contact-section";

export const metadata: Metadata = {
  title: "Journal",
  description: "Notes on frontend engineering, thoughtful interfaces, and motion by Rizky Aziz.",
  alternates: { canonical: "/blogs" },
};

export default function BlogsPage() {
  return (
    <PageShell>
      <div className="pt-[6svh]">
        <SectionReveal>
          <Link href="/#blog" data-animate="fade-up"
            className="flex w-fit items-center gap-2 uppercase text-base mb-6 group focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
            <span aria-hidden="true" className="text-2xl motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:translate-x-0.5 motion-safe:group-focus-visible:-translate-x-0.5">←</span>
            Back
          </Link>
        </SectionReveal>
        <SectionReveal id="blogs" stagger={0.2} duration={1}>
          <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] items-end gap-6">
            <div className="overflow-hidden leading-none">
              <h1 data-animate="reveal-up" className="text-5xl md:text-[7vw] uppercase">
                The j<span className="playfair-0">o</span>urnal
              </h1>
            </div>
            <div className="overflow-hidden">
              <p data-animate="reveal-up" className="md:text-[1.5vw] text-foreground/75">
                Notes on code, motion, and the craft of building thoughtful interfaces. These are draft previews; full articles are coming soon.
              </p>
            </div>
          </div>
          <div data-animate="line" className="h-px bg-foreground/20 w-full mt-8 md:mt-20" />
        </SectionReveal>
        <SectionReveal className="grid gap-6 py-10 md:grid-cols-3 md:py-20">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} headingLevel={2} />
          ))}
        </SectionReveal>

        <ContactSection />
      </div>
    </PageShell>
  );
}
