"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useRef } from "react";

type ScrollControls = {
  stopScroll: () => void
  startScroll: () => void
}

const ScrollContext = createContext<ScrollControls | null>(null)

export function SmoothScroll({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const instance = useRef<Lenis | null>(null)
  const locked = useRef<boolean>(false)

  const stopScroll = useCallback(() => {
    locked.current = true
    instance.current?.stop()
  }, [])

  const startScroll = useCallback(() => {
    locked.current = false
    instance.current?.start()
  }, [])


  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.1,
      smoothWheel: true,
      stopInertiaOnNavigate: true,
    })

    instance.current = lenis

    if (locked.current) lenis.stop()

    return () => {
      lenis.destroy()
      instance.current = null
    }
  }, [])

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      // Preserve Next.js anchor navigation, while cancelling stale Lenis momentum.
      const top = window.location.hash ? window.scrollY : 0;
      instance.current?.resize();
      instance.current?.scrollTo(top, { immediate: true, force: true });
      if (!window.location.hash) {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      }
    });

    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  const controls = useMemo(() => ({
    stopScroll, startScroll
  }), [stopScroll, startScroll])

  return (
    <ScrollContext.Provider value={controls}>
      {children}
    </ScrollContext.Provider>
  )
}

export function useSmoothScroll() {
  const context = useContext(ScrollContext)

  if (!context) {
    throw new Error("useSmoothScroll must be used inside SmoothScroll")
  }

  return context
}
