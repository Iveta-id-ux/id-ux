import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Work = () => {
  const projects = [
    {
      id: 1,
      title: "Future of Money",
      category: "UX Research & Strategy",
      description:
        "Exploring how digital transformation reshapes our relationship with currency, transactions, and financial identity in an increasingly cashless society.",
      tags: ["fintech", "behavioral_research", "service_design"],
      behanceUrl: "https://www.behance.net/gallery/116549723/Future-of-Money",
      year: "2021",
    },
  ];

  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-6 py-8 flex justify-between items-center"
      >
        <Link to="/" className="font-mono text-lg text-display hover:text-code transition-colors">
          <span className="text-code">~/</span>portfolio
        </Link>
        <div className="flex gap-8">
          <Link to="/" className="text-body text-sm font-mono hover:text-code transition-colors">
            cd ../home
          </Link>
        </div>
      </motion.nav>

      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="code-comment mb-4">// case_studies.map()</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-mono text-display mb-4">
            Selected <span className="text-code">Work</span>
            <span className="cursor-blink"></span>
          </h1>
          <p className="text-body text-lg max-w-2xl">
            Research-driven projects exploring the intersection of human behavior, 
            cultural context, and design strategy.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="space-y-8">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="group"
            >
              <a
                href={project.behanceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="border border-border rounded-lg p-6 md:p-8 bg-card hover:border-accent transition-all duration-300">
                  {/* Terminal Header */}
                  <div className="flex items-center gap-2 mb-6">
                    <span className="w-3 h-3 rounded-full bg-terminal-red"></span>
                    <span className="w-3 h-3 rounded-full bg-terminal-yellow"></span>
                    <span className="w-3 h-3 rounded-full bg-terminal-green"></span>
                    <span className="ml-4 font-mono text-xs text-muted-foreground">
                      project_{project.id}.tsx
                    </span>
                  </div>

                  <div className="grid md:grid-cols-[1fr,auto] gap-6 items-start">
                    <div>
                      {/* Category & Year */}
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-code font-mono text-sm">
                          {project.category}
                        </span>
                        <span className="text-muted-foreground font-mono text-sm">
                          // {project.year}
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className="text-2xl md:text-3xl font-mono text-display mb-4 group-hover:text-code transition-colors">
                        {project.title}
                      </h2>

                      {/* Description */}
                      <p className="text-body mb-6 max-w-2xl leading-relaxed">
                        {project.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="discipline-tag text-xs"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* View Arrow */}
                    <div className="hidden md:flex items-center justify-center w-12 h-12 border border-border rounded-lg group-hover:border-accent group-hover:bg-accent/10 transition-all">
                      <svg
                        className="w-5 h-5 text-muted-foreground group-hover:text-code transition-colors"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </a>
            </motion.article>
          ))}
        </div>

        {/* More Coming */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="code-comment">// more_projects.loading()...</p>
          <p className="text-muted-foreground font-mono text-sm mt-2">
            Additional case studies coming soon
          </p>
        </motion.div>
      </div>
    </main>
  );
};

export default Work;
