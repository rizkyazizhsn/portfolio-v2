"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

export function CursorTrail() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const root = container.current;
      if (!root) return;
      const dots = Array.from(root.querySelectorAll("span"));
      const trail = root.querySelector("path");
      const positions = Array.from({ length: 6 }, () => ({ x: 0, y: 0 }));
      const setters = dots.map((dot) => ({
        x: gsap.quickSetter(dot, "x", "px"),
        y: gsap.quickSetter(dot, "y", "px"),
      }));
      const target = { x: 0, y: 0 };
      let visible = false;
      let hovering = false;
      let fading = false;
      let lastMovement = 0;
      gsap.set(dots, { xPercent: -50, yPercent: -50 });

      const draw = () => {
        setters[0].x(positions[0].x);
        setters[0].y(positions[0].y);
        // One tapered ribbon avoids overlapping strokes and visible segment joints.
        const left: { x: number; y: number }[] = [];
        const right: { x: number; y: number }[] = [];
        positions.forEach((point, index) => {
          const previous = positions[Math.max(0, index - 1)];
          const next = positions[Math.min(positions.length - 1, index + 1)];
          const dx = next.x - previous.x;
          const dy = next.y - previous.y;
          const length = Math.hypot(dx, dy);
          const nx = length > 0.001 ? -dy / length : 0;
          const ny = length > 0.001 ? dx / length : 1;
          const radius = 4.5 * Math.pow(1 - index / (positions.length - 1), 1.4);
          left.push({ x: point.x + nx * radius, y: point.y + ny * radius });
          right.push({ x: point.x - nx * radius, y: point.y - ny * radius });
        });
        const outline = [...left, ...right.reverse()];
        const first = outline[0];
        const last = outline[outline.length - 1];
        let d = `M ${(last.x + first.x) / 2} ${(last.y + first.y) / 2}`;
        outline.forEach((point, index) => {
          const next = outline[(index + 1) % outline.length];
          d += ` Q ${point.x} ${point.y} ${(point.x + next.x) / 2} ${(point.y + next.y) / 2}`;
        });
        trail?.setAttribute("d", `${d} Z`);
      };

      const hide = () => {
        visible = false;
        hovering = false;
        fading = false;
        gsap.killTweensOf(root);
        gsap.set(root, { autoAlpha: 0 });
        gsap.killTweensOf(dots);
        gsap.set(dots[0], { scale: 1 });
      };
      const move = (event: PointerEvent) => {
        if (event.pointerType !== "mouse") return;
        if (visible && event.clientX === target.x && event.clientY === target.y) return;
        lastMovement = performance.now();
        target.x = event.clientX;
        target.y = event.clientY;
        if (!visible) {
          positions.forEach((position) => {
            position.x = target.x;
            position.y = target.y;
          });
          draw();
          visible = true;
          gsap.set(root, { autoAlpha: 1 });
        }
        if (fading) {
          fading = false;
          gsap.to(root, { autoAlpha: 1, duration: 0.15, overwrite: true });
        }
        const nextHover = event.target instanceof Element && Boolean(
          event.target.closest("a, button, [role='button'], input, textarea, select, [data-cursor-hover]"),
        );
        if (nextHover !== hovering) {
          hovering = nextHover;
          gsap.to(dots[0], { scale: hovering ? 1.8 : 1, duration: 0.25, overwrite: true });
        }
      };
      const tick = () => {
        if (!visible) return;
        if (!fading && performance.now() - lastMovement > 450) {
          fading = true;
          gsap.to(root, {
            autoAlpha: 0,
            duration: 0.4,
            ease: "power2.out",
            overwrite: true,
            onComplete: hide,
          });
        }
        const blend = 1 - Math.pow(0.7, gsap.ticker.deltaRatio());
        positions.forEach((position, index) => {
          const leader = index === 0 ? target : positions[index - 1];
          position.x += (leader.x - position.x) * blend;
          position.y += (leader.y - position.y) * blend;
        });
        draw();
      };
      const visibilityChange = () => { if (document.hidden) hide(); };
      window.addEventListener("pointermove", move, { passive: true });
      document.documentElement.addEventListener("pointerleave", hide);
      window.addEventListener("blur", hide);
      document.addEventListener("visibilitychange", visibilityChange);
      gsap.ticker.add(tick);
      return () => {
        window.removeEventListener("pointermove", move);
        document.documentElement.removeEventListener("pointerleave", hide);
        window.removeEventListener("blur", hide);
        document.removeEventListener("visibilitychange", visibilityChange);
        gsap.ticker.remove(tick);
        hide();
      };
    });
    return () => media.revert();
  }, { scope: container });

  return (
    <div ref={container} aria-hidden="true" className="pointer-events-none fixed inset-0 z-9999" style={{ visibility: "hidden", opacity: 0 }}>
      <svg width="100%" height="100%" className="absolute inset-0 overflow-visible" fill="none">
        <path fill="var(--color-accent, #C8FF5F)" style={{ opacity: 0.65, filter: "blur(2px)" }} />
      </svg>
        <span className="absolute left-0 top-0 rounded-full" style={{
          width: 10,
          height: 10,
          backgroundColor: "var(--color-accent, #C8FF5F)",
          filter: "blur(2px)",
        }} />
    </div>
  );
}
