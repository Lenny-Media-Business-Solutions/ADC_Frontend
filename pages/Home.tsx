import React, { useState, useEffect } from 'react';
import {
  Users,
  Globe,
  Target,
  ShieldCheck,
  Sprout,
  MessageCircle,
  CloudRain,
  ChevronRight,
  Quote,
  Image as ImageIcon
} from 'lucide-react';
import { PageTransition, FadeIn } from '../components/animations';

const HERO_IMAGES = [
  "https://res.cloudinary.com/ddwtrkhss/image/upload/v1769690931/home_tayaig.jpg",
  "https://res.cloudinary.com/ddwtrkhss/image/upload/v1769755694/carousel2_zty2nn.jpg",
  "https://res.cloudinary.com/ddwtrkhss/image/upload/v1769755772/corn_qhp6fv.jpg"
];

export const Home: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const navigate = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    window.location.hash = href;
  };

  return (
    <PageTransition>
      <div className="flex flex-col w-full savanna-pattern">
        <section className="relative min-h-[90vh] w-full overflow-hidden flex items-center bg-earth-900">
          <div className="absolute inset-0 z-0">
            {HERO_IMAGES.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`South Sudan Landscape ${index + 1}`}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                  }`}
              />
            ))}
            {/* Green Overlay - Balanced Transparency */}
            <div className="absolute inset-0 bg-earth-900/50" />
            <div className="absolute inset-0 bg-gradient-to-t from-earth-900/80 via-transparent to-transparent opacity-60" />
          </div>

          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-32 text-center flex flex-col items-center">
            <div className="max-w-5xl animate-fade-up flex flex-col items-center">
              <div className="flex items-center gap-4 mb-10">
                <span className="h-[2px] w-8 sm:w-16 bg-savanna-500" />
                <span className="text-savanna-400 font-black uppercase tracking-[0.4em] text-[9px] md:text-xs">
                  Empowering South Sudan
                </span>
                <span className="h-[2px] w-8 sm:w-16 bg-savanna-500" />
              </div>

              <h1 className="font-serif leading-tight mb-10 tracking-tighter text-[clamp(1.75rem,7vw,5rem)] text-white max-w-4xl mx-auto px-4">
                Agropastoralists Development Consortium
              </h1>

              <p className="text-lg md:text-2xl text-earth-100/90 mb-14 leading-relaxed max-w-3xl font-light mx-auto">
                Fostering peaceful coexistence and resilient livelihoods across South Sudan's arid lands through community-led agricultural development.
              </p>

              <div className="flex flex-wrap gap-6 justify-center">
                <button onClick={(e) => navigate(e, '#/about')} className="px-10 py-5 bg-savanna-500 text-white rounded-full font-black text-lg shadow-[0_20px_40px_-10px_rgba(249,115,22,0.4)] hover:scale-110 transition-all active:scale-95">
                  Our Mission
                </button>
                <button onClick={(e) => navigate(e, '#/impact')} className="px-10 py-5 bg-white/10 backdrop-blur-md text-white rounded-full font-black text-lg shadow-lg hover:bg-white hover:text-earth-900 hover:scale-105 transition-all active:scale-95 border-2 border-white/30 hover:border-white">
                  See Our Impact
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Impact Snapshot Section */}
        <section className="relative z-20 -mt-20 pb-24 px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: 'Farmers Trained', value: '2,000+', desc: 'Smallholder farmers and pastoral households trained in climate-smart agriculture, crop production, livestock management, and sustainable livelihood practices.' },
                { title: 'Tree Seedlings Planted', value: '5,000+', desc: 'Tree seedlings distributed and planted through community-led environmental restoration and climate resilience initiatives.' },
                { title: 'Villages Reached', value: '5+', desc: 'Rural villages supported through peacebuilding, livelihood recovery, and community development programs promoting coexistence.' },
              ].map((stat, idx) => (
                <FadeIn key={idx} delay={idx * 0.15}>
                  <div
                    onClick={(e) => navigate(e, '#/impact')}
                    className="bg-white rounded-[2.5rem] p-10 shadow-xl shadow-earth-900/10 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer group border border-earth-100"
                  >
                    <div className="mb-6 flex items-baseline gap-2">
                      <h3 className="text-5xl font-serif font-black text-savanna-500 group-hover:scale-110 transition-transform origin-left">{stat.value}</h3>
                    </div>
                    <h4 className="text-xl font-bold text-earth-900 uppercase tracking-tight mb-4">{stat.title}</h4>
                    <p className="text-earth-600 leading-relaxed text-sm font-light">
                      {stat.desc}
                    </p>
                    <div className="mt-8 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-savanna-600 group-hover:text-savanna-500 transition-colors">
                      View Impact <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        <section className="relative py-24 md:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <FadeIn>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
                <div className="lg:col-span-5 relative">
                  <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl h-[500px] bg-earth-100 flex flex-col items-center justify-center text-earth-300">
                    <img
                      src="https://res.cloudinary.com/ddwtrkhss/image/upload/v1769686281/harmony_pqcbss.jpg"
                      alt="South Sudan Community"
                      className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-earth-900/80 via-transparent to-transparent" />
                    <div className="absolute bottom-10 left-10 right-10 text-white">
                      <Quote className="text-savanna-500 mb-4 w-8 h-8" />
                      <p className="text-2xl font-serif italic mb-4 leading-tight">"Harmony with the environment brings prosperity."</p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-7">
                  <div className="mb-10">
                    <h2 className="text-4xl md:text-6xl font-serif text-earth-900 mb-8 leading-tight tracking-tighter">
                      Sustainable <span className="text-gradient">Growth in South Sudan</span>
                    </h2>
                    <div className="space-y-6 text-earth-600 text-xl leading-relaxed font-light">
                      <p>
                        From oxen-driven plowing in Bahr el Ghazal to okra harvests in Central Equatoria, ADC supports South Sudanese smallholder farmers.
                      </p>
                      <p>
                        Our integrated approach combines traditional knowledge with modern technical training to build lasting resilience.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};