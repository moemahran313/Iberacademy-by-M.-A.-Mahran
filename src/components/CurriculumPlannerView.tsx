import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Layers,
  Sparkles,
  Target,
  CheckCircle2,
  Clock,
  ArrowRight,
  AlertTriangle,
  Brain,
  BookOpen,
  MessageSquare,
  GraduationCap,
  Briefcase,
  Users,
  Plane,
  ChevronRight,
  TrendingUp,
  Award,
  Zap,
  Plus,
  Check,
  Filter,
  Bookmark,
  Volume2
} from 'lucide-react';
import { UserProgress, CEFRLevel, RoleplayEvaluationRecord } from '../types';
import { CURRICULUM_UNITS } from '../data';
import { WORLD_CURRICULUM_SPECS, WorldCurriculumMeta } from '../data/worldCurriculumSpecs';
import { soundEffects, speakSpanish } from '../utils/audio';

interface CurriculumPlannerViewProps {
  userProgress: UserProgress;
  setUserProgress: React.Dispatch<React.SetStateAction<UserProgress>>;
  setActiveTab: (tab: string) => void;
}

interface VocabularyTopicSuggestion {
  id: string;
  title_es: string;
  title_en: string;
  title_ar: string;
  domain: 'professional' | 'social' | 'travel' | 'grammar';
  icon: any;
  urgency: 'high' | 'medium' | 'low';
  weaknessContext_es: string;
  weaknessContext_en: string;
  words: { spanish: string; english: string; arabic: string; pos: string }[];
  targetScenarioDomain?: string;
  targetGrammarTopicId?: string;
}

