import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MessageSquare,
  Sparkles,
  Flame,
  Volume2,
  VolumeX,
  Send,
  RotateCcw,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  BookmarkPlus,
  Play,
  Mic,
  MicOff,
  User,
  Loader2,
  Radio,
  Plus,
  Check,
  ChevronRight,
  Headphones,
  Info
} from 'lucide-react';
import { UserProgress } from '../types';
import { soundEffects, speakSpanish } from '../utils/audio';
import { tokenizeText, lookupSpanishWord, WordDefinitionMatch } from '../utils/lingqEngine';

interface LingLooperGameProps {
  userProgress: UserProgress;
  setUserProgress: React.Dispatch<React.SetStateAction<UserProgress>>;
}

export type TutorPersonaId = 'juan' | 'sofia' | 'mateo' | 'elena';

interface TutorPersonaInfo {
  id: TutorPersonaId;
  name: string;
  flag: string;
  avatar: string;
  city: string;
  role_en: string;
  role_ar: string;
  welcome_es: string;
  welcome_en: string;
  welcome_ar: string;
}

const PERSONAS: TutorPersonaInfo[] = [
  {
    id: 'juan',
    name: 'Juan from Mexico',
    flag: '🇲🇽',
    avatar: '👨‍🎨',
    city: 'Oaxaca, Mexico',
    role_en: 'Warm Native Conversationalist & Cultural Guide',
    role_ar: 'مرشد ثفافي ومحاور إسباني أصلي من أواخاكا',
    welcome_es: '¡Hola! Soy Juan. Te doy la bienvenida a mi espacio de conversación en Oaxaca. Me encanta hablar de la vida cotidiana, la comida tradicional y la cultura viva de México. ¿Cómo te llamas y de dónde eres?',
    welcome_en: 'Hello! I am Juan. Welcome to my conversation space in Oaxaca. I love talking about daily life, traditional food, and living culture in Mexico. What is your name and where are you from?',
    welcome_ar: 'مرحباً! أنا خوان. أرحب بك في مساحة المحادثة الخاصة بي في أواخاكا. أحب التحدث عن الحياة اليومية، الطعام التقليدي والثقافة الحية في المكسيك. ما اسمك ومن أين أنت؟'
  },
  {
    id: 'sofia',
    name: 'Sofía from Madrid',
    flag: '🇪🇸',
    avatar: '👩',
    city: 'Madrid, Spain',
    role_en: 'Spontaneous Native & Everyday Colloquial Spanish',
    role_ar: 'محادثة إسبانية حديثة وعفوية من مدريد',
    welcome_es: '¡Hola! Soy Sofía. Hablo el español cotidiano de Madrid, directo y fluido. Vamos a practicar frases reales y modismos del día a día. Cuéntame, ¿qué te gusta hacer en tu tiempo libre?',
    welcome_en: 'Hello! I am Sofía. I speak everyday Spanish from Madrid, direct and fluid. Let\'s practice real phrases and daily idioms. Tell me, what do you like to do in your free time?',
    welcome_ar: 'مرحباً! أنا صوفيا. أتحدث الإسبانية اليومية المباشرة والطلاقة من مدريد. لنمارس تعبيرات حقيقية يومية. أخبرني، ماذا تحب أن تفعل في وقت فراغك؟'
  },
  {
    id: 'mateo',
    name: 'Profesor Mateo',
    flag: '🇪🇸',
    avatar: '👨‍🏫',
    city: 'Salamanca, Spain',
    role_en: 'Master Pedagogue & DELE Grammar Specialist',
    role_ar: 'خبير تربوي ولغوي متخصص في قواعد الإسبانية و DELE',
    welcome_es: '¡Saludos! Soy el Profesor Mateo, lingüista y pedagogo. Mi objetivo es guiarte paso a paso con el método comunicativo para consolidar tu gramática y vocabulario. ¿En qué aspecto te gustaría enfocar hoy tu aprendizaje?',
    welcome_en: 'Greetings! I am Profesor Mateo, a linguist and pedagogue. My goal is to guide you step by step with the communicative method to consolidate your grammar and vocabulary. What aspect would you like to focus on today?',
    welcome_ar: 'تحياتي! أنا البروفيسور ماتيو، خبير لغوي وتربوي. هدفي إرشادك خطوة بخطوة للتمكن من القواعد والمفردات. ما الجانب الذي تود التركيز عليه اليوم؟'
  },
  {
    id: 'elena',
    name: 'Elena from Colombia',
    flag: '🇨🇴',
    avatar: '👩‍💼',
    city: 'Medellín, Colombia',
    role_en: 'Clear Pronunciation & Conversation Coach',
    role_ar: 'مدربة محادثة ونطق واضح من ميديلين',
    welcome_es: '¡Hola! Soy Elena. En Colombia nos caracteriza un español muy claro, melodioso y fácil de comprender. Te ayudaré a ganar mucha confianza al hablar. ¿Cómo estuvo tu día hoy?',
    welcome_en: 'Hello! I am Elena. In Colombia we are known for very clear, melodious, and accessible Spanish. I will help you gain strong confidence speaking. How was your day today?',
    welcome_ar: 'مرحباً! أنا إيلينا. نتميز في كولومبيا بإسبانية واضحة جداً وموسيقية وسهلة الفهم. سأساعدك على اكتساب ثقة كبيرة في التحدث. كيف كان يومك اليوم؟'
  }
];

