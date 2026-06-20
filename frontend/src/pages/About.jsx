import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineLightBulb, HiOutlineStar, HiOutlineUserGroup, HiOutlineGlobe } from 'react-icons/hi';
import SEO from '../utils/seo';

export default function About() {
  const stats = [
    { number: "18+", label: "Years of Design Heritage" },
    { number: "150+", label: "Elite Estates Completed" },
    { number: "15+", label: "International Awards Won" },
    { number: "3", label: "Global Design Studios" }
  ];

  const philosophies = [
    {
      icon: <HiOutlineLightBulb size={24} />,
      title: "Visionary Spatial Design",
      desc: "We prioritize room scale, volume balance, and natural light lines before choosing a single piece of furniture, establishing structural beauty first."
    },
    {
      icon: <HiOutlineStar size={24} />,
      title: "Bespoke Material Selection",
      desc: "Our design consultants source custom bookmatched marble slabs, rare hand-finished hardwoods, and bespoke metal trimmings from global quarries."
    },
    {
      icon: <HiOutlineUserGroup size={24} />,
      title: "Artisanal Execution",
      desc: "We maintain close networks with veteran craftsmen, custom carpenters, and stone masons, ensuring every custom joint is built to perfection."
    },
    {
      icon: <HiOutlineGlobe size={24} />,
      title: "Sustainable Prestige",
      desc: "Bridging architectural biophilia and luxury design. We utilize eco-friendly insulation, heat-pump integrations, and natural air flow systems."
    }
  ];

  return (
    <div className="relative min-h-screen bg-background pt-24 pb-16">
      <SEO 
        title="Our Heritage & Philosophy"
        description="Learn about Aura & Co.'s heritage of luxury interior design, our key design philosophies, and our global office footprint."
        pageUrl="/about"
      />

      {/* Banner/Header */}
      <section className="relative h-[40vh] bg-primary text-white flex items-center justify-center overflow-hidden">
        {/* Background Image with overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1920&q=80')` }}
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 text-center space-y-4 px-6">
          <span className="text-secondary tracking-[0.35em] text-xs font-semibold uppercase block">
            Aura &amp; Co. Heritage
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light font-luxury tracking-wide">
            Our Studio Story
          </h1>
          <div className="w-16 h-[1.5px] bg-secondary mx-auto" />
        </div>
      </section>

      {/* Philosophy and Origin */}
      <section className="py-20 max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="space-y-6"
        >
          <span className="text-secondary tracking-[0.2em] text-xs font-semibold uppercase block">
            OUR GENESIS
          </span>
          <h2 className="text-3xl md:text-4xl font-light text-primary font-luxury">
            Decades of Sculpting <br />
            <span className="italic font-normal font-luxury text-secondary">Premium Interior Environments</span>
          </h2>
          <div className="w-12 h-[1px] bg-secondary" />
          <p className="text-gray-600 text-sm leading-relaxed">
            Founded in 2008 by Victoria Kensington, Aura &amp; Co. has grown from a boutique residential planning firm in Beverly Hills to a globally recognized brand spanning three metropolitan offices. We specialize in luxury residential upgrades, commercial client hosting spaces, and yacht interior styling.
          </p>
          <p className="text-gray-500 text-xs leading-relaxed">
            Our commitment is to eliminate compromises. We reject ordinary mass-production methods, preferring to commission bespoke elements individually for every client footprint. This ensures that your residential villa, office, or dining lounge represents a completely unique architectural imprint.
          </p>
        </motion.div>

        {/* Video or Static Showcase */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden border border-secondary/15 aspect-video md:aspect-[4/3] bg-gray-100"
        >
          <img
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80"
            alt="Design Studio"
            className="w-full h-full object-cover hover:scale-102 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute -inset-4 border border-secondary/20 pointer-events-none -z-10 translate-x-4 -translate-y-4" />
        </motion.div>
      </section>

      {/* Statistics Block */}
      <section className="bg-primary text-white py-16 border-y border-secondary/15 my-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((stat, idx) => (
            <div key={idx} className="space-y-2">
              <span className="text-4xl md:text-5xl font-light gold-gradient-text font-luxury block">
                {stat.number}
              </span>
              <span className="text-[10px] tracking-widest text-gray-400 font-semibold uppercase block">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Core Principles */}
      <section className="py-20 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
          <span className="text-secondary tracking-[0.2em] text-[10px] font-semibold uppercase block">
            AESTHETIC PILLARS
          </span>
          <h2 className="text-3xl md:text-4xl font-light text-primary font-luxury">
            Our Core Principles
          </h2>
          <div className="w-12 h-[1px] bg-secondary mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {philosophies.map((phil, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex items-start space-x-6 p-6 bg-white border border-gray-150 shadow-sm"
            >
              <div className="text-secondary bg-background p-4 border border-secondary/15 flex-shrink-0">
                {phil.icon}
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-primary font-luxury">
                  {phil.title}
                </h3>
                <p className="text-gray-500 text-xs leading-relaxed">
                  {phil.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA section linking to Designers */}
      <section className="py-16 text-center bg-white border border-gray-150 max-w-5xl mx-auto px-6 shadow-sm">
        <h3 className="text-2xl font-light text-primary font-luxury mb-4">
          Meet the Visionaries Behind the Scenes
        </h3>
        <p className="text-gray-500 text-sm max-w-xl mx-auto mb-6">
          Our team consists of NCIDQ-certified designers, registered architects, and project managers dedicated to absolute quality control.
        </p>
        <Link
          to="/designers"
          className="gold-gradient-bg text-primary font-bold text-xs tracking-widest uppercase px-8 py-3.5 shadow-md transition-luxe inline-block"
        >
          View Team Bios
        </Link>
      </section>
    </div>
  );
}
