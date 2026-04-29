import { useEffect, useState } from "react";

/**
 * Animates a number from 0 → target with easeOutCubic when `enabled` flips
 * true. Respects `prefers-reduced-motion` (returns target immediately).
 */
export function useCountUp(
  target: number,
  enabled: boolean,
  duration = 800,
): number {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!enabled) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || target === 0) {
      setValue(target);
      return;
    }

    let raf = 0;
    let start: number | null = null;
    const tick = (t: number) => {
      if (start === null) start = t;
      const progress = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(target * eased);
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [enabled, target, duration]);

  return value;
}
