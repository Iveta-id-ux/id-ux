/**
 * Amadeus case study (ported from the Figma Make design).
 * This page intentionally uses its own palette, modeled on amadeus.com,
 * rather than the site's terminal tokens.
 */
export const NAVY = "#000B33";
export const BLUE = "#0B63E5";
export const ICE = "#7FE5FF";
export const display = { fontFamily: "var(--font-display)" } as const;

/** Palette for the fictional booking-tool mockups. */
export const C = {
  navy: "#000B3B",
  navy2: "#0A1F6B",
  blue: "#0B65E5",
  blueDark: "#0849A8",
  sky: "#E8F1FD",
  bg: "#F3F5F9",
  line: "#DDE2EC",
  text: "#0F1B3D",
  muted: "#5B6785",
  ice: "#7FE5FF",
  good: "#0E9F6E",
};

export const spaceports = [
  "Cape Canaveral (CCS)",
  "Kourou (KRU)",
  "Orbital Hub Alpha (OHA)",
  "Lunar Gateway (LGW)",
  "Mars Base One (MB1)",
];

export type Flight = {
  id: string;
  op: string;
  veh: string;
  dep: string;
  arr: string;
  dur: string;
  mins: number;
  price: number;
  stops: number;
  tag?: string;
};

export const flights: Flight[] = [
  { id: "AU-201", op: "Aurora Lines", veh: "Aurora-7 shuttle", dep: "07:15", arr: "13:40", dur: "6h 25m", mins: 385, price: 48200, stops: 0, tag: "Fastest" },
  { id: "HX-415", op: "Helix Orbital", veh: "Helix heavy lifter", dep: "11:20", arr: "19:05", dur: "7h 45m", mins: 465, price: 41900, stops: 1, tag: "Best value" },
  { id: "NV-052", op: "Nova Transit", veh: "Nova-3 capsule", dep: "05:40", arr: "12:55", dur: "7h 15m", mins: 435, price: 44800, stops: 0 },
  { id: "KC-310", op: "Kepler Cruise", veh: "Kepler cruiser", dep: "15:30", arr: "00:10 +1", dur: "8h 40m", mins: 520, price: 36500, stops: 1, tag: "Lowest price" },
];

export const eur = (n: number) => `€ ${n.toLocaleString("en-US")}`;
