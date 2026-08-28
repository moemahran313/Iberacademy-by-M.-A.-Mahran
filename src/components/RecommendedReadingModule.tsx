import React, { useState, useMemo } from 'react';
import {
  Compass,
  Sparkles,
  BookOpen,
  ArrowRight,
  Zap,
  Filter,
  Flame,
  CheckCircle2,
  Clock,
  Layers,
  Heart,
  Globe,
  Radio,
  Newspaper,
  MessageSquare,
  Landmark,
  FlaskConical,
  BookMarked
} from 'lucide-react';
import { CEFRLevel, UserProgress, ImportedContent } from '../types';
import { CURATED_AUTHENTIC_LIBRARY } from '../data/comprehensibleInputLibrary';
import { COMPREHENSIBLE_STORIES } from '../data/comprehensibleStories';
import { soundEffects } from '../utils/audio';

interface RecommendedReadingModuleProps {
  userProgress: UserProgress;
  setUserProgress: React.Dispatch<React.SetStateAction<UserProgress>>;
  onOpenStory: (content: ImportedContent) => void;
}

export const RecommendedReadingModule: React.FC<RecommendedReadingModuleProps> = ({
  userProgress,
  setUserProgress,
  onOpenStory
}) => {
  const currentLevel: CEFRLevel = userProgress.currentLevel || 'A1';

  // Interest categories state
  const availableInterests = [
    { id: 'news', label: '📰 News & Current Affairs', icon: Newspaper, categoryKeyword: 'news' },
    { id: 'dialogue', label: '💬 Daily Dialogues', icon: MessageSquare, categoryKeyword: 'dialogue' },
    { id: 'culture', label: '🏛️ History & Culture', icon: Landmark, categoryKeyword: 'culture' },
    { id: 'science', label: '🔬 Science & Tech', icon: FlaskConical, categoryKeyword: 'science' },
    { id: 'story', label: '📚 Fiction & Mystery', icon: BookMarked, categoryKeyword: 'graded story' }
  ];

  // User selected interests from progress or default all
  const [selectedInterests, setSelectedInterests] = useState<string[]>(
    userProgress.userInterests && userProgress.userInterests.length > 0
      ? userProgress.userInterests
      : ['news', 'dialogue', 'culture', 'science', 'story']
  );

  const [selectedLevelFilter, setSelectedLevelFilter] = useState<CEFRLevel>(currentLevel);

  // Toggle interest and save to progress
  const toggleInterest = (interestId: string) => {
    soundEffects.playPop();
    const updated = selectedInterests.includes(interestId)
      ? selectedInterests.filter(i => i !== interestId)
      : [...selectedInterests, interestId];

    // Ensure at least 1 interest is selected
    if (updated.length === 0) return;

    setSelectedInterests(updated);
    setUserProgress(prev => ({
      ...prev,
      userInterests: updated
    }));
  };

  // Build unified items pool
  const allContentPool: ImportedContent[] = useMemo(() => {
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

    return [...CURATED_AUTHENTIC_LIBRARY, ...convertedStories, ...(userProgress.customImportedTexts || [])];
  }, [userProgress.customImportedTexts]);

  // Filter recommendations based on level & user interests
  const recommendations = useMemo(() => {
    return allContentPool.filter(item => {
      // Level check
      const levelMatches = item.cefr === selectedLevelFilter;

      // Category check against active interests
      const categoryLower = item.category.toLowerCase();
      const interestMatches = selectedInterests.some(interestId => {
        const foundObj = availableInterests.find(i => i.id === interestId);
        if (!foundObj) return false;
        return categoryLower.includes(foundObj.categoryKeyword);
      });

      return levelMatches && interestMatches;
    });
  }, [allContentPool, selectedLevelFilter, selectedInterests]);

  return (
    <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-stone-100 dark:border-stone-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider bg-amber-500 text-stone-950">
              Krashen Learner-Driven Input
            </span>
            <span className="text-xs text-stone-400 font-bold hidden sm:inline">
              • Tailored to {selectedLevelFilter} Level
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-stone-900 dark:text-white flex items-center gap-2">
            <Compass className="w-6 h-6 text-amber-500" />
            <span>Recommended Immersion Feed</span>
          </h2>

          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
            Choose what interests you. Acquire natural Spanish grammar and vocabulary through self-selected comprehensible input.
          </p>
        </div>

        {/* Level Switcher */}
        <div className="flex items-center gap-1.5 bg-stone-100 dark:bg-stone-800/80 p-1 rounded-2xl border border-stone-200 dark:border-stone-700 self-start md:self-auto">
          {(['A1', 'A2', 'B1', 'B2'] as CEFRLevel[]).map(lvl => (
            <button
              key={lvl}
              onClick={() => {
                setSelectedLevelFilter(lvl);
                soundEffects.playPop();
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition cursor-pointer ${
                selectedLevelFilter === lvl
                  ? 'bg-amber-500 text-stone-950 font-black shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Interest Filter Badges */}
      <div className="space-y-2">
        <span className="text-[11px] font-extrabold text-stone-400 uppercase tracking-wider flex items-center gap-1">
          <Heart className="w-3.5 h-3.5 text-rose-500" />
          <span>Filter by Your Personal Interests:</span>
        </span>

        <div className="flex flex-wrap gap-2">
          {availableInterests.map(item => {
            const isSelected = selectedInterests.includes(item.id);
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => toggleInterest(item.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 border transition cursor-pointer ${
                  isSelected
                    ? 'bg-stone-900 text-amber-400 dark:bg-stone-800 dark:text-amber-300 border-stone-800 dark:border-stone-700 shadow-xs'
                    : 'bg-stone-50 dark:bg-stone-800/40 text-stone-500 dark:text-stone-400 border-stone-200 dark:border-stone-800 hover:border-amber-400'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
                {isSelected && <span className="text-[10px] text-emerald-400 font-bold">✓</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Recommended Content Cards */}
      {recommendations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {recommendations.slice(0, 6).map(item => {
            const estimatedMins = Math.ceil(item.wordCount / 100);

            return (
              <div
                key={item.id}
                className="bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/80 rounded-3xl p-5 hover:border-amber-500 dark:hover:border-amber-500/80 hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase bg-amber-500 text-stone-950">
                      {item.cefr}
                    </span>
                    <span className="text-[11px] font-bold text-stone-400 font-mono flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-400" />
                      ~{estimatedMins} min read ({item.wordCount} words)
                    </span>
                  </div>

                  <h3 className="text-base font-black text-stone-900 dark:text-white group-hover:text-amber-500 transition line-clamp-2">
                    {item.title}
                  </h3>

                  <p className="text-xs text-stone-600 dark:text-stone-300 line-clamp-3 leading-relaxed">
                    {item.content}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-200/80 dark:border-stone-700/80 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-stone-500 dark:text-stone-400">
                    {item.category}
                  </span>

                  <button
                    onClick={() => {
                      soundEffects.playLevelUp();
                      onOpenStory(item);
                    }}
                    className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs flex items-center gap-1.5 shadow-sm transition transform active:scale-95 cursor-pointer"
                  >
                    <span>Read in Karaoke Mode</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-8 text-center bg-stone-50 dark:bg-stone-800/40 border-2 border-dashed border-stone-200 dark:border-stone-800 rounded-3xl space-y-2">
          <p className="text-sm font-bold text-stone-600 dark:text-stone-300">
            No items found matching selected interests for {selectedLevelFilter}
          </p>
          <p className="text-xs text-stone-400">
            Try selecting more interest categories above or change the level filter.
          </p>
        </div>
      )}
    </div>
  );
};
