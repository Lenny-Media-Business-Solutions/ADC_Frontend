import React, { useState, useEffect } from 'react';
import { Calendar, ArrowLeft, Tag, Image as ImageIcon, Sparkles } from 'lucide-react';
import api from '../api';

interface NewsDetailProps {
    slug: string;
}

export const NewsDetail: React.FC<NewsDetailProps> = ({ slug }) => {
    const [newsItem, setNewsItem] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchNewsDetail = async () => {
            try {
                const response = await api.get(`news/${slug}/`);
                setNewsItem(response.data);
            } catch (err) {
                console.error('Failed to fetch news detail', err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchNewsDetail();
    }, [slug]);

    if (isLoading) {
        return (
            <div className="pt-48 pb-32 savanna-pattern min-h-screen flex items-center justify-center">
                <div className="animate-pulse text-savanna-500 font-serif text-2xl italic">Loading dispatch...</div>
            </div>
        );
    }

    if (!newsItem) {
        return (
            <div className="pt-48 pb-32 savanna-pattern min-h-screen text-center">
                <h2 className="text-4xl font-serif text-earth-900 mb-6">Dispatch Not Found</h2>
                <button
                    onClick={() => window.location.hash = '#/news'}
                    className="bg-earth-900 text-white px-8 py-3 rounded-full font-bold uppercase tracking-widest hover:bg-savanna-500 transition-all"
                >
                    Back to News
                </button>
            </div>
        );
    }

    const formattedDate = new Date(newsItem.published_date).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    return (
        <div className="pt-32 pb-24 savanna-pattern min-h-screen">
            <div className="max-w-4xl mx-auto px-6 lg:px-12">
                {/* Back Button */}
                <button
                    onClick={() => window.location.hash = '#/news'}
                    className="inline-flex items-center gap-3 text-earth-400 hover:text-savanna-500 font-black uppercase tracking-widest text-[10px] mb-12 transition-all group"
                >
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Dispatches
                </button>

                {/* Article Header */}
                <div className="mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-savanna-100 border border-savanna-200 text-savanna-600 text-[10px] font-black uppercase tracking-[0.4em] mb-8 shadow-sm">
                        <Sparkles size={12} /> Special Report
                    </div>
                    <h1 className="text-4xl md:text-6xl font-serif text-earth-900 mb-8 leading-tight tracking-tighter font-black">
                        {newsItem.title}
                    </h1>
                    <div className="flex items-center gap-8 border-y border-earth-100 py-6">
                        <div className="flex items-center gap-3">
                            <Calendar size={18} className="text-savanna-500" />
                            <span className="text-sm font-bold text-earth-500 uppercase tracking-widest">{formattedDate}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <Tag size={18} className="text-earth-400" />
                            <span className="text-sm font-bold text-earth-500 uppercase tracking-widest">Field Update</span>
                        </div>
                    </div>
                </div>

                {/* Featured Image */}
                <div className="relative mb-16 rounded-[4rem] overflow-hidden bg-earth-100 shadow-2xl aspect-[16/9] flex items-center justify-center">
                    {!newsItem.image ? (
                        <div className="flex flex-col items-center">
                            <ImageIcon size={64} className="text-earth-300 mb-4" />
                            <p className="text-earth-400 font-bold uppercase tracking-widest text-xs">Field Image Pending</p>
                        </div>
                    ) : (
                        <img
                            src={newsItem.image}
                            alt={newsItem.title}
                            className="w-full h-full object-cover"
                        />
                    )}
                </div>

                {/* Summary Card */}
                <div className="bg-earth-50 border-l-8 border-savanna-500 p-8 md:p-12 rounded-r-[3rem] mb-16 shadow-sm">
                    <p className="text-xl md:text-2xl text-earth-900 font-serif italic leading-relaxed opacity-80">
                        "{newsItem.summary}"
                    </p>
                </div>

                {/* Main Content */}
                <div className="prose prose-lg max-w-none text-earth-700 leading-relaxed font-light space-y-8">
                    {newsItem.content.split('\n\n').map((paragraph: string, i: number) => (
                        <p key={i} className="first-letter:text-5xl first-letter:font-serif first-letter:text-savanna-500 first-letter:mr-3 first-letter:float-left">
                            {paragraph}
                        </p>
                    ))}
                </div>

                {/* Footer info */}
                <div className="mt-24 pt-12 border-t border-earth-100">
                    <div className="bg-earth-900 rounded-[3rem] p-12 text-white relative overflow-hidden">
                        <div className="relative z-10">
                            <h4 className="text-2xl font-serif font-black italic mb-4">About this Dispatch</h4>
                            <p className="text-earth-300 font-light leading-relaxed max-w-2xl">
                                This report was filed directly by the ADC field team in South Sudan. We are committed to transparency and sharing the real impact of our programs with our global partners.
                            </p>
                        </div>
                        <div className="absolute top-0 right-0 w-64 h-64 bg-savanna-500/10 rounded-full blur-3xl"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};
