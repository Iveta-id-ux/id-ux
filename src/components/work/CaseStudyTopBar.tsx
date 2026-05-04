import type { CaseStudyFrontmatter } from "@/content/types";
import { TransitionLink } from "@/components/TransitionLink";
import { StatusPill } from "./StatusPill";

interface Props {
  frontmatter: CaseStudyFrontmatter;
}

export function CaseStudyTopBar({ frontmatter }: Props) {
  const lastUpdated = frontmatter.last_updated ?? new Date().toISOString().slice(0, 10);
  const caseNumber = String(frontmatter.case_study_number).padStart(2, "0");

  return (
    <div className="border-b border-border bg-card">
      <div className="container mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4 font-mono text-xs">
        <div className="flex items-center gap-2 min-w-0 text-muted-foreground">
          <TransitionLink to="/work" className="hover:text-code transition-colors">
            work
          </TransitionLink>
          <span className="opacity-50">/</span>
          <span className="text-body truncate">{frontmatter.slug}</span>
        </div>
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <span className="text-muted-foreground hidden sm:inline">
            // case_study_{caseNumber}
          </span>
          <StatusPill status={frontmatter.status} />
          <span className="text-muted-foreground hidden md:inline">
            last_updated: <span className="text-body">{lastUpdated}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
