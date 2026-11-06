import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AiVideoHub } from './components/AiVideoHub';
import { AiVideoPlayerModal } from './components/AiVideoPlayerModal';
import { AboutSection } from './components/AboutSection';
import { SolutionsSection } from './components/SolutionsSection';
import { BtoMethodologySection } from './components/BtoMethodologySection';
import { BtoNowSection } from './components/BtoNowSection';
import { CasesSection } from './components/CasesSection';
import { LeadershipSection } from './components/LeadershipSection';
import { DigitalProfileHub } from './components/DigitalProfileHub';
import { PartnersSection } from './components/PartnersSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ExecutiveModal } from './components/ExecutiveModal';
import { 
  Layers, 
  ArrowRight, 
  SlidersHorizontal, 
  Sparkles, 
  Briefcase, 
  Cpu, 
  Award, 
  Users, 
  Mail,
  ChevronRight
} from 'lucide-react';

export default function App() {
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [modalTopic, setModalTopic] = useState<string>('Diagnóstico Executivo BTO');
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [selectedVideoId, setSelectedVideoId] = useState<string>('intro-bto');
  
  // Executive Modular Navigation (Prevents exhausting long continuous scrolls)
  const [activeTab, setActiveTab] = useState<string>('visao-geral');
  const [isModularMode, setIsModularMode] = useState<boolean>(true);

  const handleOpenSchedule = (topic?: string) => {
    if (topic) {
      setModalTopic(topic);
    }
    setScheduleModalOpen(true);
  };

  const handleOpenVideo = (videoId: string = 'intro-bto') => {
    setSelectedVideoId(videoId);
    setVideoModalOpen(true);
  };

  const handleExploreBto = () => {
    setActiveTab('metodologia');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const modules = [
    { id: 'visao-geral', name: 'Visão Geral & Vídeos', icon: Sparkles, badge: 'Início' },
    { id: 'solucoes', name: 'Soluções SAP', icon: Cpu, badge: '7 Soluções' },
    { id: 'metodologia', name: 'Metodologia BTO', icon: Layers, badge: '6 xMOs & BTO.NOW' },
    { id: 'cases', name: 'Cases de Sucesso', icon: Award, badge: 'Cimed, Coruripe, Arklok' },
    { id: 'lideranca', name: 'Liderança & Perfis', icon: Users, badge: 'Equipe & Instagram' },
    { id: 'contato', name: 'Contato & Proposta', icon: Mail, badge: 'Atendimento' },
  ];

  const handleSelectTab = (tabId: string) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#070B14] text-slate-100 flex flex-col font-sans selection:bg-[#fe3000] selection:text-white relative">
      {/* Top Header Navigation with Modular Tab Controller */}
      <Navbar 
        onOpenSchedule={() => handleOpenSchedule()} 
        onOpenVideo={() => handleOpenVideo('intro-bto')}
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        isModularMode={isModularMode}
        onToggleModularMode={() => setIsModularMode(!isModularMode)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Module Switcher Sub-Bar (Sticky below navbar on desktop) */}
        <div className="pt-20 sm:pt-24 pb-3 bg-[#05080F]/90 backdrop-blur-md border-b border-slate-800/80 sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              {/* Module Buttons */}
              <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto py-1 scrollbar-none">
                {modules.map((m) => {
                  const Icon = m.icon;
                  const isActive = activeTab === m.id;
                  return (
                    <button
                      key={m.id}
                      onClick={() => handleSelectTab(m.id)}
                      className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                        isActive
                          ? 'bg-gradient-to-r from-[#fe3000] to-[#c42400] text-white shadow-lg shadow-[#fe3000]/30 font-bold'
                          : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{m.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* View Mode Toggle: Modular vs Full Continuous */}
              <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto text-xs">
                <button
                  onClick={() => setIsModularMode(!isModularMode)}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Alternar entre modo módulos focados e página contínua"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#fe3000]" />
                  <span>{isModularMode ? 'Modo Módulos (Sem Rolagem Longa)' : 'Modo Página Completa'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* MODULAR VIEW MODE (Default: Focuses on one module at a time, eliminating endless scrolling) */}
        {isModularMode ? (
          <div>
            {/* MODULE 1: Visão Geral & Vídeos */}
            {activeTab === 'visao-geral' && (
              <div className="animate-in fade-in duration-300">
                <Hero 
                  onOpenSchedule={() => handleOpenSchedule()} 
                  onOpenVideo={(id) => handleOpenVideo(id)}
                />
                <AiVideoHub onOpenVideo={(id) => handleOpenVideo(id)} />
                <AboutSection onExploreBto={handleExploreBto} />

                {/* Module Progression Prompt */}
                <div className="py-12 bg-[#05080F] border-t border-slate-800/80 text-center">
                  <div className="max-w-2xl mx-auto px-4">
                    <span className="text-xs uppercase tracking-widest text-[#fe3000] font-semibold block mb-2">
                      Próxima Etapa do Portal
                    </span>
                    <h4 className="text-xl font-bold text-white mb-4">
                      Conheça nossas soluções especializadas em Governança e Ecossistema SAP.
                    </h4>
                    <button
                      onClick={() => handleSelectTab('solucoes')}
                      className="px-6 py-3 text-xs font-bold text-white bg-gradient-to-r from-[#fe3000] to-[#c42400] hover:from-[#ff4a1c] hover:to-[#fe3000] rounded-xl shadow-lg shadow-[#fe3000]/25 inline-flex items-center gap-2 transition-all cursor-pointer"
                    >
                      <span>Avançar para Soluções SAP</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* MODULE 2: Soluções SAP */}
            {activeTab === 'solucoes' && (
              <div className="animate-in fade-in duration-300">
                <SolutionsSection 
                  onOpenConsultation={(title) => handleOpenSchedule(`Solução: ${title}`)} 
                />

                {/* Module Progression Prompt */}
                <div className="py-12 bg-[#05080F] border-t border-slate-800/80 text-center">
                  <div className="max-w-2xl mx-auto px-4">
                    <span className="text-xs uppercase tracking-widest text-[#fe3000] font-semibold block mb-2">
                      Metodologia Proprietária
                    </span>
                    <h4 className="text-xl font-bold text-white mb-4">
                      Veja como os 6 escritórios do BTO orquestram grandes programas.
                    </h4>
                    <button
                      onClick={() => handleSelectTab('metodologia')}
                      className="px-6 py-3 text-xs font-bold text-white bg-gradient-to-r from-[#fe3000] to-[#c42400] hover:from-[#ff4a1c] hover:to-[#fe3000] rounded-xl shadow-lg shadow-[#fe3000]/25 inline-flex items-center gap-2 transition-all cursor-pointer"
                    >
                      <span>Explorar Metodologia BTO & BTO.NOW</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* MODULE 3: Metodologia BTO & BTO.NOW */}
            {activeTab === 'metodologia' && (
              <div className="animate-in fade-in duration-300">
                <BtoMethodologySection />
                <BtoNowSection />

                {/* Module Progression Prompt */}
                <div className="py-12 bg-[#05080F] border-t border-slate-800/80 text-center">
                  <div className="max-w-2xl mx-auto px-4">
                    <span className="text-xs uppercase tracking-widest text-[#fe3000] font-semibold block mb-2">
                      Resultados Práticos Comprovados
                    </span>
                    <h4 className="text-xl font-bold text-white mb-4">
                      Descubra os cases de sucesso em clientes como Cimed, Coruripe e Arklok.
                    </h4>
                    <button
                      onClick={() => handleSelectTab('cases')}
                      className="px-6 py-3 text-xs font-bold text-white bg-gradient-to-r from-[#fe3000] to-[#c42400] hover:from-[#ff4a1c] hover:to-[#fe3000] rounded-xl shadow-lg shadow-[#fe3000]/25 inline-flex items-center gap-2 transition-all cursor-pointer"
                    >
                      <span>Ver Cases de Sucesso</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* MODULE 4: Cases Reais */}
            {activeTab === 'cases' && (
              <div className="animate-in fade-in duration-300">
                <CasesSection />
                <PartnersSection />

                {/* Module Progression Prompt */}
                <div className="py-12 bg-[#05080F] border-t border-slate-800/80 text-center">
                  <div className="max-w-2xl mx-auto px-4">
                    <span className="text-xs uppercase tracking-widest text-[#fe3000] font-semibold block mb-2">
                      Liderança & Perfis Verificados
                    </span>
                    <h4 className="text-xl font-bold text-white mb-4">
                      Conheça a equipe executiva e acesse os canais oficiais do Instagram e LinkedIn.
                    </h4>
                    <button
                      onClick={() => handleSelectTab('lideranca')}
                      className="px-6 py-3 text-xs font-bold text-white bg-gradient-to-r from-[#fe3000] to-[#c42400] hover:from-[#ff4a1c] hover:to-[#fe3000] rounded-xl shadow-lg shadow-[#fe3000]/25 inline-flex items-center gap-2 transition-all cursor-pointer"
                    >
                      <span>Acessar Liderança & Perfis Digitais</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* MODULE 5: Liderança & Perfis Digitais (Instagram, LinkedIn, Linktree) */}
            {activeTab === 'lideranca' && (
              <div className="animate-in fade-in duration-300">
                <LeadershipSection />
                <DigitalProfileHub />

                {/* Module Progression Prompt */}
                <div className="py-12 bg-[#05080F] border-t border-slate-800/80 text-center">
                  <div className="max-w-2xl mx-auto px-4">
                    <span className="text-xs uppercase tracking-widest text-[#fe3000] font-semibold block mb-2">
                      Atendimento & Diagnóstico
                    </span>
                    <h4 className="text-xl font-bold text-white mb-4">
                      Agende uma conversa estratégica com a diretoria executiva.
                    </h4>
                    <button
                      onClick={() => handleSelectTab('contato')}
                      className="px-6 py-3 text-xs font-bold text-white bg-gradient-to-r from-[#fe3000] to-[#c42400] hover:from-[#ff4a1c] hover:to-[#fe3000] rounded-xl shadow-lg shadow-[#fe3000]/25 inline-flex items-center gap-2 transition-all cursor-pointer"
                    >
                      <span>Ir para Canais de Contato</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* MODULE 6: Contato & Proposta */}
            {activeTab === 'contato' && (
              <div className="animate-in fade-in duration-300">
                <ContactSection />
              </div>
            )}
          </div>
        ) : (
          /* CONTINUOUS FULL PAGE MODE (Optional for users who want to scroll all sections) */
          <div>
            <Hero 
              onOpenSchedule={() => handleOpenSchedule()} 
              onOpenVideo={(id) => handleOpenVideo(id)}
            />
            <AiVideoHub onOpenVideo={(id) => handleOpenVideo(id)} />
            <AboutSection onExploreBto={handleExploreBto} />
            <SolutionsSection 
              onOpenConsultation={(title) => handleOpenSchedule(`Solução: ${title}`)} 
            />
            <BtoMethodologySection />
            <BtoNowSection />
            <CasesSection />
            <LeadershipSection />
            <DigitalProfileHub />
            <PartnersSection />
            <ContactSection />
          </div>
        )}
      </main>

      {/* Corporate Quiet Footer */}
      <Footer />

      {/* Interactive Video Player Modal */}
      <AiVideoPlayerModal
        isOpen={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
        initialVideoId={selectedVideoId}
        onScheduleCall={() => handleOpenSchedule('Apresentação Executiva sobre ' + selectedVideoId)}
      />

      {/* Executive Consultation & Scheduling Modal */}
      <ExecutiveModal
        isOpen={scheduleModalOpen}
        onClose={() => setScheduleModalOpen(false)}
        presetTopic={modalTopic}
      />
    </div>
  );
}
