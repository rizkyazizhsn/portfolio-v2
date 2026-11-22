"use client";

import { useEffect, useId, useRef, useState } from "react";
import gsap from "gsap";
import { animationConfig, animationPresets } from "@/lib/animation/config";
import { useSmoothScroll } from "@/providers/smooth-scroll";

export function useMenuAnimation() {
  const timing = animationPresets.menu;
  const { stopScroll, startScroll } = useSmoothScroll()
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

      startScroll()

      content?.forEach((element) => {
        gsap.killTweensOf(element);
        gsap.set(element, { clearProps: "transform,opacity,visibility" });
      });
      trigger?.focus({ preventScroll: true });
    };
  }, [startScroll]);

  useEffect(() => {
    const panel = dialog.current;
    if (!panel) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const menuLinks = panel.querySelectorAll("[data-menu-link]");
    const content = toolbar.current?.closest("[data-menu-page]")?.querySelectorAll<HTMLElement>("[data-menu-content]");
    const contentDuration = reducedMotion ? 0 : timing.contentDuration;
    const panelStart = open && content?.length ? contentDuration : 0;

    if (open) {
      stopScroll()

      if (!panel.open) {
        gsap.set(menuLinks, { autoAlpha: 0, y: reducedMotion ? 0 : timing.linkDistance });
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

          startScroll()

          menuButton.current?.focus({ preventScroll: true });
        }
      },
    });

    if (open && content?.length) {
      animation.to(content, {
        autoAlpha: 0,
        y: reducedMotion ? 0 : timing.contentDistance,
        duration: contentDuration,
        ease: timing.contentOutEase,
        overwrite: true,
      }, 0);
    }

    animation.to(panel, {
      clipPath: open ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)",
      duration: reducedMotion ? 0 : open ? timing.panelOpenDuration : timing.panelCloseDuration,
      ease: timing.panelEase,
      overwrite: true,
    }, panelStart);

    animation.to(menuLinks, {
      autoAlpha: open ? 1 : 0,
      y: open || reducedMotion ? 0 : timing.linkCloseDistance,
      duration: reducedMotion ? 0 : open ? timing.linkOpenDuration : timing.linkCloseDuration,
      stagger: reducedMotion ? 0 : { each: open ? timing.linkOpenStagger : timing.linkCloseStagger, from: open ? "start" : "end" },
      ease: open ? animationConfig.ease : timing.contentOutEase,
      overwrite: true,
    }, open && !reducedMotion ? panelStart + timing.linkStart : 0);

    if (!open && content?.length) {
      animation.to(content, {
        autoAlpha: 1,
        y: 0,
        duration: contentDuration,
        ease: timing.contentInEase,
        overwrite: true,
        clearProps: "transform,opacity,visibility",
      });
    }

    return () => { animation.kill(); };
  }, [open, stopScroll, startScroll, timing]);

  const close = () => setOpen(false);

  const toggle = () => setOpen((current) => !current);
  return { open, dialog, toolbar, menuButton, dialogId, close, toggle };
}
