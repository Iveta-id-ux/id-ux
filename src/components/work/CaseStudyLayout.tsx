import type { ReactNode } from "react";
import type { CaseStudyFrontmatter } from "@/content/types";
import { CaseStudyTopBar } from "./CaseStudyTopBar";
import { CaseStudyLeftRail } from "./CaseStudyLeftRail";

interface Props {
  frontmatter: CaseStudyFrontmatter;
  children: ReactNode;
}

export function CaseStudyLayout({ frontmatter, children }: Props) {
  return (
    <main className="min-h-screen bg-background">
      <CaseStudyTopBar frontmatter={frontmatter} />

      <div className="container mx-auto px-4 sm:px-6 py-10 lg:py-16">
        <header className="mb-10 lg:mb-14">
          <p className="code-comment mb-3">
            case_study_{String(frontmatter.case_study_number).padStart(2, "0")}
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-mono text-display leading-tight mb-4">
            {frontmatter.title}
          </h1>
          <p className="text-body text-base md:text-lg max-w-2xl whitespace-pre-line leading-relaxed">
            {frontmatter.punchline}
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-8 lg:gap-12">
          <CaseStudyLeftRail />
          <article
            data-case-study-body
            className="case-study-prose max-w-[720px]"
          >
            {children}
          </article>
        </div>
      </div>
    </main>
  );
}
