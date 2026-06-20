import React from 'react';
import ConsultationForm from '../components/ConsultationForm';
import { HiOutlineLocationMarker, HiOutlinePhone, HiOutlineMail, HiOutlineClock } from 'react-icons/hi';
import SEO from '../utils/seo';

export default function Contact() {
  const contactDetails = [
    {
      icon: <HiOutlineLocationMarker size={20} className="text-secondary" />,
      label: "Design Studio Address",
      content: "8420 Wilshire Blvd, Beverly Hills, CA 90211"
    },
    {
      icon: <HiOutlinePhone size={20} className="text-secondary" />,
      label: "Direct Inquiries",
      content: "+1 (310) 555-0199"
    },
    {
      icon: <HiOutlineMail size={20} className="text-secondary" />,
      label: "Secure Email",
      content: "inquire@auradesignstudio.com"
    },
    {
      icon: <HiOutlineClock size={20} className="text-secondary" />,
      label: "Opening Schedule",
      content: "Mon - Fri: 9:00 AM - 6:00 PM EST"
    }
  ];

  return (
    <div className="relative min-h-screen bg-background pt-24 pb-16">
      <SEO 
        title="Request a Private Consultation"
        description="Book a consultation request with Aura & Co. Fill out our briefing profile with your project details, budget range, and preferred design style."
        pageUrl="/contact"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-16">
        
        {/* Page Header */}
        <div className="text-center space-y-3">
          <span className="text-secondary tracking-[0.25em] text-xs font-semibold uppercase block">
            SECURE BRIEFING REQUEST
          </span>
          <h1 className="text-4xl md:text-5xl font-light text-primary font-luxury">
            Contact Our Studio
          </h1>
          <p className="text-gray-400 text-xs max-w-md mx-auto">
            Ready to remodel your residential villa, office, or dining lounge? Fill out our design briefing form to receive a prompt reply.
          </p>
          <div className="w-16 h-[1px] bg-secondary mx-auto mt-4" />
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left: Info Cards & Mock Map */}
          <div className="lg:col-span-5 space-y-8 h-full">
            
            {/* Contact cards */}
            <div className="bg-white border border-gray-150 p-6 md:p-8 shadow-xs space-y-6">
              <h2 className="text-xl font-light text-primary font-luxury tracking-wide border-b border-gray-100 pb-3">
                Headquarters Office
              </h2>
              
              <div className="space-y-4">
                {contactDetails.map((detail, idx) => (
                  <div key={idx} className="flex items-start space-x-4">
                    <div className="bg-background p-3 border border-secondary/15 flex-shrink-0">
                      {detail.icon}
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 tracking-wider uppercase font-semibold block">
                        {detail.label}
                      </span>
                      <p className="text-xs font-medium text-primary mt-0.5">
                        {detail.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stylized Vector Map Mockup (Luxury styling) */}
            <div className="relative bg-primary overflow-hidden h-[250px] border border-secondary/15 shadow-sm flex items-center justify-center text-center px-8">
              {/* Decorative radial gradients to simulate a modern HUD/Map overlay */}
              <div className="absolute inset-0 bg-cover bg-center opacity-30 select-none pointer-events-none" 
                   style={{ backgroundImage: `url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=600&q=80')` }} 
              />
              <div className="absolute inset-0 bg-radial-gradient from-transparent to-primary/80" />
              
              {/* Map Accent Lines */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                <div className="w-16 h-16 rounded-full border border-secondary/40 animate-ping absolute top-0 left-0" />
                <div className="w-4 h-4 rounded-full bg-secondary border-2 border-white relative z-10" />
              </div>

              <div className="relative z-10 space-y-2 text-white">
                <span className="text-secondary font-bold text-[9px] tracking-widest uppercase block">
                  Aura &amp; Co. Location Map
                </span>
                <h3 className="text-base font-light font-luxury">
                  Beverly Hills HQ
                </h3>
                <span className="text-[10px] text-gray-400 block max-w-xs leading-relaxed">
                  Valet parking available for scheduled consultation appointments.
                </span>
              </div>
            </div>

          </div>

          {/* Right: Consultation Form */}
          <div className="lg:col-span-7">
            <ConsultationForm />
          </div>

        </div>

      </div>
    </div>
  );
}
