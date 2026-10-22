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
  Trophy,
  Mail,
  Bell,
  Check,
  AlertCircle,
  Mic
} from 'lucide-react';
import { UserProgress } from '../types';
import { IberioLogo } from './IberacademyLogo';
import { soundEffects } from '../utils/audio';
import { User } from 'firebase/auth';
import { AvatarDisplay } from './AvatarDisplay';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userProgress: UserProgress;
  setUserProgress: React.Dispatch<React.SetStateAction<UserProgress>>;
  onOpenPlacementTest: () => void;
  authUser: User | null;
  onOpenAuthModal?: (mode?: 'signin' | 'signup') => void;
  onLogout: () => void;
  isAuthLoading?: boolean;
  navigation?: React.ReactNode;
}

const HeaderComponent: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  userProgress,
  setUserProgress,
  onOpenPlacementTest,
  authUser,
  onOpenAuthModal,
  onLogout,
  isAuthLoading = false,
  navigation
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<'learn' | 'practice' | null>(null);

  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const navDropdownRef = useRef<HTMLDivElement>(null);
  const notificationDropdownRef = useRef<HTMLDivElement>(null);

  const [notifications, setNotifications] = useState([
    {
      id: 'streak',
      title: 'Daily Streak Active',
      emoji: '🔥',
      message: `You are on a ${userProgress.streakDays}-day streak! Practice a story or review cards to keep it going.`,
      time: 'Just now',
      read: false,
      tab: 'stories'
    },
    {
      id: 'srs',
      title: 'SRS Vocabulary Due',
      emoji: '📚',
      message: 'Pending spaced-repetition cards ready for your daily memory review.',
      time: 'Today',
      read: false,
      tab: 'vocabulary'
    },
    {
      id: 'report_system',
      title: 'Content Feedback Active',
      emoji: '🚩',
      message: 'Found a typo or grammar discrepancy? Use the "Report Issue" button in any reader or grammar lesson to send feedback.',
      time: 'New',
      read: false,
      tab: 'grammar'
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    soundEffects.playPop();
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // Close dropdowns on click outside (support both desktop mousedown and mobile touchstart)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(target)) {
        setIsProfileDropdownOpen(false);
      }
      if (navDropdownRef.current && !navDropdownRef.current.contains(target)) {
        setOpenDropdown(null);
      }
      if (notificationDropdownRef.current && !notificationDropdownRef.current.contains(target)) {
        setIsNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  const primaryTabs = [
    {
      id: 'dashboard',
      label_es: 'Hoy',
      label_en: 'Today',
      label_ar: 'اليوم',
      icon: Compass,
      desc: 'Daily immersion target & review counter',
      isActive: activeTab === 'dashboard'
    },
    {
      id: 'stories',
      label_es: 'Inmersión',
      label_en: 'Immersion',
      label_ar: 'انغماس',
      icon: Sparkles,
      desc: 'Graded reader & comprehensible input stories',
      isActive: activeTab === 'stories' || activeTab === 'videos'
    },
    {
      id: 'workshop',
      label_es: 'Taller',
      label_en: 'Workshop',
      label_ar: 'الورشة',
      icon: GraduationCap,
      desc: 'Sentence Studio, Verbs, Conversation & Phonetics',
      isActive: [
        'workshop',
        'vocabulary',
        'verbs',
        'grammar',
        'tutor',
        'shadowing',
        'linglooper',
        'a0_foundation',
        'sitemap'
      ].includes(activeTab)
    },
    {
      id: 'path',
      label_es: 'Progreso',
      label_en: 'Progress',
      label_ar: 'التقدم',
      icon: Layers,
      desc: 'CEFR Roadmap, level diagnostic & profile',
      isActive: activeTab === 'path' || activeTab === 'planner' || activeTab === 'profile'
    }
  ];

  const workshopSubHubs = [
    { id: 'vocabulary', label: 'Estudio de Oraciones (SRS)', desc: 'Spaced repetition for saved words & mined sentences', icon: BookOpen },
    { id: 'verbs', label: 'Laboratorio de Verbos', desc: 'Contextual tense practice & matrices', icon: TrendingUp },
    { id: 'tutor', label: 'Simulador de Conversación', desc: 'Real-world AI dialogue scenarios & recasts', icon: MessageSquare },
    { id: 'shadowing', label: 'Entrenamiento Fonético', desc: 'Cadence & oral shadowing studio', icon: Mic },
    { id: 'grammar', label: 'Enciclopedia Gramatical', desc: 'Curated grammar rules & diagnostics', icon: GraduationCap }
  ];

  const mobileBottomTabs = [
    { id: 'dashboard', label_es: 'Hoy', label_en: 'Today', label_ar: 'اليوم', icon: Compass },
    { id: 'stories', label_es: 'Inmersión', label_en: 'Immersion', label_ar: 'انغماس', icon: Sparkles },
    { id: 'workshop', label_es: 'Taller', label_en: 'Workshop', label_ar: 'الورشة', icon: GraduationCap },
    { id: 'path', label_es: 'Progreso', label_en: 'Progress', label_ar: 'التقدم', icon: Layers }
  ];

  const handleNavClick = (tabId: string) => {
    soundEffects.playPop();
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
    setIsProfileDropdownOpen(false);
    setOpenDropdown(null);
    window.scrollTo(0, 0);
  };

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

  // 3 Essential Metrics for the Stat Bar
  const streakDays = userProgress.streakDays || 0;
  const wordsMasteredCount =
    (userProgress.masteredWordIds?.length || 0) +
    (userProgress.knownWords?.length || 0) ||
    (userProgress.savedWordIds?.length || 0);

  const todayKey = new Date().toISOString().split('T')[0];
  const todayWordsRead = userProgress.dailyWordsRead?.[todayKey] || 0;
  const dailyWordsGoal = userProgress.settings?.dailyWordsGoal || 200;
  const todayLessonsDone = userProgress.dailyLessonsCompleted?.[todayKey] || 0;
  const goalPercent = Math.min(
    100,
    Math.round(
      todayWordsRead > 0
        ? (todayWordsRead / dailyWordsGoal) * 100
        : todayLessonsDone > 0
        ? 100
        : 0
    )
  );

  return (
    <>
      {/* Streamlined Editorial Iberian Header */}
      <header className="sticky top-0 z-40 bg-[#FBF9F5]/95 dark:bg-[#121110]/95 backdrop-blur-xl border-b border-stone-200/80 dark:border-stone-800/80 text-stone-900 dark:text-stone-100 transition-all duration-300 pt-safe">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 gap-3">
            
            {/* Logo & Level Tag */}
            <button
              onClick={() => {
                if (authUser) {
                  handleNavClick('dashboard');
                } else {
                  handleNavClick('landing');
                }
              }}
              className="flex items-center gap-2 cursor-pointer select-none group focus:outline-none shrink-0"
              title="Iberio Dashboard"
            >
              <IberioLogo variant="full" showSubtitle={false} className="h-8" />
              <span className="hidden sm:inline-flex text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-md bg-[#C85A32]/10 text-[#C85A32] dark:text-[#E07A5F] border border-[#C85A32]/20 font-mono">
                {userProgress.currentLevel}
              </span>
            </button>

            {/* Streamlined Desktop Navigation System (4 Primary Tabs) */}
            {navigation ? (
              navigation
            ) : (
              <nav className="hidden md:flex items-center space-x-1" ref={navDropdownRef} aria-label="AppContent navigation" id="appcontent-navigation">
                {primaryTabs.map(tab => {
                  const Icon = tab.icon;
                  const isActive = tab.isActive;
                  return (
                    <motion.button
                      key={tab.id}
                      id={`header-nav-tab-${tab.id}`}
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: 'spring', stiffness: 450, damping: 28 }}
                      onClick={() => handleNavClick(tab.id)}
                      className={`group relative flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 cursor-pointer rounded-lg select-none border ${
                        isActive
                          ? 'text-[#C85A32] dark:text-[#E07A5F] font-bold bg-[#C85A32]/8 dark:bg-[#C85A32]/15 border-[#C85A32]/25 dark:border-[#C85A32]/30 shadow-xs'
                          : 'text-stone-600 dark:text-stone-400 border-transparent hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-200/60 dark:hover:bg-stone-800/50'
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 transition-transform duration-200 ${isActive ? 'text-[#C85A32] dark:text-[#E07A5F]' : 'text-stone-500 dark:text-stone-400 group-hover:scale-105'}`} />
                      <span className={`tracking-tight ${userProgress.settings.nativeLanguage === 'ar' ? 'font-arabic' : ''}`}>
                        {userProgress.settings.nativeLanguage === 'ar' ? tab.label_ar : tab.label_es}
                      </span>
                      {isActive && (
                        <motion.div
                          layoutId="activeTabUnderline"
                          className="absolute -bottom-1 left-3 right-3 h-[2px] bg-[#C85A32] dark:bg-[#E07A5F] rounded-full"
                          transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                        />
                      )}
                    </motion.button>
                  );
                })}
              </nav>
            )}

            {/* 3 Essential Metrics Stat Bar */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              
              {/* 1. Streak Counter */}
              <div 
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#C85A32]/10 dark:bg-[#C85A32]/15 border border-[#C85A32]/25 text-[#C85A32] dark:text-[#E07A5F] text-xs font-semibold cursor-default transition-colors shadow-2xs"
                title={`Racha activa: ${streakDays} días consecutivos`}
              >
                <Flame className="w-3.5 h-3.5 text-[#C85A32] dark:text-[#E07A5F] fill-current" />
                <span className="font-mono text-xs">{streakDays}d</span>
              </div>

              {/* 2. Words Mastered Count (Krashen Lexicon Growth) */}
              <div 
                className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#2D5A43]/10 dark:bg-[#2D5A43]/15 border border-[#2D5A43]/25 text-[#2D5A43] dark:text-emerald-400 text-xs font-semibold cursor-default transition-colors shadow-2xs"
                title={`Léxico Krashen: ${wordsMasteredCount} palabras dominadas`}
              >
                <BookOpen className="w-3.5 h-3.5 text-[#2D5A43] dark:text-emerald-400" />
                <span className="font-mono text-xs">{wordsMasteredCount}</span>
                <span className="text-[10px] font-normal opacity-75 hidden xl:inline">palabras</span>
              </div>

              {/* 3. Daily Goal Progress Ring */}
              <div 
                className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-stone-100/90 dark:bg-stone-900/90 border border-stone-200/80 dark:border-stone-800/80 text-stone-700 dark:text-stone-300 text-xs font-semibold cursor-default shadow-2xs"
                title={`Meta diaria: ${goalPercent}% (${todayWordsRead}/${dailyWordsGoal} palabras)`}
              >
                <div className="relative w-4 h-4 flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 -rotate-90" viewBox="0 0 24 24">
                    <circle
                      cx="12"
                      cy="12"
                      r="9"
                      className="stroke-stone-200 dark:stroke-stone-800"
                      strokeWidth="2.75"
                      fill="none"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="9"
                      className="stroke-[#B47832] dark:stroke-amber-400 transition-all duration-500 ease-out"
                      strokeWidth="2.75"
                      strokeDasharray={56.54}
                      strokeDashoffset={56.54 - (56.54 * goalPercent) / 100}
                      strokeLinecap="round"
                      fill="none"
                    />
                  </svg>
                  {goalPercent >= 100 && (
                    <span className="absolute inset-0 flex items-center justify-center text-[7px] font-black text-[#B47832] dark:text-amber-400 leading-none">
                      ✓
                    </span>
                  )}
                </div>
                <span className="font-mono text-[11px] text-stone-600 dark:text-stone-300">
                  {goalPercent}%
                </span>
              </div>

              {/* Language Toggle */}
              <button
                onClick={handleLanguageToggle}
                className="hidden md:inline-flex items-center justify-center gap-1.5 h-7.5 px-2 rounded-lg bg-stone-100/80 dark:bg-stone-900/80 border border-stone-200/80 dark:border-stone-800/80 text-xs font-semibold text-stone-700 dark:text-stone-300 hover:bg-stone-200/60 dark:hover:bg-stone-800/60 transition cursor-pointer shrink-0"
                title="Cambiar idioma de interfaz"
              >
                <Globe className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                <span className="text-[11px] font-semibold">{getLanguageLabel()}</span>
              </button>

              {/* Theme Toggle */}
              <button
                onClick={handleThemeToggle}
                className="hidden sm:inline-flex items-center justify-center w-7.5 h-7.5 rounded-lg bg-stone-100/80 dark:bg-stone-900/80 border border-stone-200/80 dark:border-stone-800/80 text-stone-700 dark:text-stone-300 hover:bg-stone-200/60 dark:hover:bg-stone-800/60 transition shrink-0 cursor-pointer"
                aria-label="Toggle Theme"
                title={isDarkMode ? 'Modo Claro' : 'Modo Oscuro'}
              >
                {isDarkMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-stone-600" />}
              </button>

              {/* Notification Center Bell */}
              {/* Notification Center Bell */}
              <div className="relative shrink-0" ref={notificationDropdownRef}>
                <button
                  id="header-notification-bell"
                  onClick={() => {
                    soundEffects.playPop();
                    setIsNotificationsOpen(!isNotificationsOpen);
                  }}
                  className={`relative w-8 h-8 rounded-full border transition cursor-pointer flex items-center justify-center shrink-0 ${
                    isNotificationsOpen
                      ? 'bg-amber-500/20 border-amber-500/40 text-amber-600 dark:text-amber-400'
                      : 'bg-stone-100 dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-800'
                  }`}
                  title="Notifications & Updates"
                  aria-label="Notifications"
                  aria-expanded={isNotificationsOpen}
                >
                  <Bell className="w-4 h-4 text-amber-500" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white font-black text-[9px] rounded-full flex items-center justify-center animate-pulse shadow-xs">
                      {unreadCount}
                    </span>
                  )}
                </button>

                <AnimatePresence>
                  {isNotificationsOpen && (
                    <>
                      {/* Mobile Backdrop Overlay */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        onClick={() => setIsNotificationsOpen(false)}
                        className="fixed inset-0 bg-stone-950/40 backdrop-blur-xs z-40 sm:hidden"
                        aria-hidden="true"
                      />

                      {/* Notification Dropdown / Modal */}
                      <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.96 }}
                        transition={{ type: 'spring', damping: 26, stiffness: 420 }}
                        onClick={(e) => e.stopPropagation()}
                        className="fixed inset-x-3.5 top-16 z-50 max-w-sm mx-auto sm:inset-auto sm:absolute sm:right-0 sm:top-full sm:mt-2 sm:w-88 sm:max-w-none bg-white dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800/90 rounded-2xl shadow-2xl p-4 space-y-3"
                      >
                        {/* Header */}
                        <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800/80 pb-2.5">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                              <Bell className="w-3.5 h-3.5" />
                            </div>
                            <span className="font-extrabold text-sm text-stone-900 dark:text-white">
                              Notifications
                            </span>
                            {unreadCount > 0 && (
                              <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                                {unreadCount} new
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-1.5">
                            {unreadCount > 0 && (
                              <button
                                onClick={markAllAsRead}
                                className="text-[11px] font-bold text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 cursor-pointer flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-amber-500/10 transition"
                              >
                                <Check className="w-3.5 h-3.5" />
                                <span>Mark read</span>
                              </button>
                            )}

                            <button
                              onClick={() => {
                                soundEffects.playPop();
                                setIsNotificationsOpen(false);
                              }}
                              className="w-7 h-7 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition flex items-center justify-center cursor-pointer"
                              title="Close notifications"
                              aria-label="Close notifications"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* List */}
                        <div className="space-y-2 max-h-[60vh] sm:max-h-80 overflow-y-auto pr-0.5">
                          {notifications.length === 0 ? (
                            <div className="py-8 text-center space-y-1">
                              <span className="text-2xl">✨</span>
                              <p className="text-xs font-bold text-stone-600 dark:text-stone-300">All caught up!</p>
                              <p className="text-[10px] text-stone-400">No new alerts right now.</p>
                            </div>
                          ) : (
                            notifications.map(item => (
                              <button
                                key={item.id}
                                type="button"
                                onClick={() => {
                                  soundEffects.playPop();
                                  setNotifications(prev =>
                                    prev.map(n => (n.id === item.id ? { ...n, read: true } : n))
                                  );
                                  if (item.tab) {
                                    handleNavClick(item.tab);
                                    setIsNotificationsOpen(false);
                                  }
                                }}
                                className={`w-full p-3 rounded-xl border text-left cursor-pointer transition flex items-start gap-3 group relative ${
                                  item.read
                                    ? 'bg-stone-50/70 dark:bg-stone-800/30 border-stone-200/50 dark:border-stone-800/50 opacity-75'
                                    : 'bg-amber-500/5 dark:bg-amber-500/10 border-amber-500/25 text-stone-900 dark:text-stone-100'
                                } hover:border-amber-500/50 hover:bg-amber-500/10`}
                              >
                                <span className="text-base leading-none mt-0.5 shrink-0 select-none">
                                  {item.emoji}
                                </span>

                                <div className="flex-1 min-w-0 space-y-0.5">
                                  <div className="flex items-center justify-between gap-1">
                                    <span className="font-bold text-xs text-stone-900 dark:text-white truncate">
                                      {item.title}
                                    </span>
                                    <span className="text-[9px] text-stone-400 dark:text-stone-500 font-mono shrink-0">
                                      {item.time}
                                    </span>
                                  </div>
                                  <p className="text-[11px] text-stone-600 dark:text-stone-300 leading-snug font-medium line-clamp-2">
                                    {item.message}
                                  </p>
                                </div>

                                <ChevronRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-amber-500 transition shrink-0 mt-1" />

                                {!item.read && (
                                  <span className="absolute top-2.5 right-2 w-1.5 h-1.5 rounded-full bg-amber-500" />
                                )}
                              </button>
                            ))
                          )}
                        </div>

                        {/* Footer */}
                        <div className="pt-2 text-center border-t border-stone-100 dark:border-stone-800/80">
                          <p className="text-[10px] text-stone-400 dark:text-stone-500 font-medium">
                            Stay consistent • Daily updates &amp; SLA reminders
                          </p>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>

              {/* Desktop Profile Menu */}
              <div className="hidden md:block relative shrink-0" ref={profileDropdownRef}>
                {authUser ? (
                  <button
                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                    className="flex items-center justify-center p-0.5 rounded-full hover:scale-105 transition cursor-pointer shrink-0"
                    title="User Account Menu"
                  >
                    <AvatarDisplay
                      photoURL={authUser.photoURL}
                      avatarId={userProgress.avatarId}
                      name={authUser.displayName}
                      email={authUser.email}
                      size="sm"
                    />
                  </button>
                ) : (
                  <button
                    onClick={() => onOpenAuthModal?.('signin')}
                    disabled={isAuthLoading}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-black transition cursor-pointer shadow-xs disabled:opacity-50"
                  >
                    <UserIcon className="w-3.5 h-3.5" />
                    <span>Sign In</span>
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
                        <AvatarDisplay
                          photoURL={authUser.photoURL}
                          avatarId={userProgress.avatarId}
                          name={authUser.displayName}
                          email={authUser.email}
                          size="md"
                        />
                        <div className="overflow-hidden">
                          <p className="font-extrabold text-xs text-stone-900 dark:text-white truncate">
                            {authUser.displayName || 'Iberio Learner'}
                          </p>
                          <p className="text-[10px] text-stone-500 dark:text-stone-400 truncate">
                            {authUser.email}
                          </p>
                          <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                            <span className="inline-flex items-center gap-1 text-[9px] font-bold text-emerald-600 dark:text-emerald-400">
                              <CheckCircle2 className="w-3 h-3 text-emerald-500" /> Synced
                            </span>
                            {authUser.emailVerified ? (
                              <span className="inline-flex items-center gap-1 text-[9px] font-black text-sky-700 dark:text-sky-300 bg-sky-500/10 px-1.5 py-0.5 rounded-full border border-sky-500/20">
                                <span>✓ Verified</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-[9px] font-bold text-amber-700 dark:text-amber-300 bg-amber-500/10 px-1.5 py-0.5 rounded-full border border-amber-500/20">
                                <span>✉ Verification Sent</span>
                              </span>
                            )}
                          </div>
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

              {/* Mobile Drawer Menu Button */}
              <button
                onClick={() => {
                  soundEffects.playPop();
                  setIsMobileMenuOpen(!isMobileMenuOpen);
                }}
                className="md:hidden flex items-center gap-1.5 p-1 px-1.5 rounded-full bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-200 hover:bg-stone-200 dark:hover:bg-stone-800 transition cursor-pointer shrink-0"
                aria-label="Toggle Navigation"
              >
                {authUser ? (
                  <div className="flex items-center gap-1">
                    <AvatarDisplay
                      photoURL={authUser.photoURL}
                      avatarId={userProgress.avatarId}
                      name={authUser.displayName}
                      email={authUser.email}
                      size="xs"
                    />
                    <Menu className="w-3.5 h-3.5 text-stone-500" />
                  </div>
                ) : (
                  <div className="p-0.5">
                    {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                  </div>
                )}
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

            {/* Slide-in Drawer with overflow-x safety */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 260 }}
              className="fixed top-0 right-0 h-full w-[290px] max-w-[85vw] bg-[#FBF9F5] dark:bg-[#121110] border-l border-stone-200/80 dark:border-stone-800/80 shadow-2xl z-50 flex flex-col md:hidden overflow-hidden"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between p-4 border-b border-stone-200/80 dark:border-stone-800/80 bg-stone-100/40 dark:bg-stone-900/40">
                <div className="flex items-center gap-2">
                  <IberioLogo size={24} />
                  <span className="font-header text-sm font-black text-stone-900 dark:text-white uppercase tracking-wider">
                    Iberio
                  </span>
                </div>
                <button
                  onClick={() => {
                    soundEffects.playPop();
                    setIsMobileMenuOpen(false);
                  }}
                  className="p-1.5 rounded-lg bg-stone-200/60 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-700/80 text-stone-600 hover:text-stone-900 dark:hover:text-stone-200 transition cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto p-4 space-y-5 overflow-x-hidden">
                
                {/* User Stats Snapshot */}
                <div className="bg-white dark:bg-[#181615] border border-stone-200/80 dark:border-stone-800/80 p-3.5 rounded-xl space-y-3 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <p className="text-[9px] font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500 font-mono">
                      MÉTRICAS DIARIAS
                    </p>
                    <span className="text-[10px] font-mono font-bold text-[#C85A32] dark:text-[#E07A5F]">
                      Nivel {userProgress.currentLevel}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-[#C85A32]/8 border border-[#C85A32]/20 p-2 rounded-lg flex items-center gap-2">
                      <Flame className="w-4 h-4 text-[#C85A32] fill-[#C85A32] shrink-0" />
                      <div>
                        <p className="text-[9px] font-semibold text-stone-500 uppercase">RACHA</p>
                        <p className="text-xs font-bold text-[#C85A32] font-mono">{streakDays} Días</p>
                      </div>
                    </div>

                    <div className="bg-[#2D5A43]/8 border border-[#2D5A43]/20 p-2 rounded-lg flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-[#2D5A43] dark:text-emerald-400 shrink-0" />
                      <div>
                        <p className="text-[9px] font-semibold text-stone-500 uppercase">LÉXICO</p>
                        <p className="text-xs font-bold text-[#2D5A43] dark:text-emerald-400 font-mono">{wordsMasteredCount} palabras</p>
                      </div>
                    </div>
                  </div>

                  {authUser && (
                    <div className="flex items-center gap-2.5 pt-2 border-t border-stone-100 dark:border-stone-800/80">
                      <AvatarDisplay
                        photoURL={authUser.photoURL}
                        avatarId={userProgress.avatarId}
                        name={authUser.displayName}
                        email={authUser.email}
                        size="xs"
                      />
                      <div className="overflow-hidden">
                        <p className="text-xs font-bold text-stone-900 dark:text-white truncate">
                          {authUser.displayName || 'Iberio Learner'}
                        </p>
                        <p className="text-[9px] text-stone-500 dark:text-stone-400 truncate">
                          {authUser.email}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Primary 4 Navigation Hubs */}
                <div className="space-y-1.5">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500 font-mono px-1">
                    NAVEGACIÓN PRINCIPAL
                  </p>
                  
                  <div className="space-y-1">
                    {primaryTabs.map(item => {
                      const Icon = item.icon;
                      const isActive = item.isActive;
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleNavClick(item.id)}
                          className={`flex items-center justify-between p-2.5 rounded-lg text-xs font-semibold transition text-left border w-full cursor-pointer ${
                            isActive
                              ? 'bg-[#C85A32]/10 dark:bg-[#C85A32]/15 text-[#C85A32] dark:text-[#E07A5F] border-[#C85A32]/25 shadow-2xs font-bold'
                              : 'bg-white dark:bg-[#181615] hover:bg-stone-100 dark:hover:bg-stone-800/50 text-stone-800 dark:text-stone-200 border-stone-200/80 dark:border-stone-800/80'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className={`p-1.5 rounded-md shrink-0 ${isActive ? 'bg-[#C85A32] text-white' : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300'}`}>
                              <Icon className="w-3.5 h-3.5" />
                            </div>
                            <div className="truncate">
                              <span className="block">{userProgress.settings.nativeLanguage === 'ar' ? item.label_ar : item.label_es}</span>
                              <span className="text-[10px] text-stone-500 dark:text-stone-400 font-normal truncate block">
                                {item.desc}
                              </span>
                            </div>
                          </div>
                          <ChevronRight className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-[#C85A32]' : 'text-stone-400'}`} />
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Workshop Tools Quick Jump */}
                <div className="space-y-1.5">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400 dark:text-stone-500 font-mono px-1">
                    HERRAMIENTAS DEL TALLER
                  </p>
                  
                  <div className="grid grid-cols-1 gap-1">
                    {workshopSubHubs.map(sub => {
                      const Icon = sub.icon;
                      const isCurrent = activeTab === sub.id;
                      return (
                        <button
                          key={sub.id}
                          onClick={() => handleNavClick(sub.id)}
                          className={`flex items-center justify-between p-2 rounded-lg text-xs transition text-left cursor-pointer border ${
                            isCurrent
                              ? 'bg-[#B47832]/10 text-[#B47832] dark:text-amber-400 border-[#B47832]/30 font-bold'
                              : 'bg-stone-50/80 dark:bg-stone-900/40 hover:bg-stone-100 dark:hover:bg-stone-800/40 text-stone-700 dark:text-stone-300 border-stone-200/60 dark:border-stone-800/60'
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate">
                            <Icon className="w-3.5 h-3.5 text-stone-500 shrink-0" />
                            <span className="text-[11px] truncate">{sub.label}</span>
                          </div>
                          <ChevronRight className="w-3 h-3 text-stone-400 shrink-0" />
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Controls (Theme & Language) */}
                <div className="pt-2 border-t border-stone-200/80 dark:border-stone-800/80 flex items-center gap-2">
                  <button
                    onClick={() => {
                      soundEffects.playPop();
                      handleLanguageToggle();
                    }}
                    className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-lg bg-stone-100 dark:bg-stone-800/80 text-xs font-semibold text-stone-700 dark:text-stone-300 hover:bg-stone-200 transition cursor-pointer"
                  >
                    <Globe className="w-3.5 h-3.5 text-stone-500" />
                    <span>{getLanguageLabel()}</span>
                  </button>

                  <button
                    onClick={() => {
                      soundEffects.playPop();
                      handleThemeToggle();
                    }}
                    className="p-1.5 rounded-lg bg-stone-100 dark:bg-stone-800/80 text-stone-700 dark:text-stone-300 hover:bg-stone-200 transition cursor-pointer"
                    aria-label="Toggle Theme"
                  >
                    {isDarkMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-stone-600" />}
                  </button>
                </div>

              </div>

              {/* Drawer Footer Actions */}
              {authUser && (
                <div className="p-3 border-t border-stone-200/80 dark:border-stone-800/80 bg-stone-50/50 dark:bg-stone-950/30">
                  <button
                    onClick={() => {
                      soundEffects.playPop();
                      setIsMobileMenuOpen(false);
                      onLogout();
                    }}
                    className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-red-500/10 hover:bg-red-500 text-red-600 hover:text-white text-xs font-bold transition cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Cerrar Sesión</span>
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Sticky Mobile Bottom Navigation Bar (Exactly 4 Primary Tabs) */}
      <nav 
        aria-label="Mobile Bottom Navigation"
        className="fixed bottom-0 left-0 right-0 z-40 bg-[#FBF9F5]/95 dark:bg-[#121110]/95 backdrop-blur-md border-t border-stone-200/80 dark:border-stone-800/80 md:hidden flex items-center justify-between px-2 py-1 select-none pb-safe"
      >
        {mobileBottomTabs.map(tab => {
          const Icon = tab.icon;
          const isActive =
            tab.id === 'dashboard'
              ? activeTab === 'dashboard'
              : tab.id === 'stories'
              ? activeTab === 'stories' || activeTab === 'videos'
              : tab.id === 'workshop'
              ? ['workshop', 'vocabulary', 'verbs', 'grammar', 'tutor', 'shadowing', 'linglooper', 'a0_foundation', 'sitemap'].includes(activeTab)
              : activeTab === 'path' || activeTab === 'planner' || activeTab === 'profile';

          return (
            <button
              key={tab.id}
              id={`mobile-nav-tab-${tab.id}`}
              onClick={() => handleNavClick(tab.id)}
              className={`relative flex-1 flex flex-col items-center justify-center py-1 px-1 rounded-lg transition-all cursor-pointer min-h-[44px] ${
                isActive
                  ? 'text-[#C85A32] dark:text-[#E07A5F] font-bold'
                  : 'text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 font-medium'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="mobileActiveTabUnderline"
                  className="absolute top-0 left-3 right-3 h-[2px] bg-[#C85A32] dark:bg-[#E07A5F] rounded-full"
                  transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                />
              )}
              <div className={`p-1 rounded-md transition ${isActive ? 'bg-[#C85A32]/10 text-[#C85A32] dark:text-[#E07A5F]' : ''}`}>
                <Icon className="w-4.5 h-4.5" />
              </div>
              <span className="text-[10px] font-bold leading-tight mt-0.5 truncate max-w-full px-0.5">
                {userProgress.settings.nativeLanguage === 'ar' ? tab.label_ar : tab.label_es}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
};

export const Header = React.memo(HeaderComponent);

