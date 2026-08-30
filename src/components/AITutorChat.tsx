import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Volume2,
  VolumeX,
  Sparkles,
  User,
  RotateCcw,
  Mic,
  MicOff,
  CheckCircle2,
  AlertCircle,
  Loader2,
  BookOpen,
  GraduationCap,
  Headphones,
  Radio,
  Check
} from 'lucide-react';
import { UserProgress, TutorPersona } from '../types';
import { speakSpanish, soundEffects } from '../utils/audio';

interface AITutorChatProps {
  userProgress: UserProgress;
  setUserProgress: React.Dispatch<React.SetStateAction<UserProgress>>;
}

export interface VocabularyItem {
  word: string;
  en: string;
  ar: string;
  contextSentence?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  spanishText: string;
  englishExplanation?: string;
  arabicExplanation?: string;
  phase?: string;
  corrections?: string[];
  vocabulary?: VocabularyItem[];
  followUpQuestions?: string[];
  audioAutoPlayed?: boolean;
}

export const AITutorChat: React.FC<AITutorChatProps> = ({
  userProgress,
  setUserProgress
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'mateo-init-1',
      sender: 'ai',
      spanishText: '¡Hola! Soy el Profesor Mateo, pedagogo y lingüista certificado. Mi misión es llevarte sistemáticamente desde tu nivel actual hasta una fluidez real B2+ usando el método comunicativo y práctica deliberada de 5 fases.\n\nPara iniciar nuestro diagnóstico inicial:\n1. ¿Cuál es tu nivel actual de español (Principiante A0, A1, A2, B1 o B2)?\n2. ¿Cuál es tu objetivo principal (Fluidez conversacional, viajes/trabajo, o examen DELE)?\n3. ¿Cuántos minutos deseas dedicar por sesión?',
      englishExplanation: 'Hello! I am Profesor Mateo, an elite certified Spanish pedagogue and linguist. My mission is to systematically guide you to genuine CEFR B2+ conversational and writing fluency using comprehensible input and a 5-Phase deliberate practice framework.\n\nTo calibrate your diagnostic kickoff:\n1. What is your current Spanish level (Complete beginner A0, A1, A2, B1, or B2)?\n2. What is your primary learning goal (Conversational fluency, travel/work, or DELE exam prep)?\n3. How many minutes do you want to dedicate per session?',
      arabicExplanation: 'مرحباً! أنا البروفيسور ماتيو، خبير تربوي ولغوي متخصص في تدريس الإسبانية. مهمتي هي نقلك بشكل منهجي وتدريجي من مستواك الحالي إلى طلاقة حقيقية (B2+) باستخدام أسلوب الإدخال المفهوم ونظام التدريب المدروس من 5 مراحل.\n\nللبدء في التقييم الأولي:\n1. ما هو مستواك الحالي (مبتدئ A0، A1، A2، B1، أو B2)؟\n2. ما هو هدفك الأساسي (الطلاقة في المحادثة، السفر/العمل، أم اختبار DELE)؟\n3. كم دقيقة تود تخصيصها لكل جلسة؟',
      phase: 'Diagnostic Kickoff',
      vocabulary: [
        { word: 'pedagogo', en: 'pedagogue / master teacher', ar: 'خبير تربوي / معلم', contextSentence: 'Soy el Profesor Mateo, pedagogo y lingüista.' },
        { word: 'fluidez', en: 'fluency', ar: 'طلاقة', contextSentence: 'Te llevaré a una fluidez real B2+.' }
      ],
      followUpQuestions: [
        'Soy principiante A0, quiero fluidez conversacional y 20 min/día.',
        'Tengo nivel A2, quiero dominar los pasados (indefinido vs imperfecto).',
        'Nivel B1, quiero preparar el examen DELE y perfeccionar el subjuntivo.',
        'Quiero practicar una conversación en un restaurante en Madrid.'
      ]
    }
  ]);

  const [inputVal, setInputVal] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState<TutorPersona>('teacher');
  const [selectedTopic, setSelectedTopic] = useState('5_phase_lesson');
  const [isListening, setIsListening] = useState(false);
  const [currentlyPlayingId, setCurrentlyPlayingId] = useState<string | null>(null);
  const [autoPlayTTS, setAutoPlayTTS] = useState(true);

  const chatBottomRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const personas = [
    { id: 'teacher' as TutorPersona, name: 'Profesor Mateo', role: 'Elite Pedagogue & Linguist (Mastery Method)', icon: '👨‍🏫' },
    { id: 'friend' as TutorPersona, name: 'Sofía (Madrid)', role: 'Native Conversationalist (Colloquial)', icon: '👩' },
    { id: 'grammar_doctor' as TutorPersona, name: 'Dr. Sintaxis', role: 'Deep Structural & Linguistic Doctor', icon: '🔬' },
    { id: 'dele_examiner' as TutorPersona, name: 'Examinador DELE', role: 'Official Instituto Cervantes Rater', icon: '📋' }
  ];

  const quickLessonTopics = [
    { id: '5_phase_lesson', label: '🚀 Launch 5-Phase Lesson', prompt: 'Profesor Mateo, por favor inicia una lección estructurada de 5 fases para mi nivel actual.' },
    { id: 'past_tenses', label: '⏳ Pretérito vs Imperfecto', prompt: 'Quiero dominar la diferencia entre Pretérito Indefinido y Pretérito Imperfecto con la regla de 5 fases.' },
    { id: 'por_para', label: '🎯 Por vs Para Mastery', prompt: 'Explícame y ponme a prueba con Por vs Para usando ejercicios de producción activa.' },
    { id: 'subjunctive', label: '✨ El Subjuntivo en Deseos', prompt: 'Enséñame el Subjuntivo presente en cláusulas de deseo y duda paso a paso.' },
    { id: 'restaurant_roleplay', label: '🥘 Roleplay: Restaurante', prompt: 'Hagamos una inmersión comunicativa pidiendo tapas en un restaurante en Madrid. Corrige mis errores.' }
  ];

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading, isListening]);

  // Read response aloud using Text-To-Speech with visual playback indicator
  const handleSpeakMessage = (msgId: string, text: string) => {
    setCurrentlyPlayingId(msgId);
    speakSpanish(text, userProgress.settings.audioSpeed);
    const estimatedDuration = Math.max(2500, text.length * 65);
    setTimeout(() => {
      setCurrentlyPlayingId(prev => (prev === msgId ? null : prev));
    }, estimatedDuration);
  };

  // Main message dispatcher
  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputVal).trim();
    if (!text || isLoading) return;

    soundEffects.playPop();

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      spanishText: text
    };

    setMessages(prev => [...prev, userMsg]);
    setInputVal('');
    setIsLoading(true);

    try {
      // Build conversation history
      const history = messages.map(m => ({
        role: m.sender === 'user' ? ('user' as const) : ('model' as const),
        text: m.spanishText
      }));

      const res = await fetch('/api/ai/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          userLevel: userProgress.currentLevel,
          persona: selectedPersona,
          nativeLang: userProgress.settings.nativeLanguage,
          history
        })
      });

      if (!res.ok) {
        throw new Error('Tutor API response failed');
      }

      const data = await res.json();
      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        spanishText: data.spanishResponse,
        englishExplanation: data.englishExplanation,
        arabicExplanation: data.arabicExplanation,
        phase: data.phase,
        corrections: data.corrections,
        vocabulary: data.vocabulary,
        followUpQuestions: data.followUpQuestions
      };

      setMessages(prev => [...prev, aiMsg]);
      soundEffects.playCorrect();
      setUserProgress(prev => ({ ...prev, xp: prev.xp + 10 }));

      // Trigger Audible Text-to-Speech Feedback automatically for comprehensible input
      if (autoPlayTTS) {
        handleSpeakMessage(aiMsg.id, aiMsg.spanishText);
      }
    } catch (e) {
      console.error(e);
      setMessages(prev => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: 'ai',
          spanishText: 'Lo siento, tuve un pequeño problema de conexión con el servidor pedagógico. ¿Puedes repetirlo, por favor?',
          englishExplanation: 'Sorry, I had a brief connection issue. Could you repeat that, please?',
          arabicExplanation: 'عذراً، حدث انقطاع بسيط في الاتصال. هل يمكنك إعادة كتابة الرسالة؟',
          phase: 'Connection Recovery'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Real-time Voice-to-Text integration using Web Speech API
  const handleToggleMic = () => {
    if (typeof window === 'undefined') return;

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser. You can type in Spanish directly!');
      return;
    }

    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'es-ES';
      recognition.continuous = true;
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
      console.warn('Web Speech API error:', e);
      setIsListening(false);
    }
  };

  // Save vocabulary item directly to user's saved LingQs
  const handleSaveVocabToLingQ = (vocab: VocabularyItem) => {
    const wordKey = vocab.word.toLowerCase();
    setUserProgress(prev => {
      const existingLingQs = prev.lingqs || {};
      const newLingQs = {
        ...existingLingQs,
        [wordKey]: {
          word: wordKey,
          status: 1 as const,
          translation_en: vocab.en,
          translation_ar: vocab.ar,
          sentenceContext: vocab.contextSentence || '',
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
  };

  const handleResetSession = () => {
    setMessages([
      {
        id: `reset-${Date.now()}`,
        sender: 'ai',
        spanishText: '¡Sesión reiniciada! Soy el Profesor Mateo. Indícame tu nivel (A0-B2) o el tema gramatical que deseas que abordemos mediante el método de 5 fases.',
        englishExplanation: 'Session reset! I am Profesor Mateo. Let me know your level (A0-B2) or target grammar structure to begin our 5-Phase mastery lesson.',
        arabicExplanation: 'تمت إعادة ضبط الجلسة! أنا البروفيسور ماتيو. أخبرني بمستواك أو القاعدة التي تود دراستها عبر المراحل الخمس.',
        phase: 'Diagnostic Kickoff',
        vocabulary: [
          { word: 'reiniciada', en: 'reset / restarted', ar: 'إعادة ضبط', contextSentence: 'La sesión ha sido reiniciada.' }
        ],
        followUpQuestions: [
          'Soy nivel A1 y quiero aprender a presentarme y describir mi rutina.',
          'Nivel A2: enséñame las preposiciones Por vs Para.',
          'Nivel B1: quiero dominar las oraciones condicionales (Si tuviera...).'
        ]
      }
    ]);
  };

  return (
    <div className="space-y-6">
      {/* Top Pedagogical Studio Banner */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 sm:p-6 text-stone-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-500 text-stone-950 uppercase tracking-wider flex items-center gap-1 shadow-xs">
                <span>👨‍🏫</span>
                <span>Profesor Mateo Pedagogy Engine</span>
              </span>

              {/* Status Visual Indicators */}
              {isLoading && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse flex items-center gap-1.5">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-400" />
                  AI Thinking...
                </span>
              )}

              {isListening && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse flex items-center gap-1.5">
                  <Mic className="w-3.5 h-3.5 text-rose-400 animate-bounce" />
                  Voice Input Active
                </span>
              )}

              {currentlyPlayingId !== null && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 animate-pulse flex items-center gap-1.5">
                  <Volume2 className="w-3.5 h-3.5 text-emerald-400 animate-bounce" />
                  Reading Aloud (TTS)
                </span>
              )}

              <span className="text-xs text-stone-400 font-medium">Level: {userProgress.currentLevel}</span>
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <span>Maestro de Español: Profesor Mateo & AI Voice Studio</span>
            </h1>
            <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-2xl leading-relaxed">
              Legitimate second-language mastery: 5-Phase Blueprint • Multi-Language Vocabulary • Real-Time Voice Speech-to-Text & Audible TTS Feedback.
            </p>
          </div>

          {/* Action & Persona selectors */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full lg:w-auto">
            {/* AutoPlay TTS Toggle */}
            <button
              onClick={() => setAutoPlayTTS(!autoPlayTTS)}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 border ${
                autoPlayTTS
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-stone-800 text-stone-400 border-stone-700'
              }`}
              title="Toggle automatic Text-To-Speech playback"
            >
              {autoPlayTTS ? <Volume2 className="w-3.5 h-3.5 text-amber-400" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span>{autoPlayTTS ? 'TTS Autoplay ON' : 'TTS Autoplay OFF'}</span>
            </button>

            <button
              onClick={handleResetSession}
              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-stone-800 text-stone-300 border border-stone-700 hover:bg-stone-700 hover:text-white transition"
              title="Reset diagnostic session"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>New Session</span>
            </button>

            <div className="flex flex-wrap gap-1">
              {personas.map(p => (
                <button
                  key={p.id}
                  onClick={() => setSelectedPersona(p.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition border ${
                    selectedPersona === p.id
                      ? 'bg-amber-500 text-stone-950 border-amber-400 shadow-md font-extrabold'
                      : 'bg-stone-800 text-stone-300 border-stone-700 hover:bg-stone-700'
                  }`}
                >
                  <span>{p.icon}</span>
                  <span className="hidden sm:inline">{p.name.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-sm overflow-hidden flex flex-col h-[680px]">
        {/* Quick Lesson Launch Bar */}
        <div className="bg-stone-50 dark:bg-stone-950 border-b border-stone-200 dark:border-stone-800 px-4 py-2.5 flex items-center justify-between overflow-x-auto no-scrollbar gap-2">
          <span className="text-[11px] font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
            <GraduationCap className="w-3.5 h-3.5 text-amber-500" />
            Active Topics:
          </span>
          <div className="flex items-center gap-1.5">
            {quickLessonTopics.map(topic => (
              <button
                key={topic.id}
                onClick={() => {
                  setSelectedTopic(topic.id);
                  handleSendMessage(topic.prompt);
                }}
                className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                  selectedTopic === topic.id
                    ? 'bg-stone-900 text-white dark:bg-amber-500 dark:text-stone-950'
                    : 'bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 hover:bg-amber-50 dark:hover:bg-stone-700'
                }`}
              >
                {topic.label}
              </button>
            ))}
          </div>
        </div>

        {/* Messages Stream */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-stone-50/40 dark:bg-stone-950/40">
          {messages.map(msg => {
            const isUser = msg.sender === 'user';
            const isPlayingThisMsg = currentlyPlayingId === msg.id;

            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-10 h-10 rounded-2xl bg-amber-500 text-stone-950 flex items-center justify-center font-bold text-base shrink-0 shadow-xs border border-amber-400">
                    👨‍🏫
                  </div>
                )}

                <div
                  className={`max-w-[90%] sm:max-w-[82%] rounded-2xl p-4 sm:p-5 shadow-xs space-y-3 ${
                    isUser
                      ? 'bg-stone-900 text-white rounded-tr-xs dark:bg-amber-500 dark:text-stone-950 font-medium'
                      : 'bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-stone-100 rounded-tl-xs'
                  }`}
                >
                  {/* Phase & Audio Header */}
                  {!isUser && (
                    <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-2 gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-xs text-stone-900 dark:text-stone-100">
                          Profesor Mateo
                        </span>
                        {msg.phase && (
                          <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60">
                            {msg.phase}
                          </span>
                        )}
                      </div>

                      {/* Text-to-Speech Play Button & Indicator */}
                      <button
                        onClick={() => handleSpeakMessage(msg.id, msg.spanishText)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                          isPlayingThisMsg
                            ? 'bg-amber-500 text-stone-950 animate-pulse font-black shadow-sm'
                            : 'bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-amber-700 dark:text-amber-400'
                        }`}
                        title="Listen to Spanish Response (TTS)"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>{isPlayingThisMsg ? 'Speaking...' : 'Listen TTS'}</span>
                      </button>
                    </div>
                  )}

                  {/* Main Spanish Text */}
                  <div className="text-sm sm:text-base font-medium leading-relaxed whitespace-pre-line">
                    {msg.spanishText}
                  </div>

                  {/* Structured Multi-Language Vocabulary Cards (Comprehensible Input) */}
                  {!isUser && msg.vocabulary && msg.vocabulary.length > 0 && (
                    <div className="bg-amber-50/70 dark:bg-stone-950/90 border border-amber-200/80 dark:border-amber-900/50 rounded-xl p-3 sm:p-3.5 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="font-extrabold text-xs text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
                          <BookOpen className="w-4 h-4 text-amber-500" />
                          Vocabulario Estructurado (Multi-Language Definitions):
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-200 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
                          Comprehensible Input
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {msg.vocabulary.map((vocab, vIdx) => {
                          const isSaved = userProgress.savedWordIds?.includes(vocab.word.toLowerCase());

                          return (
                            <div
                              key={vIdx}
                              className="bg-white dark:bg-stone-900 p-3 rounded-xl border border-stone-200 dark:border-stone-800 space-y-1.5 text-xs shadow-2xs"
                            >
                              <div className="flex items-center justify-between gap-1">
                                <span className="font-black text-sm text-stone-900 dark:text-stone-100 capitalize">
                                  {vocab.word}
                                </span>
                                <div className="flex items-center gap-1">
                                  <button
                                    onClick={() => speakSpanish(vocab.word, userProgress.settings.audioSpeed)}
                                    className="p-1 rounded bg-stone-100 dark:bg-stone-800 text-amber-600 dark:text-amber-400 hover:bg-amber-100 transition"
                                    title="Listen to word"
                                  >
                                    <Volume2 className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => handleSaveVocabToLingQ(vocab)}
                                    disabled={isSaved}
                                    className={`px-2 py-0.5 rounded text-[10px] font-extrabold transition flex items-center gap-0.5 ${
                                      isSaved
                                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                                        : 'bg-amber-500 hover:bg-amber-400 text-stone-950'
                                    }`}
                                  >
                                    {isSaved ? <Check className="w-3 h-3" /> : '+ Save'}
                                  </button>
                                </div>
                              </div>

                              <p className="text-stone-700 dark:text-stone-300 font-medium">
                                🇬🇧 <span className="font-bold">EN:</span> {vocab.en}
                              </p>
                              <p className="text-amber-900 dark:text-amber-300 font-arabic font-medium" dir="rtl">
                                🇦🇪 <span className="font-bold">AR:</span> {vocab.ar}
                              </p>
                              {vocab.contextSentence && (
                                <p className="text-[11px] italic text-stone-500 dark:text-stone-400 pt-1 border-t border-stone-100 dark:border-stone-800">
                                  "{vocab.contextSentence}"
                                </p>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Pedagogical Corrections Callout */}
                  {msg.corrections && msg.corrections.length > 0 && (
                    <div className="bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl p-3 text-xs space-y-2">
                      <span className="font-extrabold text-stone-900 dark:text-stone-100 block flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
                        Pedagogical Feedback & Native Insights:
                      </span>
                      <div className="space-y-1.5">
                        {msg.corrections.map((c, i) => (
                          <div
                            key={i}
                            className={`p-2 rounded-lg font-medium leading-relaxed ${
                              c.startsWith('🟢')
                                ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/50'
                                : c.startsWith('🔴')
                                ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-300 border border-rose-200 dark:border-rose-900/50'
                                : 'bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-300 border border-amber-200 dark:border-amber-900/50'
                            }`}
                          >
                            {c}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* English & Arabic Explanations */}
                  {!isUser && (msg.englishExplanation || msg.arabicExplanation) && (
                    <div className="pt-2.5 border-t border-stone-100 dark:border-stone-800 space-y-1.5 text-xs text-stone-600 dark:text-stone-300">
                      {msg.englishExplanation && (
                        <p className="leading-relaxed">
                          <span className="font-bold text-stone-800 dark:text-stone-200 mr-1">🇬🇧 Explanation:</span>
                          {msg.englishExplanation}
                        </p>
                      )}
                      {msg.arabicExplanation && (
                        <p className="text-amber-900 dark:text-amber-200 font-arabic font-medium leading-relaxed" dir="rtl">
                          <span className="font-bold text-stone-800 dark:text-stone-200 ml-1">🇦🇪 الشرح والتوضيح:</span>
                          {msg.arabicExplanation}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Follow-up / Active production pills */}
                  {msg.followUpQuestions && msg.followUpQuestions.length > 0 && (
                    <div className="pt-2 space-y-1.5">
                      <span className="text-[11px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-wider block">
                        Suggested Responses / Next Step:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {msg.followUpQuestions.map((q, i) => (
                          <button
                            key={i}
                            onClick={() => handleSendMessage(q)}
                            className="text-left text-xs bg-stone-50 dark:bg-stone-800 hover:bg-amber-50 dark:hover:bg-stone-700 hover:border-amber-300 dark:hover:border-amber-500 border border-stone-200 dark:border-stone-700 rounded-lg px-2.5 py-1.5 text-stone-700 dark:text-stone-200 transition"
                          >
                            💬 {q}
                          </button>
                        ))}
                      </div>
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

          {/* Visual Indicator: AI Thinking */}
          {isLoading && (
            <div className="flex gap-3 items-center text-amber-800 dark:text-amber-300 text-xs font-bold bg-amber-50/90 dark:bg-stone-900 border border-amber-200 dark:border-amber-800/60 p-4 rounded-2xl shadow-xs animate-pulse">
              <div className="w-10 h-10 rounded-2xl bg-amber-500 text-stone-950 flex items-center justify-center font-black shrink-0">
                <Loader2 className="w-5 h-5 animate-spin" />
              </div>
              <div className="space-y-0.5">
                <div className="font-extrabold flex items-center gap-1.5 text-stone-900 dark:text-stone-100 text-sm">
                  <Sparkles className="w-4 h-4 text-amber-500" /> Profesor Mateo is thinking & formulating your response...
                </div>
                <p className="text-[11px] text-stone-600 dark:text-stone-400 font-normal">
                  Synthesizing 5-phase lesson structures, grammar nuances & multi-language definitions
                </p>
              </div>
            </div>
          )}

          <div ref={chatBottomRef} />
        </div>

        {/* Input Bar & Voice Status */}
        <div className="p-3 sm:p-4 bg-white dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800 space-y-2">
          {/* Visual Indicator: User Listening Banner */}
          {isListening && (
            <div className="bg-rose-500/10 border border-rose-500/30 text-rose-500 dark:text-rose-400 text-xs font-bold p-3 rounded-xl flex items-center justify-between animate-pulse shadow-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                <Mic className="w-4 h-4 text-rose-500 animate-bounce" />
                <span>Listening to your Spanish speech... Speak clearly in Spanish!</span>
              </div>
              <span className="text-[10px] uppercase font-black bg-rose-500 text-white px-2 py-0.5 rounded-md">
                Web Speech API Live
              </span>
            </div>
          )}

          <form
            onSubmit={e => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            {/* Real-Time Web Speech Mic Toggle */}
            <button
              type="button"
              onClick={handleToggleMic}
              className={`p-3 rounded-xl transition flex items-center justify-center shrink-0 ${
                isListening
                  ? 'bg-rose-500 text-white animate-pulse shadow-lg ring-4 ring-rose-500/30'
                  : 'bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300'
              }`}
              title={isListening ? 'Stop Listening' : 'Click to Speak Spanish (Web Speech API)'}
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            <input
              type="text"
              placeholder={isListening ? 'Escuchando tu voz en español...' : 'Escribe en español o habla con el micrófono...'}
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              className="flex-1 px-4 py-3 bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 rounded-xl text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white dark:focus:bg-stone-800 transition"
            />

            <button
              type="submit"
              disabled={isLoading || !inputVal.trim()}
              className="px-5 py-3 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-stone-950 rounded-xl font-black text-sm shadow-md transition flex items-center gap-1.5 shrink-0"
            >
              <span>Send</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
