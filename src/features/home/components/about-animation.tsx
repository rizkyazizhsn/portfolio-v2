import type { ReactNode } from "react";
import { SectionReveal } from "@/components/animations/section-reveal";

export function AboutAnimation({ children }: { children: ReactNode }) {
  return (
    <SectionReveal id="about" className="py-[20vh]">
      {children}
    </SectionReveal>
  );
}
