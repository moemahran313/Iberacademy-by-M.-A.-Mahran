import React, { useState, useEffect, useRef } from 'react';
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
  Clock,
  ArrowRight,
  Flame,
  VolumeX,
  Radio,
  Filter,
  Check,
  BarChart3,
  Lightbulb,
  Headphones,
  RefreshCw
} from 'lucide-react';
import { SPEAKING_DRILLS, SpeakingDrill } from '../data/speakingDrills';
import { speakSpanish, speakSpanishWithHighlight, cancelSpanishSpeech, soundEffects } from '../utils/audio';
import { TactileFeedback } from './TactileFeedback';
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

  // Drill Stage State (1: Listen & Shadow, 2: Prompt & Produce, 3: Speed & Rhythm Challenge)
  const [currentStage, setCurrentStage] = useState<1 | 2 | 3>(1);

  // Repetition & Mastery State (Every scenario requires 3 aloud reps)
  const [completedReps, setCompletedReps] = useState<{ [drillId: string]: number }>({});
  const [masteredDrills, setMasteredDrills] = useState<string[]>([]);

  // Speech & Audio States
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [activeWordIndex, setActiveWordIndex] = useState<number | null>(null);

  // Speech Recognition States
  const [isListening, setIsListening] = useState<boolean>(false);
  const [spokenTranscript, setSpokenTranscript] = useState<string>('');
  const [transcriptAccuracy, setTranscriptAccuracy] = useState<number | null>(null);
  const [speechError, setSpeechError] = useState<string | null>(null);

  // Stage 2 Countdown State
  const [countdown, setCountdown] = useState<number>(5);
  const [isCountdownActive, setIsCountdownActive] = useState<boolean>(false);
  const [stage2Revealed, setStage2Revealed] = useState<boolean>(false);

  // Stage 3 Speed Challenge State
  const [challengeTimeLeft, setChallengeTimeLeft] = useState<number>(4.0);
  const [isChallengeActive, setIsChallengeActive] = useState<boolean>(false);
  const [challengeResult, setChallengeResult] = useState<'success' | 'too_slow' | null>(null);

  // Filtered drills list
  const filteredDrills = SPEAKING_DRILLS.filter(d => {
    const categoryMatch = selectedCategory === 'All' || d.category === selectedCategory;
    const levelMatch = selectedLevel === 'All' || d.level === selectedLevel;
    return categoryMatch && levelMatch;
  });

  const activeDrill: SpeakingDrill | undefined = filteredDrills[currentIndex] || filteredDrills[0];

  // Speech Recognition Ref
  const recognitionRef = useRef<any>(null);

  // Initialize Web Speech API Recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = 'es-MX'; // Mexican Spanish target

        recognition.onstart = () => {
          setIsListening(true);
          setSpeechError(null);
        };

        recognition.onresult = (event: any) => {
          let currentTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            currentTranscript += event.results[i][0].transcript;
          }
          setSpokenTranscript(currentTranscript);
        };

        recognition.onerror = (event: any) => {
          console.warn('Speech recognition error:', event.error);
          setIsListening(false);
          if (event.error === 'not-allowed') {
            setSpeechError('Microphone permission blocked. Please allow mic access in browser.');
          } else if (event.error === 'no-speech') {
            setSpeechError('No speech detected. Try speaking closer to your microphone.');
          }
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      }
    }

    return () => {
      cancelSpanishSpeech();
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {}
      }
    };
  }, []);

  // Stage 2 Countdown Timer Logic
  useEffect(() => {
    let timer: any = null;
    if (isCountdownActive && countdown > 0) {
      timer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    } else if (isCountdownActive && countdown === 0) {
      setIsCountdownActive(false);
      setStage2Revealed(true);
      soundEffects.playPop();
      if (activeDrill) {
        speakSpanish(activeDrill.spanish_target, 0.9);
      }
    }
    return () => clearInterval(timer);
  }, [isCountdownActive, countdown, activeDrill]);

  // Stage 3 Challenge Timer Logic
  useEffect(() => {
    let timer: any = null;
    if (isChallengeActive && challengeTimeLeft > 0) {
      timer = setInterval(() => {
        setChallengeTimeLeft(prev => {
          if (prev <= 0.1) {
            clearInterval(timer);
            setIsChallengeActive(false);
            setChallengeResult('too_slow');
            soundEffects.playIncorrect();
            return 0;
          }
          return Math.max(0, +(prev - 0.1).toFixed(1));
        });
      }, 100);
    }
    return () => clearInterval(timer);
  }, [isChallengeActive, challengeTimeLeft]);

  // Reset drill state when changing drill or stage
  const resetDrillState = () => {
    cancelSpanishSpeech();
    setIsPlayingAudio(false);
    setActiveWordIndex(null);
    setSpokenTranscript('');
    setTranscriptAccuracy(null);
    setSpeechError(null);
    setCountdown(5);
    setIsCountdownActive(false);
    setStage2Revealed(false);
    setIsChallengeActive(false);
    setChallengeResult(null);
    if (activeDrill) {
      setChallengeTimeLeft(activeDrill.target_seconds);
    }
  };

  useEffect(() => {
    resetDrillState();
  }, [currentIndex, currentStage, selectedCategory, selectedLevel]);

  // Handle playing native audio
  const handlePlayAudio = (rate: number = 0.9) => {
    if (!activeDrill) return;
    cancelSpanishSpeech();
    setIsPlayingAudio(true);
    setPlaybackSpeed(rate);

    speakSpanishWithHighlight(activeDrill.spanish_target, {
      rate,
      onWordBoundary: (charIndex) => {
        const wordsBefore = activeDrill.spanish_target.substring(0, charIndex).split(/\s+/).length - 1;
        setActiveWordIndex(wordsBefore);
      },
      onEnd: () => {
        setIsPlayingAudio(false);
        setActiveWordIndex(null);
      },
      onError: () => {
        setIsPlayingAudio(false);
        setActiveWordIndex(null);
      }
    });
  };

  // Start Voice Recognition
  const handleStartListening = () => {
    setSpokenTranscript('');
    setTranscriptAccuracy(null);
    setSpeechError(null);

    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
        soundEffects.playPop();
      } catch (e) {
        setIsListening(true);
      }
    } else {
      // Fallback for browsers without Web Speech API
      setIsListening(true);
      setTimeout(() => {
        setIsListening(false);
        if (activeDrill) {
          const simText = activeDrill.spanish_target;
          setSpokenTranscript(simText);
          evaluateAccuracy(simText);
        }
      }, 3000);
    }
  };

  const handleStopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
    }
    setIsListening(false);
    evaluateAccuracy(spokenTranscript);
  };

  // Evaluate Accuracy comparing spoken vs target
  const evaluateAccuracy = (spoken: string) => {
    if (!activeDrill || !spoken.trim()) return;

    const normalize = (str: string) =>
      str.toLowerCase().replace(/[¿?¡!.,;:]/g, '').trim();

    const targetWords = normalize(activeDrill.spanish_target).split(/\s+/);
    const spokenWords = normalize(spoken).split(/\s+/);

    let matchCount = 0;
    targetWords.forEach(tw => {
      if (spokenWords.some(sw => sw.includes(tw) || tw.includes(sw))) {
        matchCount++;
      }
    });

    const accuracy = Math.round((matchCount / targetWords.length) * 100);
    setTranscriptAccuracy(accuracy);

    if (accuracy >= 60) {
      soundEffects.playCorrect();
      recordRepetitionSuccess();
    } else {
      soundEffects.playIncorrect();
    }
  };

  // Record Repetition Success
  const recordRepetitionSuccess = () => {
    if (!activeDrill) return;

    const currentReps = completedReps[activeDrill.id] || 0;
    const newReps = Math.min(3, currentReps + 1);

    setCompletedReps(prev => ({
      ...prev,
      [activeDrill.id]: newReps
    }));

    // Award XP
    if (onAddXp) {
      onAddXp(15);
    }

    // Check if mastered (3 reps completed)
    if (newReps >= 3 && !masteredDrills.includes(activeDrill.id)) {
      setMasteredDrills(prev => [...prev, activeDrill.id]);
      soundEffects.playLevelUp();
      if (onAddXp) {
        onAddXp(50); // Bonus 50 XP for mastery
      }
    }
  };

  // Start Stage 2 Production Challenge
  const handleStartStage2Countdown = () => {
    setCountdown(5);
    setIsCountdownActive(true);
    setStage2Revealed(false);
    soundEffects.playPop();
  };

  // Start Stage 3 Speed Challenge
  const handleStartStage3Challenge = () => {
    if (!activeDrill) return;
    setChallengeTimeLeft(activeDrill.target_seconds);
    setIsChallengeActive(true);
    setChallengeResult(null);
    handleStartListening();
  };

  // Calculate matching words for visual highlighting
  const getWordMatchStatuses = () => {
    if (!activeDrill) return [];
    const targetWords = activeDrill.spanish_target.split(' ');
    const spokenNormalized = spokenTranscript.toLowerCase().replace(/[¿?¡!.,;:]/g, '');

    return targetWords.map((word, idx) => {
      const normWord = word.toLowerCase().replace(/[¿?¡!.,;:]/g, '');
      const isMatched = spokenNormalized.includes(normWord);
      const isCurrentlyHighlighted = activeWordIndex === idx;

      return {
        word,
        isMatched,
        isCurrentlyHighlighted
      };
    });
  };

  const categories = [
    'All',
    'Greetings & Basics',
    'Ordering & Dining',
    'Asking Questions',
    'Expressing Feelings',
    'Telling Stories & Anecdotes'
  ];

  const levels = ['All', 'A1', 'A2', 'B1', 'B2'];

  const activeRepCount = activeDrill ? (completedReps[activeDrill.id] || 0) : 0;
  const isMastered = activeDrill ? masteredDrills.includes(activeDrill.id) : false;

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-950 to-amber-950 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-amber-500/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 font-mono text-xs font-black uppercase tracking-wider border border-amber-500/30 flex items-center gap-1.5">
                <Mic className="w-3.5 h-3.5 animate-pulse" />
                Active Oral Production Engine
              </span>
              <span className="text-xs text-stone-400 font-medium">50 Scenarios</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-header tracking-tight text-white">
              Speak-Style Oral Shadowing Studio
            </h1>
            <p className="text-sm text-stone-300 max-w-xl font-sans leading-relaxed">
              Bridge the gap between silent reading and real-world Mexican speech. Practice mouth muscle memory across 3 stages of active vocal repetition.
            </p>
          </div>

          {/* Session Performance Stats */}
          <div className="flex items-center gap-3 self-stretch md:self-auto justify-between bg-stone-900/80 backdrop-blur-md px-4 py-3 rounded-2xl border border-stone-800 shrink-0">
            <div className="text-center px-2">
              <div className="text-xs text-stone-400 font-medium">Mastered</div>
              <div className="text-xl font-black text-amber-400 flex items-center justify-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                {masteredDrills.length} / 50
              </div>
            </div>
            <div className="w-px h-8 bg-stone-800" />
            <div className="text-center px-2">
              <div className="text-xs text-stone-400 font-medium">Total Reps</div>
              <div className="text-xl font-black text-amber-400 flex items-center justify-center gap-1">
                <Flame className="w-4 h-4 text-amber-500" />
                {(Object.values(completedReps) as number[]).reduce((a: number, b: number) => a + b, 0)}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category & Level Filter Navigation */}
      <div className="bg-white dark:bg-stone-900 rounded-2xl p-4 shadow-sm border border-stone-200 dark:border-stone-800 space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 text-xs font-bold text-stone-600 dark:text-stone-300 uppercase tracking-wider">
            <Filter className="w-4 h-4 text-amber-500" />
            <span>Filter Category:</span>
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  soundEffects.playPop();
                  setSelectedCategory(cat);
                  setCurrentIndex(0);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-amber-500 text-stone-950 shadow-sm'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between flex-wrap gap-2 pt-2 border-t border-stone-100 dark:border-stone-800">
          <div className="flex items-center gap-2 text-xs font-bold text-stone-600 dark:text-stone-300 uppercase tracking-wider">
            <BarChart3 className="w-4 h-4 text-amber-500" />
            <span>CEFR Level:</span>
          </div>
          <div className="flex items-center gap-1.5">
            {levels.map((lvl) => (
              <button
                key={lvl}
                onClick={() => {
                  soundEffects.playPop();
                  setSelectedLevel(lvl);
                  setCurrentIndex(0);
                }}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition cursor-pointer ${
                  selectedLevel === lvl
                    ? 'bg-stone-900 dark:bg-amber-400 text-white dark:text-stone-950'
                    : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Scenario Vocal Card */}
      {activeDrill ? (
        <div className="bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-8 shadow-xl border border-stone-200 dark:border-stone-800 space-y-6 relative overflow-hidden">
          {/* Card Top Meta */}
          <div className="flex items-center justify-between gap-4 flex-wrap border-b border-stone-100 dark:border-stone-800 pb-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-mono text-xs font-bold border border-amber-500/20">
                {activeDrill.level}
              </span>
              <span className="text-xs font-bold text-stone-500 dark:text-stone-400">
                {activeDrill.category}
              </span>
              <span className="text-xs text-stone-400 dark:text-stone-500">•</span>
              <span className="text-xs text-stone-500 font-medium">
                Scenario {currentIndex + 1} of {filteredDrills.length}
              </span>
            </div>

            {/* 3 Required Aloud Repetitions Status */}
            <div className="flex items-center gap-2 bg-stone-50 dark:bg-stone-800 px-3 py-1.5 rounded-full border border-stone-200 dark:border-stone-700">
              <span className="text-xs font-bold text-stone-600 dark:text-stone-300">
                Aloud Reps:
              </span>
              <div className="flex items-center gap-1">
                {[1, 2, 3].map((repNum) => (
                  <div
                    key={repNum}
                    className={`w-3 h-3 rounded-full transition-all ${
                      activeRepCount >= repNum
                        ? 'bg-emerald-500 scale-110 shadow-xs'
                        : 'bg-stone-300 dark:bg-stone-600'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs font-mono font-bold text-stone-700 dark:text-stone-300 ml-1">
                {activeRepCount}/3
              </span>
              {isMastered && (
                <span className="ml-1 text-xs font-bold text-emerald-500 flex items-center gap-0.5">
                  <Check className="w-3.5 h-3.5" /> Mastered!
                </span>
              )}
            </div>
          </div>

          {/* Scenario Context & Title */}
          <div className="space-y-2 border-b border-stone-100 dark:border-stone-800/80 pb-5">
            <h2 className="text-2xl font-black font-header text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <span>{activeDrill.title}</span>
            </h2>
            <div className="text-sm text-stone-700 dark:text-stone-300 flex items-start gap-2.5 pt-1">
              <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                <span className="font-extrabold text-amber-600 dark:text-amber-400 mr-1.5 uppercase font-mono text-xs tracking-wider">English Prompt:</span>
                <span className="font-medium text-stone-800 dark:text-stone-200">"{activeDrill.english_prompt}"</span>
              </div>
            </div>
          </div>

          {/* 3-Stage Tab Navigation */}
          <div className="grid grid-cols-3 gap-2 p-1.5 bg-stone-100 dark:bg-stone-800/80 rounded-2xl border border-stone-200 dark:border-stone-700">
            <button
              onClick={() => {
                soundEffects.playPop();
                setCurrentStage(1);
              }}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                currentStage === 1
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-amber-400 shadow-sm'
                  : 'text-stone-500 dark:text-stone-400 hover:text-stone-900'
              }`}
            >
              <Headphones className="w-3.5 h-3.5" />
              <span>1. Shadow & Listen</span>
            </button>

            <button
              onClick={() => {
                soundEffects.playPop();
                setCurrentStage(2);
              }}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                currentStage === 2
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-amber-400 shadow-sm'
                  : 'text-stone-500 dark:text-stone-400 hover:text-stone-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>2. Prompt & Produce</span>
            </button>

            <button
              onClick={() => {
                soundEffects.playPop();
                setCurrentStage(3);
              }}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                currentStage === 3
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-amber-400 shadow-sm'
                  : 'text-stone-500 dark:text-stone-400 hover:text-stone-900'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>3. Speed Challenge</span>
            </button>
          </div>

          {/* STAGE 1: LISTEN & SHADOW */}
          {currentStage === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6 pt-2"
            >
              {/* Target Spanish Sentence Box */}
              <div className="bg-stone-900 text-white rounded-2xl p-6 space-y-4 relative overflow-hidden shadow-inner">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-400 flex items-center gap-1">
                    <Radio className="w-3 h-3 text-amber-400 animate-pulse" /> Native Mexican Target
                  </span>
                  <span className="text-xs text-stone-400 font-mono">
                    Cadence Focus: {activeDrill.key_vocal_focus}
                  </span>
                </div>

                {/* Animated Word Display */}
                <div className="text-xl sm:text-2xl font-black font-header leading-snug tracking-wide flex flex-wrap gap-2">
                  {getWordMatchStatuses().map((item, idx) => (
                    <span
                      key={idx}
                      className={`transition-all duration-200 px-1 rounded ${
                        item.isCurrentlyHighlighted
                          ? 'bg-amber-500 text-stone-950 scale-105 shadow-md font-bold'
                          : item.isMatched
                          ? 'text-emerald-400 font-bold'
                          : 'text-stone-100'
                      }`}
                    >
                      {item.word}
                    </span>
                  ))}
                </div>

                {/* Phonetic & Nuance Tip */}
                <div className="pt-2 border-t border-stone-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                  <div className="text-amber-300 font-mono">
                    🗣️ {activeDrill.phonetic}
                  </div>
                  <div className="text-stone-400 bg-stone-800/80 px-2.5 py-1 rounded-lg border border-stone-700">
                    💡 <span className="text-stone-200">{activeDrill.mexican_nuance_tip}</span>
                  </div>
                </div>

                {/* Animated Visual Waveform Bars */}
                <div className="flex items-center justify-center gap-1 pt-2 h-8">
                  {[...Array(16)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-1 rounded-full transition-all duration-150 ${
                        isPlayingAudio || isListening
                          ? 'bg-gradient-to-t from-amber-500 to-amber-300 animate-pulse'
                          : 'bg-stone-700'
                      }`}
                      style={{
                        height: isPlayingAudio || isListening ? `${Math.sin(i + Date.now()/100) * 12 + 16}px` : '6px'
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Audio Controls & Mic Shadow Button */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                {/* Play Normal Speed */}
                <TactileFeedback variant="subtle">
                  <button
                    onClick={() => handlePlayAudio(1.0)}
                    disabled={isPlayingAudio}
                    className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-sm transition shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Volume2 className="w-5 h-5" />
                    <span>Listen Normal (1.0x)</span>
                  </button>
                </TactileFeedback>

                {/* Play Slow Speed */}
                <TactileFeedback variant="subtle">
                  <button
                    onClick={() => handlePlayAudio(activeDrill.slow_speed_rate)}
                    disabled={isPlayingAudio}
                    className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 font-bold text-sm transition border border-stone-300 dark:border-stone-700 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Clock className="w-4 h-4 text-amber-500" />
                    <span>Slow Shadow ({activeDrill.slow_speed_rate}x)</span>
                  </button>
                </TactileFeedback>

                {/* Repeat Aloud Mic Button */}
                <TactileFeedback variant="pop">
                  <button
                    onClick={isListening ? handleStopListening : handleStartListening}
                    className={`w-full sm:w-auto px-6 py-3 rounded-2xl font-black text-sm transition shadow-lg flex items-center justify-center gap-2 cursor-pointer ${
                      isListening
                        ? 'bg-rose-500 text-white animate-pulse'
                        : 'bg-stone-900 dark:bg-amber-400 text-white dark:text-stone-950 hover:bg-stone-800'
                    }`}
                  >
                    {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                    <span>{isListening ? 'Listening... Stop' : 'Repeat Aloud Now'}</span>
                  </button>
                </TactileFeedback>
              </div>

              {/* Feedback Display */}
              {spokenTranscript && (
                <div className="bg-stone-50 dark:bg-stone-800/60 p-4 rounded-2xl border border-stone-200 dark:border-stone-700 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                      Your Spoken Vocal Input:
                    </span>
                    {transcriptAccuracy !== null && (
                      <span className={`text-xs font-mono font-black px-2 py-0.5 rounded-full ${
                        transcriptAccuracy >= 70 ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-600 border border-amber-500/20'
                      }`}>
                        Accuracy: {transcriptAccuracy}%
                      </span>
                    )}
                  </div>
                  <p className="text-base font-bold text-stone-900 dark:text-stone-100 font-mono">
                    "{spokenTranscript}"
                  </p>
                </div>
              )}

              {speechError && (
                <div className="text-xs text-amber-600 dark:text-amber-400 bg-amber-500/10 p-3 rounded-xl border border-amber-500/20 text-center">
                  {speechError}
                </div>
              )}
            </motion.div>
          )}

          {/* STAGE 2: PROMPT & PRODUCE */}
          {currentStage === 2 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6 pt-2"
            >
              <div className="bg-amber-500/10 dark:bg-amber-500/20 p-4 rounded-2xl border border-amber-500/30 text-center space-y-2">
                <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider">
                  Stage 2: Forced Recall & Sentence Generation
                </span>
                <p className="text-sm font-medium text-stone-700 dark:text-stone-300">
                  Read the English prompt above. Speak the Spanish sentence aloud before the 5-second reveal timer expires!
                </p>
              </div>

              {/* Timer Countdown Gauge */}
              <div className="flex flex-col items-center justify-center space-y-3 py-4">
                <div className="relative w-24 h-24 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-4 border-stone-200 dark:border-stone-800" />
                  <div
                    className="absolute inset-0 rounded-full border-4 border-amber-500 transition-all duration-1000"
                    style={{
                      clipPath: `inset(0 ${100 - (countdown / 5) * 100}% 0 0)`
                    }}
                  />
                  <span className="text-3xl font-black font-mono text-stone-900 dark:text-stone-100">
                    {countdown}s
                  </span>
                </div>

                {!isCountdownActive && !stage2Revealed && (
                  <button
                    onClick={handleStartStage2Countdown}
                    className="px-6 py-3 rounded-2xl bg-amber-500 text-stone-950 font-black text-sm shadow-md hover:bg-amber-400 transition cursor-pointer flex items-center gap-2"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>Start 5-Sec Production Recall</span>
                  </button>
                )}
              </div>

              {/* Masked / Revealed Spanish Answer */}
              <div className="bg-stone-900 text-white rounded-2xl p-6 text-center space-y-3 relative overflow-hidden">
                <div className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
                  Target Spanish Answer
                </div>

                <div className={`text-xl sm:text-2xl font-black transition-all duration-300 ${
                  stage2Revealed ? 'blur-none text-emerald-400' : 'blur-md select-none text-stone-500'
                }`}>
                  {activeDrill.spanish_target}
                </div>

                {!stage2Revealed && (
                  <button
                    onClick={() => {
                      setStage2Revealed(true);
                      handlePlayAudio(1.0);
                      recordRepetitionSuccess();
                    }}
                    className="text-xs text-amber-400 underline hover:text-amber-300 font-bold cursor-pointer"
                  >
                    Click to reveal answer immediately
                  </button>
                )}
              </div>
            </motion.div>
          )}

          {/* STAGE 3: SPEED & RHYTHM CHALLENGE */}
          {currentStage === 3 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6 pt-2"
            >
              <div className="bg-gradient-to-r from-stone-900 to-amber-950 text-white p-5 rounded-2xl space-y-2 border border-amber-500/30">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                    <Zap className="w-4 h-4 text-amber-400" /> Stage 3: Speed & Cadence Master
                  </span>
                  <span className="text-xs font-mono font-bold bg-amber-500/20 text-amber-300 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                    Target: {activeDrill.target_seconds}s
                  </span>
                </div>
                <p className="text-xs text-stone-300 leading-relaxed">
                  Say the full sentence aloud with natural fluidity before time runs out!
                </p>
              </div>

              {/* Challenge Gauge */}
              <div className="bg-stone-50 dark:bg-stone-800/80 p-6 rounded-2xl border border-stone-200 dark:border-stone-700 text-center space-y-4">
                <div className="text-4xl font-black font-mono text-amber-500">
                  {challengeTimeLeft.toFixed(1)}s
                </div>

                <div className="w-full bg-stone-200 dark:bg-stone-700 h-3 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-amber-500 to-orange-500 h-full transition-all duration-100"
                    style={{
                      width: `${(challengeTimeLeft / activeDrill.target_seconds) * 100}%`
                    }}
                  />
                </div>

                <div className="flex justify-center gap-3">
                  <button
                    onClick={handleStartStage3Challenge}
                    disabled={isChallengeActive}
                    className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-sm shadow-md transition cursor-pointer flex items-center gap-2 disabled:opacity-50"
                  >
                    <Mic className="w-4 h-4" />
                    <span>{isChallengeActive ? 'Speaking...' : 'Start Speed Run'}</span>
                  </button>
                </div>

                {challengeResult === 'too_slow' && (
                  <div className="text-xs font-bold text-rose-500 bg-rose-500/10 p-2.5 rounded-xl border border-rose-500/20">
                    ⏱️ Time expired! Try repeating faster to hit native speed.
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* Scenario Navigation Footer */}
          <div className="flex items-center justify-between border-t border-stone-100 dark:border-stone-800 pt-6 gap-4">
            <button
              onClick={() => {
                soundEffects.playPop();
                setCurrentIndex(prev => Math.max(0, prev - 1));
              }}
              disabled={currentIndex === 0}
              className="px-4 py-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-bold text-xs hover:bg-stone-200 dark:hover:bg-stone-700 transition cursor-pointer disabled:opacity-40"
            >
              Previous Scenario
            </button>

            <div className="text-xs font-mono text-stone-400">
              {currentIndex + 1} / {filteredDrills.length}
            </div>

            <button
              onClick={() => {
                soundEffects.playPop();
                setCurrentIndex(prev => Math.min(filteredDrills.length - 1, prev + 1));
              }}
              disabled={currentIndex === filteredDrills.length - 1}
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs transition cursor-pointer flex items-center gap-1.5 disabled:opacity-40"
            >
              <span>Next Scenario</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white dark:bg-stone-900 rounded-3xl p-12 text-center space-y-4">
          <p className="text-stone-500 font-bold">No speaking drills found matching selected filter criteria.</p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSelectedLevel('All');
            }}
            className="px-4 py-2 rounded-xl bg-amber-500 text-stone-950 font-bold text-xs"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
