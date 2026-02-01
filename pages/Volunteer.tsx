import React, { useState } from 'react';
import {
  Users,
  GraduationCap,
  Heart,
  Briefcase,
  ShieldCheck,
  Scale,
  Microscope,
  Camera,
  Globe,
  Church,
  CheckCircle2,
  Send,
  Image as ImageIcon,
  Sparkles,
  Phone,
  MapPin,
  ListFilter,
  CalendarDays
} from 'lucide-react';
import { PageTransition, FadeIn } from '../components/animations';
import api from '../api';

const VOLUNTEER_TYPES = [
  {
    title: "Local Community Volunteers",
    priority: "Highest Priority",
    icon: <Users className="w-8 h-8" />,
    who: "Community members from pastoralist areas; Village leaders, elders, mobilizers; Women and youth group members.",
    why: "Deep understanding of local culture and conflict dynamics; Trusted by communities; Enable sustainability.",
    roles: ["Community mobilization", "Peace dialogue facilitation", "Data collection", "Monitoring community activities"]
  },
  {
    title: "Youth & Student Volunteers",
    icon: <GraduationCap className="w-8 h-8" />,
    who: "University students; Recent graduates; Youth associations (especially women and youth).",
    why: "Injects innovation and energy; Provides learning opportunities for the next generation of leaders.",
    roles: ["Field support during projects", "Community surveys & data entry", "Youth-led peace activities", "ICT support"]
  },
  {
    title: "Women & Women-Led Groups",
    icon: <Heart className="w-8 h-8" />,
    who: "Women leaders; Women’s savings groups; Women peace committees; Female professionals.",
    why: "ADC places special emphasis on women’s participation and leadership as a core pillar of development.",
    roles: ["Gender advocacy", "Supporting livelihood groups", "Mediation initiatives", "Mentorship for girls"]
  },
  {
    title: "Technical & Professional Volunteers",
    icon: <Briefcase className="w-8 h-8" />,
    who: "Professionals offering skills (Agriculture, Climate Change, M&E, Governance, Public Health).",
    why: "Provides high-level expertise that strengthens our program design and delivery.",
    roles: ["Technical training & mentoring", "Program design support", "Assessments", "Capacity building"]
  },
  {
    title: "Humanitarian Practitioners",
    icon: <ShieldCheck className="w-8 h-8" />,
    who: "NGO workers and independent development practitioners looking to give back.",
    why: "Deep knowledge of international donor standards and compliance in fragile settings.",
    roles: ["Proposal writing support", "Project documentation", "Policy analysis", "Organizational development"]
  },
  {
    title: "Peacebuilders & Mediators",
    icon: <Scale className="text-earth-900" />,
    who: "Trained mediators, traditional conflict resolution practitioners, and peace educators.",
    why: "Essential for our work in resource-based conflict zones and cross-border dialogues.",
    roles: ["Supporting dialogues", "Conflict analysis & mapping", "Peace education workshops"]
  },
  {
    title: "Research & Data Volunteers",
    icon: <Microscope className="w-8 h-8" />,
    who: "Researchers, data analysts, and students conducting field research.",
    why: "Ensures our interventions are evidence-based and outcomes are accurately measured.",
    roles: ["Baseline and endline studies", "Case studies", "Community surveys", "Data visualization"]
  },
  {
    title: "Media & Communications",
    icon: <Camera className="w-8 h-8" />,
    who: "Content writers, photographers, videographers, and graphic designers.",
    why: "Amplifies the voices of the communities we serve and showcases our impact.",
    roles: ["Storytelling from the field", "Managing social media", "Designing reports", "Documenting success stories"]
  },
  {
    title: "International Volunteers",
    icon: <Globe className="w-8 h-8" />,
    who: "International volunteers, diaspora professionals, and remote technical advisors.",
    why: "Brings global perspectives and specialized skills (Remote-friendly).",
    roles: ["Remote training", "Grant writing", "Donor engagement", "Systems strengthening"]
  },
  {
    title: "Faith-Based & CBO Volunteers",
    icon: <Church className="w-8 h-8" />,
    who: "Volunteers from local CBOs and FBOs aligned with ADC values.",
    why: "Leverages existing community networks for rapid outreach and social cohesion.",
    roles: ["Community outreach", "Social cohesion initiatives", "Disaster response support"]
  }
];

