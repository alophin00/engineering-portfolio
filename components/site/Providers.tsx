"use client";
import { MotionConfig } from "motion/react";

/** Respects the visitor's "reduce motion" OS setting for every Motion animation. */
export default function Providers({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
