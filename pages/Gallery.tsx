import React, { useState } from 'react';
import { Camera, Image as ImageIcon, Droplets } from 'lucide-react';
import { PageTransition, FadeIn } from '../components/animations';

// Static images (17 items)
const GALLERY_ITEMS = [
  { id: 1, url: 'https://res.cloudinary.com/ddwtrkhss/image/upload/v1769759905/APFS_methodology_ruwz8d.jpg', caption: 'Training on APFS methodology bringing together three APFS groups(Lojiong, Nganacala, Kibiric)' },
  { id: 2, url: 'https://res.cloudinary.com/ddwtrkhss/image/upload/v1769759967/Boma_qji4x8.jpg', caption: 'Homiri Model APFS group in their farm in, Monita Boma' },
  { id: 3, url: 'https://res.cloudinary.com/ddwtrkhss/image/upload/v1769759969/Chukudum_we2shu.jpg', caption: 'Farmers receiving seeds from CDSS stores in Chukudum' },
  { id: 4, url: 'https://res.cloudinary.com/ddwtrkhss/image/upload/v1769759973/Emen_yyvykh.jpg', caption: 'Hibilit Emen VSLA group meeting during the session in Hibiric Boma, Homiri Payam' },
  { id: 5, url: 'https://res.cloudinary.com/ddwtrkhss/image/upload/v1769759974/Extension_worker_q4lelo.jpg', caption: ' Extension Worker Nelson Lokoro inspecting Nganacala APFS Farm in Lohipar' },
  { id: 6, url: 'https://res.cloudinary.com/ddwtrkhss/image/upload/v1769759977/Feddans_vvjefe.jpg', caption: 'Hevela Ox-plough Technology group in their 25 Feddans ' },
  { id: 7, url: 'https://res.cloudinary.com/ddwtrkhss/image/upload/v1769759980/Hibiric_ihv3cf.jpg', caption: 'Lohomit ox-plough technology group in their farms in Lohomit Hibiric Boma, Homiri Payam' },
  { id: 8, url: 'https://res.cloudinary.com/ddwtrkhss/image/upload/v1769759983/Judita_Naboi_jd8xue.jpg', caption: 'Judita Naboi Farmer from Nganacala Seeds production group displaying her seeds' },
  { id: 9, url: 'https://res.cloudinary.com/ddwtrkhss/image/upload/v1769760099/Lohomit_wzv6da.jpg', caption: 'Lohomit ox-plough technology group in their farms in Lohomit Hibiric Boma, Homiri Payam' },
  { id: 10, url: 'https://res.cloudinary.com/ddwtrkhss/image/upload/v1769760108/Lothigira_dhyxjr.jpg', caption: 'Lojiong Seeds production APFS displaying their seeds, in Lothigira Boma, Homiri Payam' },
  { id: 11, url: 'https://res.cloudinary.com/ddwtrkhss/image/upload/v1769760102/Lojiong_seeds_cllstw.jpg', caption: 'Lojiong seeds bulking APFS practicing AESA in Cassava field' },
  { id: 12, url: 'https://res.cloudinary.com/ddwtrkhss/image/upload/v1769760162/NRM_training_dgdgsg.jpg', caption: 'NRM training in Lotukei' },
  { id: 13, url: 'https://res.cloudinary.com/ddwtrkhss/image/upload/v1769760167/Piobokoi_livestock_m6mqv6.jpg', caption: 'Piobokoi Livestock APFS during  learning session in Lotukei' },
  { id: 14, url: 'https://res.cloudinary.com/ddwtrkhss/image/upload/v1769760169/Sesame_Chukudum_q9wdon.jpg', caption: 'Nangedera Farmers Producer group during training in their Sesame Farm in Chukudum' },
  { id: 15, url: 'https://res.cloudinary.com/ddwtrkhss/image/upload/v1769760174/Stripe_shirt_ztxrwe.jpg', caption: 'Piobokoi Livestock APFS in Lorege Boma during learning session with participation of CDSS project officer in red and black stripe shirt.' },
  { id: 16, url: 'https://res.cloudinary.com/ddwtrkhss/image/upload/v1769760177/Training_lxgeas.jpg', caption: 'CAHWs after refresher training in Chukudum' },
  { id: 17, url: 'https://res.cloudinary.com/ddwtrkhss/image/upload/v1769762954/Himodo_veg_sne7gj.jpg', caption: 'Himodo vegetable APFS group preparing their vegetable land in Himodo area Central payam' },
];

