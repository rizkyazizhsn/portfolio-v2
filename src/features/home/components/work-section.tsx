"use client"

import { useEffect, useRef, type MouseEvent, type CSSProperties } from "react";
import { WorkAnimation } from "./work-animation";
import Image from "next/image";

const projects = [
  {
    name: "MAVEN 11",
    client: "analogueagency",
    description: "New web design for the blockchain investment fund Maven 11.",
    src: "/images/projects/maven.png",
    year: 2022,
  },
  {
    name: "Wix Playground Homepage",
    client: "Wix Playground",
    description: "Wix Playground is powered by the Wix.com design team.",
    src: "/images/projects/wix.png",
    year: 2022,
  },
  {
    name: "POWELL—STUDIO",
    client: "POWELL—STUDIO",
    description: "The online presence for Powell—Studio.",
    src: "/images/projects/powell.png",
    year: 2023,
  },
  {
    name: "ROCKETPANDA",
    client: "ROCKETPANDA",
    description: "An Italian animation studio.",
    src: "/images/projects/rocketpanda.png",
    year: 2022,
  },
  {
    name: "C2 Montreal",
    client: "C2 Montreal",
    description: "C2 Montréal is Canada's premier creative-business event.",
    src: "/images/projects/c2mtl.png",
    year: 2021,
  },
  {
    name: "Design Is Funny",
    client: "Design Is Funny",
    description: "Funny is the design work of Daniele Buffa.",
    src: "/images/projects/design-is-funny.png",
    year: 2020,
  },
  {
    name: "Google Pixel Creator Labs",
    client: "Google Pixel Creator Labs",
    description: "A partnership between Google & SN37.",
    src: "/images/projects/creator-labs.png",
    year: 2020,
  },
  {
    name: "Decimal",
    client: "Decimal",
    description: "Portfolio site for Decimal.",
    src: "/images/projects/decimal.png",
    year: 2020,
  },
];

type Project = (typeof projects)[number];

function WorkGallery({ projects, reversed = false }: { projects: Project[]; reversed?: boolean }) {
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
    <div onMouseMove={isPair ? manageMouseMove : undefined} className="flex flex-col items-start gap-8 mt-8 md:mt-[10vh] md:flex-row md:gap-0">
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
          </div>
        );
      })}
    </div>
  );
}

export function WorkSection() {
  const projectPairs = Array.from(
    { length: Math.ceil(projects.length / 2) },
    (_, index) => projects.slice(index * 2, index * 2 + 2),
  );

  return (
    <WorkAnimation>
      <h6 data-work-fade className="uppercase">
        the w<span className="font-playfair italic">o</span>k I d
        <span className="font-playfair italic">o</span>, and business I help.
      </h6>
      <div className="overflow-hidden">
        <div
          data-work-reveal
          className="text-6xl md:text-[180px] uppercase  leading-tight"
        >
          Selected W<span className="font-playfair italic">o</span>rks
      </div>
      </div>
      {projectPairs.map((pair, index) => (
        <WorkGallery
          key={pair[0].src}
          projects={pair}
          reversed={index % 2 !== 0}
        />
      ))}
    </WorkAnimation>
  );
}
