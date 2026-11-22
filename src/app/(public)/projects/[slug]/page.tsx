import { notFound } from "next/navigation";
import { projects } from "@/features/projects/data/projects";

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export default async function ProjectsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!projects.some((project) => project.slug === slug)) notFound();

  return (
    <div>
      Project detail
    </div>
  )
}
