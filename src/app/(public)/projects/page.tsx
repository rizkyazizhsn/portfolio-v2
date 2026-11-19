import { SectionReveal } from "@/components/animations/section-reveal";
import { projects } from "@/features/home/data/projects";
import Image from "next/image";

export default function ProjectsPage() {
  return (
    <main className="pt-[12svh]">
      {/* header */}
      <SectionReveal id="projects" stagger={0.2} duration={1}>
        <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] items-end gap-6">
          <div className="overflow-hidden leading-none">
            <h1 data-animate="reveal-up" className="text-5xl md:text-[7vw] uppercase">Pr<span className="font-playfair italic">o</span>jects</h1>
          </div>
          <div className="overflow-hidden">
            <h2 data-animate="reveal-up" className="md:text-[1.5vw] text-foreground/75">Short notes on how I work: design systems, AI, <br /> automations and the craft of shipping product.</h2>
          </div>
        </div>
        <div data-animate="line" className="h-px bg-foreground/20 w-full mt-8 md:mt-20" />
      </SectionReveal>

      {/* Projects */}
      <SectionReveal id="project-gallery" distance={80} duration={1}  className="grid grid-cols-1 md:grid-cols-2 gap-10 gap-y-20 py-20">
        {projects.map((project, index) => (
          <div key={index} data-animate="fade-up">
            <div className="relative aspect-3/2">
                <Image
                  src={project.src}
                  fill
                  sizes={"67vw"}
                  alt={project.name}
                  className="object-cover"
                />
            </div>
            <div className="flex justify-between mt-2">
              <div className="text-base">
                <h6 className="text-base uppercase">{project.name}</h6>
                <p>{project.description}</p>
              </div>
              <p>{project.year}</p>
            </div>
          </div>
        ))}
      </SectionReveal>
    </main>
  )
}