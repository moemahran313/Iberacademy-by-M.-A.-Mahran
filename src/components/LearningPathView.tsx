import React, { useState, useMemo } from 'react';
import {
  Compass,
  CheckCircle,
  Lock,
  Play,
  Sparkles,
  BookOpen,
  Award,
  ChevronRight,
  HelpCircle,
  Trophy,
  Star,
  Zap,
  Flame,
  Layers,
  MapPin,
  CheckCircle2,
  LockKeyhole,
  Check,
  Volume2,
  MessageSquare,
  Target,
  RotateCw,
  X,
  Lightbulb
} from 'lucide-react';
import { Unit, Lesson, CEFRLevel, UserProgress, ImportedContent } from '../types';
import { CURRICULUM_UNITS, HIGH_UTILITY_LEARNING_PATH } from '../data';
import { A0_BEGINNER_UNITS } from '../data/a0BeginnerFoundation';
import { speakSpanish, soundEffects } from '../utils/audio';
import { LessonModal } from './LessonModal';
import { EndOfLevelAssessmentModal } from './EndOfLevelAssessmentModal';
import { RecommendedReadingModule } from './RecommendedReadingModule';

interface LearningPathViewProps {
  userProgress: UserProgress;
  setUserProgress: React.Dispatch<React.SetStateAction<UserProgress>>;
  onOpenPlacementTest: () => void;
  onOpenStory?: (content: ImportedContent) => void;
  onLessonCompleted?: (lessonId: string) => void;
}

