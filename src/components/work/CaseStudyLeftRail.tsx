import { cn } from "@/lib/utils";
import { useActiveSection } from "@/lib/useActiveSection";

export function CaseStudyLeftRail() {
  const { sections, activeId } = useActiveSection();

  if (sections.length === 0) return null;

  return (
    <>
      {/* Desktop: sticky left rail */}
      <nav
        aria-label="Case study sections"
        className="hidden lg:block sticky top-20 self-start"
      >
        <p className="code-comment mb-3">sections</p>
        <ul className="space-y-1.5 font-mono text-xs">
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className={cn(
                  "block transition-colors",
                  activeId === s.id
                    ? "text-terminal-yellow"
                    : "text-muted-foreground hover:text-body",
                )}
              >
                ./{slugFor(s.text)}.md
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile: collapsible accordion */}
      <details className="lg:hidden border border-border rounded-lg bg-card mb-6 font-mono text-xs">
        <summary className="cursor-pointer list-none px-4 py-3 flex items-center justify-between text-muted-foreground">
          <span>sections ({sections.length})</span>
          <span aria-hidden="true">▾</span>
        </summary>
        <ul className="px-4 pb-3 space-y-1.5">
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="block text-muted-foreground hover:text-body transition-colors"
              >
                ./{slugFor(s.text)}.md
              </a>
            </li>
          ))}
        </ul>
      </details>
    </>
  );
}

function slugFor(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
}
