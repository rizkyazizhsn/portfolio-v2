"use client";

import { useMenuAnimation } from "./hooks/use-menu-animation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SplitTextHover } from "@/components/animations/split-text-hover";

const links = [
  { label: "HOME", href: "#home" },
  { label: "ABOUT", href: "#about" },
  { label: "WORK", href: "#work" },
  { label: "CONTACT", href: "#contact" },
];

const buttonClass = "rounded-xl border border-white/20 bg-white/10 px-5 py-4 text-base uppercase text-[#E7E1D7] backdrop-blur-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";

export function Navbar({ className = "" }: { className?: string }) {
  const isHome = usePathname() === "/";
  const sectionHref = (hash: string) => isHome ? hash : `/${hash}`;
  const { open, dialog, toolbar, menuButton, dialogId, close, toggle } = useMenuAnimation();

  return (
    <>
      <nav ref={toolbar} className={`z-50 flex-between ${className}`}>
        <Link href={sectionHref("#info")} onClick={close} aria-label="Rizky Aziz — home" className={buttonClass}>RA.</Link>
        <button ref={menuButton} type="button" aria-haspopup="dialog" aria-expanded={open} aria-controls={dialogId}
          onClick={toggle} className={`${buttonClass} flex items-center gap-3`}>
          <span aria-hidden="true" className="size-2 rounded-full bg-accent" />
          Menu
        </button>
      </nav>

      <dialog ref={dialog} id={dialogId} aria-label="Main navigation" data-lenis-prevent
        onCancel={close} onClose={close}
        style={{ clipPath: "inset(100% 0% 0% 0%)" }}
        className="fixed inset-0 z-40 m-0 h-dvh max-h-none w-full max-w-none border-0 bg-[#0B0B0B] p-0 text-[#E7E1D7]">
        <div className="flex min-h-full flex-col p-6">
          <nav aria-label="Main" className="flex flex-1 items-center justify-center py-8">
            <ul className="flex flex-col items-center">
              {links.map(({ label, href }) => (
                <li key={href} className="text-center">
                  <Link data-menu-link href={sectionHref(href)} onClick={close}
                    className="block text-[clamp(3rem,min(12vw,15dvh),10rem)] leading-none tracking-tight uppercase group focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
                    <SplitTextHover label={label} hoverClassName="text-accent">
                      {label.split(/(O)/).map((part, index) => part === "O"
                        ? <span key={index} className="playfair-0">{part}</span>
                        : part)}
                    </SplitTextHover>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </dialog>
    </>
  );
}
