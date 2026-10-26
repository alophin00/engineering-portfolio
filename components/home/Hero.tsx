"use client";
import Link from "next/link";
import { motion } from "motion/react";
import { site } from "@/data/site";
import { HeroCanvas } from "@/components/three/lazy";
import CornerTicks from "@/components/ui/CornerTicks";

const ease = [0.22, 1, 0.36, 1] as const;
const rise = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease, delay },
});

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line pt-16" aria-labelledby="hero-title">
      <div aria-hidden="true" className="absolute inset-0 bg-blueprint [mask-image:radial-gradient(ellipse_at_70%_40%,black,transparent_75%)]" />
      <div className="relative mx-auto grid min-h-[calc(100svh-4rem)] max-w-7xl items-center gap-10 px-5 py-14 sm:px-8 lg:grid-cols-12 lg:py-10">
        <div className="lg:col-span-6">
          <motion.p {...rise(0.05)} className="font-display text-lg text-paper md:text-xl">
            {site.name}
          </motion.p>
          <h1 id="hero-title" className="mt-5 text-[clamp(2.75rem,6.6vw,5.75rem)] font-medium leading-[0.96] tracking-[-0.035em]">
            <motion.span {...rise(0.15)} className="block">Engineering Solutions</motion.span>
            <motion.span {...rise(0.27)} className="block text-paper/80">for Human Problems.</motion.span>
          </h1>
          <motion.p {...rise(0.4)} className="mt-7 max-w-[34rem] text-base leading-relaxed text-muted md:text-lg">
            {site.intro}
          </motion.p>
          <motion.ul {...rise(0.5)} className="mt-6 flex flex-wrap items-center font-mono text-[12px] text-steel" aria-label="Focus areas">
            {site.positioning.map((p, i) => (
              <li key={p} className="flex items-center">
                {i > 0 && <span aria-hidden="true" className="mx-3 h-3 w-px bg-steel/40" />}
                {p}
              </li>
            ))}
          </motion.ul>
          <motion.div {...rise(0.6)} className="mt-10 flex flex-wrap gap-3">
            <Link href="#work" className="inline-flex items-center bg-signal px-5 py-3 text-sm font-medium text-ink transition-colors hover:bg-paper">
              Explore projects
            </Link>
            <Link href="/resume" className="inline-flex items-center border border-steel/50 px-5 py-3 text-sm text-paper transition-colors hover:border-paper">
              View resume
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease, delay: 0.3 }}
          className="lg:col-span-6"
        >
          <div className="relative border border-line bg-ink/40">
            <CornerTicks />
            <div className="h-[320px] sm:h-[420px] lg:h-[480px]" role="img" aria-label="Rotating 3D concept assembly of the wearable nasal compression device, shown partly exploded">
              <HeroCanvas />
            </div>
            {/* Drawing title block */}
            <dl className="grid grid-cols-2 border-t border-line font-mono text-[10px] sm:grid-cols-4">
              {[
                ["Drawing", "Concept assembly"],
                ["Project", "AT-001"],
                ["Drawn", "A. Thompson"],
                ["Status", "Concept · not CAD"],
              ].map(([k, v], i) => (
                <div key={k} className={`px-3 py-2 ${i > 0 ? "sm:border-l" : ""} ${i % 2 === 1 ? "border-l" : ""} ${i > 1 ? "border-t sm:border-t-0" : ""} border-line`}>
                  <dt className="text-steel">{k}</dt>
                  <dd className="mt-0.5 text-paper/90">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <p className="mt-3 text-xs text-muted">Drag to rotate. Simplified concept geometry for the nasal device — see the case study.</p>
        </motion.div>
      </div>

      <Link href="#work" aria-label="Scroll to projects" className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-steel lg:flex">
        <span className="relative h-10 w-px bg-steel/30">
          <span className="scroll-cue-dot absolute -left-[2px] top-0 size-[5px] rounded-full bg-signal" />
        </span>
      </Link>
    </section>
  );
}
