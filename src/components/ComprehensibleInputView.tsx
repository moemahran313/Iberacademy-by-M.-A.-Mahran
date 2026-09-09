import React, { useState, useMemo, useEffect } from 'react';
import { VirtualizedList } from './VirtualizedList';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Volume2,
  BookOpen,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  Play,
  Plus,
  Compass,
  Layers,
  FileText,
  Flame,
  Bookmark,
  Zap,
  Filter,
  Search,
  Check,
  TrendingUp,
  Globe,
  UploadCloud,
  X,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { ComprehensibleStory, CEFRLevel, UserProgress, ImportedContent } from '../types';
import { COMPREHENSIBLE_STORIES } from '../data/comprehensibleStories';
import { CURATED_AUTHENTIC_LIBRARY } from '../data/comprehensibleInputLibrary';
import { LingQInteractiveReader } from './LingQInteractiveReader';
import { SentenceMinerSRSView } from './SentenceMinerSRSView';
import { ContentImporterModal } from './ContentImporterModal';
import { RecommendedReadingModule } from './RecommendedReadingModule';
import { ReadingProgressTracker } from './ReadingProgressTracker';
import { SituationalImmersionView } from './SituationalImmersionView';
import { soundEffects } from '../utils/audio';
import { lookupSpanishWord } from '../utils/lingqEngine';
import { useDebounce } from '../hooks/useDebounce';
import { useWindowedList } from '../hooks/useWindowedList';
import { StoriesSkeleton } from './Skeletons';
import { dataCache } from '../utils/dataCache';

interface ComprehensibleInputViewProps {
  userProgress: UserProgress;
  setUserProgress: React.Dispatch<React.SetStateAction<UserProgress>>;
}

