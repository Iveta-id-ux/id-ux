import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="bg-background">
      <div className="container mx-auto px-4 sm:px-6 pt-8 sm:pt-12 lg:pt-20 pb-2 sm:pb-3 lg:pb-4">
        {/* Navigation */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center mb-10 sm:mb-14 lg:mb-24"
        >
          <span className="font-mono text-base sm:text-lg text-display">
            Iveta Dimitrova
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
            <h1 className="text-mono-bold text-3xl md:text-4xl lg:text-5xl leading-[1.15] mb-6">
              Product designer / shipping{" "}
              <span className="text-terminal-yellow">human centered design</span>{" "}
              backed by{" "}
              <span className="text-code">product strategy and research</span>
              <span className="cursor-blink"></span>
            </h1>

            <p className="text-body text-lg max-w-xl mb-10 leading-relaxed">
              7 years designing software for global teams. Currently a UX Designer at Amadeus with a Master in Interaction Design from Domus Academy / NABA Milan.
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
