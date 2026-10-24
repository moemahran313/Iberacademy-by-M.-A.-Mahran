import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Timer,
  Flag,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Award,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  FileText,
  HelpCircle,
  Pause,
  Play,
  BarChart3,
  ListFilter,
  Sparkles,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Check,
  Zap,
  Info
} from 'lucide-react';
import {
  DELEExam,
  DELEExamMode,
  DELELevel,
  DELETaskType,
  DELEUserAnswers,
  DELEScoreBreakdown
} from '../../types/dele';
import { DELE_B1_EXAM, DELE_B2_EXAM } from '../../data/deleExamsData';
import { soundEffects } from '../../utils/audio';
import { triggerConfettiBurst } from '../../utils/confetti';
import { ExamSecurityWrapper } from './ExamSecurityWrapper';


interface DELEExamSimulatorProps {
  onBackToDashboard?: () => void;
}

export const DELEExamSimulator: React.FC<DELEExamSimulatorProps> = ({
  onBackToDashboard
}) => {
  // Config state
  const [selectedLevel, setSelectedLevel] = useState<DELELevel>('B2');
  const [examMode, setExamMode] = useState<DELEExamMode>('exam');
  const [isExamActive, setIsExamActive] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Active Exam Data
  const currentExam: DELEExam = useMemo(() => {
    return selectedLevel === 'B1' ? DELE_B1_EXAM : DELE_B2_EXAM;
  }, [selectedLevel]);

  // Navigation State
  const [activeTask, setActiveTask] = useState<DELETaskType>('tarea1');
  const [showReviewDrawer, setShowReviewDrawer] = useState<boolean>(false);

  // User State
  const [userAnswers, setUserAnswers] = useState<DELEUserAnswers>({
    tarea1: {},
    tarea2: {},
    tarea3: {},
    tarea4: {}
  });
  const [flaggedItems, setFlaggedItems] = useState<Record<string, boolean>>({});

  // Practice Mode Instant Verifications
  const [verifiedItems, setVerifiedItems] = useState<Record<string, boolean>>({});

  // Timer State
  const [timeLeftSeconds, setTimeLeftSeconds] = useState<number>(
    currentExam.timeLimitMinutes * 60
  );
  const [isTimerPaused, setIsTimerPaused] = useState<boolean>(false);
  const [timeSpentSeconds, setTimeSpentSeconds] = useState<number>(0);

  // Score state
  const [scoreReport, setScoreReport] = useState<DELEScoreBreakdown | null>(null);

  // Reset exam state when level changes
  const resetExam = useCallback(() => {
    setIsExamActive(false);
    setIsSubmitted(false);
    setActiveTask('tarea1');
    setUserAnswers({ tarea1: {}, tarea2: {}, tarea3: {}, tarea4: {} });
    setFlaggedItems({});
    setVerifiedItems({});
    setTimeLeftSeconds(currentExam.timeLimitMinutes * 60);
    setTimeSpentSeconds(0);
    setIsTimerPaused(false);
    setScoreReport(null);
  }, [currentExam]);

  useEffect(() => {
    resetExam();
  }, [selectedLevel, resetExam]);

  // Start Exam
  const handleStartExam = () => {
    soundEffects.playPop();
    setUserAnswers({ tarea1: {}, tarea2: {}, tarea3: {}, tarea4: {} });
    setFlaggedItems({});
    setVerifiedItems({});
    setTimeLeftSeconds(currentExam.timeLimitMinutes * 60);
    setTimeSpentSeconds(0);
    setIsTimerPaused(false);
    setIsSubmitted(false);
    setIsExamActive(true);
    setActiveTask('tarea1');
  };

  // Timer Ticker
  useEffect(() => {
    if (!isExamActive || isSubmitted || isTimerPaused) return;

    const interval = setInterval(() => {
      setTimeLeftSeconds(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmitExam(); // Auto submit on timer expiry
          return 0;
        }
        return prev - 1;
      });
      setTimeSpentSeconds(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isExamActive, isSubmitted, isTimerPaused]);

  // Calculate Item Answers Count
  const answersCount = useMemo(() => {
    const t1 = Object.keys(userAnswers.tarea1).length;
    const t2 = Object.keys(userAnswers.tarea2).length;
    const t3 = Object.keys(userAnswers.tarea3).length;
    const t4 = Object.keys(userAnswers.tarea4).length;
    return {
      tarea1: t1,
      tarea2: t2,
      tarea3: t3,
      tarea4: t4,
      total: t1 + t2 + t3 + t4
    };
  }, [userAnswers]);

  // Toggle Flag
  const toggleFlag = (itemId: string) => {
    soundEffects.playPop();
    setFlaggedItems(prev => ({ ...prev, [itemId]: !prev[itemId] }));
  };

  // Answer Setters
  const handleAnswerT1 = (qId: string, value: 'A' | 'B' | 'C') => {
    soundEffects.playPop();
    setUserAnswers(prev => ({
      ...prev,
      tarea1: { ...prev.tarea1, [qId]: value }
    }));
  };

  const handleAnswerT2 = (statementId: string, personId: string) => {
    soundEffects.playPop();
    setUserAnswers(prev => ({
      ...prev,
      tarea2: { ...prev.tarea2, [statementId]: personId }
    }));
  };

  const handleAnswerT3 = (gapIndex: number, sentenceOptionId: string) => {
    soundEffects.playPop();
    setUserAnswers(prev => ({
      ...prev,
      tarea3: { ...prev.tarea3, [gapIndex]: sentenceOptionId }
    }));
  };

  const handleAnswerT4 = (itemNumber: number, value: 'A' | 'B' | 'C') => {
    soundEffects.playPop();
    setUserAnswers(prev => ({
      ...prev,
      tarea4: { ...prev.tarea4, [itemNumber]: value }
    }));
  };

  // Submit Exam & Compute Official Cervantes Rubric
  const handleSubmitExam = () => {
    soundEffects.playLevelUp();

    // Tarea 1 score (6 items)
    let t1Correct = 0;
    currentExam.tarea1.questions.forEach(q => {
      if (userAnswers.tarea1[q.id] === q.correctAnswer) t1Correct++;
    });

    // Tarea 2 score (10 items)
    let t2Correct = 0;
    currentExam.tarea2.statements.forEach(st => {
      if (userAnswers.tarea2[st.id] === st.correctPersonId) t2Correct++;
    });

    // Tarea 3 score (6 items)
    let t3Correct = 0;
    Object.entries(currentExam.tarea3.correctGaps).forEach(([gapIdxStr, correctOptId]) => {
      const gapIdx = Number(gapIdxStr);
      if (userAnswers.tarea3[gapIdx] === correctOptId) t3Correct++;
    });

    // Tarea 4 score (14 items)
    let t4Correct = 0;
    currentExam.tarea4.items.forEach(it => {
      if (userAnswers.tarea4[it.itemNumber] === it.correctAnswer) t4Correct++;
    });

    const totalRaw = t1Correct + t2Correct + t3Correct + t4Correct;
    const totalItems = currentExam.totalItems; // 36 items
    const scaledScore = Number(((totalRaw / totalItems) * 25.0).toFixed(2));
    const isApto = scaledScore >= 15.0; // 60% pass threshold on Cervantes reading

    const breakdown: DELEScoreBreakdown = {
      tarea1Score: { correct: t1Correct, total: 6, percentage: Math.round((t1Correct / 6) * 100) },
      tarea2Score: { correct: t2Correct, total: 10, percentage: Math.round((t2Correct / 10) * 100) },
      tarea3Score: { correct: t3Correct, total: 6, percentage: Math.round((t3Correct / 6) * 100) },
      tarea4Score: { correct: t4Correct, total: 14, percentage: Math.round((t4Correct / 14) * 100) },
      totalRawCorrect: totalRaw,
      totalItems,
      scaledScore,
      isApto,
      statusLabel: isApto ? 'APTO' : 'NO APTO',
      timeSpentSeconds
    };

    setScoreReport(breakdown);
    setIsSubmitted(true);
    if (isApto) {
      triggerConfettiBurst();
    }
  };

  // Format Timer
  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Timer Color styling
  const timerStyle = useMemo(() => {
    if (timeLeftSeconds < 300) {
      return 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 animate-pulse';
    }
    if (timeLeftSeconds < 900) {
      return 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800';
    }
    return 'text-[#2D5A43] dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800';
  }, [timeLeftSeconds]);

  // If exam has not started, display Cervantes Exam Selection Launcher
  if (!isExamActive && !isSubmitted) {
    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-8">
        {/* Launcher Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-stone-900 dark:bg-[#181615] text-white p-8 sm:p-10 border border-stone-800 shadow-xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C85A32]/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
          <div className="relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C85A32]/20 border border-[#C85A32]/40 text-[#E07A5F] text-xs font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Simulador Oficial DELE / SIELE (Instituto Cervantes)</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight font-header">
              Examen Oficial DELE
            </h1>
            <p className="text-stone-300 max-w-2xl text-sm sm:text-base leading-relaxed">
              Prueba de Comprensión de Lectura estructurada con las 4 tareas oficiales del Instituto Cervantes. Incluye cronómetro estricto, tareas interactivas de reconstrucción de texto, opción múltiple y ponderación de puntuación a escala 0–25 puntos.
            </p>
          </div>
        </div>

        {/* Configuration Panel */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Level Selector */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#181615] border border-stone-200/80 dark:border-stone-800 space-y-4 shadow-xs">
            <div className="flex items-center gap-2 text-stone-900 dark:text-stone-100 font-bold text-lg">
              <Award className="w-5 h-5 text-[#C85A32]" />
              <h2>Selecciona tu Nivel CEFR</h2>
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-400">
              Escoge la prueba correspondiente a tu dominio del idioma según el Marco Común Europeo.
            </p>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  soundEffects.playPop();
                  setSelectedLevel('B1');
                }}
                className={`p-4 rounded-xl border text-left transition-all ${
                  selectedLevel === 'B1'
                    ? 'border-[#C85A32] bg-[#C85A32]/10 text-stone-900 dark:text-stone-100 ring-2 ring-[#C85A32]/30'
                    : 'border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:border-stone-300'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="text-xl font-black text-[#C85A32]">DELE B1</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-200 dark:bg-stone-800">
                    60 min
                  </span>
                </div>
                <p className="text-xs mt-1 text-stone-500 dark:text-stone-400">
                  Nivel Umbral • Textos cotidianos y narrativos
                </p>
              </button>

              <button
                type="button"
                onClick={() => {
                  soundEffects.playPop();
                  setSelectedLevel('B2');
                }}
                className={`p-4 rounded-xl border text-left transition-all ${
                  selectedLevel === 'B2'
                    ? 'border-[#C85A32] bg-[#C85A32]/10 text-stone-900 dark:text-stone-100 ring-2 ring-[#C85A32]/30'
                    : 'border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:border-stone-300'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="text-xl font-black text-[#C85A32]">DELE B2</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-stone-200 dark:bg-stone-800">
                    70 min
                  </span>
                </div>
                <p className="text-xs mt-1 text-stone-500 dark:text-stone-400">
                  Nivel Avanzado • Textos complejos y prensa
                </p>
              </button>
            </div>
          </div>

          {/* Mode Selector */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#181615] border border-stone-200/80 dark:border-stone-800 space-y-4 shadow-xs">
            <div className="flex items-center gap-2 text-stone-900 dark:text-stone-100 font-bold text-lg">
              <Timer className="w-5 h-5 text-[#2D5A43]" />
              <h2>Modalidad de Examen</h2>
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-400">
              Selecciona el grado de rigor del cronómetro e interacción didáctica.
            </p>
            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  soundEffects.playPop();
                  setExamMode('exam');
                }}
                className={`w-full p-3.5 rounded-xl border text-left flex items-start gap-3 transition-all ${
                  examMode === 'exam'
                    ? 'border-[#2D5A43] bg-[#2D5A43]/10 text-stone-900 dark:text-stone-100 ring-2 ring-[#2D5A43]/30'
                    : 'border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:border-stone-300'
                }`}
              >
                <ShieldCheck className="w-5 h-5 text-[#2D5A43] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-sm">Modo Examen Oficial Cronometrado</div>
                  <div className="text-xs text-stone-500 dark:text-stone-400">
                    Sin pausas, retroalimentación oculta hasta la entrega final, simulación real de tribunal.
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  soundEffects.playPop();
                  setExamMode('practice');
                }}
                className={`w-full p-3.5 rounded-xl border text-left flex items-start gap-3 transition-all ${
                  examMode === 'practice'
                    ? 'border-[#2D5A43] bg-[#2D5A43]/10 text-stone-900 dark:text-stone-100 ring-2 ring-[#2D5A43]/30'
                    : 'border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:border-stone-300'
                }`}
              >
                <BookOpen className="w-5 h-5 text-[#2D5A43] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-sm">Modo Práctica Guiada Didáctica</div>
                  <div className="text-xs text-stone-500 dark:text-stone-400">
                    Cronómetro pausable, pistas pedagógicas y explicaciones gramaticales al instante.
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Task Breakdown Overview */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#181615] border border-stone-200/80 dark:border-stone-800 space-y-4">
          <h3 className="font-bold text-stone-900 dark:text-stone-100 text-base">
            Estructura de la Prueba ({currentExam.title}):
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-900/50 border border-stone-200 dark:border-stone-800">
              <span className="text-xs font-mono font-bold text-[#C85A32]">TAREA 1</span>
              <h4 className="font-bold text-sm mt-1">Texto Informativo</h4>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                6 preguntas de opción múltiple (A, B, C) sobre texto de 700+ palabras.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-900/50 border border-stone-200 dark:border-stone-800">
              <span className="text-xs font-mono font-bold text-[#C85A32]">TAREA 2</span>
              <h4 className="font-bold text-sm mt-1">Correspondencia</h4>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                Relacionar 10 declaraciones con 4 perfiles/opiniones de personas.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-900/50 border border-stone-200 dark:border-stone-800">
              <span className="text-xs font-mono font-bold text-[#C85A32]">TAREA 3</span>
              <h4 className="font-bold text-sm mt-1">Reconstrucción</h4>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                6 huecos en el texto para insertar oraciones de un banco de 8 (2 distractoras).
              </p>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-900/50 border border-stone-200 dark:border-stone-800">
              <span className="text-xs font-mono font-bold text-[#C85A32]">TAREA 4</span>
              <h4 className="font-bold text-sm mt-1">Prueba Cloze</h4>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                14 ítems de opción múltiple integrados directamente en el artículo.
              </p>
            </div>
          </div>
        </div>

        {/* Start Button Action */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
          {onBackToDashboard && (
            <button
              type="button"
              onClick={onBackToDashboard}
              className="text-stone-600 dark:text-stone-400 text-sm hover:underline"
            >
              ← Volver al Panel Principal
            </button>
          )}

          <button
            type="button"
            onClick={handleStartExam}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#C85A32] hover:bg-[#b34f2a] text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3 cursor-pointer"
          >
            <span>Iniciar Examen DELE {selectedLevel}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  // If exam has been submitted, show Cervantes Official Score Report
  if (isSubmitted && scoreReport) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Results Banner Header */}
        <div className={`p-8 sm:p-10 rounded-3xl border text-center space-y-4 shadow-xl ${
          scoreReport.isApto
            ? 'bg-emerald-950/20 border-emerald-500/40 text-stone-900 dark:text-stone-100'
            : 'bg-rose-950/20 border-rose-500/40 text-stone-900 dark:text-stone-100'
        }`}>
          <div className="inline-flex p-4 rounded-full bg-white dark:bg-stone-900 shadow-md">
            {scoreReport.isApto ? (
              <CheckCircle2 className="w-12 h-12 text-emerald-500" />
            ) : (
              <XCircle className="w-12 h-12 text-rose-500" />
            )}
          </div>

          <div>
            <div className={`inline-block px-4 py-1 rounded-full text-xs font-mono font-bold mb-2 ${
              scoreReport.isApto ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400' : 'bg-rose-500/20 text-rose-600 dark:text-rose-400'
            }`}>
              RESULTADO DE TRIBUNAL CERVANTES
            </div>
            <h1 className="text-4xl sm:text-5xl font-black font-header tracking-tight">
              {scoreReport.isApto ? '¡CALIFICACIÓN: APTO!' : 'CALIFICACIÓN: NO APTO'}
            </h1>
            <p className="text-stone-600 dark:text-stone-400 text-sm mt-1 max-w-md mx-auto">
              {scoreReport.isApto
                ? `Has superado con éxito la prueba de Comprensión de Lectura del nivel DELE ${selectedLevel}.`
                : `No has alcanzado la nota de corte mínima (15.0/25.0) para la certificación DELE ${selectedLevel}.`}
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-6 pt-4 border-t border-stone-200/50 dark:border-stone-800/50">
            <div>
              <div className="text-xs text-stone-500 dark:text-stone-400 uppercase font-mono">Puntuación Escala</div>
              <div className="text-3xl font-black text-[#C85A32]">{scoreReport.scaledScore} / 25.0</div>
            </div>

            <div className="h-8 w-px bg-stone-300 dark:bg-stone-800 hidden sm:block" />

            <div>
              <div className="text-xs text-stone-500 dark:text-stone-400 uppercase font-mono">Aciertos Totales</div>
              <div className="text-3xl font-black text-stone-900 dark:text-stone-100">
                {scoreReport.totalRawCorrect} / {scoreReport.totalItems}
              </div>
            </div>

            <div className="h-8 w-px bg-stone-300 dark:bg-stone-800 hidden sm:block" />

            <div>
              <div className="text-xs text-stone-500 dark:text-stone-400 uppercase font-mono">Tiempo Empleado</div>
              <div className="text-3xl font-black text-stone-900 dark:text-stone-100">
                {formatTimer(scoreReport.timeSpentSeconds)}
              </div>
            </div>
          </div>
        </div>

        {/* Task-by-Task Breakdown Cards */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 font-header">
            Desglose Oficial por Tareas:
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-white dark:bg-[#181615] border border-stone-200 dark:border-stone-800 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono font-bold text-[#C85A32]">TAREA 1 (6 ÍTEMS)</span>
                <span className="text-xs font-bold text-stone-700 dark:text-stone-300">
                  {scoreReport.tarea1Score.correct} / 6 ({scoreReport.tarea1Score.percentage}%)
                </span>
              </div>
              <div className="w-full h-2.5 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#C85A32] rounded-full transition-all duration-500"
                  style={{ width: `${scoreReport.tarea1Score.percentage}%` }}
                />
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-[#181615] border border-stone-200 dark:border-stone-800 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono font-bold text-[#C85A32]">TAREA 2 (10 ÍTEMS)</span>
                <span className="text-xs font-bold text-stone-700 dark:text-stone-300">
                  {scoreReport.tarea2Score.correct} / 10 ({scoreReport.tarea2Score.percentage}%)
                </span>
              </div>
              <div className="w-full h-2.5 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#C85A32] rounded-full transition-all duration-500"
                  style={{ width: `${scoreReport.tarea2Score.percentage}%` }}
                />
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-[#181615] border border-stone-200 dark:border-stone-800 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono font-bold text-[#C85A32]">TAREA 3 (6 ÍTEMS)</span>
                <span className="text-xs font-bold text-stone-700 dark:text-stone-300">
                  {scoreReport.tarea3Score.correct} / 6 ({scoreReport.tarea3Score.percentage}%)
                </span>
              </div>
              <div className="w-full h-2.5 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#C85A32] rounded-full transition-all duration-500"
                  style={{ width: `${scoreReport.tarea3Score.percentage}%` }}
                />
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-[#181615] border border-stone-200 dark:border-stone-800 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono font-bold text-[#C85A32]">TAREA 4 (14 ÍTEMS)</span>
                <span className="text-xs font-bold text-stone-700 dark:text-stone-300">
                  {scoreReport.tarea4Score.correct} / 14 ({scoreReport.tarea4Score.percentage}%)
                </span>
              </div>
              <div className="w-full h-2.5 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#C85A32] rounded-full transition-all duration-500"
                  style={{ width: `${scoreReport.tarea4Score.percentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Solutions Review */}
        <div className="p-6 rounded-2xl bg-white dark:bg-[#181615] border border-stone-200 dark:border-stone-800 space-y-6">
          <div className="flex justify-between items-center border-b border-stone-200 dark:border-stone-800 pb-4">
            <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 font-header">
              Solucionario y Explicaciones Pedagógicas
            </h3>
            <span className="text-xs text-stone-500 dark:text-stone-400">
              Revisa cada respuesta en detalle
            </span>
          </div>

          {/* Tarea 1 Solutions */}
          <div className="space-y-4">
            <h4 className="font-bold text-sm text-[#C85A32] uppercase tracking-wider font-mono">
              Soluciones Tarea 1: Texto Informativo
            </h4>
            <div className="space-y-3">
              {currentExam.tarea1.questions.map(q => {
                const userAns = userAnswers.tarea1[q.id];
                const isCorrect = userAns === q.correctAnswer;
                return (
                  <div key={q.id} className="p-4 rounded-xl bg-stone-50 dark:bg-stone-900/50 border border-stone-200 dark:border-stone-800 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-bold text-sm text-stone-900 dark:text-stone-100">
                        {q.questionNumber}. {q.text}
                      </span>
                      {isCorrect ? (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded">
                          <Check className="w-3.5 h-3.5" /> Correcto
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 px-2 py-0.5 rounded">
                          <XCircle className="w-3.5 h-3.5" /> Incorrecto
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-stone-600 dark:text-stone-400 space-y-1">
                      <div>Tu respuesta: <strong className={isCorrect ? 'text-emerald-600' : 'text-rose-600'}>{userAns || 'Sin responder'}</strong></div>
                      <div>Respuesta correcta: <strong className="text-emerald-600">{q.correctAnswer}</strong></div>
                      <p className="mt-1 p-2 rounded bg-amber-500/10 text-amber-800 dark:text-amber-300 text-xs">
                        💡 {q.explanation}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t border-stone-200 dark:border-stone-800">
            <button
              type="button"
              onClick={resetExam}
              className="px-6 py-3 rounded-xl border border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200 font-bold text-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Realizar Otro Examen</span>
            </button>

            {onBackToDashboard && (
              <button
                type="button"
                onClick={onBackToDashboard}
                className="px-6 py-3 rounded-xl bg-[#C85A32] hover:bg-[#b34f2a] text-white font-bold text-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Volver al Panel Principal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ACTIVE EXAM VIEW (Timed Interactive Interface)
  return (
    <ExamSecurityWrapper
      isExamActive={isExamActive && examMode === 'exam'}
      examTitle={`${currentExam.title} (${currentExam.level})`}
    >
      <div className="max-w-6xl mx-auto px-2 sm:px-6 py-4 space-y-4">
      {/* Top Header: Level, Timer, Progress, Drawer toggle */}
      <div className="sticky top-2 z-30 p-3 sm:p-4 rounded-2xl bg-white/95 dark:bg-[#181615]/95 backdrop-blur-md border border-stone-200 dark:border-stone-800 shadow-md flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 sm:gap-4">
          <span className="px-2.5 py-1 rounded-md bg-[#C85A32]/10 text-[#C85A32] font-black text-xs sm:text-sm border border-[#C85A32]/20">
            {currentExam.level}
          </span>
          <span className="hidden md:inline text-xs font-bold text-stone-600 dark:text-stone-300 truncate max-w-xs">
            {currentExam.title}
          </span>
        </div>

        {/* Live Timer */}
        <div className="flex items-center gap-3">
          <div className={`px-3 py-1.5 rounded-xl border font-mono font-bold text-sm sm:text-base flex items-center gap-2 ${timerStyle}`}>
            <Timer className="w-4 h-4" />
            <span>{formatTimer(timeLeftSeconds)}</span>
          </div>

          {examMode === 'practice' && (
            <button
              type="button"
              onClick={() => {
                soundEffects.playPop();
                setIsTimerPaused(!isTimerPaused);
              }}
              className="p-2 rounded-xl border border-stone-300 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs flex items-center gap-1"
              title={isTimerPaused ? 'Reanudar' : 'Pausar'}
            >
              {isTimerPaused ? <Play className="w-4 h-4 text-emerald-500" /> : <Pause className="w-4 h-4 text-amber-500" />}
            </button>
          )}

          {/* Question Review Drawer Trigger */}
          <button
            type="button"
            onClick={() => {
              soundEffects.playPop();
              setShowReviewDrawer(!showReviewDrawer);
            }}
            className="px-3 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 text-xs font-bold flex items-center gap-2 cursor-pointer"
          >
            <ListFilter className="w-4 h-4 text-[#C85A32]" />
            <span className="hidden sm:inline">Revisar ({answersCount.total}/36)</span>
            <span className="sm:hidden">{answersCount.total}/36</span>
          </button>

          {/* Submit Button */}
          <button
            type="button"
            onClick={handleSubmitExam}
            className="px-4 py-1.5 rounded-xl bg-[#C85A32] hover:bg-[#b34f2a] text-white text-xs sm:text-sm font-bold shadow-xs transition-all cursor-pointer"
          >
            Entregar
          </button>
        </div>
      </div>

      {/* Task Tabs Bar */}
      <div className="flex overflow-x-auto no-scrollbar gap-2 pb-1 border-b border-stone-200 dark:border-stone-800">
        <button
          type="button"
          onClick={() => {
            soundEffects.playPop();
            setActiveTask('tarea1');
          }}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
            activeTask === 'tarea1'
              ? 'bg-[#C85A32] text-white shadow-xs'
              : 'bg-stone-100 dark:bg-stone-800/60 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
          }`}
        >
          <span>Tarea 1: Texto Informativo</span>
          <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-white/20">
            {answersCount.tarea1}/6
          </span>
        </button>

        <button
          type="button"
          onClick={() => {
            soundEffects.playPop();
            setActiveTask('tarea2');
          }}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
            activeTask === 'tarea2'
              ? 'bg-[#C85A32] text-white shadow-xs'
              : 'bg-stone-100 dark:bg-stone-800/60 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
          }`}
        >
          <span>Tarea 2: Correspondencia</span>
          <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-white/20">
            {answersCount.tarea2}/10
          </span>
        </button>

        <button
          type="button"
          onClick={() => {
            soundEffects.playPop();
            setActiveTask('tarea3');
          }}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
            activeTask === 'tarea3'
              ? 'bg-[#C85A32] text-white shadow-xs'
              : 'bg-stone-100 dark:bg-stone-800/60 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
          }`}
        >
          <span>Tarea 3: Reconstrucción</span>
          <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-white/20">
            {answersCount.tarea3}/6
          </span>
        </button>

        <button
          type="button"
          onClick={() => {
            soundEffects.playPop();
            setActiveTask('tarea4');
          }}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
            activeTask === 'tarea4'
              ? 'bg-[#C85A32] text-white shadow-xs'
              : 'bg-stone-100 dark:bg-stone-800/60 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
          }`}
        >
          <span>Tarea 4: Prueba Cloze</span>
          <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-white/20">
            {answersCount.tarea4}/14
          </span>
        </button>
      </div>

      {/* Slide-out Review Drawer */}
      <AnimatePresence>
        {showReviewDrawer && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="p-5 rounded-2xl bg-stone-900 text-stone-100 border border-stone-800 space-y-4"
          >
            <div className="flex justify-between items-center border-b border-stone-800 pb-3">
              <div className="flex items-center gap-2 font-bold text-sm">
                <ListFilter className="w-4 h-4 text-[#C85A32]" />
                <span>Panel de Navegación y Estado de Preguntas (36 ítems)</span>
              </div>
              <button
                type="button"
                onClick={() => setShowReviewDrawer(false)}
                className="text-xs text-stone-400 hover:text-white"
              >
                Cerrar ✕
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-stone-400 block font-mono">TAREA 1 (1–6)</span>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {currentExam.tarea1.questions.map(q => {
                    const answered = Boolean(userAnswers.tarea1[q.id]);
                    const flagged = Boolean(flaggedItems[q.id]);
                    return (
                      <button
                        key={q.id}
                        type="button"
                        onClick={() => {
                          setActiveTask('tarea1');
                          setShowReviewDrawer(false);
                        }}
                        className={`w-7 h-7 rounded-md font-bold text-xs flex items-center justify-center relative ${
                          answered ? 'bg-[#C85A32] text-white' : 'bg-stone-800 text-stone-400 border border-stone-700'
                        }`}
                      >
                        {q.questionNumber}
                        {flagged && (
                          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <span className="text-stone-400 block font-mono">TAREA 2 (7–16)</span>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {currentExam.tarea2.statements.map(st => {
                    const answered = Boolean(userAnswers.tarea2[st.id]);
                    const flagged = Boolean(flaggedItems[st.id]);
                    return (
                      <button
                        key={st.id}
                        type="button"
                        onClick={() => {
                          setActiveTask('tarea2');
                          setShowReviewDrawer(false);
                        }}
                        className={`w-7 h-7 rounded-md font-bold text-xs flex items-center justify-center relative ${
                          answered ? 'bg-[#C85A32] text-white' : 'bg-stone-800 text-stone-400 border border-stone-700'
                        }`}
                      >
                        {st.statementNumber}
                        {flagged && (
                          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <span className="text-stone-400 block font-mono">TAREA 3 (17–22)</span>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {[1, 2, 3, 4, 5, 6].map(idx => {
                    const answered = Boolean(userAnswers.tarea3[idx]);
                    const gapNumber = 16 + idx;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setActiveTask('tarea3');
                          setShowReviewDrawer(false);
                        }}
                        className={`w-7 h-7 rounded-md font-bold text-xs flex items-center justify-center relative ${
                          answered ? 'bg-[#C85A32] text-white' : 'bg-stone-800 text-stone-400 border border-stone-700'
                        }`}
                      >
                        {gapNumber}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <span className="text-stone-400 block font-mono">TAREA 4 (23–36)</span>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {currentExam.tarea4.items.map(it => {
                    const answered = Boolean(userAnswers.tarea4[it.itemNumber]);
                    return (
                      <button
                        key={it.itemNumber}
                        type="button"
                        onClick={() => {
                          setActiveTask('tarea4');
                          setShowReviewDrawer(false);
                        }}
                        className={`w-7 h-7 rounded-md font-bold text-xs flex items-center justify-center relative ${
                          answered ? 'bg-[#C85A32] text-white' : 'bg-stone-800 text-stone-400 border border-stone-700'
                        }`}
                      >
                        {it.itemNumber}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TASK CONTENT PANES */}
      {activeTask === 'tarea1' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Reading Column (700+ words) */}
          <div className="lg:col-span-7 p-6 rounded-2xl bg-white dark:bg-[#181615] border border-stone-200 dark:border-stone-800 space-y-4 max-h-[700px] overflow-y-auto shadow-xs leading-relaxed">
            <div className="border-b border-stone-200 dark:border-stone-800 pb-3">
              <span className="text-xs font-mono font-bold text-[#C85A32]">TEXTO COMPLEJO TAREA 1</span>
              <h2 className="text-xl font-black text-stone-900 dark:text-stone-100 mt-1 font-header">
                {currentExam.tarea1.textTitle}
              </h2>
              {currentExam.tarea1.textSubtitle && (
                <p className="text-xs text-stone-500 dark:text-stone-400 italic mt-0.5">
                  {currentExam.tarea1.textSubtitle}
                </p>
              )}
            </div>

            <div className="space-y-4 text-sm text-stone-800 dark:text-stone-200 font-sans">
              {currentExam.tarea1.paragraphs.map((p, pIdx) => (
                <p key={pIdx} className="indent-4 leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </div>

          {/* Right MCQs Column */}
          <div className="lg:col-span-5 space-y-4 max-h-[700px] overflow-y-auto">
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-300">
              📌 {currentExam.tarea1.instructions}
            </div>

            {currentExam.tarea1.questions.map(q => {
              const selectedOption = userAnswers.tarea1[q.id];
              const isFlagged = flaggedItems[q.id];

              return (
                <div
                  key={q.id}
                  className="p-5 rounded-2xl bg-white dark:bg-[#181615] border border-stone-200 dark:border-stone-800 space-y-3 shadow-xs"
                >
                  <div className="flex justify-between items-start gap-2">
                    <span className="font-bold text-sm text-stone-900 dark:text-stone-100">
                      {q.questionNumber}. {q.text}
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleFlag(q.id)}
                      className={`p-1.5 rounded-lg border transition-all ${
                        isFlagged
                          ? 'bg-amber-100 dark:bg-amber-950/60 border-amber-400 text-amber-600'
                          : 'border-stone-200 dark:border-stone-800 text-stone-400 hover:text-stone-600'
                      }`}
                      title="Marcar para revisar"
                    >
                      <Flag className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="space-y-2">
                    {q.options.map(opt => {
                      const isSelected = selectedOption === opt.key;
                      return (
                        <button
                          key={opt.key}
                          type="button"
                          onClick={() => handleAnswerT1(q.id, opt.key)}
                          className={`w-full p-3 rounded-xl border text-left text-xs font-semibold flex items-start gap-3 transition-all cursor-pointer ${
                            isSelected
                              ? 'border-[#C85A32] bg-[#C85A32]/10 text-stone-900 dark:text-stone-100 ring-1 ring-[#C85A32]'
                              : 'border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:border-stone-300 dark:hover:border-stone-700'
                          }`}
                        >
                          <span className={`w-5 h-5 rounded-full border text-[11px] font-bold flex items-center justify-center shrink-0 ${
                            isSelected
                              ? 'bg-[#C85A32] text-white border-[#C85A32]'
                              : 'border-stone-300 dark:border-stone-700 text-stone-500'
                          }`}>
                            {opt.key}
                          </span>
                          <span className="leading-snug mt-0.5">{opt.text}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAREA 2: Correspondencia Matrix */}
      {activeTask === 'tarea2' && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-300">
            📌 {currentExam.tarea2.instructions}
          </div>

          {/* People / Texts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentExam.tarea2.people.map(person => (
              <div
                key={person.id}
                className="p-5 rounded-2xl bg-white dark:bg-[#181615] border border-stone-200 dark:border-stone-800 space-y-2 shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-[#C85A32] text-white font-black text-sm flex items-center justify-center shrink-0">
                    {person.letter}
                  </span>
                  <div>
                    <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100">
                      {person.name}
                    </h3>
                    <span className="text-[11px] text-stone-500 dark:text-stone-400 font-medium">
                      {person.tagline}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed italic border-t border-stone-100 dark:border-stone-800/80 pt-2">
                  "{person.text}"
                </p>
              </div>
            ))}
          </div>

          {/* Statements to Match List */}
          <div className="p-6 rounded-2xl bg-white dark:bg-[#181615] border border-stone-200 dark:border-stone-800 space-y-4">
            <h3 className="font-bold text-stone-900 dark:text-stone-100 text-base font-header">
              Declaraciones (Ítems 7 al 16):
            </h3>

            <div className="space-y-4">
              {currentExam.tarea2.statements.map(st => {
                const currentMatch = userAnswers.tarea2[st.id];

                return (
                  <div
                    key={st.id}
                    className="p-4 rounded-xl bg-stone-50 dark:bg-stone-900/50 border border-stone-200 dark:border-stone-800 flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="text-xs text-stone-800 dark:text-stone-200 leading-snug">
                      <strong className="text-[#C85A32] font-mono mr-2">{st.statementNumber}.</strong>
                      {st.text}
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {currentExam.tarea2.people.map(person => {
                        const isChosen = currentMatch === person.id;
                        return (
                          <button
                            key={person.id}
                            type="button"
                            onClick={() => handleAnswerT2(st.id, person.id)}
                            className={`w-9 h-9 rounded-xl font-bold text-xs flex items-center justify-center transition-all cursor-pointer ${
                              isChosen
                                ? 'bg-[#C85A32] text-white shadow-xs ring-2 ring-[#C85A32]/40'
                                : 'bg-white dark:bg-stone-800 text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-700 hover:border-stone-400'
                            }`}
                          >
                            {person.letter}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAREA 3: Reconstrucción de Texto (Gap Filling) */}
      {activeTask === 'tarea3' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Passage with Interactive Gap Slots */}
          <div className="lg:col-span-7 p-6 rounded-2xl bg-white dark:bg-[#181615] border border-stone-200 dark:border-stone-800 space-y-4 max-h-[700px] overflow-y-auto shadow-xs">
            <div className="border-b border-stone-200 dark:border-stone-800 pb-3">
              <span className="text-xs font-mono font-bold text-[#C85A32]">RECONSTRUCCIÓN DE TEXTO TAREA 3</span>
              <h2 className="text-xl font-black text-stone-900 dark:text-stone-100 mt-1 font-header">
                {currentExam.tarea3.textTitle}
              </h2>
            </div>

            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-300">
              📌 {currentExam.tarea3.instructions}
            </div>

            {/* Passage Segments with Gap Selectors */}
            <div className="text-sm text-stone-800 dark:text-stone-200 leading-loose space-y-3 font-sans">
              {currentExam.tarea3.segments.map((seg, sIdx) => {
                if (seg.type === 'text') {
                  return <span key={sIdx}>{seg.content} </span>;
                }

                if (seg.type === 'gap' && seg.gapIndex) {
                  const gapIdx = seg.gapIndex;
                  const chosenOptId = userAnswers.tarea3[gapIdx];
                  const chosenOpt = currentExam.tarea3.sentenceBank.find(b => b.id === chosenOptId);
                  const gapNumber = 16 + gapIdx;

                  return (
                    <span key={sIdx} className="inline-block my-1 mx-1">
                      <select
                        value={chosenOptId || ''}
                        onChange={(e) => handleAnswerT3(gapIdx, e.target.value)}
                        className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all cursor-pointer shadow-xs ${
                          chosenOptId
                            ? 'bg-[#C85A32] text-white border-[#C85A32]'
                            : 'bg-amber-100 dark:bg-amber-950/60 border-amber-400 text-amber-900 dark:text-amber-200'
                        }`}
                      >
                        <option value="">[ Hueco {gapNumber} ] Seleccionar oración...</option>
                        {currentExam.tarea3.sentenceBank.map(s => (
                          <option key={s.id} value={s.id} className="bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100">
                            Opción {s.letter}: {s.text.substring(0, 45)}...
                          </option>
                        ))}
                      </select>
                      {chosenOpt && (
                        <span className="block text-[11px] font-medium text-stone-600 dark:text-stone-400 italic mt-1 p-2 rounded bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700">
                          ↳ [{chosenOpt.letter}]: "{chosenOpt.text}"
                        </span>
                      )}
                    </span>
                  );
                }
                return null;
              })}
            </div>
          </div>

          {/* Sentence Bank Column */}
          <div className="lg:col-span-5 space-y-4 max-h-[700px] overflow-y-auto">
            <div className="p-4 rounded-xl bg-stone-900 text-white space-y-1">
              <h3 className="font-bold text-sm">Banco de Oraciones (A–H):</h3>
              <p className="text-xs text-stone-300">
                8 oraciones disponibles para 6 huecos (2 oraciones distractoras que no corresponden).
              </p>
            </div>

            <div className="space-y-3">
              {currentExam.tarea3.sentenceBank.map(s => {
                // Check if this option is assigned to any gap
                const assignedGapIndex = Object.entries(userAnswers.tarea3).find(
                  ([_, optId]) => optId === s.id
                )?.[0];

                return (
                  <div
                    key={s.id}
                    className={`p-4 rounded-xl border transition-all text-xs space-y-1 ${
                      assignedGapIndex
                        ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 text-stone-800 dark:text-stone-200'
                        : 'bg-white dark:bg-[#181615] border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300'
                    }`}
                  >
                    <div className="flex justify-between items-center font-bold">
                      <span className="text-[#C85A32] text-sm">Opción {s.letter}</span>
                      {assignedGapIndex ? (
                        <span className="px-2 py-0.5 rounded bg-emerald-500 text-white text-[10px] font-mono">
                          Asignado a Hueco {16 + Number(assignedGapIndex)}
                        </span>
                      ) : (
                        <span className="text-stone-400 text-[10px] font-mono">Disponible</span>
                      )}
                    </div>
                    <p className="leading-relaxed">{s.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAREA 4: Prueba Cloze (Inline Dropdowns) */}
      {activeTask === 'tarea4' && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-300">
            📌 {currentExam.tarea4.instructions}
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#181615] border border-stone-200 dark:border-stone-800 space-y-6 shadow-xs leading-loose text-stone-800 dark:text-stone-200 font-sans text-sm sm:text-base">
            <h2 className="text-xl font-black text-stone-900 dark:text-stone-100 font-header border-b border-stone-200 dark:border-stone-800 pb-3">
              {currentExam.tarea4.textTitle}
            </h2>

            {/* Passage with Inline Cloze Dropdowns */}
            <div className="leading-loose">
              {currentExam.tarea4.segments.map((seg, sIdx) => {
                if (seg.type === 'text') {
                  return <span key={sIdx}>{seg.content}</span>;
                }

                if (seg.type === 'cloze' && seg.itemNumber) {
                  const itemNum = seg.itemNumber;
                  const item = currentExam.tarea4.items.find(i => i.itemNumber === itemNum);
                  const chosenVal = userAnswers.tarea4[itemNum];

                  return (
                    <span key={sIdx} className="inline-block mx-1">
                      <select
                        value={chosenVal || ''}
                        onChange={(e) => handleAnswerT4(itemNum, e.target.value as 'A' | 'B' | 'C')}
                        className={`px-2.5 py-1 rounded-lg border text-xs sm:text-sm font-bold transition-all cursor-pointer shadow-xs ${
                          chosenVal
                            ? 'bg-[#C85A32] text-white border-[#C85A32]'
                            : 'bg-amber-100 dark:bg-amber-950/60 border-amber-400 text-amber-900 dark:text-amber-200'
                        }`}
                      >
                        <option value="">[{itemNum}] ...</option>
                        {item?.options.map(opt => (
                          <option key={opt.key} value={opt.key} className="bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100">
                            {opt.key}) {opt.text}
                          </option>
                        ))}
                      </select>
                    </span>
                  );
                }
                return null;
              })}
            </div>
          </div>
        </div>
      )}
      </div>
    </ExamSecurityWrapper>
  );
};
