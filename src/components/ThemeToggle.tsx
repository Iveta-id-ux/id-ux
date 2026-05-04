import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Reserve the same footprint pre-mount to avoid layout shift / hydration mismatch.
  if (!mounted) {
    return <span aria-hidden="true" className="inline-block h-5 w-10" />;
  }

  const isDark = theme !== "light";
  const next = isDark ? "light" : "dark";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
      onClick={() => setTheme(next)}
      className="relative inline-flex h-5 w-10 shrink-0 items-center rounded-full border border-border bg-secondary transition-colors hover:border-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 focus-visible:ring-offset-card"
    >
      <Sun
        aria-hidden="true"
        className="pointer-events-none absolute left-1 h-2.5 w-2.5 text-terminal-yellow"
      />
      <Moon
        aria-hidden="true"
        className="pointer-events-none absolute right-1 h-2.5 w-2.5 text-muted-foreground"
      />
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none relative z-10 h-4 w-4 rounded-full bg-background border border-border shadow-sm transition-transform duration-200 ease-out",
          isDark ? "translate-x-[22px]" : "translate-x-[2px]",
        )}
      />
    </button>
  );
}
