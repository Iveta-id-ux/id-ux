import type { ComponentType } from "react";
import {
  CaseStudyFrontmatter,
  type CaseStudyFrontmatter as TFrontmatter,
} from "./types";

interface MdxModule {
  default: ComponentType;
  frontmatter: unknown;
}

const modules = import.meta.glob<MdxModule>(
  "/content/case-studies/*.mdx",
  { eager: true },
);

export interface CaseStudy {
  frontmatter: TFrontmatter;
  Component: ComponentType;
}

export const caseStudies: CaseStudy[] = Object.entries(modules)
  .map(([path, mod]) => {
    const result = CaseStudyFrontmatter.safeParse(mod.frontmatter);
    if (!result.success) {
      throw new Error(
        `Invalid frontmatter in ${path}:\n${result.error.issues
          .map((i) => `  - ${i.path.join(".")}: ${i.message}`)
          .join("\n")}`,
      );
    }
    return { frontmatter: result.data, Component: mod.default };
  })
  .sort((a, b) => {
    if (a.frontmatter.featured !== b.frontmatter.featured) {
      return a.frontmatter.featured ? -1 : 1;
    }
    return a.frontmatter.order - b.frontmatter.order;
  });

export const caseStudiesBySlug = new Map(
  caseStudies.map((cs) => [cs.frontmatter.slug, cs]),
);

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudiesBySlug.get(slug);
}
