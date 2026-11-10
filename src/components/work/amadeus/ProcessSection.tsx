import { Search, Rocket } from "lucide-react";
import { ScaledFrame } from "./ScaledFrame";
import { OtaApp, type Screen } from "./OtaApp";
import { C } from "./tokens";

const steps: { n: string; t: string; d: string; s: Screen }[] = [
  { n: "01", t: "Search that explains itself", d: "Five plain-language fields replace memorised entry formats. Popular destinations give newer agents a starting point and experts a shortcut.", s: "search" },
  { n: "02", t: "Results you can compare at a glance", d: "Cards borrow the scanning pattern consumers already know from online travel agencies: times, duration, stops and price in a fixed rhythm, with sort and filters one click away.", s: "results" },
  { n: "03", t: "Review, then commit", d: "Traveler details and price sit side by side. Every step has a Back control, so agents can explore and undo without penalty.", s: "review" },
];

const swatches = [
  ["Navy", C.navy],
  ["Electric blue", C.blue],
  ["Deep blue", C.blueDark],
  ["Sky", C.sky],
  ["Cloud", C.bg],
  ["Ice", C.ice],
];

const displayFont = "var(--font-display)";

export function ProcessSection() {
  return (
    <section className="relative py-24 px-6 md:px-12 text-white overflow-hidden" style={{ background: "linear-gradient(180deg,#050A1C,#000B33)" }}>
      <div className="max-w-6xl mx-auto space-y-24">
        <div className="space-y-4 max-w-3xl">
          <div className="text-xs uppercase tracking-[0.3em] text-cyan-300">Redesign process</div>
          <h2 id="process" className="text-4xl md:text-5xl tracking-tight" style={{ fontFamily: displayFont, fontWeight: 300 }}>
            From typed commands to a familiar booking flow
          </h2>
          <p className="text-lg text-white/65 leading-relaxed">
            The visual workflow follows patterns people already know from online travel agencies, then adds the speed and control professional sellers
            need. The screens below are interactive illustrations in a fictional space booking tool.
          </p>
        </div>

        {steps.map((s, i) => (
          // Alternating rows flip the column ratio too, so the mockup always gets the wide column.
          <div key={s.n} className={`grid gap-10 items-center ${i % 2 ? "lg:grid-cols-[2fr_1fr]" : "lg:grid-cols-[1fr_2fr]"}`}>
            <div className={`space-y-3 ${i % 2 ? "lg:order-2" : ""}`}>
              <div className="text-cyan-300 text-sm">{s.n}</div>
              <h3 className="text-2xl" style={{ fontFamily: displayFont, fontWeight: 400 }}>{s.t}</h3>
              <p className="text-white/60 leading-relaxed">{s.d}</p>
            </div>
            <div className="rounded-xl overflow-hidden ring-1 ring-white/10 shadow-2xl">
              <ScaledFrame width={900} height={620}>
                <div className="w-[900px] h-[620px] overflow-hidden">
                  <OtaApp initial={s.s} wide />
                </div>
              </ScaledFrame>
            </div>
          </div>
        ))}

        {/* Design system */}
        <div className="space-y-10">
          <div className="space-y-4 max-w-3xl">
            <h3 className="text-3xl tracking-tight" style={{ fontFamily: displayFont, fontWeight: 300 }}>Built on the Amadeus design language</h3>
            <p className="text-white/65 leading-relaxed">
              Colors, pill buttons, rounded inputs and card patterns follow the Amadeus brand. Several components were updated during this work and fed
              back into the shared system.
            </p>
          </div>
          <div className="rounded-2xl p-8 space-y-8" style={{ background: C.bg, color: C.text }}>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {swatches.map(([n, c]) => (
                <div key={n} className="space-y-2">
                  <div className="h-14 rounded-lg border" style={{ background: c, borderColor: C.line }} />
                  <div className="text-xs">
                    {n}
                    <div className="text-slate-500">{c}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <button className="h-12 px-6 rounded-full text-white text-[14px] font-medium flex items-center gap-2" style={{ background: C.blue }}>
                <Search size={16} />
                Primary
              </button>
              <button className="h-12 px-6 rounded-full border text-[14px] font-medium" style={{ color: C.blue, borderColor: C.blue }}>Secondary</button>
              <button className="h-12 px-4 text-[14px] font-medium" style={{ color: C.blue }}>Tertiary</button>
              <input
                readOnly
                value="Lunar Gateway (LGW)"
                aria-label="Example input"
                className="h-12 w-60 rounded-lg border bg-white px-3 text-[14px] font-normal"
                style={{ borderColor: C.line }}
              />
              <span className="px-3 py-1 rounded-full text-[12px]" style={{ background: C.sky, color: C.blue }}>Best value</span>
              <span className="w-8 h-8 rounded-full flex items-center justify-center text-white" style={{ background: C.blue }}>
                <Rocket size={14} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
