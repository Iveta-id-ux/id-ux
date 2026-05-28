import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Research = () => {
  return (
    <section className="min-h-screen bg-background py-16 lg:py-24">
      <div className="container mx-auto px-6 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            to="/"
            className="font-mono text-sm text-muted-foreground hover:text-code transition-colors mb-12 inline-block"
          >
            ← cd ~/
          </Link>

          <p className="code-comment mb-6">research.md</p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl mb-6 leading-tight font-mono">
            <span className="text-terminal-purple">field</span>
            <span className="text-muted-foreground">:</span>{" "}
            <span className="text-terminal-yellow">"coming_soon"</span>
            <span className="cursor-blink"></span>
          </h1>

          <p className="text-body text-lg max-w-xl leading-relaxed">
            Cultural research, ethnographic writing, and field notes from ongoing work. Posts arriving soon.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Research;
