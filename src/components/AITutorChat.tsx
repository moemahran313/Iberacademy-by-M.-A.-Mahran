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
  Star,
  Award,
  Target,
  Play
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
  TutorAnalysis,
  analyzeUserSpanishInput,
  streamTutorMessage
} from '../services/aiTutorService';

interface AITutorChatProps {
  userProgress: UserProgress;
  setUserProgress: React.Dispatch<React.SetStateAction<UserProgress>>;
}

interface PersonaInfo {
  id: TutorPersona;
  name: string;
  country: string;
  flag: string;
  gender: 'male' | 'female';
  voiceTag: string;
  role: string;
  accent: string;
  sampleGreeting: string;
  avatarBg: string;
  accentColor: string;
}

const PERSONAS: PersonaInfo[] = [
  {
    id: 'juan',
    name: 'Juan',
    country: 'Oaxaca, Mexico',
    flag: '🇲🇽',
    gender: 'male',
    voiceTag: '👨 Baritone Male Voice (Mex)',
    role: 'Warm & Casual Local',
    accent: 'Mexican Spanish (carro, platicar, ¿qué onda?)',
    sampleGreeting: '¡Hola, qué onda! Soy Juan de Oaxaca. ¿Listo para platicar un rato?',
    avatarBg: 'from-amber-500 to-orange-600',
    accentColor: 'text-amber-500'
  },
  {
    id: 'sofia',
    name: 'Sofía',
    country: 'Madrid, Spain',
    flag: '🇪🇸',
    gender: 'female',
    voiceTag: '👩 Vibrant Female Voice (Mad)',
    role: 'Lively Modern Speaker',
    accent: 'Castilian Iberian (guay, qué tal, de tapas)',
    sampleGreeting: '¡Hola! Soy Sofía de Madrid. ¡Qué ilusión charlar y practicar juntos hoy!',
    avatarBg: 'from-rose-500 to-red-600',
    accentColor: 'text-rose-500'
  },
  {
    id: 'mateo',
    name: 'Prof. Mateo',
    country: 'Salamanca, Spain',
    flag: '👨‍🏫',
    gender: 'male',
    voiceTag: '👨 Professorial Male Voice (Cast)',
    role: 'Encouraging Mentor',
    accent: 'Standard Academic Castilian (CEFR Method)',
    sampleGreeting: 'Saludos cordiales. Soy el Profesor Mateo. Iniciemos nuestra sesión comunicativa.',
    avatarBg: 'from-blue-600 to-indigo-700',
    accentColor: 'text-blue-500'
  },
  {
    id: 'camila',
    name: 'Camila',
    country: 'Medellín, Colombia',
    flag: '🇨🇴',
    gender: 'female',
    voiceTag: '👩 Melodic Female Voice (Col)',
    role: 'Sweet Coffee Enthusiast',
    accent: 'Paisa Colombian (chévere, con gusto, súper bien)',
    sampleGreeting: '¡Hola! Soy Camila de Medellín. ¡Qué chévere tenerte aquí practicando español!',
    avatarBg: 'from-emerald-500 to-teal-600',
    accentColor: 'text-emerald-500'
  }
];

// Word dictionary translation popover state
interface SelectedWordInfo {
  word: string;
  cleanWord: string;
  en: string;
  ar: string;
  x: number;
  y: number;
}

// Conversation Quest Interface
interface ConversationQuest {
  id: string;
  title_es: string;
  title_en: string;
  xpReward: number;
  completed: boolean;
  checker: (text: string, turnCount: number, scenarioId: string) => boolean;
}

