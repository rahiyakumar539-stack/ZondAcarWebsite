import { motion, MotionValue, useTransform } from 'framer-motion';
import { carData } from '@/data/carData';

interface ZondaExperienceProps {
  scrollYProgress: MotionValue<number>;
}

const ZondaExperience = ({ scrollYProgress }: ZondaExperienceProps) => {
  // Phase transitions based on scroll progress
  // 0-33%: Hero, 33-66%: Design, 66-100%: Engine
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25, 0.33], [1, 1, 0]);
  const designOpacity = useTransform(scrollYProgress, [0.28, 0.38, 0.58, 0.66], [0, 1, 1, 0]);
  const engineOpacity = useTransform(scrollYProgress, [0.60, 0.70, 1], [0, 1, 1]);

  // Subtle parallax effects
  const heroY = useTransform(scrollYProgress, [0, 0.33], [0, -50]);
  const designY = useTransform(scrollYProgress, [0.33, 0.66], [50, -50]);
  const engineY = useTransform(scrollYProgress, [0.66, 1], [50, 0]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Hero Phase */}
      <motion.div
        style={{ opacity: heroOpacity, y: heroY }}
        className="absolute inset-0 flex flex-col items-center justify-start pt-32 md:pt-40 px-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-center"
        >
          <motion.p 
            className="font-body text-primary text-sm tracking-[0.4em] mb-4 text-shadow-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {carData.hero.subtitle}
          </motion.p>
          
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-wider mb-6 text-shadow-hero">
            <span className="text-foreground">{carData.hero.title.split(' ')[0]} </span>
            <span className="text-gradient-gold drop-shadow-lg">{carData.hero.title.split(' ').slice(1).join(' ')}</span>
          </h1>
          
          <motion.div 
            className="w-24 h-px bg-gradient-gold mx-auto mb-8"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 1 }}
          />
          
          <motion.p 
            className="font-display text-2xl md:text-3xl text-primary mb-8 text-shadow-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {carData.hero.price}
          </motion.p>
          
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="pointer-events-auto px-10 py-4 border border-primary/50 font-display text-sm tracking-[0.3em] text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-500 animate-glow-pulse"
          >
            {carData.hero.cta}
          </motion.button>
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
        >
          <span className="font-body text-xs tracking-[0.3em] text-muted-foreground">SCROLL TO EXPLORE</span>
          <motion.div 
            className="w-px h-12 bg-gradient-to-b from-primary to-transparent"
            animate={{ scaleY: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>

      {/* Design Phase */}
      <motion.div
        style={{ opacity: designOpacity, y: designY }}
        className="absolute inset-0 flex items-center px-6 lg:px-20"
      >
        <div className="max-w-xl">
          <div className="hud-border p-8 glass-gold">
            <p className="font-body text-xs tracking-[0.4em] text-primary mb-2">02 / DESIGN</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-2">
              {carData.design.title}
            </h2>
            <h3 className="font-display text-lg tracking-[0.2em] text-primary mb-6">
              {carData.design.subtitle}
            </h3>
            <div className="w-16 h-px bg-primary/50 mb-6" />
            <p className="font-body text-muted-foreground leading-relaxed mb-8">
              {carData.design.description}
            </p>
            <ul className="space-y-3">
              {carData.design.highlights.map((highlight, i) => (
                <li key={i} className="flex items-center gap-3 font-body text-foreground">
                  <span className="w-1.5 h-1.5 bg-primary rotate-45" />
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Engine Phase */}
      <motion.div
        style={{ opacity: engineOpacity, y: engineY }}
        className="absolute inset-0 flex items-center justify-end px-6 lg:px-20"
      >
        <div className="max-w-2xl text-right">
          <div className="hud-border p-8 glass-gold">
            <p className="font-body text-xs tracking-[0.4em] text-primary mb-2">03 / POWERTRAIN</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-2">
              {carData.engine.title}
            </h2>
            <h3 className="font-display text-lg tracking-[0.2em] text-primary mb-8">
              {carData.engine.subtitle}
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {carData.engine.specs.map((spec, i) => (
                <div key={i} className="text-center border border-primary/20 p-4">
                  <p className="font-display text-3xl md:text-4xl font-bold text-primary mb-1">
                    {spec.value}
                  </p>
                  <p className="font-body text-xs tracking-[0.2em] text-muted-foreground">
                    {spec.unit}
                  </p>
                  <p className="font-body text-xs tracking-[0.15em] text-foreground mt-2">
                    {spec.label}
                  </p>
                </div>
              ))}
            </div>
            
            <p className="font-body text-muted-foreground leading-relaxed text-right">
              {carData.engine.description}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Progress indicator */}
      <motion.div className="absolute left-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-4">
        {['01', '02', '03'].map((num, i) => {
          const start = i * 0.33;
          const end = (i + 1) * 0.33;
          const isActive = useTransform(
            scrollYProgress,
            [start, end],
            [0, 1]
          );
          
          return (
            <motion.div
              key={num}
              className="flex items-center gap-3"
            >
              <motion.div 
                className="w-8 h-8 border flex items-center justify-center font-display text-xs"
                style={{
                  borderColor: useTransform(isActive, [0, 0.5, 1], ['hsl(43, 30%, 25%)', 'hsl(43, 76%, 52%)', 'hsl(43, 30%, 25%)']),
                  color: useTransform(isActive, [0, 0.5, 1], ['hsl(0, 0%, 60%)', 'hsl(43, 76%, 52%)', 'hsl(0, 0%, 60%)'])
                }}
              >
                {num}
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default ZondaExperience;
