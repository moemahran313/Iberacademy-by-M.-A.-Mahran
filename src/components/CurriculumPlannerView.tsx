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
  Check
} from 'lucide-react';
import { UserProgress, CEFRLevel, RoleplayEvaluationRecord } from '../types';
import { soundEffects } from '../utils/audio';

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
  const [activeMilestoneTab, setActiveMilestoneTab] = useState<string>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const evaluations: RoleplayEvaluationRecord[] = userProgress.roleplayEvaluations || [];
  const latestEval = evaluations[0];

  // Calculate weak areas based on evaluation history or defaults
  const avgVocabScore = evaluations.length > 0
    ? Math.round(evaluations.reduce((acc, e) => acc + (e.vocabularyUsageScore || 70), 0) / evaluations.length)
    : 68;
  const avgFluencyScore = evaluations.length > 0
    ? Math.round(evaluations.reduce((acc, e) => acc + (e.writingFluencyScore || 70), 0) / evaluations.length)
    : 72;
  const avgListeningScore = evaluations.length > 0
    ? Math.round(evaluations.reduce((acc, e) => acc + (e.listeningRelevanceScore || 70), 0) / evaluations.length)
    : 75;

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
    },
    {
      id: 'm5',
      number: 5,
      title_es: 'Hitos B2.5: Transición C1 - Fluidez Idiomática Nativa',
      title_en: 'B2.5 Milestone: C1 Transition - Native Speed Idiomatic Fluency',
      status: 'locked',
      completion: 0,
      description_es: 'Comprensión auditiva de velocidad nativa e integración natural de expresiones idiomáticas complejas.',
      competencies: ['Comprensión de modismos regionales', 'Audios con ruido de fondo', 'Fluidez espontánea'],
      targetVocabCount: 100
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
    },
    {
      id: 'topic_discourse',
      title_es: 'Conectores de Discurso para Argumentación B2',
      title_en: 'Discourse Markers & Formal Sentence Connectors',
      title_ar: 'أدوات الربط والتعبير المنطقي الفصيح',
      domain: 'social',
      icon: Users,
      urgency: 'medium',
      weaknessContext_es: 'Aumenta la elegancia de tus respuestas escritas y orales en debates públicos.',
      weaknessContext_en: 'Elevates sentence cohesion in B2 formal debates and argumentative tasks.',
      words: [
        { spanish: 'Por ende', english: 'Therefore / Hence', arabic: 'وبناءً عليه / لجميع هذه الأسباب', pos: 'adverb' },
        { spanish: 'En consecuencia', english: 'Consequently', arabic: 'ونتيجة لذلك', pos: 'adverb' },
        { spanish: 'Cabe destacar', english: 'It is worth noting', arabic: 'تجدر الإشارة إلى', pos: 'phrase' },
        { spanish: 'No obstante', english: 'Nevertheless', arabic: 'ومع ذلك / بَيْدَ أن', pos: 'conjunction' },
        { spanish: 'Coherencia', english: 'Coherence', arabic: 'ترابط منطقي', pos: 'noun' }
      ],
      targetScenarioDomain: 'social'
    },
    {
      id: 'topic_travel_dispute',
      title_es: 'Resolución de Quejas y Conflictos de Servicios',
      title_en: 'Dispute Resolution & Formal Service Complaints',
      title_ar: 'مصطلحات تقديم الشكاوى واسترداد الحقوق',
      domain: 'travel',
      icon: Plane,
      urgency: avgListeningScore < 80 ? 'medium' : 'low',
      weaknessContext_es: 'Vocabulario práctico para resolver inconvenientes de viaje, alquileres y reclamaciones de billetes.',
      weaknessContext_en: 'Essential B2 terms for resolving travel disputes, flight delays, and refund requests.',
      words: [
        { spanish: 'Reclamación', english: 'Formal complaint', arabic: 'شكوى رسمية', pos: 'noun' },
        { spanish: 'Reembolso', english: 'Refund', arabic: 'استرداد المبلغ', pos: 'noun' },
        { spanish: 'Indemnización', english: 'Compensation', arabic: 'تعويض مالى', pos: 'noun' },
        { spanish: 'Disconformidad', english: 'Dissatisfaction / Disagreement', arabic: 'عدم رضا / اعتراض', pos: 'noun' },
        { spanish: 'Resiliencia', english: 'Resilience', arabic: 'قدرة على التكيف والصمود', pos: 'noun' }
      ],
      targetScenarioDomain: 'travel'
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
    setToastMessage(`Added 5 B2 words from "${topic.title_es}" to your SRS practice queue (+15 XP)!`);
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

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-950 to-stone-900 text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden border border-stone-800 shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-xl bg-amber-500 text-stone-950 font-black text-xs uppercase tracking-wider">
                CEFR B2 Curriculum Roadmap
              </span>
              <span className="px-3 py-1 rounded-xl bg-stone-800 text-amber-400 border border-amber-500/30 font-bold text-xs">
                AI Weakness Personalized
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Curriculum Planner & Milestone Roadmap
            </h1>

            <p className="text-sm text-stone-300 leading-relaxed">
              Visualize your upcoming learning milestones and master targeted B2 vocabulary topics tailored directly to your recent role-play weaknesses in AI Tutor Chat.
            </p>
          </div>

          {/* Quick Stats Box */}
          <div className="bg-stone-800/80 border border-stone-700/80 rounded-2xl p-5 flex items-center gap-4 shrink-0 shadow-sm">
            <div className="p-3 rounded-2xl bg-amber-500 text-stone-950 font-black">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-stone-400">Target Readiness</p>
              <p className="text-2xl font-black text-amber-400">68% B2 Mastery</p>
              <p className="text-[11px] text-stone-300">Est. 18 Study Days to C1</p>
            </div>
          </div>
        </div>
      </div>

      {/* AI Role-Play Weakness Diagnostic Card */}
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
                Derived from recent AI Tutor Chat evaluations & B2 skill challenge responses.
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

        {/* Evaluation Metric Snapshot */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/80 rounded-2xl p-4 text-center space-y-1">
            <p className="text-xs font-bold text-stone-500 dark:text-stone-400">🎧 Listening Relevance</p>
            <p className="text-2xl font-black text-sky-500">{avgListeningScore}/100</p>
            <p className="text-[11px] text-stone-400">Good comprehension speed</p>
          </div>

          <div className="bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/80 rounded-2xl p-4 text-center space-y-1">
            <p className="text-xs font-bold text-stone-500 dark:text-stone-400">✍️ Writing Fluency</p>
            <p className="text-2xl font-black text-emerald-500">{avgFluencyScore}/100</p>
            <p className="text-[11px] text-stone-400">Subjunctive clauses recommended</p>
          </div>

          <div className="bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/80 rounded-2xl p-4 text-center space-y-1">
            <p className="text-xs font-bold text-stone-500 dark:text-stone-400">📚 B2 Vocabulary Usage</p>
            <p className={`text-2xl font-black ${avgVocabScore < 75 ? 'text-amber-500' : 'text-emerald-500'}`}>
              {avgVocabScore}/100
            </p>
            <p className="text-[11px] text-stone-400">Target B2 words needed</p>
          </div>
        </div>

        {/* Latest Evaluation Note */}
        {latestEval ? (
          <div className="bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
              <div>
                <span className="font-black text-amber-900 dark:text-amber-200">
                  Recent Scenario: "{latestEval.title}" ({latestEval.domain.toUpperCase()})
                </span>
                <p className="text-stone-600 dark:text-stone-300 mt-0.5 line-clamp-1">
                  Profesor Mateo: "{latestEval.feedback_es}"
                </p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-xl bg-amber-500 text-stone-950 font-black shrink-0">
              Score: {latestEval.overallScore}/100
            </span>
          </div>
        ) : (
          <div className="bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-700 rounded-2xl p-4 text-xs text-stone-500 dark:text-stone-400 flex items-center justify-between">
            <span>💡 Complete a B2 Role-Play Scenario in AI Tutor Chat to refresh your live weakness analysis!</span>
            <button
              onClick={() => setActiveTab('linglooper')}
              className="text-amber-600 dark:text-amber-400 font-bold hover:underline"
            >
              Start Role-Play →
            </button>
          </div>
        )}
      </div>

      {/* Suggested B2 Vocabulary Topics Based on Weaknesses */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-stone-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-500" />
              <span>Suggested B2 Vocabulary Topics</span>
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Personalized word bundles generated to directly eliminate identified weaknesses.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {suggestedTopics.map(topic => {
            const Icon = topic.icon;
            const isAdded = addedTopicIds[topic.id];

            return (
              <div
                key={topic.id}
                className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-amber-500/50 rounded-3xl p-6 space-y-5 shadow-xs transition flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-base font-black text-stone-900 dark:text-white">
                          {topic.title_es}
                        </h3>
                        <p className="text-xs font-medium text-stone-500 dark:text-stone-400">
                          {topic.title_en} • {topic.title_ar}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`px-2.5 py-1 rounded-xl text-[10px] font-black uppercase tracking-wider ${
                        topic.urgency === 'high'
                          ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'
                          : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                      }`}
                    >
                      {topic.urgency === 'high' ? 'High Priority' : 'Recommended'}
                    </span>
                  </div>

                  {/* Weakness Context */}
                  <p className="text-xs text-stone-600 dark:text-stone-300 bg-stone-50 dark:bg-stone-800/50 p-3 rounded-2xl border border-stone-200 dark:border-stone-700/80 italic">
                    🎯 {topic.weaknessContext_es}
                  </p>

                  {/* Vocabulary Word Pills */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-stone-400">
                      Target B2 Words Included:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {topic.words.map((w, idx) => (
                        <div
                          key={idx}
                          className="bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 px-3 py-2 rounded-xl text-xs flex items-center justify-between"
                        >
                          <div>
                            <span className="font-black text-stone-900 dark:text-white">{w.spanish}</span>
                            <p className="text-[10px] text-stone-500 dark:text-stone-400">
                              {w.english} • {w.arabic}
                            </p>
                          </div>
                          <span className="text-[10px] uppercase font-bold text-amber-600 dark:text-amber-400">
                            {w.pos}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex flex-wrap items-center justify-between gap-2">
                  <button
                    onClick={() => handleAddTopicToSRS(topic)}
                    disabled={isAdded}
                    className={`px-4 py-2.5 rounded-xl font-black text-xs transition flex items-center gap-1.5 cursor-pointer ${
                      isAdded
                        ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border border-emerald-500/40'
                        : 'bg-amber-500 hover:bg-amber-400 text-stone-950 shadow-xs'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Added to SRS Queue</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add 5 Words to SRS Flashcards</span>
                      </>
                    )}
                  </button>

                  {topic.targetScenarioDomain ? (
                    <button
                      onClick={() => setActiveTab('linglooper')}
                      className="px-3.5 py-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                    >
                      <span>Practice Role-Play</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      onClick={() => setActiveTab('grammar')}
                      className="px-3.5 py-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                    >
                      <span>Grammar Rules</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Visual B2 Learning Milestones Timeline */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-stone-200 dark:border-stone-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500 text-stone-950 font-black">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-stone-900 dark:text-white">
                B2 CEFR Learning Milestones
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Track structured competency progressions from initial B2 mastery to C1 fluency transition.
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            {['all', 'current', 'upcoming'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveMilestoneTab(tab)}
                className={`px-3 py-1.5 rounded-xl text-xs font-black capitalize transition cursor-pointer ${
                  activeMilestoneTab === tab
                    ? 'bg-amber-500 text-stone-950 shadow-xs'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline Stack */}
        <div className="space-y-4">
          {milestones
            .filter(m => activeMilestoneTab === 'all' || m.status === activeMilestoneTab)
            .map(m => {
              const isCompleted = m.status === 'completed';
              const isCurrent = m.status === 'current';

              return (
                <div
                  key={m.id}
                  className={`p-5 sm:p-6 rounded-2xl border transition space-y-4 ${
                    isCurrent
                      ? 'bg-amber-500/10 border-amber-500 shadow-sm'
                      : isCompleted
                      ? 'bg-emerald-500/5 border-emerald-500/30'
                      : 'bg-stone-50 dark:bg-stone-800/40 border-stone-200 dark:border-stone-700/80'
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm shrink-0 ${
                          isCompleted
                            ? 'bg-emerald-500 text-white'
                            : isCurrent
                            ? 'bg-amber-500 text-stone-950'
                            : 'bg-stone-200 dark:bg-stone-700 text-stone-600 dark:text-stone-300'
                        }`}
                      >
                        {isCompleted ? <Check className="w-5 h-5" /> : m.number}
                      </div>

                      <div>
                        <h3 className="text-base font-black text-stone-900 dark:text-white">
                          {m.title_es}
                        </h3>
                        <p className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                          {m.title_en}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`px-3 py-1 rounded-xl text-xs font-black capitalize ${
                          isCompleted
                            ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-300'
                            : isCurrent
                            ? 'bg-amber-500 text-stone-950'
                            : 'bg-stone-200 dark:bg-stone-700 text-stone-600 dark:text-stone-300'
                        }`}
                      >
                        {isCompleted ? 'Completed ✓' : isCurrent ? 'Active Milestone' : 'Upcoming'}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs leading-relaxed text-stone-700 dark:text-stone-300">
                    {m.description_es}
                  </p>

                  {/* Competencies checklist */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-extrabold text-stone-400 uppercase tracking-wider">
                      Core Competencies Required:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {m.competencies.map((comp, idx) => (
                        <div
                          key={idx}
                          className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-2.5 rounded-xl text-xs text-stone-800 dark:text-stone-200 flex items-center gap-2 font-medium"
                        >
                          <CheckCircle2
                            className={`w-3.5 h-3.5 shrink-0 ${
                              isCompleted ? 'text-emerald-500' : 'text-amber-500'
                            }`}
                          />
                          <span>{comp}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex justify-between text-[11px] font-bold">
                      <span className="text-stone-500">Milestone Progress</span>
                      <span className="text-amber-600 dark:text-amber-400">{m.completion}%</span>
                    </div>
                    <div className="w-full h-2 bg-stone-200 dark:bg-stone-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isCompleted ? 'bg-emerald-500' : 'bg-amber-500'
                        }`}
                        style={{ width: `${m.completion}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
