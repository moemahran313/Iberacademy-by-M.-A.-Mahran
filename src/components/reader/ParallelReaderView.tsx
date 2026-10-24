import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Volume2,
  Eye,
  EyeOff,
  Copy,
  Check,
  Languages,
  BookOpen,
  Sparkles,
  ChevronDown,
  ChevronUp,
  RotateCcw
} from 'lucide-react';
import { WordToken } from '../../utils/lingqEngine';
import {
  AcquisitionStage,
  MultiWordExpression,
  MWEMatch,
  MultiTokenSelection
} from '../../types/vocabulary';
import { UserProgress } from '../../types';
import { AlignedSentencePair, AlignedParagraphGroup } from '../../hooks/useSentenceAlignment';

interface ParallelReaderViewProps {
  paragraphGroups: AlignedParagraphGroup[];
  totalSentences: number;
  hasTranslations: boolean;
  hasArabic: boolean;
  userProgress: UserProgress;
  selectedToken: WordToken | null;
  selectedMWE: MultiWordExpression | null;
  selectedMWETokenIds: string[];
  multiTokenSelection: MultiTokenSelection | null;
  activeWordTokenId: string | null;
  activeSentenceIndex: number | null;
  activeParagraphIndex?: number | null;
  textSizeClass: string;
  tokenToWordIndexMap: Map<string, number>;
  tokenToMWEMap: Map<string, MWEMatch>;
  getStageVisualClass: (stage: AcquisitionStage, isSelected: boolean, isHighlightedByAudio: boolean) => string;
  getWordAcquisitionStage: (cleanWord: string, userProgress: UserProgress) => AcquisitionStage;
  handleTokenClick: (token: WordToken, event: React.MouseEvent) => void;
  handleTokenMouseDown: (token: WordToken, globalWordIdx: number, e: React.MouseEvent) => void;
  handleTokenMouseEnter: (globalWordIdx: number) => void;
  handleTouchStart: (globalWordIdx: number) => void;
  handleTouchEnd: () => void;
  handlePlaySentence: (sentenceText: string, sIdx: number, sentenceTokens: WordToken[]) => void;
}

