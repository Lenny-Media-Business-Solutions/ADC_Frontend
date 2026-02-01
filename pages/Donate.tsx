
import React from 'react';
import { Heart, ShieldCheck, TrendingUp, Handshake, CheckCircle2, Scale, Users, CloudRain } from 'lucide-react';

export const Donate: React.FC = () => {
  return (
    <div className="pt-24 bg-white">
      {/* Hero */}
      <section className="bg-savanna-500 text-white py-24 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Heart className="w-16 h-16 mx-auto mb-6" />
          <h1 className="text-5xl md:text-6xl font-serif mb-4">Support Our Work</h1>
          <p className="text-xl text-savanna-50 max-w-2xl mx-auto leading-relaxed">
            Your support enables ADC to continue empowering agro-pastoralist communities affected by conflict, climate change, and poverty.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <h2 className="text-3xl font-serif text-earth-900 mb-8">By donating, you help:</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
              {[
                { title: 'Strengthen Peacebuilding', icon: <Scale className="text-savanna-500" />, desc: 'Funding community dialogue and mediation.' },
                { title: 'Livelihoods Support', icon: <TrendingUp className="text-savanna-500" />, desc: 'Seeds, tools, and livestock health kits.' },
                { title: 'Climate Resilience', icon: <CloudRain className="text-savanna-500" />, desc: 'Preparedness for floods and droughts.' },
                { title: 'Governance', icon: <ShieldCheck className="text-savanna-500" />, desc: 'Inclusive and accountable leadership.' }
              ].map((item, idx) => (
                <div key={idx} className="bg-earth-50 p-6 rounded-2xl border border-earth-100">
                  <div className="mb-4">{item.icon}</div>
                  <h4 className="font-bold text-earth-900 mb-2">{item.title}</h4>
                  <p className="text-earth-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="bg-earth-900 text-white p-10 rounded-[3rem] shadow-xl">
              <h3 className="text-xl font-bold mb-4">Transparency & Accountability</h3>
              <p className="text-earth-200 text-sm leading-relaxed">
                ADC is committed to responsible use of resources. All funds are managed transparently and used to maximize community impact. We ensure full reporting to our donors and the communities we serve.
              </p>
            </div>
          </div>

          <div className="bg-white p-10 md:p-14 rounded-[4rem] shadow-2xl border border-earth-100 relative">
            <div className="absolute top-0 right-10 -translate-y-1/2 bg-savanna-500 text-white p-4 rounded-full">
              <Heart size={32} />
            </div>
            <h3 className="text-2xl font-bold text-earth-900 mb-8">Choose Your Gift</h3>
            
            <div className="space-y-4 mb-8">
              {['One-time donation', 'Monthly support', 'Project-specific contributions', 'Institutional & Corporate Partnerships'].map((type, idx) => (
                <button key={idx} className="w-full text-left px-6 py-4 border border-earth-200 rounded-2xl hover:border-savanna-500 transition-all group flex items-center justify-between">
                  <span className="font-bold text-earth-800">{type}</span>
                  <CheckCircle2 className="text-earth-100 group-hover:text-savanna-500 transition-colors" />
                </button>
              ))}
            </div>

            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Thank you for your generosity!'); }}>
              <div className="space-y-2">
                <label className="text-sm font-bold text-earth-700">Custom Amount (USD)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-earth-400 font-bold">$</span>
                  <input type="number" className="w-full bg-earth-50 border border-earth-100 rounded-xl px-10 py-5 focus:ring-2 focus:ring-savanna-500 focus:outline-none font-bold text-xl" placeholder="100.00" />
                </div>
              </div>
              <button type="submit" className="w-full bg-savanna-500 hover:bg-savanna-600 text-white py-5 rounded-2xl font-bold text-xl transition-all shadow-xl shadow-savanna-500/20 active:scale-95">
                Submit Your Gift
              </button>
            </form>
            <p className="mt-8 text-center text-earth-400 text-xs uppercase tracking-widest font-bold">"Together, we can build peaceful, resilient, and empowered agro-pastoralist communities."</p>
          </div>
        </div>
      </section>
    </div>
  );
};
