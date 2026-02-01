import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, ChevronRight, Lock } from 'lucide-react';

export const Footer: React.FC = () => {
  const navigate = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    window.location.hash = href;
    window.scrollTo(0, 0);
  };

  return (
    <footer className="bg-earth-900 text-white pt-24 pb-12 savanna-pattern border-t border-earth-800">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-y-16 lg:gap-x-8 xl:gap-x-12 mb-20">
        <div className="lg:col-span-5 space-y-8">
          <div className="flex items-center gap-3">
            <img
              src="https://res.cloudinary.com/ddwtrkhss/image/upload/v1769681519/ADC_Logo_final_aana4a.png"
              alt="ADC Logo"
              className="w-16 h-16 object-contain"
            />
            <div className="min-w-0">
              <p className="font-black text-[10px] xs:text-xs sm:text-sm lg:text-base xl:text-lg leading-tight sm:whitespace-nowrap tracking-tighter">Agropastoralists Development Consortium</p>
              <p className="text-[10px] uppercase font-black tracking-[0.2em] text-savanna-500 mt-1">Empowering Resilience</p>
            </div>
          </div>
          <p className="text-earth-300 text-base leading-relaxed font-light">
            Dedicated to rights-based development and resilience in the fragile arid lands of South Sudan.
          </p>
          <div className="flex gap-4">
            {[Facebook, Twitter, Linkedin].map((Icon, idx) => (
              <a key={idx} href="#" className="w-10 h-10 rounded-full border border-earth-700 flex items-center justify-center hover:bg-savanna-500 hover:border-savanna-500 transition-all duration-300">
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2">
          <h4 className="font-serif text-2xl mb-8 text-savanna-400 font-black italic">Quick Links</h4>
          <ul className="space-y-4">
            {[
              { label: 'About Our NGO', href: '#/about' },
              { label: 'Thematic Programs', href: '#/programs' },
              { label: 'Latest Projects', href: '#/projects' },
              { label: 'Impact & Stories', href: '#/impact' },
              { label: 'Field Gallery', href: '#/gallery' },
            ].map((link) => (
              <li key={link.label}>
                <button
                  onClick={(e) => navigate(e, link.href)}
                  className="flex items-center gap-2 text-earth-400 hover:text-white transition-colors duration-200 group text-left font-bold text-sm"
                >
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform text-savanna-500" />
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h4 className="font-serif text-2xl mb-8 text-savanna-400 font-black italic">Our Programs</h4>
          <ul className="space-y-4">
            {[
              { label: 'Peace & Cohesion', href: '#/programs/peacebuilding' },
              { label: 'Sustainable Livelihoods', href: '#/programs/livelihoods' },
              { label: 'Governance & Accountability', href: '#/programs/governance' },
              { label: 'Climate Resilience', href: '#/programs/resilience' },
            ].map((link) => (
              <li key={link.label}>
                <button
                  onClick={(e) => navigate(e, link.href)}
                  className="flex items-center gap-2 text-earth-400 hover:text-white transition-colors duration-200 group text-left font-bold text-sm"
                >
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform text-savanna-500" />
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h4 className="font-serif text-2xl mb-8 text-savanna-400 font-black italic">Torit HQ</h4>
          <ul className="space-y-6">
            <li className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-earth-800 flex items-center justify-center flex-shrink-0 text-savanna-500 shadow-lg">
                <MapPin size={20} />
              </div>
              <span className="text-earth-300 text-sm leading-relaxed pt-1 font-medium italic">P.O Box Private Bag, Torit, Eastern Equatoria State, South Sudan</span>
            </li>
            <li className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-earth-800 flex items-center justify-center flex-shrink-0 text-savanna-500 shadow-lg">
                <Phone size={20} />
              </div>
              <span className="text-earth-300 text-sm leading-relaxed pt-2 font-bold">+211 917 317 472</span>
            </li>
            <li className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-earth-800 flex items-center justify-center flex-shrink-0 text-savanna-500 shadow-lg">
                <Mail size={20} />
              </div>
              <a
                href="mailto:agrodevcon@gmail.com"
                className="text-earth-300 text-sm leading-relaxed pt-2 font-bold hover:text-savanna-500 transition-colors"
              >
                agrodevcon@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-12 border-t border-earth-800 flex flex-col md:flex-row justify-between items-center text-sm text-earth-500 text-center md:text-left gap-6">
        <p className="font-medium italic">© {new Date().getFullYear()} Agropastoralists Development Consortium. All rights reserved.</p>
        <div className="flex flex-wrap justify-center gap-8 items-center">
          <button className="hover:text-white transition-colors font-black uppercase tracking-widest text-[10px]">Privacy Policy</button>
          <button className="hover:text-white transition-colors font-black uppercase tracking-widest text-[10px]">Terms of Service</button>
          <button
            onClick={(e) => navigate(e, '#/admin')}
            className="flex items-center gap-2 px-4 py-2 bg-earth-800 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-earth-700 hover:text-savanna-500 transition-all border border-earth-700"
          >
            <Lock size={12} /> Staff Portal
          </button>
        </div>
      </div>
    </footer>
  );
};