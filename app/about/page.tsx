import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/data/site";
import ExperienceList from "@/components/sections/ExperienceList";
import SkillsGrid from "@/components/sections/SkillsGrid";
import SectionHeading from "@/components/ui/SectionHeading";
import { ProgressGlyph } from "@/components/ui/Status";
import type { Progress } from "@/lib/types";

export const metadata: Metadata = {
  title: "About",
  description: "Alexander Thompson — Electrical Engineering student at Northeastern University moving toward Bioengineering, with interests in medical devices and robotics.",
};

const path: { when: string; what: string; status: Progress }[] = [
  { when: "Now", what: `${site.education.major}, ${site.education.school} — ${site.education.campus}`, status: "in-progress" },
  { when: site.education.plannedTransition, what: `Planned transition into ${site.education.plannedMajor}`, status: "planned" },
  { when: site.education.graduation, what: "Graduation", status: "planned" },
];

export default function AboutPage() {
  return (
    <div className="pt-32 md:pt-40">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h1 className="text-4xl font-medium leading-[1.02] tracking-[-0.03em] md:text-6xl">
            From circuits toward the human body.
          </h1>
          <div className="mt-10 max-w-[64ch] space-y-6 text-lg leading-[1.75] text-paper/85">
            <p>
              I’m an Electrical Engineering student at Northeastern University’s Oakland campus, and I plan to move into Bioengineering in {site.education.plannedTransition}. Electrical engineering has given me a foundation I want to keep: how sensors turn the physical world into signals, how circuits and code act on those signals, and how to build something and debug it until it works.
            </p>
            <p>
              What pulls me toward bioengineering is where that foundation meets people. I’m most interested in medical devices — engineering that has to be precise and safe, and still comfortable for the person using it. My current independent project started with a problem I know well: frequent nosebleeds, and the question of whether a small wearable device could do what your hands are told to do for fifteen minutes.
            </p>
            <p>
              Outside of coursework, I lead projects in the Robotics Club and co-manage events for the Engineering Club. Before that, I spent three years as a section leader in marching band, which taught me how to teach a skill, keep a group working toward the same standard, and lead from inside the group rather than above it. I also tutor students for the SAT.
            </p>
            <p>
              I learn best by building: prototyping with a Raspberry Pi Pico, modeling in AutoCAD, and learning SolidWorks now so I can take my device concepts into real CAD. I’m looking for research and internship opportunities in medical devices, robotics and R&amp;D where I can keep learning from people who do this well.
            </p>
          </div>
        </div>

        <aside className="lg:col-span-5 lg:pt-4">
          <div className="border border-line bg-deep/50 p-6 lg:sticky lg:top-24">
            <h2 className="font-display text-lg">Academic path</h2>
            <ol className="mt-6 space-y-6 border-l border-line pl-6">
              {path.map((p) => (
                <li key={p.what} className="relative">
                  <span className="absolute -left-[31px] top-1 bg-deep"><ProgressGlyph status={p.status} size={12} /></span>
                  <p className="font-mono text-[11px] text-steel">{p.when}</p>
                  <p className="mt-1 text-paper">{p.what}</p>
                </li>
              ))}
            </ol>
            <dl className="mt-8 grid grid-cols-2 gap-4 border-t border-line pt-6 text-sm">
              <div><dt className="text-muted">Focus</dt><dd className="mt-1">Medical devices</dd></div>
              <div><dt className="text-muted">Also</dt><dd className="mt-1">Robotics, embedded systems</dd></div>
              <div><dt className="text-muted">Leadership</dt><dd className="mt-1">Robotics Project Lead</dd></div>
              <div><dt className="text-muted">Looking for</dt><dd className="mt-1">Internships & research</dd></div>
            </dl>
            <Link href="/projects/nasal-cooling-compression-device" className="mt-8 inline-block border-b border-signal/50 pb-0.5 text-sm text-signal hover:border-signal">
              Read the nasal device case study
            </Link>
          </div>
        </aside>
      </div>

      <section id="experience" aria-labelledby="exp" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-32">
        <SectionHeading id="exp" title="Experience & leadership" intro="Roles I hold or have held. Responsibilities and outcomes are added only once confirmed." />
        <ExperienceList detailed />
      </section>

      <section aria-labelledby="skills" className="mx-auto max-w-7xl px-5 pb-24 sm:px-8 md:pb-32">
        <SectionHeading id="skills" title="Skills & tools" />
        <SkillsGrid />
      </section>
    </div>
  );
}
