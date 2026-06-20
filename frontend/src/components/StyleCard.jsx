import React from 'react';
import { motion } from 'framer-motion';
import { HiOutlineLightBulb, HiCheck } from 'react-icons/hi';

export default function StyleCard({ styleItem }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="bg-white border border-gray-200/60 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col md:flex-row group"
    >
      {/* Visual Image Section */}
      <div className="relative overflow-hidden md:w-2/5 aspect-square md:aspect-auto min-h-[260px] bg-gray-150">
        <img
          src={styleItem.image}
          alt={styleItem.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-primary/40 group-hover:bg-primary/50 transition-colors duration-300" />
        
        {/* Style Tag Indicator */}
        <div className="absolute inset-0 flex items-center justify-center">
          <h3 className="text-3xl font-light text-white tracking-widest font-luxury uppercase border-b border-secondary/50 pb-2 px-4 group-hover:scale-105 transition-transform duration-300">
            {styleItem.title}
          </h3>
        </div>
      </div>

      {/* Info Details Section */}
      <div className="p-8 md:w-3/5 flex flex-col justify-between">
        <div className="space-y-6">
          <div>
            <span className="text-[10px] tracking-[0.2em] font-semibold text-secondary uppercase block mb-1">
              Design Philosophies
            </span>
            <p className="text-sm text-gray-500 leading-relaxed">
              {styleItem.description}
            </p>
          </div>

          {/* Inspiration Points */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-primary flex items-center mb-3">
              <HiOutlineLightBulb className="text-secondary mr-2" size={16} />
              Inspiration Keynotes
            </h4>
            <ul className="space-y-2 text-xs text-gray-500">
              {styleItem.inspiration.map((item, idx) => (
                <li key={idx} className="flex items-start">
                  <HiCheck className="text-secondary mr-2 mt-0.5 flex-shrink-0" size={14} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Associated Projects */}
        <div className="mt-8 pt-4 border-t border-gray-100 flex flex-wrap items-center gap-2">
          <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">
            Related Portfolios:
          </span>
          {styleItem.relatedProjects.map((proj, idx) => (
            <span 
              key={idx} 
              className="text-[9px] font-semibold tracking-wider text-primary bg-background border border-gray-200 px-2.5 py-1 uppercase"
            >
              {proj}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
