import React, { useState, useRef, useEffect } from 'react';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi';

export default function BeforeAfter({ beforeImage, afterImage, beforeLabel = "Before Renovation", afterLabel = "After Renovation" }) {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage (0-100)
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    if (e.touches && e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  useEffect(() => {
    const handleMouseUp = () => setIsDragging(false);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[350px] md:h-[450px] lg:h-[550px] overflow-hidden select-none cursor-ew-resize border border-secondary/15"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseDown={() => setIsDragging(true)}
      onTouchStart={() => setIsDragging(true)}
    >
      {/* Before Image (Background) */}
      <img 
        src={beforeImage} 
        alt="Before" 
        className="absolute inset-0 w-full h-full object-cover"
        draggable="false"
      />
      <div className="absolute bottom-4 left-4 bg-primary/90 text-white border border-secondary/35 text-[10px] tracking-widest uppercase font-semibold px-3 py-1 shadow-md">
        {beforeLabel}
      </div>

      {/* After Image (Overlay, clipped dynamically) */}
      <img 
        src={afterImage} 
        alt="After" 
        className="absolute inset-0 w-full h-full object-cover"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        draggable="false"
      />
      <div 
        className="absolute bottom-4 right-4 bg-secondary text-primary font-bold text-[10px] tracking-widest uppercase px-3 py-1 shadow-md"
        style={{ opacity: sliderPosition < 90 ? 1 : 0, transition: 'opacity 0.2s' }}
      >
        {afterLabel}
      </div>

      {/* Divider Bar */}
      <div 
        className="absolute top-0 bottom-0 w-[2px] bg-secondary z-30"
        style={{ left: `${sliderPosition}%` }}
      >
        {/* Slider Handle */}
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-primary border-2 border-secondary text-secondary flex items-center justify-center slider-handle-shadow cursor-pointer transition-transform duration-200 hover:scale-110 active:scale-95 z-40">
          <div className="flex space-x-[2px] text-white">
            <HiOutlineChevronLeft size={16} className="text-secondary" />
            <HiOutlineChevronRight size={16} className="text-secondary" />
          </div>
        </div>
      </div>

      {/* Subtle Drag Prompt Overlay */}
      <div className="absolute inset-0 bg-transparent flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="bg-primary/80 border border-secondary text-white text-xs tracking-widest px-4 py-2 font-medium">
          DRAG TO COMPARE
        </span>
      </div>
    </div>
  );
}
