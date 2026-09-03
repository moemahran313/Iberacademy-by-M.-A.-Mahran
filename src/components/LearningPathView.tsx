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
  Lightbulb,
  GraduationCap,
  ArrowRight,
  Bookmark,
  BookMarked,
  Filter
} from 'lucide-react';
import { Unit, Lesson, CEFRLevel, UserProgress, ImportedContent } from '../types';
import { CURRICULUM_UNITS, HIGH_UTILITY_LEARNING_PATH } from '../data';
import { A0_BEGINNER_UNITS } from '../data/a0BeginnerFoundation';
import { WORLD_CURRICULUM_SPECS, WorldCurriculumMeta } from '../data/worldCurriculumSpecs';
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
  const [pathMode, setPathMode] = useState<'worlds' | 'grammar' | 'vocab' | 'a0'>('worlds');
  const [isAssessmentModalOpen, setIsAssessmentModalOpen] = useState<boolean>(false);
  const [assessmentLevel, setAssessmentLevel] = useState<CEFRLevel>('A1');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Interactive Drill Answers state for A0
  const [activeA0UnitIndex, setActiveA0UnitIndex] = useState<number>(0);
  const [a0DrillAnswers, setA0DrillAnswers] = useState<Record<string, { selected: string; isCorrect: boolean }>>({});

  const levels: { id: CEFRLevel; title_en: string; title_ar: string; desc: string; color: string; badge: string; prevLevel: CEFRLevel | null; nextLevel: CEFRLevel | null }[] = [
    { id: 'A1', title_en: 'Absolute Beginner', title_ar: 'المبتدئ الأساسي', desc: '16 Worlds • 81 Lessons • Greetings, survival Spanish, present tense', color: 'from-amber-500 to-orange-600', badge: '🌱 A1 Survival', prevLevel: null, nextLevel: 'A2' },
    { id: 'A2', title_en: 'Elementary Explorer', title_ar: 'المستكشف الأولي', desc: '12 Worlds • 61 Lessons • Past tenses (indefinido vs imperfecto), prepositions', color: 'from-emerald-500 to-teal-600', badge: '🚀 A2 Explorer', prevLevel: 'A1', nextLevel: 'B1' },
    { id: 'B1', title_en: 'Intermediate Conversationalist', title_ar: 'المتحدث المتوسط', desc: '10 Worlds • Subjunctive mood, hypotheticals, opinions & reported speech', color: 'from-sky-500 to-blue-600', badge: '💬 B1 Fluent', prevLevel: 'A2', nextLevel: 'B2' },
    { id: 'B2', title_en: 'Advanced Fluency & Nuance', title_ar: 'الطلاقة المتقدمة', desc: '10 Worlds • Debates, formal discourse, complex idioms & cultural mastery', color: 'from-purple-500 to-indigo-600', badge: '👑 B2 Master', prevLevel: 'B1', nextLevel: null }
  ];

  // Helper to check if a CEFR level is unlocked
  const isLevelUnlocked = (lvl: CEFRLevel): boolean => {
    if (lvl === 'A1') return true;
    const unlocked = userProgress.unlockedLevels || ['A1'];
    if (unlocked.includes(lvl)) return true;

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

  // A1 and A2 level statistics for progress tracking
  const a1Units = CURRICULUM_UNITS.filter(u => u.level === 'A1');
  const a1Lessons = a1Units.flatMap(u => u.lessons);
  const a1Completed = a1Lessons.filter(l => userProgress.completedLessonIds.includes(l.id)).length;
  const a1Percent = Math.round((a1Completed / Math.max(a1Lessons.length, 1)) * 100);

  const a2Units = CURRICULUM_UNITS.filter(u => u.level === 'A2');
  const a2Lessons = a2Units.flatMap(u => u.lessons);
  const a2Completed = a2Lessons.filter(l => userProgress.completedLessonIds.includes(l.id)).length;
  const a2Percent = Math.round((a2Completed / Math.max(a2Lessons.length, 1)) * 100);

  // Add words to SRS
  const handleAddSampleChunksToSRS = (chunks: { spanish: string; english: string; arabic: string }[]) => {
    soundEffects.playLevelUp();
    const newWordIds = chunks.map(c => c.spanish.toLowerCase());
    setUserProgress(prev => {
      const existing = new Set(prev.savedWordIds || []);
      newWordIds.forEach(id => existing.add(id));
      return {
        ...prev,
        savedWordIds: Array.from(existing),
        xp: (prev.xp || 0) + 20
      };
    });
    setToastMessage(`Added ${chunks.length} vocabulary chunks to your SRS Queue (+20 XP)!`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="space-y-6 text-stone-900 dark:text-stone-100 animate-fadeIn">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-amber-500 text-stone-950 px-5 py-3 rounded-2xl shadow-xl font-extrabold text-xs flex items-center gap-2 border border-amber-400">
          <Sparkles className="w-4 h-4 fill-stone-950" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top App HUD Banner with A1-A2 Roadmap Progress Bar */}
      <div className="bg-gradient-to-br from-stone-900 via-stone-950 to-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 text-stone-100 shadow-xl space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-500 text-stone-950 shadow-xs">
                CEFR A1–B2 Structured Pathway
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-stone-800 text-amber-300 border border-amber-500/30">
                Separated Grammar &amp; Vocabulary Decks
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
              <span>Spanish World Mastery Hierarchy</span>
            </h1>
            <p className="text-xs sm:text-sm text-stone-300 max-w-2xl leading-relaxed">
              Step-by-step progressive hierarchy of 28 core Worlds and 142 lessons across Level A1 and A2, uniting real-world communicative goals with explicit grammar blueprints and vocabulary decks.
            </p>
          </div>

          {/* XP & Placement Action */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <div className="flex items-center gap-3 bg-stone-800/90 border border-stone-700/80 px-4 py-2.5 rounded-2xl">
              <div className="flex items-center gap-1.5 text-amber-400 font-extrabold text-xs sm:text-sm">
                <Zap className="w-4 h-4" />
                <span>{userProgress.xp} XP</span>
              </div>
              <div className="w-px h-4 bg-stone-700" />
              <div className="flex items-center gap-1.5 text-orange-400 font-extrabold text-xs sm:text-sm">
                <Flame className="w-4 h-4 fill-orange-500" />
                <span>{userProgress.streakDays} Day Streak</span>
              </div>
            </div>

            <button
              onClick={onOpenPlacementTest}
              className="px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs sm:text-sm flex items-center gap-2 transition shadow-md cursor-pointer"
            >
              <Award className="w-4 h-4" />
              <span>Placement Test</span>
            </button>
          </div>
        </div>

        {/* Level Progress Milestone Bars (A1 & A2 Visual Roadmap) */}
        <div className="relative z-10 pt-4 border-t border-stone-800/80 grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* A1 Roadmap Card */}
          <div className="bg-stone-900/80 border border-stone-800 rounded-2xl p-4 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-amber-400 flex items-center gap-1.5 font-black">
                <span>🌱 Level A1 (Absolute Beginner)</span>
              </span>
              <span className="text-stone-300 font-mono text-[11px]">
                {a1Completed} / {a1Lessons.length} Lessons ({a1Percent}%)
              </span>
            </div>
            <div className="w-full bg-stone-800 rounded-full h-2 overflow-hidden">
              <div
                className="bg-amber-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.max(a1Percent, 3)}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-stone-400">
              <span>16 Worlds • 81 Lessons Total</span>
              <span className="text-stone-300 font-semibold">
                {a1Units.filter(u => u.lessons.every(l => userProgress.completedLessonIds.includes(l.id))).length} / 16 Worlds Cleared
              </span>
            </div>
          </div>

          {/* A2 Roadmap Card */}
          <div className="bg-stone-900/80 border border-stone-800 rounded-2xl p-4 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-emerald-400 flex items-center gap-1.5 font-black">
                <span>🚀 Level A2 (Elementary Explorer)</span>
              </span>
              <span className="text-stone-300 font-mono text-[11px]">
                {a2Completed} / {a2Lessons.length} Lessons ({a2Percent}%)
              </span>
            </div>
            <div className="w-full bg-stone-800 rounded-full h-2 overflow-hidden">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.max(a2Percent, 3)}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-stone-400">
              <span>12 Worlds • 61 Lessons Total</span>
              <span className="text-stone-300 font-semibold">
                {a2Units.filter(u => u.lessons.every(l => userProgress.completedLessonIds.includes(l.id))).length} / 12 Worlds Cleared
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Input Stories Card */}
      <RecommendedReadingModule
        userProgress={userProgress}
        setUserProgress={setUserProgress}
        onOpenStory={content => {
          if (onOpenStory) {
            onOpenStory(content);
          }
        }}
      />

      {/* Immediate Next Objective Banner */}
      {nextLessonToComplete && (
        <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
          <div className="space-y-1">
            <span className="text-[11px] font-black uppercase tracking-wider text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5 fill-current" />
              Current Position on Your Learning Pathway:
            </span>
            <h3 className="text-lg font-black text-stone-900 dark:text-white flex items-center gap-2">
              <span>World {nextLessonToComplete.unit.unitNumber}: {nextLessonToComplete.unit.title_es}</span>
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-300">
              🎯 Next Lesson: <span className="font-bold">{nextLessonToComplete.lesson.title_es}</span> ({nextLessonToComplete.lesson.title_en})
            </p>
          </div>

          <button
            onClick={() => setActiveLesson(nextLessonToComplete.lesson)}
            className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-sm shadow-md transition flex items-center gap-2 shrink-0 animate-pulse hover:animate-none cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Launch Next Lesson</span>
          </button>
        </div>
      )}

      {/* Level Selector Tabs */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 flex-1">
          {levels.map(lvl => {
            const isSelected = selectedLevel === lvl.id;
            const isUnlocked = isLevelUnlocked(lvl.id);
            const isCertified = userProgress.passedLevelExamIds?.includes(lvl.id);

            return (
              <button
                key={lvl.id}
                onClick={() => setSelectedLevel(lvl.id)}
                className={`text-left p-3.5 rounded-2xl border transition-all relative cursor-pointer ${
                  isSelected
                    ? 'bg-amber-500 text-stone-950 border-amber-400 shadow-md font-extrabold'
                    : isUnlocked
                    ? 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-200 hover:border-amber-500/50'
                    : 'bg-stone-100 dark:bg-stone-950 border-stone-200 dark:border-stone-850 text-stone-400 opacity-75'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider">{lvl.id} Level</span>
                  {isCertified ? (
                    <Award className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  ) : !isUnlocked ? (
                    <Lock className="w-3.5 h-3.5 text-stone-400" />
                  ) : null}
                </div>
                <p className={`text-xs font-black mt-1 line-clamp-1 ${isSelected ? 'text-stone-950' : 'text-stone-900 dark:text-white'}`}>
                  {lvl.title_en}
                </p>
                <p className={`text-[10px] mt-0.5 line-clamp-1 ${isSelected ? 'text-stone-900/80' : 'text-stone-500'}`}>
                  {lvl.desc}
                </p>
              </button>
            );
          })}
        </div>

        {/* Level End Assessment Modal Button */}
        <button
          onClick={() => handleOpenAssessment(selectedLevel)}
          className="px-4 py-3 rounded-2xl bg-stone-900 dark:bg-stone-800 hover:bg-stone-800 dark:hover:bg-stone-700 text-amber-400 font-extrabold text-xs flex items-center justify-center gap-2 border border-stone-700 shadow-sm shrink-0 cursor-pointer"
        >
          <Trophy className="w-4 h-4 text-amber-400" />
          <span>{selectedLevel} Certification Exam</span>
        </button>
      </div>

      {/* Structured View Mode Selector Switcher */}
      <div className="bg-stone-100 dark:bg-stone-900 p-1.5 rounded-2xl border border-stone-200 dark:border-stone-800 flex flex-wrap gap-1">
        <button
          onClick={() => setPathMode('worlds')}
          className={`flex-1 min-w-[130px] px-4 py-2.5 rounded-xl text-xs font-black transition flex items-center justify-center gap-2 cursor-pointer ${
            pathMode === 'worlds'
              ? 'bg-amber-500 text-stone-950 shadow-xs'
              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Worlds &amp; Lessons Path</span>
        </button>

        <button
          onClick={() => setPathMode('grammar')}
          className={`flex-1 min-w-[130px] px-4 py-2.5 rounded-xl text-xs font-black transition flex items-center justify-center gap-2 cursor-pointer ${
            pathMode === 'grammar'
              ? 'bg-amber-500 text-stone-950 shadow-xs'
              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>Core Grammar Blueprints</span>
        </button>

        <button
          onClick={() => setPathMode('vocab')}
          className={`flex-1 min-w-[130px] px-4 py-2.5 rounded-xl text-xs font-black transition flex items-center justify-center gap-2 cursor-pointer ${
            pathMode === 'vocab'
              ? 'bg-amber-500 text-stone-950 shadow-xs'
              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Vocabulary &amp; Chunks Decks</span>
        </button>

        {selectedLevel === 'A1' && (
          <button
            onClick={() => setPathMode('a0')}
            className={`px-4 py-2.5 rounded-xl text-xs font-black transition flex items-center justify-center gap-2 cursor-pointer ${
              pathMode === 'a0'
                ? 'bg-amber-500 text-stone-950 shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>A0 Absolute Zero</span>
          </button>
        )}
      </div>

      {/* ============================================================ */}
      {/* MODE 1: PROGRESSIVE WORLDS & LESSONS PATH                    */}
      {/* ============================================================ */}
      {pathMode === 'worlds' && (
        <div className="space-y-6">
          {currentUnits.map((unit) => {
            const spec = WORLD_CURRICULUM_SPECS[unit.unitNumber];
            const totalInUnit = unit.lessons.length;
            const completedInUnit = unit.lessons.filter(l => userProgress.completedLessonIds.includes(l.id)).length;
            const isUnitMastered = completedInUnit === totalInUnit && totalInUnit > 0;

            return (
              <div
                key={unit.id}
                className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6"
              >
                {/* World Header Landmark */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 dark:border-stone-800 pb-5">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-xl text-xs font-black bg-stone-900 dark:bg-amber-500 text-white dark:text-stone-950 shadow-xs">
                        World {unit.unitNumber}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-extrabold uppercase bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-500/30">
                        {unit.level} Domain
                      </span>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-black text-stone-900 dark:text-white mt-1">
                      {unit.title_es}
                    </h2>
                    <p className="text-xs sm:text-sm font-semibold text-stone-600 dark:text-stone-300">
                      🇬🇧 {unit.title_en} • <span className="font-arabic" dir="rtl">{unit.title_ar}</span>
                    </p>
                  </div>

                  {/* World Mastery Status Box */}
                  <div className="flex items-center gap-3 bg-stone-50 dark:bg-stone-800 px-4 py-3 rounded-2xl border border-stone-200 dark:border-stone-700 shrink-0">
                    <div className="text-right">
                      <span className="text-[10px] font-black uppercase text-stone-400 block tracking-wider">
                        World Cleared
                      </span>
                      <span className="text-sm font-black text-amber-600 dark:text-amber-400">
                        {completedInUnit} / {totalInUnit} Lessons
                      </span>
                    </div>
                    {isUnitMastered ? (
                      <div className="w-9 h-9 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center font-black">
                        <Check className="w-5 h-5" />
                      </div>
                    ) : (
                      <div className="w-9 h-9 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-600 flex items-center justify-center font-black text-xs">
                        {Math.round((completedInUnit / totalInUnit) * 100)}%
                      </div>
                    )}
                  </div>
                </div>

                {/* Explicit Separation: Grammar Blueprint vs Vocabulary Deck Pillars */}
                {spec && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Grammar Pillar Card */}
                    <div className="bg-amber-500/10 dark:bg-amber-950/30 border border-amber-300/60 dark:border-amber-800/60 rounded-2xl p-4 space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-lg bg-amber-500 text-stone-950 font-black">
                          <GraduationCap className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-[10px] font-black uppercase text-amber-800 dark:text-amber-300 tracking-wider block">
                            Core Grammar Blueprint
                          </span>
                          <h4 className="text-xs font-black text-stone-900 dark:text-white">
                            {spec.grammar.grammarTitle_es}
                          </h4>
                        </div>
                      </div>

                      <ul className="space-y-1 pt-1 text-[11px] text-stone-700 dark:text-stone-300">
                        {spec.grammar.keyRules.map((rule, rIdx) => (
                          <li key={rIdx} className="flex items-start gap-1.5">
                            <span className="text-amber-500 font-bold">•</span>
                            <span>{rule.rule_es}: <span className="font-bold text-amber-700 dark:text-amber-400">"{rule.example}"</span></span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Vocabulary Pillar Card */}
                    <div className="bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 rounded-2xl p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 rounded-lg bg-stone-900 dark:bg-stone-700 text-amber-400 font-black">
                            <BookOpen className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-[10px] font-black uppercase text-stone-400 tracking-wider block">
                              Essential Vocabulary Deck
                            </span>
                            <h4 className="text-xs font-black text-stone-900 dark:text-white">
                              {spec.vocabulary.vocabTitle_es} ({spec.vocabulary.targetCount} Words)
                            </h4>
                          </div>
                        </div>

                        <button
                          onClick={() => handleAddSampleChunksToSRS(spec.vocabulary.sampleChunks)}
                          className="px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-[10px] transition cursor-pointer"
                        >
                          + Add Deck
                        </button>
                      </div>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {spec.vocabulary.sampleChunks.map((chunk, cIdx) => (
                          <span
                            key={cIdx}
                            onClick={() => speakSpanish(chunk.spanish)}
                            className="px-2 py-1 rounded-lg text-[10px] font-bold bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 border border-stone-200 dark:border-stone-700 hover:border-amber-500 cursor-pointer flex items-center gap-1"
                          >
                            <span>{chunk.spanish}</span>
                            <Volume2 className="w-3 h-3 text-amber-500" />
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* World Lessons Grid */}
                <div className="space-y-3 pt-2">
                  <h3 className="text-xs font-black uppercase tracking-wider text-stone-500 dark:text-stone-400 flex items-center gap-2">
                    <span>Lessons Progression in World {unit.unitNumber}</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {unit.lessons.map((lesson, lIdx) => {
                      const isCompleted = userProgress.completedLessonIds.includes(lesson.id);
                      const isUnlocked = lIdx === 0 || userProgress.completedLessonIds.includes(unit.lessons[lIdx - 1].id);

                      return (
                        <div
                          key={lesson.id}
                          className={`p-4 rounded-2xl border transition flex flex-col justify-between space-y-3 ${
                            isCompleted
                              ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800'
                              : isUnlocked
                              ? 'bg-white dark:bg-stone-800/80 border-stone-200 dark:border-stone-700 hover:border-amber-500'
                              : 'bg-stone-50 dark:bg-stone-950/50 border-stone-200 dark:border-stone-850 opacity-75'
                          }`}
                        >
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between text-xs font-bold">
                              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-700 text-stone-700 dark:text-stone-300">
                                Lesson {lesson.lessonNumber}
                              </span>
                              {isCompleted ? (
                                <span className="text-emerald-600 dark:text-emerald-400 text-[11px] font-black flex items-center gap-1">
                                  <CheckCircle2 className="w-3.5 h-3.5" /> Cleared
                                </span>
                              ) : !isUnlocked ? (
                                <Lock className="w-3.5 h-3.5 text-stone-400" />
                              ) : null}
                            </div>

                            <h4 className="font-extrabold text-stone-900 dark:text-white text-sm">
                              {lesson.title_es}
                            </h4>
                            <p className="text-xs text-stone-600 dark:text-stone-300 font-medium">
                              🇬🇧 {lesson.title_en}
                            </p>

                            <div className="bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/50 p-2 rounded-xl text-[10px] text-amber-900 dark:text-amber-300 font-medium space-y-0.5">
                              <span className="font-extrabold block">🎯 Goal:</span>
                              <span className="line-clamp-2">{lesson.objectives_en?.[0] || lesson.title_en}</span>
                            </div>
                          </div>

                          <div className="pt-2 border-t border-stone-200/60 dark:border-stone-700/60 flex justify-end">
                            <button
                              onClick={() => setActiveLesson(lesson)}
                              disabled={!isUnlocked && !isCompleted}
                              className={`px-3.5 py-1.5 rounded-xl font-black text-xs transition flex items-center gap-1.5 shadow-xs cursor-pointer ${
                                isCompleted
                                  ? 'bg-emerald-500 hover:bg-emerald-400 text-stone-950'
                                  : isUnlocked
                                  ? 'bg-amber-500 hover:bg-amber-400 text-stone-950'
                                  : 'bg-stone-200 dark:bg-stone-700 text-stone-400 cursor-not-allowed'
                              }`}
                            >
                              <Play className="w-3 h-3 fill-current" />
                              <span>{isCompleted ? 'Review' : 'Start Lesson'}</span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ============================================================ */}
      {/* MODE 2: CORE GRAMMAR BLUEPRINTS HIERARCHY                     */}
      {/* ============================================================ */}
      {pathMode === 'grammar' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-amber-500 text-stone-950 font-black">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-black text-stone-900 dark:text-white">
                  Core Grammar Blueprints Hierarchy
                </h2>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  Comprehensive breakdown of grammatical structures mapped directly to every World in {selectedLevel}.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {currentUnits.map((unit) => {
                const spec = WORLD_CURRICULUM_SPECS[unit.unitNumber];
                if (!spec) return null;

                return (
                  <div
                    key={unit.id}
                    className="bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 rounded-2xl p-5 space-y-3"
                  >
                    <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-700 pb-2">
                      <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black bg-amber-500 text-stone-950">
                        World {unit.unitNumber}
                      </span>
                      <span className="text-xs font-bold text-stone-500">
                        {unit.title_es}
                      </span>
                    </div>

                    <h3 className="text-sm font-black text-stone-900 dark:text-white flex items-center gap-2">
                      <span>{spec.grammar.grammarTitle_es}</span>
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
      {/* MODE 3: VOCABULARY & CHUNKS DECKS HIERARCHY                   */}
      {/* ============================================================ */}
      {pathMode === 'vocab' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-amber-500 text-stone-950 font-black">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-black text-stone-900 dark:text-white">
                  Essential Vocabulary &amp; Chunks Hierarchy
                </h2>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  Target collocations and vocabulary decks organized by World for Spaced Repetition Memory practice.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {currentUnits.map((unit) => {
                const spec = WORLD_CURRICULUM_SPECS[unit.unitNumber];
                if (!spec) return null;

                return (
                  <div
                    key={unit.id}
                    className="bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 rounded-2xl p-5 space-y-3"
                  >
                    <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-700 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black bg-stone-900 dark:bg-amber-500 text-white dark:text-stone-950">
                          World {unit.unitNumber}
                        </span>
                        <span className="text-xs font-bold text-stone-500">
                          {unit.title_es}
                        </span>
                      </div>
                      <button
                        onClick={() => handleAddSampleChunksToSRS(spec.vocabulary.sampleChunks)}
                        className="px-2 py-1 rounded-md bg-amber-500 text-stone-950 font-bold text-[10px] hover:bg-amber-400 transition cursor-pointer"
                      >
                        + Queue SRS
                      </button>
                    </div>

                    <div>
                      <h3 className="text-sm font-black text-stone-900 dark:text-white">
                        {spec.vocabulary.vocabTitle_es}
                      </h3>
                      <p className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                        Target Deck: {spec.vocabulary.targetCount} Core Collocations
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
      {/* MODE 4: A0 ABSOLUTE ZERO SCAFFOLDING UNITS                   */}
      {/* ============================================================ */}
      {pathMode === 'a0' && (() => {
        const activeUnit = A0_BEGINNER_UNITS[activeA0UnitIndex] || A0_BEGINNER_UNITS[0];

        return (
          <div className="space-y-6">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {A0_BEGINNER_UNITS.map((u, idx) => (
                <button
                  key={u.unit_id}
                  onClick={() => setActiveA0UnitIndex(idx)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-black shrink-0 transition flex items-center gap-1.5 cursor-pointer ${
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
            </div>
          </div>
        );
      })()}

      {/* Lesson Modal */}
      {activeLesson && (
        <LessonModal
          lesson={activeLesson}
          userProgress={userProgress}
          setUserProgress={setUserProgress}
          onClose={() => setActiveLesson(null)}
          onCompleted={(lessonId) => {
            if (onLessonCompleted) onLessonCompleted(lessonId);
          }}
        />
      )}

      {/* End of Level Certification Assessment Modal */}
      {isAssessmentModalOpen && (
        <EndOfLevelAssessmentModal
          level={assessmentLevel}
          userProgress={userProgress}
          setUserProgress={setUserProgress}
          onClose={() => setIsAssessmentModalOpen(false)}
        />
      )}
    </div>
  );
};
