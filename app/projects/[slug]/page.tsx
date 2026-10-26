import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ShieldAlert } from "lucide-react";
import { getProject, projects } from "@/data/projects";
import { StatusBadge } from "@/components/ui/Status";
import StageTimeline from "@/components/projects/StageTimeline";
import ProjectVisual from "@/components/projects/ProjectVisual";
import CaseStudy from "@/components/case/CaseStudy";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return { title: p.title, description: p.summary, openGraph: { title: p.title, description: p.summary } };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const idx = projects.findIndex((p) => p.slug === slug);
  const prev = projects[idx - 1];
  const next = projects[idx + 1];

  return (
    <article className="pt-28 md:pt-36">
      <header className="mx-auto max-w-7xl px-5 sm:px-8">
        <Link href="/projects" className="inline-flex items-center gap-2 text-sm text-muted hover:text-paper">
          <ArrowLeft size={15} aria-hidden="true" /> All projects
        </Link>
        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-[11px] text-steel">{project.code}</span>
              <StatusBadge status={project.status} />
            </div>
            <h1 className="mt-5 text-4xl font-medium leading-[1.02] tracking-[-0.03em] md:text-6xl">{project.title}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">{project.summary}</p>
          </div>
          <div className="lg:col-span-5">
            <ProjectVisual project={project} priority />
          </div>
        </div>

        <dl className="mt-12 grid gap-6 border-y border-line py-6 md:grid-cols-2">
          <div>
            <dt className="text-sm text-muted">Engineering areas</dt>
            <dd className="mt-2 flex flex-wrap gap-2">
              {project.disciplines.map((d) => <span key={d} className="border border-line px-2 py-1 text-sm">{d}</span>)}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-muted">Tools & technologies</dt>
            <dd className="mt-2 flex flex-wrap gap-2">
              {project.tech.map((t) => <span key={t} className="border border-line px-2 py-1 font-mono text-[12px] text-steel">{t}</span>)}
            </dd>
          </div>
        </dl>

        {project.disclaimer && (
          <aside className="mt-8 flex gap-3 border border-amber/50 bg-amber/[0.05] p-5" aria-label="Engineering disclaimer">
            <ShieldAlert className="mt-0.5 shrink-0 text-amber" size={20} aria-hidden="true" />
            <div>
              <p className="text-sm text-amber">Engineering disclaimer</p>
              <p className="mt-1 leading-relaxed text-paper/85">{project.disclaimer}</p>
            </div>
          </aside>
        )}

        <section aria-labelledby="timeline" className="mt-14">
          <h2 id="timeline" className="mb-2 text-lg font-medium">Project timeline</h2>
          <StageTimeline stages={project.stages} />
        </section>
      </header>

      <div className="mx-auto mt-16 max-w-7xl px-5 sm:px-8">
        <CaseStudy project={project} />
      </div>

      <nav aria-label="More projects" className="mx-auto mt-8 grid max-w-7xl gap-px border-y border-line bg-line sm:grid-cols-2">
        {prev ? (
          <Link href={`/projects/${prev.slug}`} className="group bg-ink px-5 py-8 sm:px-8">
            <span className="flex items-center gap-2 text-sm text-muted"><ArrowLeft size={14} aria-hidden="true" /> Previous</span>
            <span className="mt-2 block font-display text-xl group-hover:text-signal">{prev.title}</span>
          </Link>
        ) : <span className="bg-ink" />}
        {next ? (
          <Link href={`/projects/${next.slug}`} className="group bg-ink px-5 py-8 text-right sm:px-8">
            <span className="flex items-center justify-end gap-2 text-sm text-muted">Next <ArrowRight size={14} aria-hidden="true" /></span>
            <span className="mt-2 block font-display text-xl group-hover:text-signal">{next.title}</span>
          </Link>
        ) : <span className="bg-ink" />}
      </nav>
    </article>
  );
}
