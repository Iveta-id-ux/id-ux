import { useParams } from "react-router-dom";
import { getCaseStudy } from "@/content/case-studies";
import { CaseStudyLayout } from "@/components/work/CaseStudyLayout";
import { useDocumentMeta } from "@/lib/useDocumentMeta";
import NotFound from "./NotFound";

const CaseStudy = () => {
  const { slug } = useParams<{ slug: string }>();
  const study = slug ? getCaseStudy(slug) : undefined;

  useDocumentMeta(
    study
      ? `${study.frontmatter.title} — Iveta Dimitrova`
      : "Not found — Iveta Dimitrova",
    study?.frontmatter.punchline.replace(/\s+/g, " ").slice(0, 160),
  );

  if (!study) {
    return <NotFound />;
  }

  const { Component, frontmatter } = study;

  return (
    <CaseStudyLayout frontmatter={frontmatter}>
      <Component />
    </CaseStudyLayout>
  );
};

export default CaseStudy;
