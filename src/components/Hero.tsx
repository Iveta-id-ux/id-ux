import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="bg-background">
      <div className="container mx-auto px-4 sm:px-6 pt-8 sm:pt-12 lg:pt-20 pb-6 sm:pb-8 lg:pb-12">
        {/* Navigation */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center mb-10 sm:mb-14 lg:mb-24"
        >
          <span className="font-mono text-base sm:text-lg text-display">
            <span className="text-code">~/</span>portfolio
          </span>
          <div className="flex gap-3 sm:gap-6 md:gap-8">
            <Link to="/work" className="text-body text-sm font-mono hover:text-code transition-colors">
              ./work
            </Link>
            <a href="#about" className="text-body text-sm font-mono hover:text-code transition-colors">
              ./about
            </a>
            <a href="#contact" className="text-body text-sm font-mono hover:text-code transition-colors">
              ./contact
            </a>
          </div>
        </motion.nav>

        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
            <p className="code-comment text-mono-italic mb-6">
              product_designer.strategist()
            </p>

            <h1 className="font-sans font-bold text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
              Iveta Dimitrova
            </h1>

            <div className="font-mono text-xl md:text-2xl leading-snug mb-8 space-y-1">
              <p>Product designer</p>
              <p>
                <span className="text-body">/</span>shipping{" "}
                <span className="text-terminal-yellow">human centered design</span>
              </p>
              <p>
                backed by{" "}
                <span className="text-code">product strategy and research</span>
              </p>
            </div>

            <p className="font-sans text-base md:text-lg max-w-xl mb-8 leading-relaxed">
              7 years designing software for global teams. Currently a UX Designer at{" "}
              <strong className="text-terminal-yellow font-semibold">Amadeus</strong>, with a Master in Interaction Design from{" "}
              <strong className="text-terminal-yellow font-semibold">
                Domus Academy / NABA Milan
              </strong>
              , Italy, and a Bachelor in Cultural Anthropology at{" "}
              <strong className="text-terminal-yellow font-semibold">
                Université de Fribourg
              </strong>
              , Switzerland. Open to senior IC and lead roles in product design, strategy, and research.
            </p>

            <p className="font-mono text-sm md:text-base text-code max-w-2xl mb-12 leading-relaxed">
              // I&apos;m good at  &gt;  UX design  &gt;  Product strategy  &gt;  Interaction Design  &gt;  UX research  &gt;  UI design  &gt;  Design systems  &gt;  SCRUM  &gt;  Product Life Cycle
            </p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="flex gap-6 items-center"
            >
              <Link
                to="/work"
                className="glow-button inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded font-mono text-sm font-medium transition-all"
              >
                view_work()
                <svg
                  aria-hidden="true"
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
              <a href="#contact" className="text-link">
                contact()
              </a>
            </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
