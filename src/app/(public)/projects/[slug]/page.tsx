import { notFound } from "next/navigation";
import { projects } from "@/features/projects/data/projects";
import type { Metadata } from "next";
import { PageShell } from "@/components/layout/page-shell";
import { ProjectCaseStudy } from "@/features/projects/components/project-case-study";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  return {
    title: project.name,
    description: project.description,
    alternates: { canonical: `/projects/${project.slug}` },
  };
}

export default async function ProjectsDetailPage({ params }: Props) {
  const { slug } = await params;
  const index = projects.findIndex((project) => project.slug === slug);
  const project = projects[index];
  if (!project) notFound();
  const nextProject =
    projects.length > 1 ? projects[(index + 1) % projects.length] : undefined;

  return (
    <PageShell key={project.slug}>
      <ProjectCaseStudy
        project={project}
        nextProject={nextProject}
        index={index}
        total={projects.length}
      />
    </PageShell>
  );
}
