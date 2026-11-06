import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  Sparkles, 
  CheckCircle2, 
  Gauge,
  ListVideo,
  ArrowRight,
  Radio,
  Sliders
} from 'lucide-react';
import { VideoBriefing, VIDEO_BRIEFINGS } from '../data/videoBriefings';

interface AiVideoPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialVideoId?: string;
  onScheduleCall?: () => void;
}

export const AiVideoPlayerModal: React.FC<AiVideoPlayerModalProps> = ({
  isOpen,
  onClose,
  initialVideoId,
  onScheduleCall
}) => {
  const [currentVideo, setCurrentVideo] = useState<VideoBriefing>(
    VIDEO_BRIEFINGS.find(v => v.id === initialVideoId) || VIDEO_BRIEFINGS[0]
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  
  // Executive calm speaking speed (0.88x: calm, clear, not rushed)
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(0.88);
  const [progress, setProgress] = useState(0);
  const [activeSubtitleIndex, setActiveSubtitleIndex] = useState(0);
  const [currentSpokenWord, setCurrentSpokenWord] = useState<string>('');

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const progressIntervalRef = useRef<any>(null);

  // Update current video when initialVideoId changes
  useEffect(() => {
    if (initialVideoId) {
      const found = VIDEO_BRIEFINGS.find(v => v.id === initialVideoId);
      if (found) {
        stopAudio();
        setCurrentVideo(found);
        setProgress(0);
        setActiveSubtitleIndex(0);
      }
    }
  }, [initialVideoId]);

  // Cleanup on unmount or modal close
  useEffect(() => {
    if (!isOpen) {
      stopAudio();
    }
  }, [isOpen]);

  const stopAudio = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }
    setIsPlaying(false);
    setCurrentSpokenWord('');
  };

  const getBestPortugueseVoice = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;
    const voices = window.speechSynthesis.getVoices();
    if (!voices || voices.length === 0) return null;

    // Prioritize natural Brazilian Portuguese voices
    const preferredNames = [
      'Google português do Brasil',
      'Luciana',
      'Felipe',
      'Francisca',
      'Daniel',
      'Maria',
      'Yara',
      'Heloisa'
    ];

    for (const name of preferredNames) {
      const found = voices.find(v => v.lang.startsWith('pt') && v.name.toLowerCase().includes(name.toLowerCase()));
      if (found) return found;
    }

    return voices.find(v => v.lang === 'pt-BR') || voices.find(v => v.lang.startsWith('pt')) || null;
  };

  const startPlayback = (video: VideoBriefing, customSpeed?: number) => {
    stopAudio();
    setIsPlaying(true);
    const speed = customSpeed || playbackSpeed;

    if (typeof window !== 'undefined' && 'speechSynthesis' in window && !isMuted) {
      // Small delay to ensure clean state
      setTimeout(() => {
        const textToSpeak = video.audioNarrative;
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.lang = 'pt-BR';
        
        // Calm executive cadence requested by user ("não tão rápido")
        utterance.rate = speed; 
        utterance.pitch = video.presenter.name.includes('Sofia') ? 1.02 : 0.94;

        const bestVoice = getBestPortugueseVoice();
        if (bestVoice) {
          utterance.voice = bestVoice;
        }

        utterance.onboundary = (event) => {
          if (event.name === 'word') {
            const charIdx = event.charIndex;
            const words = textToSpeak.substring(charIdx).split(' ');
            if (words[0]) {
              setCurrentSpokenWord(words[0]);
            }
          }
        };

        utterance.onend = () => {
          setIsPlaying(false);
          setProgress(100);
          setCurrentSpokenWord('');
        };

        utterance.onerror = () => {
          setIsPlaying(false);
        };

        utteranceRef.current = utterance;
        window.speechSynthesis.speak(utterance);
      }, 100);
    }

    // Dynamic timeline progression based on speed
    const baseDuration = 36 / speed; // duration adjusts with speed
    let currentSec = (progress / 100) * baseDuration;

    progressIntervalRef.current = setInterval(() => {
      currentSec += 0.5;
      const pct = Math.min(100, (currentSec / baseDuration) * 100);
      setProgress(pct);

      const subtitleStep = Math.min(
        video.scriptParagraphs.length - 1,
        Math.floor((pct / 100) * video.scriptParagraphs.length)
      );
      setActiveSubtitleIndex(subtitleStep);

      if (pct >= 100) {
        clearInterval(progressIntervalRef.current);
        setIsPlaying(false);
      }
    }, 500);
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopAudio();
    } else {
      startPlayback(currentVideo);
    }
  };

  const handleSelectVideo = (video: VideoBriefing) => {
    stopAudio();
    setCurrentVideo(video);
    setProgress(0);
    setActiveSubtitleIndex(0);
    startPlayback(video);
  };

  const handleSpeedChange = (newSpeed: number) => {
    setPlaybackSpeed(newSpeed);
    if (isPlaying) {
      startPlayback(currentVideo, newSpeed);
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      if (isPlaying) {
        startPlayback(currentVideo);
      }
    } else {
      setIsMuted(true);
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/92 backdrop-blur-2xl animate-in fade-in duration-200">
      <div className="glass-panel bg-[#070B14] border border-[#fe3000]/40 max-w-5xl w-full rounded-2xl overflow-hidden shadow-2xl relative flex flex-col max-h-[94vh]">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/80 bg-slate-900/60">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#fe3000]/15 border border-[#fe3000]/30 text-[#fe3000] text-xs font-mono font-bold tracking-wider">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              <span>STUDIO IA · MOVE.ON</span>
            </div>
            <span className="text-xs text-slate-300 hidden sm:inline">
              Apresentação Executiva com Cadência Calma
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Speed Selector (0.75x, 0.88x, 1.0x) */}
            <div className="flex items-center gap-1 bg-black/60 p-1 rounded-lg border border-slate-800 text-[11px]">
              <span className="text-slate-400 px-1.5 flex items-center gap-1 font-mono">
                <Gauge className="w-3 h-3 text-[#fe3000]" />
                Velocidade:
              </span>
              <button
                onClick={() => handleSpeedChange(0.75)}
                className={`px-2 py-0.5 rounded font-mono transition-colors ${
                  playbackSpeed === 0.75
                    ? 'bg-[#fe3000] text-white font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Cadência Bem Calma e Pausada"
              >
                0.75x
              </button>
              <button
                onClick={() => handleSpeedChange(0.88)}
                className={`px-2 py-0.5 rounded font-mono transition-colors ${
                  playbackSpeed === 0.88
                    ? 'bg-[#fe3000] text-white font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Cadência Executiva Recomendada (Não Rápida)"
              >
                0.88x (Calmo)
              </button>
              <button
                onClick={() => handleSpeedChange(1.0)}
                className={`px-2 py-0.5 rounded font-mono transition-colors ${
                  playbackSpeed === 1.0
                    ? 'bg-[#fe3000] text-white font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Velocidade Padrão"
              >
                1.0x
              </button>
            </div>

            <button
              onClick={() => {
                stopAudio();
                onClose();
              }}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-900 border border-slate-800 transition-colors cursor-pointer"
              aria-label="Fechar reprodutor de vídeo"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video Screen & Sidebar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-y-auto">
          {/* Main Video Viewport (Col 8) */}
          <div className="lg:col-span-8 flex flex-col bg-black relative">
            {/* Visual Frame */}
            <div className="relative aspect-video w-full overflow-hidden bg-slate-950 flex items-center justify-center">
              <img
                src={currentVideo.thumbnail}
                alt={currentVideo.title}
                referrerPolicy="no-referrer"
                className={`w-full h-full object-cover object-center transition-all duration-700 ${
                  isPlaying 
                    ? 'scale-105 filter brightness-105 contrast-105' 
                    : 'scale-100 filter brightness-85'
                }`}
              />

              {/* Ambient Glow Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-black/40 pointer-events-none" />

              {/* Top Left: Presenter Lower Third Badge */}
              <div className="absolute top-4 left-4 z-10 flex items-center gap-3 p-2.5 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 text-xs shadow-xl">
                <div className="relative">
                  <div className={`w-3 h-3 rounded-full ${isPlaying ? 'bg-emerald-400 animate-ping' : 'bg-slate-500'}`} />
                  <div className={`absolute inset-0 w-3 h-3 rounded-full ${isPlaying ? 'bg-emerald-400' : 'bg-slate-500'}`} />
                </div>
                <div>
                  <div className="font-bold text-white leading-none">{currentVideo.presenter.name}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{currentVideo.presenter.role}</div>
                </div>
              </div>

              {/* Top Right: Sound Frequency Visualizer (when playing) */}
              {isPlaying && !isMuted && (
                <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/85 backdrop-blur-md border border-[#fe3000]/40 shadow-xl">
                  <div className="flex items-end gap-1 h-4">
                    <div className="w-1 bg-[#fe3000] rounded-full animate-pulse h-2" style={{ animationDuration: '400ms' }} />
                    <div className="w-1 bg-[#fe3000] rounded-full animate-pulse h-4" style={{ animationDuration: '600ms' }} />
                    <div className="w-1 bg-[#ff785a] rounded-full animate-pulse h-3" style={{ animationDuration: '350ms' }} />
                    <div className="w-1 bg-[#fe3000] rounded-full animate-pulse h-4" style={{ animationDuration: '500ms' }} />
                    <div className="w-1 bg-[#ff785a] rounded-full animate-pulse h-2" style={{ animationDuration: '450ms' }} />
                  </div>
                  <span className="text-[10px] text-white font-mono font-bold tracking-wider uppercase ml-1">
                    Voz IA Ativa ({playbackSpeed}x)
                  </span>
                </div>
              )}

              {/* Big Center Play Button (when paused) */}
              {!isPlaying && (
                <button
                  onClick={togglePlay}
                  className="absolute z-20 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-r from-[#fe3000] to-[#c42400] hover:from-[#ff4a1c] hover:to-[#fe3000] text-white flex items-center justify-center shadow-2xl shadow-[#fe3000]/50 hover:scale-110 active:scale-95 transition-all group cursor-pointer border border-[#fe3000]/40"
                  aria-label="Iniciar reprodução de vídeo"
                >
                  <Play className="w-8 h-8 translate-x-0.5 fill-white" />
                </button>
              )}

              {/* Active Subtitles / Legendas Executivas Sincronizadas */}
              <div className="absolute bottom-4 left-4 right-4 z-10 text-center">
                <div className="inline-block max-w-2xl mx-auto px-5 py-3 rounded-xl bg-black/90 backdrop-blur-md border border-white/15 text-xs sm:text-sm text-slate-100 font-medium shadow-2xl leading-relaxed">
                  {isPlaying ? (
                    <div className="space-y-1">
                      <p className="text-white font-medium">
                        {currentVideo.scriptParagraphs[activeSubtitleIndex] || currentVideo.scriptParagraphs[0]}
                      </p>
                      {currentSpokenWord && (
                        <span className="text-[11px] font-mono text-[#fe3000] bg-[#fe3000]/10 px-2 py-0.5 rounded border border-[#fe3000]/30 inline-block">
                          Fala: {currentSpokenWord}
                        </span>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2 text-slate-300">
                      <Sparkles className="w-4 h-4 text-[#fe3000]" />
                      <span>Clique no botão Play para ouvir a explicação com IA em ritmo calmo e pausado</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Video Controls Bar */}
            <div className="p-4 bg-slate-950 border-t border-slate-800/80 flex flex-col gap-2.5">
              {/* Timeline Scrubber */}
              <div 
                className="w-full bg-slate-800 h-2 rounded-full overflow-hidden cursor-pointer"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  const newPct = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
                  setProgress(newPct);
                  if (isPlaying) {
                    startPlayback(currentVideo);
                  }
                }}
              >
                <div 
                  className="bg-gradient-to-r from-[#fe3000] to-[#ff785a] h-full rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Bottom Buttons */}
              <div className="flex items-center justify-between text-xs text-slate-300">
                <div className="flex items-center gap-3">
                  <button
                    onClick={togglePlay}
                    className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white transition-colors cursor-pointer border border-slate-800"
                    aria-label={isPlaying ? "Pausar" : "Tocar"}
                  >
                    {isPlaying ? <Pause className="w-4 h-4 text-[#fe3000]" /> : <Play className="w-4 h-4 fill-white" />}
                  </button>

                  <button
                    onClick={() => {
                      setProgress(0);
                      startPlayback(currentVideo);
                    }}
                    className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer border border-slate-800"
                    title="Reiniciar vídeo do início"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>

                  <button
                    onClick={toggleMute}
                    className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer border border-slate-800"
                    title={isMuted ? "Ativar áudio da IA" : "Silenciar áudio"}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-[#fe3000]" />}
                  </button>

                  <span className="font-mono text-[11px] text-slate-400">
                    {currentVideo.duration} · Ritmo: {playbackSpeed}x (Calmo)
                  </span>
                </div>

                <div className="text-[11px] text-slate-400 flex items-center gap-1.5 hidden sm:flex">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Narração em Português do Brasil (pt-BR)</span>
                </div>
              </div>
            </div>

            {/* Key Takeaways in 3 Punchy Bullets */}
            <div className="p-5 bg-[#090E1A] border-t border-slate-800/80">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#fe3000] mb-2.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Resumo Executivo em 3 Tópicos Principais:</span>
              </div>
              <div className="space-y-1.5">
                {currentVideo.summaryBullets.map((bullet, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#fe3000] shrink-0 mt-0.5" />
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Playlist Sidebar (Col 4) */}
          <div className="lg:col-span-4 p-5 bg-[#0B1220] border-t lg:border-t-0 lg:border-l border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                <ListVideo className="w-4 h-4 text-[#fe3000]" />
                <span>Outros Briefings em Vídeo:</span>
              </div>

              {/* Video List */}
              <div className="space-y-2.5">
                {VIDEO_BRIEFINGS.map((vid) => {
                  const isSelected = vid.id === currentVideo.id;
                  return (
                    <button
                      key={vid.id}
                      onClick={() => handleSelectVideo(vid)}
                      className={`w-full p-3 rounded-xl text-left border transition-all duration-200 flex items-start gap-3 cursor-pointer ${
                        isSelected
                          ? 'bg-[#fe3000]/15 border-[#fe3000] shadow-md shadow-[#fe3000]/10'
                          : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="relative w-16 h-10 rounded-md overflow-hidden bg-slate-950 shrink-0">
                        <img
                          src={vid.thumbnail}
                          alt={vid.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <Play className={`w-3.5 h-3.5 ${isSelected ? 'text-[#fe3000] fill-[#fe3000]' : 'text-white fill-white'}`} />
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className={`text-xs font-bold line-clamp-1 ${isSelected ? 'text-white font-extrabold' : 'text-slate-300'}`}>
                          {vid.title}
                        </h4>
                        <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                          {vid.presenter.name} · {vid.duration}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CTA Box at Bottom of Sidebar */}
            <div className="pt-6 border-t border-slate-800 mt-6">
              <div className="p-4 rounded-xl bg-gradient-to-br from-[#0e1626] to-slate-900 border border-slate-800 text-center">
                <span className="text-xs font-semibold text-white block mb-2">
                  Deseja uma apresentação personalizada para sua diretoria?
                </span>
                <button
                  onClick={() => {
                    stopAudio();
                    onClose();
                    if (onScheduleCall) onScheduleCall();
                  }}
                  className="w-full py-2.5 px-3 text-xs font-bold text-white bg-gradient-to-r from-[#fe3000] to-[#c42400] hover:from-[#ff4a1c] hover:to-[#fe3000] rounded-lg shadow-md shadow-[#fe3000]/30 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <span>Agendar Apresentação Executiva</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
