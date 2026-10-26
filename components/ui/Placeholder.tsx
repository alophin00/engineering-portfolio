import { ImagePlus, Video, FilePlus } from "lucide-react";
import { site } from "@/data/site";

type Props = {
  label: string;
  hint?: string;
  kind?: "image" | "video" | "content";
  aspect?: string;
  className?: string;
};

/** Clearly marked slot for content that hasn't been added yet. Hidden when site.showPlaceholders is false. */
export default function Placeholder({ label, hint, kind = "content", aspect, className = "" }: Props) {
  if (!site.showPlaceholders) return null;
  const Icon = kind === "image" ? ImagePlus : kind === "video" ? Video : FilePlus;
  return (
    <div
      className={`relative flex flex-col justify-center gap-2 border border-dashed border-steel/35 bg-deep/40 bg-blueprint-fine p-5 ${aspect ?? ""} ${className}`}
    >
      <div className="flex items-center gap-2 text-steel">
        <Icon size={16} aria-hidden="true" />
        <span className="font-mono text-[11px]">Placeholder</span>
      </div>
      <p className="font-display text-base text-paper/90">{label}</p>
      {hint && <p className="max-w-prose text-sm leading-relaxed text-muted">{hint}</p>}
    </div>
  );
}
