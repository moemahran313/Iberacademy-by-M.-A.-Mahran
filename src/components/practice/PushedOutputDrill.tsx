import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  BookOpen,
  ArrowRight,
  RotateCcw,
  Volume2,
  CheckCircle2,
  AlertTriangle,
  Layers,
  HelpCircle,
  FileCheck,
  Check,
  Award,
  ChevronRight,
  ShieldCheck,
  BookMarked,
  Eye,
  ListOrdered
} from 'lucide-react';
import { FreeProductionPrompt } from './FreeProductionPrompt';
import {
  PUSHED_OUTPUT_SCENARIOS,
  PushedOutputScenario,
  ProductionDiagnosticResult,
  diagnoseProduction,
  saveLearningJournalEntry,
  fetchLearningJournalEntries,
  LearningJournalEntry
} from '../../services/grammarDiagnostics';
import { useApp } from '../../context/AppContext';
import { speakSpanish } from '../../utils/audio';
import { soundEffects } from '../../utils/soundEffects';

type DrillStep = 'prompt' | 'diagnostic_recast' | 'journal_history';

export const PushedOutputDrill: React.FC = () => {
  const { authUser, userProgress, setUserProgress } = useApp();

  const [activeScenarioId, setActiveScenarioId] = useState<string>(PUSHED_OUTPUT_SCENARIOS[0].id);
  const [currentStep, setCurrentStep] = useState<DrillStep>('prompt');
  const [isDiagnosing, setIsDiagnosing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [journalSaved, setJournalSaved] = useState(false);

  // Diagnostic state
  const [learnerOutputText, setLearnerOutputText] = useState('');
  const [diagnosticResult, setDiagnosticResult] = useState<ProductionDiagnosticResult | null>(null);

  // Self-identification selections (3 syntactic differences)
  const [selectedNoticingAnswers, setSelectedNoticingAnswers] = useState<Record<string, number>>({});
  const [checkedNoticingFeatures, setCheckedNoticingFeatures] = useState<Record<string, boolean>>({});

  // Journal history state
  const [journalEntries, setJournalEntries] = useState<LearningJournalEntry[]>([]);
  const [isLoadingJournal, setIsLoadingJournal] = useState(false);

  const activeScenario =
    PUSHED_OUTPUT_SCENARIOS.find(s => s.id === activeScenarioId) || PUSHED_OUTPUT_SCENARIOS[0];

  const currentUserId = authUser?.uid || 'guest_user';

  // Load journal history on mount
  useEffect(() => {
    fetchLearningJournalEntries(currentUserId).then(entries => {
      setJournalEntries(entries);
    });
  }, [currentUserId]);

  // Handle production submission
  const handleProductionSubmitted = (text: string, assistedLemmasRevealed: string[]) => {
    setIsDiagnosing(true);
    soundEffects.playPop();

    // Run deep grammar and syntactic gap diagnostic
    const result = diagnoseProduction(text, activeScenario, assistedLemmasRevealed);
    setLearnerOutputText(text);
    setDiagnosticResult(result);
    setSelectedNoticingAnswers({});
    setCheckedNoticingFeatures({});
    setJournalSaved(false);

    setIsDiagnosing(false);
    setCurrentStep('diagnostic_recast');
  };

  // Toggle selection for self-noticing prompt option
  const handleSelectNoticingOption = (promptId: string, optionIdx: number) => {
    setSelectedNoticingAnswers(prev => ({
      ...prev,
      [promptId]: optionIdx
    }));
    soundEffects.playPop();
  };

  // Check if all 3 self-noticing checks are answered correctly
  const allNoticingChecksAnswered =
    diagnosticResult?.selfNoticingChecks.every(check => {
      const selected = selectedNoticingAnswers[check.id];
      return selected !== undefined && check.options[selected]?.isCorrect;
    }) ?? false;

  // Persist to Firestore and complete drill
  const handleCommitToJournal = async () => {
    if (!diagnosticResult || isSaving) return;
    setIsSaving(true);
    soundEffects.playCorrect();

    try {
      const entry: Omit<LearningJournalEntry, 'id' | 'createdAt'> = {
        userId: currentUserId,
        userEmail: authUser?.email || undefined,
        scenarioId: activeScenario.id,
        scenarioTitle: activeScenario.title_es,
        citySetting: activeScenario.citySetting,
        learnerOutput: learnerOutputText,
        wordCount: diagnosticResult.wordCount,
        nativeModel: diagnosticResult.primaryNativeModel,
        agreementErrorsCount: diagnosticResult.agreementDiagnostics.length,
        diagnosticsSummary: {
          agreementTypes: diagnosticResult.agreementDiagnostics.map(d => d.type),
          gapCategories: diagnosticResult.syntacticGaps.map(g => g.category)
        },
        noticedGapsChecked: Object.keys(selectedNoticingAnswers),
        assistedLemmasUsed: diagnosticResult.assistedLemmasDetected
      };

      const savedEntry = await saveLearningJournalEntry(entry);
      setJournalEntries(prev => [savedEntry, ...prev]);
      setJournalSaved(true);

      // Award XP for pushing output (60 XP for thorough productive output)
      setUserProgress(prev => ({
        ...prev,
        xp: prev.xp + 60
      }));
    } catch (err) {
      console.warn('Journal commit warning:', err);
    } finally {
      setIsSaving(false);
    }
  };

  // Restart or select another scenario
  const handleNextScenario = () => {
    soundEffects.playPop();
    const currentIdx = PUSHED_OUTPUT_SCENARIOS.findIndex(s => s.id === activeScenarioId);
    const nextIdx = (currentIdx + 1) % PUSHED_OUTPUT_SCENARIOS.length;
    setActiveScenarioId(PUSHED_OUTPUT_SCENARIOS[nextIdx].id);
    setDiagnosticResult(null);
    setLearnerOutputText('');
    setJournalSaved(false);
    setCurrentStep('prompt');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20">
      {/* 🧭 Drill Top Navigation & Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-[#181615] border border-stone-200 dark:border-stone-800 rounded-3xl p-5 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-[#C85A32]/10 text-[#C85A32] dark:text-[#E07A5F] rounded-2xl">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-600 dark:text-stone-300">
                Lingüística Aplicada ELE
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                Pushed-Output Hypothesis
              </span>
            </div>
            <h1 className="text-lg md:text-xl font-bold font-serif text-stone-900 dark:text-stone-100">
              Laboratorio de Producción Empujada y Notoriedad de Brechas
            </h1>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              soundEffects.playPop();
              setCurrentStep('prompt');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              currentStep === 'prompt' || currentStep === 'diagnostic_recast'
                ? 'bg-[#C85A32] text-white shadow-xs'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
            }`}
          >
            Práctica Activa
          </button>
          <button
            type="button"
            onClick={() => {
              soundEffects.playPop();
              setCurrentStep('journal_history');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
              currentStep === 'journal_history'
                ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 shadow-xs'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
            }`}
          >
            <BookMarked className="w-4 h-4 text-[#C85A32]" />
            <span>Mi Cuaderno ({journalEntries.length})</span>
          </button>
        </div>
      </div>

      {/* Scenario Selector Pills */}
      {currentStep !== 'journal_history' && (
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {PUSHED_OUTPUT_SCENARIOS.map(scen => {
            const isSelected = scen.id === activeScenarioId;
            return (
              <button
                key={scen.id}
                type="button"
                onClick={() => {
                  soundEffects.playPop();
                  setActiveScenarioId(scen.id);
                  if (currentStep === 'diagnostic_recast') {
                    setCurrentStep('prompt');
                    setDiagnosticResult(null);
                    setLearnerOutputText('');
                  }
                }}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap shrink-0 transition cursor-pointer border ${
                  isSelected
                    ? 'border-[#C85A32] bg-[#C85A32]/10 text-[#C85A32] dark:text-[#E07A5F]'
                    : 'border-stone-200 dark:border-stone-800 bg-white dark:bg-[#181615] text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-850'
                }`}
              >
                {scen.title_es.split(',')[0]}
              </button>
            );
          })}
        </div>
      )}

      {/* STEP 1: FREE PRODUCTION PROMPT */}
      {currentStep === 'prompt' && (
        <FreeProductionPrompt
          scenario={activeScenario}
          onSubmitProduction={handleProductionSubmitted}
          isSubmitting={isDiagnosing}
        />
      )}

      {/* STEP 2: GRAMMAR DIAGNOSTIC, TARGET RE-CAST & SELF-NOTICING */}
      {currentStep === 'diagnostic_recast' && diagnosticResult && (
        <div className="space-y-6">
          {/* 🔍 Side-by-Side: Learner Output vs Native Speaker Model */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Learner Draft Card */}
            <div className="bg-white dark:bg-[#181615] border border-stone-200 dark:border-stone-800 rounded-3xl p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-300">
                  Tu Producción Libre
                </span>
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                  {diagnosticResult.wordCount} palabras
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-850/80 border border-stone-200/80 dark:border-stone-800/80 text-sm md:text-base leading-relaxed text-stone-900 dark:text-stone-100">
                {learnerOutputText}
              </div>

              <button
                type="button"
                onClick={() => speakSpanish(learnerOutputText)}
                className="text-xs font-semibold text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 flex items-center gap-1.5 transition cursor-pointer"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Escuchar mi frase</span>
              </button>
            </div>

            {/* Native Speaker Model Card */}
            <div className="bg-white dark:bg-[#181615] border border-[#C85A32]/30 dark:border-[#C85A32]/40 rounded-3xl p-6 shadow-xs space-y-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#C85A32]/5 rounded-bl-full pointer-events-none" />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#C85A32] dark:text-[#E07A5F]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#C85A32] dark:text-[#E07A5F]">
                    Modelo Nativo de Corpus (Sevilla / ELE)
                  </span>
                </div>
                <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300">
                  Corpus Auténtico
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-[#C85A32]/5 dark:bg-[#C85A32]/10 border border-[#C85A32]/20 text-sm md:text-base font-medium leading-relaxed text-stone-900 dark:text-stone-100">
                {diagnosticResult.primaryNativeModel}
              </div>

              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    soundEffects.playPop();
                    speakSpanish(diagnosticResult.primaryNativeModel);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-[#C85A32]/10 hover:bg-[#C85A32]/20 text-[#C85A32] dark:text-[#E07A5F] text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Escuchar Pronunciación Nativa</span>
                </button>

                <span className="text-[11px] text-stone-600 dark:text-stone-300 italic">
                  Registro: {activeScenario.register === 'formal_usted' ? 'Formal (Usted)' : 'Informal (Tú)'}
                </span>
              </div>
            </div>
          </div>

          {/* ⚠️ Concordance & Grammatical Diagnostic Breakdown (Anti-AI Slop: Real Rules) */}
          <div className="bg-white dark:bg-[#181615] border border-stone-200 dark:border-stone-800 rounded-3xl p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100">
                Diagnóstico de Concordancia y Estructura Sintáctica
              </h3>
            </div>

            {diagnosticResult.agreementDiagnostics.length === 0 ? (
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-800/40 text-xs text-emerald-900 dark:text-emerald-200 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-sm">Concordancia nominal y verbal sin discordancias directas.</p>
                  <p className="mt-1 text-emerald-800/90 dark:text-emerald-300">
                    No se han detectado desajustes de género ni número en los sintagmas nominales principales. Ahora profundiza en la brecha con el modelo nativo a continuación.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {diagnosticResult.agreementDiagnostics.map(diag => (
                  <div
                    key={diag.id}
                    className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 space-y-2"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-mono text-xs font-bold text-amber-900 dark:text-amber-200 px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-900/40 border border-amber-300 dark:border-amber-700">
                        Segmento conflictivo: "{diag.problematicSegment}"
                      </span>
                      <span className="text-[11px] font-semibold text-amber-800 dark:text-amber-300">
                        {diag.type === 'gender'
                          ? 'Desajuste de Género'
                          : diag.type === 'number'
                          ? 'Desajuste de Número'
                          : diag.type === 'calque_aspect'
                          ? 'Calco de Duración Temporal'
                          : 'Atenuación Pragmática'}
                      </span>
                    </div>

                    <p className="text-xs text-stone-800 dark:text-stone-200 leading-relaxed">
                      {diag.explanation_es}
                    </p>

                    <div className="pt-2 border-t border-amber-200/50 dark:border-amber-800/30 flex flex-wrap items-center justify-between text-xs gap-2">
                      <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-semibold">
                        <span>Corrección sugerida:</span>
                        <span className="font-bold underline">{diag.suggestedCorrection}</span>
                      </div>
                      <span className="text-[10px] text-stone-600 dark:text-stone-300 italic">
                        {diag.ruleCitation}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 🧠 Merrill Swain's Pushed-Output 3 Self-Noticing Checks */}
          <div className="bg-white dark:bg-[#181615] border border-stone-200 dark:border-stone-800 rounded-3xl p-6 md:p-8 shadow-xs space-y-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-[#C85A32]" />
                <h3 className="text-base font-bold font-serif text-stone-900 dark:text-stone-100">
                  Protocolo de Auto-Identificación de Brechas (Noticing the Gap)
                </h3>
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-400">
                Según la teoría de Merrill Swain, no basta con leer la solución nativa. Debes identificar conscientemente las tres divergencias sintácticas antes de registrar la producción en tu cuaderno.
              </p>
            </div>

            <div className="space-y-5">
              {diagnosticResult.selfNoticingChecks.map((check, checkIdx) => {
                const selectedOptIdx = selectedNoticingAnswers[check.id];
                const isAnswered = selectedOptIdx !== undefined;
                const isCorrect = isAnswered && check.options[selectedOptIdx]?.isCorrect;

                return (
                  <div
                    key={check.id}
                    className={`p-5 rounded-2xl border transition-all ${
                      isCorrect
                        ? 'border-emerald-300 dark:border-emerald-800 bg-emerald-50/40 dark:bg-emerald-950/20'
                        : isAnswered
                        ? 'border-amber-300 dark:border-amber-800 bg-amber-50/40 dark:bg-amber-950/20'
                        : 'border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-850/60'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-6 h-6 rounded-full bg-[#C85A32] text-white text-xs font-bold flex items-center justify-center shrink-0">
                        {checkIdx + 1}
                      </span>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 dark:text-stone-100">
                        {check.syntacticFeature}
                      </h4>
                    </div>

                    <p className="text-xs md:text-sm text-stone-800 dark:text-stone-200 font-medium mb-3">
                      {check.contrastPrompt_es}
                    </p>

                    {/* Options */}
                    <div className="space-y-2">
                      {check.options.map((opt, optIdx) => {
                        const isChosen = selectedOptIdx === optIdx;
                        return (
                          <button
                            key={optIdx}
                            type="button"
                            onClick={() => handleSelectNoticingOption(check.id, optIdx)}
                            className={`w-full p-3 rounded-xl text-left text-xs transition cursor-pointer flex items-start gap-2.5 ${
                              isChosen
                                ? opt.isCorrect
                                  ? 'bg-emerald-100 dark:bg-emerald-900/40 border border-emerald-400 text-emerald-900 dark:text-emerald-100 font-semibold'
                                  : 'bg-amber-100 dark:bg-amber-900/40 border border-amber-400 text-amber-900 dark:text-amber-100'
                                : 'bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-750'
                            }`}
                          >
                            <span className="w-4 h-4 rounded-full border border-current flex items-center justify-center shrink-0 mt-0.5 text-[10px]">
                              {isChosen ? (opt.isCorrect ? '✓' : '✗') : ''}
                            </span>
                            <span>{opt.text}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Feedback on selection */}
                    {isAnswered && (
                      <p
                        className={`mt-2.5 text-xs font-medium ${
                          isCorrect ? 'text-emerald-700 dark:text-emerald-300' : 'text-amber-700 dark:text-amber-300'
                        }`}
                      >
                        {check.options[selectedOptIdx].explanation}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Commit to Learning Journal CTA */}
            <div className="pt-4 border-t border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="text-xs text-stone-600 dark:text-stone-400">
                {allNoticingChecksAnswered ? (
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Las 3 brechas sintácticas han sido identificadas con éxito.</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400">
                    <HelpCircle className="w-4 h-4" />
                    <span>Selecciona la respuesta correcta en los 3 contrastes para desbloquear el registro.</span>
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    soundEffects.playPop();
                    setCurrentStep('prompt');
                  }}
                  className="px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 text-xs font-bold hover:bg-stone-100 dark:hover:bg-stone-800 transition cursor-pointer"
                >
                  Reescribir Frase
                </button>

                <button
                  type="button"
                  disabled={!allNoticingChecksAnswered || isSaving || journalSaved}
                  onClick={handleCommitToJournal}
                  className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-stone-300 dark:disabled:bg-stone-800 disabled:cursor-not-allowed text-white text-xs md:text-sm font-bold flex items-center gap-2 shadow-xs transition cursor-pointer"
                >
                  {isSaving ? (
                    <span>Guardando en Firestore...</span>
                  ) : journalSaved ? (
                    <>
                      <FileCheck className="w-4 h-4" />
                      <span>¡Guardado en Cuaderno! (+60 XP)</span>
                    </>
                  ) : (
                    <>
                      <Award className="w-4 h-4" />
                      <span>Guardar en Cuaderno de Aprendizaje</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Next Scenario Button if saved */}
            {journalSaved && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-800 flex items-center justify-between flex-wrap gap-3"
              >
                <div className="text-xs text-emerald-900 dark:text-emerald-200">
                  <span className="font-bold">Sesión de producción consolidada.</span> Tu interlengua avanzó hacia el modelo nativo al interiorizar la brecha sintáctica.
                </div>
                <button
                  type="button"
                  onClick={handleNextScenario}
                  className="px-5 py-2.5 rounded-xl bg-stone-900 dark:bg-white text-white dark:text-stone-900 text-xs font-bold flex items-center gap-2 transition cursor-pointer ml-auto"
                >
                  <span>Siguiente Situación Comunicativa</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </div>
        </div>
      )}

      {/* STEP 3: PERSISTED LEARNING JOURNAL HISTORY */}
      {currentStep === 'journal_history' && (
        <div className="bg-white dark:bg-[#181615] border border-stone-200 dark:border-stone-800 rounded-3xl p-6 md:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <div className="flex items-center gap-2">
                <BookMarked className="w-5 h-5 text-[#C85A32]" />
                <h2 className="text-lg md:text-xl font-bold font-serif text-stone-900 dark:text-stone-100">
                  Cuaderno de Aprendizaje (Firestore Collection `learningJournal`)
                </h2>
              </div>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Registro persistente de tus producciones abiertas, errores de concordancia identificados y modelos nativos interiorizados.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                soundEffects.playPop();
                setCurrentStep('prompt');
              }}
              className="px-4 py-2 rounded-xl bg-[#C85A32] text-white text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
            >
              <span>Nueva Producción</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {journalEntries.length === 0 ? (
            <div className="p-8 text-center rounded-2xl bg-stone-50 dark:bg-stone-850/60 border border-stone-200 dark:border-stone-800 space-y-2">
              <BookOpen className="w-8 h-8 text-stone-400 mx-auto" />
              <p className="text-sm font-bold text-stone-700 dark:text-stone-300">
                Tu cuaderno de producción está vacío por ahora.
              </p>
              <p className="text-xs text-stone-500 max-w-md mx-auto">
                Completa tu primer ejercicio de producción empujada en la farmacia de Sevilla para registrar tus brechas sintácticas.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {journalEntries.map(entry => (
                <div
                  key={entry.id}
                  className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-850 border border-stone-200 dark:border-stone-800 space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-bold text-stone-900 dark:text-stone-100">
                      {entry.scenarioTitle}
                    </span>
                    <span className="text-[11px] font-mono text-stone-500">
                      {new Date(entry.createdAt).toLocaleDateString('es-ES', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>

                  {/* Learner Draft */}
                  <div className="p-3 rounded-xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs leading-relaxed text-stone-800 dark:text-stone-200">
                    <span className="font-bold text-[10px] uppercase text-stone-600 dark:text-stone-300 block mb-1">
                      Tu Producción ({entry.wordCount} palabras):
                    </span>
                    {entry.learnerOutput}
                  </div>

                  {/* Native Model */}
                  <div className="p-3 rounded-xl bg-[#C85A32]/5 dark:bg-[#C85A32]/10 border border-[#C85A32]/20 text-xs leading-relaxed text-stone-800 dark:text-stone-200">
                    <span className="font-bold text-[10px] uppercase text-[#C85A32] dark:text-[#E07A5F] block mb-1">
                      Modelo Nativo Interiorizado:
                    </span>
                    {entry.nativeModel}
                  </div>

                  <div className="flex flex-wrap items-center justify-between text-[11px] text-stone-500 gap-2 pt-1 border-t border-stone-200/50 dark:border-stone-800/50">
                    <span>
                      Discordancias corregidas: <strong>{entry.agreementErrorsCount}</strong>
                    </span>
                    <span>
                      Ciudad: <strong>{entry.citySetting}</strong>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PushedOutputDrill;
