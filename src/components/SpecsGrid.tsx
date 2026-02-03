import { motion } from 'framer-motion';
import { carData } from '@/data/carData';

const SpecsGrid = () => {
  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-body text-xs tracking-[0.4em] text-primary mb-4">TECHNICAL SPECIFICATIONS</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            PURE <span className="text-gradient-gold">PERFORMANCE</span>
          </h2>
          <div className="w-24 h-px bg-gradient-gold mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-1">
          {carData.specs.map((spec, i) => (
            <motion.div
              key={spec.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group p-8 border border-primary/10 hover:border-primary/30 bg-card transition-all duration-500"
            >
              <p className="font-body text-xs tracking-[0.3em] text-muted-foreground mb-3">
                {spec.label.toUpperCase()}
              </p>
              <p className="font-display text-xl text-foreground group-hover:text-primary transition-colors duration-300">
                {spec.value}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecsGrid;
