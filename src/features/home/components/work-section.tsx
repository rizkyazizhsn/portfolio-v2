"use client"

import { WorkAnimation } from "./work-animation";
import { projects } from "../data/projects";
import { WorkGallery } from "./work-gallery";

export function WorkSection() {
  const projectPairs = Array.from(
    { length: Math.ceil(projects.length / 2) },
    (_, index) => projects.slice(index * 2, index * 2 + 2),
  );

  return (
    <WorkAnimation>
      <h6 data-work-fade className="uppercase">
        the w<span className="playfair-0">o</span>k I d
        <span className="playfair-0">o</span>, and business I help.
      </h6>
      <div data-work-parallax className="overflow-hidden">
        <div
          data-work-reveal
          className="text-6xl md:text-[180px] uppercase  leading-tight"
        >
          Selected W<span className="playfair-0">o</span>rks
      </div>
      </div>
      {projectPairs.slice(0, 6).map((pair, index) => (
        <WorkGallery
          key={pair[0].src}
          projects={pair}
          reversed={index % 2 !== 0}
        />
      ))}
    </WorkAnimation>
  );
}
