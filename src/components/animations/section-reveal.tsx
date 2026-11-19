"use client"

import { animationConfig } from "@/lib/animation/config"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ReactNode, useRef } from "react"

gsap.registerPlugin(useGSAP, ScrollTrigger)

type SectionRevealProps = {
  children: ReactNode
  id?: string
  className?: string
  start?: string
  duration?: number
  stagger?: number
  distance?: number
}

export function SectionReveal({
  children,
  id,
  className,
  start = animationConfig.scrollStart,
  duration = animationConfig.duration,
  stagger = animationConfig.stagger,
  distance = animationConfig.distance
}: SectionRevealProps) {
  const container = useRef<HTMLElement>(null)

  useGSAP(() => {
    const root = container.current
    if (!root) return

    const media = gsap.matchMedia()

    media.add("(prefers-reduced-motion: no-preference)", () => {
      const elements = Array.from(
        root.querySelectorAll<HTMLElement>("[data-animate]"),
      ).filter((element) => element.closest("[data-reveal-section]") === root)

      if (!elements.length) return

      const timeline = gsap.timeline({
        defaults: {
          duration,
          ease: animationConfig.ease
        },
        scrollTrigger: {
          trigger: root,
          start,
          once: true
        }
      })

      elements.forEach((element, index) => {
        const position = index * stagger

        switch (element.dataset.animate) {
          case "fade-up":
            timeline.from(
              element,
              { y: distance, autoAlpha: 0 },
              position
            );
            break;
          case "reveal-up":
            timeline.from(
              element,
              { yPercent: 110 },
              position
            )
            break;
          case "line":
            timeline.from(
              element,
              { scaleX: 0, transformOrigin: "left center" },
              position
            )
            break;
        }
      })
    })

    return () => media.revert()
  },
  {
    scope: container,
    dependencies: [start, duration, stagger, distance],
    revertOnUpdate: true
  })

  return (
    <section
      ref={container}
      id={id}
      data-reveal-section
      className={className}  
    >
      {children}
    </section>
  )
}