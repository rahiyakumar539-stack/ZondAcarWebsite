import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="py-16 bg-background border-t border-primary/10">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-1"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 border border-primary/50 flex items-center justify-center">
                <span className="font-display text-primary text-xl font-bold">P</span>
              </div>
              <span className="font-display text-xl tracking-[0.3em] text-foreground">PAGANI</span>
            </div>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              Crafting automotive art since 1992. Every Pagani is a masterpiece born from passion and precision.
            </p>
          </motion.div>

          {/* Links */}
          {[
            { title: 'MODELS', links: ['Huayra', 'Zonda', 'Utopia', 'One-Offs'] },
            { title: 'COMPANY', links: ['Heritage', 'Atelier', 'Careers', 'Contact'] },
            { title: 'LEGAL', links: ['Privacy', 'Terms', 'Cookies', 'Press'] },
          ].map((section, i) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i + 1) * 0.1 }}
            >
              <h4 className="font-display text-sm tracking-[0.2em] text-foreground mb-6">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link}>
                    <a 
                      href="#" 
                      className="font-body text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-primary/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="font-body text-xs text-muted-foreground tracking-wider">
            © 2024 PAGANI AUTOMOBILI S.P.A. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-6">
            {['Instagram', 'YouTube', 'LinkedIn'].map((social) => (
              <a
                key={social}
                href="#"
                className="font-body text-xs text-muted-foreground hover:text-primary transition-colors duration-300 tracking-wider"
              >
                {social.toUpperCase()}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
