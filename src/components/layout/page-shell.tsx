import type { ReactNode } from "react";
import { Navbar } from "./navbar";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div data-menu-page className="flex-1">
      <Navbar className="sticky top-6" />
      <div data-menu-content>{children}</div>
    </div>
  );
}
