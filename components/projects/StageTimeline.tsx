import { STAGES, type Stage } from "@/lib/types";
import { ProgressGlyph, progressLabel } from "@/components/ui/Status";

/** Research → Concept → CAD → Prototyping → Testing → Iteration, with real status per stage. */
export default function StageTimeline({ stages }: { stages: Stage[] }) {
  const byName = new Map(stages.map((s) => [s.name, s]));
  return (
    <ol className="grid grid-cols-1 gap-0 sm:grid-cols-3 lg:grid-cols-6" aria-label="Project stages">
      {STAGES.map((name, i) => {
        const s = byName.get(name) ?? { name, status: "not-started" as const };
        const lit = s.status === "complete" || s.status === "in-progress";
        return (
          <li key={name} className="relative border-l border-line py-4 pl-5 pr-4 sm:border-l-0 sm:border-t sm:pl-0 sm:pt-6">
            <span
              aria-hidden="true"
              className={`absolute -left-px top-0 w-px sm:left-0 sm:-top-px sm:h-px ${
                s.status === "in-progress" ? "h-1/2 sm:w-1/2" : "h-full sm:w-full"
              } ${lit ? "bg-signal" : "bg-transparent"}`}
            />
            <div className="flex items-center gap-2">
              <ProgressGlyph status={s.status} />
              <span className="font-mono text-[11px] text-steel">{String(i + 1).padStart(2, "0")}</span>
            </div>
            <p className="mt-2 font-display text-base">{name}</p>
            <p className={`mt-1 text-xs ${lit ? "text-signal" : "text-muted"}`}>{progressLabel[s.status]}</p>
            {s.note && <p className="mt-1 text-xs leading-relaxed text-muted">{s.note}</p>}
          </li>
        );
      })}
    </ol>
  );
}
