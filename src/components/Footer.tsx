import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Globe, Heart, Shield, BookOpen, Layers, Award, UserCheck } from 'lucide-react';
import { IberioLogo, AztecBirdMascot } from './IberacademyLogo';
import { soundEffects } from '../utils/audio';

interface FooterProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentLevel: string;
  userEmail?: string | null;
  userName?: string | null;
}

export const Footer: React.FC<FooterProps> = ({
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
    <footer className="w-full bg-stone-900 text-stone-300 border-t border-stone-800/80 mt-16 pb-24 md:pb-12 pt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Emblem & Philosophy */}
          <div className="space-y-3 md:col-span-1">
            <div 
              onClick={() => handleFooterClick('dashboard')}
              className="flex items-center gap-3 cursor-pointer group w-fit"
            >
              <AztecBirdMascot size={36} interactive={true} showAura={false} />
              <div>
                <span className="font-black text-white text-base tracking-tight font-header block leading-none">
                  Iberio
                </span>
                <span className="text-[9px] font-mono uppercase text-orange-400 font-bold tracking-widest">
                  Cuauhtli Immersion
                </span>
              </div>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              Implicit Spanish Acquisition & Comprehensible Input Engine powered by Dr. Stephen Krashen's i+1 hypotheses.
            </p>
            {userEmail && (
              <div className="flex items-center gap-1.5 text-[11px] text-amber-400 bg-amber-950/60 border border-amber-800/50 px-2.5 py-1 rounded-xl w-fit">
                <UserCheck className="w-3.5 h-3.5" />
                <span>Account: {userEmail}</span>
              </div>
            )}
          </div>

          {/* Quick Navigation Links */}
          <div className="space-y-2">
            <h4 className="text-xs font-black uppercase tracking-wider text-amber-400">
              Core Modules
            </h4>
            <ul className="space-y-1.5 text-xs text-stone-400">
              <li>
                <button 
                  onClick={() => handleFooterClick('dashboard')} 
                  className="hover:text-amber-400 transition cursor-pointer"
                >
                  Reading & Input Dashboard
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleFooterClick('stories')} 
                  className="hover:text-amber-400 transition cursor-pointer"
                >
                  Interactive Krashen Reader
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleFooterClick('path')} 
                  className="hover:text-amber-400 transition cursor-pointer"
                >
                  Curriculum Path ({currentLevel})
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleFooterClick('vocabulary')} 
                  className="hover:text-amber-400 transition cursor-pointer"
                >
                  Frequency Vocabulary Vault
                </button>
              </li>
            </ul>
          </div>

          {/* Grammar & Media */}
          <div className="space-y-2">
            <h4 className="text-xs font-black uppercase tracking-wider text-amber-400">
              Learning Tools
            </h4>
            <ul className="space-y-1.5 text-xs text-stone-400">
              <li>
                <button 
                  onClick={() => handleFooterClick('verbs')} 
                  className="hover:text-amber-400 transition cursor-pointer"
                >
                  Verb Conjugation Matrix
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleFooterClick('grammar')} 
                  className="hover:text-amber-400 transition cursor-pointer"
                >
                  Grammar Encyclopedia
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleFooterClick('videos')} 
                  className="hover:text-amber-400 transition cursor-pointer"
                >
                  Curated YouTube Playlists
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleFooterClick('linglooper')} 
                  className="hover:text-amber-400 transition cursor-pointer"
                >
                  AI Juan Conversation Partner
                </button>
              </li>
            </ul>
          </div>

          {/* CEFR Tier & Method Notice */}
          <div className="space-y-3 bg-stone-950/60 p-4 rounded-2xl border border-stone-800/80">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-black text-stone-200">Current Level: {currentLevel}</span>
            </div>
            <p className="text-[11px] text-stone-400 leading-snug">
              Synced with Firebase & Google Cloud. All reading progress, mined sentences, and vocabulary are preserved across devices.
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500 gap-3">
          <p>© {new Date().getFullYear()} Iberio. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              Made with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> by M. Mahran
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
