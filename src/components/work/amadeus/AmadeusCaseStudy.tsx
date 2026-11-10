import { Keyboard, Undo2, Blocks, Lock } from "lucide-react";
import { CardSort } from "./CardSort";
import { SplitMockup } from "./SplitMockup";
import { WireframeComparison } from "./WireframeComparison";
import { ProcessSection } from "./ProcessSection";
import { NAVY, BLUE, ICE, display } from "./tokens";

/**
 * Bespoke Amadeus case study, ported from the Figma Make design
 * (figma.com/make/zAeuT3H62KaHuqcjuqkW6N). It uses its own Amadeus-style
 * palette on purpose and does not follow the site's dark/light theme.
 * Scoped base styles live under `.amadeus-cs` in src/index.css.
 */

const findings = [
  { region: "Europe", title: "Muscle memory is a moat", body: "Agents on busy agency floors typed entries faster than any screen could be navigated. Speed was non-negotiable, and the command line was a source of pride." },
  { region: "North America", title: "Training cost is hidden", body: "New hires needed months to become fluent. Agencies described cheat-sheets taped to monitors and senior colleagues acting as human help desks." },
  { region: "Asia-Pacific", title: "Errors are feared, not fixed", body: "Agents avoided exploring unfamiliar functions because a wrong entry could be hard to undo, which kept them in a narrow set of known commands." },
];

const metrics = [
  { v: "70%", l: "of travel agents migrated", d: "from command-line entries to graphic workflows." },
  { v: "60,000+", l: "travel sellers", d: "using the Shopping Display every day." },
  { v: "190+", l: "markets", d: "served across Europe, the Americas, Asia-Pacific and beyond." },
];

const principles = [
  { i: Keyboard, t: "Keyboard-first, mouse-tolerant", d: "Every graphic workflow is fully operable from the keyboard, with shortcuts that echo familiar entries. The mouse is welcome, never required." },
  { i: Undo2, t: "Reversibility over hand-holding", d: "Rather than wrapping actions in warnings and wizards, we made them easy to undo. Agents explore with confidence and stay fast." },
  { i: Blocks, t: "A stronger design system", d: "Design system components were updated as part of this work, elevating the overall system for every product that uses it." },
];

function Eyebrow({ children, dark }: { children: string; dark?: boolean }) {
  return (
    <div className={`text-xs uppercase tracking-[0.3em] ${dark ? "text-cyan-300" : ""}`} style={dark ? undefined : { color: BLUE }}>
      {children}
    </div>
  );
}

