import { useMatch } from "react-router-dom";
import { siteMeta } from "@content/site-meta";
import { useActiveSection } from "@/lib/useActiveSection";
import { ThemeToggle } from "@/components/ThemeToggle";

export function StatusBar() {
  const onCaseStudy = !!useMatch("/work/:slug");
  const { sections, activeId } = useActiveSection();

  const activeSection = sections.find((s) => s.id === activeId);
  const showSection = onCaseStudy && activeSection;

  return (
    <div
      role="status"
      aria-live="polite"
      className="sticky top-0 z-40 border-b border-border bg-card font-mono text-[11px]"
    >
      <div className="container mx-auto px-4 sm:px-6 h-7 flex items-center gap-3 sm:gap-5 text-muted-foreground overflow-hidden">
        <span className="truncate">
          {showSection ? (
            <>
              // section: <span className="text-body">{activeSection.text}</span>
            </>
          ) : (
            <>
              // status: <span className="text-terminal-green">{siteMeta.status}</span>
            </>
          )}
        </span>
        <span className="hidden sm:inline opacity-50">·</span>
        <span className="hidden sm:inline shrink-0">
          last_updated: <span className="text-body">{__BUILD_DATE__}</span>
        </span>
        <span className="hidden md:inline opacity-50">·</span>
        <span className="hidden md:inline shrink-0">
          location: <span className="text-body">{siteMeta.location}</span>
        </span>
        <span className="ml-auto shrink-0">
          <ThemeToggle />
        </span>
      </div>
    </div>
  );
}
