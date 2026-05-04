import { motion } from "framer-motion";
import profilePhoto from "@/assets/profile-photo.png";

const Philosophy = () => {
  const pillars = [
    {
      number: "01",
      key: "research",
      title: "Research as Foundation",
      description:
        "Every design decision stems from deep understanding. I draw on ethnographic methods and cultural analysis to reveal what truly matters to people.",
    },
    {
      number: "02",
      key: "strategy",
      title: "Strategy Before Screens",
      description:
        "Beautiful interfaces mean little without purpose. I align design outcomes with business goals and human needs before any pixel is placed.",
    },
    {
      number: "03",
      key: "evidence",
      title: "Evidence drives decisions",
      description:
        "Decisions get made on data, not opinion. I run generative research, contextual inquiry, and structured synthesis to turn fuzzy inputs into product bets that survive the meeting.",
    },
  ];

  return (
    <section id="about" className="py-24 lg:py-32 bg-card">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 lg:items-center">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4"
          >
            <p className="code-comment mb-4">philosophy.md</p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl mb-4">
              <span className="text-code">const</span> design_
              <br />
              philosophy <span className="text-muted-foreground">=</span> {"{"} 
            </h2>
            <p className="text-body max-w-sm">
              Decisions made on evidence, shipped with intent.
            </p>

            <div className="profile-frame mt-8 w-full max-w-[400px] aspect-square">
              <img
                src={profilePhoto}
                alt="Iveta Dimitrova"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Pillars */}
          <div className="lg:col-span-8 space-y-10">
            {pillars.map((pillar, index) => (
              <motion.div
                key={pillar.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="code-block"
              >
                <div className="flex items-start gap-4">
                  <span className="text-muted-foreground font-mono text-sm shrink-0">
                    {pillar.number}
                  </span>
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-mono mb-2">
                      <span className="text-terminal-purple">{pillar.key}</span>
                      <span className="text-muted-foreground">:</span>{" "}
                      <span className="text-terminal-yellow">"{pillar.title}"</span>
                    </h3>
                    <p className="text-body leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-24 lg:mt-32"
        >
          <div className="section-divider mb-8">
            <span>console.log()</span>
          </div>
          <blockquote className="text-center">
            <p className="font-mono text-xl md:text-2xl lg:text-3xl text-display leading-snug max-w-3xl mx-auto">
              <span className="text-muted-foreground">"</span>
              The job isn't to ship pixels. It's to ship the right pixels for the
              right reason — and prove it.
              <span className="text-muted-foreground">"</span>
            </p>
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
};

export default Philosophy;
