"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type InfiniteMarqueeProps = {
  items: readonly string[];
  duration?: number;
  className?: string;
};

export function InfiniteMarquee({
  items,
  duration = 30,
  className = "",
}: InfiniteMarqueeProps) {
  const container = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        const root = container.current;
        if (!root || !track.current || !items.length) return;
        const loopDuration = Math.max(1, duration);

        const marquee = gsap.fromTo(
          track.current,
          { xPercent: 0 },
          {
            xPercent: -50,
            duration: loopDuration,
            repeat: -1,
            ease: "none",
            paused: true,
          },
        );

        marquee.totalTime(loopDuration * 100);

        marquee.eventCallback("onReverseComplete", () => {
          marquee.totalTime(loopDuration * 100);
        });

        let direction = 1;
        let visible = false;
        let directionTween: gsap.core.Tween | null = null;

        const directionTrigger = ScrollTrigger.create({
          onUpdate: (self) => {
            if (self.direction === direction) return;

            direction = self.direction;
            directionTween?.kill();
            if (!visible) {
              marquee.timeScale(direction);
              return;
            }

            directionTween = gsap.to(marquee, {
              timeScale: direction,
              duration: 0.4,
              ease: "power2.out",
              overwrite: true,
            });
          },
        });

        const observer = new IntersectionObserver(([entry]) => {
          visible = entry.isIntersecting;
          if (visible) {
            // resume() preserves the last scroll direction, including reverse.
            marquee.resume();
          } else {
            directionTween?.kill();
            marquee.timeScale(direction).pause();
          }
        });
        observer.observe(root);

        return () => {
          observer.disconnect();
          directionTrigger.kill();
          directionTween?.kill();
          marquee.kill();
        };
      });

      return () => media.revert();
    },
    {
      scope: container,
      dependencies: [duration, items],
      revertOnUpdate: true,
    },
  );

  if (!items.length) return null;

  return (
    <div
      ref={container}
      className={`overflow-hidden border-y border-foreground/15 py-8 ${className}`}
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <ul className="sr-only">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <div aria-hidden="true" className="overflow-hidden">
        <div ref={track} className="flex w-max motion-reduce:w-full">
          {[0, 1].map((copy) => (
            <div
              key={copy}
              className={`flex min-w-screen shrink-0 items-center justify-around motion-reduce:min-w-0 motion-reduce:flex-wrap motion-reduce:gap-y-4 ${copy === 1 ? "motion-reduce:hidden" : ""}`}
            >
              {items.map((item, index) => (
                <div
                  key={index}
                  className="flex shrink-0 items-center gap-6 pr-8 md:gap-12 md:pr-12"
                >
                  <span className="whitespace-nowrap text-base text-foreground/60 md:text-3xl">
                    {item}
                  </span>
                  <span className="size-1.5 shrink-0 rounded-full bg-accent" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
