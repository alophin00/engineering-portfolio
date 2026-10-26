/* Shared content types. Edit content in /data, not here. */

export const STAGES = [
  "Research",
  "Concept Development",
  "CAD",
  "Prototyping",
  "Testing",
  "Iteration",
] as const;

export type StageName = (typeof STAGES)[number];

/** How far along a stage or section is. `n/a` = this stage doesn't apply to the project. */
export type Progress = "complete" | "in-progress" | "planned" | "not-started" | "n/a";

export type Stage = { name: StageName; status: Progress; note?: string };

export type MediaItem = {
  kind: "image" | "video";
  /** Path under /public, e.g. "/projects/pico-rgb/breadboard.jpg". Leave empty to show a placeholder. */
  src?: string;
  caption: string;
  alt?: string;
  poster?: string;
};

export type Annotation = {
  id: string;
  label: string;
  description: string;
  /** Position in the model's own coordinates (find it by trial, or from your CAD origin). */
  position: [number, number, number];
};

export type ModelSpec = { src: string; scale?: number; annotations?: Annotation[] };

export type Widget = "exploded-view" | "model-viewer" | "circuit-diagram" | "signal-flow";

export type Block =
  | { type: "heading"; text: string }
  | { type: "text"; body: string }
  | { type: "list"; title?: string; items: string[] }
  | { type: "callout"; tone: "info" | "proposed" | "warning" | "complete"; title: string; body: string }
  | { type: "table"; caption?: string; columns: string[]; rows: string[][] }
  | { type: "gallery"; items: MediaItem[] }
  | {
      type: "requirements";
      items: { id: string; text: string; priority: "must" | "should"; verification: string }[];
    }
  | { type: "results"; items: { measure: string; method: string; value?: string }[] }
  | { type: "code"; language: string; filename?: string; code?: string; note?: string }
  | { type: "placeholder"; label: string; hint: string }
  | { type: "widget"; widget: Widget };

export type CaseSection = {
  number: string;
  title: string;
  /** The question this section answers, shown under the title. */
  question: string;
  status: Progress;
  blocks: Block[];
};

export type ProjectStatus = { label: string; tone: "active" | "concept" | "template" | "complete" };

export type Project = {
  slug: string;
  /** Drawing-style reference number shown on cards. */
  code: string;
  title: string;
  tagline: string;
  summary: string;
  status: ProjectStatus;
  featured: boolean;
  order: number;
  disciplines: string[];
  tech: string[];
  /** Cover image under /public. If empty, a built-in technical illustration is used. */
  cover?: string;
  art?: "nasal" | "pico" | "robotics";
  model?: ModelSpec | null;
  disclaimer?: string;
  stages: Stage[];
  sections: CaseSection[];
};
