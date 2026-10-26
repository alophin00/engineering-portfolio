"use client";
/** Client-only, code-split entry points for the 3D views, so three.js never blocks first paint. */
import dynamic from "next/dynamic";

const Loading = ({ h = "h-full" }: { h?: string }) => (
  <div className={`${h} w-full animate-pulse bg-deep/40`} aria-hidden="true" />
);

export const HeroCanvas = dynamic(() => import("./HeroScene"), { ssr: false, loading: () => <Loading /> });
export const ExplodedView = dynamic(() => import("./ExplodedView"), { ssr: false, loading: () => <Loading h="h-[560px] my-8" /> });
export const ModelViewer = dynamic(() => import("./ModelViewer"), { ssr: false, loading: () => <Loading h="h-[480px] my-8" /> });
