import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Lock,
  Unlock,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  ShieldCheck,
  Volume2,
  HelpCircle,
  Layers,
  ChevronDown,
  ChevronUp,
  Award
} from 'lucide-react';
import { UserProgress } from '../../types';
import {
  NATURAL_ORDER_TENSE_MILESTONES,
  TenseMilestone,
  validateTenseProgression,
  isTenseUnlocked,
  recordTenseMilestoneMastery
} from '../../utils/tenseSequenceValidator';
import { speakSpanish } from '../../utils/audio';
import { soundEffects } from '../../utils/soundEffects';

interface TenseRoadmapModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProgress: UserProgress;
  setUserProgress: React.Dispatch<React.SetStateAction<UserProgress>>;
  onOpenPlacementTest?: () => void;
}

export const TenseRoadmapModal: React.FC<TenseRoadmapModalProps> = ({
  isOpen,
  onClose,
  userProgress,
  setUserProgress,
  onOpenPlacementTest
}) => {
  const [selectedMilestoneId, setSelectedMilestoneId] = useState<string>('level_4_past_contrast');
  const [expandedSubstages, setExpandedSubstages] = useState<Record<string, boolean>>({
    level_4_past_contrast: true,
    level_6_present_subjunctive: true
  });

  // Calculate full Natural Order progression report
  const progressionReport = useMemo(() => {
    return validateTenseProgression(userProgress);
  }, [userProgress]);

  const selectedMilestone = useMemo(() => {
    return NATURAL_ORDER_TENSE_MILESTONES.find(m => m.id === selectedMilestoneId) || NATURAL_ORDER_TENSE_MILESTONES[0];
  }, [selectedMilestoneId]);

  const selectedEvaluation = useMemo(() => {
    return progressionReport.milestonesEvaluated[selectedMilestone.id];
  }, [progressionReport, selectedMilestone]);

  const toggleSubstages = (id: string) => {
    setExpandedSubstages(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Quick Diagnostic Self-Check for testing out a level
  const handleQuickDiagnosticPass = (milestoneId: string) => {
    soundEffects.playLevelUp();
    setUserProgress(prev => recordTenseMilestoneMastery(prev, milestoneId, 92));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        className="w-full max-w-4xl max-h-[92vh] flex flex-col bg-white dark:bg-[#151413] rounded-3xl border border-stone-200 dark:border-stone-800 shadow-2xl overflow-hidden font-sans"
      >
        {/* 1. Header with Natural Order Progression Banner */}
        <div className="p-5 sm:p-6 border-b border-stone-200/80 dark:border-stone-800/80 bg-stone-50/70 dark:bg-stone-900/40 flex items-center justify-between gap-4 flex-wrap">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/25">
                Hipótesis del Orden Natural (Stephen Krashen SLA)
              </span>
              <span className="text-xs font-mono text-stone-500">
                Nivel {progressionReport.highestUnlockedLevel} de 8
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-black text-stone-900 dark:text-stone-100">
              Hoja de Ruta Morfosintáctica ELE
            </h2>
            <p className="text-xs text-stone-600 dark:text-stone-400">
              Secuencia psicocomunicativa para evitar sobrecarga cognitiva: afianza el aspecto pasado antes de acceder al subjuntivo.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-2xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-600 dark:text-stone-300 transition cursor-pointer"
            title="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 2. Critical Subjunctive Gatekeeper Alert Bar */}
        <div className="px-5 py-3 border-b border-stone-200/60 dark:border-stone-800/60 bg-amber-500/5 flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2 text-xs">
            {progressionReport.pastTenseContrastStabilized ? (
              <>
                <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="font-bold text-emerald-800 dark:text-emerald-300">
                  Barrera del Pasado Consolidada: Contraste Indefinido vs Imperfecto verificado (≥85%). Subjuntivo disponible.
                </span>
              </>
            ) : (
              <>
                <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="font-bold text-amber-900 dark:text-amber-300">
                  Barrera Cognitiva Activa: Para desbloquear el Subjuntivo (Nivel 6), debes consolidar el Contraste de Pasados (Nivel 4) con ≥85%.
                </span>
              </>
            )}
          </div>

          {onOpenPlacementTest && (
            <button
              onClick={() => {
                onClose();
                onOpenPlacementTest();
              }}
              className="text-xs font-bold text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Test de Nivelación Rápida</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* 3. Main Split View: Left Timeline Flowchart / Right Detailed Inspector */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-12 min-h-0 divide-y md:divide-y-0 md:divide-x divide-stone-200 dark:divide-stone-800">
          {/* Left Column: 8 Natural Order Milestone Nodes */}
          <div className="md:col-span-5 p-4 sm:p-5 space-y-3 overflow-y-auto max-h-[550px]">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-stone-500 dark:text-stone-400 block px-1">
              Etapas de Adquisición Natural
            </span>

            <div className="space-y-2.5">
              {NATURAL_ORDER_TENSE_MILESTONES.map(milestone => {
                const evalData = progressionReport.milestonesEvaluated[milestone.id];
                const isSelected = selectedMilestoneId === milestone.id;
                const isUnlocked = evalData?.unlocked;
                const isMastered = evalData?.currentMasteryPercentage >= milestone.requiredMasteryPercentage;

                return (
                  <button
                    key={milestone.id}
                    onClick={() => {
                      soundEffects.playPop();
                      setSelectedMilestoneId(milestone.id);
                    }}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                      isSelected
                        ? 'border-amber-500 bg-amber-500/10 shadow-xs ring-1 ring-amber-500/30'
                        : isUnlocked
                        ? 'border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/60 hover:border-stone-300 dark:hover:border-stone-700'
                        : 'border-stone-200/60 dark:border-stone-800/60 bg-stone-50/60 dark:bg-stone-900/30 opacity-70'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-black text-amber-600 dark:text-amber-400">
                          0{milestone.levelNumber}
                        </span>
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-stone-200/70 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                          {milestone.cefrLevel}
                        </span>
                        <span className="font-bold text-sm text-stone-900 dark:text-stone-100">
                          {milestone.name_es}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400">
                        <span>Dominio: {evalData?.currentMasteryPercentage || 0}%</span>
                        <span>•</span>
                        <span>Mínimo: {milestone.requiredMasteryPercentage}%</span>
                      </div>
                    </div>

                    <div className="shrink-0 pt-0.5">
                      {isMastered ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      ) : isUnlocked ? (
                        <Unlock className="w-4 h-4 text-amber-500" />
                      ) : (
                        <Lock className="w-4 h-4 text-stone-400" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Detailed Node Inspector & Pedagogical Justification */}
          <div className="md:col-span-7 p-5 sm:p-6 space-y-5 overflow-y-auto max-h-[550px] bg-stone-50/40 dark:bg-stone-900/20">
            {/* Header: Milestone Title & Status */}
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30">
                  Etapa {selectedMilestone.levelNumber} • Nivel CEFR {selectedMilestone.cefrLevel}
                </span>

                {selectedEvaluation?.unlocked ? (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Desbloqueado para Práctica</span>
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-500/15 text-rose-700 dark:text-rose-300 border border-rose-500/30 flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5" />
                    <span>Bloqueo Cognitivo Prerrequisito</span>
                  </span>
                )}
              </div>

              <h3 className="text-2xl font-serif font-black text-stone-900 dark:text-stone-100">
                {selectedMilestone.name_es}
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                {selectedMilestone.description_en}
              </p>
            </div>

            {/* Locked Warning Box with Pedagogical Explanation if locked */}
            {!selectedEvaluation?.unlocked && (
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs space-y-2">
                <div className="flex items-center gap-1.5 font-bold text-amber-900 dark:text-amber-200">
                  <Lock className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Por qué este tiempo verbal está protegido por el Orden Natural:</span>
                </div>
                <p className="text-stone-700 dark:text-stone-300 leading-relaxed font-medium">
                  {selectedEvaluation?.cognitiveLockReason}
                </p>
                {selectedEvaluation?.cognitiveLockReason_ar && (
                  <p className="text-amber-950/80 dark:text-amber-300/80 font-arabic pt-1" dir="rtl">
                    {selectedEvaluation.cognitiveLockReason_ar}
                  </p>
                )}

                {/* Missing Prerequisites List */}
                <div className="pt-2 border-t border-amber-500/20 space-y-1">
                  <span className="font-bold text-stone-800 dark:text-stone-200 block">
                    Prerrequisitos pendientes para desbloqueo:
                  </span>
                  {selectedEvaluation?.missingPrerequisites.map(prereq => (
                    <div key={prereq.id} className="flex items-center justify-between text-[11px] text-stone-600 dark:text-stone-400">
                      <span>• {prereq.name_es}</span>
                      <span className="font-mono font-bold text-amber-700 dark:text-amber-400">
                        {prereq.currentScore}% / {prereq.requiredScore}% requerido
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Trigger Anchors (Marcadores Temporales de Activación) */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider block">
                Anclas Temporales y Disparadores Sintácticos:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedMilestone.triggerAnchors.map((anchor, i) => (
                  <span
                    key={i}
                    onClick={() => speakSpanish(anchor)}
                    className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 hover:border-amber-400 text-stone-800 dark:text-stone-200 transition cursor-pointer"
                    title="Haz clic para escuchar pronunciación"
                  >
                    {anchor}
                  </span>
                ))}
              </div>
            </div>

            {/* Sub-stages and Structural Examples */}
            <div className="space-y-2.5">
              <span className="text-[11px] font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider block">
                Micro-Competencias Morfológicas:
              </span>

              <div className="space-y-2">
                {selectedMilestone.subStages.map((stage, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-1.5 text-xs shadow-2xs"
                  >
                    <div className="flex items-center justify-between font-bold text-stone-900 dark:text-stone-100">
                      <span>{stage.title}</span>
                      <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400">{stage.focus}</span>
                    </div>
                    <div className="flex items-start justify-between gap-2 bg-stone-50 dark:bg-stone-800/60 p-2 rounded-lg">
                      <div className="space-y-0.5">
                        <p className="font-semibold text-stone-800 dark:text-stone-200 italic">
                          "{stage.examples.es}"
                        </p>
                        <p className="text-stone-500 text-[11px]">
                          {stage.examples.en}
                        </p>
                      </div>
                      <button
                        onClick={() => speakSpanish(stage.examples.es)}
                        className="p-1 rounded-md text-stone-400 hover:text-amber-500 cursor-pointer"
                        title="Escuchar ejemplo"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Bar: Test Out / Diagnostic Practice */}
            <div className="pt-3 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between flex-wrap gap-2">
              <button
                onClick={() => handleQuickDiagnosticPass(selectedMilestone.id)}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-extrabold text-xs flex items-center gap-1.5 shadow-sm transition cursor-pointer"
              >
                <Award className="w-3.5 h-3.5" />
                <span>Simular Consolidación (Diagnóstico ≥85%)</span>
              </button>

              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 font-extrabold text-xs cursor-pointer hover:opacity-90 transition"
              >
                Volver a la Lección
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
