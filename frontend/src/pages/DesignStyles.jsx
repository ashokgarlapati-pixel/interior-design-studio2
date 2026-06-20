import React from 'react';
import { stylesData } from '../data/styles';
import StyleCard from '../components/StyleCard';
import SEO from '../utils/seo';

export default function DesignStyles() {
  return (
    <div className="relative min-h-screen bg-background pt-24 pb-16">
      <SEO 
        title="Custom Architecture & Design Styles"
        description="Browse through the design styles offered by Aura & Co.: Minimalist, Contemporary, Modern, Traditional, Scandinavian, and bespoke custom designs."
        pageUrl="/styles"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-16">
        
        {/* Page Header */}
        <div className="text-center space-y-3">
          <span className="text-secondary tracking-[0.25em] text-xs font-semibold uppercase block">
            AESTHETIC TAXONOMY
          </span>
          <h1 className="text-4xl md:text-5xl font-light text-primary font-luxury">
            Design Styles
          </h1>
          <p className="text-gray-400 text-xs max-w-md mx-auto">
            From raw industrial lofts to opulent Mediterranean villas, we tailor structural scale and palettes to match your signature lifestyle.
          </p>
          <div className="w-16 h-[1px] bg-secondary mx-auto mt-4" />
        </div>

        {/* Styles Grid */}
        <div className="grid grid-cols-1 gap-12">
          {stylesData.map((styleItem) => (
            <StyleCard key={styleItem.id} styleItem={styleItem} />
          ))}
        </div>

        {/* Footnote */}
        <section className="bg-primary text-white p-8 border border-secondary/15 text-center max-w-4xl mx-auto space-y-4">
          <h3 className="text-xl font-light font-luxury text-secondary">
            Not Sure Which Style Fits Your Footprint?
          </h3>
          <p className="text-xs text-gray-400 max-w-xl mx-auto leading-relaxed">
            Our principal designers are experts at hybrid styling—blending minimalist cabinets with luxury brass trims, or modern lighting arrays into classical traditional ceilings. We create custom styles matching your unique preferences.
          </p>
          <div className="pt-2">
            <a
              href="/contact"
              className="inline-block border border-secondary text-secondary hover:bg-secondary hover:text-primary px-6 py-2.5 text-[10px] tracking-widest font-semibold uppercase transition-luxe"
            >
              Discuss Your Style Preferences
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}
