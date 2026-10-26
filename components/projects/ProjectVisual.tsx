import Image from "next/image";
import type { Project } from "@/lib/types";
import ProjectArt from "./ProjectArt";
import CornerTicks from "@/components/ui/CornerTicks";

export default function ProjectVisual({ project, priority = false }: { project: Project; priority?: boolean }) {
  return (
    <div className="relative aspect-[4/3] overflow-hidden border border-line bg-deep bg-blueprint transition-colors duration-300 group-hover:border-steel/70">
      <CornerTicks />
      {project.cover ? (
        <Image src={project.cover} alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" priority={priority} />
      ) : (
        <div className="absolute inset-4 transition-transform duration-500 ease-out group-hover:scale-[1.02] motion-reduce:transition-none">
          <ProjectArt project={project} />
        </div>
      )}
      <span className="absolute left-4 top-3 font-mono text-[10px] text-steel">{project.code}</span>
    </div>
  );
}
