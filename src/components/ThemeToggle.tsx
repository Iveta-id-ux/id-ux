import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Avoid hydration mismatch — render placeholder until client-side mount.
  if (!mounted) {
    return <span aria-hidden="true" className="inline-block w-3.5 h-3.5" />;
  }

  const isDark = theme !== "light";
  const next = isDark ? "light" : "dark";
  const Icon = isDark ? Sun : Moon;

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
      className="inline-flex items-center justify-center w-5 h-5 rounded-sm text-muted-foreground hover:text-body transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <Icon aria-hidden="true" className="w-3.5 h-3.5" />
    </button>
  );
}
