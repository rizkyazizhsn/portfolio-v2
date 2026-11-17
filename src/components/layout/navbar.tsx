"use client";

import { useEffect, useId, useRef, useState } from "react";
import gsap from "gsap";

const links = [
  { label: "HOME", href: "#home" },
  { label: "ABOUT", href: "#about" },
  { label: "WORK", href: "#work" },
  { label: "CONTACT", href: "#contact" },
];

const buttonClass = "rounded-xl border border-white/20 bg-white/10 px-5 py-4 text-base uppercase text-[#E7E1D7] backdrop-blur-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C8FF5F]";

export function Navbar({ className = "" }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const toolbar = useRef<HTMLElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const savedOverflow = useRef("");
  const dialogId = useId();

  useEffect(() => {
    const panel = dialog.current;
    const trigger = menuButton.current;
    const content = toolbar.current?.closest("[data-menu-page]")?.querySelectorAll<HTMLElement>("[data-menu-content]");
    if (!panel) return;
    savedOverflow.current = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!panel.open) return;
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
      }
      if (event.key === "Tab") {
        const controls = [
          ...Array.from(panel.querySelectorAll<HTMLElement>("a[href], button")),
          ...Array.from(toolbar.current?.querySelectorAll<HTMLElement>("a[href], button") ?? []),
        ];
        const index = controls.indexOf(document.activeElement as HTMLElement);
        const next = (index + (event.shiftKey ? -1 : 1) + controls.length) % controls.length;
        event.preventDefault();
        controls[next]?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      panel.close();
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = savedOverflow.current;
      content?.forEach((element) => {
        gsap.killTweensOf(element);
        gsap.set(element, { clearProps: "transform,opacity,visibility" });
      });
      trigger?.focus({ preventScroll: true });
    };
  }, []);

  useEffect(() => {
    const panel = dialog.current;
    if (!panel) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const menuLinks = panel.querySelectorAll("[data-menu-link]");
    const content = toolbar.current?.closest("[data-menu-page]")?.querySelectorAll<HTMLElement>("[data-menu-content]");
    const contentDuration = reducedMotion ? 0 : 0.35;
    const panelStart = open && content?.length ? contentDuration : 0;

    if (open) {
      if (!panel.open) {
        gsap.set(menuLinks, { autoAlpha: 0, y: reducedMotion ? 0 : 40 });
        savedOverflow.current = document.body.style.overflow;
        // Keep the panel below the existing toolbar in the page stacking order.
        panel.show();
      }
      document.body.style.overflow = "hidden";
    } else if (!panel.open) {
      return;
    }

    const animation = gsap.timeline({
      onComplete: () => {
        if (!open) {
          panel.close();
          document.body.style.overflow = savedOverflow.current;
          menuButton.current?.focus({ preventScroll: true });
        }
      },
    });

    if (open && content?.length) {
      animation.to(content, {
        autoAlpha: 0,
        y: reducedMotion ? 0 : 40,
        duration: contentDuration,
        ease: "power2.in",
        overwrite: true,
      }, 0);
    }

    animation.to(panel, {
      clipPath: open ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)",
      duration: reducedMotion ? 0 : open ? 0.8 : 0.55,
      ease: "power3.inOut",
      overwrite: true,
    }, panelStart);

    animation.to(menuLinks, {
      autoAlpha: open ? 1 : 0,
      y: open || reducedMotion ? 0 : 24,
      duration: reducedMotion ? 0 : open ? 0.6 : 0.2,
      stagger: reducedMotion ? 0 : { each: open ? 0.1 : 0.04, from: open ? "start" : "end" },
      ease: open ? "power3.out" : "power2.in",
      overwrite: true,
      // delay: open ? 0.2 : 0,
    }, open && !reducedMotion ? panelStart + 0.4 : 0);

    if (!open && content?.length) {
      animation.to(content, {
        autoAlpha: 1,
        y: 0,
        duration: contentDuration,
        ease: "power2.out",
        overwrite: true,
        clearProps: "transform,opacity,visibility",
      });
    }

    return () => { animation.kill(); };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <nav ref={toolbar} className={`z-50 flex items-center justify-between ${className}`}>
        <a href="#info" onClick={close} aria-label="Rizky Aziz — home" className={buttonClass}>RA.</a>
        <button ref={menuButton} type="button" aria-haspopup="dialog" aria-expanded={open} aria-controls={dialogId}
          onClick={() => setOpen((value) => !value)} className={`${buttonClass} flex items-center gap-3`}>
          <span aria-hidden="true" className="size-2 rounded-full bg-[#C8FF5F]" />
          Menu
        </button>
      </nav>

      <dialog ref={dialog} id={dialogId} aria-label="Main navigation" data-lenis-prevent
        onCancel={close} onClose={close}
        style={{ clipPath: "inset(100% 0% 0% 0%)" }}
        className="fixed inset-0 z-40 m-0 h-dvh max-h-none w-full max-w-none border-0 bg-[#0B0B0B] p-0 text-[#E7E1D7]">
        <div className="flex min-h-full flex-col p-6">
          <nav aria-label="Main" className="flex flex-1 items-center justify-center py-8">
            <ul className="flex flex-col items-center gap-2 sm:gap-3">
              {links.map(({ label, href }) => (
                <li key={href} className="text-center">
                  <a data-menu-link href={href} onClick={close}
                    className="block font-ppneumontreal text-[clamp(3rem,min(12vw,15dvh),10rem)] leading-none tracking-tight uppercase hover:text-[#C8FF5F] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C8FF5F]">
                    {label.split(/(O)/).map((part, index) => part === "O"
                      ? <span key={index} className="font-playfair italic">{part}</span>
                      : part)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </dialog>
    </>
  );
}
