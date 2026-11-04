import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PicoChallenges from "../../../components/PicoChallenges";
import { picoMeta } from "../../../data/pico-challenges";

export const metadata: Metadata = {
  title: "Pico-0: Getting Started with Raspberry Pi Pico — Alexander Thompson",
  description:
    "Four Raspberry Pi Pico electronics challenges built with MicroPython: a police siren, a darkness warning light, light-following brightness and a rainbow RGB LED.",
};

export default function PicoProjectPage() {
  return (
    <main id="main" className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8">
      <Link href="/projects" className="text-sm opacity-70 hover:opacity-100">
        All projects
      </Link>

      <header className="mt-6 mb-16 grid items-center gap-10 md:grid-cols-2">
        <div>
          <p className="text-sm font-semibold opacity-70">AT-002</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
            Pico-0: Getting started with Raspberry Pi Pico
          </h1>
          <p className="mt-4 text-lg">Alexander Thompson</p>
          <p className="opacity-70">{picoMeta.course}</p>
        </div>
        <Image
          src={picoMeta.hero.src}
          alt={picoMeta.hero.alt}
          width={picoMeta.hero.width}
          height={picoMeta.hero.height}
          sizes="(min-width: 768px) 50vw, 100vw"
          priority
          className="h-auto w-full rounded-lg"
        />
      </header>

      <PicoChallenges />
    </main>
  );
}
