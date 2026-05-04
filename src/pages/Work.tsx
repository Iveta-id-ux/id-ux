import { useMemo } from "react";
import { motion } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import { caseStudies } from "@/content/case-studies";
import { CaseStudyCard } from "@/components/work/CaseStudyCard";
import { useDocumentMeta } from "@/lib/useDocumentMeta";
import { cn } from "@/lib/utils";

const Work = () => {
  useDocumentMeta(
    "Work — Iveta Dimitrova, Senior UX Designer",
    "Selected case studies in product design, strategy, and research.",
  );

  const [searchParams, setSearchParams] = useSearchParams();
  const activeFilters = searchParams.getAll("filter");

  const allFilters = useMemo(() => {
    const set = new Set<string>();
    caseStudies.forEach((cs) => {
      cs.frontmatter.taxonomy.forEach((t) => set.add(t));
      set.add(cs.frontmatter.scope.industry);
      set.add(cs.frontmatter.scope.role);
    });
    return Array.from(set).sort();
  }, []);

  const visible = useMemo(() => {
    if (activeFilters.length === 0) return caseStudies;
    return caseStudies.filter((cs) => {
      const tags = new Set([
        ...cs.frontmatter.taxonomy,
        cs.frontmatter.scope.industry,
        cs.frontmatter.scope.role,
      ]);
      return activeFilters.some((f) => tags.has(f));
    });
  }, [activeFilters]);

  const toggleFilter = (filter: string) => {
    const next = new Set(activeFilters);
    if (next.has(filter)) {
      next.delete(filter);
    } else {
      next.add(filter);
    }
    setSearchParams(Array.from(next).map((v) => ["filter", v]));
  };

  const clearFilters = () => setSearchParams([]);

  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 sm:px-6 py-5 sm:py-8 flex justify-between items-center"
      >
        <Link
          to="/"
          className="font-mono text-base sm:text-lg text-display hover:text-code transition-colors"
        >
          <span className="text-code">~/</span>portfolio
        </Link>
        <div className="flex gap-3 sm:gap-6 md:gap-8">
          <Link
            to="/"
            className="text-body text-sm font-mono hover:text-code transition-colors"
          >
            cd ../home
          </Link>
        </div>
      </motion.nav>

      <div className="container mx-auto px-4 sm:px-6 py-8 lg:py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10 lg:mb-14"
        >
          <p className="code-comment mb-4">work</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-mono text-display mb-4">
            Selected <span className="text-code">case_studies</span>
            <span className="cursor-blink"></span>
          </h1>
          <p className="text-body text-base md:text-lg max-w-2xl">
            Filter by industry, role, or method. Each card opens the full case
            study.
          </p>
        </motion.div>

        {/* Filter bar */}
        {allFilters.length > 0 && (
          <div
            role="group"
            aria-label="Filter case studies"
            className="flex flex-wrap items-center gap-2 mb-8"
          >
            {allFilters.map((f) => {
              const active = activeFilters.includes(f);
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => toggleFilter(f)}
                  aria-pressed={active}
                  className={cn(
                    "inline-flex items-center px-3 py-1.5 rounded text-xs font-mono border transition-all duration-200",
                    active
                      ? "bg-secondary border-accent text-accent"
                      : "bg-transparent border-border text-muted-foreground hover:border-accent/50 hover:text-body",
                  )}
                >
                  {active && (
                    <span aria-hidden="true" className="mr-1.5 opacity-70">
                      ×
                    </span>
                  )}
                  {f}
                </button>
              );
            })}
            {activeFilters.length > 0 && (
              <button
                type="button"
                onClick={clearFilters}
                className="ml-1 font-mono text-xs text-muted-foreground hover:text-body underline underline-offset-4"
              >
                clear()
              </button>
            )}
          </div>
        )}

        {/* Grid / empty state */}
        {visible.length === 0 ? (
          <div className="py-20 text-center">
            <p className="code-comment mb-2">no_match</p>
            <button
              type="button"
              onClick={clearFilters}
              className="font-mono text-sm text-accent hover:underline underline-offset-4"
            >
              clear_filters() →
            </button>
          </div>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08 } },
            }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {visible.map((cs) => (
              <motion.div
                key={cs.frontmatter.slug}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.45, ease: "easeOut" },
                  },
                }}
              >
                <CaseStudyCard frontmatter={cs.frontmatter} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </main>
  );
};

export default Work;
