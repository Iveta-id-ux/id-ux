import { ScaledFrame } from "./ScaledFrame";
import { CrypticDisplay } from "./CrypticDisplay";
import { OtaApp } from "./OtaApp";

/** Hero split screen: command line on the left, OTA-style graphic workflow on the right. */
export function SplitMockup() {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 text-xs uppercase tracking-[0.25em] text-white/50">
        <span>Command line</span>
        <span className="text-right text-cyan-300">Graphic workflow</span>
      </div>
      <ScaledFrame width={1280} height={640} className="rounded-xl ring-1 ring-white/15 shadow-[0_30px_80px_-20px_rgba(11,99,229,0.5)]">
        <div className="w-[1280px] h-[640px] flex bg-white">
          <div className="w-1/2 h-full overflow-hidden">
            <CrypticDisplay />
          </div>
          <div className="w-2 bg-slate-300 shrink-0" />
          <div className="flex-1 h-full overflow-auto">
            <OtaApp />
          </div>
        </div>
      </ScaledFrame>
    </div>
  );
}
