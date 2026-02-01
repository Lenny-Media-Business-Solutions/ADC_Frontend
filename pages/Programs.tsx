import React, { useState, useEffect } from 'react';
import { PROGRAMS } from '../constants';
import api from '../api';
import {
  ArrowRight,
  CheckCircle2,
  Users,
  Target,
  LayoutList,
  Image as ImageIcon,
  X,
  Send,
  Handshake,
  Building2,
  Globe,
  MapPin,
  Calendar,
  Briefcase,
  ShieldCheck,
  Info
} from 'lucide-react';
import { PageTransition } from '../components/animations';

interface ProgramsProps {
  programId?: string;
}

export const Programs: React.FC<ProgramsProps> = ({ programId }) => {
  const [dynamicPrograms, setDynamicPrograms] = useState<any[]>([]);
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [partnershipFormData, setPartnershipFormData] = useState({
    organization_name: '',
    partnership_type: 'International NGO',
    contact_person: '',
    email: '',
    phone: '',
    message: ''
  });

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await api.get('programs/');
        setDynamicPrograms(response.data.results || response.data);
      } catch (err) {
        console.error('Failed to fetch dynamic programs', err);
      }
    };
    fetchPrograms();
  }, []);

  const allPrograms = dynamicPrograms.map(p => ({
    ...p,
    objectives: typeof p.objectives === 'string' ? p.objectives.split('\n').filter(Boolean) : (p.objectives || []),
    activities: p.activities || [],
    outcomes: p.outcomes || [],
    icon: p.icon || 'LayoutList'
  }));

  const uniquePrograms = allPrograms.filter((p, index, self) =>
    index === self.findIndex((t) => t.title === p.title)
  );

  // Find by ID/Slug first
  const initialProgram = programId ? allPrograms.find(p => String(p.id) === String(programId)) : null;

  // If we found a program but it has a string ID (hardcoded), try to find its dynamic counterpart with a numeric ID
  const selectedProgram = initialProgram && typeof initialProgram.id === 'string' && isNaN(Number(initialProgram.id))
    ? (dynamicPrograms.find(p => p.title === initialProgram.title) || initialProgram)
    : initialProgram;

  const handleNavigate = (e: React.MouseEvent, id: string | number) => {
    e.preventDefault();
    window.location.hash = `#/programs/${id}`;
    window.scrollTo(0, 0);
  };

  const handlePartnerChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPartnershipFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePartnerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProgram) return;

    setIsSubmitting(true);
    try {
      await api.post('partnerships/', {
        ...partnershipFormData,
        program: selectedProgram.id
      });
      setIsSubmitted(true);
      setPartnershipFormData({
        organization_name: '',
        partnership_type: 'International NGO',
        contact_person: '',
        email: '',
        phone: '',
        message: ''
      });
    } catch (err: any) {
      if (err.response?.data) {
        const errorMsg = Object.entries(err.response.data)
          .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(', ') : value}`)
          .join('\n');
        alert(`Failed to submit partnership inquiry:\n${errorMsg}`);
      } else {
        alert('Failed to submit partnership inquiry. Please check your connection and try again.');
      }
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (selectedProgram) {
    return (
      <PageTransition>
        <div className="pt-24 animate-in fade-in duration-500 relative">
          {/* Partnership Modal */}
          {isPartnerModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6 overflow-y-auto">
              <div className="fixed inset-0 bg-earth-900/90 backdrop-blur-xl" onClick={() => setIsPartnerModalOpen(false)}></div>
              <div className="relative bg-white w-full max-w-4xl rounded-[3.5rem] shadow-2xl overflow-hidden animate-fade-up my-auto">
                {/* Close Button */}
                <button
                  onClick={() => setIsPartnerModalOpen(false)}
                  className="absolute top-8 right-8 p-3 bg-earth-50 text-earth-400 hover:text-savanna-500 rounded-full transition-all z-20 shadow-sm"
                >
                  <X size={24} />
                </button>

                {!isSubmitted ? (
                  <div className="flex flex-col lg:flex-row h-full max-h-[90vh]">
                    {/* Left Sidebar: Context */}
                    <div className="lg:w-1/3 bg-earth-900 p-10 lg:p-14 text-white relative overflow-hidden flex flex-col justify-between">
                      <div className="absolute inset-0 opacity-10 pointer-events-none">
                        <div className="absolute -top-10 -left-10 w-40 h-40 bg-savanna-500 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-10 right-10 w-40 h-40 bg-earth-500 rounded-full blur-3xl"></div>
                      </div>

                      <div className="relative z-10">
                        <div className="w-16 h-16 bg-savanna-500 text-white rounded-2xl flex items-center justify-center mb-8 shadow-xl">
                          <Handshake size={32} />
                        </div>
                        <h3 className="text-3xl font-serif font-black mb-6 leading-tight">Strategic <span className="text-savanna-500 italic">Partnership</span></h3>
                        <p className="text-earth-200 text-lg leading-relaxed font-light mb-8">
                          Collaborating with ADC means leveraging deep-rooted community trust and technical expertise in South Sudan's arid lands.
                        </p>

                        <div className="space-y-6">
                          <div className="flex items-center gap-3 text-sm font-bold text-earth-300">
                            <CheckCircle2 size={18} className="text-savanna-500" /> Technical Support
                          </div>
                          <div className="flex items-center gap-3 text-sm font-bold text-earth-300">
                            <CheckCircle2 size={18} className="text-savanna-500" /> Funding & Grants
                          </div>
                          <div className="flex items-center gap-3 text-sm font-bold text-earth-300">
                            <CheckCircle2 size={18} className="text-savanna-500" /> Program Implementation
                          </div>
                        </div>
                      </div>

                      <div className="mt-12 relative z-10 pt-8 border-t border-earth-800">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-earth-500 mb-2">Program Context</p>
                        <p className="text-savanna-500 font-bold">{selectedProgram.title}</p>
                      </div>
                    </div>

                    {/* Right: Detailed Form */}
                    <div className="lg:w-2/3 p-10 lg:p-14 overflow-y-auto bg-white custom-scrollbar">
                      <div className="mb-10">
                        <h4 className="text-2xl font-serif font-black text-earth-900 mb-2">Partnership Inquiry Form</h4>
                        <p className="text-earth-500 text-sm">Please provide detailed information for our partnership secretariat.</p>
                      </div>

                      <form onSubmit={handlePartnerSubmit} className="space-y-10">
                        {/* Section: Organization Details */}
                        <div className="space-y-6">
                          <div className="flex items-center gap-3 text-earth-900 font-black uppercase tracking-[0.2em] text-[10px] pb-2 border-b border-earth-100">
                            <Building2 size={14} className="text-savanna-500" /> Organization Profile
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <label className="text-[10px] font-black uppercase text-earth-400 ml-4">Organization Name</label>
                              <input
                                type="text"
                                name="organization_name"
                                value={partnershipFormData.organization_name}
                                onChange={handlePartnerChange}
                                required
                                className="w-full bg-earth-50 border-2 border-transparent rounded-2xl px-6 py-4 focus:bg-white focus:border-savanna-500 focus:outline-none transition-all"
                                placeholder="Legal entity name"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-[10px] font-black uppercase text-earth-400 ml-4">Organization Type</label>
                              <select
                                name="partnership_type"
                                value={partnershipFormData.partnership_type}
                                onChange={handlePartnerChange}
                                className="w-full bg-earth-50 border-2 border-transparent rounded-2xl px-6 py-4 focus:bg-white focus:border-savanna-500 focus:outline-none transition-all appearance-none cursor-pointer"
                              >
                                <option>International NGO</option>
                                <option>Local NGO / CBO</option>
                                <option>UN Agency / Multilateral</option>
                                <option>Government Body</option>
                                <option>Private Sector / Corporate</option>
                                <option>Research / Academic Institution</option>
                              </select>
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <label className="text-[10px] font-black uppercase text-earth-400 ml-4">HQ Location</label>
                              <input type="text" className="w-full bg-earth-50 border-2 border-transparent rounded-2xl px-6 py-4 focus:bg-white focus:border-savanna-500 focus:outline-none transition-all" placeholder="City, Country" />
                            </div>
                            <div className="space-y-2">
                              <label className="text-[10px] font-black uppercase text-earth-400 ml-4">Website / Portfolio URL</label>
                              <input type="url" className="w-full bg-earth-50 border-2 border-transparent rounded-2xl px-6 py-4 focus:bg-white focus:border-savanna-500 focus:outline-none transition-all" placeholder="https://..." />
                            </div>
                          </div>
                        </div>

                        {/* Section: Contact Person */}
                        <div className="space-y-6">
                          <div className="flex items-center gap-3 text-earth-900 font-black uppercase tracking-[0.2em] text-[10px] pb-2 border-b border-earth-100">
                            <Users size={14} className="text-savanna-500" /> Primary Contact
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <label className="text-[10px] font-black uppercase text-earth-400 ml-4">Representative Name</label>
                              <input
                                type="text"
                                name="contact_person"
                                value={partnershipFormData.contact_person}
                                onChange={handlePartnerChange}
                                required
                                className="w-full bg-earth-50 border-2 border-transparent rounded-2xl px-6 py-4 focus:bg-white focus:border-savanna-500 focus:outline-none transition-all"
                                placeholder="Full Name"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-[10px] font-black uppercase text-earth-400 ml-4">Phone Number</label>
                              <input
                                type="tel"
                                name="phone"
                                value={partnershipFormData.phone}
                                onChange={handlePartnerChange}
                                required
                                className="w-full bg-earth-50 border-2 border-transparent rounded-2xl px-6 py-4 focus:bg-white focus:border-savanna-500 focus:outline-none transition-all"
                                placeholder="+211 ..."
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-earth-400 ml-4">Official Email</label>
                            <input
                              type="email"
                              name="email"
                              value={partnershipFormData.email}
                              onChange={handlePartnerChange}
                              required
                              className="w-full bg-earth-50 border-2 border-transparent rounded-2xl px-6 py-4 focus:bg-white focus:border-savanna-500 focus:outline-none transition-all"
                              placeholder="representative@org.com"
                            />
                          </div>
                        </div>

                        {/* Section: Partnership Scope */}
                        <div className="space-y-6">
                          <div className="flex items-center gap-3 text-earth-900 font-black uppercase tracking-[0.2em] text-[10px] pb-2 border-b border-earth-100">
                            <Briefcase size={14} className="text-savanna-500" /> Collaboration Scope
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                              <label className="text-[10px] font-black uppercase text-earth-400 ml-4">Nature of Interest</label>
                              <select className="w-full bg-earth-50 border-2 border-transparent rounded-2xl px-6 py-4 focus:bg-white focus:border-savanna-500 focus:outline-none transition-all appearance-none cursor-pointer">
                                <option>Joint Grant Application</option>
                                <option>Technical Advisory / Consultancy</option>
                                <option>Direct Implementation Partnership</option>
                                <option>Resource Mobilization / Funding</option>
                                <option>Knowledge Exchange / Research</option>
                              </select>
                            </div>
                            <div className="space-y-2">
                              <label className="text-[10px] font-black uppercase text-earth-400 ml-4">Geographic Focus</label>
                              <select className="w-full bg-earth-50 border-2 border-transparent rounded-2xl px-6 py-4 focus:bg-white focus:border-savanna-500 focus:outline-none transition-all appearance-none cursor-pointer">
                                <option>National (South Sudan)</option>
                                <option>Central Equatoria</option>
                                <option>Eastern Equatoria</option>
                                <option>Bahr el Ghazal</option>
                                <option>Upper Nile Region</option>
                                <option>Cross-Border / Regional</option>
                              </select>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-earth-400 ml-4">Statement of Collaboration Intent</label>
                            <textarea
                              name="message"
                              value={partnershipFormData.message}
                              onChange={handlePartnerChange}
                              rows={5}
                              required
                              className="w-full bg-earth-50 border-2 border-transparent rounded-3xl px-8 py-6 focus:bg-white focus:border-savanna-500 focus:outline-none transition-all leading-relaxed"
                              placeholder="Describe the specific objectives and desired outcomes of this partnership..."
                            ></textarea>
                          </div>
                        </div>

                        {/* Section: Ethics & Submission */}
                        <div className="space-y-8 pt-6">
                          <div className="bg-earth-50 p-6 rounded-3xl border border-earth-100 flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-savanna-500 flex-shrink-0 shadow-sm"><ShieldCheck size={20} /></div>
                            <div>
                              <p className="text-sm font-bold text-earth-900 mb-1">Ethical Standard Commitment</p>
                              <p className="text-xs text-earth-500 leading-relaxed">
                                By submitting this inquiry, you confirm your organization adheres to international humanitarian principles and ADC's Code of Conduct regarding safeguarding and integrity.
                              </p>
                            </div>
                          </div>

                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-earth-900 hover:bg-savanna-500 text-white py-6 rounded-3xl font-black text-xl flex items-center justify-center gap-4 transition-all shadow-[0_20px_40px_-10px_rgba(20,83,45,0.3)] active:scale-95 group disabled:opacity-70"
                          >
                            {isSubmitting ? 'Submitting...' : 'Submit Partnership Inquiry'} <Send size={24} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                ) : (
                  <div className="p-20 text-center animate-fade-up">
                    <div className="w-32 h-32 bg-savanna-50 text-savanna-500 rounded-full flex items-center justify-center mx-auto mb-10 shadow-inner">
                      <Handshake size={64} className="animate-pulse" />
                    </div>
                    <h3 className="text-5xl font-serif font-black text-earth-900 mb-6 tracking-tighter">Inquiry Received</h3>
                    <p className="text-2xl text-earth-600 mb-8 max-w-2xl mx-auto font-light leading-relaxed">
                      Our Partnership Secretariat has safely received your detailed inquiry regarding the <span className="font-bold text-earth-900">"{selectedProgram.title}"</span> program.
                    </p>
                    <p className="text-xl text-savanna-600 font-bold italic mb-12">
                      A confirmation email has been sent to your inbox. Please check your email for the details.
                    </p>
                    <div className="inline-flex items-center gap-4 px-8 py-4 bg-earth-50 rounded-2xl border border-earth-100">
                      <div className="w-3 h-3 bg-savanna-500 rounded-full animate-ping"></div>
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-earth-500">Response protocol active: 48-72h</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="relative h-[40vh] overflow-hidden bg-earth-900">
            <div className="absolute inset-0 flex items-center justify-center bg-earth-800 opacity-40">
              <ImageIcon size={100} strokeWidth={1} className="text-earth-600" />
            </div>
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <span className="bg-savanna-500 text-white px-4 py-1 rounded-full text-sm font-bold uppercase mb-4 inline-block">Thematic Area</span>
                <h1 className="text-4xl md:text-6xl font-serif text-white leading-none tracking-tighter">
                  {selectedProgram.title}
                </h1>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2">
              <section className="mb-12">
                <h2 className="text-2xl font-bold text-earth-900 mb-6 flex items-center gap-2">
                  <Target className="text-savanna-500" /> Program Overview
                </h2>
                <p className="text-lg text-earth-600 leading-relaxed mb-8 font-light">{selectedProgram.description}</p>

                <h3 className="text-xl font-bold text-earth-800 mb-6 italic">Core Strategic Objectives</h3>
                <ul className="space-y-4 mb-12">
                  {selectedProgram.objectives.map((obj, i) => (
                    <li key={i} className="flex gap-4 text-earth-700 bg-white p-5 rounded-2xl border border-earth-100 shadow-sm">
                      <CheckCircle2 className="text-savanna-500 flex-shrink-0" size={24} />
                      <span className="font-medium">{obj}</span>
                    </li>
                  ))}
                </ul>

                <h3 className="text-xl font-bold text-earth-800 mb-6 italic">Key Implementation Activities</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedProgram.activities.map((act, i) => (
                    <div key={i} className="bg-earth-50/50 p-6 rounded-2xl border border-earth-100 text-earth-800 font-medium">
                      {act}
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white border border-earth-100 rounded-[3rem] p-10 sticky top-32 shadow-xl">
                <h3 className="text-2xl font-serif font-black text-earth-900 mb-8">Program Impact</h3>
                <div className="space-y-8">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-earth-400 mb-3">Primary Beneficiaries</p>
                    <p className="text-earth-700 font-bold flex items-center gap-3 text-lg">
                      <Users size={24} className="text-savanna-500" /> {selectedProgram.beneficiaries}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-earth-400 mb-4">Strategic Outcomes</p>
                    <div className="space-y-3">
                      {selectedProgram.outcomes.map((out, i) => (
                        <div key={i} className="text-sm text-earth-600 bg-savanna-50 px-5 py-3 rounded-xl border-l-4 border-savanna-500 italic">
                          {out}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsPartnerModalOpen(true)}
                  className="w-full mt-10 bg-earth-900 text-white py-5 rounded-2xl font-black text-lg hover:bg-savanna-500 transition-all shadow-xl active:scale-95"
                >
                  Partner on this Program
                </button>
              </div>
            </div>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="pt-32 pb-24 bg-earth-50 savanna-pattern min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h1 className="text-5xl md:text-8xl font-serif text-earth-900 mb-6 tracking-tighter">Our <span className="text-gradient">Programs</span></h1>
            <p className="text-xl text-earth-600 max-w-2xl mx-auto font-light leading-relaxed">ADC implements integrated community-led programs focused on resilience, peace, and rights-based development in South Sudan.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {uniquePrograms.map((prog) => (
              <div key={prog.id} className="bg-white rounded-[3rem] overflow-hidden border border-earth-100 shadow-sm hover:shadow-2xl transition-all duration-500 group flex flex-col h-full">
                <div className="h-48 bg-earth-900 flex flex-col items-center justify-center text-earth-700 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-10 flex items-center justify-center">
                    <ImageIcon size={100} strokeWidth={1} />
                  </div>
                  <div className="w-16 h-16 bg-savanna-500 text-white rounded-2xl flex items-center justify-center relative z-10 shadow-xl group-hover:scale-110 transition-transform">
                    <LayoutList size={28} />
                  </div>
                </div>
                <div className="p-10 flex flex-col flex-grow">
                  <h3 className="text-2xl font-serif font-bold text-earth-900 mb-4 group-hover:text-savanna-500 transition-colors">{prog.title}</h3>
                  <p className="text-earth-600 text-base mb-8 line-clamp-3 leading-relaxed font-light">{prog.description}</p>
                  <button
                    onClick={(e) => handleNavigate(e, prog.id)}
                    className="mt-auto inline-flex items-center gap-3 text-savanna-500 font-black uppercase tracking-widest text-xs hover:gap-5 transition-all"
                  >
                    View Program Details <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

