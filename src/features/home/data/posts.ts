export type BlogPost = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  preview: string;
};

// Sample draft notes. Replace with your articles when they are ready to publish.
export const posts: BlogPost[] = [
  {
    slug: "motion-with-purpose",
    category: "Motion",
    title: "Making interfaces feel as good as they look.",
    excerpt: "Small transitions, clear feedback, and the details that make an interface feel natural.",
    preview: "Start with the purpose of a transition: explain a change, connect two states, or guide attention. Keep the movement short enough to support the task, and respect reduced motion so the experience remains usable without animation.",
  },
  {
    slug: "building-reusable-interfaces",
    category: "Engineering",
    title: "Reusable components. Room for personality.",
    excerpt: "Finding the balance between shared patterns and interfaces with a character of their own.",
    preview: "Extract a pattern when its behavior repeats, rather than when two elements happen to look alike. Share stable foundations such as spacing, focus styles, and animation defaults, while keeping content and composition flexible.",
  },
  {
    slug: "details-that-ship",
    category: "Craft",
    title: "The details between design and production.",
    excerpt: "A closer look at responsive layouts, keyboard navigation, and the states beyond the mockup.",
    preview: "A finished interface needs more than its ideal state. Check long headings, small screens, missing content, keyboard focus, and loading feedback. These constraints help turn a visual concept into an experience people can use reliably.",
  },
];
