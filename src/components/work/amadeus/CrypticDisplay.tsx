import { useEffect, useRef, useState } from "react";

type Line = { t: string; c?: string };

const boot: Line[] = [
  { t: "MERIDIAN TERMINAL  ·  OPERATOR PM/ORB1A0950", c: "text-slate-500" },
  { t: "> AN14MAR41CCSLGW/AOR", c: "text-white" },
  { t: "14MAR41 SAT  CCS-LGW  ORBITAL LANES", c: "text-slate-400" },
  { t: " 1  OR201  J9 C7 Y9 M4  CCS LGW 0715 1340   AU7  0", c: "text-sky-300" },
  { t: " 2  OR415  J4 C2 Y0 M0  CCS LGW 1120 1905   HX9  1", c: "text-sky-300" },
  { t: " 3  SX088  J9 C9 Y9 M9  CCS MB1 2200 0610+3 KC1  0", c: "text-sky-300" },
  { t: "> SS1Y2", c: "text-white" },
  { t: " 1  OR201 Y  14MAR  CCSLGW HK2  0715 1340", c: "text-emerald-300" },
  { t: "> NM1SMITH/JANE MS", c: "text-white" },
  { t: "> FXP", c: "text-white" },
  { t: "FARE BASIS YLNR  EUR 48200  CHK RULE 14 ** NO-SHOW **", c: "text-amber-300" },
];

const hint = "Type a command, e.g. AN14MAR41CCSLGW or HELP";
const mono = { fontFamily: "var(--font-mono)" } as const;

export function CrypticDisplay() {
  const [lines, setLines] = useState<Line[]>(boot);
  const [val, setVal] = useState("");
  const scroller = useRef<HTMLDivElement>(null);

  // Scroll the terminal itself, never the page.
  useEffect(() => {
    const el = scroller.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const run = (cmd: string) => {
    const c = cmd.trim().toUpperCase();
    const out: Line[] = [{ t: `> ${c}`, c: "text-white" }];
    if (!c) return;
    if (c.startsWith("AN"))
      out.push(
        { t: " 1  OR201  J9 C7 Y9 M4  CCS LGW 0715 1340   AU7  0", c: "text-sky-300" },
        { t: " 2  OR415  J4 C2 Y0 M0  CCS LGW 1120 1905   HX9  1", c: "text-sky-300" },
      );
    else if (c === "HELP") out.push({ t: "AN = AVAILABILITY   SS = SELL   NM = NAME   FXP = PRICE   ER = SAVE", c: "text-slate-400" });
    else out.push({ t: "INVALID FORMAT  ** CHECK ENTRY **", c: "text-red-400" });
    setLines((l) => [...l, ...out]);
    setVal("");
  };

  return (
    <div className="h-full flex flex-col bg-[#050A1C] font-normal" style={mono}>
      <div ref={scroller} className="flex-1 overflow-auto p-4 text-[12px] leading-[1.7]">
        {lines.map((l, i) => (
          <div key={i} className={`whitespace-pre ${l.c ?? "text-white"}`}>
            {l.t}
          </div>
        ))}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          run(val);
        }}
        className="border-t border-white/10 px-4 py-2 flex gap-2 text-[12px] text-white"
      >
        <span className="text-cyan-300" style={mono}>&gt;</span>
        <input
          value={val}
          onChange={(e) => setVal(e.target.value)}
          placeholder={hint}
          spellCheck={false}
          aria-label="Command line entry"
          className="flex-1 bg-transparent outline-none placeholder:text-slate-600 text-[12px]"
          style={mono}
        />
      </form>
    </div>
  );
}
