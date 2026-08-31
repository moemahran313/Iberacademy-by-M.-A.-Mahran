import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  BookOpen,
  GraduationCap,
  CheckCircle,
  HelpCircle,
  AlertTriangle,
  Sparkles,
  Volume2,
  Brain,
  Zap,
  RotateCw,
  Flame,
  Award,
  Layers,
  ArrowRight,
  ShieldCheck,
  PlusCircle,
  Clock,
  CheckCircle2,
  XCircle,
  Play,
  MapPin,
  ChevronRight,
  Lock,
  Compass,
  ListOrdered
} from 'lucide-react';
import { GrammarTopic, UserProgress, MinedSentence } from '../types';
import { GRAMMAR_ENCYCLOPEDIA } from '../data';
import {
  PATTERN_DISCOVERY_ITEMS,
  MINIMAL_PAIR_CARDS,
  PROCESSING_INSTRUCTION_DRILLS,
  SYNTAX_REPAIR_CHALLENGES
} from '../data/slaGrammarEngine';
import { speakSpanish, soundEffects } from '../utils/audio';

interface GrammarEncyclopediaViewProps {
  userProgress: UserProgress;
  setUserProgress: React.Dispatch<React.SetStateAction<UserProgress>>;
}

export const GrammarEncyclopediaView: React.FC<GrammarEncyclopediaViewProps> = ({
  userProgress,
  setUserProgress
}) => {
  const [activeTabMode, setActiveTabMode] = useState<
    'path' | 'pattern_discovery' | 'minimal_pairs' | 'output_drills' | 'syntax_repair' | 'encyclopedia'
  >('path');

  // Selected lesson/topic
  const [selectedTopicId, setSelectedTopicId] = useState<string>(GRAMMAR_ENCYCLOPEDIA[0].id);

  // 1. Pattern Discovery State
  const [pdIndex, setPdIndex] = useState(0);
  const [pdSelectedOption, setPdSelectedOption] = useState<number | null>(null);
  const [pdChecked, setPdChecked] = useState(false);
  const [pdCompletedIds, setPdCompletedIds] = useState<string[]>([]);

  // 2. Minimal Pair State
  const [mpIndex, setMpIndex] = useState(0);
  const [minedToast, setMinedToast] = useState<string | null>(null);

  // 3. Processing Instruction State
  const [piIndex, setPiIndex] = useState(0);
  const [piSelectedTiles, setPiSelectedTiles] = useState<string[]>([]);
  const [piChecked, setPiChecked] = useState(false);
  const [piIsCorrect, setPiIsCorrect] = useState(false);

  // 4. Syntax Repair 60s Game State
  const [srActive, setSrActive] = useState(false);
  const [srTimeLeft, setSrTimeLeft] = useState(60);
  const [srScore, setSrScore] = useState(0);
  const [srStreak, setSrStreak] = useState(0);
  const [srIndex, setSrIndex] = useState(0);
  const [srSelectedWord, setSrSelectedWord] = useState<string | null>(null);
  const [srChecked, setSrChecked] = useState(false);

  // Reference Encyclopedia Quiz State
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizChecked, setQuizChecked] = useState<boolean>(false);

  const selectedTopic = GRAMMAR_ENCYCLOPEDIA.find(t => t.id === selectedTopicId) || GRAMMAR_ENCYCLOPEDIA[0];

  // 9 StudySpanish Units Definition
  const STUDY_SPANISH_UNITS = [
    { number: 1, title: 'Foundations & Basics', desc_ar: 'الأساسيات والمبادئ الأولى' },
    { number: 2, title: 'Essential Sentences', desc_ar: 'الجمل الضرورية وبنية الكلام' },
    { number: 3, title: 'Present Tense Mastery', desc_ar: 'إتقان الفعل المضارع البسيط والذوق' },
    { number: 4, title: 'Object Pronouns', desc_ar: 'ضمائر المفعول المباشر وغير المباشر والمزدوج' },
    { number: 5, title: 'Narrative Past (Preterite)', desc_ar: 'الماضي البسيط للأحداث المكتملة' },
    { number: 6, title: 'Past Tenses II (Imperfect)', desc_ar: 'الماضي المستمر والوصف التاريخي' },
    { number: 7, title: 'Routine & Pronouns', desc_ar: 'الأفعال الانعكاسية والعلاقات الظرفية' },
    { number: 8, title: 'The Subjunctive Mood', desc_ar: 'صيغة المنصوب وتوجيه الأمنيات والشك' },
    { number: 9, title: 'Advanced Compound Tenses', desc_ar: 'الأزمنة المركبة والمستقبل والمبني للمجهول' }
  ];

  // Syntax Repair Game Timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (srActive && srTimeLeft > 0) {
      timer = setInterval(() => {
        setSrTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (srTimeLeft === 0 && srActive) {
      setSrActive(false);
      soundEffects.playLevelUp();
    }
    return () => clearInterval(timer);
  }, [srActive, srTimeLeft]);

  // Reset drill indexes when selected topic changes
  useEffect(() => {
    setPdIndex(0);
    setPdSelectedOption(null);
    setPdChecked(false);

    setMpIndex(0);

    setPiIndex(0);
    setPiSelectedTiles([]);
    setPiChecked(false);
    setPiIsCorrect(false);

    setSrIndex(0);
    setSrSelectedWord(null);
    setSrChecked(false);
    setSrActive(false);

    setQuizAnswers({});
    setQuizChecked(false);
  }, [selectedTopicId]);

  // Handle Mining Sentence from Minimal Pairs
  const handleMineSentence = (sentence_es: string, sentence_en: string, sentence_ar: string, note: string) => {
    soundEffects.playPop();
    const newMined: MinedSentence = {
      id: `mine-g-${Date.now()}`,
      targetWord: note,
      sentence_es,
      sentence_en,
      sentence_ar,
      sourceTitle: 'SLA Grammar Minimal Pair',
      dateMined: new Date().toISOString().split('T')[0],
      interval: 1,
      repetitions: 0,
      easeFactor: 2.5,
      nextReviewDate: new Date().toISOString().split('T')[0]
    };

    setUserProgress(prev => ({
      ...prev,
      minedSentences: [...(prev.minedSentences || []), newMined]
    }));

    setMinedToast(`Mined: "${sentence_es}"`);
    setTimeout(() => setMinedToast(null), 3000);
  };

  // Filter Drills dynamically based on selection
  const filteredPdItems = PATTERN_DISCOVERY_ITEMS.filter(item => item.topicId === selectedTopicId);
  const pdItemsToUse = filteredPdItems.length > 0 ? filteredPdItems : PATTERN_DISCOVERY_ITEMS;
  const currentPd = pdItemsToUse[pdIndex % pdItemsToUse.length] || pdItemsToUse[0];

  const filteredMpCards = MINIMAL_PAIR_CARDS.filter(item => item.topicId === selectedTopicId);
  const mpItemsToUse = filteredMpCards.length > 0 ? filteredMpCards : MINIMAL_PAIR_CARDS;
  const currentMpCard = mpItemsToUse[mpIndex % mpItemsToUse.length] || mpItemsToUse[0];

  const filteredPiDrills = PROCESSING_INSTRUCTION_DRILLS.filter(item => item.topicId === selectedTopicId);
  const piItemsToUse = filteredPiDrills.length > 0 ? filteredPiDrills : PROCESSING_INSTRUCTION_DRILLS;
  const currentPi = piItemsToUse[piIndex % piItemsToUse.length] || piItemsToUse[0];

  const filteredSrChallenges = SYNTAX_REPAIR_CHALLENGES.filter(item => item.topicId === selectedTopicId);
  const srItemsToUse = filteredSrChallenges.length > 0 ? filteredSrChallenges : SYNTAX_REPAIR_CHALLENGES;
  const currentSr = srItemsToUse[srIndex % srItemsToUse.length] || srItemsToUse[0];

  // Pattern Discovery Handlers
  const handleCheckPatternDiscovery = () => {
    if (pdSelectedOption === null || pdChecked) return;
    setPdChecked(true);

    const isRight = currentPd.options[pdSelectedOption].isCorrect;
    if (isRight) {
      soundEffects.playLevelUp();
      if (!pdCompletedIds.includes(currentPd.id)) {
        setPdCompletedIds(prev => [...prev, currentPd.id]);
        setUserProgress(prev => ({ ...prev, xp: prev.xp + 30 }));
      }
    } else {
      soundEffects.playIncorrect();
    }
  };

  const handleNextPatternDiscovery = () => {
    setPdSelectedOption(null);
    setPdChecked(false);
    setPdIndex((prev) => (prev + 1) % pdItemsToUse.length);
  };

  // Processing Instruction Drills Handlers
  const handleTileClick = (word: string) => {
    if (piChecked) return;
    soundEffects.playPop();
    if (piSelectedTiles.includes(word)) {
      setPiSelectedTiles(prev => prev.filter(w => w !== word));
    } else {
      setPiSelectedTiles(prev => [...prev, word]);
    }
  };

  const handleCheckPiSequence = () => {
    if (piChecked) return;
    setPiChecked(true);
    const userBuilt = piSelectedTiles.join(' ').replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").trim();
    const correctSeq = currentPi.correctSequence.join(' ').replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").trim();
    const isMatch = userBuilt.toLowerCase() === correctSeq.toLowerCase();
    setPiIsCorrect(isMatch);

    if (isMatch) {
      soundEffects.playLevelUp();
      setUserProgress(prev => ({ ...prev, xp: prev.xp + 25 }));
      speakSpanish(currentPi.audioPrompt_es);
    } else {
      soundEffects.playIncorrect();
    }
  };

  const handleNextPiDrill = () => {
    setPiSelectedTiles([]);
    setPiChecked(false);
    setPiIsCorrect(false);
    setPiIndex((prev) => (prev + 1) % piItemsToUse.length);
  };

  // Syntax Repair Game Handlers
  const handleStartSrGame = () => {
    setSrActive(true);
    setSrTimeLeft(60);
    setSrScore(0);
    setSrStreak(0);
    setSrIndex(0);
    setSrSelectedWord(null);
    setSrChecked(false);
  };

  const handleSelectSrWord = (word: string) => {
    if (srChecked) return;
    setSrSelectedWord(word);
    setSrChecked(true);

    if (word === currentSr.correctedWord) {
      soundEffects.playPop();
      setSrScore(prev => prev + 10 + srStreak * 2);
      setSrStreak(prev => prev + 1);
      setUserProgress(prev => ({ ...prev, xp: prev.xp + 5 }));
    } else {
      soundEffects.playIncorrect();
      setSrStreak(0);
    }
  };

  const handleNextSrChallenge = () => {
    setSrSelectedWord(null);
    setSrChecked(false);
    setSrIndex((prev) => (prev + 1) % srItemsToUse.length);
  };

  // Reference Quiz Handlers
  const handleSelectQuiz = (qIdx: number, optIdx: number) => {
    if (quizChecked) return;
    setQuizAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
  };

  const handleCheckQuiz = () => {
    setQuizChecked(true);
    let allRight = true;
    selectedTopic.quickQuiz.forEach((q, i) => {
      if (quizAnswers[i] !== q.answerIdx) allRight = false;
    });

    if (allRight) {
      soundEffects.playLevelUp();
      setUserProgress(prev => ({ ...prev, xp: prev.xp + 20 }));
    } else {
      soundEffects.playIncorrect();
    }
  };

  const handleResetQuiz = () => {
    setQuizAnswers({});
    setQuizChecked(false);
  };

  return (
    <div className="space-y-6">
      {/* SLA Header Banner */}
      <div className="bg-gradient-to-r from-stone-950 via-stone-900 to-amber-950 border border-stone-800 rounded-3xl p-5 sm:p-7 text-stone-100 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

        <div className="relative z-10 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-500 text-stone-950 font-mono tracking-wider uppercase shadow-xs">
              ⚡ SLA Science Powered
            </span>
            <span className="text-xs font-bold text-amber-300/90 font-arabic">
              تعلم القواعد الإسبانية عبر اكتشاف الأنماط والتفكير المعرفي
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight">
            StudySpanish Gamified Curriculum
          </h1>
          <p className="text-xs sm:text-sm text-stone-300 max-w-3xl font-arabic leading-relaxed">
            Move beyond static rote memorization. Master Spanish syntax using StudySpanish-aligned lessons, completely gamified through Pattern Discovery, Minimal Pairs, Processing Instruction, and Speed Challenges.
          </p>
        </div>
      </div>

      {/* Mode Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none border-b border-stone-200 dark:border-stone-800">
        <button
          onClick={() => setActiveTabMode('path')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-t-2xl text-xs font-black transition cursor-pointer shrink-0 ${
            activeTabMode === 'path'
              ? 'bg-amber-500 text-stone-950 shadow-md font-mono'
              : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>Curriculum Path</span>
        </button>

        <button
          onClick={() => setActiveTabMode('pattern_discovery')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-t-2xl text-xs font-black transition cursor-pointer shrink-0 ${
            activeTabMode === 'pattern_discovery'
              ? 'bg-amber-500 text-stone-950 shadow-md font-mono'
              : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
          }`}
        >
          <Brain className="w-4 h-4" />
          <span>Pattern Discovery</span>
        </button>

        <button
          onClick={() => setActiveTabMode('minimal_pairs')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-t-2xl text-xs font-black transition cursor-pointer shrink-0 ${
            activeTabMode === 'minimal_pairs'
              ? 'bg-amber-500 text-stone-950 shadow-md font-mono'
              : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Minimal Pairs</span>
        </button>

        <button
          onClick={() => setActiveTabMode('output_drills')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-t-2xl text-xs font-black transition cursor-pointer shrink-0 ${
            activeTabMode === 'output_drills'
              ? 'bg-amber-500 text-stone-950 shadow-md font-mono'
              : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>Output Drills</span>
        </button>

        <button
          onClick={() => setActiveTabMode('syntax_repair')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-t-2xl text-xs font-black transition cursor-pointer shrink-0 ${
            activeTabMode === 'syntax_repair'
              ? 'bg-amber-500 text-stone-950 shadow-md font-mono'
              : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
          }`}
        >
          <Flame className="w-4 h-4 text-orange-600" />
          <span>Speed Repair</span>
        </button>

        <button
          onClick={() => setActiveTabMode('encyclopedia')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-t-2xl text-xs font-black transition cursor-pointer shrink-0 ${
            activeTabMode === 'encyclopedia'
              ? 'bg-amber-500 text-stone-950 shadow-md font-mono'
              : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Rules & Quiz</span>
        </button>
      </div>

      {/* Mined Toast Notification */}
      <AnimatePresence>
        {minedToast && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white px-4 py-2.5 rounded-2xl shadow-xl text-xs font-extrabold flex items-center gap-2 border border-amber-500/40"
          >
            <PlusCircle className="w-4 h-4 text-amber-400" />
            <span>{minedToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ----------------- TAB: PATH (THE ULTIMATE GAMIFIED MAP) ----------------- */}
      {activeTabMode === 'path' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: 9 Units Path */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-stone-50 dark:bg-stone-900/40 border border-stone-200 dark:border-stone-800 rounded-3xl p-5 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-base font-black text-stone-900 dark:text-white flex items-center gap-2">
                  <ListOrdered className="w-4 h-4 text-amber-500" />
                  Spanish Grammar Roadmap (9 Units)
                </h3>
                <span className="text-xs font-black text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                  {GRAMMAR_ENCYCLOPEDIA.length} Lessons
                </span>
              </div>
              <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed font-arabic">
                تصفح الوحدات والدروس المستوحاة بالكامل من منهج StudySpanish الشهير، وافتح مسارات التدريب المعرفي لكل درس للحصول على النقاط وتثبيت القواعد.
              </p>
            </div>

            {/* Units Map */}
            <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1 scrollbar-thin">
              {STUDY_SPANISH_UNITS.map(unit => {
                const unitTopics = GRAMMAR_ENCYCLOPEDIA.filter(t => t.unit === unit.number);

                return (
                  <div
                    key={unit.number}
                    className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-4 sm:p-5 space-y-3 shadow-xs"
                  >
                    {/* Unit Title */}
                    <div className="flex justify-between items-start border-b border-stone-100 dark:border-stone-800 pb-2">
                      <div>
                        <span className="text-[10px] font-mono font-black uppercase text-amber-600 dark:text-amber-400">
                          Unit {unit.number}
                        </span>
                        <h4 className="text-base font-black text-stone-900 dark:text-white">
                          {unit.title}
                        </h4>
                      </div>
                      <span className="text-xs font-extrabold text-stone-400 font-arabic text-right">
                        {unit.desc_ar}
                      </span>
                    </div>

                    {/* Lessons list inside Unit */}
                    <div className="space-y-2">
                      {unitTopics.map(topic => {
                        const isSelected = topic.id === selectedTopicId;
                        return (
                          <button
                            key={topic.id}
                            onClick={() => {
                              soundEffects.playPop();
                              setSelectedTopicId(topic.id);
                            }}
                            className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 cursor-pointer ${
                              isSelected
                                ? 'bg-amber-500 text-stone-950 border-amber-400 shadow-sm font-bold'
                                : 'bg-stone-50/60 dark:bg-stone-800/40 text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 border-stone-200/80 dark:border-stone-800'
                            }`}
                          >
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2">
                                <span className={`px-1.5 py-0.5 rounded text-[9px] font-black uppercase ${
                                  isSelected ? 'bg-stone-950 text-white' : 'bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-stone-300'
                                }`}>
                                  {topic.cefr}
                                </span>
                                <span className="font-bold text-xs sm:text-sm line-clamp-1">
                                  {topic.title_es}
                                </span>
                              </div>
                              <p className={`text-xs mt-0.5 line-clamp-1 ${isSelected ? 'text-stone-800' : 'text-stone-500'}`}>
                                {topic.title_en}
                              </p>
                            </div>

                            <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${isSelected ? 'rotate-90 text-stone-950' : 'text-stone-400'}`} />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Quest Control Board */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-5 sm:p-6 shadow-sm space-y-6 sticky top-6">
              {/* Selected Lesson Header */}
              <div className="border-b border-stone-100 dark:border-stone-800 pb-4 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-black bg-amber-500 text-stone-950 uppercase">
                    UNIT {selectedTopic.unit} • {selectedTopic.cefr}
                  </span>
                  <span className="text-xs text-stone-400 font-mono">
                    {selectedTopic.category}
                  </span>
                </div>

                <h2 className="text-xl font-black text-stone-900 dark:text-white leading-tight">
                  {selectedTopic.title_es}
                </h2>
                <p className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                  🇬🇧 {selectedTopic.title_en}
                </p>
                <p className="text-xs font-bold text-amber-800 dark:text-amber-400 font-arabic text-right" dir="rtl">
                  {selectedTopic.title_ar}
                </p>
              </div>

              {/* Lesson Brief */}
              <div className="space-y-3">
                <div className="p-3.5 bg-stone-50 dark:bg-stone-800/50 rounded-2xl border border-stone-200 dark:border-stone-800 space-y-2">
                  <span className="text-[10px] font-mono font-black uppercase tracking-wider text-stone-400 block">
                    Lesson Concept:
                  </span>
                  <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                    {selectedTopic.summary_en}
                  </p>
                  <p className="text-xs font-bold text-amber-900 dark:text-amber-300 font-arabic text-right leading-relaxed" dir="rtl">
                    {selectedTopic.summary_ar}
                  </p>
                </div>

                {selectedTopic.formula && (
                  <div className="p-3.5 bg-amber-500/10 border border-amber-500/20 rounded-2xl space-y-1">
                    <span className="text-[10px] font-mono font-black uppercase text-amber-700 dark:text-amber-400 block">
                      🧠 Memory Anchor:
                    </span>
                    <p className="text-xs font-bold text-stone-900 dark:text-stone-100">
                      {selectedTopic.formula}
                    </p>
                  </div>
                )}
              </div>

              {/* 5 Cognitive Quests to Launch */}
              <div className="space-y-3">
                <span className="text-xs font-black uppercase tracking-wider text-stone-400 block">
                  Select Training Quest:
                </span>

                <div className="grid grid-cols-1 gap-2.5">
                  {/* Quest 1: Pattern Discovery */}
                  <button
                    onClick={() => {
                      soundEffects.playPop();
                      setActiveTabMode('pattern_discovery');
                    }}
                    className="w-full text-left p-3 rounded-2xl bg-gradient-to-r from-stone-50 to-stone-100/60 dark:from-stone-800/30 dark:to-stone-800/10 border border-stone-200 dark:border-stone-800 hover:border-amber-500/30 hover:scale-[1.01] transition flex items-center gap-3 cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center shrink-0">
                      <Brain className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex justify-between items-baseline">
                        <span className="text-xs font-black text-stone-900 dark:text-white">Pattern Discovery</span>
                        <span className="text-[9px] font-mono font-black text-amber-600 dark:text-amber-400">+30 XP</span>
                      </div>
                      <p className="text-[10px] text-stone-500 dark:text-stone-400 line-clamp-1">
                        Observe contrasting sentence patterns and notice syntax.
                      </p>
                    </div>
                  </button>

                  {/* Quest 2: Minimal Pair Contrast */}
                  <button
                    onClick={() => {
                      soundEffects.playPop();
                      setActiveTabMode('minimal_pairs');
                    }}
                    className="w-full text-left p-3 rounded-2xl bg-gradient-to-r from-stone-50 to-stone-100/60 dark:from-stone-800/30 dark:to-stone-800/10 border border-stone-200 dark:border-stone-800 hover:border-amber-500/30 hover:scale-[1.01] transition flex items-center gap-3 cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-xl bg-purple-500 text-white flex items-center justify-center shrink-0">
                      <Layers className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex justify-between items-baseline">
                        <span className="text-xs font-black text-stone-900 dark:text-white">Minimal Pair Matrix</span>
                        <span className="text-[9px] font-mono font-black text-purple-600 dark:text-purple-400">Contrast</span>
                      </div>
                      <p className="text-[10px] text-stone-500 dark:text-stone-400 line-clamp-1">
                        Compare subtle shifts of meaning side-by-side.
                      </p>
                    </div>
                  </button>

                  {/* Quest 3: Output Drills */}
                  <button
                    onClick={() => {
                      soundEffects.playPop();
                      setActiveTabMode('output_drills');
                    }}
                    className="w-full text-left p-3 rounded-2xl bg-gradient-to-r from-stone-50 to-stone-100/60 dark:from-stone-800/30 dark:to-stone-800/10 border border-stone-200 dark:border-stone-800 hover:border-amber-500/30 hover:scale-[1.01] transition flex items-center gap-3 cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0">
                      <Zap className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex justify-between items-baseline">
                        <span className="text-xs font-black text-stone-900 dark:text-white">Output Drills</span>
                        <span className="text-[9px] font-mono font-black text-emerald-600 dark:text-emerald-400">+25 XP</span>
                      </div>
                      <p className="text-[10px] text-stone-500 dark:text-stone-400 line-clamp-1">
                        Assemble tiles to form correct Spanish output.
                      </p>
                    </div>
                  </button>

                  {/* Quest 4: Speed Repair */}
                  <button
                    onClick={() => {
                      soundEffects.playPop();
                      setActiveTabMode('syntax_repair');
                    }}
                    className="w-full text-left p-3 rounded-2xl bg-gradient-to-r from-stone-50 to-stone-100/60 dark:from-stone-800/30 dark:to-stone-800/10 border border-stone-200 dark:border-stone-800 hover:border-amber-500/30 hover:scale-[1.01] transition flex items-center gap-3 cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center shrink-0">
                      <Flame className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex justify-between items-baseline">
                        <span className="text-xs font-black text-stone-900 dark:text-white">Speed Syntax Repair</span>
                        <span className="text-[9px] font-mono font-black text-orange-600 dark:text-orange-400">60s Sprint</span>
                      </div>
                      <p className="text-[10px] text-stone-500 dark:text-stone-400 line-clamp-1">
                        Race against the clock to spot and fix syntax mistakes.
                      </p>
                    </div>
                  </button>

                  {/* Quest 5: Rules & Quiz */}
                  <button
                    onClick={() => {
                      soundEffects.playPop();
                      setActiveTabMode('encyclopedia');
                    }}
                    className="w-full text-left p-3 rounded-2xl bg-gradient-to-r from-stone-50 to-stone-100/60 dark:from-stone-800/30 dark:to-stone-800/10 border border-stone-200 dark:border-stone-800 hover:border-amber-500/30 hover:scale-[1.01] transition flex items-center gap-3 cursor-pointer"
                  >
                    <div className="w-10 h-10 rounded-xl bg-blue-500 text-white flex items-center justify-center shrink-0">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex justify-between items-baseline">
                        <span className="text-xs font-black text-stone-900 dark:text-white">Rules Study & Quiz</span>
                        <span className="text-[9px] font-mono font-black text-blue-600 dark:text-blue-400">+20 XP</span>
                      </div>
                      <p className="text-[10px] text-stone-500 dark:text-stone-400 line-clamp-1">
                        Read bilingual deep dives and complete validation quizzes.
                      </p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ----------------- MODE 1: PATTERN DISCOVERY ENGINE ----------------- */}
      {activeTabMode === 'pattern_discovery' && (
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 dark:border-stone-800 pb-4">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-black uppercase bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
                  {currentPd.cefr} Level Pattern
                </span>
                <span className="text-xs text-stone-400 font-mono">
                  Module {pdIndex + 1} of {pdItemsToUse.length}
                </span>
                {filteredPdItems.length > 0 ? (
                  <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-green-500/10 text-green-600">Lesson Specific</span>
                ) : (
                  <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-stone-500/10 text-stone-500">General Practice</span>
                )}
              </div>
              <h2 className="text-xl font-black text-stone-900 dark:text-white mt-1 break-words">
                {currentPd.title}
              </h2>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setActiveTabMode('path')}
                className="px-3 py-1.5 rounded-xl border border-stone-200 dark:border-stone-800 text-xs font-bold text-stone-600 dark:text-stone-300 hover:bg-stone-50 cursor-pointer"
              >
                Back to Path
              </button>
              <button
                onClick={handleNextPatternDiscovery}
                className="shrink-0 px-3 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-200 text-xs font-bold transition cursor-pointer flex items-center gap-1.5"
              >
                <span>Next Pattern</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Contrasting Sentences */}
          <div className="space-y-3">
            <h3 className="text-xs font-black uppercase tracking-wider text-stone-500 dark:text-stone-400 font-arabic">
              1. Observe the Contrasting Sentence Patterns:
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentPd.sentences.map((sent, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-800 space-y-3 hover:border-amber-500/40 transition"
                >
                  <div className="flex justify-between items-start">
                    <button
                      onClick={() => speakSpanish(sent.es)}
                      className="text-left group flex items-start gap-1.5 cursor-pointer"
                    >
                      <span className="text-base font-black text-stone-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition">
                        🇪🇸 {sent.es}
                      </span>
                      <Volume2 className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                    </button>
                  </div>

                  <p className="text-xs text-stone-600 dark:text-stone-400 font-medium">
                    🇬🇧 {sent.en}
                  </p>
                  <p className="text-xs font-bold text-amber-800 dark:text-amber-400 font-arabic text-right" dir="rtl">
                    🇦🇪 {sent.ar}
                  </p>

                  {/* Syntax Tags */}
                  <div className="pt-2 border-t border-stone-200/60 dark:border-stone-700/60 space-y-1">
                    <span className="text-[10px] font-mono font-bold uppercase text-stone-400 block">
                      Syntax Analysis:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {sent.syntaxTags.map((st, sIdx) => (
                        <span
                          key={sIdx}
                          className={`px-2 py-0.5 rounded-lg text-[10px] font-bold ${st.color}`}
                        >
                          {st.word}: {st.tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Test Hypothesis */}
          <div className="p-5 rounded-2xl bg-amber-50/50 dark:bg-stone-800/40 border border-amber-200 dark:border-stone-800 space-y-4">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-amber-800 dark:text-amber-400 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4" />
                2. Test Your Cognitive Discovery Hypothesis:
              </span>
              <h4 className="text-base font-black text-stone-900 dark:text-white mt-1">
                {currentPd.question}
              </h4>
              <p className="text-xs font-bold text-amber-900 dark:text-amber-300 font-arabic mt-0.5" dir="rtl">
                {currentPd.question_ar}
              </p>
            </div>

            <div className="space-y-2">
              {currentPd.options.map((opt, oIdx) => {
                const isSelected = pdSelectedOption === oIdx;
                const isCorrect = opt.isCorrect;

                return (
                  <button
                    key={oIdx}
                    onClick={() => {
                      if (!pdChecked) setPdSelectedOption(oIdx);
                    }}
                    className={`w-full text-left p-3.5 rounded-xl text-xs font-extrabold border transition cursor-pointer ${
                      pdChecked
                        ? isCorrect
                          ? 'bg-emerald-500 text-stone-950 border-emerald-400 font-bold'
                          : isSelected
                          ? 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/30'
                          : 'bg-white dark:bg-stone-900 text-stone-500 border-stone-200 dark:border-stone-800'
                        : isSelected
                        ? 'bg-amber-500 text-stone-950 border-amber-400 shadow-sm'
                        : 'bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 border-stone-200 dark:border-stone-800'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span>{opt.text}</span>
                      <span className="font-arabic font-normal text-right shrink-0" dir="rtl">
                        {opt.text_ar}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-mono">
                <Sparkles className="w-3.5 h-3.5" />
                Reward: +30 XP upon discovery
              </span>

              <button
                onClick={handleCheckPatternDiscovery}
                disabled={pdSelectedOption === null || pdChecked}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-stone-900 dark:bg-amber-500 hover:bg-stone-800 dark:hover:bg-amber-400 disabled:opacity-40 text-white dark:text-stone-950 text-xs font-black shadow-md transition cursor-pointer"
              >
                Verify Hypothesis (+30 XP)
              </button>
            </div>

            {pdChecked && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 space-y-2 text-xs"
              >
                <div className="flex items-center gap-1.5 font-bold text-emerald-700 dark:text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>SLA Rule Revealed:</span>
                </div>
                <p className="text-stone-800 dark:text-stone-200 font-medium">
                  {currentPd.ruleExplanation_en}
                </p>
                <p className="text-amber-900 dark:text-amber-300 font-arabic text-right font-bold" dir="rtl">
                  {currentPd.ruleExplanation_ar}
                </p>
              </motion.div>
            )}
          </div>
        </div>
      )}

      {/* ----------------- MODE 2: MINIMAL PAIR MATRIX ----------------- */}
      {activeTabMode === 'minimal_pairs' && (
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 dark:border-stone-800 pb-4">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-black uppercase bg-purple-500/10 text-purple-700 dark:text-purple-400 border border-purple-500/20">
                  Side-by-Side Meaning Shifts
                </span>
                {filteredMpCards.length > 0 ? (
                  <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-green-500/10 text-green-600">Lesson Specific</span>
                ) : (
                  <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-stone-500/10 text-stone-500">General Practice</span>
                )}
              </div>
              <h2 className="text-xl font-black text-stone-900 dark:text-white mt-1 break-words">
                Minimal Pair Contrast Matrix
              </h2>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setActiveTabMode('path')}
                className="px-3 py-1.5 rounded-xl border border-stone-200 dark:border-stone-800 text-xs font-bold text-stone-600 dark:text-stone-300 hover:bg-stone-50 cursor-pointer"
              >
                Back to Path
              </button>
              <div className="flex flex-wrap items-center gap-1">
                {mpItemsToUse.map((card, idx) => (
                  <button
                    key={card.id}
                    onClick={() => setMpIndex(idx)}
                    className={`w-8 h-8 rounded-xl font-mono text-xs font-black transition cursor-pointer ${
                      mpIndex === idx
                        ? 'bg-amber-500 text-stone-950 shadow-sm'
                        : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400'
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Active Card Matrix */}
          <div className="space-y-6">
            <div className="text-center space-y-1">
              <span className="text-xs font-bold text-stone-400 uppercase tracking-widest font-mono">
                Topic Focus: {currentMpCard.topic} • {currentMpCard.cefr}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Option A */}
              <div className="p-5 rounded-3xl bg-gradient-to-br from-blue-500/5 to-indigo-500/5 border-2 border-blue-500/30 dark:border-blue-500/20 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono font-black bg-blue-500 text-white uppercase">
                    {currentMpCard.optionA.grammarTag}
                  </span>
                  <span className="text-xs font-extrabold text-blue-600 dark:text-blue-400">
                    Nuance: {currentMpCard.optionA.nuance}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-black text-stone-900 dark:text-white">
                      🇪🇸 {currentMpCard.optionA.es}
                    </h3>
                    <button
                      onClick={() => speakSpanish(currentMpCard.optionA.es)}
                      className="p-2 rounded-xl bg-blue-500/10 hover:bg-blue-500 text-blue-600 hover:text-white transition cursor-pointer"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-xs text-stone-700 dark:text-stone-300 font-semibold">
                    🇬🇧 {currentMpCard.optionA.en}
                  </p>
                  <p className="text-xs font-bold text-amber-800 dark:text-amber-400 font-arabic text-right" dir="rtl">
                    🇦🇪 {currentMpCard.optionA.ar}
                  </p>
                </div>

                <button
                  onClick={() =>
                    handleMineSentence(
                      currentMpCard.optionA.es,
                      currentMpCard.optionA.en,
                      currentMpCard.optionA.ar,
                      currentMpCard.optionA.grammarTag
                    )
                  }
                  className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-blue-500/10 hover:bg-blue-500 text-blue-700 hover:text-white dark:text-blue-300 text-xs font-extrabold transition cursor-pointer"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Mine Sentence to SRS</span>
                </button>
              </div>

              {/* Option B */}
              <div className="p-5 rounded-3xl bg-gradient-to-br from-amber-500/5 to-orange-500/5 border-2 border-amber-500/30 dark:border-amber-500/20 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono font-black bg-amber-500 text-stone-950 uppercase">
                    {currentMpCard.optionB.grammarTag}
                  </span>
                  <span className="text-xs font-extrabold text-amber-600 dark:text-amber-400">
                    Nuance: {currentMpCard.optionB.nuance}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-black text-stone-900 dark:text-white">
                      🇪🇸 {currentMpCard.optionB.es}
                    </h3>
                    <button
                      onClick={() => speakSpanish(currentMpCard.optionB.es)}
                      className="p-2 rounded-xl bg-amber-500/10 hover:bg-amber-500 text-amber-700 hover:text-stone-950 transition cursor-pointer"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-xs text-stone-700 dark:text-stone-300 font-semibold">
                    🇬🇧 {currentMpCard.optionB.en}
                  </p>
                  <p className="text-xs font-bold text-amber-800 dark:text-amber-400 font-arabic text-right" dir="rtl">
                    🇦🇪 {currentMpCard.optionB.ar}
                  </p>
                </div>

                <button
                  onClick={() =>
                    handleMineSentence(
                      currentMpCard.optionB.es,
                      currentMpCard.optionB.en,
                      currentMpCard.optionB.ar,
                      currentMpCard.optionB.grammarTag
                    )
                  }
                  className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-amber-500/10 hover:bg-amber-500 text-amber-700 hover:text-stone-950 dark:text-amber-300 text-xs font-extrabold transition cursor-pointer"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Mine Sentence to SRS</span>
                </button>
              </div>
            </div>

            {/* Key Takeaway Banner */}
            <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 space-y-1">
              <span className="text-[10px] font-mono font-bold uppercase text-stone-400 block">
                💡 Key Cognitive Takeaway:
              </span>
              <p className="text-xs font-bold text-stone-900 dark:text-stone-100">
                {currentMpCard.keyTakeaway_en}
              </p>
              <p className="text-xs font-extrabold text-amber-800 dark:text-amber-400 font-arabic text-right" dir="rtl">
                {currentMpCard.keyTakeaway_ar}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ----------------- MODE 3: OUTPUT-PROMPTING DRILLS ----------------- */}
      {activeTabMode === 'output_drills' && (
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 dark:border-stone-800 pb-4">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-black uppercase bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                  Processing Instruction Engine
                </span>
                {filteredPiDrills.length > 0 ? (
                  <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-green-500/10 text-green-600">Lesson Specific</span>
                ) : (
                  <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-stone-500/10 text-stone-500">General Practice</span>
                )}
              </div>
              <h2 className="text-xl font-black text-stone-900 dark:text-white mt-1 break-words">
                Construct Target Spanish Output
              </h2>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setActiveTabMode('path')}
                className="px-3 py-1.5 rounded-xl border border-stone-200 dark:border-stone-800 text-xs font-bold text-stone-600 dark:text-stone-300 hover:bg-stone-50 cursor-pointer"
              >
                Back to Path
              </button>
              <button
                onClick={handleNextPiDrill}
                className="shrink-0 px-3 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-700 dark:text-stone-300 text-xs font-bold transition cursor-pointer flex items-center gap-1"
              >
                <span>Next Drill</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="space-y-5">
            {/* Target Meaning & Audio Cue */}
            <div className="p-5 rounded-2xl bg-amber-50/50 dark:bg-stone-800/50 border border-amber-200 dark:border-stone-800 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-amber-800 dark:text-amber-400 uppercase tracking-wider font-mono">
                  Focus: {currentPi.grammarMarkerFocus}
                </span>

                <button
                  onClick={() => speakSpanish(currentPi.audioPrompt_es)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 text-stone-950 text-xs font-black shadow-xs hover:bg-amber-400 transition cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Listen Audio</span>
                </button>
              </div>

              <div>
                <span className="text-[10px] text-stone-400 uppercase font-mono block">Target Meaning:</span>
                <p className="text-base font-black text-stone-900 dark:text-white">
                  🇬🇧 {currentPi.targetTranslation_en}
                </p>
                <p className="text-sm font-bold text-amber-900 dark:text-amber-300 font-arabic text-right mt-1" dir="rtl">
                  🇦🇪 {currentPi.targetTranslation_ar}
                </p>
              </div>
            </div>

            {/* Selected Word Tiles Construction Board */}
            <div className="space-y-2">
              <span className="text-xs font-black uppercase text-stone-400 font-mono block">
                Your Constructed Spanish Sentence:
              </span>

              <div className="min-h-[56px] p-3 rounded-2xl bg-stone-100 dark:bg-stone-800/80 border-2 border-dashed border-stone-300 dark:border-stone-700 flex flex-wrap gap-2 items-center">
                {piSelectedTiles.length === 0 ? (
                  <span className="text-xs text-stone-400 italic">
                    Tap word tiles below to construct sentence...
                  </span>
                ) : (
                  piSelectedTiles.map((tile, tIdx) => (
                    <motion.button
                      key={tIdx}
                      layout
                      onClick={() => handleTileClick(tile)}
                      className="px-3 py-1.5 rounded-xl bg-stone-900 dark:bg-amber-500 text-white dark:text-stone-950 text-xs font-black shadow-xs cursor-pointer"
                    >
                      {tile}
                    </motion.button>
                  ))
                )}
              </div>
            </div>

            {/* Available Word Tiles Bank */}
            <div className="space-y-2">
              <span className="text-xs font-black uppercase text-stone-400 font-mono block">
                Available Word Tiles:
              </span>

              <div className="flex flex-wrap gap-2">
                {currentPi.wordTiles.map((tile, wIdx) => {
                  const isSelected = piSelectedTiles.includes(tile);
                  return (
                    <button
                      key={wIdx}
                      onClick={() => handleTileClick(tile)}
                      disabled={isSelected || piChecked}
                      className={`px-3.5 py-2 rounded-xl text-xs font-extrabold border transition cursor-pointer ${
                        isSelected
                          ? 'opacity-30 bg-stone-200 dark:bg-stone-800 border-transparent'
                          : 'bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 border-stone-200 dark:border-stone-800 shadow-xs'
                      }`}
                    >
                      {tile}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Check Button & Explanation */}
            <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex justify-between items-center">
              <button
                onClick={() => setPiSelectedTiles([])}
                className="text-xs font-bold text-stone-500 hover:text-stone-800 cursor-pointer"
              >
                Clear Sequence
              </button>

              <button
                onClick={handleCheckPiSequence}
                disabled={piSelectedTiles.length === 0 || piChecked}
                className="px-5 py-2.5 rounded-xl bg-stone-900 dark:bg-amber-500 hover:bg-stone-800 dark:hover:bg-amber-400 text-white dark:text-stone-950 text-xs font-black shadow-md disabled:opacity-40 transition cursor-pointer"
              >
                Check Sentence (+25 XP)
              </button>
            </div>

            {piChecked && (
              <div
                className={`p-4 rounded-2xl border text-xs space-y-1 ${
                  piIsCorrect
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-800 dark:text-emerald-300'
                    : 'bg-red-500/10 border-red-500/30 text-red-800 dark:text-red-300'
                }`}
              >
                <div className="font-black flex items-center gap-1.5">
                  {piIsCorrect ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                  <span>{piIsCorrect ? 'Perfect Syntax Match!' : 'Incorrect Word Sequence'}</span>
                </div>
                <p className="font-medium text-stone-800 dark:text-stone-200">
                  💡 {currentPi.explanation}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ----------------- MODE 4: 60-SECOND SYNTAX REPAIR SPEED GAME ----------------- */}
      {activeTabMode === 'syntax_repair' && (
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 dark:border-stone-800 pb-4">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-black uppercase bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20">
                  Real-Time Error Correction Game
                </span>
                {filteredSrChallenges.length > 0 ? (
                  <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-green-500/10 text-green-600">Lesson Specific</span>
                ) : (
                  <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-stone-500/10 text-stone-500">General Practice</span>
                )}
              </div>
              <h2 className="text-xl font-black text-stone-900 dark:text-white mt-1 break-words">
                60-Second Syntax Repair Challenge
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                onClick={() => {
                  setSrActive(false);
                  setActiveTabMode('path');
                }}
                className="px-3 py-1.5 rounded-xl border border-stone-200 dark:border-stone-800 text-xs font-bold text-stone-600 dark:text-stone-300 hover:bg-stone-50 cursor-pointer"
              >
                Back to Path
              </button>

              <div className="flex items-center gap-1 px-3 py-1 rounded-xl bg-orange-500/10 text-orange-600 font-mono text-xs font-black">
                <Clock className="w-3.5 h-3.5" />
                <span>{srTimeLeft}s</span>
              </div>

              <div className="flex items-center gap-1 px-3 py-1 rounded-xl bg-amber-500 text-stone-950 font-mono text-xs font-black">
                <Award className="w-3.5 h-3.5" />
                <span>{srScore} PTS</span>
              </div>
            </div>
          </div>

          {!srActive ? (
            <div className="text-center py-8 space-y-4 max-w-md mx-auto">
              <div className="w-16 h-16 rounded-3xl bg-orange-500/10 text-orange-500 flex items-center justify-center mx-auto">
                <Flame className="w-8 h-8 fill-orange-500 animate-bounce" />
              </div>

              <h3 className="text-2xl font-black text-stone-900 dark:text-white">
                Spot & Repair Non-Native Learner Traps
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400">
                You have 60 seconds to identify grammatical errors in broken Spanish sentences and tap the correct replacement pill!
              </p>

              <button
                onClick={handleStartSrGame}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-stone-950 font-black text-sm shadow-lg hover:scale-105 transition cursor-pointer flex items-center gap-2 mx-auto"
              >
                <Play className="w-4 h-4 fill-stone-950" />
                <span>Start 60s Challenge</span>
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Broken Sentence Display */}
              <div className="p-5 rounded-2xl bg-red-50/50 dark:bg-stone-800/50 border-2 border-red-500/30 dark:border-red-500/20 space-y-3">
                <span className="text-[10px] font-mono font-black uppercase text-red-600 dark:text-red-400 block">
                  🚨 Broken Spanish Sentence (Contains Error):
                </span>

                <h3 className="text-xl font-black text-stone-900 dark:text-white">
                  {currentSr.brokenSentence}
                </h3>

                <p className="text-xs font-semibold text-stone-600 dark:text-stone-400">
                  🇬🇧 Meaning: {currentSr.translation_en}
                </p>
                <p className="text-xs font-bold text-amber-800 dark:text-amber-400 font-arabic text-right" dir="rtl">
                  🇦🇪 المعنى: {currentSr.translation_ar}
                </p>
              </div>

              {/* Word Tile Options */}
              <div className="space-y-2">
                <span className="text-xs font-black uppercase text-stone-400 font-mono block">
                  Select Correct Word Replacement:
                </span>

                <div className="grid grid-cols-2 gap-3">
                  {currentSr.wordTiles.map((tile, wIdx) => {
                    const isSelected = srSelectedWord === tile;
                    const isRight = tile === currentSr.correctedWord;

                    return (
                      <button
                        key={wIdx}
                        onClick={() => handleSelectSrWord(tile)}
                        disabled={srChecked}
                        className={`p-3.5 rounded-2xl text-xs font-black border transition cursor-pointer ${
                          srChecked
                            ? isRight
                              ? 'bg-emerald-500 text-stone-950 border-emerald-400 shadow-sm'
                              : isSelected
                              ? 'bg-red-500 text-white border-red-400'
                              : 'bg-stone-100 dark:bg-stone-800 text-stone-400'
                            : 'bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 border-stone-200 dark:border-stone-800 shadow-xs'
                        }`}
                      >
                        {tile}
                      </button>
                    );
                  })}
                </div>
              </div>

              {srChecked && (
                <div className="space-y-3 pt-2">
                  <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs space-y-1">
                    <p className="font-bold text-emerald-600 dark:text-emerald-400">
                      ✅ Correct Sentence: {currentSr.correctSentence}
                    </p>
                    <p className="text-stone-700 dark:text-stone-300 font-medium">
                      🇬🇧 {currentSr.explanation_en}
                    </p>
                    <p className="text-amber-900 dark:text-amber-300 font-arabic text-right font-bold" dir="rtl">
                      🇦🇪 {currentSr.explanation_ar}
                    </p>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={handleNextSrChallenge}
                      className="px-4 py-2 rounded-xl bg-stone-900 dark:bg-amber-500 text-white dark:text-stone-950 text-xs font-black shadow-sm cursor-pointer"
                    >
                      Next Sentence
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ----------------- MODE 5: RULES REFERENCE & QUIZ ----------------- */}
      {activeTabMode === 'encyclopedia' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Topic Sidebar */}
          <div className="lg:col-span-4 space-y-2">
            <div className="flex justify-between items-baseline px-1">
              <span className="text-xs font-bold text-stone-400 uppercase tracking-wider block">
                Select Lesson Topic
              </span>
              <button
                onClick={() => setActiveTabMode('path')}
                className="text-xs font-bold text-amber-500 hover:underline"
              >
                Back to Path
              </button>
            </div>
            <div className="space-y-1.5 max-h-[60vh] overflow-y-auto pr-1">
              {GRAMMAR_ENCYCLOPEDIA.map((topic) => {
                const isSelected = topic.id === selectedTopicId;
                return (
                  <button
                    key={topic.id}
                    onClick={() => {
                      setSelectedTopicId(topic.id);
                      handleResetQuiz();
                    }}
                    className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-stone-900 text-white border-stone-900 shadow-sm'
                        : 'bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-800 border-stone-200 dark:border-stone-800'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                        isSelected ? 'bg-amber-400 text-stone-950' : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300'
                      }`}>
                        U{topic.unit}
                      </span>
                      <span className="font-bold text-xs line-clamp-1">
                        {topic.title_es}
                      </span>
                    </div>
                    <p className={`text-[10px] mt-0.5 line-clamp-1 ${isSelected ? 'text-stone-300' : 'text-stone-500'}`}>
                      {topic.title_en}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Detail Content */}
          <div className="lg:col-span-8 space-y-5">
            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 shadow-sm space-y-6">
              {/* Header */}
              <div className="border-b border-stone-100 dark:border-stone-800 pb-4">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-black bg-amber-100 dark:bg-stone-800 text-amber-800 dark:text-amber-400 uppercase">
                    UNIT {selectedTopic.unit} • {selectedTopic.cefr} • {selectedTopic.category}
                  </span>
                </div>
                <h2 className="text-2xl font-black text-stone-900 dark:text-white mt-2">
                  {selectedTopic.title_es}
                </h2>
                <p className="text-sm font-semibold text-stone-600 dark:text-stone-400 mt-0.5">
                  🇬🇧 {selectedTopic.title_en}
                </p>
                <p className="text-sm font-bold text-amber-800 dark:text-amber-400 font-arabic mt-0.5 text-right" dir="rtl">
                  🇦🇪 {selectedTopic.title_ar}
                </p>

                {selectedTopic.formula && (
                  <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded-2xl">
                    <span className="text-[11px] font-extrabold text-amber-900 dark:text-amber-400 uppercase tracking-wider block mb-1">
                      🧠 Memory Formula & Rule Blueprint:
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-stone-900 dark:text-stone-100">
                      {selectedTopic.formula}
                    </p>
                  </div>
                )}
              </div>

              {/* Bilingual Content Sections */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* English Explanation */}
                <div className="bg-stone-50/70 dark:bg-stone-800/50 p-4 rounded-xl border border-stone-200/80 dark:border-stone-800 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-stone-700 dark:text-stone-300" />
                    English Deep Dive
                  </span>
                  <div className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed whitespace-pre-line">
                    {selectedTopic.fullContent_en}
                  </div>
                </div>

                {/* Arabic Explanation */}
                <div className="bg-amber-50/40 dark:bg-stone-800/30 p-4 rounded-xl border border-amber-200/60 dark:border-stone-800 space-y-2 text-right" dir="rtl">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400 flex items-center gap-1.5 justify-end font-arabic">
                    <GraduationCap className="w-4 h-4 text-amber-700 dark:text-amber-400" />
                    الشرح التفصيلي بالعربية
                  </span>
                  <div className="text-xs sm:text-sm text-stone-800 dark:text-stone-200 leading-relaxed whitespace-pre-line font-arabic">
                    {selectedTopic.fullContent_ar}
                  </div>
                </div>
              </div>

              {/* Examples */}
              <div className="space-y-3 pt-4 border-t border-stone-100 dark:border-stone-800">
                <span className="text-xs font-black uppercase tracking-wider text-stone-400 block">
                  Illustrative Sentence Patterns:
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedTopic.examples.map((ex, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-800 rounded-xl space-y-1"
                    >
                      <button
                        onClick={() => speakSpanish(ex.es)}
                        className="text-left font-bold text-xs sm:text-sm text-stone-900 dark:text-white flex items-center gap-1 hover:text-amber-500 transition cursor-pointer"
                      >
                        <span>🇪🇸 {ex.es}</span>
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                      <p className="text-[11px] text-stone-500">{ex.en}</p>
                      <p className="text-[11px] font-bold text-amber-700 dark:text-amber-400 font-arabic text-right" dir="rtl">{ex.ar}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Common Mistakes */}
              {selectedTopic.commonMistakes && selectedTopic.commonMistakes.length > 0 && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl space-y-3">
                  <span className="text-xs font-black uppercase tracking-wider text-red-600 dark:text-red-400 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" />
                    Common Learner Mistakes (احذر هذه الأخطاء):
                  </span>
                  <div className="space-y-3">
                    {selectedTopic.commonMistakes.map((mistake, idx) => (
                      <div key={idx} className="space-y-1 text-xs">
                        <p className="text-red-500 line-through">❌ {mistake.incorrect}</p>
                        <p className="text-emerald-600 font-bold">✅ {mistake.correct}</p>
                        <p className="text-stone-600 dark:text-stone-300 text-[11px] mt-0.5">
                          💡 {mistake.reason_en} • <span className="font-arabic" dir="rtl">{mistake.reason_ar}</span>
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick Practice Quiz */}
              {selectedTopic.quickQuiz && selectedTopic.quickQuiz.length > 0 && (
                <div className="pt-4 border-t border-stone-100 dark:border-stone-800 space-y-4">
                  <h3 className="text-base font-black text-stone-900 dark:text-white flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                    Test Your Grammar Rule (اختبار سريع للقاعدة)
                  </h3>

                  <div className="space-y-3">
                    {selectedTopic.quickQuiz.map((q, qIdx) => {
                      const userAns = quizAnswers[qIdx];
                      return (
                        <div key={qIdx} className="p-4 bg-stone-50 dark:bg-stone-800/50 rounded-xl border border-stone-200 dark:border-stone-800 space-y-2">
                          <p className="text-sm font-bold text-stone-900 dark:text-white">
                            {qIdx + 1}. {q.question_es}
                          </p>
                          <p className="text-xs text-stone-500">
                            {q.question_en} • <span className="font-arabic" dir="rtl">{q.question_ar}</span>
                          </p>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                            {q.options.map((opt, optIdx) => {
                              const isSelected = userAns === optIdx;
                              const isCorrect = q.answerIdx === optIdx;
                              return (
                                <button
                                  key={optIdx}
                                  onClick={() => handleSelectQuiz(qIdx, optIdx)}
                                  className={`text-left p-2.5 rounded-lg text-xs font-semibold border transition cursor-pointer ${
                                    quizChecked
                                      ? isCorrect
                                        ? 'bg-emerald-100 dark:bg-emerald-900/50 border-emerald-400 text-emerald-900 dark:text-emerald-200 font-bold'
                                        : isSelected
                                        ? 'bg-red-100 dark:bg-red-900/50 border-red-400 text-red-900 dark:text-red-200'
                                        : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-stone-500'
                                      : isSelected
                                      ? 'bg-amber-100 dark:bg-amber-900/50 border-amber-400 text-amber-900 dark:text-amber-200'
                                      : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                                  }`}
                                >
                                  {opt}
                                </button>
                              );
                            })}
                          </div>

                          {quizChecked && (
                            <p className="text-xs text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 p-2 rounded border border-emerald-200 dark:border-emerald-800 mt-2">
                              💡 {q.explanation_en} ({q.explanation_ar})
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex justify-end gap-2">
                    <button
                      onClick={handleResetQuiz}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white cursor-pointer"
                    >
                      Reset
                    </button>
                    <button
                      onClick={handleCheckQuiz}
                      disabled={quizChecked || Object.keys(quizAnswers).length < selectedTopic.quickQuiz.length}
                      className="px-4 py-2 bg-stone-900 dark:bg-amber-500 hover:bg-stone-800 dark:hover:bg-amber-400 disabled:opacity-50 text-white dark:text-stone-950 rounded-xl text-xs font-bold shadow-sm transition cursor-pointer"
                    >
                      Check Answers (+20 XP)
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
