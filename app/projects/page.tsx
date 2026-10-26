import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/data/projects";
import ProjectVisual from "@/components/projects/ProjectVisual";
import { StatusBadge } from "@/components/ui/Status";
import StatusMatrix from "@/components/projects/StatusMatrix";

export const metadata: Metadata = {
  title: "Projects",
  description: "Engineering case studies by Alexander Thompson: medical device concept development, embedded systems and robotics.",
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 pb-24 pt-32 sm:px-8 md:pt-40">
      <h1 className="text-4xl font-medium tracking-tight md:text-6xl">Projects</h1>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
        Biomedical design, embedded electronics and robotics. Every case study shows which stages are complete and which are still planned.
      </p>

      <ul className="mt-16 grid gap-x-8 gap-y-16 md:grid-cols-2">
        {projects.map((p) => (
          <li key={p.slug} className="group">
            <Link href={`/projects/${p.slug}`} className="block">
              <ProjectVisual project={p} />
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <StatusBadge status={p.status} />
              </div>
              <h2 className="mt-3 text-2xl font-medium tracking-tight group-hover:text-signal">{p.title}</h2>
              <p className="mt-2 leading-relaxed text-muted">{p.tagline}</p>
              <ul className="mt-4 flex flex-wrap gap-2" aria-label="Technologies">
                {p.tech.map((t) => <li key={t} className="border border-line px-2 py-1 font-mono text-[11px] text-steel">{t}</li>)}
              </ul>
            </Link>
          </li>
        ))}
      </ul>

      <section aria-labelledby="matrix" className="mt-28">
        <h2 id="matrix" className="mb-8 text-2xl font-medium tracking-tight md:text-3xl">Progress by stage</h2>
        <StatusMatrix projects={projects} />
      </section>
    </div>
  );
}
