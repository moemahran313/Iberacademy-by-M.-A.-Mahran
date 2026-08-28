import React, { useState, useEffect, useMemo } from 'react';
import {
  X,
  Trophy,
  Award,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Volume2,
  ArrowRight,
  ArrowLeft,
  RotateCw,
  Sparkles,
  Zap,
  Lock,
  Unlock,
  Check,
  Brain,
  Layers,
  BookOpen,
  Star,
  Printer,
  Share2,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import { CEFRLevel, UserProgress, VocabularyItem } from '../types';
import { generateLevelAssessment, AssessmentQuestion } from '../utils/levelAssessmentGenerator';
import { speakSpanish, soundEffects } from '../utils/audio';
import { IberacademyLogo } from './IberacademyLogo';
import { autoEnrollLessonWordsInSRS } from '../utils/srs';

interface EndOfLevelAssessmentModalProps {
  level: CEFRLevel;
  nextLevel: CEFRLevel | null;
  onClose: () => void;
  userProgress: UserProgress;
  setUserProgress: React.Dispatch<React.SetStateAction<UserProgress>>;
  onLevelUnlocked?: (unlockedLevel: CEFRLevel) => void;
}

export const EndOfLevelAssessmentModal: React.FC<EndOfLevelAssessmentModalProps> = ({
  level,
  nextLevel,
  onClose,
  userProgress,
  setUserProgress,
  onLevelUnlocked
}) => {
  const [activeTab, setActiveTab] = useState<'exam' | 'flashcards' | 'certificate'>('exam');
  
  // Assessment state
  const [assessmentData, setAssessmentData] = useState<{
    questions: AssessmentQuestion[];
    flashcardPool: VocabularyItem[];
  } | null>(null);

  const [currentQIdx, setCurrentQIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [showHints, setShowHints] = useState<Record<number, boolean>>({});
  const [isInstantChecked, setIsInstantChecked] = useState<boolean>(false);
  const [examSubmitted, setExamSubmitted] = useState<boolean>(false);
  const [examScore, setExamScore] = useState<number>(0);
  const [passed, setPassed] = useState<boolean>(false);
  const [reviewFilter, setReviewFilter] = useState<'all' | 'incorrect'>('all');

  // Flashcards prep state
  const [flashcardIndex, setFlashcardIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  // Level Meta
  const levelMetadata: Record<CEFRLevel, { name: string; name_ar: string; desc: string; color: string; next: CEFRLevel | null }> = {
    A1: { name: 'A1 Survival & Foundations', name_ar: 'أساسيات وبقاء A1', desc: '1000 Core Words, Greetings, Present Tense & Basic Syntax', color: 'from-amber-500 to-orange-600', next: 'A2' },
    A2: { name: 'A2 Elementary Explorer', name_ar: 'المستكشف الأولي A2', desc: 'Past Tenses (Pretérito vs Imperfecto), Routines, Prepositions', color: 'from-emerald-500 to-teal-600', next: 'B1' },
    B1: { name: 'B1 Intermediate Conversationalist', name_ar: 'المتحدث المتوسط B1', desc: 'Subjunctive Mood, Hypotheticals, Complex Clauses & Fluency', color: 'from-sky-500 to-blue-600', next: 'B2' },
    B2: { name: 'B2 Advanced Fluency & Nuance', name_ar: 'الطلاقة المتقدمة B2', desc: 'Advanced Subjunctive, Idioms, Cultural Discourse & Professional Mastery', color: 'from-purple-500 to-indigo-600', next: null }
  };

  const currentMeta = levelMetadata[level];

  // Initialize or regenerate questions on mount or retry
  const initializeExam = () => {
    const data = generateLevelAssessment(level, 15);
    setAssessmentData(data);
    setCurrentQIdx(0);
    setSelectedAnswers({});
    setShowHints({});
    setIsInstantChecked(false);
    setExamSubmitted(false);
    setExamScore(0);
    setPassed(false);
    setActiveTab('exam');
  };

  useEffect(() => {
    initializeExam();
  }, [level]);

  const questions = assessmentData?.questions || [];
  const currentQuestion = questions[currentQIdx];
  const totalQuestions = questions.length || 15;

  // Auto-play audio when opening a listening question
  useEffect(() => {
    if (currentQuestion?.type === 'listening' && currentQuestion.audioText && activeTab === 'exam' && !examSubmitted) {
      const timer = setTimeout(() => {
        speakSpanish(currentQuestion.audioText || '');
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [currentQIdx, currentQuestion, activeTab, examSubmitted]);

  // Handle selecting an option
  const handleSelectOption = (opt: string) => {
    if (examSubmitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQIdx]: opt
    }));
    setIsInstantChecked(false);
  };

  // Instant Check button for pedagogical immediate feedback
  const handleCheckCurrent = () => {
    const selected = selectedAnswers[currentQIdx];
    if (!selected || !currentQuestion) return;
    setIsInstantChecked(true);

    const isCorrect = selected.trim().toLowerCase() === currentQuestion.correctAnswer.trim().toLowerCase();
    if (isCorrect) {
      soundEffects.playCorrect();
    } else {
      soundEffects.playIncorrect();
    }
  };

  // Toggle hint for current question
  const handleToggleHint = () => {
    setShowHints(prev => ({
      ...prev,
      [currentQIdx]: !prev[currentQIdx]
    }));
  };

  // Submit Final Exam
  const handleSubmitExam = () => {
    if (questions.length === 0) return;

    let correctCount = 0;
    questions.forEach((q, idx) => {
      const ans = selectedAnswers[idx];
      if (ans && ans.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase()) {
        correctCount++;
      }
    });

    const calculatedScore = Math.round((correctCount / totalQuestions) * 100);
    const hasPassed = calculatedScore >= 80; // 80% passing threshold

    setExamScore(calculatedScore);
    setPassed(hasPassed);
    setExamSubmitted(true);

    if (hasPassed) {
      soundEffects.playLevelUp();

      // Unlock next level and persist progress
      setUserProgress(prev => {
        const currentUnlocked = prev.unlockedLevels || ['A1'];
        const targetNext = currentMeta.next;
        const newUnlocked = targetNext && !currentUnlocked.includes(targetNext)
          ? [...currentUnlocked, targetNext]
          : currentUnlocked;

        const passedExams = prev.passedLevelExamIds || [];
        const newPassedExams = passedExams.includes(level) ? passedExams : [...passedExams, level];

        // Auto enroll tested vocabulary into SRS
        const updatedSrs = autoEnrollLessonWordsInSRS(
          assessmentData?.flashcardPool || [],
          prev.srsData || {}
        );

        return {
          ...prev,
          currentLevel: targetNext || prev.currentLevel,
          unlockedLevels: newUnlocked,
          passedLevelExamIds: newPassedExams,
          levelExamScores: {
            ...(prev.levelExamScores || {}),
            [level]: calculatedScore
          },
          levelCertificates: {
            ...(prev.levelCertificates || {}),
            [level]: {
              date: new Date().toISOString().split('T')[0],
              score: calculatedScore,
              level
            }
          },
          srsData: updatedSrs,
          xp: prev.xp + 300 // Huge Level-Up XP bonus!
        };
      });

      if (currentMeta.next && onLevelUnlocked) {
        onLevelUnlocked(currentMeta.next);
      }
    } else {
      soundEffects.playIncorrect();
    }
  };

  // Next & Prev navigation
  const handleNextQ = () => {
    setIsInstantChecked(false);
    if (currentQIdx + 1 < totalQuestions) {
      setCurrentQIdx(prev => prev + 1);
    }
  };

  const handlePrevQ = () => {
    setIsInstantChecked(false);
    if (currentQIdx > 0) {
      setCurrentQIdx(prev => prev - 1);
    }
  };

  const answeredCount = Object.keys(selectedAnswers).length;
  const isSelectedForCurrent = Boolean(selectedAnswers[currentQIdx]);
  const isCurrentCorrect = isSelectedForCurrent && currentQuestion && selectedAnswers[currentQIdx].trim().toLowerCase() === currentQuestion.correctAnswer.trim().toLowerCase();

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn">
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header HUD */}
        <div className="bg-stone-900 border-b border-stone-800 px-6 py-4 flex items-center justify-between text-white shrink-0">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${currentMeta.color} flex items-center justify-center shadow-lg text-white font-black text-sm`}>
              {level}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider text-amber-400">
                  Official CEFR Gateway Exam
                </span>
                <span className="text-xs text-stone-400 font-arabic" dir="rtl">
                  امتحان تقييم نهاية المستوى
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-black text-stone-100 flex items-center gap-2">
                <span>{currentMeta.name}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-stone-800 text-stone-300 font-bold border border-stone-700">
                  Pass: ≥80% (12/15)
                </span>
              </h2>
            </div>
          </div>

          {/* Tab Switcher & Close */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center bg-stone-800 p-1 rounded-xl border border-stone-700">
              <button
                onClick={() => setActiveTab('exam')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                  activeTab === 'exam'
                    ? 'bg-amber-500 text-stone-950 shadow-xs font-black'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>15-Q Exam</span>
              </button>

              <button
                onClick={() => setActiveTab('flashcards')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                  activeTab === 'flashcards'
                    ? 'bg-amber-500 text-stone-950 shadow-xs font-black'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Flashcard Prep ({assessmentData?.flashcardPool.length || 0})</span>
              </button>

              {(examSubmitted && passed) && (
                <button
                  onClick={() => setActiveTab('certificate')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                    activeTab === 'certificate'
                      ? 'bg-amber-500 text-stone-950 shadow-xs font-black'
                      : 'text-stone-400 hover:text-white'
                  }`}
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>Diploma</span>
                </button>
              )}
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">

          {/* ============================================================ */}
          {/* TAB 1: 15-QUESTION ACTIVE CEFR LEVEL EXAM                     */}
          {/* ============================================================ */}
          {activeTab === 'exam' && (
            <div className="space-y-6">
              
              {/* Question Navigator Bar (1 to 15) */}
              <div className="bg-stone-50 dark:bg-stone-800/60 p-3 rounded-2xl border border-stone-200 dark:border-stone-700 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {questions.map((q, idx) => {
                    const isSelected = Boolean(selectedAnswers[idx]);
                    const isCurrent = currentQIdx === idx;
                    const isCorrect = isSelected && selectedAnswers[idx].trim().toLowerCase() === q.correctAnswer.trim().toLowerCase();

                    let badgeStyle = 'bg-white dark:bg-stone-800 border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-400';

                    if (examSubmitted) {
                      badgeStyle = isCorrect
                        ? 'bg-emerald-500 text-white border-emerald-600 font-black'
                        : 'bg-rose-500 text-white border-rose-600 font-black';
                    } else if (isCurrent) {
                      badgeStyle = 'bg-amber-500 text-stone-950 border-amber-500 ring-2 ring-amber-400/40 font-black';
                    } else if (isSelected) {
                      badgeStyle = 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 border-stone-900 dark:border-stone-100 font-bold';
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => {
                          setIsInstantChecked(false);
                          setCurrentQIdx(idx);
                        }}
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl text-xs flex items-center justify-center border transition ${badgeStyle}`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center gap-3 text-xs font-bold text-stone-600 dark:text-stone-300">
                  <span>{answeredCount} / {totalQuestions} Answered</span>
                  <span className="text-amber-500 font-black">+300 XP on Pass</span>
                </div>
              </div>

              {/* Active Question Display */}
              {currentQuestion && !examSubmitted && (
                <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-5 sm:p-7 shadow-sm space-y-5 animate-fadeIn">
                  
                  {/* Top Question Category & Tools */}
                  <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="px-2.5 py-0.5 rounded-lg text-xs font-black bg-stone-900 text-white dark:bg-amber-500 dark:text-stone-950">
                        Question {currentQIdx + 1} of {totalQuestions}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-lg text-xs font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                        {currentQuestion.type === 'listening' ? '🎧 Auditory Recall' :
                         currentQuestion.type === 'sentence_fill' ? '📝 Contextual Syntax' :
                         currentQuestion.type === 'gender_article' ? '⚖️ Grammatical Gender' :
                         currentQuestion.type === 'reverse_translation' ? '🎯 Spanish Production' : '📖 Vocabulary Lexicon'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {currentQuestion.audioText && (
                        <button
                          onClick={() => speakSpanish(currentQuestion.audioText || '')}
                          className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs flex items-center gap-1.5 transition shadow-xs"
                          title="Listen in Native Spanish"
                        >
                          <Volume2 className="w-4 h-4" />
                          <span className="hidden sm:inline">Play Audio</span>
                        </button>
                      )}

                      <button
                        onClick={handleToggleHint}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition border ${
                          showHints[currentQIdx]
                            ? 'bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200 border-amber-300 dark:border-amber-700'
                            : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 border-stone-200 dark:border-stone-700 hover:border-amber-400'
                        }`}
                      >
                        <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
                        <span>{showHints[currentQIdx] ? 'Hide Hint' : '💡 Need a Hint?'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Question Prompts Box */}
                  <div className="p-4 sm:p-5 bg-stone-50 dark:bg-stone-800/70 rounded-2xl border border-stone-200 dark:border-stone-700 space-y-2">
                    {currentQuestion.prompt_es && (
                      <h3 className="text-base sm:text-lg font-black text-stone-900 dark:text-white leading-snug">
                        {currentQuestion.prompt_es}
                      </h3>
                    )}
                    <p className="text-xs sm:text-sm font-semibold text-stone-700 dark:text-stone-300">
                      🇬🇧 {currentQuestion.prompt_en}
                    </p>
                    <p className="text-xs font-arabic text-amber-900 dark:text-amber-300" dir="rtl">
                      🇦🇪 {currentQuestion.prompt_ar}
                    </p>

                    {/* Context sentence if fill-in-the-blank */}
                    {currentQuestion.contextSentence_es && (
                      <div className="mt-3 p-3 bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-700">
                        <p className="text-sm font-black text-amber-700 dark:text-amber-400">
                          {currentQuestion.contextSentence_es}
                        </p>
                        <p className="text-xs text-stone-500 mt-0.5">
                          {currentQuestion.contextSentence_en}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Hint Reveal Box */}
                  {showHints[currentQIdx] && (
                    <div className="p-3.5 bg-amber-50 dark:bg-amber-950/40 rounded-2xl border border-amber-300 dark:border-amber-700 text-amber-950 dark:text-amber-200 text-xs space-y-1 animate-fadeIn">
                      <p className="font-extrabold flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                        <span>Pedagogical Hint:</span>
                      </p>
                      <p>{currentQuestion.hint_en}</p>
                      <p className="font-arabic" dir="rtl">{currentQuestion.hint_ar}</p>
                    </div>
                  )}

                  {/* Options List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentQuestion.options.map((opt, oIdx) => {
                      const isSelected = selectedAnswers[currentQIdx] === opt;
                      const isCorrect = opt.trim().toLowerCase() === currentQuestion.correctAnswer.trim().toLowerCase();

                      let btnStyle = 'bg-white dark:bg-stone-800 border-stone-200 dark:border-stone-700 hover:border-amber-400 dark:hover:border-amber-500 text-stone-900 dark:text-white';

                      if (isInstantChecked) {
                        if (isCorrect) {
                          btnStyle = 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-950 dark:text-emerald-100 ring-2 ring-emerald-500/20';
                        } else if (isSelected && !isCorrect) {
                          btnStyle = 'bg-rose-50 dark:bg-rose-950/60 border-rose-500 text-rose-950 dark:text-rose-100 ring-2 ring-rose-500/20';
                        }
                      } else if (isSelected) {
                        btnStyle = 'bg-amber-50 dark:bg-amber-950/50 border-amber-500 text-stone-950 dark:text-white ring-2 ring-amber-500/30';
                      }

                      return (
                        <button
                          key={oIdx}
                          onClick={() => {
                            handleSelectOption(opt);
                            if (currentQuestion.type !== 'listening') {
                              speakSpanish(opt);
                            }
                          }}
                          className={`p-4 rounded-2xl border text-left font-bold text-sm transition flex items-center justify-between ${btnStyle}`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded-lg bg-stone-100 dark:bg-stone-700/60 text-stone-600 dark:text-stone-300 text-xs font-black flex items-center justify-center">
                              {String.fromCharCode(65 + oIdx)}
                            </span>
                            <span>{opt}</span>
                          </div>

                          {isInstantChecked && isCorrect && (
                            <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                          )}
                          {isInstantChecked && isSelected && !isCorrect && (
                            <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Socratic Instant Explanation on Check */}
                  {isInstantChecked && (
                    <div className={`p-4 rounded-2xl border space-y-2 animate-fadeIn ${
                      isCurrentCorrect
                        ? 'bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-100'
                        : 'bg-rose-50/80 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-950 dark:text-rose-100'
                    }`}>
                      <div className="flex items-center gap-2 font-black text-sm">
                        {isCurrentCorrect ? (
                          <>
                            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                            <span>🟢 Excellent Recall! You got it right.</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-5 h-5 text-rose-600" />
                            <span>🔴 Correct Answer: {currentQuestion.correctAnswer}</span>
                          </>
                        )}
                      </div>
                      <p className="text-xs leading-relaxed font-medium">
                        💡 <strong>Explanation:</strong> {currentQuestion.explanation_en}
                      </p>
                      <p className="text-xs font-arabic leading-relaxed" dir="rtl">
                        💡 {currentQuestion.explanation_ar}
                      </p>
                    </div>
                  )}

                  {/* Navigation and Check Controls */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-stone-100 dark:border-stone-800">
                    <button
                      onClick={handlePrevQ}
                      disabled={currentQIdx === 0}
                      className="px-4 py-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-700 dark:text-stone-300 disabled:opacity-30 font-bold text-xs flex items-center justify-center gap-1.5 transition"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Previous</span>
                    </button>

                    <div className="flex items-center gap-2">
                      {!isInstantChecked && isSelectedForCurrent && (
                        <button
                          onClick={handleCheckCurrent}
                          className="px-4 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-300 font-bold text-xs transition flex items-center justify-center gap-1.5"
                        >
                          <Check className="w-4 h-4" />
                          <span>Check Answer</span>
                        </button>
                      )}

                      {currentQIdx + 1 < totalQuestions ? (
                        <button
                          onClick={handleNextQ}
                          className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-1.5"
                        >
                          <span>Next Question</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          disabled={answeredCount < totalQuestions}
                          onClick={handleSubmitExam}
                          className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white font-black text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-1.5"
                        >
                          <Trophy className="w-4 h-4" />
                          <span>Submit Official Exam</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Exam Submitted Result Scorecard */}
              {examSubmitted && (
                <div className="space-y-6 animate-fadeIn">
                  <div className={`p-6 sm:p-8 rounded-3xl border text-center space-y-4 ${
                    passed
                      ? 'bg-gradient-to-b from-emerald-50 via-white to-emerald-50 dark:from-emerald-950/40 dark:via-stone-900 dark:to-emerald-950/30 border-emerald-300 dark:border-emerald-700'
                      : 'bg-gradient-to-b from-rose-50 via-white to-rose-50 dark:from-rose-950/40 dark:via-stone-900 dark:to-rose-950/30 border-rose-300 dark:border-rose-700'
                  }`}>
                    <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center shadow-lg text-3xl font-black bg-white dark:bg-stone-800">
                      {passed ? '🏆' : '⚠️'}
                    </div>

                    <div className="space-y-1">
                      <span className="text-xs font-black uppercase tracking-wider text-stone-500">
                        CEFR Level {level} Assessment Final Score
                      </span>
                      <h3 className="text-3xl sm:text-4xl font-black text-stone-900 dark:text-white">
                        {examScore}% Mastery
                      </h3>
                      <p className="text-sm font-bold text-stone-600 dark:text-stone-300">
                        {passed
                          ? `Congratulations! You scored ${examScore}% (≥80% required) and unlocked Level ${currentMeta.next || 'Mastery'}!`
                          : `Score of ${examScore}% is below the 80% passing standard. Review your errors below and re-test to unlock Level ${currentMeta.next}.`}
                      </p>
                    </div>

                    {passed && (
                      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                        <div className="px-4 py-2 rounded-xl bg-amber-500 text-stone-950 font-black text-xs flex items-center gap-2 shadow-sm">
                          <Zap className="w-4 h-4" />
                          <span>+300 XP Earned</span>
                        </div>
                        {currentMeta.next && (
                          <div className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-black text-xs flex items-center gap-2 shadow-sm">
                            <Unlock className="w-4 h-4" />
                            <span>Level {currentMeta.next} Unlocked!</span>
                          </div>
                        )}
                        <button
                          onClick={() => setActiveTab('certificate')}
                          className="px-4 py-2 rounded-xl bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-black text-xs flex items-center gap-2 shadow-sm hover:scale-105 transition"
                        >
                          <Award className="w-4 h-4" />
                          <span>View Official Diploma</span>
                        </button>
                      </div>
                    )}

                    <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                      <button
                        onClick={initializeExam}
                        className="px-5 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-400 font-black text-xs flex items-center gap-2 transition"
                      >
                        <RotateCw className="w-4 h-4" />
                        <span>Retake with New Questions</span>
                      </button>

                      <button
                        onClick={onClose}
                        className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs flex items-center gap-2 transition shadow-md"
                      >
                        <Check className="w-4 h-4" />
                        <span>Return to Curriculum Path</span>
                      </button>
                    </div>
                  </div>

                  {/* Question Breakdown and Mistake Review */}
                  <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-5 sm:p-6 space-y-4">
                    <div className="flex justify-between items-center border-b border-stone-100 dark:border-stone-800 pb-3">
                      <h4 className="text-sm font-black text-stone-900 dark:text-white flex items-center gap-2">
                        <span>Detailed Question Analysis & Explanations</span>
                      </h4>

                      <div className="flex items-center gap-1 bg-stone-100 dark:bg-stone-800 p-1 rounded-xl">
                        <button
                          onClick={() => setReviewFilter('all')}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                            reviewFilter === 'all'
                              ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-xs font-black'
                              : 'text-stone-500'
                          }`}
                        >
                          All ({questions.length})
                        </button>
                        <button
                          onClick={() => setReviewFilter('incorrect')}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                            reviewFilter === 'incorrect'
                              ? 'bg-rose-500 text-white shadow-xs font-black'
                              : 'text-stone-500'
                          }`}
                        >
                          Missed Only
                        </button>
                      </div>
                    </div>

                    <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
                      {questions
                        .map((q, idx) => ({ q, idx }))
                        .filter(({ q, idx }) => {
                          if (reviewFilter === 'all') return true;
                          const ans = selectedAnswers[idx];
                          return !ans || ans.trim().toLowerCase() !== q.correctAnswer.trim().toLowerCase();
                        })
                        .map(({ q, idx }) => {
                          const userAns = selectedAnswers[idx];
                          const isCorrect = userAns && userAns.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase();

                          return (
                            <div
                              key={idx}
                              className={`p-4 rounded-2xl border space-y-2 ${
                                isCorrect
                                  ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800'
                                  : 'bg-rose-50/40 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800'
                              }`}
                            >
                              <div className="flex justify-between items-center">
                                <span className="text-xs font-black text-stone-500 uppercase">
                                  Question {idx + 1} • {q.testedConcept}
                                </span>
                                <span className={`text-xs font-black px-2 py-0.5 rounded-md ${
                                  isCorrect
                                    ? 'bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200'
                                    : 'bg-rose-100 dark:bg-rose-900 text-rose-800 dark:text-rose-200'
                                }`}>
                                  {isCorrect ? '✓ Correct' : '✕ Missed'}
                                </span>
                              </div>

                              <p className="text-sm font-black text-stone-900 dark:text-white">
                                {q.prompt_es || q.prompt_en}
                              </p>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                                <div className="p-2 rounded-xl bg-stone-100 dark:bg-stone-800">
                                  <span className="text-stone-400 block font-bold">Your Selection:</span>
                                  <span className={isCorrect ? 'font-bold text-emerald-600 dark:text-emerald-400' : 'font-bold text-rose-600 dark:text-rose-400'}>
                                    {userAns || 'No Answer'}
                                  </span>
                                </div>
                                <div className="p-2 rounded-xl bg-stone-100 dark:bg-stone-800">
                                  <span className="text-stone-400 block font-bold">Correct Target:</span>
                                  <span className="font-bold text-emerald-600 dark:text-emerald-400">
                                    {q.correctAnswer}
                                  </span>
                                </div>
                              </div>

                              <div className="text-xs text-stone-600 dark:text-stone-300 pt-1 border-t border-stone-200/40 space-y-0.5">
                                <p>💡 <strong>Pedagogy:</strong> {q.explanation_en}</p>
                                <p className="font-arabic" dir="rtl">💡 {q.explanation_ar}</p>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ============================================================ */}
          {/* TAB 2: FLASHCARD LEVEL PREPARATION DECK                      */}
          {/* ============================================================ */}
          {activeTab === 'flashcards' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-black text-stone-900 dark:text-white">
                    Level {level} Vocabulary Prep Flashcards
                  </h3>
                  <p className="text-xs text-stone-500">
                    Dual-coding visual memory cards randomized from the active {level} lexicon.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('exam')}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs shadow-md transition flex items-center gap-1.5"
                >
                  <span>Start 15-Q Exam</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {assessmentData && assessmentData.flashcardPool.length > 0 && (
                <div className="flex flex-col items-center justify-center space-y-4">
                  {/* Interactive Flip Flashcard */}
                  {(() => {
                    const card = assessmentData.flashcardPool[flashcardIndex] || assessmentData.flashcardPool[0];
                    const spanishText = card.spanish || card.word || '';
                    const englishText = card.english || card.translation_en || '';
                    const arabicText = card.arabic || card.translation_ar || '';

                    return (
                      <div
                        onClick={() => setIsFlipped(!isFlipped)}
                        className="w-full max-w-lg min-h-[300px] cursor-pointer perspective-1000 select-none"
                      >
                        <div className={`relative w-full h-full min-h-[300px] rounded-3xl p-6 transition-all duration-500 shadow-xl border flex flex-col justify-between ${
                          isFlipped
                            ? 'bg-gradient-to-br from-amber-500 to-orange-600 text-stone-950 border-amber-400'
                            : 'bg-white dark:bg-stone-900 text-stone-900 dark:text-white border-stone-200 dark:border-stone-700'
                        }`}>
                          {/* Card Header */}
                          <div className="flex justify-between items-center text-xs font-black">
                            <span className={`px-2.5 py-0.5 rounded-full ${
                              isFlipped ? 'bg-stone-950 text-amber-400' : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300'
                            }`}>
                              Card {flashcardIndex + 1} of {assessmentData.flashcardPool.length}
                            </span>
                            <span className={`px-2 py-0.5 rounded-md ${
                              isFlipped ? 'bg-white/20 text-stone-950' : 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300'
                            }`}>
                              {card.category} • {card.partOfSpeech || 'noun'}
                            </span>
                          </div>

                          {/* Front vs Back Content */}
                          {!isFlipped ? (
                            <div className="text-center py-6 space-y-3">
                              <span className="text-3xl block">🇪🇸</span>
                              <h3 className="text-3xl font-black tracking-tight">
                                {card.gender && (card.gender === 'la' || card.gender === 'el') && (
                                  <span className="text-amber-500 text-2xl mr-2 font-mono">
                                    {card.gender}
                                  </span>
                                )}
                                {spanishText}
                              </h3>
                              <p className="text-xs font-mono text-stone-400">
                                {card.phonetic || card.ipa || ''}
                              </p>
                              <p className="text-xs text-amber-700 dark:text-amber-400 font-bold">
                                (Tap anywhere to flip card)
                              </p>
                            </div>
                          ) : (
                            <div className="text-center py-4 space-y-3">
                              <h4 className="text-2xl font-black text-stone-950">
                                {englishText}
                              </h4>
                              <p className="text-xl font-bold font-arabic text-stone-900" dir="rtl">
                                {arabicText}
                              </p>
                              {card.examples && card.examples.length > 0 && (
                                <div className="p-3 rounded-2xl bg-black/10 text-xs text-left space-y-1">
                                  <p className="font-black text-stone-950">
                                    "{card.examples[0].es}"
                                  </p>
                                  <p className="text-stone-900/80">
                                    {card.examples[0].en}
                                  </p>
                                </div>
                              )}
                            </div>
                          )}

                          {/* Card Footer Audio Button */}
                          <div className="flex justify-between items-center pt-2 border-t border-stone-200/40">
                            <span className="text-[11px] font-bold opacity-70">
                              {isFlipped ? 'Answer Revealed' : 'Click to Flip'}
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                speakSpanish(spanishText);
                              }}
                              className={`p-2 rounded-xl transition ${
                                isFlipped
                                  ? 'bg-stone-950 text-white hover:bg-stone-800'
                                  : 'bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200 hover:bg-amber-200'
                              }`}
                            >
                              <Volume2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })()}

                  {/* Flashcard Navigation */}
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => {
                        setIsFlipped(false);
                        setFlashcardIndex(prev => (prev > 0 ? prev - 1 : assessmentData.flashcardPool.length - 1));
                      }}
                      className="px-4 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-800 dark:text-stone-200 font-bold text-xs flex items-center gap-1.5"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Prev</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsFlipped(false);
                        setFlashcardIndex(prev => (prev + 1 < assessmentData.flashcardPool.length ? prev + 1 : 0));
                      }}
                      className="px-4 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-800 dark:text-stone-200 font-bold text-xs flex items-center gap-1.5"
                    >
                      <span>Next</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ============================================================ */}
          {/* TAB 3: OFFICIAL IBERACADEMY CEFR MASTERY DIPLOMA             */}
          {/* ============================================================ */}
          {activeTab === 'certificate' && (
            <div className="space-y-6 animate-fadeIn">
              {/* Certificate Paper Canvas */}
              <div className="relative bg-gradient-to-b from-amber-50/50 via-white to-amber-50/30 border-8 border-double border-amber-600/40 rounded-3xl p-8 sm:p-12 text-center text-stone-900 shadow-2xl max-w-2xl mx-auto space-y-6">
                
                {/* Decorative Corner Seals */}
                <div className="flex justify-between items-center">
                  <IberacademyLogo variant="icon" className="w-12 h-12 shadow-md" />
                  <div className="text-right">
                    <span className="text-[10px] font-black text-amber-700 uppercase tracking-widest block">
                      CEFR DIPLOMA OF MASTERY
                    </span>
                    <span className="text-xs font-mono text-stone-400">
                      ID: IBR-{level}-{new Date().getFullYear()}-001
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-xs uppercase tracking-widest text-stone-500 font-black">
                    Official Certificate of Spanish Language Fluency
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-stone-950 font-serif">
                    Iberacademy Diploma
                  </h3>
                  <p className="text-xs text-stone-600 max-w-md mx-auto">
                    This certifies that the learner has demonstrated proven linguistic competence and vocabulary retention exceeding the CEFR standard.
                  </p>
                </div>

                {/* Candidate Name */}
                <div className="py-2 border-b-2 border-stone-300 w-3/4 mx-auto">
                  <span className="text-2xl sm:text-3xl font-extrabold text-amber-700 tracking-tight">
                    Moe Mahran
                  </span>
                </div>

                {/* Award Details */}
                <div className="grid grid-cols-3 gap-3 text-xs pt-2">
                  <div className="p-3 rounded-2xl bg-amber-100/60 border border-amber-200">
                    <span className="text-stone-500 font-bold block">CEFR Level</span>
                    <span className="text-base font-black text-amber-800">{level} Certified</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-emerald-100/60 border border-emerald-200">
                    <span className="text-stone-500 font-bold block">Exam Score</span>
                    <span className="text-base font-black text-emerald-800">{examScore || 93}% Mastery</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-stone-100 border border-stone-200">
                    <span className="text-stone-500 font-bold block">Date Issued</span>
                    <span className="text-xs font-black text-stone-800">{new Date().toISOString().split('T')[0]}</span>
                  </div>
                </div>

                {/* Signatures & Seal */}
                <div className="pt-6 flex justify-between items-end border-t border-stone-200 text-xs">
                  <div className="text-left space-y-1">
                    <div className="w-32 h-0.5 bg-stone-400" />
                    <span className="font-extrabold text-stone-800 block">M. Mahran</span>
                    <span className="text-[10px] text-stone-500">Director of Pedagogy</span>
                  </div>

                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex flex-col items-center justify-center shadow-lg font-black text-[10px] ring-4 ring-amber-300">
                    <span>SEAL</span>
                    <span>★ 100% ★</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => window.print()}
                  className="px-5 py-2.5 rounded-xl bg-stone-900 text-white font-bold text-xs flex items-center gap-2 shadow-md hover:bg-stone-800 transition"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Diploma</span>
                </button>

                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs flex items-center gap-2 shadow-md transition"
                >
                  <Check className="w-4 h-4" />
                  <span>Continue Next Level Pathway</span>
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
