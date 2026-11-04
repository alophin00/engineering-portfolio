// Content for the Raspberry Pi Pico project page (AT-002).
// Images live in /public/projects/pico-light-sensor-rgb/.

export type PicoImage = { src: string; alt: string; width: number; height: number };
export type PicoStep = { title: string; text: string; images: PicoImage[] };
export type PicoChallenge = {
  id: string;
  number: number;
  title: string;
  goal: string;
  howItWorks: string;
  hero: PicoImage;
  steps: PicoStep[];
};

const dir = "/projects/pico-light-sensor-rgb";
const photo = (file: string, alt: string): PicoImage => ({ src: `${dir}/${file}.jpg`, alt, width: 1400, height: 1050 });
const screen = (file: string, alt: string, height = 875): PicoImage => ({ src: `${dir}/${file}.jpg`, alt, width: 1400, height });

const unwired = photo("unwired-breadboard", "Unwired breadboard with the Pico");

export const picoMeta = {
  course: "GE1501 – Cornerstone of Engineering 1, Fall 2026",
  overview:
    "This project introduces the Raspberry Pi Pico microcontroller through four hands-on electronics tasks. Using MicroPython in Thonny, I built and programmed circuits involving LEDs, a light-dependent resistor (LDR), and an RGB LED. Each task involved modifying code, testing circuit behavior, and documenting the results.",
  hero: photo("hero-pico-breadboard", "Raspberry Pi Pico on a breadboard with LEDs and jumper wires"),
  setup: photo("project-setup", "The Raspberry Pi Pico project setup"),
};

