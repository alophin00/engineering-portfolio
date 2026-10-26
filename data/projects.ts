import type { Project } from "@/lib/types";

/**
 * ─────────────────────────────────────────────────────────────
 *  PROJECTS — add, edit or reorder projects here.
 * ─────────────────────────────────────────────────────────────
 *  • Each project gets a page at /projects/<slug>.
 *  • `stages` drives the timeline and the status matrix on the homepage.
 *  • Each case-study section has its own `status`, so readers can always see
 *    what is finished and what is proposed.
 *  • Media: put files in /public/projects/<slug>/ and set `src`.
 *    Any item without `src` renders as a labeled placeholder.
 *  • Never add results you haven't measured. Leave `value` empty instead.
 */

const nasalDevice: Project = {
  slug: "nasal-cooling-compression-device",
  code: "AT-001",
  title: "Wearable Nasal Cooling & Compression Device",
  tagline: "A hands-free way to hold steady pressure during a nosebleed.",
  summary:
    "An independent biomedical design project, inspired by my own frequent nosebleeds, exploring a wearable device that combines controlled external nasal compression with removable cooling inserts.",
  status: { label: "Concept development · In progress", tone: "concept" },
  featured: true,
  order: 1,
  disciplines: [
    "Biomedical Device Design",
    "CAD",
    "Mechanical Design",
    "Thermal Management",
    "Prototyping",
    "Human-Centered Design",
  ],
  tech: ["SolidWorks (planned)", "AutoCAD", "3D printing (planned)", "Silicone", "Phase-change materials"],
  art: "nasal",
  model: null, // → { src: "/models/nasal-device.glb", annotations: [...] }
  disclaimer:
    "This is an exploratory student engineering concept. It is not a medical device, has not been clinically tested or validated, and makes no claim of medical benefit. Nothing here is medical advice.",
  stages: [
    { name: "Research", status: "in-progress", note: "Reviewing first-aid guidance and existing products" },
    { name: "Concept Development", status: "in-progress", note: "Comparing compression and retention concepts" },
    { name: "CAD", status: "planned", note: "SolidWorks modeling once concept is fixed" },
    { name: "Prototyping", status: "planned" },
    { name: "Testing", status: "planned" },
    { name: "Iteration", status: "planned" },
  ],
  sections: [
    {
      number: "01",
      title: "Problem",
      question: "What engineering problem am I addressing?",
      status: "in-progress",
      blocks: [
        {
          type: "text",
          body: "I get frequent nosebleeds, and that is where this project started. Standard first-aid advice for most nosebleeds is to sit up, lean forward and pinch the soft part of the nose continuously for about 10–15 minutes. Holding even pressure for that long is tiring, easy to let up on too early, and it ties up both hands.",
        },
        {
          type: "callout",
          tone: "info",
          title: "Working problem statement",
          body: "How might a wearable device apply steady, adjustable external pressure to the soft part of the nose — with optional cooling — so a person doesn’t have to hold it by hand?",
        },
      ],
    },
    {
      number: "02",
      title: "Research",
      question: "What technical principles, constraints and existing solutions matter?",
      status: "in-progress",
      blocks: [
        {
          type: "list",
          title: "Starting points I’m working from",
          items: [
            "Most nosebleeds are anterior: they come from a network of small vessels near the front of the nasal septum (Kiesselbach’s plexus). That is the region external pressure is meant to reach.",
            "First-aid guidance focuses on sustained pressure on the soft, lower part of the nose, not the bony bridge. The device geometry has to target that area.",
            "Evidence for added benefit from cold application is limited and mixed. I’m treating the cooling insert as a hypothesis to evaluate, not an assumed benefit.",
            "Skin-contact materials, cold exposure and prolonged pressure on soft tissue all carry safety limits that bound the design.",
          ],
        },
        {
          type: "table",
          caption: "Existing approaches",
          columns: ["Approach", "How it works", "Gap this project explores"],
          rows: [
            ["Pinching by hand", "The person holds pressure with their fingers", "Fatigue, inconsistent force, both hands occupied"],
            ["Spring nose clips", "A fixed spring closes the nostrils (e.g. for swimming)", "Built for sealing, not controlled or adjustable pressure"],
            ["Cold compress", "An ice or gel pack held against the nose or face", "Hand-held; contact temperature isn’t controlled"],
          ],
        },
        {
          type: "placeholder",
          label: "Sources",
          hint: "Add citations as you review them: clinical first-aid guidance, published studies on compression and cold therapy, and relevant patents.",
        },
      ],
    },
    {
      number: "03",
      title: "Requirements",
      question: "What must the design accomplish?",
      status: "in-progress",
      blocks: [
        {
          type: "requirements",
          items: [
            { id: "R1", priority: "must", text: "Apply external pressure to the soft lower nose without being held by hand.", verification: "Fit trials on a test form" },
            { id: "R2", priority: "must", text: "Let the user adjust and release compression quickly.", verification: "Mechanism function test" },
            { id: "R3", priority: "must", text: "Use skin-safe, cleanable contact materials.", verification: "Material review against biocompatibility guidance" },
            { id: "R4", priority: "must", text: "Keep contact temperature in a safe range; the cold pack never touches skin directly.", verification: "Surface temperature logging" },
            { id: "R5", priority: "must", text: "Leave the mouth unobstructed for breathing.", verification: "Fit review" },
            { id: "R6", priority: "should", text: "Accommodate a range of nose sizes and shapes.", verification: "Review of facial measurement data" },
            { id: "R7", priority: "should", text: "Let the cooling insert be removed, swapped and re-chilled.", verification: "Assembly test" },
            { id: "R8", priority: "should", text: "Be compact enough to carry in a bag.", verification: "Dimension check" },
          ],
        },
        {
          type: "callout",
          tone: "proposed",
          title: "Targets still to set",
          body: "Numeric targets — force range, contact temperature, wear time and dimensions — will come from research. None are assumed yet.",
        },
      ],
    },
    {
      number: "04",
      title: "Concept Development",
      question: "What ideas were explored and why?",
      status: "in-progress",
      blocks: [
        {
          type: "table",
          caption: "Initial compression concepts",
          columns: ["Concept", "Compression method", "Strengths", "Open questions"],
          rows: [
            ["A · Spring clip", "Fixed spring force", "Simple, few parts", "Force isn’t adjustable; may be too strong or weak"],
            ["B · Screw-adjusted clamp", "Thumbwheel drives the side pads together", "Fine, repeatable adjustment", "More parts; slower to release"],
            ["C · Strap-tensioned", "Strap tension presses pads inward", "Spreads the retention load", "Force depends on fit; harder to control"],
          ],
        },
        {
          type: "callout",
          tone: "proposed",
          title: "Working direction, not a final choice",
          body: "The architecture below combines concept B’s adjustable pads with a strap-style retention system. It’s the version I’m taking into CAD to learn from, not a validated selection.",
        },
        {
          type: "gallery",
          items: [
            { kind: "image", caption: "Concept sketches — A, B and C" },
            { kind: "image", caption: "Hand sketch of the working architecture" },
          ],
        },
      ],
    },
    {
      number: "05",
      title: "Engineering Design",
      question: "CAD, materials, mechanical systems and technical decisions.",
      status: "in-progress",
      blocks: [
        { type: "heading", text: "Device architecture" },
        {
          type: "text",
          body: "The device is built in layers from the outside in: a rigid shell, a removable cooling insert, and a soft contact layer against the skin. A compression mechanism on the shell draws the side pads together, and a retention system keeps the whole assembly in place.",
        },
        {
          type: "table",
          caption: "Proposed components",
          columns: ["Component", "Function", "Material candidates", "Status"],
          rows: [
            ["Outer shell", "Structure; carries the inserts and mechanism", "PLA or PETG for printed prototypes", "Proposed"],
            ["Cooling insert", "Removable cold source", "Gel pack or phase-change pouch", "Proposed"],
            ["Contact layer", "Soft skin interface and thermal barrier", "Silicone", "Proposed"],
            ["Compression mechanism", "Sets pad pressure", "Thumbwheel and lead screw", "Proposed"],
            ["Retention system", "Holds the device hands-free", "Elastic strap or ear loops", "Proposed"],
          ],
        },
        { type: "heading", text: "Exploded assembly" },
        { type: "widget", widget: "exploded-view" },
        { type: "heading", text: "Cooling system concept" },
        {
          type: "text",
          body: "Two options are on the table for the cold source. A gel pack is easy to find but starts out very cold. A phase-change material holds close to its melting temperature while it changes state, which could give a steadier contact temperature.",
        },
        {
          type: "table",
          caption: "Cold source comparison",
          columns: ["", "Gel pack", "Phase-change material"],
          rows: [
            ["How it’s chilled", "Freezer", "Freezer or fridge, depending on melt point"],
            ["Contact temperature", "Starts very cold, then warms steadily", "Holds near its melt temperature during phase change"],
            ["Main risk", "Too cold on skin without a barrier", "Material choice, cost and sourcing"],
            ["Fit in a small insert", "Easy to source in small sizes", "Likely needs a custom pouch"],
          ],
        },
        {
          type: "callout",
          tone: "warning",
          title: "Cold injury risk",
          body: "Prolonged cold contact can injure skin. The contact layer has to act as a thermal barrier, and safe exposure limits must be researched before any wear testing.",
        },
        { type: "heading", text: "Compression mechanism concept" },
        {
          type: "text",
          body: "The working mechanism is a thumbwheel on top of the shell turning a short lead screw, which pulls the two side pads toward each other. Turning it back releases pressure. Because too much sustained pressure can harm soft tissue, any prototype needs a mechanical stop or a force limit.",
        },
        {
          type: "list",
          title: "Mechanism options to compare",
          items: [
            "Lead screw with thumbwheel — fine adjustment; self-locking; slower to release",
            "Ratchet with release button — fast to set and release; adjustment comes in steps",
            "Spring with a preset range — simple; less user control",
          ],
        },
        { type: "heading", text: "CAD development" },
        {
          type: "callout",
          tone: "proposed",
          title: "CAD is planned",
          body: "SolidWorks modeling starts once the concept is fixed — I’m learning SolidWorks now. This section will hold screenshots, drawings and an interactive model.",
        },
        { type: "widget", widget: "model-viewer" },
        {
          type: "gallery",
          items: [
            { kind: "image", caption: "SolidWorks — shell and pad geometry" },
            { kind: "image", caption: "Assembly drawing" },
          ],
        },
      ],
    },
    {
      number: "06",
      title: "Prototyping",
      question: "How the design will be built.",
      status: "planned",
      blocks: [
        {
          type: "list",
          title: "Planned build sequence",
          items: [
            "3D-print shell iterations to check fit and mechanism travel",
            "Fit trials on a non-human test form before anything is worn",
            "Source or cast silicone contact pads",
            "Build insert pouches for the gel and phase-change options",
          ],
        },
        {
          type: "gallery",
          items: [
            { kind: "image", caption: "First printed shell" },
            { kind: "image", caption: "Mechanism test print" },
            { kind: "video", caption: "Compression mechanism demo" },
          ],
        },
      ],
    },
    {
      number: "07",
      title: "Testing and Iteration",
      question: "Measured results, challenges and improvements.",
      status: "planned",
      blocks: [
        {
          type: "callout",
          tone: "warning",
          title: "No testing has been done",
          body: "Results appear here only once real measurements exist. Any testing worn on a person would need appropriate safety review first.",
        },
        {
          type: "results",
          items: [
            { measure: "Contact surface temperature over time", method: "Thermocouple at the pad surface" },
            { measure: "Pad force vs. thumbwheel turns", method: "Force sensor or digital scale on a test form" },
            { measure: "Fit across test-form sizes", method: "Measured gaps and contact area" },
            { measure: "Insert swap time", method: "Timed repeated trials" },
          ],
        },
      ],
    },
    {
      number: "08",
      title: "Reflection",
      question: "What I’ve learned and what I would improve.",
      status: "in-progress",
      blocks: [
        {
          type: "list",
          title: "Open challenges",
          items: [
            "Measuring pressure on soft tissue reliably",
            "Fitting a wide range of nose shapes with one design",
            "Keeping cooling both safe and long-lasting",
            "Cleaning and hygiene between uses",
          ],
        },
        {
          type: "list",
          title: "Future improvements to explore",
          items: [
            "A pressure-indicating feature so the wearer can see the setting",
            "A small set of sizes instead of one universal fit",
            "An embedded temperature sensor, building on my Raspberry Pi Pico work",
          ],
        },
        {
          type: "placeholder",
          label: "Reflection",
          hint: "Write what you’ve learned at each milestone — what surprised you, what you’d change and why.",
        },
      ],
    },
  ],
};

