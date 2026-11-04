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
    email: "alexdelroythompson2@gmail.com",
    linkedin: "https://www.linkedin.com/in/alexander-thompson-23b8b32b5/",
    github:  "https://github.com/alophin00",
  },

  /** Put your PDF at /public/resume.pdf, then set url: "/resume.pdf". */
  resume: { url: "/resume.pdf", updated: "Nov 2026" },

  /** Set to false before sending the site to recruiters to hide all "to add" placeholders. */
  showPlaceholders: true,

  /** Used for SEO metadata and the sitemap. Set NEXT_PUBLIC_SITE_URL when you deploy. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
};
