/**
 * Only add responsibilities and accomplishments you can confirm.
 * Empty arrays show a "to add" placeholder (hidden when site.showPlaceholders is false).
 */
export type ExperienceEntry = {
  role: string;
  organization: string;
  kind: "Leadership" | "Teaching" | "Engineering";
  dates: string | null; // e.g. "Sep 2025 – Present"
  summary: string;
  responsibilities: string[];
  projects: { label: string; href: string }[];
  accomplishments: string[];
};

export const experience: ExperienceEntry[] = [
  {
    role: "Project Lead",
    organization: "Robotics Club",
    kind: "Engineering",
    dates: null,
    summary: "I lead project work in the club, covering robot design, electronics, CAD and programming as projects take shape.",
    responsibilities: [],
    projects: [{ label: "Robotics Club engineering projects", href: "/projects/robotics-club" }],
    accomplishments: [],
  },
  {
    role: "Co-Events Manager",
    organization: "Engineering Club",
    kind: "Leadership",
    dates: null,
    summary: "I co-manage the club’s events.",
    responsibilities: [],
    projects: [],
    accomplishments: [],
  },
  {
    role: "SAT Tutor",
    organization: "Tutoring",
    kind: "Teaching",
    dates: null,
    summary: "I tutor students preparing for the SAT.",
    responsibilities: [],
    projects: [],
    accomplishments: [],
  },
  {
    role: "Section Leader",
    organization: "Marching Band",
    kind: "Leadership",
    dates: "3 years",
    summary: "I served as a section leader for three years.",
    responsibilities: [],
    projects: [],
    accomplishments: [],
  },
];
