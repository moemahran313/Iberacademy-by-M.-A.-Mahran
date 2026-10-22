import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Lightbulb,
  Volume2,
  Mic,
  Square,
  Play,
  RotateCcw,
  ArrowRight,
  HelpCircle,
  Ear
} from 'lucide-react';
import { ExerciseFeedbackState, ContrastiveExplanation } from '../../types/gamification';
import { speakSpanish } from '../../utils/audio';
import { soundEffects } from '../../utils/soundEffects';

interface FeedbackBannerProps {
  feedback: ExerciseFeedbackState;
  onTryWithHint?: () => void;
  onProceed?: () => void;
  proceedLabel?: string;
}

export const FeedbackBanner: React.FC<FeedbackBannerProps> = ({
  feedback,
  onTryWithHint,
  onProceed,
  proceedLabel = 'Continuar'
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [userAudioUrl, setUserAudioUrl] = useState<string | null>(null);
  const [isPlayingUserAudio, setIsPlayingUserAudio] = useState(false);
  const [isPlayingNativeAudio, setIsPlayingNativeAudio] = useState(false);
  const [showVoiceLab, setShowVoiceLab] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const userAudioPlayerRef = useRef<HTMLAudioElement | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  // Clean up audio objects on unmount
  useEffect(() => {
    return () => {
      if (userAudioUrl) {
        URL.revokeObjectURL(userAudioUrl);
      }
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(t => t.stop());
      }
    };
  }, [userAudioUrl]);

  const handlePlayNative = () => {
    if (!feedback.nativeAudioModel) return;
    setIsPlayingNativeAudio(true);
    speakSpanish(feedback.nativeAudioModel);
    setTimeout(() => {
      setIsPlayingNativeAudio(false);
    }, 1800);
  };

  const handleStartRecording = async () => {
    try {
      if (userAudioUrl) {
        URL.revokeObjectURL(userAudioUrl);
        setUserAudioUrl(null);
      }
      audioChunksRef.current = [];

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;

      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setUserAudioUrl(url);
        stream.getTracks().forEach(t => t.stop());
      };

      recorder.start();
      setIsRecording(true);
      soundEffects.playPop();
    } catch {
      console.warn('Microphone permission not granted or unsupported');
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      soundEffects.playPop();
    }
  };

  const handlePlayUserAudio = () => {
    if (!userAudioUrl) return;
    if (!userAudioPlayerRef.current) {
      userAudioPlayerRef.current = new Audio(userAudioUrl);
      userAudioPlayerRef.current.onended = () => setIsPlayingUserAudio(false);
    } else {
      userAudioPlayerRef.current.src = userAudioUrl;
    }

    setIsPlayingUserAudio(true);
    userAudioPlayerRef.current.play().catch(() => setIsPlayingUserAudio(false));
  };

  if (feedback.status === 'idle') return null;

  // Soft pastel theme styling based on Krashen affective filter elimination
  // Success: Emerald (#10B981)
  // Attention: Warm Amber (#F59E0B)
  // Insight: Soft Indigo/Lavender (#6366F1)
  const isSuccess = feedback.status === 'success';
  const isInsight = feedback.status === 'insight';
  const isAttention = feedback.status === 'attention';

  const containerBg = isSuccess
    ? 'bg-emerald-500/10 border-emerald-500/30'
    : isInsight
    ? 'bg-indigo-500/10 border-indigo-500/30'
    : 'bg-amber-500/10 border-amber-500/30';

  const titleColor = isSuccess
    ? 'text-emerald-700 dark:text-emerald-300'
    : isInsight
    ? 'text-indigo-700 dark:text-indigo-300'
    : 'text-amber-700 dark:text-amber-300';

  const iconBadge = isSuccess ? (
    <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
      <Sparkles className="w-4 h-4" />
    </div>
  ) : isInsight ? (
    <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
      <Lightbulb className="w-4 h-4" />
    </div>
  ) : (
    <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
      <Lightbulb className="w-4 h-4" />
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={`p-4 sm:p-5 rounded-2xl border ${containerBg} shadow-sm space-y-4`}
    >
      {/* 1. Header with Soft Affirmation & Micro-Audio Trigger */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          {iconBadge}
          <div className="space-y-0.5">
            <h4 className={`text-sm sm:text-base font-bold ${titleColor}`}>
              {feedback.title}
            </h4>
            <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
              {feedback.message_en}
            </p>
            {feedback.message_ar && (
              <p className="text-xs text-amber-900/80 dark:text-amber-300/80 font-arabic pt-0.5" dir="rtl">
                {feedback.message_ar}
              </p>
            )}
          </div>
        </div>

        {/* Form-Focused Micro-Echo Native Pronunciation Button */}
        {feedback.nativeAudioModel && (
          <button
            onClick={handlePlayNative}
            disabled={isPlayingNativeAudio}
            className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-white dark:bg-stone-800 hover:bg-stone-100 dark:hover:bg-stone-700 border border-stone-200/80 dark:border-stone-700 text-stone-700 dark:text-stone-200 shadow-2xs text-xs font-bold flex items-center gap-1.5 shrink-0 transition cursor-pointer"
            title="Escuchar pronunciación del modelo nativo"
          >
            <Volume2 className={`w-4 h-4 text-amber-600 dark:text-amber-400 ${isPlayingNativeAudio ? 'animate-pulse' : ''}`} />
            <span className="hidden sm:inline">Modelo Nativo</span>
          </button>
        )}
      </div>

      {/* 2. Contrastive Cognitive Re-framing Snippet (e.g. Por vs Para, Ser vs Estar) */}
      {feedback.contrastiveSnippet && (
        <div className="p-3.5 rounded-xl bg-white/70 dark:bg-stone-900/70 border border-stone-200/80 dark:border-stone-800/80 space-y-2.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-stone-800 dark:text-stone-200">
            <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
            <span>{feedback.contrastiveSnippet.contrastTitle}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {/* Selected Word Context */}
            <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 space-y-1">
              <span className="text-[10px] uppercase font-black tracking-wider text-amber-800 dark:text-amber-300 block">
                Tu selección: "{feedback.contrastiveSnippet.selectedToken}"
              </span>
              <p className="text-stone-700 dark:text-stone-300 leading-snug">
                {feedback.contrastiveSnippet.selectedContextNotice}
              </p>
            </div>

            {/* Target Native Word Context */}
            <div className="p-2.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 space-y-1">
              <span className="text-[10px] uppercase font-black tracking-wider text-indigo-800 dark:text-indigo-300 block">
                Patrón nativo: "{feedback.contrastiveSnippet.correctToken}"
              </span>
              <p className="text-stone-700 dark:text-stone-300 leading-snug">
                {feedback.contrastiveSnippet.correctContextNotice}
              </p>
            </div>
          </div>

          <p className="text-[11px] text-stone-500 dark:text-stone-400 italic">
            💡 {feedback.contrastiveSnippet.contrastRule}
          </p>
        </div>
      )}

      {/* 3. Form-Focused Micro-Echo Self-Voice Lab (Zero Evaluation / Low Anxiety) */}
      {feedback.nativeAudioModel && (
        <div className="pt-1">
          {!showVoiceLab ? (
            <button
              onClick={() => setShowVoiceLab(true)}
              className="text-xs font-bold text-stone-600 dark:text-stone-400 hover:text-amber-600 dark:hover:text-amber-400 flex items-center gap-1.5 cursor-pointer transition"
            >
              <Ear className="w-3.5 h-3.5 text-amber-500" />
              <span>🎙️ Laboratorio de Micro-Eco: Graba y contrasta tu voz sin penalizaciones</span>
            </button>
          ) : (
            <div className="p-3 rounded-xl bg-white/60 dark:bg-stone-900/60 border border-stone-200/60 dark:border-stone-800/60 space-y-2.5 animate-fadeIn">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
                  <Mic className="w-3.5 h-3.5 text-amber-500" />
                  Laboratorio de Contraste Fonético Libre (Auto-escucha sin calificación)
                </span>
                <button
                  onClick={() => setShowVoiceLab(false)}
                  className="text-[11px] text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 cursor-pointer"
                >
                  Ocultar
                </button>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                {/* 1. Play native model */}
                <button
                  onClick={handlePlayNative}
                  className="px-3 py-1.5 rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-xs font-bold text-stone-700 dark:text-stone-200 flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5 text-amber-500" />
                  <span>1. Escuchar Modelo</span>
                </button>

                {/* 2. Record self */}
                {!isRecording ? (
                  <button
                    onClick={handleStartRecording}
                    className="px-3 py-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-xs font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <Mic className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                    <span>2. Grabar Mi Intento</span>
                  </button>
                ) : (
                  <button
                    onClick={handleStopRecording}
                    className="px-3 py-1.5 rounded-lg bg-rose-500/15 border border-rose-500/30 text-xs font-bold text-rose-700 dark:text-rose-300 flex items-center gap-1.5 transition cursor-pointer animate-pulse"
                  >
                    <Square className="w-3.5 h-3.5 text-rose-600 fill-current" />
                    <span>Detener Grabación</span>
                  </button>
                )}

                {/* 3. Replay self */}
                {userAudioUrl && (
                  <button
                    onClick={handlePlayUserAudio}
                    disabled={isPlayingUserAudio}
                    className="px-3 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>3. Escuchar Mi Intento</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 4. Action Row: Try with Hint (No Penalty) vs Proceed */}
      <div className="flex items-center justify-between pt-1 flex-wrap gap-2">
        {/* Try with hint button: explicitly communicates zero punishment */}
        {feedback.canTryWithHint && onTryWithHint && (
          <button
            onClick={() => {
              soundEffects.playInsightChime();
              onTryWithHint();
            }}
            className="px-3.5 py-2 rounded-xl bg-white dark:bg-stone-800 hover:bg-amber-50 dark:hover:bg-amber-950/40 border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-200 text-xs font-bold flex items-center gap-1.5 shadow-2xs transition cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
            <span>💡 Intentar con Pista (Sin penalización)</span>
          </button>
        )}

        <div className="ml-auto">
          {onProceed && (
            <button
              onClick={() => {
                soundEffects.playPop();
                onProceed();
              }}
              className="px-5 py-2 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-extrabold hover:opacity-90 shadow-2xs transition flex items-center gap-1.5 cursor-pointer"
            >
              <span>{proceedLabel}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};
