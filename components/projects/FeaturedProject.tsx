import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/types";
import { StatusBadge } from "@/components/ui/Status";
import ProjectVisual from "./ProjectVisual";

/** Large alternating row used for featured projects. */
export default function FeaturedProject({ project, index }: { project: Project; index: number }) {
  const flip = index % 2 === 1;
  return (
    <article className="group grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
      <Link
        href={`/projects/${project.slug}`}
        className={`lg:col-span-7 ${flip ? "lg:order-2" : ""}`}
        tabIndex={-1}
        aria-hidden="true"
      >
        <ProjectVisual project={project} priority={index === 0} />
      </Link>
      <div className={`lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
        <div className="flex flex-wrap items-center gap-3">
          <StatusBadge status={project.status} />
        </div>
        <h3 className="mt-5 text-2xl font-medium leading-tight tracking-tight md:text-4xl">
          <Link href={`/projects/${project.slug}`} className="hover:text-signal focus-visible:underline">
            {project.title}
          </Link>
        </h3>
        <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">{project.summary}</p>
        <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2 font-mono text-[12px] text-steel" aria-label="Disciplines">
          {project.disciplines.slice(0, 5).map((d) => <li key={d}>{d}</li>)}
        </ul>
        <Link
          href={`/projects/${project.slug}`}
          className="mt-8 inline-flex items-center gap-2 border-b border-signal/50 pb-1 text-sm text-paper transition-colors hover:border-signal hover:text-signal"
        >
          Read the case study
          <ArrowUpRight size={16} aria-hidden="true" className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none" />
        </Link>
      </div>
    </article>
  );
}
