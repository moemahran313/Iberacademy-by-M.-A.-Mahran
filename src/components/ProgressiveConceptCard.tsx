import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Volume2,
  ChevronDown,
  ChevronUp,
  Layers,
  BookOpen,
  GraduationCap,
  Brain,
  MessageSquare,
  CheckCircle2,
  HelpCircle,
  Lightbulb,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  Flame,
  Check,
  X
} from 'lucide-react';
import { GrammarTopic } from '../types';
import { TEN_POINT_GRAMMAR_MATRICES } from '../data/slaGrammarEngine';
import { speakSpanish, soundEffects } from '../utils/audio';

interface ProgressiveConceptCardProps {
  topic: GrammarTopic;
  onPracticeWithAI?: (topic: GrammarTopic) => void;
  onLaunchPatternDiscovery?: (topicId: string) => void;
  onReportIssue?: (topic: GrammarTopic) => void;
  className?: string;
  defaultTier?: 1 | 2 | 3;
}

export const ProgressiveConceptCard: React.FC<ProgressiveConceptCardProps> = ({
  topic,
  onPracticeWithAI,
  onLaunchPatternDiscovery,
  onReportIssue,
  className = '',
  defaultTier = 1
}) => {
  // Progressive Unveiling State: 1 = At-a-Glance Anchor, 2 = Context & Patterns, 3 = Full SLA Deep Dive
  const [activeTier, setActiveTier] = useState<1 | 2 | 3>(defaultTier);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeTabLang, setActiveTabLang] = useState<'bilingual' | 'en' | 'ar'>('bilingual');

  const matrix = TEN_POINT_GRAMMAR_MATRICES.find((m) => m.topicId === topic.id);

  const handlePlayTitleAudio = () => {
    soundEffects.playPop();
    setIsPlayingAudio(true);
    speakSpanish(topic.title_es);
    setTimeout(() => setIsPlayingAudio(false), 1800);
  };

  const handleTierToggle = (targetTier: 1 | 2 | 3) => {
    soundEffects.playPop();
    // Toggle: if clicking current active expanded tier, collapse to tier 1
    if (activeTier === targetTier && targetTier !== 1) {
      setActiveTier(1);
    } else {
      setActiveTier(targetTier);
    }
  };

  // Sentence patterns from topic.examples, or fallback to real_world_examples / 10-point matrix
  const sentenceExamples = topic.examples && topic.examples.length > 0
    ? topic.examples
    : (topic.real_world_examples && topic.real_world_examples.length > 0
        ? topic.real_world_examples.map((ex) => ({
            es: ex.after,
            en: ex.english,
            ar: ex.context,
            note: ex.before
          }))
        : (matrix?.ten_point_matrix?.slice(0, 4).map((p) => ({
            es: p.es,
            en: p.en,
            ar: p.ar || '',
            note: p.label
          })) || []));

  return (
    <div
      className={`bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800/90 rounded-3xl overflow-hidden shadow-sm transition-all duration-300 ${className}`}
    >
      {/* ========================================================================= */}
      {/* TIER 1: AT-A-GLANCE ANCHOR (Always Visible, Instant 5-Second Comprehension) */}
      {/* ========================================================================= */}
      <div className="p-5 sm:p-6 space-y-4">
        {/* Category & CEFR Header Metadata */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-black bg-amber-500 text-stone-950 uppercase tracking-wider shadow-2xs">
              UNIT {topic.unit || 1} • {topic.cefr}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 font-mono">
              {topic.category}
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full">
              <Sparkles className="w-3 h-3 text-amber-500" />
              Progressive Unveiling
            </span>
          </div>

          {onReportIssue && (
            <button
              onClick={() => onReportIssue(topic)}
              className="text-[11px] font-bold text-stone-400 hover:text-rose-500 transition cursor-pointer inline-flex items-center gap-1"
              title="Report an issue with this grammar rule"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
              <span>Report Issue</span>
            </button>
          )}
        </div>

        {/* Title Section with Native Pronunciation Audio */}
        <div className="space-y-1.5">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-0.5 flex-1">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h2 className="text-xl sm:text-2xl font-black text-stone-900 dark:text-white tracking-tight">
                  {topic.title_es}
                </h2>
                <button
                  onClick={handlePlayTitleAudio}
                  className={`p-1.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-amber-600 dark:text-amber-400 hover:scale-105 active:scale-95 transition cursor-pointer ${
                    isPlayingAudio ? 'animate-pulse ring-2 ring-amber-500/40' : ''
                  }`}
                  title="Pronounce Spanish Title"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-stone-600 dark:text-stone-400">
                🇬🇧 {topic.title_en}
              </p>
            </div>

            {/* Arabic Title (Cairo font) */}
            <p
              className="text-sm sm:text-base font-bold text-amber-800 dark:text-amber-400 font-arabic text-right max-w-[48%]"
              dir="rtl"
            >
              {topic.title_ar}
            </p>
          </div>
        </div>

        {/* Plain-Language 1-Sentence High-Level Takeaway */}
        <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/70 dark:border-stone-800 space-y-2">
          <div className="flex items-center gap-1.5 text-[10px] font-mono font-black uppercase text-amber-600 dark:text-amber-400 tracking-wider">
            <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
            <span>Core Takeaway (At-a-Glance Anchor):</span>
          </div>
          <p className="text-xs sm:text-sm font-medium text-stone-700 dark:text-stone-300 leading-relaxed">
            {topic.summary_en || topic.the_rule_in_plain_english}
          </p>
          {topic.summary_ar && (
            <p
              className="text-xs sm:text-sm font-bold text-amber-900 dark:text-amber-300 font-arabic text-right leading-relaxed pt-1.5 border-t border-stone-200/60 dark:border-stone-700/60"
              dir="rtl"
            >
              {topic.summary_ar}
            </p>
          )}
        </div>

        {/* Memory Formula / Rule Blueprint */}
        {topic.formula && (
          <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-amber-500 text-stone-950 flex items-center justify-center shrink-0 shadow-2xs">
                <Brain className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-mono font-black uppercase text-amber-700 dark:text-amber-400 block leading-tight">
                  Rule Blueprint & Formula:
                </span>
                <span className="text-xs font-black text-stone-900 dark:text-stone-100 truncate block font-mono">
                  {topic.formula}
                </span>
              </div>
            </div>
            <button
              onClick={() => speakSpanish(topic.formula || '')}
              className="p-1.5 text-amber-600 dark:text-amber-400 hover:text-amber-700 transition cursor-pointer shrink-0"
              title="Speak Formula"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Interactive Progressive Disclosure Controls */}
        <div className="pt-2 border-t border-stone-100 dark:border-stone-800/80 flex flex-wrap items-center justify-between gap-2">
          {/* Tier Switchers */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => handleTierToggle(1)}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer flex items-center gap-1.5 ${
                activeTier === 1
                  ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 shadow-xs'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
              }`}
            >
              <span>Tier 1: Anchor</span>
            </button>

            <button
              onClick={() => handleTierToggle(2)}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer flex items-center gap-1.5 ${
                activeTier >= 2
                  ? 'bg-amber-500 text-stone-950 font-black shadow-xs'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Tier 2: Examples</span>
              <span className="text-[10px] opacity-80">
                {activeTier >= 2 ? '▲' : '▼'}
              </span>
            </button>

            <button
              onClick={() => handleTierToggle(3)}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition cursor-pointer flex items-center gap-1.5 ${
                activeTier === 3
                  ? 'bg-purple-600 text-white font-black shadow-xs'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Tier 3: Full Deep Dive</span>
              <span className="text-[10px] opacity-80">
                {activeTier === 3 ? '▲' : '▼'}
              </span>
            </button>
          </div>

          {/* Quick AI Practice CTA */}
          {onPracticeWithAI && (
            <button
              onClick={() => onPracticeWithAI(topic)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-stone-950 dark:bg-amber-500 text-white dark:text-stone-950 font-black text-xs hover:opacity-90 transition shadow-xs cursor-pointer ml-auto"
            >
              <MessageSquare className="w-3.5 h-3.5 text-amber-400 dark:text-stone-950" />
              <span>Practice with Juan</span>
            </button>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TIER 2: COMPREHENSIBLE CONTEXT & REAL-WORLD PATTERNS                      */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {activeTier >= 2 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="border-t border-stone-200/70 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-950/40 p-5 sm:p-6 space-y-5"
          >
            <div className="flex items-center justify-between gap-2 border-b border-stone-200/70 dark:border-stone-800 pb-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                <h3 className="text-xs sm:text-sm font-black text-stone-900 dark:text-white uppercase tracking-wider font-mono">
                  Tier 2: Real-World Sentence Patterns & Context
                </h3>
              </div>
              <span className="text-[11px] font-bold text-stone-400">
                {sentenceExamples.length} Practical Examples
              </span>
            </div>

            {/* Examples Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {sentenceExamples.map((ex, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 space-y-2 shadow-2xs hover:border-amber-500/30 transition"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-black uppercase text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-stone-800 px-2 py-0.5 rounded-md">
                      {ex.note || `Example #${idx + 1}`}
                    </span>
                    <button
                      onClick={() => speakSpanish(ex.es)}
                      className="text-stone-400 hover:text-amber-500 p-1 transition cursor-pointer"
                      title="Pronounce Spanish sentence"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <p className="text-xs sm:text-sm font-black text-stone-900 dark:text-white leading-snug">
                    🇪🇸 {ex.es}
                  </p>
                  <p className="text-xs font-medium text-stone-600 dark:text-stone-400">
                    🇬🇧 {ex.en}
                  </p>
                  {ex.ar && (
                    <p className="text-xs font-bold text-amber-800 dark:text-amber-400 font-arabic text-right" dir="rtl">
                      🇦🇪 {ex.ar}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Common Mistakes & Pitfalls (if available) */}
            {topic.commonMistakes && topic.commonMistakes.length > 0 && (
              <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 space-y-3">
                <span className="text-xs font-black uppercase tracking-wider text-rose-600 dark:text-rose-400 flex items-center gap-1.5 font-mono">
                  <AlertTriangle className="w-4 h-4" />
                  Common Learner Pitfalls (احذر هذه الأخطاء):
                </span>
                <div className="space-y-2.5">
                  {topic.commonMistakes.map((mistake, idx) => (
                    <div key={idx} className="p-3 bg-white dark:bg-stone-900/90 rounded-xl border border-rose-200 dark:border-rose-900/40 space-y-1 text-xs">
                      <p className="text-rose-600 font-semibold line-through">❌ {mistake.incorrect}</p>
                      <p className="text-emerald-600 font-bold">✅ {mistake.correct}</p>
                      <p className="text-stone-600 dark:text-stone-400 text-[11px] pt-0.5">
                        💡 {mistake.reason_en}
                      </p>
                      {mistake.reason_ar && (
                        <p className="text-amber-900 dark:text-amber-300 font-arabic text-right font-bold text-[11px]" dir="rtl">
                          {mistake.reason_ar}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Pattern Discovery Launcher */}
            {onLaunchPatternDiscovery && (
              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => onLaunchPatternDiscovery(topic.id)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline cursor-pointer"
                >
                  <Brain className="w-4 h-4" />
                  <span>Launch Interactive Pattern Discovery Quiz →</span>
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* TIER 3: DEEP TECHNICAL NUANCE, EXPOSITIONS & 10-POINT SLA MATRIX         */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {activeTier === 3 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.32, ease: 'easeOut' }}
            className="border-t-2 border-purple-500/30 bg-white dark:bg-stone-900/80 p-5 sm:p-6 space-y-6"
          >
            <div className="flex items-center justify-between gap-2 border-b border-stone-200/70 dark:border-stone-800 pb-2">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                <h3 className="text-xs sm:text-sm font-black text-stone-900 dark:text-white uppercase tracking-wider font-mono">
                  Tier 3: Comprehensive SLA Mechanics & 10-Point Matrix
                </h3>
              </div>
              <span className="text-[11px] font-bold text-purple-600 dark:text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full">
                Full Mastery Mode
              </span>
            </div>

            {/* Bilingual Deep Dive Expositions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* English Explanation */}
              <div className="bg-stone-50 dark:bg-stone-800/40 p-4 sm:p-5 rounded-2xl border border-stone-200/80 dark:border-stone-800 space-y-2">
                <span className="text-xs font-black uppercase tracking-wider text-stone-600 dark:text-stone-300 flex items-center gap-1.5 font-mono">
                  <BookOpen className="w-4 h-4 text-amber-500" />
                  English Deep Dive
                </span>
                <div className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed whitespace-pre-line">
                  {topic.fullContent_en}
                </div>
              </div>

              {/* Arabic Explanation with Cairo Font */}
              <div
                className="bg-amber-50/40 dark:bg-stone-800/30 p-4 sm:p-5 rounded-2xl border border-amber-200/60 dark:border-stone-800 space-y-2 text-right"
                dir="rtl"
              >
                <span className="text-xs font-black uppercase tracking-wider text-amber-800 dark:text-amber-400 flex items-center gap-1.5 justify-end font-arabic">
                  <GraduationCap className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  الشرح اللغوي المفصل بالعربية
                </span>
                <div className="text-xs sm:text-sm text-stone-800 dark:text-stone-200 leading-relaxed whitespace-pre-line font-arabic font-medium">
                  {topic.fullContent_ar}
                </div>
              </div>
            </div>

            {/* 10-Point Demonstration Matrix */}
            {matrix && (
              <div className="p-5 bg-gradient-to-br from-amber-50/60 to-orange-50/40 dark:from-stone-800/60 dark:to-stone-900 border border-amber-200/70 dark:border-stone-700 rounded-3xl space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-amber-200/70 dark:border-stone-700 pb-3 gap-2">
                  <div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-black bg-amber-500 text-stone-950 uppercase">
                      10-Point Demonstration Matrix
                    </span>
                    <h4 className="text-base font-black text-stone-900 dark:text-white mt-1">
                      {matrix.title}
                    </h4>
                  </div>
                  <span className="text-xs font-mono font-bold text-amber-800 dark:text-amber-400 bg-amber-100 dark:bg-stone-800 px-3 py-1 rounded-xl w-fit">
                    {matrix.formula}
                  </span>
                </div>

                <p className="text-xs text-stone-700 dark:text-stone-300 font-medium">
                  💡 {matrix.plain_english_concept}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {matrix.ten_point_matrix.map((point) => (
                    <div
                      key={point.point_number}
                      className="p-3 bg-white dark:bg-stone-800 rounded-xl border border-stone-200/80 dark:border-stone-700 space-y-1 shadow-2xs"
                    >
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="font-mono font-black text-amber-800 dark:text-amber-400 bg-amber-100 dark:bg-stone-900 px-2 py-0.5 rounded">
                          {point.label}
                        </span>
                        <span className="font-mono text-stone-400">
                          #{point.point_number}
                        </span>
                      </div>

                      <button
                        onClick={() => speakSpanish(point.es)}
                        className="text-left font-bold text-xs sm:text-sm text-stone-900 dark:text-white flex items-center gap-1.5 hover:text-amber-500 transition cursor-pointer w-full group"
                      >
                        <span className="group-hover:text-amber-500">🇪🇸 {point.es}</span>
                        <Volume2 className="w-3.5 h-3.5 text-amber-500 shrink-0 ml-auto opacity-70 group-hover:opacity-100" />
                      </button>

                      <p className="text-[11px] text-stone-500 dark:text-stone-400">
                        🇬🇧 {point.en}
                      </p>
                      {point.note && (
                        <p className="text-[10px] text-amber-900/80 dark:text-amber-400/80 font-mono pt-0.5">
                          📌 {point.note}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
