import React, { useState } from 'react';
import { 
  Instagram, 
  Linkedin, 
  ExternalLink, 
  Copy, 
  Check, 
  Share2, 
  ShieldCheck, 
  Sparkles,
  QrCode,
  ArrowUpRight,
  TrendingUp,
  Award
} from 'lucide-react';

export const DigitalProfileHub: React.FC = () => {
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  const [showQr, setShowQr] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedLink(id);
    setTimeout(() => setCopiedLink(null), 2500);
  };

  const instagramPosts = [
    {
      id: 'post-1',
      tag: 'SAP S/4HANA & Reforma Tributária',
      title: 'Adequação da PEC 45/19 no ecossistema SAP',
      desc: 'Como as empresas estão preparando seus centros tributários para a transição do IBS e CBS.',
      date: 'Publicação Recente'
    },
    {
      id: 'post-2',
      tag: 'Metodologia BTO',
      title: 'Por que o PMO tradicional não é suficiente?',
      desc: 'A orquestração integrada dos 6 escritórios: PMO, BMO, TMO, CMO, AMO e VMO.',
      date: 'Publicação Recente'
    },
    {
      id: 'post-3',
      tag: 'Case de Sucesso',
      title: 'Governança de Dados no Grupo Cimed',
      desc: '100% das operações corporativas e industriais unificadas no SAP sem inconsistências fiscais.',
      date: 'Publicação Recente'
    }
  ];

  return (
    <div id="perfis-oficiais" className="py-12 bg-[#090E1A]/80 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#fe3000] mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#fe3000]" />
              <span>Canais Digitais Oficiais Verificados</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Perfis & Presença Digital da MOVE.ON
            </h3>
            <p className="text-slate-300 text-sm mt-1 max-w-2xl leading-relaxed">
              Acompanhe publicações executivas, bastidores de projetos SAP e insights de governança corporativa diretamente nos nossos perfis oficiais.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Canais Autênticos Verificados</span>
          </div>
        </div>

        {/* 2-Column Grid: Instagram Featured + LinkedIn / Linktree */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Card 1: Instagram Official Profile Card (Col 7) */}
          <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 hover:border-pink-500/40 transition-all flex flex-col justify-between">
            <div>
              {/* Instagram Profile Header */}
              <div className="flex items-start justify-between gap-4 pb-6 border-b border-slate-800">
                <div className="flex items-center gap-4">
                  {/* Avatar with gradient ring */}
                  <div className="relative w-16 h-16 rounded-full p-[2.5px] bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 shrink-0">
                    <div className="w-full h-full rounded-full bg-black flex items-center justify-center p-2.5 overflow-hidden">
                      <img
                        src="/assets/images/moveon-symbol.svg"
                        alt="MOVE.ON Logo Instagram"
                        className="w-full h-full object-contain filter drop-shadow-[0_2px_6px_rgba(254,48,0,0.5)]"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-lg font-bold text-white tracking-tight">
                        @moveonconsulting_
                      </h4>
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-pink-500/10 text-pink-400 border border-pink-500/30">
                        Oficial
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-slate-300 mt-0.5">
                      MOVE.ON Business Transformation
                    </p>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                      Consultoria especializada em Governança de Projetos, Processos BPM e Ecossistema SAP.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleCopy('https://www.instagram.com/moveonconsulting_/', 'insta')}
                    className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors"
                    title="Copiar link do Instagram"
                  >
                    {copiedLink === 'insta' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Feed Highlights Mockup (Recent Topics Published) */}
              <div className="pt-5">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-3 font-semibold uppercase tracking-wider">
                  <span>Destaques & Publicações Recentes</span>
                  <span className="text-[11px] text-pink-400 font-normal">Instagram Feed</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {instagramPosts.map((post) => (
                    <a
                      key={post.id}
                      href="https://www.instagram.com/moveonconsulting_/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800/80 hover:border-pink-500/40 hover:bg-slate-900 transition-all flex flex-col justify-between group"
                    >
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-pink-400 block mb-1">
                          {post.tag}
                        </span>
                        <h5 className="text-xs font-bold text-white group-hover:text-pink-300 transition-colors line-clamp-2 mb-1.5">
                          {post.title}
                        </h5>
                        <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                          {post.desc}
                        </p>
                      </div>
                      <div className="pt-2 mt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-500">
                        <span>{post.date}</span>
                        <ArrowUpRight className="w-3 h-3 text-pink-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 mt-6 border-t border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <span className="text-xs text-slate-400">
                Siga nosso perfil para análises tributárias e governança SAP.
              </span>
              <a
                href="https://www.instagram.com/moveonconsulting_/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-pink-600 via-rose-600 to-amber-600 hover:opacity-90 rounded-lg shadow-lg shadow-rose-600/25 flex items-center justify-center gap-2 transition-all"
              >
                <Instagram className="w-4 h-4" />
                <span>Ver Perfil Completo no Instagram</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Card 2: LinkedIn, Linktree & CEO Profiles (Col 5) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* LinkedIn Company Card */}
            <div className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-blue-500/40 transition-all flex flex-col justify-between flex-1">
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-blue-950/80 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
                      <Linkedin className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">MOVE.ON Consulting</h4>
                      <span className="text-xs text-slate-400">Página Corporativa no LinkedIn</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleCopy('https://www.linkedin.com/company/moveonbto', 'linkedin')}
                    className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors"
                    title="Copiar link do LinkedIn"
                  >
                    {copiedLink === 'linkedin' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  Conecte-se com nossa rede corporativa de executivos, PMOs e especialistas SAP. Publicações semanais sobre gestão e transformação.
                </p>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-slate-800">
                <a
                  href="https://www.linkedin.com/company/moveonbto"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-md shadow-blue-600/30 flex items-center justify-center gap-2 transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>Acessar LinkedIn da MOVE.ON</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* CEO Profile Card */}
            <div className="glass-panel p-5 rounded-2xl border border-slate-800 hover:border-[#fe3000]/40 transition-all">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src="/assets/lideranca/vandre-oliveira.png"
                    alt="Vandré Oliveira"
                    className="w-12 h-12 rounded-xl object-cover border border-[#fe3000]/40 shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h5 className="text-xs font-bold text-white">Vandré Oliveira</h5>
                      <span className="text-[10px] text-[#fe3000] font-mono font-bold">CEO & Fundador</span>
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-1">
                      Conheça a trajetória e artigos no LinkedIn
                    </p>
                  </div>
                </div>

                <a
                  href="https://www.linkedin.com/in/vandr%C3%A9-oliveira-b5316298/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-slate-900 hover:bg-[#fe3000] text-slate-300 hover:text-white border border-slate-800 hover:border-[#fe3000] transition-colors shrink-0"
                  aria-label="LinkedIn Vandré Oliveira"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Linktree Card */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <div>
                  <div className="text-xs font-bold text-white">Linktree Central Oficial</div>
                  <div className="text-[11px] text-slate-400">linktr.ee/moveonconsulting</div>
                </div>
              </div>

              <a
                href="https://linktr.ee/moveonconsulting"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 bg-emerald-950/60 border border-emerald-500/30 rounded-lg flex items-center gap-1.5 transition-colors"
              >
                <span>Acessar Linktree</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
