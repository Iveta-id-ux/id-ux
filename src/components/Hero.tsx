import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import profilePhoto from "@/assets/profile-photo.png";

const Hero = () => {
  const disciplines = [
    "UX_Strategy",
    "Design_Research",
    "Cultural_Anthropology",
    "Human_Centered_Design",
  ];

  return (
    <section className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-12 lg:py-20">
        {/* Navigation */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center mb-16 lg:mb-24"
        >
          <span className="font-mono text-lg text-display">
            <span className="text-code">~/</span>portfolio
          </span>
          <div className="flex gap-8">
            <a href="#work" className="text-body text-sm font-mono hover:text-code transition-colors">
              ./work
            </a>
            <a href="#about" className="text-body text-sm font-mono hover:text-code transition-colors">
              ./about
            </a>
            <a href="#contact" className="text-body text-sm font-mono hover:text-code transition-colors">
              ./contact
            </a>
          </div>
        </motion.nav>

        {/* Hero Content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="order-2 lg:order-1"
          >
            <p className="code-comment mb-6">design_strategist.init()</p>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-[1.15] mb-6">
              Bridging{" "}
              <span className="text-code">culture</span>
              <br />
              <span className="text-body">&&</span> design through
              <br />
              <span className="text-terminal-yellow">strategic_research</span>
              <span className="cursor-blink"></span>
            </h1>

            <p className="text-body text-lg max-w-xl mb-10 leading-relaxed">
              UX Design Strategist with roots in Cultural Anthropology. 
              I uncover the human stories that shape exceptional experiences — 
              transforming research insights into design decisions that resonate.
            </p>

            {/* Disciplines */}
            <div className="flex flex-wrap gap-3 mb-12">
              {disciplines.map((discipline, index) => (
                <motion.span
                  key={discipline}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  className="discipline-tag"
                >
                  {discipline}
                </motion.span>
              ))}
            </div>

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

          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <div className="profile-frame w-72 md:w-80 lg:w-96">
              <div className="pt-7">
                <img
                  src={profilePhoto}
                  alt="UX Design Strategist Portrait"
                  className="w-full aspect-[3/4] object-cover"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="hidden lg:flex justify-center mt-20"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="font-mono text-xs text-muted-foreground">scroll_down()</span>
            <div className="w-px h-12 bg-border" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
