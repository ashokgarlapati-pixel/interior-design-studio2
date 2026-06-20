import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile nav on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Styles', path: '/styles' },
    { name: 'Designers', path: '/designers' },
    { name: 'Testimonials', path: '/testimonials' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'glass-nav py-4 shadow-lg' : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 group">
          <span className="text-secondary text-2xl font-semibold tracking-widest font-luxury group-hover:scale-105 transition-transform duration-300">
            AURA <span className="text-white font-sans font-light">&amp;</span> CO.
          </span>
          <span className="text-secondary text-xl animate-pulse">✦</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          <div className="flex space-x-6">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) => `text-sm font-medium tracking-widest uppercase transition-luxe relative py-2 ${
                  isActive 
                    ? 'text-secondary font-semibold' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {({ isActive }) => (
                  <>
                    {link.name}
                    {isActive && (
                      <motion.span 
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-0 w-full h-[2px] bg-secondary"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>
          
          <Link
            to="/contact"
            className="border border-secondary text-secondary hover:bg-secondary hover:text-primary px-6 py-2 text-xs font-semibold uppercase tracking-widest transition-luxe"
          >
            Consultation
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-white hover:text-secondary focus:outline-none transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden bg-primary-dark/95 border-b border-secondary/20 overflow-hidden"
          >
            <div className="px-6 py-8 space-y-4 flex flex-col items-center">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) => `text-base tracking-widest uppercase py-2 w-full text-center block ${
                    isActive ? 'text-secondary font-bold' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {link.name}
                </NavLink>
              ))}
              <div className="pt-4 w-full flex justify-center">
                <Link
                  to="/contact"
                  className="w-full text-center border border-secondary text-secondary hover:bg-secondary hover:text-primary px-6 py-3 text-sm font-semibold uppercase tracking-widest transition-luxe"
                >
                  Book Consultation
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
