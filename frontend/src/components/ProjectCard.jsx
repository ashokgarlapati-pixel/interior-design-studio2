import React from 'react';
import { motion } from 'framer-motion';
import { HiOutlineLocationMarker, HiOutlineArrowRight } from 'react-icons/hi';

export default function ProjectCard({ project, onClick }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="group relative overflow-hidden bg-primary-dark aspect-[4/3] cursor-pointer shadow-md"
      onClick={onClick}
    >
      {/* Background Image */}
      <img
        src={project.mainImage}
        alt={project.title}
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        loading="lazy"
      />

      {/* Elegant Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

      {/* Category Tag (Top-left) */}
      <span className="absolute top-4 left-4 bg-primary/95 text-secondary border border-secondary/30 text-[10px] tracking-widest uppercase font-semibold px-3 py-1 backdrop-blur-md">
        {project.category}
      </span>

      {/* Project Details (Bottom-left) */}
      <div className="absolute bottom-0 left-0 w-full p-6 text-white flex flex-col justify-end">
        <div className="flex items-center text-[11px] text-secondary tracking-widest uppercase mb-1 font-semibold space-x-1">
          <HiOutlineLocationMarker size={12} className="text-secondary" />
          <span>{project.location}</span>
        </div>
        
        <h3 className="text-xl font-light tracking-wide font-luxury mb-2 group-hover:text-secondary transition-colors duration-300">
          {project.title}
        </h3>

        {/* View Project Action (Hidden initially, slides up) */}
        <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-[0.2em] text-gray-300 group-hover:text-white transition-all transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 duration-300">
          <span>View Details</span>
          <HiOutlineArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>

      {/* Thin Gold Border Grid Line Overlay */}
      <div className="absolute inset-4 border border-secondary/0 group-hover:border-secondary/20 pointer-events-none transition-all duration-500" />
    </motion.div>
  );
}
