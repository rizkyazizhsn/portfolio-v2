"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { SectionReveal } from "@/components/animations/section-reveal";

type Heading = { id: string; title: string };
const focusClass =
  "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";

export function ArticleReader({
  articleId,
  headings,
  children,
}: {
  articleId: string;
  headings: Heading[];
  children: ReactNode;
}) {
  const progress = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState(headings[0]?.id ?? "");
  const [fontSize, setFontSize] = useState(18);

  useEffect(() => {
    const article = document.getElementById(articleId);
    if (!article) return;
    let frame: number | null = null;
    let disposed = false;
    const sections = headings.map((heading) =>
      document.getElementById(heading.id),
    );
    const update = () => {
      frame = null;
      const rect = article.getBoundingClientRect();
      const range = Math.max(1, article.offsetHeight - window.innerHeight);
      const fraction = Math.max(0, Math.min(1, -rect.top / range));
      if (progress.current)
        progress.current.style.transform = `scaleX(${fraction})`;
      let current = headings[0]?.id ?? "";
      sections.forEach((section, index) => {
        if (section && section.getBoundingClientRect().top <= 160)
          current = headings[index].id;
      });
      setActiveId((previous) => (previous === current ? previous : current));
    };
    const schedule = () => {
      if (!disposed && frame === null) frame = requestAnimationFrame(update);
    };
    const observer = new ResizeObserver(schedule);
    observer.observe(article);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    document.fonts.ready.then(schedule);
    schedule();
    return () => {
      disposed = true;
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, [articleId, headings]);

  const contents = (
    <ol className="space-y-3">
      {headings.map((heading, index) => (
        <li key={heading.id}>
          <a
            href={`#${heading.id}`}
            aria-current={activeId === heading.id ? "location" : undefined}
            className={`flex gap-3 rounded-sm leading-relaxed hover:text-accent ${focusClass} ${activeId === heading.id ? "text-accent" : "text-foreground/60"}`}
          >
            <span className="shrink-0 pt-0.5">
              {String(index + 1).padStart(2, "0")}
            </span>
            {heading.title}
          </a>
        </li>
      ))}
    </ol>
  );

  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-60 h-0.5 bg-foreground/10"
      >
        <div
          ref={progress}
          className="h-full origin-left bg-accent"
          style={{ transform: "scaleX(0)" }}
        />
      </div>
      <div className="mx-auto grid max-w-7xl items-start gap-10 py-10 md:py-16 lg:grid-cols-[minmax(0,1fr)_13rem] lg:gap-16">
        <SectionReveal as="aside" start="top 90%" distance={16} duration={0.6} className="lg:sticky lg:top-28 lg:col-start-2 lg:row-start-1">
          <nav data-animate="fade-up" aria-label="Table of contents" className="hidden lg:block">
            <p className="mb-6 text-sm uppercase tracking-widest text-foreground/45">
              On this page
            </p>
            {contents}
          </nav>
          {/* Contents */}
          <details data-animate="fade-up" className="rounded-xl border border-foreground/20 p-5 lg:hidden">
            <summary
              className={`cursor-pointer text-sm font-medium ${focusClass}`}
            >
              On this page
            </summary>
            <nav aria-label="Table of contents" className="pt-5">
              {contents}
            </nav>
          </details>
          {/* Text Size */}
          <div
            data-animate="fade-up"
            className="mt-6 flex items-center gap-2 lg:mt-10"
            role="group"
            aria-label="Reading text size"
          >
            <p className="mr-3 text-sm uppercase text-foreground/50">
              Text size
            </p>
            <button
              type="button"
              aria-label="Decrease text size"
              disabled={fontSize <= 16}
              onClick={() => setFontSize((size) => Math.max(16, size - 2))}
              className={`flex size-10 items-center justify-center rounded-full border border-foreground/25 hover:text-accent disabled:cursor-not-allowed disabled:opacity-35 ${focusClass}`}
            >
              A−
            </button>
            <button
              type="button"
              aria-label="Increase text size"
              disabled={fontSize >= 24}
              onClick={() => setFontSize((size) => Math.min(24, size + 2))}
              className={`flex size-10 items-center justify-center rounded-full border border-foreground/25 hover:text-accent disabled:cursor-not-allowed disabled:opacity-35 ${focusClass}`}
            >
              A+
            </button>
          </div>
        </SectionReveal>
        <div
          id={articleId}
          className="min-w-0 leading-[1.85] text-foreground/85 wrap-break-word lg:col-start-1 lg:row-start-1"
          style={{ fontSize }}
        >
          {children}
        </div>
      </div>
    </>
  );
}
