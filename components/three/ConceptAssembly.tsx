"use client";
/**
 * CONCEPTUAL assembly of the nasal device, built from simple primitives.
 * It is a visual explanation of the layer structure — not CAD, not to scale.
 * Replace with a real model via `model` in data/projects.ts.
 */
import { useRef } from "react";
import * as THREE from "three";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import { Edges, Html, RoundedBox } from "@react-three/drei";
import { assemblyParts, type PartId } from "@/data/assembly";

const FILL: Record<PartId, string> = {
  shell: "#17344f",
  cooling: "#155a77",
  contact: "#3b5269",
  compression: "#233f5c",
  retention: "#1b2f46",
};
const EDGE: Record<PartId, string> = {
  shell: "#6599c8",
  cooling: "#36d7ff",
  contact: "#c4d3e2",
  compression: "#ffbf47",
  retention: "#6599c8",
};

type Props = {
  explode: number;
  selected?: PartId | null;
  onSelect?: (id: PartId) => void;
  showLabels?: boolean;
  reducedMotion?: boolean;
};

type Tracked = { g: THREE.Group; off: [number, number, number]; side: number };

export default function ConceptAssembly({ explode, selected = null, onSelect, showLabels = false, reducedMotion = false }: Props) {
  const current = useRef(reducedMotion ? explode : 0);
  const tracked = useRef(new Map<string, Tracked>());

  useFrame((_, dt) => {
    current.current = reducedMotion ? explode : THREE.MathUtils.damp(current.current, explode, 5, dt);
    const c = current.current;
    tracked.current.forEach(({ g, off, side }) => g.position.set(off[0] * side * c, off[1] * c, off[2] * c));
  });

  const track = (key: string, off: [number, number, number], side: number) => (g: THREE.Group | null) => {
    if (g) tracked.current.set(key, { g, off, side });
    else tracked.current.delete(key);
  };

  const dim = (id: PartId) => selected !== null && selected !== id;
  const interactive = !!onSelect;
  const handlers = (id: PartId) =>
    interactive
      ? {
          onClick: (e: ThreeEvent<MouseEvent>) => {
            e.stopPropagation();
            onSelect?.(id);
          },
          onPointerOver: (e: ThreeEvent<PointerEvent>) => {
            e.stopPropagation();
            document.body.style.cursor = "pointer";
          },
          onPointerOut: () => {
            document.body.style.cursor = "";
          },
        }
      : {};

  const material = (id: PartId) => (
    <meshStandardMaterial
      color={FILL[id]}
      roughness={0.5}
      metalness={0.15}
      transparent
      opacity={dim(id) ? 0.14 : 0.92}
      depthWrite={!dim(id)}
    />
  );
  const edges = (id: PartId) => <Edges threshold={20} color={dim(id) ? "#28435e" : EDGE[id]} />;

  const label = (id: PartId) => {
    if (!showLabels) return null;
    const p = assemblyParts.find((x) => x.id === id)!;
    const active = selected === id;
    return (
      <Html position={p.labelAnchor} center zIndexRange={[20, 0]}>
        <button
          type="button"
          tabIndex={-1}
          aria-hidden="true"
          onClick={() => onSelect?.(id)}
          className={`whitespace-nowrap border px-2 py-1 font-mono text-[11px] backdrop-blur-sm transition-colors ${
            active ? "border-signal bg-signal text-ink" : "border-steel/50 bg-ink/80 text-paper hover:border-signal"
          } ${dim(id) ? "opacity-40" : ""}`}
        >
          {p.index} {p.name}
        </button>
      </Html>
    );
  };

  const off = (id: PartId) => assemblyParts.find((p) => p.id === id)!.explode;
  const sides = [-1, 1] as const;

  return (
    <group rotation={[0, -0.35, 0]}>
      {/* 1 — Outer shell: arch + two side wings */}
      <group ref={track("shell", off("shell"), 1)}>
        <mesh {...handlers("shell")}>
          <torusGeometry args={[0.9, 0.11, 20, 72, Math.PI]} />
          {material("shell")}
          {edges("shell")}
        </mesh>
        {sides.map((s) => (
          <RoundedBox key={s} args={[0.12, 1.0, 0.75]} radius={0.04} position={[0.9 * s, -0.5, 0]} {...handlers("shell")}>
            {material("shell")}
            {edges("shell")}
          </RoundedBox>
        ))}
        {label("shell")}
      </group>

      {/* 2 — Cooling inserts (paired) */}
      {sides.map((s) => (
        <group key={`cool${s}`} ref={track(`cooling${s}`, off("cooling"), s)}>
          <RoundedBox args={[0.13, 0.72, 0.58]} radius={0.035} position={[0.77 * s, -0.55, 0]} {...handlers("cooling")}>
            {material("cooling")}
            {edges("cooling")}
          </RoundedBox>
          {s === 1 && label("cooling")}
        </group>
      ))}

      {/* 3 — Silicone contact layer (paired) */}
      {sides.map((s) => (
        <group key={`contact${s}`} ref={track(`contact${s}`, off("contact"), s)}>
          <RoundedBox args={[0.06, 0.8, 0.66]} radius={0.025} position={[0.68 * s, -0.55, 0]} {...handlers("contact")}>
            {material("contact")}
            {edges("contact")}
          </RoundedBox>
          {s === -1 && label("contact")}
        </group>
      ))}

      {/* 4 — Compression mechanism: lead screw + thumbwheel */}
      <group ref={track("compression", off("compression"), 1)}>
        <mesh position={[0, 1.1, 0]} {...handlers("compression")}>
          <cylinderGeometry args={[0.035, 0.035, 0.34, 16]} />
          {material("compression")}
          {edges("compression")}
        </mesh>
        <mesh position={[0, 1.3, 0]} {...handlers("compression")}>
          <cylinderGeometry args={[0.2, 0.2, 0.09, 36]} />
          {material("compression")}
          {edges("compression")}
        </mesh>
        {label("compression")}
      </group>

      {/* 5 — Retention strap, looping behind */}
      <group ref={track("retention", off("retention"), 1)}>
        <group position={[0, -0.35, 0]} scale={[1, 1, 1.9]}>
          <mesh rotation={[-Math.PI / 2, 0, 0]} {...handlers("retention")}>
            <torusGeometry args={[0.92, 0.035, 12, 72, Math.PI]} />
            {material("retention")}
            {edges("retention")}
          </mesh>
        </group>
        {label("retention")}
      </group>
    </group>
  );
}