interface ChatMessage {
  id: string;
  sender: 'user' | 'tutor';
  spanishText: string;
  englishExplanation?: string;
  arabicExplanation?: string;
  word_mappings?: Record<string, { en: string; ar: string; pos?: string; example?: string }>;
  detected_user_mistake?: {
    original: string;
    corrected: string;
    explanation_en: string;
    explanation_ar: string;
  } | null;
  tutor_mood?: string;
  showTranslation?: boolean;
  timestamp: string;
}

interface TutoringQuest {
  id: string;
  label_en: string;
  desc_en: string;
  label_ar: string;
  desc_ar: string;
  icon: string;
  trigger: (msg: string) => boolean;
}

const TUTORING_QUESTS: TutoringQuest[] = [
  {
    id: 'quest_1',
    label_en: 'The Conversational Kickoff',
    desc_en: 'Introduce yourself, state your origin or learning goals in Spanish (e.g. "me llamo", "soy de", "quiero aprender").',
    label_ar: 'الانطلاقة التفاعلية',
    desc_ar: 'عرّف عن نفسك، من أين أنت، أو هدفك بالإسبانية.',
    icon: '💬',
    trigger: (msg: string) => {
      const lower = msg.toLowerCase();
      const intros = ['llamo', 'soy de', 'mi nombre', 'aprender', 'vivo en', 'hola', 'buenas'];
      return intros.some(k => lower.includes(k));
    }
  },
  {
    id: 'quest_2',
    label_en: 'Past Tense Storyteller',
    desc_en: 'Use a past-tense verb to share a recent story or activity (e.g. "ayer", "fui", "comí", "hablé", "hice", "estudié").',
    label_ar: 'سرد أحداث الماضي',
    desc_ar: 'استخدم فعلاً في الماضي لتخبر معلمك عما فعلته مؤخراً.',
    icon: '⏳',
    trigger: (msg: string) => {
      const lower = msg.toLowerCase();
      const pastVerbs = ['fui', 'comí', 'hablé', 'hice', 'estudié', 'escribí', 'vi', 'compré', 'visité', 'viajé', 'ayer', 'anoche', 'pasado'];
      return pastVerbs.some(v => lower.includes(v));
    }
  },
  {
    id: 'quest_3',
    label_en: 'Cultural Inquiry',
    desc_en: 'Ask your tutor a question about local life, food, or tradition in their city (e.g. "qué comes", "cómo es", "te gusta").',
    label_ar: 'استفسار ثقافي',
    desc_ar: 'اسأل معلمك سؤالاً عن الحياة اليومية أو الطعام في مدينته.',
    icon: '🏛️',
    trigger: (msg: string) => {
      const lower = msg.toLowerCase();
      const keywords = ['cómo es', 'qué te gusta', 'comida', 'ciudad', 'cultura', 'tradición', 'recomiendas', '?'];
      return keywords.some(k => lower.includes(k));
    }
  },
  {
    id: 'quest_4',
    label_en: 'Expressing Preferences',
    desc_en: 'State your preference or opinion using key SLA expressions (e.g. "me gusta", "prefiero", "en mi opinión", "pienso que").',
    label_ar: 'التعبير عن التفضيل والرأي',
    desc_ar: 'عبّر عن رأيك أو فضولك باستخدام تعبيرات التفضيل.',
    icon: '🌟',
    trigger: (msg: string) => {
      const lower = msg.toLowerCase();
      const exprs = ['me gusta', 'prefiero', 'en mi opinión', 'pienso que', 'creo que', 'me encanta', 'para mí'];
      return exprs.some(e => lower.includes(e));
    }
  }
];

