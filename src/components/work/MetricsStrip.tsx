import { useRef } from "react";
import { useInView } from "framer-motion";
import type { CaseStudyFrontmatter } from "@/content/types";
import { useCountUp } from "@/lib/useCountUp";

interface Props {
  metrics: CaseStudyFrontmatter["metrics"];
}

export function MetricsStrip({ metrics }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  if (!metrics || metrics.length === 0) return null;

  return (
    <div
      ref={ref}
      className="grid gap-4 px-4 py-3.5 rounded bg-background border border-border"
      style={{ gridTemplateColumns: `repeat(${metrics.length}, minmax(0, 1fr))` }}
    >
      {metrics.map((m, i) => (
        <Metric key={`${m.label}-${i}`} metric={m} animate={inView} />
      ))}
    </div>
  );
}

function Metric({
  metric,
  animate,
}: {
  metric: CaseStudyFrontmatter["metrics"][number];
  animate: boolean;
}) {
  const match = metric.value.match(/^([\d.]+)(.*)$/);
  const numeric = match ? parseFloat(match[1]) : null;
  const suffix = match?.[2] ?? "";

  const animated = useCountUp(numeric ?? 0, animate);
  const isFloat = match && match[1].includes(".");
  const display =
    numeric === null
      ? metric.value
      : isFloat
        ? animated.toFixed(1) + suffix
        : Math.round(animated) + suffix;

  return (
    <div className="font-mono">
      <div className="flex items-baseline gap-0.5">
        <span className="text-mono-medium text-[17px] text-terminal-green leading-none tabular-nums">
          {display}
        </span>
        {metric.unit && (
          <span className="text-xs text-muted-foreground leading-none">
            {metric.unit}
          </span>
        )}
      </div>
      <div className="text-[10px] text-muted-foreground mt-1.5">
        {metric.label}
      </div>
    </div>
  );
}
