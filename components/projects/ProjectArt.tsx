/** Built-in line illustrations used until real project photos are added (set `cover` on a project). */
import type { Project } from "@/lib/types";

const S = "var(--color-steel)";
const C = "var(--color-signal)";
const A = "var(--color-amber)";

function Balloon({ x, y, n, lx, ly }: { x: number; y: number; n: number; lx: number; ly: number }) {
  return (
    <g>
      <line x1={x} y1={y} x2={lx} y2={ly} stroke={S} strokeWidth="0.8" />
      <circle cx={lx} cy={ly} r="2" fill={S} />
      <circle cx={x} cy={y} r="10" fill="var(--color-ink)" stroke={S} strokeWidth="1" />
      <text x={x} y={y + 3.5} textAnchor="middle" fontSize="10" fill="var(--color-paper)" fontFamily="var(--font-mono)">{n}</text>
    </g>
  );
}

function Nasal() {
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" role="img" aria-label="Concept sketch of the nasal device, front view, with five numbered components">
      {/* arch (shell) */}
      <path d="M118 168 A82 82 0 0 1 282 168" fill="none" stroke={S} strokeWidth="14" strokeLinecap="round" opacity="0.35" />
      <path d="M118 168 A82 82 0 0 1 282 168" fill="none" stroke={S} strokeWidth="1.4" />
      {/* wings */}
      <rect x="108" y="168" width="18" height="86" rx="3" fill="none" stroke={S} strokeWidth="1.4" />
      <rect x="274" y="168" width="18" height="86" rx="3" fill="none" stroke={S} strokeWidth="1.4" />
      {/* cooling inserts */}
      <rect x="128" y="178" width="14" height="66" rx="2" fill={C} fillOpacity="0.14" stroke={C} strokeWidth="1.2" />
      <rect x="258" y="178" width="14" height="66" rx="2" fill={C} fillOpacity="0.14" stroke={C} strokeWidth="1.2" />
      {/* contact layer */}
      <rect x="144" y="174" width="6" height="74" rx="3" fill="none" stroke="var(--color-paper)" strokeOpacity="0.7" strokeWidth="1.2" />
      <rect x="250" y="174" width="6" height="74" rx="3" fill="none" stroke="var(--color-paper)" strokeOpacity="0.7" strokeWidth="1.2" />
      {/* compression: thumbwheel + screw */}
      <line x1="200" y1="86" x2="200" y2="70" stroke={A} strokeWidth="2" />
      <rect x="180" y="58" width="40" height="12" rx="2" fill="none" stroke={A} strokeWidth="1.4" />
      {[186, 192, 198, 204, 210, 216].map((x) => <line key={x} x1={x} y1="58" x2={x} y2="70" stroke={A} strokeWidth="0.6" opacity="0.7" />)}
      {/* retention strap, dashed = hidden behind */}
      <path d="M117 230 C 60 236, 40 270, 90 284 M283 230 C 340 236, 360 270, 310 284" fill="none" stroke={S} strokeWidth="1.2" strokeDasharray="4 3" />
      {/* centerline */}
      <line x1="200" y1="40" x2="200" y2="270" stroke={S} strokeWidth="0.6" strokeDasharray="10 3 2 3" opacity="0.6" />
      {/* dimension line */}
      <line x1="108" y1="272" x2="292" y2="272" stroke={S} strokeWidth="0.6" opacity="0.7" />
      <line x1="108" y1="266" x2="108" y2="278" stroke={S} strokeWidth="0.6" />
      <line x1="292" y1="266" x2="292" y2="278" stroke={S} strokeWidth="0.6" />
      <text x="200" y="268" textAnchor="middle" fontSize="8" fill={S} fontFamily="var(--font-mono)">W — TBD</text>
      <Balloon n={1} x={60} y={110} lx={140} ly={118} />
      <Balloon n={2} x={340} y={150} lx={265} ly={196} />
      <Balloon n={3} x={60} y={200} lx={147} ly={205} />
      <Balloon n={4} x={300} y={50} lx={220} ly={64} />
      <Balloon n={5} x={360} y={250} lx={336} ly={262} />
    </svg>
  );
}

