import type { Progress, ProjectStatus } from "@/lib/types";

export const progressLabel: Record<Progress, string> = {
  complete: "Complete",
  "in-progress": "In progress",
  planned: "Planned",
  "not-started": "Not started",
  "n/a": "Not applicable",
};

/** Small glyph encoding progress: filled = complete, half = in progress, ring = planned, dashed = not started. */
export function ProgressGlyph({ status, size = 12 }: { status: Progress; size?: number }) {
  const r = size / 2 - 1.5;
  const c = size / 2;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true" className="shrink-0">
      {status === "complete" && <circle cx={c} cy={c} r={r} fill="var(--color-signal)" stroke="var(--color-signal)" strokeWidth="1.5" />}
      {status === "in-progress" && (
        <>
          <circle cx={c} cy={c} r={r} fill="none" stroke="var(--color-signal)" strokeWidth="1.5" />
          <path d={`M ${c} ${c - r} A ${r} ${r} 0 0 1 ${c} ${c + r} Z`} fill="var(--color-signal)" />
        </>
      )}
      {status === "planned" && <circle cx={c} cy={c} r={r} fill="none" stroke="var(--color-steel)" strokeWidth="1.5" />}
      {status === "not-started" && (
        <circle cx={c} cy={c} r={r} fill="none" stroke="var(--color-steel)" strokeOpacity="0.6" strokeWidth="1.2" strokeDasharray="2 2" />
      )}
      {status === "n/a" && <line x1={c - r} y1={c} x2={c + r} y2={c} stroke="var(--color-steel)" strokeOpacity="0.5" strokeWidth="1.5" />}
    </svg>
  );
}

export function ProgressTag({ status }: { status: Progress }) {
  const tone =
    status === "complete" ? "text-signal border-signal/40" : status === "in-progress" ? "text-signal border-signal/30" : "text-muted border-line";
  return (
    <span className={`inline-flex items-center gap-1.5 border px-2 py-0.5 font-mono text-[11px] ${tone}`}>
      <ProgressGlyph status={status} size={10} />
      {progressLabel[status]}
    </span>
  );
}

export function StatusBadge({ status }: { status: ProjectStatus }) {
  const tone =
    status.tone === "concept"
      ? "border-amber/40 text-amber"
      : status.tone === "active"
        ? "border-signal/40 text-signal"
        : status.tone === "complete"
          ? "border-signal/60 text-signal"
          : "border-steel/40 text-steel";
  return <span className={`inline-flex items-center border px-2 py-1 font-mono text-[11px] ${tone}`}>{status.label}</span>;
}

export function ProgressLegend() {
  const items: Progress[] = ["complete", "in-progress", "planned", "not-started", "n/a"];
  return (
    <ul className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-[11px] text-muted">
      {items.map((s) => (
        <li key={s} className="flex items-center gap-2">
          <ProgressGlyph status={s} />
          {progressLabel[s]}
        </li>
      ))}
    </ul>
  );
}
