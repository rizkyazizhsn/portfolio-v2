"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function ScrollScale({ children }: { children: ReactNode }) {
  const container = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(content.current, { scale: 0.75 }, {
        scale: 1,
        transformOrigin: "center center",
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top bottom",
          end: "top 20%",
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });
    });

    return () => media.revert();
  }, { scope: container });

  return (
    <div ref={container}>
      <div ref={content}>{children}</div>
    </div>
  );
}
