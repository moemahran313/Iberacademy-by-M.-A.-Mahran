import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Globe, Heart, Shield, BookOpen, Layers, Award, UserCheck } from 'lucide-react';
import { IberacademyLogo } from './IberacademyLogo';
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
  return (
    <footer className="w-full bg-stone-900 text-stone-300 border-t border-stone-800/80 mt-16 pb-24 md:pb-12 pt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Emblem & Philosophy */}
          <div className="space-y-3 md:col-span-1">
            <div 
              onClick={() => {
                soundEffects.playPop();
                setActiveTab('dashboard');
              }}
              className="flex items-center gap-2.5 cursor-pointer group w-fit"
            >
              <IberacademyLogo variant="icon" className="w-8 h-8 shadow-md" />
              <span className="font-black text-white text-base tracking-tight font-arabic">
                Iberacademy
              </span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed font-arabic">
              Implicit Spanish Acquisition & Comprehensible Input Engine powered by Dr. Stephen Krashen's i+1 hypotheses.
            </p>
            {userEmail && (
              <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 bg-emerald-950/60 border border-emerald-800/50 px-2.5 py-1 rounded-xl w-fit">
                <UserCheck className="w-3.5 h-3.5" />
                <span>Account: {userEmail}</span>
              </div>
            )}
          </div>

          {/* Quick Navigation Links */}
          <div className="space-y-2">
            <h4 className="text-xs font-black uppercase tracking-wider text-amber-400 font-arabic">
              Core Modules
            </h4>
            <ul className="space-y-1.5 text-xs text-stone-400 font-arabic">
              <li>
                <button 
                  onClick={() => setActiveTab('dashboard')} 
                  className="hover:text-amber-400 transition"
                >
                  Reading & Input Dashboard
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('stories')} 
                  className="hover:text-amber-400 transition"
                >
                  Interactive Krashen Reader
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('path')} 
                  className="hover:text-amber-400 transition"
                >
                  Curriculum Path ({currentLevel})
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('vocabulary')} 
                  className="hover:text-amber-400 transition"
                >
                  Frequency Vocabulary Vault
                </button>
              </li>
            </ul>
          </div>

          {/* Grammar & Media */}
          <div className="space-y-2">
            <h4 className="text-xs font-black uppercase tracking-wider text-amber-400 font-arabic">
              Learning Tools
            </h4>
            <ul className="space-y-1.5 text-xs text-stone-400 font-arabic">
              <li>
                <button 
                  onClick={() => setActiveTab('verbs')} 
                  className="hover:text-amber-400 transition"
                >
                  Verb Conjugation Matrix
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('grammar')} 
                  className="hover:text-amber-400 transition"
                >
                  Grammar Encyclopedia
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('videos')} 
                  className="hover:text-amber-400 transition"
                >
                  Curated YouTube Playlists
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('linglooper')} 
                  className="hover:text-amber-400 transition"
                >
                  AI Juan Conversation Partner
                </button>
              </li>
            </ul>
          </div>

          {/* Duolingo-Style CEFR Tier & Method Notice */}
          <div className="space-y-3 bg-stone-950/60 p-4 rounded-2xl border border-stone-800/80">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-black text-stone-200">Current Level: {currentLevel}</span>
            </div>
            <p className="text-[11px] text-stone-400 leading-snug">
              Synced with Firebase & Google Cloud. All reading progress, mined sentences, and LingQ vocabulary are preserved across devices.
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500 gap-3 font-arabic">
          <p>© {new Date().getFullYear()} Iberacademy. All rights reserved.</p>
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
