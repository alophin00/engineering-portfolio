import Link from "next/link";
import { experience } from "@/data/experience";
import { site } from "@/data/site";

function Missing({ what }: { what: string }) {
  if (!site.showPlaceholders) return null;
  return <li className="list-none border border-dashed border-steel/30 px-3 py-2 font-mono text-[11px] text-muted">Add confirmed {what} in data/experience.ts</li>;
}

export default function ExperienceList({ detailed = false }: { detailed?: boolean }) {
  return (
    <ol className="border-t border-line">
      {experience.map((e) => (
        <li key={e.role + e.organization} className="grid gap-4 border-b border-line py-8 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <p className="font-mono text-[11px] text-steel">{e.kind}</p>
            <h3 className="mt-2 text-xl font-medium tracking-tight md:text-2xl">{e.role}</h3>
            <p className="mt-1 text-paper/80">{e.organization}</p>
            <p className="mt-2 font-mono text-[11px] text-muted">
              {e.dates ?? (site.showPlaceholders ? <span className="text-amber/80">Dates to add</span> : null)}
            </p>
          </div>
          <div className="md:col-span-8">
            <p className="max-w-prose leading-relaxed text-paper/90">{e.summary}</p>
            {detailed && (
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div>
                  <h4 className="text-sm text-muted">Responsibilities</h4>
                  <ul className="mt-2 space-y-2 text-sm leading-relaxed">
                    {e.responsibilities.length ? e.responsibilities.map((r) => <li key={r}>{r}</li>) : <Missing what="responsibilities" />}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm text-muted">Accomplishments</h4>
                  <ul className="mt-2 space-y-2 text-sm leading-relaxed">
                    {e.accomplishments.length ? e.accomplishments.map((r) => <li key={r}>{r}</li>) : <Missing what="accomplishments" />}
                  </ul>
                </div>
              </div>
            )}
            {e.projects.length > 0 && (
              <ul className="mt-5 flex flex-wrap gap-3">
                {e.projects.map((p) => (
                  <li key={p.href}>
                    <Link href={p.href} className="border-b border-signal/50 pb-0.5 text-sm text-signal hover:border-signal">{p.label}</Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
