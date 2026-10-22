import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Mic,
  MicOff,
  Volume2,
  Play,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  Award,
  Zap,
  ArrowRight,
  Flame,
  Radio,
  Filter,
  Check,
  Headphones,
  RefreshCw,
  Sliders,
  ChevronRight,
  VolumeX,
  Square,
  HelpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SPEAKING_DRILLS, SpeakingDrill } from '../data/speakingDrills';
import {
  speakSpanish,
  speakSpanishWithHighlight,
  cancelSpanishSpeech,
  soundEffects,
  SimpleMediaRecorder,
  RecordedAudioResult
} from '../utils/audio';
import { analyzeSentencePhonetics, PhoneticSentenceAnalysis } from '../utils/spanishPhonetics';
import { UserProgress } from '../types';

interface OralShadowingDrillProps {
  userProgress: UserProgress;
  setUserProgress: React.Dispatch<React.SetStateAction<UserProgress>>;
  onAddXp?: (amount: number) => void;
  onBackToDashboard?: () => void;
}

export const OralShadowingDrill: React.FC<OralShadowingDrillProps> = ({
  userProgress,
  setUserProgress,
  onAddXp,
  onBackToDashboard
}) => {
  // Category & Filter States
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Drill Step Progress (1: Listen -> 2: Slow/Phonetics -> 3: Record & Compare -> 4: Self Evaluate)
  const [activeStep, setActiveStep] = useState<1 | 2 | 3 | 4>(1);

  // Audio Playback State
  const [isPlayingNative, setIsPlayingNative] = useState<boolean>(false);
  const [currentRate, setCurrentRate] = useState<number>(1.0);
  const [activeWordIndex, setActiveWordIndex] = useState<number | null>(null);

  // User MediaRecorder Recording State
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordedAudio, setRecordedAudio] = useState<RecordedAudioResult | null>(null);
  const [isPlayingUserAudio, setIsPlayingUserAudio] = useState<boolean>(false);
  const [recorderError, setRecorderError] = useState<string | null>(null);

  // Web Speech API optional fallback state (if supported)
  const [speechApiSupported, setSpeechApiSupported] = useState<boolean>(false);
  const [optionalTranscript, setOptionalTranscript] = useState<string>('');

  // Gamification & Session Stats
  const [sessionXp, setSessionXp] = useState<number>(0);
  const [completedDrillsCount, setCompletedDrillsCount] = useState<number>(0);
  const [practiceStreak, setPracticeStreak] = useState<number>(0);
  const [evaluationToast, setEvaluationToast] = useState<string | null>(null);

  // Refs
  const recorderRef = useRef<SimpleMediaRecorder | null>(null);
  const userAudioPlayerRef = useRef<HTMLAudioElement | null>(null);
  const recognitionRef = useRef<any>(null);

  // Filtered drills
  const filteredDrills = useMemo(() => {
    return SPEAKING_DRILLS.filter(d => {
      const categoryMatch = selectedCategory === 'All' || d.category === selectedCategory;
      const levelMatch = selectedLevel === 'All' || d.level === selectedLevel;
      return categoryMatch && levelMatch;
    });
  }, [selectedCategory, selectedLevel]);

  const activeDrill: SpeakingDrill = filteredDrills[currentIndex] || SPEAKING_DRILLS[0];

  // Phonetic analysis of the active sentence (Syllable stress + Sinalefa links)
  const phoneticAnalysis: PhoneticSentenceAnalysis = useMemo(() => {
    if (!activeDrill) {
      return { words: [], sinalefaCount: 0, rhythmNotes: [] };
    }
    return analyzeSentencePhonetics(activeDrill.spanish_target);
  }, [activeDrill]);

  // Check Web Speech API availability on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        setSpeechApiSupported(true);
        try {
          const rec = new SpeechRecognition();
          rec.continuous = false;
          rec.interimResults = true;
          rec.lang = 'es-MX';
          rec.onresult = (e: any) => {
            let t = '';
            for (let i = e.resultIndex; i < e.results.length; i++) {
              t += e.results[i][0].transcript;
            }
            setOptionalTranscript(t);
          };
          recognitionRef.current = rec;
        } catch (e) {
          setSpeechApiSupported(false);
        }
      }
    }

    return () => {
      cancelSpanishSpeech();
      if (recorderRef.current) {
        recorderRef.current.cancel();
      }
      if (userAudioPlayerRef.current) {
        userAudioPlayerRef.current.pause();
      }
    };
  }, []);

  // Reset state when changing drill
  const resetDrillState = () => {
    cancelSpanishSpeech();
    if (userAudioPlayerRef.current) {
      userAudioPlayerRef.current.pause();
      userAudioPlayerRef.current = null;
    }
    if (recorderRef.current && isRecording) {
      recorderRef.current.cancel();
    }
    setIsPlayingNative(false);
    setIsPlayingUserAudio(false);
    setIsRecording(false);
    setRecordedAudio(null);
    setRecorderError(null);
    setActiveWordIndex(null);
    setOptionalTranscript('');
    setActiveStep(1);
  };

  useEffect(() => {
    resetDrillState();
  }, [currentIndex, selectedCategory, selectedLevel]);

  // Play native Spanish speech
  const handlePlayNative = (rate: number = 1.0) => {
    if (!activeDrill) return;
    cancelSpanishSpeech();
    if (userAudioPlayerRef.current) {
      userAudioPlayerRef.current.pause();
      setIsPlayingUserAudio(false);
    }

    setIsPlayingNative(true);
    setCurrentRate(rate);

    speakSpanishWithHighlight(activeDrill.spanish_target, {
      rate,
      onWordBoundary: (charIndex) => {
        const wordsBefore = activeDrill.spanish_target.substring(0, charIndex).split(/\s+/).length - 1;
        setActiveWordIndex(Math.max(0, wordsBefore));
      },
      onEnd: () => {
        setIsPlayingNative(false);
        setActiveWordIndex(null);
        if (rate === 1.0 && activeStep === 1) {
          setActiveStep(2);
        } else if (rate < 1.0 && activeStep === 2) {
          setActiveStep(3);
        }
      },
      onError: () => {
        setIsPlayingNative(false);
        setActiveWordIndex(null);
      }
    });
  };

  // Start recording user audio via standard MediaRecorder
  const handleStartRecording = async () => {
    cancelSpanishSpeech();
    if (userAudioPlayerRef.current) {
      userAudioPlayerRef.current.pause();
      setIsPlayingUserAudio(false);
    }
    setRecorderError(null);
    setRecordedAudio(null);

    try {
      const recorder = new SimpleMediaRecorder();
      recorderRef.current = recorder;
      await recorder.start();
      setIsRecording(true);
      soundEffects.playPop();

      // Optionally start speech recognition if available
      if (recognitionRef.current && speechApiSupported) {
        try {
          recognitionRef.current.start();
        } catch (e) {}
      }
    } catch (err: any) {
      console.warn('Microphone recording error:', err);
      setRecorderError('No se pudo acceder al micrófono. Verifica los permisos de tu navegador.');
      setIsRecording(false);
    }
  };

  // Stop recording user audio
  const handleStopRecording = async () => {
    if (!recorderRef.current || !isRecording) return;
    try {
      const result = await recorderRef.current.stop();
      setRecordedAudio(result);
      setIsRecording(false);
      setActiveStep(4);
      soundEffects.playPop();

      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {}
      }
    } catch (err: any) {
      console.warn('Error stopping recording:', err);
      setIsRecording(false);
      setRecorderError('Ocurrió un problema al guardar la grabación.');
    }
  };

  // Play user's recorded audio
  const handlePlayUserAudio = () => {
    if (!recordedAudio) return;
    cancelSpanishSpeech();
    setIsPlayingNative(false);

    if (userAudioPlayerRef.current) {
      userAudioPlayerRef.current.pause();
    }

    const audio = new Audio(recordedAudio.url);
    userAudioPlayerRef.current = audio;
    setIsPlayingUserAudio(true);

    audio.onended = () => {
      setIsPlayingUserAudio(false);
    };
    audio.onerror = () => {
      setIsPlayingUserAudio(false);
    };

    audio.play().catch(e => {
      console.warn('Audio play error:', e);
      setIsPlayingUserAudio(false);
    });
  };

  // Stop user's audio
  const handleStopUserAudio = () => {
    if (userAudioPlayerRef.current) {
      userAudioPlayerRef.current.pause();
      setIsPlayingUserAudio(false);
    }
  };

  // Self-Evaluation Handler (Low-stress, generous XP, no arbitrary failure countdowns!)
  const handleSelfEvaluate = (rating: 'practice' | 'good' | 'native') => {
    const xpAwards = {
      practice: 15,
      good: 30,
      native: 45
    };
    const earnedXp = xpAwards[rating];

    const feedbackMessages = {
      practice: '¡Buen intento! Repetir en voz alta entrena tus músculos vocales.',
      good: '¡Excelente cadencia! La entonación y las pausas están en su punto.',
      native: '¡Impresionante! Prosodia, sinalefa y acento dignos de un nativo.'
    };

    soundEffects.playLevelUp();
    if (rating === 'native') {
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
    }

    setSessionXp(prev => prev + earnedXp);
    setCompletedDrillsCount(prev => prev + 1);
    setPracticeStreak(prev => prev + 1);

    if (onAddXp) {
      onAddXp(earnedXp);
    } else {
      setUserProgress(prev => ({
        ...prev,
        xp: prev.xp + earnedXp
      }));
    }

    setEvaluationToast(feedbackMessages[rating]);
    setTimeout(() => {
      setEvaluationToast(null);
      // Move to next drill
      handleNextDrill();
    }, 1800);
  };

  const handleNextDrill = () => {
    soundEffects.playPop();
    setCurrentIndex(prev => (prev + 1) % filteredDrills.length);
  };

  const handlePrevDrill = () => {
    soundEffects.playPop();
    setCurrentIndex(prev => (prev - 1 + filteredDrills.length) % filteredDrills.length);
  };

  const categories = [
    'All',
    'Greetings & Basics',
    'Ordering & Dining',
    'Asking Questions',
    'Expressing Feelings',
    'Telling Stories & Anecdotes'
  ];

  return (
    <div className="space-y-6 pb-24 md:pb-12 max-w-4xl mx-auto">
      {/* 🎙️ Header & Navigation Bar */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-[#181615] border border-stone-200/90 dark:border-stone-800 rounded-3xl p-5 sm:p-6 shadow-2xs space-y-4"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 dark:border-stone-800 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-lg text-xs font-bold bg-[#C85A32]/10 text-[#C85A32] dark:text-[#E07A5F] border border-[#C85A32]/20">
                Estudio de Prosodia y Fonética
              </span>
              <span className="text-xs text-stone-400 font-mono font-bold">
                Frase {currentIndex + 1} de {filteredDrills.length}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black font-serif text-stone-900 dark:text-stone-100 mt-1">
              Oral Shadowing & Acento Nativo
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 text-amber-700 dark:text-amber-400 text-xs font-bold">
              <Flame className="w-4 h-4 text-amber-500" />
              <span>{practiceStreak} en racha</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-bold">
              <Award className="w-4 h-4 text-emerald-500" />
              <span>+{sessionXp} XP ganados</span>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center justify-between flex-wrap gap-2 text-xs">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  soundEffects.playPop();
                  setSelectedCategory(cat);
                  setCurrentIndex(0);
                }}
                className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#C85A32] text-white shadow-2xs'
                    : 'bg-stone-100 dark:bg-stone-850 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-800'
                }`}
              >
                {cat === 'All' ? 'Todas las categorías' : cat}
              </button>
            ))}
          </div>

          {/* CEFR Level Selector */}
          <div className="flex items-center gap-1">
            {['All', 'A1', 'A2', 'B1', 'B2'].map(lvl => (
              <button
                key={lvl}
                type="button"
                onClick={() => {
                  soundEffects.playPop();
                  setSelectedLevel(lvl);
                  setCurrentIndex(0);
                }}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer ${
                  selectedLevel === lvl
                    ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900'
                    : 'bg-stone-100 dark:bg-stone-850 text-stone-500 hover:text-stone-800'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* 🎭 Main Shadowing Canvas */}
      {activeDrill && (
        <div className="bg-white dark:bg-[#181615] border border-stone-200/90 dark:border-stone-800 rounded-3xl p-6 sm:p-8 shadow-2xs space-y-6">
          {/* Prompt & Context Header */}
          <div className="space-y-1 border-b border-stone-100 dark:border-stone-800 pb-4">
            <div className="flex items-center justify-between text-xs text-stone-400">
              <span className="font-bold text-[#C85A32] uppercase tracking-wider">
                {activeDrill.category} • Nivel {activeDrill.level}
              </span>
              <span>{activeDrill.title}</span>
            </div>
            <p className="text-sm sm:text-base font-semibold text-stone-700 dark:text-stone-300">
              "{activeDrill.english_prompt}"
            </p>
          </div>

          {/* 🗣️ Spanish Target Sentence with Syllable & Stress Mark Visualizer */}
          <div className="space-y-4">
            <div className="p-5 sm:p-6 rounded-2xl bg-[#FBF9F5] dark:bg-[#121110] border border-stone-200/80 dark:border-stone-800 space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                Pronunciación y Prosodia (Marcas Fonológicas):
              </span>

              {/* Render Words with Syllables and Stressed Highlighting */}
              <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-3 text-2xl sm:text-3xl font-serif leading-relaxed">
                {phoneticAnalysis.words.map((pw, wIdx) => {
                  const isCurrentWord = activeWordIndex === wIdx;

                  return (
                    <div key={wIdx} className="inline-flex items-center group relative">
                      {/* Leading punctuation */}
                      {pw.punctuationBefore && (
                        <span className="text-stone-400 select-none">{pw.punctuationBefore}</span>
                      )}

                      {/* Syllable Word Breakdown */}
                      <span
                        className={`inline-flex items-center transition-colors rounded-lg px-1 py-0.5 ${
                          isCurrentWord
                            ? 'bg-amber-400/25 ring-2 ring-amber-400/50'
                            : ''
                        }`}
                      >
                        {pw.syllables.map((syl, sIdx) => {
                          const isStressed = sIdx === pw.stressedIndex && pw.syllables.length > 0;
                          return (
                            <span key={sIdx} className="inline-flex items-baseline">
                              <span
                                className={`transition-all ${
                                  isStressed
                                    ? 'text-[#C85A32] dark:text-[#E07A5F] font-black underline decoration-2 decoration-[#C85A32]/40 tracking-tight'
                                    : 'text-stone-800 dark:text-stone-200 font-normal'
                                }`}
                                title={isStressed ? 'Sílaba tónica con mayor intensidad de voz' : undefined}
                              >
                                {syl}
                              </span>
                              {sIdx < pw.syllables.length - 1 && (
                                <span className="text-stone-300 dark:text-stone-700 text-lg mx-px select-none">
                                  -
                                </span>
                              )}
                            </span>
                          );
                        })}
                      </span>

                      {/* Trailing punctuation */}
                      {pw.punctuationAfter && (
                        <span className="text-stone-400 select-none">{pw.punctuationAfter}</span>
                      )}

                      {/* Sinalefa Linking Bridge Icon */}
                      {pw.hasSinalefaWithNext && (
                        <span
                          className="inline-flex items-center ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-sans font-bold bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30 select-none shadow-2xs"
                          title={pw.sinalefaExplanation}
                        >
                          <span className="text-xs leading-none">‿</span>
                          <span className="text-[9px] uppercase tracking-tighter ml-0.5 hidden sm:inline">sinalefa</span>
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Phonetic guide and vocal focus */}
              <div className="pt-2 border-t border-stone-200/60 dark:border-stone-800/80 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-stone-500 dark:text-stone-400 gap-2">
                <div className="flex items-center gap-1.5 font-mono text-stone-600 dark:text-stone-300">
                  <span className="font-bold text-stone-400">Guía fonética:</span>
                  <span>{activeDrill.phonetic}</span>
                </div>

                <div className="text-[#C85A32] dark:text-[#E07A5F] font-semibold text-xs">
                  🎯 {activeDrill.key_vocal_focus}
                </div>
              </div>
            </div>

            {/* Cultural & Dialect Prosody Tip */}
            {activeDrill.mexican_nuance_tip && (
              <div className="p-3.5 rounded-2xl bg-amber-500/10 dark:bg-amber-400/5 border border-amber-500/20 text-xs flex items-start gap-2.5">
                <span className="text-base leading-none">💡</span>
                <div className="space-y-0.5">
                  <span className="font-bold text-stone-800 dark:text-stone-200">
                    Consejo de Entonación y Enlace Nativo:
                  </span>
                  <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
                    {activeDrill.mexican_nuance_tip}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* 🎧 Tactile Cadence Steps: Listen, Slow, Record, Compare */}
          <div className="space-y-4 pt-2">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-400 block">
              Paso a Paso de Sombra Oral (Shadowing):
            </span>

            {/* Step 1 & Step 2 Listen Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Step 1: Normal Speed 1.0x */}
              <button
                type="button"
                onClick={() => handlePlayNative(1.0)}
                className={`p-4 rounded-2xl border transition cursor-pointer flex items-center justify-between group ${
                  isPlayingNative && currentRate === 1.0
                    ? 'bg-[#C85A32] text-white border-[#C85A32] shadow-xs ring-2 ring-[#C85A32]/30'
                    : 'bg-stone-50 dark:bg-stone-900 border-stone-200/80 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700 text-stone-800 dark:text-stone-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl ${
                    isPlayingNative && currentRate === 1.0
                      ? 'bg-white/20 text-white'
                      : 'bg-[#C85A32]/10 text-[#C85A32]'
                  }`}>
                    <Volume2 className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <span className="text-[10px] uppercase font-bold opacity-75 block">Paso 1</span>
                    <span className="font-bold text-sm">Escuchar (1.0x Normal)</span>
                  </div>
                </div>
                <span className="text-xs opacity-75 font-mono">Cadencia nativa</span>
              </button>

              {/* Step 2: Slowed 0.8x with Syllable Precision */}
              <button
                type="button"
                onClick={() => handlePlayNative(0.8)}
                className={`p-4 rounded-2xl border transition cursor-pointer flex items-center justify-between group ${
                  isPlayingNative && currentRate === 0.8
                    ? 'bg-amber-600 text-white border-amber-600 shadow-xs ring-2 ring-amber-600/30'
                    : 'bg-stone-50 dark:bg-stone-900 border-stone-200/80 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700 text-stone-800 dark:text-stone-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl ${
                    isPlayingNative && currentRate === 0.8
                      ? 'bg-white/20 text-white'
                      : 'bg-amber-500/10 text-amber-600'
                  }`}>
                    <Headphones className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <span className="text-[10px] uppercase font-bold opacity-75 block">Paso 2</span>
                    <span className="font-bold text-sm">Escuchar Lento (0.8x)</span>
                  </div>
                </div>
                <span className="text-xs opacity-75 font-mono">Detalle silábico</span>
              </button>
            </div>

            {/* Step 3: Record Your Voice via MediaRecorder */}
            <div className="p-5 rounded-2xl bg-stone-50/80 dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">Paso 3</span>
                  <h4 className="text-sm font-bold text-stone-900 dark:text-white">
                    Graba tu voz y compara lado a lado
                  </h4>
                </div>

                <span className="text-xs text-stone-500">
                  Sin límite estricto de tiempo • Habla a tu propio ritmo
                </span>
              </div>

              {recorderError && (
                <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 text-xs font-medium border border-rose-200 dark:border-rose-900">
                  {recorderError}
                </div>
              )}

              {/* Recording Action Button with Waveform */}
              <div className="flex flex-col sm:flex-row items-center gap-4">
                {!isRecording ? (
                  <button
                    type="button"
                    onClick={handleStartRecording}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm flex items-center justify-center gap-2.5 transition shadow-xs cursor-pointer group"
                  >
                    <Mic className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span>{recordedAudio ? 'Grabar de Nuevo' : 'Comenzar Grabación'}</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleStopRecording}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-stone-900 dark:bg-white text-white dark:text-stone-900 font-bold text-sm flex items-center justify-center gap-2.5 transition shadow-xs cursor-pointer animate-pulse ring-2 ring-rose-400"
                  >
                    <Square className="w-4 h-4 fill-current" />
                    <span>Detener Grabación</span>
                  </button>
                )}

                {/* Animated waveform when recording */}
                {isRecording && (
                  <div className="flex items-center gap-1.5 h-6 px-3 py-1 bg-rose-50 dark:bg-rose-950/30 rounded-xl border border-rose-200 dark:border-rose-900">
                    <span className="text-xs font-bold text-rose-600 dark:text-rose-400 mr-2">
                      Grabando en vivo:
                    </span>
                    {[35, 80, 50, 95, 70, 40, 85].map((h, i) => (
                      <motion.span
                        key={i}
                        animate={{ height: [`${h * 0.3}%`, `${h}%`, `${h * 0.2}%`] }}
                        transition={{ repeat: Infinity, duration: 0.5 + i * 0.08, ease: 'easeInOut' }}
                        className="w-1 bg-rose-500 rounded-full inline-block"
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Side-by-Side Comparison Player when User Audio is Available */}
              {recordedAudio && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-xl bg-white dark:bg-stone-850 border border-stone-200 dark:border-stone-750 space-y-3"
                >
                  <div className="flex items-center justify-between text-xs text-stone-500">
                    <span className="font-bold text-stone-800 dark:text-stone-200">
                      Comparativa Auditiva Lado a Lado:
                    </span>
                    <span className="font-mono">
                      Duración: {(recordedAudio.durationMs / 1000).toFixed(1)}s
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Play Native Audio */}
                    <button
                      type="button"
                      onClick={() => handlePlayNative(1.0)}
                      className={`p-3 rounded-xl border transition cursor-pointer flex items-center justify-between text-xs font-bold ${
                        isPlayingNative
                          ? 'bg-[#C85A32] text-white border-[#C85A32]'
                          : 'bg-stone-50 dark:bg-stone-900 border-stone-200 text-stone-800 dark:text-stone-200 hover:border-[#C85A32]'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <Volume2 className="w-4 h-4" />
                        <span>Escuchar Modelo Nativo</span>
                      </span>
                      <span className="text-[10px] opacity-75">1.0x</span>
                    </button>

                    {/* Play User Audio */}
                    <button
                      type="button"
                      onClick={isPlayingUserAudio ? handleStopUserAudio : handlePlayUserAudio}
                      className={`p-3 rounded-xl border transition cursor-pointer flex items-center justify-between text-xs font-bold ${
                        isPlayingUserAudio
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : 'bg-stone-50 dark:bg-stone-900 border-stone-200 text-stone-800 dark:text-stone-200 hover:border-emerald-500'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        {isPlayingUserAudio ? <Square className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                        <span>{isPlayingUserAudio ? 'Pausar Mi Grabación' : 'Escuchar Mi Grabación'}</span>
                      </span>
                      <span className="text-[10px] opacity-75">Tu voz</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Step 4: Self-Evaluation & Honest Feedback Buttons */}
            {recordedAudio && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-5 rounded-2xl bg-amber-500/10 dark:bg-amber-400/5 border border-amber-500/25 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#B47832] dark:text-amber-400 block">
                      Paso 4: Auto-evaluación
                    </span>
                    <h4 className="text-sm font-bold text-stone-900 dark:text-white">
                      ¿Cómo sentiste tu pronunciación y fluidez?
                    </h4>
                  </div>
                  <span className="text-xs text-stone-500">
                    Gana XP según tu evaluación honesta
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  {/* Option 1: Need Practice */}
                  <button
                    type="button"
                    onClick={() => handleSelfEvaluate('practice')}
                    className="p-3.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-amber-400 transition cursor-pointer text-left space-y-1 shadow-2xs group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-stone-800 dark:text-stone-200 group-hover:text-amber-600">
                        Necesito practicar
                      </span>
                      <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300">
                        +15 XP
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-500 leading-tight">
                      Aún me cuesta la velocidad o el enlace de sinalefa.
                    </p>
                  </button>

                  {/* Option 2: Pretty Good */}
                  <button
                    type="button"
                    onClick={() => handleSelfEvaluate('good')}
                    className="p-3.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-emerald-400 transition cursor-pointer text-left space-y-1 shadow-2xs group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-stone-800 dark:text-stone-200 group-hover:text-emerald-600">
                        Bastante bien
                      </span>
                      <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300">
                        +30 XP
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-500 leading-tight">
                      Pronunciación clara y ritmo comprensible.
                    </p>
                  </button>

                  {/* Option 3: Like a Native */}
                  <button
                    type="button"
                    onClick={() => handleSelfEvaluate('native')}
                    className="p-3.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-[#C85A32] transition cursor-pointer text-left space-y-1 shadow-2xs group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-stone-800 dark:text-stone-200 group-hover:text-[#C85A32]">
                        ¡Igual que un nativo!
                      </span>
                      <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-[#C85A32]/10 text-[#C85A32] dark:text-[#E07A5F]">
                        +45 XP
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-500 leading-tight">
                      Acento fluido, sílabas tónicas y enlaces exactos.
                    </p>
                  </button>
                </div>
              </motion.div>
            )}

            {/* Bottom Controls: Previous & Next Drill */}
            <div className="flex items-center justify-between pt-2 border-t border-stone-100 dark:border-stone-800">
              <button
                type="button"
                onClick={handlePrevDrill}
                disabled={currentIndex === 0}
                className="px-4 py-2 rounded-xl text-xs font-bold text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-850 disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
              >
                ← Frase Anterior
              </button>

              <button
                type="button"
                onClick={handleNextDrill}
                className="px-5 py-2.5 rounded-xl bg-stone-900 dark:bg-white text-white dark:text-stone-900 text-xs font-bold flex items-center gap-1.5 hover:bg-stone-800 transition cursor-pointer shadow-xs"
              >
                <span>Siguiente Frase</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Evaluation Feedback Toast */}
      <AnimatePresence>
        {evaluationToast && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-stone-900 text-white text-xs font-bold shadow-xl flex items-center gap-2.5 border border-stone-700"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{evaluationToast}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OralShadowingDrill;
