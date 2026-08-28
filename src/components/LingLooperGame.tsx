import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Palette,
  MessageSquare,
  Sparkles,
  Award,
  Flame,
  Volume2,
  VolumeX,
  Eye,
  EyeOff,
  Send,
  RefreshCw,
  X,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  BrainCircuit,
  ArrowRight,
  BookmarkPlus,
  Play,
  Heart,
  Brush,
  RotateCcw
} from 'lucide-react';
import { UserProgress } from '../types';
import { soundEffects, speakSpanish } from '../utils/audio';

interface LingLooperGameProps {
  userProgress: UserProgress;
  setUserProgress: React.Dispatch<React.SetStateAction<UserProgress>>;
}

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  response_en?: string;
  response_ar?: string;
  word_mappings?: Record<string, { en: string; ar: string }>;
  detected_user_mistake?: {
    original: string;
    corrected: string;
    explanation_en: string;
    explanation_ar: string;
  } | null;
  sara_mood?: string;
  showTranslation?: boolean;
}

interface PaletteWord {
  word: string;
  en: string;
  ar: string;
  isFlipped?: boolean;
}

interface PaintPigment {
  id: string;
  name: string;
  colorCode: string;
  unlocked: boolean;
  hex: string;
}

const QUESTS = [
  {
    id: 'quest_1',
    label_en: 'The Base Sketch',
    desc_en: 'Introduce yourself and state your favorite color in Spanish (e.g. use words like: me llamo, soy, color, azul, verde, rojo).',
    label_ar: 'الرسمة الأولية',
    desc_ar: 'عرّف عن نفسك واذكر لونك المفضل بالإسبانية.',
    trigger: (msg: string) => {
      const lower = msg.toLowerCase();
      const colors = ['azul', 'rojo', 'verde', 'amarillo', 'blanco', 'negro', 'gris', 'rosa', 'morado', 'naranja', 'marrón', 'cafe', 'turquesa'];
      const hasColor = colors.some(c => lower.includes(c));
      const hasIntro = lower.includes('soy') || lower.includes('llamo') || lower.includes('mi nombre');
      return hasColor && hasIntro;
    }
  },
  {
    id: 'quest_2',
    label_en: 'Shading Details',
    desc_en: 'Use a past-tense verb or describe your day yesterday (e.g. use words like: ayer, comí, fui, pinté, hablé, hice, compré).',
    label_ar: 'تظليل التفاصيل',
    desc_ar: 'استخدم فعلاً في الماضي لتخبر خوان عما فعلته أمس.',
    trigger: (msg: string) => {
      const lower = msg.toLowerCase();
      const pastVerbs = ['pinté', 'hablé', 'fui', 'hice', 'comí', 'trabajé', 'estudié', 'escribí', 'leí', 'vi', 'compré', 'visité', 'viajé', 'ayer'];
      return pastVerbs.some(v => lower.includes(v));
    }
  },
  {
    id: 'quest_3',
    label_en: 'Mixing Palettes',
    desc_en: 'Ask Juan about his canvas size or his current art frame (e.g. use words like: tamaño, lienzo, medir, metro, grande).',
    label_ar: 'خلط الألوان',
    desc_ar: 'اسأل خوان عن حجم لوحته القماشية الحالية.',
    trigger: (msg: string) => {
      const lower = msg.toLowerCase();
      const keywords = ['tamaño', 'lienzo', 'metro', 'grande', 'cuánto mide', 'medidas', 'dimensiones', 'cuadro'];
      const isQuestion = lower.includes('?') || lower.includes('qué') || lower.includes('cómo') || lower.includes('cuál') || lower.includes('cuánto') || lower.includes('donde');
      return isQuestion && keywords.some(k => lower.includes(k));
    }
  }
];

