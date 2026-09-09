import React from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  Globe,
  Heart,
  Shield,
  BookOpen,
  Layers,
  Award,
  UserCheck,
  Zap,
  GraduationCap,
  MessageSquare,
  Mic,
  Video,
  Target,
  Compass,
  ArrowUpRight,
  HelpCircle,
  Database
} from 'lucide-react';
import { IberioLogo, AztecBirdMascot } from './IberacademyLogo';
import { soundEffects } from '../utils/audio';

interface FooterProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentLevel: string;
  userEmail?: string | null;
  userName?: string | null;
}

const FooterComponent: React.FC<FooterProps> = ({
  activeTab,
  setActiveTab,
  currentLevel,
  userEmail,
  userName,
}) => {
  const handleFooterClick = (tabId: string) => {
    soundEffects.playPop();
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-stone-950 text-stone-300 border-t border-stone-800/80 mt-20 pb-28 md:pb-12 pt-14 pb-safe relative overflow-hidden">
      {/* Subtle Iberian Ambient Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-600/5 rounded-full blur-3xl pointer-events-none translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Column 1: Brand Emblem & SLA Philosophy */}
          <div className="space-y-4">
            <div 
              onClick={() => handleFooterClick('dashboard')}
              className="flex items-center gap-3 cursor-pointer group w-fit"
            >
              <AztecBirdMascot size={40} interactive={true} showAura={false} />
              <div>
                <span className="font-black text-white text-lg tracking-tight font-header block leading-none group-hover:text-amber-400 transition-colors">
                  Iberio
                </span>
                <span className="text-[9px] font-mono uppercase text-amber-500 font-black tracking-widest">
                  Cuauhtli Immersion
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed">
              Implicit Spanish Acquisition & Comprehensible Input Engine powered by Dr. Stephen Krashen's i+1 hypothesis and cognitive Second Language Acquisition (SLA) science.
            </p>

            <div className="pt-1 space-y-2">
              {userEmail ? (
                <div className="flex items-center gap-2 text-[11px] text-amber-400 bg-amber-950/40 border border-amber-800/40 px-3 py-1.5 rounded-xl w-fit">
                  <UserCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="truncate max-w-[180px] font-mono">{userEmail}</span>
                </div>
              ) : (
                <button
                  onClick={() => handleFooterClick('profile')}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 px-3 py-1.5 rounded-xl transition cursor-pointer"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Sync Cloud Account</span>
                </button>
              )}
              <div className="flex items-center gap-2 text-[10px] text-stone-500 font-mono">
                <Database className="w-3 h-3 text-emerald-500" />
                <span>Firestore Cloud Sync Active</span>
              </div>
            </div>
          </div>

          {/* Column 2: Core Learning Hubs */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-400 font-mono">
              <Compass className="w-4 h-4" />
              <span>Core Learning Hubs</span>
            </div>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button 
                  onClick={() => handleFooterClick('dashboard')} 
                  className={`hover:text-amber-400 transition cursor-pointer flex items-center justify-between w-full text-left ${
                    activeTab === 'dashboard' ? 'text-amber-400 font-bold' : ''
                  }`}
                >
                  <span>Reading & Daily Input</span>
                  <span className="text-[10px] text-stone-600 font-mono">Today</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleFooterClick('stories')} 
                  className={`hover:text-amber-400 transition cursor-pointer flex items-center justify-between w-full text-left ${
                    activeTab === 'stories' ? 'text-amber-400 font-bold' : ''
                  }`}
                >
                  <span>Interactive Krashen Reader</span>
                  <span className="text-[10px] text-amber-500/80 font-mono">Stories</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleFooterClick('videos')} 
                  className={`hover:text-amber-400 transition cursor-pointer flex items-center justify-between w-full text-left ${
                    activeTab === 'videos' ? 'text-amber-400 font-bold' : ''
                  }`}
                >
                  <span>Curated Immersion Videos</span>
                  <span className="text-[10px] text-stone-600 font-mono">Media</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleFooterClick('path')} 
                  className={`hover:text-amber-400 transition cursor-pointer flex items-center justify-between w-full text-left ${
                    activeTab === 'path' ? 'text-amber-400 font-bold' : ''
                  }`}
                >
                  <span>CEFR Structured Roadmap</span>
                  <span className="text-[10px] text-amber-500/80 font-mono">{currentLevel}</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleFooterClick('a0_foundation')} 
                  className={`hover:text-amber-400 transition cursor-pointer flex items-center justify-between w-full text-left ${
                    activeTab === 'a0_foundation' ? 'text-amber-400 font-bold' : ''
                  }`}
                >
                  <span>A0 Beginner Scaffolding</span>
                  <span className="text-[10px] text-emerald-500 font-mono">Zero</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleFooterClick('vocabulary')} 
                  className={`hover:text-amber-400 transition cursor-pointer flex items-center justify-between w-full text-left ${
                    activeTab === 'vocabulary' ? 'text-amber-400 font-bold' : ''
                  }`}
                >
                  <span>Frequency Vocabulary Vault</span>
                  <span className="text-[10px] text-stone-600 font-mono">SRS</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Workshop & Skill Tools */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-400 font-mono">
              <GraduationCap className="w-4 h-4" />
              <span>Workshop & Skill Tools</span>
            </div>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <button 
                  onClick={() => handleFooterClick('verbs')} 
                  className={`hover:text-amber-400 transition cursor-pointer flex items-center justify-between w-full text-left ${
                    activeTab === 'verbs' ? 'text-amber-400 font-bold' : ''
                  }`}
                >
                  <span>Verb Conjugation Matrix</span>
                  <span className="text-[10px] text-stone-600 font-mono">600+ Verbs</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleFooterClick('grammar')} 
                  className={`hover:text-amber-400 transition cursor-pointer flex items-center justify-between w-full text-left ${
                    activeTab === 'grammar' ? 'text-amber-400 font-bold' : ''
                  }`}
                >
                  <span>Progressive Grammar Vault</span>
                  <span className="text-[10px] text-amber-500/80 font-mono">SLA Blueprint</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleFooterClick('tutor')} 
                  className={`hover:text-amber-400 transition cursor-pointer flex items-center justify-between w-full text-left ${
                    activeTab === 'tutor' ? 'text-amber-400 font-bold' : ''
                  }`}
                >
                  <span>AI Juan Conversation Partner</span>
                  <span className="text-[10px] text-purple-400 font-mono">AI Native</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleFooterClick('shadowing')} 
                  className={`hover:text-amber-400 transition cursor-pointer flex items-center justify-between w-full text-left ${
                    activeTab === 'shadowing' ? 'text-amber-400 font-bold' : ''
                  }`}
                >
                  <span>Oral Shadowing Studio</span>
                  <span className="text-[10px] text-stone-600 font-mono">Speech</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleFooterClick('linglooper')} 
                  className={`hover:text-amber-400 transition cursor-pointer flex items-center justify-between w-full text-left ${
                    activeTab === 'linglooper' ? 'text-amber-400 font-bold' : ''
                  }`}
                >
                  <span>LingLooper Practice Game</span>
                  <span className="text-[10px] text-stone-600 font-mono">Roleplay</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleFooterClick('planner')} 
                  className={`hover:text-amber-400 transition cursor-pointer flex items-center justify-between w-full text-left ${
                    activeTab === 'planner' ? 'text-amber-400 font-bold' : ''
                  }`}
                >
                  <span>Curriculum Planner</span>
                  <span className="text-[10px] text-stone-600 font-mono">Diagnostic</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Account, Level & Diagnostics */}
          <div className="space-y-4">
            <div className="bg-stone-900/90 p-4 rounded-2xl border border-stone-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-black text-stone-200">Current Level</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-amber-500 text-stone-950 text-[10px] font-mono font-black">
                  {currentLevel}
                </span>
              </div>
              <p className="text-[11px] text-stone-400 leading-relaxed">
                Adaptive SLA progression tailored to your reading quota and active recall vocabulary bank.
              </p>
              <button
                onClick={() => handleFooterClick('path')}
                className="w-full py-1.5 px-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold transition cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>CEFR Placement Diagnostic</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-amber-400" />
              </button>
            </div>

            <div className="space-y-1.5 text-xs text-stone-400">
              <button
                onClick={() => handleFooterClick('profile')}
                className="hover:text-amber-400 transition cursor-pointer flex items-center justify-between w-full text-left"
              >
                <span>Profile & Spaced Repetition Stats</span>
                <span className="text-[10px] text-stone-600 font-mono">→</span>
              </button>
              <p className="text-[10px] text-stone-500 pt-1 leading-snug">
                Designed with Progressive Unveiling: concise initial context with expandable deep dives for complete mastery.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Build Bar */}
        <div className="pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500 gap-4">
          <div className="flex items-center gap-2">
            <span className="font-mono text-stone-400">© {new Date().getFullYear()} Iberio</span>
            <span>•</span>
            <span>Natural Acquisition Engine</span>
          </div>
          
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleFooterClick('grammar')}
              className="hover:text-stone-400 transition cursor-pointer"
            >
              Grammar Vault
            </button>
            <button
              onClick={() => handleFooterClick('stories')}
              className="hover:text-stone-400 transition cursor-pointer"
            >
              Krashen Reader
            </button>
            <span className="flex items-center gap-1 text-stone-400">
              Made with <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> by M. Mahran
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export const Footer = React.memo(FooterComponent);