export const LearningPathView: React.FC<LearningPathViewProps> = ({
  userProgress,
  setUserProgress,
  onOpenPlacementTest,
  onOpenStory,
  onLessonCompleted
}) => {
  const [selectedLevel, setSelectedLevel] = useState<CEFRLevel>(userProgress.currentLevel || 'A1');
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [pathMode, setPathMode] = useState<'scenarios' | 'a0' | 'linear' | 'grid'>('scenarios');
  const [isAssessmentModalOpen, setIsAssessmentModalOpen] = useState<boolean>(false);
  const [assessmentLevel, setAssessmentLevel] = useState<CEFRLevel>('A1');

  // Interactive Drill Answers state for Scenarios
  const [scenarioDrillState, setScenarioDrillState] = useState<Record<string, { selected: string; isCorrect: boolean }>>({});
  const [activeA0UnitIndex, setActiveA0UnitIndex] = useState<number>(0);
  const [a0DrillAnswers, setA0DrillAnswers] = useState<Record<string, { selected: string; isCorrect: boolean }>>({});

  const levels: { id: CEFRLevel; title_en: string; title_ar: string; desc: string; color: string; badge: string; prevLevel: CEFRLevel | null; nextLevel: CEFRLevel | null }[] = [
    { id: 'A1', title_en: 'Absolute Beginner', title_ar: 'المبتدئ الأساسي', desc: 'Greetings, survival Spanish, present tense, gender & articles', color: 'from-amber-500 to-orange-600', badge: '🌱 A1 Survival', prevLevel: null, nextLevel: 'A2' },
    { id: 'A2', title_en: 'Elementary Explorer', title_ar: 'المستكشف الأولي', desc: 'Past tenses (indefinido vs imperfecto), prepositions, routines', color: 'from-emerald-500 to-teal-600', badge: '🚀 A2 Explorer', prevLevel: 'A1', nextLevel: 'B1' },
    { id: 'B1', title_en: 'Intermediate Conversationalist', title_ar: 'المتحدث المتوسط', desc: 'Subjunctive mood, hypotheticals, opinions & reported speech', color: 'from-sky-500 to-blue-600', badge: '💬 B1 Fluent', prevLevel: 'A2', nextLevel: 'B2' },
    { id: 'B2', title_en: 'Advanced Fluency & Nuance', title_ar: 'الطلاقة المتقدمة', desc: 'Debates, formal discourse, complex idioms & cultural mastery', color: 'from-purple-500 to-indigo-600', badge: '👑 B2 Master', prevLevel: 'B1', nextLevel: null }
  ];

  // Helper to check if a CEFR level is unlocked
  const isLevelUnlocked = (lvl: CEFRLevel): boolean => {
    if (lvl === 'A1') return true;
    const unlocked = userProgress.unlockedLevels || ['A1'];
    if (unlocked.includes(lvl)) return true;

    // Check if previous level was passed via exam or all lessons done
    const prevLvl: CEFRLevel = lvl === 'A2' ? 'A1' : lvl === 'B1' ? 'A2' : 'B1';
    if (userProgress.passedLevelExamIds?.includes(prevLvl)) return true;

    const prevUnits = CURRICULUM_UNITS.filter(u => u.level === prevLvl);
    const prevLessons = prevUnits.flatMap(u => u.lessons);
    const allPrevCompleted = prevLessons.length > 0 && prevLessons.every(l => userProgress.completedLessonIds.includes(l.id));

    return allPrevCompleted;
  };

  const handleOpenAssessment = (lvl: CEFRLevel) => {
    setAssessmentLevel(lvl);
    setIsAssessmentModalOpen(true);
  };

  const isCurrentLevelLocked = !isLevelUnlocked(selectedLevel);
  const currentLvlConfig = levels.find(l => l.id === selectedLevel) || levels[0];

  const currentUnits = useMemo(() => {
    return CURRICULUM_UNITS.filter(u => u.level === selectedLevel);
  }, [selectedLevel]);

  // Find the immediate next incomplete lesson
  const nextLessonToComplete = useMemo(() => {
    for (const unit of CURRICULUM_UNITS) {
      for (const lesson of unit.lessons) {
        if (!userProgress.completedLessonIds.includes(lesson.id)) {
          return { unit, lesson };
        }
      }
    }
    return { unit: CURRICULUM_UNITS[0], lesson: CURRICULUM_UNITS[0].lessons[0] };
  }, [userProgress.completedLessonIds]);

  const totalLessonsInCurriculum = useMemo(() => {
    return CURRICULUM_UNITS.reduce((acc, u) => acc + u.lessons.length, 0);
  }, []);

  const totalCompleted = userProgress.completedLessonIds.length;
  const progressPercentage = Math.round((totalCompleted / Math.max(totalLessonsInCurriculum, 1)) * 100);

  // Linear node determination
  // A lesson is unlocked if it's the very first lesson, or if the previous lesson was completed
  const isLessonUnlocked = (lessonIndexInAll: number, allLessonsList: Lesson[]) => {
    if (lessonIndexInAll === 0) return true;
    const prevLesson = allLessonsList[lessonIndexInAll - 1];
    return userProgress.completedLessonIds.includes(prevLesson.id);
  };

  const allLessonsInLevel = useMemo(() => {
    const list: { lesson: Lesson; unit: Unit; globalIndex: number }[] = [];
    let idx = 0;
    currentUnits.forEach(u => {
      u.lessons.forEach(l => {
        list.push({ lesson: l, unit: u, globalIndex: idx });
        idx++;
      });
    });
    return list;
  }, [currentUnits]);

  return (
    <div className="space-y-6 text-stone-900 dark:text-stone-100">
      {/* Top App-like HUD Banner */}
      <div className="bg-stone-900 border border-stone-800 rounded-3xl p-5 sm:p-6 text-stone-100 shadow-md">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-5">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-500 text-stone-950 shadow-xs">
                Linear Skill Roadmap • Duolingo Style
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-stone-800 text-amber-300 border border-stone-700">
                Bloom's Mastery Learning (≥80% Pass)
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <span>Spanish Mastery Pathway (مسار إتقان الإسبانية)</span>
            </h1>
            <p className="text-sm text-stone-300 mt-1 max-w-2xl leading-relaxed">
              Step-by-step linear progression from A1 survival basics to B2 native fluency. Every unit includes multimodal flashcards, authentic dialogues, grammar blueprints, and mastery checkpoint quizzes.
            </p>
          </div>

          {/* Top Stats HUD & Placement Test */}
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            <div className="flex items-center gap-3 bg-stone-800/80 border border-stone-700 px-4 py-2.5 rounded-2xl">
              <div className="flex items-center gap-1.5 text-amber-400 font-extrabold text-xs sm:text-sm">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>{userProgress.xp} XP</span>
              </div>
              <div className="w-px h-4 bg-stone-700" />
              <div className="flex items-center gap-1.5 text-orange-400 font-extrabold text-xs sm:text-sm">
                <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
                <span>{userProgress.streakDays} Day Streak</span>
              </div>
            </div>

            <button
              onClick={onOpenPlacementTest}
              className="px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs sm:text-sm flex items-center gap-2 transition shadow-md shrink-0"
            >
              <Award className="w-4 h-4" />
              <span>Placement Test</span>
            </button>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="mt-5 pt-4 border-t border-stone-800/80 space-y-2">
          <div className="flex justify-between items-center text-xs font-bold">
            <span className="text-stone-300">
              Curriculum Mastery: {totalCompleted} of {totalLessonsInCurriculum} Lessons Cleared
            </span>
            <span className="text-amber-400 font-extrabold">{progressPercentage}% Completed</span>
          </div>
          <div className="w-full bg-stone-800 rounded-full h-2.5 overflow-hidden p-0.5">
            <div
              className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-400 h-full rounded-full transition-all duration-500 shadow-sm"
              style={{ width: `${Math.max(progressPercentage, 2)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Recommended Reading Module for Learner-Driven Input */}
      <RecommendedReadingModule
        userProgress={userProgress}
        setUserProgress={setUserProgress}
        onOpenStory={content => {
          if (onOpenStory) {
            onOpenStory(content);
          }
        }}
      />

      {/* Continue Next Lesson Hero Action Card */}
      {nextLessonToComplete && (
        <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
          <div className="space-y-1">
            <span className="text-[11px] font-black uppercase tracking-wider text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 fill-current" />
              Immediate Next Objective on Your Pathway:
            </span>
            <h3 className="text-lg font-black text-stone-900 dark:text-white">
              {nextLessonToComplete.lesson.title_es}
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-300">
              🇬🇧 {nextLessonToComplete.lesson.title_en} • <span className="font-arabic" dir="rtl">{nextLessonToComplete.lesson.title_ar}</span>
            </p>
          </div>

          <button
            onClick={() => setActiveLesson(nextLessonToComplete.lesson)}
            className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-sm shadow-md transition flex items-center gap-2 shrink-0 animate-pulse hover:animate-none"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Continue Lesson</span>
          </button>
        </div>
      )}

      {/* Level Selector Tabs + Mode Toggle */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 flex-1">
          {levels.map(lvl => {
            const isSelected = selectedLevel === lvl.id;
            const isUnlocked = isLevelUnlocked(lvl.id);
            const isCertified = userProgress.passedLevelExamIds?.includes(lvl.id);
            const score = userProgress.levelExamScores?.[lvl.id];

            return (
              <button
                key={lvl.id}
                onClick={() => setSelectedLevel(lvl.id)}
                className={`text-left p-3 rounded-2xl border transition-all relative ${
                  isSelected
                    ? 'bg-white dark:bg-stone-900 border-amber-400 dark:border-amber-500 shadow-md ring-2 ring-amber-400/20'
                    : 'bg-white/80 dark:bg-stone-900/60 hover:bg-white dark:hover:bg-stone-900 border-stone-200 dark:border-stone-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className={`px-2 py-0.5 rounded-md text-[11px] font-black uppercase text-white bg-gradient-to-r ${lvl.color}`}>
                      {lvl.id}
                    </span>
                    {!isUnlocked && (
                      <LockKeyhole className="w-3.5 h-3.5 text-stone-400" />
                    )}
                    {isCertified && (
                      <span className="text-[10px] font-black text-amber-500 flex items-center gap-0.5">
                        ★ {score ? `${score}%` : 'Certified'}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] font-bold text-stone-400 font-arabic" dir="rtl">
                    {lvl.title_ar}
                  </span>
                </div>
                <p className="text-xs font-black text-stone-900 dark:text-white mt-1 line-clamp-1">
                  {lvl.title_en}
                </p>
              </button>
            );
          })}
        </div>

        {/* View Mode Toggle & Level Exam Action */}
        <div className="flex items-center gap-2 self-end sm:self-auto shrink-0 flex-wrap">
          <button
            onClick={() => handleOpenAssessment(selectedLevel)}
            className="px-3.5 py-2 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs flex items-center gap-1.5 transition shadow-sm"
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>Take {selectedLevel} Level Exam</span>
          </button>

          <div className="flex items-center gap-1 bg-stone-100 dark:bg-stone-800 p-1.5 rounded-2xl border border-stone-200 dark:border-stone-700 flex-wrap">
            <button
              onClick={() => setPathMode('scenarios')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                pathMode === 'scenarios'
                  ? 'bg-amber-500 text-stone-950 shadow-sm font-black'
                  : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Street Survival Matrix</span>
            </button>
            <button
              onClick={() => setPathMode('a0')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                pathMode === 'a0'
                  ? 'bg-amber-500 text-stone-950 shadow-sm font-black'
                  : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>A0 Scaffolding</span>
            </button>
            <button
              onClick={() => setPathMode('linear')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                pathMode === 'linear'
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-xs font-black'
                  : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-amber-500" />
              <span>Skills Path</span>
            </button>
            <button
              onClick={() => setPathMode('grid')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition ${
                pathMode === 'grid'
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-xs font-black'
                  : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-amber-500" />
              <span>Unit Matrix</span>
            </button>
          </div>
        </div>
      </div>

      {/* Locked Level Gateway Warning & Fast-Track Assessment Callout */}
      {isCurrentLevelLocked && (
        <div className="bg-stone-900 border-2 border-dashed border-amber-500/40 rounded-3xl p-6 sm:p-8 text-center text-white space-y-4 shadow-xl animate-fadeIn">
          <div className="w-16 h-16 rounded-full bg-stone-800 border border-stone-700 mx-auto flex items-center justify-center text-amber-400">
            <LockKeyhole className="w-8 h-8" />
          </div>

          <div className="space-y-1 max-w-lg mx-auto">
            <span className="text-xs font-black uppercase tracking-wider text-amber-400">
              CEFR Gateway Requirement
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Level {selectedLevel} is Currently Locked
            </h3>
            <p className="text-xs sm:text-sm text-stone-300">
              To unlock Level {selectedLevel} ({currentLvlConfig.title_en}), you must complete all lessons in Level {currentLvlConfig.prevLevel || 'A1'} or pass the official 15-Question End-of-Level Assessment (≥80% passing grade).
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            {currentLvlConfig.prevLevel && (
              <button
                onClick={() => handleOpenAssessment(currentLvlConfig.prevLevel || 'A1')}
                className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-sm shadow-lg transition flex items-center gap-2"
              >
                <Trophy className="w-4 h-4" />
                <span>Take {currentLvlConfig.prevLevel} End-of-Level Assessment (15 Questions)</span>
              </button>
            )}

            <button
              onClick={onOpenPlacementTest}
              className="px-5 py-3 rounded-2xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold text-xs flex items-center gap-2 border border-stone-700 transition"
            >
              <Award className="w-4 h-4 text-amber-400" />
              <span>Or Take Placement Test to Calibrate</span>
            </button>
          </div>
        </div>
      )}

      {/* MODE 0: REAL-WORLD MEXICAN SPANISH SURVIVAL SCENARIOS */}
      {pathMode === 'scenarios' && (() => {
        const selectedScenarios = HIGH_UTILITY_LEARNING_PATH.filter(s => s.level === selectedLevel);
        if (selectedScenarios.length === 0) return null;

        return (
          <div className="bg-gradient-to-br from-amber-500/10 via-stone-900 to-stone-900 border border-amber-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl text-white">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-800 pb-5">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-black">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span>Real-World Mexican Spanish Survival Scenarios ({selectedLevel})</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                  <span>Authentic Street Conversations (Conversaciones Reales)</span>
                </h2>
                <p className="text-xs sm:text-sm text-stone-300 max-w-2xl">
                  Zero textbook filler. Passes the 48-hour street test: real phrases, natural contrast vs formal textbooks, modular variations, and interactive survival drills.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {selectedScenarios.map((scen) => {
                const mainPhrase = scen.core_phrases[0];
                const drillState = scenarioDrillState[scen.id];
                const drillCorrectAns = mainPhrase ? mainPhrase.phrase_es : '';
                const drillOptions = mainPhrase ? [
                  mainPhrase.phrase_es,
                  scen.contrast_examples[0]?.textbook_formal || 'Opción de libro antigua',
                  scen.example_variations[0]?.varied_es || 'Opción variada',
                  scen.core_phrases[1]?.phrase_es || 'Opción alternativa'
                ].sort(() => 0.5 - Math.random()) : [];

                return (
                  <div key={scen.id} className="bg-stone-950/80 border border-stone-800 rounded-2xl p-5 sm:p-6 space-y-6">
                    {/* Scenario Context Header */}
                    <div className="flex items-start justify-between gap-3 bg-stone-900/90 p-4 rounded-xl border border-stone-800">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl p-2 bg-stone-800/80 rounded-2xl">{scen.emoji}</span>
                        <div>
                          <span className="text-[10px] uppercase font-black tracking-widest text-amber-400">
                            {scen.category} • {scen.level}
                          </span>
                          <h3 className="text-lg font-black text-white">{scen.title}</h3>
                          <p className="text-xs text-stone-300 font-medium mt-0.5">
                            📍 <strong>Scenario Context:</strong> {scen.scenario_context}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* 1. Core Real-World Phrases (6 Phrases) */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                        <MessageSquare className="w-4 h-4 text-amber-400" />
                        <span>Core Real-World Native Phrases ({scen.core_phrases.length})</span>
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {scen.core_phrases.map((cp, idx) => (
                          <div key={idx} className="bg-stone-900/90 border border-stone-800 rounded-xl p-3.5 space-y-1.5 hover:border-amber-500/40 transition">
                            <div className="flex items-start justify-between gap-2">
                              <p className="text-sm font-black text-white flex items-center gap-2">
                                <span>{cp.phrase_es}</span>
                              </p>
                              <button
                                onClick={() => speakSpanish(cp.audio_text)}
                                className="p-1.5 rounded-lg bg-amber-500/20 text-amber-300 hover:bg-amber-500 hover:text-stone-950 transition cursor-pointer shrink-0"
                                title="Listen audio"
                              >
                                <Volume2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <p className="text-xs text-stone-300 font-medium">🇬🇧 {cp.phrase_en}</p>
                            <p className="text-[11px] text-amber-300 font-mono italic">🗣️ {cp.phonetic}</p>
                            <p className="text-[11px] text-stone-400 border-t border-stone-800 pt-1.5 mt-1">
                              💡 {cp.context_note}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 2. Contrast Examples (Textbook Formal vs Natural Mexican Spanish) */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                        <Zap className="w-4 h-4 text-amber-400" />
                        <span>Formal Textbook vs Natural Mexican Spanish Contrast</span>
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {scen.contrast_examples.map((ce, idx) => (
                          <div key={idx} className="bg-stone-900/90 border border-stone-800 rounded-xl p-4 space-y-2">
                            <div className="space-y-1">
                              <span className="text-[10px] font-black uppercase text-red-400 bg-red-950/60 px-2 py-0.5 rounded">
                                ❌ Formal Textbook (Avoid)
                              </span>
                              <p className="text-xs text-stone-300 line-through font-mono">{ce.textbook_formal}</p>
                            </div>
                            <div className="space-y-1 border-t border-stone-800 pt-2">
                              <span className="text-[10px] font-black uppercase text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded">
                                ✅ Authentic Natural Mexican Spanish
                              </span>
                              <p className="text-sm font-black text-emerald-300 flex items-center gap-2">
                                <span>{ce.natural_mexican}</span>
                                <button
                                  onClick={() => speakSpanish(ce.natural_mexican)}
                                  className="p-1 rounded bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500 hover:text-stone-950 transition cursor-pointer"
                                >
                                  <Volume2 className="w-3 h-3" />
                                </button>
                              </p>
                              <p className="text-xs text-stone-300 font-medium">🇬🇧 {ce.english_translation}</p>
                              <p className="text-[11px] text-stone-400 italic">💬 {ce.why_natural}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 3. Example Modular Variations (4 Variations) */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                        <Layers className="w-4 h-4 text-amber-400" />
                        <span>4 Modular Element Variations</span>
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
                        {scen.example_variations.map((ev, idx) => (
                          <div key={idx} className="bg-stone-900/80 border border-stone-800 rounded-xl p-3 space-y-1">
                            <span className="text-[10px] font-black uppercase text-amber-400 bg-amber-950/60 px-1.5 py-0.5 rounded block w-max">
                              Swapped: {ev.swapped_element}
                            </span>
                            <p className="text-xs font-bold text-white flex items-center gap-1.5 mt-1">
                              <span>{ev.varied_es}</span>
                              <button
                                onClick={() => speakSpanish(ev.varied_es)}
                                className="p-1 rounded bg-amber-500/20 text-amber-300 hover:bg-amber-500 hover:text-stone-950 transition"
                              >
                                <Volume2 className="w-3 h-3" />
                              </button>
                            </p>
                            <p className="text-[11px] text-stone-300">🇬🇧 {ev.varied_en}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 4. Interactive Street Recall Drill Card */}
                    {mainPhrase && (
                      <div className="bg-amber-950/30 border border-amber-500/30 rounded-xl p-4 sm:p-5 space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                            <Target className="w-4 h-4 text-amber-400" />
                            <span>Interactive Street Recall Drill (+25 XP)</span>
                          </span>
                          {drillState?.isCorrect && (
                            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                              <CheckCircle2 className="w-4 h-4" /> Passed Drill!
                            </span>
                          )}
                        </div>

                        <p className="text-sm font-extrabold text-stone-100">
                          🎯 Scenario Challenge: How do you say "{mainPhrase.phrase_en}" in authentic Mexican Spanish?
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {drillOptions.map((opt, optIdx) => {
                            const isSelected = drillState?.selected === opt;
                            const isCorrectOpt = opt.trim().toLowerCase() === drillCorrectAns.trim().toLowerCase();
                            let btnStyle = "bg-stone-900/90 border-stone-800 hover:border-amber-500/50 text-stone-200";

                            if (drillState) {
                              if (isCorrectOpt) {
                                btnStyle = "bg-emerald-950 border-emerald-500 text-emerald-200 font-bold";
                              } else if (isSelected && !drillState.isCorrect) {
                                btnStyle = "bg-rose-950 border-rose-500 text-rose-200 line-through";
                              }
                            }

                            return (
                              <button
                                key={optIdx}
                                onClick={() => {
                                  speakSpanish(opt);
                                  const isCorrect = isCorrectOpt;
                                  setScenarioDrillState(prev => ({
                                    ...prev,
                                    [scen.id]: { selected: opt, isCorrect }
                                  }));
                                  if (isCorrect) {
                                    soundEffects.playCorrect();
                                    setUserProgress(prev => ({ ...prev, xp: prev.xp + 25 }));
                                  } else {
                                    soundEffects.playIncorrect();
                                  }
                                }}
                                className={`p-3 rounded-xl border text-left text-xs font-medium flex items-center justify-between gap-2 transition ${btnStyle}`}
                              >
                                <span>{opt}</span>
                                <Volume2 className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                              </button>
                            );
                          })}
                        </div>

                        {drillState && (
                          <div className={`p-3 rounded-xl border text-xs font-medium ${
                            drillState.isCorrect
                              ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
                              : 'bg-rose-950/60 border-rose-500/40 text-rose-300'
                          }`}>
                            {drillState.isCorrect
                              ? `¡Excelente! "${drillCorrectAns}" is natural and widely used in Mexico. ${scen.contrast_examples[0]?.why_natural || ''}`
                              : `Not quite. The authentic natural phrase is: "${drillCorrectAns}".`}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })()}

      {/* MODE 1: A0 ABSOLUTE ZERO SCAFFOLDING UNITS */}
      {pathMode === 'a0' && (() => {
        const activeUnit = A0_BEGINNER_UNITS[activeA0UnitIndex] || A0_BEGINNER_UNITS[0];

        return (
          <div className="space-y-6">
            {/* Unit Selector Strip */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {A0_BEGINNER_UNITS.map((u, idx) => (
                <button
                  key={u.unit_id}
                  onClick={() => setActiveA0UnitIndex(idx)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-black shrink-0 transition flex items-center gap-1.5 ${
                    activeA0UnitIndex === idx
                      ? 'bg-amber-500 text-stone-950 shadow-md'
                      : 'bg-stone-900 border border-stone-800 text-stone-300 hover:border-stone-700'
                  }`}
                >
                  <span>{u.emoji}</span>
                  <span>U{idx + 1}</span>
                </button>
              ))}
            </div>

            {/* Active A0 Scaffolding Unit Detail */}
            <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-6 text-white shadow-xl">
              <div className="border-b border-stone-800 pb-4 space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded">
                  {activeUnit.category} • Beginner Scaffolding
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                  <span>{activeUnit.emoji}</span>
                  <span>{activeUnit.title}</span>
                </h2>
                <p className="text-xs text-stone-300 font-medium">
                  💡 {activeUnit.zero_jargon_explanation}
                </p>
              </div>

              {/* Anchor Words */}
              <div className="space-y-3">
                <h3 className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4" />
                  <span>Anchor Vocabulary ({activeUnit.anchor_words.length})</span>
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                  {activeUnit.anchor_words.map((w, idx) => (
                    <div key={idx} className="bg-stone-950 border border-stone-800 rounded-xl p-3 text-center space-y-1">
                      <span className="text-xl block">{w.emoji}</span>
                      <p className="text-sm font-black text-white flex items-center justify-center gap-1">
                        <span>{w.word}</span>
                        <button onClick={() => speakSpanish(w.audio_cue)} className="text-amber-400 hover:text-amber-300">
                          <Volume2 className="w-3 h-3" />
                        </button>
                      </p>
                      <p className="text-xs text-stone-300 font-medium">{w.translation}</p>
                      <p className="text-[10px] text-amber-300 font-mono">{w.phonetic_guide}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chunk Building Ladder */}
              <div className="space-y-3">
                <h3 className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Layers className="w-4 h-4" />
                  <span>4-Step Sentence Building Ladder</span>
                </h3>
                <div className="space-y-2">
                  {activeUnit.chunk_building_ladder.map((step) => (
                    <div key={step.step} className="bg-stone-950 border border-stone-800 rounded-xl p-3.5 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-amber-500 text-stone-950 font-black text-xs flex items-center justify-center shrink-0">
                          {step.step}
                        </span>
                        <div>
                          <p className="text-sm font-black text-white flex items-center gap-2">
                            <span>{step.text_es}</span>
                            <button onClick={() => speakSpanish(step.audio_text)} className="p-1 rounded bg-amber-500/20 text-amber-300 hover:bg-amber-500 hover:text-stone-950 transition">
                              <Volume2 className="w-3 h-3" />
                            </button>
                          </p>
                          <p className="text-xs text-stone-300">🇬🇧 {step.text_en}</p>
                        </div>
                      </div>
                      <span className="text-[11px] text-stone-400 italic hidden sm:block">{step.explanation}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Micro Drills */}
              <div className="space-y-3">
                <h3 className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Target className="w-4 h-4" />
                  <span>Micro Drills ({activeUnit.micro_drills.length})</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activeUnit.micro_drills.map((drill) => {
                    const ansState = a0DrillAnswers[drill.id];

                    return (
                      <div key={drill.id} className="bg-stone-950 border border-stone-800 rounded-xl p-4 space-y-3">
                        <p className="text-xs font-extrabold text-stone-200">
                          ❓ {drill.prompt}
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                          {drill.options.map((opt, oIdx) => {
                            const isSelected = ansState?.selected === opt;
                            const isCorrectOpt = opt.trim().toLowerCase() === drill.correct_answer.trim().toLowerCase();
                            let style = "bg-stone-900 border-stone-800 hover:border-amber-500/50 text-stone-200";

                            if (ansState) {
                              if (isCorrectOpt) style = "bg-emerald-950 border-emerald-500 text-emerald-200 font-bold";
                              else if (isSelected && !ansState.isCorrect) style = "bg-rose-950 border-rose-500 text-rose-200 line-through";
                            }

                            return (
                              <button
                                key={oIdx}
                                onClick={() => {
                                  if (drill.audio_text) speakSpanish(drill.audio_text);
                                  const isCorrect = isCorrectOpt;
                                  setA0DrillAnswers(prev => ({ ...prev, [drill.id]: { selected: opt, isCorrect } }));
                                  if (isCorrect) {
                                    soundEffects.playCorrect();
                                    setUserProgress(prev => ({ ...prev, xp: prev.xp + 15 }));
                                  } else {
                                    soundEffects.playIncorrect();
                                  }
                                }}
                                className={`p-2.5 rounded-xl border text-xs font-medium text-center transition ${style}`}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>
                        {ansState && (
                          <p className={`text-[11px] p-2 rounded-lg ${ansState.isCorrect ? 'bg-emerald-950/60 text-emerald-300' : 'bg-rose-950/60 text-rose-300'}`}>
                            💡 {drill.explanation}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ============================================================ */}
      {/* MODE 1: LINEAR DUOLINGO-STYLE PATH MAP                       */}
      {/* ============================================================ */}
      {pathMode === 'linear' && (
        <div className="space-y-6">
          {currentUnits.map((unit, uIdx) => {
            const totalInUnit = unit.lessons.length;
            const completedInUnit = unit.lessons.filter(l => userProgress.completedLessonIds.includes(l.id)).length;
            const isUnitMastered = completedInUnit === totalInUnit && totalInUnit > 0;

            return (
              <div
                key={unit.id}
                className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6"
              >
                {/* Unit Header Landmark */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 dark:border-stone-800 pb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-lg text-xs font-black bg-stone-900 dark:bg-amber-500 text-white dark:text-stone-950 shadow-xs">
                        Unit {unit.unitNumber}
                      </span>
                      <h2 className="text-lg sm:text-xl font-black text-stone-900 dark:text-white">
                        {unit.title_es}
                      </h2>
                    </div>
                    <p className="text-xs sm:text-sm font-semibold text-stone-600 dark:text-stone-300">
                      🇬🇧 {unit.title_en} • <span className="font-arabic" dir="rtl">{unit.title_ar}</span>
                    </p>
                    <p className="text-xs text-stone-500 dark:text-stone-400">
                      {unit.description_en}
                    </p>
                  </div>

                  {/* Unit Mastery Status */}
                  <div className="flex items-center gap-3 bg-stone-50 dark:bg-stone-800 px-4 py-2 rounded-2xl border border-stone-200 dark:border-stone-700 shrink-0">
                    <div className="text-right">
                      <span className="text-[11px] font-bold text-stone-400 block">Unit Mastery</span>
                      <span className="text-xs font-black text-amber-700 dark:text-amber-400">
                        {completedInUnit} / {totalInUnit} Cleared
                      </span>
                    </div>
                    {isUnitMastered ? (
                      <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center font-bold">
                        <Check className="w-5 h-5" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-600 flex items-center justify-center font-bold text-xs">
                        {Math.round((completedInUnit / totalInUnit) * 100)}%
                      </div>
                    )}
                  </div>
                </div>

                {/* Stepping-Stone Linear Path Nodes */}
                <div className="relative py-4 flex flex-col items-center space-y-8">
                  {/* Connection Line */}
                  <div className="absolute top-8 bottom-8 w-1 bg-stone-200 dark:bg-stone-800 -z-0" />

                  {unit.lessons.map((lesson, lIdx) => {
                    const isCompleted = userProgress.completedLessonIds.includes(lesson.id);
                    // Determine if unlocked: first lesson of unit or previous lesson completed
                    const isUnlocked = lIdx === 0 || userProgress.completedLessonIds.includes(unit.lessons[lIdx - 1].id);
                    const isNextActive = isUnlocked && !isCompleted;

                    // Stepping stone lateral offsets (winding path)
                    const offsets = ['translate-x-0', 'translate-x-6 sm:translate-x-12', '-translate-x-6 sm:-translate-x-12', 'translate-x-0'];
                    const offsetClass = offsets[lIdx % offsets.length];

                    return (
                      <div
                        key={lesson.id}
                        className={`flex flex-col items-center gap-2 z-10 transition-transform ${offsetClass}`}
                      >
                        {/* Stepping Stone Node Button */}
                        <button
                          onClick={() => setActiveLesson(lesson)}
                          className={`relative group w-18 h-18 sm:w-20 sm:h-20 rounded-3xl flex flex-col items-center justify-center shadow-lg transition-all transform hover:scale-105 active:scale-95 ${
                            isCompleted
                              ? 'bg-gradient-to-b from-emerald-400 to-emerald-600 text-white ring-4 ring-emerald-400/20'
                              : isNextActive
                              ? 'bg-gradient-to-b from-amber-400 to-amber-500 text-stone-950 ring-4 ring-amber-400/40 animate-bounce hover:animate-none'
                              : 'bg-stone-200 dark:bg-stone-800 text-stone-400 dark:text-stone-600 border border-stone-300 dark:border-stone-700'
                          }`}
                        >
                          {isCompleted ? (
                            <CheckCircle2 className="w-8 h-8" />
                          ) : isNextActive ? (
                            <Play className="w-8 h-8 fill-current ml-0.5" />
                          ) : (
                            <LockKeyhole className="w-6 h-6" />
                          )}

                          <span className="text-[10px] font-black uppercase mt-1">
                            L{lesson.lessonNumber}
                          </span>

                          {/* Floating Star / XP Badge */}
                          {isCompleted && (
                            <div className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-amber-400 text-stone-950 flex items-center justify-center text-xs font-black shadow-md">
                              ★
                            </div>
                          )}
                        </button>

                        {/* Node Tooltip Label Card */}
                        <div className="bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-2xl px-4 py-2 text-center shadow-xs max-w-[220px]">
                          <p className="text-xs font-extrabold text-stone-900 dark:text-white line-clamp-1">
                            {lesson.title_es}
                          </p>
                          <p className="text-[11px] text-stone-500 dark:text-stone-400 line-clamp-1">
                            {lesson.title_en}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ============================================================ */}
      {/* MODE 2: CURRICULUM GRID MATRIX                               */}
      {/* ============================================================ */}
      {pathMode === 'grid' && (
        <div className="space-y-5">
          {currentUnits.map(unit => {
            const totalLessons = unit.lessons.length;
            const completedInUnit = unit.lessons.filter(l => userProgress.completedLessonIds.includes(l.id)).length;

            return (
              <div
                key={unit.id}
                className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 shadow-sm space-y-4"
              >
                <div className="flex justify-between items-center border-b border-stone-100 dark:border-stone-800 pb-3">
                  <div>
                    <span className="px-2 py-0.5 rounded text-xs font-black bg-stone-900 dark:bg-amber-500 text-white dark:text-stone-950">
                      Unit {unit.unitNumber}
                    </span>
                    <h3 className="text-lg font-black text-stone-900 dark:text-white mt-1">
                      {unit.title_es}
                    </h3>
                  </div>
                  <span className="text-xs font-bold text-stone-500">
                    {completedInUnit}/{totalLessons} Done
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {unit.lessons.map(lesson => {
                    const isCompleted = userProgress.completedLessonIds.includes(lesson.id);
                    return (
                      <div
                        key={lesson.id}
                        className={`p-4 rounded-xl border flex flex-col justify-between ${
                          isCompleted
                            ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800'
                            : 'bg-stone-50/60 dark:bg-stone-800/40 border-stone-200 dark:border-stone-800'
                        }`}
                      >
                        <div>
                          <div className="flex justify-between items-center text-xs font-bold text-stone-400">
                            <span>Lesson {lesson.lessonNumber}</span>
                            {isCompleted && <span className="text-emerald-600 font-extrabold">✓ Cleared</span>}
                          </div>
                          <h4 className="font-extrabold text-stone-900 dark:text-white mt-1">
                            {lesson.title_es}
                          </h4>
                          <p className="text-xs text-stone-600 dark:text-stone-300">
                            {lesson.title_en}
                          </p>
                        </div>

                        <div className="pt-3 mt-3 border-t border-stone-200/50 flex justify-end">
                          <button
                            onClick={() => setActiveLesson(lesson)}
                            className="px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-xs"
                          >
                            {isCompleted ? 'Review' : 'Start'}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* End of Level CEFR Certification Gateway Banner */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-900 to-amber-950/80 border border-amber-500/30 rounded-3xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-500 text-stone-950">
              Official Level Milestone
            </span>
            <span className="text-xs text-amber-300 font-bold">
              {selectedLevel} Comprehensive Retention Assessment
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            Ready to Certify {selectedLevel} Spanish Mastery?
          </h3>
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
            Take a randomized 15-question examination drawn directly from {selectedLevel}'s active vocabulary vault, listening audio, grammar blueprints, and syntax exercises. Pass with ≥80% to earn your official diploma and unlock Level {currentLvlConfig.nextLevel || 'Mastery'}!
          </p>
        </div>

        <button
          onClick={() => handleOpenAssessment(selectedLevel)}
          className="px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-sm shadow-xl transition flex items-center gap-2.5 shrink-0 transform hover:scale-105 active:scale-95"
        >
          <Trophy className="w-5 h-5" />
          <span>Launch {selectedLevel} Level Exam (15 Qs)</span>
        </button>
      </div>

      {/* Active Lesson Modal */}
      {activeLesson && (
        <LessonModal
          lesson={activeLesson}
          onClose={() => setActiveLesson(null)}
          userProgress={userProgress}
          setUserProgress={setUserProgress}
          onLessonCompleted={(lId) => {
            if (onLessonCompleted) {
              onLessonCompleted(lId);
            }
          }}
        />
      )}

      {/* End of Level Assessment Modal */}
      {isAssessmentModalOpen && (
        <EndOfLevelAssessmentModal
          level={assessmentLevel}
          nextLevel={currentLvlConfig.nextLevel}
          onClose={() => setIsAssessmentModalOpen(false)}
          userProgress={userProgress}
          setUserProgress={setUserProgress}
          onLevelUnlocked={(unlockedLvl) => {
            setSelectedLevel(unlockedLvl);
          }}
        />
      )}
    </div>
  );
};
