"use client";
import { useState } from "react";
import { Check, Copy } from "lucide-react";

export default function CodeBlock({ code, filename, language, note }: { code: string; filename?: string; language: string; note?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };
  return (
    <figure className="my-8 border border-line bg-[#050c17]">
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
        <span className="font-mono text-[11px] text-steel">{filename ?? language}</span>
        <button type="button" onClick={copy} className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-paper" aria-live="polite">
          {copied ? <Check size={13} aria-hidden="true" /> : <Copy size={13} aria-hidden="true" />}
          {copied ? "Copied" : "Copy code"}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed">
        <code className="font-mono text-paper/90">{code}</code>
      </pre>
      {note && <figcaption className="border-t border-line px-4 py-2.5 font-mono text-[11px] text-amber">{note}</figcaption>}
    </figure>
  );
}