function Pico() {
  const pins = Array.from({ length: 10 }, (_, i) => 92 + i * 14);
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" role="img" aria-label="Illustration of a Raspberry Pi Pico wired to a light sensor and an RGB LED">
      <rect x="150" y="70" width="100" height="170" rx="4" fill="none" stroke={S} strokeWidth="1.4" />
      <rect x="185" y="60" width="30" height="14" rx="2" fill="none" stroke={S} strokeWidth="1" />
      <rect x="178" y="130" width="44" height="44" fill="none" stroke={S} strokeWidth="1" opacity="0.8" />
      {pins.map((y) => (
        <g key={y}>
          <circle cx="158" cy={y} r="2.5" fill="none" stroke={S} strokeWidth="0.8" />
          <circle cx="242" cy={y} r="2.5" fill="none" stroke={S} strokeWidth="0.8" />
        </g>
      ))}
      <text x="200" y="230" textAnchor="middle" fontSize="9" fill={S} fontFamily="var(--font-mono)">RP2040</text>
      {/* LDR */}
      <path d="M158 106 H 110 V 120 l 6 4 -12 6 12 6 -12 6 12 6 -6 4 V 175" fill="none" stroke={C} strokeWidth="1.3" />
      <path d="M86 128 l 10 6 M86 140 l 10 6" stroke={A} strokeWidth="1" />
      <text x="70" y="160" fontSize="9" fill={C} fontFamily="var(--font-mono)">LDR</text>
      <line x1="110" y1="175" x2="158" y2="175" stroke={C} strokeWidth="1.3" />
      {/* RGB LED */}
      {[
        { y: 120, col: "#ff6b6b" },
        { y: 134, col: "#5be58f" },
        { y: 148, col: "#5ba8ff" },
      ].map((l, i) => (
        <g key={i}>
          <path d={`M242 ${l.y} H 300`} stroke={l.col} strokeWidth="1.3" />
          <path d={`M300 ${l.y - 5} L 310 ${l.y} L 300 ${l.y + 5} Z`} fill="none" stroke={l.col} strokeWidth="1.2" />
          <line x1="310" y1={l.y - 5} x2="310" y2={l.y + 5} stroke={l.col} strokeWidth="1.2" />
        </g>
      ))}
      <line x1="310" y1="120" x2="340" y2="120" stroke={S} strokeWidth="1" />
      <line x1="310" y1="134" x2="340" y2="134" stroke={S} strokeWidth="1" />
      <line x1="310" y1="148" x2="340" y2="148" stroke={S} strokeWidth="1" />
      <line x1="340" y1="120" x2="340" y2="170" stroke={S} strokeWidth="1" />
      <path d="M330 170 H 350 M334 175 H 346 M338 180 H 342" stroke={S} strokeWidth="1" />
      <text x="292" y="104" fontSize="9" fill={S} fontFamily="var(--font-mono)">RGB LED</text>
    </svg>
  );
}

function Robotics() {
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" role="img" aria-label="Empty drawing sheet reserved for the first robotics project">
      <rect x="40" y="36" width="320" height="228" fill="none" stroke={S} strokeWidth="1" strokeDasharray="6 4" opacity="0.7" />
      <line x1="200" y1="110" x2="200" y2="190" stroke={S} strokeWidth="0.8" />
      <line x1="160" y1="150" x2="240" y2="150" stroke={S} strokeWidth="0.8" />
      <circle cx="200" cy="150" r="26" fill="none" stroke={S} strokeWidth="0.8" />
      <rect x="240" y="226" width="120" height="38" fill="none" stroke={S} strokeWidth="0.8" />
      <line x1="240" y1="245" x2="360" y2="245" stroke={S} strokeWidth="0.6" />
      <text x="248" y="239" fontSize="8" fill={S} fontFamily="var(--font-mono)">AT-003</text>
      <text x="248" y="258" fontSize="8" fill={S} fontFamily="var(--font-mono)">Sheet reserved</text>
    </svg>
  );
}

export default function ProjectArt({ project }: { project: Project }) {
  if (project.art === "nasal") return <Nasal />;
  if (project.art === "pico") return <Pico />;
  return <Robotics />;
}
