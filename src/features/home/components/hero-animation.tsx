"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export function HeroAnimation({ children }: { children: ReactNode }) {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.timeline({ defaults: { ease: "power3.out" } })
        .from("[data-hero-fade]", {
          y: 30,
          autoAlpha: 0,
          duration: 1,
          opacity: 0,
          delay: 0.5,
        })
        .from("[data-hero-line]", { width: "0%", duration: 2 }, "<")
        .from("[data-hero-title]", {
          yPercent: 100,
          duration: 1,
          stagger: 0.3,
        }, "<0.3")
        .from("[data-hero-image]", {
          clipPath: "inset(100% 0% 0% 0%)",
          y: 40,
          duration: 1,
        }, "<");
    });

    return () => media.revert();
  }, { scope: container });

  return (
    <section ref={container} className="section__header relative flex flex-col justify-between h-screen pb-20">
      {children}
    </section>
  );
}
