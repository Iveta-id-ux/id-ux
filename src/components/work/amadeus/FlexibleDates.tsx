import { useState } from "react";
import { ArrowRight, Settings, Plane, Check, CircleDollarSign, Image as ImageIcon, Keyboard, ChevronLeft, ChevronRight } from "lucide-react";
import { BLUE, NAVY, display } from "./tokens";

const PURPLE = "#7C3AED";
const line = "#CBD2E0";

const TIERS = {
  low: { bg: "#B5F0A8", label: "200 EUR" },
  mid: { bg: "#FBEE8E", label: "300 EUR" },
  high: { bg: "#F7A266", label: "600 EUR" },
} as const;
type Tier = keyof typeof TIERS;
const tierOf = (d: number, m: number): Tier => {
  const n = (d * 7 + m * 3) % 10;
  return n < 5 ? "low" : n < 8 ? "mid" : "high";
};
const priceOf = (d: number, m: number) => [128, 180, 450, 128, 180, 300][(d + m) % 6];

const DAYS = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"];
// January 2025 starts Wednesday, February 2025 starts Saturday
const MONTHS = [
  { name: "January 2025", offset: 2, days: 31 },
  { name: "February 2025", offset: 5, days: 28 },
];

function Badge({ n }: { n: number }) {
  return (
    <span className="inline-flex items-center gap-1 rounded px-1 text-[10px] leading-4" style={{ background: "#EFE7FE", color: PURPLE }}>
      <Keyboard size={9} />
      {n} Tab
    </span>
  );
}

function Legend() {
  return (
    <div className="flex gap-1.5 flex-wrap">
      {(Object.keys(TIERS) as Tier[]).map((t) => (
        <span key={t} className="text-[10px] px-2 rounded-full text-slate-700" style={{ background: TIERS[t].bg }}>
          {TIERS[t].label}
        </span>
      ))}
    </div>
  );
}

