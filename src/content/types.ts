import { z } from "zod";

export const CaseStudyStatus = z.enum([
  "shipped",
  "in_production",
  "archived",
  "case_study_pending",
]);

export type CaseStudyStatus = z.infer<typeof CaseStudyStatus>;

export const CaseStudyFrontmatter = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string(),
  status: CaseStudyStatus,
  case_study_number: z.number().int().positive(),
  hero_image: z.string().optional(),
  scope: z.object({
    role: z.string(),
    team_size: z.number().int().positive().optional(),
    duration: z.string().optional(),
    // A single year (2024) or a range ("2024-2026").
    year: z.union([z.number().int(), z.string().regex(/^\d{4}(-\d{4})?$/)]),
    industry: z.string(),
  }),
  stack: z.array(z.string()),
  punchline: z.string(),
  metrics: z
    .array(
      z.object({
        value: z.string(),
        unit: z.string().optional(),
        label: z.string(),
      }),
    )
    .default([]),
  taxonomy: z.array(z.string()),
  order: z.number().int(),
  featured: z.boolean().default(false),
  last_updated: z.string().optional(),
});

export type CaseStudyFrontmatter = z.infer<typeof CaseStudyFrontmatter>;
