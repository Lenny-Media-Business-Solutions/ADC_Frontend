import React from 'react';
import {
    History,
    Sparkles,
    Sprout,
    Beef,
    BarChart3,
    Handshake,
    Droplets,
    ArrowRight,
    ChevronRight,
    ShieldCheck,
    CheckCircle2,
    Users,
    Building2,
    GraduationCap
} from 'lucide-react';
import { PageTransition, FadeIn } from '../components/animations';

export const TrainingServices: React.FC = () => {
    const navigateToContact = () => {
        window.location.hash = '#/contact';
    };

    return (
        <PageTransition>
            <div className="pt-24 savanna-pattern">
                {/* Hero Section */}
                <div className="bg-earth-900 text-white py-32 relative overflow-hidden text-center">
                    <div className="absolute inset-0 opacity-20 flex items-center justify-center bg-earth-800">
                        <Sprout size={100} strokeWidth={1} className="text-earth-600" />
                    </div>
                    <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
                        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-savanna-500/10 border border-savanna-500/30 text-savanna-500 text-[10px] font-black uppercase tracking-[0.4em] mb-8">
                            <Sparkles size={12} /> ADC Expertise
                        </div>
                        <h1 className="font-serif mb-10 tracking-tighter leading-none text-[clamp(32px,6vw,80px)]">
                            ADC Training <span className="text-gradient italic">Services</span>
                        </h1>
                        <p className="text-xl md:text-3xl text-earth-100 max-w-4xl mx-auto leading-relaxed font-light opacity-90 mb-12">
                            Building resilient communities through professional training in agriculture, livestock, livelihoods, peace building, and natural resource management.
                        </p>
                        <div className="flex flex-wrap justify-center gap-6">
                            <button
                                onClick={navigateToContact}
                                className="bg-savanna-500 hover:bg-savanna-600 text-white px-10 py-4 rounded-full font-black text-sm uppercase tracking-widest shadow-xl shadow-savanna-500/20 active:scale-95 transition-all flex items-center gap-3"
                            >
                                Request Training <ArrowRight size={18} />
                            </button>
                            <button
                                onClick={navigateToContact}
                                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-10 py-4 rounded-full font-black text-sm uppercase tracking-widest active:scale-95 transition-all"
                            >
                                Contact ADC
                            </button>
                        </div>
                    </div>
                </div>

                {/* Training Overview Section */}
                <section className="py-24 bg-white" id="overview">
                    <div className="max-w-7xl mx-auto px-6 lg:px-12">
                        <FadeIn>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                                <div>
                                    <div className="w-16 h-16 bg-savanna-500 text-white rounded-2xl flex items-center justify-center shadow-xl mb-8">
                                        <Users size={32} />
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-serif text-earth-900 mb-8 tracking-tight">Our Professional <span className="text-gradient italic">Network</span></h2>
                                    <p className="text-earth-600 text-lg leading-relaxed font-light mb-8">
                                        ADC has a network of professionals in food security and livelihoods sectors. Through these experts, ADC offers trainings tailored to the specific needs of communities and development partners.
                                    </p>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                                        {[
                                            "Individual farmers",
                                            "Farmer groups",
                                            "Community groups",
                                            "Community members",
                                            "NGO-supported groups"
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-center gap-3 bg-earth-50 p-4 rounded-2xl border border-earth-100">
                                                <CheckCircle2 size={18} className="text-savanna-500 flex-shrink-0" />
                                                <span className="text-earth-800 font-bold text-sm tracking-tight">{item}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="p-6 bg-earth-900 rounded-[2rem] text-white">
                                        <div className="flex items-start gap-4">
                                            <Building2 className="text-savanna-500 mt-1 flex-shrink-0" size={24} />
                                            <div>
                                                <h4 className="font-bold text-lg mb-2">Target Clients</h4>
                                                <p className="text-earth-200 text-sm font-light leading-relaxed">
                                                    Primary clients include international and national NGOs and development partners supporting communities to improve food security and livelihoods.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-earth-50 rounded-[4rem] p-12 lg:p-16 border border-earth-100 shadow-inner relative overflow-hidden">
                                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-savanna-500/5 rounded-full blur-3xl"></div>
                                    <h3 className="text-2xl font-serif font-black mb-8 text-earth-900">Expertise Areas</h3>
                                    <div className="space-y-6">
                                        {[
                                            { title: "Entrepreneurship", icon: <BarChart3 className="text-savanna-500" /> },
                                            { title: "Peace building", icon: <Handshake className="text-savanna-500" /> },
                                            { title: "Natural Resource Management", icon: <Droplets className="text-savanna-500" /> },
                                            { title: "Water Pump Maintenance", icon: <GraduationCap className="text-savanna-500" /> }
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-center gap-6 group">
                                                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center group-hover:bg-savanna-500 group-hover:text-white transition-all duration-300">
                                                    {item.icon}
                                                </div>
                                                <span className="text-lg font-bold text-earth-700 tracking-tight">{item.title}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </section>

                {/* Training Categories Section */}
                <section className="py-24 bg-earth-50" id="categories">
                    <div className="max-w-7xl mx-auto px-6 lg:px-12">
                        <div className="text-center mb-20">
                            <h2 className="text-4xl md:text-6xl font-serif text-earth-900 mb-6 tracking-tight">Training <span className="text-gradient italic">Curriculum</span></h2>
                            <p className="text-earth-600 text-lg max-w-2xl mx-auto font-light">Comprehensive specialized training programs designed for sustainable impact.</p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                            {/* A. Agronomy */}
                            <div className="lg:col-span-12 xl:col-span-4 bg-white p-10 rounded-[3rem] shadow-xl border border-earth-100 relative group">
                                <div className="w-16 h-16 bg-earth-900 text-savanna-500 rounded-2xl flex items-center justify-center mb-10 shadow-lg group-hover:bg-savanna-500 group-hover:text-white transition-all duration-500">
                                    <Sprout size={32} />
                                </div>
                                <h3 className="text-3xl font-serif font-black text-earth-900 mb-8">Agronomy Trainings</h3>
                                <ul className="space-y-4">
                                    {[
                                        "Staple crops production",
                                        "Vegetables production",
                                        "Seeds production",
                                        "Integrated Pest Management",
                                        "Farmer Field Schools",
                                        "Climate Smart Agriculture",
                                        "Fruticulture",
                                        "Training Community Agricultural Extension Workers"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3 group/item">
                                            <ChevronRight size={18} className="text-savanna-500 mt-0.5 group-hover/item:translate-x-1 transition-transform" />
                                            <span className="text-earth-600 font-light leading-tight">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* B. Livestock */}
                            <div className="lg:col-span-12 xl:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div className="bg-earth-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group">
                                    <div className="absolute -top-12 -right-12 w-48 h-48 bg-savanna-500/10 rounded-full blur-3xl group-hover:bg-savanna-500/20 transition-all"></div>
                                    <div className="relative z-10">
                                        <div className="w-16 h-16 bg-savanna-500 text-white rounded-2xl flex items-center justify-center mb-10 shadow-lg">
                                            <Beef size={32} />
                                        </div>
                                        <h3 className="text-3xl font-serif font-black mb-8">Livestock Training</h3>
                                        <div className="grid grid-cols-1 gap-x-8 gap-y-4">
                                            {[
                                                "Poultry production",
                                                "Rabbit production",
                                                "Goats & sheep production",
                                                "Bee keeping & honey processing",
                                                "Fish processing & preservation",
                                                "Ox-ploughing",
                                                "Livestock vaccination & treatment",
                                                "Community Animal Health Workers training",
                                                "Pastoralist Field Schools",
                                                "Supply of improved livestock breeds"
                                            ].map((item, i) => (
                                                <div key={i} className="flex items-start gap-3">
                                                    <div className="w-1.5 h-1.5 bg-savanna-500 rounded-full mt-2 flex-shrink-0" />
                                                    <span className="text-earth-100 font-light text-sm">{item}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-8">
                                    {/* C. Livelihoods */}
                                    <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-earth-100 flex-grow group">
                                        <div className="w-16 h-16 bg-earth-50 text-savanna-500 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-savanna-500/10 transition-all">
                                            <BarChart3 size={32} />
                                        </div>
                                        <h3 className="text-2xl font-serif font-black text-earth-900 mb-6">Livelihoods</h3>
                                        <ul className="space-y-3">
                                            {[
                                                "Village Savings and Loans Association",
                                                "Small & Medium Enterprise training",
                                                "Agri-business & value addition",
                                                "Cooperative formation"
                                            ].map((item, i) => (
                                                <li key={i} className="flex items-center gap-3">
                                                    <CheckCircle2 size={16} className="text-savanna-500" />
                                                    <span className="text-earth-600 font-light text-sm">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* D. Peace Building */}
                                    <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-earth-100 flex-grow group">
                                        <div className="w-16 h-16 bg-earth-50 text-savanna-500 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-savanna-500/10 transition-all">
                                            <Handshake size={32} />
                                        </div>
                                        <h3 className="text-2xl font-serif font-black text-earth-900 mb-6">Peace Building</h3>
                                        <ul className="space-y-3">
                                            {[
                                                "Conflict resolution",
                                                "Trauma healing",
                                                "Negotiation & mediation",
                                                "Restorative justice",
                                                "Leadership & advocacy"
                                            ].map((item, i) => (
                                                <li key={i} className="flex items-center gap-3">
                                                    <CheckCircle2 size={16} className="text-savanna-500" />
                                                    <span className="text-earth-600 font-light text-sm">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* E. NRM */}
                            <div className="lg:col-span-12 bg-earth-900 text-white rounded-[4rem] p-12 md:p-16 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center gap-16">
                                <div className="absolute inset-0 opacity-10 pointer-events-none">
                                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.1),transparent_50%)]"></div>
                                </div>

                                <div className="relative z-10 md:w-1/2">
                                    <div className="w-16 h-16 bg-savanna-500 text-white rounded-2xl flex items-center justify-center mb-8">
                                        <Droplets size={32} />
                                    </div>
                                    <h3 className="text-4xl font-serif font-black mb-6">Natural Resource Management</h3>
                                    <p className="text-earth-200 font-light leading-relaxed mb-8">
                                        Training programs focused on environmental sustainability, climate adaptation, and efficient resource utilization for long-term community health.
                                    </p>
                                    <button
                                        onClick={navigateToContact}
                                        className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-3 rounded-full font-bold text-sm uppercase tracking-widest transition-all inline-flex items-center gap-3"
                                    >
                                        Learn More <ArrowRight size={16} />
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:w-1/2 relative z-10">
                                    {[
                                        "Climate change adaptation & mitigation",
                                        "Sustainable agriculture & agroforestry",
                                        "Water resource management",
                                        "Water pump maintenance"
                                    ].map((item, i) => (
                                        <div key={i} className="glass-card p-6 rounded-[2rem] border border-white/10 flex items-center gap-4">
                                            <div className="w-10 h-10 bg-savanna-500/20 rounded-xl flex items-center justify-center text-savanna-500 flex-shrink-0 font-black italic">
                                                {i + 1}
                                            </div>
                                            <span className="text-earth-900 text-sm font-bold">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-24 bg-white" id="cta">
                    <div className="max-w-5xl mx-auto px-6 lg:px-12 text-center">
                        <FadeIn>
                            <div className="bg-earth-900 rounded-[4rem] p-16 md:p-24 relative overflow-hidden">
                                <div className="absolute -top-24 -left-24 w-64 h-64 bg-savanna-500/10 rounded-full blur-[100px]"></div>
                                <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-earth-500/10 rounded-full blur-[100px]"></div>

                                <div className="relative z-10">
                                    <h2 className="text-4xl md:text-5xl font-serif text-white mb-8 tracking-tight">
                                        Partner with ADC <br />
                                        <span className="text-savanna-500 italic">to strengthen community resilience</span>
                                    </h2>
                                    <p className="text-earth-200 text-lg mb-12 font-light max-w-2xl mx-auto">
                                        Request a specialized training program designed to empower and protect livelihoods in South Sudan.
                                    </p>
                                    <button
                                        onClick={navigateToContact}
                                        className="bg-savanna-500 hover:bg-savanna-600 text-white px-12 py-5 rounded-full font-black text-lg uppercase tracking-widest shadow-2xl shadow-savanna-500/40 active:scale-95 transition-all flex items-center gap-4 mx-auto"
                                    >
                                        Request Training Program <ArrowRight size={20} />
                                    </button>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </section>
            </div>
        </PageTransition>
    );
};