const picoRgb: Project = {
  slug: "pico-light-sensor-rgb",
  code: "AT-002",
  title: "Raspberry Pi Pico Light Sensor & RGB LED",
  tagline: "Reading ambient light and turning it into color.",
  summary:
    "An embedded electronics project that reads a light-dependent resistor through the Pico’s ADC and drives an RGB LED with PWM, so the color shifts with the light around it.",
  status: { label: "Built · Documentation in progress", tone: "active" },
  featured: true,
  order: 2,
  disciplines: ["Embedded Systems", "Analog Sensing", "Circuit Design"],
  tech: ["Raspberry Pi Pico", "MicroPython", "LDR", "RGB LED", "ADC", "PWM"],
  art: "pico",
  model: null,
  stages: [
    { name: "Research", status: "complete" },
    { name: "Concept Development", status: "complete" },
    { name: "CAD", status: "n/a" },
    { name: "Prototyping", status: "complete", note: "Breadboard circuit" },
    { name: "Testing", status: "planned", note: "Record sensor ranges" },
    { name: "Iteration", status: "planned" },
  ],
  sections: [
    {
      number: "01",
      title: "Problem",
      question: "What engineering problem am I addressing?",
      status: "complete",
      blocks: [
        {
          type: "text",
          body: "Build a small embedded system that senses ambient light and responds with a smooth color change on an RGB LED. The goal was to learn the full loop of a sensing system: an analog signal, conversion to a digital value, processing in code, and control of an output.",
        },
      ],
    },
    {
      number: "02",
      title: "Research",
      question: "What technical principles matter?",
      status: "complete",
      blocks: [
        {
          type: "list",
          items: [
            "An LDR’s resistance drops as light increases. Paired with a fixed resistor in a voltage divider, that change becomes a voltage the Pico can read.",
            "The Pico’s RP2040 has a 12-bit ADC. In MicroPython, ADC.read_u16() returns the reading scaled to 0–65535.",
            "PWM sets each LED channel’s apparent brightness by switching it on and off quickly; duty_u16() takes 0–65535.",
            "Each LED channel needs a current-limiting resistor to protect the LED and the GPIO pin.",
          ],
        },
        {
          type: "table",
          caption: "Components",
          columns: ["Component", "Role", "Notes"],
          rows: [
            ["Raspberry Pi Pico", "Reads the sensor, runs the logic, drives PWM", "MicroPython firmware"],
            ["Light-dependent resistor", "Light sensor", "Top half of the voltage divider"],
            ["Fixed resistor", "Bottom half of the divider", "Value sets the sensitivity range"],
            ["RGB LED", "Color output", "Common-cathode or common-anode — record which"],
            ["3 × resistors", "Current limiting, one per channel", "Record the values you used"],
          ],
        },
      ],
    },
    {
      number: "03",
      title: "Requirements",
      question: "What must the design accomplish?",
      status: "complete",
      blocks: [
        {
          type: "requirements",
          items: [
            { id: "R1", priority: "must", text: "Read ambient light continuously.", verification: "Serial output across light levels" },
            { id: "R2", priority: "must", text: "Map light level to LED color.", verification: "Visual check across the range" },
            { id: "R3", priority: "must", text: "Protect the LED and GPIO pins with current limiting.", verification: "Circuit review" },
            { id: "R4", priority: "should", text: "Transition smoothly without visible flicker.", verification: "Visual check; filter tuning" },
          ],
        },
      ],
    },
    {
      number: "04",
      title: "Concept Development",
      question: "What mappings were considered?",
      status: "complete",
      blocks: [
        {
          type: "table",
          columns: ["Mapping", "Behavior", "Trade-off"],
          rows: [
            ["Brightness only", "One color gets brighter or dimmer", "Simple, but uses one channel"],
            ["Hue sweep", "Light level moves smoothly through the color wheel", "Needs a color conversion step"],
            ["Threshold zones", "Distinct colors for dark, medium and bright", "Easy to read; abrupt changes"],
          ],
        },
        {
          type: "placeholder",
          label: "Chosen mapping",
          hint: "Note which mapping your build uses and why.",
        },
      ],
    },
    {
      number: "05",
      title: "Engineering Design",
      question: "Circuit, logic and code.",
      status: "in-progress",
      blocks: [
        { type: "heading", text: "Circuit" },
        { type: "widget", widget: "circuit-diagram" },
        { type: "heading", text: "Signal path" },
        { type: "widget", widget: "signal-flow" },
        { type: "heading", text: "Program logic" },
        {
          type: "text",
          body: "The loop reads the sensor, smooths the reading with a simple low-pass filter so the color doesn’t jitter, maps the result to a hue, converts the hue to red, green and blue values, and writes those as PWM duty cycles.",
        },
        {
          type: "code",
          language: "python",
          filename: "main.py",
          note: "Reference sketch of the logic above. Replace it with the code from your build.",
          code: `from machine import ADC, Pin, PWM
import time

ldr = ADC(26)                                   # GP26 / ADC0
leds = [PWM(Pin(p)) for p in (13, 14, 15)]      # R, G, B
for led in leds:
    led.freq(1000)

def hue_to_rgb(h):
    # h in [0, 1) -> (r, g, b), each 0..1, full saturation
    i = int(h * 6) % 6
    f = h * 6 - int(h * 6)
    return [(1, f, 0), (1 - f, 1, 0), (0, 1, f),
            (0, 1 - f, 1), (f, 0, 1), (1, 0, 1 - f)][i]

level = ldr.read_u16()
while True:
    level = 0.9 * level + 0.1 * ldr.read_u16()  # low-pass filter
    hue = (level / 65535) * 0.8                 # dark -> red, bright -> violet
    for led, c in zip(leds, hue_to_rgb(hue)):
        led.duty_u16(int(c * 65535))            # invert for common-anode LEDs
    time.sleep_ms(20)`,
        },
      ],
    },
    {
      number: "06",
      title: "Prototyping",
      question: "How the circuit was built.",
      status: "in-progress",
      blocks: [
        {
          type: "gallery",
          items: [
            { kind: "image", caption: "Breadboard circuit — top view" },
            { kind: "image", caption: "Wiring diagram" },
            { kind: "video", caption: "Demo: color responding to light" },
          ],
        },
      ],
    },
    {
      number: "07",
      title: "Testing and Iteration",
      question: "Measured results and improvements.",
      status: "planned",
      blocks: [
        {
          type: "results",
          items: [
            { measure: "ADC reading, covered sensor", method: "Average of serial readings" },
            { measure: "ADC reading, room light", method: "Average of serial readings" },
            { measure: "ADC reading, direct light", method: "Average of serial readings" },
            { measure: "Visible flicker at chosen filter setting", method: "Observation at several light levels" },
          ],
        },
      ],
    },
    {
      number: "08",
      title: "Reflection",
      question: "What I learned and what I would improve.",
      status: "planned",
      blocks: [
        {
          type: "list",
          title: "Possible next steps",
          items: [
            "Calibrate to the room by recording the darkest and brightest readings at startup",
            "Log readings to a file to plot light over time",
            "Move from breadboard to a soldered board and a printed enclosure",
          ],
        },
        { type: "placeholder", label: "Reflection", hint: "Write what you learned building and debugging this circuit." },
      ],
    },
  ],
};

