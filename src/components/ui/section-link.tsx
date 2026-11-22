import Link from "next/link";
import type { ReactNode } from "react";

export function SectionLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href}
      className="group inline-flex w-fit items-center justify-between gap-8 rounded-full border border-foreground/25 px-6 py-4 text-sm uppercase hover:border-accent hover:bg-accent hover:text-background focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent motion-safe:transition-colors motion-safe:duration-300">
      {children}
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
        className="size-5 shrink-0 motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5 motion-safe:group-focus-visible:-translate-y-0.5 motion-safe:group-focus-visible:translate-x-0.5">
        <path d="M5 19 19 5M5 5h14v14" />
      </svg>
    </Link>
  );
}