export const ParallelReaderView: React.FC<ParallelReaderViewProps> = ({
  paragraphGroups,
  totalSentences,
  hasTranslations,
  hasArabic,
  userProgress,
  selectedToken,
  selectedMWE,
  selectedMWETokenIds,
  multiTokenSelection,
  activeWordTokenId,
  activeSentenceIndex,
  textSizeClass,
  tokenToWordIndexMap,
  tokenToMWEMap,
  getStageVisualClass,
  getWordAcquisitionStage,
  handleTokenClick,
  handleTokenMouseDown,
  handleTokenMouseEnter,
  handleTouchStart,
  handleTouchEnd,
  handlePlaySentence
}) => {
  // Scaffolding Fade-Out mode: blur translations by default to foster cognitive recall
  const [blurByDefault, setBlurByDefault] = useState<boolean>(true);
  // Track individual sentences that have been explicitly revealed by clicking
  const [revealedSentenceSet, setRevealedSentenceSet] = useState<Set<number>>(new Set());

  // Synchronous hover state: highlighting Sentence #N on one pane highlights Sentence #N on the other
  const [hoveredGlobalIndex, setHoveredGlobalIndex] = useState<number | null>(null);

  // Translation target language selection: English or Arabic (if available)
  const [targetLang, setTargetLang] = useState<'en' | 'ar'>(
    userProgress.targetDialect === 'ar' && hasArabic ? 'ar' : 'en'
  );

  // Track copied feedback
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Mobile accordion expanded sentences (for tap-to-reveal drawer on small screens)
  const [expandedMobileSentences, setExpandedMobileSentences] = useState<Set<number>>(new Set());

  // Refs for synchronized scroll containers on desktop
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const isSyncingScrollRef = useRef<boolean>(false);

  // Toggle blur for all translations
  const toggleMasterBlur = () => {
    setBlurByDefault(prev => {
      const next = !prev;
      if (!next) {
        // If unblurring all, reset individual reveals
        setRevealedSentenceSet(new Set());
      }
      return next;
    });
  };

  // Toggle reveal for a specific sentence
  const toggleSentenceReveal = (globalIndex: number, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setRevealedSentenceSet(prev => {
      const next = new Set(prev);
      if (next.has(globalIndex)) {
        next.delete(globalIndex);
      } else {
        next.add(globalIndex);
      }
      return next;
    });
  };

  // Mobile accordion toggle
  const toggleMobileDrawer = (globalIndex: number) => {
    setExpandedMobileSentences(prev => {
      const next = new Set(prev);
      if (next.has(globalIndex)) {
        next.delete(globalIndex);
      } else {
        next.add(globalIndex);
      }
      return next;
    });
  };

  // Copy sentence translation
  const handleCopySentence = (text: string, globalIndex: number, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(text);
    setCopiedIndex(globalIndex);
    setTimeout(() => setCopiedIndex(null), 1800);
  };

  // Synchronize scrolling between left and right panes on desktop when user scrolls either
  const handleLeftScroll = () => {
    if (isSyncingScrollRef.current) return;
    if (!leftColRef.current || !rightColRef.current) return;
    isSyncingScrollRef.current = true;
    const ratio =
      leftColRef.current.scrollTop /
      Math.max(1, leftColRef.current.scrollHeight - leftColRef.current.clientHeight);
    rightColRef.current.scrollTop =
      ratio * (rightColRef.current.scrollHeight - rightColRef.current.clientHeight);
    requestAnimationFrame(() => {
      isSyncingScrollRef.current = false;
    });
  };

  const handleRightScroll = () => {
    if (isSyncingScrollRef.current) return;
    if (!leftColRef.current || !rightColRef.current) return;
    isSyncingScrollRef.current = true;
    const ratio =
      rightColRef.current.scrollTop /
      Math.max(1, rightColRef.current.scrollHeight - rightColRef.current.clientHeight);
    leftColRef.current.scrollTop =
      ratio * (leftColRef.current.scrollHeight - leftColRef.current.clientHeight);
    requestAnimationFrame(() => {
      isSyncingScrollRef.current = false;
    });
  };

  // Auto-scroll to active sentence when audio is playing or sentence changes
  useEffect(() => {
    if (activeSentenceIndex !== null) {
      const leftEl = document.getElementById(`parallel-es-${activeSentenceIndex}`);
      const rightEl = document.getElementById(`parallel-target-${activeSentenceIndex}`);

      if (leftEl) {
        leftEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      if (rightEl) {
        rightEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  }, [activeSentenceIndex]);

  return (
    <div className="space-y-6">
      {/* Parallel Reader Scaffolding & Control Bar */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-3.5 sm:p-4 shadow-sm flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Left: Mode Title & Info */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-500/10 dark:bg-amber-400/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
              <span>Lector Bilingüe Paralelo</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 font-medium">
                {totalSentences} oraciones alineadas
              </span>
            </div>
            <p className="text-[11px] text-stone-500 dark:text-stone-400">
              Alineación oración por oración sincronizada con interactividad LingQ completa
            </p>
          </div>
        </div>

        {/* Right: Controls (Blur Scaffolding & Target Language) */}
        <div className="flex items-center gap-2 flex-wrap ml-auto">
          {/* Target Language Toggle (EN / AR) */}
          {hasArabic && (
            <div className="flex items-center bg-stone-100 dark:bg-stone-800 rounded-xl p-0.5 border border-stone-200 dark:border-stone-700 text-xs">
              <button
                onClick={() => setTargetLang('en')}
                className={`px-2.5 py-1 rounded-lg font-medium transition cursor-pointer ${
                  targetLang === 'en'
                    ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-white shadow-2xs font-bold'
                    : 'text-stone-500 dark:text-stone-400 hover:text-stone-800'
                }`}
              >
                🇬🇧 English
              </button>
              <button
                onClick={() => setTargetLang('ar')}
                className={`px-2.5 py-1 rounded-lg font-medium transition cursor-pointer font-arabic ${
                  targetLang === 'ar'
                    ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-white shadow-2xs font-bold'
                    : 'text-stone-500 dark:text-stone-400 hover:text-stone-800'
                }`}
              >
                🇸🇦 العربية
              </button>
            </div>
          )}

          {/* Scaffolding Fade-Out (Blur by Default) Toggle */}
          <button
            onClick={toggleMasterBlur}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-medium transition cursor-pointer ${
              blurByDefault
                ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700/60 text-amber-800 dark:text-amber-300 shadow-2xs'
                : 'bg-stone-100 dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-200/60'
            }`}
            title={
              blurByDefault
                ? 'El modo desenfoque oculta las traducciones para ejercitar el recuerdo activo. Haz clic o pasa el ratón para revelar.'
                : 'Traducciones visibles en todo momento.'
            }
          >
            {blurByDefault ? (
              <>
                <EyeOff className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>Desenfocado por Defecto</span>
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse ml-0.5" />
              </>
            ) : (
              <>
                <Eye className="w-3.5 h-3.5 text-stone-500" />
                <span>Traducción Visible</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Synchronized Columns Header (Desktop only) */}
      <div className="hidden lg:grid lg:grid-cols-2 gap-6 px-1 text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-base">🇪🇸</span>
            <span className="text-stone-800 dark:text-stone-200">Texto en Español (Interactivo LingQ)</span>
          </div>
          <span className="text-[11px] font-normal text-stone-400">Toca palabras para lema / SRS</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-base">{targetLang === 'ar' ? '🇸🇦' : '🇬🇧'}</span>
            <span className="text-stone-800 dark:text-stone-200">
              {targetLang === 'ar' ? 'الترجمة المرجعية (العربية)' : 'Reference Translation (English)'}
            </span>
          </div>
          {blurByDefault && (
            <span className="text-[11px] font-normal text-amber-600 dark:text-amber-400 flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Pasa el cursor o pulsa para revelar
            </span>
          )}
        </div>
      </div>

      {/* Main Aligned Content by Paragraph Groups */}
      <div className="space-y-8 font-serif">
        {paragraphGroups.map((group) => (
          <div
            key={group.paragraphIndex}
            className="rounded-3xl bg-white/80 dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800/80 p-4 sm:p-5 shadow-xs space-y-4"
          >
            {/* Paragraph Divider / Label */}
            <div className="flex items-center justify-between pb-2 border-b border-stone-100 dark:border-stone-800/80 text-xs font-sans">
              <div className="flex items-center gap-2 text-stone-500 dark:text-stone-400 font-mono text-[11px] uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span>Párrafo {group.paragraphIndex + 1}</span>
                <span>•</span>
                <span>{group.pairs.length} oraciones</span>
              </div>
            </div>

            {/* Aligned Sentence Pairs */}
            <div className="space-y-4">
              {group.pairs.map((pair) => {
                const isHovered = hoveredGlobalIndex === pair.globalIndex;
                const isAudioActive = activeSentenceIndex === pair.sentenceIndexInPara;
                const isExplicitlyRevealed = revealedSentenceSet.has(pair.globalIndex);
                const isBlurred = blurByDefault && !isExplicitlyRevealed;
                const isMobileDrawerOpen = expandedMobileSentences.has(pair.globalIndex);

                const translationText =
                  targetLang === 'ar' && pair.arabicText
                    ? pair.arabicText
                    : pair.englishText || '(Traducción de referencia no disponible)';

                return (
                  <div
                    key={pair.globalIndex}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-6 items-stretch"
                  >
                    {/* LEFT PANE: Spanish Sentence Card with LingQ Interactive Tokens */}
                    <div
                      id={`parallel-es-${pair.sentenceIndexInPara}`}
                      onMouseEnter={() => setHoveredGlobalIndex(pair.globalIndex)}
                      onMouseLeave={() => setHoveredGlobalIndex(null)}
                      className={`rounded-2xl p-3 sm:p-4 transition-all duration-200 border flex flex-col justify-between ${
                        isAudioActive
                          ? 'bg-amber-500/10 dark:bg-amber-400/10 border-amber-400/80 ring-2 ring-amber-400/40 shadow-xs'
                          : isHovered
                          ? 'bg-stone-100/90 dark:bg-stone-800/90 border-amber-400/60 ring-1 ring-amber-400/30'
                          : 'bg-stone-50/70 dark:bg-stone-900/40 border-stone-200/70 dark:border-stone-800/70 hover:bg-stone-100/60'
                      }`}
                    >
                      <div>
                        {/* Sentence Header Meta */}
                        <div className="flex items-center justify-between mb-2 text-[11px] font-sans text-stone-400">
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono px-1.5 py-0.5 rounded bg-stone-200/70 dark:bg-stone-800 text-stone-600 dark:text-stone-300 font-bold">
                              #{pair.globalIndex + 1}
                            </span>
                            {isAudioActive && (
                              <span className="text-amber-600 dark:text-amber-400 font-medium flex items-center gap-1 animate-pulse">
                                <Volume2 className="w-3 h-3" /> Reproduciendo
                              </span>
                            )}
                          </div>

                          {/* Sentence Play Audio Button */}
                          <button
                            onClick={() =>
                              handlePlaySentence(
                                pair.spanishText,
                                pair.sentenceIndexInPara,
                                pair.spanishTokens
                              )
                            }
                            className="p-1 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-200/60 dark:hover:bg-stone-800 transition cursor-pointer"
                            title="Escuchar esta oración en español"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Interactive Word Tokens */}
                        <p
                          className={`${textSizeClass} text-stone-900 dark:text-stone-100 flex flex-wrap gap-x-1.5 gap-y-1.5 items-baseline leading-relaxed select-text font-serif`}
                        >
                          {pair.spanishTokens.map((token) => {
                            if (!token.isWord) {
                              return (
                                <span
                                  key={token.id}
                                  className="text-stone-400 dark:text-stone-500 font-sans select-none"
                                >
                                  {token.raw}
                                </span>
                              );
                            }

                            const wordIdx = tokenToWordIndexMap.get(token.id) ?? -1;
                            const stage = getWordAcquisitionStage(token.clean, userProgress);
                            const mweMatch = tokenToMWEMap.get(token.id);
                            const isSelected = selectedToken?.id === token.id;
                            const isMWEActive = selectedMWETokenIds.includes(token.id);
                            const isInMultiSelect =
                              multiTokenSelection?.tokenIds.includes(token.id) || false;
                            const isHighlightedByAudio = activeWordTokenId === token.id;

                            let stateClass = getStageVisualClass(
                              stage,
                              isSelected || isMWEActive,
                              isHighlightedByAudio
                            );

                            if (mweMatch && !isSelected && !isMWEActive) {
                              stateClass +=
                                ' border-b-2 border-dashed border-purple-500/80 hover:border-purple-600';
                            }
                            if (isInMultiSelect) {
                              stateClass +=
                                ' bg-amber-300/80 dark:bg-amber-800/80 rounded ring-1 ring-amber-500';
                            }

                            return (
                              <span key={token.id} className="inline-flex items-baseline">
                                {token.prefixPunct && (
                                  <span className="text-stone-400 font-sans select-none">
                                    {token.prefixPunct}
                                  </span>
                                )}
                                <button
                                  id={`word-token-${token.id}`}
                                  onClick={(e) => handleTokenClick(token, e)}
                                  onMouseDown={(e) => handleTokenMouseDown(token, wordIdx, e)}
                                  onMouseEnter={() => handleTokenMouseEnter(wordIdx)}
                                  onTouchStart={() => handleTouchStart(wordIdx)}
                                  onTouchEnd={handleTouchEnd}
                                  className={`px-0.5 rounded transition-all duration-100 cursor-pointer font-serif select-none ${stateClass}`}
                                  title={
                                    mweMatch
                                      ? `Expresión: "${mweMatch.mwe.phrase_es}" (${mweMatch.mwe.phrase_en})`
                                      : `Nivel ${stage}: "${token.clean}" (Pulsa 1-5)`
                                  }
                                >
                                  {token.clean}
                                </button>
                                {token.suffixPunct && (
                                  <span className="text-stone-400 font-sans select-none">
                                    {token.suffixPunct}
                                  </span>
                                )}
                              </span>
                            );
                          })}
                        </p>
                      </div>

                      {/* Mobile Accordion Reveal Button (< lg screens) */}
                      <div className="lg:hidden mt-3 pt-2.5 border-t border-stone-200/60 dark:border-stone-800/60 font-sans">
                        <button
                          onClick={() => toggleMobileDrawer(pair.globalIndex)}
                          className="w-full flex items-center justify-between text-xs font-semibold text-stone-600 dark:text-stone-300 hover:text-stone-900 py-1 cursor-pointer"
                        >
                          <span className="flex items-center gap-1.5">
                            <Languages className="w-3.5 h-3.5 text-amber-500" />
                            <span>
                              {isMobileDrawerOpen ? 'Ocultar traducción' : 'Revelar traducción de referencia'}
                            </span>
                          </span>
                          {isMobileDrawerOpen ? (
                            <ChevronUp className="w-3.5 h-3.5" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5" />
                          )}
                        </button>

                        <AnimatePresence>
                          {isMobileDrawerOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="overflow-hidden mt-2 p-3 rounded-xl bg-amber-50/60 dark:bg-stone-800/80 border border-amber-200/60 dark:border-stone-700/60 text-xs space-y-1.5"
                            >
                              <div className="flex items-center justify-between text-[10px] font-mono text-stone-400">
                                <span>{targetLang === 'ar' ? 'العربية' : 'English'}</span>
                                <button
                                  onClick={(e) => handleCopySentence(translationText, pair.globalIndex, e)}
                                  className="text-stone-500 hover:text-stone-800 flex items-center gap-1 cursor-pointer"
                                >
                                  {copiedIndex === pair.globalIndex ? (
                                    <Check className="w-3 h-3 text-emerald-500" />
                                  ) : (
                                    <Copy className="w-3 h-3" />
                                  )}
                                </button>
                              </div>
                              <p
                                className={`text-stone-800 dark:text-stone-200 leading-relaxed ${
                                  targetLang === 'ar' ? 'font-arabic text-right' : 'font-sans'
                                }`}
                                dir={targetLang === 'ar' ? 'rtl' : 'ltr'}
                              >
                                {translationText}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* RIGHT PANE: Aligned Translation Card (Desktop: side-by-side; Hidden on mobile unless wide) */}
                    <div
                      id={`parallel-target-${pair.sentenceIndexInPara}`}
                      onMouseEnter={() => setHoveredGlobalIndex(pair.globalIndex)}
                      onMouseLeave={() => setHoveredGlobalIndex(null)}
                      onClick={() => {
                        if (isBlurred) {
                          toggleSentenceReveal(pair.globalIndex);
                        }
                      }}
                      className={`hidden lg:flex rounded-2xl p-3 sm:p-4 transition-all duration-200 border flex-col justify-between relative group ${
                        isAudioActive
                          ? 'bg-amber-500/10 dark:bg-amber-400/10 border-amber-400/80 ring-2 ring-amber-400/40 shadow-xs'
                          : isHovered
                          ? 'bg-stone-100/90 dark:bg-stone-800/90 border-amber-400/60 ring-1 ring-amber-400/30'
                          : 'bg-stone-50/70 dark:bg-stone-900/40 border-stone-200/70 dark:border-stone-800/70 hover:bg-stone-100/60'
                      } ${isBlurred ? 'cursor-pointer' : ''}`}
                    >
                      <div>
                        {/* Translation Header Meta */}
                        <div className="flex items-center justify-between mb-2 text-[11px] font-sans text-stone-400">
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono px-1.5 py-0.5 rounded bg-stone-200/70 dark:bg-stone-800 text-stone-600 dark:text-stone-300 font-bold">
                              #{pair.globalIndex + 1}
                            </span>
                            <span className="text-[10px] uppercase font-mono tracking-wider text-stone-400">
                              {targetLang === 'ar' ? 'العربية' : 'English'}
                            </span>
                          </div>

                          <div className="flex items-center gap-1">
                            {/* Copy translation */}
                            <button
                              onClick={(e) => handleCopySentence(translationText, pair.globalIndex, e)}
                              className="p-1 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-200/60 dark:hover:bg-stone-800 transition cursor-pointer"
                              title="Copiar traducción"
                            >
                              {copiedIndex === pair.globalIndex ? (
                                <Check className="w-3.5 h-3.5 text-emerald-500" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </button>

                            {/* Individual Eye Toggle for Blur */}
                            {blurByDefault && (
                              <button
                                onClick={(e) => toggleSentenceReveal(pair.globalIndex, e)}
                                className={`p-1 rounded-lg transition cursor-pointer ${
                                  isExplicitlyRevealed
                                    ? 'text-amber-600 dark:text-amber-400 bg-amber-100/60 dark:bg-amber-900/40'
                                    : 'text-stone-400 hover:text-stone-700 hover:bg-stone-200/60'
                                }`}
                                title={
                                  isExplicitlyRevealed
                                    ? 'Volver a desenfocar esta oración'
                                    : 'Revelar traducción'
                                }
                              >
                                {isExplicitlyRevealed ? (
                                  <Eye className="w-3.5 h-3.5" />
                                ) : (
                                  <EyeOff className="w-3.5 h-3.5" />
                                )}
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Translation Content (Supports Scaffolding Fade-Out / Blur) */}
                        <div className="relative">
                          <p
                            className={`${textSizeClass} text-stone-700 dark:text-stone-300 leading-relaxed font-sans transition-all duration-300 ${
                              isBlurred
                                ? 'filter blur-[5px] select-none group-hover:blur-none group-hover:cursor-text'
                                : ''
                            } ${targetLang === 'ar' ? 'font-arabic text-right' : ''}`}
                            dir={targetLang === 'ar' ? 'rtl' : 'ltr'}
                          >
                            {translationText}
                          </p>

                          {/* Subtle Scaffolding Recall Hint Badge when blurred */}
                          {isBlurred && (
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:opacity-0 transition-opacity duration-200">
                              <span className="px-2.5 py-1 rounded-full bg-stone-900/80 dark:bg-stone-100/90 text-white dark:text-stone-900 text-[10px] font-sans font-bold shadow-md flex items-center gap-1.5 backdrop-blur-xs">
                                <Sparkles className="w-3 h-3 text-amber-400" />
                                Haz clic o pasa el ratón para revelar
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Secondary translation (Arabic if active target is EN and Arabic exists) */}
                        {targetLang === 'en' && pair.arabicText && (
                          <div className="mt-3 pt-2 border-t border-stone-200/60 dark:border-stone-800/60 text-xs">
                            <p
                              className={`text-stone-500 dark:text-stone-400 font-arabic text-right text-[13px] leading-relaxed transition-all duration-300 ${
                                isBlurred
                                  ? 'filter blur-[4px] select-none group-hover:blur-none'
                                  : ''
                              }`}
                              dir="rtl"
                            >
                              {pair.arabicText}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
