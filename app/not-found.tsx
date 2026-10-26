import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto grid min-h-[70vh] max-w-3xl place-content-center px-5 pt-16 text-center">
      <p className="font-mono text-sm text-steel">404</p>
      <h1 className="mt-4 text-4xl font-medium tracking-tight">This page doesn’t exist.</h1>
      <p className="mt-3 text-muted">The link may be out of date. The projects list has everything currently published.</p>
      <div className="mt-8 flex justify-center gap-3">
        <Link href="/projects" className="bg-signal px-5 py-3 text-sm font-medium text-ink hover:bg-paper">See projects</Link>
        <Link href="/" className="border border-line px-5 py-3 text-sm hover:border-paper">Go home</Link>
      </div>
    </div>
  );
}
