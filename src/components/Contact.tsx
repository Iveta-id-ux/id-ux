import { motion } from "framer-motion";
import { siteMeta } from "@content/site-meta";

const Contact = () => {
  return (
    <section id="contact" className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="code-comment mb-6">contact.connect()</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl mb-6">
              Let's collaborate on
              <br />
              <span className="text-code">meaningful_work</span>
              <span className="cursor-blink"></span>
            </h2>
            <p className="text-body text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
              Currently considering senior IC and lead roles in product design,
              strategy, and research.
            </p>
            <p className="font-mono text-sm mb-12">
              <span className="text-muted-foreground">// </span>
              <a
                href={`mailto:${siteMeta.email}`}
                className="text-terminal-yellow hover:underline underline-offset-4"
              >
                {siteMeta.email}
              </a>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <a
              href={`mailto:${siteMeta.email}`}
              className="glow-button inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-4 rounded font-mono text-sm font-medium transition-all"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              send_email()
            </a>
            <a
              href={siteMeta.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-border px-8 py-4 rounded font-mono text-sm text-secondary-foreground transition-all hover:border-accent hover:text-accent"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              linkedin.connect()
            </a>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-24 border-t border-border pt-8"
      >
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-mono text-muted-foreground">
            <span>© {siteMeta.copyrightYear} {siteMeta.name}</span>
            <span className="text-code">// crafted_with_intention</span>
          </div>
        </div>
      </motion.footer>
    </section>
  );
};

export default Contact;
