"use client";

import { useEffect, useRef } from "react";
import { SectionReveal } from "@/components/animations/section-reveal";

const email = "rizkyaziz.hsn@gmail.com";
const focusClass = "focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-accent";

function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <path d="M5 19 19 5M5 5h14v14" />
    </svg>
  );
}

export function ContactSection() {
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (resetTimer.current) clearTimeout(resetTimer.current);
  }, []);

  return (
    <SectionReveal id="contact" className="relative isolate scroll-mt-28 py-20 md:py-32" stagger={0.12}>
      <div aria-hidden="true" className="pointer-events-none absolute w-full -z-10 bg-[radial-gradient(ellipse_at_80%_50%,rgba(200,255,95,0.06),transparent_65%)]" />

      {/* <div data-animate="line" className="h-px w-full bg-foreground/20" /> */}
      <div data-animate="fade-up" className="flex-between gap-6 pt-6 text-xs uppercase md:text-sm">
        <p>Get in t<span className="playfair-0">o</span>uch</p>
        <p className="text-foreground">A g<span className="playfair-0">oo</span>d c<span className="playfair-0">o</span>nversati<span className="playfair-0">o</span>n is a g<span className="playfair-0">oo</span>d start.</p>
      </div>

      <div className="grid items-end gap-10 py-16 md:grid-cols-[1fr_auto] md:py-24">
        <div>
          <div className="overflow-hidden">
            <h2 data-animate="reveal-up" className="text-[clamp(3rem,8.5vw,10rem)] leading-[1.05] tracking-tight uppercase">
              Let&apos;s build
            </h2>
          </div>
          <div className="overflow-hidden pb-2">
            <p data-animate="reveal-up" className="text-[clamp(3rem,8.5vw,10rem)] leading-[1.05] tracking-tight uppercase text-accent">
              S<span className="playfair-0">o</span>mething g<span className="playfair-0">oo</span>d.
            </p>
          </div>
        </div>
        <a data-animate="fade-up" href={`mailto:${email}`} aria-label="Start a conversation by email"
          className={`group flex size-20 items-center justify-center rounded-full border border-foreground/25 hover:border-accent hover:bg-accent hover:text-background motion-safe:transition-colors motion-safe:duration-300 md:mb-3 md:size-32 ${focusClass}`}>
          <Arrow className="size-9 motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:-translate-y-1 motion-safe:group-hover:translate-x-1 md:size-14" />
        </a>
      </div>

      <div data-animate="fade-up" className="grid gap-10 pb-12 md:grid-cols-2 md:gap-16">
        <p className="max-w-md text-lg leading-relaxed text-foreground/60 md:text-2xl">
          Have a project in mind, a challenge to solve, or just want to say hello? Let&apos;s talk about what we can build together.
        </p>
        <div className="min-w-0 md:justify-self-end">
          <p className="mb-3 text-xs uppercase tracking-widest text-foreground/50">Drop me a line</p>
          <a href={`mailto:${email}`} className={`block break-all text-xl decoration-foreground/25 underline-offset-8 hover:text-accent hover:decoration-accent md:text-3xl ${focusClass}`}>
            {email}
          </a>
        </div>
      </div>
    </SectionReveal>
  );
}
