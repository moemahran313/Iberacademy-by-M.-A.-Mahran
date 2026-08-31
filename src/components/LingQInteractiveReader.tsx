import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Volume2,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  Bookmark,
  BookmarkPlus,
  Compass,
  Layers,
  ArrowLeft,
  Eye,
  EyeOff,
  Share2,
  Flame,
  BookOpen,
  HelpCircle,
  Plus,
  Check,
  Zap,
  Repeat,
  Timer,
  Clock,
  VolumeX,
  Gauge
} from 'lucide-react';
import {
  UserProgress,
  LingQStatus,
  LingQItem,
  MinedSentence,
  ImportedContent,
  ReadingSessionRecord
} from '../types';
import {
  tokenizeText,
  groupTokensIntoSentences,
  getWordState,
  lookupSpanishWord,
  findMultiContextSentences,
  calculateComprehensibility,
  WordToken,
  WordState,
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
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(userProgress.settings.audioSpeed || 0.9);
  const [showFullTranslations, setShowFullTranslations] = useState<boolean>(true);
  const [autoScroll, setAutoScroll] = useState<boolean>(true);

  // Active Session Reading Timer
  const [sessionSeconds, setSessionSeconds] = useState<number>(0);
  const [isTimerActive, setIsTimerActive] = useState<boolean>(true);

  // Inspector & Selection states
  const [selectedToken, setSelectedToken] = useState<WordToken | null>(null);
  const [wordDef, setWordDef] = useState<WordDefinitionMatch | null>(null);
  const [multiContexts, setMultiContexts] = useState<ContextualSentence[]>([]);
  const [showCorpusExamples, setShowCorpusExamples] = useState<boolean>(false);
  const [minedSuccessMessage, setMinedSuccessMessage] = useState<string | null>(null);
  const [hasCompletedReading, setHasCompletedReading] = useState<boolean>(false);
  const [isAiTranslating, setIsAiTranslating] = useState<boolean>(false);

  // Client-side cache to instantly resolve previously fetched word translations without hitting the server or API
  const clientTranslationCache = useRef<Record<string, any>>({});

  // Comprehensibility report
  const report = useMemo(() => {
    return calculateComprehensibility(allTokens, userProgress);
  }, [allTokens, userProgress]);

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
    };
  }, []);

  // Format timer into MM:SS
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // When a token is clicked, inspect its definition & context
  const handleSelectToken = async (token: WordToken) => {
    if (!token.isWord) return;
    setSelectedToken(token);
    
    // 1. Show instant offline translation
    const def = lookupSpanishWord(token.clean);
    setWordDef(def);
    
    const contexts = findMultiContextSentences(token.clean);
    setMultiContexts(contexts);
    setShowCorpusExamples(false);
    setMinedSuccessMessage(null);
    speakSpanish(token.clean, playbackSpeed);

    // If already in client-side cache, use it immediately and skip fetching
    if (clientTranslationCache.current[token.clean]) {
      setWordDef(clientTranslationCache.current[token.clean]);
      return;
    }

    // 2. Query Gemini for precise contextual translation and image
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
        // Save to client cache
        clientTranslationCache.current[token.clean] = aiDef;

        // Update wordDef with the AI-enriched translation if the selected token hasn't changed
        setSelectedToken(curr => {
          if (curr?.id === token.id) {
            setWordDef(aiDef);
          }
          return curr;
        });
      }
    } catch (err) {
      console.warn('AI translation enhancement failed:', err);
    } finally {
      setSelectedToken(curr => {
        if (curr?.id === token.id) {
          setIsAiTranslating(false);
        }
        return curr;
      });
    }
  };

  // 1-Click: Mark Word as Known (turns white / transparent)
  const handleMarkAsKnown = (cleanWord: string) => {
    soundEffects.playCorrect();
    setUserProgress(prev => {
      const knownSet = new Set(prev.knownWords || []);
      knownSet.add(cleanWord.toLowerCase());

      // Remove from active lingqs if present
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
      // Remove from known words if present
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
      // Avoid duplicate exact sentence mining
      const filtered = existing.filter(m => m.sentence_es !== sentenceToMine || m.targetWord !== cleanWord);
      return {
        ...prev,
        minedSentences: [newMinedSentence, ...filtered],
        xp: prev.xp + 15
      };
    });

    soundEffects.playLevelUp();
    setMinedSuccessMessage(`✓ Mined "${cleanWord}" with full sentence context to Cloze SRS!`);
    setTimeout(() => setMinedSuccessMessage(null), 3500);
  };

  // 1-Click: Mark ALL remaining New (Blue) Words on the page as Known
  const handleMarkPageAsKnown = () => {
    soundEffects.playLevelUp();
    const newWordsOnPage = allTokens
      .filter(t => t.isWord && getWordState(t.clean, userProgress) === 'new')
      .map(t => t.clean.toLowerCase());

    if (newWordsOnPage.length === 0) return;

    setUserProgress(prev => {
      const knownSet = new Set([...(prev.knownWords || []), ...newWordsOnPage]);
      const addedCount = newWordsOnPage.length;

      return {
        ...prev,
        knownWords: Array.from(knownSet),
        xp: prev.xp + addedCount * 3
      };
    });
  };

  // Finish Reading Session: track volume, reading time, log session history, grant XP
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

  // Real-Time Audio: Play single sentence with word-by-word karaoke highlight
  const handlePlaySentence = (sentenceText: string, sIdx: number, sentenceTokens: WordToken[]) => {
    setActiveSentenceIndex(sIdx);
    setIsPlayingAll(false);

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
          }, 300);
        } else {
          setActiveSentenceIndex(null);
        }
      }
    });
  };

  // Real-Time Audio: Play entire text with continuous read-along karaoke
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

            if (autoScroll) {
              const el = document.getElementById(`sentence-card-${activeTok.sentenceIndex}`);
              if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
              }
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

  return (
    <div className="space-y-6 animate-fadeIn pb-16">
      {/* Top Header & Navigation */}
      <div className="bg-stone-900 border border-stone-800 rounded-3xl p-5 sm:p-6 text-white shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <button
              onClick={() => {
                cancelSpanishSpeech();
                onBack();
              }}
              className="p-2.5 rounded-2xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition shrink-0"
              title="Return to Library"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-md text-xs font-black uppercase tracking-wider bg-amber-500 text-stone-950">
                  {content.cefr}
                </span>
                <span className="text-xs font-bold text-stone-400">
                  {content.category}
                </span>
                <span className="text-stone-600">•</span>
                <span className="text-xs text-stone-400 font-mono flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                  {report.totalWords} words ({report.uniqueWords} unique)
                </span>
                <span className="text-stone-600">•</span>
                <span className="text-xs text-amber-300 font-mono flex items-center gap-1">
                  <Timer className="w-3.5 h-3.5 text-amber-400" />
                  Reading Time: {formatTime(sessionSeconds)}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-stone-100 tracking-tight">
                {content.title}
              </h2>
            </div>
          </div>

          {/* Krashen Comprehensibility Metric Badge & Complete Button */}
          <div className="flex items-center gap-3 self-end md:self-auto flex-wrap">
            <div className={`px-3.5 py-2 rounded-2xl border flex items-center gap-2 text-xs font-extrabold ${report.krashenEvaluation.color}`}>
              <Zap className="w-4 h-4 shrink-0" />
              <div>
                <div>{report.comprehensibilityPercentage}% Comprehensible</div>
                <div className="text-[10px] font-medium opacity-90">{report.krashenEvaluation.badge}</div>
              </div>
            </div>

            <button
              onClick={handleMarkPageAsKnown}
              className="px-3.5 py-2 rounded-2xl bg-stone-800 hover:bg-stone-700 border border-stone-700 text-stone-200 hover:text-white text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
              title="Mark all remaining blue words as known"
            >
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Mark All Blue as Known</span>
            </button>

            {!hasCompletedReading ? (
              <button
                onClick={handleFinishReading}
                className="px-4 py-2 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-stone-950 text-xs font-black shadow-md flex items-center gap-1.5 transition transform active:scale-95 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Finish & Log Reading</span>
              </button>
            ) : (
              <span className="px-3.5 py-2 rounded-2xl bg-emerald-950/80 border border-emerald-700 text-emerald-300 text-xs font-black flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Session Logged (+50 XP)</span>
              </span>
            )}
          </div>
        </div>

        {/* Audio Read-Along Toolbar with Real-Time Word Highlighting */}
        <div className="mt-5 pt-4 border-t border-stone-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Audio Controls */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handlePlayAll}
              className={`px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition shadow-xs cursor-pointer ${
                isPlayingAll
                  ? 'bg-amber-500 text-stone-950 font-black animate-pulse'
                  : 'bg-stone-800 hover:bg-stone-700 text-stone-200'
              }`}
            >
              {isPlayingAll ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isPlayingAll ? 'Pause Read-Along' : '▶ Play Read-Along Karaoke'}</span>
            </button>

            {/* Loop active sentence toggle */}
            <button
              onClick={() => setIsLoopingSentence(!isLoopingSentence)}
              className={`px-3 py-2 rounded-xl font-bold flex items-center gap-1.5 transition border cursor-pointer ${
                isLoopingSentence
                  ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                  : 'bg-stone-800/80 border-stone-700 text-stone-400 hover:text-stone-200'
              }`}
              title="Loop the active sentence repeatedly for auditory reinforcement"
            >
              <Repeat className="w-3.5 h-3.5" />
              <span>Sentence Loop</span>
            </button>

            {/* Playback speed selector */}
            <div className="flex items-center bg-stone-800 rounded-xl p-1 border border-stone-700">
              {[0.75, 0.9, 1.0, 1.25].map(speed => (
                <button
                  key={speed}
                  onClick={() => setPlaybackSpeed(speed)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer ${
                    playbackSpeed === speed
                      ? 'bg-amber-500 text-stone-950 font-black'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  {speed}x
                </button>
              ))}
            </div>

            {/* Auto-scroll toggle */}
            <button
              onClick={() => setAutoScroll(!autoScroll)}
              className={`px-3 py-2 rounded-xl font-bold flex items-center gap-1.5 transition border cursor-pointer ${
                autoScroll
                  ? 'bg-stone-800 border-stone-600 text-amber-300'
                  : 'bg-stone-800/50 border-stone-700 text-stone-400'
              }`}
              title="Automatically keep active sentence centered in view"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Auto-Scroll {autoScroll ? 'ON' : 'OFF'}</span>
            </button>

            {/* Translation toggle */}
            <button
              onClick={() => setShowFullTranslations(!showFullTranslations)}
              className={`px-3 py-2 rounded-xl font-bold flex items-center gap-1.5 transition border cursor-pointer ${
                showFullTranslations
                  ? 'bg-stone-800 border-amber-500/40 text-amber-300'
                  : 'bg-stone-800/60 border-stone-700 text-stone-400'
              }`}
            >
              {showFullTranslations ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              <span>{showFullTranslations ? 'Translations Visible' : 'Immersion Mode'}</span>
            </button>
          </div>

          {/* Color Key Legend */}
          <div className="flex items-center gap-3 text-[11px] font-semibold text-stone-400 flex-wrap">
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-full bg-sky-400 inline-block"></span>
              <span>New ({report.newWordsCount})</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-full bg-amber-400 inline-block"></span>
              <span>LingQs ({report.lingqsCount})</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-full bg-stone-300 inline-block"></span>
              <span>Known ({report.knownWordsCount})</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Reader Layout + Floating Word Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left/Center: Interactive Text Canvas */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-8">
            {tokenizedParagraphs.map((paraTokens, pIdx) => {
              const sentences = groupTokensIntoSentences(paraTokens);

              // Pre-calculate matching parallel sentences for this specific paragraph
              const englishParaText = englishParagraphs[pIdx] || '';
              const englishParaSentences = englishParaText ? englishParaText.split(/(?<=[.!?])\s+/) : [];

              const arabicParaText = arabicParagraphs[pIdx] || '';
              const arabicParaSentences = arabicParaText ? arabicParaText.split(/(?<=[.!?])\s+/) : [];

              return (
                <div key={pIdx} className="space-y-4">
                  <div className="space-y-3">
                    {sentences.map(sentence => {
                      const isActive = activeSentenceIndex === sentence.sentenceIndex;

                      return (
                        <div
                          id={`sentence-card-${sentence.sentenceIndex}`}
                          key={sentence.sentenceIndex}
                          className={`p-3.5 rounded-2xl transition-all duration-200 relative group flex items-start gap-3 border ${
                            isActive
                              ? 'bg-amber-500/10 dark:bg-amber-950/40 border-amber-400 dark:border-amber-600 shadow-md ring-1 ring-amber-400/50'
                              : 'border-transparent hover:bg-stone-50 dark:hover:bg-stone-800/40 hover:border-stone-200 dark:hover:border-stone-800'
                          }`}
                        >
                          {/* Play sentence audio button */}
                          <button
                            onClick={() => handlePlaySentence(sentence.text, sentence.sentenceIndex, sentence.tokens)}
                            className={`mt-1 p-1.5 rounded-xl transition shrink-0 cursor-pointer ${
                              isActive
                                ? 'bg-amber-500 text-stone-950 shadow-xs'
                                : 'bg-stone-100 dark:bg-stone-800 text-stone-400 hover:text-amber-500 hover:bg-amber-100 dark:hover:bg-amber-950 opacity-60 group-hover:opacity-100'
                            }`}
                            title="Play sentence audio with read-along"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>

                          {/* Sentence Words */}
                          <div className="flex-1 space-y-1.5">
                            <p className="text-base sm:text-lg leading-relaxed text-stone-900 dark:text-stone-100 flex flex-wrap gap-x-1.5 gap-y-1.5 items-baseline font-serif">
                              {sentence.tokens.map(token => {
                                if (!token.isWord) {
                                  return (
                                    <span key={token.id} className="text-stone-400 font-sans">
                                      {token.raw}
                                    </span>
                                  );
                                }

                                const state = getWordState(token.clean, userProgress);
                                const isSelected = selectedToken?.id === token.id;
                                const isHighlightedByAudio = activeWordTokenId === token.id;

                                let stateClass = '';
                                if (state === 'new') {
                                  stateClass = 'bg-sky-100/80 dark:bg-sky-950/70 text-sky-900 dark:text-sky-200 border-b-2 border-sky-400 hover:bg-sky-200 dark:hover:bg-sky-900';
                                } else if (state.startsWith('lingq_')) {
                                  stateClass = 'bg-amber-100/80 dark:bg-amber-950/70 text-amber-950 dark:text-amber-200 border-b-2 border-amber-400 hover:bg-amber-200 dark:hover:bg-amber-900';
                                } else {
                                  stateClass = 'hover:bg-stone-200/70 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200';
                                }

                                if (isSelected) {
                                  stateClass += ' ring-2 ring-amber-500 font-black scale-105 shadow-xs';
                                }

                                if (isHighlightedByAudio) {
                                  stateClass += ' bg-amber-400 text-stone-950 font-black ring-2 ring-amber-500 shadow-md scale-110 duration-75';
                                }

                                return (
                                  <span key={token.id} className="inline-flex items-center">
                                    {token.prefixPunct && <span className="text-stone-400 font-sans">{token.prefixPunct}</span>}
                                    <button
                                      onClick={() => handleSelectToken(token)}
                                      className={`px-1.5 py-0.5 rounded-lg transition-all duration-100 cursor-pointer text-[17px] font-medium ${stateClass}`}
                                      title={`Click to inspect "${token.clean}"`}
                                    >
                                      {token.clean}
                                    </button>
                                    {token.suffixPunct && <span className="text-stone-400 font-sans">{token.suffixPunct}</span>}
                                  </span>
                                );
                              })}
                            </p>

                            {/* Optional Parallel Translations (Scaffolding) */}
                            {showFullTranslations && (
                              <div className="pt-1.5 text-xs text-stone-500 dark:text-stone-400 space-y-1 border-t border-stone-100 dark:border-stone-800/80 font-sans animate-fadeIn">
                                {englishParaSentences[sentence.sentenceIndex] && (
                                  <p className="italic opacity-85 text-stone-600 dark:text-stone-300">
                                    🇬🇧 {englishParaSentences[sentence.sentenceIndex]}
                                  </p>
                                )}
                                {arabicParaSentences[sentence.sentenceIndex] && (
                                  <p className="font-arabic text-right text-stone-500 dark:text-stone-400" dir="rtl">
                                    🇸🇦 {arabicParaSentences[sentence.sentenceIndex]}
                                  </p>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Full Parallel Translations Box */}
          {showFullTranslations && (content.translation_en || content.translation_ar) && (
            <div className="bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 space-y-4">
              <h4 className="text-sm font-black uppercase tracking-wider text-stone-600 dark:text-stone-400 flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-500" />
                <span>Full Parallel Reference</span>
              </h4>

              {content.translation_en && (
                <div className="space-y-1">
                  <span className="text-xs font-bold text-stone-500">English Translation</span>
                  <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                    {content.translation_en}
                  </p>
                </div>
              )}

              {content.translation_ar && (
                <div className="space-y-1 pt-2 border-t border-stone-200 dark:border-stone-800">
                  <span className="text-xs font-bold text-stone-500">الترجمة العربية</span>
                  <p className="text-sm text-stone-700 dark:text-stone-300 font-arabic leading-relaxed" dir="rtl">
                    {content.translation_ar}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right: Floating Word & Sentence Mining Inspector */}
        <div className="hidden lg:block lg:col-span-4 sticky top-6 space-y-5">
          {selectedToken && wordDef ? (
            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 shadow-xl space-y-5 animate-fadeIn">
              {/* Header & Pronunciation */}
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl font-black text-stone-900 dark:text-white capitalize">
                      {selectedToken.clean}
                    </h3>
                    <button
                      onClick={() => speakSpanish(selectedToken.clean, playbackSpeed)}
                      className="p-1.5 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 hover:bg-amber-200 transition cursor-pointer"
                      title="Pronounce Word"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  {wordDef.phonetic && (
                    <span className="text-xs font-mono text-stone-400">
                      /{wordDef.phonetic}/
                    </span>
                  )}
                </div>

                <span className="px-2.5 py-1 rounded-xl text-[10px] font-black uppercase tracking-wider bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300">
                  {wordDef.partOfSpeech || 'Word'}
                </span>
              </div>

              {/* Context Image (Dual Coding Visual Association) */}
              {(wordDef.imageUrl || isAiTranslating) && (
                <div className="relative w-full h-36 rounded-2xl overflow-hidden bg-stone-100 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700/60 flex items-center justify-center shadow-inner">
                  {isAiTranslating && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-stone-50/80 dark:bg-stone-900/80 z-10 animate-pulse">
                      <Sparkles className="w-5 h-5 text-amber-500 animate-spin" />
                      <span className="text-[10px] font-black text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                        Enhancing with AI...
                      </span>
                    </div>
                  )}
                  
                  {wordDef.imageUrl && (
                    <img
                      src={wordDef.imageUrl}
                      alt={wordDef.word}
                      className="w-full h-full object-cover rounded-xl"
                      referrerPolicy="no-referrer"
                    />
                  )}
                </div>
              )}

              {/* Translations */}
              <div className="space-y-2 p-4 bg-stone-50 dark:bg-stone-800/60 rounded-2xl border border-stone-200/80 dark:border-stone-700/60">
                <div>
                  <span className="text-[10px] font-extrabold text-stone-400 uppercase tracking-wider">
                    English Meaning
                  </span>
                  <p className="text-sm font-black text-stone-900 dark:text-white capitalize">
                    {wordDef.translation_en}
                  </p>
                </div>

                {wordDef.translation_ar && (
                  <div className="pt-1.5 border-t border-stone-200 dark:border-stone-700">
                    <span className="text-[10px] font-extrabold text-stone-400 uppercase tracking-wider">
                      الترجمة العربية
                    </span>
                    <p className="text-sm font-bold text-amber-700 dark:text-amber-300 font-arabic text-right" dir="rtl">
                      {wordDef.translation_ar}
                    </p>
                  </div>
                )}
              </div>

              {/* Context Explanation */}
              {(wordDef.explanation_en || wordDef.explanation_ar) && (
                <div className="p-3.5 bg-amber-50/40 dark:bg-amber-950/20 rounded-2xl border border-amber-100/60 dark:border-amber-900/30 space-y-1.5 animate-fadeIn">
                  <span className="text-[9px] font-black uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>AI Context Insight</span>
                  </span>
                  {wordDef.explanation_en && (
                    <p className="text-xs text-stone-600 dark:text-stone-300 leading-normal">
                      {wordDef.explanation_en}
                    </p>
                  )}
                  {wordDef.explanation_ar && (
                    <p className="text-xs text-stone-500 dark:text-stone-400 font-arabic leading-normal text-right" dir="rtl">
                      {wordDef.explanation_ar}
                    </p>
                  )}
                </div>
              )}

              {/* Status Controls: Known vs LingQ 1-4 */}
              <div className="space-y-2">
                <span className="text-[11px] font-extrabold text-stone-400 uppercase tracking-wider">
                  Update Word Status
                </span>

                <div className="grid grid-cols-5 gap-1.5">
                  <button
                    onClick={() => handleMarkAsKnown(selectedToken.clean)}
                    className="p-2 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-emerald-500 hover:text-white border border-stone-200 dark:border-stone-700 text-xs font-black text-stone-700 dark:text-stone-300 transition flex flex-col items-center gap-0.5 cursor-pointer"
                    title="Mark as Known (Mastered)"
                  >
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Known</span>
                  </button>

                  {([1, 2, 3, 4] as LingQStatus[]).map(st => (
                    <button
                      key={st}
                      onClick={() => handleSetLingQStatus(selectedToken.clean, st)}
                      className={`p-2 rounded-xl border text-xs font-black transition flex flex-col items-center gap-0.5 cursor-pointer ${
                        userProgress.lingqs?.[selectedToken.clean.toLowerCase()]?.status === st
                          ? 'bg-amber-500 text-stone-950 border-amber-500 shadow-sm'
                          : 'bg-stone-100 dark:bg-stone-800 hover:bg-amber-100 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700'
                      }`}
                    >
                      <Bookmark className="w-3.5 h-3.5 text-amber-500" />
                      <span>L{st}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 1-Click Sentence Mining to Cloze SRS */}
              <div className="pt-2 border-t border-stone-200 dark:border-stone-800 space-y-2">
                <button
                  onClick={handleMineSentence}
                  className="w-full py-3 px-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs flex items-center justify-center gap-2 shadow-md transition transform active:scale-95 cursor-pointer"
                >
                  <BookmarkPlus className="w-4 h-4" />
                  <span>Mine Sentence to Cloze SRS</span>
                </button>

                {minedSuccessMessage && (
                  <div className="p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-950 border border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-200 text-xs font-bold text-center animate-fadeIn">
                    {minedSuccessMessage}
                  </div>
                )}
              </div>

              {/* Multi-Context Corpus Examples (Fixing Decontextualized Learning) */}
              <div className="pt-2 border-t border-stone-200 dark:border-stone-800 space-y-2">
                <button
                  onClick={() => setShowCorpusExamples(!showCorpusExamples)}
                  className="w-full py-2 px-3 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 font-bold text-xs flex items-center justify-between transition cursor-pointer"
                >
                  <span className="flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-amber-500" />
                    <span>See "{selectedToken.clean}" in {multiContexts.length} Other Contexts</span>
                  </span>
                  <span>{showCorpusExamples ? '▲' : '▼'}</span>
                </button>

                {showCorpusExamples && (
                  <div className="space-y-2 max-h-60 overflow-y-auto pr-1 text-xs">
                    {multiContexts.length === 0 ? (
                      <p className="text-stone-400 text-center py-2">No other instances found in active corpus.</p>
                    ) : (
                      multiContexts.map((ctx, idx) => (
                        <div
                          key={idx}
                          className="p-2.5 bg-stone-50 dark:bg-stone-800/80 rounded-xl border border-stone-200 dark:border-stone-700 space-y-1"
                        >
                          <div className="flex items-center justify-between text-[10px] text-stone-400 font-mono">
                            <span>{ctx.source}</span>
                            <button
                              onClick={() => speakSpanish(ctx.es, playbackSpeed)}
                              className="text-amber-500 hover:underline cursor-pointer"
                            >
                              ▶ Listen
                            </button>
                          </div>
                          <p className="font-bold text-stone-900 dark:text-white">
                            {ctx.es}
                          </p>
                          <p className="text-stone-500 dark:text-stone-400 text-[11px]">
                            {ctx.en}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-stone-50 dark:bg-stone-900/60 border-2 border-dashed border-stone-200 dark:border-stone-800 rounded-3xl p-6 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 mx-auto flex items-center justify-center">
                <BookOpen className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="font-black text-stone-800 dark:text-stone-200 text-sm">
                  Click Any Word to Inspect
                </h4>
                <p className="text-xs text-stone-400">
                  Tap any Spanish token to view instant definitions, audio read-along, grammar lemma, multi-sentence contexts, or mine to Cloze SRS.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile/Tablet Popup Sliding Drawer Sheet for Word Inspector */}
      <AnimatePresence>
        {selectedToken && wordDef && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setSelectedToken(null);
                setWordDef(null);
              }}
              className="fixed inset-0 bg-black z-50 lg:hidden"
            />

            {/* Slide-up Bottom Drawer */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 210 }}
              className="fixed bottom-0 left-0 right-0 bg-white dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800 rounded-t-3xl shadow-2xl z-50 lg:hidden flex flex-col max-h-[85vh] outline-none"
            >
              {/* Drag Handle Indicator & Controls */}
              <div className="relative py-3.5 border-b border-stone-100 dark:border-stone-800/80 flex items-center justify-between px-6 shrink-0">
                <div className="w-12 h-1.5 bg-stone-300 dark:bg-stone-700 rounded-full absolute top-2 left-1/2 -translate-x-1/2" />
                
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-500 font-mono mt-1.5">
                  Word Lookup
                </span>

                <button
                  onClick={() => {
                    setSelectedToken(null);
                    setWordDef(null);
                  }}
                  className="mt-1.5 px-3 py-1 text-xs font-black bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 rounded-xl transition cursor-pointer"
                >
                  Done
                </button>
              </div>

              {/* Scrollable Content Pane */}
              <div className="p-6 overflow-y-auto space-y-5 pb-12">
                {/* Word details */}
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-2xl font-black text-stone-900 dark:text-white capitalize">
                        {selectedToken.clean}
                      </h3>
                      <button
                        onClick={() => speakSpanish(selectedToken.clean, playbackSpeed)}
                        className="p-1.5 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 hover:bg-amber-200 transition cursor-pointer"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>

                    {wordDef.phonetic && (
                      <span className="text-xs font-mono text-stone-400">
                        /{wordDef.phonetic}/
                      </span>
                    )}
                  </div>

                  <span className="px-2.5 py-1 rounded-xl text-[10px] font-black uppercase tracking-wider bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300">
                    {wordDef.partOfSpeech || 'Word'}
                  </span>
                </div>

                {/* Imagery context if present */}
                {(wordDef.imageUrl || isAiTranslating) && (
                  <div className="relative w-full h-36 rounded-2xl overflow-hidden bg-stone-100 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700/60 flex items-center justify-center shadow-inner">
                    {isAiTranslating && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-stone-50/80 dark:bg-stone-900/80 z-10 animate-pulse">
                        <Sparkles className="w-5 h-5 text-amber-500 animate-spin" />
                        <span className="text-[10px] font-black text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                          Enhancing with AI...
                        </span>
                      </div>
                    )}
                    
                    {wordDef.imageUrl && (
                      <img
                        src={wordDef.imageUrl}
                        alt={wordDef.word}
                        className="w-full h-full object-cover rounded-xl"
                        referrerPolicy="no-referrer"
                      />
                    )}
                  </div>
                )}

                {/* Translation results */}
                <div className="space-y-2 p-4 bg-stone-50 dark:bg-stone-800/60 rounded-2xl border border-stone-200/80 dark:border-stone-700/60">
                  <div>
                    <span className="text-[10px] font-extrabold text-stone-400 uppercase tracking-wider">
                      English Meaning
                    </span>
                    <p className="text-sm font-black text-stone-900 dark:text-white capitalize">
                      {wordDef.translation_en}
                    </p>
                  </div>

                  {wordDef.translation_ar && (
                    <div className="pt-2 border-t border-stone-200 dark:border-stone-700">
                      <span className="text-[10px] font-extrabold text-stone-400 uppercase tracking-wider">
                        الترجمة العربية
                      </span>
                      <p className="text-sm font-bold text-amber-700 dark:text-amber-300 font-arabic text-right" dir="rtl">
                        {wordDef.translation_ar}
                      </p>
                    </div>
                  )}
                </div>

                {/* Context Insight */}
                {(wordDef.explanation_en || wordDef.explanation_ar) && (
                  <div className="p-3.5 bg-amber-50/40 dark:bg-amber-950/20 rounded-2xl border border-amber-100/60 dark:border-amber-900/30 space-y-1.5">
                    <span className="text-[9px] font-black uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>AI Context Insight</span>
                    </span>
                    {wordDef.explanation_en && (
                      <p className="text-xs text-stone-600 dark:text-stone-300 leading-normal">
                        {wordDef.explanation_en}
                      </p>
                    )}
                    {wordDef.explanation_ar && (
                      <p className="text-xs text-stone-500 dark:text-stone-400 font-arabic leading-normal text-right" dir="rtl">
                        {wordDef.explanation_ar}
                      </p>
                    )}
                  </div>
                )}

                {/* Interactive status configuration */}
                <div className="space-y-2">
                  <span className="text-[11px] font-extrabold text-stone-400 uppercase tracking-wider">
                    Update Word Status
                  </span>

                  <div className="grid grid-cols-5 gap-1.5">
                    <button
                      onClick={() => handleMarkAsKnown(selectedToken.clean)}
                      className="p-2.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-emerald-500 hover:text-white border border-stone-200 dark:border-stone-700 text-xs font-black text-stone-700 dark:text-stone-300 transition flex flex-col items-center gap-0.5 cursor-pointer"
                    >
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Known</span>
                    </button>

                    {([1, 2, 3, 4] as LingQStatus[]).map(st => (
                      <button
                        key={st}
                        onClick={() => handleSetLingQStatus(selectedToken.clean, st)}
                        className={`p-2.5 rounded-xl border text-xs font-black transition flex flex-col items-center gap-0.5 cursor-pointer ${
                          userProgress.lingqs?.[selectedToken.clean.toLowerCase()]?.status === st
                            ? 'bg-amber-500 text-stone-950 border-amber-500 shadow-sm'
                            : 'bg-stone-100 dark:bg-stone-800 hover:bg-amber-100 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700'
                        }`}
                      >
                        <Bookmark className="w-3.5 h-3.5 text-amber-500" />
                        <span>L{st}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sentence mining */}
                <div className="pt-2 border-t border-stone-200 dark:border-stone-800 space-y-2">
                  <button
                    onClick={handleMineSentence}
                    className="w-full py-3 px-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs flex items-center justify-center gap-2 shadow-md transition transform active:scale-95 cursor-pointer"
                  >
                    <BookmarkPlus className="w-4 h-4" />
                    <span>Mine Sentence to Cloze SRS</span>
                  </button>

                  {minedSuccessMessage && (
                    <div className="p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-950 border border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-200 text-xs font-bold text-center">
                      {minedSuccessMessage}
                    </div>
                  )}
                </div>

                {/* Corpus contexts list */}
                <div className="pt-2 border-t border-stone-200 dark:border-stone-800 space-y-2">
                  <button
                    onClick={() => setShowCorpusExamples(!showCorpusExamples)}
                    className="w-full py-2.5 px-3 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 font-bold text-xs flex items-center justify-between transition cursor-pointer"
                  >
                    <span className="flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-amber-500" />
                      <span>See "{selectedToken.clean}" in {multiContexts.length} Other Contexts</span>
                    </span>
                    <span>{showCorpusExamples ? '▲' : '▼'}</span>
                  </button>

                  {showCorpusExamples && (
                    <div className="space-y-2 max-h-60 overflow-y-auto pr-1 text-xs">
                      {multiContexts.length === 0 ? (
                        <p className="text-stone-400 text-center py-2">No other instances found in active corpus.</p>
                      ) : (
                        multiContexts.map((ctx, idx) => (
                          <div
                            key={idx}
                            className="p-2.5 bg-stone-50 dark:bg-stone-800/80 rounded-xl border border-stone-200 dark:border-stone-700 space-y-1"
                          >
                            <div className="flex items-center justify-between text-[10px] text-stone-400 font-mono">
                              <span>{ctx.source}</span>
                              <button
                                onClick={() => speakSpanish(ctx.es, playbackSpeed)}
                                className="text-amber-500 hover:underline cursor-pointer"
                              >
                                ▶ Listen
                              </button>
                            </div>
                            <p className="font-bold text-stone-900 dark:text-white">
                              {ctx.es}
                            </p>
                            <p className="text-stone-500 dark:text-stone-400 text-[11px]">
                              {ctx.en}
                            </p>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
