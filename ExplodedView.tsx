"use client";
import { useId, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useReducedMotion } from "motion/react";
import { RotateCcw, Tag } from "lucide-react";
import ConceptAssembly from "./ConceptAssembly";
import SceneLights from "./SceneLights";
import { assemblyParts, type PartId } from "@/data/assembly";

export default function ExplodedView() {
  const [explode, setExplode] = useState(0.6);
  const [selected, setSelected] = useState<PartId | null>(null);
  const [labels, setLabels] = useState(true);
  const [viewKey, setViewKey] = useState(0);
  const reduce = !!useReducedMotion();
  const sliderId = useId();
  const active = assemblyParts.find((p) => p.id === selected);
  const toggle = (id: PartId) => setSelected((s) => (s === id ? null : id));

  return (
    <figure className="not-prose my-8 border border-line bg-deep/50">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3">
        <p className="font-mono text-[11px] text-amber">Conceptual visualization — simplified geometry, not CAD or to scale</p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setLabels((l) => !l)}
            aria-pressed={labels}
            className="inline-flex items-center gap-1.5 border border-line px-2.5 py-1.5 text-xs text-muted hover:border-signal hover:text-paper"
          >
            <Tag size={13} aria-hidden="true" /> Labels
          </button>
          <button
            type="button"
            onClick={() => {
              setViewKey((k) => k + 1);
              setSelected(null);
            }}
            className="inline-flex items-center gap-1.5 border border-line px-2.5 py-1.5 text-xs text-muted hover:border-signal hover:text-paper"
          >
            <RotateCcw size={13} aria-hidden="true" /> Reset view
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_17rem]">
        <div
          className="relative h-[340px] bg-blueprint sm:h-[440px] lg:h-[500px]"
          role="img"
          aria-label="Interactive conceptual exploded view of the nasal device: outer shell, cooling inserts, contact layer, compression mechanism and retention strap. Drag to rotate, scroll or pinch to zoom."
        >
          <Canvas
            key={viewKey}
            camera={{ position: [2.8, 1.8, 3.9], fov: 40 }}
            dpr={[1, 2]}
            onPointerMissed={() => setSelected(null)}
            fallback={<p className="p-6 text-sm text-muted">This 3D view needs WebGL. The part list describes each component.</p>}
          >
            <SceneLights />
            <ConceptAssembly explode={explode} selected={selected} onSelect={toggle} showLabels={labels} reducedMotion={reduce} />
            <OrbitControls enablePan={false} minDistance={2.6} maxDistance={9} />
          </Canvas>
          <p className="pointer-events-none absolute bottom-3 left-4 font-mono text-[10px] text-steel">Drag to rotate · scroll to zoom</p>
        </div>

        <div className="border-t border-line lg:border-l lg:border-t-0">
          <ul className="divide-y divide-line">
            {assemblyParts.map((p) => (
              <li key={p.id}>
                <button
                  type="button"
                  onClick={() => toggle(p.id)}
                  aria-pressed={selected === p.id}
                  className={`flex w-full items-start gap-3 px-4 py-3 text-left transition-colors ${
                    selected === p.id ? "bg-signal/10" : "hover:bg-panel"
                  }`}
                >
                  <span
                    className={`mt-0.5 grid size-6 shrink-0 place-items-center rounded-full border font-mono text-[11px] ${
                      selected === p.id ? "border-signal text-signal" : "border-steel/50 text-steel"
                    }`}
                  >
                    {p.index}
                  </span>
                  <span>
                    <span className="block text-sm text-paper">{p.name}</span>
                    {selected === p.id && <span className="mt-1 block text-xs leading-relaxed text-muted">{p.description}</span>}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-col gap-2 border-t border-line px-4 py-4 sm:flex-row sm:items-center sm:gap-5">
        <label htmlFor={sliderId} className="shrink-0 text-sm text-paper">
          Separate components
        </label>
        <input
          id={sliderId}
          type="range"
          min={0}
          max={100}
          value={Math.round(explode * 100)}
          onChange={(e) => setExplode(Number(e.target.value) / 100)}
          aria-valuetext={`${Math.round(explode * 100)}% exploded`}
          className="w-full"
        />
        <span className="w-24 shrink-0 font-mono text-xs text-muted">{explode === 0 ? "Assembled" : `${Math.round(explode * 100)}% apart`}</span>
      </div>

      <figcaption className="sr-only" aria-live="polite">
        {active ? `${active.name}: ${active.description}` : "No component selected."}
      </figcaption>
    </figure>
  );
}
