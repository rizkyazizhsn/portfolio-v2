"use client";

import { useId, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SlideNumber } from "./slide-number";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export type TimelineItem = {
  id: string;
  year: number;
  title: string;
  description: string;
};

export function ScrollTimeline({
  items,
  heading = "History",
  className = "",
}: {
  items: readonly TimelineItem[];
  heading?: string;
  className?: string;
}) {
  const container = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const headingId = useId();
  const selectedIndex = Math.min(activeIndex, items.length - 1);
  const active = items[selectedIndex];

  useGSAP(
    () => {
      const root = container.current;
      const list = root?.querySelector<HTMLOListElement>(
        "[data-timeline-list]",
      );
      const rows = Array.from(
        root?.querySelectorAll<HTMLElement>("[data-timeline-item]") ?? [],
      );
      if (!list || !rows.length) return;

      const updateActive = () => {
        let nextIndex = 0;
        rows.forEach((row, index) => {
          if (row.getBoundingClientRect().top <= window.innerHeight * 0.5)
            nextIndex = index;
        });
        setActiveIndex((current) =>
          current === nextIndex ? current : nextIndex,
        );
      };
      ScrollTrigger.create({
        trigger: list,
        start: "top 50%",
        end: "bottom 50%",
        onUpdate: updateActive,
        onRefresh: updateActive,
      });
      updateActive();

      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          "[data-timeline-progress]",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: list,
              start: "top 50%",
              end: "bottom 50%",
              scrub: 0.4,
            },
          },
        );
        rows.forEach((row) => {
          gsap.from(row.querySelector("[data-timeline-content]"), {
            y: 32,
            autoAlpha: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: row, start: "top 85%", once: true },
          });
        });
      });
      return () => media.revert();
    },
    { scope: container, dependencies: [items], revertOnUpdate: true },
  );

  if (!active) return null;

  return (
    <section
      ref={container}
      aria-labelledby={headingId}
      className={`relative ${className}`}
    >
      <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-[1.2fr_1fr] md:gap-16">
        {/* year */}
        <div className="hidden md:block sticky top-24 z-20 bg-background py-4 md:top-[25vh] md:bg-transparent md:py-0">
          <p className="mt-3 text-lg text-accent/80 md:mt-8 md:text-3xl">
            Year {selectedIndex + 1}
          </p>
          <SlideNumber
            value={active.year}
            duration={0.7}
            className="text-[clamp(5rem,17vw,20rem)] font-medium tracking-tight"
          />
        </div>
        {/* history */}
        <div>
          <h2
            id={headingId}
            className="mb-12 text-sm font-medium uppercase text-foreground/60"
          >
            {heading}
          </h2>
          <div className="relative">
            <div
              aria-hidden="true"
              className="pointer-events-none hidden md:block absolute inset-y-0 left-0 w-px bg-foreground/15"
            >
              <div
                data-timeline-progress
                className="h-full w-full origin-top bg-foreground/80"
              />
            </div>
            {/* timeline list */}
            <ol data-timeline-list>
              {items.map((item, index) => (
                <li
                  key={item.id}
                  data-timeline-item
                  aria-current={index === selectedIndex ? "step" : undefined}
                  className="relative py-4 md:min-h-[10svh] md:py-16 md:pl-8 border-t border-foreground/20 md:border-0"
                >
                  <span
                    aria-hidden="true"
                    className={`hidden md:block absolute -left-1.5 top-12 size-3 rounded-full md:top-18 ${index <= selectedIndex ? "bg-accent" : "bg-foreground/25"}`}
                  />
                  <div data-timeline-content className="space-y-1 md:space-y-3">
                    <p className="text-3xl md:text-lg text-foreground font-medium md:font-normal md:text-foreground/50">
                      {item.year} { index === items.length -1 && '- Now' }
                    </p>
                    <h3
                      className={`text-3xl font-medium leading-tight md:text-5xl transition-colors ${index === selectedIndex ? "text-foreground" : "md:text-foreground/50"}`}
                    >
                      {item.title}
                    </h3>
                    <p className="text-base leading-relaxed text-foreground/60 md:text-lg">
                      {item.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
