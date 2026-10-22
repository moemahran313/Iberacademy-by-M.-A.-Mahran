import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MessageSquare,
  CheckCircle2,
  Circle,
  Send,
  Award,
  Sparkles,
  MapPin,
  HelpCircle,
  FileText,
  RotateCcw,
  Printer,
  ChevronRight,
  ShieldCheck,
  Building2,
  Utensils,
  PlaneTakeoff,
  Lightbulb,
  Check,
  ArrowLeft
} from 'lucide-react';
import {
  TaskScenario,
  TaskGoal,
  ConversationTurn,
  PragmaticEvaluation,
  TaskCertificate
} from '../../types/tasks';
import { TASK_SCENARIOS, getScenarioById } from '../../data/taskScenarios';
import { soundEffects } from '../../utils/audio';
import { triggerConfettiBurst } from '../../utils/confetti';
import { useApp } from '../../context/AppContext';

export const TaskBasedSimulation: React.FC<{
  onBackToDashboard?: () => void;
}> = ({ onBackToDashboard }) => {
  const { authUser, userProgress, setUserProgress } = useApp();

  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('madrid_apartment');
  const [currentScenario, setCurrentScenario] = useState<TaskScenario>(TASK_SCENARIOS[0]);
  const [goals, setGoals] = useState<TaskGoal[]>(TASK_SCENARIOS[0].goals);
  const [turns, setTurns] = useState<ConversationTurn[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [showCertificate, setShowCertificate] = useState<boolean>(false);
  const [certificate, setCertificate] = useState<TaskCertificate | null>(null);
  const [showGoalHint, setShowGoalHint] = useState<string | null>(null);
  const [showKeyPhrasesTray, setShowKeyPhrasesTray] = useState<boolean>(false);
  const [evaluationModal, setEvaluationModal] = useState<PragmaticEvaluation | null>(null);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Initialize scenario when selection changes
  useEffect(() => {
    const sc = getScenarioById(selectedScenarioId) || TASK_SCENARIOS[0];
    setCurrentScenario(sc);
    // Reset goals
    const resetGoals = sc.goals.map(g => ({ ...g, completed: false }));
    setGoals(resetGoals);
    // Initial interlocutor turn
    setTurns([
      {
        id: 'turn-0',
        sender: 'interlocutor',
        text: sc.interlocutor.initialMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setShowCertificate(false);
    setCertificate(null);
    setEvaluationModal(null);
  }, [selectedScenarioId]);

  // Auto-scroll chat to bottom on new turn
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [turns, isTyping]);

  // Evaluates user text for goals, discourse markers, and register
  const analyzeTurn = (text: string, currentGoals: TaskGoal[]) => {
    const lower = text.toLowerCase();
    const metGoalIds: string[] = [];

    // Check goals
    const updatedGoals = currentGoals.map(g => {
      if (g.completed) return g;
      const matched = g.keywords.some(kw => lower.includes(kw.toLowerCase()));
      if (matched) {
        metGoalIds.push(g.id);
        return { ...g, completed: true };
      }
      return g;
    });

    // Detect discourse markers
    const discourseMarkerList = ['mira', 'miren', 'oye', 'oiga', 'disculpe', 'disculpa', 'pues', 'bueno', 'a ver', 'en fin', 'por cierto', 'entonces', 'quisiera', 'podría'];
    const foundMarkers = discourseMarkerList.filter(dm => lower.includes(dm));

    // Register check
    const ustedMarkers = ['usted', 'su', 'sus', 'le', 'les', 'podría', 'quisiera', 'tiene', 'está'];
    const tuMarkers = ['tú', 'tu', 'tus', 'te', 'puedes', 'quieres', 'tienes', 'estás'];
    const hasUsted = ustedMarkers.some(m => new RegExp(`\\b${m}\\b`, 'i').test(lower));
    const hasTu = tuMarkers.some(m => new RegExp(`\\b${m}\\b`, 'i').test(lower));

    let registerUsed: 'tú' | 'usted' | 'mixed' = 'mixed';
    if (hasUsted && !hasTu) registerUsed = 'usted';
    if (hasTu && !hasUsted) registerUsed = 'tú';

    // Politeness Index calculation (0-100)
    let politenessScore = 65;
    if (foundMarkers.length > 0) politenessScore += 15;
    if (registerUsed === currentScenario.requiredRegister) politenessScore += 15;
    if (text.length > 25) politenessScore += 5;
    if (politenessScore > 100) politenessScore = 100;

    return {
      updatedGoals,
      metGoalIds,
      foundMarkers,
      registerUsed,
      politenessScore
    };
  };

  // Generates in-character response based on scenario and user turn
  const generateInterlocutorReply = (userText: string, currentMetGoals: TaskGoal[]) => {
    const lower = userText.toLowerCase();

    if (currentScenario.id === 'madrid_apartment') {
      if (lower.includes('fianza') || lower.includes('depósito')) {
        return 'Mire, la fianza legal es de un solo mes de alquiler (850€), que se le devuelve íntegra al finalizar el contrato si el piso se entrega en buen estado. ¿Le parece razonable?';
      }
      if (lower.includes('gastos') || lower.includes('comunidad') || lower.includes('luz') || lower.includes('agua')) {
        return 'Los gastos de comunidad están completamente incluidos en la renta de 850€. Los suministros de luz, agua e internet van por separado según su consumo estimado.';
      }
      if (lower.includes('duración') || lower.includes('contrato') || lower.includes('meses') || lower.includes('año') || lower.includes('permanencia')) {
        return 'Estupendo. Busco precisamente un inquilino formal para estancia media o larga (de 9 a 12 meses). Podemos firmar el contrato la próxima semana si le parece bien.';
      }
      return 'Entendido. Me gusta la claridad con la que se expresa. ¿Desea que le reserve el piso o prefiere que revisemos algún otro punto de los suministros o la fianza?';
    }

    if (currentScenario.id === 'seville_tapas') {
      if (lower.includes('fresco') || lower.includes('recomiendas') || lower.includes('especialidad') || lower.includes('tapa del día')) {
        return '¡Hoy la estrella es la chocos fritos recién traídos de Huelva y la carrillada ibérica al vino tinto! Te aseguro que están riquísimos. ¿Te pongo una ración?';
      }
      if (lower.includes('gluten') || lower.includes('marisco') || lower.includes('alergia') || lower.includes('alérgenos')) {
        return '¡Buena pregunta! La carrillada al vino es 100% libre de gluten. Los chocos sí llevan harina de trigo para freír. ¿Tienes alguna otra intolerancia que deba comunicar a cocina?';
      }
      if (lower.includes('cuenta') || lower.includes('cobrar') || lower.includes('cuánto es')) {
        return '¡Marchando la cuenta! Han sido dos tapas y la bebida, total 14,50€. ¿Vas a pagar con tarjeta o en efectivo?';
      }
      return '¡Marchando! Oye, ¿te agrego una cañita bien fría o prefieres tinto de verano mientras sale la cocina?';
    }

    // Mexico Baggage
    if (lower.includes('maleta') || lower.includes('negra') || lower.includes('rígida') || lower.includes('mediana') || lower.includes('marca')) {
      return 'Anotado en el expediente: maleta de características descritas. ¿Podría especificarme en qué vuelo venía y qué cosas de valor traía en el interior?';
    }
    if (lower.includes('vuelo') || lower.includes('venía') || lower.includes('llegué') || lower.includes('ropa') || lower.includes('contenido')) {
      return 'Perfecto, hemos ingresado los detalles del vuelo y la descripción del contenido al sistema central de rastreo del aeropuerto (WorldTracer).';
    }
    if (lower.includes('teléfono') || lower.includes('correo') || lower.includes('folio') || lower.includes('referencia') || lower.includes('contacto')) {
      return 'Le entrego su comprobante con el número de folio MX-88204-PIR. Nos pondremos en contacto tan pronto la maleta sea localizada en el siguiente vuelo.';
    }

    return 'Entendido, he registrado toda la información. ¿Hay algún otro detalle de su viaje o equipaje que debamos incluir en la reclamación?';
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim() || isTyping) return;

    soundEffects.playPop();
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Analyze turn
    const { updatedGoals, metGoalIds, foundMarkers, registerUsed, politenessScore } = analyzeTurn(inputMessage, goals);
    setGoals(updatedGoals);

    // New User turn
    const userTurn: ConversationTurn = {
      id: `turn-${Date.now()}`,
      sender: 'user',
      text: inputMessage,
      timestamp,
      pragmaticFeedback: {
        politenessScore,
        registerUsed,
        discourseMarkersFound: foundMarkers,
        goalsMetThisTurn: metGoalIds
      }
    };

    if (metGoalIds.length > 0) {
      soundEffects.playCorrect();
    }

    setTurns(prev => [...prev, userTurn]);
    setInputMessage('');
    setIsTyping(true);

    // Check if simulation complete
    const allGoalsNowCompleted = updatedGoals.every(g => g.completed);

    setTimeout(() => {
      const replyText = generateInterlocutorReply(userTurn.text, updatedGoals);
      const interlocutorTurn: ConversationTurn = {
        id: `turn-ai-${Date.now()}`,
        sender: 'interlocutor',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setTurns(prev => [...prev, interlocutorTurn]);
      setIsTyping(false);

      if (allGoalsNowCompleted) {
        triggerConfettiBurst();
        soundEffects.playLevelUp();

        // Calculate final evaluation
        const totalPoliteness = Math.round(
          turns.concat(userTurn)
            .filter(t => t.sender === 'user' && t.pragmaticFeedback)
            .reduce((acc, curr) => acc + (curr.pragmaticFeedback?.politenessScore || 70), 0) /
            (turns.filter(t => t.sender === 'user').length + 1)
        );

        const allDiscourseMarkers: string[] = Array.from(
          new Set<string>(
            turns.concat(userTurn)
              .flatMap(t => t.pragmaticFeedback?.discourseMarkersFound || [])
          )
        );

        const correctRegisterCount = turns.concat(userTurn)
          .filter(t => t.sender === 'user' && t.pragmaticFeedback?.registerUsed === currentScenario.requiredRegister)
          .length;
        const totalUserTurns = turns.filter(t => t.sender === 'user').length + 1;
        const registerAccuracy = Math.round((correctRegisterCount / totalUserTurns) * 100);

        const cert: TaskCertificate = {
          id: `CERT-${Math.floor(100000 + Math.random() * 900000)}`,
          scenarioId: currentScenario.id,
          scenarioTitle: currentScenario.title,
          cefrLevel: currentScenario.cefrLevel,
          userName: authUser?.displayName || 'Estudiante de Español',
          completedAt: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }),
          politenessScore: totalPoliteness,
          registerAccuracy,
          pragmaticIndexGrade: totalPoliteness >= 85 ? 'Excelente' : totalPoliteness >= 70 ? 'Satisfactorio' : 'En Desarrollo',
          canDoAchieved: currentScenario.canDoStatement
        };

        const evalData: PragmaticEvaluation = {
          taskSuccess: true,
          goalsCompletedCount: updatedGoals.length,
          totalGoalsCount: updatedGoals.length,
          politenessScore: totalPoliteness,
          registerAccuracy,
          discourseMarkersUsed: allDiscourseMarkers,
          strengths: [
            'Lograste todos los objetivos pragma-comunicativos reales de la situación.',
            `Utilizaste marcadores del discurso apropiados (${allDiscourseMarkers.join(', ') || 'elementos de cortesía'}).`,
            `Mantuviste un registro (${currentScenario.requiredRegister}) con un ${registerAccuracy}% de precisión.`
          ],
          pragmaticTips: [
            'Para mayor fluidez, utiliza conectores como "por lo tanto" o "en ese caso".',
            'Recuerda que en situaciones formales el uso del condicional ("¿podría?", "quisiera") eleva la cortesía.'
          ],
          detailedAnalysis: `El intercambio comunicativo se ha completado con éxito pragmático. Lograste resolver el escenario "${currentScenario.title}" en ${totalUserTurns} turnos conversacionales.`
        };

        setCertificate(cert);
        setEvaluationModal(evalData);
        setShowCertificate(true);

        // Update user XP
        setUserProgress(prev => ({
          ...prev,
          xp: prev.xp + 100
        }));
      }
    }, currentScenario.interlocutor.typingDelayMs || 1000);
  };

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-4 space-y-6">
      {/* Editorial Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 dark:border-stone-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C85A32]/10 text-[#C85A32] dark:text-[#E07A5F] text-xs font-bold border border-[#C85A32]/20 mb-2">
            <Award className="w-3.5 h-3.5" />
            <span>Aprendizaje Basado en Tareas (TBLT) • CEFR Real-World "Can-Do"</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-stone-100 tracking-tight font-header">
            Simulaciones de Tareas Pragmáticas
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-1 max-w-2xl leading-relaxed">
            Resuelve objetivos de comunicación en el mundo real. Tu éxito se evalúa por la consecución de metas pragmáticas, cortesía e índices de registro, no por errores ortográficos menores.
          </p>
        </div>

        {onBackToDashboard && (
          <button
            onClick={onBackToDashboard}
            className="self-start sm:self-center flex items-center gap-2 px-3.5 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 text-xs font-bold transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al Dashboard</span>
          </button>
        )}
      </div>

      {/* Scenario Selector Ribbon */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {TASK_SCENARIOS.map(scenario => {
          const isSelected = scenario.id === selectedScenarioId;
          const ThemeIcon =
            scenario.theme === 'whatsapp'
              ? Building2
              : scenario.theme === 'bar'
              ? Utensils
              : PlaneTakeoff;

          return (
            <motion.button
              key={scenario.id}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                soundEffects.playPop();
                setSelectedScenarioId(scenario.id);
              }}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer relative flex flex-col justify-between ${
                isSelected
                  ? 'bg-white dark:bg-[#1C1A18] border-[#C85A32] dark:border-[#E07A5F] shadow-md ring-2 ring-[#C85A32]/20'
                  : 'bg-white/60 dark:bg-[#161413] border-stone-200/80 dark:border-stone-800/80 hover:border-stone-300 dark:hover:border-stone-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className={`p-2 rounded-xl text-stone-900 dark:text-stone-100 ${
                    scenario.theme === 'whatsapp'
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                      : scenario.theme === 'bar'
                      ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                      : 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                  }`}>
                    <ThemeIcon className="w-4 h-4" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700">
                      Nivel {scenario.cefrLevel}
                    </span>
                  </div>
                </div>

                <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 line-clamp-1">
                  {scenario.title}
                </h3>
                <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-1 line-clamp-2">
                  {scenario.subtitle}
                </p>
              </div>

              <div className="mt-3 pt-2 border-t border-stone-100 dark:border-stone-800/60 flex items-center justify-between text-[11px] text-stone-500">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 shrink-0" />
                  {scenario.location}
                </span>
                <span className="font-semibold text-[#C85A32] dark:text-[#E07A5F]">
                  Registro: {scenario.requiredRegister}
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Main Simulation Container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left 2 Cols: Immersive Chat Interface */}
        <div className="lg:col-span-2 space-y-4">
          {/* CEFR Can-Do Statement Card */}
          <div className="p-4 rounded-2xl bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/30 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">
                CEFR Can-Do Statement ({currentScenario.cefrLevel})
              </span>
              <p className="text-xs font-semibold text-stone-800 dark:text-stone-200 leading-snug">
                "{currentScenario.canDoStatement}"
              </p>
            </div>
          </div>

          {/* Context Banner */}
          <div className="p-4 rounded-2xl bg-white dark:bg-[#181615] border border-stone-200 dark:border-stone-800 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">{currentScenario.interlocutor.avatar}</span>
                <div>
                  <h2 className="text-sm font-bold text-stone-900 dark:text-stone-100">
                    {currentScenario.interlocutor.name}
                  </h2>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400">
                    {currentScenario.interlocutor.role} • Registro requerido: <strong className="text-stone-800 dark:text-stone-200 uppercase">{currentScenario.requiredRegister}</strong>
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowKeyPhrasesTray(!showKeyPhrasesTray)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 text-xs font-bold transition cursor-pointer"
              >
                <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                <span>{showKeyPhrasesTray ? 'Ocultar Ayuda' : 'Frases Clave'}</span>
              </button>
            </div>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed pt-1 border-t border-stone-100 dark:border-stone-800/80">
              {currentScenario.context}
            </p>
          </div>

          {/* Key Phrases Tray (Toggleable) */}
          <AnimatePresence>
            {showKeyPhrasesTray && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="p-4 rounded-2xl bg-stone-900 text-stone-100 space-y-3">
                  <h4 className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                    <Lightbulb className="w-4 h-4" />
                    <span>Frases y Marcadores Sugeridos para la Tarea</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {currentScenario.keyPhrases.map((kp, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setInputMessage(prev => (prev ? `${prev} ${kp.spanish}` : kp.spanish));
                          soundEffects.playPop();
                        }}
                        className="p-2.5 rounded-xl bg-stone-800/90 hover:bg-stone-700 border border-stone-700 text-left text-xs transition cursor-pointer group"
                      >
                        <p className="font-semibold text-stone-200 group-hover:text-amber-300 transition">
                          "{kp.spanish}"
                        </p>
                        <p className="text-[10px] text-stone-400 mt-0.5">{kp.english}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Theme-Tailored Chat Frame */}
          <div
            className={`rounded-3xl border shadow-lg overflow-hidden flex flex-col h-[520px] transition-all ${
              currentScenario.theme === 'whatsapp'
                ? 'bg-[#E5DDD5] dark:bg-[#0B141A] border-emerald-600/40'
                : currentScenario.theme === 'bar'
                ? 'bg-[#211B17] border-amber-800/50 text-stone-100'
                : 'bg-slate-900 border-slate-700 text-slate-100'
            }`}
          >
            {/* Header Ribbon based on theme */}
            <div
              className={`px-4 py-3 flex items-center justify-between shrink-0 border-b ${
                currentScenario.theme === 'whatsapp'
                  ? 'bg-[#075E54] text-white border-emerald-800'
                  : currentScenario.theme === 'bar'
                  ? 'bg-[#3B281B] text-amber-100 border-amber-900'
                  : 'bg-slate-800 text-slate-100 border-slate-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{currentScenario.interlocutor.avatar}</span>
                <div>
                  <h3 className="text-sm font-bold leading-tight">
                    {currentScenario.interlocutor.name}
                  </h3>
                  <p className="text-[10px] opacity-80 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    {isTyping ? 'Escribiendo respuesta...' : 'En línea • Tareas TBLT'}
                  </p>
                </div>
              </div>

              {currentScenario.theme === 'airport' && (
                <div className="text-right font-mono text-[10px] text-slate-400">
                  <p>AICM / PIR REPORT</p>
                  <p className="text-amber-400">REF: MX-88204</p>
                </div>
              )}
            </div>

            {/* Chat Messages Body */}
            <div
              ref={chatContainerRef}
              className="flex-1 p-4 overflow-y-auto space-y-4 scroll-container"
            >
              {turns.map(turn => {
                const isUser = turn.sender === 'user';
                return (
                  <motion.div
                    key={turn.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[85%] sm:max-w-[75%] p-3.5 rounded-2xl shadow-xs text-xs sm:text-sm leading-relaxed space-y-1.5 ${
                        isUser
                          ? currentScenario.theme === 'whatsapp'
                            ? 'bg-[#DCF8C6] dark:bg-[#005C4B] text-stone-900 dark:text-stone-100 rounded-tr-none'
                            : 'bg-[#C85A32] text-white rounded-tr-none'
                          : currentScenario.theme === 'whatsapp'
                          ? 'bg-white dark:bg-[#202C33] text-stone-900 dark:text-stone-100 rounded-tl-none'
                          : 'bg-stone-800 text-stone-100 rounded-tl-none border border-stone-700'
                      }`}
                    >
                      <p className="font-sans">{turn.text}</p>

                      <div className="flex items-center justify-between text-[10px] opacity-70 font-mono pt-1">
                        <span>{turn.timestamp}</span>
                        {isUser && turn.pragmaticFeedback && (
                          <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
                            Cortesía: {turn.pragmaticFeedback.politenessScore}%
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Turn-level feedback indicator if user met a goal */}
                    {isUser && turn.pragmaticFeedback?.goalsMetThisTurn && turn.pragmaticFeedback.goalsMetThisTurn.length > 0 && (
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="mt-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold border border-emerald-500/30 flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                        <span>¡Objetivo pragmático alcanzado en este turno!</span>
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}

              {isTyping && (
                <div className="flex items-center gap-2 text-stone-500 text-xs p-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-stone-400 animate-bounce"></div>
                    <div className="w-2 h-2 rounded-full bg-stone-400 animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-2 h-2 rounded-full bg-stone-400 animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                  <span>{currentScenario.interlocutor.name} está redactando...</span>
                </div>
              )}
            </div>

            {/* Chat Input Bar */}
            <div className="p-3 bg-white/10 dark:bg-black/30 border-t border-white/10 flex items-center gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={e => setInputMessage(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
                placeholder={`Escribe tu mensaje en español (${currentScenario.requiredRegister})...`}
                className="flex-1 px-4 py-2.5 rounded-full bg-white dark:bg-[#2A2725] text-stone-900 dark:text-stone-100 text-xs sm:text-sm border border-stone-300 dark:border-stone-700 focus:outline-none focus:ring-2 focus:ring-[#C85A32]"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className="p-3 rounded-full bg-[#C85A32] hover:bg-[#b04b28] disabled:opacity-50 text-white transition cursor-pointer shrink-0 shadow-md"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Col: Live Goals & Pragmatic Metrics Checklist */}
        <div className="space-y-4">
          {/* Real-time Goals Card */}
          <div className="p-5 rounded-2xl bg-white dark:bg-[#181615] border border-stone-200 dark:border-stone-800 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
              <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2 font-header">
                <CheckCircle2 className="w-4 h-4 text-[#C85A32]" />
                <span>Objetivos Pragmáticos</span>
              </h3>
              <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                {goals.filter(g => g.completed).length} / {goals.length}
              </span>
            </div>

            <div className="space-y-3">
              {goals.map(goal => (
                <div
                  key={goal.id}
                  className={`p-3 rounded-xl border transition-all ${
                    goal.completed
                      ? 'bg-emerald-500/10 dark:bg-emerald-500/15 border-emerald-500/30'
                      : 'bg-stone-50 dark:bg-[#201D1B] border-stone-200 dark:border-stone-800'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    {goal.completed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    ) : (
                      <Circle className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                    )}
                    <div className="flex-1 space-y-1">
                      <p className={`text-xs font-bold leading-tight ${
                        goal.completed ? 'text-emerald-800 dark:text-emerald-300 line-through' : 'text-stone-800 dark:text-stone-200'
                      }`}>
                        {goal.description}
                      </p>
                      <button
                        onClick={() => setShowGoalHint(showGoalHint === goal.id ? null : goal.id)}
                        className="text-[10px] text-stone-500 dark:text-stone-400 hover:text-[#C85A32] flex items-center gap-1 cursor-pointer"
                      >
                        <HelpCircle className="w-3 h-3" />
                        <span>{showGoalHint === goal.id ? 'Ocultar pista' : 'Ver pista de formulación'}</span>
                      </button>

                      {showGoalHint === goal.id && (
                        <p className="text-[10px] text-amber-700 dark:text-amber-300 bg-amber-500/10 p-2 rounded-md font-sans leading-tight mt-1">
                          {goal.hint}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pragmatic Competence Metrics */}
          <div className="p-5 rounded-2xl bg-white dark:bg-[#181615] border border-stone-200 dark:border-stone-800 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2 font-header">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Indicadores Pragmáticos</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-1">
                <div className="flex justify-between font-semibold">
                  <span className="text-stone-600 dark:text-stone-400">Registro Recomendado</span>
                  <span className="text-stone-900 dark:text-stone-100 font-bold uppercase">{currentScenario.requiredRegister}</span>
                </div>
                <p className="text-[10px] text-stone-500">
                  {currentScenario.requiredRegister === 'usted'
                    ? 'Usa fórmulas de respeto: "usted", "¿podría?", "quisiera".'
                    : 'Usa trato cercano pero educado: "tú", "¿te parece?", "oye".'}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-1">
                <span className="font-semibold text-stone-600 dark:text-stone-400">Marcadores de Discurso</span>
                <p className="text-[10px] text-stone-500">
                  Usa muletillas y conectores nativos: <code className="text-[#C85A32]">mira</code>, <code className="text-[#C85A32]">oye</code>, <code className="text-[#C85A32]">disculpe</code>, <code className="text-[#C85A32]">pues</code>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Task Completion Certificate Modal */}
      <AnimatePresence>
        {showCertificate && certificate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-stone-950 text-stone-100 border-2 border-amber-500/60 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl relative space-y-6"
            >
              {/* Header Badge */}
              <div className="text-center space-y-2 border-b border-amber-500/30 pb-6">
                <div className="inline-flex p-3 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 mb-2">
                  <Award className="w-8 h-8" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-amber-300 tracking-tight font-header">
                  Certificado de Competencia Pragmática
                </h2>
                <p className="text-xs text-amber-400/80 uppercase font-mono tracking-widest">
                  Instituto de Aprendizaje Basado en Tareas (TBLT) • CEFR {certificate.cefrLevel}
                </p>
              </div>

              {/* Certificate Body */}
              <div className="text-center space-y-4">
                <p className="text-xs text-stone-400">Se certifica que el/la estudiante</p>
                <h3 className="text-2xl font-bold text-white underline decoration-amber-500/50 underline-offset-8">
                  {certificate.userName}
                </h3>
                <p className="text-xs text-stone-300 max-w-lg mx-auto leading-relaxed">
                  Ha completado satisfactoriamente la simulación pragmática en contexto real:
                  <br />
                  <strong className="text-amber-300">"{certificate.scenarioTitle}"</strong>
                </p>

                {/* Metrics Breakdown */}
                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-stone-800">
                  <div className="p-3 rounded-xl bg-stone-900 border border-stone-800">
                    <p className="text-[10px] text-stone-400">Índice de Cortesía</p>
                    <p className="text-lg font-black text-emerald-400">{certificate.politenessScore}%</p>
                  </div>
                  <div className="p-3 rounded-xl bg-stone-900 border border-stone-800">
                    <p className="text-[10px] text-stone-400">Precisión de Registro</p>
                    <p className="text-lg font-black text-amber-400">{certificate.registerAccuracy}%</p>
                  </div>
                  <div className="p-3 rounded-xl bg-stone-900 border border-stone-800">
                    <p className="text-[10px] text-stone-400">Grado Pragmático</p>
                    <p className="text-sm font-black text-amber-300">{certificate.pragmaticIndexGrade}</p>
                  </div>
                </div>

                {/* Achieved Can-Do */}
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-left space-y-1">
                  <p className="text-[10px] font-mono text-amber-400 uppercase font-bold">
                    Competencia CEFR Alcanzada:
                  </p>
                  <p className="text-xs text-stone-200 font-sans italic">
                    "{certificate.canDoAchieved}"
                  </p>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-stone-800">
                <span className="text-[10px] font-mono text-stone-500">
                  ID: {certificate.id} • {certificate.completedAt}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      soundEffects.playPop();
                      window.print();
                    }}
                    className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Imprimir</span>
                  </button>
                  <button
                    onClick={() => {
                      soundEffects.playPop();
                      setShowCertificate(false);
                    }}
                    className="px-5 py-2 rounded-xl bg-[#C85A32] hover:bg-[#b04b28] text-white text-xs font-bold transition cursor-pointer"
                  >
                    Continuar
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
