import Image from "next/image";
import { getCurrentYear } from "@/lib/current-year";
import { HeroAnimation } from "./hero-animation";

export async function HeroSection() {
  const currentYear = await getCurrentYear();
  return (
    <HeroAnimation>
      <div className="absolute inset-x-0 top-0 -z-10 pointer-events-none">
        <div className="grid grid-cols-1 md:grid-cols-[3fr_4fr_5fr] md:auto-cols-fr md:gap-6 w-full">
          <div data-hero-image-origin className="relative w-full md:w-xl row-start-1 col-start-1 md:col-start-2 row-end-2 col-end-3">
            <div data-hero-image-motion className="relative h-full w-full origin-top-left">
              <div data-hero-image className="relative h-full w-full rounded-3xl overflow-hidden">
                <Image
                  src="/images/hero-image-uncompress.jpeg"
                  alt="hero image"
                  loading="eager"
                  width={576}
                  height={660}
                  className="w-full h-full object-cover object-[center_70%] scale-110 brightness-75"
                />
                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_bottom,rgba(0,0,0,0.7)_0%,transparent_35%,transparent_65%,rgba(0,0,0,0.7)_100%)]" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* header top */}
      <div className="flex items-center justify-between">
        <h6 data-hero-fade className="text-base uppercase">
          RizkyAziz.w
          <span className="font-playfair italic">o</span>
          rk
        </h6>
        <h6 data-hero-fade className="text-base uppercase">
          P
          <span className="font-playfair italic">o</span>
          rtf
          <span className="font-playfair italic">o</span>
          li
          <span className="font-playfair italic">o</span>
          <span className="ps-1">{ currentYear }</span>
        </h6>
      </div>
      {/* header bottom */}
      <div className="header-bottom flex flex-col justify-between gap-8">
        <div className="flex items-center justify-between">
          <h6 data-hero-fade className="hidden md:block text-base uppercase">hi there</h6>
          <h6 data-hero-fade className="text-xs md:text-base uppercase">I build thoughtful interfaces with precision, <br /> personality, and a focus on how they feel.</h6>
        </div>
        <div data-hero-line className="h-px w-full bg-white/20" />
        {/* frontend engineer text */}
        <div className="flex flex-col items-end">
          <div className="overflow-hidden">
            <h1 data-hero-title className="text-6xl md:text-[200px] uppercase tracking-wide">Fr
              <span className="font-playfair italic">o</span>
              ntend</h1>
          </div>
          <div className="overflow-hidden md:-mt-5">
            <h1 data-hero-title className="text-5xl md:text-9xl uppercase text-accent tracking-wide">Engineer</h1>
          </div>
        </div>
      </div>
    </HeroAnimation>
  )
}
