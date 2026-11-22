"use client"

import Image from "next/image";
import Link from "next/link";
import { CSSProperties, MouseEvent, useEffect, useRef } from "react";
import type { Project } from "@/features/projects/types";



export function WorkGallery({ projects, reversed = false }: { projects: Project[]; reversed?: boolean }) {
  const firstImage = useRef<HTMLDivElement>(null);
  const secondImage = useRef<HTMLDivElement>(null);
  const motion = useRef({
    target: reversed ? 100 / 3 : 200 / 3,
    current: reversed ? 100 / 3 : 200 / 3,
    frame: null as number | null,
    previousTime: null as number | null,
  });

  useEffect(() => {
    const animation = motion.current;
    return () => {
      if (animation.frame !== null) cancelAnimationFrame(animation.frame);
      animation.frame = null;
      animation.previousTime = null;
    };
  }, []);

  const isPair = projects.length === 2;
  if (projects.length === 0) return null;

  const manageMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!isPair || !firstImage.current || !secondImage.current) return;
    if (!window.matchMedia("(min-width: 768px) and (hover: hover) and (pointer: fine)").matches) return;

    const { left, width } = event.currentTarget.getBoundingClientRect();
    if (width === 0) return;
    const progress = Math.max(0, Math.min(1, (event.clientX - left) / width));
    const animation = motion.current;
    // Reversed only changes the starting layout, never the hover direction.
    animation.target = (2 - progress) * 100 / 3;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      if (animation.frame !== null) cancelAnimationFrame(animation.frame);
      animation.frame = null;
      animation.previousTime = null;
      animation.current = animation.target;
      firstImage.current.style.setProperty("--gallery-width", `${animation.current}%`);
      secondImage.current.style.setProperty("--gallery-width", `${100 - animation.current}%`);
      return;
    }

    if (animation.frame !== null) return;

    const animate = (time: number) => {
      if (!firstImage.current || !secondImage.current) {
        animation.frame = null;
        animation.previousTime = null;
        return;
      }
      const delta = animation.previousTime === null ? 1000 / 60 : time - animation.previousTime;
      animation.previousTime = time;
      // Equivalent to speed 0.15 at 60fps, consistent across refresh rates.
      const easing = 1 - Math.pow(1 - 0.15, delta / (1000 / 60));
      animation.current += (animation.target - animation.current) * easing;
      const settled = Math.abs(animation.target - animation.current) < 0.01;
      if (settled) animation.current = animation.target;

      firstImage.current.style.setProperty("--gallery-width", `${animation.current}%`);
      secondImage.current.style.setProperty("--gallery-width", `${100 - animation.current}%`);

      if (settled) {
        animation.frame = null;
        animation.previousTime = null;
      } else {
        animation.frame = requestAnimationFrame(animate);
      }
    };

    animation.frame = requestAnimationFrame(animate);
  };

  return (
    <div onMouseMove={isPair ? manageMouseMove : undefined} className="flex flex-col items-start gap-8 mt-8 md:mt-[5vh] md:flex-row md:gap-0">
      {projects.map((project, index) => {
        const firstWidth = reversed ? 100 / 3 : 200 / 3;
        const width = isPair ? (index === 0 ? firstWidth : 100 - firstWidth) : 100;

        return (
          <div
            key={project.src}
            ref={index === 0 ? firstImage : secondImage}
            className="w-full min-w-0 shrink-0 md:w-(--gallery-width)"
            style={{ "--gallery-width": `${width}%` } as CSSProperties}
          >
            <Link href={`/projects/${project.slug}`} className="block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
            <div className="relative aspect-3/2">
              <Image
                src={project.src}
                fill
                sizes={isPair ? "(max-width: 767px) 100vw, 67vw" : "100vw"}
                alt={project.name}
                className="object-cover"
              />
            </div>
            <div className="text-base p-2.5">
              <h6 className="text-base uppercase">{project.name}</h6>
              <p>{project.description}</p>
              <p>{project.year}</p>
            </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
