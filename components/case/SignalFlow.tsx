const steps = [
  { name: "Light", detail: "Ambient light on the LDR" },
  { name: "Voltage divider", detail: "Resistance change → voltage" },
  { name: "ADC", detail: "read_u16() → 0–65535" },
  { name: "Filter", detail: "Low-pass smoothing" },
  { name: "Map", detail: "Level → hue → R, G, B" },
  { name: "PWM", detail: "duty_u16() per channel" },
  { name: "RGB LED", detail: "Visible color" },
];

export default function SignalFlow() {
  return (
    <figure className="my-8">
      <ol className="grid gap-px border border-line bg-line sm:grid-cols-4 lg:grid-cols-7" aria-label="Signal path from sensor to LED">
        {steps.map((s, i) => (
          <li key={s.name} className="relative bg-deep/80 p-4">
            <span className="font-mono text-[10px] text-steel">{String(i + 1).padStart(2, "0")}</span>
            <p className={`mt-2 font-display text-sm ${i === 0 || i === steps.length - 1 ? "text-signal" : "text-paper"}`}>{s.name}</p>
            <p className="mt-1 text-xs leading-relaxed text-muted">{s.detail}</p>
          </li>
        ))}
      </ol>
      <figcaption className="mt-3 text-sm text-muted">Analog in, digital processing, PWM out — one pass every 20 ms in the reference loop.</figcaption>
    </figure>
  );
}
