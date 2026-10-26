"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useReducedMotion } from "motion/react";
import ConceptAssembly from "./ConceptAssembly";
import SceneLights from "./SceneLights";

export default function HeroScene() {
  const reduce = !!useReducedMotion();
  return (
    <Canvas
      camera={{ position: [2.9, 1.6, 3.7], fov: 36 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      fallback={<p className="p-6 text-sm text-muted">This 3D view needs WebGL.</p>}
    >
      <SceneLights />
      <ConceptAssembly explode={0.42} reducedMotion={reduce} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={!reduce}
        autoRotateSpeed={0.6}
        minPolarAngle={Math.PI * 0.22}
        maxPolarAngle={Math.PI * 0.58}
      />
    </Canvas>
  );
}
