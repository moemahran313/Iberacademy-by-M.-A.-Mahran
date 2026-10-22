import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  Send,
  Volume2,
  VolumeX,
  Sparkles,
  RotateCcw,
  Mic,
  MicOff,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Trophy,
  Flame,
  Languages,
  Plus,
  Check,
  ChevronDown,
  ChevronUp,
  Headphones,
  Zap,
  Info,
  X,
  Target,
  Play,
  Square,
  Compass,
  BookmarkPlus
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { UserProgress, TutorPersona } from '../types';
import { speakSpanishPersona, cancelSpanishSpeech, soundEffects } from '../utils/audio';
import { useApp } from '../context/AppContext';
import {
  ChatMessage,
  LINGOPAL_SCENARIOS,
  ScenarioDefinition,
  MissionObjective,
  TUTOR_PERSONAS,
  TutorPersonaConfig,
  TutorAnalysis,
  analyzeUserSpanishInput,
  streamTutorMessage
} from '../services/aiTutorService';

interface AITutorChatProps {
  userProgress: UserProgress;
  setUserProgress: React.Dispatch<React.SetStateAction<UserProgress>>;
}

interface SelectedWordInfo {
  word: string;
  cleanWord: string;
  en: string;
  ar: string;
  x: number;
  y: number;
}

