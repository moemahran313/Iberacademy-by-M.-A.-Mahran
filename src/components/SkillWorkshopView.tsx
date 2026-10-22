import React from 'react';
import { motion } from 'motion/react';
import {
  BookOpen,
  TrendingUp,
  MessageSquare,
  Mic,
  ArrowRight,
  Sparkles,
  GraduationCap,
  Zap,
  Video,
  Compass
} from 'lucide-react';
import { UserProgress } from '../types';
import { soundEffects } from '../utils/audio';

interface SkillWorkshopViewProps {
  userProgress: UserProgress;
  setUserProgress: React.Dispatch<React.SetStateAction<UserProgress>>;
  setActiveTab: (tab: string) => void;
}

export const SkillWorkshopView: React.FC<SkillWorkshopViewProps> = ({
  userProgress,
  setActiveTab
}) => {
  const savedWordsCount = userProgress.savedWordIds?.length || 0;

  // Exactly 4 Categorized Tool Hubs
  const primaryHubs = [
    {
      id: 'vocabulary',
      title: 'Estudio de Oraciones (SRS)',
      description: 'Spaced repetition for saved words & mined sentences.',
      status: `${savedWordsCount} tarjetas en memoria activa`,
      icon: BookOpen,
      accentText: 'text-[#B47832] dark:text-amber-400',
      accentBg: 'bg-[#B47832]/10 dark:bg-[#B47832]/15',
      accentBorder: 'border-[#B47832]/25',
      badgeText: `${savedWordsCount} Tarjetas SRS`
    },
    {
      id: 'verbs',
      title: 'Laboratorio de Verbos',
      description: 'Contextual tense practice & high-utility verb matrices.',
      status: '600+ verbos conjugados en modo indicativo y subjuntivo',
      icon: TrendingUp,
      accentText: 'text-[#C85A32] dark:text-[#E07A5F]',
      accentBg: 'bg-[#C85A32]/10 dark:bg-[#C85A32]/15',
      accentBorder: 'border-[#C85A32]/25',
      badgeText: 'Matrices de Alta Frecuencia'
    },
    {
      id: 'tutor',
      title: 'Simulador de Conversación',
      description: 'Real-world AI dialogue scenarios with instant native recasts.',
      status: 'Escenarios reales con retroalimentación implícita nativa',
      icon: MessageSquare,
      accentText: 'text-[#2D5A43] dark:text-emerald-400',
      accentBg: 'bg-[#2D5A43]/10 dark:bg-[#2D5A43]/15',
      accentBorder: 'border-[#2D5A43]/25',
      badgeText: 'Práctica Dialógica Activa'
    },
    {
      id: 'shadowing',
      title: 'Entrenamiento Fonético',
      description: 'Cadence & shadowing studio with robust fallback audio.',
      status: '3 fases: discriminación auditiva, espejo y habla simultánea',
      icon: Mic,
      accentText: 'text-stone-800 dark:text-stone-200',
      accentBg: 'bg-stone-100 dark:bg-stone-800',
      accentBorder: 'border-stone-300/80 dark:border-stone-700/80',
      badgeText: 'Cadencia y Prosodia'
    }
  ];

  // Subdued Secondary Reference Strip (Non-intrusive)
  const referenceTools = [
    { id: 'grammar', title: 'Enciclopedia Gramatical', icon: GraduationCap },
    { id: 'a0_foundation', title: 'Fundamentos A0', icon: Zap },
    { id: 'videos', title: 'Inmersión en Vídeo', icon: Video },
    { id: 'sitemap', title: 'Mapa del Sitio y Guías', icon: Compass }
  ];

  const handleOpenTool = (toolId: string) => {
    soundEffects.playPop();
    setActiveTab(toolId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-8 pb-16 max-w-7xl mx-auto px-4 sm:px-6">
      {/* Workshop Editorial Header */}
      <div className="space-y-2 border-b border-stone-200/80 dark:border-stone-800/80 pb-6">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#C85A32]/10 text-[#C85A32] dark:text-[#E07A5F] text-xs font-semibold border border-[#C85A32]/20">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Taller de Habilidades • Práctica Deliberada</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-stone-900 dark:text-stone-100 tracking-tight font-header">
          Herramientas de Adquisición Focalizada
        </h1>
        <p className="text-sm text-stone-600 dark:text-stone-400 max-w-2xl leading-relaxed">
          Cuatro módulos especializados diseñados bajo los principios de la adquisición implícita y la práctica deliberada para consolidar tu fluidez en español.
        </p>
      </div>

      {/* Grid of Exactly 4 Categorized Tool Hubs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        {primaryHubs.map(hub => {
          const Icon = hub.icon;
          return (
            <motion.div
              key={hub.id}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.18 }}
              onClick={() => handleOpenTool(hub.id)}
              className="group p-6 rounded-2xl bg-white dark:bg-[#181615] border border-stone-200/80 dark:border-stone-800/80 shadow-xs hover:shadow-md hover:border-stone-300 dark:hover:border-stone-700 transition-all duration-200 cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-4">
                {/* Header row with Icon and Single Status Indicator */}
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-xl border ${hub.accentBg} ${hub.accentBorder} ${hub.accentText}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md border ${hub.accentBg} ${hub.accentBorder} ${hub.accentText}`}>
                    {hub.badgeText}
                  </span>
                </div>

                {/* Hub Title & Single-line Description */}
                <div>
                  <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 group-hover:text-[#C85A32] dark:group-hover:text-[#E07A5F] transition-colors">
                    {hub.title}
                  </h3>
                  <p className="text-xs font-semibold text-stone-600 dark:text-stone-300 mt-1">
                    {hub.description}
                  </p>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-2">
                    {hub.status}
                  </p>
                </div>
              </div>

              {/* Bottom Launch Action */}
              <div className="mt-6 pt-4 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between text-xs font-semibold text-stone-700 dark:text-stone-300 group-hover:text-[#C85A32] dark:group-hover:text-[#E07A5F] transition-colors">
                <span>Abrir Módulo</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Subdued Secondary Reference Bar */}
      <div className="pt-4 border-t border-stone-200/80 dark:border-stone-800/80">
        <p className="text-[10px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 font-mono mb-3">
          Recursos de Referencia y Fundamentos
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {referenceTools.map(tool => {
            const Icon = tool.icon;
            return (
              <button
                key={tool.id}
                onClick={() => handleOpenTool(tool.id)}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-white dark:bg-[#181615] border border-stone-200/80 dark:border-stone-800/80 hover:border-stone-300 dark:hover:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-900 text-stone-700 dark:text-stone-300 text-xs font-semibold transition cursor-pointer text-left shadow-2xs"
              >
                <Icon className="w-4 h-4 text-stone-500 shrink-0" />
                <span className="truncate">{tool.title}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
