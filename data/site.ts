/**
 * Personal details and links.
 * Leave a value as null until you have it — the site shows a clearly marked
 * placeholder instead of a broken or fake link.
 */
export const site = {
  name: "Alexander Thompson",
  initials: "AT",
  headline: "Engineering Solutions for Human Problems.",
  intro:
    "I’m Alexander Thompson, an Electrical Engineering student at Northeastern University pursuing a future in Bioengineering. I’m interested in developing medical devices, robotic systems, and technologies that improve people’s lives.",
  positioning: ["Aspiring Biomedical Engineer", "Medical Devices", "Robotics", "R&D"],

  education: {
    school: "Northeastern University",
    campus: "Oakland Campus",
    major: "Electrical Engineering",
    plannedMajor: "Bioengineering",
    plannedTransition: "Fall 2027",
    graduation: "May 2030 (expected)",
  },

  contact: {
    email: null as string | null, // e.g. "alex@example.com"
    linkedin: null as string | null, // e.g. "https://www.linkedin.com/in/your-handle"
    github: null as string | null, // e.g. "https://github.com/your-handle"
  },

  /** Put your PDF at /public/resume.pdf, then set url: "/resume.pdf". */
  resume: { url: null as string | null, updated: null as string | null },

  /** Set to false before sending the site to recruiters to hide all "to add" placeholders. */
  showPlaceholders: true,

  /** Used for SEO metadata and the sitemap. Set NEXT_PUBLIC_SITE_URL when you deploy. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
};
