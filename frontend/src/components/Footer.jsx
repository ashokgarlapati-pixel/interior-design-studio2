import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaLinkedin, FaPinterest, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert('Thank you for subscribing to our newsletter!');
    e.target.reset();
  };

  return (
    <footer className="bg-primary text-gray-300 border-t border-secondary/20 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Column 1: Studio Details */}
        <div className="space-y-4">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-secondary text-2xl font-semibold tracking-widest font-luxury">
              AURA &amp; CO.
            </span>
            <span className="text-secondary text-xl">✦</span>
          </Link>
          <p className="text-sm text-gray-400 leading-relaxed">
            Crafting bespoke interiors that define modern luxury. We blend structural architecture with rich materiality to shape elite environments.
          </p>
          <div className="flex space-x-4 pt-2">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-secondary transition-colors" aria-label="Instagram">
              <FaInstagram size={20} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-secondary transition-colors" aria-label="LinkedIn">
              <FaLinkedin size={20} />
            </a>
            <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-secondary transition-colors" aria-label="Pinterest">
              <FaPinterest size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-secondary transition-colors" aria-label="Twitter">
              <FaTwitter size={20} />
            </a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-white text-sm font-semibold tracking-widest uppercase mb-4 border-l-2 border-secondary pl-3">
            Quick Navigation
          </h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-secondary transition-colors">Our Studio</Link></li>
            <li><Link to="/portfolio" className="hover:text-secondary transition-colors">Featured Portfolio</Link></li>
            <li><Link to="/styles" className="hover:text-secondary transition-colors">Design Styles</Link></li>
            <li><Link to="/designers" className="hover:text-secondary transition-colors">Our Team</Link></li>
            <li><Link to="/testimonials" className="hover:text-secondary transition-colors">Client Reviews</Link></li>
            <li><Link to="/contact" className="hover:text-secondary transition-colors">Consultations</Link></li>
          </ul>
        </div>

        {/* Column 3: Contact Info */}
        <div>
          <h3 className="text-white text-sm font-semibold tracking-widest uppercase mb-4 border-l-2 border-secondary pl-3">
            Contact Details
          </h3>
          <ul className="space-y-3 text-sm text-gray-400">
            <li>
              <span className="block text-white font-medium">Headquarters:</span>
              8420 Wilshire Blvd, Beverly Hills, CA 90211
            </li>
            <li>
              <span className="block text-white font-medium">Direct Phone:</span>
              +1 (310) 555-0199
            </li>
            <li>
              <span className="block text-white font-medium">General Inquiries:</span>
              inquire@auradesignstudio.com
            </li>
          </ul>
        </div>

        {/* Column 4: Newsletter */}
        <div className="space-y-4">
          <h3 className="text-white text-sm font-semibold tracking-widest uppercase mb-4 border-l-2 border-secondary pl-3">
            Exclusive Updates
          </h3>
          <p className="text-sm text-gray-400">
            Subscribe to receive portfolios, design insights, and private studio updates.
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col space-y-2">
            <input
              type="email"
              placeholder="Your email address"
              required
              className="bg-primary-dark/80 text-white placeholder-gray-500 border border-gray-700 focus:border-secondary outline-none px-4 py-2 text-sm transition-colors"
            />
            <button
              type="submit"
              className="gold-gradient-bg text-primary hover:opacity-90 font-semibold tracking-widest text-xs uppercase py-2 transition-all"
            >
              Subscribe
            </button>
          </form>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 space-y-4 md:space-y-0">
        <div>
          &copy; {currentYear} AURA &amp; CO. All Rights Reserved.
        </div>
        <div className="flex space-x-6">
          <Link to="/sitemap.xml" className="hover:text-secondary transition-colors" target="_blank">Sitemap</Link>
          <a href="#" className="hover:text-secondary transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-secondary transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
