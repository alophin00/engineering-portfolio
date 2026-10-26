"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { site } from "@/data/site";

const links = [
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Resume" },
  { href: "/#contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => !href.includes("#") && (pathname === href || pathname.startsWith(href + "/"));

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? "border-b border-line bg-ink/85 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <nav aria-label="Primary" className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="group flex items-center gap-3" aria-label={`${site.name}, home`}>
          <span className="grid size-8 place-items-center border border-steel/50 font-mono text-[11px] tracking-wider text-paper transition-colors group-hover:border-signal">
            {site.initials}
          </span>
          <span className="font-display text-[15px] font-medium tracking-tight">{site.name}</span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                aria-current={isActive(l.href) ? "page" : undefined}
                className={`relative px-3 py-2 text-sm transition-colors hover:text-paper ${
                  isActive(l.href) ? "text-paper" : "text-muted"
                }`}
              >
                {l.label}
                {isActive(l.href) && <span className="absolute inset-x-3 -bottom-px h-px bg-signal" />}
              </Link>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="grid size-10 place-items-center text-paper md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {open && (
        <ul id="mobile-menu" className="border-t border-line px-5 pb-6 pt-2 md:hidden">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between border-b border-line/60 py-4 font-display text-xl"
              >
                {l.label}
                <span className="font-mono text-xs text-steel">{isActive(l.href) ? "current" : ""}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
