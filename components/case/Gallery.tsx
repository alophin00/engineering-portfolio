import Image from "next/image";
import type { MediaItem } from "@/lib/types";
import Placeholder from "@/components/ui/Placeholder";
import { site } from "@/data/site";

export default function Gallery({ items, slug }: { items: MediaItem[]; slug: string }) {
  const visible = site.showPlaceholders ? items : items.filter((i) => i.src);
  if (!visible.length) return null;
  return (
    <div className={`my-8 grid gap-4 ${visible.length > 1 ? "sm:grid-cols-2" : ""}`}>
      {visible.map((m, i) =>
        m.src ? (
          <figure key={i}>
            <div className="relative aspect-[4/3] overflow-hidden border border-line bg-deep">
              {m.kind === "video" ? (
                <video src={m.src} poster={m.poster} controls preload="metadata" className="h-full w-full object-cover">
                  <track kind="captions" />
                </video>
              ) : (
                <Image src={m.src} alt={m.alt ?? m.caption} fill sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" />
              )}
            </div>
            <figcaption className="mt-2 text-sm text-muted">{m.caption}</figcaption>
          </figure>
        ) : (
          <Placeholder
            key={i}
            kind={m.kind}
            label={m.caption}
            hint={`Add a ${m.kind === "video" ? "video (.mp4)" : "photo"} to /public/projects/${slug}/ and set its src in data/projects.ts.`}
            aspect="aspect-[4/3]"
          />
        ),
      )}
    </div>
  );
}
