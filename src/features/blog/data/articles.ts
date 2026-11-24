export type ArticleSection = {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export type ArticleContent = {
  sections: ArticleSection[];
  takeaway: string;
};

// Original sample drafts for the journal UI, not published project claims.
export const articles: Record<string, ArticleContent> = {
  "motion-with-purpose": {
    sections: [
      {
        id: "start-with-purpose", title: "Start with a purpose",
        paragraphs: [
          "A transition should help someone understand what just happened. It might connect a card to its detail page, confirm that a button worked, or guide attention to a newly opened menu. The useful question is not what can move, but what the movement explains.",
          "Before reaching for an animation library, describe the change in plain language. If the movement does not support that explanation, a simpler state change may be enough.",
        ],
      },
      {
        id: "small-consistent-patterns", title: "Build a small motion vocabulary",
        paragraphs: [
          "Start with a few shared patterns: a short fade, a subtle shift, and clear hover feedback. Reusing those patterns makes the interface feel coherent without making every section behave identically.",
          "Keep the visual layers separate. A title reveal and a scroll-driven parallax can live on different wrappers, so each interaction owns its transform. That separation also makes interruptions and cleanup easier to reason about.",
        ],
        bullets: ["Use shared timing defaults as a starting point.", "Keep essential controls usable while transitions run.", "Check the experience with keyboard and touch input."],
      },
      {
        id: "make-motion-optional", title: "Make motion optional",
        paragraphs: [
          "The page should communicate the same information without animated movement. Respect reduced motion, show content in its final state when appropriate, and avoid making a reveal the only way to discover a control.",
          "Test interruptions as part of the interaction: open a menu, close it before the transition ends, and navigate away while the page is moving. A convincing animation should leave the interface in a useful state even when the user does not follow the ideal sequence.",
        ],
      },
    ],
    takeaway: "Motion earns its place when it explains a change and leaves the user in control.",
  },
  "building-reusable-interfaces": {
    sections: [
      {
        id: "recognize-the-pattern", title: "Look for repeated behavior",
        paragraphs: [
          "Two elements can look alike while serving very different purposes. A reusable component becomes useful when its behavior and responsibilities are stable, not just when its class names happen to match.",
          "Start by naming what repeats. It might be a project preview, an article card, or a section reveal. A clear name helps define the boundary and exposes which details belong to the caller.",
        ],
      },
      {
        id: "keep-the-api-small", title: "Keep the API small",
        paragraphs: [
          "Prefer a few meaningful inputs over a long list of visual switches. A blog card can receive a post and a heading level; it does not need to know whether the surrounding page is the homepage or an archive.",
          "Keep content data separate from interaction state. That makes it easier to use the same content in a listing, a detail page, and metadata without maintaining several copies.",
        ],
        bullets: ["Give each component a clear responsibility.", "Use types to describe content independently of its rendering.", "Add customization when a real use case needs it."],
      },
      {
        id: "leave-room-for-composition", title: "Leave room for composition",
        paragraphs: [
          "Sharing a foundation does not require every page to look identical. Spacing, content order, and surrounding layout can give a page its character while the component handles the repeated behavior.",
          "When a component becomes difficult to explain, look at how its options interact. Sometimes a smaller primitive and two focused compositions are easier to maintain than one component with many conditional branches.",
        ],
      },
    ],
    takeaway: "Reuse stable responsibilities; keep content and composition flexible.",
  },
  "details-that-ship": {
    sections: [
      {
        id: "beyond-the-mockup", title: "Look beyond the ideal screen",
        paragraphs: [
          "A mockup captures one moment: a particular viewport, a particular amount of text, and content that has already loaded. Building the interface means deciding what happens outside that moment.",
          "Try a long project name, a narrow screen, an empty list, and an image that takes longer to arrive. These checks often reveal layout assumptions that are hard to notice in a polished design file.",
        ],
      },
      {
        id: "follow-the-interaction", title: "Follow the complete interaction",
        paragraphs: [
          "Treat navigation as part of the design. Open a detail page directly, use the keyboard to reach its controls, then return to the list. Labels and destinations should make sense without relying on a particular browser history.",
          "Feedback also needs a complete story. A copy button should explain success and failure, while an expandable section should remain understandable when it is closed. The small states matter as much as the initial appearance.",
        ],
        bullets: ["Check visible focus and logical heading order.", "Test reduced motion and repeated navigation.", "Keep images proportional and loading space predictable."],
      },
      {
        id: "make-verification-repeatable", title: "Make verification repeatable",
        paragraphs: [
          "Write down the few interactions that would be expensive to break. For a portfolio, that might include opening the menu during a scroll, resizing the project gallery, and loading an article from a shared link.",
          "Use automated checks where they protect behavior, then review the experience in a real browser. A passing type check is useful evidence, but it cannot tell you whether the reading width feels comfortable or a transition is distracting.",
        ],
      },
    ],
    takeaway: "The work between the mockup and the edge cases is part of the design.",
  },
};
