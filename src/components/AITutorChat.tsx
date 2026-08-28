import React, { useState, useRef, useEffect } from 'react';
import { Send, Volume2, Sparkles, User, Bot, RotateCcw, MessageSquare, Mic, MicOff, CheckCircle2, AlertCircle, Loader2, BookOpen, GraduationCap, Compass, HelpCircle } from 'lucide-react';
import { UserProgress, TutorPersona } from '../types';
import { speakSpanish, soundEffects } from '../utils/audio';

interface AITutorChatProps {
  userProgress: UserProgress;
  setUserProgress: React.Dispatch<React.SetStateAction<UserProgress>>;
}

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  spanishText: string;
  englishExplanation?: string;
  arabicExplanation?: string;
  phase?: string;
  corrections?: string[];
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
  const chatBottomRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputVal).trim();
    if (!text || isLoading) return;

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
        followUpQuestions: data.followUpQuestions
      };

      setMessages(prev => [...prev, aiMsg]);
      soundEffects.playCorrect();
      setUserProgress(prev => ({ ...prev, xp: prev.xp + 10 }));

      // Autoplay AI audio
      speakSpanish(aiMsg.spanishText, userProgress.settings.audioSpeed);
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

  // Speech recognition handler
  const handleToggleMic = () => {
    if (typeof window === 'undefined') return;

    const SpeechRecognition = (window as unknown as { SpeechRecognition: any; webkitSpeechRecognition: any }).SpeechRecognition ||
                              (window as unknown as { SpeechRecognition: any; webkitSpeechRecognition: any }).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser. You can type in Spanish directly!');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'es-ES';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputVal(prev => (prev ? `${prev} ${transcript}` : transcript));
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (e) {
      setIsListening(false);
    }
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
      {/* Banner */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-5 sm:p-6 text-stone-100 shadow-sm">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500 text-stone-950 shadow-xs">
                Profesor Mateo Pedagogy Engine
              </span>
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-stone-800 text-amber-300 border border-stone-700">
                5-Phase Blueprint • 80/20 Immersion
              </span>
              <span className="text-xs text-stone-400">Level: {userProgress.currentLevel}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <span>Maestro de Español: Profesor Mateo</span>
            </h1>
            <p className="text-sm text-stone-300 mt-1 max-w-2xl leading-relaxed">
              Legitimate second-language mastery: Contextual Anchoring ➔ Grammar Breakdown ➔ Controlled Active Drills ➔ Communicative Output ➔ Socratic Correction.
            </p>
          </div>

          {/* Action & Persona selectors */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full lg:w-auto">
            <button
              onClick={handleResetSession}
              className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-stone-800 text-stone-300 border border-stone-700 hover:bg-stone-700 hover:text-white transition"
              title="Reset diagnostic session"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>New Session</span>
            </button>

            <div className="flex flex-wrap gap-1.5">
              {personas.map(p => (
                <button
                  key={p.id}
                  onClick={() => setSelectedPersona(p.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition border ${
                    selectedPersona === p.id
                      ? 'bg-amber-500 text-stone-950 border-amber-400 shadow-md'
                      : 'bg-stone-800 text-stone-300 border-stone-700 hover:bg-stone-700'
                  }`}
                >
                  <span>{p.icon}</span>
                  <span className="hidden sm:inline">{p.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-sm overflow-hidden flex flex-col h-[660px]">
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
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-9 h-9 rounded-xl bg-amber-500 text-stone-950 flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
                    👨‍🏫
                  </div>
                )}

                <div
                  className={`max-w-[88%] sm:max-w-[78%] rounded-2xl p-4 sm:p-5 shadow-xs space-y-3 ${
                    isUser
                      ? 'bg-stone-900 text-white rounded-tr-xs dark:bg-amber-500 dark:text-stone-950'
                      : 'bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-stone-100 rounded-tl-xs'
                  }`}
                >
                  {/* Phase Badge if provided */}
                  {!isUser && msg.phase && (
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60">
                        {msg.phase}
                      </span>
                    </div>
                  )}

                  {/* Spanish Text + Audio Button */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="text-sm sm:text-base font-medium leading-relaxed whitespace-pre-line">
                      {msg.spanishText}
                    </div>
                    {!isUser && (
                      <button
                        onClick={() => speakSpanish(msg.spanishText, userProgress.settings.audioSpeed)}
                        className="p-1.5 rounded-lg bg-amber-50 dark:bg-stone-800 hover:bg-amber-100 dark:hover:bg-stone-700 text-amber-700 dark:text-amber-400 transition shrink-0 shadow-xs"
                        title="Listen to Spanish"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

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
                  <div className="w-9 h-9 rounded-xl bg-stone-800 text-stone-200 flex items-center justify-center font-bold text-xs shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-3 items-center text-stone-500 text-xs font-semibold pl-2">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-700 dark:text-amber-400 flex items-center justify-center">
                <Loader2 className="w-4 h-4 animate-spin" />
              </div>
              <span>Profesor Mateo is analyzing linguistic structures and formulating your 5-phase lesson...</span>
            </div>
          )}

          <div ref={chatBottomRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-white dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800 space-y-2">
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <button
              type="button"
              onClick={handleToggleMic}
              className={`p-2.5 rounded-xl transition ${
                isListening
                  ? 'bg-red-500 text-white animate-pulse'
                  : 'bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-600 dark:text-stone-300'
              }`}
              title="Voice Input (Spanish)"
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            <input
              type="text"
              placeholder="Escribe en español o responde a la pregunta de Profesor Mateo..."
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              className="flex-1 px-4 py-2.5 bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 rounded-xl text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white dark:focus:bg-stone-800 transition"
            />

            <button
              type="submit"
              disabled={isLoading || !inputVal.trim()}
              className="p-2.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-stone-950 rounded-xl font-bold shadow-md transition"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
