import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { Project, ProjectCaseStudy } from "../types";
import { SectionReveal } from "@/components/animations/section-reveal";
import { ScrollScale } from "@/components/animations/scroll-scale";

const focusClass = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";

function Arrow({ className = "size-5" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      <path d="M5 19 19 5M5 5h14v14" />
    </svg>
  );
}

function StudySection({ number, title, children }: { number: string; title: string; children: ReactNode }) {
  return (
    <SectionReveal start="top 85%" className="relative grid gap-8 py-12 md:grid-cols-[1fr_2fr] md:gap-16 md:py-20">
      <div data-animate="line" data-animate-at={0} aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-foreground/20" />
      <h2 data-animate="fade-up" data-animate-at={0.1} className="flex items-baseline gap-2 text-sm uppercase">
        <span className="text-sm text-accent">{number}</span>{title}
      </h2>
      <div data-animate="fade-up" data-animate-at={0.2} className="min-w-0">{children}</div>
    </SectionReveal>
  );
}

function draftStudy(project: Project): ProjectCaseStudy {
  return {
    role: "Frontend Developer",
    duration: "To be documented",
    technologies: ["Next.JS", "TypeScript", "Tailwind CSS", "React Hook Form", "Zustand",  "Tanstack Query", "REST APIs"],
    overview: project.description,
    challenge: "The project brief, audience, and constraints will be documented here. This section will explain the problem to solve and what a successful outcome looks like.",
    approach: [
      { title: "Understanding the brief", description: "Outline the requirements, priorities, and constraints that informed the project." },
      { title: "Design into development", description: "Document the component structure, responsive behavior, and important implementation decisions." },
      { title: "Details that matter", description: "Show how accessibility, interactions, and performance were considered, with examples from the implementation." },
    ],
    results: [
      { title: "The outcome", description: "Add verified outcomes, delivered functionality, and feedback from the project." },
      { title: "The evidence", description: "Include before-and-after comparisons or measurements, with the context needed to understand them." },
    ],
    reflection: "Document the main lesson, a trade-off worth revisiting, and what could be improved in the next iteration.",
  };
}

