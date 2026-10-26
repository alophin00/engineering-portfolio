import Reveal from "./Reveal";

export default function SectionHeading({ title, intro, id }: { title: string; intro?: string; id?: string }) {
  return (
    <Reveal className="mb-10 grid gap-4 border-t border-line pt-6 md:mb-14 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-10">
      <h2 id={id} className="text-3xl font-medium tracking-tight md:text-5xl">
        {title}
      </h2>
      {intro && <p className="max-w-xl text-base leading-relaxed text-muted md:pt-2 md:text-lg">{intro}</p>}
    </Reveal>
  );
}