export const ComprehensibleInputView: React.FC<ComprehensibleInputViewProps> = ({
  userProgress,
  setUserProgress
}) => {
  const [activeTab, setActiveTab] = useState<'library' | 'situational_immersion' | 'reader' | 'sentence_miner' | 'progress_tracker'>('situational_immersion');
  const [selectedContent, setSelectedContent] = useState<ImportedContent | null>(null);
  const [selectedLevelFilter, setSelectedLevelFilter] = useState<string>('all');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const debouncedSearchQuery = useDebounce(searchQuery, 200);

  const [isLoading, setIsLoading] = useState<boolean>(() => {
    return !dataCache.get('stories_cached_flag');
  });

  useEffect(() => {
    dataCache.set('stories_cached_flag', true);
    if (isLoading) {
      const timer = setTimeout(() => setIsLoading(false), 150);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);
  const [isImporterOpen, setIsImporterOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Progressive Unveiling: track expanded card IDs
  const [expandedStoryIds, setExpandedStoryIds] = useState<Record<string, boolean>>({});

  const toggleStoryExpand = (id: string) => {
    soundEffects.playPop();
    setExpandedStoryIds(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Popover state for instant library card preview definitions
  const [activePopover, setActivePopover] = useState<{
    word: string;
    translation_en: string;
    translation_ar: string;
    pos?: string;
    x: number;
    y: number;
  } | null>(null);

  const handleWordClick = (e: React.MouseEvent, wordStr: string) => {
    e.stopPropagation(); // Stop opening the reader immediately
    const clean = wordStr.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"'¡¿]/g, '').trim();
    if (!clean) return;
    
    const def = lookupSpanishWord(clean);
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    
    setActivePopover({
      word: clean,
      translation_en: def.translation_en,
      translation_ar: def.translation_ar,
      pos: def.partOfSpeech,
      x: rect.left + rect.width / 2,
      y: rect.top,
    });
    
    soundEffects.playPop();
  };

  const renderInteractiveContent = (text: string) => {
    // Split on whitespace to keep space structure intact
    const tokens = text.split(/(\s+)/);
    
    return tokens.map((token, i) => {
      if (/\s+/.test(token)) {
        return <span key={i}>{token}</span>;
      }
      
      // Match leading and trailing Spanish punctuation and pull out the inner core word
      const wordMatch = token.match(/^([¡¿]*)(.*?)([.,\/#!$%\^&\*;:{}=\-_`~()?"'“”—]*)$/);
      if (wordMatch) {
        const leadingPunct = wordMatch[1];
        const coreWord = wordMatch[2];
        const trailingPunct = wordMatch[3];
        
        return (
          <span key={i} className="inline-flex">
            {leadingPunct && <span className="text-stone-400">{leadingPunct}</span>}
            {coreWord ? (
              <span
                onClick={(e) => handleWordClick(e, coreWord)}
                className="cursor-pointer text-stone-700 dark:text-stone-300 hover:text-amber-500 dark:hover:text-amber-400 hover:underline hover:bg-amber-100/30 dark:hover:bg-amber-500/10 px-0.5 rounded-sm transition font-semibold"
              >
                {coreWord}
              </span>
            ) : null}
            {trailingPunct && <span className="text-stone-400">{trailingPunct}</span>}
          </span>
        );
      }
      
      return <span key={i}>{token}</span>;
    });
  };

  // Combine Stories + Curated Library + User Custom Imported Texts into a unified collection
  const allLibraryItems: ImportedContent[] = useMemo(() => {
    // 1. Convert COMPREHENSIBLE_STORIES to ImportedContent format
    const convertedStories: ImportedContent[] = COMPREHENSIBLE_STORIES.map(s => ({
      id: s.id,
      title: s.title_es,
      category: 'Graded Story',
      cefr: s.cefr,
      wordCount: s.wordCount || 120,
      dateAdded: '2026-08-01',
      content: s.paragraphs.map(p => p.es).join('\n\n'),
      translation_en: s.paragraphs.map(p => p.en).join('\n\n'),
      translation_ar: s.paragraphs.map(p => p.ar).join('\n\n')
    }));

    // 2. Curated Authentic Library
    const curated = CURATED_AUTHENTIC_LIBRARY;

    // 3. User Custom Imported Texts
    const custom = userProgress.customImportedTexts || [];

    return [...custom, ...curated, ...convertedStories];
  }, [userProgress.customImportedTexts]);

  // Filter library items based on search, level, and category using debounced query
  const filteredItems = useMemo(() => {
    return allLibraryItems.filter(item => {
      const matchLevel = selectedLevelFilter === 'all' || item.cefr === selectedLevelFilter;
      const matchCat = selectedCategoryFilter === 'all' || item.category.toLowerCase().includes(selectedCategoryFilter.toLowerCase());
      const matchQuery =
        !debouncedSearchQuery.trim() ||
        item.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
        item.content.toLowerCase().includes(debouncedSearchQuery.toLowerCase());

      return matchLevel && matchCat && matchQuery;
    });
  }, [allLibraryItems, selectedLevelFilter, selectedCategoryFilter, debouncedSearchQuery]);

  // Windowed list for smooth story library scrolling
  const { visibleItems: visibleStories, sentinelRef: storySentinelRef } = useWindowedList<ImportedContent>(filteredItems, {
    pageSize: 12,
    resetDeps: [debouncedSearchQuery, selectedLevelFilter, selectedCategoryFilter]
  });

  // Daily words read tracking
  const today = new Date().toISOString().split('T')[0];
  const todayWordsRead = (userProgress.dailyWordsRead || {})[today] || 0;
  const dailyGoal = userProgress.settings.dailyWordsGoal || 500;
  const lifetimeWordsRead = userProgress.totalWordsRead || 0;
  const knownWordsCount = (userProgress.knownWords || []).length + (userProgress.masteredWordIds || []).length;
  const activeLingQsCount = Object.keys(userProgress.lingqs || {}).length;
  const minedCount = (userProgress.minedSentences || []).length;

  const handleOpenReader = (item: ImportedContent) => {
    setSelectedContent(item);
    setActiveTab('reader');
    soundEffects.playPop();
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-16">
      {/* Top Banner - Responsive Mobile-First Spacing */}
      <div className="bg-transparent sm:bg-gradient-to-r sm:from-stone-900 sm:via-stone-800 sm:to-stone-900 sm:border sm:border-stone-800 sm:rounded-3xl p-0 sm:p-8 text-stone-900 dark:text-stone-100 sm:text-white sm:shadow-xl">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 sm:bg-emerald-500/20 sm:text-emerald-300 sm:border-emerald-500/30">
                Krashen Input Method (i+1)
              </span>
              <span className="text-[11px] text-amber-600 dark:text-amber-400 font-bold hidden xs:inline">
                • Interactive Reader & Sentence Miner
              </span>
            </div>

            <h1 className="text-xl sm:text-3xl font-black tracking-tight text-stone-900 dark:text-white sm:text-white">
              Spanish Immersion & Acquisition Engine
            </h1>

            <p className="text-xs text-stone-500 dark:text-stone-400 sm:text-stone-300 max-w-2xl leading-relaxed hidden sm:block">
              True fluency is built through consuming hundreds of thousands of words in rich context—not by answering multiple-choice drill quizzes. Read authentic news, dialogues, and stories with synchronized audio, color-coded vocabulary tracking, and 1-click sentence mining.
            </p>
          </div>

          {/* Action Tabs - Mobile scrollable menu, Desktop structured pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 w-full lg:w-auto -mx-4 px-4 sm:mx-0 sm:px-0">
            <button
              onClick={() => setActiveTab('situational_immersion')}
              className={`px-3 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 transition whitespace-nowrap border shrink-0 cursor-pointer ${
                activeTab === 'situational_immersion'
                  ? 'bg-amber-500 text-stone-950 border-amber-500 shadow-sm'
                  : 'bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-300 border-stone-200 dark:border-stone-800'
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-amber-950" />
              <span>🇲🇽 Situational Roleplay</span>
            </button>

            <button
              onClick={() => setActiveTab('library')}
              className={`px-3 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 transition whitespace-nowrap border shrink-0 cursor-pointer ${
                activeTab === 'library'
                  ? 'bg-amber-500 text-stone-950 border-amber-500 shadow-sm'
                  : 'bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-300 border-stone-200 dark:border-stone-800'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Library</span>
            </button>

            <button
              onClick={() => setActiveTab('progress_tracker')}
              className={`px-3 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 transition whitespace-nowrap border shrink-0 cursor-pointer ${
                activeTab === 'progress_tracker'
                  ? 'bg-amber-500 text-stone-950 border-amber-500 shadow-sm'
                  : 'bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-300 border-stone-200 dark:border-stone-800'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
              <span>Analytics</span>
            </button>

            <button
              onClick={() => setActiveTab('sentence_miner')}
              className={`px-3 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 transition whitespace-nowrap border shrink-0 cursor-pointer ${
                activeTab === 'sentence_miner'
                  ? 'bg-amber-500 text-stone-950 border-amber-500 shadow-sm'
                  : 'bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-300 border-stone-200 dark:border-stone-800'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5 text-amber-500" />
              <span>Cloze Miner ({minedCount})</span>
            </button>

            <button
              onClick={() => setIsImporterOpen(true)}
              className="px-3 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500 text-amber-700 dark:text-amber-400 hover:text-stone-950 font-black text-xs flex items-center gap-1.5 border border-amber-500/20 dark:border-amber-500/30 transition shrink-0 cursor-pointer"
            >
              <UploadCloud className="w-3.5 h-3.5" />
              <span>Import</span>
            </button>
          </div>
        </div>

        {/* Krashen Reading Volume Metrics Dashboard */}
        <div className="mt-6 pt-4 border-t border-stone-200 dark:border-stone-800 sm:border-stone-800/80 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-stone-50 dark:bg-stone-900 sm:bg-stone-800/60 border border-stone-200 dark:border-stone-800 sm:border-stone-700/60 rounded-2xl p-3.5 space-y-1">
            <span className="text-[10px] font-black uppercase text-stone-500 dark:text-stone-400 sm:text-stone-400">
              Lifetime Words
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-lg sm:text-xl font-black text-amber-600 dark:text-amber-400">
                {lifetimeWordsRead.toLocaleString()}
              </span>
              <span className="text-[10px] text-stone-400 font-mono">/ 10k</span>
            </div>
            <div className="w-full bg-stone-200 dark:bg-stone-800 sm:bg-stone-700 h-1 rounded-full overflow-hidden">
              <div
                className="bg-amber-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (lifetimeWordsRead / 10000) * 100)}%` }}
              />
            </div>
          </div>

          <div className="bg-stone-50 dark:bg-stone-900 sm:bg-stone-800/60 border border-stone-200 dark:border-stone-800 sm:border-stone-700/60 rounded-2xl p-3.5 space-y-1">
            <span className="text-[10px] font-black uppercase text-stone-500 dark:text-stone-400 sm:text-stone-400">
              Today's Goal
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-lg sm:text-xl font-black text-emerald-600 dark:text-emerald-400">
                {todayWordsRead}
              </span>
              <span className="text-[10px] text-stone-400 font-mono">/{dailyGoal}</span>
            </div>
            <div className="w-full bg-stone-200 dark:bg-stone-800 sm:bg-stone-700 h-1 rounded-full overflow-hidden">
              <div
                className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, (todayWordsRead / dailyGoal) * 100)}%` }}
              />
            </div>
          </div>

          <div className="bg-stone-50 dark:bg-stone-900 sm:bg-stone-800/60 border border-stone-200 dark:border-stone-800 sm:border-stone-700/60 rounded-2xl p-3.5 space-y-1">
            <span className="text-[10px] font-black uppercase text-stone-500 dark:text-stone-400 sm:text-stone-400">
              Known Words
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-lg sm:text-xl font-black text-sky-600 dark:text-sky-400">
                {knownWordsCount}
              </span>
              <span className="text-[10px] text-stone-400 font-mono">mastered</span>
            </div>
            <p className="text-[9px] text-stone-400 dark:text-stone-500 sm:text-stone-400 leading-none">Zero lookup fatigue</p>
          </div>

          <div className="bg-stone-50 dark:bg-stone-900 sm:bg-stone-800/60 border border-stone-200 dark:border-stone-800 sm:border-stone-700/60 rounded-2xl p-3.5 space-y-1">
            <span className="text-[10px] font-black uppercase text-stone-500 dark:text-stone-400 sm:text-stone-400">
              Active LingQs
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-lg sm:text-xl font-black text-amber-600 dark:text-amber-500 sm:text-amber-500">
                {activeLingQsCount}
              </span>
              <span className="text-[10px] text-stone-400 font-mono">review</span>
            </div>
            <p className="text-[9px] text-stone-400 dark:text-stone-500 sm:text-stone-400 leading-none">Learning vocabulary</p>
          </div>
        </div>
      </div>

      {/* RENDER VIEW ACCORDING TO ACTIVE TAB */}
      {activeTab === 'situational_immersion' ? (
        <SituationalImmersionView />
      ) : activeTab === 'reader' && selectedContent ? (
        <LingQInteractiveReader
          content={selectedContent}
          onBack={() => setActiveTab('library')}
          userProgress={userProgress}
          setUserProgress={setUserProgress}
        />
      ) : activeTab === 'progress_tracker' ? (
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('library')}
              className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold transition cursor-pointer"
            >
              ← Back to Reading Library
            </button>
          </div>

          <ReadingProgressTracker userProgress={userProgress} />
        </div>
      ) : activeTab === 'sentence_miner' ? (
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('library')}
              className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold transition cursor-pointer"
            >
              ← Back to Reading Library
            </button>
          </div>

          <SentenceMinerSRSView
            userProgress={userProgress}
            setUserProgress={setUserProgress}
          />
        </div>
      ) : (
        /* LIBRARY OF AUTHENTIC CONTENT */
        <div className="space-y-8">
          {/* Krashen Learner-Driven Recommended Reading Module */}
          <RecommendedReadingModule
            userProgress={userProgress}
            setUserProgress={setUserProgress}
            onOpenStory={handleOpenReader}
          />

          {/* Filter & Search Bar */}
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-4 sm:p-5 shadow-sm space-y-4">
            <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search articles, stories, news, or topics..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-xs font-bold text-stone-900 dark:text-white focus:ring-2 focus:ring-amber-500"
                />
              </div>

              {/* CEFR Level Filters */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
                {['all', 'A1', 'A2', 'B1', 'B2'].map(lvl => (
                  <button
                    key={lvl}
                    onClick={() => setSelectedLevelFilter(lvl)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition uppercase whitespace-nowrap ${
                      selectedLevelFilter === lvl
                        ? 'bg-amber-500 text-stone-950 font-black shadow-xs'
                        : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200'
                    }`}
                  >
                    {lvl === 'all' ? 'All Levels' : lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
              <span className="text-stone-400 text-[11px] font-bold shrink-0">Categories:</span>
              {[
                { id: 'all', label: 'All Content' },
                { id: 'news', label: '📰 News & Current Affairs' },
                { id: 'dialogue', label: '💬 Real-World Dialogues' },
                { id: 'culture', label: '🏛️ History & Culture' },
                { id: 'story', label: '📚 Graded Fiction & Mystery' },
                { id: 'custom', label: '📥 My Custom Imports' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategoryFilter(cat.id)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                    selectedCategoryFilter === cat.id
                      ? 'bg-stone-800 text-amber-400 dark:bg-stone-700'
                      : 'bg-stone-50 dark:bg-stone-800/60 text-stone-500 dark:text-stone-400 hover:text-stone-900'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Progressive Unveiling Stories & Articles */}
          {isLoading ? (
            <StoriesSkeleton />
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-16 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-8 space-y-3">
              <BookOpen className="w-10 h-10 text-stone-300 dark:text-stone-700 mx-auto" />
              <h3 className="text-base font-bold text-stone-700 dark:text-stone-300">
                No articles or stories found matching your filter
              </h3>
              <p className="text-xs text-stone-400">
                Try selecting "All Levels" or clearing your search keywords.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {visibleStories.map(item => {
                  const isExpanded = !!expandedStoryIds[item.id];
                  const readTime = Math.max(1, Math.ceil((item.wordCount || 100) / 90));

                  // Extract 1-sentence high-level summary hook
                  const rawSummary = item.translation_en || item.content;
                  const firstSentence = rawSummary.split(/\.\s+/)[0];
                  const synopsisHook = firstSentence ? `${firstSentence.trim()}.` : item.title;

                  // Extract 4 key vocabulary words
                  const contentWords = item.content
                    .split(/\s+/)
                    .map(w => w.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?"'¡¿]/g, '').trim())
                    .filter(w => w.length >= 5 && !/^(sobre|donde|cuando|porque|tambien|despues|entonces|algunos|siempre)$/i.test(w));
                  const uniqueKeyWords = Array.from(new Set(contentWords)).slice(0, 4);

                  return (
                    <div
                      key={item.id}
                      className={`bg-white dark:bg-stone-900 border transition-all duration-300 rounded-3xl p-5 shadow-xs flex flex-col justify-between ${
                        isExpanded
                          ? 'border-amber-500/80 ring-2 ring-amber-400/20 shadow-md md:col-span-2'
                          : 'border-stone-200 dark:border-stone-800 hover:border-amber-500/40 hover:shadow-sm'
                      }`}
                    >
                      <div className="space-y-3">
                        {/* Tier 1 Header Metadata */}
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <div className="flex items-center gap-2">
                            <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-amber-500 text-stone-950">
                              {item.cefr}
                            </span>
                            <span className="text-[11px] font-bold text-stone-400 capitalize">
                              {item.category}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-[11px] font-bold text-stone-400 font-mono">
                            <span>{item.wordCount} words</span>
                            <span>•</span>
                            <span>~{readTime} min read</span>
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="text-base font-black text-stone-900 dark:text-stone-100 leading-snug">
                          {item.title}
                        </h3>

                        {/* Plain Language 1-Sentence High-Level Summary */}
                        <div className="p-3 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-100 dark:border-stone-800 text-xs text-stone-600 dark:text-stone-300 space-y-1">
                          <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-amber-600 dark:text-amber-400">
                            <Sparkles className="w-3 h-3 text-amber-500" />
                            <span>High-Level Synopsis:</span>
                          </div>
                          <p className="leading-relaxed">{synopsisHook}</p>
                        </div>

                        {/* Tier 2: Progressive Unveiling Section (Expanded on user interaction) */}
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="pt-2 border-t border-stone-100 dark:border-stone-800 space-y-4 overflow-hidden"
                            >
                              {/* Key Target Vocabulary Chips */}
                              {uniqueKeyWords.length > 0 && (
                                <div className="space-y-1.5">
                                  <span className="text-[10px] font-black uppercase tracking-wider text-stone-400">
                                    Target Lexical Anchors:
                                  </span>
                                  <div className="flex flex-wrap gap-1.5">
                                    {uniqueKeyWords.map((word, wIdx) => {
                                      const lookup = lookupSpanishWord(word);
                                      return (
                                        <div
                                          key={wIdx}
                                          onClick={(e) => handleWordClick(e, word)}
                                          className="px-2.5 py-1 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-900/60 text-xs font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1.5 cursor-pointer hover:scale-102 transition"
                                          title="Click for instant definition"
                                        >
                                          <span>{word}</span>
                                          {lookup && lookup.translation_en && (
                                            <span className="text-[10px] font-normal text-amber-700/80 dark:text-amber-400">
                                              ({lookup.translation_en})
                                            </span>
                                          )}
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}

                              {/* Bilingual Full Synopsis */}
                              {item.translation_en && (
                                <div className="space-y-1 text-xs text-stone-600 dark:text-stone-300">
                                  <span className="text-[10px] font-black uppercase tracking-wider text-stone-400">
                                    Story Context & Breakdown:
                                  </span>
                                  <p className="p-3 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-100 dark:border-stone-800 leading-relaxed">
                                    🇬🇧 {item.translation_en.slice(0, 240)}
                                    {item.translation_en.length > 240 ? '...' : ''}
                                  </p>
                                  {item.translation_ar && (
                                    <p
                                      className="p-3 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-100 dark:border-stone-800 font-arabic text-right leading-relaxed"
                                      dir="rtl"
                                    >
                                      🇦🇪 {item.translation_ar.slice(0, 240)}
                                      {item.translation_ar.length > 240 ? '...' : ''}
                                    </p>
                                  )}
                                </div>
                              )}

                              {/* Interactive Passage Preview with Click-to-Translate Tokens */}
                              <div className="space-y-1">
                                <span className="text-[10px] font-black uppercase tracking-wider text-stone-400">
                                  Passage Preview (Tap any word for live translation):
                                </span>
                                <div className="p-3.5 rounded-2xl bg-amber-500/5 dark:bg-stone-800/60 border border-amber-500/20 text-xs sm:text-sm leading-relaxed text-stone-800 dark:text-stone-200 max-h-36 overflow-y-auto">
                                  {renderInteractiveContent(item.content.slice(0, 320))}...
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Footer Actions: Progressive Disclosure Toggle & Full Reader Launcher */}
                      <div className="pt-3 mt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between gap-2 flex-wrap">
                        <button
                          onClick={() => toggleStoryExpand(item.id)}
                          className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1 cursor-pointer py-1.5 px-2 rounded-lg hover:bg-amber-50 dark:hover:bg-stone-800 transition"
                        >
                          <span>
                            {isExpanded ? 'Collapse Overview' : 'Progressive Breakdown & Lexis'}
                          </span>
                          {isExpanded ? (
                            <ChevronUp className="w-3.5 h-3.5" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5" />
                          )}
                        </button>

                        <button
                          onClick={() => handleOpenReader(item)}
                          className="px-4 py-2 rounded-xl bg-stone-900 dark:bg-amber-500 text-white dark:text-stone-950 hover:bg-amber-500 hover:text-stone-950 font-black text-xs flex items-center gap-1.5 transition cursor-pointer shadow-2xs ml-auto"
                        >
                          <span>Interactive Reader</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Sentinel ref for infinite scroll loading */}
              <div ref={storySentinelRef} className="h-4 w-full" />
            </div>
          )}
        </div>
      )}

      {/* Content Importer Modal */}
      {isImporterOpen && (
        <ContentImporterModal
          onClose={() => setIsImporterOpen(false)}
          onImportSuccess={newContent => {
            setIsImporterOpen(false);
            setSelectedContent(newContent);
            setActiveTab('reader');
          }}
          userProgress={userProgress}
          setUserProgress={setUserProgress}
        />
      )}

      {/* Floating Interactive Word Dictionary Popover / Mobile Slide-up Bottom Sheet */}
      <AnimatePresence>
        {activePopover && (
          <>
            {isMobile ? (
              <>
                {/* Backdrop Overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setActivePopover(null)}
                  className="fixed inset-0 bg-black z-50 cursor-default"
                />

                {/* Slide-up Bottom Sheet */}
                <motion.div
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '100%' }}
                  transition={{ type: 'spring', damping: 26, stiffness: 210 }}
                  className="fixed bottom-0 left-0 right-0 bg-white dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800 rounded-t-3xl shadow-2xl z-50 flex flex-col max-h-[85vh] outline-none p-6 space-y-4 font-sans text-stone-900 dark:text-stone-100"
                >
                  {/* Handle & Header */}
                  <div className="relative pb-2 border-b border-stone-150 dark:border-stone-800 flex items-center justify-between">
                    <div className="w-12 h-1 bg-stone-300 dark:bg-stone-700 rounded-full absolute top-[-12px] left-1/2 -translate-x-1/2" />
                    
                    <span className="font-extrabold text-base text-amber-600 dark:text-amber-400 capitalize">
                      {activePopover.word}
                    </span>

                    {activePopover.pos && (
                      <span className="text-[10px] bg-stone-100 dark:bg-stone-800 px-2 py-0.5 rounded text-stone-500 font-mono font-bold">
                        {activePopover.pos}
                      </span>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="space-y-4 py-2">
                    <div className="space-y-1">
                      <span className="text-[10px] font-black uppercase text-stone-400 tracking-wider">🇬🇧 English Translation</span>
                      <p className="text-base font-black text-stone-900 dark:text-white capitalize leading-relaxed">
                        {activePopover.translation_en}
                      </p>
                    </div>

                    <div className="space-y-1 pt-3 border-t border-stone-100 dark:border-stone-800">
                      <span className="text-[10px] font-black uppercase text-stone-400 tracking-wider">🇦🇪 الترجمة العربية</span>
                      <p className="text-base font-bold text-amber-700 dark:text-amber-300 font-arabic text-right leading-relaxed" dir="rtl">
                        {activePopover.translation_ar}
                      </p>
                    </div>
                  </div>

                  {/* Footer Action */}
                  <button
                    onClick={() => {
                      soundEffects.playPop();
                      setActivePopover(null);
                    }}
                    className="w-full py-3 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-950 text-xs font-black hover:opacity-90 transition text-center"
                  >
                    Close
                  </button>
                </motion.div>
              </>
            ) : (
              <>
                {/* Desktop Popover */}
                <div 
                  className="fixed inset-0 z-40 bg-transparent cursor-default" 
                  onClick={() => setActivePopover(null)}
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                  transition={{ duration: 0.15 }}
                  className="fixed z-50 bg-stone-900 dark:bg-stone-800 text-stone-100 p-4 rounded-2xl shadow-xl border border-stone-800 dark:border-stone-700 max-w-xs text-xs space-y-2 pointer-events-auto"
                  style={{
                    left: `${activePopover.x}px`,
                    top: `${activePopover.y}px`,
                    transform: 'translate(-50%, -100%) translateY(-8px)',
                  }}
                >
                  <div className="flex items-center justify-between gap-4 border-b border-stone-800 dark:border-stone-700 pb-1.5">
                    <span className="font-extrabold text-amber-400 capitalize">{activePopover.word}</span>
                    {activePopover.pos && (
                      <span className="text-[10px] bg-stone-800 dark:bg-stone-700 px-1.5 py-0.5 rounded text-stone-300 font-mono">
                        {activePopover.pos}
                      </span>
                    )}
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-start gap-1.5">
                      <span className="text-stone-400 font-extrabold select-none">EN:</span>
                      <span className="font-semibold text-stone-200">{activePopover.translation_en}</span>
                    </div>
                    <div className="flex items-start gap-1.5 justify-between">
                      <span className="text-stone-400 font-extrabold select-none">AR:</span>
                      <span className="font-semibold text-stone-200 text-right dir-rtl font-arabic flex-1 pl-2">{activePopover.translation_ar}</span>
                    </div>
                  </div>
                  <div className="pt-1 flex justify-end">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActivePopover(null);
                      }}
                      className="text-[10px] text-stone-400 hover:text-white font-bold underline cursor-pointer"
                    >
                      Dismiss
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
