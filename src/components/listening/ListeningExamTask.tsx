import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  Square,
  RotateCcw,
  Radio,
  PhoneCall,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  FileText,
  Award,
  ChevronRight,
  ArrowLeft,
  Clock,
  ShieldAlert,
  Info,
  Bookmark,
  BookOpen
} from 'lucide-react';
import { LISTENING_TASKS, ListeningTask } from '../../data/listeningTasksData';
import { audioPlayerService, AudioPlaybackState } from '../../services/audioPlayerService';
import { soundEffects } from '../../utils/audio';

interface ListeningExamTaskProps {
  onBackToDashboard?: () => void;
}

export const ListeningExamTask: React.FC<ListeningExamTaskProps> = ({
  onBackToDashboard
}) => {
  const [selectedTaskIndex, setSelectedTaskIndex] = useState<number>(0);
  const currentTask: ListeningTask = LISTENING_TASKS[selectedTaskIndex];

  // Mode: Exam vs Study
  const [isExamMode, setIsExamMode] = useState<boolean>(true);
  const [playbackRate, setPlaybackRate] = useState<number>(1.0);
  const [ambientEnabled, setAmbientEnabled] = useState<boolean>(true);

  // Audio Playback State from service
  const [audioState, setAudioState] = useState<AudioPlaybackState>({
    isPlaying: false,
    isPaused: false,
    currentTime: 0,
    duration: currentTask.durationSeconds,
    playCount: 0,
    maxPlays: 2,
    isLocked: false,
    playbackRate: 1.0,
    ambientEnabled: true
  });

  // User Responses State
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<string, boolean>>({});
  const [studentNotes, setStudentNotes] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'questions' | 'notes' | 'transcript'>('questions');

  // Exam Submission State
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<{ total: number; correct: number; percentage: number; pass: boolean }>({
    total: 6,
    correct: 0,
    percentage: 0,
    pass: false
  });

  // Canvas visualizer reference
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Register callback with AudioPlayerService
  useEffect(() => {
    audioPlayerService.setCallback((state) => {
      setAudioState(state);
    });

    return () => {
      audioPlayerService.stopAudio();
      audioPlayerService.setCallback(null);
    };
  }, []);

  // Update canvas waveform visualizer
  const renderWaveform = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const dataArray = new Uint8Array(32);

    audioPlayerService.getWaveformData(dataArray);

    ctx.clearRect(0, 0, width, height);

    const barWidth = (width / dataArray.length) - 2;
    let x = 0;

    for (let i = 0; i < dataArray.length; i++) {
      const barHeight = audioState.isPlaying
        ? Math.max(4, (dataArray[i] / 255) * height)
        : (Math.sin(i + Date.now() / 300) * 0.2 + 0.3) * (height * 0.25);

      const gradient = ctx.createLinearGradient(0, height, 0, 0);
      gradient.addColorStop(0, '#C85A32');
      gradient.addColorStop(1, '#E07A5F');

      ctx.fillStyle = audioState.isPlaying ? gradient : 'rgba(200, 90, 50, 0.3)';
      ctx.fillRect(x, height - barHeight, barWidth, barHeight);

      x += barWidth + 2;
    }

    animationFrameRef.current = requestAnimationFrame(renderWaveform);
  }, [audioState.isPlaying]);

  useEffect(() => {
    animationFrameRef.current = requestAnimationFrame(renderWaveform);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [renderWaveform]);

  // Handle Play/Pause action
  const handlePlayAudio = () => {
    soundEffects.playPop();

    if (audioState.isPlaying) {
      if (audioState.isPaused) {
        audioPlayerService.resumeAudio();
      } else {
        audioPlayerService.pauseAudio();
      }
    } else {
      const canStart = audioPlayerService.canPlay(currentTask.id, isExamMode);
      if (canStart) {
        audioPlayerService.playTaskAudio(currentTask, isExamMode, playbackRate, ambientEnabled);
      }
    }
  };

  const handleStopAudio = () => {
    soundEffects.playPop();
    audioPlayerService.stopAudio();
  };

  const handleResetSession = () => {
    soundEffects.playPop();
    audioPlayerService.resetTaskSession(currentTask.id);
    setIsSubmitted(false);
    setUserAnswers({});
    setFlaggedQuestions({});
  };

  const handleSelectTask = (index: number) => {
    soundEffects.playPop();
    audioPlayerService.stopAudio();
    setSelectedTaskIndex(index);
    setIsSubmitted(false);
    setUserAnswers({});
    setFlaggedQuestions({});
    setStudentNotes('');
  };

  const handleSelectAnswer = (questionId: string, optionIndex: number) => {
    if (isSubmitted && isExamMode) return;
    soundEffects.playPop();
    setUserAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleToggleFlag = (questionId: string) => {
    soundEffects.playPop();
    setFlaggedQuestions(prev => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  const handleSubmitExam = () => {
    soundEffects.playLevelUp();
    audioPlayerService.stopAudio();

    let correctCount = 0;
    currentTask.questions.forEach(q => {
      if (userAnswers[q.id] === q.correctOptionIndex) {
        correctCount++;
      }
    });

    const total = currentTask.questions.length;
    const percentage = Math.round((correctCount / total) * 100);
    const pass = percentage >= 60; // 60% DELE threshold

    setScore({ total, correct: correctCount, percentage, pass });
    setIsSubmitted(true);
    setActiveTab('questions');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const answeredCount = Object.keys(userAnswers).length;

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20 px-2 sm:px-4">
      {/* Header bar with Back action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200/80 dark:border-stone-800/80 pb-4">
        <div className="flex items-center gap-3">
          {onBackToDashboard && (
            <button
              onClick={onBackToDashboard}
              className="p-2 rounded-lg bg-stone-100 dark:bg-stone-800/80 text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#C85A32] dark:text-[#E07A5F] px-2 py-0.5 rounded-md bg-[#C85A32]/10 border border-[#C85A32]/20">
                Comprensión Auditiva DELE/SIELE
              </span>
              <span className="text-xs text-stone-500 font-mono">Prueba Oficial II</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-stone-100 tracking-tight font-header mt-1">
              Laboratorio de Audición Real
            </h1>
          </div>
        </div>

        {/* Exam vs Study Mode Switcher */}
        <div className="flex items-center gap-2 p-1 bg-stone-100 dark:bg-stone-800/80 rounded-xl border border-stone-200/80 dark:border-stone-700/80 shrink-0">
          <button
            onClick={() => {
              soundEffects.playPop();
              setIsExamMode(true);
              setPlaybackRate(1.0);
            }}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
              isExamMode
                ? 'bg-white dark:bg-stone-900 text-[#C85A32] dark:text-[#E07A5F] shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Modo Examen (2 Escuchas)</span>
          </button>
          <button
            onClick={() => {
              soundEffects.playPop();
              setIsExamMode(false);
            }}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 ${
              !isExamMode
                ? 'bg-white dark:bg-stone-900 text-[#2D5A43] dark:text-emerald-400 shadow-xs'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Modo Estudio Acompañado</span>
          </button>
        </div>
      </div>

      {/* Task Selection Selector Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {LISTENING_TASKS.map((task, idx) => {
          const isSelected = idx === selectedTaskIndex;
          const TaskIcon = task.taskType === 'radio_news' ? Radio : task.taskType === 'phone_voicenote' ? PhoneCall : GraduationCap;
          return (
            <button
              key={task.id}
              onClick={() => handleSelectTask(idx)}
              className={`p-4 rounded-xl text-left border transition-all flex flex-col justify-between space-y-2 ${
                isSelected
                  ? 'bg-white dark:bg-[#181615] border-[#C85A32] dark:border-[#E07A5F] shadow-md ring-1 ring-[#C85A32]/30'
                  : 'bg-white/60 dark:bg-stone-900/60 border-stone-200/80 dark:border-stone-800/80 hover:bg-white dark:hover:bg-stone-900 hover:border-stone-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xl">{task.regionFlag}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700">
                  Nivel {task.cefrLevel}
                </span>
              </div>
              <div>
                <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                  <TaskIcon className="w-4 h-4 text-[#C85A32] dark:text-[#E07A5F]" />
                  <span>{task.title.split(':')[1] || task.title}</span>
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 line-clamp-1">
                  {task.region} • {task.accentTitle}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Task Info Banner */}
      <div className="p-5 rounded-2xl bg-white dark:bg-[#181615] border border-stone-200/80 dark:border-stone-800/80 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-100 dark:border-stone-800/80 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">{currentTask.regionFlag}</span>
              <span className="text-xs font-bold text-stone-700 dark:text-stone-300">
                {currentTask.region}
              </span>
              <span className="text-stone-300 dark:text-stone-700">|</span>
              <span className="text-xs font-semibold text-[#C85A32] dark:text-[#E07A5F]">
                {currentTask.accentTitle}
              </span>
            </div>
            <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 mt-1 font-header">
              {currentTask.title}
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
              {currentTask.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-[10px] uppercase tracking-wider font-mono font-bold text-stone-400 block">
                {isExamMode ? 'Límite DELE' : 'Estudio'}
              </span>
              <span className="text-sm font-bold text-stone-800 dark:text-stone-200 font-mono">
                {audioState.playCount} / {isExamMode ? '2 reproduciones' : '∞'}
              </span>
            </div>
          </div>
        </div>

        {/* Accent phenomena note drawer */}
        <div className="p-3.5 rounded-xl bg-amber-500/5 border border-amber-500/20 text-xs text-stone-700 dark:text-stone-300 space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-amber-800 dark:text-amber-400">
            <Info className="w-4 h-4" />
            <span>Fenómenos Fonéticos y Variedad Regional:</span>
          </div>
          <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
            {currentTask.accentDescription}
          </p>
        </div>

        {/* Main Audio Player Console */}
        <div className="p-5 rounded-xl bg-stone-900 text-stone-100 space-y-4 shadow-inner">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Play/Pause/Stop Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={handlePlayAudio}
                disabled={audioState.isLocked}
                className={`p-3.5 rounded-xl text-white font-bold transition-all flex items-center gap-2 cursor-pointer ${
                  audioState.isLocked
                    ? 'bg-stone-700 text-stone-400 cursor-not-allowed opacity-60'
                    : audioState.isPlaying
                    ? 'bg-[#C85A32] hover:bg-[#B47832] shadow-md scale-102'
                    : 'bg-[#C85A32] hover:bg-[#D86B43] shadow-md hover:scale-102'
                }`}
              >
                {audioState.isPlaying && !audioState.isPaused ? (
                  <>
                    <Pause className="w-5 h-5" />
                    <span>Pausar</span>
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 fill-current" />
                    <span>{audioState.isPaused ? 'Continuar' : 'Escuchar Audición'}</span>
                  </>
                )}
              </button>

              <button
                onClick={handleStopAudio}
                disabled={!audioState.isPlaying && !audioState.isPaused}
                className="p-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 disabled:opacity-40 transition-colors"
                title="Detener audición"
              >
                <Square className="w-4 h-4" />
              </button>

              <button
                onClick={handleResetSession}
                className="p-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors"
                title="Reiniciar sesión y borrador"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Time & Waveform Display */}
            <div className="flex items-center gap-4 flex-1 max-w-md">
              <div className="text-xs font-mono font-bold text-stone-400 shrink-0 min-w-[80px]">
                {formatTime(audioState.currentTime)} / {formatTime(currentTask.durationSeconds)}
              </div>
              <div className="flex-1 h-8 bg-stone-800/80 rounded-lg p-1 overflow-hidden border border-stone-700/50">
                <canvas ref={canvasRef} width={280} height={24} className="w-full h-full" />
              </div>
            </div>

            {/* Controls: Speed & Ambient */}
            <div className="flex items-center gap-3">
              {!isExamMode && (
                <div className="flex items-center gap-1 bg-stone-800 p-1 rounded-lg border border-stone-700">
                  <span className="text-[10px] text-stone-400 px-1 font-mono">Vel:</span>
                  <button
                    onClick={() => {
                      setPlaybackRate(1.0);
                      audioPlayerService.playTaskAudio(currentTask, false, 1.0, ambientEnabled);
                    }}
                    className={`px-2 py-0.5 text-xs font-mono font-bold rounded ${
                      playbackRate === 1.0 ? 'bg-[#C85A32] text-white' : 'text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    1.0x
                  </button>
                  <button
                    onClick={() => {
                      setPlaybackRate(0.85);
                      audioPlayerService.playTaskAudio(currentTask, false, 0.85, ambientEnabled);
                    }}
                    className={`px-2 py-0.5 text-xs font-mono font-bold rounded ${
                      playbackRate === 0.85 ? 'bg-[#C85A32] text-white' : 'text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    0.85x
                  </button>
                </div>
              )}

              <button
                onClick={() => {
                  const nextAmbient = !ambientEnabled;
                  setAmbientEnabled(nextAmbient);
                  audioPlayerService.toggleAmbient(nextAmbient, currentTask.ambientType);
                }}
                className={`p-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  ambientEnabled
                    ? 'bg-stone-800 text-emerald-400 border border-emerald-500/30'
                    : 'bg-stone-800 text-stone-500 border border-stone-700'
                }`}
                title="Efecto de Fondo Ambiental"
              >
                {ambientEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                <span className="hidden sm:inline">Ruido Ambiente</span>
              </button>
            </div>
          </div>

          {/* DELE Exam Play Lock Status Warning */}
          {audioState.isLocked && (
            <div className="p-3 rounded-lg bg-red-500/20 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0 text-red-400" />
              <span>
                <strong>Límite DELE Alcanzado:</strong> Has consumido las 2 escuchas oficiales permitidas en esta prueba. Procede a responder las preguntas y enviar tu examen.
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Main Interactive Workspace (Tabs for Questions, Note-taking, Transcript) */}
      <div className="space-y-4">
        {/* Navigation Tabs */}
        <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('questions')}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 ${
                activeTab === 'questions'
                  ? 'bg-[#C85A32] text-white shadow-xs'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:text-stone-900'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>Preguntas DELE ({answeredCount}/{currentTask.questions.length})</span>
            </button>

            {currentTask.notesPrompt && (
              <button
                onClick={() => setActiveTab('notes')}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 ${
                  activeTab === 'notes'
                    ? 'bg-[#C85A32] text-white shadow-xs'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:text-stone-900'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Hoja de Apuntes (Conferencia)</span>
              </button>
            )}

            {(!isExamMode || isSubmitted) && (
              <button
                onClick={() => setActiveTab('transcript')}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 ${
                  activeTab === 'transcript'
                    ? 'bg-[#C85A32] text-white shadow-xs'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:text-stone-900'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>Transcripción Anotada</span>
              </button>
            )}
          </div>

          {/* Quick Submit CTA */}
          {!isSubmitted && (
            <button
              onClick={handleSubmitExam}
              disabled={answeredCount < currentTask.questions.length}
              className="px-5 py-2 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Corregir Examen</span>
            </button>
          )}
        </div>

        {/* Tab 1: Questions Grid */}
        {activeTab === 'questions' && (
          <div className="space-y-6">
            {/* Submission Result Score Banner */}
            {isSubmitted && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-6 rounded-2xl border ${
                  score.pass
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-900 dark:text-emerald-100'
                    : 'bg-amber-500/10 border-amber-500/30 text-amber-900 dark:text-amber-100'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-xl ${score.pass ? 'bg-emerald-600 text-white' : 'bg-amber-600 text-white'}`}>
                      <Award className="w-7 h-7" />
                    </div>
                    <div>
                      <span className="text-xs font-mono uppercase tracking-wider font-bold block opacity-80">
                        Resultado Oficial DELE
                      </span>
                      <h3 className="text-xl font-black tracking-tight">
                        {score.pass ? '¡APTO / PASSED!' : 'NO APTO / REQUIERE REPASO'}
                      </h3>
                      <p className="text-xs opacity-90 mt-0.5">
                        Has acertado {score.correct} de {score.total} preguntas ({score.percentage}% de acierto).
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveTab('transcript')}
                    className="px-4 py-2 text-xs font-bold rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 hover:opacity-90 transition-opacity flex items-center gap-1.5 self-start sm:self-center"
                  >
                    <span>Ver Transcripción con Evidencia</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Question Items List */}
            <div className="space-y-5">
              {currentTask.questions.map((q, idx) => {
                const selectedOption = userAnswers[q.id];
                const isFlagged = flaggedQuestions[q.id];
                const isCorrect = selectedOption === q.correctOptionIndex;

                return (
                  <div
                    key={q.id}
                    className={`p-5 rounded-2xl bg-white dark:bg-[#181615] border transition-all space-y-4 ${
                      isSubmitted
                        ? isCorrect
                          ? 'border-emerald-500/50 bg-emerald-500/5'
                          : 'border-red-500/50 bg-red-500/5'
                        : isFlagged
                        ? 'border-amber-400 dark:border-amber-500 shadow-xs'
                        : 'border-stone-200/80 dark:border-stone-800/80 shadow-xs'
                    }`}
                  >
                    {/* Item Header */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-2.5">
                        <span className="w-6 h-6 rounded-full bg-[#C85A32]/10 text-[#C85A32] dark:text-[#E07A5F] font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <div>
                          <span className="text-[10px] font-mono font-bold text-stone-400 uppercase tracking-wider block">
                            Habilidad: {q.targetedSkill}
                          </span>
                          <h4 className="text-sm font-bold text-stone-900 dark:text-stone-100 leading-snug">
                            {q.questionText}
                          </h4>
                        </div>
                      </div>

                      {!isSubmitted && (
                        <button
                          onClick={() => handleToggleFlag(q.id)}
                          className={`p-1.5 rounded-lg text-xs transition-colors shrink-0 ${
                            isFlagged
                              ? 'bg-amber-100 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400'
                              : 'text-stone-400 hover:text-stone-600'
                          }`}
                          title="Marcar pregunta para revisar"
                        >
                          <Bookmark className={`w-4 h-4 ${isFlagged ? 'fill-current' : ''}`} />
                        </button>
                      )}
                    </div>

                    {/* Options List */}
                    <div className="space-y-2 pl-8">
                      {q.options.map((opt, optIdx) => {
                        const isChosen = selectedOption === optIdx;
                        const isRightAnswer = q.correctOptionIndex === optIdx;

                        let optStyle = 'border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700 bg-stone-50/50 dark:bg-stone-900/50 text-stone-800 dark:text-stone-200';

                        if (isSubmitted) {
                          if (isRightAnswer) {
                            optStyle = 'border-emerald-500 bg-emerald-500/15 text-emerald-900 dark:text-emerald-100 font-bold';
                          } else if (isChosen && !isRightAnswer) {
                            optStyle = 'border-red-500 bg-red-500/15 text-red-900 dark:text-red-100 line-through';
                          }
                        } else if (isChosen) {
                          optStyle = 'border-[#C85A32] bg-[#C85A32]/10 text-[#C85A32] dark:text-[#E07A5F] font-bold shadow-xs';
                        }

                        return (
                          <button
                            key={optIdx}
                            onClick={() => handleSelectAnswer(q.id, optIdx)}
                            disabled={isSubmitted && isExamMode}
                            className={`w-full text-left p-3.5 rounded-xl border text-xs leading-relaxed transition-all flex items-center justify-between cursor-pointer ${optStyle}`}
                          >
                            <div className="flex items-center gap-3">
                              <span className="font-mono font-bold text-stone-400">
                                {String.fromCharCode(65 + optIdx)})
                              </span>
                              <span>{opt}</span>
                            </div>

                            {isSubmitted && isRightAnswer && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            )}
                            {isSubmitted && isChosen && !isRightAnswer && (
                              <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Feedback Explanation in Submitted State */}
                    {isSubmitted && (
                      <div className="mt-3 p-3.5 rounded-xl bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs space-y-1.5 ml-8">
                        <div className="font-bold text-[#C85A32] dark:text-[#E07A5F] flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Justificación Pedagógica y Evidencia de Audio:</span>
                        </div>
                        <p className="text-stone-700 dark:text-stone-300 leading-relaxed">
                          {q.explanation}
                        </p>
                        <p className="text-stone-500 dark:text-stone-400 font-mono text-[11px]">
                          Referencia directa: "{q.transcriptRef}"
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 2: Notes Workspace */}
        {activeTab === 'notes' && currentTask.notesPrompt && (
          <div className="p-6 rounded-2xl bg-white dark:bg-[#181615] border border-stone-200/80 dark:border-stone-800/80 space-y-4">
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 font-header">
                Hoja de Toma de Notas Académicas
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                {currentTask.notesPrompt}
              </p>
            </div>

            <textarea
              value={studentNotes}
              onChange={(e) => setStudentNotes(e.target.value)}
              placeholder="Escribe aquí tus notas durante la escucha de la conferencia..."
              className="w-full h-64 p-4 text-xs font-mono rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 focus:outline-none focus:ring-2 focus:ring-[#C85A32] text-stone-900 dark:text-stone-100 resize-none"
            />
          </div>
        )}

        {/* Tab 3: Full Annotated Transcript */}
        {activeTab === 'transcript' && (
          <div className="p-6 rounded-2xl bg-white dark:bg-[#181615] border border-stone-200/80 dark:border-stone-800/80 space-y-6">
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100 font-header">
                Transcripción Oficial Anotada con Marcas Temporales
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Consulta los pasajes del audio con anotaciones sobre giros lingüísticos y evidencias.
              </p>
            </div>

            <div className="space-y-4">
              {currentTask.annotatedTranscript.map((chunk, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#C85A32] dark:text-[#E07A5F]">
                      {chunk.speaker}
                    </span>
                    <span className="font-mono text-stone-400 text-[11px] flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {chunk.timestamp}
                    </span>
                  </div>

                  <p className="text-xs leading-relaxed text-stone-800 dark:text-stone-200 font-sans">
                    {chunk.text}
                  </p>

                  {chunk.note && (
                    <div className="text-[11px] text-amber-800 dark:text-amber-400 bg-amber-500/10 p-2 rounded-lg border border-amber-500/20 font-medium">
                      💡 {chunk.note}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