export const AITutorChat: React.FC<AITutorChatProps> = ({
  userProgress,
  setUserProgress
}) => {
  const { grammarPracticeTopic } = useApp();
  const isArabic = userProgress.settings?.nativeLanguage === 'ar';

  // Selected persona & scenario
  const [selectedPersona, setSelectedPersona] = useState<TutorPersona>('juan');
  const [currentScenario, setCurrentScenario] = useState<ScenarioDefinition>(LINGOPAL_SCENARIOS[0]);

  // Messages & conversation turn tracking
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputVal, setInputVal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [currentlyPlayingId, setCurrentlyPlayingId] = useState<string | null>(null);

  // Audio settings: 0.8x, 1.0x, 1.2x
  const [audioSpeed, setAudioSpeed] = useState<0.8 | 1.0 | 1.2>(1.0);
  const [autoPlayAudio, setAutoPlayAudio] = useState(true);

  // Task-based mission objectives completion state
  const [completedObjectives, setCompletedObjectives] = useState<Record<string, boolean>>({});
  const [missionCelebrated, setMissionCelebrated] = useState(false);

  // Gamification session stats
  const [sessionTurnCount, setSessionTurnCount] = useState(0);
  const [sessionXpEarned, setSessionXpEarned] = useState(0);
  const [revealedTranslations, setRevealedTranslations] = useState<Record<string, boolean>>({});
  const [revealedAnalyses, setRevealedAnalyses] = useState<Record<string, boolean>>({});

  // Dynamic suggested quick replies
  const [suggestedReplies, setSuggestedReplies] = useState<{ es: string; en: string }[]>([]);

  // Interactive Tap-to-Translate popover state
  const [selectedWord, setSelectedWord] = useState<SelectedWordInfo | null>(null);
  const [savedWordToast, setSavedWordToast] = useState<string | null>(null);
  const [missionToast, setMissionToast] = useState<string | null>(null);

  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Active persona configuration
  const activePersonaObj = useMemo(() => {
    return TUTOR_PERSONAS.find(p => p.id === selectedPersona) || TUTOR_PERSONAS[0];
  }, [selectedPersona]);

  // Gamification Level calculations
  const userXp = userProgress.xp || 0;
  const currentLevel = Math.floor(userXp / 250) + 1;
  const currentLevelProgress = userXp % 250;
  const progressPercent = Math.min(100, Math.round((currentLevelProgress / 250) * 100));

  const rankTitle = useMemo(() => {
    if (currentLevel >= 6) return 'Maestro del Diálogo 👑';
    if (currentLevel >= 4) return 'Políglota Ágil 💎';
    if (currentLevel >= 3) return 'Conversador Fluido 🥇';
    if (currentLevel >= 2) return 'Aventurero Activo 🥈';
    return 'Novato Curioso 🥉';
  }, [currentLevel]);

  // Audio speech handling with duration tracker & stop capability
  const handleSpeak = (msgId: string, text: string, personaOverride?: TutorPersona) => {
    cancelSpanishSpeech();
    setCurrentlyPlayingId(msgId);
    const personaToUse = personaOverride || selectedPersona;
    speakSpanishPersona(text, personaToUse, audioSpeed);

    const estimatedDuration = Math.max(1800, (text.length * 65) / audioSpeed);
    setTimeout(() => {
      setCurrentlyPlayingId(prev => (prev === msgId ? null : prev));
    }, estimatedDuration);
  };

  const handleStopSpeak = () => {
    cancelSpanishSpeech();
    setCurrentlyPlayingId(null);
  };

  // Toggle reveal translation
  const toggleTranslation = (id: string) => {
    soundEffects.playPop();
    setRevealedTranslations(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Toggle recast / analysis pill
  const toggleAnalysis = (id: string) => {
    soundEffects.playPop();
    setRevealedAnalyses(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Initialize or reset scenario conversation
  const initScenario = (scenario: ScenarioDefinition, persona: TutorPersona) => {
    cancelSpanishSpeech();
    const personaKey = (persona in scenario.initialPrompt ? persona : 'juan') as TutorPersona;
    const promptData = scenario.initialPrompt[personaKey] || scenario.initialPrompt.juan;

    const initialMsg: ChatMessage = {
      id: `init-${Date.now()}`,
      sender: 'ai',
      spanishText: promptData.es,
      englishExplanation: promptData.en,
      arabicExplanation: promptData.ar,
      phase: scenario.isTaskMission ? 'Misión Iniciada' : 'Charla Activa',
      followUpQuestions: scenario.suggestedReplies.map(r => `${r.es} (${r.en})`)
    };

    setMessages([initialMsg]);
    setSuggestedReplies(scenario.suggestedReplies);
    setSessionTurnCount(0);
    setCompletedObjectives({});
    setMissionCelebrated(false);

    if (autoPlayAudio) {
      handleSpeak(initialMsg.id, promptData.es, personaKey);
    }
  };

  // Initialize on mount
  useEffect(() => {
    initScenario(currentScenario, selectedPersona);
  }, []);

  // When active grammar practice topic changes from outside
  useEffect(() => {
    if (grammarPracticeTopic) {
      const topicMsg: ChatMessage = {
        id: `topic-${Date.now()}`,
        sender: 'ai',
        spanishText: `¡Hola! Vamos a practicar la regla: "${grammarPracticeTopic.title_es}". Fórmula clave: ${grammarPracticeTopic.formula || 'Práctica activa'}. ¿Listo para tu primera oración?`,
        englishExplanation: `Hi! Let's practice the rule: "${grammarPracticeTopic.title_es}". Memory Anchor: ${grammarPracticeTopic.formula || 'Active practice'}. Ready for your first sentence?`,
        arabicExplanation: `مرحباً! لنتدرب على قاعدة: "${grammarPracticeTopic.title_es}". صيغة الذاكرة: ${grammarPracticeTopic.formula || 'تدريب نشط'}. هل أنت مستعد لجملتك الأولى؟`,
        followUpQuestions: [
          `Dame un ejemplo de ${grammarPracticeTopic.title_es}. (Give me an example.)`,
          `Quiero traducir una oración de práctica. (I want to translate a practice sentence.)`,
          `Explícame la regla paso a paso. (Explain the rule step by step.)`
        ]
      };
      setMessages([topicMsg]);
      setSuggestedReplies([
        { es: `Dame un reto con ${grammarPracticeTopic.title_es}.`, en: 'Give me a challenge with this rule.' },
        { es: `¿Cómo se usa ${grammarPracticeTopic.title_es} en la vida real?`, en: 'How is this used in real life?' }
      ]);
    }
  }, [grammarPracticeTopic]);

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isStreaming]);

  // Check task mission objectives
  const checkMissionObjectives = (text: string) => {
    if (!currentScenario.objectives || currentScenario.objectives.length === 0) return;

    let newlyCompleted = 0;
    const updated = { ...completedObjectives };

    currentScenario.objectives.forEach(obj => {
      if (!updated[obj.id] && obj.completedPattern && obj.completedPattern.test(text)) {
        updated[obj.id] = true;
        newlyCompleted += 1;
      }
    });

    if (newlyCompleted > 0) {
      setCompletedObjectives(updated);
      soundEffects.playPop();

      // Check if all objectives are now completed
      const allDone = currentScenario.objectives.every(obj => updated[obj.id]);
      if (allDone && !missionCelebrated) {
        setMissionCelebrated(true);
        soundEffects.playLevelUp();
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
        setMissionToast('🎉 ¡Objetivos de la misión completados con éxito! +40 XP');
        setUserProgress(prev => ({ ...prev, xp: prev.xp + 40 }));
        setTimeout(() => setMissionToast(null), 4500);
      }
    }
  };

  // Save vocabulary to LingQs and UserProgress
  const handleSaveWordToLingQ = (word: string, en: string, ar: string) => {
    soundEffects.playLevelUp();
    const clean = word.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"'¡¿]/g, '').trim();

    setUserProgress(prev => {
      const existingLingQs = prev.lingqs || {};
      const newLingQs = {
        ...existingLingQs,
        [clean]: {
          word: clean,
          status: 1 as const,
          translation_en: en || clean,
          translation_ar: ar || '',
          sentenceContext: currentScenario.title_es,
          createdAt: new Date().toISOString()
        }
      };
      const savedWordIds = prev.savedWordIds.includes(clean)
        ? prev.savedWordIds
        : [...prev.savedWordIds, clean];

      return {
        ...prev,
        lingqs: newLingQs,
        savedWordIds,
        xp: prev.xp + 5
      };
    });

    setSavedWordToast(clean);
    setTimeout(() => setSavedWordToast(null), 2500);
    setSelectedWord(null);
  };

  // Interactive word click popover
  const handleWordClick = (e: React.MouseEvent, word: string) => {
    e.stopPropagation();
    const clean = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"'¡¿]/g, '').trim();
    if (!clean || clean.length < 2) return;

    soundEffects.playPop();

    const knownVocab: Record<string, { en: string; ar: string }> = {
      hola: { en: 'hello / hi', ar: 'مرحباً' },
      mango: { en: 'mango', ar: 'مانجو' },
      kilo: { en: 'kilogram', ar: 'كيلوغرام' },
      fruta: { en: 'fruit', ar: 'فاكهة' },
      dulce: { en: 'sweet', ar: 'حلو' },
      toalla: { en: 'towel', ar: 'منشفة' },
      habitación: { en: 'room', ar: 'غرفة' },
      hotel: { en: 'hotel', ar: 'فندق' },
      planta: { en: 'floor / story', ar: 'طابق' },
      trabajo: { en: 'work / job', ar: 'عمل / وظيفة' },
      equipo: { en: 'team', ar: 'فريق' },
      experiencia: { en: 'experience', ar: 'خبرة' },
      café: { en: 'coffee', ar: 'قهوة' },
      gracias: { en: 'thank you', ar: 'شكراً' }
    };

    const translation = knownVocab[clean.toLowerCase()] || {
      en: `word: "${clean}"`,
      ar: `الكلمة: "${clean}"`
    };

    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setSelectedWord({
      word,
      cleanWord: clean,
      en: translation.en,
      ar: translation.ar,
      x: rect.left + rect.width / 2,
      y: rect.top - 8
    });
  };

  // Close word popover on outside click
  useEffect(() => {
    const handleDocClick = () => setSelectedWord(null);
    window.addEventListener('click', handleDocClick);
    return () => window.removeEventListener('click', handleDocClick);
  }, []);

  // Web Speech API Voice Recognition with visual waveform state
  const handleToggleMic = () => {
    if (typeof window === 'undefined') return;
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Tu navegador no soporta entrada de voz. Puedes escribir tu respuesta en español.');
      return;
    }

    if (isListening) {
      if (recognitionRef.current) recognitionRef.current.stop();
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang =
        selectedPersona === 'juan'
          ? 'es-MX'
          : selectedPersona === 'elena'
          ? 'es-CO'
          : 'es-ES';
      recognition.continuous = false;
      recognition.interimResults = true;

      recognition.onstart = () => {
        setIsListening(true);
        soundEffects.playPop();
      };

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join('');
        setInputVal(transcript);
      };

      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);

      recognitionRef.current = recognition;
      recognition.start();
    } catch (e) {
      console.warn('Speech recognition error:', e);
      setIsListening(false);
    }
  };

  // Send message using Streaming Engine with Formative Recasting
  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputVal).trim();
    if (!text || isLoading || isStreaming) return;

    soundEffects.playPop();

    const userMsgId = `u-${Date.now()}`;
    const userMsg: ChatMessage = {
      id: userMsgId,
      sender: 'user',
      spanishText: text
    };

    setMessages(prev => [...prev, userMsg]);
    setInputVal('');
    setIsLoading(true);

    const newTurnCount = sessionTurnCount + 1;
    setSessionTurnCount(newTurnCount);

    // Check task mission objectives from user input
    checkMissionObjectives(text);

    // Award base conversational XP
    const baseEarnedXp = 15;
    setSessionXpEarned(prev => prev + baseEarnedXp);
    setUserProgress(prev => ({ ...prev, xp: prev.xp + baseEarnedXp }));

    // Prepare streaming AI placeholder
    const aiMsgId = `ai-${Date.now()}`;
    const streamingAiMsg: ChatMessage = {
      id: aiMsgId,
      sender: 'ai',
      spanishText: '',
      phase: `${activePersonaObj.name} respondiendo...`
    };

    setMessages(prev => [...prev, streamingAiMsg]);
    setIsStreaming(true);

    try {
      const history = messages.slice(-6).map(m => ({
        role: m.sender === 'user' ? ('user' as const) : ('model' as const),
        text: m.spanishText
      }));

      const response = await streamTutorMessage({
        message: text,
        history,
        userProgress,
        persona: selectedPersona,
        scenarioId: currentScenario.id,
        practiceTopic: grammarPracticeTopic,
        onChunk: partialText => {
          setMessages(prev =>
            prev.map(m => (m.id === aiMsgId ? { ...m, spanishText: partialText } : m))
          );
        }
      });

      // Also check mission objectives from AI response
      if (response.spanishResponse) {
        checkMissionObjectives(response.spanishResponse);
      }

      // Update AI message with final payload, linguistic analysis, and vocabulary
      setMessages(prev =>
        prev.map(m =>
          m.id === aiMsgId
            ? {
                ...m,
                spanishText: response.spanishResponse,
                englishExplanation: response.englishExplanation,
                arabicExplanation: response.arabicExplanation,
                phase: response.phase || 'Conversación Activa',
                analysis: response.analysis || undefined,
                corrections: response.corrections,
                vocabulary: response.vocabulary,
                followUpQuestions: response.followUpQuestions
              }
            : m
        )
      );

      // Update suggested replies
      if (response.followUpQuestions && response.followUpQuestions.length > 0) {
        const parsedChips = response.followUpQuestions.map(q => {
          const match = q.match(/^(.*?)\s*\((.*?)\)$/);
          return match ? { es: match[1].trim(), en: match[2].trim() } : { es: q, en: '' };
        });
        setSuggestedReplies(parsedChips);
      }

      // Auto-play audio if enabled
      if (autoPlayAudio && response.spanishResponse) {
        handleSpeak(aiMsgId, response.spanishResponse, selectedPersona);
      }
    } catch (err) {
      console.warn('Error in tutor interaction:', err);
    } finally {
      setIsLoading(false);
      setIsStreaming(false);
    }
  };

  const handleSelectPersona = (personaId: TutorPersona) => {
    soundEffects.playPop();
    setSelectedPersona(personaId);
    initScenario(currentScenario, personaId);
  };

  const handleSelectScenario = (scenario: ScenarioDefinition) => {
    soundEffects.playPop();
    setCurrentScenario(scenario);
    initScenario(scenario, selectedPersona);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-5 px-3 sm:px-6 pb-20">
      {/* 🧭 STUDIO EDITORIAL HEADER & METRICS */}
      <div className="p-5 rounded-2xl bg-white dark:bg-[#181615] border border-stone-200/80 dark:border-stone-800/80 shadow-xs space-y-4">
        {/* Top Bar: Title, Streak & Audio Toolbar */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="space-y-0.5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#C85A32]/10 text-[#C85A32] dark:text-[#E07A5F] text-xs font-semibold border border-[#C85A32]/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Estudio de Inmersión Conversacional</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-stone-900 dark:text-stone-100 tracking-tight font-header">
              Simulador de Diálogo Nativo
            </h1>
          </div>

          {/* Right Toolbar: Streak, Audio Speed, Auto-Play, Reset */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Streak Counter */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#C85A32]/10 border border-[#C85A32]/25 text-[#C85A32] dark:text-[#E07A5F] text-xs font-bold">
              <Flame className="w-4 h-4 fill-current" />
              <span>{userProgress.streakDays || 1} días en racha</span>
            </div>

            {/* Speech Rate Selector: 0.8x, 1.0x, 1.2x */}
            <div className="flex items-center bg-stone-100 dark:bg-stone-800 rounded-xl p-0.5 border border-stone-200/80 dark:border-stone-700/80">
              {([0.8, 1.0, 1.2] as const).map(speed => (
                <button
                  key={speed}
                  type="button"
                  onClick={() => {
                    soundEffects.playPop();
                    setAudioSpeed(speed);
                  }}
                  className={`px-2 py-1 text-xs font-bold rounded-lg transition cursor-pointer ${
                    audioSpeed === speed
                      ? 'bg-white dark:bg-stone-900 text-[#C85A32] dark:text-[#E07A5F] shadow-xs'
                      : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
                  }`}
                  title={`Velocidad de reproducción ${speed}x`}
                >
                  {speed}x
                </button>
              ))}
            </div>

            {/* Auto-Play Toggle */}
            <button
              type="button"
              onClick={() => {
                soundEffects.playPop();
                setAutoPlayAudio(prev => !prev);
              }}
              className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                autoPlayAudio
                  ? 'border-[#2D5A43]/30 bg-[#2D5A43]/10 text-[#2D5A43] dark:text-emerald-400'
                  : 'border-stone-200 dark:border-stone-700 text-stone-400 dark:text-stone-500'
              }`}
              title={autoPlayAudio ? 'Voz automática activada' : 'Voz automática desactivada'}
            >
              {autoPlayAudio ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              <span className="hidden sm:inline">{autoPlayAudio ? 'Audio ON' : 'Audio OFF'}</span>
            </button>

            {/* Stop Voice If Playing */}
            {currentlyPlayingId && (
              <button
                type="button"
                onClick={handleStopSpeak}
                className="p-2 rounded-xl bg-rose-500 text-white text-xs font-bold transition hover:bg-rose-600 cursor-pointer flex items-center gap-1"
                title="Detener audio"
              >
                <Square className="w-3.5 h-3.5 fill-current" />
                <span className="hidden sm:inline">Pausar</span>
              </button>
            )}

            {/* Reset Scenario */}
            <button
              type="button"
              onClick={() => initScenario(currentScenario, selectedPersona)}
              className="p-2 rounded-xl border border-stone-200/80 dark:border-stone-700/80 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 transition cursor-pointer"
              title="Reiniciar diálogo"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 🎭 NATIVE PERSONAS & REGIONAL DIALECT PROFILES */}
        <div className="pt-3 border-t border-stone-100 dark:border-stone-800/80">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
              Perfiles Nativos & Dialectos Regionales
            </span>
            <span className="text-xs font-bold text-[#C85A32] dark:text-[#E07A5F]">
              {activePersonaObj.name} ({activePersonaObj.city}, {activePersonaObj.country})
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {TUTOR_PERSONAS.map(persona => {
              const isSelected = persona.id === selectedPersona;
              return (
                <div
                  key={persona.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => handleSelectPersona(persona.id)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleSelectPersona(persona.id);
                    }
                  }}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 select-none ${
                    isSelected
                      ? `${persona.accentBgLight} ${persona.accentBorder} ring-2 ring-[#C85A32]/40 shadow-xs`
                      : 'bg-stone-50/60 dark:bg-stone-800/40 border-stone-200/80 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-9 h-9 rounded-xl bg-gradient-to-br ${persona.avatarBg} text-white flex items-center justify-center font-bold text-base shadow-xs shrink-0`}
                    >
                      {persona.avatar}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1">
                        <span className="font-bold text-xs text-stone-900 dark:text-stone-100 truncate">
                          {persona.name}
                        </span>
                        <span className="text-xs shrink-0">{persona.flag}</span>
                      </div>
                      <span className="text-[10px] text-stone-500 dark:text-stone-400 block truncate">
                        {persona.city}
                      </span>
                    </div>
                  </div>

                  {/* Colloquialism Tags */}
                  <div className="pt-1.5 border-t border-stone-200/60 dark:border-stone-800 flex items-center justify-between text-[10px]">
                    <span className="font-mono text-stone-500 dark:text-stone-400 truncate">
                      {persona.colloquialisms[0]}
                    </span>
                    <button
                      type="button"
                      onClick={e => {
                        e.stopPropagation();
                        handleSpeak(`sample-${persona.id}`, persona.sampleGreeting, persona.id);
                      }}
                      className="p-1 rounded-md bg-stone-200/70 dark:bg-stone-700/70 text-stone-700 dark:text-stone-300 hover:bg-[#C85A32] hover:text-white transition cursor-pointer"
                      title="Probar voz del tutor"
                    >
                      <Play className="w-2.5 h-2.5 fill-current" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 🎯 TASK-BASED SCENARIOS & ROLEPLAY MISSIONS */}
        <div className="pt-3 border-t border-stone-100 dark:border-stone-800/80 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-[#C85A32]" />
              <span>Misiones de Rol & Tareas Prácticas</span>
            </span>
            <span className="text-xs font-mono text-stone-500">
              Turno {sessionTurnCount} • +{sessionXpEarned} XP
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-2">
            {LINGOPAL_SCENARIOS.map(scenario => {
              const isSelected = scenario.id === currentScenario.id;
              return (
                <button
                  key={scenario.id}
                  type="button"
                  onClick={() => handleSelectScenario(scenario)}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-950 border-transparent shadow-xs'
                      : 'bg-stone-50/80 dark:bg-stone-800/40 border-stone-200/80 dark:border-stone-800 text-stone-800 dark:text-stone-200 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-base">{scenario.icon}</span>
                    <span
                      className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${
                        isSelected
                          ? 'bg-white/20 text-white dark:text-stone-950'
                          : 'bg-stone-200/80 dark:bg-stone-700/80 text-stone-600 dark:text-stone-300'
                      }`}
                    >
                      {scenario.difficulty}
                    </span>
                  </div>
                  <p className="text-xs font-bold leading-tight line-clamp-1">{scenario.title_es}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* 📋 ACTIVE MISSION CAN-DO OBJECTIVES CARD */}
        {currentScenario.isTaskMission && currentScenario.objectives && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-3.5 rounded-xl bg-[#2D5A43]/8 dark:bg-[#2D5A43]/15 border border-[#2D5A43]/25 space-y-2.5"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-[#2D5A43] dark:text-emerald-400 shrink-0" />
                <span className="text-xs font-bold text-[#2D5A43] dark:text-emerald-300">
                  {currentScenario.title_es}: {isArabic && currentScenario.missionGoal_ar ? currentScenario.missionGoal_ar : currentScenario.missionGoal_es}
                </span>
              </div>
              <span className="text-[11px] font-mono font-bold text-[#2D5A43] dark:text-emerald-400">
                {Object.values(completedObjectives).filter(Boolean).length} / {currentScenario.objectives.length} Objetivos
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {currentScenario.objectives.map((obj, idx) => {
                const isDone = !!completedObjectives[obj.id];
                return (
                  <div
                    key={obj.id}
                    className={`p-2 rounded-lg border text-xs flex items-center gap-2 transition ${
                      isDone
                        ? 'bg-emerald-100/70 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                        : 'bg-white/80 dark:bg-[#181615] border-stone-200/80 dark:border-stone-800 text-stone-700 dark:text-stone-300'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold ${
                        isDone ? 'bg-emerald-600 text-white' : 'bg-stone-200 dark:bg-stone-700 text-stone-600'
                      }`}
                    >
                      {isDone ? <Check className="w-3 h-3 stroke-[3]" /> : idx + 1}
                    </div>
                    <span className="text-[11px] font-medium leading-tight line-clamp-2">
                      {isArabic ? obj.label_ar : obj.label_es}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>

      {/* 🔔 FLOATING TOASTS */}
      <AnimatePresence>
        {missionToast && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-3 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow-md flex items-center gap-2 justify-center"
          >
            <span>{missionToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 💬 CHAT CONTAINER */}
      <div
        ref={messagesContainerRef}
        className="bg-[#FBF9F5] dark:bg-[#121110] border border-stone-200/80 dark:border-stone-800/80 rounded-2xl p-4 sm:p-6 min-h-[440px] max-h-[580px] overflow-y-auto space-y-4 shadow-xs relative"
      >
        <AnimatePresence initial={false}>
          {messages.map(msg => {
            const isAI = msg.sender === 'ai';
            const isPlaying = currentlyPlayingId === msg.id;
            const isTranslationOpen = revealedTranslations[msg.id];
            const isAnalysisOpen = revealedAnalyses[msg.id];
            const isCurrentlyStreaming = isStreaming && isAI && !msg.englishExplanation;

            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className={`flex gap-3 ${isAI ? 'justify-start' : 'justify-end'}`}
              >
                {/* AI Persona Avatar */}
                {isAI && (
                  <div className="relative shrink-0 self-end">
                    <div
                      className={`w-9 h-9 rounded-xl bg-gradient-to-br ${activePersonaObj.avatarBg} text-white flex items-center justify-center text-sm font-bold shadow-2xs`}
                    >
                      {activePersonaObj.name[0]}
                    </div>
                    <span className="absolute -bottom-1 -right-1 text-xs">
                      {activePersonaObj.flag}
                    </span>
                  </div>
                )}

                {/* Message Bubble */}
                <div
                  className={`max-w-[88%] sm:max-w-[80%] space-y-2 ${
                    isAI ? 'items-start' : 'items-end'
                  }`}
                >
                  <div
                    className={`p-4 rounded-2xl text-sm leading-relaxed shadow-xs relative ${
                      isAI
                        ? 'bg-white dark:bg-[#181615] border border-stone-200/80 dark:border-stone-800/80 text-stone-900 dark:text-stone-100 rounded-bl-xs'
                        : 'bg-[#C85A32] text-white font-medium rounded-br-xs shadow-2xs'
                    }`}
                  >
                    {/* Header bar inside AI bubble: speaker and phase */}
                    {isAI && (
                      <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-stone-100 dark:border-stone-800/60">
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleSpeak(msg.id, msg.spanishText, selectedPersona)}
                            className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition cursor-pointer ${
                              isPlaying
                                ? 'bg-[#C85A32] text-white animate-pulse'
                                : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200'
                            }`}
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                            <span>{isPlaying ? 'Reproduciendo...' : 'Escuchar'}</span>
                          </button>
                          <span className="text-[11px] text-stone-500 font-medium">
                            {activePersonaObj.name} • {audioSpeed}x
                          </span>
                        </div>

                        {msg.phase && (
                          <span className="text-[10px] font-mono text-stone-500 dark:text-stone-400 px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800">
                            {msg.phase}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Spanish Text with Tap-to-Translate Tokens */}
                    <div className="font-semibold text-base select-text">
                      {msg.spanishText ? (
                        msg.spanishText.split(' ').map((word, wIdx) => (
                          <span
                            key={wIdx}
                            onClick={e => isAI && handleWordClick(e, word)}
                            className={
                              isAI
                                ? 'hover:text-[#C85A32] hover:underline decoration-[#C85A32]/40 cursor-pointer transition inline-block mr-1'
                                : 'inline-block mr-1'
                            }
                          >
                            {word}
                          </span>
                        ))
                      ) : isCurrentlyStreaming ? (
                        <span className="inline-flex items-center gap-2 text-stone-400 font-normal italic">
                          <Loader2 className="w-4 h-4 animate-spin text-[#C85A32]" />
                          <span>{activePersonaObj.name} está respondiendo...</span>
                        </span>
                      ) : null}

                      {isCurrentlyStreaming && (
                        <span className="inline-block w-2 h-4 ml-1 bg-[#C85A32] animate-pulse align-middle" />
                      )}
                    </div>

                    {/* Collapsible Translations (English & Arabic) */}
                    {isAI && (msg.englishExplanation || msg.arabicExplanation) && (
                      <div className="mt-2 pt-1.5 border-t border-stone-100 dark:border-stone-800">
                        <button
                          type="button"
                          onClick={() => toggleTranslation(msg.id)}
                          className="text-[11px] font-semibold text-[#B47832] dark:text-amber-400 flex items-center gap-1 hover:underline cursor-pointer"
                        >
                          <Languages className="w-3.5 h-3.5" />
                          <span>{isTranslationOpen ? 'Ocultar traducciones' : 'Ver traducción pedagógica (EN / AR)'}</span>
                          {isTranslationOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                        </button>

                        {isTranslationOpen && (
                          <div className="mt-2 space-y-1 text-xs text-stone-600 dark:text-stone-300 bg-stone-50 dark:bg-stone-900/60 p-2.5 rounded-xl border border-stone-200/60 dark:border-stone-800">
                            {msg.englishExplanation && (
                              <p>
                                <span className="font-bold text-stone-800 dark:text-stone-200">EN: </span>
                                {msg.englishExplanation}
                              </p>
                            )}
                            {msg.arabicExplanation && (
                              <p className="font-arabic text-stone-700 dark:text-stone-300" dir="rtl">
                                <span className="font-bold text-stone-800 dark:text-stone-200">AR: </span>
                                {msg.arabicExplanation}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    )}

                    {/* 💡 FORMATIVE RECAST PILL & NON-DISRUPTIVE SLA FEEDBACK */}
                    {isAI && msg.analysis && (msg.analysis.naturalAlternative || (msg.analysis.corrections && msg.analysis.corrections.length > 0)) && (
                      <div className="mt-2.5 pt-2 border-t border-stone-100 dark:border-stone-800/80">
                        <button
                          type="button"
                          onClick={() => toggleAnalysis(msg.id)}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#B47832]/10 dark:bg-[#B47832]/15 text-[#B47832] dark:text-amber-400 border border-[#B47832]/25 hover:bg-[#B47832]/20 transition cursor-pointer"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>💡 Consejo nativo</span>
                          {msg.analysis.naturalAlternative && !isAnalysisOpen && (
                            <span className="hidden sm:inline font-normal text-stone-600 dark:text-stone-400 text-[11px] max-w-[200px] truncate">
                              • "{msg.analysis.naturalAlternative}"
                            </span>
                          )}
                          {isAnalysisOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                        </button>

                        <AnimatePresence>
                          {isAnalysisOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-2 space-y-2 text-xs bg-stone-50/80 dark:bg-stone-900/60 p-3 rounded-xl border border-stone-200/80 dark:border-stone-800"
                            >
                              {/* Natural Recast Alternative */}
                              {msg.analysis.naturalAlternative && (
                                <div className="flex items-start gap-2 p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-stone-800 dark:text-stone-200">
                                  <span className="font-bold text-[#B47832] dark:text-amber-400 shrink-0">
                                    🗣️ Expresión nativa:
                                  </span>
                                  <span className="italic font-medium">
                                    "{msg.analysis.naturalAlternative}"
                                  </span>
                                </div>
                              )}

                              {/* Formative Recast Note */}
                              {msg.analysis.feedback_es && (
                                <p className="text-stone-700 dark:text-stone-300 leading-relaxed font-sans text-[11px]">
                                  {msg.analysis.feedback_es}
                                </p>
                              )}

                              {/* English or Arabic Explanation depending on user language */}
                              {isArabic && msg.analysis.feedback_ar ? (
                                <p className="text-[11px] text-stone-600 dark:text-stone-400 font-arabic leading-relaxed" dir="rtl">
                                  <span className="font-bold text-stone-700 dark:text-stone-300">ملاحظة لغوية: </span>
                                  {msg.analysis.feedback_ar}
                                </p>
                              ) : msg.analysis.feedback_en ? (
                                <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed">
                                  <span className="font-bold text-stone-700 dark:text-stone-300">Language note: </span>
                                  {msg.analysis.feedback_en}
                                </p>
                              ) : null}

                              {/* Soft adjustments breakdown if present */}
                              {msg.analysis.corrections && msg.analysis.corrections.length > 0 && (
                                <div className="space-y-1 pt-1">
                                  {msg.analysis.corrections.map((c, cIdx) => (
                                    <div
                                      key={cIdx}
                                      className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex items-center justify-between text-[11px] flex-wrap gap-1"
                                    >
                                      <div className="flex items-center gap-1.5">
                                        <span className="text-stone-500 line-through">{c.original}</span>
                                        <span className="text-stone-400">➔</span>
                                        <span className="font-bold text-emerald-600 dark:text-emerald-400">{c.correction}</span>
                                      </div>
                                      {c.explanation && (
                                        <span className="text-stone-500 dark:text-stone-400 text-[10px]">
                                          {c.explanation}
                                        </span>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              )}

                              {/* Regional/Dialect note */}
                              {msg.analysis.dialectTip && (
                                <div className="text-[11px] text-stone-500 dark:text-stone-400 flex items-start gap-1 pt-1 border-t border-stone-200/50 dark:border-stone-800">
                                  <span className="font-semibold text-stone-700 dark:text-stone-300">
                                    {activePersonaObj.flag} {activePersonaObj.name}:
                                  </span>
                                  <span>{msg.analysis.dialectTip}</span>
                                </div>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}
                  </div>

                  {/* Key Vocabulary Chips */}
                  {isAI && msg.vocabulary && msg.vocabulary.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-0.5">
                      {msg.vocabulary.map((vocab, vIdx) => (
                        <button
                          key={vIdx}
                          type="button"
                          onClick={() => handleSaveWordToLingQ(vocab.word, vocab.en, vocab.ar)}
                          className="px-2.5 py-1 rounded-lg bg-white dark:bg-[#181615] border border-stone-200/80 dark:border-stone-800 text-stone-700 dark:text-stone-300 text-xs font-semibold cursor-pointer shadow-2xs hover:border-[#C85A32] flex items-center gap-1.5 group"
                          title={`Guardar "${vocab.word}" en tu vocabulario SRS`}
                        >
                          <span className="font-bold text-[#C85A32] dark:text-[#E07A5F]">
                            {vocab.word}
                          </span>
                          <span className="text-stone-400 text-[10px]">({vocab.en})</span>
                          <Plus className="w-3 h-3 text-stone-400 group-hover:text-[#C85A32]" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* 💡 SUGGESTED REPLIES */}
      {suggestedReplies.length > 0 && !isLoading && !isStreaming && (
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
            <Sparkles className="w-3.5 h-3.5 text-[#B47832]" />
            <span>Respuestas sugeridas para la misión:</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {suggestedReplies.map((reply, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(reply.es)}
                className="text-left p-2.5 rounded-xl bg-white dark:bg-[#181615] border border-stone-200/80 dark:border-stone-800 hover:border-[#C85A32] dark:hover:border-[#E07A5F] transition group cursor-pointer shadow-2xs space-y-0.5"
              >
                <p className="text-xs font-bold text-stone-800 dark:text-stone-200 group-hover:text-[#C85A32] dark:group-hover:text-[#E07A5F] leading-snug">
                  {reply.es}
                </p>
                {reply.en && (
                  <p className="text-[11px] text-stone-400 dark:text-stone-500 line-clamp-1">
                    {reply.en}
                  </p>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 🎙️ INPUT BAR WITH VISUAL WAVEFORM STATE - STICKY ABOVE SOFT KEYBOARD & SAFE-AREA */}
      <div className="sticky bottom-0 z-30 pb-safe pt-2 bg-stone-100/90 dark:bg-stone-950/90 backdrop-blur-md space-y-2">
        {/* Animated Speech Waveform when Listening */}
        {isListening && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 px-3.5 py-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-xs font-semibold text-rose-700 dark:text-rose-300"
          >
            <div className="flex items-center gap-1 h-4">
              {[40, 95, 60, 100, 75, 45, 85].map((h, i) => (
                <motion.span
                  key={i}
                  animate={{ height: [`${h * 0.3}%`, `${h}%`, `${h * 0.25}%`] }}
                  transition={{ repeat: Infinity, duration: 0.5 + i * 0.08, ease: 'easeInOut' }}
                  className="w-1 bg-rose-500 dark:bg-rose-400 rounded-full inline-block"
                />
              ))}
            </div>
            <span>Micrófono activo • Escuchando tu español en vivo...</span>
          </motion.div>
        )}

        <div className="relative bg-white dark:bg-[#181615] border border-stone-200/80 dark:border-stone-800 rounded-2xl p-2 shadow-sm flex items-center gap-2">
          {/* Voice recording button */}
          <button
            type="button"
            onClick={handleToggleMic}
            className={`min-w-[44px] min-h-[44px] p-3 rounded-xl transition cursor-pointer flex items-center justify-center ${
              isListening
                ? 'bg-rose-500 text-white animate-pulse shadow-xs ring-2 ring-rose-300 dark:ring-rose-900'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
            }`}
            title={isListening ? 'Detener micrófono' : 'Hablar en español con el micrófono'}
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          {/* Text Input */}
          <input
            type="text"
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') handleSendMessage();
            }}
            placeholder={
              isListening
                ? 'Escuchando tu voz...'
                : `Responde a ${activePersonaObj.name} en español...`
            }
            className="flex-1 bg-transparent px-2 py-2 text-sm text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-hidden font-medium min-h-[44px]"
          />

          {/* Send Button */}
          <button
            type="button"
            onClick={() => handleSendMessage()}
            disabled={!inputVal.trim() || isLoading || isStreaming}
            className="min-w-[44px] min-h-[44px] p-3 bg-[#C85A32] hover:bg-[#B44C27] disabled:opacity-30 disabled:cursor-not-allowed text-white rounded-xl font-bold transition shadow-xs cursor-pointer flex items-center justify-center"
            title="Enviar mensaje"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 📖 TAP-TO-TRANSLATE POPOVER */}
      {selectedWord && (
        <div
          style={{
            position: 'fixed',
            left: `${Math.min(window.innerWidth - 220, Math.max(16, selectedWord.x - 100))}px`,
            top: `${selectedWord.y - 100}px`,
            zIndex: 100
          }}
          onClick={e => e.stopPropagation()}
          className="bg-white dark:bg-[#181615] border border-stone-200 dark:border-stone-800 rounded-xl p-3 shadow-md w-56 space-y-2 animate-in fade-in zoom-in-95 duration-150"
        >
          <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-1.5">
            <span className="font-bold text-xs text-[#C85A32] dark:text-[#E07A5F]">
              {selectedWord.cleanWord}
            </span>
            <button
              type="button"
              onClick={() => setSelectedWord(null)}
              className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-[11px] text-stone-600 dark:text-stone-300 font-medium">
            {selectedWord.en}
          </p>
          {isArabic && (
            <p className="text-[11px] text-stone-600 dark:text-stone-300 font-arabic" dir="rtl">
              {selectedWord.ar}
            </p>
          )}
          <button
            type="button"
            onClick={() => handleSaveWordToLingQ(selectedWord.cleanWord, selectedWord.en, selectedWord.ar)}
            className="w-full py-1.5 px-2 bg-[#C85A32] hover:bg-[#B44C27] text-white text-[11px] font-bold rounded-lg transition flex items-center justify-center gap-1 cursor-pointer"
          >
            <BookmarkPlus className="w-3 h-3" />
            <span>Guardar en SRS</span>
          </button>
        </div>
      )}

      {/* SAVED WORD TOAST */}
      <AnimatePresence>
        {savedWordToast && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed bottom-6 right-6 z-50 px-3.5 py-2 rounded-xl bg-stone-900 text-white text-xs font-bold shadow-lg flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>"{savedWordToast}" guardado en tu memoria activa</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AITutorChat;
