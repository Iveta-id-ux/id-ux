import type { ReactNode } from "react";
import { ArrowRight, Plus, MoveRight } from "lucide-react";
import { FlexibleDates } from "./FlexibleDates";
import { BLUE, NAVY, display } from "./tokens";

const line = "#B8C2D6";
const Box = ({ w = "auto", h = 14, fill = false, label }: { w?: string | number; h?: number; fill?: boolean; label?: string }) => (
  <div className="rounded-[2px] border flex items-center px-1 overflow-hidden" style={{ width: w, height: h, borderColor: line, background: fill ? BLUE : "transparent" }}>
    {label && <span className="text-[7px] leading-none text-slate-400 whitespace-nowrap">{label}</span>}
  </div>
);
const Lbl = ({ children }: { children: string }) => <div className="text-[7px] leading-none text-slate-500 mb-0.5">{children}</div>;

function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="border rounded-[3px] bg-white" style={{ borderColor: line }}>
      <div className="px-2 py-1 border-b text-[9px] text-slate-600 flex justify-between" style={{ borderColor: line, background: "#EEF1F7" }}>
        {title}
        <span>^</span>
      </div>
      <div className="p-2">{children}</div>
    </div>
  );
}

function Before() {
  const row = (
    <div className="grid grid-cols-[1fr_1fr_0.7fr_0.8fr_1fr] gap-1.5 items-end">
      {["From*", "To*", "Date*", "Time", ""].map((l, i) => (
        <div key={i}>
          <Lbl>{l || " "}</Lbl>
          <Box />
        </div>
      ))}
    </div>
  );
  return (
    <div className="space-y-1.5 bg-[#F4F6FA] p-2 rounded-md w-full">
      <div className="flex gap-3 text-[8px] text-slate-500">
        <span>(o) Standard search</span>
        <span>( ) Flexible dates</span>
      </div>
      <Panel title="Itinerary">
        <div className="space-y-1.5">
          {row}
          <div className="grid grid-cols-[1fr_2.4fr_0.8fr] gap-1.5 items-end">
            <div>
              <Lbl>Cabin</Lbl>
              <Box />
            </div>
            <div>
              <Lbl>Launch providers and alliances</Lbl>
              <Box />
            </div>
            <div>
              <Lbl>No connections</Lbl>
              <Box w={10} />
            </div>
          </div>
          <div className="border-t pt-1.5" style={{ borderColor: line }}>
            {row}
          </div>
        </div>
      </Panel>
      <Panel title="Passengers">
        <Lbl>Passenger Type Codes (PTCs)*</Lbl>
        <div className="flex gap-1">
          <Box w={44} label="1 ADT" />
          <Box w={44} label="0 CHD" />
          <Box w={44} label="0 INF" />
        </div>
        <div className="text-[7px] mt-1" style={{ color: BLUE }}>Add passengers</div>
      </Panel>
      <Panel title="Fares and fees">
        <div className="grid grid-cols-4 gap-2">
          <div className="space-y-1">
            <Lbl>Fare types*</Lbl>
            <Box w={40} h={8} />
            <Box w={40} h={8} />
            <Box w={40} h={8} />
          </div>
          <div className="space-y-1">
            <Lbl>Fare options</Lbl>
            <Box />
            <Box w={30} />
            <Box w={36} h={8} />
          </div>
          <div className="space-y-1">
            <Lbl>Content options</Lbl>
            <Box w={40} h={8} />
            <Box w={40} h={8} />
            <Box w={40} h={8} />
          </div>
          <div className="space-y-1">
            <Lbl>Discounts</Lbl>
            <Box w={44} h={8} />
          </div>
        </div>
      </Panel>
      <div className="h-4 rounded-[2px] text-[8px] text-white text-center leading-4" style={{ background: "#1B3A8C" }}>Search</div>
    </div>
  );
}

