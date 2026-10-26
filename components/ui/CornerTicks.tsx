/** Registration marks at the corners of a drawing view. Purely decorative. */
export default function CornerTicks({ className = "" }: { className?: string }) {
  const base = "pointer-events-none absolute size-3 border-steel/60";
  return (
    <span aria-hidden="true" className={className}>
      <span className={`${base} left-0 top-0 border-l border-t`} />
      <span className={`${base} right-0 top-0 border-r border-t`} />
      <span className={`${base} bottom-0 left-0 border-b border-l`} />
      <span className={`${base} bottom-0 right-0 border-b border-r`} />
    </span>
  );
}
