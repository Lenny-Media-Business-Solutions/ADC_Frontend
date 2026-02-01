import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#/' },
  { label: 'About Us', href: '#/about' },
  {
    label: 'Programs',
    href: '#/programs',
    children: [
      { label: 'All Programs', href: '#/programs' },
      { label: 'Training Services', href: '#/training-services' },
    ]
  },
  { label: 'Projects', href: '#/projects' },
  { label: 'Impact', href: '#/impact' },
  { label: 'News', href: '#/news' },
  { label: 'Gallery', href: '#/gallery' },
  { label: 'Contact', href: '#/contact' },
];

export const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const WHATSAPP_NUMBER = "211929500266";
  const WHATSAPP_MESSAGE = "Hello Agropastoralists Development Consortium (ADC), I am contacting you through the website. I would like to inquire more about your programs in South Sudan.";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Ensure body scroll is locked when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const navigate = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    window.location.hash = href;
    setIsOpen(false);
    setExpandedItem(null);
  };

  const toggleExpand = (label: string) => {
    setExpandedItem(expandedItem === label ? null : label);
  };

  return (
    <>
      <nav
        className={`fixed w-full z-[100] transition-all duration-300 border-b ${isScrolled
          ? 'bg-white shadow-lg py-2 border-earth-100'
          : 'bg-white/90 backdrop-blur-sm py-4 border-earth-100/50'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button onClick={(e) => navigate(e, '#/')} className="flex items-center gap-2 sm:gap-4 group text-left min-w-0 flex-shrink-0 mr-4 md:mr-6 lg:mr-8 xl:mr-12">
              <img
                src="https://res.cloudinary.com/ddwtrkhss/image/upload/v1769681519/ADC_Logo_final_aana4a.png"
                alt="ADC Logo"
                className="w-16 h-16 sm:w-20 sm:h-20 object-contain flex-shrink-0 group-hover:scale-105 transition-transform"
              />
              <div className="leading-tight flex flex-col justify-center min-w-0">
                <p className="font-black text-earth-900 text-[10px] sm:text-sm lg:text-base tracking-tight leading-none">
                  Agropastoralists Development Consortium
                </p>
                <p className="text-[8px] sm:text-[9px] uppercase font-black tracking-[0.2em] text-savanna-500 mt-0.5">South Sudan</p>
              </div>
            </button>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center space-x-1">
              {NAV_ITEMS.map((item) => (
                <div key={item.label} className="relative group px-1 py-2">
                  <button
                    onClick={(e) => navigate(e, item.href)}
                    className="flex items-center gap-1 font-bold text-sm text-earth-800 hover:text-savanna-500 transition-colors py-1 px-2 whitespace-nowrap"
                  >
                    {item.label}
                    {item.children && <ChevronDown size={14} className="opacity-50" />}
                  </button>

                  {item.children && (
                    <div className="absolute left-0 mt-2 w-52 bg-white rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-3 border border-earth-50 translate-y-2 group-hover:translate-y-0">
                      {item.children.map((child) => (
                        <button
                          key={child.label}
                          onClick={(e) => navigate(e, child.href)}
                          className="w-full text-left block px-5 py-2.5 text-sm font-bold text-earth-700 hover:bg-earth-50 hover:text-savanna-500 transition-colors"
                        >
                          {child.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="flex items-center gap-3 ml-4 pl-4 border-l border-earth-200">
                <button
                  onClick={(e) => navigate(e, '#/volunteer')}
                  className="bg-savanna-500 hover:bg-savanna-600 text-white px-6 py-2.5 rounded-full font-black text-sm transition-all shadow-md active:scale-95 whitespace-nowrap"
                >
                  Volunteer
                </button>
              </div>
            </div>

            {/* Mobile Toggle Button */}
            <div className="lg:hidden flex items-center ml-auto flex-shrink-0">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-earth-900 hover:bg-earth-100 rounded-xl transition-colors relative z-[110]"
                aria-label={isOpen ? "Close menu" : "Open menu"}
              >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`lg:hidden fixed inset-0 bg-white/98 backdrop-blur-xl z-[90] transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 visible translate-x-0' : 'opacity-0 invisible translate-x-full'
          }`}
      >
        <div className="h-full flex flex-col pt-24 pb-12 px-6 sm:px-12 overflow-y-auto savanna-pattern">
          <div className="flex flex-col space-y-1 mb-8">
            {NAV_ITEMS.map((item) => (
              <div key={item.label} className="border-b border-earth-100 last:border-0">
                <div className="flex items-center justify-between py-4">
                  <button
                    onClick={(e) => navigate(e, item.href)}
                    className="text-left text-xl font-black text-earth-900 flex-grow"
                  >
                    {item.label}
                  </button>
                  {item.children && (
                    <button
                      onClick={() => toggleExpand(item.label)}
                      className="p-3 bg-earth-50 rounded-xl text-earth-500 active:bg-earth-100 transition-colors"
                    >
                      <ChevronDown size={20} className={`transition-transform duration-300 ${expandedItem === item.label ? 'rotate-180' : ''}`} />
                    </button>
                  )}
                </div>

                {item.children && (
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedItem === item.label ? 'max-h-[400px] opacity-100 mb-6' : 'max-h-0 opacity-0'}`}>
                    <div className="pl-4 space-y-1 border-l-2 border-savanna-500/30 ml-1 mt-1">
                      {item.children.map((child) => (
                        <button
                          key={child.label}
                          onClick={(e) => navigate(e, child.href)}
                          className="w-full text-left text-base font-bold text-earth-600 py-3 flex items-center gap-3 hover:text-savanna-500 transition-colors"
                        >
                          <ChevronRight size={16} className="text-savanna-500" />
                          {child.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-auto space-y-4">
            <button
              onClick={(e) => navigate(e, '#/volunteer')}
              className="w-full bg-savanna-500 text-white text-center py-5 rounded-2xl font-black text-lg block shadow-xl shadow-savanna-500/20 active:scale-95 transition-all"
            >
              Apply to Volunteer
            </button>
            <p className="text-center text-[10px] uppercase font-black tracking-[0.2em] text-earth-400">
              South Sudan Secretariat Portal
            </p>
          </div>
        </div>
      </div>

      {/* WhatsApp Floating Button */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-6 z-[45] group flex items-center gap-3"
      >
        <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-[0_20px_40px_-10px_rgba(37,211,102,0.4)] hover:scale-110 active:scale-95 transition-all">
          <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </div>
      </a>
    </>
  );
};