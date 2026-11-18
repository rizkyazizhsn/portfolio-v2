"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export function FooterAnimation({ children }: { children: ReactNode }) {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const footer = container.current;
      if (!footer) return;
      const reveal = gsap.timeline({
        paused: true,
        defaults: { ease: "power3.out", immediateRender: false },
      })
        .fromTo("[data-footer-fade]", { y: 30, autoAlpha: 0 }, {
          y: 0, autoAlpha: 1, duration: 0.7, stagger: 0.06,
          clearProps: "transform,opacity,visibility",
        }, 0)
        .fromTo("[data-footer-line]", { width: "0%" }, { width: "100%", duration: 1.2 }, 0.3)
        .fromTo("[data-footer-marquee]", { y: 40, autoAlpha: 0 }, {
          y: 0, autoAlpha: 1, duration: 0.8,
          clearProps: "transform,opacity,visibility",
        }, 0.5);

      const marquee = gsap.to("[data-footer-track]", {
        xPercent: -50,
        duration: 24,
        ease: "none",
        repeat: -1,
        paused: true,
      });
      let revealed = false;
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          if (!revealed) {
            revealed = true;
            reveal.play();
          }
          marquee.play();
        } else {
          marquee.pause();
        }
      });
      observer.observe(footer);
      return () => observer.disconnect();
    });
    return () => media.revert();
  }, { scope: container });

  return (
    <footer ref={container} id="contact" className="min-h-[50vh] relative">
      {children}
    </footer>
  );
}