export const AITutorChat: React.FC<AITutorChatProps> = ({
  userProgress,
  setUserProgress
}) => {
  const { grammarPracticeTopic } = useApp();

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

  // Audio settings
  const [audioSpeed, setAudioSpeed] = useState<0.8 | 1.0>(1.0);
  const [autoPlayAudio, setAutoPlayAudio] = useState(true);

  // LingoPal Gamification stats for this session
  const [sessionTurnCount, setSessionTurnCount] = useState(0);
  const [sessionXpEarned, setSessionXpEarned] = useState(0);
  const [sessionCompleted, setSessionCompleted] = useState(false);
  const [showCelebrationModal, setShowCelebrationModal] = useState(false);
  const [showLevelUpModal, setShowLevelUpModal] = useState(false);
  const [revealedTranslations, setRevealedTranslations] = useState<Record<string, boolean>>({});
  const [revealedAnalyses, setRevealedAnalyses] = useState<Record<string, boolean>>({});

  const toggleAnalysis = (id: string) => {
    soundEffects.playPop();
    setRevealedAnalyses(prev => ({ ...prev, [id]: prev[id] === false ? true : false }));
  };

  // Dynamic suggested quick-replies (LingoPal smart chips)
  const [suggestedReplies, setSuggestedReplies] = useState<{ es: string; en: string }[]>([]);

  // Interactive Tap-to-Translate popover
  const [selectedWord, setSelectedWord] = useState<SelectedWordInfo | null>(null);
  const [savedWordToast, setSavedWordToast] = useState<string | null>(null);
  const [questToast, setQuestToast] = useState<string | null>(null);

  // Topic mastery simulation storage
  const [topicMastery, setTopicMastery] = useState<Record<string, number>>({
    cafe: 80,
    friends: 65,
    tacos: 45,
    hotel: 30,
    job: 20
  });

  // Conversation Quests
  const [quests, setQuests] = useState<ConversationQuest[]>([
    {
      id: 'quest_greet',
      title_es: 'Saludar con Cortesía',
      title_en: 'Greet naturally (hola, buenas, qué tal)',
      xpReward: 15,
      completed: false,
      checker: text => /hola|buen(as|os)|saludos|qué tal|onda/i.test(text)
    },
    {
      id: 'quest_question',
      title_es: 'Hacer una Pregunta',
      title_en: 'Ask a question using ¿ or ?, qué, cómo...',
      xpReward: 20,
      completed: false,
      checker: text => /[?¿]|(qué|cómo|cuándo|dónde|por qué|cuánto)/i.test(text)
    },
    {
      id: 'quest_vocab',
      title_es: 'Vocabulario Contextual',
      title_en: 'Use scenario-relevant vocabulary',
      xpReward: 25,
      completed: false,
      checker: (text, _, scenarioId) => {
        if (scenarioId === 'cafe') return /café|leche|tostada|pedir|tomar|desayunar|azúcar/i.test(text);
        if (scenarioId === 'tacos') return /taco|pastor|birria|salsa|limón|ordenar|puesto/i.test(text);
        if (scenarioId === 'friends') return /amigo|gusto|música|vivo|estudio|español|país/i.test(text);
        return text.split(' ').length >= 3;
      }
    },
    {
      id: 'quest_turns',
      title_es: 'Racha de Diálogo',
      title_en: 'Complete 4 back-and-forth turns',
      xpReward: 35,
      completed: false,
      checker: (_, turns) => turns >= 4
    }
  ]);

  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

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
      phase: 'Greeting Hook',
      followUpQuestions: scenario.suggestedReplies.map(r => `${r.es} (${r.en})`)
    };

    setMessages([initialMsg]);
    setSuggestedReplies(scenario.suggestedReplies);
    setSessionTurnCount(0);
    setSessionCompleted(false);
    setShowCelebrationModal(false);

    // Reset quests completion for fresh scenario practice
    setQuests(prev => prev.map(q => ({ ...q, completed: false })));

    if (autoPlayAudio) {
      handleSpeak(initialMsg.id, promptData.es, personaKey);
    }
  };

  // Initialize on mount
  useEffect(() => {
    initScenario(currentScenario, selectedPersona);
  }, []);

  // When active grammar practice topic changes from outside (e.g. from Grammar Encyclopedia)
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
        { es: `Escribiré una frase para que me corrijas.`, en: 'I will write a sentence for you to correct.' },
        { es: `¿Cuál es el error más común?`, en: 'What is the most common mistake?' }
      ]);
    }
  }, [grammarPracticeTopic]);

  // Auto-scroll chat smoothly
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages, isLoading, isStreaming, suggestedReplies]);

  // Text-To-Speech with dedicated male/female persona voice resolution
  const handleSpeak = (msgId: string, text: string, personaOverride?: TutorPersona) => {
    setCurrentlyPlayingId(msgId);
    const personaToUse = personaOverride || selectedPersona;
    speakSpanishPersona(text, personaToUse, audioSpeed);
    const estimatedDuration = Math.max(2000, text.length * 65);
    setTimeout(() => {
      setCurrentlyPlayingId(prev => (prev === msgId ? null : prev));
    }, estimatedDuration);
  };

  // Switch scenario
  const handleSelectScenario = (scenario: ScenarioDefinition) => {
    soundEffects.playPop();
    setCurrentScenario(scenario);
    initScenario(scenario, selectedPersona);
  };

  // Switch persona with distinct voice greeting preview
  const handleSelectPersona = (personaId: TutorPersona) => {
    soundEffects.playPop();
    setSelectedPersona(personaId);
    initScenario(currentScenario, personaId);
  };

  // Toggle reveal translation
  const toggleTranslation = (id: string) => {
    soundEffects.playPop();
    setRevealedTranslations(prev => ({ ...prev, [id]: !prev[id] }));
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

  // Interactive word click
  const handleWordClick = (e: React.MouseEvent, word: string) => {
    e.stopPropagation();
    const clean = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"'¡¿]/g, '').trim();
    if (!clean || clean.length < 2) return;

    soundEffects.playPop();

    const knownVocab: Record<string, { en: string; ar: string }> = {
      hola: { en: 'hello / hi', ar: 'مرحباً' },
      café: { en: 'coffee / café', ar: 'قهوة / مقهى' },
      leche: { en: 'milk', ar: 'حليب' },
      tostada: { en: 'toast', ar: 'شريحة خبز محمص' },
      gracias: { en: 'thank you', ar: 'شكراً' },
      por: { en: 'for / by / through', ar: 'من أجل / عبر' },
      para: { en: 'for / in order to', ar: 'لأجل / لكي' },
      amigo: { en: 'friend', ar: 'صديق' },
      hotel: { en: 'hotel', ar: 'فندق' },
      tacos: { en: 'tacos', ar: 'تاكو' },
      aeropuerto: { en: 'airport', ar: 'مطار' },
      viajar: { en: 'to travel', ar: 'يسافر' },
      trabajo: { en: 'work / job', ar: 'عمل / وظيفة' },
      bienvenido: { en: 'welcome', ar: 'أهلاً بك' },
      desayunar: { en: 'to have breakfast', ar: 'يتناول الإفطار' }
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

  // Voice recording using Web Speech API
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
      recognition.lang = selectedPersona === 'juan' ? 'es-MX' : selectedPersona === 'camila' ? 'es-CO' : 'es-ES';
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

  // Check and award quest rewards
  const evaluateQuests = (text: string, turnCount: number) => {
    let questXpGained = 0;
    let completedQuestTitle: string | null = null;

    setQuests(prevQuests =>
      prevQuests.map(q => {
        if (!q.completed && q.checker(text, turnCount, currentScenario.id)) {
          questXpGained += q.xpReward;
          completedQuestTitle = q.title_es;
          return { ...q, completed: true };
        }
        return q;
      })
    );

    if (questXpGained > 0) {
      soundEffects.playLevelUp();
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.7 }
      });
      if (completedQuestTitle) {
        setQuestToast(`🎯 ¡Misión cumplida: ${completedQuestTitle}! +${questXpGained} XP`);
        setTimeout(() => setQuestToast(null), 3000);
      }
    }

    return questXpGained;
  };

  // Send message using Streaming Vercel AI SDK Integration
  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputVal).trim();
    if (!text || isLoading || isStreaming) return;

    soundEffects.playPop();

    const userMsgId = `u-${Date.now()}`;
    const userMsg: ChatMessage = {
      id: userMsgId,
      sender: 'user',
      spanishText: text,
      feedbackBadge: {
        type: 'analyzing',
        text: 'Analizando con IA...'
      }
    };

    setMessages(prev => [...prev, userMsg]);
    setInputVal('');
    setIsLoading(true);

    const newTurnCount = sessionTurnCount + 1;
    setSessionTurnCount(newTurnCount);

    // Update topic mastery score
    setTopicMastery(prev => ({
      ...prev,
      [currentScenario.id]: Math.min(100, (prev[currentScenario.id] || 40) + 10)
    }));

    // Evaluate conversation quests
    const questBonusXp = evaluateQuests(text, newTurnCount);

    // Base XP + Quest Bonus
    const baseEarnedXp = 10 + questBonusXp;
    setSessionXpEarned(prev => prev + baseEarnedXp);

    const prevLevel = Math.floor((userProgress.xp || 0) / 250) + 1;
    const nextTotalXp = (userProgress.xp || 0) + baseEarnedXp;
    const nextLevel = Math.floor(nextTotalXp / 250) + 1;

    setUserProgress(prev => ({ ...prev, xp: prev.xp + baseEarnedXp }));

    // Level-up celebration check
    if (nextLevel > prevLevel) {
      setTimeout(() => {
        soundEffects.playLevelUp();
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 }
        });
        setShowLevelUpModal(true);
      }, 500);
    }

    // Trigger 5-turn completion celebration
    if (newTurnCount === 5 && !sessionCompleted) {
      setSessionCompleted(true);
      setTimeout(() => {
        soundEffects.playLevelUp();
        confetti({
          particleCount: 70,
          spread: 70,
          origin: { y: 0.6 }
        });
        setShowCelebrationModal(true);
        setUserProgress(prev => ({ ...prev, xp: prev.xp + 50 }));
      }, 1000);
    }

    // Prepare streaming AI placeholder
    const aiMsgId = `ai-${Date.now()}`;
    const streamingAiMsg: ChatMessage = {
      id: aiMsgId,
      sender: 'ai',
      spanishText: '',
      phase: 'Escribiendo respuesta en vivo...'
    };

    setMessages(prev => [...prev, streamingAiMsg]);
    setIsStreaming(true);

    try {
      const history = messages.slice(-6).map(m => ({
        role: m.sender === 'user' ? ('user' as const) : ('model' as const),
        text: m.spanishText
      }));

      // Stream response token-by-token with Vercel serverless safety
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

      // Update user message badge based on AI analysis
      if (response.analysis) {
        const hasErrors = response.analysis.hasErrors;
        const score = response.analysis.score ?? (hasErrors ? 75 : 95);
        const corrCount = response.analysis.corrections?.length || 0;
        const xpBonus = hasErrors ? 10 : 20;

        setUserProgress(prev => ({ ...prev, xp: prev.xp + xpBonus }));

        const verdict = response.analysis.verdict || '';
        const isMeta = verdict.toLowerCase().includes('feedback') || /\b(robotic|robot|same|talk normal|speak normal)\b/i.test(text);
        const isEnglish = verdict.toLowerCase().includes('inglés') || verdict.toLowerCase().includes('english') || /\b(what|understand|heard|repeat|slower|slow|dont|don't|huh|mean|say|saying|speak|same|robotic)\b/i.test(text);

        let badgeText = '';
        let badgeType: 'correct' | 'warning' | 'analyzing' = hasErrors ? 'warning' : 'correct';
        if (isMeta) {
          badgeText = '💬 Feedback conversacional recibido';
          badgeType = 'correct';
        } else if (isEnglish) {
          badgeText = '💡 Expresión en inglés analizada';
          badgeType = 'warning';
        } else if (hasErrors) {
          badgeText = corrCount > 0
            ? `⚠️ ${corrCount} ${corrCount === 1 ? 'detalle lingüístico' : 'detalles lingüísticos'} por IA`
            : '⚠️ Ajuste sugerido por IA';
        } else {
          badgeText = `✨ ¡Buen español! (${score}/100)`;
        }

        setMessages(prev =>
          prev.map(m =>
            m.id === userMsgId
              ? {
                  ...m,
                  feedbackBadge: {
                    type: badgeType,
                    text: badgeText,
                    xpBonus
                  }
                }
              : m
          )
        );
      } else {
        const { feedback } = analyzeUserSpanishInput(text);
        setMessages(prev =>
          prev.map(m => (m.id === userMsgId ? { ...m, feedbackBadge: feedback } : m))
        );
      }

      // Finalize completed message
      setMessages(prev =>
        prev.map(m =>
          m.id === aiMsgId
            ? {
                ...m,
                spanishText: response.spanishResponse,
                englishExplanation: response.englishExplanation,
                arabicExplanation: response.arabicExplanation,
                phase: response.phase,
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
        const parsedSuggestions = response.followUpQuestions.map(q => {
          const match = q.match(/^(.*?)\s*\((.*?)\)$/);
          if (match) {
            return { es: match[1].trim(), en: match[2].trim() };
          }
          return { es: q, en: 'Quick reply' };
        });
        setSuggestedReplies(parsedSuggestions);
      }

      soundEffects.playCorrect();

      if (autoPlayAudio) {
        handleSpeak(aiMsgId, response.spanishResponse, selectedPersona);
      }
    } catch (err) {
      console.error('Chat error:', err);
    } finally {
      setIsLoading(false);
      setIsStreaming(false);
    }
  };

  const activePersonaObj = PERSONAS.find(p => p.id === selectedPersona) || PERSONAS[0];

  return (
    <div className="max-w-5xl mx-auto space-y-4 px-2 sm:px-4 pb-16">
      {/* 🎮 LINGOPAL GAMIFIED STATUS HUD */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-4 sm:p-5 shadow-xs space-y-4">
        {/* Top Row: Level Indicator, Streak Counter & Session Stats */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          {/* Level Progress Badge */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-stone-950 font-black flex flex-col items-center justify-center shadow-md shrink-0">
              <span className="text-[9px] uppercase tracking-wider font-bold">LVL</span>
              <span className="text-lg leading-none">{currentLevel}</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-black text-stone-900 dark:text-stone-100">
                  {rankTitle}
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300">
                  +{sessionXpEarned} XP Today
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-36 sm:w-48 h-2 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ type: 'spring', damping: 15 }}
                  />
                </div>
                <span className="text-[11px] font-mono font-bold text-stone-500 dark:text-stone-400">
                  {currentLevelProgress}/250 XP
                </span>
              </div>
            </div>
          </div>

          {/* Streak & Controls */}
          <div className="flex items-center gap-2">
            {/* Streak Widget */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-500/20 text-orange-600 dark:text-orange-400 font-black text-xs shadow-2xs">
              <Flame className="w-4 h-4 fill-orange-500 text-orange-500 animate-pulse" />
              <span>{userProgress.streakDays || 5} Días en Racha</span>
            </div>

            {/* Audio Speed */}
            <button
              onClick={() => {
                soundEffects.playPop();
                setAudioSpeed(s => (s === 1.0 ? 0.8 : 1.0));
              }}
              className="px-2.5 py-1.5 rounded-xl border border-stone-200 dark:border-stone-700 text-xs font-bold text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition cursor-pointer"
              title="Toggle Audio Speed"
            >
              {audioSpeed === 1.0 ? '1.0x 🐇' : '0.8x 🐢'}
            </button>

            {/* Auto Audio */}
            <button
              onClick={() => {
                soundEffects.playPop();
                setAutoPlayAudio(a => !a);
              }}
              className={`p-2 rounded-xl border transition cursor-pointer ${
                autoPlayAudio
                  ? 'border-amber-400 bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400'
                  : 'border-stone-200 dark:border-stone-700 text-stone-400'
              }`}
              title={autoPlayAudio ? 'Voice auto-play ON' : 'Voice auto-play OFF'}
            >
              {autoPlayAudio ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Reset */}
            <button
              onClick={() => initScenario(currentScenario, selectedPersona)}
              className="p-2 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 transition cursor-pointer"
              title="Reset conversation"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 🎭 CHARACTER SELECTION UI: Juan, Sofía, Mateo, Camila */}
        <div className="pt-2 border-t border-stone-100 dark:border-stone-800/80">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-black uppercase tracking-wider text-stone-400 dark:text-stone-500 flex items-center gap-1.5">
              <span>Select AI Native Tutor:</span>
              <span className="font-normal text-stone-400">
                (Distinct voice synthesis & dialect)
              </span>
            </span>
            <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400">
              Active: {activePersonaObj.name} ({activePersonaObj.country})
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {PERSONAS.map(p => {
              const isSelected = p.id === selectedPersona;
              return (
                <div
                  key={p.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => handleSelectPersona(p.id)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleSelectPersona(p.id);
                    }
                  }}
                  className={`relative p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 group select-none ${
                    isSelected
                      ? 'bg-amber-500/10 dark:bg-amber-500/15 border-amber-500 ring-2 ring-amber-400/50 shadow-sm'
                      : 'bg-stone-50/70 dark:bg-stone-800/40 border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-9 h-9 rounded-xl bg-gradient-to-br ${p.avatarBg} text-white flex items-center justify-center font-black text-sm shadow-xs`}
                      >
                        {p.name[0]}
                      </div>
                      <div>
                        <div className="flex items-center gap-1">
                          <span className="font-black text-xs text-stone-900 dark:text-stone-100">
                            {p.name}
                          </span>
                          <span className="text-xs">{p.flag}</span>
                        </div>
                        <span className="text-[10px] text-stone-500 dark:text-stone-400 block line-clamp-1">
                          {p.role}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-1.5 border-t border-stone-200/50 dark:border-stone-800 flex items-center justify-between text-[10px]">
                    <span className="font-semibold text-stone-600 dark:text-stone-400">
                      {p.gender === 'male' ? '👨 Baritone' : '👩 Melodic'}
                    </span>
                    <button
                      type="button"
                      onClick={e => {
                        e.stopPropagation();
                        handleSpeak(`greet-${p.id}`, p.sampleGreeting, p.id);
                      }}
                      className="p-1 rounded-md bg-stone-200/70 dark:bg-stone-700/70 text-stone-700 dark:text-stone-300 hover:bg-amber-500 hover:text-stone-950 transition cursor-pointer"
                      title="Test Voice Synthesis"
                    >
                      <Play className="w-2.5 h-2.5 fill-current" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 🎯 CONVERSATION QUESTS HUD */}
        <div className="pt-2 border-t border-stone-100 dark:border-stone-800/80">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-black uppercase tracking-wider text-stone-400 dark:text-stone-500 flex items-center gap-1">
              <Target className="w-3.5 h-3.5 text-amber-500" />
              <span>Conversation Quests:</span>
            </span>
            <span className="text-[11px] font-bold text-stone-500">
              {quests.filter(q => q.completed).length} of {quests.length} Completed
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {quests.map(q => (
              <div
                key={q.id}
                className={`p-2.5 rounded-2xl border transition-all flex items-center gap-2.5 ${
                  q.completed
                    ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                    : 'bg-stone-50 dark:bg-stone-800/40 border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                    q.completed
                      ? 'bg-emerald-500 text-white'
                      : 'bg-stone-200 dark:bg-stone-700 text-stone-500'
                  }`}
                >
                  {q.completed ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : '•'}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold truncate">{q.title_es}</span>
                    <span
                      className={`text-[10px] font-mono font-extrabold ${
                        q.completed ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'
                      }`}
                    >
                      +{q.xpReward} XP
                    </span>
                  </div>
                  <p className="text-[10px] text-stone-400 dark:text-stone-500 truncate">
                    {q.title_en}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 📊 VISUAL TOPIC MASTERY BARS */}
        <div className="pt-2 border-t border-stone-100 dark:border-stone-800/80">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-black uppercase tracking-wider text-stone-400 dark:text-stone-500">
              Topic Mastery & Scenarios:
            </span>
            <span className="text-[11px] font-bold text-stone-400">
              Turn {sessionTurnCount}/5 (
              {Math.min(100, Math.round((sessionTurnCount / 5) * 100))}% Completed)
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
            {LINGOPAL_SCENARIOS.map(sc => {
              const isCurrent = sc.id === currentScenario.id;
              const mastery = topicMastery[sc.id] || 35;

              return (
                <button
                  key={sc.id}
                  onClick={() => handleSelectScenario(sc)}
                  className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer space-y-1.5 ${
                    isCurrent
                      ? 'bg-stone-900 dark:bg-amber-500 text-white dark:text-stone-950 border-transparent shadow-sm'
                      : 'bg-stone-50 dark:bg-stone-800/50 border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-base">{sc.icon}</span>
                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded font-mono font-black ${
                        isCurrent
                          ? 'bg-white/20 text-white dark:text-stone-950'
                          : 'bg-stone-200 dark:bg-stone-700 text-stone-600 dark:text-stone-300'
                      }`}
                    >
                      {sc.difficulty}
                    </span>
                  </div>
                  <p className="text-xs font-bold truncate leading-tight">{sc.title_es}</p>
                  {/* Mastery Progress bar */}
                  <div className="w-full h-1.5 bg-stone-200 dark:bg-stone-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isCurrent ? 'bg-amber-400 dark:bg-stone-950' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${mastery}%` }}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 💬 MAIN CHAT WINDOW WITH STREAMING REAL-TIME OUTPUT */}
      <div
        ref={messagesContainerRef}
        className="bg-stone-50 dark:bg-stone-950/70 border border-stone-200 dark:border-stone-800/80 rounded-3xl p-4 sm:p-6 min-h-[420px] max-h-[580px] overflow-y-auto space-y-4 shadow-inner relative"
      >
        <AnimatePresence initial={false}>
          {messages.map(msg => {
            const isAI = msg.sender === 'ai';
            const isPlaying = currentlyPlayingId === msg.id;
            const isTranslationOpen = revealedTranslations[msg.id];
            const isAnalysisOpen = revealedAnalyses[msg.id] !== false;
            const isCurrentlyStreaming = isStreaming && isAI && !msg.englishExplanation;

            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.25 }}
                className={`flex gap-3 ${isAI ? 'justify-start' : 'justify-end'}`}
              >
                {/* AI Avatar */}
                {isAI && (
                  <div className="relative shrink-0 self-end">
                    <div
                      className={`w-9 h-9 rounded-2xl bg-gradient-to-br ${activePersonaObj.avatarBg} text-white flex items-center justify-center text-sm font-bold shadow-sm`}
                    >
                      {activePersonaObj.name[0]}
                    </div>
                    <span className="absolute -bottom-1 -right-1 text-xs">
                      {activePersonaObj.flag}
                    </span>
                  </div>
                )}

                {/* Message Bubble Container */}
                <div
                  className={`max-w-[88%] sm:max-w-[78%] space-y-2 ${
                    isAI ? 'items-start' : 'items-end'
                  }`}
                >
                  <div
                    className={`p-4 rounded-3xl text-sm leading-relaxed shadow-xs relative ${
                      isAI
                        ? 'bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 text-stone-900 dark:text-stone-100 rounded-bl-xs'
                        : 'bg-gradient-to-br from-amber-500 to-amber-600 text-stone-950 font-medium rounded-br-xs'
                    }`}
                  >
                    {/* Audio speak trigger for AI */}
                    {isAI && (
                      <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-stone-100 dark:border-stone-800/60">
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleSpeak(msg.id, msg.spanishText, selectedPersona)}
                            className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition cursor-pointer ${
                              isPlaying
                                ? 'bg-amber-500 text-stone-950 animate-pulse'
                                : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-amber-100 dark:hover:bg-stone-700'
                            }`}
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                            <span>{isPlaying ? 'Speaking...' : 'Listen'}</span>
                          </button>
                          <span className="text-[10px] text-stone-400 font-bold">
                            {activePersonaObj.name} ({activePersonaObj.gender === 'male' ? '♂' : '♀'})
                          </span>
                        </div>

                        {msg.phase && (
                          <span className="text-[10px] font-mono font-bold text-stone-400 dark:text-stone-500 px-2 py-0.5 rounded-md bg-stone-50 dark:bg-stone-800">
                            {msg.phase}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Spanish Speech Text with Tap-to-Translate Tokens */}
                    <div className="font-semibold text-base select-text">
                      {msg.spanishText ? (
                        msg.spanishText.split(' ').map((word, wIdx) => (
                          <span
                            key={wIdx}
                            onClick={e => isAI && handleWordClick(e, word)}
                            className={
                              isAI
                                ? 'hover:text-amber-500 hover:underline decoration-amber-400 cursor-pointer transition inline-block mr-1'
                                : 'inline-block mr-1'
                            }
                          >
                            {word}
                          </span>
                        ))
                      ) : isCurrentlyStreaming ? (
                        <span className="inline-flex items-center gap-2 text-stone-400 font-normal italic">
                          <Loader2 className="w-4 h-4 animate-spin text-amber-500" />
                          <span>{activePersonaObj.name} está respondiendo...</span>
                        </span>
                      ) : null}

                      {/* Live streaming cursor */}
                      {isCurrentlyStreaming && (
                        <span className="inline-block w-2 h-4 ml-1 bg-amber-500 animate-pulse align-middle" />
                      )}
                    </div>

                    {/* Collapsible Progressive Unveiling: English & Arabic Translations */}
                    {isAI && (msg.englishExplanation || msg.arabicExplanation) && (
                      <div className="mt-2.5 pt-2 border-t border-stone-100 dark:border-stone-800">
                        <button
                          onClick={() => toggleTranslation(msg.id)}
                          className="text-[11px] font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1 hover:underline cursor-pointer"
                        >
                          <Languages className="w-3.5 h-3.5" />
                          <span>
                            {isTranslationOpen
                              ? 'Hide Translations'
                              : 'Progressive Unveil: Translations & Breakdown'}
                          </span>
                          {isTranslationOpen ? (
                            <ChevronUp className="w-3 h-3" />
                          ) : (
                            <ChevronDown className="w-3 h-3" />
                          )}
                        </button>

                        {isTranslationOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-2 space-y-1 text-xs text-stone-600 dark:text-stone-300 font-normal bg-stone-50 dark:bg-stone-800/40 p-3 rounded-2xl border border-stone-200/60 dark:border-stone-800"
                          >
                            {msg.englishExplanation && (
                              <p>
                                <span className="font-bold text-stone-900 dark:text-stone-100">
                                  🇬🇧 EN:{' '}
                                </span>
                                {msg.englishExplanation}
                              </p>
                            )}
                            {msg.arabicExplanation && (
                              <p className="font-arabic text-stone-700 dark:text-stone-200" dir="rtl">
                                <span className="font-bold text-stone-900 dark:text-stone-100">
                                  🇦🇪 AR:{' '}
                                </span>
                                {msg.arabicExplanation}
                              </p>
                            )}
                          </motion.div>
                        )}
                      </div>
                    )}

                    {/* 🧠 REAL-TIME AI LINGUISTIC ANALYSIS OF USER'S MESSAGE */}
                    {isAI && msg.analysis && (
                      <div className="mt-3 pt-3 border-t border-stone-200 dark:border-stone-800">
                        {/* Header with expand/collapse */}
                        <div
                          onClick={() => toggleAnalysis(msg.id)}
                          className="flex items-center justify-between gap-2 cursor-pointer select-none group"
                        >
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                            <span className="text-xs font-black text-stone-900 dark:text-stone-100 uppercase tracking-wider">
                              Análisis Lingüístico IA
                            </span>
                            {msg.analysis.score !== undefined && (
                              <span className="px-1.5 py-0.2 rounded text-[10px] font-black bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300/60 dark:border-amber-800/60">
                                {msg.analysis.score}/100
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-1.5">
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                msg.analysis.hasErrors
                                  ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300/60'
                                  : 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300/60'
                              }`}
                            >
                              {msg.analysis.verdict || (msg.analysis.hasErrors ? 'Atención a detalles' : '¡Excelente!')}
                            </span>
                            {isAnalysisOpen ? (
                              <ChevronUp className="w-3.5 h-3.5 text-stone-400 group-hover:text-stone-600 transition" />
                            ) : (
                              <ChevronDown className="w-3.5 h-3.5 text-stone-400 group-hover:text-stone-600 transition" />
                            )}
                          </div>
                        </div>

                        {/* Detailed Analysis Body */}
                        {isAnalysisOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-2.5 space-y-2.5 text-xs bg-stone-50 dark:bg-stone-800/40 p-3 rounded-2xl border border-stone-200/70 dark:border-stone-800"
                          >
                            {/* Explanatory feedback */}
                            {msg.analysis.feedback_es && (
                              <p className="text-stone-800 dark:text-stone-200 font-medium leading-relaxed">
                                {msg.analysis.feedback_es}
                              </p>
                            )}
                            {msg.analysis.feedback_en && (
                              <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-normal">
                                <span className="font-bold text-stone-700 dark:text-stone-300">Feedback: </span>
                                {msg.analysis.feedback_en}
                              </p>
                            )}
                            {userProgress.settings?.nativeLanguage === 'ar' && msg.analysis.feedback_ar && (
                              <p className="text-[11px] text-stone-600 dark:text-stone-400 font-arabic leading-normal" dir="rtl">
                                <span className="font-bold text-stone-700 dark:text-stone-300">التقييم: </span>
                                {msg.analysis.feedback_ar}
                              </p>
                            )}

                            {/* Precise corrections breakdown */}
                            {msg.analysis.corrections && msg.analysis.corrections.length > 0 && (
                              <div className="space-y-1.5 pt-1">
                                {msg.analysis.corrections.map((c, cIdx) => (
                                  <div
                                    key={cIdx}
                                    className="p-2.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-1 text-xs"
                                  >
                                    <div className="flex items-center gap-2 font-mono text-[11px] flex-wrap">
                                      <span className="line-through text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 px-1.5 py-0.5 rounded font-semibold">
                                        ❌ {c.original}
                                      </span>
                                      <span className="text-stone-400 font-bold">➔</span>
                                      <span className="text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.5 rounded font-bold">
                                        ✅ {c.correction}
                                      </span>
                                    </div>
                                    {c.explanation && (
                                      <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-normal font-sans">
                                        💡 {c.explanation}
                                      </p>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Native natural alternative */}
                            {msg.analysis.naturalAlternative && (
                              <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs flex items-start gap-1.5">
                                <span className="font-bold text-amber-700 dark:text-amber-400 shrink-0">
                                  🗣️ Nativo:
                                </span>
                                <span className="italic font-medium text-stone-900 dark:text-stone-100">
                                  "{msg.analysis.naturalAlternative}"
                                </span>
                              </div>
                            )}

                            {/* Persona regional/dialect note */}
                            {msg.analysis.dialectTip && (
                              <div className="text-[11px] text-stone-500 dark:text-stone-400 flex items-start gap-1.5 pt-0.5">
                                <span className="font-bold text-stone-700 dark:text-stone-300 shrink-0">
                                  {activePersonaObj.flag} Nota de {activePersonaObj.name}:
                                </span>
                                <span>{msg.analysis.dialectTip}</span>
                              </div>
                            )}
                          </motion.div>
                        )}
                      </div>
                    )}

                    {/* User feedback badge */}
                    {!isAI && msg.feedbackBadge && (
                      <div className={`mt-2 pt-1.5 border-t border-amber-600/30 flex items-center justify-between text-[11px] ${
                        msg.feedbackBadge.type === 'analyzing' ? 'animate-pulse text-amber-950' : ''
                      }`}>
                        <div className="flex items-center gap-1.5">
                          {msg.feedbackBadge.type === 'analyzing' ? (
                            <Loader2 className="w-3 h-3 animate-spin text-stone-950" />
                          ) : msg.feedbackBadge.type === 'warning' ? (
                            <AlertCircle className="w-3 h-3 text-stone-950" />
                          ) : (
                            <CheckCircle2 className="w-3 h-3 text-stone-950" />
                          )}
                          <span className="font-bold text-stone-950">{msg.feedbackBadge.text}</span>
                        </div>
                        {msg.feedbackBadge.xpBonus ? (
                          <span className="font-black bg-stone-950/20 px-1.5 py-0.5 rounded text-[10px] text-stone-950">
                            +{msg.feedbackBadge.xpBonus} XP
                          </span>
                        ) : null}
                      </div>
                    )}
                  </div>

                  {/* Silent Corrections & Key Vocabulary */}
                  {isAI && msg.corrections && msg.corrections.length > 0 && (
                    <div className="space-y-1">
                      {msg.corrections.map((corr, cIdx) => (
                        <div
                          key={cIdx}
                          className="text-[11px] font-semibold text-stone-600 dark:text-stone-300 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-xl flex items-center gap-1.5"
                        >
                          <Info className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                          <span>{corr}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Key Vocabulary Chips */}
                  {isAI && msg.vocabulary && msg.vocabulary.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      <span className="text-[10px] font-bold text-stone-400 self-center mr-1">
                        Lexis:
                      </span>
                      {msg.vocabulary.map((vocab, vIdx) => (
                        <div
                          key={vIdx}
                          onClick={() => handleSaveWordToLingQ(vocab.word, vocab.en, vocab.ar)}
                          className="px-2.5 py-1 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-amber-400 text-stone-800 dark:text-stone-200 text-xs font-semibold cursor-pointer shadow-2xs flex items-center gap-1.5 group"
                          title={`Click to save "${vocab.word}" to LingQs`}
                        >
                          <span className="font-bold text-amber-600 dark:text-amber-400">
                            {vocab.word}
                          </span>
                          <span className="text-stone-400 text-[10px]">({vocab.en})</span>
                          <Plus className="w-3 h-3 text-stone-400 group-hover:text-amber-500" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Loading spinner */}
        {isLoading && !isStreaming && (
          <div className="flex items-center gap-2 text-stone-400 text-xs font-bold animate-pulse p-2">
            <Loader2 className="w-4 h-4 animate-spin text-amber-500" />
            <span>{activePersonaObj.name} está pensando...</span>
          </div>
        )}
      </div>

      {/* 💡 LINGOPAL SMART CHIPS (Suggested Quick Replies) */}
      {suggestedReplies.length > 0 && !isLoading && !isStreaming && (
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-stone-400 dark:text-stone-500">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Quick Replies (Smart Chips):</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {suggestedReplies.map((reply, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(reply.es)}
                className="text-left p-2.5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-amber-400 dark:hover:border-amber-500 hover:bg-amber-50/50 dark:hover:bg-stone-800/60 transition group cursor-pointer shadow-xs space-y-0.5"
              >
                <p className="text-xs font-bold text-stone-800 dark:text-stone-200 group-hover:text-amber-700 dark:group-hover:text-amber-400 leading-snug">
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

      {/* 🎙️ INTERACTIVE INPUT BAR */}
      <div className="relative bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-2 shadow-sm flex items-center gap-2">
        {/* Voice recording button */}
        <button
          onClick={handleToggleMic}
          className={`p-3 rounded-xl transition cursor-pointer ${
            isListening
              ? 'bg-rose-500 text-white animate-pulse shadow-md ring-4 ring-rose-200 dark:ring-rose-950'
              : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
          }`}
          title={isListening ? 'Stop listening' : 'Speak in Spanish'}
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
              ? 'Escuchando tu voz en español...'
              : `Escribe a ${activePersonaObj.name} en español...`
          }
          className="flex-1 bg-transparent px-2 py-2 text-sm text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-hidden font-medium"
        />

        {/* Send Button */}
        <button
          onClick={() => handleSendMessage()}
          disabled={!inputVal.trim() || isLoading || isStreaming}
          className="p-3 bg-amber-500 hover:bg-amber-400 disabled:opacity-30 disabled:cursor-not-allowed text-stone-950 rounded-xl font-bold transition shadow-xs cursor-pointer flex items-center justify-center"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>

      {/* 📖 WORD DICTIONARY POPOVER (Tap-to-Translate) */}
      {selectedWord && (
        <div
          style={{
            position: 'fixed',
            left: `${Math.min(window.innerWidth - 220, Math.max(16, selectedWord.x - 100))}px`,
            top: `${selectedWord.y - 110}px`,
            zIndex: 100
          }}
          onClick={e => e.stopPropagation()}
          className="bg-stone-900 text-white p-3 rounded-2xl shadow-2xl border border-stone-700 w-52 space-y-2 animate-in fade-in zoom-in duration-150"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-amber-400">{selectedWord.cleanWord}</span>
            <button
              onClick={() => setSelectedWord(null)}
              className="text-stone-400 hover:text-white cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="text-[11px] text-stone-300 space-y-0.5">
            <p>🇬🇧 {selectedWord.en}</p>
            <p className="font-arabic text-stone-300" dir="rtl">
              🇦🇪 {selectedWord.ar}
            </p>
          </div>
          <button
            onClick={() =>
              handleSaveWordToLingQ(selectedWord.cleanWord, selectedWord.en, selectedWord.ar)
            }
            className="w-full py-1 px-2 bg-amber-500 text-stone-950 font-bold text-[11px] rounded-lg hover:bg-amber-400 transition cursor-pointer flex items-center justify-center gap-1"
          >
            <Plus className="w-3 h-3" />
            <span>+ Save to LingQs</span>
          </button>
        </div>
      )}

      {/* Word Saved Toast */}
      {savedWordToast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-emerald-600 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg flex items-center gap-1.5 animate-bounce">
          <Check className="w-4 h-4" />
          <span>"{savedWordToast}" guardada en tu baraja LingQ (+5 XP)!</span>
        </div>
      )}

      {/* Quest Completed Toast */}
      {questToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-stone-900 text-amber-400 border border-amber-500 px-5 py-2.5 rounded-full text-xs font-black shadow-2xl flex items-center gap-2 animate-in slide-in-from-top duration-200">
          <Trophy className="w-4 h-4 text-amber-400" />
          <span>{questToast}</span>
        </div>
      )}

      {/* 🌟 LEVEL-UP CELEBRATION MODAL */}
      {showLevelUpModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            className="bg-white dark:bg-stone-900 border border-amber-400 dark:border-amber-500 rounded-3xl p-6 max-w-md w-full text-center space-y-4 shadow-2xl relative overflow-hidden"
          >
            <div className="w-20 h-20 bg-gradient-to-tr from-amber-500 to-orange-500 rounded-3xl mx-auto flex items-center justify-center text-4xl shadow-lg text-stone-950 font-black">
              🏆
            </div>
            <div className="space-y-1">
              <span className="text-[11px] font-black uppercase tracking-widest text-amber-600 dark:text-amber-400">
                ¡LEVEL UP!
              </span>
              <h3 className="text-2xl font-black text-stone-900 dark:text-white">
                ¡Has alcanzado el Nivel {currentLevel}!
              </h3>
              <p className="text-sm font-bold text-stone-600 dark:text-stone-300">
                Nuevo Rango: <span className="text-amber-500">{rankTitle}</span>
              </p>
            </div>

            <p className="text-xs text-stone-500 dark:text-stone-400">
              Tu fluidez conversacional sigue creciendo a través de la práctica activa con {activePersonaObj.name}.
            </p>

            <button
              onClick={() => setShowLevelUpModal(false)}
              className="w-full py-3 bg-amber-500 text-stone-950 rounded-2xl font-black text-sm hover:bg-amber-400 transition cursor-pointer shadow-md"
            >
              ¡Continuar Conversación! 🚀
            </button>
          </motion.div>
        </div>
      )}

      {/* 🎉 5-TURN SCENARIO COMPLETION CELEBRATION MODAL */}
      {showCelebrationModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 max-w-md w-full text-center space-y-4 shadow-2xl"
          >
            <div className="w-16 h-16 bg-amber-100 dark:bg-amber-950/60 rounded-3xl mx-auto flex items-center justify-center text-3xl shadow-inner">
              ⭐
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-black text-stone-900 dark:text-white">
                ¡Escenario Completado!
              </h3>
              <p className="text-sm text-stone-600 dark:text-stone-300">
                Has completado 5 turnos de diálogo en{' '}
                <span className="font-bold">{currentScenario.title_es}</span> con {activePersonaObj.name}.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 py-2">
              <div className="bg-amber-50 dark:bg-stone-800 p-3 rounded-2xl border border-amber-200/60 dark:border-stone-700">
                <span className="text-[10px] font-bold uppercase text-amber-700 dark:text-amber-400 block">
                  XP de Misión
                </span>
                <span className="text-2xl font-black text-amber-800 dark:text-amber-300">
                  +50 XP
                </span>
              </div>
              <div className="bg-emerald-50 dark:bg-stone-800 p-3 rounded-2xl border border-emerald-200/60 dark:border-stone-700">
                <span className="text-[10px] font-bold uppercase text-emerald-700 dark:text-emerald-400 block">
                  Dominio del Tema
                </span>
                <span className="text-2xl font-black text-emerald-700 dark:text-emerald-400">
                  {topicMastery[currentScenario.id] || 85}%
                </span>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setShowCelebrationModal(false)}
                className="flex-1 py-3 bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 rounded-xl font-bold text-xs hover:bg-stone-200 transition cursor-pointer"
              >
                Seguir Charlando
              </button>
              <button
                onClick={() => {
                  setShowCelebrationModal(false);
                  const nextIdx =
                    (LINGOPAL_SCENARIOS.findIndex(s => s.id === currentScenario.id) + 1) %
                    LINGOPAL_SCENARIOS.length;
                  handleSelectScenario(LINGOPAL_SCENARIOS[nextIdx]);
                }}
                className="flex-1 py-3 bg-amber-500 text-stone-950 rounded-xl font-black text-xs hover:bg-amber-400 transition cursor-pointer shadow-md"
              >
                Siguiente Escenario 🚀
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
