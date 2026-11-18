import { FooterAnimation } from "./footer-animation";

export function FooterSection() {
  const currentYear = new Date().getFullYear();

  return (
    <FooterAnimation>
      <div className="absolute -z-10 aspect-square bg-accent blur-[10rem] w-[60vw] h-full inset-[0_0_-50%_-10%] opacity-20" />
      {/* header top */}
      <div className="flex items-center justify-between">
        <h6 data-footer-fade className="inline-block text-base uppercase">
          RizkyAziz.w
          <span className="font-playfair italic">o</span>
          rk
        </h6>
        <h6 data-footer-fade className="inline-block text-base uppercase">
          P<span className="font-playfair italic">o</span>
          rtf
          <span className="font-playfair italic">o</span>
          li
          <span className="font-playfair italic">o</span>
          <span className="ps-1">{currentYear}</span>
        </h6>
      </div>
      {/* header bottom */}
      <div className="header-bottom flex flex-col justify-between gap-8 mt-36">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-6">
            <div className="space-y-1 flex flex-col">
              <h6 data-footer-fade className="inline-block text-base uppercase">
                email
              </h6>
              <a
                href="mailto:rizkyaziz.hsn@gmail.com"
                data-footer-fade
                className="inline-block text-base uppercase"
              >
                rizkyaziz.hsn@gmail.com
              </a>
            </div>
            <div className="space-y-1 flex flex-col">
              <h6 data-footer-fade className="inline-block text-base uppercase">
                phone
              </h6>
              <a
                href="tel:+6285900443036"
                data-footer-fade
                className="inline-block text-base uppercase"
              >
                +6285900443036
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-6 text-right">
            <div className="space-y-1 flex flex-col">
              <h6 data-footer-fade className="inline-block text-base uppercase">
                linkedin
              </h6>
              <a
                href="https://www.linkedin.com/in/rizky-aziz"
                data-footer-fade
                className="inline-block text-base uppercase"
              >
                @rizky-aziz
              </a>
            </div>
            <div className="space-y-1 flex flex-col">
              <h6 data-footer-fade className="inline-block text-base uppercase">
                instagram
              </h6>
              <a
                href="https://www.instagram.com/rizkyyazizz"
                data-footer-fade
                className="inline-block text-base uppercase"
              >
                @rizkyyazizz
              </a>
            </div>
          </div>
        </div>
        <div data-footer-line className="h-px w-full bg-white/20" />
        <div data-footer-marquee className="overflow-hidden">
          <div data-footer-track className="flex w-max">
            {[0, 1].map((copy) => (
              <div key={copy} aria-hidden={copy === 1 ? true : undefined}
                className={`min-w-[100vw] shrink-0 pr-12 ${copy === 1 ? "motion-reduce:hidden" : ""}`}>
                <h2 className="whitespace-nowrap text-6xl md:text-[200px] uppercase tracking-wide">
                  RizkyAziz
                  <span className="text-accent">
                    .W<span className="font-playfair italic">o</span>rk
                  </span>
                </h2>
              </div>
            ))}
          </div>
        </div>
      </div>
    </FooterAnimation>
  );
}
