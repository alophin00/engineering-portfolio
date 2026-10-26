import type { Block, Project } from "@/lib/types";
import { ProgressTag, ProgressGlyph } from "@/components/ui/Status";
import Placeholder from "@/components/ui/Placeholder";
import { ExplodedView, ModelViewer } from "@/components/three/lazy";
import CircuitDiagram from "./CircuitDiagram";
import SignalFlow from "./SignalFlow";
import CodeBlock from "./CodeBlock";
import Gallery from "./Gallery";
import { TriangleAlert, CircleCheck, Info, Lightbulb } from "lucide-react";

const calloutStyle = {
  info: { cls: "border-steel/50", icon: Info, color: "text-steel", tag: "Note" },
  proposed: { cls: "border-amber/50", icon: Lightbulb, color: "text-amber", tag: "Proposed" },
  warning: { cls: "border-amber/70 bg-amber/[0.04]", icon: TriangleAlert, color: "text-amber", tag: "Caution" },
  complete: { cls: "border-signal/50", icon: CircleCheck, color: "text-signal", tag: "Complete" },
} as const;

function RenderBlock({ block, project }: { block: Block; project: Project }) {
  switch (block.type) {
    case "heading":
      return <h3 className="mt-12 text-xl font-medium tracking-tight first:mt-0 md:text-2xl">{block.text}</h3>;
    case "text":
      return <p className="mt-4 max-w-[68ch] leading-[1.75] text-paper/85">{block.body}</p>;
    case "list":
      return (
        <div className="mt-6">
          {block.title && <h4 className="text-sm text-muted">{block.title}</h4>}
          <ul className="mt-3 max-w-[68ch] space-y-3">
            {block.items.map((it) => (
              <li key={it} className="relative pl-5 leading-relaxed text-paper/85">
                <span aria-hidden="true" className="absolute left-0 top-[0.7em] h-px w-2.5 bg-signal" />
                {it}
              </li>
            ))}
          </ul>
        </div>
      );
    case "callout": {
      const s = calloutStyle[block.tone];
      const Icon = s.icon;
      return (
        <aside className={`mt-6 max-w-[72ch] border-l-2 ${s.cls} bg-deep/50 px-5 py-4`}>
          <p className={`flex items-center gap-2 text-sm ${s.color}`}>
            <Icon size={15} aria-hidden="true" />
            <span className="font-mono text-[11px]">{s.tag}</span>
            <span className="text-paper">{block.title}</span>
          </p>
          <p className="mt-2 leading-relaxed text-paper/80">{block.body}</p>
        </aside>
      );
    }
    case "table":
      return (
        <div className="mt-6 overflow-x-auto border border-line">
          <table className="w-full min-w-[560px] border-collapse text-left text-sm">
            {block.caption && <caption className="border-b border-line bg-deep/60 px-4 py-2.5 text-left font-mono text-[11px] text-steel">{block.caption}</caption>}
            <thead>
              <tr className="border-b border-line">
                {block.columns.map((c, i) => <th key={i} scope="col" className="px-4 py-3 font-normal text-muted">{c}</th>)}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((r, i) => (
                <tr key={i} className="border-b border-line/70 last:border-0">
                  {r.map((cell, j) =>
                    j === 0 ? (
                      <th key={j} scope="row" className="px-4 py-3 align-top font-normal text-paper">{cell}</th>
                    ) : (
                      <td key={j} className={`px-4 py-3 align-top ${cell === "Proposed" ? "font-mono text-[11px] text-amber" : "text-paper/80"}`}>{cell}</td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "requirements":
      return (
        <div className="mt-6 overflow-x-auto border border-line">
          <table className="w-full min-w-[620px] border-collapse text-left text-sm">
            <caption className="sr-only">Design requirements</caption>
            <thead>
              <tr className="border-b border-line bg-deep/60 text-muted">
                <th scope="col" className="w-14 px-4 py-3 font-normal">ID</th>
                <th scope="col" className="px-4 py-3 font-normal">Requirement</th>
                <th scope="col" className="w-20 px-4 py-3 font-normal">Priority</th>
                <th scope="col" className="px-4 py-3 font-normal">Verification (planned)</th>
              </tr>
            </thead>
            <tbody>
              {block.items.map((r) => (
                <tr key={r.id} className="border-b border-line/70 last:border-0">
                  <th scope="row" className="px-4 py-3 align-top font-mono text-[12px] font-normal text-signal">{r.id}</th>
                  <td className="px-4 py-3 align-top text-paper/90">{r.text}</td>
                  <td className="px-4 py-3 align-top font-mono text-[11px] text-muted">{r.priority === "must" ? "Must" : "Should"}</td>
                  <td className="px-4 py-3 align-top text-muted">{r.verification}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "results":
      return (
        <div className="mt-6 grid gap-px border border-line bg-line sm:grid-cols-2">
          {block.items.map((r) => (
            <div key={r.measure} className="bg-ink p-5">
              <p className="text-paper">{r.measure}</p>
              <p className="mt-1 text-sm text-muted">{r.method}</p>
              <p className={`mt-4 font-mono text-sm ${r.value ? "text-signal" : "text-steel"}`}>{r.value ?? "Awaiting measurement"}</p>
            </div>
          ))}
        </div>
      );
    case "code":
      return block.code ? (
        <CodeBlock code={block.code} filename={block.filename} language={block.language} note={block.note} />
      ) : (
        <Placeholder label={block.filename ?? "Source code"} hint="Paste your code into this block’s `code` field in data/projects.ts." className="my-8" />
      );
    case "gallery":
      return <Gallery items={block.items} slug={project.slug} />;
    case "placeholder":
      return <Placeholder label={block.label} hint={block.hint} className="mt-6" />;
    case "widget":
      if (block.widget === "exploded-view") return <ExplodedView />;
      if (block.widget === "circuit-diagram") return <CircuitDiagram />;
      if (block.widget === "signal-flow") return <SignalFlow />;
      if (block.widget === "model-viewer")
        return project.model ? (
          <ModelViewer spec={project.model} title={project.title} />
        ) : (
          <Placeholder
            label="Interactive CAD model"
            hint={"Export your SolidWorks assembly as GLB, place it in /public/models/, and set model: { src: \"/models/your-file.glb\" } on this project in data/projects.ts. Rotate, zoom, reset and clickable annotations are already wired up."}
            aspect="min-h-56"
            className="my-8"
          />
        );
      return null;
  }
}

export default function CaseStudy({ project }: { project: Project }) {
  return (
    <div className="grid gap-12 lg:grid-cols-12">
      <nav aria-label="Case study sections" className="hidden lg:col-span-3 lg:block">
        <ol className="sticky top-24 space-y-1 border-l border-line">
          {project.sections.map((s) => (
            <li key={s.number}>
              <a href={`#s-${s.number}`} className="-ml-px flex items-center gap-3 border-l border-transparent py-1.5 pl-4 text-sm text-muted hover:border-signal hover:text-paper">
                <span className="font-mono text-[11px] text-steel">{s.number}</span>
                <span className="flex-1">{s.title}</span>
                <ProgressGlyph status={s.status} size={10} />
              </a>
            </li>
          ))}
        </ol>
      </nav>
      <div className="lg:col-span-9">
        {project.sections.map((s) => (
          <section key={s.number} id={`s-${s.number}`} aria-labelledby={`h-${s.number}`} className="border-t border-line py-12 first:pt-8 md:py-16">
            <header className="mb-8 flex flex-wrap items-start gap-x-5 gap-y-3">
              <span className="grid size-11 shrink-0 place-items-center rounded-full border border-steel/60 font-mono text-sm text-paper">{s.number}</span>
              <div className="min-w-0 flex-1">
                <h2 id={`h-${s.number}`} className="text-2xl font-medium tracking-tight md:text-3xl">{s.title}</h2>
                <p className="mt-1 text-muted">{s.question}</p>
              </div>
              <ProgressTag status={s.status} />
            </header>
            {s.blocks.map((b, i) => <RenderBlock key={i} block={b} project={project} />)}
          </section>
        ))}
      </div>
    </div>
  );
}
