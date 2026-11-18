"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

type SlideNumberProps = {
  value: number;
  className?: string;
  duration?: number;
  direction?: "auto" | "up" | "down";
};

export function SlideNumber({
  value,
  className = "",
  duration = 0.65,
  direction = "auto",
}: SlideNumberProps) {
  const container = useRef<HTMLSpanElement>(null);
  const previous = useRef(value);
  const digits = String(value).split("");

  useGSAP(() => {
    const oldValue = previous.current;
    const columns = Array.from(container.current?.querySelectorAll<HTMLElement>("[data-number-column]") ?? []);
    const count = columns.length;
    const format = (number: number) => String(number).padStart(count, " ").slice(-count);
    const movingUp = direction === "up" || (direction === "auto" && value > oldValue);
    const offset = movingUp ? 100 : -100;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const cells = columns.map((column) => ({
      current: column.querySelector<HTMLElement>("[data-number-current]"),
      outgoing: column.querySelector<HTMLElement>("[data-number-outgoing]"),
    }));

    const instant = reducedMotion || duration <= 0 || !Number.isSafeInteger(oldValue) || !Number.isSafeInteger(value);
    const initialDigits = format(instant ? value : oldValue);
    cells.forEach(({ current, outgoing }, index) => {
      if (current) gsap.set(current, { textContent: initialDigits[index], yPercent: 0 });
      if (outgoing) gsap.set(outgoing, { autoAlpha: 0 });
    });
    if (instant || oldValue === value) {
      previous.current = value;
      return;
    }

    const stepCount = Math.abs(value - oldValue);
    const increment = value > oldValue ? 1 : -1;
    // `duration` remains the total transition time, including all intermediate values.
    const stepDuration = duration / stepCount;
    const timeline = gsap.timeline({ defaults: { ease: "none" } });

    for (let step = 1; step <= stepCount; step++) {
      const nextValue = oldValue + increment * step;
      const before = format(nextValue - increment);
      const after = format(nextValue);
      const start = (step - 1) * stepDuration;

      cells.forEach(({ current, outgoing }, index) => {
        if (!current || !outgoing || before[index] === after[index]) return;

        timeline
          .set(outgoing, { textContent: before[index], yPercent: 0, autoAlpha: 1 }, start)
          .set(current, { textContent: after[index], yPercent: offset }, start)
          .to(outgoing, { yPercent: -offset, duration: stepDuration }, start)
          .to(current, { yPercent: 0, duration: stepDuration }, start);
      });

      // Resume from the last completed value if a new target interrupts the sequence.
      timeline.call(() => { previous.current = nextValue; }, [], step * stepDuration);
    }
  }, {
    scope: container,
    dependencies: [value, duration, direction],
    revertOnUpdate: true,
  });

  return (
    <span ref={container} aria-label={String(value)} className={`inline-flex tabular-nums leading-none ${className}`}>
      {digits.map((digit, index) => (
        <span key={digits.length - index} data-number-column aria-hidden="true" className="relative inline-block overflow-hidden tracking-tight">
          <span className="invisible">{digit}</span>
          <span data-number-outgoing className="invisible absolute inset-0 text-center" />
          <span data-number-current className="absolute inset-0 text-center">{digit}</span>
        </span>
      ))}
    </span>
  );
}
