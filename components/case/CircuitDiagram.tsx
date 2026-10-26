/** Schematic for the Pico light-sensor / RGB LED circuit. Replace with your own diagram if your build differs. */
const S = "var(--color-steel)";
const P = "var(--color-paper)";
const C = "var(--color-signal)";

function ResV({ x, y1, y2 }: { x: number; y1: number; y2: number }) {
  const h = y2 - y1;
  const seg = h / 7;
  let d = `M${x} ${y1} l0 ${seg / 2}`;
  for (let i = 0; i < 6; i++) d += ` l${i % 2 ? -8 : 8} ${seg}`;
  d += ` l0 ${seg / 2}`;
  return <path d={d} fill="none" stroke={P} strokeWidth="1.4" strokeLinejoin="round" />;
}
function ResH({ y, x1, x2 }: { y: number; x1: number; x2: number }) {
  const w = x2 - x1;
  const seg = w / 7;
  let d = `M${x1} ${y} l${seg / 2} 0`;
  for (let i = 0; i < 6; i++) d += ` l${seg} ${i % 2 ? -7 : 7}`;
  d += ` l${seg / 2} 0`;
  return <path d={d} fill="none" stroke={P} strokeWidth="1.4" strokeLinejoin="round" />;
}
function T({ x, y, children, anchor = "start", color = S }: { x: number; y: number; children: React.ReactNode; anchor?: "start" | "middle" | "end"; color?: string }) {
  return <text x={x} y={y} fontSize="11" fill={color} textAnchor={anchor} fontFamily="var(--font-mono)">{children}</text>;
}
function Ground({ x, y }: { x: number; y: number }) {
  return <path d={`M${x - 12} ${y} H${x + 12} M${x - 7} ${y + 5} H${x + 7} M${x - 3} ${y + 10} H${x + 3}`} stroke={S} strokeWidth="1.4" />;
}

export default function CircuitDiagram() {
  const leds = [
    { pin: "GP13", y: 100, col: "#ff6b6b", ch: "R" },
    { pin: "GP14", y: 160, col: "#5be58f", ch: "G" },
    { pin: "GP15", y: 220, col: "#5ba8ff", ch: "B" },
  ];
  return (
    <figure className="my-8 border border-line bg-deep/50">
      <div className="overflow-x-auto bg-blueprint p-4">
        <svg viewBox="0 0 720 330" className="mx-auto w-full min-w-[620px] max-w-4xl" role="img" aria-label="Schematic: an LDR and 10 kilohm resistor form a voltage divider from 3.3 volts to ground, with the midpoint on GP26 (ADC0). GP13, GP14 and GP15 each drive one channel of a common-cathode RGB LED through a 220 ohm resistor.">
          {/* Pico */}
          <rect x="280" y="40" width="160" height="260" fill="var(--color-ink)" stroke={S} strokeWidth="1.4" />
          <T x={360} y={30} anchor="middle" color={P}>Raspberry Pi Pico</T>
          {[["3V3", 80], ["GP26 · ADC0", 150], ["GND", 240]].map(([l, y]) => (
            <g key={l as string}><circle cx="280" cy={y as number} r="3" fill={S} /><T x={290} y={(y as number) + 4}>{l}</T></g>
          ))}
          {[["GP13", 100], ["GP14", 160], ["GP15", 220], ["GND", 280]].map(([l, y]) => (
            <g key={(l as string) + y}><circle cx="440" cy={y as number} r="3" fill={S} /><T x={430} y={(y as number) + 4} anchor="end">{l}</T></g>
          ))}

          {/* Voltage divider */}
          <path d="M280 80 H120 V90" stroke={P} strokeWidth="1.4" fill="none" />
          <ResV x={120} y1={90} y2={140} />
          <path d="M92 104 l12 7 M92 118 l12 7" stroke="var(--color-amber)" strokeWidth="1.2" />
          <path d="M104 111 l-4 -4 M104 125 l-4 -4" stroke="var(--color-amber)" strokeWidth="1.2" />
          <T x={40} y={120} color={P}>LDR</T>
          <path d="M120 140 V160" stroke={P} strokeWidth="1.4" />
          <circle cx="120" cy="150" r="3.5" fill={C} />
          <path d="M120 150 H280" stroke={C} strokeWidth="1.4" />
          <T x={150} y={143} color={C}>V_out</T>
          <ResV x={120} y1={160} y2={210} />
          <T x={40} y={190} color={P}>10 kΩ</T>
          <path d="M120 210 V240 H280" stroke={P} strokeWidth="1.4" fill="none" />
          <path d="M120 240 V250" stroke={S} strokeWidth="1.4" />
          <Ground x={120} y={252} />

          {/* RGB LED */}
          {leds.map((l) => (
            <g key={l.pin}>
              <path d={`M440 ${l.y} H470`} stroke={l.col} strokeWidth="1.4" />
              <ResH y={l.y} x1={470} x2={530} />
              <path d={`M530 ${l.y} H556`} stroke={l.col} strokeWidth="1.4" />
              <path d={`M556 ${l.y - 9} L574 ${l.y} L556 ${l.y + 9} Z`} fill="none" stroke={l.col} strokeWidth="1.4" />
              <path d={`M574 ${l.y - 9} V${l.y + 9}`} stroke={l.col} strokeWidth="1.6" />
              <path d={`M574 ${l.y} H620`} stroke={S} strokeWidth="1.4" />
              <T x={500} y={l.y - 12} anchor="middle">220 Ω</T>
              <T x={590} y={l.y - 12} color={l.col}>{l.ch}</T>
            </g>
          ))}
          <path d="M620 100 V280 H440" stroke={S} strokeWidth="1.4" fill="none" />
          <T x={630} y={194}>common</T>
          <T x={630} y={208}>cathode</T>
        </svg>
      </div>
      <figcaption className="border-t border-line px-4 py-3 text-sm text-muted">
        Typical wiring for this circuit. Pin choices and resistor values are common defaults — confirm them against your build, or replace this with your own wiring diagram. For a common-anode LED, tie the shared pin to 3V3 and invert the PWM duty.
      </figcaption>
    </figure>
  );
}
