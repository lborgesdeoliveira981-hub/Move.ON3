import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, ChevronRight, Phone } from 'lucide-react';

interface NavbarProps {
  onOpenSchedule: () => void;
  onOpenVideo?: () => void;
  activeTab?: string;
  onSelectTab?: (tabId: string) => void;
  isModularMode?: boolean;
  onToggleModularMode?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenSchedule, 
  onOpenVideo,
  activeTab = 'visao-geral',
  onSelectTab,
  isModularMode = true,
  onToggleModularMode
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'visao-geral', name: 'Visão Geral & Vídeos', href: '#quem-somos' },
    { id: 'solucoes', name: 'Soluções SAP', href: '#solucoes' },
    { id: 'metodologia', name: 'Metodologia BTO', href: '#metodologia-bto' },
    { id: 'cases', name: 'Cases de Sucesso', href: '#cases' },
    { id: 'lideranca', name: 'Liderança & Perfis', href: '#lideranca' },
    { id: 'contato', name: 'Contato', href: '#contato' },
  ];

  const handleLinkClick = (e: React.MouseEvent, id: string, href: string) => {
    if (onSelectTab) {
      e.preventDefault();
      onSelectTab(id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#070B14]/95 backdrop-blur-md border-b border-slate-800/80 py-3 shadow-2xl'
            : 'bg-transparent py-4 border-b border-white/5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-6">
            {/* Zone 1: Official MOVE.ON Symbol & Brand Wordmark */}
            <a 
              href="#" 
              onClick={(e) => handleLinkClick(e, 'visao-geral', '#')}
              className="flex items-center gap-3 group whitespace-nowrap shrink-0"
            >
              {/* Official 3D Ribbon Symbol */}
              <div className="relative w-9 h-9 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-200">
                <img
                  src="/assets/images/moveon-symbol.svg"
                  alt="MOVE.ON Símbolo Oficial"
                  className="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(254,48,0,0.4)]"
                />
              </div>

              {/* Official Brand Typography */}
              <div className="flex flex-col tracking-tight">
                <div className="flex items-baseline">
                  <span className="text-xl font-black text-white tracking-wider">MOVE</span>
                  <span className="text-xl font-black text-[#fe3000]">.</span>
                  <span className="text-xl font-black text-white tracking-wider">ON</span>
                </div>
                <span className="text-[9px] font-bold text-slate-400 tracking-[0.2em] uppercase -mt-1 hidden sm:block">
                  BUSINESS TRANSFORMATION
                </span>
              </div>
            </a>

            {/* Zone 2: Navigation Links (Modular Tabs / Fast View Selection) */}
            <nav className="hidden lg:flex items-center gap-2 text-xs font-semibold text-slate-300 bg-slate-900/60 p-1 rounded-xl border border-slate-800/80">
              {navLinks.map((link) => {
                const isActive = activeTab === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={(e) => handleLinkClick(e, link.id, link.href)}
                    className={`px-3 py-1.5 rounded-lg transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-[#fe3000] to-[#c42400] text-white shadow-md shadow-[#fe3000]/30 font-bold'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                    }`}
                  >
                    {link.name}
                  </button>
                );
              })}
            </nav>

            {/* Zone 3: Actions (CTA button) */}
            <div className="hidden sm:flex items-center gap-3 shrink-0">
              <button
                onClick={onOpenSchedule}
                className="px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-[#fe3000] to-[#c42400] hover:from-[#ff4a1c] hover:to-[#fe3000] active:scale-95 rounded-lg shadow-md shadow-[#fe3000]/25 transition-all duration-200 flex items-center gap-2 whitespace-nowrap shrink-0 group hover:shadow-[#fe3000]/40 cursor-pointer"
              >
                <span>Fale com Especialistas</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center gap-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-300 hover:text-white rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#070B14]/98 backdrop-blur-xl lg:hidden pt-24 px-6 pb-8 flex flex-col justify-between">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  handleLinkClick(e, link.id, link.href);
                }}
                className={`text-left py-2.5 px-3 rounded-lg border text-sm font-semibold flex items-center justify-between ${
                  activeTab === link.id
                    ? 'bg-[#fe3000]/15 text-[#fe3000] border-[#fe3000]/40'
                    : 'text-slate-200 hover:text-white border-slate-800/60'
                }`}
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </button>
            ))}
          </nav>

          <div className="flex flex-col gap-3 pt-6 border-t border-slate-800">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSchedule();
              }}
              className="w-full py-3 text-sm font-semibold text-white bg-gradient-to-r from-[#fe3000] to-[#c42400] hover:from-[#ff4a1c] hover:to-[#fe3000] rounded-lg shadow-lg shadow-[#fe3000]/30 flex items-center justify-center gap-2"
            >
              <span>Fale com Nossos Especialistas</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <a
              href="https://wa.me/5511947952430"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 text-sm font-semibold text-slate-300 hover:text-white bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp: (11) 94795-2430</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
};
