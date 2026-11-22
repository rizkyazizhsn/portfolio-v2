import type { ReactNode } from "react";
import { SectionReveal } from "@/components/animations/section-reveal";

export function WorkAnimation({ children }: { children: ReactNode }) {
  return (
    <SectionReveal id="work" className="relative md:pt-32 pb-10 md:pb-32">
      {children}
    </SectionReveal>
  );
}