export const LingLooperGame: React.FC<LingLooperGameProps> = ({
  userProgress,
  setUserProgress
}) => {
  const [activePersonaId, setActivePersonaId] = useState<TutorPersonaId>('juan');
  const activePersona = PERSONAS.find(p => p.id === activePersonaId) || PERSONAS[0];

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'tutor',
      spanishText: activePersona.welcome_es,
      englishExplanation: activePersona.welcome_en,
      arabicExplanation: activePersona.welcome_ar,
      word_mappings: {
        'bienvenida': { en: 'welcome', ar: 'ترحيب', pos: 'noun', example: '¡Bienvenida a nuestra conversación!' },
        'cotidiana': { en: 'daily life', ar: 'الحياة اليومية', pos: 'adjective', example: 'Hablamos de la vida cotidiana.' }
      },
      tutor_mood: 'Encouraging',
      showTranslation: false,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const [inputVal, setInputVal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeQuestIdx, setActiveQuestIdx] = useState(0);
  const [completedQuests, setCompletedQuests] = useState<string[]>([]);
  const [audioSpeed, setAudioSpeed] = useState<number>(0.9);
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(false);
  const [isHandsFree, setIsHandsFree] = useState<boolean>(false);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [currentlyPlayingId, setCurrentlyPlayingId] = useState<string | null>(null);

  // Definition Modal / Drawer state
  const [selectedWordDetail, setSelectedWordDetail] = useState<{
    rawToken: string;
    cleanWord: string;
    lookup: WordDefinitionMatch;
    contextSentence: string;
    serverMapping?: { en: string; ar: string; pos?: string; example?: string };
  } | null>(null);

  const [savedLingQToast, setSavedLingQToast] = useState<string | null>(null);

  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  // Auto-scroll chat container to bottom (inner container only)
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  // When persona changes, append introductory greeting
  const handlePersonaChange = (newId: TutorPersonaId) => {
    setActivePersonaId(newId);
    const personaObj = PERSONAS.find(p => p.id === newId) || PERSONAS[0];
    soundEffects.playPop();

    const switchMsg: ChatMessage = {
      id: `switch-${Date.now()}`,
      sender: 'tutor',
      spanishText: personaObj.welcome_es,
      englishExplanation: personaObj.welcome_en,
      arabicExplanation: personaObj.welcome_ar,
      tutor_mood: 'Encouraging',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, switchMsg]);

    if (!isAudioMuted) {
      speakSpanish(personaObj.welcome_es, audioSpeed);
    }
  };

  // Speak AI message and trigger soundwave animation
  const handleSpeakTutorMessage = (msgId: string, text: string) => {
    setCurrentlyPlayingId(msgId);
    speakSpanish(text, audioSpeed);
    setTimeout(() => {
      setCurrentlyPlayingId(null);
    }, Math.max(2000, text.length * 60));
  };

  // Main message handler
  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputVal).trim();
    if (!text || isLoading) return;

    soundEffects.playPop();

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      spanishText: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputVal('');
    setIsLoading(true);

    // Evaluate quest fulfillment client-side as fallback
    const currentQuest = TUTORING_QUESTS[activeQuestIdx];
    if (currentQuest && currentQuest.trigger(text) && !completedQuests.includes(currentQuest.id)) {
      setCompletedQuests(prev => [...prev, currentQuest.id]);
      soundEffects.playLevelUp();
      setUserProgress(p => ({ ...p, xp: p.xp + 50 }));
      if (activeQuestIdx < TUTORING_QUESTS.length - 1) {
        setActiveQuestIdx(prev => prev + 1);
      }
    }

    try {
      const history = messages.map(m => ({
        role: m.sender === 'user' ? 'user' : 'model',
        text: m.spanishText
      }));

      const res = await fetch('/api/ai/linglooper', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history,
          userLevel: userProgress.currentLevel,
          nativeLang: userProgress.settings.nativeLanguage === 'ar' ? 'ar' : 'en',
          activeQuestId: currentQuest?.id,
          persona: activePersonaId
        })
      });

      if (!res.ok) throw new Error('AI Tutor server error');
      const data = await res.json();

      const tutorMsg: ChatMessage = {
        id: `tutor-${Date.now()}`,
        sender: 'tutor',
        spanishText: data.response_es,
        englishExplanation: data.response_en,
        arabicExplanation: data.response_ar,
        word_mappings: data.word_mappings,
        detected_user_mistake: data.detected_user_mistake,
        tutor_mood: data.tutor_mood || 'Encouraging',
        showTranslation: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, tutorMsg]);
      soundEffects.playCorrect();
      setUserProgress(prev => ({ ...prev, xp: prev.xp + 15 }));

      // Autoplay speech if not muted
      if (!isAudioMuted) {
        handleSpeakTutorMessage(tutorMsg.id, tutorMsg.spanishText);
      }

      // Check server quest completion
      if (data.mission_completed_id && !completedQuests.includes(data.mission_completed_id)) {
        setCompletedQuests(prev => [...prev, data.mission_completed_id]);
        soundEffects.playLevelUp();
      }

      // Hands-Free Mode: automatically listen after tutor response finishes
      if (isHandsFree) {
        setTimeout(() => {
          startSpeechRecognition();
        }, Math.max(3000, tutorMsg.spanishText.length * 60 + 1000));
      }

    } catch (e) {
      console.error(e);
      setMessages(prev => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: 'tutor',
          spanishText: 'Disculpa, tuve un pequeño parpadeo de conexión. ¿Podrías repetir tu respuesta?',
          englishExplanation: 'Apologies, I had a slight connection flicker. Could you repeat your response?',
          arabicExplanation: 'عذراً، حدث انقطاع بسيط في الاتصال. هل يمكنك إعادة إرسال رسالتك؟',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Web Speech API Recording
  const startSpeechRecognition = () => {
    if (typeof window === 'undefined') return;

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser. You can type in Spanish directly!');
      return;
    }

    try {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }

      const recognition = new SpeechRecognition();
      recognition.lang = activePersonaId === 'juan' || activePersonaId === 'elena' ? 'es-MX' : 'es-ES';
      recognition.continuous = false;
      recognition.interimResults = true;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join('');
        setInputVal(transcript);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (e) {
      console.warn('Speech recognition error:', e);
      setIsListening(false);
    }
  };

  const handleToggleMic = () => {
    if (isListening) {
      if (recognitionRef.current) recognitionRef.current.stop();
      setIsListening(false);
    } else {
      startSpeechRecognition();
    }
  };

  // Word Click Handler for Comprehensible Input Definition
  const handleWordClick = (rawToken: string, cleanWord: string, message: ChatMessage) => {
    if (!cleanWord || cleanWord.length < 2) return;

    soundEffects.playPop();
    const lookup = lookupSpanishWord(cleanWord);
    const serverMapping = message.word_mappings?.[cleanWord.toLowerCase()] || message.word_mappings?.[rawToken.toLowerCase()];

    setSelectedWordDetail({
      rawToken,
      cleanWord,
      lookup,
      contextSentence: message.spanishText,
      serverMapping
    });
  };

  // Add word to user progress LingQs / saved words
  const handleSaveLingQ = (cleanWord: string, enDef: string, arDef: string) => {
    const wordKey = cleanWord.toLowerCase();
    setUserProgress(prev => {
      const existingLingQs = prev.lingqs || {};
      const newLingQs = {
        ...existingLingQs,
        [wordKey]: {
          word: wordKey,
          status: 1 as const,
          translation_en: enDef,
          translation_ar: arDef,
          sentenceContext: selectedWordDetail?.contextSentence || '',
          createdAt: new Date().toISOString()
        }
      };

      const savedWordIds = prev.savedWordIds.includes(wordKey)
        ? prev.savedWordIds
        : [...prev.savedWordIds, wordKey];

      return {
        ...prev,
        lingqs: newLingQs,
        savedWordIds
      };
    });

    soundEffects.playLevelUp();
    setSavedLingQToast(`Saved "${cleanWord}" to your LingQs!`);
    setTimeout(() => setSavedLingQToast(null), 3000);
  };

  // Quick conversation prompts
  const quickPrompts = [
    { label: '☕ Pedir café en Oaxaca', prompt: '¡Hola Juan! Me gustaría pedir un café tradicional y un pan dulce en tu cafetería favorita.' },
    { label: '✈️ Indicaciones en la ciudad', prompt: '¿Cómo puedo llegar al centro histórico de la ciudad? ¿Está lejos de aquí?' },
    { label: '🌮 Comida típica local', prompt: '¿Cuál es tu plato tradicional preferido y qué ingredientes lleva?' },
    { label: '📆 Contar mi día ayer', prompt: 'Ayer estuve trabajando por la mañana y luego comí tacos de carne asada con amigos.' }
  ];

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      <AnimatePresence>
        {savedLingQToast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-5 right-5 z-50 bg-stone-900 text-amber-300 border border-amber-500/50 rounded-xl px-4 py-3 shadow-xl flex items-center gap-2 text-sm font-bold"
          >
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span>{savedLingQToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modern Studio Header */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 sm:p-6 text-stone-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-500 text-stone-950 uppercase tracking-wider flex items-center gap-1 shadow-xs">
                <span>{activePersona.flag}</span>
                <span>{activePersona.name}</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-stone-800 text-amber-300 border border-stone-700 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Live Native SLA Tutor
              </span>
              <span className="text-xs text-stone-400 font-medium">Level: {userProgress.currentLevel}</span>
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <span>Estudio de Tutoría & Inmersión Auditiva</span>
            </h1>
            <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-2xl leading-relaxed">
              {activePersona.role_en} • Tap any word for instant definitions, phonetics, and 1-click LingQ saving.
            </p>
          </div>

          {/* Persona Switcher & Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full lg:w-auto">
            {/* Audio & Hands Free Controls */}
            <div className="flex items-center gap-1.5 bg-stone-950/80 p-1.5 rounded-xl border border-stone-800 shrink-0">
              <button
                onClick={() => setIsAudioMuted(!isAudioMuted)}
                className={`p-2 rounded-lg text-xs font-bold transition ${
                  isAudioMuted
                    ? 'bg-stone-800 text-stone-400'
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                }`}
                title={isAudioMuted ? 'Audio Muted' : 'Audio Active'}
              >
                {isAudioMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>

              <select
                value={audioSpeed}
                onChange={e => setAudioSpeed(parseFloat(e.target.value))}
                className="bg-stone-800 text-stone-200 text-xs font-bold rounded-lg px-2 py-1.5 border border-stone-700 focus:outline-none"
                title="Audio Speed"
              >
                <option value={0.75}>0.75x Slow</option>
                <option value={0.9}>0.9x Natural</option>
                <option value={1.0}>1.0x Normal</option>
              </select>

              <button
                onClick={() => {
                  soundEffects.playPop();
                  setIsHandsFree(!isHandsFree);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                  isHandsFree
                    ? 'bg-emerald-500 text-stone-950 font-extrabold shadow-md'
                    : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                }`}
                title="Hands-Free Continuous Listening Mode"
              >
                <Headphones className="w-3.5 h-3.5" />
                <span>{isHandsFree ? 'Hands-Free ON' : 'Hands-Free'}</span>
              </button>
            </div>

            {/* Personas Selector */}
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
              {PERSONAS.map(p => (
                <button
                  key={p.id}
                  onClick={() => handlePersonaChange(p.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition shrink-0 border ${
                    activePersonaId === p.id
                      ? 'bg-amber-500 text-stone-950 border-amber-400 shadow-md font-extrabold'
                      : 'bg-stone-800 text-stone-300 border-stone-700 hover:bg-stone-700'
                  }`}
                >
                  <span className="text-base">{p.avatar}</span>
                  <span>{p.flag}</span>
                  <span className="hidden xl:inline">{p.name.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8 Cols: Interactive Chat & Voice Interface */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-sm overflow-hidden flex flex-col h-[640px]">
            {/* Quick Topic Prompts Bar */}
            <div className="bg-stone-50 dark:bg-stone-950 border-b border-stone-200 dark:border-stone-800 px-4 py-2.5 flex items-center justify-between overflow-x-auto no-scrollbar gap-2">
              <span className="text-[11px] font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Suggested Prompts:
              </span>
              <div className="flex items-center gap-1.5">
                {quickPrompts.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(p.prompt)}
                    className="px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 hover:bg-amber-50 dark:hover:bg-stone-700 hover:border-amber-300 transition"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Messages Stream */}
            <div ref={messagesContainerRef} className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-stone-50/50 dark:bg-stone-950/50">
              {messages.map(msg => {
                const isUser = msg.sender === 'user';
                const isPlayingThis = currentlyPlayingId === msg.id;

                return (
                  <div
                    key={msg.id}
                    className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    {!isUser && (
                      <div className="w-10 h-10 rounded-2xl bg-amber-500 text-stone-950 flex items-center justify-center font-bold text-lg shrink-0 shadow-xs border border-amber-400">
                        {activePersona.avatar}
                      </div>
                    )}

                    <div
                      className={`max-w-[88%] sm:max-w-[80%] rounded-2xl p-4 sm:p-5 shadow-xs space-y-3 ${
                        isUser
                          ? 'bg-stone-900 text-white rounded-tr-xs dark:bg-amber-500 dark:text-stone-950 font-medium'
                          : 'bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-stone-100 rounded-tl-xs'
                      }`}
                    >
                      {/* Tutor Header Info */}
                      {!isUser && (
                        <div className="flex items-center justify-between gap-2 border-b border-stone-100 dark:border-stone-800 pb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-extrabold text-xs text-stone-900 dark:text-stone-100">
                              {activePersona.name}
                            </span>
                            <span className="text-[10px] px-2 py-0.5 rounded-md font-bold bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300">
                              {msg.tutor_mood || 'Encouraging'}
                            </span>
                          </div>

                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleSpeakTutorMessage(msg.id, msg.spanishText)}
                              className={`p-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                                isPlayingThis
                                  ? 'bg-amber-500 text-stone-950 animate-pulse'
                                  : 'bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-amber-600 dark:text-amber-400'
                              }`}
                              title="Listen to Audio Pronunciation"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                              {isPlayingThis && (
                                <span className="flex items-center gap-0.5">
                                  <span className="w-1 h-3 bg-stone-950 animate-bounce" />
                                  <span className="w-1 h-3 bg-stone-950 animate-bounce delay-100" />
                                </span>
                              )}
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Interactive Tokenized Spanish Text */}
                      <div className="text-base sm:text-lg font-medium leading-relaxed tracking-normal">
                        {isUser ? (
                          <span>{msg.spanishText}</span>
                        ) : (
                          <div className="flex flex-wrap gap-x-1 gap-y-1.5 items-baseline">
                            {tokenizeText(msg.spanishText).map((token, tIdx) => {
                              if (!token.isWord) {
                                return <span key={tIdx} className="text-stone-600 dark:text-stone-400">{token.raw}</span>;
                              }

                              const isMapped = msg.word_mappings?.[token.clean.toLowerCase()];
                              const isSaved = userProgress.savedWordIds.includes(token.clean.toLowerCase());

                              return (
                                <button
                                  key={tIdx}
                                  onClick={() => handleWordClick(token.raw, token.clean, msg)}
                                  className={`px-1 py-0.5 rounded transition cursor-pointer font-medium ${
                                    isSaved
                                      ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-300 border-b-2 border-emerald-500 font-bold'
                                      : isMapped
                                      ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 border-b-2 border-amber-500 font-bold hover:bg-amber-200 dark:hover:bg-amber-900'
                                      : 'hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-900 dark:text-stone-100 border-b border-dashed border-stone-300 dark:border-stone-700'
                                  }`}
                                  title="Click for Meaning & Definition"
                                >
                                  {token.raw}
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>

                      {/* SLA Grammar & Error Feedback Card */}
                      {msg.detected_user_mistake && (
                        <div className="bg-amber-50/80 dark:bg-stone-950 border border-amber-200 dark:border-amber-900/50 rounded-xl p-3 text-xs space-y-2">
                          <div className="font-extrabold text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
                            <AlertCircle className="w-4 h-4 text-amber-500" />
                            <span>Retroalimentación Gramatical (SLA Feedback):</span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                            <div className="bg-rose-50 dark:bg-rose-950/40 p-2 rounded-lg border border-rose-200 dark:border-rose-900/40">
                              <span className="font-bold text-rose-800 dark:text-rose-300 block mb-0.5">🔴 Tu frase (Original):</span>
                              <span className="text-rose-900 dark:text-rose-200 font-medium">{msg.detected_user_mistake.original}</span>
                            </div>

                            <div className="bg-emerald-50 dark:bg-emerald-950/40 p-2 rounded-lg border border-emerald-200 dark:border-emerald-900/40">
                              <span className="font-bold text-emerald-800 dark:text-emerald-300 block mb-0.5">🟢 Forma Nativa (Correct):</span>
                              <span className="text-emerald-900 dark:text-emerald-200 font-bold">{msg.detected_user_mistake.corrected}</span>
                            </div>
                          </div>

                          <p className="text-stone-700 dark:text-stone-300 text-xs leading-relaxed font-medium">
                            💡 {msg.detected_user_mistake.explanation_en}
                          </p>
                          {msg.detected_user_mistake.explanation_ar && (
                            <p className="text-amber-900 dark:text-amber-200 text-xs font-arabic leading-relaxed" dir="rtl">
                              🇦🇪 {msg.detected_user_mistake.explanation_ar}
                            </p>
                          )}
                        </div>
                      )}

                      {/* Translations (English & Arabic) */}
                      {!isUser && (msg.englishExplanation || msg.arabicExplanation) && (
                        <div className="pt-2 border-t border-stone-100 dark:border-stone-800 space-y-1 text-xs text-stone-600 dark:text-stone-300">
                          {msg.englishExplanation && (
                            <p className="leading-relaxed">
                              <span className="font-bold text-stone-700 dark:text-stone-300 mr-1">🇬🇧 Meaning:</span>
                              {msg.englishExplanation}
                            </p>
                          )}
                          {msg.arabicExplanation && (
                            <p className="text-amber-900 dark:text-amber-300 font-arabic font-medium leading-relaxed" dir="rtl">
                              <span className="font-bold text-stone-700 dark:text-stone-300 ml-1">🇦🇪 المعنى:</span>
                              {msg.arabicExplanation}
                            </p>
                          )}
                        </div>
                      )}
                    </div>

                    {isUser && (
                      <div className="w-10 h-10 rounded-2xl bg-stone-800 text-amber-300 flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                        <User className="w-5 h-5" />
                      </div>
                    )}
                  </div>
                );
              })}

              {isLoading && (
                <div className="flex gap-3 items-center text-stone-500 text-xs font-semibold pl-2">
                  <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-500 flex items-center justify-center">
                    <Loader2 className="w-5 h-5 animate-spin" />
                  </div>
                  <span>{activePersona.name} is formulating a comprehensible response...</span>
                </div>
              )}
            </div>

            {/* Input & Voice Controls Bar */}
            <div className="p-3 sm:p-4 bg-white dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800 space-y-2">
              <form
                onSubmit={e => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                {/* Voice Mic Button */}
                <button
                  type="button"
                  onClick={handleToggleMic}
                  className={`p-3 rounded-xl transition flex items-center justify-center shrink-0 ${
                    isListening
                      ? 'bg-rose-500 text-white animate-pulse shadow-lg ring-4 ring-rose-500/30'
                      : 'bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300'
                  }`}
                  title={isListening ? 'Listening... Speak Spanish' : 'Click to Voice Chat in Spanish'}
                >
                  {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </button>

                <input
                  type="text"
                  placeholder={isListening ? 'Escuchando tu voz en español...' : `Escribe tu mensaje para ${activePersona.name}...`}
                  value={inputVal}
                  onChange={e => setInputVal(e.target.value)}
                  className="flex-1 px-4 py-3 bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 rounded-xl text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
                />

                <button
                  type="submit"
                  disabled={!inputVal.trim() || isLoading}
                  className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-stone-950 font-black text-sm transition flex items-center gap-1.5 shrink-0 shadow-md"
                >
                  <span>Send</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>

              {/* Status bar */}
              <div className="flex items-center justify-between text-[11px] text-stone-400 px-1">
                <span className="flex items-center gap-1">
                  <Info className="w-3 h-3 text-amber-500" />
                  Tap any Spanish word in conversation for instant definitions & LingQ saving.
                </span>
                {isListening && (
                  <span className="text-rose-400 font-bold animate-pulse flex items-center gap-1">
                    <Radio className="w-3 h-3" /> Micro-Recording Active
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right 4 Cols: Tutoring Quests & Saved LingQs */}
        <div className="lg:col-span-4 space-y-6">
          {/* Tutoring Quests Card */}
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-black text-stone-900 dark:text-stone-100 text-base flex items-center gap-2">
                  <span>Conversational Quests</span>
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  Real SLA communicative milestones (+50 XP)
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-black bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                {completedQuests.length} / {TUTORING_QUESTS.length} Done
              </span>
            </div>

            <div className="space-y-3">
              {TUTORING_QUESTS.map((quest, idx) => {
                const isCompleted = completedQuests.includes(quest.id);
                const isActive = activeQuestIdx === idx && !isCompleted;

                return (
                  <div
                    key={quest.id}
                    className={`p-3.5 rounded-xl border transition ${
                      isCompleted
                        ? 'bg-emerald-50/50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900/50'
                        : isActive
                        ? 'bg-amber-50/80 dark:bg-stone-800 border-amber-400 dark:border-amber-500 shadow-sm'
                        : 'bg-stone-50 dark:bg-stone-950 border-stone-200 dark:border-stone-800 opacity-70'
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <div className="text-lg shrink-0 mt-0.5">{quest.icon}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <h4 className="text-xs font-extrabold text-stone-900 dark:text-stone-100 truncate">
                            {quest.label_en}
                          </h4>
                          {isCompleted ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                          ) : (
                            <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 shrink-0">+50 XP</span>
                          )}
                        </div>
                        <p className="text-[11px] text-stone-600 dark:text-stone-400 mt-1 leading-relaxed">
                          {quest.desc_en}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Saved LingQs & Vocabulary Panel */}
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-black text-stone-900 dark:text-stone-100 text-base flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-amber-500" />
                  <span>Saved LingQs</span>
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  Words saved during tutor conversations
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                {userProgress.savedWordIds.length} Saved
              </span>
            </div>

            {userProgress.savedWordIds.length === 0 ? (
              <div className="p-6 text-center border-2 border-dashed border-stone-200 dark:border-stone-800 rounded-xl space-y-2">
                <BookmarkPlus className="w-8 h-8 text-stone-400 mx-auto" />
                <p className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                  Tap any word in the chat messages above to view definitions and save them to your library!
                </p>
              </div>
            ) : (
              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {userProgress.savedWordIds.slice(-8).reverse().map((word, idx) => {
                  const lingqData = userProgress.lingqs?.[word];
                  const lookup = lookupSpanishWord(word);

                  return (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 flex items-center justify-between text-xs"
                    >
                      <div>
                        <span className="font-extrabold text-stone-900 dark:text-stone-100 capitalize block text-sm">
                          {word}
                        </span>
                        <span className="text-stone-500 dark:text-stone-400 text-[11px]">
                          {lingqData?.translation_en || lookup.translation_en || 'Saved Spanish Term'}
                        </span>
                      </div>
                      <button
                        onClick={() => speakSpanish(word, audioSpeed)}
                        className="p-1.5 rounded-lg bg-stone-200 dark:bg-stone-800 text-amber-600 dark:text-amber-400 hover:bg-amber-100 transition"
                        title="Listen"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Interactive Comprehensible Input Definition Drawer / Modal */}
      <AnimatePresence>
        {selectedWordDetail && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5"
            >
              <div className="flex items-start justify-between border-b border-stone-100 dark:border-stone-800 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-black text-stone-900 dark:text-stone-100 capitalize">
                      {selectedWordDetail.cleanWord}
                    </span>
                    {selectedWordDetail.lookup.partOfSpeech && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 uppercase">
                        {selectedWordDetail.lookup.partOfSpeech}
                      </span>
                    )}
                  </div>
                  {selectedWordDetail.lookup.phonetic && (
                    <span className="text-xs text-stone-500 dark:text-stone-400 font-mono">
                      /{selectedWordDetail.lookup.phonetic}/
                    </span>
                  )}
                </div>

                <button
                  onClick={() => speakSpanish(selectedWordDetail.cleanWord, audioSpeed)}
                  className="p-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold transition shadow-xs"
                  title="Listen to Word"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>

              {/* Meanings */}
              <div className="space-y-3 text-sm">
                <div className="bg-stone-50 dark:bg-stone-950 p-3.5 rounded-xl border border-stone-200 dark:border-stone-800 space-y-1">
                  <span className="text-xs font-bold text-stone-400 block">English Definition:</span>
                  <span className="font-extrabold text-stone-900 dark:text-stone-100 text-base">
                    🇬🇧 {selectedWordDetail.serverMapping?.en || selectedWordDetail.lookup.translation_en || 'Definition available'}
                  </span>
                </div>

                <div className="bg-amber-50/60 dark:bg-stone-950 p-3.5 rounded-xl border border-amber-200 dark:border-amber-900/40 space-y-1 text-right" dir="rtl">
                  <span className="text-xs font-bold text-amber-700 dark:text-amber-400 block font-arabic">الترجمة العربية:</span>
                  <span className="font-extrabold text-amber-950 dark:text-amber-200 text-base font-arabic">
                    🇦🇪 {selectedWordDetail.serverMapping?.ar || selectedWordDetail.lookup.translation_ar || 'التعريف متوفر'}
                  </span>
                </div>

                {selectedWordDetail.lookup.verbInfinitive && (
                  <div className="text-xs text-stone-600 dark:text-stone-400">
                    <span className="font-bold text-stone-800 dark:text-stone-200">Root Infinitive:</span> {selectedWordDetail.lookup.verbInfinitive}
                  </div>
                )}

                {(selectedWordDetail.serverMapping?.example || selectedWordDetail.lookup.examples?.[0]?.es) && (
                  <div className="text-xs bg-stone-100 dark:bg-stone-800/60 p-3 rounded-xl space-y-1">
                    <span className="font-bold text-stone-700 dark:text-stone-300 block">Example Sentence:</span>
                    <p className="italic text-stone-900 dark:text-stone-100">
                      "{selectedWordDetail.serverMapping?.example || selectedWordDetail.lookup.examples?.[0]?.es}"
                    </p>
                  </div>
                )}
              </div>

              {/* Modal Actions */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => {
                    const en = selectedWordDetail.serverMapping?.en || selectedWordDetail.lookup.definition_en;
                    const ar = selectedWordDetail.serverMapping?.ar || selectedWordDetail.lookup.definition_ar;
                    handleSaveLingQ(selectedWordDetail.cleanWord, en, ar);
                    setSelectedWordDetail(null);
                  }}
                  className="flex-1 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-sm transition flex items-center justify-center gap-2 shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span>Save to My LingQs</span>
                </button>

                <button
                  onClick={() => setSelectedWordDetail(null)}
                  className="py-3 px-4 rounded-xl bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-bold text-sm hover:bg-stone-300 dark:hover:bg-stone-700 transition"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
