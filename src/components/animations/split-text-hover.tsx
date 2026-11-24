"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

export function SplitTextHover({ label, className = "", hoverClassName = "", children }: { label: string; className?: string; hoverClassName?: string; children: ReactNode }) {
  const container = useRef<HTMLSpanElement>(null);
  const original = useRef<HTMLSpanElement>(null);
  const duplicate = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = container.current
    if (!root || !original.current || !duplicate.current) return;
    const media = gsap.matchMedia();
    let disposed = false;

    document.fonts.ready.then(() => {
      if (disposed) return;
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const first = SplitText.create(original.current, { type: "chars", tag: "span", aria: "none" });
        const second = SplitText.create(duplicate.current, { type: "chars", tag: "span", aria: "none" });
        // SplitText leaves span wrappers inline; transforms require inline-block.
        gsap.set([...first.chars, ...second.chars], { display: "inline-block" });
        gsap.set(second.chars, { yPercent: 120 });
        gsap.set(duplicate.current, { visibility: "visible" });

        const timeline = gsap.timeline({ paused: true, defaults: { duration: 0.45, ease: "power3.inOut", stagger: 0.035 } })
          .to(first.chars, { yPercent: -120 }, 0)
          .to(second.chars, { yPercent: 0 }, 0);

        const enter = (event: PointerEvent) => {
          if (event.pointerType === "mouse") timeline.play();
        };
        const leave = () => {
          if (!root.matches(":focus-visible")) timeline.reverse();
        };
        const focus = () => {
          if (root.matches(":focus-visible")) timeline.play();
        };
        const blur = () => {
          if (!root.matches(":hover")) timeline.reverse();
        };

        root.addEventListener("pointerenter", enter);
        root.addEventListener("pointerleave", leave);
        root.addEventListener("focus", focus);
        root.addEventListener("blur", blur);

        return () => {
          root.removeEventListener("pointerenter", enter);
          root.removeEventListener("pointerleave", leave);
          root.removeEventListener("focus", focus);
          root.removeEventListener("blur", blur);
          timeline.kill();
          second.revert();
          first.revert();
        };
      });
    });

    return () => {
      disposed = true;
      media.revert();
    };
  }, [label]);

  return (
    <span ref={container} className={`relative block overflow-hidden ${className}`}>
      <span className="sr-only">{label}</span>
      <span ref={original} aria-hidden="true" className="block whitespace-nowrap py-[0.08em]">{children}</span>
      <span ref={duplicate} aria-hidden="true" className={`pointer-events-none absolute inset-x-0 top-0 block whitespace-nowrap py-[0.08em] ${hoverClassName}`} style={{ visibility: "hidden" }}>{children}</span>
    </span>
  );
}
