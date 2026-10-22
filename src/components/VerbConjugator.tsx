import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Volume2,
  Sparkles,
  BookOpen,
  CheckCircle2,
  HelpCircle,
  Layers,
  Flame,
  Zap,
  RotateCcw,
  Sliders,
  Check,
  X,
  Shuffle,
  ChevronRight,
  TrendingUp,
  Award,
  ArrowRight,
  CheckCircle,
  Compass,
  MessageSquare
} from 'lucide-react';
import { Verb, VerbConjugationTable } from '../types';
import { SPANISH_VERBS } from '../data';
import { speakSpanish, soundEffects } from '../utils/audio';
import { useApp } from '../context/AppContext';
import { TenseRoadmapModal } from './curriculum/TenseRoadmapModal';
import {
  getContextualVerbSentence,
  SITUATIONAL_FILL_IN_DRILLS,
  TENSE_CONTRAST_DRILLS,
  SituationalFillInDrill,
  TenseContrastDrill
} from '../data/verbContextualSentences';

type PracticeMode = 'situational_fill' | 'tense_contrast';

export const VerbConjugator: React.FC = () => {
  const { userProgress, setUserProgress, setIsPlacementTestOpen } = useApp();
  const [isRoadmapModalOpen, setIsRoadmapModalOpen] = useState(false);

  // Navigation & Search
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVerbId, setSelectedVerbId] = useState<string>(SPANISH_VERBS[0]?.id || 'v-ser');
  const [activeTense, setActiveTense] = useState<keyof VerbConjugationTable>('present');
  const [filterCEFR, setFilterCEFR] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');

  // Gamification & Communicative Practice State
  const [practiceMode, setPracticeMode] = useState<PracticeMode>('situational_fill');
  const [isPracticing, setIsPracticing] = useState(false);
  const [practiceStreak, setPracticeStreak] = useState(0);
  const [totalAttempted, setTotalAttempted] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);

  // Situational Fill-in Mode state
  const [situationalIdx, setSituationalIdx] = useState(0);
  const [selectedFillOption, setSelectedFillOption] = useState<string | null>(null);
  const [fillFeedbackChecked, setFillFeedbackChecked] = useState(false);

  // Tense Contrast Mode state
  const [contrastIdx, setContrastIdx] = useState(0);
  const [selectedContrastOption, setSelectedContrastOption] = useState<number | null>(null);
  const [contrastFeedbackChecked, setContrastFeedbackChecked] = useState(false);

  // Audio animation toast
  const [playingSentenceId, setPlayingSentenceId] = useState<string | null>(null);

  // Find active verb
  const selectedVerb = useMemo(() => {
    return SPANISH_VERBS.find(v => v.id === selectedVerbId) || SPANISH_VERBS[0];
  }, [selectedVerbId]);

  // Filters for verbs list (searchable by infinitive, english, or arabic)
  const filteredVerbs = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return SPANISH_VERBS.filter(v => {
      const matchesSearch =
        term === '' ||
        v.infinitive.toLowerCase().includes(term) ||
        v.english.toLowerCase().includes(term) ||
        v.arabic.includes(searchTerm.trim());

      const matchesCEFR = filterCEFR === 'all' || v.cefr === filterCEFR;

      const matchesType =
        filterType === 'all' ||
        (filterType === 'regular' && v.regularType.startsWith('regular')) ||
        (filterType === 'irregular' && v.regularType === 'irregular') ||
        (filterType === 'stem-changing' && v.regularType === 'stem-changing');

      return matchesSearch && matchesCEFR && matchesType;
    });
  }, [searchTerm, filterCEFR, filterType]);

  // If selected verb is filtered out, pick the first available one
  useEffect(() => {
    if (filteredVerbs.length > 0 && !filteredVerbs.some(v => v.id === selectedVerbId)) {
      setSelectedVerbId(filteredVerbs[0].id);
    }
  }, [filteredVerbs, selectedVerbId]);

  // Communicative configuration of tenses
  const tensesConfig = useMemo(() => [
    { id: 'present' as keyof VerbConjugationTable, name_es: 'Presente', name_en: 'Present (Daily Routine & Facts)', name_ar: 'المضارع البسيط (العادات والحقائق)', level: 'A1' },
    { id: 'preterite' as keyof VerbConjugationTable, name_es: 'Pretérito Indefinido', name_en: 'Preterite (Completed Past Events)', name_ar: 'الماضي البسيط (الأحداث المكتملة)', level: 'A2' },
    { id: 'imperfect' as keyof VerbConjugationTable, name_es: 'Pretérito Imperfecto', name_en: 'Imperfect (Past Scenery & Age)', name_ar: 'الماضي المستمر (الوصف والذكريات والعمر)', level: 'A2' },
    { id: 'future' as keyof VerbConjugationTable, name_es: 'Futuro Simple', name_en: 'Simple Future (Plans & Predictions)', name_ar: 'المستقبل البسيط (الخطط والتوقعات)', level: 'A2' },
    { id: 'conditional' as keyof VerbConjugationTable, name_es: 'Condicional Simple', name_en: 'Conditional (Polite Requests & Wishes)', name_ar: 'صيغة الشرط (التأدب والرغبات)', level: 'B1' },
    { id: 'presentSubjunctive' as keyof VerbConjugationTable, name_es: 'Presente de Subjuntivo', name_en: 'Present Subjunctive (Wishes & Doubts)', name_ar: 'منصوب الحاضر (الأمنيات والشك)', level: 'B1' },
    { id: 'imperfectSubjunctive' as keyof VerbConjugationTable, name_es: 'Imperfecto de Subjuntivo', name_en: 'Imperfect Subjunctive (Hypotheses)', name_ar: 'منصوب الماضي (الافتراضات الخيالية)', level: 'B2' },
    { id: 'imperativeAffirmative' as keyof VerbConjugationTable, name_es: 'Imperativo Afirmativo', name_en: 'Imperative (Direct Commands & Advice)', name_ar: 'صيغة الأمر (التوجيهات والنصائح)', level: 'A2' }
  ], []);

  const conjugationSet = useMemo(() => {
    return (selectedVerb.conjugations[activeTense] || {}) as Record<string, string>;
  }, [selectedVerb, activeTense]);

  const subjects = useMemo(() => [
    { key: 'yo', label_es: 'Yo', label_en: 'I', label_ar: 'أنا' },
    { key: 'tu', label_es: 'Tú', label_en: 'You (informal)', label_ar: 'أنتَ / أنتِ' },
    { key: 'el_ella_usted', label_es: 'Él / Ella / Usted', label_en: 'He / She / You (formal)', label_ar: 'هو / هي / حضرتكم' },
    { key: 'nosotros', label_es: 'Nosotros / -as', label_en: 'We', label_ar: 'نحن' },
    { key: 'vosotros', label_es: 'Vosotros / -as', label_en: 'You all (Spain)', label_ar: 'أنتم (إسبانيا)' },
    { key: 'ellos_ellas_ustedes', label_es: 'Ellos / Ellas / Ustedes', label_en: 'They / You all', label_ar: 'هم / هن / أنتم' }
  ], []);

  // Split Spanish forms into Stem & Suffix dynamically for communicative visual parsing
  const parseStemAndSuffix = (infinitive: string, conjugation: string) => {
    if (!conjugation || conjugation === '—') return { stem: conjugation, suffix: '' };

    const clean = conjugation.trim();
    const arSuffixes = [
      'áramos', 'aremos', 'aríais', 'aríamos', 'asteis', 'ábamos', 'abais',
      'arás', 'arán', 'aría', 'arías', 'arían', 'aron', 'aste', 'aban', 'abas', 'amos', 'áis',
      'ará', 'aba', 'aron', 'ara', 'aras', 'aran', 'emos', 'éis', 'an', 'as', 'es', 'en', 'é', 'ó', 'o', 'a', 'e'
    ];
    const erirSuffixes = [
      'iéramos', 'ierais', 'eríamos', 'iríamos', 'eríais', 'iríais', 'eremos', 'iremos', 'isteis', 'íamos', 'íais',
      'ieron', 'erás', 'erán', 'irás', 'irán', 'ería', 'erías', 'erían', 'iría', 'irías', 'irían',
      'iera', 'ieras', 'ieran', 'iste', 'imos', 'emos', 'imos', 'ieron', 'iendo', 'ieron',
      'erá', 'irá', 'ían', 'ías', 'ías', 'ida', 'ido', 'ió', 'ía', 'en', 'es', 'er', 'ir', 'ís', 'éis', 'ió', 'í', 'e', 'a', 'o'
    ];

    const allSuffixes = [...arSuffixes, ...erirSuffixes].sort((a, b) => b.length - a.length);

    for (const suffix of allSuffixes) {
      if (clean.toLowerCase().endsWith(suffix.toLowerCase()) && clean.length > suffix.length) {
        const stem = clean.substring(0, clean.length - suffix.length);
        const actualSuffix = clean.substring(clean.length - suffix.length);
        return { stem, suffix: actualSuffix };
      }
    }

    if (clean.length > 2) {
      return {
        stem: clean.substring(0, clean.length - 2),
        suffix: clean.substring(clean.length - 2)
      };
    }
    return { stem: clean, suffix: '' };
  };

  // Helper: Highlight conjugated verb ending in context with color coding (stems in neutral, endings in bold terracotta)
  const renderHighlightedSentence = (sentence: string, verbForm: string, infinitive: string) => {
    if (!verbForm || verbForm === '—') {
      return <span>{sentence}</span>;
    }

    // Clean any multi-word forms like "ha / hay" or "vamos / vayamos"
    const targetWord = verbForm.split('/')[0].trim();
    if (!targetWord) return <span>{sentence}</span>;

    const regex = new RegExp(`(\\b${targetWord}\\b)`, 'i');
    const parts = sentence.split(regex);

    if (parts.length <= 1) {
      return <span>{sentence}</span>;
    }

    const { stem, suffix } = parseStemAndSuffix(infinitive, targetWord);

    return (
      <span className="leading-relaxed">
        {parts.map((part, pIdx) => {
          if (part.toLowerCase() === targetWord.toLowerCase()) {
            return (
              <span
                key={pIdx}
                className="inline-flex items-baseline px-1.5 py-0.5 mx-0.5 rounded-lg bg-amber-500/15 dark:bg-amber-500/20 border border-amber-500/30 font-medium"
              >
                {/* Stem in neutral bold */}
                <span className="text-stone-900 dark:text-stone-100 font-extrabold tracking-tight">
                  {stem}
                </span>
                {/* Ending in bold terracotta */}
                <span className="text-[#C85A32] dark:text-[#E07A5F] font-black underline decoration-2 decoration-[#C85A32]/60 ml-0.5">
                  {suffix}
                </span>
              </span>
            );
          }
          return <span key={pIdx}>{part}</span>;
        })}
      </span>
    );
  };

  // Audio trigger with visual feedback
  const handlePlaySentenceAudio = (text: string, id: string) => {
    setPlayingSentenceId(id);
    speakSpanish(text);
    setTimeout(() => {
      setPlayingSentenceId(null);
    }, 2500);
  };

  // Mode A: Situational Fill-in Handler
  const currentFillDrill = SITUATIONAL_FILL_IN_DRILLS[situationalIdx % SITUATIONAL_FILL_IN_DRILLS.length];

  const handleSelectFillOption = (option: string) => {
    if (fillFeedbackChecked) return;
    setSelectedFillOption(option);
    setFillFeedbackChecked(true);
    setTotalAttempted(prev => prev + 1);

    const isCorrect = option.toLowerCase() === currentFillDrill.correctAnswer.toLowerCase();
    if (isCorrect) {
      soundEffects.playCorrect();
      setPracticeStreak(prev => prev + 1);
      setTotalCorrect(prev => prev + 1);
    } else {
      soundEffects.playIncorrect();
      setPracticeStreak(0);
    }

    // Instant audio feedback with full sentence pronunciation
    speakSpanish(currentFillDrill.fullSentence);
  };

  const handleNextFillDrill = () => {
    soundEffects.playPop();
    setSelectedFillOption(null);
    setFillFeedbackChecked(false);
    setSituationalIdx(prev => (prev + 1) % SITUATIONAL_FILL_IN_DRILLS.length);
  };

  // Mode B: Tense Contrast Handler
  const currentContrastDrill = TENSE_CONTRAST_DRILLS[contrastIdx % TENSE_CONTRAST_DRILLS.length];

  const handleSelectContrastOption = (optionIdx: number) => {
    if (contrastFeedbackChecked) return;
    setSelectedContrastOption(optionIdx);
    setContrastFeedbackChecked(true);
    setTotalAttempted(prev => prev + 1);

    const isCorrect = currentContrastDrill.challenge.options[optionIdx].isCorrect;
    if (isCorrect) {
      soundEffects.playCorrect();
      setPracticeStreak(prev => prev + 1);
      setTotalCorrect(prev => prev + 1);
    } else {
      soundEffects.playIncorrect();
      setPracticeStreak(0);
    }
  };

  const handleNextContrastDrill = () => {
    soundEffects.playPop();
    setSelectedContrastOption(null);
    setContrastFeedbackChecked(false);
    setContrastIdx(prev => (prev + 1) % TENSE_CONTRAST_DRILLS.length);
  };

  return (
    <div className="space-y-6 pb-24 md:pb-12 max-w-7xl mx-auto">
      {/* 🏛️ Editorial Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden bg-white dark:bg-[#181615] border border-stone-200/90 dark:border-stone-800 rounded-3xl p-6 sm:p-8 shadow-xs text-stone-900 dark:text-stone-100"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider bg-[#C85A32]/10 text-[#C85A32] dark:text-[#E07A5F] border border-[#C85A32]/25">
                Estudio de Gramática Contextual
              </span>
              <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-stone-100 dark:bg-stone-850 text-stone-600 dark:text-stone-300">
                Uso Comunicativo e Inductivo
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black font-serif tracking-tight text-stone-900 dark:text-stone-100">
              Conjugador Contextual y Laboratorio Comunicativo
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 max-w-2xl leading-relaxed">
              Descubre las formas verbales a través de frases reales ilustrativas, con raíces en tono neutro y desinencias en terracota. Domina contrastes temporales en situaciones cotidianas.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => {
                soundEffects.playPop();
                setIsRoadmapModalOpen(true);
              }}
              className="px-4 py-3 rounded-2xl text-xs font-bold flex items-center gap-2 transition cursor-pointer border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-850 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 shadow-2xs"
              title="Explorar el Mapa del Orden Natural ELE (Krashen SLA)"
            >
              <Compass className="w-4 h-4 text-[#C85A32]" />
              <span>Orden Natural ELE</span>
            </button>

            <button
              type="button"
              onClick={() => {
                soundEffects.playFlip();
                setIsPracticing(!isPracticing);
              }}
              className={`px-5 py-3 rounded-2xl text-xs font-bold flex items-center gap-2 transition cursor-pointer shadow-xs ${
                isPracticing
                  ? 'bg-stone-900 hover:bg-stone-800 text-white dark:bg-stone-100 dark:text-stone-900'
                  : 'bg-[#C85A32] hover:bg-[#B44C27] text-white'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>{isPracticing ? 'Ver Frases Ilustrativas' : 'Entrenar con Ejercicios'}</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* 📊 Gamified stats bar during active practice */}
      {isPracticing && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-[#181615] border border-stone-200/90 dark:border-stone-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-2xs"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#C85A32]/10 text-[#C85A32] dark:text-[#E07A5F] rounded-xl">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase text-stone-400 tracking-wider">Modo de Práctica Activa</span>
              <h3 className="text-sm font-bold text-stone-900 dark:text-white">
                {practiceMode === 'situational_fill' ? 'Completar en Situación Real' : 'Contraste de Tiempos Verbales'}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-amber-500" />
              <div>
                <span className="text-[10px] font-bold uppercase text-stone-400 block tracking-wider">Racha</span>
                <span className="text-xs font-extrabold text-stone-900 dark:text-stone-200">{practiceStreak} Aciertos</span>
              </div>
            </div>

            <div className="flex items-center gap-2 border-l border-stone-200 dark:border-stone-800 pl-6">
              <Award className="w-5 h-5 text-emerald-500" />
              <div>
                <span className="text-[10px] font-bold uppercase text-stone-400 block tracking-wider">Precisión</span>
                <span className="text-xs font-extrabold text-stone-900 dark:text-stone-200">
                  {totalAttempted > 0 ? `${Math.round((totalCorrect / totalAttempted) * 100)}%` : '0%'}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                soundEffects.playFlip();
                setPracticeStreak(0);
                setTotalAttempted(0);
                setTotalCorrect(0);
                setSelectedFillOption(null);
                setFillFeedbackChecked(false);
                setSelectedContrastOption(null);
                setContrastFeedbackChecked(false);
              }}
              className="p-2 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-400 transition cursor-pointer"
              title="Reiniciar estadísticas"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Sidebar: Verbs Selector & Multi-Language Search */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white dark:bg-[#181615] border border-stone-200/90 dark:border-stone-800 rounded-3xl p-4 sm:p-5 shadow-2xs space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-[#C85A32]" />
              <span>Búsqueda de Verbos</span>
            </h3>

            {/* Multi-language search: infinitive, english, or arabic */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                placeholder="Buscar (ej. tener, to have, يملك)..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl text-xs sm:text-sm text-stone-800 dark:text-stone-100 placeholder-stone-400 focus:outline-hidden focus:border-[#C85A32] shadow-2xs"
              />
            </div>

            {/* CEFR & Verb Type Filters */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <label className="text-[10px] font-bold uppercase text-stone-400 tracking-wider block mb-1">Nivel MCER</label>
                <select
                  value={filterCEFR}
                  onChange={e => { soundEffects.playPop(); setFilterCEFR(e.target.value); }}
                  className="w-full p-2 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg text-stone-800 dark:text-stone-200 font-bold focus:outline-hidden"
                >
                  <option value="all">Todos los niveles</option>
                  <option value="A1">A1 Inicial</option>
                  <option value="A2">A2 Elemental</option>
                  <option value="B1">B1 Intermedio</option>
                  <option value="B2">B2 Avanzado</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase text-stone-400 tracking-wider block mb-1">Tipo de Verbo</label>
                <select
                  value={filterType}
                  onChange={e => { soundEffects.playPop(); setFilterType(e.target.value); }}
                  className="w-full p-2 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg text-stone-800 dark:text-stone-200 font-bold focus:outline-hidden"
                >
                  <option value="all">Todas las clases</option>
                  <option value="irregular">Irregulares</option>
                  <option value="stem-changing">Cambio de raíz</option>
                  <option value="regular">Regulares</option>
                </select>
              </div>
            </div>

            {/* Scrollable Verb List */}
            <div className="space-y-1.5 max-h-[480px] overflow-y-auto pr-1">
              {filteredVerbs.length === 0 ? (
                <div className="p-6 text-center text-xs text-stone-400 space-y-1">
                  <p>No se encontraron verbos con ese criterio.</p>
                  <button
                    type="button"
                    onClick={() => { setSearchTerm(''); setFilterCEFR('all'); setFilterType('all'); }}
                    className="text-[#C85A32] font-bold underline cursor-pointer"
                  >
                    Restablecer filtros
                  </button>
                </div>
              ) : (
                filteredVerbs.map(v => {
                  const isSelected = v.id === selectedVerbId;
                  return (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => {
                        soundEffects.playPop();
                        setSelectedVerbId(v.id);
                      }}
                      className={`w-full text-left p-3 rounded-xl transition cursor-pointer flex items-center justify-between border ${
                        isSelected
                          ? 'bg-[#C85A32]/10 dark:bg-[#C85A32]/15 border-[#C85A32] text-stone-900 dark:text-white shadow-2xs'
                          : 'bg-stone-50/60 dark:bg-stone-900/40 border-stone-200/80 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700 text-stone-700 dark:text-stone-300'
                      }`}
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm tracking-tight text-stone-900 dark:text-stone-100 font-serif">
                            {v.infinitive}
                          </span>
                          <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${
                            v.regularType === 'irregular'
                              ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                              : v.regularType === 'stem-changing'
                              ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                              : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                          }`}>
                            {v.regularType === 'irregular' ? 'Irregular' : v.regularType === 'stem-changing' ? 'Diéresis' : 'Regular'}
                          </span>
                        </div>
                        <p className="text-[11px] text-stone-500 dark:text-stone-400 truncate mt-0.5">
                          {v.english}
                        </p>
                      </div>

                      <span className="text-[11px] font-bold text-stone-400 font-arabic shrink-0 ml-2" dir="rtl">
                        {v.arabic}
                      </span>
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Right Main Column: Contextual Illustrative Sentences or Drills */}
        <div className="lg:col-span-8 space-y-6">
          {/* Active Verb Summary Bar */}
          <div className="bg-white dark:bg-[#181615] border border-stone-200/90 dark:border-stone-800 rounded-3xl p-5 shadow-2xs space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-100 dark:border-stone-800 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-black font-serif text-stone-900 dark:text-stone-100">
                    {selectedVerb.infinitive}
                  </h2>
                  <button
                    type="button"
                    onClick={() => speakSpanish(selectedVerb.infinitive)}
                    className="p-1.5 rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-[#C85A32]/10 text-stone-500 hover:text-[#C85A32] transition cursor-pointer"
                    title={`Pronunciar ${selectedVerb.infinitive}`}
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                  <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-[#C85A32]/10 text-[#C85A32] dark:text-[#E07A5F]">
                    {selectedVerb.cefr}
                  </span>
                </div>
                <p className="text-xs text-stone-600 dark:text-stone-400 mt-0.5">
                  {selectedVerb.english} • <span className="font-arabic" dir="rtl">{selectedVerb.arabic}</span>
                </p>
              </div>

              {/* Participles and Gerunds */}
              <div className="flex items-center gap-2 text-xs">
                <div className="px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-stone-850 text-stone-700 dark:text-stone-300">
                  <span className="text-stone-400 text-[10px] uppercase font-bold mr-1">Gerundio:</span>
                  <span className="font-bold">{selectedVerb.gerund}</span>
                </div>
                <div className="px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-stone-850 text-stone-700 dark:text-stone-300">
                  <span className="text-stone-400 text-[10px] uppercase font-bold mr-1">Participio:</span>
                  <span className="font-bold">{selectedVerb.participle}</span>
                </div>
              </div>
            </div>

            {/* Tense Selector Pills */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                Selecciona el Tiempo Verbal:
              </span>
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {tensesConfig.map(tense => (
                  <button
                    key={tense.id}
                    type="button"
                    onClick={() => {
                      soundEffects.playPop();
                      setActiveTense(tense.id);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shrink-0 cursor-pointer ${
                      activeTense === tense.id
                        ? 'bg-[#C85A32] text-white shadow-2xs'
                        : 'bg-stone-100 dark:bg-stone-850 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-800'
                    }`}
                  >
                    <span>{tense.name_es}</span>
                    <span className="text-[10px] opacity-75 ml-1">({tense.level})</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {!isPracticing ? (
              /* ======================================================== */
              /* 1. CONTEXTUAL VERB CONJUGATOR REDESIGN: REAL SENTENCES   */
              /* ======================================================== */
              <motion.div
                key="contextual-sentences-view"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="bg-white dark:bg-[#181615] border border-stone-200/90 dark:border-stone-800 rounded-3xl p-5 sm:p-6 shadow-2xs space-y-4"
              >
                <div className="flex justify-between items-center flex-wrap gap-2 border-b border-stone-100 dark:border-stone-800 pb-3">
                  <div>
                    <h3 className="text-base font-bold font-serif text-stone-900 dark:text-stone-100">
                      {tensesConfig.find(t => t.id === activeTense)?.name_es} • Frases Ilustrativas en Contexto
                    </h3>
                    <p className="text-xs text-stone-500 dark:text-stone-400">
                      {tensesConfig.find(t => t.id === activeTense)?.name_en}
                    </p>
                  </div>

                  <span className="text-xs font-bold text-[#C85A32] dark:text-[#E07A5F] font-arabic" dir="rtl">
                    {tensesConfig.find(t => t.id === activeTense)?.name_ar}
                  </span>
                </div>

                {/* Color Legend Note */}
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200/60 dark:border-stone-800 text-xs text-stone-600 dark:text-stone-300">
                  <span className="font-bold">Guía de Color:</span>
                  <span className="inline-flex items-center gap-1 font-semibold">
                    <span className="text-stone-900 dark:text-stone-100 font-extrabold">Raíz en tono neutro</span>
                    <span>+</span>
                    <span className="text-[#C85A32] dark:text-[#E07A5F] font-black underline decoration-[#C85A32]">Desinencia en terracota</span>
                  </span>
                  <span className="text-stone-400 text-[11px] ml-auto hidden sm:inline">
                    Haz clic en cualquier frase para escuchar su pronunciación nativa
                  </span>
                </div>

                {/* Contextual Illustrative Sentences List (Replacing decontextualized 6-box tables) */}
                <div className="space-y-3">
                  {subjects.map(sub => {
                    const form = conjugationSet[sub.key] || '—';
                    if (form === '—') return null;

                    const sentenceData = getContextualVerbSentence(
                      selectedVerb.infinitive,
                      selectedVerb.id,
                      activeTense as string,
                      sub.key,
                      form,
                      selectedVerb.english
                    );

                    const isPlaying = playingSentenceId === `${sub.key}-${activeTense}`;

                    return (
                      <div
                        key={sub.key}
                        onClick={() => handlePlaySentenceAudio(sentenceData.es, `${sub.key}-${activeTense}`)}
                        className={`p-4 rounded-2xl border transition group cursor-pointer space-y-2 ${
                          isPlaying
                            ? 'bg-amber-500/10 dark:bg-amber-400/10 border-[#C85A32] shadow-2xs'
                            : 'bg-stone-50/70 dark:bg-stone-900/50 hover:bg-stone-100/70 dark:hover:bg-stone-900 border-stone-200/80 dark:border-stone-800 hover:border-amber-500/40'
                        }`}
                      >
                        {/* Subject pronoun header and quick audio button */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="px-2.5 py-0.5 rounded-lg text-xs font-bold bg-white dark:bg-stone-850 text-stone-800 dark:text-stone-200 border border-stone-200/80 dark:border-stone-800 shadow-2xs">
                              {sub.label_es}
                            </span>
                            <span className="text-xs text-stone-400">({sub.label_en})</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-stone-800 dark:text-stone-200">
                              {form}
                            </span>
                            <button
                              type="button"
                              onClick={e => {
                                e.stopPropagation();
                                handlePlaySentenceAudio(sentenceData.es, `${sub.key}-${activeTense}`);
                              }}
                              className="p-1.5 rounded-lg bg-white dark:bg-stone-850 text-stone-400 group-hover:text-[#C85A32] transition cursor-pointer shadow-2xs"
                              title="Escuchar frase completa"
                            >
                              <Volume2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Real-World Contextual Sentence with Color-Coded Stem & Ending */}
                        <div className="text-base sm:text-lg font-serif text-stone-900 dark:text-stone-100 font-normal">
                          {renderHighlightedSentence(sentenceData.es, form, selectedVerb.infinitive)}
                        </div>

                        {/* Bilingual translations */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pt-1 border-t border-stone-200/40 dark:border-stone-800/60 text-xs text-stone-500 dark:text-stone-400">
                          <span>🇬🇧 {sentenceData.en}</span>
                          <span className="font-arabic text-stone-600 dark:text-stone-300 text-right" dir="rtl">
                            🇦🇪 {sentenceData.ar}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ) : (
              /* ======================================================== */
              /* 2. COMMUNICATIVE VERB DRILLS: SITUATIONAL & CONTRAST     */
              /* ======================================================== */
              <motion.div
                key="communicative-drills-view"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="bg-white dark:bg-[#181615] border border-stone-200/90 dark:border-stone-800 rounded-3xl p-5 sm:p-6 shadow-2xs space-y-6"
              >
                {/* Mode Selector Tabs (Situational Fill-in vs Tense Contrast) */}
                <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3 flex-wrap gap-2">
                  <div className="flex bg-stone-100 dark:bg-stone-900 p-1 rounded-xl">
                    <button
                      type="button"
                      onClick={() => {
                        soundEffects.playFlip();
                        setPracticeMode('situational_fill');
                        setSelectedFillOption(null);
                        setFillFeedbackChecked(false);
                      }}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                        practiceMode === 'situational_fill'
                          ? 'bg-[#C85A32] text-white shadow-2xs'
                          : 'text-stone-600 dark:text-stone-400'
                      }`}
                    >
                      Modo A: Situational Fill-in
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        soundEffects.playFlip();
                        setPracticeMode('tense_contrast');
                        setSelectedContrastOption(null);
                        setContrastFeedbackChecked(false);
                      }}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                        practiceMode === 'tense_contrast'
                          ? 'bg-[#C85A32] text-white shadow-2xs'
                          : 'text-stone-600 dark:text-stone-400'
                      }`}
                    >
                      Modo B: Tense Contrast
                    </button>
                  </div>

                  <span className="text-xs font-bold text-stone-500">
                    {practiceMode === 'situational_fill'
                      ? 'Frases reales con audio inmediato'
                      : 'Comparación paralela de tiempos sutiles'}
                  </span>
                </div>

                {/* ----------------- MODE A: SITUATIONAL FILL-IN ----------------- */}
                {practiceMode === 'situational_fill' && (
                  <div className="space-y-6">
                    {/* Communicative Scenario Prompt */}
                    <div className="p-4 rounded-2xl bg-amber-500/10 dark:bg-amber-400/5 border border-amber-500/25 space-y-2">
                      <div className="flex items-center gap-2 text-xs font-bold text-[#B47832] dark:text-amber-400">
                        <MessageSquare className="w-4 h-4" />
                        <span>Situación Comunicativa Real:</span>
                      </div>
                      <p className="text-sm font-semibold text-stone-800 dark:text-stone-200">
                        {currentFillDrill.situation}
                      </p>
                      <p className="text-xs text-stone-600 dark:text-stone-400 font-arabic text-right" dir="rtl">
                        {currentFillDrill.situation_ar}
                      </p>
                    </div>

                    {/* Sentence Snippet with Blank */}
                    <div className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-250 dark:border-stone-800 space-y-3">
                      <div className="flex items-center justify-between text-xs text-stone-400">
                        <span>Verbo: <strong className="text-stone-800 dark:text-stone-200">{currentFillDrill.verbInfinitive}</strong></span>
                        <span className="font-bold text-[#C85A32]">{currentFillDrill.tenseLabel}</span>
                      </div>

                      <h4 className="text-lg sm:text-xl font-serif text-stone-900 dark:text-white leading-relaxed font-semibold">
                        {currentFillDrill.sentenceWithBlank}
                      </h4>

                      <div className="flex flex-col sm:flex-row justify-between text-xs text-stone-500 dark:text-stone-400 gap-1 pt-1 border-t border-stone-200/50 dark:border-stone-800">
                        <span>🇬🇧 {currentFillDrill.translation_en}</span>
                        <span className="font-arabic" dir="rtl">🇦🇪 {currentFillDrill.translation_ar}</span>
                      </div>
                    </div>

                    {/* 4 Interactive Option Buttons */}
                    <div className="space-y-2">
                      <span className="text-xs font-bold text-stone-500 block">
                        Selecciona la forma conjugada correcta:
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        {currentFillDrill.options.map((opt, optIdx) => {
                          const isSelected = selectedFillOption === opt;
                          const isRight = opt.toLowerCase() === currentFillDrill.correctAnswer.toLowerCase();

                          return (
                            <button
                              key={optIdx}
                              type="button"
                              onClick={() => handleSelectFillOption(opt)}
                              disabled={fillFeedbackChecked}
                              className={`p-3.5 rounded-xl font-bold text-sm transition cursor-pointer border ${
                                fillFeedbackChecked
                                  ? isRight
                                    ? 'bg-emerald-500 text-white border-emerald-600 font-black'
                                    : isSelected
                                    ? 'bg-rose-500/15 text-rose-600 border-rose-400'
                                    : 'bg-stone-100 dark:bg-stone-900 text-stone-400 border-stone-200 dark:border-stone-800 opacity-50'
                                  : isSelected
                                  ? 'bg-[#C85A32] text-white border-[#C85A32]'
                                  : 'bg-stone-50 dark:bg-stone-900 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 border-stone-200 dark:border-stone-800'
                              }`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Formative Recast & Instant Audio Feedback */}
                    {fillFeedbackChecked && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 rounded-2xl bg-emerald-500/10 dark:bg-emerald-400/5 border border-emerald-500/30 space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Frase Completa con Pronunciación Nativa:</span>
                          </div>

                          <button
                            type="button"
                            onClick={() => speakSpanish(currentFillDrill.fullSentence)}
                            className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-2xs"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                            <span>Repetir Audio</span>
                          </button>
                        </div>

                        <p className="text-base font-serif font-bold text-stone-900 dark:text-white">
                          "{currentFillDrill.fullSentence}"
                        </p>

                        <div className="space-y-1 text-xs text-stone-700 dark:text-stone-300 leading-relaxed border-t border-emerald-500/20 pt-2">
                          <p>💡 {currentFillDrill.formativeExplanation_en}</p>
                          <p className="font-arabic text-right text-stone-600 dark:text-stone-400" dir="rtl">
                            {currentFillDrill.formativeExplanation_ar}
                          </p>
                        </div>

                        <div className="flex justify-end pt-1">
                          <button
                            type="button"
                            onClick={handleNextFillDrill}
                            className="px-4 py-2 rounded-xl bg-stone-900 dark:bg-white text-white dark:text-stone-900 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shadow-xs"
                          >
                            <span>Siguiente Frase Situacional</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </div>
                )}

                {/* ----------------- MODE B: TENSE CONTRAST ----------------- */}
                {practiceMode === 'tense_contrast' && (
                  <div className="space-y-6">
                    {/* Concept Header */}
                    <div className="border-b border-stone-100 dark:border-stone-800 pb-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#C85A32] block">
                        Contraste Conceptual Clave
                      </span>
                      <h4 className="text-lg font-bold font-serif text-stone-900 dark:text-stone-100">
                        {currentContrastDrill.title}
                      </h4>
                      <p className="text-xs text-stone-500 dark:text-stone-400 font-arabic mt-0.5" dir="rtl">
                        {currentContrastDrill.title_ar}
                      </p>
                      <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed mt-2 bg-stone-50 dark:bg-stone-900 p-2.5 rounded-xl border border-stone-200/60 dark:border-stone-800">
                        {currentContrastDrill.conceptExplanation_en}
                      </p>
                    </div>

                    {/* Side-by-Side Comparison Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Pair A */}
                      <div className="p-4 rounded-2xl bg-amber-500/10 dark:bg-amber-400/5 border border-amber-500/30 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#B47832] text-white">
                            {currentContrastDrill.pairA.label}
                          </span>
                          <button
                            type="button"
                            onClick={() => speakSpanish(currentContrastDrill.pairA.sentence_es)}
                            className="p-1 rounded-md text-stone-500 hover:text-[#C85A32] transition cursor-pointer"
                            title="Escuchar pronunciación"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>

                        <p className="text-base font-serif font-bold text-stone-900 dark:text-white">
                          "{currentContrastDrill.pairA.sentence_es}"
                        </p>

                        <p className="text-xs text-stone-600 dark:text-stone-400">
                          🇬🇧 {currentContrastDrill.pairA.sentence_en}
                        </p>
                        <p className="text-xs font-arabic text-stone-600 dark:text-stone-400 text-right" dir="rtl">
                          🇦🇪 {currentContrastDrill.pairA.sentence_ar}
                        </p>

                        <div className="pt-1 border-t border-amber-500/20 text-[11px] font-semibold text-[#B47832] dark:text-amber-400">
                          {currentContrastDrill.pairA.aspectNote}
                        </div>
                      </div>

                      {/* Pair B */}
                      <div className="p-4 rounded-2xl bg-purple-500/10 dark:bg-purple-400/5 border border-purple-500/30 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-700 text-white">
                            {currentContrastDrill.pairB.label}
                          </span>
                          <button
                            type="button"
                            onClick={() => speakSpanish(currentContrastDrill.pairB.sentence_es)}
                            className="p-1 rounded-md text-stone-500 hover:text-purple-600 transition cursor-pointer"
                            title="Escuchar pronunciación"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                        </div>

                        <p className="text-base font-serif font-bold text-stone-900 dark:text-white">
                          "{currentContrastDrill.pairB.sentence_es}"
                        </p>

                        <p className="text-xs text-stone-600 dark:text-stone-400">
                          🇬🇧 {currentContrastDrill.pairB.sentence_en}
                        </p>
                        <p className="text-xs font-arabic text-stone-600 dark:text-stone-400 text-right" dir="rtl">
                          🇦🇪 {currentContrastDrill.pairB.sentence_ar}
                        </p>

                        <div className="pt-1 border-t border-purple-500/20 text-[11px] font-semibold text-purple-700 dark:text-purple-400">
                          {currentContrastDrill.pairB.aspectNote}
                        </div>
                      </div>
                    </div>

                    {/* Interactive Contrast Challenge */}
                    <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-3">
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                          Reto de Discriminación Significativa:
                        </span>
                        <h5 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                          {currentContrastDrill.challenge.prompt}
                        </h5>
                        <p className="text-xs text-stone-500 font-arabic text-right" dir="rtl">
                          {currentContrastDrill.challenge.prompt_ar}
                        </p>
                      </div>

                      <div className="space-y-2">
                        {currentContrastDrill.challenge.options.map((opt, oIdx) => {
                          const isSelected = selectedContrastOption === oIdx;
                          return (
                            <button
                              key={oIdx}
                              type="button"
                              onClick={() => handleSelectContrastOption(oIdx)}
                              disabled={contrastFeedbackChecked}
                              className={`w-full text-left p-3.5 rounded-xl text-xs font-bold transition cursor-pointer border ${
                                contrastFeedbackChecked
                                  ? opt.isCorrect
                                    ? 'bg-emerald-500 text-white border-emerald-600 font-black'
                                    : isSelected
                                    ? 'bg-rose-500/15 text-rose-600 border-rose-400'
                                    : 'bg-white dark:bg-stone-850 text-stone-400 border-stone-200 dark:border-stone-800 opacity-50'
                                  : isSelected
                                  ? 'bg-[#C85A32] text-white border-[#C85A32]'
                                  : 'bg-white dark:bg-stone-850 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 border-stone-200 dark:border-stone-800'
                              }`}
                            >
                              <span>{opt.text}</span>
                            </button>
                          );
                        })}
                      </div>

                      {contrastFeedbackChecked && (
                        <motion.div
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="pt-2 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between flex-wrap gap-2"
                        >
                          <div className="text-xs text-stone-700 dark:text-stone-300">
                            {selectedContrastOption !== null && (
                              <p>💡 {currentContrastDrill.challenge.options[selectedContrastOption].explanation}</p>
                            )}
                          </div>

                          <button
                            type="button"
                            onClick={handleNextContrastDrill}
                            className="px-4 py-2 rounded-xl bg-stone-900 dark:bg-white text-white dark:text-stone-900 text-xs font-bold flex items-center gap-1.5 transition cursor-pointer shadow-xs ml-auto"
                          >
                            <span>Siguiente Contraste</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </motion.div>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 🧭 Natural Order SLA Verb Tense Roadmap Modal */}
      <TenseRoadmapModal
        isOpen={isRoadmapModalOpen}
        onClose={() => setIsRoadmapModalOpen(false)}
        userProgress={userProgress}
        setUserProgress={setUserProgress}
        onOpenPlacementTest={() => {
          setIsRoadmapModalOpen(false);
          setIsPlacementTestOpen(true);
        }}
      />
    </div>
  );
};

export default VerbConjugator;
