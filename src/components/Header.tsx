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
      title: '🔥 Daily Streak Active',
      message: `You are on a ${userProgress.streakDays}-day streak! Practice a story or review cards to keep it going.`,
      time: 'Just now',
      read: false,
      tab: 'stories'
    },
    {
      id: 'srs',
      title: '📚 SRS Vocabulary Due',
      message: 'Pending spaced-repetition cards ready for your daily memory review.',
      time: 'Today',
      read: false,
      tab: 'srs'
    },
    {
      id: 'report_system',
      title: '🚩 Content Feedback Active',
      message: 'Found a typo or grammar discrepancy? Use the "Report Issue" button in any reader or grammar lesson to send feedback.',
      time: 'New',
      read: false,
      tab: 'encyclopedia'
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    soundEffects.playPop();
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
      if (navDropdownRef.current && !navDropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
      if (notificationDropdownRef.current && !notificationDropdownRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const roadmapItems = [
    { id: 'path', label_en: 'CEFR Roadmap', label_ar: 'مسار التعلم', icon: Layers, desc: 'Structured A1-B2 CEFR Path' },
    { id: 'a0_foundation', label_en: 'A0 Beginner Scaffolding', label_ar: 'أساسيات المبتدئ Zero', icon: Zap, desc: '25 Micro-Guided Units' },
    { id: 'planner', label_en: 'Curriculum Planner', label_ar: 'مخطط المنهج', icon: Target, desc: 'Milestones & Diagnostics' }
  ];

  const immersionItems = [
    { id: 'stories', label_en: 'Reader & Stories', label_ar: 'القارئ الذكي', icon: Sparkles, desc: 'Comprehensible Input Stories' },
    { id: 'videos', label_en: 'Video Lessons', label_ar: 'دروس الفيديو', icon: Video, desc: 'Interactive Video Practice' }
  ];

  const studioItems = [
    { id: 'tutor', label_en: 'AI Native Tutor', label_ar: 'الدردشة الذكية', icon: MessageSquare, desc: 'Interactive Roleplay & Chat' },
    { id: 'shadowing', label_en: 'Oral Shadowing Studio', label_ar: 'الاستوديو الصوتي', icon: Mic, desc: '3-Stage Speaking Drills' },
    { id: 'linglooper', label_en: 'Interactive Practice Game', label_ar: 'لعبة المحادثة', icon: Trophy, desc: 'Gamified Roleplay Scenarios' }
  ];

  const knowledgeItems = [
    { id: 'vocabulary', label_en: 'SRS Vocabulary', label_ar: 'المفردات', icon: BookOpen, desc: 'Spaced Repetition Memory Deck' },
    { id: 'verbs', label_en: 'Verb Conjugator', label_ar: 'تصريف الأفعال', icon: TrendingUp, desc: 'Conjugations & Drills' },
    { id: 'grammar', label_en: 'Grammar Encyclopedia', label_ar: 'موسوعة القواعد', icon: GraduationCap, desc: 'Comprehensive Grammar Blueprint' }
  ];

  const mobileBottomTabs = [
    { id: 'dashboard', label_en: 'Today', label_ar: 'الرئيسية', icon: Compass },
    { id: 'stories', label_en: 'Immersion', label_ar: 'القصص', icon: Sparkles },
    { id: 'workshop', label_en: 'Workshop', label_ar: 'الورشة', icon: GraduationCap },
    { id: 'profile', label_en: 'Profile', label_ar: 'الملف', icon: UserIcon }
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
  const isRoadmapActive = roadmapItems.some(i => i.id === activeTab);
  const isImmersionActive = immersionItems.some(i => i.id === activeTab);
  const isStudioActive = studioItems.some(i => i.id === activeTab);
  const isKnowledgeActive = knowledgeItems.some(i => i.id === activeTab);

  return (
    <>
      {/* Streamlined Clean Header */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-stone-950/95 backdrop-blur-xl border-b border-stone-200/80 dark:border-stone-800/80 text-stone-900 dark:text-stone-100 shadow-2xs transition-all duration-300 pt-safe">
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
              <span className="hidden sm:inline-flex text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 font-mono">
                {userProgress.currentLevel}
              </span>
            </button>

            {/* Streamlined Desktop Navigation System */}
            {navigation ? (
              navigation
            ) : (
              <nav className="hidden md:flex items-center space-x-1" ref={navDropdownRef} aria-label="AppContent navigation" id="appcontent-navigation">
                {[
                  { id: 'dashboard', label_en: 'Today', label_ar: 'الرئيسية', icon: Compass, isActive: activeTab === 'dashboard' },
                  { id: 'stories', label_en: 'Immersion', label_ar: 'القصص', icon: Sparkles, isActive: activeTab === 'stories' || activeTab === 'videos' },
                  { id: 'workshop', label_en: 'Workshop', label_ar: 'الورشة', icon: GraduationCap, isActive: ['workshop', 'vocabulary', 'verbs', 'grammar', 'tutor', 'shadowing', 'linglooper', 'a0_foundation'].includes(activeTab) },
                  { id: 'path', label_en: 'Roadmap', label_ar: 'المسار', icon: Layers, isActive: activeTab === 'path' || activeTab === 'planner' },
                  { id: 'profile', label_en: 'Profile', label_ar: 'الملف', icon: UserIcon, isActive: activeTab === 'profile' }
                ].map(tab => {
                  const Icon = tab.icon;
                  const isActive = tab.isActive;
                  return (
                    <motion.button
                      key={tab.id}
                      id={`header-nav-tab-${tab.id}`}
                      type="button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.96 }}
                      transition={{ type: 'spring', stiffness: 450, damping: 26 }}
                      onClick={() => handleNavClick(tab.id)}
                      className={`group relative flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold transition-colors cursor-pointer rounded-xl select-none ${
                        isActive
                          ? 'text-amber-600 dark:text-amber-400 font-extrabold'
                          : 'text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white'
                      }`}
                    >
                      {/* Soft background glow on hover */}
                      <span
                        className="absolute inset-0 rounded-xl bg-gradient-to-b from-amber-500/15 to-amber-500/5 dark:from-amber-400/15 dark:to-amber-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-[0_0_18px_rgba(245,158,11,0.2)] border border-amber-500/20 dark:border-amber-400/20"
                      />

                      <Icon className="w-3.5 h-3.5 relative z-10 transition-transform duration-200 group-hover:scale-110" />
                      <span className={`relative z-10 ${userProgress.settings.nativeLanguage === 'ar' ? 'font-arabic' : ''}`}>
                        {userProgress.settings.nativeLanguage === 'ar' ? tab.label_ar : tab.label_en}
                      </span>
                      {isActive && (
                        <motion.div
                          layoutId="activeTabUnderline"
                          className="absolute bottom-0 left-2 right-2 h-[2.5px] bg-amber-500 dark:bg-amber-400 rounded-full shadow-[0_1px_8px_rgba(245,158,11,0.45)] z-10"
                          transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                        />
                      )}
                    </motion.button>
                  );
                })}
              </nav>
            )}

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

              {/* Theme Toggle - Visible sm:flex */}
              <button
                onClick={handleThemeToggle}
                className="hidden sm:flex p-1.5 rounded-full bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 transition shrink-0"
                aria-label="Toggle Theme"
              >
                {isDarkMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-indigo-400" />}
              </button>

              {/* Notification Center Bell */}
              <div className="relative shrink-0" ref={notificationDropdownRef}>
                <button
                  id="header-notification-bell"
                  onClick={() => {
                    soundEffects.playPop();
                    setIsNotificationsOpen(!isNotificationsOpen);
                  }}
                  className="relative p-1.5 rounded-full bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-800 transition cursor-pointer"
                  title="Notifications & Updates"
                >
                  <Bell className="w-3.5 h-3.5 text-amber-500" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-rose-500 text-white font-black text-[9px] rounded-full flex items-center justify-center animate-pulse shadow-2xs">
                      {unreadCount}
                    </span>
                  )}
                </button>

                <AnimatePresence>
                  {isNotificationsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 5, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 5, scale: 0.95 }}
                      className="absolute -right-2 sm:right-0 mt-2 w-[88vw] max-w-xs sm:w-80 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-2xl p-4 z-50 space-y-3"
                    >
                      <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-2">
                        <div className="flex items-center gap-1.5">
                          <Bell className="w-4 h-4 text-amber-500" />
                          <span className="font-black text-xs text-stone-900 dark:text-white">Notifications</span>
                        </div>
                        {unreadCount > 0 && (
                          <button
                            onClick={markAllAsRead}
                            className="text-[10px] font-extrabold text-amber-600 dark:text-amber-400 hover:underline cursor-pointer flex items-center gap-1"
                          >
                            <Check className="w-3 h-3" /> Mark all read
                          </button>
                        )}
                      </div>

                      <div className="space-y-2 max-h-72 overflow-y-auto">
                        {notifications.map(item => (
                          <div
                            key={item.id}
                            onClick={() => {
                              soundEffects.playPop();
                              setNotifications(prev => prev.map(n => n.id === item.id ? { ...n, read: true } : n));
                              if (item.tab) {
                                handleNavClick(item.tab);
                                setIsNotificationsOpen(false);
                              }
                            }}
                            className={`p-3 rounded-xl border text-left cursor-pointer transition ${
                              item.read
                                ? 'bg-stone-50 dark:bg-stone-800/40 border-stone-200/50 dark:border-stone-800/50 opacity-75'
                                : 'bg-amber-500/10 border-amber-500/20 text-stone-900 dark:text-stone-100'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-1 mb-1">
                              <span className="font-extrabold text-xs text-stone-900 dark:text-white">{item.title}</span>
                              <span className="text-[9px] text-stone-400 font-mono">{item.time}</span>
                            </div>
                            <p className="text-[11px] text-stone-600 dark:text-stone-300 leading-snug font-medium">
                              {item.message}
                            </p>
                          </div>
                        ))}
                      </div>

                      <div className="pt-1 text-center border-t border-stone-100 dark:border-stone-800">
                        <p className="text-[10px] text-stone-400 font-medium">
                          Stay consistent • Daily updates &amp; SLA reminders
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Desktop Profile Menu */}
              <div className="hidden md:block relative shrink-0" ref={profileDropdownRef}>
                {authUser ? (
                  <button
                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                    className="flex items-center gap-1.5 p-0.5 rounded-full hover:scale-105 transition cursor-pointer"
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
                          {authUser.displayName || 'Iberio Learner'}
                        </p>
                        <p className="text-[9px] text-stone-500 dark:text-stone-400 truncate">
                          {authUser.email}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Section: Roadmap */}
                <div className="space-y-2.5">
                  <p className="text-[10px] font-black uppercase tracking-widest text-stone-400 dark:text-stone-500 font-mono px-1">
                    ROADMAP & CURRICULUM
                  </p>
                  
                  <div className="grid grid-cols-1 gap-2">
                    {roadmapItems.map(item => {
                      const Icon = item.icon;
                      const isActive = activeTab === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleNavClick(item.id)}
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

                {/* Section: Immersion & Studio */}
                <div className="space-y-2.5">
                  <p className="text-[10px] font-black uppercase tracking-widest text-stone-400 dark:text-stone-500 font-mono px-1">
                    IMMERSION & STUDIO
                  </p>
                  
                  <div className="grid grid-cols-1 gap-2">
                    {[...immersionItems, ...studioItems].map(item => {
                      const Icon = item.icon;
                      const isActive = activeTab === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleNavClick(item.id)}
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

      {/* Sticky Mobile Bottom Navigation Bar */}
      <nav 
        aria-label="Mobile Bottom Navigation"
        className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-stone-950/95 backdrop-blur-md border-t border-stone-200/80 dark:border-stone-800/80 md:hidden flex items-center justify-between px-2 py-1 shadow-lg select-none pb-safe"
      >
        {mobileBottomTabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              id={`mobile-nav-tab-${tab.id}`}
              onClick={() => handleNavClick(tab.id)}
              className={`relative flex-1 flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all cursor-pointer min-h-[44px] ${
                isActive
                  ? 'text-amber-600 dark:text-amber-400 font-extrabold'
                  : 'text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 font-medium'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="mobileActiveTabUnderline"
                  className="absolute top-0 left-3 right-3 h-[2.5px] bg-amber-500 dark:bg-amber-400 rounded-full shadow-xs shadow-amber-500/40"
                  transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                />
              )}
              <div className={`p-1.5 rounded-xl transition ${isActive ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400' : ''}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold leading-tight mt-0.5 truncate max-w-full px-0.5">
                {userProgress.settings.nativeLanguage === 'ar' ? tab.label_ar : tab.label_en}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
};

export const Header = React.memo(HeaderComponent);

