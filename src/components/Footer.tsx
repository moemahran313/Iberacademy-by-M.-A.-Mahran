import React from 'react';
import {
  Compass,
  Sparkles,
  GraduationCap,
  Layers,
  Award,
  UserCheck,
  Heart,
  Database,
  ArrowUpRight,
  TrendingUp,
  MessageSquare,
  Mic,
  BookOpen
} from 'lucide-react';
import { AztecBirdMascot } from './IberacademyLogo';
import { soundEffects } from '../utils/audio';

interface FooterProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentLevel: string;
  userEmail?: string | null;
  userName?: string | null;
}

const FooterComponent: React.FC<FooterProps> = ({
  activeTab,
  setActiveTab,
  currentLevel,
  userEmail,
}) => {
  const handleFooterClick = (tabId: string) => {
    soundEffects.playPop();
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#0F0E0D] text-stone-300 border-t border-stone-800/80 mt-20 pb-28 md:pb-12 pt-14 pb-safe relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          
          {/* Column 1: Brand & SLA Philosophy */}
          <div className="space-y-4">
            <div 
              onClick={() => handleFooterClick('dashboard')}
              className="flex items-center gap-3 cursor-pointer group w-fit"
            >
              <AztecBirdMascot size={36} interactive={true} showAura={false} />
              <div>
                <span className="font-black text-white text-lg tracking-tight font-header block leading-none group-hover:text-[#C85A32] transition-colors">
                  Iberio
                </span>
                <span className="text-[9px] font-mono uppercase text-[#B47832] font-bold tracking-widest">
                  Cuauhtli Immersion
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed">
              Implicit Spanish Acquisition & Comprehensible Input Engine powered by Dr. Stephen Krashen's i+1 hypothesis and cognitive Second Language Acquisition (SLA) science.
            </p>

            <div className="pt-1 space-y-2">
              {userEmail ? (
                <div className="flex items-center gap-2 text-[11px] text-[#E07A5F] bg-[#C85A32]/10 border border-[#C85A32]/20 px-3 py-1.5 rounded-lg w-fit">
                  <UserCheck className="w-3.5 h-3.5 text-[#C85A32] shrink-0" />
                  <span className="truncate max-w-[180px] font-mono">{userEmail}</span>
                </div>
              ) : (
                <button
                  onClick={() => handleFooterClick('profile')}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#E07A5F] hover:text-white bg-[#C85A32]/10 hover:bg-[#C85A32]/20 border border-[#C85A32]/20 px-3 py-1.5 rounded-lg transition cursor-pointer"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Sincronizar Cuenta</span>
                </button>
              )}
              <div className="flex items-center gap-2 text-[10px] text-stone-500 font-mono">
                <Database className="w-3 h-3 text-[#2D5A43]" />
                <span>Base de Datos Firestore Activa</span>
              </div>
            </div>
          </div>

          {/* Column 2: Inmersión (Reader & Input) */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#B47832] font-mono">
              <Sparkles className="w-4 h-4 text-[#B47832]" />
              <span>Inmersión & Contenido</span>
            </div>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button 
                  onClick={() => handleFooterClick('dashboard')} 
                  className={`hover:text-stone-200 transition cursor-pointer flex items-center justify-between w-full text-left ${
                    activeTab === 'dashboard' ? 'text-[#C85A32] font-bold' : ''
                  }`}
                >
                  <span>Hoy (Cuota de Inmersión)</span>
                  <span className="text-[10px] text-stone-600 font-mono">Hoy</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleFooterClick('stories')} 
                  className={`hover:text-stone-200 transition cursor-pointer flex items-center justify-between w-full text-left ${
                    activeTab === 'stories' ? 'text-[#C85A32] font-bold' : ''
                  }`}
                >
                  <span>Lector Inteligente Krashen</span>
                  <span className="text-[10px] text-stone-500 font-mono">Lectura</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleFooterClick('videos')} 
                  className={`hover:text-stone-200 transition cursor-pointer flex items-center justify-between w-full text-left ${
                    activeTab === 'videos' ? 'text-[#C85A32] font-bold' : ''
                  }`}
                >
                  <span>Cursos en Vídeo Nativo</span>
                  <span className="text-[10px] text-stone-600 font-mono">Vídeo</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleFooterClick('a0_foundation')} 
                  className={`hover:text-stone-200 transition cursor-pointer flex items-center justify-between w-full text-left ${
                    activeTab === 'a0_foundation' ? 'text-[#C85A32] font-bold' : ''
                  }`}
                >
                  <span>Fundamentos Iniciales A0</span>
                  <span className="text-[10px] text-stone-600 font-mono">A0</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Taller (Workshop Hubs) */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C85A32] font-mono">
              <GraduationCap className="w-4 h-4 text-[#C85A32]" />
              <span>Taller de Práctica</span>
            </div>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button 
                  onClick={() => handleFooterClick('vocabulary')} 
                  className={`hover:text-stone-200 transition cursor-pointer flex items-center justify-between w-full text-left ${
                    activeTab === 'vocabulary' ? 'text-[#C85A32] font-bold' : ''
                  }`}
                >
                  <span>Estudio de Oraciones (SRS)</span>
                  <span className="text-[10px] text-stone-600 font-mono">SRS</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleFooterClick('verbs')} 
                  className={`hover:text-stone-200 transition cursor-pointer flex items-center justify-between w-full text-left ${
                    activeTab === 'verbs' ? 'text-[#C85A32] font-bold' : ''
                  }`}
                >
                  <span>Laboratorio de Verbos</span>
                  <span className="text-[10px] text-stone-600 font-mono">600+</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleFooterClick('tutor')} 
                  className={`hover:text-stone-200 transition cursor-pointer flex items-center justify-between w-full text-left ${
                    activeTab === 'tutor' ? 'text-[#C85A32] font-bold' : ''
                  }`}
                >
                  <span>Simulador de Conversación</span>
                  <span className="text-[10px] text-stone-600 font-mono">Diálogo</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleFooterClick('shadowing')} 
                  className={`hover:text-stone-200 transition cursor-pointer flex items-center justify-between w-full text-left ${
                    activeTab === 'shadowing' ? 'text-[#C85A32] font-bold' : ''
                  }`}
                >
                  <span>Entrenamiento Fonético</span>
                  <span className="text-[10px] text-stone-600 font-mono">Cadencia</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleFooterClick('grammar')} 
                  className={`hover:text-stone-200 transition cursor-pointer flex items-center justify-between w-full text-left ${
                    activeTab === 'grammar' ? 'text-[#C85A32] font-bold' : ''
                  }`}
                >
                  <span>Enciclopedia Gramatical</span>
                  <span className="text-[10px] text-stone-600 font-mono">Reglas</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Progreso & Nivel */}
          <div className="space-y-4">
            <div className="bg-[#181615] p-4 rounded-xl border border-stone-800 space-y-3 shadow-2xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#B47832]" />
                  <span className="text-xs font-bold text-stone-200">Nivel CEFR Actual</span>
                </div>
                <span className="px-2 py-0.5 rounded-md bg-[#C85A32] text-white text-[10px] font-mono font-bold">
                  {currentLevel}
                </span>
              </div>
              <p className="text-[11px] text-stone-400 leading-relaxed">
                Progresión adaptativa según comprensión de lectura y retención léxica activa.
              </p>
              <button
                onClick={() => handleFooterClick('path')}
                className="w-full py-1.5 px-3 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-200 text-xs font-semibold transition cursor-pointer flex items-center justify-center gap-1.5 border border-stone-800"
              >
                <span>Diagnóstico de Nivel</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#B47832]" />
              </button>
            </div>

            <div className="space-y-1 text-xs text-stone-400">
              <button
                onClick={() => handleFooterClick('profile')}
                className="hover:text-stone-200 transition cursor-pointer flex items-center justify-between w-full text-left py-1"
              >
                <span>Perfil y Configuración</span>
                <span className="text-[10px] text-stone-600 font-mono">→</span>
              </button>
              <button
                onClick={() => handleFooterClick('planner')}
                className="hover:text-stone-200 transition cursor-pointer flex items-center justify-between w-full text-left py-1"
              >
                <span>Planificador Curricular</span>
                <span className="text-[10px] text-stone-600 font-mono">→</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Build Bar */}
        <div className="pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500 gap-4">
          <div className="flex items-center gap-2">
            <span className="font-mono text-stone-400">© {new Date().getFullYear()} Iberio</span>
            <span>•</span>
            <span>Natural Acquisition Engine</span>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleFooterClick('sitemap')}
              className="hover:text-stone-300 font-semibold transition cursor-pointer"
            >
              Mapa del Sitio y Guías
            </button>
            <button
              onClick={() => handleFooterClick('grammar')}
              className="hover:text-stone-400 transition cursor-pointer"
            >
              Gramática
            </button>
            <button
              onClick={() => handleFooterClick('stories')}
              className="hover:text-stone-400 transition cursor-pointer"
            >
              Lector
            </button>
            <span className="flex items-center gap-1 text-stone-400">
              Made with <Heart className="w-3 h-3 text-[#C85A32] fill-[#C85A32]" /> by M. Mahran
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export const Footer = React.memo(FooterComponent);
