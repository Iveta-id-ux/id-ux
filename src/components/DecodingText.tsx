import { useEffect, useRef, useState } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*+=<>/_";
const SESSION_KEY = "decoded-once";

interface Props {
  children: string;
  duration?: number;
  /** sessionStorage key, allowing multiple instances to play independently */
  cacheKey?: string;
}

/**
 * One-shot decoding effect: characters cycle through random glyphs once on
 * mount, then settle to `children`. Skips replay within the same session,
 * and respects `prefers-reduced-motion`.
 */
export function DecodingText({
  children,
  duration = 700,
  cacheKey = SESSION_KEY,
}: Props) {
  const target = children;
  const [display, setDisplay] = useState(target);
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;

    if (typeof window === "undefined") return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return;

    if (sessionStorage.getItem(cacheKey)) return;
    sessionStorage.setItem(cacheKey, "1");

    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const progress = Math.min(1, (t - start) / duration);
      const revealed = Math.floor(target.length * progress);
      let next = "";
      for (let i = 0; i < target.length; i++) {
        const ch = target[i];
        if (i < revealed || ch === " ") {
          next += ch;
        } else {
          next += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
      }
      setDisplay(next);
      if (progress < 1) raf = requestAnimationFrame(tick);
      else setDisplay(target);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, cacheKey]);

  return <span aria-label={target}>{display}</span>;
}
