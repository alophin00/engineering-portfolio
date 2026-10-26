import Hero from "@/components/home/Hero";
import FeaturedProject from "@/components/projects/FeaturedProject";
import StatusMatrix from "@/components/projects/StatusMatrix";
import SectionHeading from "@/components/ui/SectionHeading";
import SkillsGrid from "@/components/sections/SkillsGrid";
import ExperienceList from "@/components/sections/ExperienceList";
import ContactCTA from "@/components/sections/ContactCTA";
import { featuredProjects, projects } from "@/data/projects";
import Link from "next/link";

const wrap = "mx-auto max-w-7xl px-5 sm:px-8";

export default function Home() {
  return (
    <>
      <Hero />

      <section id="work" aria-labelledby="work-title" className={`${wrap} py-24 md:py-32`}>
        <SectionHeading
          id="work-title"
          title="Featured projects"
          intro="Each project is documented like a design report: problem, research, requirements, concepts, design, prototyping, testing and reflection. Work that hasn’t happened yet is marked as planned."
        />
        <div className="space-y-24 md:space-y-32">
          {featuredProjects.map((p, i) => <FeaturedProject key={p.slug} project={p} index={i} />)}
        </div>
      </section>

      <section aria-labelledby="progress-title" className={`${wrap} pb-24 md:pb-32`}>
        <SectionHeading
          id="progress-title"
          title="Where each project stands"
          intro="Research → Concept Development → CAD → Prototyping → Testing → Iteration. Updated as work moves forward."
        />
        <StatusMatrix projects={projects} />
      </section>

      <section id="skills" aria-labelledby="skills-title" className={`${wrap} pb-24 md:pb-32`}>
        <SectionHeading id="skills-title" title="Skills & tools" intro="Grouped by discipline. Tools I’m still learning are marked separately from ones I’ve used in project work." />
        <SkillsGrid />
      </section>

      <section id="experience" aria-labelledby="exp-title" className={`${wrap} pb-24 md:pb-32`}>
        <SectionHeading id="exp-title" title="Experience & leadership" />
        <ExperienceList />
        <Link href="/about#experience" className="mt-8 inline-block border-b border-signal/50 pb-0.5 text-sm hover:border-signal hover:text-signal">
          More about me and my leadership roles
        </Link>
      </section>

      <ContactCTA />
    </>
  );
}