export function AmadeusCaseStudy() {
  return (
    <main className="amadeus-cs min-h-screen bg-white text-[#0B1F4B]">
      <article data-case-study-body>
        {/* Hero */}
        <section
          className="relative text-white overflow-hidden"
          style={{
            background: `radial-gradient(1200px 600px at 80% -10%, #0B3FA8 0%, transparent 60%), radial-gradient(800px 500px at 0% 40%, #07236B 0%, transparent 60%), ${NAVY}`,
          }}
        >
          {/* orbit lines */}
          <svg className="absolute -right-40 -top-40 w-[900px] h-[900px] opacity-40 pointer-events-none" viewBox="0 0 900 900" fill="none" aria-hidden>
            <circle cx="450" cy="450" r="440" stroke={ICE} strokeOpacity=".25" />
            <circle cx="450" cy="450" r="320" stroke={ICE} strokeOpacity=".2" strokeDasharray="2 8" />
            <circle cx="450" cy="450" r="200" stroke={ICE} strokeOpacity=".3" />
            <circle cx="153" cy="212" r="5" fill={ICE} />
          </svg>

          <div className="relative px-6 md:px-12 pt-24 md:pt-32 pb-14">
            <div className="max-w-[1400px] mx-auto space-y-8">
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <span className="px-3 py-1 rounded-full border border-cyan-300/50 text-cyan-200">Case study</span>
                <span className="text-white/60">Amadeus IT Group · B2B Shopping Display</span>
              </div>
              <h1 className="max-w-5xl text-4xl md:text-6xl lg:text-7xl tracking-tight leading-[1.04]" style={{ ...display, fontWeight: 300 }}>
                Led the migration of <span style={{ color: ICE, fontFamily: "inherit" }}>70% of travel agents</span> from cryptic command-line interfaces to
                graphic workflows
              </h1>
              <div role="note" className="max-w-3xl rounded-xl border border-amber-300/50 bg-amber-300/10 px-5 py-4 text-amber-50 leading-relaxed flex gap-3">
                <Lock size={20} className="mt-0.5 shrink-0 text-amber-300" />
                <div className="space-y-1">
                  <div className="text-xs uppercase tracking-[0.25em] text-amber-300">NDA notice</div>
                  <span className="block">
                    Due to an NDA, project details are not disclosed. Every screen on this page is an illustrative recreation set in a fictional space flight
                    booking tool. All research material and design system elements shown are made up as well.
                  </span>
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-8 pt-8 border-t border-white/15">
                {metrics.map((m) => (
                  <div key={m.v} className="space-y-1">
                    <div className="text-5xl md:text-6xl tracking-tight" style={{ ...display, fontWeight: 300, color: ICE }}>{m.v}</div>
                    <div>{m.l}</div>
                    <div className="text-sm text-white/50">{m.d}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative px-4 md:px-12 pb-16">
            <div className="max-w-[1400px] mx-auto">
              <SplitMockup />
            </div>
          </div>
        </section>

        {/* Overview */}
        <section className="py-24 px-6 md:px-12">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <Eyebrow>Overview</Eyebrow>
              <h2 id="overview" className="text-4xl tracking-tight" style={{ ...display, fontWeight: 300 }}>Quick for veterans, steep for everyone else</h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                Travel sellers relied on a powerful but cryptic command-line interface. The goal was to move the majority of agents to graphic workflows
                without slowing down the people who already worked at keyboard speed.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6 content-start">
              {[
                ["Role", "Senior Product Designer"],
                ["Company", "Amadeus IT Group"],
                ["Product", "B2B Shopping Display"],
                ["Scope", "Research, strategy, design system"],
              ].map(([k, v]) => (
                <div key={k} className="border-t border-slate-200 pt-3">
                  <div className="text-sm text-slate-500">{k}</div>
                  <div>{v}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Research */}
        <section className="py-24 px-6 md:px-12 bg-[#F3F6FB]">
          <div className="max-w-6xl mx-auto space-y-10">
            <div className="space-y-4">
              <Eyebrow>Research</Eyebrow>
              <h2 id="research" className="text-4xl tracking-tight" style={{ ...display, fontWeight: 300 }}>Research & Insights</h2>
              <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
                We ran contextual inquiry on agency floors across Europe, North America and Asia-Pacific, watching agents work real bookings with real
                customers on the phone.
              </p>
            </div>
            <div className="rounded-2xl overflow-hidden">
              <img
                src="/images/case-studies/amadeus/research-photo.jpg"
                alt="Researcher and travel agent reviewing a design system on a laptop together"
                loading="lazy"
                className="w-full h-[420px] object-cover object-[50%_40%]"
              />
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {findings.map((f) => (
                <div key={f.region} className="space-y-3 border-t-2 pt-4" style={{ borderColor: BLUE }}>
                  <div className="text-sm" style={{ color: BLUE }}>{f.region}</div>
                  <h3 className="text-xl">{f.title}</h3>
                  <p className="text-slate-600">{f.body}</p>
                </div>
              ))}
            </div>
            <CardSort />
          </div>
        </section>

        <WireframeComparison />

        {/* Strategy */}
        <section className="py-24 px-6 md:px-12 text-white" style={{ background: NAVY }}>
          <div className="max-w-6xl mx-auto space-y-10">
            <div className="space-y-4">
              <Eyebrow dark>Strategy</Eyebrow>
              <h2 id="strategy" className="text-4xl md:text-5xl tracking-tight" style={{ ...display, fontWeight: 300 }}>UX and Product Strategy</h2>
              <p className="text-lg text-white/65 max-w-3xl leading-relaxed">
                Two principles guided every decision, so that migrating never felt like a penalty for experts or a leap for newcomers.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {principles.map(({ i: Icon, t, d }) => (
                <div key={t} className="rounded-2xl bg-white/5 border border-white/10 p-6 space-y-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: BLUE }}>
                    <Icon size={18} />
                  </div>
                  <h3 className="text-xl">{t}</h3>
                  <p className="text-white/65">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ProcessSection />

        {/* Impact */}
        <section className="py-24 px-6 md:px-12">
          <div className="max-w-6xl mx-auto space-y-10">
            <div className="space-y-4">
              <Eyebrow>Impact</Eyebrow>
              <h2 id="impact" className="text-4xl tracking-tight" style={{ ...display, fontWeight: 300 }}>Impact</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {metrics.map((m) => (
                <div key={m.v} className="rounded-2xl bg-[#F3F6FB] p-8 space-y-2">
                  <div className="text-5xl" style={{ ...display, fontWeight: 300, color: BLUE }}>{m.v}</div>
                  <div>{m.l}</div>
                  <p className="text-sm text-slate-500">{m.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}
