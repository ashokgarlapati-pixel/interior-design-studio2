import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { projectsData } from '../data/projects';
import ProjectCard from '../components/ProjectCard';
import BeforeAfter from '../components/BeforeAfter';
import { HiOutlineSearch, HiX, HiOutlineLocationMarker, HiOutlineCalendar, HiOutlineUser, HiOutlineArrowsExpand, HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import SEO from '../utils/seo';

export default function Portfolio() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  
  // Before-After comparison selection
  const [beforeAfterIdx, setBeforeAfterIdx] = useState(0); // 0 = Penthouse, 1 = Coastal Breeze
  
  // Inner modal carousel image index
  const [activeModalImgIdx, setActiveModalImgIdx] = useState(0);

  const beforeAfterProjects = projectsData.filter(p => p.beforeImage && p.afterImage);
  const categories = ['All', 'Residential', 'Commercial', 'Office', 'Luxury Villa', 'Apartment', 'Restaurant'];

  // Handle URL query parameters if navigating from Home featured links
  useEffect(() => {
    const idParam = searchParams.get('id');
    if (idParam) {
      const proj = projectsData.find(p => p.id === parseInt(idParam, 10));
      if (proj) {
        setSelectedProject(proj);
        setActiveModalImgIdx(0);
      }
    }
  }, [searchParams]);

  // Filter logic
  const filteredProjects = projectsData.filter((project) => {
    const matchesCategory = activeCategory === 'All' || project.category === activeCategory;
    const matchesSearch = 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleOpenModal = (project) => {
    setSelectedProject(project);
    setActiveModalImgIdx(0);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
    setSearchParams({}); // Clear query parameters
  };

  const nextModalImg = (images) => {
    setActiveModalImgIdx((prev) => (prev + 1) % images.length);
  };

  const prevModalImg = (images) => {
    setActiveModalImgIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative min-h-screen bg-background pt-24 pb-16">
      <SEO 
        title="Featured Portfolios & Renovations"
        description="Filter and search through our award-winning architectural designs, commercial lounges, and residential villa transformations."
        pageUrl="/portfolio"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-16">
        
        {/* Page Title */}
        <div className="text-center space-y-3">
          <span className="text-secondary tracking-[0.25em] text-xs font-semibold uppercase block">
            OUR COMPLETED SPACES
          </span>
          <h1 className="text-4xl md:text-5xl font-light text-primary font-luxury">
            Exquisite Design Gallery
          </h1>
          <div className="w-16 h-[1px] bg-secondary mx-auto mt-4" />
        </div>

        {/* Before/After Renovations Section */}
        <section className="bg-white p-6 md:p-8 border border-gray-150 shadow-sm space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-100 pb-4">
            <div>
              <h2 className="text-xl md:text-2xl font-light text-primary font-luxury">
                Renovation Showcases
              </h2>
              <p className="text-gray-400 text-xs mt-1">
                Drag the gold slider handle to compare structural raw state and the completed luxury layout.
              </p>
            </div>
            
            {/* Project Tabs */}
            <div className="flex space-x-2">
              {beforeAfterProjects.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => setBeforeAfterIdx(idx)}
                  className={`text-[10px] tracking-widest uppercase font-semibold px-4 py-2 border transition-luxe ${
                    beforeAfterIdx === idx 
                      ? 'bg-primary text-secondary border-secondary' 
                      : 'bg-background text-gray-500 border-gray-200 hover:text-primary hover:border-gray-300'
                  }`}
                >
                  {p.title}
                </button>
              ))}
            </div>
          </div>

          <div className="w-full">
            <BeforeAfter 
              beforeImage={beforeAfterProjects[beforeAfterIdx].beforeImage}
              afterImage={beforeAfterProjects[beforeAfterIdx].afterImage}
              beforeLabel={`Pre-Redesign [${beforeAfterProjects[beforeAfterIdx].location}]`}
              afterLabel={`Refined Style [${beforeAfterProjects[beforeAfterIdx].category}]`}
            />
          </div>
        </section>

        {/* Filters and Search Dashboard */}
        <section className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 bg-white p-6 border border-gray-150 shadow-xs">
          
          {/* Categories Tab Selector */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-[10px] tracking-widest uppercase font-semibold px-4 py-2 border transition-luxe ${
                  activeCategory === cat
                    ? 'bg-secondary text-primary border-secondary font-bold'
                    : 'bg-transparent text-gray-400 border-gray-200 hover:text-primary hover:border-gray-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full lg:w-80">
            <input
              type="text"
              placeholder="Search by title or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-background border border-gray-200 focus:border-secondary outline-none pl-10 pr-4 py-2 text-xs transition-colors"
            />
            <HiOutlineSearch className="absolute left-3.5 top-3 text-gray-400" size={16} />
          </div>
        </section>

        {/* Gallery Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => handleOpenModal(project)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Zero Results Handle */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20 bg-white border border-gray-150">
            <p className="text-gray-400 text-sm italic">
              No creations found matching your filter parameters.
            </p>
          </div>
        )}

      </div>

      {/* Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="absolute inset-0 bg-primary-dark/85 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ duration: 0.4 }}
              className="relative w-full max-w-5xl bg-white shadow-2xl border border-secondary/20 z-10 grid grid-cols-1 lg:grid-cols-12 max-h-[90vh] overflow-y-auto lg:overflow-hidden rounded-none"
            >
              
              {/* Close Button */}
              <button 
                onClick={handleCloseModal}
                className="absolute top-4 right-4 bg-primary text-white hover:text-secondary p-2 transition-colors z-20"
                aria-label="Close modal"
              >
                <HiX size={20} />
              </button>

              {/* Left Column: Image Slideshow */}
              <div className="lg:col-span-7 relative h-[350px] lg:h-full bg-primary-dark flex items-center justify-center overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeModalImgIdx}
                    src={selectedProject.images[activeModalImgIdx]}
                    alt={`${selectedProject.title} view ${activeModalImgIdx}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>

                {/* Navigation arrows (only if multiple images) */}
                {selectedProject.images.length > 1 && (
                  <>
                    <button
                      onClick={() => prevModalImg(selectedProject.images)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-secondary text-white hover:text-primary p-2 transition-colors z-10"
                    >
                      <HiChevronLeft size={20} />
                    </button>
                    <button
                      onClick={() => nextModalImg(selectedProject.images)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-secondary text-white hover:text-primary p-2 transition-colors z-10"
                    >
                      <HiChevronRight size={20} />
                    </button>
                    
                    {/* Carousel Indicators */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-1.5 z-10">
                      {selectedProject.images.map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            activeModalImgIdx === i ? 'bg-secondary' : 'bg-white/40'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Right Column: Descriptions & Details */}
              <div className="lg:col-span-5 p-8 flex flex-col justify-between overflow-y-auto h-full">
                <div className="space-y-6">
                  <div>
                    <span className="text-secondary text-[10px] tracking-[0.2em] font-semibold uppercase block mb-1">
                      {selectedProject.category}
                    </span>
                    <h3 className="text-3xl font-light text-primary font-luxury leading-tight">
                      {selectedProject.title}
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 gap-4 border-y border-gray-100 py-4 text-xs">
                    <div className="flex items-center space-x-2">
                      <HiOutlineLocationMarker className="text-secondary" size={16} />
                      <div className="flex flex-col">
                        <span className="text-[10px] text-gray-400 uppercase tracking-widest">Location</span>
                        <span className="font-medium text-primary">{selectedProject.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <HiOutlineCalendar className="text-secondary" size={16} />
                      <div className="flex flex-col">
                        <span className="text-[10px] text-gray-400 uppercase tracking-widest">Completed</span>
                        <span className="font-medium text-primary">{selectedProject.year}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <HiOutlineUser className="text-secondary" size={16} />
                      <div className="flex flex-col">
                        <span className="text-[10px] text-gray-400 uppercase tracking-widest">Client</span>
                        <span className="font-medium text-primary">{selectedProject.client}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <HiOutlineArrowsExpand className="text-secondary" size={16} />
                      <div className="flex flex-col">
                        <span className="text-[10px] text-gray-400 uppercase tracking-widest">Dimensions</span>
                        <span className="font-medium text-primary">{selectedProject.area}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <span className="text-[9px] tracking-widest uppercase font-semibold text-gray-400 block mb-2">
                      Overview
                    </span>
                    <p className="text-gray-600 text-xs leading-relaxed">
                      {selectedProject.description}
                    </p>
                  </div>
                </div>

                <div className="pt-8">
                  <a
                    href="/contact"
                    className="w-full text-center block gold-gradient-bg text-primary font-bold text-xs tracking-widest uppercase py-3.5 shadow-md transition-luxe hover:opacity-90"
                  >
                    Discuss Similar Project
                  </a>
                </div>

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
