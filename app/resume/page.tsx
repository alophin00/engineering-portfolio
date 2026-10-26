import type { Metadata } from "next";
import { site } from "@/data/site";
import ResumeCard from "@/components/sections/ResumeCard";
import ContactLinks from "@/components/ui/ContactLinks";
import { experience } from "@/data/experience";
import { skillGroups } from "@/data/skills";
import { projects } from "@/data/projects";
import Link from "next/link";

export const metadata: Metadata = { title: "Resume", description: `Resume and contact details for ${site.name}.` };

export default function ResumePage() {
  const e = site.education;
  return (
    <div className="mx-auto max-w-5xl px-5 pb-24 pt-32 sm:px-8 md:pt-40">
      <h1 className="text-4xl font-medium tracking-tight md:text-6xl">Resume</h1>
      <p className="mt-4 max-w-xl text-lg text-muted">Download the PDF, or read the summary below.</p>
      <div className="mt-10"><ResumeCard /></div>

      <div className="mt-16 divide-y divide-line border-y border-line">
        <section className="grid gap-4 py-8 md:grid-cols-4" aria-labelledby="r-edu">
          <h2 id="r-edu" className="text-lg font-medium">Education</h2>
          <div className="md:col-span-3">
            <p className="text-paper">{e.school} — {e.campus}</p>
            <p className="mt-1 text-paper/80">B.S. candidate, {e.major} · Expected {e.graduation.replace(" (expected)", "")}</p>
            <p className="mt-1 text-muted">Planning to transition to {e.plannedMajor} in {e.plannedTransition}</p>
          </div>
        </section>
        <section className="grid gap-4 py-8 md:grid-cols-4" aria-labelledby="r-proj">
          <h2 id="r-proj" className="text-lg font-medium">Projects</h2>
          <ul className="space-y-4 md:col-span-3">
            {projects.map((p) => (
              <li key={p.slug}>
                <Link href={`/projects/${p.slug}`} className="text-paper hover:text-signal">{p.title}</Link>
                <p className="text-sm text-muted">{p.status.label}</p>
              </li>
            ))}
          </ul>
        </section>
        <section className="grid gap-4 py-8 md:grid-cols-4" aria-labelledby="r-lead">
          <h2 id="r-lead" className="text-lg font-medium">Leadership & experience</h2>
          <ul className="space-y-3 md:col-span-3">
            {experience.map((x) => (
              <li key={x.role + x.organization}>
                <span className="text-paper">{x.role}</span>
                <span className="text-muted"> — {x.organization}{x.dates ? `, ${x.dates}` : ""}</span>
              </li>
            ))}
          </ul>
        </section>
        <section className="grid gap-4 py-8 md:grid-cols-4" aria-labelledby="r-skills">
          <h2 id="r-skills" className="text-lg font-medium">Skills</h2>
          <dl className="space-y-3 md:col-span-3">
            {skillGroups.map((g) => (
              <div key={g.title} className="sm:flex sm:gap-4">
                <dt className="w-48 shrink-0 text-muted">{g.title}</dt>
                <dd className="text-paper/90">{g.skills.map((s) => (s.level === "learning" ? `${s.name} (learning)` : s.name)).join(", ")}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>

      <section className="mt-16" aria-labelledby="r-contact">
        <h2 id="r-contact" className="text-lg font-medium">Contact</h2>
        <div className="mt-4"><ContactLinks /></div>
      </section>
    </div>
  );
}
