export const animationConfig = {
  ease: "power3.out",
  duration: 0.8,
  stagger: 0.1,
  distance: 30,
  scrollStart: "top 70%",
};

export const animationPresets = {
  about: {
    titleDuration: 0.8,
    rowStart: 0.15,
    rowStagger: 0.12,
    lineDuration: 1,
    textDuration: 0.7,
    textDelay: 0.1,
    textStagger: 0.08,
    buttonOverlap: 0.3,
  },
  work: { fadeDuration: 0.7, titleDuration: 1, titleStart: 0.2 },
  parallax: { viewportRatio: 0.06, maxDistance: 56, scrub: 0.6 },
  menu: {
    contentDuration: 0.35,
    panelOpenDuration: 0.8,
    panelCloseDuration: 0.55,
    linkOpenDuration: 0.6,
    linkCloseDuration: 0.2,
    linkStart: 0.4,
    linkOpenStagger: 0.1,
    linkCloseStagger: 0.04,
    linkDistance: 40,
    linkCloseDistance: 24,
    contentDistance: 40,
    panelEase: "power3.inOut",
    contentOutEase: "power2.in",
    contentInEase: "power2.out",
  },
};
