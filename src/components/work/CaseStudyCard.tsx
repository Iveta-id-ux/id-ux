import { Fragment, useState } from "react";
import type { CaseStudyFrontmatter } from "@/content/types";
import { TransitionLink } from "@/components/TransitionLink";
import { StatusPill } from "./StatusPill";
import { MetricsStrip } from "./MetricsStrip";

interface Props {
  frontmatter: CaseStudyFrontmatter;
}

export function CaseStudyCard({ frontmatter }: Props) {
  const [imgFailed, setImgFailed] = useState(false);
  const showPlaceholder = !frontmatter.hero_image || imgFailed;
  const heroBasename = frontmatter.hero_image?.split("/").pop() ?? "placeholder.jpg";
  const caseNumber = String(frontmatter.case_study_number).padStart(2, "0");

  const scopeValues = [
    frontmatter.scope.role,
    frontmatter.scope.duration,
    String(frontmatter.scope.year),
  ];

  return (
    <TransitionLink
      to={`/work/${frontmatter.slug}`}
      className="group block rounded-md overflow-hidden border border-border bg-card transition-colors duration-300 hover:border-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      {/* Hero image area */}
      <div className="relative h-[168px] overflow-hidden bg-secondary">
        {showPlaceholder ? (
          <PlaceholderHero filename={heroBasename} />
        ) : (
          <img
            src={frontmatter.hero_image}
            alt=""
            onError={() => setImgFailed(true)}
            className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
          />
        )}
      </div>

      <div className="p-5 space-y-4">
        {/* Header row */}
        <div className="flex items-center justify-between">
          <span className="font-mono text-[11px] text-muted-foreground">
            // case_study_{caseNumber}
          </span>
          <StatusPill status={frontmatter.status} />
        </div>

        {/* Title */}
        <h3 className="text-lg font-medium tracking-[-0.01em] text-display">
          {frontmatter.title}
        </h3>

        {/* Metadata grid */}
        <div className="grid grid-cols-[52px_1fr] gap-x-3 gap-y-1.5 font-mono text-[11px]">
          <div className="text-muted-foreground">scope</div>
          <DotList values={scopeValues} />
          <div className="text-muted-foreground">stack</div>
          <DotList values={frontmatter.stack} />
        </div>

        {/* Punchline (sans) */}
        <p className="text-sm leading-[1.6] text-body whitespace-pre-line">
          {frontmatter.punchline}
        </p>

        {/* Metrics */}
        <MetricsStrip metrics={frontmatter.metrics} />

        {/* Footer row */}
        <div className="flex items-center justify-between pt-1">
          <span className="font-mono text-[11px] text-muted-foreground truncate min-w-0 mr-3">
            // {frontmatter.taxonomy.join(" · ")}
          </span>
          <span className="font-mono text-xs text-terminal-yellow shrink-0 group-hover:underline underline-offset-4">
            view_case_study() →
          </span>
        </div>
      </div>
    </TransitionLink>
  );
}

function DotList({ values }: { values: string[] }) {
  return (
    <div className="text-terminal-purple">
      {values.map((v, i) => (
        <Fragment key={`${v}-${i}`}>
          {i > 0 && <span className="text-muted-foreground/60 mx-1.5">·</span>}
          <span>{v}</span>
        </Fragment>
      ))}
    </div>
  );
}

function PlaceholderHero({ filename }: { filename: string }) {
  return (
    <div
      className="absolute inset-0 grid place-items-center font-mono text-[11px]"
      style={{ color: "hsl(var(--muted-foreground))" }}
    >
      <span aria-hidden="true" className="absolute top-2 left-2 opacity-50">
        ┌
      </span>
      <span aria-hidden="true" className="absolute top-2 right-2 opacity-50">
        ┐
      </span>
      <span aria-hidden="true" className="absolute bottom-2 left-2 opacity-50">
        └
      </span>
      <span aria-hidden="true" className="absolute bottom-2 right-2 opacity-50">
        ┘
      </span>
      <span className="opacity-70">// {filename}</span>
    </div>
  );
}
