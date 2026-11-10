import { useMemo, useState, type ReactNode } from "react";
import { Rocket, Search, ArrowLeftRight, Calendar, Users, ChevronRight, Check, Luggage, Clock, ShieldCheck, ArrowLeft } from "lucide-react";
import { C, flights, spaceports, eur, type Flight } from "./tokens";

export type Screen = "search" | "results" | "review";

const input = "w-full h-12 rounded-lg border bg-white px-3 text-[14px] font-normal outline-none focus:ring-2 focus:ring-[#0B65E5]/40";
const label = "block text-[11px] uppercase tracking-wider mb-1";
const displayFont = "var(--font-display)";

function Btn({
  children,
  onClick,
  variant = "primary",
  className = "",
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "outline";
  className?: string;
}) {
  const base = "h-12 px-6 rounded-full text-[14px] font-medium flex items-center justify-center gap-2 transition-colors";
  return variant === "primary" ? (
    <button onClick={onClick} className={`${base} text-white hover:brightness-110 ${className}`} style={{ background: C.blue }}>
      {children}
    </button>
  ) : (
    <button onClick={onClick} className={`${base} border hover:bg-[#E8F1FD] ${className}`} style={{ color: C.blue, borderColor: C.blue }}>
      {children}
    </button>
  );
}

/**
 * Fictional booking tool. It always renders inside a fixed-size ScaledFrame,
 * so `wide` stands in for the container queries in the original design
 * (true for the 900px process frames, false for the ~630px hero half).
 */
