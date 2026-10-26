/**
 * Parts of the CONCEPTUAL nasal-device assembly used by the hero and exploded view.
 * This is simplified geometry, not CAD. Once you have a SolidWorks export,
 * set `model` on the project in data/projects.ts to show the real model.
 */
export type PartId = "shell" | "cooling" | "contact" | "compression" | "retention";

export type AssemblyPart = {
  id: PartId;
  index: number;
  name: string;
  description: string;
  /** Direction the part travels at full explode. x is mirrored for paired parts. */
  explode: [number, number, number];
  labelAnchor: [number, number, number];
};

export const assemblyParts: AssemblyPart[] = [
  {
    id: "shell",
    index: 1,
    name: "Outer shell",
    description: "Anatomically contoured rigid frame that carries the inserts and the compression mechanism.",
    explode: [0, 0.7, 0],
    labelAnchor: [-1.05, 0.15, 0],
  },
  {
    id: "cooling",
    index: 2,
    name: "Cooling insert",
    description: "Removable gel or phase-change pack that slides into each side of the shell.",
    explode: [0.55, 0.15, 0],
    labelAnchor: [0.78, -1.02, 0],
  },
  {
    id: "contact",
    index: 3,
    name: "Contact layer",
    description: "Soft silicone pad between the cooling insert and the skin; also acts as a thermal barrier.",
    explode: [-0.25, -0.45, 0],
    labelAnchor: [-0.68, -1.05, 0.3],
  },
  {
    id: "compression",
    index: 4,
    name: "Compression mechanism",
    description: "Thumbwheel and lead screw that draw the side pads together to set pressure.",
    explode: [0, 1.5, 0],
    labelAnchor: [0, 1.48, 0],
  },
  {
    id: "retention",
    index: 5,
    name: "Retention system",
    description: "Strap or loop that holds the device in position without being held by hand.",
    explode: [0, -0.2, -1.1],
    labelAnchor: [0, -0.35, -1.75],
  },
];
