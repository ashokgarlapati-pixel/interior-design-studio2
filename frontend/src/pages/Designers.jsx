import React from 'react';
import { designersData } from '../data/designers';
import DesignerCard from '../components/DesignerCard';
import { HiOutlineShieldCheck, HiOutlineSparkles, HiOutlineCheckCircle } from 'react-icons/hi';
import SEO from '../utils/seo';

export default function Designers() {
  const credentialsList = [
    {
      title: "NCIDQ Certification",
      desc: "The premier global standard in professional interior design practice and public safety compliance."
    },
    {
      title: "AIA Registered Architects",
      desc: "Licensed structural architects overseeing layouts, partition framing, and elevation compliance."
    },
    {
      title: "LEED AP / WELL AP",
      desc: "Accredited energy efficiency and biophilic design experts optimizing air flow, insulation, and healthy materials."
    }
  ];

  return (
    <div className="relative min-h-screen bg-background pt-24 pb-16">
      <SEO 
        title="Meet Our Principal Designers & Architects"
        description="Learn about Aura & Co.'s award-winning design leadership. Meet Victoria Kensington, Marcus Vance, and Aria Thorne."
        pageUrl="/designers"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 space-y-16">
        
        {/* Page Header */}
        <div className="text-center space-y-3">
          <span className="text-secondary tracking-[0.25em] text-xs font-semibold uppercase block">
            CREATIVE LEADERSHIP
          </span>
          <h1 className="text-4xl md:text-5xl font-light text-primary font-luxury">
            Meet the Designers
          </h1>
          <p className="text-gray-400 text-xs max-w-md mx-auto">
            A collaborative team of licensed architects, spatial engineers, and bespoke stylists dedicated to detail execution.
          </p>
          <div className="w-16 h-[1px] bg-secondary mx-auto mt-4" />
        </div>

        {/* Designers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {designersData.map((designer) => (
            <DesignerCard key={designer.id} designer={designer} />
          ))}
        </div>

        {/* Credentials and Professional Standards */}
        <section className="bg-white p-8 md:p-12 border border-gray-150 shadow-sm space-y-8">
          <div className="text-center space-y-2">
            <span className="text-secondary text-[10px] tracking-[0.2em] font-semibold uppercase block">
              Professional Standards
            </span>
            <h2 className="text-2xl font-light text-primary font-luxury">
              Licensed Compliance &amp; Accreditations
            </h2>
            <div className="w-10 h-[1.5px] bg-secondary mx-auto mt-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            {credentialsList.map((cred, idx) => (
              <div key={idx} className="bg-background border border-gray-200 p-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-secondary">
                    <HiOutlineShieldCheck size={22} />
                    <h3 className="text-sm font-bold text-primary tracking-wide">
                      {cred.title}
                    </h3>
                  </div>
                  <p className="text-gray-500 text-xs leading-relaxed">
                    {cred.desc}
                  </p>
                </div>
                
                <div className="flex items-center text-[10px] text-secondary font-bold uppercase tracking-widest pt-6 space-x-1">
                  <HiOutlineCheckCircle size={14} />
                  <span>Enforced Standard</span>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
