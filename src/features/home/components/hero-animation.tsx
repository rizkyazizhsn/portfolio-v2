"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

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

    media.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const hero = container.current;
      const page = hero?.closest("[data-menu-page]");
      const origin = hero?.querySelector<HTMLElement>("[data-hero-image-origin]");
      const image = hero?.querySelector<HTMLElement>("[data-hero-image-motion]");
      const destination = page?.querySelector<HTMLElement>("[data-about-image-target]");
      if (!hero || !origin || !image || !destination) return;
      const photo = image.querySelector("img");

      // Preserve the hero's original height before resizing its moving frame.
      gsap.set(origin, { height: origin.getBoundingClientRect().height });
      gsap.set(image, { position: "absolute", top: 0, left: 0 });

      // Measure the stationary slots, independent of the animated image transform.
      const geometry = () => {
        const from = origin.getBoundingClientRect();
        const to = destination.getBoundingClientRect();
        return { x: to.left - from.left, y: to.top - from.top, width: to.width, height: to.height };
      };

      const transition = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          endTrigger: destination,
          end: "top 30%",
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });
      transition.fromTo(image, { x: 0, y: 0, width: "100%", height: "100%" }, {
        x: () => geometry().x,
        y: () => geometry().y,
        width: () => geometry().width,
        height: () => geometry().height,
        duration: 1,
      }, 0);
      if (photo) {
        transition.fromTo(photo, { objectPosition: "50% 70%", scale: 1.1 }, {
          objectPosition: "50% 100%",
          scale: 1,
          duration: 1,
        }, 0);
      }
    });

    return () => media.revert();
  }, { scope: container });

  return (
    <section ref={container} id="home" className="section__header relative flex flex-col justify-between h-[calc(100svh-3rem)] pb-20">
      {children}
    </section>
  );
}
