"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function WorkAnimation({ children }: { children: ReactNode }) {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: container.current,
          start: "top 70%",
          once: true,
        },
      })
        .from("[data-work-fade]", {
          y: 30,
          autoAlpha: 0,
          duration: 0.7,
          stagger: 0.1,
        }, 0)
        .from("[data-work-reveal]", {
          yPercent: 110,
          duration: 1,
          stagger: 0.12,
        }, 0.2);
    });

    return () => media.revert();
  }, { scope: container });

  return (
    <section ref={container} id="work" className="relative md:pt-32 pb-32">
      {children}
    </section>
  );
}
