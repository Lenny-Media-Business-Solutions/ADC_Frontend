import React, { useState } from 'react';
import { Camera, Image as ImageIcon } from 'lucide-react';
import { PageTransition, FadeIn } from '../components/animations';

// Static images (17 items)
const GALLERY_ITEMS = [
  { id: 1, url: 'https://res.cloudinary.com/ddwtrkhss/image/upload/v1769759905/APFS_methodology_ruwz8d.jpg', caption: 'Training on APFS methodology bringing together three APFS groups(Lojiong, Nganacala, Kibiric)' },
  { id: 2, url: 'https://res.cloudinary.com/ddwtrkhss/image/upload/v1769759967/Boma_qji4x8.jpg', caption: 'Homiri Model APFS group in their farm in, Monita Boma' },
  { id: 3, url: 'https://res.cloudinary.com/ddwtrkhss/image/upload/v1769759977/Feddans_vvjefe.jpg', caption: 'Hevela Ox-plough Technology group in their 25 Feddans ' },
  { id: 4, url: 'https://res.cloudinary.com/ddwtrkhss/image/upload/v1769759980/Hibiric_ihv3cf.jpg', caption: 'Lohomit ox-plough technology group in their farms in Lohomit Hibiric Boma, Homiri Payam' },
  { id: 5, url: 'https://res.cloudinary.com/ddwtrkhss/image/upload/v1769759983/Judita_Naboi_jd8xue.jpg', caption: 'Judita Naboi Farmer from Nganacala Seeds production group displaying her seeds' },
  { id: 6, url: 'https://res.cloudinary.com/ddwtrkhss/image/upload/v1769760099/Lohomit_wzv6da.jpg', caption: 'Lohomit ox-plough technology group in their farms in Lohomit Hibiric Boma, Homiri Payam' },
  { id: 7, url: 'https://res.cloudinary.com/ddwtrkhss/image/upload/v1769760108/Lothigira_dhyxjr.jpg', caption: 'Lojiong Seeds production APFS displaying their seeds, in Lothigira Boma, Homiri Payam' },
  { id: 8, url: 'https://res.cloudinary.com/ddwtrkhss/image/upload/v1769760162/NRM_training_dgdgsg.jpg', caption: 'NRM training in Lotukei' },
  { id: 9, url: 'https://res.cloudinary.com/ddwtrkhss/image/upload/v1769760167/Piobokoi_livestock_m6mqv6.jpg', caption: 'Piobokoi Livestock APFS during  learning session in Lotukei' },
  { id: 10, url: 'https://res.cloudinary.com/ddwtrkhss/image/upload/v1769760169/Sesame_Chukudum_q9wdon.jpg', caption: 'Nangedera Farmers Producer group during training in their Sesame Farm in Chukudum' },
  { id: 11, url: 'https://res.cloudinary.com/ddwtrkhss/image/upload/v1769760174/Stripe_shirt_ztxrwe.jpg', caption: 'Piobokoi Livestock APFS in Lorege Boma during learning session with participation of CDSS project officer in red and black stripe shirt.' },
  { id: 12, url: 'https://res.cloudinary.com/ddwtrkhss/image/upload/v1769760177/Training_lxgeas.jpg', caption: 'CAHWs after refresher training in Chukudum' },
  { id: 13, url: 'https://res.cloudinary.com/ddwtrkhss/image/upload/v1769762954/Himodo_veg_sne7gj.jpg', caption: 'Himodo vegetable APFS group preparing their vegetable land in Himodo area Central payam' },
  { id: 14, url: 'https://res.cloudinary.com/ddwtrkhss/image/upload/v1772786625/evezdbpd8o9zdamlwiwj.jpg', caption: 'ADC preserves and promotes use of indeginous seeds for staple crops' },
];


export const Gallery: React.FC = () => {

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
          </div>


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
