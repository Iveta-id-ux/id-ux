import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function HashScroller() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const id = hash.slice(1);
    const target = document.getElementById(id);
    if (!target) return;
    const timer = window.setTimeout(() => {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
    return () => window.clearTimeout(timer);
  }, [hash, pathname]);

  return null;
}
