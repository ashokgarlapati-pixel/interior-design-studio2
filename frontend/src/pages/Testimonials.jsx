import React, { useState } from 'react';
import { testimonialsData } from '../data/testimonials';
import TestimonialCard from '../components/TestimonialCard';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineChevronLeft, HiOutlineChevronRight, HiOutlineViewGrid, HiOutlineCollection } from 'react-icons/hi';
import SEO from '../utils/seo';

export default function Testimonials() {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'carousel'
  const [carouselIdx, setCarouselIdx] = useState(0);

  const nextCarousel = () => {
    setCarouselIdx((prev) => (prev + 1) % testimonialsData.length);
  };

  const prevCarousel = () => {
    setCarouselIdx((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
  };

  return (
    <div className="relative min-h-screen bg-background pt-24 pb-16">
      <SEO 
        title="Client Reviews & Testimonials"
        description="Read reviews from art collectors, yacht owners, and Michelin-starred chefs who trust Aura & Co. with their premium designs."
        pageUrl="/testimonials"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-12">
        
        {/* Page Header */}
        <div className="text-center space-y-3">
          <span className="text-secondary tracking-[0.25em] text-xs font-semibold uppercase block">
            CLIENT SATISFACTION
          </span>
          <h1 className="text-4xl md:text-5xl font-light text-primary font-luxury">
            Client Experiences
          </h1>
          <p className="text-gray-400 text-xs max-w-md mx-auto">
            Read stories of how we collaborated with residential owners, entrepreneurs, and hoteliers to sculpt luxury environments.
          </p>
          <div className="w-16 h-[1px] bg-secondary mx-auto mt-4" />
        </div>

        {/* View Mode Toggle Controls */}
        <div className="flex justify-center">
          <div className="bg-white border border-gray-200 p-1 flex space-x-1 shadow-sm">
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center space-x-2 text-[10px] tracking-widest uppercase font-bold px-4 py-2 transition-all ${
                viewMode === 'grid' 
                  ? 'bg-primary text-secondary' 
                  : 'text-gray-400 hover:text-primary'
              }`}
            >
              <HiOutlineViewGrid size={16} />
              <span>Grid View</span>
            </button>
            <button
              onClick={() => setViewMode('carousel')}
              className={`flex items-center space-x-2 text-[10px] tracking-widest uppercase font-bold px-4 py-2 transition-all ${
                viewMode === 'carousel' 
                  ? 'bg-primary text-secondary' 
                  : 'text-gray-400 hover:text-primary'
              }`}
            >
              <HiOutlineCollection size={16} />
              <span>Carousel View</span>
            </button>
          </div>
        </div>

        {/* Dynamic Display Panel */}
        <div className="pt-6">
          <AnimatePresence mode="wait">
            {viewMode === 'grid' ? (
              // GRID MODE
              <motion.div
                key="grid-view"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
              >
                {testimonialsData.map((test) => (
                  <TestimonialCard key={test.id} testimonial={test} />
                ))}
              </motion.div>
            ) : (
              // CAROUSEL MODE
              <motion.div
                key="carousel-view"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="relative max-w-3xl mx-auto bg-white border border-gray-150 p-10 md:p-14 shadow-md text-primary flex flex-col items-center text-center space-y-6"
              >
                {/* Carousel Inner content with slide animation */}
                <div className="w-full">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={carouselIdx}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      <div className="text-secondary/15 select-none text-7xl font-serif leading-none mt-2">
                        “
                      </div>
                      
                      <p className="text-gray-600 text-base md:text-lg italic leading-relaxed">
                        {testimonialsData[carouselIdx].text}
                      </p>

                      <div className="flex flex-col items-center space-y-2 pt-6 border-t border-gray-100 w-1/2 mx-auto">
                        <img
                          src={testimonialsData[carouselIdx].image}
                          alt={testimonialsData[carouselIdx].name}
                          className="w-16 h-16 rounded-full object-cover border-2 border-secondary/35 shadow-md"
                        />
                        <h3 className="text-base font-bold text-primary tracking-wide">
                          {testimonialsData[carouselIdx].name}
                        </h3>
                        <span className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">
                          {testimonialsData[carouselIdx].role}
                        </span>
                        <span className="text-[9px] bg-secondary/15 text-secondary border border-secondary/20 px-3 py-0.5 font-bold uppercase tracking-widest">
                          {testimonialsData[carouselIdx].projectType}
                        </span>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Left/Right Carousel Controls */}
                <div className="flex space-x-4 pt-4">
                  <button
                    onClick={prevCarousel}
                    className="w-10 h-10 rounded-full border border-gray-200 text-gray-500 hover:text-secondary hover:border-secondary flex items-center justify-center transition-colors shadow-xs"
                    aria-label="Previous review"
                  >
                    <HiOutlineChevronLeft size={20} />
                  </button>
                  <button
                    onClick={nextCarousel}
                    className="w-10 h-10 rounded-full border border-gray-200 text-gray-500 hover:text-secondary hover:border-secondary flex items-center justify-center transition-colors shadow-xs"
                    aria-label="Next review"
                  >
                    <HiOutlineChevronRight size={20} />
                  </button>
                </div>

                {/* Indicators bar */}
                <div className="flex space-x-1.5 pt-2">
                  {testimonialsData.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCarouselIdx(idx)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        carouselIdx === idx ? 'bg-secondary' : 'bg-gray-200'
                      }`}
                      aria-label={`Jump to review ${idx + 1}`}
                    />
                  ))}
                </div>

              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