export const Volunteer: React.FC = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    location: '',
    area_of_interest: VOLUNTEER_TYPES[0].title,
    availability: 'Immediately',
    skills: '',
    motivation: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await api.post('volunteers/', formData);
      setSubmitted(true);
      window.scrollTo(0, 0);
    } catch (err) {
      alert('Failed to submit application. Please try again later.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-white savanna-pattern pt-48 pb-32 text-center">
          <div className="max-w-3xl mx-auto px-6 lg:px-12 bg-white p-20 rounded-[4rem] shadow-xl border border-earth-100">
            <div className="w-24 h-24 bg-savanna-100 text-savanna-600 rounded-full flex items-center justify-center mx-auto mb-10">
              <CheckCircle2 size={48} />
            </div>
            <h2 className="text-4xl font-serif text-earth-900 mb-6 font-black tracking-tight">Application Received</h2>
            <p className="text-xl text-earth-600 font-light leading-relaxed mb-4">
              Thank you for your interest in volunteering with ADC. Your application has been successfully submitted to our secretariat in Juba.
              We will review your details and contact you soon.
            </p>
            <p className="text-lg text-savanna-600 font-bold italic mb-10">
              A confirmation email has been sent to your inbox. Please check your email for the details.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="bg-earth-900 text-white px-10 py-4 rounded-full font-black text-sm uppercase tracking-widest shadow-xl hover:bg-savanna-500 transition-all"
            >
              Submit Another Application
            </button>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="flex flex-col min-h-screen bg-white savanna-pattern">
        {/* Header Section */}
        <section className="bg-earth-900 text-white pt-48 pb-32 relative overflow-hidden text-center">
          <div className="absolute inset-0 opacity-10 flex items-center justify-center bg-earth-800">
            <ImageIcon size={120} strokeWidth={1} className="text-earth-600" />
          </div>
          <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
            <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-earth-800/50 border border-earth-700 text-earth-300 text-[10px] font-black uppercase tracking-[0.5em] mb-10 shadow-2xl">
              <Sparkles size={12} className="text-savanna-500" /> Support South Sudan
            </div>
            <h1 className="font-serif leading-none mb-10 tracking-tighter text-[clamp(24px,6vw,52px)] overflow-visible max-w-4xl mx-auto px-4">
              Agropastoralists <span className="text-savanna-500 italic">Development</span> Consortium
            </h1>
            <p className="text-xl md:text-3xl text-earth-200 max-w-3xl mx-auto font-light leading-relaxed opacity-90">
              Whether you are a local community leader or a global professional, your skills can help build a more resilient South Sudan.
            </p>
          </div>
        </section>

        {/* Why Volunteer Section */}
        <section className="py-24 max-w-7xl mx-auto px-6 lg:px-12">
          <FadeIn>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-serif text-earth-900 mb-8 tracking-tight">Why Volunteer <span className="text-gradient italic">with ADC?</span></h2>
              <p className="text-xl text-earth-600 leading-relaxed mb-12 font-light">
                At ADC, we believe that development is most sustainable when it is led by the community and supported by dedicated individuals. Our volunteers are partners in our mission to serve agropastoralists and marginalized groups.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                {[
                  "Gain hands-on experience in fragile and arid contexts.",
                  "Contribute to rights-based development and peacebuilding.",
                  "Collaborate with a diverse team of development professionals."
                ].map((text, i) => (
                  <div key={i} className="flex gap-4 items-start bg-earth-50 p-6 rounded-3xl border border-earth-100">
                    <div className="w-8 h-8 rounded-full bg-savanna-100 text-savanna-600 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 size={18} />
                    </div>
                    <p className="text-earth-700 font-medium">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </section>

        {/* Categories Grid */}
        <section className="py-24 bg-earth-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-serif text-earth-900 mb-6 tracking-tighter">Volunteer <span className="text-gradient">Categories</span></h2>
              <p className="text-xl text-earth-600 max-w-2xl mx-auto font-light">Diverse skills for diverse community needs.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {VOLUNTEER_TYPES.map((type, idx) => (
                <div key={idx} className="bg-white p-10 rounded-[3rem] border border-earth-100 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full group">
                  <div className="text-earth-900 mb-8 flex items-center justify-between">
                    <div className="p-4 bg-earth-50 rounded-2xl group-hover:bg-savanna-500 group-hover:text-white transition-colors duration-500">{type.icon}</div>
                    {type.priority && (
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] bg-savanna-100 text-savanna-600 px-4 py-1.5 rounded-full">
                        {type.priority}
                      </span>
                    )}
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-earth-900 mb-6">{type.title}</h3>
                  <div className="space-y-6 text-sm flex-grow">
                    <div>
                      <p className="font-black text-earth-400 uppercase tracking-widest text-[9px] mb-2">Who they are</p>
                      <p className="text-earth-700 leading-relaxed font-medium">{type.who}</p>
                    </div>
                    <div>
                      <p className="font-black text-earth-400 uppercase tracking-widest text-[9px] mb-2">Typical Roles</p>
                      <ul className="space-y-2">
                        {type.roles.map((role, rIdx) => (
                          <li key={rIdx} className="flex gap-3 text-earth-600 italic">
                            <span className="text-savanna-500 font-black">•</span> {role}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Expanded Application Form */}
        <section className="py-32 max-w-5xl mx-auto px-6 lg:px-12" id="apply">
          <div className="bg-white rounded-[4rem] shadow-[0_64px_128px_-32px_rgba(20,83,45,0.15)] border border-earth-100 overflow-hidden">
            <div className="bg-savanna-500 p-12 md:p-16 text-white text-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 flex items-center justify-center">
                <Sparkles size={200} strokeWidth={1} />
              </div>
              <h2 className="text-4xl md:text-6xl font-serif mb-4 leading-none tracking-tighter relative z-10">Apply to Volunteer</h2>
              <p className="text-xl text-savanna-50 opacity-90 font-light italic relative z-10">Support transformation across South Sudan's heartlands.</p>
            </div>

            <form className="p-12 md:p-20 space-y-12" onSubmit={handleSubmit}>
              {/* Identity Group */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.4em] text-earth-400 ml-6 flex items-center gap-2">
                    <Users size={12} className="text-savanna-500" /> Full Identity
                  </label>
                  <input
                    type="text"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleChange}
                    className="w-full bg-earth-50 border-2 border-transparent rounded-[2rem] px-8 py-5 focus:bg-white focus:border-savanna-500 focus:outline-none transition-all font-bold text-earth-800 shadow-inner"
                    placeholder="Enter Full Name" required
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.4em] text-earth-400 ml-6 flex items-center gap-2">
                    <ImageIcon size={12} className="text-savanna-500" /> Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-earth-50 border-2 border-transparent rounded-[2rem] px-8 py-5 focus:bg-white focus:border-savanna-500 focus:outline-none transition-all font-bold text-earth-800 shadow-inner"
                    placeholder="example@email.com" required
                  />
                </div>
              </div>

              {/* Contact Group */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.4em] text-earth-400 ml-6 flex items-center gap-2">
                    <Phone size={12} className="text-savanna-500" /> Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-earth-50 border-2 border-transparent rounded-[2rem] px-8 py-5 focus:bg-white focus:border-savanna-500 focus:outline-none transition-all font-bold text-earth-800 shadow-inner"
                    placeholder="+211 ..." required
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.4em] text-earth-400 ml-6 flex items-center gap-2">
                    <MapPin size={12} className="text-savanna-500" /> Current Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full bg-earth-50 border-2 border-transparent rounded-[2rem] px-8 py-5 focus:bg-white focus:border-savanna-500 focus:outline-none transition-all font-bold text-earth-800 shadow-inner"
                    placeholder="City, Country" required
                  />
                </div>
              </div>

              {/* Classification Group */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.4em] text-earth-400 ml-6 flex items-center gap-2">
                    <ListFilter size={12} className="text-savanna-500" /> Preferred Category
                  </label>
                  <select
                    name="area_of_interest"
                    value={formData.area_of_interest}
                    onChange={handleChange}
                    className="w-full bg-earth-50 border-2 border-transparent rounded-[2rem] px-8 py-5 focus:bg-white focus:border-savanna-500 focus:outline-none transition-all font-bold text-earth-800 shadow-inner appearance-none cursor-pointer"
                  >
                    {VOLUNTEER_TYPES.map(type => (
                      <option key={type.title} value={type.title}>{type.title}</option>
                    ))}
                    <option value="Other">Other Skills</option>
                  </select>
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.4em] text-earth-400 ml-6 flex items-center gap-2">
                    <CalendarDays size={12} className="text-savanna-500" /> Earliest Availability
                  </label>
                  <select
                    name="availability"
                    value={formData.availability}
                    onChange={handleChange}
                    className="w-full bg-earth-50 border-2 border-transparent rounded-[2rem] px-8 py-5 focus:bg-white focus:border-savanna-500 focus:outline-none transition-all font-bold text-earth-800 shadow-inner appearance-none cursor-pointer"
                  >
                    <option>Immediately</option>
                    <option>Within 1 Month</option>
                    <option>Within 3 Months</option>
                    <option>For specific projects only</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-earth-400 ml-6">Skill Set & Technical Expertise</label>
                <textarea
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  rows={4}
                  className="w-full bg-earth-50 border-2 border-transparent rounded-[2.5rem] px-8 py-6 focus:bg-white focus:border-savanna-500 focus:outline-none transition-all font-medium text-earth-800 leading-relaxed shadow-inner"
                  placeholder="E.g. Agriculture engineering, Peace mediation, Data Analysis, Photography..."
                ></textarea>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-earth-400 ml-6">Statement of Motivation</label>
                <textarea
                  name="motivation"
                  value={formData.motivation}
                  onChange={handleChange}
                  rows={4}
                  className="w-full bg-earth-50 border-2 border-transparent rounded-[2.5rem] px-8 py-6 focus:bg-white focus:border-savanna-500 focus:outline-none transition-all font-medium text-earth-800 leading-relaxed shadow-inner"
                  placeholder="Why do you wish to volunteer with ADC and support agropastoralists in South Sudan?"
                ></textarea>
              </div>

              {/* Checkboxes Removed */}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-earth-900 hover:bg-savanna-500 text-white py-10 rounded-[3rem] font-black text-2xl flex items-center justify-center gap-4 transition-all shadow-2xl active:scale-95 group disabled:opacity-70"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'} <Send size={24} className="group-hover:translate-x-2 transition-transform duration-300" />
              </button>
            </form>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};