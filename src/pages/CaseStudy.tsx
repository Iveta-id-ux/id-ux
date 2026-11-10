import { Navigate, useParams } from "react-router-dom";
import { getCaseStudy } from "@/content/case-studies";
import { CaseStudyLayout } from "@/components/work/CaseStudyLayout";
import { useDocumentMeta } from "@/lib/useDocumentMeta";
import { AmadeusCaseStudy } from "@/components/work/amadeus/AmadeusCaseStudy";
import NotFound from "./NotFound";

/**
 * Case studies with a fully bespoke page. Their MDX frontmatter still drives
 * the /work card, title and meta; the MDX body is not rendered.
 */
const bespokePages: Record<string, () => JSX.Element> = {
  amadeus: AmadeusCaseStudy,
};

/**
 * Old slugs that moved. Vercel also 301s these (vercel.json); this covers
 * in-app links and the dev server.
 */
const slugAliases: Record<string, string> = {
  "amadeus-all-fares": "amadeus",
};

const CaseStudy = () => {
  const { slug } = useParams<{ slug: string }>();
  const study = slug ? getCaseStudy(slug) : undefined;

  useDocumentMeta(
    study
      ? `${study.frontmatter.title} — Iveta Dimitrova`
      : "Not found — Iveta Dimitrova",
    study?.frontmatter.punchline.replace(/\s+/g, " ").slice(0, 160),
  );

  const alias = slug ? slugAliases[slug] : undefined;
  if (alias) {
    return <Navigate to={`/work/${alias}`} replace />;
  }

  if (!study) {
    return <NotFound />;
  }

  const Bespoke = bespokePages[study.frontmatter.slug];
  if (Bespoke) {
    return <Bespoke />;
  }

  const { Component, frontmatter } = study;

  return (
    <CaseStudyLayout frontmatter={frontmatter}>
      <Component />
    </CaseStudyLayout>
  );
};

export default CaseStudy;
