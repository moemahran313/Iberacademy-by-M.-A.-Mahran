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
  ChevronDown,
  TrendingUp,
  Zap,
  LogOut,
  User as UserIcon,
  CheckCircle2,
  Target,
  Trophy
} from 'lucide-react';
import { UserProgress } from '../types';
import { IberioLogo } from './IberacademyLogo';
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
  const [openDropdown, setOpenDropdown] = useState<'learn' | 'practice' | null>(null);

  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const navDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
      if (navDropdownRef.current && !navDropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const learnItems = [
    { id: 'dashboard', label_en: 'Dashboard', label_ar: 'الرئيسية', icon: Compass, desc: 'Overview & Daily Goals' },
    { id: 'planner', label_en: 'Curriculum Planner', label_ar: 'المخطط', icon: Target, desc: 'AI Milestones & Weaknesses' },
    { id: 'stories', label_en: 'Reader & Stories', label_ar: 'القارئ الذكي', icon: Sparkles, desc: 'Comprehensible Input' },
    { id: 'path', label_en: 'Learning Path', label_ar: 'مسار التعلم', icon: Layers, desc: 'CEFR Roadmap' }
  ];

  const practiceItems = [
    { id: 'linglooper', label_en: 'AI Tutor Chat', label_ar: 'الدردشة', icon: MessageSquare, desc: 'Interactive Role-Play' },
    { id: 'vocabulary', label_en: 'SRS Vocabulary', label_ar: 'المفردات', icon: BookOpen, desc: 'Flashcards & Spaced Repetition' },
    { id: 'verbs', label_en: 'Verb Conjugator', label_ar: 'الأفعال', icon: TrendingUp, desc: 'Conjugations & Drills' },
    { id: 'grammar', label_en: 'Grammar Encyclopedia', label_ar: 'القواعد', icon: GraduationCap, desc: 'Comprehensive Rules' },
    { id: 'videos', label_en: 'Video Lessons', label_ar: 'الدروس', icon: Video, desc: 'Interactive Video Input' }
  ];

  const allNavItems = [...learnItems, ...practiceItems, 
    { id: 'profile', label_en: 'Profile', label_ar: 'الحساب', icon: UserIcon, desc: 'Account Settings' }
  ];

  const mobileBottomTabs = [
    { id: 'dashboard', label_en: 'Dashboard', label_ar: 'الرئيسية', icon: Compass },
    { id: 'planner', label_en: 'Planner', label_ar: 'المخطط', icon: Target },
    { id: 'stories', label_en: 'Reader', label_ar: 'القارئ', icon: Sparkles },
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
  const isLearnActive = learnItems.some(i => i.id === activeTab);
  const isPracticeActive = practiceItems.some(i => i.id === activeTab);

  return (
    <>
      {/* Streamlined Premium Header */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-stone-950/95 backdrop-blur-xl border-b border-stone-200/80 dark:border-stone-800/80 text-stone-900 dark:text-stone-100 shadow-xs transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 gap-3">
            
            {/* Logo & Level Tag */}
            <button
              onClick={() => {
                soundEffects.playPop();
                if (authUser) {
                  setActiveTab('dashboard');
                } else {
                  setActiveTab('landing');
                }
              }}
              className="flex items-center gap-2 cursor-pointer select-none group focus:outline-none shrink-0"
              title="Iberio Dashboard"
            >
              <IberioLogo variant="full" showSubtitle={false} className="h-8" />
              <span className="hidden sm:inline-flex text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 font-mono">
                {userProgress.currentLevel}
              </span>
            </button>

            {/* Streamlined Desktop Navigation Bar (4 Primary Views) */}
            <nav className="hidden md:flex items-center space-x-1.5" ref={navDropdownRef} aria-label="Desktop Navigation">
              {/* 1. Learn Dropdown */}
              <div className="relative">
                <button
                  onClick={() => {
                    soundEffects.playPop();
                    setOpenDropdown(openDropdown === 'learn' ? null : 'learn');
                  }}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    isLearnActive
                      ? 'bg-amber-500 text-stone-950 font-extrabold shadow-2xs'
                      : 'text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-900'
                  }`}
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>Learn</span>
                  <ChevronDown className={`w-3 h-3 transition-transform ${openDropdown === 'learn' ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {openDropdown === 'learn' && (
                    <motion.div
                      initial={{ opacity: 0, y: 5, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 5, scale: 0.98 }}
                      className="absolute left-0 mt-2 w-64 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-xl p-2 z-50 space-y-1"
                    >
                      {learnItems.map(item => {
                        const Icon = item.icon;
                        const isActive = activeTab === item.id;
                        return (
                          <button
                            key={item.id}
                            onClick={() => {
                              soundEffects.playPop();
                              setActiveTab(item.id);
                              setOpenDropdown(null);
                            }}
                            className={`w-full flex items-start gap-3 p-2.5 rounded-xl transition text-left cursor-pointer ${
                              isActive
                                ? 'bg-amber-500/15 text-amber-700 dark:text-amber-400 font-bold'
                                : 'hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200'
                            }`}
                          >
                            <div className="p-1.5 rounded-lg bg-stone-100 dark:bg-stone-800 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5">
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-xs font-extrabold flex items-center gap-1.5">
                                {userProgress.settings.nativeLanguage === 'ar' ? item.label_ar : item.label_en}
                              </div>
                              <div className="text-[10px] text-stone-500 dark:text-stone-400 font-normal">
                                {item.desc}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* 2. Practice Dropdown */}
              <div className="relative">
                <button
                  onClick={() => {
                    soundEffects.playPop();
                    setOpenDropdown(openDropdown === 'practice' ? null : 'practice');
                  }}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    isPracticeActive
                      ? 'bg-amber-500 text-stone-950 font-extrabold shadow-2xs'
                      : 'text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-900'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Practice</span>
                  <ChevronDown className={`w-3 h-3 transition-transform ${openDropdown === 'practice' ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {openDropdown === 'practice' && (
                    <motion.div
                      initial={{ opacity: 0, y: 5, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 5, scale: 0.98 }}
                      className="absolute left-0 mt-2 w-64 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-xl p-2 z-50 space-y-1"
                    >
                      {practiceItems.map(item => {
                        const Icon = item.icon;
                        const isActive = activeTab === item.id;
                        return (
                          <button
                            key={item.id}
                            onClick={() => {
                              soundEffects.playPop();
                              setActiveTab(item.id);
                              setOpenDropdown(null);
                            }}
                            className={`w-full flex items-start gap-3 p-2.5 rounded-xl transition text-left cursor-pointer ${
                              isActive
                                ? 'bg-amber-500/15 text-amber-700 dark:text-amber-400 font-bold'
                                : 'hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-800 dark:text-stone-200'
                            }`}
                          >
                            <div className="p-1.5 rounded-lg bg-stone-100 dark:bg-stone-800 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5">
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-xs font-extrabold">
                                {userProgress.settings.nativeLanguage === 'ar' ? item.label_ar : item.label_en}
                              </div>
                              <div className="text-[10px] text-stone-500 dark:text-stone-400 font-normal">
                                {item.desc}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* 3. Progress Direct Tab */}
              <button
                onClick={() => {
                  soundEffects.playPop();
                  setActiveTab('planner');
                }}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'planner'
                    ? 'bg-amber-500 text-stone-950 font-extrabold shadow-2xs'
                    : 'text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-900'
                }`}
              >
                <Target className="w-3.5 h-3.5" />
                <span>Progress</span>
              </button>

              {/* 4. Profile Direct Tab */}
              <button
                onClick={() => {
                  soundEffects.playPop();
                  setActiveTab('profile');
                }}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'profile'
                    ? 'bg-amber-500 text-stone-950 font-extrabold shadow-2xs'
                    : 'text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-900'
                }`}
              >
                <UserIcon className="w-3.5 h-3.5" />
                <span>Profile</span>
              </button>
            </nav>

            {/* Streak, XP & Controls */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              
              {/* Streak Pill */}
              <div 
                className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-600 dark:text-orange-400 text-xs font-black shadow-2xs"
                title="Current Streak Days"
              >
                <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
                <span className="font-mono text-xs">{userProgress.streakDays}d</span>
              </div>

              {/* XP Pill */}
              <div 
                className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400 text-xs font-black shadow-2xs"
                title="Total XP Earned"
              >
                <Zap className="w-3 h-3 text-amber-500 fill-amber-500" />
                <span className="font-mono text-xs">{userProgress.xp} XP</span>
              </div>

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

              {/* Google Account Profile Menu */}
              <div className="relative" ref={profileDropdownRef}>
                {authUser ? (
                  <button
                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                    className="flex items-center gap-1.5 p-0.5 rounded-full border-2 border-amber-500/60 hover:border-amber-500 transition cursor-pointer"
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
                      <div className="w-7 h-7 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center font-black text-xs">
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
                          <div className="w-10 h-10 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center font-black text-sm">
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
                          <span className="inline-flex items-center gap-1 text-[9px] font-bold text-amber-600 dark:text-amber-400 mt-0.5">
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
                          <span className="font-black text-amber-600">{userProgress.currentLevel} 🏆</span>
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

              {/* Mobile Menu Button */}
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

      {/* Mobile Off-Canvas Drawer Menu & Dim Backdrop */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                soundEffects.playPop();
                setIsMobileMenuOpen(false);
              }}
              className="fixed inset-0 z-50 bg-stone-950/45 backdrop-blur-xs md:hidden"
            />

            {/* Slide-in Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 24, stiffness: 240 }}
              className="fixed top-0 right-0 h-full w-[300px] bg-white dark:bg-stone-900 border-l border-stone-200 dark:border-stone-800 shadow-2xl z-50 flex flex-col md:hidden overflow-hidden"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between p-4 border-b border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-950/30">
                <div className="flex items-center gap-2">
                  <IberioLogo size={24} />
                  <span className="font-header text-sm font-black text-stone-900 dark:text-white uppercase tracking-wider">
                    Iberio Menu
                  </span>
                </div>
                <button
                  onClick={() => {
                    soundEffects.playPop();
                    setIsMobileMenuOpen(false);
                  }}
                  className="p-1.5 rounded-full bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-500 hover:text-stone-700 dark:hover:text-stone-300 transition"
                  aria-label="Close menu"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto p-4 space-y-6">
                
                {/* Mobile Bento Statistics Card */}
                <div className="bg-stone-50 dark:bg-stone-950/40 border border-stone-200/80 dark:border-stone-800/80 p-3.5 rounded-2xl space-y-3">
                  <p className="text-[9px] font-black uppercase tracking-widest text-stone-400 dark:text-stone-500 font-mono">
                    YOUR STANDINGS
                  </p>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-orange-500/10 border border-orange-500/20 p-2.5 rounded-xl flex items-center gap-2">
                      <Flame className="w-4 h-4 text-orange-500 fill-orange-500 shrink-0" />
                      <div>
                        <p className="text-[9px] font-bold text-orange-600/80 dark:text-orange-400/80 uppercase">STREAK</p>
                        <p className="text-xs font-black text-orange-700 dark:text-orange-300 font-mono">{userProgress.streakDays} Days</p>
                      </div>
                    </div>

                    <div className="bg-amber-500/10 border border-amber-500/20 p-2.5 rounded-xl flex items-center gap-2">
                      <Zap className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />
                      <div>
                        <p className="text-[9px] font-bold text-amber-600/80 dark:text-amber-400/80 uppercase">TOTAL XP</p>
                        <p className="text-xs font-black text-amber-700 dark:text-amber-300 font-mono">{userProgress.xp} XP</p>
                      </div>
                    </div>
                  </div>

                  {authUser && (
                    <div className="flex items-center gap-2.5 pt-2 border-t border-stone-150 dark:border-stone-800/80">
                      {authUser.photoURL ? (
                        <img
                          src={authUser.photoURL}
                          alt="User"
                          className="w-7 h-7 rounded-full object-cover border border-amber-500/30"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-7 h-7 rounded-full bg-amber-500 text-stone-950 flex items-center justify-center font-black text-xs">
                          {authUser.displayName?.[0] || 'U'}
                        </div>
                      )}
                      <div className="overflow-hidden">
                        <p className="text-xs font-bold text-stone-900 dark:text-white truncate">
                          {authUser.displayName || 'Google User'}
                        </p>
                        <p className="text-[9px] text-stone-500 dark:text-stone-400 truncate">
                          {authUser.email}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Section: Learn */}
                <div className="space-y-2.5">
                  <p className="text-[10px] font-black uppercase tracking-widest text-stone-400 dark:text-stone-500 font-mono px-1">
                    LEARN ESPAÑOL
                  </p>
                  
                  <div className="grid grid-cols-1 gap-2">
                    {learnItems.map(item => {
                      const Icon = item.icon;
                      const isActive = activeTab === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            soundEffects.playPop();
                            setActiveTab(item.id);
                            setIsMobileMenuOpen(false);
                          }}
                          className={`flex items-center justify-between p-3 rounded-xl text-xs font-extrabold transition text-left border ${
                            isActive
                              ? 'bg-amber-500 text-stone-950 border-amber-400 shadow-xs'
                              : 'bg-stone-50 dark:bg-stone-950/60 hover:bg-stone-100 dark:hover:bg-stone-800/60 text-stone-800 dark:text-stone-200 border-stone-200 dark:border-stone-800/80'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`p-1.5 rounded-lg shrink-0 ${isActive ? 'bg-stone-950 text-amber-400' : 'bg-stone-100 dark:bg-stone-800 text-amber-500'}`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <span>{userProgress.settings.nativeLanguage === 'ar' ? item.label_ar : item.label_en}</span>
                              <p className={`text-[9px] font-normal mt-0.5 ${isActive ? 'text-stone-900/80' : 'text-stone-500'}`}>
                                {item.desc}
                              </p>
                            </div>
                          </div>
                          <ChevronRight className={`w-4 h-4 ${isActive ? 'text-stone-950' : 'text-stone-400'}`} />
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Section: Practice */}
                <div className="space-y-2.5">
                  <p className="text-[10px] font-black uppercase tracking-widest text-stone-400 dark:text-stone-500 font-mono px-1">
                    PRACTICE MODULES
                  </p>
                  
                  <div className="grid grid-cols-1 gap-2">
                    {practiceItems.map(item => {
                      const Icon = item.icon;
                      const isActive = activeTab === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            soundEffects.playPop();
                            setActiveTab(item.id);
                            setIsMobileMenuOpen(false);
                          }}
                          className={`flex items-center justify-between p-3 rounded-xl text-xs font-extrabold transition text-left border ${
                            isActive
                              ? 'bg-amber-500 text-stone-950 border-amber-400 shadow-xs'
                              : 'bg-stone-50 dark:bg-stone-950/60 hover:bg-stone-100 dark:hover:bg-stone-800/60 text-stone-800 dark:text-stone-200 border-stone-200 dark:border-stone-800/80'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`p-1.5 rounded-lg shrink-0 ${isActive ? 'bg-stone-950 text-amber-400' : 'bg-stone-100 dark:bg-stone-800 text-amber-500'}`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div>
                              <span>{userProgress.settings.nativeLanguage === 'ar' ? item.label_ar : item.label_en}</span>
                              <p className={`text-[9px] font-normal mt-0.5 ${isActive ? 'text-stone-900/80' : 'text-stone-500'}`}>
                                {item.desc}
                              </p>
                            </div>
                          </div>
                          <ChevronRight className={`w-4 h-4 ${isActive ? 'text-stone-950' : 'text-stone-400'}`} />
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Extra Quick Triggers (Theme Toggle & Language Switcher inside Drawer) */}
                <div className="pt-4 border-t border-stone-200 dark:border-stone-800 flex justify-between items-center gap-2">
                  <button
                    onClick={() => {
                      soundEffects.playPop();
                      handleLanguageToggle();
                    }}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-stone-100 dark:bg-stone-800 text-xs font-bold text-stone-700 dark:text-stone-300 hover:bg-stone-200 transition"
                  >
                    <Globe className="w-3.5 h-3.5 text-sky-500" />
                    <span>Native: {getLanguageLabel()}</span>
                  </button>

                  <button
                    onClick={() => {
                      soundEffects.playPop();
                      handleThemeToggle();
                    }}
                    className="p-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 transition"
                    aria-label="Toggle Theme"
                  >
                    {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
                  </button>
                </div>

              </div>

              {/* Drawer Footer Actions */}
              {authUser && (
                <div className="p-4 border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/20">
                  <button
                    onClick={() => {
                      soundEffects.playPop();
                      setIsMobileMenuOpen(false);
                      onLogout();
                    }}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-red-500/15 hover:bg-red-500 text-red-600 hover:text-white text-xs font-black transition cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

