import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import portraitPhoto from "@/assets/portrait-warm.jpg";

const Practices = () => {
  const practices = [
    {
      number: "01",
      key: "product",
      path: "~/work",
      to: "/work",
      description:
        "UX research and product strategy for global SaaS teams. Currently shipping at Amadeus.",
    },
    {
      number: "02",
      key: "photography",
      path: "~/photo",
      to: "/photo",
      description: "Analog black and white. Portraits and the natural world.",
    },
    {
      number: "03",
      key: "illustration",
      path: "~/draw",
      to: "/draw",
      description: "Colourful and abstract. Characters and pictograms.",
    },
    {
      number: "04",
      key: "field",
      path: "~/research",
      to: "/research",
      description:
        "Cultural research, ethnographic writing, and field notes from ongoing work.",
    },
  ];

  return (
    <section id="about" className="py-24 lg:py-32 bg-card">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Portrait — alone, no header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <div className="profile-frame w-full max-w-md mx-auto lg:mx-0">
              <div className="pt-7">
                <img
                  src={portraitPhoto}
                  alt="Portrait"
                  className="w-full aspect-[3/4] object-cover"
                />
              </div>
            </div>
          </motion.div>

          {/* Practices directory */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-10"
            >
              <p className="code-comment mb-4">practices.ls()</p>
              <h2 className="font-mono text-2xl md:text-3xl lg:text-4xl leading-tight mb-4">
                <span className="text-code">const</span> practices{" "}
                <span className="text-muted-foreground">= [</span>
                <br />
                <span className="pl-6 inline-block">
                  <span className="text-terminal-purple">product</span>
                  <span className="text-muted-foreground">,</span>{" "}
                  <span className="text-terminal-purple">photography</span>
                  <span className="text-muted-foreground">,</span>
                  <br />
                  <span className="text-terminal-purple">illustration</span>
                  <span className="text-muted-foreground">,</span>{" "}
                  <span className="text-terminal-purple">field</span>
                  <span className="text-muted-foreground">,</span>
                </span>
                <br />
                <span className="text-muted-foreground">]</span>
              </h2>
              <p className="text-body max-w-md">
                Four practices, one through-line — deep observation of how people live, work, and see.
              </p>
            </motion.div>

            <div className="space-y-4">
              {practices.map((practice, index) => (
                <motion.div
                  key={practice.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    to={practice.to}
                    className="code-block group flex items-start gap-4 transition-all hover:border-accent/40 hover:bg-accent/[0.02]"
                  >
                    <span className="text-muted-foreground font-mono text-sm shrink-0 pt-0.5">
                      {practice.number}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline gap-3 mb-1.5">
                        <span className="font-mono text-base text-terminal-purple">
                          {practice.key}
                        </span>
                        <span className="font-mono text-xs text-muted-foreground">
                          {practice.path}
                        </span>
                      </div>
                      <p className="text-body text-sm leading-relaxed">
                        {practice.description}
                      </p>
                    </div>
                    <span className="font-mono text-code shrink-0 transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Practices;