// Handwashing Day images (8 items, no captions)
const HANDWASHING_ITEMS = [
  { id: 'hw-1', url: 'https://res.cloudinary.com/ddwtrkhss/image/upload/v1769763517/wash_n0apvu.jpg' },
  { id: 'hw-2', url: 'https://res.cloudinary.com/ddwtrkhss/image/upload/v1769763515/Speaker_zul8df.jpg' },
  { id: 'hw-3', url: 'https://res.cloudinary.com/ddwtrkhss/image/upload/v1769763513/school_knxodv.jpg' },
  { id: 'hw-4', url: 'https://res.cloudinary.com/ddwtrkhss/image/upload/v1769763511/pupils_dmfq0g.jpg' },
  { id: 'hw-5', url: 'https://res.cloudinary.com/ddwtrkhss/image/upload/v1769763508/kids_nqlqfk.jpg' },
  { id: 'hw-6', url: 'https://res.cloudinary.com/ddwtrkhss/image/upload/v1769763508/handwashing_slinyv.jpg' },
  { id: 'hw-7', url: 'https://res.cloudinary.com/ddwtrkhss/image/upload/v1769763507/community_uafaiq.jpg' },
  { id: 'hw-8', url: 'https://res.cloudinary.com/ddwtrkhss/image/upload/v1769763506/blue_ivp6yt.jpg' },
];

export const Gallery: React.FC = () => {
  const [showHandwashing, setShowHandwashing] = useState(false);

  return (
    <PageTransition>
      <div className="pt-32 pb-24 savanna-pattern min-h-screen">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Header */}
          <div className="text-center mb-20 animate-fade-up">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Camera className="text-savanna-500" size={32} />
              <span className="text-savanna-500 font-black uppercase tracking-[0.4em] text-xs">South Sudan Narratives</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-serif text-earth-900 mb-8 tracking-tighter">Impact in <span className="text-gradient italic">Focus</span></h1>
            <p className="text-xl text-earth-600 max-w-2xl mx-auto font-light leading-relaxed mb-12">
              A visual record of our community interventions and resilience building across South Sudan.
            </p>

            <button
              onClick={() => setShowHandwashing(!showHandwashing)}
              className={`px-8 py-3 rounded-full font-black text-sm uppercase tracking-widest transition-all shadow-lg flex items-center gap-3 mx-auto ${showHandwashing ? 'bg-savanna-500 text-white' : 'bg-white text-earth-900 border border-earth-100 hover:border-savanna-500'}`}
            >
              <Droplets size={18} /> {showHandwashing ? 'Hide Event Photos' : 'View Handwashing Day'}
            </button>
          </div>

          {/* Handwashing Day Section (Toggleable) */}
          {showHandwashing && (
            <div className="mb-24 animate-fade-up bg-earth-50/50 p-8 rounded-[3rem] border border-earth-100">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-serif font-black text-earth-900 flex items-center justify-center gap-3">
                  <Droplets className="text-blue-500" /> Global Handwashing Day
                </h2>
                <p className="text-earth-500 mt-2">Promoting hygiene and health in our communities.</p>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {HANDWASHING_ITEMS.map((image) => (
                  <div key={image.id} className="aspect-square bg-white rounded-3xl overflow-hidden shadow-sm border border-earth-100 relative group">
                    {!image.url ? (
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-earth-100/30">
                        <ImageIcon size={24} className="text-earth-400 mb-2" />
                        <p className="text-[10px] text-earth-400 font-mono">ID: {image.id}</p>
                      </div>
                    ) : (
                      <img
                        src={image.url}
                        alt="Handwashing Day Event"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Main Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
            {GALLERY_ITEMS.map((image) => (
              <FadeIn key={image.id}>
                <div className="group relative bg-white rounded-[3rem] overflow-hidden shadow-sm border border-earth-100 min-h-[400px]">
                  {/* Image Section */}
                  <div className="aspect-video overflow-hidden bg-earth-200 relative flex items-center justify-center group-hover:shadow-inner transition-all">
                    {!image.url ? (
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-earth-100/50">
                        <ImageIcon size={48} className="text-earth-400 mb-4" />
                        <p className="text-earth-500 font-bold text-sm uppercase tracking-widest">Image Placeholder</p>
                        <p className="text-earth-400 text-xs mt-2">ID: {image.id}</p>
                      </div>
                    ) : (
                      <img
                        src={image.url}
                        alt={image.caption}
                        className="w-full h-full object-cover relative z-10 transition-transform duration-1000 group-hover:scale-110"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                      />
                    )}
                  </div>

                  {/* Caption Section */}
                  <div className="p-8">
                    <h3 className="text-earth-900 font-serif text-xl leading-relaxed">{image.caption}</h3>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};
