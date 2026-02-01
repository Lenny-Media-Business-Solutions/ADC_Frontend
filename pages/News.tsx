import React, { useState, useEffect } from 'react';
import { Calendar, ArrowRight, Tag, Image as ImageIcon } from 'lucide-react';
import { PageTransition, FadeIn } from '../components/animations';
import api from '../api';

export const News: React.FC = () => {
  const [dynamicNews, setDynamicNews] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await api.get('news/');
        setDynamicNews(response.data.results || response.data);
      } catch (err) {
        console.error('Failed to fetch dynamic news', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNews();
  }, []);

  // Map news dynamic data to frontend NewsItem type
  const uniqueNews = dynamicNews.map(item => ({
    ...item,
    date: new Date(item.published_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
    category: 'Field Dispatch',
  }));

  const handleReadReport = (slug: string) => {
    window.location.hash = `#/news/${slug}`;
  };

  return (
    <PageTransition>
      <div className="pt-32 pb-24 savanna-pattern min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 animate-fade-up">
            <h1 className="text-5xl md:text-8xl font-serif text-earth-900 mb-6 tracking-tighter">South Sudan <span className="text-gradient">Dispatches</span></h1>
            <p className="text-earth-600 text-xl max-w-2xl mx-auto font-light leading-relaxed">
              Direct updates from the ground across South Sudan.
            </p>
          </div>

          {isLoading ? (
            <div className="text-center py-20 font-serif text-2xl italic text-savanna-500 animate-pulse">
              Gathering dispatches...
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {uniqueNews.map((item, index) => (
                <article
                  key={item.id || index}
                  className="group flex flex-col md:flex-row bg-white rounded-[3.5rem] border border-earth-100 overflow-hidden shadow-sm transition-all duration-500 hover:shadow-xl animate-fade-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="md:w-1/2 h-80 md:h-auto overflow-hidden bg-earth-100 flex items-center justify-center relative">
                    {!item.image ? (
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-earth-50/50">
                        <ImageIcon size={40} className="text-earth-300 mb-3" />
                        <p className="text-[10px] text-earth-400 font-bold uppercase tracking-widest text-center">Dispatch Image Pending</p>
                      </div>
                    ) : (
                      <img
                        src={item.image}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        alt={item.title}
                      />
                    )}
                  </div>
                  <div className="md:w-1/2 p-6 xs:p-8 sm:p-10 flex flex-col justify-center">
                    <div className="flex flex-wrap items-center gap-2 xs:gap-3 sm:gap-4 text-[10px] font-black text-earth-400 uppercase tracking-[0.2em] mb-4 xs:mb-6">
                      <span className="flex items-center gap-2 bg-earth-50 px-3 py-1 rounded-full text-earth-600 whitespace-nowrap">
                        <Calendar size={12} className="text-savanna-500" /> {item.date}
                      </span>
                      <span className="flex items-center gap-2 bg-savanna-50 px-3 py-1 rounded-full text-savanna-600 whitespace-nowrap">
                        <Tag size={12} /> {item.category}
                      </span>
                    </div>
                    <h2 className="text-xl xs:text-2xl font-serif font-bold text-earth-900 mb-3 xs:mb-4 group-hover:text-savanna-500 transition-colors leading-tight">
                      {item.title}
                    </h2>
                    <p className="text-earth-600 text-xs sm:text-sm mb-6 xs:mb-8 line-clamp-3 leading-relaxed font-light">{item.summary}</p>
                    <button
                      onClick={() => item.slug && handleReadReport(item.slug)}
                      className="inline-flex items-center gap-3 font-bold text-[10px] uppercase tracking-widest text-earth-900 border-b-2 border-transparent hover:border-savanna-500 hover:text-savanna-500 transition-all pb-1 w-fit disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={!item.slug}
                    >
                      Read Report <ArrowRight size={16} className="text-savanna-500 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}

          {!isLoading && uniqueNews.length === 0 && (
            <div className="text-center py-20 bg-white rounded-[3.5rem] border border-dashed border-earth-200">
              <p className="text-earth-400 font-medium">No dispatches available at this time.</p>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};


