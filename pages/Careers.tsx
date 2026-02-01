
import React from 'react';
import { Briefcase, GraduationCap, Search, FileText, ArrowRight } from 'lucide-react';

export const Careers: React.FC = () => {
  return (
    <div className="pt-32 pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-serif text-earth-900 mb-4">Careers & Opportunities</h1>
          <p className="text-earth-600 max-w-2xl mx-auto">Join a team dedicated to long-term community transformation and rights-based development in East Africa's arid lands.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            { title: 'Job Vacancies', count: '0 Active', icon: <Briefcase size={32} /> },
            { title: 'Consultancies', count: '2 Active', icon: <Search size={32} /> },
            { title: 'Internships', count: 'Open for 2025', icon: <GraduationCap size={32} /> }
          ].map((cat, idx) => (
            <div key={idx} className="bg-earth-50 p-10 rounded-[2.5rem] border border-earth-100 text-center">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-savanna-500 mx-auto mb-6 shadow-sm">{cat.icon}</div>
              <h3 className="text-xl font-bold text-earth-900 mb-2">{cat.title}</h3>
              <p className="text-earth-400 font-bold uppercase tracking-widest text-xs">{cat.count}</p>
            </div>
          ))}
        </div>

        <div className="bg-earth-900 rounded-[3rem] p-10 md:p-20 text-white shadow-2xl overflow-hidden relative">
          <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
            <FileText size={120} />
          </div>
          <div className="max-w-2xl relative z-10">
            <h2 className="text-4xl font-serif mb-6">Current Opportunities</h2>
            <div className="space-y-6">
              <div className="bg-earth-800 p-8 rounded-2xl border border-earth-700 hover:border-savanna-500 transition-all group">
                <span className="bg-savanna-500 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 inline-block">Consultancy</span>
                <h3 className="text-2xl font-bold mb-2">Lead Researcher: Arid Lands Peace Mapping</h3>
                <p className="text-earth-400 mb-6">Assessment of conflict dynamics across the Karamoja and Eastern Equatoria border cluster.</p>
                <a href="#" className="font-bold text-savanna-500 flex items-center gap-2 group-hover:gap-3 transition-all">View Terms of Reference <ArrowRight size={18} /></a>
              </div>
              <div className="bg-earth-800 p-8 rounded-2xl border border-earth-700 hover:border-savanna-500 transition-all group">
                <span className="bg-savanna-500 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-4 inline-block">Consultancy</span>
                <h3 className="text-2xl font-bold mb-2">Climate Resilience Strategy Advisor</h3>
                <p className="text-earth-400 mb-6">Development of ADC’s 2025-2030 Climate Adaptation Framework.</p>
                <a href="#" className="font-bold text-savanna-500 flex items-center gap-2 group-hover:gap-3 transition-all">View Terms of Reference <ArrowRight size={18} /></a>
              </div>
            </div>
            <p className="mt-12 text-earth-400 text-sm italic">"Don't see a role that fits? You can also <a href="#/volunteer" className="text-savanna-500 font-bold underline">volunteer with ADC</a> to contribute your skills."</p>
          </div>
        </div>
      </div>
    </div>
  );
};
