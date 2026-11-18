import { ScrollTimeline } from "@/components/animations/scroll-timeline";
import { experiences } from "../data/experience";

export function ExperienceSection() {
  return <ScrollTimeline items={experiences} heading="History" className="my-20 md:my-32" />;
}
