import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Volume2,
  Play,
  Pause,
  Repeat,
  CheckCircle2,
  BookmarkPlus,
  BookmarkCheck,
  ArrowLeft,
  Eye,
  EyeOff,
  Sparkles,
  X,
  Check,
  Bookmark,
  AlertTriangle,
  Lightbulb,
  Zap,
  ChevronDown,
  ChevronUp,
  Columns2
} from 'lucide-react';
import {
  UserProgress,
  LingQStatus,
  LingQItem,
  MinedSentence,
  ImportedContent,
  ReadingSessionRecord
} from '../types';
import { calculateComprehensibilityScore } from '../services/comprehensibleInputService';
import { ComprehensibilityScore } from '../types/curriculum';
import { ReportGrammarIssueModal } from './ReportGrammarIssueModal';
import {
  tokenizeText,
  groupTokensIntoSentences,
  getWordState,
  lookupSpanishWord,
  findMultiContextSentences,
  calculateComprehensibility,
  WordToken,
  WordDefinitionMatch,
  ContextualSentence
} from '../utils/lingqEngine';
import {
  speakSpanish,
  speakSpanishWithHighlight,
  cancelSpanishSpeech,
  soundEffects
} from '../utils/audio';
import { lemmatizeSpanishWord, LemmatizationResult } from '../utils/spanishLemmatizer';
import {
  AcquisitionStage,
  STAGE_CONFIGS,
  MultiWordExpression,
  MWEMatch,
  MultiTokenSelection,
  CollocationPairing
} from '../types/vocabulary';
import { findMWEMatchesInTokens, lookupMWEByPhrase } from '../data/spanishMWEs';
import { determineStageFromInterval, transitionToStage } from '../utils/srsAlgorithm';
import { getCollocationsForWord } from '../services/collocationService';
import { WordPopover } from './reader/WordPopover';
import { useSentenceAlignment } from '../hooks/useSentenceAlignment';
import { ParallelReaderView } from './reader/ParallelReaderView';

interface LingQInteractiveReaderProps {
  content: ImportedContent;
  onBack: () => void;
  userProgress: UserProgress;
  setUserProgress: React.Dispatch<React.SetStateAction<UserProgress>>;
}

interface PopoverAnchor {
  x: number;
  y: number;
  top: number;
  left: number;
  width: number;
  placement: 'top' | 'bottom';
}

type TextSizeOption = 'base' | 'lg' | 'xl' | '2xl';

// Determine word's 5-stage vocabulary acquisition lifecycle status
export function getWordAcquisitionStage(cleanWord: string, userProgress: UserProgress): AcquisitionStage {
  if (!cleanWord || !/[a-záéíóúñü]/i.test(cleanWord)) {
    return 5;
  }
  const norm = cleanWord.toLowerCase().trim();

  // If marked in userProgress.knownWords or masteredWordIds -> Stage 5 (Mastered)
  if ((userProgress.knownWords || []).includes(norm) || (userProgress.masteredWordIds || []).includes(norm)) {
    return 5;
  }

  // If in userProgress.lingqs
  if (userProgress.lingqs && userProgress.lingqs[norm]) {
    const st = userProgress.lingqs[norm].status;
    return (st as AcquisitionStage);
  }

  // If in userProgress.srsData
  if (userProgress.srsData && userProgress.srsData[norm]) {
    const srs = userProgress.srsData[norm];
    return determineStageFromInterval(srs.interval, srs.repetitions);
  }

  // Common high-frequency functional words -> Stage 5
  if (['el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas', 'de', 'del', 'al', 'en', 'y', 'a', 'por', 'para', 'con', 'sin', 'que', 'se', 'es', 'son', 'su', 'sus'].includes(norm)) {
    return 5;
  }

  // Otherwise: Stage 0 (New / Unsaved)
  return 0;
}

// 5-Stage Lifecycle Visual Class mappings
export function getStageVisualClass(stage: AcquisitionStage, isSelected: boolean, isAudioHighlighted: boolean): string {
  if (isAudioHighlighted) {
    return 'bg-amber-400 text-stone-950 rounded-md font-bold transition-all duration-75 shadow-xs';
  }
  if (isSelected) {
    return 'bg-amber-200/90 dark:bg-amber-900/80 rounded-md font-bold ring-2 ring-amber-400 text-stone-950 dark:text-stone-100';
  }

  switch (stage) {
    case 0:
      // Stage 0 (New / Unsaved): Blue background highlight
      return 'bg-sky-100/90 dark:bg-sky-950/70 text-sky-950 dark:text-sky-100 rounded px-0.5 border-b-2 border-sky-400 hover:bg-sky-200/70';
    case 1:
      // Stage 1 (Just Saved / Learning - Interval 1 day): Soft Amber highlight
      return 'bg-amber-200/90 dark:bg-amber-900/60 text-amber-950 dark:text-amber-100 rounded px-0.5 border-b-2 border-amber-500 hover:bg-amber-300/80 shadow-2xs';
    case 2:
      // Stage 2 (Recognized / Review - Interval 3 days): Light Amber tint
      return 'bg-amber-100/60 dark:bg-amber-950/40 text-stone-900 dark:text-stone-100 rounded px-0.5 border-b border-amber-400/80 hover:bg-amber-200/60';
    case 3:
      // Stage 3 (Familiar / Recall - Interval 7 days): Very faint yellow underline
      return 'text-stone-900 dark:text-stone-100 underline decoration-amber-300/80 dark:decoration-amber-500/60 decoration-1 underline-offset-3 hover:bg-stone-200/50';
    case 4:
      // Stage 4 (Near Mastery - Interval 14 days): Dotted green underline
      return 'text-stone-900 dark:text-stone-100 underline decoration-dotted decoration-emerald-500/80 decoration-2 underline-offset-4 hover:bg-stone-200/50';
    case 5:
    default:
      // Stage 5 (Mastered / Known - Interval 60+ days): No highlight (clean text appearance)
      return 'hover:bg-stone-200/50 dark:hover:bg-stone-800 text-stone-900 dark:text-stone-100';
  }
}

