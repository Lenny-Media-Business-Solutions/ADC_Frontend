import React from 'react';
import { Mail, Phone, MapPin, Send, Globe, MessageSquare, Clock, ShieldCheck, Image as ImageIcon, Sparkles, CheckCircle2 } from 'lucide-react';
import { PageTransition, FadeIn } from '../components/animations';
import api from '../api';

export const Contact: React.FC = () => {
  const [formData, setFormData] = React.useState({
    full_name: '',
    email: '',
    subject: '', // No default to guide user
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await api.post('contact/', formData); // Adjust endpoint as needed
      setSubmitted(true);
      window.scrollTo(0, 0);
    } catch (err: any) {
      if (err.response?.data) {
        const errorMsg = Object.entries(err.response.data)
          .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(', ') : value}`)
          .join('\n');
        alert(`Failed to send message:\n${errorMsg}`);
      } else {
        alert('Failed to send message. Please try again later.');
      }
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <PageTransition>
        <div className="savanna-pattern min-h-screen pt-48 pb-32 text-center">
          <div className="max-w-3xl mx-auto px-6 lg:px-12 bg-white p-20 rounded-[4rem] shadow-xl border border-earth-100">
            <div className="w-24 h-24 bg-savanna-100 text-savanna-600 rounded-full flex items-center justify-center mx-auto mb-10">
              <CheckCircle2 size={48} />
            </div>
            <h2 className="text-4xl font-serif text-earth-900 mb-6 font-black tracking-tight">Message Received</h2>
            <p className="text-xl text-earth-600 font-light leading-relaxed mb-4">
              Thank you for reaching out to the ADC Secretariat. Your inquiry has been successfully received and our team will get back to you within 48 hours.
            </p>
            <p className="text-lg text-savanna-600 font-bold italic mb-10">
              A confirmation email has been sent to your inbox. Please check your email for the details.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="bg-earth-900 text-white px-10 py-4 rounded-full font-black text-sm uppercase tracking-widest shadow-xl hover:bg-savanna-500 transition-all font-sans"
            >
              Send Another Message
            </button>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="savanna-pattern min-h-screen pt-32">
        {/* Header Section */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 mb-16 animate-fade-up">
          <div className="flex flex-col md:flex-row items-end justify-between gap-8 border-b border-earth-100 pb-12">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-savanna-100 border border-savanna-200 text-savanna-600 text-[10px] font-black uppercase tracking-[0.4em] mb-6 shadow-sm">
                <Sparkles size={12} /> Contact the Secretariat
              </div>
              <h1 className="text-5xl md:text-7xl font-serif text-earth-900 mb-6 tracking-tighter leading-none font-black">
                Reach <span className="text-gradient">ADC</span>
              </h1>
              <p className="text-xl text-earth-600 font-light leading-relaxed">
                Our dedicated secretariat in Juba is ready to coordinate partnership inquiries, program support, and community engagement.
              </p>
            </div>
            <div className="hidden lg:block">
              <Globe className="w-32 h-32 text-earth-100 animate-pulse-slow font-sans" strokeWidth={0.5} />
            </div>
          </div>
        </section>

        {/* Main Contact Content */}
        <section className="max-w-7xl mx-auto px-6 lg:px-12 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

            {/* Left Side: Secretariat Channels */}
            <div className="lg:col-span-5 space-y-8 animate-fade-up" style={{ animationDelay: '0.1s' }}>
              <div className="bg-white p-10 md:p-12 rounded-[3.5rem] shadow-xl border border-earth-100 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-2 h-full bg-savanna-500"></div>

                <h3 className="text-3xl font-serif font-black text-earth-900 mb-10 tracking-tight">
                  Secretariat <span className="text-savanna-500 italic">Channels</span>
                </h3>

                <div className="space-y-10">
                  <div className="flex gap-6 group/item">
                    <div className="w-14 h-14 bg-earth-900 text-savanna-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover/item:bg-savanna-500 group-hover/item:text-white transition-all duration-300">
                      <MapPin size={28} />
                    </div>
                    <div className="flex flex-col justify-center">
                      <p className="text-[9px] font-black uppercase tracking-[0.3em] text-earth-400 mb-1">State HQ</p>
                      <p className="text-earth-900 text-lg leading-tight font-bold">Private Bag, Torit, Eastern Equatoria State, South Sudan</p>
                    </div>
                  </div>

                  <div className="flex gap-6 group/item">
                    <div className="w-14 h-14 bg-earth-900 text-savanna-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover/item:bg-savanna-500 group-hover/item:text-white transition-all duration-300">
                      <Mail size={28} />
                    </div>
                    <div className="flex flex-col justify-center">
                      <p className="text-[9px] font-black uppercase tracking-[0.3em] text-earth-400 mb-1">Official Email</p>
                      <p className="text-earth-900 text-lg font-bold">agrodevcon@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex gap-6 group/item">
                    <div className="w-14 h-14 bg-earth-900 text-savanna-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover/item:bg-savanna-500 group-hover/item:text-white transition-all duration-300">
                      <Phone size={28} />
                    </div>
                    <div className="flex flex-col justify-center">
                      <p className="text-[9px] font-black uppercase tracking-[0.3em] text-earth-400 mb-1">Inquiry Line</p>
                      <p className="text-earth-900 text-lg font-bold">+211 917 317 472</p>
                    </div>
                  </div>
                </div>

                <div className="mt-12 pt-8 border-t border-earth-50 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-earth-50 flex items-center justify-center text-earth-400">
                    <Clock size={18} />
                  </div>
                  <p className="text-xs text-earth-500 font-bold italic uppercase tracking-widest">Available Mon - Fri, 8AM - 5PM EAT</p>
                </div>
              </div>

              {/* Sub-Card: Operational Reach */}
              <div className="bg-earth-900 p-10 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden group border border-earth-800">
                <div className="absolute -bottom-10 -right-10 opacity-5">
                  <ImageIcon size={180} strokeWidth={1} />
                </div>
                <div className="relative z-10">
                  <h4 className="font-serif text-2xl font-black italic mb-6 flex items-center gap-3">
                    <ShieldCheck className="text-savanna-500" size={24} /> Field Reach
                  </h4>
                  <p className="text-earth-300 leading-relaxed mb-8 font-light text-base">
                    Coordinating programs across the critical arid and semi-arid lands of South Sudan.
                  </p>
                  <div className="grid grid-cols-2 gap-y-4">
                    {['Central Equatoria', 'Eastern Equatoria', 'Bahr el Ghazal', 'Upper Nile'].map(loc => (
                      <div key={loc} className="flex items-center gap-3 text-[9px] font-black text-earth-400 uppercase tracking-[0.3em]">
                        <div className="w-1.5 h-1.5 rounded-full bg-savanna-500"></div>
                        {loc}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Message Form */}
            <div className="lg:col-span-7 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              <div className="bg-white p-10 md:p-14 rounded-[4rem] shadow-xl border border-earth-100 flex flex-col h-full relative overflow-hidden">
                <div className="mb-12">
                  <h3 className="text-4xl font-serif font-black text-earth-900 mb-4 tracking-tight">
                    Send a <span className="text-gradient">Message</span>
                  </h3>
                  <p className="text-earth-500 font-light text-lg">
                    Submit your inquiry and our team will get back to you within 48 hours.
                  </p>
                </div>

                <form className="space-y-8" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.4em] text-earth-400 ml-6">Your Name</label>
                      <input
                        type="text"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleChange}
                        className="w-full bg-earth-50 border-2 border-transparent rounded-2xl px-8 py-5 focus:bg-white focus:border-savanna-500 focus:outline-none transition-all font-bold text-earth-800 shadow-sm"
                        placeholder="Organization or Individual"
                        required
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.4em] text-earth-400 ml-6">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-earth-50 border-2 border-transparent rounded-2xl px-8 py-5 focus:bg-white focus:border-savanna-500 focus:outline-none transition-all font-bold text-earth-800 shadow-sm"
                        placeholder="email@org.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.4em] text-earth-400 ml-6">Thematic Area</label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`w-full bg-earth-50 border-2 border-transparent rounded-2xl px-8 py-5 focus:bg-white focus:border-savanna-500 focus:outline-none transition-all appearance-none cursor-pointer shadow-sm ${!formData.subject ? 'text-earth-900/40 font-medium' : 'text-earth-800 font-bold'}`}
                      required
                    >
                      <option value="" disabled>Select your area of interest</option>
                      <option>Program Partnership</option>
                      <option>Volunteer Inquiry</option>
                      <option>Media & Stories</option>
                      <option>Technical Support</option>
                      <option>General Support</option>
                    </select>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.4em] text-earth-400 ml-6">Message Details</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full bg-earth-50 border-2 border-transparent rounded-[2.5rem] px-8 py-6 focus:bg-white focus:border-savanna-500 focus:outline-none transition-all font-medium text-earth-800 shadow-sm resize-none leading-relaxed"
                      placeholder="How can we help you?"
                      required
                    ></textarea>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full md:w-auto px-12 py-6 bg-earth-900 text-white rounded-2xl font-black text-lg flex items-center justify-center gap-4 transition-all shadow-xl hover:bg-savanna-500 active:scale-95 group disabled:opacity-70"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Inquiry'} <Send size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};
