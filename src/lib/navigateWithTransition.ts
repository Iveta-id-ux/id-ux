import { flushSync } from "react-dom";
import type { NavigateFunction, NavigateOptions, To } from "react-router-dom";

interface DocumentWithTransition extends Document {
  startViewTransition?: (cb: () => void | Promise<void>) => {
    finished: Promise<void>;
  };
}

/**
 * Run a `react-router` navigation inside `document.startViewTransition` when
 * the browser supports it. Falls back to plain navigate otherwise.
 *
 * `flushSync` forces React to commit the navigation synchronously inside the
 * transition callback so the View Transitions API captures the *new* DOM
 * rather than the old one.
 */
export function navigateWithTransition(
  navigate: NavigateFunction,
  to: To,
  options?: NavigateOptions,
) {
  const doc = document as DocumentWithTransition;
  if (typeof doc.startViewTransition !== "function") {
    navigate(to, options);
    return;
  }
  doc.startViewTransition(() => {
    flushSync(() => navigate(to, options));
  });
}