export const LingQInteractiveReader: React.FC<LingQInteractiveReaderProps> = ({
  content,
  onBack,
  userProgress,
  setUserProgress
}) => {
  // Tokenize the story / text
  const paragraphs = useMemo(() => {
    return content.content.split('\n\n').filter(p => p.trim().length > 0);
  }, [content.content]);

  const tokenizedParagraphs = useMemo(() => {
    return paragraphs.map((p, pIdx) => tokenizeText(p, pIdx));
  }, [paragraphs]);

  const allTokens = useMemo(() => {
    return tokenizedParagraphs.flat();
  }, [tokenizedParagraphs]);

  const allWordTokens = useMemo(() => {
    return allTokens.filter(t => t.isWord);
  }, [allTokens]);

  const tokenToWordIndexMap = useMemo(() => {
    const map = new Map<string, number>();
    allWordTokens.forEach((t, i) => map.set(t.id, i));
    return map;
  }, [allWordTokens]);

  // Audio Playback & Real-time Read-Along Highlighting states
  const [isPlayingAll, setIsPlayingAll] = useState(false);
  const [activeSentenceIndex, setActiveSentenceIndex] = useState<number | null>(null);
  const [activeWordTokenId, setActiveWordTokenId] = useState<string | null>(null);
  const [isLoopingSentence, setIsLoopingSentence] = useState(false);
  const [preferredVoice, setPreferredVoice] = useState<'mexico' | 'spain'>(() => {
    return userProgress.targetDialect === 'castilian' ? 'spain' : 'mexico';
  });
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(userProgress.settings.audioSpeed || 0.9);
  const [showFullTranslations, setShowFullTranslations] = useState<boolean>(false);
  const [textSize, setTextSize] = useState<TextSizeOption>('lg');
  const [readerViewMode, setReaderViewMode] = useState<'standard' | 'parallel'>('standard');

  // Active Session Reading Timer
  const [sessionSeconds, setSessionSeconds] = useState<number>(0);
  const [isTimerActive, setIsTimerActive] = useState<boolean>(true);

  // Inspector & Popover states
  const [selectedToken, setSelectedToken] = useState<WordToken | null>(null);
  const [selectedMWE, setSelectedMWE] = useState<MultiWordExpression | null>(null);
  const [selectedMWETokenIds, setSelectedMWETokenIds] = useState<string[]>([]);
  const [activeCollocations, setActiveCollocations] = useState<CollocationPairing[]>([]);
  const [mweChoice, setMweChoice] = useState<{
    singleToken: WordToken;
    mweMatch: MWEMatch;
    rect: DOMRect;
  } | null>(null);
  const [multiTokenSelection, setMultiTokenSelection] = useState<MultiTokenSelection | null>(null);
  const [dragStartIdx, setDragStartIdx] = useState<number | null>(null);
  const [dragCurrentIdx, setDragCurrentIdx] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const touchTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Scan text tokens for Multi-Word Expressions
  const mweMatches = useMemo(() => {
    return findMWEMatchesInTokens(allTokens);
  }, [allTokens]);

  const tokenToMWEMap = useMemo(() => {
    const map = new Map<string, MWEMatch>();
    mweMatches.forEach(match => {
      match.tokenIds.forEach(id => map.set(id, match));
    });
    return map;
  }, [mweMatches]);

  const [wordDef, setWordDef] = useState<WordDefinitionMatch | null>(null);
  const [lemmaAnalysis, setLemmaAnalysis] = useState<LemmatizationResult | null>(null);
  const [popoverAnchor, setPopoverAnchor] = useState<PopoverAnchor | null>(null);
  const [multiContexts, setMultiContexts] = useState<ContextualSentence[]>([]);
  const [showCorpusExamples, setShowCorpusExamples] = useState<boolean>(false);
  const [minedSuccessMessage, setMinedSuccessMessage] = useState<string | null>(null);
  const [hasCompletedReading, setHasCompletedReading] = useState<boolean>(false);
  const [isAiTranslating, setIsAiTranslating] = useState<boolean>(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  // Client-side cache to resolve previously fetched word translations instantly
  const clientTranslationCache = useRef<Record<string, any>>({});
  const activeObserverRef = useRef<IntersectionObserver | null>(null);

  // Comprehensibility report
  const report = useMemo(() => {
    return calculateComprehensibility(allTokens, userProgress);
  }, [allTokens, userProgress]);

  // Memoized user known lemmas set
  const userKnownLemmas = useMemo(() => {
    const set = new Set<string>();
    (userProgress.knownWords || []).forEach(w => set.add(w.toLowerCase()));
    (userProgress.masteredWordIds || []).forEach(w => set.add(w.toLowerCase()));
    (userProgress.savedWordIds || []).forEach(w => set.add(w.toLowerCase()));
    if (userProgress.lingqs) {
      Object.keys(userProgress.lingqs).forEach(w => set.add(w.toLowerCase()));
    }
    return set;
  }, [userProgress.knownWords, userProgress.masteredWordIds, userProgress.savedWordIds, userProgress.lingqs]);

  // Algorithmic Krashen i+1 & Readability Analysis
  const krashenScore = useMemo<ComprehensibilityScore>(() => {
    return calculateComprehensibilityScore(content.content, userKnownLemmas);
  }, [content.content, userKnownLemmas]);

  const [showScaffoldingPanel, setShowScaffoldingPanel] = useState<boolean>(() => {
    return krashenScore.ratio < 0.85;
  });

  // Split translation paragraphs for parallel alignment
  const englishParagraphs = useMemo(() => {
    if (!content.translation_en) return [];
    return content.translation_en.split('\n\n').filter(p => p.trim().length > 0);
  }, [content.translation_en]);

  const arabicParagraphs = useMemo(() => {
    if (!content.translation_ar) return [];
    return content.translation_ar.split('\n\n').filter(p => p.trim().length > 0);
  }, [content.translation_ar]);

  // Aligned sentence pairs for Parallel Bilingual Reader mode
  const alignmentResult = useSentenceAlignment(
    tokenizedParagraphs,
    englishParagraphs,
    arabicParagraphs
  );

  // Active reading timer effect
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isTimerActive && !hasCompletedReading) {
      interval = setInterval(() => {
        setSessionSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerActive, hasCompletedReading]);

  // Cleanup speech on unmount
  useEffect(() => {
    return () => {
      cancelSpanishSpeech();
      if (activeObserverRef.current) {
        activeObserverRef.current.disconnect();
      }
    };
  }, []);

  // Format timer into MM:SS
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Close floating definition popover
  const handleClosePopover = useCallback(() => {
    setSelectedToken(null);
    setSelectedMWE(null);
    setSelectedMWETokenIds([]);
    setMweChoice(null);
    setWordDef(null);
    setLemmaAnalysis(null);
    setPopoverAnchor(null);
    setShowCorpusExamples(false);
  }, []);

  // Auto-dismiss floating popover when user scrolls the page
  useEffect(() => {
    if (!selectedToken) return;

    const handleScroll = () => {
      handleClosePopover();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [selectedToken, handleClosePopover]);

  // Intersection Observer-based auto-scroll to center selected word in viewport
  const centerElementWithIntersectionObserver = useCallback((elementId: string) => {
    if (typeof window === 'undefined') return;
    const el = document.getElementById(elementId);
    if (!el) return;

    if (typeof IntersectionObserver !== 'undefined') {
      if (activeObserverRef.current) {
        activeObserverRef.current.disconnect();
      }

      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          const rect = entry.boundingClientRect;
          const vh = window.innerHeight;
          const isComfortablyCentered = rect.top >= vh * 0.25 && rect.bottom <= vh * 0.72;

          if (!isComfortablyCentered || entry.intersectionRatio < 0.9) {
            el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
          }
          observer.disconnect();
        },
        {
          threshold: [0, 0.5, 0.9, 1.0],
          rootMargin: '-20% 0px -25% 0px'
        }
      );

      activeObserverRef.current = observer;
      observer.observe(el);
    } else {
      el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
    }
  }, []);

  // Check if a word is currently saved in personalized study list
  const isWordSavedInVocabulary = useCallback((cleanWord: string) => {
    const norm = cleanWord.toLowerCase().trim();
    const savedList = userProgress.savedWordIds || [];
    return savedList.includes(norm);
  }, [userProgress.savedWordIds]);

  // Toggle Save to Vocabulary study list with instant SRS integration
  const handleToggleSaveToVocabulary = useCallback((cleanWord: string) => {
    const norm = cleanWord.toLowerCase().trim();
    const isSaved = isWordSavedInVocabulary(norm);
    const today = new Date().toISOString().split('T')[0];
    const currentDef = wordDef || lookupSpanishWord(norm);

    setUserProgress(prev => {
      const savedList = prev.savedWordIds || [];
      const newSaved = isSaved
        ? savedList.filter(w => w !== norm)
        : [...savedList, norm];

      const updatedSrs = { ...(prev.srsData || {}) };
      const updatedLingqs = { ...(prev.lingqs || {}) };

      if (!isSaved) {
        // Initialize in SRS Spaced Repetition deck
        if (!updatedSrs[norm]) {
          updatedSrs[norm] = {
            wordId: norm,
            interval: 1,
            repetitions: 0,
            easeFactor: 2.5,
            nextReviewDate: today,
            streak: 0,
            successCount: 0,
            failCount: 0,
            history: []
          };
        }

        // Initialize in LingQ status dictionary (Status 1: New / Saved)
        if (!updatedLingqs[norm]) {
          updatedLingqs[norm] = {
            word: norm,
            status: 1,
            translation_en: currentDef.translation_en || '',
            translation_ar: currentDef.translation_ar || '',
            phonetic: currentDef.phonetic || '',
            partOfSpeech: currentDef.partOfSpeech || 'word',
            gender: currentDef.gender,
            sentenceContext: selectedToken?.fullSentence || '',
            createdAt: new Date().toISOString(),
            lastReviewed: new Date().toISOString()
          };
        }
      }

      return {
        ...prev,
        savedWordIds: newSaved,
        srsData: updatedSrs,
        lingqs: updatedLingqs,
        xp: prev.xp + (!isSaved ? 10 : 0)
      };
    });

    if (!isSaved) {
      soundEffects.playLevelUp();
      setMinedSuccessMessage(`✓ Guardado "${cleanWord}" en Vocabulario (+10 XP)`);
    } else {
      soundEffects.playPop();
      setMinedSuccessMessage(`Eliminado "${cleanWord}" de la lista`);
    }
    setTimeout(() => setMinedSuccessMessage(null), 2500);
  }, [isWordSavedInVocabulary, wordDef, selectedToken, setUserProgress]);

  // Speak word in target dialect voice
  const speakTargetVoice = useCallback((word: string, dialectOverride?: 'mexico' | 'spain') => {
    const dialect = dialectOverride || preferredVoice;
    const persona = dialect === 'mexico' ? 'juan' : 'mateo';
    speakSpanish(word, playbackSpeed, undefined, persona);
  }, [preferredVoice, playbackSpeed]);

  // When a token is clicked, inspect its definition in a floating popover anchored at word position
  const handleSelectToken = async (token: WordToken, event?: React.MouseEvent) => {
    if (!token.isWord) return;
    setSelectedToken(token);
    setSelectedMWE(null);
    setSelectedMWETokenIds([]);
    setMweChoice(null);

    // 1. Calculate cursor/token anchor position clamped to viewport
    const target = (event?.currentTarget as HTMLElement) || document.getElementById(`word-token-${token.id}`);
    if (target && typeof window !== 'undefined') {
      const rect = target.getBoundingClientRect();
      const popoverWidth = Math.min(380, window.innerWidth - 32);

      // Horizontal centering clamped inside viewport
      const idealLeft = rect.left + rect.width / 2 - popoverWidth / 2;
      const clampedLeft = Math.max(16, Math.min(window.innerWidth - popoverWidth - 16, idealLeft));

      // Vertical placement calculation: prefer above if enough space, else below
      const spaceAbove = rect.top;
      const spaceBelow = window.innerHeight - rect.bottom;
      const placeAbove = spaceAbove > 300 || spaceAbove > spaceBelow;

      setPopoverAnchor({
        x: rect.left + rect.width / 2,
        y: placeAbove ? rect.top : rect.bottom,
        top: placeAbove ? rect.top - 12 : rect.bottom + 12,
        left: clampedLeft,
        width: popoverWidth,
        placement: placeAbove ? 'top' : 'bottom'
      });
    }

    // 2. Trigger auto-scroll centering using IntersectionObserver
    centerElementWithIntersectionObserver(`word-token-${token.id}`);

    // 3. Show instant offline translation
    const def = lookupSpanishWord(token.clean);
    setWordDef(def);

    // 3b. Run Spanish Lemmatization Engine (< 25ms client-side resolution)
    const lemma = lemmatizeSpanishWord(token.clean, token.fullSentence);
    setLemmaAnalysis(lemma);

    // 3c. Authentic Collocations retrieval
    const colls = getCollocationsForWord(token.clean);
    setActiveCollocations(colls);

    const contexts = findMultiContextSentences(token.clean);
    setMultiContexts(contexts);
    setShowCorpusExamples(false);
    setMinedSuccessMessage(null);

    // Speak in current dialect voice
    speakTargetVoice(token.clean);

    // If already in client-side cache, use it immediately and skip fetching
    if (clientTranslationCache.current[token.clean]) {
      setWordDef(clientTranslationCache.current[token.clean]);
      return;
    }

    // 4. Query Gemini API for contextual translation enhancement
    setIsAiTranslating(true);
    try {
      const response = await fetch('/api/ai/translate-word', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          word: token.clean,
          sentence: token.fullSentence || '',
          nativeLang: userProgress.settings.nativeLanguage || 'en'
        })
      });

      if (response.ok) {
        const aiDef = await response.json();
        clientTranslationCache.current[token.clean] = aiDef;

        setSelectedToken(curr => {
          if (curr?.id === token.id) {
            setWordDef(prev => ({
              ...prev,
              ...aiDef,
              wordWithArticle: prev?.wordWithArticle || aiDef.wordWithArticle,
              cefr: prev?.cefr || aiDef.cefr
            }));
          }
          return curr;
        });
      }
    } catch {
      // Offline fallback already in place
    } finally {
      setSelectedToken(curr => {
        if (curr?.id === token.id) {
          setIsAiTranslating(false);
        }
        return curr;
      });
    }
  };

  // Inspect Multi-Word Expression (MWE)
  const handleSelectMWE = (mwe: MultiWordExpression, tokens: WordToken[], event?: React.MouseEvent) => {
    setSelectedMWE(mwe);
    setSelectedMWETokenIds(tokens.map(t => t.id));
    if (tokens.length > 0) {
      setSelectedToken(tokens[0]);
    }
    setMweChoice(null);

    const mweDef: WordDefinitionMatch = {
      word: mwe.phrase_es,
      translation_en: mwe.phrase_en,
      translation_ar: '',
      phonetic: '',
      partOfSpeech: mwe.category === 'idiom' ? 'modismo' : mwe.category === 'phrasal_expression' ? 'locución' : 'expresión',
      gender: undefined,
      cefr: mwe.cefr,
      examples: [
        { es: mwe.example_es, en: mwe.example_en, ar: mwe.example_ar || '' }
      ]
    };
    setWordDef(mweDef);
    setLemmaAnalysis(null);

    const colls = getCollocationsForWord(mwe.phrase_es);
    setActiveCollocations(colls);

    const firstToken = tokens[0];
    const target = (event?.currentTarget as HTMLElement) || (firstToken ? document.getElementById(`word-token-${firstToken.id}`) : null);
    if (target && typeof window !== 'undefined') {
      const rect = target.getBoundingClientRect();
      const popoverWidth = Math.min(380, window.innerWidth - 32);
      const idealLeft = rect.left + rect.width / 2 - popoverWidth / 2;
      const clampedLeft = Math.max(16, Math.min(window.innerWidth - popoverWidth - 16, idealLeft));
      const spaceAbove = rect.top;
      const spaceBelow = window.innerHeight - rect.bottom;
      const placeAbove = spaceAbove > 300 || spaceAbove > spaceBelow;

      setPopoverAnchor({
        x: rect.left + rect.width / 2,
        y: placeAbove ? rect.top : rect.bottom,
        top: placeAbove ? rect.top - 12 : rect.bottom + 12,
        left: clampedLeft,
        width: popoverWidth,
        placement: placeAbove ? 'top' : 'bottom'
      });
    }

    speakTargetVoice(mwe.phrase_es);
  };

  // Save custom multi-token selection as unified vocabulary item (e.g. "por si las moscas")
  const handleSaveCustomMultiToken = (phrase: string, tokens: WordToken[]) => {
    const norm = phrase.toLowerCase().trim();
    const today = new Date().toISOString().split('T')[0];
    const knownMwe = lookupMWEByPhrase(phrase);
    const translation_en = knownMwe ? knownMwe.phrase_en : `Frase: ${phrase}`;
    const partOfSpeech = knownMwe ? knownMwe.category : 'frase';

    setUserProgress(prev => {
      const savedList = prev.savedWordIds || [];
      const newSaved = savedList.includes(norm) ? savedList : [...savedList, norm];

      const updatedSrs = { ...(prev.srsData || {}) };
      if (!updatedSrs[norm]) {
        updatedSrs[norm] = {
          wordId: norm,
          interval: 1,
          repetitions: 0,
          easeFactor: 2.5,
          nextReviewDate: today,
          streak: 0,
          successCount: 0,
          failCount: 0,
          history: []
        };
      }

      const updatedLingqs = { ...(prev.lingqs || {}) };
      if (!updatedLingqs[norm]) {
        updatedLingqs[norm] = {
          word: norm,
          status: 1,
          translation_en,
          translation_ar: '',
          phonetic: '',
          partOfSpeech,
          sentenceContext: tokens[0]?.fullSentence || '',
          createdAt: new Date().toISOString(),
          lastReviewed: new Date().toISOString()
        };
      }

      return {
        ...prev,
        savedWordIds: newSaved,
        srsData: updatedSrs,
        lingqs: updatedLingqs,
        xp: prev.xp + 20
      };
    });

    soundEffects.playLevelUp();
    setMinedSuccessMessage(`✓ Guardada frase "${phrase}" en Vocabulario (+20 XP)`);
    setTimeout(() => setMinedSuccessMessage(null), 3000);
  };

  // 5-Stage Lifecycle direct stage updater (Stages 1 to 5)
  const handleSetStage = useCallback((wordOrPhrase: string, stage: AcquisitionStage) => {
    const norm = wordOrPhrase.toLowerCase().trim();
    soundEffects.playPop();

    setUserProgress(prev => {
      const isMastered = stage === 5;
      const knownSet = new Set(prev.knownWords || []);
      const masteredSet = new Set(prev.masteredWordIds || []);
      const savedSet = new Set(prev.savedWordIds || []);

      if (isMastered) {
        knownSet.add(norm);
        masteredSet.add(norm);
        savedSet.delete(norm);
      } else {
        knownSet.delete(norm);
        masteredSet.delete(norm);
        savedSet.add(norm);
      }

      const sm2 = transitionToStage(stage);
      const updatedSrs = { ...(prev.srsData || {}) };
      updatedSrs[norm] = {
        wordId: norm,
        interval: sm2.interval,
        repetitions: sm2.repetitions,
        easeFactor: sm2.easinessFactor,
        nextReviewDate: sm2.nextReviewDate,
        streak: stage >= 3 ? stage : 0,
        successCount: (updatedSrs[norm]?.successCount || 0) + 1,
        failCount: updatedSrs[norm]?.failCount || 0,
        history: updatedSrs[norm]?.history || []
      };

      const currentLingq = prev.lingqs?.[norm];
      const updatedLingqs = { ...(prev.lingqs || {}) };
      updatedLingqs[norm] = {
        word: norm,
        status: (stage as LingQStatus),
        translation_en: wordDef?.translation_en || currentLingq?.translation_en || '',
        translation_ar: wordDef?.translation_ar || currentLingq?.translation_ar || '',
        phonetic: wordDef?.phonetic || currentLingq?.phonetic || '',
        partOfSpeech: wordDef?.partOfSpeech || currentLingq?.partOfSpeech || 'palabra',
        gender: wordDef?.gender || currentLingq?.gender,
        sentenceContext: selectedToken?.fullSentence || currentLingq?.sentenceContext || '',
        createdAt: currentLingq?.createdAt || new Date().toISOString(),
        lastReviewed: new Date().toISOString()
      };

      return {
        ...prev,
        knownWords: Array.from(knownSet),
        masteredWordIds: Array.from(masteredSet),
        savedWordIds: Array.from(savedSet),
        srsData: updatedSrs,
        lingqs: updatedLingqs,
        xp: prev.xp + 10
      };
    });
  }, [wordDef, selectedToken, setUserProgress]);

  // Auto-advance to the next unknown word (stage < 5)
  const autoAdvanceToNextUnknownWord = useCallback(() => {
    if (!selectedToken) return;
    const currentIdx = allWordTokens.findIndex(t => t.id === selectedToken.id);
    if (currentIdx === -1) return;

    for (let i = currentIdx + 1; i < allWordTokens.length; i++) {
      const candidate = allWordTokens[i];
      const candidateStage = getWordAcquisitionStage(candidate.clean, userProgress);
      if (candidateStage < 5) {
        handleSelectToken(candidate);
        return;
      }
    }
    for (let i = 0; i < currentIdx; i++) {
      const candidate = allWordTokens[i];
      const candidateStage = getWordAcquisitionStage(candidate.clean, userProgress);
      if (candidateStage < 5) {
        handleSelectToken(candidate);
        return;
      }
    }
  }, [selectedToken, allWordTokens, userProgress, handleSelectToken]);

  // Keyboard shortcut listener: 1-5 keys for instant stage update + auto-advance
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (['1', '2', '3', '4', '5'].includes(e.key)) {
        if (selectedToken || selectedMWE) {
          e.preventDefault();
          const targetWord = selectedMWE ? selectedMWE.phrase_es : selectedToken!.clean;
          const stage = parseInt(e.key, 10) as AcquisitionStage;
          handleSetStage(targetWord, stage);
          autoAdvanceToNextUnknownWord();
        }
      } else if (e.key === 'Escape') {
        handleClosePopover();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedToken, selectedMWE, handleSetStage, autoAdvanceToNextUnknownWord, handleClosePopover]);

  // Multi-Token drag range selection
  const applyRangeSelection = useCallback((startIdx: number, endIdx: number) => {
    const min = Math.min(startIdx, endIdx);
    const max = Math.max(startIdx, endIdx);
    const clampedMax = Math.min(min + 5, max);
    const selected = allWordTokens.slice(min, clampedMax + 1);

    if (selected.length > 1) {
      const phrase = selected.map(t => t.clean).join(' ');
      setMultiTokenSelection({
        tokenIds: selected.map(t => t.id),
        cleanWords: selected.map(t => t.clean),
        combinedPhrase: phrase,
        sentenceIndex: selected[0].sentenceIndex,
        fullSentence: selected[0].fullSentence
      });
    }
  }, [allWordTokens]);

  const handleTokenMouseDown = (token: WordToken, globalWordIdx: number, e: React.MouseEvent) => {
    if (e.shiftKey && dragStartIdx !== null) {
      applyRangeSelection(dragStartIdx, globalWordIdx);
      return;
    }
    setIsDragging(true);
    setDragStartIdx(globalWordIdx);
    setDragCurrentIdx(globalWordIdx);
  };

  const handleTokenMouseEnter = (globalWordIdx: number) => {
    if (isDragging && dragStartIdx !== null) {
      setDragCurrentIdx(globalWordIdx);
    }
  };

  const handleGlobalMouseUp = useCallback(() => {
    if (isDragging && dragStartIdx !== null && dragCurrentIdx !== null) {
      if (dragStartIdx !== dragCurrentIdx) {
        applyRangeSelection(dragStartIdx, dragCurrentIdx);
      }
    }
    setIsDragging(false);
  }, [isDragging, dragStartIdx, dragCurrentIdx, applyRangeSelection]);

  useEffect(() => {
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
  }, [handleGlobalMouseUp]);

  const handleTouchStart = (globalWordIdx: number) => {
    touchTimerRef.current = setTimeout(() => {
      const start = globalWordIdx;
      const end = Math.min(allWordTokens.length - 1, start + 3);
      applyRangeSelection(start, end);
    }, 500);
  };

  const handleTouchEnd = () => {
    if (touchTimerRef.current) {
      clearTimeout(touchTimerRef.current);
    }
  };

  // Word token click with MWE disambiguation
  const handleTokenClick = (token: WordToken, event: React.MouseEvent) => {
    const mweMatch = tokenToMWEMap.get(token.id);

    if (mweMatch) {
      event.stopPropagation();
      const target = event.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();
      setMweChoice({
        singleToken: token,
        mweMatch,
        rect
      });
    } else {
      setMweChoice(null);
      handleSelectToken(token, event);
    }
  };

  // 1-Click: Mark Word as Known
  const handleMarkAsKnown = (cleanWord: string) => {
    handleSetStage(cleanWord, 5);
  };

  // 1-Click: Set LingQ Status (1, 2, 3, 4)
  const handleSetLingQStatus = (cleanWord: string, status: LingQStatus) => {
    handleSetStage(cleanWord, status as AcquisitionStage);
  };

  // 1-Click: Sentence Mining to Cloze SRS
  const handleMineSentence = () => {
    if (!selectedToken || !wordDef) return;

    const sentenceToMine = selectedToken.fullSentence || selectedToken.raw;
    const cleanWord = selectedToken.clean;

    const newMinedSentence: MinedSentence = {
      id: `mined-${Date.now()}-${cleanWord}`,
      targetWord: cleanWord,
      sentence_es: sentenceToMine,
      sentence_en: wordDef.examples[0]?.en || wordDef.translation_en,
      sentence_ar: wordDef.examples[0]?.ar || wordDef.translation_ar,
      sourceTitle: content.title,
      dateMined: new Date().toISOString(),
      interval: 1,
      repetitions: 0,
      easeFactor: 2.5,
      nextReviewDate: new Date().toISOString().split('T')[0]
    };

    setUserProgress(prev => {
      const existing = prev.minedSentences || [];
      const filtered = existing.filter(m => m.sentence_es !== sentenceToMine || m.targetWord !== cleanWord);
      return {
        ...prev,
        minedSentences: [newMinedSentence, ...filtered],
        xp: prev.xp + 15
      };
    });

    soundEffects.playLevelUp();
    setMinedSuccessMessage(`✓ Oración guardada en SRS con contexto`);
    setTimeout(() => setMinedSuccessMessage(null), 3000);
  };

  // Finish Reading Session
  const handleFinishReading = () => {
    soundEffects.playLevelUp();
    setHasCompletedReading(true);
    setIsTimerActive(false);
    cancelSpanishSpeech();
    setIsPlayingAll(false);
    setActiveSentenceIndex(null);
    setActiveWordTokenId(null);

    const wordCount = report.totalWords;
    const today = new Date().toISOString().split('T')[0];

    const sessionRecord: ReadingSessionRecord = {
      id: `session-${Date.now()}`,
      contentId: content.id,
      contentTitle: content.title,
      category: content.category,
      cefr: content.cefr,
      wordsRead: wordCount,
      timeSpentSec: Math.max(15, sessionSeconds),
      date: today,
      timestamp: Date.now()
    };

    setUserProgress(prev => {
      const currentLifetimeWords = prev.totalWordsRead || 0;
      const currentLifetimeSec = prev.totalReadingTimeSec || 0;
      const currentDailyWords = prev.dailyWordsRead || {};
      const todayCount = (currentDailyWords[today] || 0) + wordCount;
      const history = prev.readingSessions || [];

      return {
        ...prev,
        totalWordsRead: currentLifetimeWords + wordCount,
        totalReadingTimeSec: currentLifetimeSec + Math.max(15, sessionSeconds),
        dailyWordsRead: {
          ...currentDailyWords,
          [today]: todayCount
        },
        readingSessions: [sessionRecord, ...history.slice(0, 49)],
        xp: prev.xp + 50
      };
    });
  };

  // Play single sentence with smooth word-by-word highlight and optional loop
  const handlePlaySentence = (sentenceText: string, sIdx: number, sentenceTokens: WordToken[]) => {
    setActiveSentenceIndex(sIdx);
    setIsPlayingAll(false);

    // Auto-scroll smooth center
    const el = document.getElementById(`sentence-card-${sIdx}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    speakSpanishWithHighlight(sentenceText, {
      rate: playbackSpeed,
      onWordBoundary: (charIndex, charLength, word) => {
        const wordTokensInSentence = sentenceTokens.filter(t => t.isWord);
        if (wordTokensInSentence.length === 0) return;

        const cleanWord = word ? word.toLowerCase().trim().replace(/[^a-záéíóúñü]/g, '') : '';
        let matchedToken = wordTokensInSentence.find(t => t.clean === cleanWord);

        if (!matchedToken) {
          const ratio = Math.min(1, Math.max(0, charIndex / Math.max(1, sentenceText.length)));
          const tokenIdx = Math.min(wordTokensInSentence.length - 1, Math.floor(ratio * wordTokensInSentence.length));
          matchedToken = wordTokensInSentence[tokenIdx];
        }

        if (matchedToken) {
          setActiveWordTokenId(matchedToken.id);
        }
      },
      onEnd: () => {
        setActiveWordTokenId(null);
        if (isLoopingSentence) {
          setTimeout(() => {
            handlePlaySentence(sentenceText, sIdx, sentenceTokens);
          }, 400);
        } else {
          setActiveSentenceIndex(null);
        }
      }
    });
  };

  // Play entire text with continuous read-along
  const handlePlayAll = () => {
    if (isPlayingAll) {
      cancelSpanishSpeech();
      setIsPlayingAll(false);
      setActiveSentenceIndex(null);
      setActiveWordTokenId(null);
    } else {
      setIsPlayingAll(true);

      const wordTokens = allTokens.filter(t => t.isWord);
      const totalLen = content.content.length;

      speakSpanishWithHighlight(content.content, {
        rate: playbackSpeed,
        onWordBoundary: (charIndex, charLength, word) => {
          const cleanWord = word ? word.toLowerCase().trim().replace(/[^a-záéíóúñü]/g, '') : '';
          const ratio = Math.min(1, Math.max(0, charIndex / Math.max(1, totalLen)));
          const tokenIdx = Math.min(wordTokens.length - 1, Math.floor(ratio * wordTokens.length));
          const activeTok = wordTokens[tokenIdx];

          if (activeTok) {
            setActiveWordTokenId(activeTok.id);
            setActiveSentenceIndex(activeTok.sentenceIndex);

            const el = document.getElementById(`sentence-card-${activeTok.sentenceIndex}`);
            if (el) {
              el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          }
        },
        onEnd: () => {
          setIsPlayingAll(false);
          setActiveSentenceIndex(null);
          setActiveWordTokenId(null);
        }
      });
    }
  };

  // Font sizing helper class
  const textSizeClasses = {
    base: 'text-base sm:text-lg leading-relaxed',
    lg: 'text-lg sm:text-xl leading-relaxed',
    xl: 'text-xl sm:text-2xl leading-loose',
    '2xl': 'text-2xl sm:text-3xl leading-loose'
  };

  const cycleTextSize = (direction: 'up' | 'down') => {
    const sizes: TextSizeOption[] = ['base', 'lg', 'xl', '2xl'];
    const currIdx = sizes.indexOf(textSize);
    if (direction === 'up' && currIdx < sizes.length - 1) {
      setTextSize(sizes[currIdx + 1]);
    } else if (direction === 'down' && currIdx > 0) {
      setTextSize(sizes[currIdx - 1]);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] dark:bg-[#121110] text-stone-900 dark:text-stone-100 transition-colors pb-24">
      {/* 1. DISCREET, STICKY TOP CONTROL BAR */}
      <header className="sticky top-0 z-40 bg-[#FBF9F5]/95 dark:bg-[#121110]/95 backdrop-blur-md border-b border-stone-200/80 dark:border-stone-800/80 px-4 sm:px-6 py-2.5 shadow-2xs">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-3 flex-wrap">
          {/* Left: Back & Story Identity */}
          <div className="flex items-center gap-2.5 min-w-0">
            <button
              onClick={() => {
                cancelSpanishSpeech();
                onBack();
              }}
              className="p-1.5 rounded-xl hover:bg-stone-200/60 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300 transition shrink-0 cursor-pointer"
              title="Volver a la biblioteca"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-stone-200/80 dark:bg-stone-800 text-stone-800 dark:text-stone-200 shrink-0">
              {content.cefr}
            </span>

            <span
              className="hidden sm:inline-flex px-2 py-0.5 rounded-md text-[10px] font-bold tracking-tight bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20 shrink-0"
              title={`Índice de Legibilidad Fernández-Huerta: ${krashenScore.readability.fernandezHuertaIndex}/100 • Gutiérrez de Polini: ${krashenScore.readability.gutierrezPoliniIndex}/100`}
            >
              IFH {krashenScore.readability.fernandezHuertaIndex} • {krashenScore.readability.readabilityGrade}
            </span>

            <h1 className="font-serif font-bold text-sm sm:text-base text-stone-900 dark:text-stone-100 truncate max-w-[200px] sm:max-w-xs md:max-w-md">
              {content.title}
            </h1>
          </div>

          {/* Right: Focused Audio, Font Size & Translation Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Audio Play / Pause */}
            <button
              onClick={handlePlayAll}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition cursor-pointer shadow-xs ${
                isPlayingAll
                  ? 'bg-[#C85A32] text-white animate-pulse'
                  : 'bg-stone-200/70 dark:bg-stone-800 hover:bg-stone-300 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200'
              }`}
              title={isPlayingAll ? 'Pausar audio' : 'Reproducir lectura continua'}
            >
              {isPlayingAll ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{isPlayingAll ? 'Pausar' : 'Escuchar'}</span>
            </button>

            {/* Repeat Sentence Loop */}
            <button
              onClick={() => setIsLoopingSentence(!isLoopingSentence)}
              className={`p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition cursor-pointer border ${
                isLoopingSentence
                  ? 'bg-amber-500/15 border-amber-500/60 text-amber-700 dark:text-amber-300'
                  : 'bg-transparent border-transparent hover:bg-stone-200/50 dark:hover:bg-stone-800 text-stone-500 dark:text-stone-400'
              }`}
              title="Repetir la oración activa en bucle"
            >
              <Repeat className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Repetir</span>
            </button>

            {/* Voice Accent Switcher (MX / ES) */}
            <div className="flex items-center bg-stone-200/60 dark:bg-stone-800 rounded-xl p-0.5 border border-stone-300/40 dark:border-stone-700/40 text-[11px] font-bold">
              <button
                onClick={() => setPreferredVoice('mexico')}
                className={`px-2 py-0.5 rounded-lg transition cursor-pointer ${
                  preferredVoice === 'mexico'
                    ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-white shadow-2xs'
                    : 'text-stone-500 dark:text-stone-400 hover:text-stone-800'
                }`}
                title="Voz Mexicana (Juan)"
              >
                🇲🇽 MX
              </button>
              <button
                onClick={() => setPreferredVoice('spain')}
                className={`px-2 py-0.5 rounded-lg transition cursor-pointer ${
                  preferredVoice === 'spain'
                    ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-white shadow-2xs'
                    : 'text-stone-500 dark:text-stone-400 hover:text-stone-800'
                }`}
                title="Voz Castellana (Mateo)"
              >
                🇪🇸 ES
              </button>
            </div>

            {/* Text Size Control: A- / A+ */}
            <div className="flex items-center bg-stone-200/60 dark:bg-stone-800 rounded-xl p-0.5 border border-stone-300/40 dark:border-stone-700/40 text-xs font-serif font-bold">
              <button
                onClick={() => cycleTextSize('down')}
                disabled={textSize === 'base'}
                className="px-2 py-0.5 rounded-lg text-stone-600 dark:text-stone-300 hover:bg-white dark:hover:bg-stone-700 disabled:opacity-40 transition cursor-pointer"
                title="Reducir tamaño de letra"
              >
                A-
              </button>
              <button
                onClick={() => cycleTextSize('up')}
                disabled={textSize === '2xl'}
                className="px-2 py-0.5 rounded-lg text-stone-600 dark:text-stone-300 hover:bg-white dark:hover:bg-stone-700 disabled:opacity-40 transition cursor-pointer"
                title="Aumentar tamaño de letra"
              >
                A+
              </button>
            </div>

            {/* View Mode Switcher: Standard Immersion vs Parallel Bilingual */}
            <div className="flex items-center bg-stone-200/60 dark:bg-stone-800 rounded-xl p-0.5 border border-stone-300/40 dark:border-stone-700/40 text-xs font-bold">
              <button
                onClick={() => setReaderViewMode('standard')}
                className={`px-2.5 py-1 rounded-lg transition cursor-pointer flex items-center gap-1 ${
                  readerViewMode === 'standard'
                    ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-white shadow-2xs font-black'
                    : 'text-stone-500 dark:text-stone-400 hover:text-stone-800'
                }`}
                title="Modo Estándar de Lectura Inmersiva"
              >
                <span>Estándar</span>
              </button>
              <button
                onClick={() => setReaderViewMode('parallel')}
                className={`px-2.5 py-1 rounded-lg transition cursor-pointer flex items-center gap-1.5 ${
                  readerViewMode === 'parallel'
                    ? 'bg-white dark:bg-stone-700 text-[#C85A32] dark:text-amber-400 shadow-2xs font-black'
                    : 'text-stone-500 dark:text-stone-400 hover:text-stone-800'
                }`}
                title="Modo Bilingüe Paralelo con alineación sincrónica de oraciones"
              >
                <Columns2 className="w-3.5 h-3.5 text-amber-500" />
                <span>Paralelo</span>
                <span className="hidden sm:inline text-[9px] px-1 py-0.2 rounded bg-amber-500/20 text-amber-700 dark:text-amber-300 font-bold">
                  Bilingüe
                </span>
              </button>
            </div>

            {/* Translation Scaffolding Toggle (For Standard Mode) */}
            {readerViewMode === 'standard' && (
              <button
                onClick={() => setShowFullTranslations(!showFullTranslations)}
                className={`p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition cursor-pointer ${
                  showFullTranslations
                    ? 'bg-stone-200 dark:bg-stone-800 text-amber-700 dark:text-amber-300'
                    : 'text-stone-500 dark:text-stone-400 hover:bg-stone-200/50 dark:hover:bg-stone-800'
                }`}
                title={showFullTranslations ? 'Ocultar traducciones en línea' : 'Mostrar traducciones en línea'}
              >
                {showFullTranslations ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                <span className="hidden lg:inline">{showFullTranslations ? 'Traducción' : 'Inmersión'}</span>
              </button>
            )}

            {/* Session Complete Button */}
            {!hasCompletedReading ? (
              <button
                onClick={handleFinishReading}
                className="px-3 py-1.5 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-bold hover:opacity-90 transition cursor-pointer flex items-center gap-1 shadow-2xs"
                title="Terminar y registrar lectura (+50 XP)"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 dark:text-emerald-600" />
                <span className="hidden sm:inline">Finalizar</span>
              </button>
            ) : (
              <span className="px-2.5 py-1 rounded-xl bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Completado</span>
              </span>
            )}
          </div>
        </div>
      </header>

      {/* 2. OPTIMAL EDITORIAL READING CANVAS (Responsive width for standard vs dual-column parallel mode) */}
      <main
        className={`${
          readerViewMode === 'parallel' ? 'max-w-6xl' : 'max-w-2xl'
        } mx-auto px-4 sm:px-8 py-8 sm:py-14 space-y-10 font-serif transition-all duration-300`}
      >
        {/* Story Header Hook */}
        <div className="space-y-3 pb-6 border-b border-stone-200/70 dark:border-stone-800/70 font-sans">
          <div className="flex items-center gap-2 text-xs font-mono text-stone-500 dark:text-stone-400 flex-wrap">
            <span>{report.totalWords} palabras</span>
            <span>•</span>
            
            {/* Krashen Real-time i+1 Badge */}
            <button
              onClick={() => setShowScaffoldingPanel(prev => !prev)}
              className={`px-2.5 py-1 rounded-full text-xs font-bold border transition cursor-pointer flex items-center gap-1.5 shadow-2xs ${krashenScore.badgeColor}`}
              title="Haz clic para ver el desglose pedagógico y andamiaje cognitivo Krashen i+1"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{krashenScore.badge}</span>
              {showScaffoldingPanel ? <ChevronUp className="w-3 h-3 ml-0.5" /> : <ChevronDown className="w-3 h-3 ml-0.5" />}
            </button>

            <span>•</span>
            <span className="text-stone-500 dark:text-stone-400 font-sans">
              Legibilidad: {krashenScore.readability.compositeReadingEase}/100 ({krashenScore.readability.readabilityGrade})
            </span>
            <span>•</span>
            <span>{formatTime(sessionSeconds)}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-black tracking-tight text-stone-900 dark:text-stone-100">
            {content.title}
          </h2>

          {/* Dynamic Krashen i+1 Scaffolding & Readability Panel */}
          {showScaffoldingPanel && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm space-y-4 font-sans text-xs"
            >
              <div className="flex items-center justify-between pb-2 border-b border-stone-100 dark:border-stone-800 flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-500" />
                  <span className="font-bold text-sm text-stone-900 dark:text-stone-100">
                    Calibración de Entrada Comprensible (Stephen Krashen i+1)
                  </span>
                </div>
                <span className="text-[11px] font-mono text-stone-500">
                  {krashenScore.percentage}% palabras conocidas • {krashenScore.targetWords.length} adquisición clave
                </span>
              </div>

              {/* Readability Metrics Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <div className="p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200/60 dark:border-stone-700/60">
                  <span className="text-[10px] text-stone-500 uppercase tracking-wider block font-bold">Fernández-Huerta</span>
                  <span className="text-base font-black text-stone-900 dark:text-stone-100">{krashenScore.readability.fernandezHuertaIndex}/100</span>
                  <span className="text-[10px] text-stone-400 block">{krashenScore.readability.readabilityGrade}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200/60 dark:border-stone-700/60">
                  <span className="text-[10px] text-stone-500 uppercase tracking-wider block font-bold">Gutiérrez de Polini</span>
                  <span className="text-base font-black text-stone-900 dark:text-stone-100">{krashenScore.readability.gutierrezPoliniIndex}/100</span>
                  <span className="text-[10px] text-stone-400 block">{krashenScore.readability.avgLettersPerWord} letras/palabra</span>
                </div>
                <div className="p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200/60 dark:border-stone-700/60">
                  <span className="text-[10px] text-stone-500 uppercase tracking-wider block font-bold">Complejidad Oración</span>
                  <span className="text-base font-black text-stone-900 dark:text-stone-100">{krashenScore.readability.avgSentenceLength} palabras</span>
                  <span className="text-[10px] text-stone-400 block">{krashenScore.readability.totalSentences} oraciones</span>
                </div>
                <div className="p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200/60 dark:border-stone-700/60">
                  <span className="text-[10px] text-stone-500 uppercase tracking-wider block font-bold">Densidad Silábica</span>
                  <span className="text-base font-black text-stone-900 dark:text-stone-100">{krashenScore.readability.avgSyllablesPerWord} síl/palabra</span>
                  <span className="text-[10px] text-stone-400 block">{krashenScore.readability.totalSyllables} sílabas total</span>
                </div>
              </div>

              {/* In-Line Cognate Callouts (Scaffolding for High Friction or Target Words) */}
              {krashenScore.scaffolding.cognateCallouts.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-stone-100 dark:border-stone-800">
                  <div className="flex items-center gap-1.5 text-stone-700 dark:text-stone-300 font-bold">
                    <Zap className="w-3.5 h-3.5 text-amber-500" />
                    <span>Puentes Cognados Español ➔ Inglés (Scaffolding Cognitivo):</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {krashenScore.scaffolding.cognateCallouts.map((c, i) => (
                      <div key={i} className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-start gap-2">
                        <span className="font-bold text-amber-700 dark:text-amber-400">{c.spanish}</span>
                        <span className="text-stone-400">➔</span>
                        <span className="text-stone-800 dark:text-stone-200 font-medium">{c.english}</span>
                        <span className="ml-auto text-[10px] font-mono bg-amber-500/20 text-amber-800 dark:text-amber-300 px-1.5 py-0.5 rounded">{c.rule}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Scaffolded Grammar Hints */}
              {krashenScore.scaffolding.grammarHints.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-stone-100 dark:border-stone-800">
                  <span className="font-bold text-stone-700 dark:text-stone-300 block">
                    Pistas Gramaticales Estructuradas:
                  </span>
                  <div className="space-y-1.5">
                    {krashenScore.scaffolding.grammarHints.map((hint, idx) => (
                      <div key={idx} className="p-2.5 rounded-lg bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 space-y-0.5">
                        <div className="font-bold text-stone-900 dark:text-stone-100">{hint.title}</div>
                        <div className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400">{hint.structure}</div>
                        <p className="text-stone-600 dark:text-stone-300 text-[11px] leading-relaxed">{hint.explanation_en}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Advancement Frontier (when ratio > 0.98) */}
              {krashenScore.advancements && krashenScore.advancements.suggestedSynonyms.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-stone-100 dark:border-stone-800">
                  <div className="flex items-center gap-1.5 text-sky-700 dark:text-sky-400 font-bold">
                    <Sparkles className="w-3.5 h-3.5 text-sky-500" />
                    <span>Frontera de Adquisición Avanzada (Sinónimos C1/B2 & Subjuntivo):</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {krashenScore.advancements.suggestedSynonyms.map((s, idx) => (
                      <div key={idx} className="p-2 rounded-lg bg-sky-500/10 border border-sky-500/20 space-y-0.5">
                        <div className="flex items-center justify-between">
                          <span className="line-through text-stone-400">{s.original}</span>
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-700 dark:text-sky-300">{s.cefr}</span>
                        </div>
                        <div className="font-bold text-sky-800 dark:text-sky-300">{s.advanced}</div>
                        <div className="text-[10px] text-stone-500">{s.nuance}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </div>

        {/* Story Rendering: Parallel Bilingual View OR Standard Immersion View */}
        {readerViewMode === 'parallel' ? (
          <ParallelReaderView
            paragraphGroups={alignmentResult.paragraphGroups}
            totalSentences={alignmentResult.totalSentences}
            hasTranslations={alignmentResult.hasTranslations}
            hasArabic={alignmentResult.hasArabic}
            userProgress={userProgress}
            selectedToken={selectedToken}
            selectedMWE={selectedMWE}
            selectedMWETokenIds={selectedMWETokenIds}
            multiTokenSelection={multiTokenSelection}
            activeWordTokenId={activeWordTokenId}
            activeSentenceIndex={activeSentenceIndex}
            textSizeClass={textSizeClasses[textSize]}
            tokenToWordIndexMap={tokenToWordIndexMap}
            tokenToMWEMap={tokenToMWEMap}
            getStageVisualClass={getStageVisualClass}
            getWordAcquisitionStage={getWordAcquisitionStage}
            handleTokenClick={handleTokenClick}
            handleTokenMouseDown={handleTokenMouseDown}
            handleTokenMouseEnter={handleTokenMouseEnter}
            handleTouchStart={handleTouchStart}
            handleTouchEnd={handleTouchEnd}
            handlePlaySentence={handlePlaySentence}
          />
        ) : (
          <article className="space-y-8 font-serif">
            {tokenizedParagraphs.map((paraTokens, pIdx) => {
              const sentences = groupTokensIntoSentences(paraTokens);

              const englishParaText = englishParagraphs[pIdx] || '';
              const englishParaSentences = englishParaText ? englishParaText.split(/(?<=[.!?])\s+/) : [];

              const arabicParaText = arabicParagraphs[pIdx] || '';
              const arabicParaSentences = arabicParaText ? arabicParaText.split(/(?<=[.!?])\s+/) : [];

              return (
                <div key={pIdx} className="space-y-4">
                  <div className="space-y-3">
                    {sentences.map(sentence => {
                      const isSentenceActive = activeSentenceIndex === sentence.sentenceIndex;

                      return (
                        <div
                          id={`sentence-card-${sentence.sentenceIndex}`}
                          key={sentence.sentenceIndex}
                          className={`rounded-2xl p-2 sm:p-2.5 transition-colors duration-200 relative ${
                            isSentenceActive
                              ? 'bg-amber-500/10 dark:bg-amber-400/10 ring-1 ring-amber-400/40 shadow-xs'
                              : 'hover:bg-stone-200/30 dark:hover:bg-stone-800/30'
                          }`}
                        >
                          {/* Sentence Text with Interactive Word Tokens */}
                          <p className={`${textSizeClasses[textSize]} text-stone-900 dark:text-stone-100 flex flex-wrap gap-x-1.5 gap-y-1.5 items-baseline font-serif selection:bg-amber-400/30`}>
                            {sentence.tokens.map(token => {
                              if (!token.isWord) {
                                return (
                                  <span key={token.id} className="text-stone-400 dark:text-stone-500 font-sans select-none">
                                    {token.raw}
                                  </span>
                                );
                              }

                              const wordIdx = tokenToWordIndexMap.get(token.id) ?? -1;
                              const stage = getWordAcquisitionStage(token.clean, userProgress);
                              const mweMatch = tokenToMWEMap.get(token.id);
                              const isSelected = selectedToken?.id === token.id;
                              const isMWEActive = selectedMWETokenIds.includes(token.id);
                              const isInMultiSelect = multiTokenSelection?.tokenIds.includes(token.id) || false;
                              const isHighlightedByAudio = activeWordTokenId === token.id;

                              let stateClass = getStageVisualClass(stage, isSelected || isMWEActive, isHighlightedByAudio);

                              if (mweMatch && !isSelected && !isMWEActive) {
                                stateClass += ' border-b-2 border-dashed border-purple-500/80 hover:border-purple-600';
                              }
                              if (isInMultiSelect) {
                                stateClass += ' bg-amber-300/80 dark:bg-amber-800/80 rounded ring-1 ring-amber-500';
                              }

                              return (
                                <span key={token.id} className="inline-flex items-baseline">
                                  {token.prefixPunct && (
                                    <span className="text-stone-400 font-sans select-none">{token.prefixPunct}</span>
                                  )}
                                  <button
                                    id={`word-token-${token.id}`}
                                    onClick={(e) => handleTokenClick(token, e)}
                                    onMouseDown={(e) => handleTokenMouseDown(token, wordIdx, e)}
                                    onMouseEnter={() => handleTokenMouseEnter(wordIdx)}
                                    onTouchStart={() => handleTouchStart(wordIdx)}
                                    onTouchEnd={handleTouchEnd}
                                    className={`px-0.5 rounded transition-all duration-100 cursor-pointer font-serif select-none ${stateClass}`}
                                    title={mweMatch ? `Expresión: "${mweMatch.mwe.phrase_es}" (${mweMatch.mwe.phrase_en})` : `Nivel ${stage}: "${token.clean}" (Pulsa 1-5)`}
                                  >
                                    {token.clean}
                                  </button>
                                  {token.suffixPunct && (
                                    <span className="text-stone-400 font-sans select-none">{token.suffixPunct}</span>
                                  )}
                                </span>
                              );
                            })}
                          </p>

                          {/* Optional discreet parallel translation scaffolding */}
                          {showFullTranslations && (
                            <div className="mt-2 pt-2 border-t border-stone-200/60 dark:border-stone-800/60 text-xs text-stone-500 dark:text-stone-400 space-y-1 font-sans">
                              {englishParaSentences[sentence.sentenceIndex] && (
                                <p className="italic text-stone-600 dark:text-stone-300">
                                  {englishParaSentences[sentence.sentenceIndex]}
                                </p>
                              )}
                              {arabicParaSentences[sentence.sentenceIndex] && (
                                <p className="font-arabic text-right text-stone-500 dark:text-stone-400" dir="rtl">
                                  {arabicParaSentences[sentence.sentenceIndex]}
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </article>
        )}

        {/* Footer completion note */}
        <div className="pt-8 border-t border-stone-200/70 dark:border-stone-800/70 text-center font-sans space-y-3">
          <p className="text-xs text-stone-500 dark:text-stone-400">
            ¿Terminaste de leer? Registra tu progreso para consolidar tus palabras en el sistema de repetición espaciada.
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => setIsReportModalOpen(true)}
              className="text-xs font-bold text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 flex items-center gap-1 transition cursor-pointer"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Reportar detalle en el texto</span>
            </button>
            <span>•</span>
            <button
              onClick={handleFinishReading}
              className="text-xs font-bold text-[#C85A32] hover:underline cursor-pointer"
            >
              Finalizar sesión (+50 XP)
            </button>
          </div>
        </div>
      </main>

      {/* 3. INSTANT FLOATING WORD DEFINITION POPOVER ANCHORED AT CURSOR/WORD POSITION */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {selectedToken && wordDef && popoverAnchor && (
            <div className="fixed inset-0 z-[120] pointer-events-none">
              {/* Invisible dismiss layer */}
              <div
                onClick={handleClosePopover}
                className="fixed inset-0 pointer-events-auto bg-transparent"
              />

              {/* Anchored popover card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: popoverAnchor.placement === 'top' ? 6 : -6 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: popoverAnchor.placement === 'top' ? 6 : -6 }}
                transition={{ type: 'spring', damping: 28, stiffness: 380 }}
                style={{
                  position: 'fixed',
                  top: popoverAnchor.placement === 'top' ? undefined : `${popoverAnchor.top}px`,
                  bottom: popoverAnchor.placement === 'top' ? `${window.innerHeight - popoverAnchor.top}px` : undefined,
                  left: `${popoverAnchor.left}px`,
                  width: `${popoverAnchor.width}px`,
                  maxWidth: 'calc(100vw - 32px)',
                }}
                className="pointer-events-auto bg-white dark:bg-[#1C1B1A] border border-stone-200/90 dark:border-stone-800 rounded-2xl shadow-xl z-[121] overflow-hidden flex flex-col max-h-[min(80dvh,calc(100dvh-48px))] font-sans ring-1 ring-black/5 dark:ring-white/5 pb-safe"
              >
                <WordPopover
                  wordOrPhrase={selectedMWE ? selectedMWE.phrase_es : selectedToken.clean}
                  isMWE={Boolean(selectedMWE)}
                  mweDescription={selectedMWE?.phrase_en}
                  wordDef={wordDef}
                  currentStage={getWordAcquisitionStage(selectedMWE ? selectedMWE.phrase_es : selectedToken.clean, userProgress)}
                  isSavedInSRS={isWordSavedInVocabulary(selectedMWE ? selectedMWE.phrase_es : selectedToken.clean)}
                  lemmaAnalysis={selectedMWE ? null : lemmaAnalysis}
                  collocations={activeCollocations}
                  onSetStage={(st) => handleSetStage(selectedMWE ? selectedMWE.phrase_es : selectedToken.clean, st)}
                  onToggleSaveSRS={() => handleToggleSaveToVocabulary(selectedMWE ? selectedMWE.phrase_es : selectedToken.clean)}
                  onClose={handleClosePopover}
                  onSpeak={(text, voice) => speakTargetVoice(text, voice)}
                  onSaveLemma={(lemma) => handleToggleSaveToVocabulary(lemma)}
                  isLemmaSaved={lemmaAnalysis ? isWordSavedInVocabulary(lemmaAnalysis.baseLemma) : false}
                />
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
      {/* MWE Disambiguation Choice Modal */}
      {mweChoice && (
        <div
          className="fixed z-[160] bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-2xl shadow-2xl p-3.5 space-y-2.5 max-w-xs animate-fadeIn font-sans"
          style={{
            top: `${Math.min(window.innerHeight - 170, Math.max(16, mweChoice.rect.top - 70))}px`,
            left: `${Math.min(window.innerWidth - 300, Math.max(16, mweChoice.rect.left - 60))}px`
          }}
        >
          <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-2">
            <span className="text-[10px] font-black uppercase text-purple-600 dark:text-purple-400 flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Expresión Multi-Palabra
            </span>
            <button
              onClick={() => setMweChoice(null)}
              className="text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-1.5">
            {/* Option A: Select Full Phrase */}
            <button
              onClick={() => {
                const matchedTokens = allWordTokens.filter(t => mweChoice.mweMatch.tokenIds.includes(t.id));
                handleSelectMWE(mweChoice.mweMatch.mwe, matchedTokens);
              }}
              className="w-full text-left p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 hover:bg-purple-100 dark:hover:bg-purple-900/60 border border-purple-200 dark:border-purple-800 transition cursor-pointer"
            >
              <span className="text-[10px] uppercase font-bold text-purple-700 dark:text-purple-300 block">
                Seleccionar frase completa:
              </span>
              <span className="text-xs font-black text-stone-900 dark:text-stone-100 block capitalize">
                "{mweChoice.mweMatch.mwe.phrase_es}"
              </span>
              <span className="text-[11px] text-stone-500 dark:text-stone-400 block truncate">
                {mweChoice.mweMatch.mwe.phrase_en}
              </span>
            </button>

            {/* Option B: Select Individual Word */}
            <button
              onClick={(e) => {
                const tok = mweChoice.singleToken;
                setMweChoice(null);
                handleSelectToken(tok, e);
              }}
              className="w-full text-left p-2 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 transition cursor-pointer text-xs flex items-center justify-between"
            >
              <span>Seleccionar palabra: <strong>"{mweChoice.singleToken.clean}"</strong></span>
              <span className="text-stone-400">➔</span>
            </button>
          </div>
        </div>
      )}

      {/* Floating Action Badge for Custom Multi-Token Selection */}
      {multiTokenSelection && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[150] bg-stone-900 text-white rounded-2xl p-3 shadow-2xl flex items-center gap-3 border border-stone-700 animate-slideUp font-sans">
          <div className="space-y-0.5 max-w-[200px] sm:max-w-xs">
            <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block">
              Frase seleccionada ({multiTokenSelection.cleanWords.length} palabras)
            </span>
            <span className="text-sm font-black truncate block">
              "{multiTokenSelection.combinedPhrase}"
            </span>
          </div>

          <button
            onClick={() => {
              const matchedTokens = allWordTokens.filter(t => multiTokenSelection.tokenIds.includes(t.id));
              handleSaveCustomMultiToken(multiTokenSelection.combinedPhrase, matchedTokens);
              setMultiTokenSelection(null);
            }}
            className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs transition cursor-pointer flex items-center gap-1.5 shrink-0 shadow-sm"
          >
            <BookmarkPlus className="w-3.5 h-3.5" />
            <span>Guardar en SRS (+20 XP)</span>
          </button>

          <button
            onClick={() => setMultiTokenSelection(null)}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white transition cursor-pointer"
            title="Cancelar selección"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Grammar / spelling issue reporting modal */}
      <ReportGrammarIssueModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        source="ReadingInterface"
        contextName={content.title}
        selectedText={selectedToken ? selectedToken.clean : ''}
      />
    </div>
  );
};
