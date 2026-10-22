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
  ChevronUp
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

  // Active Session Reading Timer
  const [sessionSeconds, setSessionSeconds] = useState<number>(0);
  const [isTimerActive, setIsTimerActive] = useState<boolean>(true);

  // Inspector & Popover states
  const [selectedToken, setSelectedToken] = useState<WordToken | null>(null);
  const [wordDef, setWordDef] = useState<WordDefinitionMatch | null>(null);
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
    setWordDef(null);
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

    // 1. Calculate cursor/token anchor position clamped to viewport
    const target = (event?.currentTarget as HTMLElement) || document.getElementById(`word-token-${token.id}`);
    if (target && typeof window !== 'undefined') {
      const rect = target.getBoundingClientRect();
      const popoverWidth = Math.min(360, window.innerWidth - 32);

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

  // 1-Click: Mark Word as Known
  const handleMarkAsKnown = (cleanWord: string) => {
    soundEffects.playCorrect();
    setUserProgress(prev => {
      const knownSet = new Set(prev.knownWords || []);
      knownSet.add(cleanWord.toLowerCase());

      const updatedLingqs = { ...(prev.lingqs || {}) };
      delete updatedLingqs[cleanWord.toLowerCase()];

      return {
        ...prev,
        knownWords: Array.from(knownSet),
        lingqs: updatedLingqs,
        xp: prev.xp + 5
      };
    });
  };

  // 1-Click: Set LingQ Status (1, 2, 3, 4)
  const handleSetLingQStatus = (cleanWord: string, status: LingQStatus) => {
    if (!wordDef) return;
    soundEffects.playPop();

    const newLingQ: LingQItem = {
      word: cleanWord.toLowerCase(),
      status,
      translation_en: wordDef.translation_en,
      translation_ar: wordDef.translation_ar,
      phonetic: wordDef.phonetic,
      partOfSpeech: wordDef.partOfSpeech,
      gender: wordDef.gender,
      sentenceContext: selectedToken?.fullSentence || '',
      createdAt: new Date().toISOString(),
      lastReviewed: new Date().toISOString()
    };

    setUserProgress(prev => {
      const knownList = (prev.knownWords || []).filter(w => w !== cleanWord.toLowerCase());

      return {
        ...prev,
        knownWords: knownList,
        lingqs: {
          ...(prev.lingqs || {}),
          [cleanWord.toLowerCase()]: newLingQ
        },
        xp: prev.xp + 10
      };
    });
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

            {/* Translation Toggle */}
            <button
              onClick={() => setShowFullTranslations(!showFullTranslations)}
              className={`p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition cursor-pointer ${
                showFullTranslations
                  ? 'bg-stone-200 dark:bg-stone-800 text-amber-700 dark:text-amber-300'
                  : 'text-stone-500 dark:text-stone-400 hover:bg-stone-200/50 dark:hover:bg-stone-800'
              }`}
              title={showFullTranslations ? 'Ocultar traducciones paralelas' : 'Mostrar traducciones paralelas'}
            >
              {showFullTranslations ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              <span className="hidden lg:inline">{showFullTranslations ? 'Traducción' : 'Inmersión'}</span>
            </button>

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

      {/* 2. OPTIMAL EDITORIAL READING CANVAS (Centered column max-w-2xl mx-auto) */}
      <main className="max-w-2xl mx-auto px-5 sm:px-8 py-8 sm:py-14 space-y-10 font-serif">
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

        {/* Story Paragraphs & Sentences */}
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

                            const state = getWordState(token.clean, userProgress);
                            const isSelected = selectedToken?.id === token.id;
                            const isHighlightedByAudio = activeWordTokenId === token.id;

                            // LingQ Color Coding: subtle, non-intrusive
                            let stateClass = '';
                            if (state === 'new') {
                              stateClass = 'border-b-2 border-sky-400/70 hover:bg-sky-100/60 dark:hover:bg-sky-950/60 text-sky-950 dark:text-sky-200';
                            } else if (state.startsWith('lingq_')) {
                              stateClass = 'border-b-2 border-amber-400/80 hover:bg-amber-100/60 dark:hover:bg-amber-950/60 text-amber-950 dark:text-amber-200';
                            } else {
                              stateClass = 'hover:bg-stone-200/50 dark:hover:bg-stone-800 text-stone-900 dark:text-stone-100';
                            }

                            if (isSelected) {
                              stateClass += ' bg-amber-200/70 dark:bg-amber-900/60 rounded-md font-semibold';
                            }

                            if (isHighlightedByAudio) {
                              stateClass += ' bg-amber-400 text-stone-950 rounded-md font-bold transition-all duration-75 shadow-xs';
                            }

                            return (
                              <span key={token.id} className="inline-flex items-baseline">
                                {token.prefixPunct && (
                                  <span className="text-stone-400 font-sans select-none">{token.prefixPunct}</span>
                                )}
                                <button
                                  id={`word-token-${token.id}`}
                                  onClick={(e) => handleSelectToken(token, e)}
                                  className={`px-0.5 rounded transition-all duration-100 cursor-pointer font-serif ${stateClass}`}
                                  title={`Ver significado de "${token.clean}"`}
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
                {/* Popover Header: Word + Gender Article, CEFR Badge, Audio & Close */}
                <div className="p-3.5 bg-stone-50/80 dark:bg-stone-800/50 border-b border-stone-200/70 dark:border-stone-800 flex items-start justify-between gap-2 shrink-0">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {/* Spanish word with gender article (e.g. "el sol", "la casa") */}
                      <span className="text-base font-black text-stone-900 dark:text-stone-100 capitalize">
                        {wordDef.wordWithArticle || (wordDef.article ? `${wordDef.article} ${wordDef.word}` : wordDef.word)}
                      </span>

                      {/* CEFR Level badge */}
                      <span className="px-1.5 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider bg-[#C85A32]/15 text-[#C85A32] dark:text-[#E07A5F]">
                        {wordDef.cefr || 'A1'}
                      </span>

                      {/* Part of Speech */}
                      <span className="px-1.5 py-0.5 rounded-md text-[9px] font-bold text-stone-500 dark:text-stone-400 bg-stone-200/60 dark:bg-stone-700/60 uppercase">
                        {wordDef.partOfSpeech || 'palabra'}
                      </span>
                    </div>

                    {wordDef.phonetic && (
                      <span className="text-[11px] font-mono text-stone-400 block mt-0.5">
                        /{wordDef.phonetic}/
                      </span>
                    )}
                  </div>

                  {/* Native Audio & Close */}
                  <div className="flex items-center gap-1 shrink-0">
                    {/* Mexican voice button */}
                    <button
                      onClick={() => speakTargetVoice(selectedToken.clean, 'mexico')}
                      className="p-1.5 rounded-lg bg-stone-200/70 dark:bg-stone-700 text-stone-700 dark:text-stone-200 hover:bg-amber-100 dark:hover:bg-amber-950/60 transition cursor-pointer"
                      title="Pronunciación Mexicana (Juan)"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>

                    {/* Castilian voice button */}
                    <button
                      onClick={() => speakTargetVoice(selectedToken.clean, 'spain')}
                      className="px-1.5 py-1 rounded-lg bg-stone-200/70 dark:bg-stone-700 text-stone-700 dark:text-stone-200 hover:bg-amber-100 dark:hover:bg-amber-950/60 text-[10px] font-bold transition cursor-pointer"
                      title="Pronunciación Castellana (Mateo)"
                    >
                      🇪🇸 ES
                    </button>

                    <button
                      onClick={handleClosePopover}
                      className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-200/50 dark:hover:bg-stone-800 transition cursor-pointer"
                      title="Cerrar"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Popover Body Content */}
                <div className="p-3.5 space-y-3 overflow-y-auto overscroll-contain text-xs">
                  {/* Instant Action: Single-click Save to SRS Vocabulary */}
                  <button
                    onClick={() => handleToggleSaveToVocabulary(selectedToken.clean)}
                    className={`w-full py-2 px-3 rounded-xl font-black text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs ${
                      isWordSavedInVocabulary(selectedToken.clean)
                        ? 'bg-amber-500 text-stone-950 hover:bg-amber-400'
                        : 'bg-stone-100 dark:bg-stone-800 hover:bg-[#C85A32] hover:text-white text-stone-800 dark:text-stone-200 border border-stone-200 dark:border-stone-700'
                    }`}
                  >
                    {isWordSavedInVocabulary(selectedToken.clean) ? (
                      <>
                        <BookmarkCheck className="w-4 h-4 fill-current text-stone-950" />
                        <span>✓ Guardado en Vocabulario</span>
                      </>
                    ) : (
                      <>
                        <BookmarkPlus className="w-4 h-4 text-[#C85A32]" />
                        <span>Guardar (+ Vocab)</span>
                      </>
                    )}
                  </button>

                  {/* English & Arabic Translations Card */}
                  <div className="space-y-1.5 p-2.5 bg-stone-50 dark:bg-stone-800/40 rounded-xl border border-stone-200/60 dark:border-stone-800">
                    <div>
                      <span className="text-[9px] font-bold uppercase tracking-wider text-stone-400">
                        Significado en inglés
                      </span>
                      <p className="text-xs font-bold text-stone-900 dark:text-stone-100 capitalize">
                        {wordDef.translation_en}
                      </p>
                    </div>

                    {wordDef.translation_ar && (
                      <div className="pt-1.5 border-t border-stone-200/60 dark:border-stone-700/60">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-stone-400">
                          الترجمة العربية
                        </span>
                        <p className="text-xs font-bold text-amber-700 dark:text-amber-300 font-arabic text-right" dir="rtl">
                          {wordDef.translation_ar}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* AI Explanation / Context if available */}
                  {(wordDef.explanation_en || wordDef.explanation_ar) && (
                    <div className="p-2.5 bg-amber-50/50 dark:bg-amber-950/20 rounded-xl border border-amber-200/50 dark:border-amber-900/30 space-y-1">
                      <span className="text-[9px] font-black uppercase tracking-wider text-[#B47832] flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        <span>Contexto de uso</span>
                      </span>
                      {wordDef.explanation_en && (
                        <p className="text-[11px] text-stone-600 dark:text-stone-300 leading-normal">
                          {wordDef.explanation_en}
                        </p>
                      )}
                      {wordDef.explanation_ar && (
                        <p className="text-[11px] text-stone-500 dark:text-stone-400 font-arabic text-right leading-normal" dir="rtl">
                          {wordDef.explanation_ar}
                        </p>
                      )}
                    </div>
                  )}

                  {/* LingQ Word Status Bar: Known + L1-L4 */}
                  <div className="space-y-1">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-stone-400">
                      Nivel de dominio LingQ
                    </span>
                    <div className="grid grid-cols-5 gap-1">
                      <button
                        onClick={() => handleMarkAsKnown(selectedToken.clean)}
                        className="py-1 px-1 rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-emerald-500 hover:text-white border border-stone-200 dark:border-stone-700 text-[10px] font-black text-stone-700 dark:text-stone-300 transition flex flex-col items-center gap-0.5 cursor-pointer"
                        title="Marcar como conocida (mastered)"
                      >
                        <Check className="w-3 h-3 text-emerald-500" />
                        <span>Sabida</span>
                      </button>

                      {([1, 2, 3, 4] as LingQStatus[]).map(st => (
                        <button
                          key={st}
                          onClick={() => handleSetLingQStatus(selectedToken.clean, st)}
                          className={`py-1 px-1 rounded-lg border text-[10px] font-black transition flex flex-col items-center gap-0.5 cursor-pointer ${
                            userProgress.lingqs?.[selectedToken.clean.toLowerCase()]?.status === st
                              ? 'bg-amber-500 text-stone-950 border-amber-500 shadow-2xs'
                              : 'bg-stone-100 dark:bg-stone-800 hover:bg-amber-100 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700'
                          }`}
                        >
                          <Bookmark className="w-3 h-3 text-amber-500" />
                          <span>L{st}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 1-Click Sentence Mining to Cloze SRS */}
                  <button
                    onClick={handleMineSentence}
                    className="w-full py-1.5 px-3 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-[#C85A32]/10 text-stone-700 dark:text-stone-300 hover:text-[#C85A32] font-bold text-[11px] flex items-center justify-center gap-1.5 border border-stone-200 dark:border-stone-700 transition cursor-pointer"
                  >
                    <BookmarkPlus className="w-3.5 h-3.5" />
                    <span>Guardar oración entera en SRS</span>
                  </button>

                  {minedSuccessMessage && (
                    <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-[11px] font-bold text-center animate-fadeIn">
                      {minedSuccessMessage}
                    </div>
                  )}

                  {/* Multi-Context Corpus toggle */}
                  {multiContexts.length > 0 && (
                    <div className="pt-1 border-t border-stone-200/60 dark:border-stone-800">
                      <button
                        onClick={() => setShowCorpusExamples(!showCorpusExamples)}
                        className="w-full py-1 px-2 rounded-lg text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 font-bold text-[10px] flex items-center justify-between transition cursor-pointer"
                      >
                        <span>Ver en otros {multiContexts.length} contextos reales</span>
                        <span>{showCorpusExamples ? '▲' : '▼'}</span>
                      </button>

                      {showCorpusExamples && (
                        <div className="space-y-1.5 max-h-32 overflow-y-auto mt-1 pr-1 text-[11px]">
                          {multiContexts.map((ctx, idx) => (
                            <div
                              key={idx}
                              className="p-2 bg-stone-50 dark:bg-stone-800/60 rounded-lg border border-stone-200/60 dark:border-stone-700 space-y-0.5"
                            >
                              <div className="flex items-center justify-between text-[9px] text-stone-400 font-mono">
                                <span>{ctx.source}</span>
                                <button
                                  onClick={() => speakTargetVoice(ctx.es)}
                                  className="text-[#C85A32] hover:underline cursor-pointer"
                                >
                                  ▶ Escuchar
                                </button>
                              </div>
                              <p className="font-bold text-stone-900 dark:text-white">
                                {ctx.es}
                              </p>
                              <p className="text-stone-500 dark:text-stone-400 text-[10px]">
                                {ctx.en}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
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
