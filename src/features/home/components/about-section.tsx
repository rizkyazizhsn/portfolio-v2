import { AboutAnimation } from "./about-animation";

export function AboutSection() {
  const stats = [
    { label: "Services", value: "Web Development, UI/UX Design, Consulting" },
    { label: "Experience", value: "5+ years" },
    { label: "Projects Completed", value: "20+" },
    { label: "Happy Clients", value: "10+" },
    { label: "Based In", value: "Tangerang, Indonesia" },
  ]
  return (
    <AboutAnimation>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr_3fr] md:auto-cols-fr md:gap-6 relative">
        <div className="flex justify-between pb-8 md:pb-0">
          <div data-about-heading className="overflow-hidden">
            <h6 data-about-title className="text-base uppercase">Ab<span className="playfair-0">o</span>ut Me</h6>
          </div>
        </div>
        <div data-about-image-target aria-hidden="true" className="hidden md:block h-140 w-4/5 max-w-130 justify-self-center transform -rotate-12" />
        <div className="flex flex-col">
          {stats.map((stat, index) => (
            <div data-about-row key={`${stat.label}-${index}`} className="flex justify-between py-8 relative">
              <div className="overflow-hidden">
                <h6 data-about-text className="uppercase">{ stat.label }</h6>
              </div>
              <div className="overflow-hidden">
                <h6 data-about-text className="uppercase text-right text-wrap">{ stat.value }</h6>
              </div>
              <div data-about-line className="h-px w-full bg-foreground/30 absolute inset-[0%_0%_auto]" />
            </div>
          ))}
          <a data-about-button href="mailto:rizkyaziz.hsn@gmail.com" className="px-6 py-4 bg-accent w-fit rounded-xl text-black uppercase font-medium hover:bg-foreground cursor-pointer transition-colors">Get in T<span className="playfair-0">o</span>uch</a>
        </div>
      </div>
    </AboutAnimation>
  )
}