const robotics: Project = {
  slug: "robotics-club",
  code: "AT-003",
  title: "Robotics Club Engineering Projects",
  tagline: "Design, build and programming work as Project Lead.",
  summary:
    "A running record of the robotics work I lead in the club — robot design, mechanical systems, electronics, CAD, programming and competition development. Projects are added here as they happen.",
  status: { label: "First project to be documented", tone: "template" },
  featured: true,
  order: 3,
  disciplines: ["Robotics", "Mechanical Systems", "Electronics", "CAD", "Programming", "Team Leadership"],
  tech: ["To be added per project"],
  art: "robotics",
  model: null,
  stages: [
    { name: "Research", status: "not-started" },
    { name: "Concept Development", status: "not-started" },
    { name: "CAD", status: "not-started" },
    { name: "Prototyping", status: "not-started" },
    { name: "Testing", status: "not-started" },
    { name: "Iteration", status: "not-started" },
  ],
  sections: [
    {
      number: "01",
      title: "Problem",
      question: "What is the robot for, and what defines success?",
      status: "not-started",
      blocks: [
        { type: "callout", tone: "info", title: "My role", body: "Project Lead, Robotics Club." },
        { type: "placeholder", label: "Challenge or goal", hint: "Describe the task, competition game or problem the robot addresses." },
      ],
    },
    {
      number: "02",
      title: "Research",
      question: "What rules, constraints and prior designs matter?",
      status: "not-started",
      blocks: [{ type: "placeholder", label: "Research", hint: "Competition rules, size and weight limits, budget, and designs you studied." }],
    },
    {
      number: "03",
      title: "Requirements",
      question: "What must the robot do?",
      status: "not-started",
      blocks: [{ type: "placeholder", label: "Requirements", hint: "Add a requirements block (R1, R2…) with how each will be verified." }],
    },
    {
      number: "04",
      title: "Concept Development",
      question: "What designs did the team consider?",
      status: "not-started",
      blocks: [{ type: "placeholder", label: "Concepts", hint: "Compare drivetrain and mechanism options in a table; note why the team chose one." }],
    },
    {
      number: "05",
      title: "Engineering Design",
      question: "Mechanical, electrical and software design.",
      status: "not-started",
      blocks: [
        { type: "heading", text: "Robot design & mechanical systems" },
        { type: "placeholder", label: "Mechanical", hint: "Chassis, drivetrain, mechanisms, materials." },
        { type: "heading", text: "Electronics" },
        { type: "placeholder", label: "Electronics", hint: "Controller, motors, sensors, power and wiring." },
        { type: "heading", text: "CAD" },
        { type: "placeholder", label: "CAD", hint: "Screenshots, drawings, or a GLB model (set `model` on this project)." },
        { type: "heading", text: "Programming" },
        { type: "placeholder", label: "Software", hint: "Control logic, autonomy and a link to the code." },
      ],
    },
    {
      number: "06",
      title: "Prototyping",
      question: "How the robot was built.",
      status: "not-started",
      blocks: [{ type: "gallery", items: [{ kind: "image", caption: "Build photo" }, { kind: "image", caption: "Mechanism close-up" }, { kind: "video", caption: "Robot demo" }] }],
    },
    {
      number: "07",
      title: "Testing and Iteration",
      question: "Measured performance and changes made.",
      status: "not-started",
      blocks: [
        { type: "placeholder", label: "Testing", hint: "Add a results block with what you measured and how." },
        { type: "placeholder", label: "Competition development", hint: "Events entered and outcomes — only once they’ve happened." },
      ],
    },
    {
      number: "08",
      title: "Reflection",
      question: "What I learned as Project Lead.",
      status: "not-started",
      blocks: [{ type: "placeholder", label: "Reflection", hint: "Technical and leadership lessons from the project." }],
    },
  ],
};

export const projects: Project[] = [nasalDevice, picoRgb, robotics].sort((a, b) => a.order - b.order);

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
