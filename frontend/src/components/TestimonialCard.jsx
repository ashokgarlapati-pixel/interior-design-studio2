import React from 'react';
import { HiStar } from 'react-icons/hi';
import { ImQuotesLeft } from 'react-icons/im';

export default function TestimonialCard({ testimonial }) {
  return (
    <div className="bg-white border border-gray-150 p-8 shadow-sm flex flex-col justify-between relative hover:shadow-lg transition-all duration-300 group">
      
      {/* Decorative large quote mark */}
      <div className="absolute top-6 right-8 text-secondary/10 group-hover:text-secondary/20 transition-colors duration-300 pointer-events-none">
        <ImQuotesLeft size={50} />
      </div>

      <div className="space-y-4 relative z-10">
        {/* Star Rating */}
        <div className="flex space-x-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <HiStar
              key={i}
              size={18}
              className={i < testimonial.rating ? 'text-secondary' : 'text-gray-200'}
            />
          ))}
        </div>

        {/* Testimonial Text */}
        <p className="text-gray-600 text-sm leading-relaxed italic pt-2">
          "{testimonial.text}"
        </p>
      </div>

      {/* Client Profile */}
      <div className="flex items-center space-x-4 mt-8 pt-6 border-t border-gray-100 relative z-10">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-12 h-12 rounded-full object-cover border border-secondary/25"
          loading="lazy"
        />
        <div>
          <h4 className="text-sm font-bold text-primary tracking-wide">
            {testimonial.name}
          </h4>
          <span className="text-[10px] text-gray-400 block tracking-wider uppercase font-semibold">
            {testimonial.role}
          </span>
          <span className="inline-block mt-1 text-[9px] bg-secondary/10 text-secondary-dark px-2 py-0.5 uppercase tracking-widest font-bold border border-secondary/10">
            {testimonial.projectType}
          </span>
        </div>
      </div>
    </div>
  );
}
