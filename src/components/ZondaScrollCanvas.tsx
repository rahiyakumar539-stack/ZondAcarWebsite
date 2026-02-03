import { useEffect, useRef, useState } from 'react';
import { MotionValue, useMotionValueEvent } from 'framer-motion';

// Import the images
import zondaHero from '@/assets/zonda-hero.jpg';
import zondaDesign from '@/assets/zonda-design.jpg';
import zondaEngine from '@/assets/zonda-engine.jpg';

interface ZondaScrollCanvasProps {
  scrollYProgress: MotionValue<number>;
}

const images = [zondaHero, zondaDesign, zondaEngine];

const ZondaScrollCanvas = ({ scrollYProgress }: ZondaScrollCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loadedImages, setLoadedImages] = useState<HTMLImageElement[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Load all images
  useEffect(() => {
    const loadImages = async () => {
      const loaded = await Promise.all(
        images.map((src) => {
          return new Promise<HTMLImageElement>((resolve) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.src = src;
          });
        })
      );
      setLoadedImages(loaded);
    };
    loadImages();
  }, []);

  // Map scroll progress to image index
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const index = Math.min(
      Math.floor(latest * images.length),
      images.length - 1
    );
    setCurrentImageIndex(index);
  });

  // Draw image on canvas with high-DPI support
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || loadedImages.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    // Set canvas size with device pixel ratio
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    // Scale context for high-DPI
    ctx.scale(dpr, dpr);

    const img = loadedImages[currentImageIndex];
    if (!img) return;

    // Clear canvas
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, rect.width, rect.height);

    // Calculate object-fit: contain dimensions
    const imgRatio = img.width / img.height;
    const canvasRatio = rect.width / rect.height;

    let drawWidth: number, drawHeight: number, drawX: number, drawY: number;

    if (imgRatio > canvasRatio) {
      // Image is wider than canvas ratio
      drawWidth = rect.width;
      drawHeight = rect.width / imgRatio;
      drawX = 0;
      drawY = (rect.height - drawHeight) / 2;
    } else {
      // Image is taller than canvas ratio
      drawHeight = rect.height;
      drawWidth = rect.height * imgRatio;
      drawX = (rect.width - drawWidth) / 2;
      drawY = 0;
    }

    // Draw with smooth scaling
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);

    // Add subtle vignette overlay
    const gradient = ctx.createRadialGradient(
      rect.width / 2,
      rect.height / 2,
      0,
      rect.width / 2,
      rect.height / 2,
      Math.max(rect.width, rect.height) * 0.7
    );
    gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0.5)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, rect.width, rect.height);
  }, [loadedImages, currentImageIndex]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ 
        width: '100%', 
        height: '100%',
      }}
    />
  );
};

export default ZondaScrollCanvas;
