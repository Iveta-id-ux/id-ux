import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

/**
 * Route-change scrolling, mounted once in App.
 * - With a hash (`/#contact`): smooth-scroll to that element.
 * - Without one, on a link click (PUSH/REPLACE): jump to the top, so pages like
 *   /photo open at their heading instead of the previous page's scroll depth.
 * - Back/forward (POP) is left alone so the browser can restore position.
 */
export function HashScroller() {
  const { hash, pathname } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    if (!hash) {
      if (navigationType !== "POP") {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      }
      return;
    }
    const id = hash.slice(1);
    const target = document.getElementById(id);
    if (!target) return;
    const timer = window.setTimeout(() => {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
    return () => window.clearTimeout(timer);
  }, [hash, pathname, navigationType]);

  return null;
}
