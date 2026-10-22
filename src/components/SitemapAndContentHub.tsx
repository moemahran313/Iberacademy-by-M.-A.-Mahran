import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Compass,
  Sparkles,
  BookOpen,
  GraduationCap,
  TrendingUp,
  MessageSquare,
  Mic,
  Video,
  Layers,
  Target,
  User as UserIcon,
  Search,
  CheckCircle2,
  Volume2,
  Clock,
  FileText,
  ChevronRight,
  ChevronDown,
  ArrowRight,
  Zap,
  Globe,
  Award,
  Brain,
  Eye,
  Sliders,
  Play,
  RotateCcw,
  Lightbulb,
  AlertTriangle,
  Bookmark,
  Share2,
  Check,
  Flame,
  LayoutGrid,
  ListTree,
  ExternalLink,
  HelpCircle
} from 'lucide-react';
import { soundEffects, speakSpanish, speakSpanishPersona } from '../utils/audio';
import { UserProgress } from '../types';

interface SitemapAndContentHubProps {
  userProgress: UserProgress;
  setUserProgress: React.Dispatch<React.SetStateAction<UserProgress>>;
  onNavigateTab: (tabId: string) => void;
}

export const SitemapAndContentHub: React.FC<SitemapAndContentHubProps> = ({
  userProgress,
  setUserProgress,
  onNavigateTab
}) => {
  const [activeViewMode, setActiveViewMode] = useState<'guides' | 'sitemap'>('guides');
  const [activeGuideId, setActiveGuideId] = useState<string>('krashen-immersion');
  const [searchQuery, setSearchQuery] = useState('');
  const [readingProgress, setReadingProgress] = useState(0);
  const [activeSectionAnchor, setActiveSectionAnchor] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [selectedDialectZone, setSelectedDialectZone] = useState<'mexico' | 'rioplatense' | 'spain' | 'caribbean'>('mexico');
  const [interactiveClozeAnswer, setInteractiveClozeAnswer] = useState<string | null>(null);
  const [isArabicText, setIsArabicText] = useState(userProgress.settings.nativeLanguage === 'ar' || userProgress.settings.nativeLanguage === 'bilingual');

  const contentContainerRef = useRef<HTMLDivElement>(null);

  // Sync scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const el = contentContainerRef.current;
      if (!el) return;
      const totalHeight = el.scrollHeight - el.clientHeight;
      if (totalHeight > 0) {
        const currentProgress = (el.scrollTop / totalHeight) * 100;
        setReadingProgress(Math.min(100, Math.max(0, currentProgress)));
      }

      // Check active heading in view
      const headings = el.querySelectorAll('h2[id], h3[id]');
      let currentAnchor = '';
      headings.forEach((heading) => {
        const rect = heading.getBoundingClientRect();
        if (rect.top <= 260) {
          currentAnchor = heading.id;
        }
      });
      if (currentAnchor) {
        setActiveSectionAnchor(currentAnchor);
      }
    };

    const container = contentContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true });
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [activeGuideId]);

  const scrollToAnchor = (anchorId: string) => {
    soundEffects.playPop();
    const target = document.getElementById(anchorId);
    if (target && contentContainerRef.current) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Sitemap structure
  const sitemapData = [
    {
      id: '1.0',
      title: '1.0 Home & Personalized Learning Dashboard',
      tab: 'dashboard',
      desc: 'Central control room: daily immersion quota, active streaks, and recent story progress.',
      children: [
        { id: '1.1', title: '1.1 Daily Immersion Routine & Streak Hub', tab: 'dashboard', desc: 'Track reading words, listening minutes, and retention milestones.' },
        { id: '1.2', title: '1.2 Placement Diagnostic & CEFR Level Calibration', tab: 'path', desc: 'Real-time adaptive testing across syntax, listening, and vocabulary.' },
        { id: '1.3', title: '1.3 Quick Resume Queue', tab: 'stories', desc: 'One-click return to active reading chronicles and due SRS flashcards.' }
      ]
    },
    {
      id: '2.0',
      title: '2.0 Comprehensible Input & Graded Reader Library',
      tab: 'stories',
      desc: 'Scientifically calibrated stories from A0 to B2 with zero-lookup instant dictionary & speech.',
      children: [
        { id: '2.1', title: '2.1 Absolute Beginner (A0–A1): Everyday Micro-Stories', tab: 'a0_foundation', desc: 'Visual cognates, present tense survival dialogues, and foundational phrases.' },
        { id: '2.2', title: '2.2 Lower Intermediate (A2): Situational Chronicles', tab: 'stories', desc: 'Travel narratives, past tense dualism (Pretérito vs Imperfecto), and idioms.' },
        { id: '2.3', title: '2.3 Intermediate (B1): Cultural Legends & Short Essays', tab: 'stories', desc: 'Subjunctive mood immersion, historical perspectives, and complex syntax.' },
        { id: '2.4', title: '2.4 Upper Intermediate (B2): Journalism & Literature', tab: 'stories', desc: 'Native newspaper articles, advanced opinion essays, and regional expressions.' },
        { id: '2.5', title: '2.5 Video Immersion Player', tab: 'videos', desc: 'Synchronized native video clips with dual-language subtitles.' }
      ]
    },
    {
      id: '3.0',
      title: '3.0 Lexical Engine & Spaced Repetition (SRS)',
      tab: 'vocabulary',
      desc: 'FSRS / SM-2 spaced repetition memory engine with sentence mining and word lifecycle tracking.',
      children: [
        { id: '3.1', title: '3.1 Smart Spaced Repetition Card Deck', tab: 'vocabulary', desc: 'Automated retrieval intervals, audio prompts, and cloze testing.' },
        { id: '3.2', title: '3.2 Visual Frequency Dictionary (Top 5,000 Lemmas)', tab: 'vocabulary', desc: 'Word frequencies, IPA phonetics, and contextual sentence examples.' },
        { id: '3.3', title: '3.3 Collocations & Idiomatic Lexicon Engine', tab: 'vocabulary', desc: 'Multi-word chunks, phrasal verbs, and regional slang mappings.' }
      ]
    },
    {
      id: '4.0',
      title: '4.0 Grammar Encyclopedia & Verb Matrix',
      tab: 'grammar',
      desc: 'Implicit and explicit Second Language Acquisition (SLA) grammar blueprints and conjugation engines.',
      children: [
        { id: '4.1', title: '4.1 Visual Verb Conjugator (All 14 Tenses & Subjunctive)', tab: 'verbs', desc: 'Irregular highlight matrices, imperative forms, and contextual sample sentences.' },
        { id: '4.2', title: '4.2 Contrastive Grammar Hub (Por vs. Para, Ser vs. Estar)', tab: 'grammar', desc: 'Diagnostic comparison cards, visual decision trees, and interactive quizzes.' },
        { id: '4.3', title: '4.3 Syntax & Sentence Building Workshop', tab: 'workshop', desc: 'Pronoun placement, reflexives, and complex sentence transformation.' }
      ]
    },
    {
      id: '5.0',
      title: '5.0 Dialectology & Regional Immersion',
      tab: 'stories',
      desc: 'Deep exploration of Mexican, Rioplatense, Peninsular, and Caribbean pronunciation & slang.',
      children: [
        { id: '5.1', title: '5.1 Mexican & Central American Spanish', tab: 'tutor', desc: 'Clear consonants, Nahuatl loanwords, and colloquial expressions.' },
        { id: '5.2', title: '5.2 Rioplatense Spanish (Argentina & Uruguay)', tab: 'tutor', desc: 'Voseo conjugation, Yeísmo Rehilado sound, and Lunfardo slang.' },
        { id: '5.3', title: '5.3 Peninsular / Castilian Spanish (Spain)', tab: 'tutor', desc: 'Distinción (c/z as /θ/), Vosotros verb forms, and Euro-Spanish lexicon.' },
        { id: '5.4', title: '5.4 Caribbean Spanish (Cuba, PR, DR, Colombia)', tab: 'tutor', desc: 'S-aspiration, melodic cadence, and rapid conversational rhythm.' }
      ]
    },
    {
      id: '6.0',
      title: '6.0 Interactive Practice & Conversational AI Lab',
      tab: 'tutor',
      desc: 'Low-stakes speaking sandboxes with AI native partners, voice synthesis, and shadowing.',
      children: [
        { id: '6.1', title: '6.1 Situational Roleplay Engine', tab: 'linglooper', desc: 'Café orders, hotel check-ins, job interviews, and market negotiations.' },
        { id: '6.2', title: '6.2 Voice-Enabled AI Tutors (Juan, Sofía, Camila)', tab: 'tutor', desc: 'Real-time speech dialogue with non-disruptive grammar recast feedback.' },
        { id: '6.3', title: '6.3 Oral Shadowing Studio', tab: 'shadowing', desc: '3-stage native speech pacing and pronunciation refinement drills.' }
      ]
    },
    {
      id: '7.0',
      title: '7.0 Progress Analytics, Community & Profile',
      tab: 'profile',
      desc: 'CEFR mastery breakdown, vocabulary retention heatmaps, and cloud sync.',
      children: [
        { id: '7.1', title: '7.1 CEFR Mastery Matrix & Word Bank Stats', tab: 'profile', desc: 'Visual distribution of Known, Familiar, and Learning words.' },
        { id: '7.2', title: '7.2 Curriculum Planner & Diagnostics', tab: 'planner', desc: 'Personalized milestone calendar and targeted study schedules.' },
        { id: '7.3', title: '7.3 Cloud Account & Native Language Sync', tab: 'profile', desc: 'Persistent Firestore sync, dark/light theme, and bilingual modes.' }
      ]
    }
  ];

  // Filtered sitemap
  const filteredSitemap = useMemo(() => {
    if (!searchQuery.trim()) return sitemapData;
    const q = searchQuery.toLowerCase();
    return sitemapData
      .map(section => {
        const matchesSection = section.title.toLowerCase().includes(q) || section.desc.toLowerCase().includes(q);
        const matchedChildren = section.children.filter(c => c.title.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q));
        if (matchesSection || matchedChildren.length > 0) {
          return {
            ...section,
            children: matchedChildren.length > 0 ? matchedChildren : section.children
          };
        }
        return null;
      })
      .filter(Boolean) as typeof sitemapData;
  }, [searchQuery]);

  const guidesList = [
    {
      id: 'krashen-immersion',
      title: 'The Comprehensible Input & Natural Acquisition Foundation',
      shortTitle: '1. Comprehensible Input',
      badge: 'SLA Science',
      words: '~1,050 words',
      readTime: '5 min read',
      targetTab: 'stories',
      actionLabel: 'Launch Krashen Reader',
      icon: Sparkles
    },
    {
      id: 'cefr-roadmap',
      title: 'Progressive CEFR Roadmap & Fluency Framework',
      shortTitle: '2. CEFR Roadmap',
      badge: 'Curriculum',
      words: '~1,020 words',
      readTime: '5 min read',
      targetTab: 'path',
      actionLabel: 'Open CEFR Roadmap',
      icon: Layers
    },
    {
      id: 'srs-mechanics',
      title: 'The Lexical Engine & Spaced-Repetition Mechanics',
      shortTitle: '3. Memory & SRS Engine',
      badge: 'Cognitive Science',
      words: '~1,040 words',
      readTime: '5 min read',
      targetTab: 'vocabulary',
      actionLabel: 'Open SRS Deck',
      icon: BookOpen
    },
    {
      id: 'dialectology-immersion',
      title: 'Dialectology, Sociolinguistics & Regional Immersion',
      shortTitle: '4. Dialectology & Culture',
      badge: 'Linguistics',
      words: '~1,010 words',
      readTime: '5 min read',
      targetTab: 'stories',
      actionLabel: 'Explore Regional Stories',
      icon: Globe
    },
    {
      id: 'ai-roleplay-tutoring',
      title: 'Real-Time Interactive Roleplay & AI Tutoring Systems',
      shortTitle: '5. AI Tutoring Lab',
      badge: 'AI Immersion',
      words: '~1,030 words',
      readTime: '5 min read',
      targetTab: 'tutor',
      actionLabel: 'Practice with AI Juan',
      icon: MessageSquare
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 animate-fadeIn text-stone-900 dark:text-stone-100">
      {/* Top Banner & Mode Switcher */}
      <div className="bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-transparent border border-amber-500/20 dark:border-amber-400/20 rounded-3xl p-6 sm:p-8 shadow-sm backdrop-blur-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs font-bold font-mono uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5" />
              <span>Platform Blueprint & Comprehensive Immersion Guides</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black font-header tracking-tight text-stone-950 dark:text-white">
              Sitemap & Educational Knowledge Hub
            </h1>
            <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed">
              Explore our structured sitemap architecture and deep-dive 1,000-word guides explaining the Second Language Acquisition science, memory algorithms, dialect matrices, and immersion protocols that power Iberio.
            </p>
          </div>

          {/* Quick View Mode Toggle */}
          <div className="flex items-center gap-2 bg-stone-100 dark:bg-stone-900/90 p-1.5 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-inner shrink-0 self-start md:self-center">
            <button
              onClick={() => {
                soundEffects.playPop();
                setActiveViewMode('guides');
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black transition cursor-pointer ${
                activeViewMode === 'guides'
                  ? 'bg-amber-500 text-stone-950 shadow-sm'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>In-Depth Guides (5k Words)</span>
            </button>
            <button
              onClick={() => {
                soundEffects.playPop();
                setActiveViewMode('sitemap');
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black transition cursor-pointer ${
                activeViewMode === 'sitemap'
                  ? 'bg-amber-500 text-stone-950 shadow-sm'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              <ListTree className="w-4 h-4" />
              <span>Visual Sitemap Tree</span>
            </button>
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="mt-6 pt-5 border-t border-amber-500/15 flex flex-col sm:flex-row items-center gap-3">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search across all sitemap nodes, lessons, topics, grammar rules, and guides..."
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-white dark:bg-stone-900/80 border border-stone-200 dark:border-stone-700/80 rounded-xl text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs text-stone-500 hover:text-stone-900 dark:hover:text-white px-3 py-2 shrink-0 cursor-pointer font-bold"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* =========================================================================
          VIEW MODE 1: VISUAL SITEMAP EXPLORER
         ========================================================================= */}
      {activeViewMode === 'sitemap' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ListTree className="w-5 h-5 text-amber-500" />
              <h2 className="text-xl font-black text-stone-900 dark:text-white">
                Platform Sitemap & Information Architecture
              </h2>
            </div>
            <span className="text-xs text-stone-500 font-mono">
              {filteredSitemap.length} Core Modules • 24 Endpoints
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredSitemap.map((node) => (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-stone-900/80 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 shadow-sm hover:border-amber-500/40 transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-[10px] font-mono font-black text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                        {node.id}
                      </span>
                      <h3 className="text-base font-black text-stone-900 dark:text-white leading-snug">
                        {node.title.replace(/^[0-9.]+\s*/, '')}
                      </h3>
                    </div>
                    <button
                      onClick={() => onNavigateTab(node.tab)}
                      className="p-2 rounded-xl bg-amber-500/10 hover:bg-amber-500 text-amber-700 dark:text-amber-400 hover:text-stone-950 transition cursor-pointer shrink-0"
                      title="Jump directly to this module in Iberio"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed">
                    {node.desc}
                  </p>
                </div>

                {/* Sub-branches */}
                <div className="pt-3 border-t border-stone-100 dark:border-stone-800/80 space-y-2">
                  <span className="text-[9px] font-bold font-mono text-stone-400 uppercase tracking-wider block">
                    Direct Sub-Modules & Learning Objectives
                  </span>
                  <div className="space-y-1.5">
                    {node.children.map((child) => (
                      <button
                        key={child.id}
                        onClick={() => onNavigateTab(child.tab)}
                        className="w-full p-2 rounded-xl bg-stone-50 dark:bg-stone-800/40 hover:bg-amber-50 dark:hover:bg-amber-950/30 border border-stone-100 dark:border-stone-800 text-left transition flex items-center justify-between group cursor-pointer"
                      >
                        <div className="space-y-0.5 pr-2">
                          <span className="text-xs font-bold text-stone-800 dark:text-stone-200 group-hover:text-amber-600 dark:group-hover:text-amber-400 block">
                            {child.title}
                          </span>
                          <span className="text-[10px] text-stone-500 line-clamp-1">
                            {child.desc}
                          </span>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-amber-500 group-hover:translate-x-0.5 transition shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW MODE 2: 5 COMPREHENSIVE 1,000-WORD GUIDES
         ========================================================================= */}
      {activeViewMode === 'guides' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Sticky Table of Contents & Guide Switcher */}
          <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-20">
            {/* Guide Selector Cards */}
            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-4 shadow-sm space-y-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-stone-400 font-mono px-2 block">
                5 Knowledge Pillars (~5,000 Words)
              </span>
              <div className="space-y-1.5">
                {guidesList.map((guide) => {
                  const Icon = guide.icon;
                  const isSelected = activeGuideId === guide.id;
                  return (
                    <button
                      key={guide.id}
                      onClick={() => {
                        soundEffects.playPop();
                        setActiveGuideId(guide.id);
                        if (contentContainerRef.current) {
                          contentContainerRef.current.scrollTop = 0;
                        }
                      }}
                      className={`w-full p-3 rounded-2xl text-left transition flex items-center gap-3 cursor-pointer ${
                        isSelected
                          ? 'bg-amber-500 text-stone-950 font-black shadow-sm'
                          : 'bg-stone-50 dark:bg-stone-800/40 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300'
                      }`}
                    >
                      <div className={`p-2 rounded-xl shrink-0 ${isSelected ? 'bg-stone-950 text-amber-400' : 'bg-stone-200 dark:bg-stone-700 text-stone-600 dark:text-stone-300'}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-xs font-black truncate">
                            {guide.shortTitle}
                          </span>
                          <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-stone-950/20 text-stone-950' : 'bg-stone-200 dark:bg-stone-700 text-stone-500'}`}>
                            {guide.words}
                          </span>
                        </div>
                        <span className={`text-[10px] block truncate ${isSelected ? 'text-stone-900 font-bold' : 'text-stone-400'}`}>
                          {guide.badge} • {guide.readTime}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* In-Guide Anchors */}
            <div className="hidden lg:block bg-stone-50 dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800/80 rounded-3xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-600 dark:text-amber-400 font-mono">
                  Guide Sections
                </span>
                <span className="text-[10px] font-mono text-stone-400">
                  {Math.round(readingProgress)}% read
                </span>
              </div>
              
              {/* Progress bar */}
              <div className="w-full h-1.5 bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-amber-500"
                  style={{ width: `${readingProgress}%` }}
                />
              </div>

              {/* Anchor Links for Active Guide */}
              <div className="space-y-1.5 text-xs text-stone-600 dark:text-stone-400">
                {activeGuideId === 'krashen-immersion' && (
                  <>
                    <button onClick={() => scrollToAnchor('krashen-1')} className="block w-full text-left hover:text-amber-500 transition py-0.5 truncate">1. The Krashen i+1 Hypothesis</button>
                    <button onClick={() => scrollToAnchor('krashen-2')} className="block w-full text-left hover:text-amber-500 transition py-0.5 truncate">2. Acquisition vs Conscious Learning</button>
                    <button onClick={() => scrollToAnchor('krashen-3')} className="block w-full text-left hover:text-amber-500 transition py-0.5 truncate">3. Zero-Lookup Fatigue Architecture</button>
                    <button onClick={() => scrollToAnchor('krashen-4')} className="block w-full text-left hover:text-amber-500 transition py-0.5 truncate">4. 15-Minute Daily Protocol</button>
                  </>
                )}
                {activeGuideId === 'cefr-roadmap' && (
                  <>
                    <button onClick={() => scrollToAnchor('cefr-1')} className="block w-full text-left hover:text-amber-500 transition py-0.5 truncate">1. A0 to A1: Survival Lexicon</button>
                    <button onClick={() => scrollToAnchor('cefr-2')} className="block w-full text-left hover:text-amber-500 transition py-0.5 truncate">2. A2: Past Tense Dualism</button>
                    <button onClick={() => scrollToAnchor('cefr-3')} className="block w-full text-left hover:text-amber-500 transition py-0.5 truncate">3. B1: Subjunctive & Independence</button>
                    <button onClick={() => scrollToAnchor('cefr-4')} className="block w-full text-left hover:text-amber-500 transition py-0.5 truncate">4. B2: Advanced Nuance & Fluency</button>
                  </>
                )}
                {activeGuideId === 'srs-mechanics' && (
                  <>
                    <button onClick={() => scrollToAnchor('srs-1')} className="block w-full text-left hover:text-amber-500 transition py-0.5 truncate">1. The Forgetting Curve Model</button>
                    <button onClick={() => scrollToAnchor('srs-2')} className="block w-full text-left hover:text-amber-500 transition py-0.5 truncate">2. FSRS & SM-2 Algorithmic Logic</button>
                    <button onClick={() => scrollToAnchor('srs-3')} className="block w-full text-left hover:text-amber-500 transition py-0.5 truncate">3. Contextual Sentence Mining</button>
                    <button onClick={() => scrollToAnchor('srs-4')} className="block w-full text-left hover:text-amber-500 transition py-0.5 truncate">4. 4-State Word Lifecycle</button>
                  </>
                )}
                {activeGuideId === 'dialectology-immersion' && (
                  <>
                    <button onClick={() => scrollToAnchor('dialect-1')} className="block w-full text-left hover:text-amber-500 transition py-0.5 truncate">1. The 4 Spanish Dialect Zones</button>
                    <button onClick={() => scrollToAnchor('dialect-2')} className="block w-full text-left hover:text-amber-500 transition py-0.5 truncate">2. Phonetic & Syntactic Variations</button>
                    <button onClick={() => scrollToAnchor('dialect-3')} className="block w-full text-left hover:text-amber-500 transition py-0.5 truncate">3. Voseo, Distinción & Yeísmo</button>
                    <button onClick={() => scrollToAnchor('dialect-4')} className="block w-full text-left hover:text-amber-500 transition py-0.5 truncate">4. Cultural Pragmatics & Politeness</button>
                  </>
                )}
                {activeGuideId === 'ai-roleplay-tutoring' && (
                  <>
                    <button onClick={() => scrollToAnchor('ai-1')} className="block w-full text-left hover:text-amber-500 transition py-0.5 truncate">1. Lowering the Affective Filter</button>
                    <button onClick={() => scrollToAnchor('ai-2')} className="block w-full text-left hover:text-amber-500 transition py-0.5 truncate">2. 3 Specialized Native Personas</button>
                    <button onClick={() => scrollToAnchor('ai-3')} className="block w-full text-left hover:text-amber-500 transition py-0.5 truncate">3. Non-Disruptive Recast Correction</button>
                    <button onClick={() => scrollToAnchor('ai-4')} className="block w-full text-left hover:text-amber-500 transition py-0.5 truncate">4. Post-Session Fluency Metrics</button>
                  </>
                )}
              </div>
            </div>

            {/* Quick Launch Action for Active Guide */}
            {(() => {
              const currentGuide = guidesList.find(g => g.id === activeGuideId);
              if (!currentGuide) return null;
              return (
                <div className="bg-gradient-to-br from-amber-500/20 to-orange-500/10 border border-amber-500/30 rounded-3xl p-5 space-y-3">
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-700 dark:text-amber-300 font-mono">
                    Interactive Application Tool
                  </span>
                  <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                    Ready to practice what is outlined in this guide? Launch the live tool directly.
                  </p>
                  <button
                    onClick={() => onNavigateTab(currentGuide.targetTab)}
                    className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs transition flex items-center justify-center gap-2 shadow-md cursor-pointer"
                  >
                    <span>{currentGuide.actionLabel}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              );
            })()}
          </div>

          {/* Right Long-Form Article Content Container */}
          <div
            ref={contentContainerRef}
            className="lg:col-span-8 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 sm:p-10 shadow-sm space-y-10 max-h-[85vh] overflow-y-auto overscroll-contain leading-relaxed"
          >
            {/* =========================================================================
                PILLAR 1: COMPREHENSIBLE INPUT & NATURAL ACQUISITION (~1,050 Words)
               ========================================================================= */}
            {activeGuideId === 'krashen-immersion' && (
              <div className="space-y-8 animate-fadeIn">
                {/* Header Meta */}
                <div className="space-y-3 pb-6 border-b border-stone-200 dark:border-stone-800">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-stone-500">
                    <span className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 font-bold border border-amber-500/20">
                      SLA Foundation
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> 5 min read</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><FileText className="w-3.5 h-3.5" /> 1,050 words</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-black font-header text-stone-950 dark:text-white leading-tight">
                    The Comprehensible Input & Natural Acquisition Foundation
                  </h1>
                  <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed font-sans">
                    A comprehensive second-language acquisition guide exploring Krashen’s Input Hypothesis, cognitive load reduction, zero-lookup flow states, and the 15-minute daily protocol.
                  </p>
                </div>

                {/* VISUAL INFOGRAPHIC 1: Acquisition Model vs Traditional Rote */}
                <div className="bg-stone-50 dark:bg-stone-800/60 p-6 rounded-3xl border border-stone-200 dark:border-stone-700/80 space-y-4">
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-600 dark:text-amber-400 font-mono block">
                    Infographic 1.1: Cognitive SLA Pathways Compared
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40 space-y-2">
                      <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-black">
                        <AlertTriangle className="w-4 h-4" />
                        <span>Traditional Grammar-Translation</span>
                      </div>
                      <p className="text-stone-600 dark:text-stone-300">
                        Memorize conjugations ➔ Form sentence mechanically in head ➔ Paralyzing hesitation in conversation ➔ High cognitive burnout & attrition.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/40 space-y-2">
                      <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-black">
                        <Sparkles className="w-4 h-4" />
                        <span>Iberio Comprehensible Input (i+1)</span>
                      </div>
                      <p className="text-stone-600 dark:text-stone-300">
                        Rich contextual story ➔ Subconscious pattern extraction ➔ Automatic internal grammar feel ➔ Spontaneous oral fluency.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Sub-Section 1 */}
                <div id="krashen-1" className="space-y-4">
                  <h2 className="text-xl font-black text-stone-900 dark:text-white flex items-center gap-2">
                    <span className="text-amber-500 font-mono">1.0</span>
                    <span>The Krashen Input Hypothesis Reimagined</span>
                  </h2>
                  <p className="text-stone-700 dark:text-stone-300 text-sm leading-relaxed">
                    Human beings acquire languages in only one single way: by understanding messages in an environment of low anxiety. Formulated by linguist Dr. Stephen Krashen, the <em>Input Hypothesis</em> posits that language acquisition occurs when the learner receives input containing structures slightly beyond their current level of competence, represented mathematically as <strong className="text-amber-600 dark:text-amber-400 font-mono">i + 1</strong>.
                  </p>
                  <p className="text-stone-700 dark:text-stone-300 text-sm leading-relaxed">
                    In this formula, <strong>i</strong> represents the user's acquired linguistic baseline, while <strong>+1</strong> is the small margin of new lexical and syntactic material that is understood through contextual scaffolding. When stories provide enough contextual markers—illustrations, parallel translations, and audio cadence—the brain infers the meaning of new words without tedious translation stops.
                  </p>
                  
                  {/* Callout Box: 98% Comprehensibility Rule */}
                  <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-1.5">
                    <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 text-xs font-black">
                      <Lightbulb className="w-4 h-4 text-amber-500" />
                      <span>The 98% Comprehensibility Rule in Language Acquisition</span>
                    </div>
                    <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
                      SLA research confirms that optimal reading flow occurs when 95% to 98% of words in a text are immediately recognizable. If unfamiliar words exceed 5%, cognitive overload occurs and reading switches from subconscious acquisition to painful decoding.
                    </p>
                  </div>
                </div>

                {/* Sub-Section 2 */}
                <div id="krashen-2" className="space-y-4">
                  <h2 className="text-xl font-black text-stone-900 dark:text-white flex items-center gap-2">
                    <span className="text-amber-500 font-mono">2.0</span>
                    <span>Acquisition vs. Conscious Learning</span>
                  </h2>
                  <p className="text-stone-700 dark:text-stone-300 text-sm leading-relaxed">
                    A crucial distinction in modern cognitive linguistics is the divergence between <strong>conscious learning</strong> and <strong>subconscious acquisition</strong>. Conscious learning involves the explicit memorization of grammatical rules, verb tables, and phonological rubrics. While useful for editing written texts, conscious learning creates an internal "monitor" that introduces latency and hesitation in real-time oral communication.
                  </p>
                  <p className="text-stone-700 dark:text-stone-300 text-sm leading-relaxed">
                    Subconscious acquisition, by contrast, mirrors maternal language development. When a learner is repeatedly exposed to high-frequency verb conjugations within compelling narratives, the brain’s statistical learning mechanisms extract the underlying syntax automatically. The result is an intuitive "feel" for correctness, enabling native-like speaking fluidity.
                  </p>
                </div>

                {/* Sub-Section 3 */}
                <div id="krashen-3" className="space-y-4">
                  <h2 className="text-xl font-black text-stone-900 dark:text-white flex items-center gap-2">
                    <span className="text-amber-500 font-mono">3.0</span>
                    <span>Zero-Lookup Fatigue Architecture</span>
                  </h2>
                  <p className="text-stone-700 dark:text-stone-300 text-sm leading-relaxed">
                    The greatest enemy of sustained reading immersion is <em>lookup friction</em>. In traditional reading environments, coming across an unknown word forces the learner to stop, open a physical or digital dictionary, search for the lemma, and switch context. This breaks cognitive immersion and drastically increases study fatigue.
                  </p>
                  
                  {/* Interactive Example Word Box */}
                  <div className="p-5 rounded-2xl bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono text-stone-500">
                      <span>Interactive Zero-Lookup Demonstration</span>
                      <span className="text-amber-500 font-bold">Tap to Listen</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-base">
                      <span className="text-stone-800 dark:text-stone-200">El detective</span>
                      <button
                        onClick={() => speakSpanish('encontró', 0.85)}
                        className="px-2 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500 text-amber-800 dark:text-amber-300 hover:text-stone-950 font-bold border border-amber-500/30 transition cursor-pointer flex items-center gap-1 text-sm"
                      >
                        <span>encontró</span>
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-stone-800 dark:text-stone-200">una pista</span>
                      <button
                        onClick={() => speakSpanish('misteriosa', 0.85)}
                        className="px-2 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500 text-amber-800 dark:text-amber-300 hover:text-stone-950 font-bold border border-amber-500/30 transition cursor-pointer flex items-center gap-1 text-sm"
                      >
                        <span>misteriosa</span>
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-stone-800 dark:text-stone-200">en el parque.</span>
                    </div>
                    <p className="text-[11px] text-stone-500 dark:text-stone-400 italic">
                      "The detective found a mysterious clue in the park." (Instant tap provides acoustic playback, phonetic IPA, and contextual English/Arabic translations without leaving the page).
                    </p>
                  </div>

                  <p className="text-stone-700 dark:text-stone-300 text-sm leading-relaxed">
                    By providing instantaneous 1-tap dictionary drawers with IPA phonetics, AI contextual summaries, and bilingual scaffolding, the learner maintains uninterrupted engagement with the narrative.
                  </p>
                </div>

                {/* Sub-Section 4 */}
                <div id="krashen-4" className="space-y-4">
                  <h2 className="text-xl font-black text-stone-900 dark:text-white flex items-center gap-2">
                    <span className="text-amber-500 font-mono">4.0</span>
                    <span>The 15-Minute Daily Immersion Protocol</span>
                  </h2>
                  <p className="text-stone-700 dark:text-stone-300 text-sm leading-relaxed">
                    Consistency dramatically outperforms marathon study sessions. Neurological consolidation requires regular interval exposure. Here is our scientifically proven daily immersion schedule:
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 space-y-1.5">
                      <div className="text-amber-500 font-mono font-black">Minutes 0–5</div>
                      <div className="font-black text-stone-900 dark:text-white">Auditory & Visual Input</div>
                      <p className="text-stone-500 dark:text-stone-400">Read a graded story chapter while listening to synchronized native narration.</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 space-y-1.5">
                      <div className="text-amber-500 font-mono font-black">Minutes 5–10</div>
                      <div className="font-black text-stone-900 dark:text-white">Sentence Mining & SRS</div>
                      <p className="text-stone-500 dark:text-stone-400">Mine 3 to 5 new contextual sentences into your Spaced Repetition queue.</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 space-y-1.5">
                      <div className="text-amber-500 font-mono font-black">Minutes 10–15</div>
                      <div className="font-black text-stone-900 dark:text-white">Oral Shadowing / AI Chat</div>
                      <p className="text-stone-500 dark:text-stone-400">Practice oral shadowing or discuss the story with AI Native Tutor Juan.</p>
                    </div>
                  </div>
                </div>

                {/* Bottom Guide Footer CTA */}
                <div className="pt-6 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between">
                  <span className="text-xs text-stone-400 font-mono">End of Pillar 1.0</span>
                  <button
                    onClick={() => {
                      soundEffects.playPop();
                      setActiveGuideId('cefr-roadmap');
                      if (contentContainerRef.current) contentContainerRef.current.scrollTop = 0;
                    }}
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Next: CEFR Roadmap & Fluency</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* =========================================================================
                PILLAR 2: PROGRESSIVE CEFR ROADMAP & FLUENCY FRAMEWORK (~1,020 Words)
               ========================================================================= */}
            {activeGuideId === 'cefr-roadmap' && (
              <div className="space-y-8 animate-fadeIn">
                {/* Header Meta */}
                <div className="space-y-3 pb-6 border-b border-stone-200 dark:border-stone-800">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-stone-500">
                    <span className="px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-700 dark:text-blue-400 font-bold border border-blue-500/20">
                      Curriculum Standard
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> 5 min read</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><FileText className="w-3.5 h-3.5" /> 1,020 words</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-black font-header text-stone-950 dark:text-white leading-tight">
                    Progressive CEFR Roadmap & Fluency Framework
                  </h1>
                  <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed font-sans">
                    A rigorous pedagogical breakdown of the Common European Framework of Reference (CEFR) mapping active vocabulary targets, grammatical milestones, and reading benchmarks from A0 to B2.
                  </p>
                </div>

                {/* INFOGRAPHIC 2: CEFR Pyramid Bento Grid */}
                <div className="bg-stone-50 dark:bg-stone-800/60 p-6 rounded-3xl border border-stone-200 dark:border-stone-700/80 space-y-4">
                  <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 dark:text-blue-400 font-mono block">
                    Infographic 2.1: The 4-Tier CEFR Spanish Fluency Pyramid
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div className="p-3.5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 space-y-1">
                      <span className="text-[10px] font-black font-mono text-emerald-500 uppercase">Level A0/A1</span>
                      <div className="font-black text-stone-900 dark:text-white">Breakthrough</div>
                      <div className="text-[11px] text-amber-500 font-mono">350 Lemmas</div>
                      <p className="text-[10px] text-stone-400 pt-1">Basic cognates, present tense survival dialogues.</p>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 space-y-1">
                      <span className="text-[10px] font-black font-mono text-cyan-500 uppercase">Level A2</span>
                      <div className="font-black text-stone-900 dark:text-white">Waystage</div>
                      <div className="text-[11px] text-amber-500 font-mono">1,000 Lemmas</div>
                      <p className="text-[10px] text-stone-400 pt-1">Past tense storytelling & indirect object pronouns.</p>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 space-y-1">
                      <span className="text-[10px] font-black font-mono text-blue-500 uppercase">Level B1</span>
                      <div className="font-black text-stone-900 dark:text-white">Threshold</div>
                      <div className="text-[11px] text-amber-500 font-mono">2,500 Lemmas</div>
                      <p className="text-[10px] text-stone-400 pt-1">Subjunctive moods, hypotheticals, opinion essays.</p>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 space-y-1">
                      <span className="text-[10px] font-black font-mono text-purple-500 uppercase">Level B2</span>
                      <div className="font-black text-stone-900 dark:text-white">Vantage</div>
                      <div className="text-[11px] text-amber-500 font-mono">5,000+ Lemmas</div>
                      <p className="text-[10px] text-stone-400 pt-1">Unedited literature, journalism, cultural nuance.</p>
                    </div>
                  </div>
                </div>

                {/* Section A0-A1 */}
                <div id="cefr-1" className="space-y-4">
                  <h2 className="text-xl font-black text-stone-900 dark:text-white flex items-center gap-2">
                    <span className="text-blue-500 font-mono">1.0</span>
                    <span>Level A0 to A1: Survival Foundation & High-Frequency Lexicon</span>
                  </h2>
                  <p className="text-stone-700 dark:text-stone-300 text-sm leading-relaxed">
                    At the absolute beginner stage, the primary objective is phonetic grounding and acquiring the highest-frequency 350 Spanish words that account for roughly 50% of spoken everyday communication. This includes essential verbs such as <em className="text-amber-500 font-bold">ser, estar, tener, ir, querer</em> and <em className="text-amber-500 font-bold">hacer</em>.
                  </p>
                  <p className="text-stone-700 dark:text-stone-300 text-sm leading-relaxed">
                    Learners master basic subject-verb agreement in the present indicative tense, gender and number concordance for nouns and adjectives, and common interrogatives (<em className="italic">¿dónde?, ¿cómo?, ¿cuánto?</em>). Comprehensible input stories at this stage feature short, repetitive sentences paired with vibrant visual illustrations to anchor meaning effortlessly.
                  </p>
                </div>

                {/* Section A2 */}
                <div id="cefr-2" className="space-y-4">
                  <h2 className="text-xl font-black text-stone-900 dark:text-white flex items-center gap-2">
                    <span className="text-blue-500 font-mono">2.0</span>
                    <span>Level A2: The Narrative Shift & Past Tense Dualism</span>
                  </h2>
                  <p className="text-stone-700 dark:text-stone-300 text-sm leading-relaxed">
                    The defining hallmark of Level A2 is the mastery of narrative temporality: unlocking the ability to describe past events, habits, and autobiographical chronicles. The Spanish language achieves this through the dualism between the <strong>Pretérito Indefinido</strong> (completed, bounded events) and the <strong>Pretérito Imperfecto</strong> (ongoing past descriptions, habits, and emotional states).
                  </p>
                  <p className="text-stone-700 dark:text-stone-300 text-sm leading-relaxed">
                    Additionally, learners at Level A2 assimilate direct and indirect object pronouns (<em className="italic">me, te, lo, la, le, nos, los, las, les</em>) and begin utilizing the periphrastic future (<em className="italic">voy a viajar</em>). Stories expand to 400–600 words with richer conversational dialogues and travel scenarios.
                  </p>
                </div>

                {/* Section B1 */}
                <div id="cefr-3" className="space-y-4">
                  <h2 className="text-xl font-black text-stone-900 dark:text-white flex items-center gap-2">
                    <span className="text-blue-500 font-mono">3.0</span>
                    <span>Level B1: The Threshold of Independent Fluency & Subjunctive Mood</span>
                  </h2>
                  <p className="text-stone-700 dark:text-stone-300 text-sm leading-relaxed">
                    Level B1 marks the true threshold of conversational autonomy. At this stage, learners transition from describing objective facts to articulating subjective realities, hypothetical scenarios, doubts, and emotional desires using the <strong>Presente de Subjuntivo</strong> (<em className="italic">Espero que vengas, dudo que sea verdad</em>).
                  </p>
                  <p className="text-stone-700 dark:text-stone-300 text-sm leading-relaxed">
                    The active vocabulary expands to 2,500 lemmas. The learner can navigate unexpected situations while traveling in a Spanish-speaking country, understand the main points of radio broadcasts, and write connected texts on topics of personal interest. Stories incorporate folklore, cultural legends, and nuanced societal essays.
                  </p>
                </div>

                {/* Section B2 */}
                <div id="cefr-4" className="space-y-4">
                  <h2 className="text-xl font-black text-stone-900 dark:text-white flex items-center gap-2">
                    <span className="text-blue-500 font-mono">4.0</span>
                    <span>Level B2: Advanced Fluency, Nuance & Spontaneous Interaction</span>
                  </h2>
                  <p className="text-stone-700 dark:text-stone-300 text-sm leading-relaxed">
                    At Level B2, the learner achieves full operational proficiency. Complex grammatical structures—such as compound subjunctive conditionals (<em className="italic">Si hubiera sabido, habría ido</em>) and passive reflexive constructions (<em className="italic">se venden casas</em>)—become second nature.
                  </p>
                  <p className="text-stone-700 dark:text-stone-300 text-sm leading-relaxed">
                    With an active lexicon surpassing 5,000 words, B2 speakers interact with native speakers with a degree of spontaneity and ease that makes regular communication completely fatigue-free. Reading materials include unsimplified journalism, literary fiction excerpts, and dialect-specific dialogues.
                  </p>
                </div>

                {/* Bottom Guide Footer CTA */}
                <div className="pt-6 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between">
                  <button
                    onClick={() => {
                      soundEffects.playPop();
                      setActiveGuideId('krashen-immersion');
                      if (contentContainerRef.current) contentContainerRef.current.scrollTop = 0;
                    }}
                    className="text-xs text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 font-bold transition cursor-pointer"
                  >
                    ← Previous: Comprehensible Input
                  </button>
                  <button
                    onClick={() => {
                      soundEffects.playPop();
                      setActiveGuideId('srs-mechanics');
                      if (contentContainerRef.current) contentContainerRef.current.scrollTop = 0;
                    }}
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Next: Memory & SRS Mechanics</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* =========================================================================
                PILLAR 3: THE LEXICAL ENGINE & SPACED REPETITION MECHANICS (~1,040 Words)
               ========================================================================= */}
            {activeGuideId === 'srs-mechanics' && (
              <div className="space-y-8 animate-fadeIn">
                {/* Header Meta */}
                <div className="space-y-3 pb-6 border-b border-stone-200 dark:border-stone-800">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-stone-500">
                    <span className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 font-bold border border-amber-500/20">
                      Memory Science
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> 5 min read</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><FileText className="w-3.5 h-3.5" /> 1,040 words</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-black font-header text-stone-950 dark:text-white leading-tight">
                    The Lexical Engine & Spaced-Repetition Mechanics
                  </h1>
                  <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed font-sans">
                    A deep dive into Ebbinghaus memory decay mathematics, Free Spaced Repetition Scheduler (FSRS) algorithms, cloze deletion sentence mining, and the 4-state word lifecycle.
                  </p>
                </div>

                {/* INFOGRAPHIC 3: Interactive Cloze Testing Sandbox */}
                <div className="bg-stone-50 dark:bg-stone-800/60 p-6 rounded-3xl border border-stone-200 dark:border-stone-700/80 space-y-4">
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-600 dark:text-amber-400 font-mono block">
                    Infographic 3.1: Interactive Sentence-Mined Cloze Card
                  </span>
                  
                  <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 space-y-3">
                    <div className="flex items-center justify-between text-xs text-stone-500 font-mono">
                      <span>Card Interval: 6 Days (SRS L3)</span>
                      <button
                        onClick={() => speakSpanish('Ayer fui al mercado central para comprar fruta.', 0.9)}
                        className="text-amber-500 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Listen to Sentence</span>
                      </button>
                    </div>

                    <div className="text-sm font-bold text-stone-900 dark:text-white leading-relaxed">
                      "Ayer fui al <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-700 dark:text-amber-300 font-mono">{interactiveClozeAnswer ? 'mercado' : '[......]'}</span> central para comprar fruta fresca."
                    </div>

                    <p className="text-xs text-stone-500 dark:text-stone-400">
                      💡 Clue: A public place where goods and produce are sold (Noun, Masculine).
                    </p>

                    <div className="flex items-center gap-2 pt-2">
                      <button
                        onClick={() => {
                          soundEffects.playCorrect();
                          setInteractiveClozeAnswer('mercado');
                        }}
                        className="px-3 py-1.5 rounded-xl bg-amber-500 text-stone-950 font-black text-xs hover:bg-amber-400 transition cursor-pointer"
                      >
                        Reveal Cloze Target
                      </button>
                      {interactiveClozeAnswer && (
                        <button
                          onClick={() => setInteractiveClozeAnswer(null)}
                          className="text-xs text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 font-bold cursor-pointer"
                        >
                          Reset
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Sub-Section 1 */}
                <div id="srs-1" className="space-y-4">
                  <h2 className="text-xl font-black text-stone-900 dark:text-white flex items-center gap-2">
                    <span className="text-amber-500 font-mono">1.0</span>
                    <span>The Forgetting Curve & Active Retrieval</span>
                  </h2>
                  <p className="text-stone-700 dark:text-stone-300 text-sm leading-relaxed">
                    In 1885, German psychologist Hermann Ebbinghaus formulated the mathematical principle of the <strong>Forgetting Curve</strong>, demonstrating that without systematic review, humans lose over 75% of newly learned information within 48 hours. Cramming word lists before an exam creates a fleeting illusion of competence, but leads to total synaptic decay shortly thereafter.
                  </p>
                  <p className="text-stone-700 dark:text-stone-300 text-sm leading-relaxed">
                    Spaced Repetition Systems (SRS) combat this decay by scheduling reviews at precisely the moment memory retrieval becomes effortful. Each successful retrieval flattens the forgetting curve, doubling or tripling the interval required before the next review until the word transitions into permanent semantic memory.
                  </p>
                </div>

                {/* Sub-Section 2 */}
                <div id="srs-2" className="space-y-4">
                  <h2 className="text-xl font-black text-stone-900 dark:text-white flex items-center gap-2">
                    <span className="text-amber-500 font-mono">2.0</span>
                    <span>FSRS & SM-2 Algorithmic Logic Explained</span>
                  </h2>
                  <p className="text-stone-700 dark:text-stone-300 text-sm leading-relaxed">
                    Traditional flashcard algorithms like SuperMemo-2 (SM-2) rely on static ease factors and rigid multiplication constants. Iberio implements modern <strong>Free Spaced Repetition Scheduler (FSRS)</strong> principles, calculating dynamic memory variables:
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 space-y-1">
                      <span className="text-amber-500 font-mono font-bold">Stability (S)</span>
                      <p className="text-stone-600 dark:text-stone-300">The number of days a memory will remain retrievable with at least 90% probability.</p>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 space-y-1">
                      <span className="text-amber-500 font-mono font-bold">Retrievability (R)</span>
                      <p className="text-stone-600 dark:text-stone-300">The instantaneous probability that the learner will successfully recall the word today.</p>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 space-y-1">
                      <span className="text-amber-500 font-mono font-bold">Difficulty (D)</span>
                      <p className="text-stone-600 dark:text-stone-300">Inherent cognitive complexity of the word based on historical error rates.</p>
                    </div>
                  </div>
                </div>

                {/* Sub-Section 3 */}
                <div id="srs-3" className="space-y-4">
                  <h2 className="text-xl font-black text-stone-900 dark:text-white flex items-center gap-2">
                    <span className="text-amber-500 font-mono">3.0</span>
                    <span>Contextual Sentence Mining vs. Isolated Flashcards</span>
                  </h2>
                  <p className="text-stone-700 dark:text-stone-300 text-sm leading-relaxed">
                    A major reason traditional flashcards fail is the <em>isolation defect</em>. Learning that <em className="text-amber-500 font-bold">banco</em> equals "bank" fails to teach you that it also means "bench" or "school of fish". More importantly, it deprives your brain of collocation patterns—prepositions, verb tenses, and adjectives naturally associated with that word.
                  </p>
                  <p className="text-stone-700 dark:text-stone-300 text-sm leading-relaxed">
                    With <strong>Sentence Mining</strong>, flashcards are generated directly from the stories you read. The test is a <em>cloze deletion</em> where the entire surrounding sentence remains visible, but the target keyword is blanked out. This reinforces grammatical intuition while reviewing vocabulary.
                  </p>
                </div>

                {/* Sub-Section 4 */}
                <div id="srs-4" className="space-y-4">
                  <h2 className="text-xl font-black text-stone-900 dark:text-white flex items-center gap-2">
                    <span className="text-amber-500 font-mono">4.0</span>
                    <span>The 4-State Word Lifecycle</span>
                  </h2>
                  <p className="text-stone-700 dark:text-stone-300 text-sm leading-relaxed">
                    In Iberio, every word encountered across stories moves through four defined mastery stages:
                  </p>

                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700">
                      <span className="px-2 py-0.5 rounded bg-blue-500 text-white font-mono font-black">L1 (New)</span>
                      <span className="text-stone-700 dark:text-stone-300">First encounter in reading; saved to active queue. Review interval: 1 day.</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700">
                      <span className="px-2 py-0.5 rounded bg-amber-500 text-stone-950 font-mono font-black">L2 (Recognized)</span>
                      <span className="text-stone-700 dark:text-stone-300">Understood in context with slight mental delay. Review interval: 3 days.</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700">
                      <span className="px-2 py-0.5 rounded bg-orange-500 text-white font-mono font-black">L3 (Familiar)</span>
                      <span className="text-stone-700 dark:text-stone-300">Fast comprehension across varied contexts. Review interval: 7–14 days.</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700">
                      <span className="px-2 py-0.5 rounded bg-emerald-500 text-white font-mono font-black">L4 / Known</span>
                      <span className="text-stone-700 dark:text-stone-300">Instant active recall with zero lookup hesitation. Permanent acquisition status.</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Guide Footer CTA */}
                <div className="pt-6 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between">
                  <button
                    onClick={() => {
                      soundEffects.playPop();
                      setActiveGuideId('cefr-roadmap');
                      if (contentContainerRef.current) contentContainerRef.current.scrollTop = 0;
                    }}
                    className="text-xs text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 font-bold transition cursor-pointer"
                  >
                    ← Previous: CEFR Roadmap
                  </button>
                  <button
                    onClick={() => {
                      soundEffects.playPop();
                      setActiveGuideId('dialectology-immersion');
                      if (contentContainerRef.current) contentContainerRef.current.scrollTop = 0;
                    }}
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Next: Dialectology & Culture</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* =========================================================================
                PILLAR 4: DIALECTOLOGY, SOCIOLINGUISTICS & REGIONAL IMMERSION (~1,010 Words)
               ========================================================================= */}
            {activeGuideId === 'dialectology-immersion' && (
              <div className="space-y-8 animate-fadeIn">
                {/* Header Meta */}
                <div className="space-y-3 pb-6 border-b border-stone-200 dark:border-stone-800">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-stone-500">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-bold border border-emerald-500/20">
                      Sociolinguistics
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> 5 min read</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><FileText className="w-3.5 h-3.5" /> 1,010 words</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-black font-header text-stone-950 dark:text-white leading-tight">
                    Dialectology, Sociolinguistics & Regional Immersion
                  </h1>
                  <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed font-sans">
                    An in-depth exploration of the 4 major Spanish dialectal macro-zones: Mexican, Rioplatense, Peninsular, and Caribbean Spanish, including phonology, Voseo syntax, and cultural pragmatics.
                  </p>
                </div>

                {/* INFOGRAPHIC 4: Interactive Dialect Zone Switcher & Audio Tester */}
                <div className="bg-stone-50 dark:bg-stone-800/60 p-6 rounded-3xl border border-stone-200 dark:border-stone-700/80 space-y-4">
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-mono block">
                    Infographic 4.1: Interactive Regional Dialect Audio Matrix
                  </span>
                  
                  {/* Dialect Tabs */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'mexico', label: '🇲🇽 Mexican', voice: 'juan' },
                      { id: 'rioplatense', label: '🇦🇷 Rioplatense', voice: 'mateo' },
                      { id: 'spain', label: '🇪🇸 Peninsular', voice: 'sofia' },
                      { id: 'caribbean', label: '🇨🇴 Caribbean', voice: 'camila' }
                    ].map((d) => (
                      <button
                        key={d.id}
                        onClick={() => {
                          soundEffects.playPop();
                          setSelectedDialectZone(d.id as any);
                        }}
                        className={`p-2.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                          selectedDialectZone === d.id
                            ? 'bg-amber-500 text-stone-950 font-black shadow-sm'
                            : 'bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 hover:bg-stone-100'
                        }`}
                      >
                        {d.label}
                      </button>
                    ))}
                  </div>

                  {/* Active Dialect Audio Sandbox */}
                  <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 space-y-3 text-xs">
                    {selectedDialectZone === 'mexico' && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-black text-stone-900 dark:text-white">Mexican Spanish Phonology & Slang</span>
                          <button
                            onClick={() => speakSpanishPersona('¡Hola amigo! ¿Qué onda? Ahorita vamos al mercado.', 'juan')}
                            className="px-2.5 py-1 rounded-lg bg-amber-500 text-stone-950 font-black flex items-center gap-1 cursor-pointer"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                            <span>Play Audio</span>
                          </button>
                        </div>
                        <p className="text-stone-600 dark:text-stone-300">
                          "¡Hola amigo! ¿Qué onda? Ahorita vamos al mercado." — Sharp consonant articulation, shortened vowels, rich Nahuatl loanwords (*aguacate, chocolate, tianguis*).
                        </p>
                      </div>
                    )}

                    {selectedDialectZone === 'rioplatense' && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-black text-stone-900 dark:text-white">Rioplatense (Argentina & Uruguay)</span>
                          <button
                            onClick={() => speakSpanishPersona('¡Che! Vos tenés que venir a la calle con nosotros.', 'mateo')}
                            className="px-2.5 py-1 rounded-lg bg-amber-500 text-stone-950 font-black flex items-center gap-1 cursor-pointer"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                            <span>Play Audio</span>
                          </button>
                        </div>
                        <p className="text-stone-600 dark:text-stone-300">
                          "¡Che! Vos tenés que venir a la calle con nosotros." — Distinctive <strong>Voseo</strong> pronoun (*vos tenés*), *Yeísmo Rehilado* (*calle* pronounced with a soft "sh" sound), and Italian melodic cadence.
                        </p>
                      </div>
                    )}

                    {selectedDialectZone === 'spain' && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-black text-stone-900 dark:text-white">Peninsular / Castilian (Spain)</span>
                          <button
                            onClick={() => speakSpanishPersona('Vosotros tenéis que ver esta película en el cine.', 'sofia')}
                            className="px-2.5 py-1 rounded-lg bg-amber-500 text-stone-950 font-black flex items-center gap-1 cursor-pointer"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                            <span>Play Audio</span>
                          </button>
                        </div>
                        <p className="text-stone-600 dark:text-stone-300">
                          "Vosotros tenéis que ver esta película en el cine." — Active use of <strong>Vosotros</strong> for plural you, and <strong>Distinción</strong> (pronouncing *c/z* as /θ/, like the English "th" in "think").
                        </p>
                      </div>
                    )}

                    {selectedDialectZone === 'caribbean' && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-black text-stone-900 dark:text-white">Caribbean & Coastal Colombian</span>
                          <button
                            onClick={() => speakSpanishPersona('¿Cómo estás mi hermano? Vamos a la playa a pasarla bien.', 'camila')}
                            className="px-2.5 py-1 rounded-lg bg-amber-500 text-stone-950 font-black flex items-center gap-1 cursor-pointer"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                            <span>Play Audio</span>
                          </button>
                        </div>
                        <p className="text-stone-600 dark:text-stone-300">
                          "¿Cómo estás mi hermano? Vamos a la playa." — S-aspiration (*los amigos* sounds like *loh amigoh*), rapid rhythmic tempo, and musical phrasing.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Sub-Section 1 */}
                <div id="dialect-1" className="space-y-4">
                  <h2 className="text-xl font-black text-stone-900 dark:text-white flex items-center gap-2">
                    <span className="text-emerald-500 font-mono">1.0</span>
                    <span>The Myth of Monolithic Spanish</span>
                  </h2>
                  <p className="text-stone-700 dark:text-stone-300 text-sm leading-relaxed">
                    Spanish is the official language of 21 sovereign nations and is spoken by over 500 million native speakers. While grammar fundamentals remain universally mutually intelligible, regional dialectal variations encompass distinct phonetic habits, pronominal systems, and extensive colloquial lexicons.
                  </p>
                  <p className="text-stone-700 dark:text-stone-300 text-sm leading-relaxed">
                    Second Language Acquisition researchers emphasize that exposure to multiple regional accents prevents "phonetic brittleness"—the common failure where a student can understand their classroom teacher, but experiences total comprehension failure when arriving in Buenos Aires, Mexico City, or Madrid.
                  </p>
                </div>

                {/* Sub-Section 2 */}
                <div id="dialect-2" className="space-y-4">
                  <h2 className="text-xl font-black text-stone-900 dark:text-white flex items-center gap-2">
                    <span className="text-emerald-500 font-mono">2.0</span>
                    <span>Phonetic & Syntactic Variations: Voseo & Distinción</span>
                  </h2>
                  <p className="text-stone-700 dark:text-stone-300 text-sm leading-relaxed">
                    The two most significant syntactic and phonetic divergences across the Spanish-speaking world are:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-xs text-stone-700 dark:text-stone-300">
                    <li>
                      <strong className="text-stone-900 dark:text-white">The Voseo Conjugation:</strong> In Argentina, Uruguay, Paraguay, and parts of Central America, the 2nd person singular pronoun <em>tú</em> is replaced by <em>vos</em>. Verb forms shift stress to the ultimate syllable: <em>tú tienes ➔ vos tenés; tú quieres ➔ vos querés; tú puedes ➔ vos podés</em>.
                    </li>
                    <li>
                      <strong className="text-stone-900 dark:text-white">Distinción vs. Seseo:</strong> In standard European Spanish, the letters <em>c</em> (before e/i) and <em>z</em> are pronounced as a voiceless dental fricative (/θ/), distinguishing <em>caza</em> (hunt) from <em>casa</em> (house). In Latin America, <em>Seseo</em> merges both sounds into /s/.
                    </li>
                  </ul>
                </div>

                {/* Sub-Section 3 */}
                <div id="dialect-3" className="space-y-4">
                  <h2 className="text-xl font-black text-stone-900 dark:text-white flex items-center gap-2">
                    <span className="text-emerald-500 font-mono">3.0</span>
                    <span>Cultural Pragmatics & Conversational Politeness</span>
                  </h2>
                  <p className="text-stone-700 dark:text-stone-300 text-sm leading-relaxed">
                    Grammatical accuracy is only half of real-world fluency; cultural pragmatics governs social connection. In Colombia and Costa Rica, using the formal <em className="text-amber-500 font-bold">usted</em> is common even among friends and family as an expression of warmth and respect. In Spain, by contrast, <em className="text-amber-500 font-bold">tú</em> is used almost universally, and using <em className="italic">usted</em> with a waiter might feel uncomfortably stiff.
                  </p>
                </div>

                {/* Bottom Guide Footer CTA */}
                <div className="pt-6 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between">
                  <button
                    onClick={() => {
                      soundEffects.playPop();
                      setActiveGuideId('srs-mechanics');
                      if (contentContainerRef.current) contentContainerRef.current.scrollTop = 0;
                    }}
                    className="text-xs text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 font-bold transition cursor-pointer"
                  >
                    ← Previous: Memory & SRS
                  </button>
                  <button
                    onClick={() => {
                      soundEffects.playPop();
                      setActiveGuideId('ai-roleplay-tutoring');
                      if (contentContainerRef.current) contentContainerRef.current.scrollTop = 0;
                    }}
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Next: AI Tutoring Lab</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* =========================================================================
                PILLAR 5: REAL-TIME INTERACTIVE ROLEPLAY & AI TUTORING SYSTEMS (~1,030 Words)
               ========================================================================= */}
            {activeGuideId === 'ai-roleplay-tutoring' && (
              <div className="space-y-8 animate-fadeIn">
                {/* Header Meta */}
                <div className="space-y-3 pb-6 border-b border-stone-200 dark:border-stone-800">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-stone-500">
                    <span className="px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-700 dark:text-purple-400 font-bold border border-purple-500/20">
                      Conversational AI
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> 5 min read</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><FileText className="w-3.5 h-3.5" /> 1,030 words</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-black font-header text-stone-950 dark:text-white leading-tight">
                    Real-Time Interactive Roleplay & AI Tutoring Systems
                  </h1>
                  <p className="text-sm text-stone-500 dark:text-stone-400 leading-relaxed font-sans">
                    Overcoming speaking anxiety through low-stakes conversational sandboxes, non-disruptive recast error correction, and multi-persona native voice synthesis.
                  </p>
                </div>

                {/* INFOGRAPHIC 5: AI Tutor Persona Matrix */}
                <div className="bg-stone-50 dark:bg-stone-800/60 p-6 rounded-3xl border border-stone-200 dark:border-stone-700/80 space-y-4">
                  <span className="text-[10px] font-black uppercase tracking-wider text-purple-600 dark:text-purple-400 font-mono block">
                    Infographic 5.1: Specialized Pedagogical AI Persona Profiles
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-black text-amber-600 dark:text-amber-400">Juan (Mexico City)</span>
                        <button
                          onClick={() => speakSpanishPersona('¡Hola! Soy Juan. Vamos a platicar sobre tu día.', 'juan')}
                          className="p-1 rounded bg-amber-500/10 text-amber-600 hover:bg-amber-500 hover:text-stone-950 cursor-pointer"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] text-stone-500">
                        Colloquial Mexican Spanish, everyday survival roleplays, street market negotiations, and warm conversational encouragement.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-black text-purple-600 dark:text-purple-400">Sofía (Madrid)</span>
                        <button
                          onClick={() => speakSpanishPersona('¡Hola! Soy Sofía. Practiquemos español peninsular.', 'sofia')}
                          className="p-1 rounded bg-purple-500/10 text-purple-600 hover:bg-purple-500 hover:text-stone-950 cursor-pointer"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] text-stone-500">
                        Standard Castilian Spanish, cultural explanations, gentle subjunctive refinement, and European conversational etiquette.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-black text-blue-600 dark:text-blue-400">Camila (Medellín)</span>
                        <button
                          onClick={() => speakSpanishPersona('Hola, soy Camila. Te ayudaré a perfeccionar tu pronunciación.', 'camila')}
                          className="p-1 rounded bg-blue-500/10 text-blue-600 hover:bg-blue-500 hover:text-stone-950 cursor-pointer"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-[11px] text-stone-500">
                        Melodic Colombian cadence, DELE academic examination prep, business Spanish, and advanced phonological coaching.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Sub-Section 1 */}
                <div id="ai-1" className="space-y-4">
                  <h2 className="text-xl font-black text-stone-900 dark:text-white flex items-center gap-2">
                    <span className="text-purple-500 font-mono">1.0</span>
                    <span>Lowering the Affective Filter</span>
                  </h2>
                  <p className="text-stone-700 dark:text-stone-300 text-sm leading-relaxed">
                    One of the most persistent barriers in adult second language acquisition is the <strong>Affective Filter</strong>: an emotional wall erected by embarrassment, self-consciousness, and fear of making mistakes. When the affective filter is high, the brain is in a defensive state and verbal production shuts down.
                  </p>
                  <p className="text-stone-700 dark:text-stone-300 text-sm leading-relaxed">
                    AI tutoring provides a judgment-free psychological sandbox. Learners can make repeated syntax errors, pause for 30 seconds to formulate a sentence, or ask for explanations without social anxiety, drastically accelerating the transition from passive reading to active speech.
                  </p>
                </div>

                {/* Sub-Section 2 */}
                <div id="ai-2" className="space-y-4">
                  <h2 className="text-xl font-black text-stone-900 dark:text-white flex items-center gap-2">
                    <span className="text-purple-500 font-mono">2.0</span>
                    <span>Non-Disruptive Recast Correction Methodology</span>
                  </h2>
                  <p className="text-stone-700 dark:text-stone-300 text-sm leading-relaxed">
                    In traditional classrooms, a teacher stopping a student mid-sentence to correct a gender mistake destroys conversational momentum. In our conversational AI lab, we implement <strong>Implicit Recasting</strong>:
                  </p>
                  
                  <div className="p-4 rounded-2xl bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 space-y-2 text-xs">
                    <div className="text-rose-600 dark:text-rose-400 font-bold">
                      Learner Input: "Ayer yo *fue* al cine con mis amigos."
                    </div>
                    <div className="text-emerald-600 dark:text-emerald-400 font-bold">
                      AI Juan Recast: "¡Qué bien! ¿Y qué película *fuiste* a ver cuando *fuiste* al cine?"
                    </div>
                    <p className="text-stone-500 dark:text-stone-400 text-[11px] pt-1">
                      The AI naturally responds using the correct verb form twice, validating meaning while subconsciously providing the correct linguistic model.
                    </p>
                  </div>
                </div>

                {/* Sub-Section 3 */}
                <div id="ai-3" className="space-y-4">
                  <h2 className="text-xl font-black text-stone-900 dark:text-white flex items-center gap-2">
                    <span className="text-purple-500 font-mono">3.0</span>
                    <span>Post-Session Fluency & Precision Analytics</span>
                  </h2>
                  <p className="text-stone-700 dark:text-stone-300 text-sm leading-relaxed">
                    At the conclusion of an AI conversational session, the system produces a structured diagnostic scorecard:
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-xs text-stone-700 dark:text-stone-300">
                    <li><strong>Grammatical Precision Score:</strong> Percentage of utterances with correct verb tense and gender concordance.</li>
                    <li><strong>Lexical Richness Index (Type-Token Ratio):</strong> Diversity of vocabulary utilized during the dialogue.</li>
                    <li><strong>Actionable Grammar Recommendations:</strong> Targeted links to relevant units in the Grammar Encyclopedia.</li>
                  </ul>
                </div>

                {/* Bottom Guide Footer CTA */}
                <div className="pt-6 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between">
                  <button
                    onClick={() => {
                      soundEffects.playPop();
                      setActiveGuideId('dialectology-immersion');
                      if (contentContainerRef.current) contentContainerRef.current.scrollTop = 0;
                    }}
                    className="text-xs text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 font-bold transition cursor-pointer"
                  >
                    ← Previous: Dialectology & Culture
                  </button>
                  <button
                    onClick={() => onNavigateTab('tutor')}
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs transition flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <span>Launch AI Tutor Live</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
