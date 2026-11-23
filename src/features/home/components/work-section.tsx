import { animationPresets } from "@/lib/animation/config";
import { WorkAnimation } from "./work-animation";
import { projects } from "@/features/projects/data/projects";
import { WorkGallery } from "./work-gallery";
import { SectionLink } from "@/components/ui/section-link";

export function WorkSection() {
  const timing = animationPresets.work;
  const selectedProjects = projects.slice(0, 6)
  const projectPairs = Array.from(
    { length: Math.ceil(selectedProjects.length / 2) },
    (_, index) => selectedProjects.slice(index * 2, index * 2 + 2),
  );

  return (
    <WorkAnimation>
      <h6 data-animate="fade-up" data-animate-at={0} data-animate-duration={timing.fadeDuration} className="uppercase">
        the w<span className="playfair-0">o</span>k I d
        <span className="playfair-0">o</span>, and business I help.
      </h6>
      <div className="overflow-hidden">
        <div
          data-animate="reveal-up" data-animate-from={100} data-animate-at={timing.titleStart} data-animate-duration={timing.titleDuration}
          className="text-6xl md:text-[180px] uppercase  leading-tight"
        >
          Selected W<span className="playfair-0">o</span>rks
      </div>
      </div>
      {projectPairs.map((pair, index) => (
        <WorkGallery
          key={pair[0].src}
          projects={pair}
          reversed={index % 2 !== 0}
        />
      ))}
      <div data-animate="fade-up" className="mt-10 flex justify-end md:mt-14">
        <SectionLink href="/projects">
          <span>All pr<span className="playfair-0">o</span>jects</span>
        </SectionLink>
      </div>
    </WorkAnimation>
  );
}
