import { cn } from "@/lib/utils";
import type { CaseStudyStatus } from "@/content/types";

const STATUS_LABEL: Record<CaseStudyStatus, string> = {
  shipped: "shipped",
  in_production: "in_production",
  archived: "archived",
  case_study_pending: "pending",
};

const STATUS_CLASS: Record<CaseStudyStatus, string> = {
  shipped: "border-terminal-green/40 text-terminal-green",
  in_production: "border-terminal-yellow/40 text-terminal-yellow",
  archived: "border-border text-muted-foreground",
  case_study_pending: "border-border text-muted-foreground",
};

export function StatusPill({ status }: { status: CaseStudyStatus }) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider border",
        STATUS_CLASS[status],
      )}
    >
      {STATUS_LABEL[status]}
    </span>
  );
}
