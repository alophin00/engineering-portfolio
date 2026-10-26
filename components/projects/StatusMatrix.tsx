import Link from "next/link";
import { STAGES, type Project } from "@/lib/types";
import { ProgressGlyph, ProgressLegend, progressLabel } from "@/components/ui/Status";

/** Every project against every stage — an honest snapshot of where work stands. */
export default function StatusMatrix({ projects }: { projects: Project[] }) {
  return (
    <div>
      <div className="overflow-x-auto border border-line">
        <table className="w-full min-w-[720px] border-collapse text-left">
          <caption className="sr-only">Progress of each project through each engineering stage</caption>
          <thead>
            <tr className="border-b border-line bg-deep/60">
              <th scope="col" className="px-4 py-3 text-sm font-normal text-muted">Project</th>
              {STAGES.map((s, i) => (
                <th key={s} scope="col" className="px-3 py-3 text-center text-xs font-normal text-muted">
                  <span className="block font-mono text-[10px] text-steel">{String(i + 1).padStart(2, "0")}</span>
                  {s}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p.slug} className="border-b border-line last:border-0 hover:bg-deep/40">
                <th scope="row" className="px-4 py-4 font-normal">
                  <Link href={`/projects/${p.slug}`} className="text-sm text-paper hover:text-signal">{p.title}</Link>
                  <span className="mt-0.5 block font-mono text-[10px] text-steel">{p.code}</span>
                </th>
                {STAGES.map((s) => {
                  const st = p.stages.find((x) => x.name === s)?.status ?? "not-started";
                  return (
                    <td key={s} className="px-3 py-4 text-center">
                      <span className="inline-flex" title={`${s}: ${progressLabel[st]}`}>
                        <ProgressGlyph status={st} size={14} />
                        <span className="sr-only">{progressLabel[st]}</span>
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4"><ProgressLegend /></div>
    </div>
  );
}
