import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  KeyRound,
  Mic,
  MicOff,
  Send,
  AlertCircle,
  HelpCircle,
  Volume2,
  CheckCircle2,
  Info,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { PushedOutputScenario } from '../../services/grammarDiagnostics';
import { speakSpanish } from '../../utils/audio';
import { soundEffects } from '../../utils/soundEffects';

interface FreeProductionPromptProps {
  scenario: PushedOutputScenario;
  onSubmitProduction: (text: string, assistedLemmasRevealed: string[]) => void;
  isSubmitting?: boolean;
}

export const FreeProductionPrompt: React.FC<FreeProductionPromptProps> = ({
  scenario,
  onSubmitProduction,
  isSubmitting = false
}) => {
  const [productionText, setProductionText] = useState('');
  const [showKeywordAssistance, setShowKeywordAssistance] = useState(false);
  const [revealedLemmas, setRevealedLemmas] = useState<string[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSupported, setRecordingSupported] = useState(false);
  const [speechError, setSpeechError] = useState<string | null>(null);

  const recognitionRef = useRef<any>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Compute clean word count
  const wordTokens = productionText
    .trim()
    .split(/\s+/)
    .filter(w => w.length > 0);
  const wordCount = wordTokens.length;
  const isThresholdMet = wordCount >= scenario.minWords;
  const wordsRemaining = Math.max(0, scenario.minWords - wordCount);

  // Initialize SpeechRecognition on mount
  useEffect(() => {
    const SpeechRec =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRec) {
      setRecordingSupported(true);
      const recognition = new SpeechRec();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'es-ES'; // Spanish (Spain)

      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            transcript += event.results[i][0].transcript + ' ';
          }
        }
        if (transcript) {
          setProductionText(prev => {
            const separator = prev.length > 0 && !prev.endsWith(' ') ? ' ' : '';
            return prev + separator + transcript.trim();
          });
        }
      };

      recognition.onerror = (event: any) => {
        console.warn('SpeechRecognition error:', event.error);
        setIsRecording(false);
        if (event.error === 'not-allowed') {
          setSpeechError('Permiso de micrófono denegado. Puedes escribir directamente.');
        }
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const toggleRecording = () => {
    if (!recognitionRef.current) return;
    setSpeechError(null);

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
      soundEffects.playPop();
    } else {
      try {
        recognitionRef.current.start();
        setIsRecording(true);
        soundEffects.playInsightChime();
      } catch (e) {
        console.warn('Speech start error:', e);
      }
    }
  };

  const toggleKeywordAssistance = () => {
    soundEffects.playPop();
    const willShow = !showKeywordAssistance;
    setShowKeywordAssistance(willShow);
    if (willShow && revealedLemmas.length === 0) {
      setRevealedLemmas(scenario.assistedLemmas.map(l => l.lemma));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isThresholdMet || isSubmitting) return;
    soundEffects.playCorrect();
    onSubmitProduction(productionText.trim(), revealedLemmas);
  };

  return (
    <div className="space-y-6">
      {/* 🎯 Scenario Context Card */}
      <div className="bg-white dark:bg-[#181615] border border-stone-200 dark:border-stone-800 rounded-3xl p-6 md:p-8 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#C85A32]/10 text-[#C85A32] dark:text-[#E07A5F] border border-[#C85A32]/20">
              Hipótesis del Output Empujado (Merrill Swain)
            </span>
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
              {scenario.citySetting}
            </span>
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200/50">
              Nivel CEFR: {scenario.cefrLevel}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-medium text-stone-500 dark:text-stone-400">
            <span>Registro:</span>
            <span className="font-bold text-stone-800 dark:text-stone-200">
              {scenario.register === 'formal_usted' ? 'Formal (Usted)' : 'Informal (Tú)'}
            </span>
          </div>
        </div>

        <h2 className="text-xl md:text-2xl font-bold font-serif text-stone-900 dark:text-stone-100 mb-2">
          {scenario.title_es}
        </h2>
        <p className="text-xs text-stone-500 dark:text-stone-400 mb-4 italic">
          {scenario.title_en}
        </p>

        {/* Immersion Situation Prompt */}
        <div className="bg-stone-50 dark:bg-stone-850/70 border border-stone-200/80 dark:border-stone-800/80 rounded-2xl p-4 md:p-5 mb-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-[#C85A32]/15 text-[#C85A32] rounded-xl shrink-0 mt-0.5">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="space-y-1.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                Situación Comunicativa Real
              </h3>
              <p className="text-sm md:text-base font-medium text-stone-900 dark:text-stone-100 leading-relaxed">
                {scenario.promptSituation_es}
              </p>
              <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed pt-1 border-t border-stone-200/50 dark:border-stone-800/50">
                {scenario.promptSituation_en}
              </p>
            </div>
          </div>
        </div>

        {/* Context badges */}
        <div className="flex flex-wrap items-center gap-2">
          {scenario.contextBadges.map((badge, idx) => (
            <span
              key={idx}
              className="text-xs font-medium px-2.5 py-1 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300"
            >
              • {badge}
            </span>
          ))}
        </div>
      </div>

      {/* 💡 Minimalist Scaffolding: Keyword Assistance Slider (Strictly No Auto-fill) */}
      <div className="bg-white dark:bg-[#181615] border border-stone-200 dark:border-stone-800 rounded-3xl p-5 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <KeyRound className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300">
              Asistencia Léxica y Sintáctica (3 Lemas Clave)
            </span>
          </div>

          <button
            type="button"
            onClick={toggleKeywordAssistance}
            className="flex items-center gap-1.5 text-xs font-bold text-[#C85A32] dark:text-[#E07A5F] hover:underline cursor-pointer"
          >
            <span>{showKeywordAssistance ? 'Ocultar Lemas' : 'Revelar Lemas de Apoyo'}</span>
            {showKeywordAssistance ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        <AnimatePresence>
          {showKeywordAssistance && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 pt-4 border-t border-stone-200/80 dark:border-stone-800/80 space-y-3"
            >
              <div className="p-3 bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/50 dark:border-amber-800/40 rounded-xl text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2">
                <Info className="w-4 h-4 shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
                <span>
                  <strong>Principio de Recuperación Activa:</strong> Los lemas se muestran solo como recordatorio cognitivo. No hay botón de autorrelleno; debes escribir o verbalizar las formas conjugadas tú mismo para fijar la huella motora y lingüística.
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {scenario.assistedLemmas.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-2xl bg-stone-50 dark:bg-stone-850 border border-stone-200 dark:border-stone-800 space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-sm text-[#C85A32] dark:text-[#E07A5F]">
                        {item.lemma}
                      </span>
                      <span className="text-[10px] uppercase font-semibold text-stone-600 dark:text-stone-300">
                        {item.pos}
                      </span>
                    </div>
                    <p className="text-xs text-stone-600 dark:text-stone-300 font-medium">
                      {item.translation_en}
                    </p>
                    <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-tight pt-1 border-t border-stone-200/40 dark:border-stone-800/40">
                      💡 {item.hintUsage}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ✍️ Production Input Area */}
      <form onSubmit={handleSubmit} className="bg-white dark:bg-[#181615] border border-stone-200 dark:border-stone-800 rounded-3xl p-6 md:p-8 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <label
            htmlFor="production-textarea"
            className="text-xs font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300 flex items-center gap-2"
          >
            <span>Tu Producción Sintáctica en Español</span>
            <span className="text-stone-600 dark:text-stone-300 font-normal">
              (Mínimo obligatorio: {scenario.minWords} palabras)
            </span>
          </label>

          {/* Word Count Indicator */}
          <div className="flex items-center gap-2">
            <div className="w-24 bg-stone-100 dark:bg-stone-800 h-2 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  isThresholdMet ? 'bg-emerald-500' : 'bg-amber-500'
                }`}
                style={{ width: `${Math.min(100, (wordCount / scenario.minWords) * 100)}%` }}
              />
            </div>
            <span
              className={`text-xs font-mono font-bold ${
                isThresholdMet ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'
              }`}
            >
              {wordCount} / {scenario.minWords} palabras
            </span>
          </div>
        </div>

        {/* Text Area */}
        <div className="relative">
          <textarea
            id="production-textarea"
            ref={textareaRef}
            rows={5}
            value={productionText}
            onChange={e => setProductionText(e.target.value)}
            placeholder="Escribe aquí tu frase completa en español dirigiéndote al farmacéutico en Sevilla..."
            className="w-full p-4 rounded-2xl bg-stone-50 dark:bg-stone-850/80 border border-stone-200 dark:border-stone-800 focus:outline-none focus:ring-2 focus:ring-[#C85A32]/40 text-stone-900 dark:text-stone-100 text-sm md:text-base leading-relaxed placeholder:text-stone-600 dark:placeholder:text-stone-400 resize-y"
          />

          {/* Voice Input Button inside / next to textarea */}
          {recordingSupported && (
            <button
              type="button"
              onClick={toggleRecording}
              className={`absolute right-3 bottom-3 p-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer shadow-xs ${
                isRecording
                  ? 'bg-rose-500 text-white animate-pulse'
                  : 'bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-100'
              }`}
              title={isRecording ? 'Detener dictado' : 'Dictar por voz en español'}
            >
              {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4 text-[#C85A32]" />}
              <span className="hidden sm:inline">{isRecording ? 'Escuchando...' : 'Dictar'}</span>
            </button>
          )}
        </div>

        {speechError && (
          <p className="text-xs text-rose-500 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{speechError}</span>
          </p>
        )}

        {/* Guidance Notice if below 15 words */}
        {!isThresholdMet && (
          <div className="p-3 bg-stone-100 dark:bg-stone-850 rounded-xl text-xs text-stone-600 dark:text-stone-400 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
            <span>
              Faltan <strong>{wordsRemaining}</strong> palabras para alcanzar el umbral de producción sintáctica de Merrill Swain (mínimo 15). Formula oraciones completas y subordinadas.
            </span>
          </div>
        )}

        {isThresholdMet && (
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40 rounded-xl text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>
              Umbral superado ({wordCount} palabras). Listo para analizar concordancia gramatical y contrastar brechas con el modelo nativo.
            </span>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={() => {
              if (productionText.trim().length > 0) {
                speakSpanish(productionText);
              }
            }}
            disabled={productionText.trim().length === 0}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 disabled:opacity-40 flex items-center gap-1.5 transition cursor-pointer"
          >
            <Volume2 className="w-4 h-4 text-stone-500" />
            <span>Escuchar mi frase</span>
          </button>

          <button
            type="submit"
            disabled={!isThresholdMet || isSubmitting}
            className="px-6 py-3 rounded-2xl bg-[#C85A32] hover:bg-[#B44C27] disabled:bg-stone-300 dark:disabled:bg-stone-800 disabled:cursor-not-allowed text-white text-xs md:text-sm font-bold flex items-center gap-2 shadow-xs transition cursor-pointer"
          >
            {isSubmitting ? (
              <span>Diagnosticando estructura...</span>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Analizar y Notar Brechas</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
