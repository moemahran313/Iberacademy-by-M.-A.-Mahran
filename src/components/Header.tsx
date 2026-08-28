import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Flame,
  Award,
  BookOpen,
  Compass,
  Layers,
  MessageSquare,
  GraduationCap,
  Video,
  Globe,
  Sun,
  Moon,
  Menu,
  X,
  ChevronRight,
  TrendingUp,
  Zap,
  LogOut,
  User as UserIcon,
  CheckCircle2
} from 'lucide-react';
import { UserProgress } from '../types';
import { IberacademyLogo } from './IberacademyLogo';
import { soundEffects } from '../utils/audio';
import { User } from 'firebase/auth';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userProgress: UserProgress;
  setUserProgress: React.Dispatch<React.SetStateAction<UserProgress>>;
  onOpenPlacementTest: () => void;
  authUser: User | null;
  onGoogleSignIn: () => void;
  onLogout: () => void;
  isAuthLoading?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  userProgress,
  setUserProgress,
  onOpenPlacementTest,
  authUser,
  onGoogleSignIn,
  onLogout,
  isAuthLoading = false
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navTabs = [
    { id: 'dashboard', label_en: 'Dashboard', label_ar: 'الرئيسية', icon: Compass, badge: 'Main' },
    { id: 'stories', label_en: 'Reader', label_ar: 'القارئ الذكي', icon: Sparkles, badge: 'Krashen' },
    { id: 'path', label_en: 'Curriculum Path', label_ar: 'مسار التعلم', icon: Layers },
    { id: 'vocabulary', label_en: 'Vocabulary', label_ar: 'المفردات', icon: BookOpen },
    { id: 'verbs', label_en: 'Verbs', label_ar: 'الأفعال', icon: TrendingUp },
    { id: 'grammar', label_en: 'Grammar', label_ar: 'القواعد', icon: GraduationCap },
    { id: 'linglooper', label_en: 'AI Chat', label_ar: 'الدردشة', icon: MessageSquare },
    { id: 'videos', label_en: 'Videos', label_ar: 'الدروس', icon: Video },
    { id: 'profile', label_en: 'Profile', label_ar: 'الحساب', icon: UserIcon }
  ];

  const mobileBottomTabs = [
    { id: 'dashboard', label_en: 'Dashboard', label_ar: 'الرئيسية', icon: Compass },
    { id: 'stories', label_en: 'Reader', label_ar: 'القارئ', icon: Sparkles },
    { id: 'path', label_en: 'Path', label_ar: 'المسار', icon: Layers },
    { id: 'linglooper', label_en: 'Chat', label_ar: 'دردشة', icon: MessageSquare },
    { id: 'profile', label_en: 'Profile', label_ar: 'الحساب', icon: UserIcon }
  ];

  const handleLanguageToggle = () => {
    soundEffects.playPop();
    setUserProgress(prev => {
      const nextLang =
        prev.settings.nativeLanguage === 'bilingual'
          ? 'ar'
          : prev.settings.nativeLanguage === 'ar'
          ? 'en'
          : 'bilingual';
      return {
        ...prev,
        settings: { ...prev.settings, nativeLanguage: nextLang }
      };
    });
  };

  const handleThemeToggle = () => {
    soundEffects.playPop();
    setUserProgress(prev => {
      const nextTheme = prev.settings.theme === 'dark' ? 'light' : 'dark';
      return {
        ...prev,
        settings: { ...prev.settings, theme: nextTheme }
      };
    });
  };

  const getLanguageLabel = () => {
    if (userProgress.settings.nativeLanguage === 'bilingual') return 'EN + عربي';
    if (userProgress.settings.nativeLanguage === 'ar') return 'عربي';
    return 'EN';
  };

  const isDarkMode = userProgress.settings.theme === 'dark';

  return (
    <>
      {/* World-Class Minimalist Duolingo-Style Header */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-stone-950/90 backdrop-blur-xl border-b border-stone-200/80 dark:border-stone-800/80 text-stone-900 dark:text-stone-100 shadow-xs transition-all duration-300">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 gap-2">
            
            {/* Minimalist Emblem / Logo Icon (No text title spam on PC/Tablet/Mobile) */}
            <button
              onClick={() => {
                soundEffects.playPop();
                setActiveTab('landing');
              }}
              className="flex items-center gap-2 cursor-pointer select-none group focus:outline-none shrink-0"
              title="Iberacademy Home / Landing Page"
            >
              <div className="relative flex items-center gap-1.5">
                <IberacademyLogo variant="icon" className="w-8 h-8 sm:w-9 sm:h-9 transition-transform group-hover:scale-105" />
                <span className="text-[10px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 font-mono">
                  {userProgress.currentLevel}
                </span>
              </div>
            </button>

            {/* Desktop & Tablet Navigation Links - Minimalist Pill Bar */}
            <nav className="hidden md:flex items-center space-x-1 py-1" aria-label="Desktop Navigation">
              {navTabs.map(tab => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      soundEffects.playPop();
                      if (!authUser) {
                        onGoogleSignIn();
                      } else {
                        setActiveTab(tab.id);
                      }
                    }}
                    className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'text-stone-950 font-extrabold bg-amber-500 shadow-sm'
                        : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-900'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-stone-950' : 'text-stone-400'}`} />
                    <span className="font-arabic tracking-tight">
                      {userProgress.settings.nativeLanguage === 'ar' ? tab.label_ar : tab.label_en}
                    </span>
                  </button>
                );
              })}
            </nav>

            {/* Duolingo-Style Stats Header Bar & Account Profile */}
            <div className="flex items-center gap-1.5 sm:gap-2.5">
              
              {/* Streak Pill (Duolingo Style) */}
              <div 
                className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-600 dark:text-orange-400 text-xs font-black shadow-2xs"
                title="Current Streak Days"
              >
                <Flame className="w-4 h-4 text-orange-500 fill-orange-500 animate-pulse" />
                <span className="font-mono text-xs">{userProgress.streakDays}d</span>
              </div>

              {/* XP Pill (Duolingo Style) */}
              <div 
                className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400 text-xs font-black shadow-2xs"
                title="Total XP Earned"
              >
                <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span className="font-mono text-xs">{userProgress.xp} XP</span>
              </div>

              {/* Level Assessment Badge */}
              <button
                onClick={() => {
                  soundEffects.playPop();
                  onOpenPlacementTest();
                }}
                className="hidden xs:flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-black hover:bg-emerald-500/20 transition cursor-pointer"
                title="Take Placement Test"
              >
                <Award className="w-3.5 h-3.5 text-emerald-500" />
                <span>{userProgress.currentLevel}</span>
              </button>

              {/* Language & Theme Controls */}
              <button
                onClick={handleLanguageToggle}
                className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-full bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs font-bold text-stone-700 dark:text-stone-300 hover:bg-stone-200 transition"
                title="Language Toggle"
              >
                <Globe className="w-3.5 h-3.5 text-sky-500" />
                <span className="text-[11px]">{getLanguageLabel()}</span>
              </button>

              <button
                onClick={handleThemeToggle}
                className="p-1.5 rounded-full bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 transition"
                aria-label="Toggle Theme"
              >
                {isDarkMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-indigo-400" />}
              </button>

              {/* Google Account Profile Button / Firebase Auth Integration */}
              <div className="relative" ref={profileDropdownRef}>
                {authUser ? (
                  <button
                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                    className="flex items-center gap-1.5 p-0.5 rounded-full border-2 border-emerald-500/60 hover:border-emerald-500 transition cursor-pointer"
                    title="User Account Menu"
                  >
                    {authUser.photoURL ? (
                      <img
                        src={authUser.photoURL}
                        alt={authUser.displayName || 'User Profile'}
                        className="w-7 h-7 rounded-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-emerald-500 text-stone-950 flex items-center justify-center font-black text-xs">
                        {authUser.displayName?.[0] || 'U'}
                      </div>
                    )}
                  </button>
                ) : (
                  <button
                    onClick={onGoogleSignIn}
                    disabled={isAuthLoading}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-black hover:opacity-90 transition cursor-pointer shadow-xs disabled:opacity-50"
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                    <span className="hidden xs:inline">Sign In</span>
                  </button>
                )}

                {/* Profile Dropdown Menu */}
                <AnimatePresence>
                  {isProfileDropdownOpen && authUser && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -5 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -5 }}
                      className="absolute right-0 mt-2 w-64 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-2xl p-4 z-50 space-y-3"
                    >
                      <div className="flex items-center gap-3 pb-3 border-b border-stone-200 dark:border-stone-800">
                        {authUser.photoURL ? (
                          <img
                            src={authUser.photoURL}
                            alt="User Profile"
                            className="w-10 h-10 rounded-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-emerald-500 text-stone-950 flex items-center justify-center font-black text-sm">
                            {authUser.displayName?.[0] || 'U'}
                          </div>
                        )}
                        <div className="overflow-hidden">
                          <p className="font-extrabold text-xs text-stone-900 dark:text-white truncate">
                            {authUser.displayName || 'Google User'}
                          </p>
                          <p className="text-[10px] text-stone-500 dark:text-stone-400 truncate">
                            {authUser.email}
                          </p>
                          <span className="inline-flex items-center gap-1 text-[9px] font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
                            <CheckCircle2 className="w-3 h-3" /> Firebase Synced
                          </span>
                        </div>
                      </div>

                      <div className="space-y-1.5 text-xs text-stone-600 dark:text-stone-300">
                        <div className="flex justify-between py-1 px-2 rounded-lg bg-stone-50 dark:bg-stone-800/60 font-mono">
                          <span>Streak:</span>
                          <span className="font-black text-orange-500">{userProgress.streakDays} days 🔥</span>
                        </div>
                        <div className="flex justify-between py-1 px-2 rounded-lg bg-stone-50 dark:bg-stone-800/60 font-mono">
                          <span>Total XP:</span>
                          <span className="font-black text-amber-500">{userProgress.xp} XP ⚡</span>
                        </div>
                        <div className="flex justify-between py-1 px-2 rounded-lg bg-stone-50 dark:bg-stone-800/60 font-mono">
                          <span>Level:</span>
                          <span className="font-black text-emerald-500">{userProgress.currentLevel} 🏆</span>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setIsProfileDropdownOpen(false);
                          setActiveTab('profile');
                        }}
                        className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-amber-500 text-stone-950 text-xs font-black hover:bg-amber-400 transition cursor-pointer shadow-xs"
                      >
                        <UserIcon className="w-3.5 h-3.5" />
                        <span>View Profile & Settings</span>
                      </button>

                      <button
                        onClick={() => {
                          setIsProfileDropdownOpen(false);
                          onLogout();
                        }}
                        className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-red-500/10 hover:bg-red-500 text-red-600 hover:text-white text-xs font-black transition cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile Drawer Navigation Toggle Button */}
              <button
                onClick={() => {
                  soundEffects.playPop();
                  setIsMobileMenuOpen(!isMobileMenuOpen);
                }}
                className="md:hidden p-1.5 rounded-full bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-200"
                aria-label="Toggle Navigation"
              >
                {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-0 top-14 z-50 bg-white/95 dark:bg-stone-950/95 backdrop-blur-2xl p-4 overflow-y-auto space-y-4 md:hidden border-t border-stone-200 dark:border-stone-800"
          >
            <div className="grid grid-cols-1 gap-2">
              {navTabs.map(tab => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      soundEffects.playPop();
                      if (!authUser) {
                        onGoogleSignIn();
                      } else {
                        setActiveTab(tab.id);
                      }
                      setIsMobileMenuOpen(false);
                    }}
                    className={`flex items-center justify-between p-3 rounded-2xl text-xs font-black transition border ${
                      isActive
                        ? 'bg-amber-500 text-stone-950 border-amber-400 shadow-sm'
                        : 'bg-stone-50 dark:bg-stone-900 text-stone-800 dark:text-stone-200 border-stone-200 dark:border-stone-800'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 text-amber-500" />
                      <span className="font-arabic">{tab.label_en} ({tab.label_ar})</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-stone-400" />
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Bottom Navigation Bar for Mobile Phones */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white/95 dark:bg-stone-950/95 backdrop-blur-xl border-t border-stone-200/80 dark:border-stone-800/80 px-2 py-1.5 shadow-2xl">
        <div className="flex items-center justify-around max-w-md mx-auto">
          {mobileBottomTabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => {
                  soundEffects.playPop();
                  if (!authUser) {
                    onGoogleSignIn();
                  } else {
                    setActiveTab(tab.id);
                  }
                }}
                className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition cursor-pointer ${
                  isActive
                    ? 'text-amber-600 dark:text-amber-400 font-extrabold'
                    : 'text-stone-500 dark:text-stone-400'
                }`}
              >
                <div className={`p-1 rounded-lg ${isActive ? 'bg-amber-500 text-stone-950 scale-110 shadow-xs' : ''}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold mt-0.5 font-arabic tracking-tight whitespace-nowrap">
                  {userProgress.settings.nativeLanguage === 'ar' ? tab.label_ar : tab.label_en}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};
