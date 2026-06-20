import React from 'react';
import { motion } from 'framer-motion';
import { FaInstagram, FaLinkedin, FaPinterest, FaTwitter } from 'react-icons/fa';
import { HiOutlineBadgeCheck, HiOutlineSparkles } from 'react-icons/hi';

export default function DesignerCard({ designer }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="bg-white border border-gray-200/60 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col group"
    >
      {/* Profile Image container */}
      <div className="relative overflow-hidden aspect-[4/5] bg-gray-100">
        <img
          src={designer.image}
          alt={designer.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Soft luxury shadow over image */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Experience Overlay Badge */}
        <span className="absolute bottom-4 left-4 bg-secondary text-primary font-bold text-[10px] tracking-widest uppercase px-3 py-1 shadow-md">
          {designer.experience} Exp
        </span>

        {/* Floating Social Icons */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 ease-in-out">
          {designer.social?.instagram && (
            <a href={designer.social.instagram} target="_blank" rel="noopener noreferrer" className="bg-primary hover:bg-secondary text-white hover:text-primary p-2 shadow-md transition-colors" aria-label="Instagram">
              <FaInstagram size={14} />
            </a>
          )}
          {designer.social?.linkedin && (
            <a href={designer.social.linkedin} target="_blank" rel="noopener noreferrer" className="bg-primary hover:bg-secondary text-white hover:text-primary p-2 shadow-md transition-colors" aria-label="LinkedIn">
              <FaLinkedin size={14} />
            </a>
          )}
          {designer.social?.pinterest && (
            <a href={designer.social.pinterest} target="_blank" rel="noopener noreferrer" className="bg-primary hover:bg-secondary text-white hover:text-primary p-2 shadow-md transition-colors" aria-label="Pinterest">
              <FaPinterest size={14} />
            </a>
          )}
          {designer.social?.twitter && (
            <a href={designer.social.twitter} target="_blank" rel="noopener noreferrer" className="bg-primary hover:bg-secondary text-white hover:text-primary p-2 shadow-md transition-colors" aria-label="Twitter">
              <FaTwitter size={14} />
            </a>
          )}
        </div>
      </div>

      {/* Info Content */}
      <div className="p-6 flex-grow flex flex-col justify-between">
        <div>
          <span className="text-secondary text-xs font-semibold tracking-widest uppercase block mb-1">
            {designer.role}
          </span>
          <h3 className="text-2xl font-light tracking-wide text-primary font-luxury group-hover:text-secondary transition-colors duration-300 mb-3">
            {designer.name}
          </h3>
          <p className="text-sm text-gray-500 leading-relaxed mb-6 italic">
            "{designer.bio}"
          </p>

          <div className="space-y-4">
            {/* Specialization */}
            <div>
              <span className="text-[10px] tracking-widest uppercase font-semibold text-gray-400 block mb-1">
                Specialization
              </span>
              <span className="text-xs font-medium text-primary bg-background px-3 py-1 inline-block border border-gray-200">
                {designer.specialization}
              </span>
            </div>

            {/* Certifications */}
            <div>
              <span className="text-[10px] tracking-widest uppercase font-semibold text-gray-400 block mb-2">
                Credentials
              </span>
              <div className="flex flex-wrap gap-2">
                {designer.certifications.map((cert, i) => (
                  <span key={i} className="flex items-center text-[10px] font-medium text-gray-600 space-x-1">
                    <HiOutlineBadgeCheck className="text-secondary mr-1" size={14} />
                    <span>{cert}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div>
              <span className="text-[10px] tracking-widest uppercase font-semibold text-gray-400 block mb-2">
                Honors
              </span>
              <div className="space-y-1">
                {designer.achievements.map((ach, i) => (
                  <div key={i} className="flex items-start text-[10px] text-gray-600">
                    <HiOutlineSparkles className="text-secondary mr-2 mt-[2px] flex-shrink-0" size={12} />
                    <span>{ach}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
