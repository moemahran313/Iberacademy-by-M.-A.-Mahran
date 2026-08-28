import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Volume2,
  Sparkles,
  BookOpen,
  CheckCircle,
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
  Award
} from 'lucide-react';
import { Verb, VerbConjugationTable } from '../types';
import { SPANISH_VERBS } from '../data';
import { speakSpanish, soundEffects } from '../utils/audio';

type PracticeMode = 'mcq' | 'cloze' | 'surgeon';

export const VerbConjugator: React.FC = () => {
  // Navigation & Search
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVerbId, setSelectedVerbId] = useState<string>(SPANISH_VERBS[0]?.id || 'v-ser');
  const [activeTense, setActiveTense] = useState<keyof VerbConjugationTable>('present');
  const [filterCEFR, setFilterCEFR] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');

  // Gamification & Scientific Practice State
  const [practiceMode, setPracticeMode] = useState<PracticeMode>('mcq');
  const [isPracticing, setIsPracticing] = useState(false);
  const [practiceStreak, setPracticeStreak] = useState(0);
  const [totalAttempted, setTotalAttempted] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);

  // Mode States
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedMCQOption, setSelectedMCQOption] = useState<string | null>(null);
  const [clozeUserInput, setClozeUserInput] = useState('');
  const [clozeIsSubmitted, setClozeIsSubmitted] = useState(false);
  const [surgeonSelectedStem, setSurgeonSelectedStem] = useState<string | null>(null);
  const [surgeonSelectedSuffix, setSurgeonSelectedSuffix] = useState<string | null>(null);
  const [surgeonFeedback, setSurgeonFeedback] = useState<'correct' | 'incorrect' | null>(null);

  // Trigger sound effect on practice activation
  const togglePractice = () => {
    soundEffects.playFlip();
    setIsPracticing(!isPracticing);
    resetQuestionState();
  };

  // Find active verb
  const selectedVerb = useMemo(() => {
    return SPANISH_VERBS.find(v => v.id === selectedVerbId) || SPANISH_VERBS[0];
  }, [selectedVerbId]);

  // Filters for verbs list
  const filteredVerbs = useMemo(() => {
    return SPANISH_VERBS.filter(v => {
      const matchesSearch =
        searchTerm === '' ||
        v.infinitive.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.english.toLowerCase().includes(searchTerm.toLowerCase()) ||
        v.arabic.includes(searchTerm);

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

  // Scientific configuration of tenses
  const tensesConfig = useMemo(() => [
    { id: 'present' as keyof VerbConjugationTable, name_es: 'Presente', name_en: 'Present', name_ar: 'المضارع البسيط', level: 'A1' },
    { id: 'preterite' as keyof VerbConjugationTable, name_es: 'Pretérito Indefinido', name_en: 'Preterite (Simple Past)', name_ar: 'الماضي البسيط', level: 'A2' },
    { id: 'imperfect' as keyof VerbConjugationTable, name_es: 'Pretérito Imperfecto', name_en: 'Imperfect Past', name_ar: 'الماضي المستمر', level: 'A2' },
    { id: 'future' as keyof VerbConjugationTable, name_es: 'Futuro Simple', name_en: 'Simple Future', name_ar: 'المستقبل البسيط', level: 'A2' },
    { id: 'conditional' as keyof VerbConjugationTable, name_es: 'Condicional Simple', name_en: 'Conditional', name_ar: 'صيغة الشرط', level: 'B1' },
    { id: 'presentSubjunctive' as keyof VerbConjugationTable, name_es: 'Presente de Subjuntivo', name_en: 'Present Subjunctive', name_ar: 'منصوب الحاضر', level: 'B1' },
    { id: 'imperfectSubjunctive' as keyof VerbConjugationTable, name_es: 'Imperfecto de Subjuntivo', name_en: 'Imperfect Subjunctive', name_ar: 'منصوب الماضي', level: 'B2' },
    { id: 'imperativeAffirmative' as keyof VerbConjugationTable, name_es: 'Imperativo Afirmativo', name_en: 'Imperative (Commands)', name_ar: 'فعل الأمر', level: 'A2' }
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

  // Helper: Split Spanish forms into Stem & Suffix dynamically for visual parsing
  const parseStemAndSuffix = (infinitive: string, conjugation: string, pronoun: string) => {
    if (!conjugation || conjugation === '—') return { stem: conjugation, suffix: '' };
    
    // Default suffix options
    const arSuffixes = ['o', 'as', 'a', 'amos', 'áis', 'an', 'é', 'aste', 'ó', 'aron', 'aba', 'abas', 'ábamos', 'abais', 'aban', 'ará', 'arás', 'aremos', 'aréis', 'arán', 'aría', 'arías', 'aríamos', 'aríais', 'arían', 'e', 'es', 'emos', 'éis', 'en', 'ara', 'aras', 'áramos', 'arais', 'aran'];
    const erirSuffixes = ['o', 'es', 'e', 'emos', 'imos', 'éis', 'ís', 'en', 'í', 'iste', 'ió', 'imos', 'isteis', 'ieron', 'ía', 'ías', 'íamos', 'íais', 'ían', 'erá', 'erás', 'eremos', 'eréis', 'erán', 'irá', 'irás', 'iremos', 'iréis', 'irán', 'ería', 'erías', 'eríamos', 'eríais', 'erían', 'iría', 'irías', 'iríamos', 'iríais', 'irían', 'a', 'as', 'amos', 'áis', 'an', 'iera', 'ieras', 'iéramos', 'ierais', 'ieran'];
    
    const allSuffixes = [...arSuffixes, ...erirSuffixes].sort((a, b) => b.length - a.length);
    
    // Find matching suffix at the end of the conjugated word
    for (const suffix of allSuffixes) {
      if (conjugation.endsWith(suffix) && conjugation.length > suffix.length) {
        const stem = conjugation.substring(0, conjugation.length - suffix.length);
        return { stem, suffix };
      }
    }
    
    // Fallback split (last 2 characters)
    if (conjugation.length > 2) {
      return {
        stem: conjugation.substring(0, conjugation.length - 2),
        suffix: conjugation.substring(conjugation.length - 2)
      };
    }
    return { stem: conjugation, suffix: '' };
  };

  // Generate Current Drill Questions based on selected mode
  const currentDrillQuestion = useMemo(() => {
    if (!selectedVerb) return null;

    const subList = subjects.filter(s => conjugationSet[s.key] && conjugationSet[s.key] !== '—');
    if (subList.length === 0) return null;

    // Pick pronoun based on index
    const sub = subList[currentQuestionIdx % subList.length];
    const correctAnswer = conjugationSet[sub.key] || '';

    // Generate MCQ distractors
    let options: string[] = [correctAnswer];
    const otherVerbs = SPANISH_VERBS.filter(v => v.id !== selectedVerb.id);
    
    // Distractor 1: Same subject, different verb
    for (const v of otherVerbs) {
      const altSet = v.conjugations[activeTense] as Record<string, string>;
      if (altSet && altSet[sub.key] && altSet[sub.key] !== '—' && altSet[sub.key] !== correctAnswer) {
        options.push(altSet[sub.key]);
        break;
      }
    }

    // Distractor 2: Different subject, same verb
    for (const otherSub of subList) {
      if (otherSub.key !== sub.key) {
        const altAnswer = conjugationSet[otherSub.key];
        if (altAnswer && altAnswer !== correctAnswer && !options.includes(altAnswer)) {
          options.push(altAnswer);
          break;
        }
      }
    }

    // Fill up to 3 options with random forms
    while (options.length < 3) {
      const randSub = subList[Math.floor(Math.random() * subList.length)];
      const val = conjugationSet[randSub.key];
      if (val && !options.includes(val)) {
        options.push(val);
      } else {
        options.push(correctAnswer + 's'); // Simple artificial distractor
      }
    }

    // Shuffle options
    options = options.sort(() => 0.5 - Math.random());

    // Generate Cloze context sentences
    // Attempt to find a real example sentence from the verb data matching the active tense
    const matchingExample = selectedVerb.examples.find(
      ex => ex.es.toLowerCase().includes(correctAnswer.toLowerCase())
    ) || selectedVerb.examples[0] || { es: `${sub.label_es} [conjugate] hoy.`, en: `I [conjugate] today.`, ar: `أقوم بالتصريف اليوم.` };

    // Format Cloze Spanish Sentence with blank spaces
    let clozeSentence = matchingExample.es;
    const regex = new RegExp(`\\b${correctAnswer}\\b`, 'gi');
    if (regex.test(clozeSentence)) {
      clozeSentence = clozeSentence.replace(regex, '_______');
    } else {
      // Manual replacement fallback
      clozeSentence = clozeSentence.replace(correctAnswer, '_______');
    }

    // Surgeon Mode stem & suffix
    const parsed = parseStemAndSuffix(selectedVerb.infinitive, correctAnswer, sub.key);

    return {
      subject: sub,
      correctAnswer,
      options,
      clozeSentence,
      sentenceTranslations: {
        en: matchingExample.en,
        ar: matchingExample.ar
      },
      stem: parsed.stem,
      suffix: parsed.suffix
    };
  }, [selectedVerb, activeTense, conjugationSet, currentQuestionIdx, subjects]);

  const resetQuestionState = () => {
    setSelectedMCQOption(null);
    setClozeUserInput('');
    setClozeIsSubmitted(false);
    setSurgeonSelectedStem(null);
    setSurgeonSelectedSuffix(null);
    setSurgeonFeedback(null);
  };

  const handleNextQuestion = () => {
    soundEffects.playPop();
    setCurrentQuestionIdx(prev => prev + 1);
    resetQuestionState();
  };

  // MCQ selection check
  const handleMCQSelect = (option: string) => {
    if (selectedMCQOption !== null) return; // Answered already
    setSelectedMCQOption(option);
    setTotalAttempted(prev => prev + 1);

    const isCorrect = option.toLowerCase() === currentDrillQuestion?.correctAnswer.toLowerCase();
    if (isCorrect) {
      soundEffects.playCorrect();
      setPracticeStreak(prev => prev + 1);
      setTotalCorrect(prev => prev + 1);
    } else {
      soundEffects.playIncorrect();
      setPracticeStreak(0);
    }
  };

  // Cloze submit check
  const handleClozeSubmit = () => {
    if (clozeIsSubmitted) return;
    setClozeIsSubmitted(true);
    setTotalAttempted(prev => prev + 1);

    const isCorrect = clozeUserInput.trim().toLowerCase() === currentDrillQuestion?.correctAnswer.toLowerCase();
    if (isCorrect) {
      soundEffects.playCorrect();
      setPracticeStreak(prev => prev + 1);
      setTotalCorrect(prev => prev + 1);
    } else {
      soundEffects.playIncorrect();
      setPracticeStreak(0);
    }
  };

  // Suffix Surgeon selection
  const handleSurgeonSelect = (type: 'stem' | 'suffix', value: string) => {
    soundEffects.playPop();
    if (type === 'stem') {
      setSurgeonSelectedStem(value);
    } else {
      setSurgeonSelectedSuffix(value);
    }
  };

  // Suffix Surgeon submit action
  useEffect(() => {
    if (surgeonSelectedStem && surgeonSelectedSuffix && currentDrillQuestion) {
      const combined = surgeonSelectedStem + surgeonSelectedSuffix;
      const isCorrect = combined.toLowerCase() === currentDrillQuestion.correctAnswer.toLowerCase();
      
      setTotalAttempted(prev => prev + 1);
      if (isCorrect) {
        setSurgeonFeedback('correct');
        soundEffects.playCorrect();
        setPracticeStreak(prev => prev + 1);
        setTotalCorrect(prev => prev + 1);
      } else {
        setSurgeonFeedback('incorrect');
        soundEffects.playIncorrect();
        setPracticeStreak(0);
      }
    }
  }, [surgeonSelectedStem, surgeonSelectedSuffix, currentDrillQuestion]);

  return (
    <div className="space-y-6 pb-24 md:pb-12">
      {/* Upper Agency Intro Header Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden bg-gradient-to-r from-stone-950 via-stone-900 to-stone-950 border border-stone-800/80 rounded-3xl p-6 sm:p-8 text-stone-100 shadow-xl"
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-red-500 text-white shadow-lg shadow-red-500/25">
                Cognitive Mastery Engine
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-stone-900 text-amber-300 border border-stone-800">
                Scientifically Proven Recall
              </span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-black text-white font-arabic tracking-tight">
              Spanish Verb Conjugator & Drill Lab
            </h1>
            <p className="text-xs sm:text-sm text-stone-300 max-w-2xl font-arabic">
              اكتساب تصريف الأفعال الإسبانية وتطبيقها تلقائياً بالاعتماد على الفهم السياقي وعلم الذاكرة المعرفي.
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={togglePractice}
            className={`px-5 py-3 rounded-2xl text-xs font-black flex items-center gap-2 transition duration-200 cursor-pointer shadow-lg font-arabic ${
              isPracticing
                ? 'bg-amber-500 text-stone-950 hover:bg-amber-400'
                : 'bg-stone-900 hover:bg-stone-850 text-amber-300 border border-stone-800'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>{isPracticing ? 'العودة لجدول التصريف' : 'ابدأ تمرين تفاعلي'}</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Gamified stats bar during active practice */}
      {isPracticing && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-100 dark:bg-red-950/40 rounded-2xl">
              <TrendingUp className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase text-stone-400 tracking-wider">Practice Arena</span>
              <h3 className="text-sm font-black text-stone-900 dark:text-white font-arabic">
                Active Training Mode
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-500 animate-pulse" />
              <div>
                <span className="text-[9px] font-black uppercase text-stone-400 block tracking-wider">Streak</span>
                <span className="text-xs font-extrabold text-stone-900 dark:text-stone-200">{practiceStreak} Correct</span>
              </div>
            </div>

            <div className="flex items-center gap-2 border-l border-stone-200 dark:border-stone-800 pl-6">
              <Award className="w-5 h-5 text-amber-500" />
              <div>
                <span className="text-[9px] font-black uppercase text-stone-400 block tracking-wider">Accuracy</span>
                <span className="text-xs font-extrabold text-stone-900 dark:text-stone-200">
                  {totalAttempted > 0 ? `${Math.round((totalCorrect / totalAttempted) * 100)}%` : '0%'}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                soundEffects.playFlip();
                setPracticeStreak(0);
                setTotalAttempted(0);
                setTotalCorrect(0);
                resetQuestionState();
              }}
              className="p-2.5 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-400 dark:text-stone-500 transition"
              title="Reset stats"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}

      {/* Main Layout grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Verb directory selection list */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-4 sm:p-5 shadow-sm space-y-4">
            <h3 className="text-xs font-black uppercase tracking-wider text-stone-400 flex items-center gap-1.5 font-arabic">
              <Sliders className="w-4 h-4 text-amber-500" />
              <span>فلاتر واختيار الأفعال</span>
            </h3>

            {/* Quick search input */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                placeholder="ابحث عن فعل (e.g. ser, tener)..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-2xl text-xs sm:text-sm text-stone-800 dark:text-stone-100 placeholder-stone-400 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 focus:outline-none shadow-xs font-arabic"
              />
            </div>

            {/* Categorization selectors */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <label className="text-[10px] font-black uppercase text-stone-400 tracking-wider block mb-1">CEFR Level</label>
                <select
                  value={filterCEFR}
                  onChange={e => { soundEffects.playPop(); setFilterCEFR(e.target.value); }}
                  className="w-full p-2.5 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl text-stone-800 dark:text-stone-200 font-extrabold focus:outline-none"
                >
                  <option value="all">All CEFR</option>
                  <option value="A1">A1</option>
                  <option value="A2">A2</option>
                  <option value="B1">B1</option>
                  <option value="B2">B2</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-black uppercase text-stone-400 tracking-wider block mb-1">Verb Class</label>
                <select
                  value={filterType}
                  onChange={e => { soundEffects.playPop(); setFilterType(e.target.value); }}
                  className="w-full p-2.5 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl text-stone-800 dark:text-stone-200 font-extrabold focus:outline-none"
                >
                  <option value="all">All Classes</option>
                  <option value="regular">Regular</option>
                  <option value="irregular">Irregular</option>
                  <option value="stem-changing">Stem-change</option>
                </select>
              </div>
            </div>

            {/* Actionable verb select panel */}
            <div className="bg-stone-50 dark:bg-stone-950/50 border border-stone-200/60 dark:border-stone-800/60 rounded-2xl p-1.5 max-h-[420px] overflow-y-auto space-y-1 no-scrollbar">
              {filteredVerbs.length === 0 ? (
                <div className="text-center py-10 text-stone-400 text-xs font-arabic">
                  لا توجد أفعال تطابق الفلاتر
                </div>
              ) : (
                filteredVerbs.map(verb => {
                  const isSelected = verb.id === selectedVerbId;
                  return (
                    <motion.button
                      key={verb.id}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        soundEffects.playPop();
                        setSelectedVerbId(verb.id);
                        resetQuestionState();
                      }}
                      className={`w-full text-left p-3 rounded-xl flex items-center justify-between transition-all border ${
                        isSelected
                          ? 'bg-amber-500 text-stone-950 border-amber-400 shadow-md'
                          : 'hover:bg-stone-100 dark:hover:bg-stone-900 bg-transparent border-transparent text-stone-800 dark:text-stone-200'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-black text-sm tracking-tight">
                            {verb.infinitive}
                          </span>
                          <span className={`px-1.5 py-0.2 rounded text-[8px] font-black uppercase ${
                            isSelected
                              ? 'bg-stone-950 text-amber-400'
                              : verb.regularType === 'irregular'
                              ? 'bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-300'
                              : verb.regularType === 'stem-changing'
                              ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300'
                              : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300'
                          }`}>
                            {verb.regularType.replace('regular-', '')}
                          </span>
                        </div>
                        <p className={`text-[10px] mt-0.5 line-clamp-1 ${isSelected ? 'text-stone-900/80 font-medium' : 'text-stone-400'}`}>
                          {verb.english}
                        </p>
                      </div>

                      <span className={`text-[10px] font-black ${isSelected ? 'text-stone-950' : 'text-stone-400'}`}>
                        {verb.cefr}
                      </span>
                    </motion.button>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Showcase OR Interactive Practice Arena */}
        <div className="lg:col-span-8 space-y-5">
          {/* Active Verb Details Showcase Header */}
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-5 sm:p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-stone-100 dark:border-stone-800 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <h2 className="text-3xl font-black text-stone-900 dark:text-white tracking-tight">
                    {selectedVerb.infinitive}
                  </h2>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => speakSpanish(selectedVerb.infinitive)}
                    className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 transition"
                    title="Pronounce"
                  >
                    <Volume2 className="w-5 h-5" />
                  </motion.button>
                  <span className="px-2.5 py-0.8 rounded-xl text-[10px] font-black uppercase bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                    Level {selectedVerb.cefr}
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-bold text-stone-600 dark:text-stone-300">
                  🇬🇧 {selectedVerb.english}
                </p>
                <p className="text-xs sm:text-sm font-extrabold text-amber-600 dark:text-amber-400 font-arabic flex items-center gap-1.5" dir="rtl">
                  <span>🇦🇪 {selectedVerb.arabic}</span>
                </p>
              </div>

              {/* Gerund & Participle blocks */}
              <div className="flex items-center gap-3 text-xs bg-stone-50 dark:bg-stone-950 p-3 rounded-2xl border border-stone-200/80 dark:border-stone-800/80">
                <div>
                  <span className="text-[10px] text-stone-400 block font-bold">Gerund</span>
                  <span className="font-extrabold text-stone-800 dark:text-stone-200 font-mono">{selectedVerb.gerund}</span>
                </div>
                <div className="border-l border-stone-200 dark:border-stone-800 pl-3">
                  <span className="text-[10px] text-stone-400 block font-bold">Participle</span>
                  <span className="font-extrabold text-stone-800 dark:text-stone-200 font-mono">{selectedVerb.participle}</span>
                </div>
              </div>
            </div>

            {/* Select Tense Pills */}
            <div className="pt-4">
              <span className="text-[10px] font-black text-stone-400 uppercase tracking-wider block mb-2 font-arabic">
                اختر الزمن والقسم القواعدي
              </span>
              <div className="flex flex-wrap gap-1.5">
                {tensesConfig.map(tense => (
                  <button
                    key={tense.id}
                    onClick={() => {
                      soundEffects.playPop();
                      setActiveTense(tense.id);
                      resetQuestionState();
                    }}
                    className={`px-3 py-2 rounded-xl text-xs font-black transition-all duration-150 ${
                      activeTense === tense.id
                        ? 'bg-amber-500 text-stone-950 shadow-md'
                        : 'bg-stone-50 hover:bg-stone-100 dark:bg-stone-950 dark:hover:bg-stone-900 text-stone-600 dark:text-stone-400'
                    }`}
                  >
                    <span>{tense.name_es}</span>
                    <span className="text-[9px] opacity-70 ml-1">({tense.level})</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {!isPracticing ? (
              /* VIEW MODE: INTERACTIVE CONJUGATION MATRIX (REGULAR/IRREGULAR PATTERN ANALYSIS) */
              <motion.div
                key="matrix-view"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-5 sm:p-6 shadow-sm space-y-4"
              >
                <div className="flex justify-between items-center flex-wrap gap-2 border-b border-stone-100 dark:border-stone-800 pb-3">
                  <div>
                    <h3 className="text-base font-black text-stone-900 dark:text-white font-arabic">
                      {tensesConfig.find(t => t.id === activeTense)?.name_es} • Matrix
                    </h3>
                    <p className="text-[11px] text-stone-400">
                      {tensesConfig.find(t => t.id === activeTense)?.name_en}
                    </p>
                  </div>

                  <span className="text-xs font-extrabold text-amber-600 dark:text-amber-500 font-arabic" dir="rtl">
                    {tensesConfig.find(t => t.id === activeTense)?.name_ar}
                  </span>
                </div>

                {/* Suffix / Stem Breakdown Schema Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {subjects.map(sub => {
                    const form = conjugationSet[sub.key] || '—';
                    const parsed = parseStemAndSuffix(selectedVerb.infinitive, form, sub.key);

                    return (
                      <motion.div
                        key={sub.key}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => speakSpanish(`${sub.label_es} ${form}`)}
                        className="group bg-stone-50 dark:bg-stone-950/40 hover:bg-amber-500/5 dark:hover:bg-amber-500/10 border border-stone-200 dark:border-stone-800 hover:border-amber-500/40 rounded-2xl p-4 transition-all duration-200 cursor-pointer text-left relative overflow-hidden"
                      >
                        <div className="flex justify-between items-center text-[10px] text-stone-400 font-bold mb-1">
                          <span>{sub.label_es}</span>
                          <Volume2 className="w-3.5 h-3.5 text-stone-400 group-hover:text-amber-500 transition-transform group-hover:scale-110" />
                        </div>

                        {/* Visual Stem & Suffix distinction */}
                        <div className="text-lg font-black tracking-tight leading-none">
                          {form === '—' ? (
                            <span className="text-stone-300">—</span>
                          ) : (
                            <>
                              <span className={
                                selectedVerb.regularType === 'irregular' || selectedVerb.regularType === 'stem-changing'
                                  ? 'text-orange-600 dark:text-orange-400' // Irregular roots glow orange
                                  : 'text-stone-900 dark:text-stone-200'
                              }>
                                {parsed.stem}
                              </span>
                              <span className="text-amber-500">
                                {parsed.suffix}
                              </span>
                            </>
                          )}
                        </div>

                        <div className="flex items-center justify-between mt-2 pt-1 border-t border-stone-100 dark:border-stone-850">
                          <span className="text-[10px] text-stone-400">
                            {sub.label_en}
                          </span>
                          <span className="text-[10px] text-stone-500 font-arabic">
                            {sub.label_ar}
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ) : (
              /* THE SCIENTIFIC DRILL ARENA (GAMIFIED INTERACTIVE MODES) */
              <motion.div
                key="drill-practice-view"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 rounded-3xl p-5 sm:p-6 shadow-md space-y-6"
              >
                {/* 3 Scientific Mode Selector Tabs */}
                <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-3 flex-wrap gap-2">
                  <div className="flex bg-stone-200 dark:bg-stone-950 p-1 rounded-2xl">
                    <button
                      onClick={() => { soundEffects.playFlip(); setPracticeMode('mcq'); resetQuestionState(); }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                        practiceMode === 'mcq'
                          ? 'bg-amber-500 text-stone-950'
                          : 'text-stone-600 dark:text-stone-400'
                      }`}
                    >
                      Rapid MCQ
                    </button>
                    <button
                      onClick={() => { soundEffects.playFlip(); setPracticeMode('cloze'); resetQuestionState(); }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                        practiceMode === 'cloze'
                          ? 'bg-amber-500 text-stone-950'
                          : 'text-stone-600 dark:text-stone-400'
                      }`}
                    >
                      Sentence Cloze
                    </button>
                    <button
                      onClick={() => { soundEffects.playFlip(); setPracticeMode('surgeon'); resetQuestionState(); }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                        practiceMode === 'surgeon'
                          ? 'bg-amber-500 text-stone-950'
                          : 'text-stone-600 dark:text-stone-400'
                      }`}
                    >
                      Suffix Surgeon
                    </button>
                  </div>

                  <span className="text-[10px] font-black uppercase text-amber-600 dark:text-amber-500 tracking-wider">
                    {practiceMode === 'mcq' && '1. Pattern Recognition Speed'}
                    {practiceMode === 'cloze' && '2. Contextual Integration'}
                    {practiceMode === 'surgeon' && '3. Suffix Synthesis Recall'}
                  </span>
                </div>

                {/* Drill Area Card */}
                {currentDrillQuestion && (
                  <div className="space-y-6 bg-white dark:bg-stone-950 border border-stone-150 dark:border-stone-850 rounded-2xl p-5 shadow-sm">
                    {/* Prompt Header */}
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <span className="text-[10px] font-black uppercase text-amber-600 tracking-wider">Target Subject Pronoun</span>
                        <h4 className="text-xl font-black text-stone-900 dark:text-white flex items-center gap-2">
                          <span className="bg-amber-500/10 text-amber-700 px-3 py-1 rounded-xl">
                            {currentDrillQuestion.subject.label_es}
                          </span>
                          <span className="text-stone-400 text-sm">({currentDrillQuestion.subject.label_en})</span>
                        </h4>
                      </div>

                      <button
                        onClick={() => speakSpanish(currentDrillQuestion.correctAnswer)}
                        className="p-2 bg-stone-100 dark:bg-stone-900 text-stone-500 hover:text-amber-500 rounded-xl"
                        title="Hear answer hint"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* INTERACTIVE MODE IMPLEMENTATIONS */}
                    {practiceMode === 'mcq' && (
                      <div className="space-y-4">
                        <p className="text-xs text-stone-400 font-arabic">
                          ✍️ اختر التصريف الصحيح للضمير المعطى:
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {currentDrillQuestion.options.map((option, idx) => {
                            const isSelected = selectedMCQOption === option;
                            const isCorrect = option.toLowerCase() === currentDrillQuestion.correctAnswer.toLowerCase();
                            const hasBeenAnswered = selectedMCQOption !== null;

                            return (
                              <motion.button
                                key={idx}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleMCQSelect(option)}
                                className={`p-4 rounded-2xl text-base font-black transition border-2 flex flex-col items-center justify-center gap-1.5 ${
                                  hasBeenAnswered
                                    ? isCorrect
                                      ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-400 dark:border-emerald-700 text-emerald-800 dark:text-emerald-400'
                                      : isSelected
                                      ? 'bg-red-50 dark:bg-red-950/20 border-red-400 dark:border-red-700 text-red-800 dark:text-red-400'
                                      : 'bg-stone-50 dark:bg-stone-900 border-stone-200 dark:border-stone-850 opacity-40'
                                    : 'bg-stone-50 dark:bg-stone-900/50 hover:bg-stone-100 dark:hover:bg-stone-850 border-stone-200 dark:border-stone-800 hover:border-amber-500'
                                }`}
                              >
                                <span className="font-mono">{option}</span>
                                {hasBeenAnswered && isCorrect && <Check className="w-4 h-4 text-emerald-500" />}
                                {hasBeenAnswered && !isCorrect && isSelected && <X className="w-4 h-4 text-red-500" />}
                              </motion.button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {practiceMode === 'cloze' && (
                      <div className="space-y-5">
                        <div className="p-4 bg-stone-50 dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 rounded-2xl text-center space-y-2">
                          <span className="text-[9px] font-black uppercase text-stone-400 block tracking-wider">Spanish Context Scenario</span>
                          <p className="text-lg font-black text-stone-800 dark:text-stone-100 tracking-wide font-mono">
                            {currentDrillQuestion.clozeSentence}
                          </p>

                          {/* Bilingual translations */}
                          <div className="pt-2 border-t border-stone-200/60 dark:border-stone-800 flex flex-col gap-0.5">
                            <p className="text-xs text-stone-500">🇬🇧 {currentDrillQuestion.sentenceTranslations.en}</p>
                            <p className="text-xs text-amber-800 dark:text-amber-500 font-arabic" dir="rtl">🇦🇪 {currentDrillQuestion.sentenceTranslations.ar}</p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase text-stone-400 tracking-wider block">Conjugate Verb in the sentence</label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={clozeUserInput}
                              onChange={e => setClozeUserInput(e.target.value)}
                              placeholder={`Type form of [${selectedVerb.infinitive}]`}
                              disabled={clozeIsSubmitted}
                              onKeyDown={e => { if (e.key === 'Enter') handleClozeSubmit(); }}
                              className={`flex-1 px-4 py-3 bg-stone-50 dark:bg-stone-900 border rounded-2xl text-sm font-black tracking-wide focus:outline-none focus:ring-2 focus:ring-amber-500/20 ${
                                clozeIsSubmitted
                                  ? clozeUserInput.trim().toLowerCase() === currentDrillQuestion.correctAnswer.toLowerCase()
                                    ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-400 text-emerald-800'
                                    : 'bg-red-50 dark:bg-red-950/20 border-red-400 text-red-800'
                                  : 'border-stone-200 dark:border-stone-800'
                              }`}
                            />
                            {!clozeIsSubmitted ? (
                              <button
                                onClick={handleClozeSubmit}
                                className="px-4 bg-amber-500 text-stone-950 hover:bg-amber-400 rounded-2xl font-black text-xs"
                              >
                                Submit
                              </button>
                            ) : (
                              <div className="px-4 py-2 bg-stone-100 dark:bg-stone-900 rounded-2xl flex items-center gap-1.5 text-xs text-stone-500 font-black font-mono">
                                Correct: {currentDrillQuestion.correctAnswer}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {practiceMode === 'surgeon' && (
                      <div className="space-y-5">
                        <p className="text-xs text-stone-400 font-arabic">
                          🧠 التركيب المعرفي: صل الجذر (Stem) باللاحقة (Suffix) الصحيحة لتكوين الفعل المطلوب:
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {/* Stems list */}
                          <div className="space-y-2">
                            <span className="text-[9px] font-black uppercase text-stone-400 block tracking-wider">1. Pick Root Stem</span>
                            <div className="grid grid-cols-2 gap-2">
                              {[currentDrillQuestion.stem, selectedVerb.infinitive.substring(0, selectedVerb.infinitive.length - 2) + 'x'].map((s, idx) => {
                                const isSelected = surgeonSelectedStem === s;
                                return (
                                  <button
                                    key={idx}
                                    onClick={() => handleSurgeonSelect('stem', s)}
                                    className={`p-3 rounded-xl border text-xs font-black tracking-widest uppercase ${
                                      isSelected
                                        ? 'bg-orange-500 border-orange-400 text-white shadow-sm'
                                        : 'bg-stone-50 dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:bg-stone-100'
                                    }`}
                                  >
                                    {s}-
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* Suffix options list */}
                          <div className="space-y-2">
                            <span className="text-[9px] font-black uppercase text-stone-400 block tracking-wider">2. Pick Ending Suffix</span>
                            <div className="grid grid-cols-2 gap-2">
                              {[currentDrillQuestion.suffix, 'amos', 'eis', 'an'].slice(0, 4).sort().map((s, idx) => {
                                const isSelected = surgeonSelectedSuffix === s;
                                return (
                                  <button
                                    key={idx}
                                    onClick={() => handleSurgeonSelect('suffix', s)}
                                    className={`p-3 rounded-xl border text-xs font-black tracking-widest uppercase ${
                                      isSelected
                                        ? 'bg-amber-500 border-amber-400 text-stone-950 shadow-sm'
                                        : 'bg-stone-50 dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:bg-stone-100'
                                    }`}
                                  >
                                    -{s}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </div>

                        {/* Combined Surgery Feedback */}
                        {surgeonFeedback && (
                          <div className={`p-4 rounded-xl text-center font-black ${
                            surgeonFeedback === 'correct'
                              ? 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-800 border border-emerald-400'
                              : 'bg-red-50 dark:bg-red-950/20 text-red-800 border border-red-400'
                          }`}>
                            {surgeonFeedback === 'correct' ? (
                              <p className="text-xs">
                                Perfect Surgery! {surgeonSelectedStem} + {surgeonSelectedSuffix} = {currentDrillQuestion.correctAnswer}
                              </p>
                            ) : (
                              <p className="text-xs">
                                Flatline! {surgeonSelectedStem} + {surgeonSelectedSuffix} is incorrect. Target: {currentDrillQuestion.correctAnswer}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Controller and Navigation actions */}
                    <div className="flex justify-between items-center pt-4 border-t border-stone-200 dark:border-stone-850">
                      <button
                        onClick={() => {
                          soundEffects.playFlip();
                          resetQuestionState();
                        }}
                        className="px-3 py-1.5 text-xs text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 font-extrabold"
                      >
                        Reset Drill
                      </button>

                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={handleNextQuestion}
                        className="px-5 py-2.5 bg-stone-900 dark:bg-stone-100 hover:bg-stone-800 dark:hover:bg-white text-white dark:text-stone-950 rounded-2xl text-xs font-black flex items-center gap-1.5 transition"
                      >
                        <span>Next Conjugation</span>
                        <ChevronRight className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Suffix Formulas, Prepositions & Learning Pitfalls Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Real life contexts */}
            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-5 shadow-sm space-y-4">
              <h4 className="text-xs font-black uppercase tracking-wider text-stone-400 flex items-center gap-1.5 font-arabic">
                <BookOpen className="w-4 h-4 text-amber-500" />
                <span>أمثلة سياقية حية • Examples</span>
              </h4>

              <div className="space-y-3">
                {selectedVerb.examples.map((ex, idx) => (
                  <div
                    key={idx}
                    onClick={() => speakSpanish(ex.es)}
                    className="p-3 bg-stone-50 hover:bg-amber-500/5 dark:bg-stone-950 dark:hover:bg-stone-900 border border-stone-200/60 dark:border-stone-850 rounded-2xl cursor-pointer transition flex items-start justify-between gap-2"
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-black text-stone-900 dark:text-stone-100 leading-snug">
                        🇪🇸 {ex.es}
                      </p>
                      <p className="text-[11px] text-stone-500">
                        🇬🇧 {ex.en}
                      </p>
                      <p className="text-[11px] text-amber-700 dark:text-amber-400 font-arabic font-semibold" dir="rtl">
                        🇦🇪 {ex.ar}
                      </p>
                    </div>

                    <Volume2 className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                  </div>
                ))}
              </div>
            </div>

            {/* Pitfalls and Common Mistakes */}
            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-5 shadow-sm space-y-4">
              <h4 className="text-xs font-black uppercase tracking-wider text-stone-400 flex items-center gap-1.5 font-arabic">
                <HelpCircle className="w-4 h-4 text-red-500 animate-pulse" />
                <span>أخطاء شائعة وتنبيهات • Pitfalls</span>
              </h4>

              {selectedVerb.commonMistakes && (
                <div className="p-4 bg-red-50 dark:bg-red-950/20 border border-red-200/60 dark:border-red-900/40 rounded-2xl space-y-1.5">
                  <span className="font-black text-red-700 dark:text-red-400 text-xs block">⚠️ Caution / انتبه:</span>
                  <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                    {selectedVerb.commonMistakes}
                  </p>
                  {selectedVerb.commonMistakes_ar && (
                    <p className="text-xs text-red-900 dark:text-red-400 font-arabic font-medium leading-relaxed" dir="rtl">
                      {selectedVerb.commonMistakes_ar}
                    </p>
                  )}
                </div>
              )}

              {selectedVerb.collocations && (
                <div className="p-4 bg-stone-50 dark:bg-stone-950 border border-stone-250 dark:border-stone-850 rounded-2xl space-y-2">
                  <span className="font-black text-stone-600 dark:text-stone-300 text-[10px] uppercase tracking-wider block">Bilingual Collocations</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedVerb.collocations.map((col, i) => (
                      <span
                        key={i}
                        className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-200 px-2.5 py-1 rounded-xl text-xs font-black tracking-tight"
                      >
                        {col}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
