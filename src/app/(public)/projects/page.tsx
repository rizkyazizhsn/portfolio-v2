"use client";

import { SectionReveal } from "@/components/animations/section-reveal";
import { PageShell } from "@/components/layout/page-shell";
import { ContactSection } from "@/features/home/components/contact-section";
import { projects } from "@/features/projects/data/projects";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProjectsPage() {
  const router = useRouter();

  return (
    <PageShell>
      <div className="pt-[6svh]">
        {/* button back */}
        <SectionReveal>
          <button
            data-animate="fade-up"
            className="flex items-center gap-2 uppercase text-base mb-6 group cursor-pointer"
            onClick={() => router.back()}
          >
            {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-move-left preview-icon"><path d="M6 8L2 12L6 16"/><path d="M2 12H22"/></svg> */}
            <span className="text-2xl motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:translate-x-0.5 motion-safe:group-focus-visible:-translate-x-0.5">
              ←
            </span>
            Back
          </button>
        </SectionReveal>
        {/* header */}
        <SectionReveal id="projects" stagger={0.2} duration={1}>
          <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] items-end gap-6">
            <div className="overflow-hidden leading-none">
              <h1
                data-animate="reveal-up"
                className="text-5xl md:text-[7vw] uppercase"
              >
                Pr<span className="playfair-0">o</span>jects
              </h1>
            </div>
            <div className="overflow-hidden">
              <h2
                data-animate="reveal-up"
                className="md:text-[1.5vw] text-foreground/75"
              >
                A selection of projects where thoughtful design meets precise
                engineering, brought to life through code and motion.
              </h2>
            </div>
          </div>
          <div
            data-animate="line"
            className="h-px bg-foreground/20 w-full mt-8 md:mt-20"
          />
        </SectionReveal>

        {/* Projects */}
        <SectionReveal
          id="project-gallery"
          distance={80}
          duration={1}
          className="grid grid-cols-1 md:grid-cols-3 gap-10 gap-y-20 py-20"
        >
          {projects.map((project, index) => (
            <Link
              href={`/projects/${project.slug}`}
              key={index}
              data-animate="fade-up"
              className="
                group block
                focus-visible:outline-2
                focus-visible:outline-offset-4
                focus-visible:outline-accent"
            >
              <div className="relative aspect-3/2 overflow-hidden">
                <Image
                  src={project.src}
                  fill
                  sizes={"67vw"}
                  alt={project.name}
                  className="
                  object-cover
                  motion-safe:transition-transform
                  motion-safe:duration-500
                  motion-safe:group-hover:scale-105
                  motion-safe:group-focus-visible:scale-105"
                />
              </div>
              <div className="flex justify-between mt-2">
                <div className="text-base">
                  <h6 className="text-base uppercase">{project.name}</h6>
                  <p>{project.description}</p>
                  <p>{project.year}</p>
                </div>
              </div>
            </Link>
          ))}
        </SectionReveal>

        {/* contacts */}
        <ContactSection />
      </div>
    </PageShell>
  );
}
