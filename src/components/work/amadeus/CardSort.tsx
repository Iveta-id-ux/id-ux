import { useMemo, useState } from "react";
import { ArrowDown } from "lucide-react";
import { BLUE, NAVY, display } from "./tokens";

const columns = [
  { key: "critical", label: "Most critical", hint: "up to 3" },
  { key: "important", label: "Important", hint: "up to 4" },
  { key: "sometimes", label: "Sometimes helpful", hint: "" },
  { key: "less", label: "Less relevant", hint: "" },
] as const;
type Key = (typeof columns)[number]["key"];

// Card names are replaced with fictional space-exploration terms. Values are share of participants (%).
const rows: { card: string; critical: number; important: number; sometimes: number; less: number }[] = [
  { card: "Fuel cost", critical: 50, important: 29, sometimes: 18, less: 4 },
  { card: "Mission rules", critical: 32, important: 46, sometimes: 18, less: 4 },
  { card: "Cargo allowance", critical: 14, important: 43, sometimes: 32, less: 11 },
  { card: "Docking stops", critical: 25, important: 39, sometimes: 36, less: 0 },
  { card: "Pods remaining", critical: 11, important: 39, sometimes: 39, less: 11 },
  { card: "Trajectory details", critical: 25, important: 36, sometimes: 29, less: 11 },
  { card: "Space carriers", critical: 29, important: 32, sometimes: 32, less: 7 },
  { card: "Crew module", critical: 14, important: 11, sometimes: 54, less: 21 },
  { card: "Life-support services", critical: 0, important: 4, sometimes: 54, less: 43 },
  { card: "Mission class", critical: 14, important: 25, sometimes: 43, less: 18 },
  { card: "Crew details", critical: 11, important: 14, sometimes: 43, less: 32 },
  { card: "Fuel breakdown", critical: 32, important: 21, sometimes: 36, less: 11 },
  { card: "Launch hold time", critical: 29, important: 32, sometimes: 36, less: 4 },
  { card: "Spacecraft photos", critical: 0, important: 0, sometimes: 7, less: 93 },
  { card: "Mission tier prices", critical: 4, important: 14, sometimes: 36, less: 46 },
  { card: "Mission tier", critical: 11, important: 14, sometimes: 36, less: 39 },
];

const cell = (v: number) => (v ? `rgba(11,99,229,${0.12 + (v / 100) * 0.7})` : "transparent");

const steps = [
  { n: "34", t: "participants", d: "Travel sellers sorted the cards on their own, remotely." },
  { n: "16", t: "cards", d: "Each card is one piece of information inside an expanded offer." },
  { n: "4", t: "categories", d: "Most critical (max 3), Important (max 4), Sometimes helpful, Less relevant." },
];

export function CardSort() {
  const [sortBy, setSortBy] = useState<Key>("critical");
  const [hover, setHover] = useState<string | null>(null);
  const sorted = useMemo(() => [...rows].sort((a, b) => b[sortBy] - a[sortBy]), [sortBy]);
  const top = [...rows].sort((a, b) => b.critical - a.critical).slice(0, 3);

  return (
    <div className="space-y-10 pt-6">
      <div className="space-y-3 max-w-3xl">
        <div className="text-xs uppercase tracking-[0.3em]" style={{ color: BLUE }}>Card sort</div>
        <h3 className="text-3xl md:text-4xl tracking-tight" style={{ ...display, fontWeight: 300 }}>Closed card sort and workshops</h3>
        <p className="text-lg text-slate-600 leading-relaxed">
          To decide what belongs on top when an offer is expanded, we ran a closed card sort. Agents placed each piece of information into one of four
          priority categories, and the results fed the workshops that shaped the new hierarchy and labels.
        </p>
        <p className="text-sm text-slate-500">In collaboration with UX Research and UX Writers. Card names are fictional space exploration terms.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {steps.map((s) => (
          <div key={s.t} className="rounded-xl bg-white p-5 border border-slate-200">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl" style={{ ...display, fontWeight: 300, color: BLUE }}>{s.n}</span>
              <span className="text-slate-800">{s.t}</span>
            </div>
            <p className="text-sm text-slate-500 mt-1">{s.d}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-8 items-start">
        <div className="rounded-2xl bg-white border border-slate-200 p-4 md:p-6 overflow-x-auto">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm text-slate-800">Popular placement matrix</div>
            <div className="text-xs text-slate-400">Click a column to sort</div>
          </div>
          <table className="w-full text-sm min-w-[520px]">
            <thead>
              <tr className="text-left text-xs text-slate-500">
                <th className="font-normal pb-2 pr-3">Card</th>
                {columns.map((c) => (
                  <th key={c.key} className="font-normal pb-2 text-center" aria-sort={sortBy === c.key ? "descending" : undefined}>
                    <button
                      onClick={() => setSortBy(c.key)}
                      className="inline-flex items-center gap-1"
                      style={{ color: sortBy === c.key ? BLUE : undefined }}
                    >
                      {c.label}
                      {sortBy === c.key && <ArrowDown size={11} />}
                    </button>
                    {c.hint && <div className="text-[10px] text-slate-400">{c.hint}</div>}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sorted.map((r) => (
                <tr
                  key={r.card}
                  onMouseEnter={() => setHover(r.card)}
                  onMouseLeave={() => setHover(null)}
                  style={{ background: hover === r.card ? "#F3F6FB" : undefined }}
                >
                  <td className="py-1 pr-3 text-slate-700">{r.card}</td>
                  {columns.map((c) => (
                    <td key={c.key} className="p-0.5">
                      <div
                        className="rounded-[3px] h-7 grid place-items-center text-xs"
                        style={{ background: cell(r[c.key]), color: r[c.key] > 45 ? "#fff" : "#334155" }}
                      >
                        {r[c.key] ? `${r[c.key]}%` : ""}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <aside className="rounded-2xl p-6 text-white space-y-5" style={{ background: NAVY }}>
          <div className="text-xs uppercase tracking-[0.3em] text-cyan-300">What it told us</div>
          <div className="space-y-3">
            <div className="text-sm text-white/60">Most often called critical</div>
            {top.map((t) => (
              <div key={t.card} className="flex items-center justify-between border-b border-white/10 pb-2">
                <span>{t.card}</span>
                <span className="text-cyan-300">{t.critical}%</span>
              </div>
            ))}
          </div>
          <ul className="text-sm text-white/65 space-y-2 list-disc pl-4">
            <li>Cost and rules are visible from the start; secondary detail waits behind an action.</li>
            <li>Imagery was rated least relevant by a large majority, so it moved out of the way.</li>
            <li>Labels agreed with UX Writers in the workshops, so each term means one thing.</li>
          </ul>
        </aside>
      </div>
    </div>
  );
}