function After() {
  return (
    <div className="bg-[#F4F6FA] p-2 rounded-md w-full space-y-2">
      <div className="flex gap-1">
        {["Return", "One way", "Multi-planet"].map((t, i) => (
          <span
            key={t}
            className="text-[8px] px-2 py-0.5 rounded-full border"
            style={i === 0 ? { background: BLUE, color: "#fff", borderColor: BLUE } : { borderColor: line, color: "#64748B" }}
          >
            {t}
          </span>
        ))}
      </div>
      <div className="bg-white border rounded-md p-2 space-y-2" style={{ borderColor: line }}>
        <div className="grid grid-cols-[1fr_auto_1fr_1.2fr_0.7fr] gap-1.5 items-end">
          <div>
            <Lbl>From</Lbl>
            <Box h={18} />
          </div>
          <div className="pb-1">
            <MoveRight size={9} className="text-slate-400" />
          </div>
          <div>
            <Lbl>To</Lbl>
            <Box h={18} />
          </div>
          <div>
            <Lbl>Dates</Lbl>
            <Box h={18} />
          </div>
          <div>
            <Lbl>Travellers</Lbl>
            <Box h={18} label="1 adult" />
          </div>
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          {["Cabin", "Fare types", "Content", "Airlines", "More"].map((c) => (
            <span key={c} className="text-[8px] px-2 py-0.5 rounded-full border text-slate-500 flex items-center gap-0.5" style={{ borderColor: line }}>
              <Plus size={7} />
              {c}
            </span>
          ))}
        </div>
        <div className="flex justify-end">
          <div className="h-5 px-4 rounded-[3px] text-[8px] text-white leading-5" style={{ background: BLUE }}>Search</div>
        </div>
      </div>
    </div>
  );
}

const ia = [
  { from: "Itinerary panel, one row per leg, repeated fields", to: "One route line with trip-type tabs", note: "Multi-city legs only appear when asked for." },
  { from: "Passengers panel with ADT / CHD / INF codes", to: "Single Travellers field", note: "Codes stay available for experts, typed or picked." },
  { from: "Fares and fees: four columns, always open", to: "Filter chips beside Search", note: "Rare options are one click away, not always on screen." },
  { from: "Required and optional fields mixed together", to: "Required first, optional on demand", note: "The fields that make a search valid always come first." },
];

export function WireframeComparison() {
  return (
    <section className="py-24 px-6 md:px-12 bg-white">
      <div className="max-w-6xl mx-auto space-y-14">
        <div className="space-y-4 max-w-3xl">
          <div className="text-xs uppercase tracking-[0.3em]" style={{ color: BLUE }}>Redesign</div>
          <h2 id="redesign" className="text-4xl tracking-tight" style={{ ...display, fontWeight: 300 }}>Same search, a fraction of the screen</h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            The original search stacked every option in always-open panels. We kept every capability, reorganised the information architecture around
            what agents need first, and made the display significantly smaller and friendlier. Wireframes below are schematic recreations.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-6 items-center">
          <figure className="space-y-3">
            <figcaption className="flex items-center justify-between text-sm">
              <span className="text-slate-500">Before</span>
              <span className="text-slate-400">3 stacked panels, 30+ visible fields</span>
            </figcaption>
            <Before />
          </figure>
          <ArrowRight className="hidden lg:block" style={{ color: BLUE }} />
          <figure className="space-y-3">
            <figcaption className="flex items-center justify-between text-sm">
              <span style={{ color: BLUE }}>After</span>
              <span className="text-slate-400">1 compact card, 5 visible fields</span>
            </figcaption>
            <After />
            <div className="grid grid-cols-3 gap-3 pt-4">
              {[
                ["~65%", "less vertical space"],
                ["5", "fields to start a search"],
                ["0", "options removed"],
              ].map(([v, l]) => (
                <div key={l}>
                  <div className="text-3xl" style={{ ...display, fontWeight: 300, color: BLUE }}>{v}</div>
                  <div className="text-xs text-slate-500">{l}</div>
                </div>
              ))}
            </div>
          </figure>
        </div>

        <div className="rounded-2xl p-8 md:p-10 text-white space-y-6" style={{ background: NAVY }}>
          <div className="space-y-1">
            <div className="text-xs uppercase tracking-[0.3em] text-cyan-300">Information architecture</div>
            <h3 className="text-2xl" style={{ ...display, fontWeight: 300 }}>What moved, and why</h3>
          </div>
          <div className="divide-y divide-white/10">
            {ia.map((r) => (
              <div key={r.to} className="grid md:grid-cols-[1fr_auto_1fr_1fr] gap-3 md:gap-6 py-4 items-center">
                <div className="text-white/55 text-sm">{r.from}</div>
                <ArrowRight size={16} className="text-cyan-300 hidden md:block" />
                <div>{r.to}</div>
                <div className="text-sm text-white/55">{r.note}</div>
              </div>
            ))}
          </div>
        </div>

        <FlexibleDates />
      </div>
    </section>
  );
}