export const picoChallenges: PicoChallenge[] = [
  {
    id: "challenge-1",
    number: 1,
    title: "Police siren",
    goal: "Program two LEDs to blink alternately like a police siren.",
    howItWorks:
      "Two LEDs are connected to the Raspberry Pi Pico using GP15 and GP14. The MicroPython program alternates their output values between 1 (ON) and 0 (OFF). A 0.5-second delay creates a repeating pattern where one LED turns on while the other turns off, simulating a police siren.",
    hero: photo("siren-two-leds", "Two LEDs wired to the Pico on a breadboard"),
    steps: [
      { title: "Initial setup", text: "I began with an unwired breadboard and Raspberry Pi Pico.", images: [unwired] },
      { title: "Circuit assembly", text: "I connected two LEDs to GP15 and GP14 using resistors and ground connections.", images: [photo("siren-wiring", "Wiring two LEDs with resistors")] },
      { title: "Programming", text: "I modified the original blinking program to control two LEDs independently.", images: [screen("siren-code", "Thonny editor with the two-LED program", 874)] },
      {
        title: "Testing",
        text: "I tested the circuit to verify that the LEDs blinked alternately every 0.5 seconds.",
        images: [photo("siren-led-1-lit", "First LED lit during testing"), photo("siren-two-leds", "Second LED lit during testing")],
      },
    ],
  },
  {
    id: "challenge-2",
    number: 2,
    title: "Darkness warning light",
    goal: "Use an LDR to make an LED blink in darkness and remain off in bright light.",
    howItWorks:
      "An LDR measures changes in surrounding light, and the Pico reads its voltage through GP27. The program compares the sensor reading to a threshold of 35,000. When the reading falls below the threshold, the LED blinks at 0.5-second intervals. When the reading is above the threshold, the LED remains off.",
    hero: photo("warning-ldr-covered", "LDR covered by a hand, LED blinking"),
    steps: [
      { title: "Initial setup", text: "I began with an unwired breadboard and Raspberry Pi Pico.", images: [unwired] },
      { title: "Circuit assembly", text: "I connected the LDR to GP27 using a voltage-divider circuit.", images: [photo("ldr-voltage-divider", "LDR voltage-divider circuit")] },
      { title: "Programming", text: "I modified the program so the LED would blink when the sensor detected darkness.", images: [screen("warning-code", "Thonny editor with the LDR program")] },
      { title: "Testing", text: "I tested the LED with the LDR exposed to light and covered.", images: [photo("warning-ldr-covered", "LDR covered during testing")] },
    ],
  },
  {
    id: "challenge-3",
    number: 3,
    title: "Light-following brightness",
    goal: "Adjust LED brightness using PWM so the LED becomes brighter as the room gets brighter.",
    howItWorks:
      "The LDR detects surrounding light levels, while Pulse-Width Modulation (PWM) controls the LED’s brightness. The program converts the sensor reading into a duty cycle between 0% and 100%. As more light reaches the sensor, the duty cycle increases, making the LED brighter.",
    hero: photo("brightness-high", "LED glowing under PWM control"),
    steps: [
      { title: "Initial setup", text: "I reused the LDR and LED circuit from the previous task.", images: [photo("ldr-voltage-divider", "LDR and LED circuit reused")] },
      { title: "Programming", text: "I modified the code to increase LED brightness as light levels increased.", images: [screen("brightness-code", "Thonny editor with the PWM program", 882)] },
      {
        title: "Brightness calibration",
        text: "I measured the LDR readings in bright and dark conditions to calibrate the program.",
        images: [
          { src: `${dir}/ldr-reading-dark.jpg`, alt: "Shell readings in the dark (about 19,000)", width: 341, height: 395 },
          { src: `${dir}/ldr-reading-bright.jpg`, alt: "Shell readings in bright light (about 59,000)", width: 264, height: 245 },
        ],
      },
      {
        title: "Testing",
        text: "I tested the LED at high, medium, and low brightness levels.",
        images: [photo("brightness-high", "LED at high brightness"), photo("brightness-medium", "LED at medium brightness"), photo("brightness-low", "LED at low brightness")],
      },
    ],
  },
  {
    id: "challenge-4",
    number: 4,
    title: "Rainbow RGB LED",
    goal: "Program an RGB LED to display the seven rainbow colors in order.",
    howItWorks:
      "The RGB LED combines red, green, and blue light to produce different colors. The Pico controls these channels using GP13, GP12, and GP11. PWM adjusts each channel’s brightness according to predefined RGB values, allowing the LED to cycle through red, orange, yellow, green, blue, indigo, and violet.",
    hero: photo("rainbow-orange", "RGB LED lit on the breadboard"),
    steps: [
      { title: "Initial setup", text: "I began with an unwired breadboard and Raspberry Pi Pico.", images: [unwired] },
      { title: "Circuit assembly", text: "I connected the red, green, and blue channels to GP13, GP12, and GP11.", images: [photo("rainbow-wiring", "RGB LED wired to three GPIO pins")] },
      { title: "Programming", text: "I modified the original RGB program to display only the seven rainbow colors in order.", images: [screen("rainbow-code", "Thonny editor with the rainbow program")] },
      {
        title: "Testing and refinement",
        text: "I tested the RGB LED to verify that it displayed all seven rainbow colors in the correct order, with each color appearing for two seconds before transitioning to the next.",
        images: ["red", "orange", "yellow", "green", "blue", "indigo", "violet"].map((c) => photo(`rainbow-${c}`, `RGB LED showing ${c}`)),
      },
    ],
  },
];

export const picoGallery: { image: PicoImage; caption: string }[] = [
  { image: photo("siren-two-leds", "Two LEDs blinking alternately"), caption: "Two LEDs blinking alternately using GP15 and GP14." },
  { image: photo("warning-ldr-covered", "LDR covered, LED blinking"), caption: "The LDR is covered, causing the LED to blink repeatedly as a warning light." },
  { image: photo("brightness-medium", "LED at intermediate brightness"), caption: "The LDR is partially covered, causing the LED to illuminate at an intermediate brightness level using PWM." },
  { image: photo("rainbow-red", "RGB LED showing red"), caption: "The RGB LED displays red as part of its programmed sequence through the seven rainbow colors." },
];