export const LingLooperGame: React.FC<LingLooperGameProps> = ({
  userProgress,
  setUserProgress
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'model',
      text: '¡Hola! Soy Juan. Bienvenido a mi taller de arte en Oaxaca. Hoy el cielo tiene un color azul cobalto precioso. Me inspira a pintar un gran mural. ¿Cómo te llamas y cuál es tu color favorito?',
      response_en: 'Hello! I am Juan. Welcome to my art studio in Oaxaca. Today the sky has a beautiful cobalt blue color. It inspires me to paint a large mural. What is your name and what is your favorite color?',
      response_ar: 'مرحباً! أنا خوان. مرحباً بك في مرسمي الفني في أواخاكا. اليوم السماء لها لون أزرق كوبالتي رائع. يلهمني هذا لرسم لوحة جدارية كبيرة. ما اسمك وما هو لونك المفضل؟',
      word_mappings: {
        'cielo': { en: 'sky', ar: 'سماء' },
        'mural': { en: 'mural', ar: 'جدارية' },
        'pintar': { en: 'to paint', ar: 'يرسم' }
      },
      sara_mood: '🎨 Painting Mood',
      showTranslation: false
    }
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeQuestIdx, setActiveQuestIdx] = useState(0);
  const [completedQuests, setCompletedQuests] = useState<string[]>([]);
  const [palette, setPalette] = useState<PaletteWord[]>([]);
  const [showTooltipWord, setShowTooltipWord] = useState<{ text: string; en: string; ar: string; x: number; y: number } | null>(null);
  const [isAudioMuted, setIsAudioMuted] = useState(false);

  // Gamified Painter elements
  const [pigments, setPigments] = useState<PaintPigment[]>([
    { id: 'pig_1', name: 'Oaxaca Marigold', colorCode: 'text-amber-500 bg-amber-500', hex: '#F59E0B', unlocked: true },
    { id: 'pig_2', name: 'Maya Blue', colorCode: 'text-sky-500 bg-sky-500', hex: '#0EA5E9', unlocked: false },
    { id: 'pig_3', name: 'Cactus Green', colorCode: 'text-emerald-500 bg-emerald-500', hex: '#10B981', unlocked: false },
    { id: 'pig_4', name: 'Clay Terracotta', colorCode: 'text-orange-600 bg-orange-600', hex: '#EA580C', unlocked: false },
    { id: 'pig_5', name: 'Cozumel Teal', colorCode: 'text-teal-500 bg-teal-500', hex: '#14B8A6', unlocked: false }
  ]);
  const [canvasSplashes, setCanvasSplashes] = useState<{ x: number; y: number; color: string; size: number }[]>([]);
  const [activeBrushColor, setActiveBrushColor] = useState('#F59E0B');

  // Spelling assessment mode
  const [isSpellingTestOpen, setIsSpellingTestOpen] = useState(false);
  const [testScore, setTestScore] = useState(0);
  const [activeTestIdx, setActiveTestIdx] = useState(0);
  const [activeTestAnswer, setActiveTestAnswer] = useState('');
  const [testResult, setTestResult] = useState<'correct' | 'incorrect' | null>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const languageMode = userProgress.settings.nativeLanguage;

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    if (!isAudioMuted) {
      speakSpanish(messages[0].text, 0.85);
    }
  }, []);

  const triggerCanvasSplash = (colorHex: string) => {
    const x = Math.floor(Math.random() * 80) + 10; // % distance
    const y = Math.floor(Math.random() * 80) + 10;
    const size = Math.floor(Math.random() * 25) + 12; // px size
    setCanvasSplashes(prev => [...prev, { x, y, color: colorHex, size }]);
  };

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || input;
    if (!textToSend.trim() || isLoading) return;

    soundEffects.playPop();
    triggerCanvasSplash(activeBrushColor);

    const userMsgId = Date.now().toString();
    const userMsg: Message = {
      id: userMsgId,
      role: 'user',
      text: textToSend
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const activeQuest = QUESTS[activeQuestIdx];
    const isQuestFulfilled = activeQuest && activeQuest.trigger(textToSend);

    const historyPayload = messages.map(m => ({
      role: m.role,
      content: m.text
    }));

    try {
      const response = await fetch('/api/ai/linglooper', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          history: historyPayload,
          userLevel: userProgress.currentLevel,
          nativeLang: languageMode === 'ar' ? 'ar' : 'en',
          activeQuestId: activeQuest?.id
        })
      });

      if (!response.ok) throw new Error('API request failed');
      const data = await response.json();

      const newModelMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: data.response_es,
        response_en: data.response_en,
        response_ar: data.response_ar,
        word_mappings: data.word_mappings,
        detected_user_mistake: data.detected_user_mistake,
        sara_mood: data.sara_mood,
        showTranslation: false
      };

      setMessages(prev => [...prev, newModelMsg]);

      // Speak in female Mexican voice
      if (!isAudioMuted) {
        speakSpanish(data.response_es, 0.85);
      }

      // Check for mission progression & pigment unlock
      if (isQuestFulfilled || data.mission_completed_id === activeQuest?.id) {
        if (!completedQuests.includes(activeQuest.id)) {
          setCompletedQuests(prev => [...prev, activeQuest.id]);
          soundEffects.playLevelUp();

          // Unlock corresponding pigment
          setPigments(prev => {
            const nextIdx = completedQuests.length + 1;
            return prev.map((pig, pIdx) => {
              if (pIdx === nextIdx) {
                setActiveBrushColor(pig.hex);
                return { ...pig, unlocked: true };
              }
              return pig;
            });
          });

          // Reward XP
          setUserProgress(prev => ({
            ...prev,
            xp: prev.xp + 20
          }));

          if (activeQuestIdx < QUESTS.length - 1) {
            setTimeout(() => {
              setActiveQuestIdx(prev => prev + 1);
            }, 3000);
          }
        }
      }

    } catch (err) {
      console.warn('LingLooper call failed, utilizing high-fidelity sandbox route', err);
      // Sandbox fallback implementation
      setTimeout(() => {
        const fallbackTurnIdx = Math.min(messages.filter(m => m.role === 'model').length, 4);
        const turnResponses = [
          {
            response_es: "¡Hola! Soy Sara. Bienvenido a mi taller de arte en Oaxaca. Hoy el cielo tiene un color azul cobalto precioso. Me inspira a pintar un gran mural. ¿Cómo te llamas y cuál es tu color favorito?",
            response_en: "Hello! I am Sara. Welcome to my art studio in Oaxaca. Today the sky has a beautiful cobalt blue color. It inspires me to paint a large mural. What is your name and what is your favorite color?",
            response_ar: "مرحباً! أنا سارة. مرحباً بك في مرسمي الفني في أواخاكا. اليوم السماء لها لون أزرق كوبالتي رائع. يلهمني هذا لرسم لوحة جدارية كبيرة. ما اسمك وما هو لونك المفضل؟",
            word_mappings: {
              "cielo": { "en": "sky", "ar": "سماء" },
              "mural": { "en": "mural", "ar": "جدارية" }
            },
            sara_mood: "🎨 Painting Mood"
          },
          {
            response_es: "¡Qué bonito! Ese color es como una pincelada de luz en nuestro lienzo. Ayer pinté un paisaje nocturno muy especial en Oaxaca. Cuéntame, ¿qué hiciste tú ayer?",
            response_en: "Beautiful! That color is like a brushstroke of light on our canvas. Yesterday I painted a very special night landscape in Oaxaca. Tell me, what did you do yesterday?",
            response_ar: "رائع جداً! هذا اللون يشبه ضربة فرشاة من الضوء على قماشتنا. بالأمس رسمت لوحة ليلية خاصة جداً في أواخاكا. أخبرني، ماذا فعلت بالأمس؟",
            word_mappings: {
              "pincelada": { "en": "brushstroke", "ar": "ضربة فرشاة" },
              "paisaje": { "en": "landscape", "ar": "لوحة طبيعية" }
            },
            sara_mood: "🌟 Inspired!"
          },
          {
            response_es: "¡Eso suena maravilloso! Cada día de nuestra vida es un lienzo en blanco. Por cierto, estoy preparando un nuevo cuadro y tengo pinceles de todos los tamaños. ¿Quieres saber de qué tamaño es mi lienzo actual?",
            response_en: "That sounds wonderful! Every day of our life is a blank canvas. By the way, I am preparing a new painting and I have brushes of all sizes. Do you want to know what size my current canvas is?",
            response_ar: "هذا يبدو رائعاً! كل يوم من حياتنا هو قماش فارغ. بالمناسبة، أنا أعد لوحة جديدة ولدي فرش من جميع الأحجام. هل تريد أن تعرف حجم لوحتي القماشية الحالية؟",
            word_mappings: {
              "lienzo": { "en": "canvas", "ar": "قماش الرسم" }
            },
            sara_mood: "☕ Taking a Coffee Break"
          },
          {
            response_es: "¡Ah! Mi lienzo actual es enorme, mide dos metros. Es para un mural de flores de cempasúchil en Oaxaca. Pintar flores me llena de alegría. ¿Qué cosas te traen alegría a ti?",
            response_en: "Ah! My current canvas is huge, measuring two meters. It is for a mural of marigold flowers in Oaxaca. Painting flowers fills me with joy. What things bring joy to you?",
            response_ar: "آه! لوحتي الحالية ضخمة، يبلغ مقاسها مترين. إنها لجدارية من زهور القطيفة (الماريجولد) في أواخاكا. رسم الزهور يملأني بالفرح. ما الذي يجلب لك الفرح؟",
            word_mappings: {
              "enorme": { "en": "huge", "ar": "ضخم" }
            },
            sara_mood: "Excited"
          },
          {
            response_es: "¡Qué inspiración! Tus palabras son colores hermosos en mi paleta. Hemos pintado una conversación maravillosa hoy. ¡Sigamos practicando y creando juntos!",
            response_en: "What inspiration! Your words are beautiful colors on my palette. We have painted a wonderful conversation today. Let's keep practicing and creating together!",
            response_ar: "يا له من إلهام! كلماتك هي ألوان جميلة على لوحة ألواني. لقد رسمنا محادثة رائعة اليوم. لنواصل التدرب والإبداع معاً!",
            word_mappings: {
              "paleta": { "en": "palette", "ar": "لوحة ألوان" }
            },
            sara_mood: "🌟 Inspired!"
          }
        ];

        const activeTurn = turnResponses[fallbackTurnIdx];

        // Custom mistakes check
        let detected_user_mistake: any = null;
        const lower = textToSend.toLowerCase();
        if (lower.includes("la sol") || lower.includes("la cielo") || lower.includes("yo gusta")) {
          if (lower.includes("la sol")) {
            detected_user_mistake = {
              original: "la sol",
              corrected: "el sol",
              explanation_en: "Just like balancing warm and cool tones, we must balance grammatical genders! 'Sol' is masculine, so it pairs with 'el'. Let's keep our brushstrokes clean!",
              explanation_ar: "تماماً مثل موازنة الدرجات الدافئة والباردة، يجب أن نوازن بين الأجناس النحوية! كلمة 'Sol' مذكرة، لذا تقترن بـ 'el'."
            };
          } else if (lower.includes("la cielo")) {
            detected_user_mistake = {
              original: "la cielo",
              corrected: "el cielo",
              explanation_en: "In Spanish, 'cielo' is masculine, so we mix it with 'el' instead of 'la' to get the perfect grammatical blend!",
              explanation_ar: "في الإسبانية، كلمة 'cielo' مذكرة، لذا نمزجها مع 'el' بدلاً من 'la' للحصول على المزيج النحوي المثالي!"
            };
          } else if (lower.includes("yo gusta")) {
            detected_user_mistake = {
              original: "yo gusta",
              corrected: "me gusta",
              explanation_en: "In Spanish, we express liking through affection! Instead of 'yo gusta', use 'me gusta' to say 'it pleases me'.",
              explanation_ar: "في الإسبانية، نعبر عن الإعجاب باستخدام الضمير المفعول به! بدلاً من 'yo gusta'، استخدم 'me gusta' لتقول 'يعجبني'."
            };
          }
        }

        const fallbackMsg: Message = {
          id: (Date.now() + 1).toString(),
          role: 'model',
          text: activeTurn.response_es,
          response_en: activeTurn.response_en,
          response_ar: activeTurn.response_ar,
          word_mappings: activeTurn.word_mappings,
          detected_user_mistake,
          sara_mood: activeTurn.sara_mood,
          showTranslation: false
        };

        setMessages(prev => [...prev, fallbackMsg]);
        if (!isAudioMuted) {
          speakSpanish(activeTurn.response_es, 0.85);
        }

        if (isQuestFulfilled) {
          if (!completedQuests.includes(activeQuest.id)) {
            setCompletedQuests(prev => [...prev, activeQuest.id]);
            soundEffects.playLevelUp();

            // Unlock corresponding pigment
            setPigments(prev => {
              const nextIdx = completedQuests.length + 1;
              return prev.map((pig, pIdx) => {
                if (pIdx === nextIdx) {
                  setActiveBrushColor(pig.hex);
                  return { ...pig, unlocked: true };
                }
                return pig;
              });
            });

            setUserProgress(prev => ({ ...prev, xp: prev.xp + 20 }));
            if (activeQuestIdx < QUESTS.length - 1) {
              setTimeout(() => {
                setActiveQuestIdx(prev => prev + 1);
              }, 3000);
            }
          }
        }
      }, 1000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWordClick = (word: string, mapping: { en: string; ar: string } | undefined, e: React.MouseEvent) => {
    e.stopPropagation();
    soundEffects.playPop();
    const cleanWord = word.replace(/[^a-zA-ZáéíóúüñÁÉÍÓÚÜÑ]/g, '').toLowerCase();
    const wordEn = mapping?.en || 'Word';
    const wordAr = mapping?.ar || 'كلمة';

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const parentRect = (e.currentTarget as HTMLElement).offsetParent?.getBoundingClientRect();

    setShowTooltipWord({
      text: cleanWord,
      en: wordEn,
      ar: wordAr,
      x: rect.left - (parentRect?.left || 0) + rect.width / 2,
      y: rect.top - (parentRect?.top || 0) - 80
    });
  };

  const addToPalette = (word: string, en: string, ar: string) => {
    soundEffects.playPop();
    if (!palette.some(p => p.word === word)) {
      setPalette(prev => [...prev, { word, en, ar, isFlipped: false }]);
      setUserProgress(prev => {
        const updatedWords = prev.savedWordIds.includes(word)
          ? prev.savedWordIds
          : [...prev.savedWordIds, word];
        return { ...prev, savedWordIds: updatedWords };
      });
    }
    setShowTooltipWord(null);
  };

  const toggleSentenceTranslation = (id: string) => {
    soundEffects.playFlip();
    setMessages(prev =>
      prev.map(m => (m.id === id ? { ...m, showTranslation: !m.showTranslation } : m))
    );
  };

  const handleResetSession = () => {
    soundEffects.playPop();
    setCanvasSplashes([]);
    setMessages([
      {
        id: 'welcome',
        role: 'model',
        text: '¡Hola! Soy Juan. Bienvenido a mi taller de arte en Oaxaca. Hoy el cielo tiene un color azul cobalto precioso. Me inspira a pintar un gran mural. ¿Cómo te llamas y cuál es tu color favorito?',
        response_en: 'Hello! I am Juan. Welcome to my art studio in Oaxaca. Today the sky has a beautiful cobalt blue color. It inspires me to paint a large mural. What is your name and what is your favorite color?',
        response_ar: 'مرحباً! أنا خوان. مرحباً بك في مرسمي الفني في أواخاكا. اليوم السماء لها لون أزرق كوبالتي رائع. يلهمني هذا لرسم لوحة جدارية كبيرة. ما اسمك وما هو لونك المفضل؟',
        word_mappings: {
          'cielo': { en: 'sky', ar: 'سماء' },
          'mural': { en: 'mural', ar: 'جدارية' },
          'pintar': { en: 'to paint', ar: 'يرسم' }
        },
        sara_mood: '🎨 Painting Mood',
        showTranslation: false
      }
    ]);
    setInput('');
    setActiveQuestIdx(0);
    setCompletedQuests([]);
    setPigments(prev => prev.map((pig, pIdx) => pIdx === 0 ? { ...pig, unlocked: true } : { ...pig, unlocked: false }));
    setActiveBrushColor('#F59E0B');
  };

  const getSuggestions = () => {
    if (activeQuestIdx === 0) {
      return [
        'Hola Juan, me llamo Carlos y mi color favorito es el rojo.',
        '¡Hola! Soy Amina y me gusta el color azul marino.',
        'Buenas tardes, mi nombre es Leila y me encanta el verde.'
      ];
    }
    if (activeQuestIdx === 1) {
      return [
        'Ayer fui a una galería de arte hermosa y comí tacos.',
        'Ayer trabajé duro y luego pinté flores en mi jardín.',
        'Ayer caminé por la playa bajo el cielo estrellado.'
      ];
    }
    return [
      '¿De qué tamaño es tu lienzo de Oaxaca?',
      '¿Qué dimensiones tiene tu cuadro de flores de cempasúchil?',
      '¿Pintas con un lienzo gigante de dos metros?'
    ];
  };

  const startSpellingTest = () => {
    if (palette.length === 0) return;
    soundEffects.playPop();
    setIsSpellingTestOpen(true);
    setTestScore(0);
    setActiveTestIdx(0);
    setActiveTestAnswer('');
    setTestResult(null);
  };

  const handleCheckSpelling = () => {
    const activeWord = palette[activeTestIdx];
    const cleanAnswer = activeTestAnswer.trim().toLowerCase();
    const cleanTarget = activeWord.word.toLowerCase();

    if (cleanAnswer === cleanTarget) {
      soundEffects.playCorrect();
      setTestResult('correct');
      setTestScore(prev => prev + 1);
    } else {
      soundEffects.playIncorrect();
      setTestResult('incorrect');
    }
  };

  const handleNextSpellingWord = () => {
    soundEffects.playPop();
    setTestResult(null);
    setActiveTestAnswer('');
    if (activeTestIdx < palette.length - 1) {
      setActiveTestIdx(prev => prev + 1);
    } else {
      setIsSpellingTestOpen(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full max-w-7xl mx-auto min-h-[calc(100vh-14rem)] select-none">
      
      {/* LEFT COLUMN: Main Chat & Art Canvas */}
      <div className="flex-1 flex flex-col bg-[#FDFBF7] dark:bg-[#151413] rounded-3xl border border-stone-200 dark:border-stone-800 shadow-xl overflow-hidden relative">
        
        {/* CHAT HUD HEADER */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 border-b border-stone-200 dark:border-stone-800 bg-[#FAF7F0] dark:bg-[#1C1B19]/90">
          
          {/* Juan Interactive Profile with painted avatar look */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl overflow-hidden bg-gradient-to-tr from-amber-400 via-orange-500 to-rose-600 p-0.5 shadow-lg flex-shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200"
                  alt="Juan Oaxaca Painter"
                  className="w-full h-full object-cover rounded-xl border border-amber-200/20"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="absolute -bottom-1 -right-1 flex h-4.5 w-4.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4.5 w-4.5 bg-emerald-500 border-2 border-[#FDFBF7] dark:border-[#151413]"></span>
              </span>
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm text-stone-900 dark:text-stone-100 font-sans tracking-tight">
                  Juan from Mexico 🇲🇽
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black tracking-wide bg-[#D97706]/10 text-[#D97706] dark:bg-[#D97706]/20 dark:text-amber-400">
                  {messages[messages.length - 1]?.sara_mood || '🎨 Painting Mood'}
                </span>
              </div>
              <p className="text-[11px] font-medium text-stone-500 dark:text-stone-400">
                Oaxaca Studio • Interactive Spanish Voice Active
              </p>
            </div>
          </div>

          {/* Gamification Stats HUD */}
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-1 px-3 py-1.5 rounded-2xl bg-amber-500/10 dark:bg-amber-500/20 border border-amber-500/20 text-xs font-black text-amber-700 dark:text-amber-400">
              <Flame className="w-4 h-4 text-amber-500 animate-bounce" />
              <span>{userProgress.streakDays || 1}d Streak</span>
            </div>

            <div className="flex items-center gap-1 px-3 py-1.5 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/20 text-xs font-black text-emerald-700 dark:text-emerald-400">
              <Award className="w-4 h-4 text-emerald-500" />
              <span>{userProgress.xp} XP</span>
            </div>

            <button
              onClick={handleResetSession}
              className="p-2.5 rounded-2xl bg-stone-100 hover:bg-stone-200 dark:bg-stone-900 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 transition"
              title="Reset Conversational Canvas"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* INTERACTIVE CHAT ENGINE */}
        <div
          className="flex-1 p-6 overflow-y-auto space-y-6 relative min-h-[300px] max-h-[460px]"
          onClick={() => setShowTooltipWord(null)}
        >
          <AnimatePresence initial={false}>
            {messages.map((msg) => {
              const isModel = msg.role === 'model';
              return (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className={`flex ${isModel ? 'justify-start' : 'justify-end'} w-full items-start gap-3`}
                >
                  {isModel && (
                    <div className="w-9 h-9 rounded-xl overflow-hidden bg-gradient-to-tr from-amber-400 to-rose-600 p-0.5 flex-shrink-0 shadow-md mt-1">
                      <img
                        src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200"
                        alt="Juan"
                        className="w-full h-full object-cover rounded-lg"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}

                  <div className="flex flex-col gap-1 max-w-[85%] sm:max-w-[70%]">
                    
                    {/* Message Bubble */}
                    <div
                      className={`relative p-4 rounded-3xl text-sm font-medium tracking-tight leading-relaxed shadow-sm transition-all duration-200 ${
                        isModel
                          ? 'bg-stone-100 dark:bg-stone-900 text-stone-900 dark:text-stone-100 border border-stone-200 dark:border-stone-800 rounded-tl-sm'
                          : 'bg-gradient-to-br from-[#D97706] to-[#F59E0B] text-stone-950 border border-[#D97706]/20 rounded-tr-sm font-semibold'
                      }`}
                    >
                      {isModel ? (
                        <div className="flex flex-wrap gap-x-1 gap-y-1.5">
                          {msg.text.split(' ').map((word, wordIdx) => {
                            const clean = word.replace(/[^a-zA-ZáéíóúüñÁÉÍÓÚÜÑ]/g, '').toLowerCase();
                            const hasMapping = msg.word_mappings && msg.word_mappings[clean];
                            return (
                              <motion.span
                                key={wordIdx}
                                whileHover={{ scale: 1.05 }}
                                onClick={(e) => hasMapping ? handleWordClick(clean, msg.word_mappings?.[clean], e) : null}
                                className={`cursor-pointer px-1 py-0.5 rounded-lg transition-all ${
                                  hasMapping
                                    ? 'bg-amber-500/15 dark:bg-amber-500/35 border-b-2 border-amber-500/60 font-black text-[#D97706] dark:text-amber-400'
                                    : 'hover:bg-stone-200 dark:hover:bg-stone-800'
                                }`}
                              >
                                {word}
                              </motion.span>
                            );
                          })}
                        </div>
                      ) : (
                        <span>{msg.text}</span>
                      )}

                      {/* Bubble quick triggers */}
                      {isModel && (
                        <div className="flex items-center gap-2 mt-3.5 pt-2 border-t border-stone-200 dark:border-stone-800/60 justify-between">
                          <button
                            onClick={() => speakSpanish(msg.text, 0.85)}
                            className="flex items-center gap-1 text-xs text-[#D97706] hover:text-amber-600 transition font-black"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                            <span>Escuchar (Female voice)</span>
                          </button>

                          <button
                            onClick={() => toggleSentenceTranslation(msg.id)}
                            className="flex items-center gap-1 text-xs text-stone-500 hover:text-stone-700 dark:hover:text-stone-300 transition"
                          >
                            {msg.showTranslation ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                            <span>Traducción</span>
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Translations block */}
                    <AnimatePresence>
                      {isModel && msg.showTranslation && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden bg-[#FAF7F0] dark:bg-[#1C1B19]/70 rounded-2xl border border-stone-200/60 dark:border-stone-800/50 p-3 mt-1.5 space-y-1.5"
                        >
                          {msg.response_en && (
                            <div className="flex items-start gap-1.5 text-xs text-stone-600 dark:text-stone-300">
                              <span className="font-bold">🇬🇧</span>
                              <p className="italic leading-relaxed">{msg.response_en}</p>
                            </div>
                          )}
                          {msg.response_ar && (
                            <div className="flex items-start gap-1.5 text-xs text-stone-600 dark:text-stone-300 justify-end text-right">
                              <p className="italic leading-relaxed font-arabic" dir="rtl">{msg.response_ar}</p>
                              <span className="font-bold">🇦🇪</span>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Canvas Correction banner */}
                    {isModel && msg.detected_user_mistake && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3 bg-rose-500/10 dark:bg-rose-500/20 border border-rose-500/20 rounded-2xl mt-2 flex flex-col gap-1.5"
                      >
                        <div className="flex items-center gap-1.5 text-rose-600 dark:text-rose-400 font-extrabold text-xs">
                          <AlertCircle className="w-4 h-4" />
                          <span>Pincelada Corregida (Brushstroke Correction)</span>
                        </div>
                        <div className="flex flex-col gap-0.5 pl-1.5">
                          <p className="text-xs line-through text-stone-500 dark:text-stone-400 font-mono">
                            ❌ {msg.detected_user_mistake.original}
                          </p>
                          <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                            ✅ {msg.detected_user_mistake.corrected}
                          </p>
                        </div>
                        <p className="text-[11px] leading-relaxed text-stone-600 dark:text-stone-300 font-medium italic pl-1.5 pt-1 border-t border-rose-500/10">
                          {msg.detected_user_mistake.explanation_en}
                        </p>
                        {msg.detected_user_mistake.explanation_ar && (
                          <p className="text-[11px] leading-relaxed text-stone-600 dark:text-stone-300 font-medium italic pl-1.5 text-right font-arabic" dir="rtl">
                            {msg.detected_user_mistake.explanation_ar}
                          </p>
                        )}
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {isLoading && (
            <div className="flex justify-start w-full items-start gap-3">
              <div className="w-9 h-9 rounded-xl overflow-hidden bg-gradient-to-tr from-amber-400 to-rose-600 p-0.5 flex-shrink-0 animate-bounce">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200"
                  alt="Sara"
                  className="w-full h-full object-cover rounded-lg"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-4 rounded-3xl bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-tl-sm flex items-center gap-2">
                <div className="flex space-x-1.5">
                  <div className="w-2.5 h-2.5 bg-[#D97706] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2.5 h-2.5 bg-[#D97706] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2.5 h-2.5 bg-[#D97706] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                <span className="text-xs font-bold text-stone-500 dark:text-stone-400 ml-1">Sara is blending pigments...</span>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />

          {/* Micro-Tooltip word card */}
          <AnimatePresence>
            {showTooltipWord && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                style={{ left: showTooltipWord.x, top: showTooltipWord.y }}
                className="absolute z-50 transform -translate-x-1/2 bg-stone-950 text-stone-100 p-3.5 rounded-2xl shadow-xl border border-stone-800 flex flex-col items-center gap-2.5 min-w-[190px]"
              >
                <div className="flex items-center gap-2 justify-between w-full border-b border-stone-800 pb-1.5">
                  <span className="font-extrabold text-sm text-amber-400 font-mono">
                    {showTooltipWord.text}
                  </span>
                  <button
                    onClick={() => speakSpanish(showTooltipWord.text, 0.8)}
                    className="p-1 rounded-lg bg-stone-800 hover:bg-stone-700 transition"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-stone-200" />
                  </button>
                </div>
                <div className="flex flex-col gap-0.5 text-center w-full">
                  <p className="text-[11px] font-bold text-stone-300">
                    🇬🇧 {showTooltipWord.en}
                  </p>
                  <p className="text-[11px] font-bold text-stone-300 font-arabic" dir="rtl">
                    🇦🇪 {showTooltipWord.ar}
                  </p>
                </div>
                <button
                  onClick={() => addToPalette(showTooltipWord.text, showTooltipWord.en, showTooltipWord.ar)}
                  className="w-full py-1.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-stone-950 font-black text-[11px] rounded-xl flex items-center justify-center gap-1 transition"
                >
                  <BookmarkPlus className="w-3.5 h-3.5" />
                  <span>Add to Palette</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* CHAT INPUT AREA */}
        <div className="p-4 border-t border-stone-200 dark:border-stone-800 bg-[#FAF7F0] dark:bg-[#1C1B19]/90 flex flex-col gap-3">
          
          {/* Quick-Reply Suggestions */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            <span className="text-[10px] font-black uppercase text-stone-400 tracking-wider flex-shrink-0">
              Suggestions:
            </span>
            {getSuggestions().map((sug, sIdx) => (
              <motion.button
                key={sIdx}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSendMessage(sug)}
                className="px-3 py-1.5 bg-[#FDFBF7] hover:bg-[#FAF7F0] dark:bg-[#151413] dark:hover:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-full text-xs font-bold text-stone-700 dark:text-stone-300 whitespace-nowrap transition cursor-pointer"
              >
                {sug}
              </motion.button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Escribe tu mensaje en español (Type your message)..."
              className="flex-1 px-4 py-3 bg-[#FDFBF7] dark:bg-[#151413] border border-stone-200 dark:border-stone-800 rounded-2xl text-sm focus:outline-hidden focus:ring-2 focus:ring-[#D97706]/50 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 font-medium"
            />
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSendMessage()}
              className="p-3 bg-gradient-to-r from-[#D97706] to-[#F59E0B] text-stone-950 font-bold rounded-2xl shadow-md flex items-center justify-center transition hover:shadow-lg"
            >
              <Send className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Missions & Vocabulary Palette */}
      <div className="w-full lg:w-80 flex flex-col gap-6">
        
        {/* ACTIVE ARTISTIC MISSIONS (GAMIFIED TARGETS) */}
        <div className="bg-[#FAF7F0] dark:bg-[#1C1B19] rounded-3xl p-5 border border-stone-200 dark:border-stone-800 shadow-md flex flex-col gap-4">
          <div className="flex items-center gap-2 border-b border-stone-200 dark:border-stone-800 pb-3">
            <BrainCircuit className="w-5 h-5 text-[#D97706]" />
            <span className="font-extrabold text-sm text-stone-900 dark:text-stone-100 font-sans tracking-tight">
              Painting Quests
            </span>
          </div>

          <div className="space-y-3">
            {QUESTS.map((quest, qIdx) => {
              const isActive = activeQuestIdx === qIdx;
              const isCompleted = completedQuests.includes(quest.id);

              return (
                <div
                  key={quest.id}
                  className={`p-3.5 rounded-2xl border transition-all ${
                    isActive
                      ? 'bg-[#FDFBF7] dark:bg-[#151413] border-[#D97706]/40 shadow-sm'
                      : 'bg-transparent border-transparent opacity-60'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <div className="mt-0.5">
                      {isCompleted ? (
                        <div className="w-4.5 h-4.5 rounded-full bg-emerald-500 flex items-center justify-center">
                          <CheckCircle2 className="w-3 h-3 text-stone-950 font-black" />
                        </div>
                      ) : (
                        <div className={`w-4.5 h-4.5 rounded-full border flex items-center justify-center ${
                          isActive ? 'border-[#D97706]' : 'border-stone-300'
                        }`}>
                          {isActive && <div className="w-2.5 h-2.5 rounded-full bg-[#D97706]" />}
                        </div>
                      )}
                    </div>

                    <div className="flex-1 flex flex-col gap-0.5">
                      <span className={`text-xs font-black ${
                        isCompleted
                          ? 'text-emerald-600 line-through'
                          : isActive
                          ? 'text-[#D97706]'
                          : 'text-stone-500'
                      }`}>
                        {quest.label_en}
                      </span>
                      <p className="text-[11px] leading-relaxed text-stone-600 dark:text-stone-300 font-medium">
                        {languageMode === 'ar' ? quest.desc_ar : quest.desc_en}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* VOCABULARY PALETTE STORAGE */}
        <div className="bg-[#FAF7F0] dark:bg-[#1C1B19] rounded-3xl p-5 border border-stone-200 dark:border-stone-800 shadow-md flex-1 flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-3">
            <div className="flex items-center gap-2">
              <Palette className="w-5 h-5 text-amber-500" />
              <span className="font-extrabold text-sm text-stone-900 dark:text-stone-100 font-sans tracking-tight">
                My Brushstroke Palette
              </span>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
              {palette.length} words
            </span>
          </div>

          {palette.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center gap-2 text-stone-400 dark:text-stone-500">
              <BookOpen className="w-8 h-8 stroke-[1.5]" />
              <p className="text-xs font-semibold">Your palette canvas is clean.</p>
              <p className="text-[10px]">Hover & click Spanish words in chat to blend them into your library!</p>
            </div>
          ) : (
            <div className="flex-1 flex flex-col gap-4 overflow-y-auto max-h-[280px]">
              <div className="grid grid-cols-1 gap-2">
                {palette.map((item, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => {
                      soundEffects.playFlip();
                      setPalette(prev => prev.map((p, pIdx) => pIdx === idx ? { ...p, isFlipped: !p.isFlipped } : p));
                    }}
                    className="p-3 bg-[#FDFBF7] dark:bg-[#151413] border border-stone-200 dark:border-stone-800 rounded-xl cursor-pointer relative shadow-xs overflow-hidden"
                  >
                    <AnimatePresence mode="wait">
                      {!item.isFlipped ? (
                        <motion.div
                          key="front"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex items-center justify-between"
                        >
                          <span className="text-xs font-bold text-amber-700 dark:text-amber-400 font-mono">
                            {item.word}
                          </span>
                          <span className="text-[9px] font-black uppercase text-stone-400 tracking-wider">
                            TAP TO FLIP
                          </span>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="back"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex flex-col gap-0.5 text-left"
                        >
                          <p className="text-[10px] font-bold text-stone-600 dark:text-stone-300">
                            🇬🇧 {item.en}
                          </p>
                          <p className="text-[10px] font-bold text-stone-600 dark:text-stone-300 font-arabic" dir="rtl">
                            🇦🇪 {item.ar}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>

              <div className="space-y-2 mt-auto pt-4 border-t border-stone-200 dark:border-stone-800">
                <button
                  onClick={startSpellingTest}
                  className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-stone-950 font-black text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-sm hover:shadow transition cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Test My Palette</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* SPELLING ASSESSMENT GAME MODAL */}
      <AnimatePresence>
        {isSpellingTestOpen && palette.length > 0 && (
          <div className="fixed inset-0 z-50 bg-stone-950/85 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-md bg-[#FDFBF7] dark:bg-[#151413] border border-stone-200 dark:border-stone-800 rounded-3xl p-6 shadow-2xl relative overflow-hidden"
            >
              {/* Decorative backgrounds */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-500/10 to-rose-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <Palette className="w-5 h-5 text-amber-500" />
                  <span className="font-extrabold text-sm text-stone-900 dark:text-stone-100">
                    Spelling Assessment Module
                  </span>
                </div>
                <button
                  onClick={() => setIsSpellingTestOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-500 dark:text-stone-400 transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Progress counter */}
              <div className="flex items-center justify-between text-[11px] font-black text-stone-400 dark:text-stone-500 uppercase tracking-widest mb-4">
                <span>Word {activeTestIdx + 1} of {palette.length}</span>
                <span>Score: {testScore}/{palette.length}</span>
              </div>

              {/* Question container */}
              <div className="p-5 rounded-2xl bg-[#FAF7F0] dark:bg-[#1C1B19]/50 border border-stone-200 dark:border-stone-800 text-center flex flex-col gap-3 mb-4">
                <span className="text-[10px] font-black uppercase text-stone-400 tracking-wider">
                  Spell the Spanish translation of:
                </span>
                <p className="text-lg font-extrabold text-stone-800 dark:text-stone-200 leading-tight">
                  🇬🇧 {palette[activeTestIdx].en}
                </p>
                {palette[activeTestIdx].ar && (
                  <p className="text-sm font-semibold text-stone-500 dark:text-stone-400 font-arabic" dir="rtl">
                    🇦🇪 {palette[activeTestIdx].ar}
                  </p>
                )}
              </div>

              {/* Input section */}
              <div className="space-y-4">
                <input
                  type="text"
                  value={activeTestAnswer}
                  onChange={(e) => setActiveTestAnswer(e.target.value)}
                  disabled={testResult !== null}
                  placeholder="Type the Spanish word here..."
                  className="w-full px-4 py-3 bg-[#FDFBF7] dark:bg-[#151413] border border-stone-200 dark:border-stone-800 rounded-2xl text-center text-sm font-bold focus:outline-hidden focus:ring-2 focus:ring-[#D97706]/40 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 uppercase tracking-wider font-mono"
                />

                {testResult === null ? (
                  <button
                    onClick={handleCheckSpelling}
                    disabled={!activeTestAnswer.trim()}
                    className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-stone-950 font-black text-xs rounded-2xl shadow-md transition disabled:opacity-50"
                  >
                    Check Spelling
                  </button>
                ) : (
                  <div className="space-y-4">
                    {testResult === 'correct' ? (
                      <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center gap-2.5 text-emerald-600 dark:text-emerald-400 font-black text-xs justify-center">
                        <CheckCircle2 className="w-5 h-5" />
                        <span>¡Excelente! Correct paint formula.</span>
                      </div>
                    ) : (
                      <div className="p-3.5 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex flex-col gap-1 items-center text-rose-600 dark:text-rose-400 font-semibold text-xs text-center justify-center">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="w-5 h-5" />
                          <span className="font-black">Wrong paint mix!</span>
                        </div>
                        <span className="font-mono mt-1 font-black">
                          Correct: {palette[activeTestIdx].word.toUpperCase()}
                        </span>
                      </div>
                    )}

                    <button
                      onClick={handleNextSpellingWord}
                      className="w-full py-3 bg-stone-900 text-stone-100 dark:bg-stone-100 dark:text-stone-900 font-black text-xs rounded-2xl flex items-center justify-center gap-1.5 hover:opacity-90 transition"
                    >
                      <span>{activeTestIdx === palette.length - 1 ? 'Finish Challenge' : 'Next Word'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
