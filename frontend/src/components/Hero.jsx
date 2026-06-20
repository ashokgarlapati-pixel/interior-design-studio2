import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const heroSlides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=90",
    title: "Bespoke Modern Luxury",
    subtitle: "AURA & CO. ARCHITECTURE & INTERIOR DESIGN"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1920&q=90",
    title: "Refined Minimalist Living",
    subtitle: "HARMONIZING NATURAL MATERIALS WITH BREATHTAKING PROPORTIONS"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1920&q=90",
    title: "Prestigious Spaces",
    subtitle: "CRAFTING VISUAL MASTERPIECES FOR ELITE CLIENTS WORLDWIDE"
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-primary-dark">
      {/* Background Slideshow */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center animate-ken-burns"
              style={{ backgroundImage: `url(${heroSlides[currentSlide].image})` }}
            />
            {/* Dark luxury radial overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/60 to-transparent" />
            <div className="absolute inset-0 bg-black/30" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Floating Decorative Gold Grid Lines (Luxury Trend) */}
      <div className="absolute inset-0 pointer-events-none z-10 grid grid-cols-4 h-full w-full opacity-10">
        <div className="border-r border-secondary h-full" />
        <div className="border-r border-secondary h-full" />
        <div className="border-r border-secondary h-full" />
        <div className="h-full" />
      </div>

      {/* Content Container */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8 h-full flex flex-col justify-center items-start text-white">
        <div className="max-w-3xl space-y-6">
          <motion.p
            key={`subtitle-${currentSlide}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-secondary tracking-[0.3em] font-medium text-xs md:text-sm uppercase font-sans"
          >
            {heroSlides[currentSlide].subtitle}
          </motion.p>

          <motion.h1
            key={`title-${currentSlide}`}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl md:text-6xl lg:text-7xl font-light tracking-wide leading-tight font-luxury text-white"
          >
            {heroSlides[currentSlide].title.split(' ').map((word, idx) => {
              if (word === "Luxury" || word === "Minimalist" || word === "Bespoke" || word === "Spaces") {
                return <span key={idx} className="font-semibold gold-gradient-text block md:inline">{word} </span>;
              }
              return word + ' ';
            })}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto"
          >
            <Link
              to="/contact"
              className="gold-gradient-bg text-primary font-bold text-sm tracking-widest uppercase px-8 py-4 shadow-lg hover:shadow-secondary/25 transition-luxe text-center"
            >
              Book Consultation
            </Link>
            
            <Link
              to="/portfolio"
              className="border border-white/40 text-white hover:border-secondary hover:text-secondary font-bold text-sm tracking-widest uppercase px-8 py-4 backdrop-blur-sm transition-luxe text-center"
            >
              View Portfolio
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Down Arrow / Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center space-y-2 pointer-events-none opacity-60">
        <span className="text-[10px] tracking-[0.25em] text-white uppercase font-sans">Scroll</span>
        <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
          <motion.div 
            animate={{ y: [0, 48, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-full h-4 bg-secondary"
          />
        </div>
      </div>
    </div>
  );
}
