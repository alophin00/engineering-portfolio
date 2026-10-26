import { skillGroups, skillLevelLabel, type SkillLevel } from "@/data/skills";

const levelStyle: Record<SkillLevel, string> = {
  "hands-on": "border-signal/40 text-paper",
  learning: "border-dashed border-amber/50 text-paper/90",
  interest: "border-line text-muted",
};
const dot: Record<SkillLevel, string> = {
  "hands-on": "bg-signal",
  learning: "border border-amber bg-transparent",
  interest: "bg-steel/50",
};

export default function SkillsGrid() {
  return (
    <div>
      <ul className="mb-8 flex flex-wrap gap-5 font-mono text-[11px] text-muted" aria-label="Skill level key">
        {(Object.keys(skillLevelLabel) as SkillLevel[]).map((l) => (
          <li key={l} className="flex items-center gap-2">
            <span className={`size-2 rounded-full ${dot[l]}`} aria-hidden="true" />
            {skillLevelLabel[l]}
          </li>
        ))}
      </ul>
      <div className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {skillGroups.map((g) => (
          <section key={g.title} className="bg-ink p-6" aria-labelledby={`skills-${g.title}`}>
            <h3 id={`skills-${g.title}`} className="font-display text-lg">{g.title}</h3>
            <p className="mt-1 text-sm text-muted">{g.description}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {g.skills.map((s) => (
                <li key={s.name} className={`inline-flex items-center gap-2 border px-2.5 py-1.5 text-sm ${levelStyle[s.level]}`}>
                  <span className={`size-1.5 rounded-full ${dot[s.level]}`} aria-hidden="true" />
                  {s.name}
                  <span className="sr-only">({skillLevelLabel[s.level]})</span>
                  {s.level === "learning" && <span aria-hidden="true" className="font-mono text-[10px] text-amber">learning</span>}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