export function ProjectCaseStudy({ project, nextProject, index, total }: {
  project: Project;
  nextProject?: Project;
  index: number;
  total: number;
}) {
  const study = project.caseStudy ?? draftStudy(project);
  const isDraft = !project.caseStudy;
  const facts = [
    { label: "Client", value: project.client },
    { label: "Year", value: String(project.year) },
    { label: "My role", value: study.role },
    { label: "Timeline", value: study.duration },
  ];

  return (
    <main className="pt-[8svh] pb-12 md:pt-[6svh] md:pb-20">
      {/* Page Back */}
      <SectionReveal start="top 95%">
        <div data-animate="fade-up" className="flex flex-wrap items-center justify-between gap-5 text-sm uppercase">
          <Link href="/projects" className={`inline-flex items-center gap-3 hover:text-accent group ${focusClass}`}>
            <span className="text-2xl motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:translate-x-0.5 motion-safe:group-focus-visible:-translate-x-0.5">
              ←
            </span>
            <span>All pr<span className="playfair-0">o</span>jects</span>
          </Link>
          <p className="text-xs text-foreground/50">Case study / {String(index + 1).padStart(2, "0")} — {String(total).padStart(2, "0")}</p>
        </div>

        <header className="flex-between py-10 md:py-16">
          <div className="col-start">
            <p data-animate="fade-up" className="text-sm uppercase text-accent">Selected w<span className="playfair-0">o</span>rk / {project.year}</p>
            <div className="overflow-hidden pb-2">
              <h1 data-animate="reveal-up" className="max-w-[18ch] text-[clamp(3rem,7.5vw,9rem)] leading-[1.02] tracking-tight uppercase wrap-break-word">
                {project.name}
              </h1>
            </div>
          </div>
          <div>
            <p data-animate="fade-up" className="max-w-3xl text-xl leading-relaxed text-foreground/75 md:text-3xl">{project.description}</p>
            {(study.websiteUrl || study.repositoryUrl) && (
              <div data-animate="fade-up" className="mt-6 flex flex-wrap gap-6 text-sm uppercase">
                {study.websiteUrl && <a href={study.websiteUrl} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-3 hover:text-accent ${focusClass}`}>Live website<Arrow /></a>}
                {study.repositoryUrl && <a href={study.repositoryUrl} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-3 hover:text-accent ${focusClass}`}>Source code<Arrow /></a>}
              </div>
            )}
          </div>
        </header>
      </SectionReveal>

      <SectionReveal as="figure" start="top 95%">
        <ScrollScale>
          <div className="relative aspect-4/3 overflow-hidden rounded-2xl bg-foreground/5 md:aspect-video md:rounded-3xl">
            <Image data-animate="reveal-up" data-animate-from={20} data-animate-fade src={project.src} alt={`${project.name} website preview`} fill preload
              sizes="(max-width: 767px) calc(100vw - 2rem), calc(100vw - 3rem)" className="object-cover object-top" />
          </div>
        </ScrollScale>
        <figcaption data-animate="fade-up" className="flex flex-wrap justify-between gap-3 py-4 text-xs uppercase text-foreground/50">
          <span>{project.name} — Project preview</span><span>{project.client} / {project.year}</span>
        </figcaption>
      </SectionReveal>

      {/* {isDraft && (
        <p className="mb-10 mt-4 rounded-xl border border-foreground/15 px-5 py-4 text-sm leading-relaxed text-foreground/55">
          <span className="mr-3 text-accent">Case study in progress.</span>
          The sections below are a draft structure. Contributions, implementation details, and outcomes are yet to be documented.
        </p>
      )} */}

      <StudySection number="01" title="Overview">
        <p className="max-w-3xl text-2xl leading-relaxed md:text-4xl">{study.overview}</p>
        <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-8 md:mt-14 md:grid-cols-4">
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt className="mb-3 text-xs uppercase text-foreground/45">{fact.label}</dt>
              <dd className="text-base md:text-lg">{fact.value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-10">
          <h3 className="mb-4 text-xs uppercase text-foreground/45">Built with</h3>
          {study.technologies.length ? (
            <ul className="flex flex-wrap gap-2">
              {study.technologies.map((technology) => <li key={technology} className="rounded-full border border-foreground/20 px-4 py-2 text-sm">{technology}</li>)}
            </ul>
          ) : <p className="text-sm text-foreground/55">Technical details coming soon.</p>}
        </div>
      </StudySection>

      <StudySection number="02" title="The challenge">
        <p className="max-w-3xl text-xl leading-relaxed text-foreground/70 md:text-2xl">{study.challenge}</p>
      </StudySection>

      <StudySection number="03" title="The approach">
        <ol className="divide-y divide-foreground/15">
          {study.approach.map((note, noteIndex) => (
            <li key={note.title} className="grid gap-4 py-8 first:pt-0 md:grid-cols-[3rem_1fr]">
              <span className="text-sm text-accent">{String(noteIndex + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="text-2xl font-medium md:text-3xl">{note.title}</h3>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-foreground/60 md:text-lg">{note.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </StudySection>

      <StudySection number="04" title="Results & impact">
        <div className="grid gap-5 md:grid-cols-2">
          {study.results.map((result) => (
            <div key={result.title} className="rounded-2xl border border-foreground/15 p-6 md:p-8">
              <h3 className="text-2xl text-accent">{result.title}</h3>
              <p className="mt-4 text-base leading-relaxed text-foreground/60">{result.description}</p>
            </div>
          ))}
        </div>
      </StudySection>

      <StudySection number="05" title="Looking back">
        <p className="max-w-3xl text-xl leading-relaxed text-foreground/70 md:text-2xl">{study.reflection}</p>
        <a href="mailto:rizkyaziz.hsn@gmail.com" className={`mt-8 inline-flex items-center gap-3 text-sm uppercase text-accent ${focusClass}`}>
          Let&apos;s talk about your project<Arrow />
        </a>
      </StudySection>

      {nextProject && (
        <SectionReveal as="nav" aria-label="Project navigation" start="top 85%" className="relative pt-10 md:pt-16">
          <div data-animate="line" aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-foreground/20" />
          <p data-animate="fade-up" className="mb-6 text-xs uppercase text-foreground/45">Up next</p>
          <Link data-animate="fade-up" href={`/projects/${nextProject.slug}`} className={`grid items-center gap-6 rounded-sm hover:text-accent md:grid-cols-[1fr_auto] ${focusClass}`}>
            <span className="text-[clamp(2rem,5vw,6rem)] leading-tight tracking-tight uppercase">{nextProject.name}</span>
            <Arrow className="size-12 md:size-20" />
          </Link>
        </SectionReveal>
      )}
    </main>
  );
}