export function OtaApp({ initial = "search", wide = false }: { initial?: Screen; wide?: boolean }) {
  const [screen, setScreen] = useState<Screen>(initial);
  const [from, setFrom] = useState(spaceports[0]);
  const [to, setTo] = useState(spaceports[3]);
  const [date, setDate] = useState("2041-03-14");
  const [pax, setPax] = useState("1 traveler");
  const [trip, setTrip] = useState("One-way");
  const [sort, setSort] = useState<"best" | "cheap" | "fast">("best");
  const [direct, setDirect] = useState(false);
  const [picked, setPicked] = useState<Flight>(flights[0]);
  const [booked, setBooked] = useState(false);

  const list = useMemo(() => {
    const l = flights.filter((f) => !direct || f.stops === 0);
    return [...l].sort((a, b) =>
      sort === "cheap" ? a.price - b.price : sort === "fast" ? a.mins - b.mins : a.price / 1000 + a.mins / 10 - (b.price / 1000 + b.mins / 10),
    );
  }, [sort, direct]);

  const swap = () => {
    setFrom(to);
    setTo(from);
  };
  const short = (s: string) => s.match(/\((.*)\)/)?.[1] ?? s;
  const listId = wide ? "ota-ports-wide" : "ota-ports";

  return (
    <div className="min-h-full text-[14px]" style={{ background: C.bg, color: C.text }}>
      {/* Nav */}
      <div className="h-14 bg-white flex items-center px-6 gap-8 border-b" style={{ borderColor: C.line }}>
        <button
          onClick={() => setScreen("search")}
          className="text-[20px] tracking-tight flex items-center gap-2"
          style={{ fontFamily: displayFont, fontWeight: 600, color: C.navy }}
        >
          <span className="w-5 h-5 rounded-full border-2 relative" style={{ borderColor: C.blue }}>
            <span className="absolute -right-1 top-0.5 w-1.5 h-1.5 rounded-full" style={{ background: C.blue }} />
          </span>
          meridian
        </button>
        <nav className={`flex whitespace-nowrap text-[14px] font-normal ${wide ? "gap-6" : "gap-4"}`} style={{ color: C.muted }}>
          <span className="font-medium" style={{ color: C.blue }}>Flights</span>
          <span>Orbital stays</span>
          <span>Transfers</span>
          <span>Offers</span>
        </nav>
        <div className="flex-1" />
        <button className="h-9 px-4 rounded-full border text-[13px] whitespace-nowrap shrink-0" style={{ color: C.blue, borderColor: C.blue }}>
          Sign in
        </button>
      </div>

      {/* Search band */}
      <div className="px-6 pt-6 pb-16" style={{ background: `linear-gradient(135deg, ${C.navy}, ${C.navy2})` }}>
        {screen === "search" && (
          <h2
            className={`text-white tracking-tight mb-4 ${wide ? "text-[36px]" : "text-[28px]"}`}
            style={{ fontFamily: displayFont, fontWeight: 300 }}
          >
            Where will you launch next?
          </h2>
        )}
        <div className="flex gap-2 mb-3">
          {["One-way", "Round trip", "Multi-stop"].map((t) => (
            <button
              key={t}
              onClick={() => setTrip(t)}
              className="h-8 px-4 rounded-full text-[13px] font-normal"
              style={trip === t ? { background: "#fff", color: C.navy } : { color: "#fff", border: "1px solid rgba(255,255,255,.35)" }}
            >
              {t}
            </button>
          ))}
        </div>
        <div className={`bg-white rounded-2xl p-4 shadow-xl grid gap-3 items-end ${wide ? "grid-cols-[1fr_auto_1fr_0.8fr_0.8fr_auto]" : "grid-cols-2"}`}>
          <div>
            <label className={label} style={{ color: C.muted }}>From</label>
            <input list={listId} value={from} onChange={(e) => setFrom(e.target.value)} className={input} style={{ borderColor: C.line }} />
          </div>
          {wide && (
            <button
              onClick={swap}
              aria-label="Swap"
              className="flex w-10 h-10 mb-1 rounded-full border items-center justify-center hover:bg-[#E8F1FD]"
              style={{ borderColor: C.line, color: C.blue }}
            >
              <ArrowLeftRight size={16} />
            </button>
          )}
          <div>
            <label className={label} style={{ color: C.muted }}>To</label>
            <input list={listId} value={to} onChange={(e) => setTo(e.target.value)} className={input} style={{ borderColor: C.line }} />
          </div>
          <div>
            <label className={label} style={{ color: C.muted }}>Depart</label>
            <div className="relative">
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={input} style={{ borderColor: C.line }} />
              <Calendar size={15} className="absolute right-3 top-4 pointer-events-none" style={{ color: C.blue }} />
            </div>
          </div>
          <div>
            <label className={label} style={{ color: C.muted }}>Travelers</label>
            <div className="relative">
              <select value={pax} onChange={(e) => setPax(e.target.value)} className={input + " appearance-none"} style={{ borderColor: C.line }}>
                <option>1 traveler</option>
                <option>2 travelers</option>
                <option>4 travelers</option>
              </select>
              <Users size={15} className="absolute right-3 top-4 pointer-events-none" style={{ color: C.blue }} />
            </div>
          </div>
          <Btn onClick={() => setScreen("results")} className={wide ? "col-span-1" : "col-span-2"}>
            <Search size={16} />
            Search
          </Btn>
          <datalist id={listId}>
            {spaceports.map((p) => (
              <option key={p} value={p} />
            ))}
          </datalist>
        </div>
      </div>

      {screen === "search" && (
        <div className={`px-6 -mt-8 pb-8 grid gap-4 ${wide ? "grid-cols-3" : ""}`}>
          {[
            ["Lunar Gateway", "from € 36,500", "LGW"],
            ["Orbital Hub Alpha", "from € 12,900", "OHA"],
            ["Mars Base One", "from € 212,000", "MB1"],
          ].map(([n, p, c]) => (
            <button
              key={c}
              onClick={() => {
                setTo(`${n} (${c})`);
                setScreen("results");
              }}
              className="text-left bg-white rounded-xl p-4 border hover:shadow-md transition-shadow"
              style={{ borderColor: C.line }}
            >
              <div className="w-9 h-9 rounded-full flex items-center justify-center text-white mb-3" style={{ background: C.blue }}>
                <Rocket size={16} />
              </div>
              <div className="font-medium">{n}</div>
              <div className="text-[13px] font-normal" style={{ color: C.muted }}>{p}</div>
            </button>
          ))}
        </div>
      )}

      {screen === "results" && (
        <div className={`px-6 -mt-8 pb-8 grid gap-4 items-start ${wide ? "grid-cols-[210px_1fr]" : ""}`}>
          {wide && (
            <aside className="bg-white rounded-xl border p-4 space-y-4" style={{ borderColor: C.line }}>
              <div className="font-medium">Filters</div>
              <label className="flex items-center gap-2 text-[13px] font-normal cursor-pointer">
                <input type="checkbox" checked={direct} onChange={(e) => setDirect(e.target.checked)} className="w-4 h-4 accent-[#0B65E5]" />
                Direct only
              </label>
              <label className="flex items-center gap-2 text-[13px] font-normal">
                <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#0B65E5]" />
                Baggage included
              </label>
              <div className="text-[13px] font-normal" style={{ color: C.muted }}>Operators</div>
              {["Aurora Lines", "Helix Orbital", "Nova Transit", "Kepler Cruise"].map((o) => (
                <label key={o} className="flex items-center gap-2 text-[13px] font-normal">
                  <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#0B65E5]" />
                  {o}
                </label>
              ))}
            </aside>
          )}
          <div className="space-y-3">
            <div className="bg-white rounded-xl border grid grid-cols-3 overflow-hidden" style={{ borderColor: C.line }}>
              {(
                [
                  ["best", "Best"],
                  ["cheap", "Cheapest"],
                  ["fast", "Fastest"],
                ] as const
              ).map(([k, l]) => (
                <button
                  key={k}
                  onClick={() => setSort(k)}
                  className="py-3 text-[13px] border-b-2"
                  style={sort === k ? { borderColor: C.blue, color: C.blue, background: C.sky } : { borderColor: "transparent", color: C.muted }}
                >
                  {l}
                </button>
              ))}
            </div>
            <div className="text-[13px] font-normal px-1" style={{ color: C.muted }}>
              {short(from)} to {short(to)} · {date} · {pax} · {list.length} results
            </div>
            {list.map((f) => (
              <div
                key={f.id}
                className="bg-white rounded-xl border p-4 grid grid-cols-[1fr_auto] gap-4 items-center hover:shadow-md transition-shadow"
                style={{ borderColor: C.line }}
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[13px] font-normal" style={{ color: C.muted }}>
                    <span className="w-6 h-6 rounded-full flex items-center justify-center text-white" style={{ background: C.blue }}>
                      <Rocket size={12} />
                    </span>
                    {f.op} · {f.veh}
                    {f.tag && (
                      <span className="px-2 py-0.5 rounded-full text-[11px]" style={{ background: C.sky, color: C.blue }}>
                        {f.tag}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-[20px] font-medium">{f.dep}</div>
                    <div className="flex-1 flex items-center gap-2 text-[12px] font-normal min-w-[60px]" style={{ color: C.muted }}>
                      <span className="flex-1 h-px" style={{ background: C.line }} />
                      <span className="flex items-center gap-1">
                        <Clock size={11} />
                        {f.dur}
                      </span>
                      <span className="flex-1 h-px" style={{ background: C.line }} />
                    </div>
                    <div className="text-[20px] font-medium">{f.arr}</div>
                  </div>
                  <div className="text-[12px] font-normal" style={{ color: f.stops === 0 ? C.good : C.muted }}>
                    {f.stops === 0 ? "Direct" : "1 dock at Orbital Hub Alpha"}
                  </div>
                </div>
                <div className="text-right space-y-2">
                  <div className="text-[20px] font-medium">{eur(f.price)}</div>
                  <Btn
                    onClick={() => {
                      setPicked(f);
                      setScreen("review");
                    }}
                    className="!h-10 !px-5"
                  >
                    Select
                  </Btn>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {screen === "review" && (
        <div className={`px-6 -mt-8 pb-8 grid gap-4 items-start ${wide ? "grid-cols-[1fr_280px]" : ""}`}>
          <div className="bg-white rounded-xl border p-5 space-y-4" style={{ borderColor: C.line }}>
            <button onClick={() => setScreen("results")} className="text-[13px] flex items-center gap-1" style={{ color: C.blue }}>
              <ArrowLeft size={14} />
              Back to results
            </button>
            <h3 className="text-[22px]" style={{ fontFamily: displayFont, fontWeight: 500 }}>Traveler details</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={label} style={{ color: C.muted }}>First name</label>
                <input defaultValue="Jane" className={input} style={{ borderColor: C.line }} />
              </div>
              <div>
                <label className={label} style={{ color: C.muted }}>Last name</label>
                <input defaultValue="Smith" className={input} style={{ borderColor: C.line }} />
              </div>
              <div className="col-span-2">
                <label className={label} style={{ color: C.muted }}>Email</label>
                <input defaultValue="jane.smith@example.com" className={input} style={{ borderColor: C.line }} />
              </div>
            </div>
            <div className="flex flex-wrap gap-4 text-[13px] font-normal" style={{ color: C.muted }}>
              <span className="flex items-center gap-1.5">
                <Luggage size={14} />
                Baggage included
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={14} />
                Free change up to 24h before launch
              </span>
            </div>
          </div>
          <div className="bg-white rounded-xl border p-5 space-y-3" style={{ borderColor: C.line }}>
            <div className="font-medium">Your trip</div>
            <div className="text-[13px] font-normal" style={{ color: C.muted }}>
              {picked.op} · {picked.id}
              <br />
              {short(from)} {picked.dep} → {short(to)} {picked.arr}
            </div>
            <div className="h-px" style={{ background: C.line }} />
            <div className="flex justify-between">
              <span>Total</span>
              <span className="text-[18px] font-medium">{eur(picked.price)}</span>
            </div>
            {booked ? (
              <div className="h-12 rounded-full flex items-center justify-center gap-2 text-white" style={{ background: C.good }}>
                <Check size={16} />
                Booked
              </div>
            ) : (
              <Btn onClick={() => setBooked(true)} className="w-full">
                Confirm booking <ChevronRight size={16} />
              </Btn>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
