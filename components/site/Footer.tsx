import Link from "next/link";
import { site } from "@/data/site";
import ContactLinks from "@/components/ui/ContactLinks";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 sm:px-8 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="font-display text-lg">{site.name}</p>
          <p className="mt-1 text-sm text-muted">
            {site.education.major}, {site.education.school} — {site.education.campus}
          </p>
          <div className="mt-5">
            <ContactLinks compact />
          </div>
        </div>
        <div className="flex flex-col gap-2 text-sm text-muted md:items-end">
          <Link href="/projects" className="hover:text-paper">All projects</Link>
          <Link href="/about" className="hover:text-paper">About</Link>
          <p className="mt-3 font-mono text-[11px] text-steel">© {new Date().getFullYear()} {site.name}</p>
        </div>
      </div>
    </footer>
  );
}
