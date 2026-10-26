/**
 * level:
 *  "hands-on" — used in real work or projects
 *  "learning" — currently learning; not yet demonstrated in a finished project
 *  "interest" — an area you want to work in
 */
export type SkillLevel = "hands-on" | "learning" | "interest";
export type Skill = { name: string; level: SkillLevel; note?: string };
export type SkillGroup = { title: string; description: string; skills: Skill[] };

export const skillGroups: SkillGroup[] = [
  {
    title: "CAD & Design",
    description: "Drafting, modeling and design for fabrication.",
    skills: [
      { name: "AutoCAD", level: "hands-on" },
      { name: "SolidWorks", level: "learning" },
      { name: "3D Modeling", level: "hands-on" },
    ],
  },
  {
    title: "Programming",
    description: "Scripting and microcontroller code.",
    skills: [
      { name: "Python", level: "hands-on" },
      { name: "MicroPython", level: "hands-on" },
    ],
  },
  {
    title: "Hardware & Electronics",
    description: "Building and wiring small embedded systems.",
    skills: [
      { name: "Raspberry Pi Pico", level: "hands-on" },
      { name: "Sensors", level: "hands-on" },
      { name: "Basic Circuit Development", level: "hands-on" },
    ],
  },
  {
    title: "Engineering Interests",
    description: "Where I want to take this work.",
    skills: [
      { name: "Biomedical Devices", level: "interest" },
      { name: "Robotics", level: "interest" },
      { name: "Prototyping", level: "interest" },
      { name: "Product Development", level: "interest" },
    ],
  },
];

export const skillLevelLabel: Record<SkillLevel, string> = {
  "hands-on": "Hands-on",
  learning: "Learning",
  interest: "Interest",
};
