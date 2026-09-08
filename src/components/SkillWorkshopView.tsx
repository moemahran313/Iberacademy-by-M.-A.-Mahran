import React from 'react';
import { motion } from 'motion/react';
import {
  BookOpen,
  TrendingUp,
  GraduationCap,
  Mic,
  MessageSquare,
  Trophy,
  Zap,
  Video,
  ArrowRight,
  Layers,
  Sparkles
} from 'lucide-react';
import { UserProgress } from '../types';
import { soundEffects } from '../utils/audio';

interface SkillWorkshopViewProps {
  userProgress: UserProgress;
  setUserProgress: React.Dispatch<React.SetStateAction<UserProgress>>;
  setActiveTab: (tab: string) => void;
}

export const SkillWorkshopView: React.FC<SkillWorkshopViewProps> = ({
  userProgress,
  setUserProgress,
  setActiveTab
}) => {
  const tools = [
    {
      id: 'vocabulary',
      title: 'SRS Vocabulary Deck',
      subtitle: 'Spaced Repetition Memory Engine',
      description: 'Review saved words and build long-term retention using intelligent spaced repetition algorithms.',
      icon: BookOpen,
      badge: 'Core Tool',
      color: 'from-amber-500/20 to-amber-600/10 text-amber-600 dark:text-amber-400 border-amber-500/30'
    },
    {
      id: 'verbs',
      title: 'Verb Conjugator Matrix',
      subtitle: 'All Tenses & Moods',
      description: 'Master regular and irregular Spanish verb forms with interactive drill tables and audio pronunciation.',
      icon: TrendingUp,
      badge: 'Drills',
      color: 'from-blue-500/20 to-blue-600/10 text-blue-600 dark:text-blue-400 border-blue-500/30'
    },
    {
      id: 'grammar',
      title: 'Grammar Encyclopedia',
      subtitle: 'Rule Blueprints & SLA Diagnostics',
      description: 'Structured index of Spanish grammar concepts from A1 basics to C2 subjunctive nuances.',
      icon: GraduationCap,
      badge: 'Reference',
      color: 'from-purple-500/20 to-purple-600/10 text-purple-600 dark:text-purple-400 border-purple-500/30'
    },
    {
      id: 'shadowing',
      title: 'Oral Shadowing Studio',
      subtitle: 'Native Speech Cadence & Pitch',
      description: 'Practice speaking aloud with 3-stage audio mirroring to refine your cadence and accent.',
      icon: Mic,
      badge: 'Speaking',
      color: 'from-emerald-500/20 to-emerald-600/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
    },
    {
      id: 'tutor',
      title: 'AI Native Tutor Chat',
      subtitle: 'Interactive Conversation Roleplay',
      description: 'Chat in Spanish with adaptive feedback, instant corrections, and scenario roleplays.',
      icon: MessageSquare,
      badge: 'Conversational AI',
      color: 'from-rose-500/20 to-rose-600/10 text-rose-600 dark:text-rose-400 border-rose-500/30'
    },
    {
      id: 'linglooper',
      title: 'LingLooper Scenario Game',
      subtitle: 'Gamified Conversational Immersion',
      description: 'Interactive choice-based dialogue scenarios in real-world Spanish contexts.',
      icon: Trophy,
      badge: 'Gamified',
      color: 'from-indigo-500/20 to-indigo-600/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/30'
    },
    {
      id: 'a0_foundation',
      title: 'A0 Beginner Scaffolding',
      subtitle: 'Absolute Beginner Micro-Units',
      description: '25 structured micro-guided units for zero-level Spanish learners building foundation.',
      icon: Zap,
      badge: 'Beginners',
      color: 'from-cyan-500/20 to-cyan-600/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/30'
    },
    {
      id: 'videos',
      title: 'Interactive Video Courses',
      subtitle: 'Native Video Immersion',
      description: 'Learn through authentic video clips with dual-language subtitles and interactive quizzes.',
      icon: Video,
      badge: 'Media',
      color: 'from-orange-500/20 to-orange-600/10 text-orange-600 dark:text-orange-400 border-orange-500/30'
    }
  ];

  const handleOpenTool = (toolId: string) => {
    soundEffects.playPop();
    setActiveTab(toolId);
    window.scrollTo(0, 0);
  };

  return (
    <div className="space-y-8 pb-16 max-w-7xl mx-auto px-4 sm:px-6">
      {/* Workshop Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold border border-amber-500/20">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Practice & Skill Workshop</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-stone-900 dark:text-white tracking-tight">
          Focused Learning Tools
        </h1>
        <p className="text-sm text-stone-600 dark:text-stone-400 max-w-2xl">
          Select any specialized tool to target specific language skills—from spaced memory review to oral shadowing and AI conversation drills.
        </p>
      </div>

      {/* Grid of Workshop Tools */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {tools.map(tool => {
          const Icon = tool.icon;
          return (
            <motion.div
              key={tool.id}
              whileHover={{ y: -4 }}
              onClick={() => handleOpenTool(tool.id)}
              className="group p-6 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-2xl bg-gradient-to-br border ${tool.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400">
                    {tool.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-black text-stone-900 dark:text-white group-hover:text-amber-500 transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-xs font-bold text-amber-600 dark:text-amber-400 mt-0.5">
                    {tool.subtitle}
                  </p>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-2 line-clamp-2 leading-relaxed">
                    {tool.description}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs font-extrabold text-stone-700 dark:text-stone-300 group-hover:text-amber-500 transition-colors">
                <span>Launch Tool</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
