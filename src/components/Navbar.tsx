import { useState } from 'react';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass border-b border-primary/20' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-10 h-10 border border-primary/50 flex items-center justify-center">
              <span className="font-display text-primary text-lg font-bold">P</span>
            </div>
            <div className="hidden sm:block">
              <span className="font-display text-lg tracking-[0.3em] text-foreground">PAGANI</span>
            </div>
          </motion.div>

          {/* Center Nav */}
          <div className="hidden md:flex items-center gap-8">
            {['MODELS', 'HERITAGE', 'EXPERIENCE', 'ATELIER'].map((item) => (
              <motion.a
                key={item}
                href="#"
                className="font-body text-sm tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors duration-300"
                whileHover={{ y: -2 }}
              >
                {item}
              </motion.a>
            ))}
          </div>

          {/* CTA */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2.5 border border-primary/50 font-display text-xs tracking-[0.2em] text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            INQUIRE
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
