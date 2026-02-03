import { useRef } from 'react';
import { useScroll } from 'framer-motion';
import Navbar from '@/components/Navbar';
import ZondaScrollCanvas from '@/components/ZondaScrollCanvas';
import ZondaExperience from '@/components/ZondaExperience';
import SpecsGrid from '@/components/SpecsGrid';
import Features from '@/components/Features';
import Footer from '@/components/Footer';

const Index = () => {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <main className="bg-background min-h-screen">
      <Navbar />
      
      {/* Scroll Sequence Section - Locked for 600vh */}
      <section 
        ref={containerRef} 
        className="h-[600vh] relative"
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* Canvas Layer - z-0 */}
          <div className="absolute inset-0 z-0">
            <ZondaScrollCanvas scrollYProgress={scrollYProgress} />
          </div>
          
          {/* HUD Overlay - z-10 */}
          <div className="absolute inset-0 z-10">
            <ZondaExperience scrollYProgress={scrollYProgress} />
          </div>
        </div>
      </section>

      {/* Rest of site - Scrolls naturally after sequence */}
      <div className="relative z-20 bg-background">
        <SpecsGrid />
        <Features />
        <Footer />
      </div>
    </main>
  );
};

export default Index;
