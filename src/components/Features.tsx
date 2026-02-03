import { motion } from 'framer-motion';
import { carData } from '@/data/carData';

const iconMap: Record<string, JSX.Element> = {
  chassis: (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 8h16M4 16h16M8 4v16M16 4v16" />
    </svg>
  ),
  gearbox: (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="6" cy="6" r="2" />
      <circle cx="18" cy="6" r="2" />
      <circle cx="6" cy="18" r="2" />
      <circle cx="18" cy="18" r="2" />
      <path d="M6 8v10M18 8v4M6 12h12" />
    </svg>
  ),
  aero: (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M2 12h20M7 7l-5 5 5 5M17 7l5 5-5 5" />
    </svg>
  ),
  brakes: (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  ),
};

const Features = () => {
  return (
    <section className="py-24 lg:py-32 bg-gradient-carbon">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-body text-xs tracking-[0.4em] text-primary mb-4">ENGINEERING EXCELLENCE</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            RACE <span className="text-gradient-gold">TECHNOLOGY</span>
          </h2>
          <div className="w-24 h-px bg-gradient-gold mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {carData.features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group p-8 border border-primary/10 hover:border-primary/40 bg-background/50 backdrop-blur-sm transition-all duration-500"
            >
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 w-16 h-16 border border-primary/30 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                  {iconMap[feature.icon]}
                </div>
                <div>
                  <h3 className="font-display text-lg tracking-[0.1em] text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="font-body text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
