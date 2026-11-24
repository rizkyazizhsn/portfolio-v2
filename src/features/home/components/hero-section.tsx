import Image from "next/image";
import { getCurrentYear } from "@/lib/current-year";
import { HeroAnimation } from "./hero-animation";
import { SplitTextHover } from "@/components/animations/split-text-hover";

export async function HeroSection() {
  const currentYear = await getCurrentYear();
  return (
    <HeroAnimation>
      <div className="absolute inset-x-0 top-0 -z-10 pointer-events-none">
        <div className="grid grid-cols-1 md:grid-cols-[3fr_4fr_5fr] md:auto-cols-fr md:gap-6 w-full">
          <div data-hero-image-origin className="relative w-full md:w-xl aspect-[1792/2400] row-start-1 col-start-1 md:col-start-2 row-end-2 col-end-3">
            <div data-hero-image-motion className="relative h-full w-full origin-top-left">
              <div data-hero-image className="relative h-full w-full rounded-3xl overflow-hidden">
                <Image
                  src="/images/hero-image-uncompress.jpeg"
                  alt="hero image"
                  priority
                  fill
                  sizes="(max-width: 767px) calc(100vw - 3rem), 576px"
                  className="object-cover object-[center_70%] scale-110 brightness-75"
                />
                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_bottom,rgba(0,0,0,0.7)_0%,transparent_35%,transparent_65%,rgba(0,0,0,0.7)_100%)]" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* header top */}
      <div className="flex-between">
        <p data-hero-fade className="text-base uppercase">
          RizkyAziz.w
          <span className="playfair-0">o</span>
          rk
        </p>
        <p data-hero-fade className="text-base uppercase">
          P
          <span className="playfair-0">o</span>
          rtf
          <span className="playfair-0">o</span>
          li
          <span className="playfair-0">o</span>
          <span className="ps-1">{ currentYear }</span>
        </p>
      </div>
      {/* header bottom */}
      <div className="header-bottom flex flex-col justify-between gap-8">
        <div className="flex-between">
          <p data-hero-fade className="hidden md:block text-base uppercase">hi there</p>
          <p data-hero-fade className="text-xs md:text-base uppercase">I build thoughtful interfaces with precision, <br /> personality, and a focus on how they feel.</p>
        </div>
        <div data-hero-line className="h-px w-full bg-white/20" />
        {/* frontend engineer text */}
        <h1 data-hero-parallax className="flex flex-col items-end">
          <span className="block overflow-hidden">
            <span data-hero-title className="block text-6xl md:text-[12vw] uppercase tracking-wide">Fr
              <span className="playfair-0">o</span>
              ntend</span>
          </span>{" "}
          <span className="block overflow-hidden md:-mt-5">
            <span data-hero-title className="block text-5xl md:text-[7.6vw] uppercase text-accent tracking-wide">Engineer</span>
          </span>
        </h1>
      </div>
    </HeroAnimation>
  )
}
