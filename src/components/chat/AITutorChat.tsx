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
  BookmarkPlus,
  HelpCircle,
  RefreshCw,
  Search,
  MessageCircle,
  ShieldCheck,
  Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { UserProgress, TutorPersona, CEFRLevel } from '../../types';
import { speakSpanishPersona, cancelSpanishSpeech, soundEffects } from '../../utils/audio';
import { useApp } from '../../context/AppContext';
import {
  TUTOR_PERSONAS,
  TutorPersonaConfig,
  TutorAnalysis,
  LINGOPAL_SCENARIOS,
  ScenarioDefinition,
  streamTutorMessage
} from '../../services/aiTutorService';
import {
  ConversationalRepair,
  ConversationalRepairType,
  BilingualTranslationChip,
  ComprehensionCheckItem,
  NegotiationDialogueMetrics,
  TutorChatMessage
} from '../../types/chat';
import {
  analyzeConversationalBreakdown,
  evaluateDialogueNegotiationMetrics,
  COMPREHENSION_CHECK_POOL
} from '../../services/tutorPromptBuilder';

export interface AITutorChatProps {
  userProgress: UserProgress;
  setUserProgress: React.Dispatch<React.SetStateAction<UserProgress>>;
}

export const AITutorChat: React.FC<AITutorChatProps> = ({
  userProgress,
  setUserProgress
}) => {
  const { authUser } = useApp();

  // Active persona & scenario
  const [selectedPersona, setSelectedPersona] = useState<TutorPersona>('sofia');
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('cafe');

  // Chat message history
  const [messages, setMessages] = useState<TutorChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingSpanishText, setStreamingSpanishText] = useState('');

  // Voice recording state
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef<any>(null);

  // Audio auto-play toggle
  const [autoPlayAudio, setAutoPlayAudio] = useState(true);

  // Negotiation of Meaning UI states
  const [showNegotiationMetrics, setShowNegotiationMetrics] = useState(false);
  const [expandedChipId, setExpandedChipId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentLevel: CEFRLevel = userProgress.currentLevel || 'A1';
  const isBeginner = currentLevel === 'A1' || currentLevel === 'A2';
  const immersionRatio = isBeginner ? 0.85 : 1.0;

  const personaConfig = useMemo(() => {
    return TUTOR_PERSONAS.find(p => p.id === selectedPersona) || TUTOR_PERSONAS[1];
  }, [selectedPersona]);

  const activeScenario = useMemo(() => {
    return LINGOPAL_SCENARIOS.find(s => s.id === selectedScenarioId) || LINGOPAL_SCENARIOS[0];
  }, [selectedScenarioId]);

  // Compute negotiation metrics
  const negotiationMetrics: NegotiationDialogueMetrics = useMemo(() => {
    return evaluateDialogueNegotiationMetrics(messages, currentLevel);
  }, [messages, currentLevel]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamingSpanishText]);

  // Initialize SpeechRecognition
  useEffect(() => {
    const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRec) {
      const recognition = new SpeechRec();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = selectedPersona === 'juan' ? 'es-MX' : 'es-ES';

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInputText(prev => (prev ? prev + ' ' + transcript : transcript));
        }
        setIsRecording(false);
      };

      recognition.onerror = () => {
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
    }
  }, [selectedPersona]);

  // Initial greeting message when conversation starts or scenario resets
  useEffect(() => {
    if (messages.length === 0) {
      const initialGreeting =
        activeScenario.initialPrompt?.[selectedPersona]?.es ||
        activeScenario.initialPrompt?.['sofia']?.es ||
        personaConfig.sampleGreeting;

      const initialChips: BilingualTranslationChip[] = isBeginner
        ? [
            {
              id: 'chip_welcome_1',
              phrase_es: '¿Qué te apetece tomar?',
              translation_en: 'What do you fancy drinking / having?',
              translation_ar: 'ماذا ترغب في تناوله؟',
              culturalNote: 'Fórmula conversacional muy común en bares y cafeterías en España.'
            }
          ]
        : [];

      setMessages([
        {
          id: 'msg_welcome_' + Date.now(),
          sender: 'ai',
          spanishText: initialGreeting,
          englishExplanation:
            activeScenario.initialPrompt?.[selectedPersona]?.en ||
            activeScenario.initialPrompt?.['sofia']?.en ||
            'Welcome! Let us start chatting naturally in Spanish.',
          phase: 'Apertura de Diálogo',
          timestamp: new Date().toISOString(),
          translationChips: initialChips,
          followUpQuestions: activeScenario.suggestedReplies?.map(r => r.es) || [
            '¡Hola! Encantado de saludarte.',
            'Un café con leche, por favor.',
            '¿Qué me recomiendas hoy?'
          ]
        }
      ]);
    }
  }, [selectedPersona, selectedScenarioId, activeScenario, personaConfig, isBeginner]);

  // Toggle voice input
  const handleToggleRecording = () => {
    if (!recognitionRef.current) return;
    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
      soundEffects.playPop();
    } else {
      try {
        recognitionRef.current.start();
        setIsRecording(true);
        soundEffects.playPop();
      } catch (e) {
        console.warn('Speech start error:', e);
      }
    }
  };

  // Play audio for a specific message
  const handlePlayAudio = (text: string) => {
    soundEffects.playPop();
    speakSpanishPersona(text, selectedPersona);
  };

  // Send message and process Negotiation of Meaning
  const handleSendMessage = async (textToSend?: string) => {
    const rawMessage = (textToSend || inputText).trim();
    if (!rawMessage || isStreaming) return;

    soundEffects.playPop();
    setInputText('');

    const userMsgId = 'user_' + Date.now();
    const newUserMessage: TutorChatMessage = {
      id: userMsgId,
      sender: 'user',
      spanishText: rawMessage,
      timestamp: new Date().toISOString()
    };

    const updatedHistory = [...messages, newUserMessage];
    setMessages(updatedHistory);
    setIsStreaming(true);
    setStreamingSpanishText('');

    // 1. Client-Side Negotiation of Meaning Breakdown Analysis (Michael Long)
    const detectedBreakdown = analyzeConversationalBreakdown(rawMessage, currentLevel);

    // Prepare API history format
    const apiHistory = updatedHistory.slice(-8).map(m => ({
      role: m.sender === 'user' ? ('user' as const) : ('model' as const),
      text: m.spanishText
    }));

    try {
      const response = await streamTutorMessage({
        message: rawMessage,
        history: apiHistory,
        userProgress,
        persona: selectedPersona,
        scenarioId: selectedScenarioId,
        onChunk: (partialText) => {
          setStreamingSpanishText(partialText);
        }
      });

      // 2. Synthesize Negotiation of Meaning elements if not present in API reply
      let finalRepair: ConversationalRepair | undefined = detectedBreakdown || undefined;
      let finalSpanishText = response.spanishResponse;

      // If a clarification or confirmation check was triggered and not incorporated by LLM:
      if (detectedBreakdown) {
        if (detectedBreakdown.type === 'clarification_request' && !finalSpanishText.includes('¿')) {
          finalSpanishText = `${detectedBreakdown.repairInSpanish} ${finalSpanishText}`;
        } else if (detectedBreakdown.type === 'confirmation_check' && !finalSpanishText.toLowerCase().includes('refieres')) {
          finalSpanishText = `${detectedBreakdown.repairInSpanish} ${finalSpanishText}`;
        }
      }

      // 3. Attach Comprehension Check protocol periodically or after cultural explanations
      let compCheck: ComprehensionCheckItem | undefined = undefined;
      if (
        (updatedHistory.length % 3 === 0 || detectedBreakdown?.type === 'confirmation_check') &&
        !finalSpanishText.includes('parecido')
      ) {
        const randomCheck =
          COMPREHENSION_CHECK_POOL[Math.floor(Math.random() * COMPREHENSION_CHECK_POOL.length)];
        compCheck = randomCheck;
        // Natural attachment if appropriate
        if (!finalSpanishText.endsWith('?')) {
          finalSpanishText += ` ${randomCheck.prompt_es}`;
        }
      }

      // 4. Generate translation chips for A1-A2 learners (85% Spanish immersion)
      const translationChips: BilingualTranslationChip[] = [];
      if (isBeginner && response.vocabulary && response.vocabulary.length > 0) {
        response.vocabulary.slice(0, 2).forEach((v, idx) => {
          translationChips.push({
            id: `chip_${Date.now()}_${idx}`,
            phrase_es: v.word,
            translation_en: v.en,
            translation_ar: v.ar,
            culturalNote: v.contextSentence
          });
        });
      }

      const aiMessage: TutorChatMessage = {
        id: 'ai_' + Date.now(),
        sender: 'ai',
        spanishText: finalSpanishText,
        englishExplanation: response.englishExplanation,
        arabicExplanation: response.arabicExplanation,
        phase: response.phase || 'Negociación Conversacional',
        timestamp: new Date().toISOString(),
        repair: finalRepair,
        repairsApplied: finalRepair ? [finalRepair] : [],
        comprehensionCheck: compCheck,
        translationChips: translationChips.length > 0 ? translationChips : undefined,
        vocabulary: response.vocabulary,
        followUpQuestions: response.followUpQuestions,
        feedbackBadge: finalRepair
          ? {
              type: 'negotiation',
              text:
                finalRepair.type === 'clarification_request'
                  ? '💡 Petición de Aclaración (Clarification Request)'
                  : finalRepair.type === 'confirmation_check'
                  ? '🔍 Comprobación de Confirmación (Confirmation Check)'
                  : '🔄 Reformulación Implícita (Recast)',
              xpBonus: 15
            }
          : {
              type: 'correct',
              text: '💬 Conversación Fluida (+10 XP)',
              xpBonus: 10
            }
      };

      setMessages(prev => [...prev, aiMessage]);
      setStreamingSpanishText('');

      // Auto play audio if enabled
      if (autoPlayAudio) {
        speakSpanishPersona(finalSpanishText, selectedPersona);
      }

      // Check if 3 repair milestones achieved
      const newMetrics = evaluateDialogueNegotiationMetrics([...updatedHistory, aiMessage], currentLevel);
      if (newMetrics.threeRepairsAchieved && !negotiationMetrics.threeRepairsAchieved) {
        soundEffects.playLevelUp();
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 }
        });
      }

      // Award XP
      setUserProgress(prev => ({
        ...prev,
        xp: prev.xp + 15
      }));
    } catch (err) {
      console.warn('Error processing tutor message:', err);
    } finally {
      setIsStreaming(false);
      setStreamingSpanishText('');
      inputRef.current?.focus();
    }
  };

  // Reset conversation
  const handleResetChat = () => {
    soundEffects.playPop();
    cancelSpanishSpeech();
    setMessages([]);
    setStreamingSpanishText('');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4 pb-20">
      {/* 🏛️ Top Header Bar: Persona Selector & Negotiation of Meaning Status */}
      <div className="bg-white dark:bg-[#181615] border border-stone-200 dark:border-stone-800 rounded-3xl p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Persona Info */}
          <div className="flex items-center gap-3.5">
            <div className="text-3xl p-2 bg-stone-100 dark:bg-stone-850 rounded-2xl shrink-0">
              {personaConfig.avatar}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-base sm:text-lg text-stone-900 dark:text-stone-100">
                  {personaConfig.name}
                </h2>
                <span className="text-xs px-2 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-semibold">
                  {personaConfig.flag} {personaConfig.city}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#C85A32]/10 text-[#C85A32] dark:text-[#E07A5F] border border-[#C85A32]/20">
                  {isBeginner ? 'Inmersión 85% (A1-A2)' : 'Inmersión 100% (B1+)'}
                </span>
              </div>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                {personaConfig.role_en}
              </p>
            </div>
          </div>

          {/* Right Controls: Persona Picker, Audio Toggle, Negotiation Metrics */}
          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
            {/* Persona Switcher Dropdown */}
            <select
              value={selectedPersona}
              onChange={e => {
                soundEffects.playPop();
                setSelectedPersona(e.target.value as TutorPersona);
                setMessages([]);
              }}
              className="px-3 py-1.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-850 text-xs font-bold text-stone-800 dark:text-stone-200 cursor-pointer focus:outline-none"
            >
              {TUTOR_PERSONAS.map(p => (
                <option key={p.id} value={p.id}>
                  {p.flag} {p.name} ({p.city})
                </option>
              ))}
            </select>

            {/* Audio Toggle */}
            <button
              type="button"
              onClick={() => {
                soundEffects.playPop();
                setAutoPlayAudio(!autoPlayAudio);
              }}
              className={`p-2 rounded-xl text-xs font-bold transition cursor-pointer border ${
                autoPlayAudio
                  ? 'border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300'
                  : 'border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-850 text-stone-500'
              }`}
              title={autoPlayAudio ? 'Voz automática activa' : 'Voz silenciada'}
            >
              {autoPlayAudio ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Reset Chat */}
            <button
              type="button"
              onClick={handleResetChat}
              className="p-2 rounded-xl text-xs font-bold border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-850 text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 transition cursor-pointer"
              title="Reiniciar diálogo"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Negotiation Metrics Toggle */}
            <button
              type="button"
              onClick={() => {
                soundEffects.playPop();
                setShowNegotiationMetrics(!showNegotiationMetrics);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer border ${
                negotiationMetrics.threeRepairsAchieved
                  ? 'border-emerald-400 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200'
                  : 'border-amber-300 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-200'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>
                {negotiationMetrics.threeRepairsAchieved
                  ? '3/3 Reparaciones ✓'
                  : 'Negociación Long'}
              </span>
            </button>
          </div>
        </div>

        {/* 📊 Collapsible Michael Long Interaction Hypothesis Metrics Bar */}
        <AnimatePresence>
          {showNegotiationMetrics && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t border-stone-200 dark:border-stone-800 space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div>
                  <h4 className="font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#C85A32]" />
                    <span>Métricas de Negociación del Significado (Michael Long SLA)</span>
                  </h4>
                  <p className="text-[11px] text-stone-500">
                    Criterio de Aceptación: Al menos 3 tipos de reparación conversacional activa por diálogo de 10 turnos.
                  </p>
                </div>

                <span
                  className={`px-2.5 py-1 rounded-lg font-bold text-[11px] ${
                    negotiationMetrics.threeRepairsAchieved
                      ? 'bg-emerald-500 text-white'
                      : 'bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-200'
                  }`}
                >
                  {negotiationMetrics.threeRepairsAchieved
                    ? '★ Criterio SLA Alcanzado'
                    : 'En Progreso hacia 3/3'}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                <div className="p-2.5 rounded-xl bg-stone-50 dark:bg-stone-850 border border-stone-200 dark:border-stone-800">
                  <span className="text-[10px] uppercase font-bold text-stone-400 block">Clarificación</span>
                  <span className="text-sm font-extrabold text-stone-900 dark:text-stone-100">
                    {negotiationMetrics.clarificationRequestsCount}
                  </span>
                  <span className="text-[10px] text-stone-500 block truncate">¿Quieres decir X o Y?</span>
                </div>

                <div className="p-2.5 rounded-xl bg-stone-50 dark:bg-stone-850 border border-stone-200 dark:border-stone-800">
                  <span className="text-[10px] uppercase font-bold text-stone-400 block">Confirmación</span>
                  <span className="text-sm font-extrabold text-stone-900 dark:text-stone-100">
                    {negotiationMetrics.confirmationChecksCount}
                  </span>
                  <span className="text-[10px] text-stone-500 block truncate">¿Te refieres a X?</span>
                </div>

                <div className="p-2.5 rounded-xl bg-stone-50 dark:bg-stone-850 border border-stone-200 dark:border-stone-800">
                  <span className="text-[10px] uppercase font-bold text-stone-400 block">Recast Implícito</span>
                  <span className="text-sm font-extrabold text-stone-900 dark:text-stone-100">
                    {negotiationMetrics.recastsCount}
                  </span>
                  <span className="text-[10px] text-stone-500 block truncate">Modelado sin corte</span>
                </div>

                <div className="p-2.5 rounded-xl bg-stone-50 dark:bg-stone-850 border border-stone-200 dark:border-stone-800">
                  <span className="text-[10px] uppercase font-bold text-stone-400 block">Comprensión</span>
                  <span className="text-sm font-extrabold text-stone-900 dark:text-stone-100">
                    {negotiationMetrics.comprehensionChecksCount}
                  </span>
                  <span className="text-[10px] text-stone-500 block truncate">¿Te ha ocurrido algo así?</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 💬 Conversation Stream Area */}
      <div className="bg-white dark:bg-[#181615] border border-stone-200 dark:border-stone-800 rounded-3xl p-4 sm:p-6 shadow-xs min-h-[460px] max-h-[600px] overflow-y-auto space-y-5 scrollbar-thin">
        {messages.map((msg, idx) => {
          const isUser = msg.sender === 'user';
          return (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} space-y-1.5`}
            >
              {/* Message Bubble */}
              <div
                className={`max-w-[88%] sm:max-w-[78%] rounded-3xl p-4 sm:p-5 relative ${
                  isUser
                    ? 'bg-[#C85A32] text-white rounded-br-sm shadow-xs'
                    : 'bg-stone-50 dark:bg-stone-850/90 text-stone-900 dark:text-stone-100 rounded-bl-sm border border-stone-200/90 dark:border-stone-800 shadow-2xs'
                }`}
              >
                {/* Repair Badge Header if Negotiation of Meaning was applied */}
                {!isUser && msg.feedbackBadge && (
                  <div className="mb-2.5">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase ${
                        msg.feedbackBadge.type === 'negotiation'
                          ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800'
                          : 'bg-stone-200/70 dark:bg-stone-800 text-stone-600 dark:text-stone-400'
                      }`}
                    >
                      {msg.feedbackBadge.text}
                    </span>
                  </div>
                )}

                {/* Primary Spanish Text */}
                <p className="text-sm sm:text-base leading-relaxed font-medium">
                  {msg.spanishText}
                </p>

                {/* Audio Button for AI message */}
                {!isUser && (
                  <div className="mt-3 pt-2.5 border-t border-stone-200/50 dark:border-stone-800/50 flex items-center justify-between text-xs">
                    <button
                      type="button"
                      onClick={() => handlePlayAudio(msg.spanishText)}
                      className="text-[#C85A32] dark:text-[#E07A5F] hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Escuchar</span>
                    </button>

                    <span className="text-[10px] text-stone-400">
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                )}

                {/* 🏷️ Beginner (A1-A2) Bilingual Translation Chips (Expandible on Tap) */}
                {!isUser && isBeginner && msg.translationChips && msg.translationChips.length > 0 && (
                  <div className="mt-3 pt-2.5 border-t border-stone-200/60 dark:border-stone-800/60 space-y-1.5">
                    <span className="text-[10px] font-bold uppercase text-stone-400 block tracking-wider">
                      Fichas Bilingües (Inmersión 85%):
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {msg.translationChips.map(chip => {
                        const isExpanded = expandedChipId === chip.id;
                        return (
                          <button
                            key={chip.id}
                            type="button"
                            onClick={() => {
                              soundEffects.playPop();
                              setExpandedChipId(isExpanded ? null : chip.id);
                            }}
                            className={`px-2.5 py-1 rounded-xl text-xs font-semibold flex items-center gap-1 transition cursor-pointer border ${
                              isExpanded
                                ? 'bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200 border-amber-300 dark:border-amber-700'
                                : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700 hover:bg-stone-100'
                            }`}
                          >
                            <Languages className="w-3 h-3 text-[#C85A32]" />
                            <span>{chip.phrase_es}</span>
                            {isExpanded ? <ChevronUp className="w-3 h-3 ml-1" /> : <ChevronDown className="w-3 h-3 ml-1" />}
                          </button>
                        );
                      })}
                    </div>

                    {/* Expanded Chip Definition */}
                    {msg.translationChips
                      .filter(c => c.id === expandedChipId)
                      .map(chip => (
                        <div
                          key={chip.id + '_def'}
                          className="p-2.5 rounded-xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-950 dark:text-amber-200 space-y-0.5"
                        >
                          <p className="font-bold">{chip.translation_en}</p>
                          {chip.translation_ar && <p className="font-arabic text-stone-600 dark:text-stone-400">{chip.translation_ar}</p>}
                          {chip.culturalNote && (
                            <p className="text-[11px] text-stone-500 italic mt-0.5">💡 {chip.culturalNote}</p>
                          )}
                        </div>
                      ))}
                  </div>
                )}
              </div>

              {/* Follow-up Quick Reply Chips on latest AI turn */}
              {!isUser && idx === messages.length - 1 && msg.followUpQuestions && (
                <div className="flex flex-wrap gap-1.5 pt-1 pl-2 max-w-[85%]">
                  {msg.followUpQuestions.slice(0, 3).map((reply, rIdx) => (
                    <button
                      key={rIdx}
                      type="button"
                      onClick={() => handleSendMessage(reply.split('(')[0].trim())}
                      className="px-3 py-1.5 rounded-2xl bg-stone-100 dark:bg-stone-800 hover:bg-[#C85A32]/10 hover:text-[#C85A32] dark:hover:text-[#E07A5F] text-stone-700 dark:text-stone-300 text-xs font-medium border border-stone-200 dark:border-stone-700 transition cursor-pointer"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          );
        })}

        {/* Live Streaming Token Preview */}
        {isStreaming && (
          <div className="flex flex-col items-start space-y-1.5">
            <div className="max-w-[78%] rounded-3xl p-4 sm:p-5 bg-stone-50 dark:bg-stone-850 text-stone-900 dark:text-stone-100 rounded-bl-sm border border-stone-200 dark:border-stone-800 shadow-2xs">
              <div className="flex items-center gap-2 mb-2 text-xs text-stone-400">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-[#C85A32]" />
                <span>{personaConfig.name} está respondiendo...</span>
              </div>
              <p className="text-sm sm:text-base leading-relaxed font-medium">
                {streamingSpanishText || '...'}
              </p>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* ✍️ Message Input Bar & Mic Controls */}
      <form
        onSubmit={e => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="bg-white dark:bg-[#181615] border border-stone-200 dark:border-stone-800 rounded-3xl p-3 sm:p-4 shadow-xs flex items-center gap-2"
      >
        <button
          type="button"
          onClick={handleToggleRecording}
          className={`p-3 rounded-2xl transition cursor-pointer shrink-0 ${
            isRecording
              ? 'bg-rose-500 text-white animate-pulse'
              : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
          }`}
          title={isRecording ? 'Detener grabación' : 'Hablar en español'}
        >
          {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5 text-[#C85A32]" />}
        </button>

        <input
          ref={inputRef}
          type="text"
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          placeholder={`Habla con ${personaConfig.name} en español... (ej. "Ayer voy a la playa" para probar reparación)`}
          disabled={isStreaming}
          className="flex-1 bg-transparent px-3 py-2 text-sm sm:text-base text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none"
        />

        <button
          type="submit"
          disabled={!inputText.trim() || isStreaming}
          className="p-3 rounded-2xl bg-[#C85A32] hover:bg-[#B44C27] disabled:opacity-40 text-white transition cursor-pointer shrink-0 shadow-xs"
        >
          {isStreaming ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
        </button>
      </form>
    </div>
  );
};

export default AITutorChat;