/* Wireframe A: colour-coded date picker with tolerance */
function ColourPicker() {
  const [tol, setTol] = useState(0);
  const [sel, setSel] = useState<{ m: number; d: number } | null>({ m: 0, d: 15 });
  const inRange = (m: number, d: number) => sel && sel.m === m && Math.abs(sel.d - d) <= tol;
  return (
    <div className="rounded-lg border bg-[#FAFBFD] p-4 space-y-3" style={{ borderColor: line }}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Legend />
        <div className="flex items-center gap-2 text-[11px] text-slate-600">
          Departure
          <div className="flex rounded overflow-hidden border" style={{ borderColor: "#9BCAEB" }}>
            {["exact", "+/- 1", "+/- 2"].map((l, i) => (
              <button key={l} onClick={() => setTol(i)} className="px-2 py-0.5" style={{ background: tol === i ? "#9BCAEB" : "#fff" }}>
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        {MONTHS.map((mo, mi) => (
          <div key={mo.name}>
            <div className="flex items-center justify-between text-xs mb-2">
              {mi === 0 ? <ChevronLeft size={14} style={{ color: BLUE }} /> : <span />}
              <span className="text-slate-800">{mo.name}</span>
              {mi === 1 ? <ChevronRight size={14} style={{ color: BLUE }} /> : <span />}
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-[9px] text-slate-500">
              {DAYS.map((d) => (
                <div key={d}>{d}</div>
              ))}
              {Array.from({ length: mo.offset }).map((_, i) => (
                <div key={"o" + i} />
              ))}
              {Array.from({ length: mo.days }).map((_, i) => {
                const d = i + 1;
                const active = inRange(mi, d);
                return (
                  <button
                    key={d}
                    onClick={() => setSel({ m: mi, d })}
                    className="aspect-square rounded-[3px] text-[10px] text-slate-700 transition-transform hover:scale-110"
                    style={{ background: TIERS[tierOf(d, mi)].bg, outline: active ? `2px solid ${NAVY}` : "none", outlineOffset: -1 }}
                  >
                    {d}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between text-[10px] text-slate-500">
        <span>Estimated prices for round-trip flights</span>
        <span>
          {sel ? `Departure ${sel.d} ${sel.m ? "Feb" : "Jan"}${tol ? `, flexible by ${tol} day${tol > 1 ? "s" : ""}` : ""}` : "Pick a date"}
        </span>
      </div>
    </div>
  );
}

/* Wireframe B: card table with fare preview */
function CardTable() {
  const [sel, setSel] = useState({ m: 0, d: 9 });
  const fare = priceOf(sel.d, sel.m);
  return (
    <div className="rounded-lg border bg-[#FAFBFD] p-4 space-y-3" style={{ borderColor: line }}>
      <div className="flex flex-wrap items-center justify-end gap-2">
        <Badge n={1} />
        <span className="text-[10px] rounded-full px-2 py-0.5" style={{ background: "#9BCAEB", color: "#fff" }}>Depart +/-1</span>
        <Badge n={2} />
        <span className="text-[10px] rounded-full px-2 py-0.5" style={{ background: "#9BCAEB", color: "#fff" }}>Return +/-1</span>
        <Badge n={3} />
        <span className="w-7 h-7 rounded-full grid place-items-center" style={{ background: "#CFE6F7" }}>
          <Settings size={13} className="text-slate-600" />
        </span>
      </div>
      <div className="grid lg:grid-cols-[1fr_190px] gap-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between rounded px-2 py-1 text-xs" style={{ background: "#E4EEFB" }}>
            <ChevronLeft size={14} style={{ color: BLUE }} />
            <span>January 2025</span>
            <span>February 2025</span>
            <ChevronRight size={14} style={{ color: BLUE }} />
          </div>
          <div className="flex items-center gap-1">
            <Badge n={4} />
            <span className="text-[10px] text-slate-400">Arrow keys move between cards, Enter selects</span>
          </div>
          <div className="grid grid-cols-7 gap-1.5">
            {Array.from({ length: 21 }).map((_, i) => {
              const d = i + 2;
              const active = sel.d === d;
              const p = priceOf(d, 0);
              return (
                <button
                  key={d}
                  onClick={() => setSel({ m: 0, d })}
                  className="rounded-md border bg-white py-1 text-center transition-colors"
                  style={{ borderColor: active ? BLUE : line, boxShadow: active ? `0 0 0 2px ${BLUE}33` : "none" }}
                >
                  <div className="text-[10px] text-slate-600">{d}</div>
                  <div className="mx-auto my-0.5 w-fit rounded-full px-1.5 text-[8px] bg-slate-200 text-slate-600">{p === 128 || p === 300 ? "Public" : "NDC"}</div>
                  <div className="text-[9px]" style={{ color: p === 128 ? "#1BA94C" : "#334155" }}>{p}EUR</div>
                </button>
              );
            })}
          </div>
          <div className="flex items-center gap-1">
            <Badge n={5} />
          </div>
          <div className="space-y-1.5">
            <div className="h-2 rounded-sm bg-[#A6C5F7]" />
            <div className="h-2 rounded-sm bg-[#A6C5F7]" />
          </div>
        </div>
        <aside className="space-y-2 text-slate-500">
          <div className="h-16 rounded bg-slate-200 grid place-items-center">
            <ImageIcon size={26} />
          </div>
          <div className="rounded bg-slate-200 p-3 space-y-2 min-h-[170px]">
            <Plane size={22} />
            <div className="h-1 bg-slate-400 w-10" />
            <div className="h-1 bg-slate-400" />
            <div className="h-1 bg-slate-400" />
            <div className="flex items-center gap-1 text-xs">
              <Check size={16} />
              <span className="text-[10px]">Fare conditions</span>
            </div>
            <div className="flex items-center gap-1 text-xs">
              <CircleDollarSign size={16} />
              <span className="text-[10px]">{fare} EUR on {sel.d} Jan</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

const zones = [
  { n: "1", t: "Tolerance controls", d: "Depart and Return +/- chips set how far from the chosen date the agent wants to look. They are the first Tab stops, so the search can be widened without a mouse." },
  { n: "2", t: "Settings", d: "Adapt the view by content type, airline or fare family. Rarely used, so it lives in one icon instead of permanent columns." },
  { n: "3", t: "Price calendar", d: "Two months side by side. Each day is an interactive card: date, content source (NDC or public fare) and price. Colour bands give the overview, cards give the detail." },
  { n: "4", t: "Fare preview", d: "A quick summary of the selected fare and its conditions, so agents compare without leaving the grid or running a new search." },
  { n: "5", t: "Advanced space", d: "Reserved below the grid for departure windows and airline or fare filters, ready for later additions." },
];

export function FlexibleDates() {
  return (
    <div className="space-y-12 pt-6">
      <div className="space-y-4 max-w-3xl">
        <div className="text-xs uppercase tracking-[0.3em]" style={{ color: BLUE }}>Redesign example</div>
        <h3 className="text-3xl md:text-4xl tracking-tight" style={{ ...display, fontWeight: 300 }}>
          Flexible dates rethought and restructured for a better exploration capability
        </h3>
        <p className="text-lg text-slate-600 leading-relaxed">
          The previous flexible dates view was a table of numbers. We turned it into an expandable section below the main search: a colour-coded
          calendar for the overview, and interactive fare cards for the detail. Wireframes below are schematic recreations.
        </p>
      </div>

      <div className="grid xl:grid-cols-2 gap-8">
        <figure className="space-y-3">
          <figcaption className="flex justify-between text-sm">
            <span style={{ color: BLUE }}>Concept A: Date picker</span>
            <span className="text-slate-400">Colour-coded price ranges, tolerance select</span>
          </figcaption>
          <ColourPicker />
          <p className="text-sm text-slate-500">
            Colour coding is for orientation only and not interactive. Palette to be tuned against accessibility guidelines. Try the tolerance control
            and click a date.
          </p>
        </figure>
        <figure className="space-y-3">
          <figcaption className="flex justify-between text-sm">
            <span style={{ color: BLUE }}>Concept B: Fare cards and preview</span>
            <span className="text-slate-400">Table, scroll-play, card, mini card</span>
          </figcaption>
          <CardTable />
          <p className="text-sm text-slate-500">Cards carry more information than a date picker can. Keyboard order is numbered; select a card to update the fare preview.</p>
        </figure>
      </div>

      <div className="rounded-2xl overflow-hidden text-white" style={{ background: NAVY }}>
        <div className="p-8 md:p-10 space-y-8">
          <div className="space-y-1">
            <div className="text-xs uppercase tracking-[0.3em] text-cyan-300">Information architecture</div>
            <h4 className="text-2xl" style={{ ...display, fontWeight: 300 }}>How the Flexible dates section is organised</h4>
            <p className="text-white/60 max-w-2xl">An expandable section that sits directly below the main search and only opens when an agent wants to explore.</p>
          </div>
          <div className="grid lg:grid-cols-[320px_1fr] gap-8">
            <div className="rounded-lg bg-white/5 border border-white/10 p-4 space-y-2 text-[10px] text-white/70" aria-hidden>
              <div className="rounded border border-white/20 p-2 flex gap-2 items-center">
                <div className="flex-1 h-4 rounded-sm bg-white/10" />
                <div className="flex-1 h-4 rounded-sm bg-white/10" />
                <div className="flex-1 h-4 rounded-sm bg-white/10" />
                <div className="px-2 rounded-sm" style={{ background: BLUE }}>Search</div>
              </div>
              <div className="flex items-center gap-1 text-cyan-300">
                Flexible dates - explore <ArrowRight size={10} className="rotate-90" />
              </div>
              <div className="rounded border border-cyan-300/40 p-2 space-y-2">
                <div className="flex justify-between">
                  <span className="rounded px-1 bg-white/10">1 Tolerance</span>
                  <span className="rounded px-1 bg-white/10">2 Settings</span>
                </div>
                <div className="grid grid-cols-[1fr_70px] gap-2">
                  <div className="h-20 rounded bg-white/10 grid place-items-center">3 Price calendar</div>
                  <div className="h-20 rounded bg-white/10 grid place-items-center text-center">4 Fare preview</div>
                </div>
                <div className="h-4 rounded bg-white/10 grid place-items-center">5 Advanced space</div>
              </div>
            </div>
            <ol className="divide-y divide-white/10">
              {zones.map((z) => (
                <li key={z.n} className="grid grid-cols-[28px_1fr] gap-3 py-3">
                  <span className="w-6 h-6 rounded-full grid place-items-center text-xs text-[#000B33] bg-cyan-300">{z.n}</span>
                  <div>
                    <div>{z.t}</div>
                    <div className="text-sm text-white/55">{z.d}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
