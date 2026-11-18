"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function AboutAnimation({ children }: { children: ReactNode }) {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const timeline = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: container.current,
          start: "top 70%",
          once: true,
        },
      });

      timeline.from("[data-about-title]", {
        yPercent: 110,
        duration: 0.8,
      }, 0);

      container.current?.querySelectorAll<HTMLElement>("[data-about-row]").forEach((row, index) => {
        const start = 0.15 + index * 0.12;
        timeline
          .from(row.querySelector("[data-about-line]"), { width: "0%", duration: 1 }, start)
          .from(row.querySelectorAll("[data-about-text]"), {
            yPercent: 110,
            autoAlpha: 0,
            duration: 0.7,
            stagger: 0.08,
          }, start + 0.1);
      });

      timeline.from("[data-about-button]", {
        y: 30,
        autoAlpha: 0,
        duration: 0.7,
      }, "-=0.3");
    });
    return () => media.revert();
  }, { scope: container });

  return (
    <section ref={container} id="about" className="py-[20vh]">
      {children}
    </section>
  );
}
