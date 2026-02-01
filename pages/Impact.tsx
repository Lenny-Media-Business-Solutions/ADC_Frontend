import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { CheckCircle2, TrendingUp, Users, ShieldCheck, ArrowRight, MessageSquareQuote, Image as ImageIcon, X, Calendar, Award } from 'lucide-react';
import api from '../api';
import { PageTransition, FadeIn } from '../components/animations';

interface ImpactStory {
  id: number;
  title: string;
  slug: string;
  summary: string;
  content: string;
  image_url: string;
  published_date: string;
}

export const Impact: React.FC = () => {
  const [stories, setStories] = useState<ImpactStory[]>([]);
  const [selectedStory, setSelectedStory] = useState<ImpactStory | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await api.get('impact-stories/');
        setStories(response.data.results);
      } catch (error) {
        console.error('Error fetching impact stories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  return (
    <PageTransition>
      <div className="pt-24 bg-white">
        {/* Hero Section */}
        <section className="bg-earth-900 text-white py-24 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="text-left">
                <h1 className="text-5xl md:text-7xl font-serif mb-8 leading-tight">Our <span className="text-gradient italic">Impact</span></h1>
                <p className="text-xl text-earth-200 max-w-xl font-light leading-relaxed">
                  Building peaceful coexistence and resilient livelihoods through community-driven transformation.
                  <br />
                  <br />
                  Through training, community engagement, and locally driven solutions, we support households to improve livelihoods, adapt to climate challenges, and build a future where communities thrive in stability and dignity.
                </p>
              </div>
              <div className="relative">
                <div className="aspect-[4/3] rounded-[3rem] overflow-hidden bg-earth-800 border-4 border-earth-700 shadow-2xl">
                  <img
                    src="https://res.cloudinary.com/ddwtrkhss/image/upload/v1769680581/IMG_1320_lqyrxj.jpg"
                    alt="ADC Impact Illustration"
                    className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="absolute -bottom-8 -left-8 bg-savanna-500 text-white p-8 rounded-3xl shadow-xl hidden md:block max-w-[200px]">
                  <p className="text-3xl font-serif font-black mb-1 italic">100%</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest leading-tight">Community Led Initiatives</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Impact Snapshot Section (New) */}
        <section className="py-24 bg-earth-50" id="snapshot">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-serif text-earth-900 mb-4 tracking-tight">Impact at a <span className="text-gradient italic">Glance</span></h2>
              <div className="w-24 h-1 bg-savanna-500 mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { label: "Farmers Trained", value: "2,000+", icon: <Users className="text-savanna-500" /> },
                { label: "Villages Reached", value: "5", icon: <TrendingUp className="text-savanna-500" /> },
                { label: "Tree Seedlings", value: "5,000+", icon: <ShieldCheck className="text-savanna-500" /> },
                { label: "Resilience Programs", value: "Communities Supported", icon: <Award className="text-savanna-500" /> }
              ].map((stat, idx) => (
                <div key={idx} className="bg-white p-8 rounded-3xl border border-earth-100 shadow-sm text-center group hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-earth-50 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-savanna-500/10 transition-colors">
                    {stat.icon}
                  </div>
                  <h3 className="text-2xl font-serif font-black text-earth-900 mb-2">{stat.value}</h3>
                  <p className="text-earth-600 text-sm font-light uppercase tracking-widest">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What ADC Contributes Section */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif text-earth-900">What ADC Contributes</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: 'Improved Peaceful Coexistence', desc: 'Strengthened community dialogue and mediation mechanisms lead to reduced conflict over natural resources.', icon: <ShieldCheck size={40} className="text-savanna-500" /> },
              { title: 'Increased Food Security', desc: 'Promoting climate-smart agriculture and sustainable livestock management improves household income.', icon: <TrendingUp size={40} className="text-savanna-500" /> },
              { title: 'Women & Youth Leadership', desc: 'Strengthened participation of women and youth in governance and inclusive leadership structures.', icon: <Users size={40} className="text-savanna-500" /> },
              { title: 'Enhanced Resilience', desc: 'Built community preparedness for climate and disaster risks through adaptation initiatives.', icon: <CheckCircle2 size={40} className="text-savanna-500" /> }
            ].map((item, idx) => (
              <div key={idx} className="bg-earth-50 p-10 rounded-[2.5rem] border border-earth-100 flex gap-6">
                <div className="flex-shrink-0">{item.icon}</div>
                <div>
                  <h4 className="font-bold text-earth-900 text-xl mb-2">{item.title}</h4>
                  <p className="text-earth-600 leading-relaxed font-light">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Stories of Real Change Section (Dynamic) */}
        <section className="py-24 bg-earth-900 text-white overflow-hidden relative" id="stories">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-savanna-500/5 blur-[120px] rounded-full translate-x-1/2"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl mb-16">
              <span className="text-savanna-500 font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">Personal Narratives</span>
              <h2 className="text-5xl md:text-6xl font-serif mb-8 leading-none">Stories of <span className="text-gradient italic">Real Change</span></h2>
              <p className="text-earth-200 text-xl font-light leading-relaxed">
                Through community-driven interventions, ADC has supported individuals and households to rebuild livelihoods, strengthen peace, and improve well-being.
              </p>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="w-12 h-12 border-4 border-savanna-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : stories.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {stories.map((story) => (
                  <div key={story.id} className="bg-earth-800 rounded-[2.5rem] overflow-hidden border border-earth-700 flex flex-col group hover:translate-y-[-8px] transition-all duration-300">
                    {story.image_url && (
                      <div className="aspect-video bg-earth-700 relative overflow-hidden">
                        <img src={story.image_url} alt={story.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                    )}
                    <div className="p-8 flex-grow flex flex-col">
                      <div className="flex items-center gap-2 text-savanna-500 mb-4 opacity-80">
                        <Calendar size={14} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">
                          {new Date(story.published_date).toLocaleDateString()}
                        </span>
                      </div>
                      <h3 className="text-2xl font-serif font-black mb-4 leading-tight group-hover:text-savanna-500 transition-colors">
                        {story.title}
                      </h3>
                      <p className="text-earth-200 text-sm font-light leading-relaxed mb-6 line-clamp-3">
                        {story.summary}
                      </p>
                      <button
                        onClick={() => setSelectedStory(story)}
                        className="mt-auto inline-flex items-center gap-2 text-savanna-500 font-black text-xs uppercase tracking-widest hover:gap-4 transition-all"
                      >
                        Read Full Story <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-earth-800 rounded-[3rem] border border-earth-700">
                <MessageSquareQuote size={48} className="text-earth-600 mx-auto mb-4 opacity-20" />
                <p className="text-earth-400 font-light italic">No story entries currently available.</p>
              </div>
            )}
          </div>
        </section>

        {/* Story Detail Modal */}
        {selectedStory && createPortal(
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <div className="fixed inset-0 bg-earth-900/95 backdrop-blur-md" onClick={() => setSelectedStory(null)}></div>
            <div className="bg-white rounded-[3rem] w-full max-w-4xl min-h-fit relative z-10 shadow-2xl savanna-pattern my-8">
              <button
                onClick={() => setSelectedStory(null)}
                className="absolute top-6 right-6 p-3 bg-earth-50 hover:bg-earth-100 text-earth-900 rounded-2xl transition-colors z-20"
              >
                <X size={24} />
              </button>

              <div className="p-8 sm:p-12 md:p-16">
                <div className="flex items-center gap-4 text-savanna-500 mb-8 font-black text-xs uppercase tracking-widest">
                  <Calendar size={18} />
                  {new Date(selectedStory.published_date).toLocaleDateString()}
                </div>
                <h2 className="text-4xl md:text-5xl font-serif text-earth-900 mb-10 leading-tight">
                  {selectedStory.title}
                </h2>

                {selectedStory.image_url && (
                  <div className="rounded-[2.5rem] overflow-hidden mb-12 shadow-xl aspect-video border-8 border-earth-50">
                    <img src={selectedStory.image_url} alt={selectedStory.title} className="w-full h-full object-cover" />
                  </div>
                )}

                <div className="space-y-6 text-earth-700 text-lg sm:text-xl leading-relaxed font-light whitespace-pre-wrap">
                  {selectedStory.content}
                </div>

                <div className="mt-16 pt-12 border-t border-earth-100 flex flex-col sm:flex-row items-center gap-8 justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-earth-900 text-savanna-500 rounded-xl flex items-center justify-center font-black">ADC</div>
                    <div>
                      <p className="text-sm font-black text-earth-900 tracking-tight">Agropastoralists Development Consortium</p>
                      <p className="text-[10px] font-bold text-earth-400 uppercase tracking-widest">Humanitarian Program Output</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedStory(null)}
                    className="bg-earth-900 text-white px-10 py-4 rounded-full font-black text-sm uppercase tracking-widest active:scale-95 transition-all shadow-xl shadow-earth-900/20"
                  >
                    Close Story
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
      </div>
    </PageTransition>
  );
};
