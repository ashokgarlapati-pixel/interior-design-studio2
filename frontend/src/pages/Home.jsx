import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import ProjectCard from '../components/ProjectCard';
import TestimonialCard from '../components/TestimonialCard';
import { projectsData } from '../data/projects';
import { testimonialsData } from '../data/testimonials';
import { HiOutlineArrowRight, HiOutlineClock, HiOutlineClipboardCheck, HiOutlineColorSwatch, HiOutlineHome } from 'react-icons/hi';
import SEO from '../utils/seo';

export default function Home() {
  // Select top 3 projects to showcase on Home
  const featuredProjects = projectsData.slice(0, 3);
  
  // Select 2 testimonials to preview
  const previewTestimonials = testimonialsData.slice(0, 2);

  const timelineSteps = [
    {
      id: "01",
      icon: <HiOutlineClipboardCheck size={28} />,
      title: "Initial Consultation",
      subtitle: "Discovering Your Vision",
      desc: "We discuss your functional needs, layout desires, style affinities, and aesthetic vision during a detailed personal briefing session."
    },
    {
      id: "02",
      icon: <HiOutlineHome size={28} />,
      title: "Concept & Planning",
      subtitle: "3D Layout Renderings",
      desc: "Our architects sketch preliminary layouts and render interactive 3D visualizations, aligning spatial volume with light."
    },
    {
      id: "03",
      icon: <HiOutlineColorSwatch size={28} />,
      title: "Materialization",
      subtitle: "Sourcing Bespoke Elements",
      desc: "We accompany you in hand-selecting bookmatched marbles, customized textiles, bespoke joinery finishes, and metal trims."
    },
    {
      id: "04",
      icon: <HiOutlineClock size={28} />,
      title: "Execution & Oversight",
      subtitle: "Absolute Turnkey Handover",
      desc: "We provide full architectural oversight, working with master artisans to construct and curate your space down to the final pillow."
    }
  ];

  return (
    <div className="relative min-h-screen bg-background">
      <SEO 
        title="Bespoke Architecture & Premium Design"
        description="Welcome to Aura & Co. Luxury Interior Design Studio. Discover our award-winning projects, custom villa renovations, and elite design process."
        pageUrl="/"
      />
      
      {/* Hero Section */}
      <Hero />

      {/* Studio Introduction */}
      <section className="py-20 md:py-28 max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <span className="text-secondary tracking-[0.25em] text-xs font-semibold uppercase block">
            ESTABLISHED IN 2008
          </span>
          <h2 className="text-4xl md:text-5xl font-light text-primary tracking-wide leading-tight font-luxury">
            Sculpting Space, <br />
            <span className="italic font-normal font-luxury text-secondary">Refining Luxury</span>
          </h2>
          <div className="w-16 h-[2px] bg-secondary" />
          <p className="text-gray-600 text-sm leading-relaxed font-sans">
            At Aura &amp; Co., we believe a space is not merely shelter—it is the ultimate expression of identity. Our philosophy revolves around raw geometry, structural integrity, and the selection of custom high-end materials. 
          </p>
          <p className="text-gray-500 text-xs leading-relaxed font-sans">
            Every marble vein, hand-rubbed brass finish, and concealed cabinet is planned from inception. By bridging architectural disciplines and custom carpentry, we deliver turnkey designs that are both functional and artistic masterpieces.
          </p>
          <div className="pt-4">
            <Link
              to="/about"
              className="inline-flex items-center space-x-2 text-primary font-bold text-xs uppercase tracking-widest border-b-2 border-secondary pb-1 hover:text-secondary hover:border-primary transition-all duration-300"
            >
              <span>Explore Our History</span>
              <HiOutlineArrowRight size={14} />
            </Link>
          </div>
        </motion.div>
        
        {/* Multi-image layout with overlapping gold boarders */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative grid grid-cols-12 gap-4"
        >
          <div className="col-span-8 overflow-hidden border border-secondary/15">
            <img 
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=700&q=80" 
              alt="Luxury Living Room" 
              className="w-full object-cover aspect-[4/3] hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          </div>
          <div className="col-span-4 self-end overflow-hidden border border-secondary/15 transform translate-y-8">
            <img 
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=400&q=80" 
              alt="Bespoke Materials" 
              className="w-full object-cover aspect-[3/4] hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          </div>
          {/* Accent Gold Frame */}
          <div className="absolute -inset-4 border border-secondary/20 pointer-events-none -z-10 translate-x-4 translate-y-4" />
        </motion.div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 md:py-24 bg-primary text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-12 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div className="space-y-3">
              <span className="text-secondary tracking-[0.25em] text-xs font-semibold uppercase block">
                Exclusive Portfolios
              </span>
              <h2 className="text-3xl md:text-5xl font-light tracking-wide font-luxury">
                Featured Creations
              </h2>
              <div className="w-12 h-[1px] bg-secondary" />
            </div>
            <Link
              to="/portfolio"
              className="text-secondary hover:text-white border border-secondary/40 hover:border-white px-6 py-2.5 text-xs font-semibold uppercase tracking-widest transition-luxe"
            >
              View Full Gallery
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
            {featuredProjects.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                onClick={() => window.location.href = `/portfolio?id=${project.id}`}
              />
            ))}
          </div>
        </div>
        
        {/* Subtle background graphics */}
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-secondary/5 blur-[120px] pointer-events-none" />
      </section>

      {/* Design Process Timeline */}
      <section className="py-20 md:py-28 bg-[#F8F8F8] max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
          <span className="text-secondary tracking-[0.2em] text-[10px] font-semibold uppercase block">
            The Golden Ratio Journey
          </span>
          <h2 className="text-3xl md:text-4xl font-light text-primary font-luxury">
            Our Architectural Process
          </h2>
          <div className="w-12 h-[1px] bg-secondary mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {timelineSteps.map((step, idx) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="bg-white border border-gray-150 p-8 shadow-sm hover:shadow-lg transition-shadow duration-300 relative group"
            >
              {/* Step counter */}
              <span className="absolute top-4 right-6 text-gray-100 font-luxury font-bold text-5xl group-hover:text-secondary/10 transition-colors duration-300">
                {step.id}
              </span>
              
              {/* Icon */}
              <div className="text-secondary bg-background w-14 h-14 rounded-full flex items-center justify-center border border-secondary/15 mb-6 group-hover:gold-gradient-bg group-hover:text-primary transition-all duration-300 shadow-sm">
                {step.icon}
              </div>

              <span className="text-secondary text-[9px] tracking-widest font-bold uppercase block mb-1">
                {step.subtitle}
              </span>
              <h3 className="text-lg font-semibold text-primary font-luxury mb-3 group-hover:text-secondary transition-colors">
                {step.title}
              </h3>
              <p className="text-gray-500 text-xs leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Preview */}
      <section className="py-20 bg-primary text-white overflow-hidden border-t border-secondary/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-xl mx-auto space-y-3">
            <span className="text-secondary tracking-[0.2em] text-[10px] font-semibold uppercase block">
              Satisfied Clients
            </span>
            <h2 className="text-3xl md:text-4xl font-light font-luxury">
              Refined Testimonials
            </h2>
            <div className="w-12 h-[1px] bg-secondary mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {previewTestimonials.map((testimonial) => (
              <div key={testimonial.id} className="text-primary">
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </div>

          <div className="text-center pt-4">
            <Link
              to="/testimonials"
              className="text-secondary hover:text-white border-b-2 border-secondary hover:border-white pb-1 text-xs font-semibold uppercase tracking-widest transition-colors"
            >
              Read More Client Reviews
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Summary CTA */}
      <section className="py-20 md:py-28 relative overflow-hidden bg-white max-w-7xl mx-auto px-6 lg:px-8 border-b border-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-8 space-y-4">
            <span className="text-secondary tracking-[0.2em] text-xs font-semibold uppercase block">
              HAVE A DESIGN ASPIRATION?
            </span>
            <h2 className="text-3xl md:text-5xl font-light text-primary font-luxury leading-tight">
              Let's Create A Masterpiece <br />
              <span className="italic font-normal font-luxury text-secondary">Of Your Next Space</span>
            </h2>
            <p className="text-gray-500 text-sm max-w-xl leading-relaxed">
              Schedule an exclusive design consultation. Our architects and planners are prepared to sketch out initial layouts and guide your material selections.
            </p>
          </div>

          <div className="lg:col-span-4 flex justify-start lg:justify-end">
            <Link
              to="/contact"
              className="gold-gradient-bg text-primary font-bold text-sm tracking-widest uppercase px-10 py-5 shadow-lg shadow-secondary/15 hover:shadow-secondary/30 transition-luxe"
            >
              Book Briefing Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
