import { InfiniteMarquee } from "@/components/animations/infinite-marquee";

const skills = [
  "Figma",
  "React",
  "Next.js",
  "TypeScript",
  "Github",
  "Tailwind CSS",
  "GSAP",
  "REST APIs"

]

export function SkillSection() {
  return <InfiniteMarquee items={skills} className="mb-28" />
}