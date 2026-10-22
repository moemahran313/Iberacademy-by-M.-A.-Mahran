import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Brain,
  TrendingUp,
  Clock,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
  Award,
  BarChart3,
  ShieldCheck,
  RotateCcw,
  ArrowRight,
  BookOpen,
  Info,
  ChevronRight
} from 'lucide-react';
import {
  initializeAssessmentState,
  selectNextItem,
  processUserResponse,
  generateAssessmentResult,
  mapThetaToCEFR
} from '../../services/catAssessmentService';
import {
  AssessmentState,
  AssessmentItem,
  AssessmentResult,
  SkillCategory
} from '../../types/assessment';
import { CEFRLevel } from '../../types';
import { soundEffects } from '../../utils/audio';

interface AdaptivePlacementExamProps {
  onClose?: () => void;
  onApplyLevel?: (level: CEFRLevel, xpAwarded: number) => void;
  isModal?: boolean;
}

export const AdaptivePlacementExam: React.FC<AdaptivePlacementExamProps> = ({
  onClose,
  onApplyLevel,
  isModal = false
}) => {
  const [assessmentState, setAssessmentState] = useState<AssessmentState>(initializeAssessmentState());
  const [currentItem, setCurrentItem] = useState<AssessmentItem | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [questionStartTime, setQuestionStartTime] = useState<number>(Date.now());
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize first item
  useEffect(() => {
    const firstItem = selectNextItem(0.0, []);
    setCurrentItem(firstItem);
    setQuestionStartTime(Date.now());
  }, []);

  // Timer loop
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setElapsedSeconds(prev => prev + 1);
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const formatTimer = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(idx);
    soundEffects.playPop();
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || !currentItem) return;

    setIsAnswerSubmitted(true);
    const responseTimeSecs = Math.round((Date.now() - questionStartTime) / 1000);

    const isCorrect = selectedOption === currentItem.correctAnswerIndex;
    if (isCorrect) {
      soundEffects.playCorrect();
    } else {
      soundEffects.playIncorrect();
    }

    setTimeout(() => {
      // Process response in IRT Engine
      const updatedState = processUserResponse(
        assessmentState,
        currentItem,
        selectedOption,
        responseTimeSecs
      );

      setAssessmentState(updatedState);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);

      if (updatedState.isComplete) {
        const result = generateAssessmentResult(updatedState);
        setAssessmentResult(result);
        soundEffects.playLevelUp();
      } else {
        const nextItem = selectNextItem(updatedState.currentTheta, updatedState.administeredItems);
        setCurrentItem(nextItem);
        setQuestionStartTime(Date.now());
      }
    }, 800);
  };

  const handleRetakeExam = () => {
    const newState = initializeAssessmentState();
    setAssessmentState(newState);
    setAssessmentResult(null);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setElapsedSeconds(0);
    const firstItem = selectNextItem(0.0, []);
    setCurrentItem(firstItem);
    setQuestionStartTime(Date.now());
  };

  const currentLevelEstimate = mapThetaToCEFR(assessmentState.currentTheta);

  return (
    <div className={`w-full ${isModal ? '' : 'max-w-5xl mx-auto py-6 px-4'}`}>
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl shadow-xl overflow-hidden transition-all duration-300">
        
        {/* TOP BAR HEADER */}
        <div className="bg-stone-900 text-stone-100 px-6 py-4 flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/20 text-amber-400 rounded-xl border border-amber-500/30">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-black tracking-tight flex items-center gap-2">
                Computerized Adaptive Testing (CAT)
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 uppercase">
                  Rasch IRT 1PL
                </span>
              </h2>
              <p className="text-xs text-stone-400">
                Item Response Theory • Dynamic Difficulty • Real-time Estimation
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-stone-800 px-3 py-1.5 rounded-xl border border-stone-700 text-xs font-mono font-bold text-amber-400">
              <Clock className="w-3.5 h-3.5" />
              {formatTimer(elapsedSeconds)}
            </div>

            {onClose && (
              <button
                onClick={onClose}
                className="text-stone-400 hover:text-white p-1.5 rounded-lg hover:bg-stone-800 transition cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* ACTIVE EXAM STATE */}
        {!assessmentResult ? (
          <div className="p-6 sm:p-8 space-y-8">
            {/* STATS & ABILITY TRAJECTORY OVERVIEW */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-stone-50 dark:bg-stone-950/60 p-4 rounded-2xl border border-stone-200 dark:border-stone-800">
              {/* Stat 1: Question Progress */}
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
                  Question Progress
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-black text-stone-900 dark:text-stone-100">
                    #{assessmentState.administeredItems.length + 1}
                  </span>
                  <span className="text-xs text-stone-500 font-semibold">
                    (Max 20 • Target SEM &lt; 0.32)
                  </span>
                </div>
                <div className="w-full bg-stone-200 dark:bg-stone-800 h-2 rounded-full overflow-hidden mt-1">
                  <div
                    className="bg-amber-500 h-full transition-all duration-300 rounded-full"
                    style={{
                      width: `${Math.min(100, ((assessmentState.administeredItems.length + 1) / 20) * 100)}%`
                    }}
                  />
                </div>
              </div>

              {/* Stat 2: Current Ability Estimate theta */}
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
                  Estimated Ability (θ)
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-black text-amber-600 dark:text-amber-400 font-mono">
                    θ = {assessmentState.currentTheta > 0 ? `+${assessmentState.currentTheta.toFixed(2)}` : assessmentState.currentTheta.toFixed(2)}
                  </span>
                  <span className="text-xs font-black px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-300/40">
                    {currentLevelEstimate}
                  </span>
                </div>
                <p className="text-[11px] text-stone-500 dark:text-stone-400">
                  SEM Error: <span className="font-mono font-bold">{assessmentState.currentSEM.toFixed(2)}</span>
                </p>
              </div>

              {/* Stat 3: Target Item Difficulty b */}
              <div className="space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
                  Active Item Difficulty (b)
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
                    b = {currentItem?.itemDifficulty !== undefined ? (currentItem.itemDifficulty > 0 ? `+${currentItem.itemDifficulty.toFixed(2)}` : currentItem.itemDifficulty.toFixed(2)) : '0.00'}
                  </span>
                  <span className="text-xs font-bold text-stone-500">
                    Category: {currentItem?.skillCategory || 'Grammar'}
                  </span>
                </div>
                <p className="text-[11px] text-stone-500">
                  Discriminator (a): <span className="font-mono font-bold">1.70</span>
                </p>
              </div>
            </div>

            {/* REAL-TIME ABILITY TRAJECTORY CHART */}
            {assessmentState.trajectory.length > 0 && (
              <div className="bg-stone-900 text-stone-100 p-5 rounded-2xl border border-stone-800 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2 font-bold text-amber-400">
                    <TrendingUp className="w-4 h-4" />
                    Ability Convergence Trajectory (θ ± 1.96·SEM)
                  </div>
                  <span className="text-[10px] text-stone-400 font-mono">
                    95% Confidence Band
                  </span>
                </div>

                {/* SVG TRAJECTORY CANVAS */}
                <div className="h-32 w-full relative">
                  <TrajectorySVGTrajectory trajectory={assessmentState.trajectory} />
                </div>
              </div>
            )}

            {/* QUESTION DISPLAY CARD */}
            {currentItem ? (
              <div className="space-y-6">
                <div className="p-6 bg-gradient-to-br from-amber-500/5 via-stone-50 to-stone-100 dark:from-stone-900 dark:to-stone-950 rounded-2xl border border-amber-500/20 shadow-sm space-y-4">
                  <div className="flex items-center justify-between text-xs font-bold text-stone-500 border-b border-stone-200 dark:border-stone-800 pb-3">
                    <span className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-extrabold uppercase tracking-wide">
                      <Sparkles className="w-3.5 h-3.5" />
                      Target CEFR: {currentItem.cefrEquivalent}
                    </span>
                    <span className="bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 px-2.5 py-1 rounded-full text-[11px] font-mono">
                      Category: {currentItem.skillCategory}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-black text-stone-900 dark:text-stone-100 leading-snug">
                    {currentItem.questionText}
                  </h3>

                  <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 italic bg-white dark:bg-stone-900/60 p-2.5 rounded-xl border border-stone-200/80 dark:border-stone-800">
                    <Info className="w-3.5 h-3.5 text-amber-500 shrink-0 not-italic" />
                    <span>🇬🇧 Context: {currentItem.contextTranslation}</span>
                  </div>
                </div>

                {/* OPTIONS GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentItem.options.map((optionText, idx) => {
                    const isSelected = selectedOption === idx;
                    const isCorrect = idx === currentItem.correctAnswerIndex;

                    let btnStyle = 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:border-amber-400 hover:bg-amber-50/50 dark:hover:bg-amber-950/20 text-stone-800 dark:text-stone-200';
                    if (isSelected) {
                      btnStyle = 'bg-amber-500 text-stone-950 border-amber-500 shadow-md scale-[1.01]';
                    }

                    if (isAnswerSubmitted) {
                      if (isCorrect) {
                        btnStyle = 'bg-emerald-500 text-white border-emerald-500 font-black';
                      } else if (isSelected && !isCorrect) {
                        btnStyle = 'bg-rose-500 text-white border-rose-500 font-black';
                      }
                    }

                    return (
                      <motion.button
                        key={idx}
                        whileHover={{ scale: isAnswerSubmitted ? 1 : 1.01 }}
                        whileTap={{ scale: isAnswerSubmitted ? 1 : 0.98 }}
                        onClick={() => handleSelectOption(idx)}
                        disabled={isAnswerSubmitted}
                        className={`p-4 rounded-2xl border text-left font-extrabold text-sm sm:text-base transition-all duration-150 flex items-center justify-between cursor-pointer ${btnStyle}`}
                      >
                        <span>{optionText}</span>
                        {isAnswerSubmitted && isCorrect && (
                          <CheckCircle2 className="w-5 h-5 text-white shrink-0" />
                        )}
                        {isAnswerSubmitted && isSelected && !isCorrect && (
                          <XCircle className="w-5 h-5 text-white shrink-0" />
                        )}
                      </motion.button>
                    );
                  })}
                </div>

                {/* SUBMIT BUTTON */}
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={handleSubmitAnswer}
                    disabled={selectedOption === null || isAnswerSubmitted}
                    className={`px-8 py-3.5 rounded-2xl font-black text-sm flex items-center gap-2 shadow-lg transition-all duration-200 cursor-pointer ${
                      selectedOption !== null && !isAnswerSubmitted
                        ? 'bg-amber-500 hover:bg-amber-400 text-stone-950 shadow-amber-500/20 scale-100'
                        : 'bg-stone-200 dark:bg-stone-800 text-stone-400 dark:text-stone-600 cursor-not-allowed opacity-60'
                    }`}
                  >
                    <span>Submit & Calculate IRT Step</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        ) : (
          /* ==========================================
             POST-EXAM DIAGNOSTIC RESULT DASHBOARD
             ========================================== */
          <div className="p-6 sm:p-10 space-y-8 animate-fadeIn">
            {/* HERO RESULT BADGE */}
            <div className="text-center space-y-4 py-4 border-b border-stone-200 dark:border-stone-800">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="w-24 h-24 rounded-3xl bg-gradient-to-br from-amber-400 to-amber-600 text-stone-950 mx-auto flex flex-col items-center justify-center shadow-xl border-4 border-white dark:border-stone-800"
              >
                <span className="text-xs font-black uppercase tracking-wider opacity-80">
                  Assessed CEFR
                </span>
                <span className="text-3xl font-black tracking-tight">
                  {assessmentResult.cefrLevel}
                </span>
              </motion.div>

              <div className="space-y-1">
                <h3 className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-stone-100">
                  CEFR Placement Level: {assessmentResult.cefrLevel}
                </h3>
                <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 max-w-lg mx-auto">
                  Rasch IRT Model converged with Standard Error $SEM = {assessmentResult.finalSEM.toFixed(2)}$ across {assessmentResult.totalQuestions} adaptive items.
                </p>
              </div>
            </div>

            {/* IRT METRICS & CONFIDENCE INTERVAL CARD */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-950/60 border border-stone-200 dark:border-stone-800 space-y-1">
                <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                  Final Ability θ Score
                </span>
                <p className="text-2xl font-black font-mono text-amber-600 dark:text-amber-400">
                  θ = {assessmentResult.finalTheta > 0 ? `+${assessmentResult.finalTheta.toFixed(2)}` : assessmentResult.finalTheta.toFixed(2)}
                </p>
                <p className="text-[11px] text-stone-500">
                  Scale: -3.0 (Beginner) to +3.0 (Mastery)
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-950/60 border border-stone-200 dark:border-stone-800 space-y-1">
                <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                  95% Confidence Interval
                </span>
                <p className="text-2xl font-black font-mono text-emerald-600 dark:text-emerald-400">
                  [{assessmentResult.confidenceInterval.lower.toFixed(2)}, {assessmentResult.confidenceInterval.upper.toFixed(2)}]
                </p>
                <p className="text-[11px] text-stone-500">
                  $\pm 1.96 \cdot SEM$ Precision Band
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-950/60 border border-stone-200 dark:border-stone-800 space-y-1">
                <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                  Overall Accuracy & Time
                </span>
                <p className="text-2xl font-black text-stone-900 dark:text-stone-100">
                  {assessmentResult.accuracyPercentage}% ({formatTimer(assessmentResult.totalTimeSeconds)})
                </p>
                <p className="text-[11px] text-stone-500">
                  {assessmentResult.totalQuestions} total items administered
                </p>
              </div>
            </div>

            {/* TRAJECTORY SUMMARY CHART */}
            <div className="bg-stone-900 text-stone-100 p-6 rounded-2xl border border-stone-800 space-y-3">
              <h4 className="text-xs font-black text-amber-400 uppercase tracking-wider flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Adaptive Ability Convergence Trajectory
              </h4>
              <div className="h-40 w-full relative">
                <TrajectorySVGTrajectory trajectory={assessmentResult.trajectory} />
              </div>
            </div>

            {/* CATEGORY BREAKDOWN CARDS */}
            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-stone-400">
                Skill Category Diagnostic Breakdown
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(Object.keys(assessmentResult.categoryBreakdown) as SkillCategory[]).map(cat => {
                  const data = assessmentResult.categoryBreakdown[cat];
                  return (
                    <div
                      key={cat}
                      className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-950/50 border border-stone-200 dark:border-stone-800 space-y-2"
                    >
                      <div className="flex justify-between items-center text-xs font-bold">
                        <span className="text-stone-800 dark:text-stone-200">{cat}</span>
                        <span className="font-mono text-amber-600 dark:text-amber-400">
                          {data.correct}/{data.total} ({data.accuracy}%)
                        </span>
                      </div>
                      <div className="w-full bg-stone-200 dark:bg-stone-800 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-amber-500 h-full rounded-full transition-all duration-500"
                          style={{ width: `${data.accuracy}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* RECOMMENDED FOCUS AREAS */}
            <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-amber-700 dark:text-amber-300 flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Targeted Pedagogical Focus Areas
              </h4>
              <ul className="space-y-1.5">
                {assessmentResult.recommendedFocusAreas.map((focus, i) => (
                  <li key={i} className="text-xs font-bold text-stone-800 dark:text-stone-200 flex items-start gap-2">
                    <span className="text-amber-500 font-black">•</span>
                    <span>{focus}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-stone-200 dark:border-stone-800">
              <button
                onClick={handleRetakeExam}
                className="px-5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 font-bold text-xs text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition flex items-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Retake Exam
              </button>

              {onApplyLevel && (
                <button
                  onClick={() => onApplyLevel(assessmentResult.cefrLevel, 100)}
                  className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs sm:text-sm shadow-lg transition flex items-center gap-2 cursor-pointer"
                >
                  <Award className="w-4 h-4" />
                  Set Profile Level to {assessmentResult.cefrLevel} (+100 XP)
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * Trajectory SVG Chart Component for rendering theta & confidence bands
 */
const TrajectorySVGTrajectory: React.FC<{ trajectory: any[] }> = ({ trajectory }) => {
  if (!trajectory || trajectory.length === 0) return null;

  const width = 600;
  const height = 140;
  const paddingLeft = 35;
  const paddingRight = 20;
  const paddingTop = 15;
  const paddingBottom = 25;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  const minTheta = -4.0;
  const maxTheta = 4.0;

  const getX = (index: number) => {
    if (trajectory.length <= 1) return paddingLeft + chartWidth / 2;
    return paddingLeft + (index / (trajectory.length - 1)) * chartWidth;
  };

  const getY = (thetaVal: number) => {
    const norm = (thetaVal - minTheta) / (maxTheta - minTheta);
    return paddingTop + chartHeight * (1 - norm);
  };

  // Build SVG path for main theta line
  const linePoints = trajectory.map((pt, i) => `${getX(i)},${getY(pt.theta)}`).join(' L ');
  const linePath = `M ${linePoints}`;

  // Build SVG polygon path for 95% confidence interval shaded area
  const upperPoints = trajectory.map((pt, i) => `${getX(i)},${getY(pt.ciUpper)}`).join(' L ');
  const lowerPoints = trajectory.slice().reverse().map((pt, i) => {
    const revIdx = trajectory.length - 1 - i;
    return `${getX(revIdx)},${getY(pt.ciLower)}`;
  }).join(' L ');
  const areaPath = `M ${upperPoints} L ${lowerPoints} Z`;

  const yZero = getY(0);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
      {/* Grid line at theta = 0 */}
      <line
        x1={paddingLeft}
        y1={yZero}
        x2={width - paddingRight}
        y2={yZero}
        stroke="#525252"
        strokeDasharray="3 3"
        strokeWidth="1"
      />

      {/* Grid Y Axis Labels */}
      <text x={paddingLeft - 6} y={getY(3)} fill="#a3a3a3" fontSize="8" textAnchor="end" fontFamily="monospace">
        +3.0
      </text>
      <text x={paddingLeft - 6} y={yZero + 3} fill="#f59e0b" fontSize="8" textAnchor="end" fontFamily="monospace" fontWeight="bold">
        0.0
      </text>
      <text x={paddingLeft - 6} y={getY(-3)} fill="#a3a3a3" fontSize="8" textAnchor="end" fontFamily="monospace">
        -3.0
      </text>

      {/* Shaded Confidence Interval Band */}
      <path d={areaPath} fill="#f59e0b" fillOpacity="0.15" stroke="none" />

      {/* Main Theta Line */}
      <path d={linePath} fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

      {/* Data Points */}
      {trajectory.map((pt, i) => {
        const cx = getX(i);
        const cy = getY(pt.theta);
        const color = pt.isCorrect ? '#10b981' : '#f43f5e';

        return (
          <g key={i}>
            <circle cx={cx} cy={cy} r="4" fill={color} stroke="#171717" strokeWidth="1.5" />
            <text x={cx} y={height - 6} fill="#737373" fontSize="8" textAnchor="middle" fontFamily="monospace">
              Q{pt.questionIndex}
            </text>
          </g>
        );
      })}
    </svg>
  );
};
