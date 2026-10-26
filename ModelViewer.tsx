"use client";
/** Loads a GLB/GLTF exported from your CAD workflow. Configure via `model` in data/projects.ts. */
import { Component, Suspense, useMemo, useState, type ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { Bounds, Center, Html, OrbitControls, useGLTF } from "@react-three/drei";
import { RotateCcw } from "lucide-react";
import type { Annotation, ModelSpec } from "@/lib/types";

class ModelErrorBoundary extends Component<{ src: string; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    if (this.state.failed)
      return (
        <div className="grid h-full place-items-center p-6 text-center text-sm text-muted">
          Couldn’t load the model at {this.props.src}. Check that the file exists in /public/models and is a valid GLB or GLTF.
        </div>
      );
    return this.props.children;
  }
}

function Model({ spec, active, onPick }: { spec: ModelSpec; active: string | null; onPick: (a: Annotation) => void }) {
  const gltf = useGLTF(spec.src);
  const scene = useMemo(() => gltf.scene.clone(true), [gltf.scene]);
  return (
    <group scale={spec.scale ?? 1}>
      <primitive object={scene} />
      {spec.annotations?.map((a, i) => (
        <Html key={a.id} position={a.position} center zIndexRange={[20, 0]}>
          <button
            type="button"
            onClick={() => onPick(a)}
            className={`grid size-6 place-items-center rounded-full border font-mono text-[11px] ${
              active === a.id ? "border-signal bg-signal text-ink" : "border-steel bg-ink/80 text-paper"
            }`}
            aria-label={a.label}
          >
            {i + 1}
          </button>
        </Html>
      ))}
    </group>
  );
}

export default function ModelViewer({ spec, title }: { spec: ModelSpec; title: string }) {
  const [viewKey, setViewKey] = useState(0);
  const [active, setActive] = useState<Annotation | null>(null);

  return (
    <figure className="my-8 border border-line bg-deep/50">
      <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
        <p className="font-mono text-[11px] text-signal">CAD model — {title}</p>
        <button
          type="button"
          onClick={() => {
            setViewKey((k) => k + 1);
            setActive(null);
          }}
          className="inline-flex items-center gap-1.5 border border-line px-2.5 py-1.5 text-xs text-muted hover:border-signal hover:text-paper"
        >
          <RotateCcw size={13} aria-hidden="true" /> Reset view
        </button>
      </div>
      <div className="relative h-[360px] bg-blueprint sm:h-[480px]" role="img" aria-label={`Interactive 3D model: ${title}. Drag to rotate, scroll to zoom.`}>
        <ModelErrorBoundary src={spec.src}>
          <Canvas key={viewKey} camera={{ position: [3, 2, 4], fov: 40 }} dpr={[1, 2]}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[4, 6, 5]} intensity={1.4} />
            <directionalLight position={[-4, -2, -3]} intensity={0.4} color="#6599c8" />
            <Suspense fallback={<Html center><span className="font-mono text-xs text-muted">Loading model…</span></Html>}>
              <Bounds fit clip observe margin={1.2}>
                <Center>
                  <Model spec={spec} active={active?.id ?? null} onPick={(a) => setActive((cur) => (cur?.id === a.id ? null : a))} />
                </Center>
              </Bounds>
            </Suspense>
            <OrbitControls makeDefault />
          </Canvas>
        </ModelErrorBoundary>
      </div>
      {spec.annotations && spec.annotations.length > 0 && (
        <figcaption className="border-t border-line px-4 py-3 text-sm" aria-live="polite">
          {active ? (
            <>
              <span className="text-paper">{active.label}</span>
              <span className="text-muted"> — {active.description}</span>
            </>
          ) : (
            <span className="text-muted">Select a numbered marker to inspect a component.</span>
          )}
        </figcaption>
      )}
    </figure>
  );
}
