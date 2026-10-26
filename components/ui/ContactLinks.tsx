import { Mail, FileText, Link2, CodeXml } from "lucide-react";
import Link from "next/link";
import { site } from "@/data/site";

type Item = { label: string; href: string | null; icon: React.ReactNode; external?: boolean; setIn: string };

/** Contact links. Missing values render as a disabled "add in data/site.ts" chip, never as a fake link. */
export default function ContactLinks({ compact = false }: { compact?: boolean }) {
  const items: Item[] = [
    { label: "Email", href: site.contact.email ? `mailto:${site.contact.email}` : null, icon: <Mail size={16} />, setIn: "contact.email" },
    { label: "LinkedIn", href: site.contact.linkedin, icon: <Link2 size={16} />, external: true, setIn: "contact.linkedin" },
    { label: "GitHub", href: site.contact.github, icon: <CodeXml size={16} />, external: true, setIn: "contact.github" },
    { label: "Resume", href: "/resume", icon: <FileText size={16} />, setIn: "resume.url" },
  ];

  return (
    <ul className={`flex flex-wrap ${compact ? "gap-2" : "gap-3"}`}>
      {items.map((i) => {
        if (!i.href) {
          if (!site.showPlaceholders) return null;
          return (
            <li key={i.label}>
              <span
                className="inline-flex cursor-not-allowed items-center gap-2 border border-dashed border-steel/40 px-3 py-2 text-sm text-muted/70"
                title={`Add ${i.label} in data/site.ts (${i.setIn})`}
              >
                {i.icon}
                {i.label}
                <span className="font-mono text-[10px] text-amber/80">to add</span>
              </span>
            </li>
          );
        }
        const cls = `inline-flex items-center gap-2 border border-line px-3 py-2 text-sm text-paper transition-colors hover:border-signal hover:text-signal ${
          compact ? "" : "bg-deep/60"
        }`;
        return (
          <li key={i.label}>
            {i.external ? (
              <a href={i.href} target="_blank" rel="noopener noreferrer" className={cls}>
                {i.icon}
                {i.label}
              </a>
            ) : i.href.startsWith("mailto:") ? (
              <a href={i.href} className={cls}>{i.icon}{i.label}</a>
            ) : (
              <Link href={i.href} className={cls}>{i.icon}{i.label}</Link>
            )}
          </li>
        );
      })}
    </ul>
  );
}
