import { Download, ExternalLink, FileWarning } from "lucide-react";
import { site } from "@/data/site";

export default function ResumeCard() {
  const r = site.resume;
  if (!r.url) {
    return (
      <div className="flex flex-col gap-4 border border-dashed border-amber/40 bg-deep/40 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-3">
          <FileWarning className="mt-0.5 shrink-0 text-amber" size={20} aria-hidden="true" />
          <div>
            <p className="text-paper">Resume PDF not added yet</p>
            <p className="mt-1 text-sm text-muted">Put the file at /public/resume.pdf and set resume.url to “/resume.pdf” in data/site.ts. The download button appears automatically.</p>
          </div>
        </div>
        <span className="inline-flex shrink-0 cursor-not-allowed items-center gap-2 border border-line px-4 py-2.5 text-sm text-muted" aria-disabled="true">
          <Download size={16} aria-hidden="true" /> Download unavailable
        </span>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-4 border border-line bg-deep/50 p-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-paper">{site.name} — Resume (PDF)</p>
        {r.updated && <p className="mt-1 font-mono text-[11px] text-muted">Updated {r.updated}</p>}
      </div>
      <div className="flex gap-3">
        <a href={r.url} download className="inline-flex items-center gap-2 bg-signal px-4 py-2.5 text-sm font-medium text-ink hover:bg-paper">
          <Download size={16} aria-hidden="true" /> Download PDF
        </a>
        <a href={r.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-line px-4 py-2.5 text-sm hover:border-signal">
          <ExternalLink size={16} aria-hidden="true" /> Open
        </a>
      </div>
    </div>
  );
}