export const CurriculumPlannerView: React.FC<CurriculumPlannerViewProps> = ({
  userProgress,
  setUserProgress,
  setActiveTab
}) => {
  const [addedTopicIds, setAddedTopicIds] = useState<Record<string, boolean>>({});
  const [activePlannerTab, setActivePlannerTab] = useState<'roadmap' | 'grammar' | 'vocab' | 'milestones'>('roadmap');
  const [selectedLevelFilter, setSelectedLevelFilter] = useState<'ALL' | 'A1' | 'A2' | 'B1' | 'B2'>('ALL');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const evaluations: RoleplayEvaluationRecord[] = userProgress.roleplayEvaluations || [];
  const latestEval = evaluations[0];

  // Calculate weak areas based on evaluation history
  const avgVocabScore = evaluations.length > 0
    ? Math.round(evaluations.reduce((acc, e) => acc + (e.vocabularyUsageScore || 70), 0) / evaluations.length)
    : 68;
  const avgFluencyScore = evaluations.length > 0
    ? Math.round(evaluations.reduce((acc, e) => acc + (e.writingFluencyScore || 70), 0) / evaluations.length)
    : 72;
  const avgListeningScore = evaluations.length > 0
    ? Math.round(evaluations.reduce((acc, e) => acc + (e.listeningRelevanceScore || 70), 0) / evaluations.length)
    : 75;

  // A1 and A2 level statistics for progress tracking
  const a1Units = CURRICULUM_UNITS.filter(u => u.level === 'A1');
  const a1Lessons = a1Units.flatMap(u => u.lessons);
  const a1Completed = a1Lessons.filter(l => userProgress.completedLessonIds.includes(l.id)).length;
  const a1Percent = Math.round((a1Completed / Math.max(a1Lessons.length, 1)) * 100);

  const a2Units = CURRICULUM_UNITS.filter(u => u.level === 'A2');
  const a2Lessons = a2Units.flatMap(u => u.lessons);
  const a2Completed = a2Lessons.filter(l => userProgress.completedLessonIds.includes(l.id)).length;
  const a2Percent = Math.round((a2Completed / Math.max(a2Lessons.length, 1)) * 100);

  // Filtered units based on level filter
  const displayedUnits = CURRICULUM_UNITS.filter(u => {
    if (selectedLevelFilter === 'ALL') return u.level === 'A1' || u.level === 'A2';
    return u.level === selectedLevelFilter;
  });

  // Milestone Definitions for B2
  const milestones = [
    {
      id: 'm1',
      number: 1,
      title_es: 'Hitos B2.1: Conectores y Discurso Formal',
      title_en: 'B2.1 Milestone: Connectors & Formal Discourse',
      status: 'completed',
      completion: 100,
      description_es: 'Dominio de conectores lógicos para argumentación estructurada (sin embargo, por lo tanto, no obstante).',
      competencies: ['Estructuración formal de textos', 'Argumentación en debates B2', 'Cohesión léxica superior'],
      targetVocabCount: 45
    },
    {
      id: 'm2',
      number: 2,
      title_es: 'Hitos B2.2: Subjuntivo en Negociaciones y Disputas',
      title_en: 'B2.2 Milestone: Subjunctive Mood in Business & Dispute Resolution',
      status: 'current',
      completion: 65,
      description_es: 'Uso fluido del subjuntivo para expresar duda, exigencias, deseos y condiciones contractuales.',
      competencies: ['Cláusulas condicionales complejas', 'Resolución de conflictos laborales', 'Expresión de hipótesis'],
      targetVocabCount: 60
    },
    {
      id: 'm3',
      number: 3,
      title_es: 'Hitos B2.3: Léxico Ejecutivo y Estrategia Empresarial',
      title_en: 'B2.3 Milestone: Executive Vocabulary & Business Strategy',
      status: 'upcoming',
      completion: 15,
      description_es: 'Vocabulario avanzado de sinergias, paradigmas, matices contractuales y viabilidad económica.',
      competencies: ['Presentaciones ejecutivas B2', 'Léxico económico avanzado', 'Redacción de propuestas'],
      targetVocabCount: 80
    },
    {
      id: 'm4',
      number: 4,
      title_es: 'Hitos B2.4: Debates Sociales y Persuasión Pública',
      title_en: 'B2.4 Milestone: Social Debates & Public Persuasion',
      status: 'upcoming',
      completion: 0,
      description_es: 'Defensa articulada de posturas complejas con elocuencia, matiz y cortesía académica.',
      competencies: ['Debates sobre tecnología y sociedad', 'Expresión de escepticismo', 'Uso de matices emotivos'],
      targetVocabCount: 75
    }
  ];

  // Dynamically Suggested B2 Vocabulary Topics based on Weaknesses
  const suggestedTopics: VocabularyTopicSuggestion[] = [
    {
      id: 'topic_executive',
      title_es: 'Léxico Corporativo y Estrategia Empresarial',
      title_en: 'Corporate Strategy & Executive Vocabulary',
      title_ar: 'مصطلحات الاستراتيجية والتفاوض التجاري',
      domain: 'professional',
      icon: Briefcase,
      urgency: avgVocabScore < 75 ? 'high' : 'medium',
      weaknessContext_es: latestEval?.domain === 'professional'
        ? `Detectado en el juego de rol "${latestEval.title}": Se omitió vocabulario B2 clave de negociación.`
        : 'Recomendado por el AI Tutor para reforzar tu desempeño en escenarios de negociaciones ejecutivas.',
      weaknessContext_en: 'Identified in recent Executive Role-Plays where formal B2 negotiation terms were missing.',
      words: [
        { spanish: 'Sinergia', english: 'Synergy', arabic: 'تآزر / تكامل', pos: 'noun' },
        { spanish: 'Paradigma', english: 'Paradigm', arabic: 'نموذج فكري', pos: 'noun' },
        { spanish: 'Matiz', english: 'Nuance / Shade', arabic: 'فارق دقيق', pos: 'noun' },
        { spanish: 'Viabilidad', english: 'Viability / Feasibility', arabic: 'جدوى / إمكانية تنفيذ', pos: 'noun' },
        { spanish: 'Certeza', english: 'Certainty / Conviction', arabic: 'يقين / حسم', pos: 'noun' }
      ],
      targetScenarioDomain: 'professional'
    },
    {
      id: 'topic_subjunctive',
      title_es: 'Gatillos del Subjuntivo: Duda, Emoción y Exigencia',
      title_en: 'Subjunctive Clause Triggers: Doubt & Emotion',
      title_ar: 'روابط صيغة الشك والرجاء في القواعد',
      domain: 'grammar',
      icon: GraduationCap,
      urgency: avgFluencyScore < 75 ? 'high' : 'medium',
      weaknessContext_es: 'Análisis de IA: Tu puntuación de fluidez (72/100) mejorará aplicando cláusulas condicionales y subjuntivo.',
      weaknessContext_en: 'AI Diagnostic: Fluency scores increase significantly when using subjunctive triggers in arguments.',
      words: [
        { spanish: 'Es imprescindible que', english: 'It is essential that', arabic: 'من الضروري أن', pos: 'phrase' },
        { spanish: 'Dudo que', english: 'I doubt that', arabic: 'أشك في أن', pos: 'phrase' },
        { spanish: 'Lamento que', english: 'I regret that', arabic: 'يؤسفني أن', pos: 'phrase' },
        { spanish: 'A menos que', english: 'Unless', arabic: 'ما لم / إلا إذا', pos: 'conjunction' },
        { spanish: 'Ojalá', english: 'I hope / Would that', arabic: 'يا ليت / عسى أن', pos: 'interjection' }
      ],
      targetGrammarTopicId: 'subjunctive-present'
    }
  ];

  // Handle adding words from a topic to user's SRS saved words
  const handleAddTopicToSRS = (topic: VocabularyTopicSuggestion) => {
    soundEffects.playLevelUp();
    const newWordIds = topic.words.map(w => w.spanish.toLowerCase());

    setUserProgress(prev => {
      const existingSaved = new Set(prev.savedWordIds || []);
      newWordIds.forEach(id => existingSaved.add(id));
      return {
        ...prev,
        savedWordIds: Array.from(existingSaved),
        xp: (prev.xp || 0) + 15
      };
    });

    setAddedTopicIds(prev => ({ ...prev, [topic.id]: true }));
    setToastMessage(`Added 5 words from "${topic.title_es}" to your SRS practice queue (+15 XP)!`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8 animate-fadeIn">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-6 z-50 bg-amber-500 text-stone-950 px-5 py-3 rounded-2xl shadow-xl font-extrabold text-xs flex items-center gap-2 border border-amber-400"
          >
            <Sparkles className="w-4 h-4 fill-stone-950" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Banner with A1-A2 World Hierarchy Progress */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-950 to-stone-900 text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden border border-stone-800 shadow-xl space-y-6">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-xl bg-amber-500 text-stone-950 font-black text-xs uppercase tracking-wider">
                A1–A2 Structured Hierarchy Roadmap
              </span>
              <span className="px-3 py-1 rounded-xl bg-stone-800 text-amber-400 border border-amber-500/30 font-bold text-xs">
                Separated Grammar &amp; Vocabulary Decks
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Curriculum Planner &amp; World Hierarchy
            </h1>

            <p className="text-sm text-stone-300 leading-relaxed">
              Track your progressive journey across 28 structured Worlds in A1 and A2. Every World separates explicit grammar blueprints from target vocabulary decks, ensuring you always know where you stand on the roadmap.
            </p>
          </div>

          {/* Quick Readiness Card */}
          <div className="bg-stone-800/90 border border-stone-700/80 rounded-2xl p-5 flex items-center gap-4 shrink-0 shadow-sm">
            <div className="p-3 rounded-2xl bg-amber-500 text-stone-950 font-black">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-stone-400">Roadmap Progress</p>
              <p className="text-xl font-black text-amber-400">{userProgress.completedLessonIds.length} / 142 Lessons Cleared</p>
              <p className="text-[11px] text-stone-300">A1: {a1Percent}% • A2: {a2Percent}%</p>
            </div>
          </div>
        </div>

        {/* Level Progression Progress Bars */}
        <div className="relative z-10 pt-4 border-t border-stone-800/80 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-stone-900/80 border border-stone-800 rounded-2xl p-4 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-amber-400 font-black">🌱 Level A1 (16 Worlds)</span>
              <span className="text-stone-300">{a1Completed} / 81 Lessons ({a1Percent}%)</span>
            </div>
            <div className="w-full bg-stone-800 rounded-full h-2 overflow-hidden">
              <div className="bg-amber-500 h-full rounded-full transition-all duration-500" style={{ width: `${Math.max(a1Percent, 3)}%` }} />
            </div>
          </div>

          <div className="bg-stone-900/80 border border-stone-800 rounded-2xl p-4 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-emerald-400 font-black">🚀 Level A2 (12 Worlds)</span>
              <span className="text-stone-300">{a2Completed} / 61 Lessons ({a2Percent}%)</span>
            </div>
            <div className="w-full bg-stone-800 rounded-full h-2 overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: `${Math.max(a2Percent, 3)}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Main View Mode Navigation Switcher */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
        <div className="bg-stone-100 dark:bg-stone-900 p-1.5 rounded-2xl border border-stone-200 dark:border-stone-800 flex flex-wrap gap-1 flex-1">
          <button
            onClick={() => setActivePlannerTab('roadmap')}
            className={`flex-1 min-w-[130px] px-4 py-2.5 rounded-xl text-xs font-black transition flex items-center justify-center gap-2 cursor-pointer ${
              activePlannerTab === 'roadmap'
                ? 'bg-amber-500 text-stone-950 shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Worlds &amp; Lessons Hierarchy</span>
          </button>

          <button
            onClick={() => setActivePlannerTab('grammar')}
            className={`flex-1 min-w-[130px] px-4 py-2.5 rounded-xl text-xs font-black transition flex items-center justify-center gap-2 cursor-pointer ${
              activePlannerTab === 'grammar'
                ? 'bg-amber-500 text-stone-950 shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Core Grammar Blueprints</span>
          </button>

          <button
            onClick={() => setActivePlannerTab('vocab')}
            className={`flex-1 min-w-[130px] px-4 py-2.5 rounded-xl text-xs font-black transition flex items-center justify-center gap-2 cursor-pointer ${
              activePlannerTab === 'vocab'
                ? 'bg-amber-500 text-stone-950 shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Vocabulary Decks &amp; Chunks</span>
          </button>

          <button
            onClick={() => setActivePlannerTab('milestones')}
            className={`flex-1 min-w-[130px] px-4 py-2.5 rounded-xl text-xs font-black transition flex items-center justify-center gap-2 cursor-pointer ${
              activePlannerTab === 'milestones'
                ? 'bg-amber-500 text-stone-950 shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            <Brain className="w-4 h-4" />
            <span>AI Diagnostic Weaknesses</span>
          </button>
        </div>

        {/* Level Filter Dropdown */}
        <div className="flex items-center gap-2 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-1.5 shrink-0">
          <Filter className="w-4 h-4 text-stone-400 ml-2" />
          {(['ALL', 'A1', 'A2'] as const).map(lvl => (
            <button
              key={lvl}
              onClick={() => setSelectedLevelFilter(lvl)}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition cursor-pointer ${
                selectedLevelFilter === lvl
                  ? 'bg-stone-900 dark:bg-amber-500 text-white dark:text-stone-950'
                  : 'text-stone-500 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              {lvl === 'ALL' ? 'A1 + A2' : lvl}
            </button>
          ))}
        </div>
      </div>

      {/* ============================================================ */}
      {/* TAB 1: WORLDS & LESSONS HIERARCHY MAP                        */}
      {/* ============================================================ */}
      {activePlannerTab === 'roadmap' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-stone-200 dark:border-stone-800">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-amber-500 text-stone-950 font-black">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-black text-stone-900 dark:text-white flex items-center gap-2">
                    <span>Structured Progressive World &amp; Lesson Hierarchy</span>
                  </h2>
                  <p className="text-xs text-stone-500 dark:text-stone-400">
                    28 thematic Worlds separating Core Grammar blueprints from Essential Vocabulary decks.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setActiveTab('path')}
                className="px-4 py-2 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs transition flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span>Interactive Pathway View</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* List of Worlds */}
            <div className="space-y-6">
              {displayedUnits.map((unit) => {
                const spec = WORLD_CURRICULUM_SPECS[unit.unitNumber];
                const totalLessons = unit.lessons.length;
                const completedInUnit = unit.lessons.filter(l => userProgress.completedLessonIds.includes(l.id)).length;
                const isUnitMastered = completedInUnit === totalLessons && totalLessons > 0;

                return (
                  <div
                    key={unit.id}
                    className="bg-stone-50/60 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-800 rounded-2xl p-5 sm:p-6 space-y-5"
                  >
                    {/* World Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200/60 dark:border-stone-700/60 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black bg-stone-900 dark:bg-amber-500 text-white dark:text-stone-950">
                            World {unit.unitNumber}
                          </span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-500/30">
                            {unit.level} Roadmap
                          </span>
                        </div>
                        <h3 className="text-lg font-black text-stone-900 dark:text-white mt-1">
                          {unit.title_es}
                        </h3>
                        <p className="text-xs text-stone-600 dark:text-stone-300 font-medium">
                          🇬🇧 {unit.title_en} • <span className="font-arabic" dir="rtl">{unit.title_ar}</span>
                        </p>
                      </div>

                      <div className="flex items-center gap-2 bg-white dark:bg-stone-800 px-3.5 py-2 rounded-xl border border-stone-200 dark:border-stone-700 shrink-0">
                        <span className="text-xs font-black text-stone-900 dark:text-stone-100">
                          {completedInUnit} / {totalLessons} Cleared
                        </span>
                        {isUnitMastered && <Check className="w-4 h-4 text-emerald-500" />}
                      </div>
                    </div>

                    {/* Separated Grammar vs Vocabulary Pillars */}
                    {spec && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Grammar Pillar */}
                        <div className="bg-amber-500/10 dark:bg-amber-950/40 border border-amber-300/60 dark:border-amber-800/60 rounded-xl p-4 space-y-2">
                          <div className="flex items-center gap-2">
                            <GraduationCap className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                            <span className="text-xs font-extrabold text-amber-900 dark:text-amber-300">
                              Core Grammar: {spec.grammar.grammarTitle_es}
                            </span>
                          </div>
                          <ul className="space-y-1 text-[11px] text-stone-700 dark:text-stone-300">
                            {spec.grammar.keyRules.map((rule, rIdx) => (
                              <li key={rIdx} className="flex items-start gap-1">
                                <span className="text-amber-500">•</span>
                                <span>{rule.rule_es} (<span className="font-bold">{rule.example}</span>)</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Vocabulary Pillar */}
                        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl p-4 space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <BookOpen className="w-4 h-4 text-amber-500" />
                              <span className="text-xs font-extrabold text-stone-900 dark:text-white">
                                Vocabulary: {spec.vocabulary.vocabTitle_es} ({spec.vocabulary.targetCount} Words)
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-1 pt-1">
                            {spec.vocabulary.sampleChunks.map((chk, idx) => (
                              <span
                                key={idx}
                                onClick={() => speakSpanish(chk.spanish)}
                                className="px-2 py-0.5 rounded text-[10px] font-bold bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 border border-stone-200 dark:border-stone-700 hover:border-amber-500 cursor-pointer"
                              >
                                {chk.spanish}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Lessons Breakdown */}
                    <div className="space-y-2 pt-1">
                      <span className="text-[10px] font-black uppercase text-stone-400 tracking-wider block">
                        Sequential Lessons in World {unit.unitNumber}:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                        {unit.lessons.map((lesson) => {
                          const isDone = userProgress.completedLessonIds.includes(lesson.id);
                          return (
                            <div
                              key={lesson.id}
                              className={`p-3 rounded-xl border text-xs flex items-center justify-between gap-2 ${
                                isDone
                                  ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200'
                                  : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-700 text-stone-800 dark:text-stone-200'
                              }`}
                            >
                              <div>
                                <span className="text-[10px] font-bold text-stone-400 block">
                                  Lesson {lesson.lessonNumber}
                                </span>
                                <span className="font-extrabold line-clamp-1">{lesson.title_es}</span>
                              </div>
                              {isDone && <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 2: CORE GRAMMAR BLUEPRINTS HIERARCHY                      */}
      {/* ============================================================ */}
      {activePlannerTab === 'grammar' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-amber-500 text-stone-950 font-black">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-black text-stone-900 dark:text-white">
                  Core Grammar Blueprint Catalog
                </h2>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  Separated grammatical focus for every World across A1 and A2.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {displayedUnits.map((unit) => {
                const spec = WORLD_CURRICULUM_SPECS[unit.unitNumber];
                if (!spec) return null;

                return (
                  <div
                    key={unit.id}
                    className="bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 rounded-2xl p-5 space-y-3"
                  >
                    <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-700 pb-2">
                      <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black bg-amber-500 text-stone-950">
                        World {unit.unitNumber} • {unit.level}
                      </span>
                      <span className="text-xs font-bold text-stone-500">
                        {unit.title_es}
                      </span>
                    </div>

                    <h3 className="text-sm font-black text-stone-900 dark:text-white">
                      {spec.grammar.grammarTitle_es}
                    </h3>

                    <div className="space-y-2 pt-1">
                      {spec.grammar.keyRules.map((rule, idx) => (
                        <div key={idx} className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl p-3 text-xs space-y-1">
                          <p className="font-extrabold text-stone-900 dark:text-stone-100">
                            📌 {rule.rule_es}
                          </p>
                          <p className="text-stone-600 dark:text-stone-300 font-medium">
                            🇬🇧 {rule.rule_en}
                          </p>
                          <p className="text-amber-700 dark:text-amber-400 font-extrabold bg-amber-50 dark:bg-amber-950/50 p-1.5 rounded-lg border border-amber-200 dark:border-amber-800/60 mt-1">
                            Example: "{rule.example}"
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 3: VOCABULARY DECKS & CHUNKS HIERARCHY                   */}
      {/* ============================================================ */}
      {activePlannerTab === 'vocab' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-amber-500 text-stone-950 font-black">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-black text-stone-900 dark:text-white">
                  Essential Vocabulary &amp; Collocation Decks
                </h2>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  Target vocabulary lists organized by World for Spaced Repetition (SRS) Flashcard queueing.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {displayedUnits.map((unit) => {
                const spec = WORLD_CURRICULUM_SPECS[unit.unitNumber];
                if (!spec) return null;

                return (
                  <div
                    key={unit.id}
                    className="bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 rounded-2xl p-5 space-y-3"
                  >
                    <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-700 pb-2">
                      <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black bg-stone-900 dark:bg-amber-500 text-white dark:text-stone-950">
                        World {unit.unitNumber} • {unit.level}
                      </span>
                      <span className="text-xs font-bold text-stone-500">
                        {unit.title_es}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-sm font-black text-stone-900 dark:text-white">
                        {spec.vocabulary.vocabTitle_es}
                      </h3>
                      <p className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                        Target Deck: {spec.vocabulary.targetCount} Words
                      </p>
                    </div>

                    <div className="space-y-2 pt-1">
                      {spec.vocabulary.sampleChunks.map((chunk, idx) => (
                        <div
                          key={idx}
                          onClick={() => speakSpanish(chunk.spanish)}
                          className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl p-3 text-xs flex items-center justify-between gap-3 hover:border-amber-500 transition cursor-pointer"
                        >
                          <div>
                            <p className="font-black text-stone-900 dark:text-stone-100 text-sm">
                              {chunk.spanish}
                            </p>
                            <p className="text-stone-600 dark:text-stone-300 font-medium mt-0.5">
                              🇬🇧 {chunk.english}
                            </p>
                            <p className="text-[11px] text-stone-500 dark:text-stone-400 font-arabic mt-0.5" dir="rtl">
                              🇦🇪 {chunk.arabic}
                            </p>
                          </div>
                          <Volume2 className="w-4 h-4 text-amber-500 shrink-0" />
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 4: AI DIAGNOSTIC WEAKNESSES & B2 MILESTONES               */}
      {/* ============================================================ */}
      {activePlannerTab === 'milestones' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-stone-900 border border-amber-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-stone-200 dark:border-stone-800">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-amber-500 text-stone-950 font-black">
                  <Brain className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-black text-stone-900 dark:text-white flex items-center gap-2">
                    <span>AI Tutor Role-Play Weakness Analysis</span>
                    <span className="text-xs px-2.5 py-0.5 rounded-lg bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                      Live Diagnostic
                    </span>
                  </h2>
                  <p className="text-xs text-stone-500 dark:text-stone-400">
                    Derived from recent AI Tutor Chat evaluations &amp; skill challenge responses.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setActiveTab('linglooper')}
                className="px-4 py-2 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs transition flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Launch New Role-Play Challenge</span>
              </button>
            </div>

            {/* Metric Snapshot */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/80 rounded-2xl p-4 text-center space-y-1">
                <p className="text-xs font-bold text-stone-500 dark:text-stone-400">🎧 Listening Relevance</p>
                <p className="text-2xl font-black text-sky-500">{avgListeningScore}/100</p>
                <p className="text-[11px] text-stone-400">Contextual Comprehension</p>
              </div>

              <div className="bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/80 rounded-2xl p-4 text-center space-y-1">
                <p className="text-xs font-bold text-stone-500 dark:text-stone-400">💬 Writing &amp; Speaking Fluency</p>
                <p className="text-2xl font-black text-amber-500">{avgFluencyScore}/100</p>
                <p className="text-[11px] text-stone-400">Syntactic Spontaneity</p>
              </div>

              <div className="bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/80 rounded-2xl p-4 text-center space-y-1">
                <p className="text-xs font-bold text-stone-500 dark:text-stone-400">📚 Vocabulary Precision</p>
                <p className="text-2xl font-black text-orange-500">{avgVocabScore}/100</p>
                <p className="text-[11px] text-stone-400">Lexical Nuance &amp; Collocations</p>
              </div>
            </div>

            {/* Suggested Weakness Remedy Topics */}
            <div className="space-y-4">
              <h3 className="text-sm font-black text-stone-900 dark:text-white uppercase tracking-wider text-xs flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span>AI Recommended Remediation Topics</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {suggestedTopics.map(topic => {
                  const Icon = topic.icon;
                  const isAdded = addedTopicIds[topic.id];

                  return (
                    <div
                      key={topic.id}
                      className="bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 rounded-2xl p-5 space-y-3 flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="p-2 rounded-xl bg-amber-500/20 text-amber-700 dark:text-amber-300">
                              <Icon className="w-4 h-4" />
                            </span>
                            <span className="text-xs font-black text-stone-900 dark:text-white">
                              {topic.title_es}
                            </span>
                          </div>
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase ${
                            topic.urgency === 'high' ? 'bg-rose-500/20 text-rose-700 dark:text-rose-300 border border-rose-500/30' : 'bg-amber-500/20 text-amber-700 dark:text-amber-300'
                          }`}>
                            {topic.urgency} Priority
                          </span>
                        </div>

                        <p className="text-xs text-stone-600 dark:text-stone-300 bg-amber-50 dark:bg-amber-950/40 p-2.5 rounded-xl border border-amber-200/80 dark:border-amber-800/60 leading-relaxed font-medium">
                          💡 {topic.weaknessContext_es}
                        </p>

                        <div className="flex flex-wrap gap-1 pt-1">
                          {topic.words.map((w, wIdx) => (
                            <span
                              key={wIdx}
                              onClick={() => speakSpanish(w.spanish)}
                              className="px-2 py-1 rounded-lg text-[10px] font-bold bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 border border-stone-200 dark:border-stone-700 hover:border-amber-500 cursor-pointer flex items-center gap-1"
                            >
                              <span>{w.spanish}</span>
                              <Volume2 className="w-3 h-3 text-amber-500" />
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-2 border-t border-stone-200 dark:border-stone-700 flex justify-end">
                        <button
                          onClick={() => handleAddTopicToSRS(topic)}
                          disabled={isAdded}
                          className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-1.5 cursor-pointer ${
                            isAdded
                              ? 'bg-emerald-500 text-stone-950 cursor-default'
                              : 'bg-amber-500 hover:bg-amber-400 text-stone-950 shadow-xs'
                          }`}
                        >
                          {isAdded ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                          <span>{isAdded ? 'Added to SRS' : 'Add 5 Words to SRS'}</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
