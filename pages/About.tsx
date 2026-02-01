import React from 'react';
import { Target, Eye, ShieldCheck, CheckCircle2, Globe, Image as ImageIcon, History, Sparkles, Compass, Megaphone, Handshake, GraduationCap, Leaf, ArrowRight, Heart } from 'lucide-react';
import { PageTransition, FadeIn, SlideIn } from '../components/animations';

export const About: React.FC = () => {
  return (
    <PageTransition>
      <div className="pt-24 savanna-pattern">
        {/* Hero Section */}
        <div className="bg-earth-900 text-white py-32 md:py-48 relative overflow-hidden text-center">
          {/* Animated Background Depth Shapes */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-savanna-500/10 rounded-full blur-[120px] animate-pulse-slow"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-earth-700/20 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-30">
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-savanna-500/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-savanna-500/20 to-transparent"></div>
            </div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
            <FadeIn>
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-savanna-500/10 border border-savanna-500/30 text-savanna-500 text-[10px] font-black uppercase tracking-[0.4em] mb-8">
                <Sparkles size={12} /> Since 2020
              </div>
            </FadeIn>

            <SlideIn direction="up" duration={0.8}>
              <h1 className="font-serif mb-10 tracking-tighter leading-none text-[clamp(24px,6vw,52px)] overflow-visible max-w-4xl mx-auto">
                Agropastoralists Development Consortium
              </h1>
            </SlideIn>

            <FadeIn delay={0.2} duration={0.8}>
              <p className="text-xl md:text-3xl text-earth-100 max-w-4xl mx-auto leading-relaxed font-light opacity-90 mb-12">
                A humanitarian organization dedicated to bridging development gaps for agropastoralist and pastoralist communities.
              </p>
            </FadeIn>

            <FadeIn delay={0.4} duration={0.8}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <button
                  onClick={() => window.location.hash = '#/impact'}
                  className="group flex items-center gap-2 bg-savanna-500 text-white px-8 py-4 rounded-full font-black text-sm uppercase tracking-widest shadow-xl shadow-savanna-500/20 hover:bg-savanna-600 transition-all hover:scale-105"
                >
                  Discover Our Impact
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => window.location.hash = '#/volunteer'}
                  className="group flex items-center gap-2 bg-white/5 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-full font-black text-sm uppercase tracking-widest hover:bg-white/10 transition-all hover:scale-105"
                >
                  <Heart size={18} className="text-savanna-500 group-hover:scale-110 transition-transform" />
                  Get Involved
                </button>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Background Section */}
        <section className="py-24 bg-white" id="background">
          <FadeIn>
            <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
              <div className="w-16 h-16 bg-savanna-500 text-white rounded-2xl flex items-center justify-center shadow-xl mb-12 mx-auto">
                <History size={32} />
              </div>
              <h2 className="text-4xl md:text-5xl font-serif text-earth-900 mb-12 tracking-tight">Our <span className="text-gradient italic">Background</span></h2>
              <div className="space-y-8 text-earth-600 text-lg md:text-xl leading-relaxed font-light">
                <p>
                  Agropastoralists Development Consortium (ADC) is a humanitarian, non-political and non-governmental organization founded in the year 2020 by a group of livestock and agricultural professionals to address the development gaps affecting agropastoralist and pastoralist communities.
                </p>
                <p>
                  The organization aims to provide lasting and sustainable solutions that improve livelihoods of communities depending on agriculture and livestock by improving productivity and quality.
                </p>
                <p>
                  ADC bridges humanitarian and development gaps through networking, lobbying and partnerships with communities, government and humanitarian partners.
                </p>
                <p>
                  ADC links emergency response, rehabilitation and development while strengthening local capacities and community initiatives.
                </p>
              </div>
            </div>
          </FadeIn>
        </section>

        {/* Mission & Vision Section */}
        <section className="py-24 bg-earth-50" id="mission-vision">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Mission Card */}
              <div className="bg-white p-12 md:p-16 rounded-[3rem] shadow-xl border border-earth-100 relative overflow-hidden group">
                <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-earth-500/5 rounded-full blur-[100px] group-hover:bg-earth-500/10 transition-all duration-1000"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-earth-900 text-savanna-500 rounded-2xl flex items-center justify-center mb-10 shadow-lg group-hover:bg-savanna-500 group-hover:text-white transition-colors duration-500">
                    <Compass size={32} />
                  </div>
                  <h3 className="text-4xl font-serif font-black italic text-earth-900 mb-8">Our Mission</h3>
                  <p className="text-xl text-earth-600 leading-relaxed font-light">
                    To enhance the well-being of agropastoral and pastoral communities by fostering sustainable development, promoting resilience, and ensuring preservation and conservation of natural resources.
                  </p>
                </div>
              </div>

              {/* Vision Card */}
              <div className="bg-earth-900 text-white p-12 md:p-16 rounded-[3rem] shadow-2xl relative overflow-hidden group">
                <div className="absolute -top-12 -right-12 w-64 h-64 bg-savanna-500/10 rounded-full blur-[100px] group-hover:bg-savanna-500/20 transition-all duration-1000"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-savanna-500 text-white rounded-2xl flex items-center justify-center mb-10 shadow-lg">
                    <Eye size={32} />
                  </div>
                  <h3 className="text-4xl font-serif font-black italic mb-8">Our Vision</h3>
                  <p className="text-xl text-earth-100 leading-relaxed font-light">
                    To be a leading force in advocating for the rights and development of agropastoral and pastoral communities. We envision communities thriving in harmony with their environment, enjoying prosperity, inclusion, and peaceful coexistence.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Mandate Section */}
        <section className="py-24 bg-white" id="mandate">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif text-earth-900 mb-4 tracking-tight">Our <span className="text-gradient italic">Mandate</span></h2>
              <div className="w-24 h-1 bg-savanna-500 mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "Advocacy",
                  desc: "Championing the rights and interests of agropastoral communities.",
                  icon: <Megaphone className="text-savanna-500" size={32} />
                },
                {
                  title: "Peaceful Coexistence",
                  desc: "Promoting peaceful coexistence through equitable natural resource use.",
                  icon: <Handshake className="text-savanna-500" size={32} />
                },
                {
                  title: "Capacity Building",
                  desc: "Empowering communities through education and skills development.",
                  icon: <GraduationCap className="text-savanna-500" size={32} />
                },
                {
                  title: "Resource Management",
                  desc: "Promoting sustainable management of natural resources.",
                  icon: <Leaf className="text-savanna-500" size={32} />
                }
              ].map((item, idx) => (
                <div key={idx} className="glass-card p-8 rounded-3xl border border-earth-100 hover:border-savanna-500/30 transition-all duration-300 group">
                  <div className="mb-6 bg-earth-50 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:bg-savanna-500/10 transition-colors">
                    {item.icon}
                  </div>
                  <h4 className="text-xl font-bold text-earth-900 mb-3">{item.title}</h4>
                  <p className="text-earth-600 font-light leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="py-24 bg-earth-50" id="values">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
            <h2 className="text-4xl md:text-5xl font-serif text-earth-900 mb-16 tracking-tight">Core <span className="text-gradient italic">Values</span></h2>

            <div className="flex flex-wrap justify-center gap-10 md:gap-20">
              {["Transparency", "Accountability", "Integrity", "Commitment", "Respect"].map((value, i) => (
                <div key={i} className="flex flex-col items-center gap-4 group">
                  <span className="text-2xl md:text-3xl font-serif font-bold text-earth-800 group-hover:text-savanna-500 transition-colors duration-300">
                    {value}
                  </span>
                  <div className="w-8 h-1 bg-savanna-500/20 group-hover:w-16 group-hover:bg-savanna-500 transition-all duration-500"></div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};