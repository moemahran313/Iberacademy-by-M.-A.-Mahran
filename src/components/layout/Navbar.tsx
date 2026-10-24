import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Compass,
  Sparkles,
  GraduationCap,
  Layers,
  Flame,
  Globe,
  Sun,
  Moon,
  Menu,
  X,
  User as UserIcon,
  LogOut,
  CheckCircle2,
  Bell,
  BookOpen
} from 'lucide-react';
import { UserProgress } from '../../types';
import { IberioLogo } from '../IberacademyLogo';
import { AvatarDisplay } from '../AvatarDisplay';
import { User } from 'firebase/auth';
import { soundEffects } from '../../utils/audio';

export interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userProgress: UserProgress;
  setUserProgress: React.Dispatch<React.SetStateAction<UserProgress>>;
  authUser: User | null;
  onOpenAuthModal?: (mode?: 'signin' | 'signup') => void;
  onLogout: () => void;
  isAuthLoading?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  userProgress,
  setUserProgress,
  authUser,
  onOpenAuthModal,
  onLogout,
  isAuthLoading = false
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(target)) {
        setIsProfileDropdownOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(target)) {
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
    { id: 'dashboard', label_es: 'Hoy', icon: Compass, isActive: activeTab === 'dashboard' },
    { id: 'stories', label_es: 'Inmersión', icon: Sparkles, isActive: activeTab === 'stories' || activeTab === 'videos' },
    {
      id: 'workshop',
      label_es: 'Taller',
      icon: GraduationCap,
      isActive: ['workshop', 'vocabulary', 'verbs', 'grammar', 'tutor', 'shadowing', 'a0_foundation'].includes(activeTab)
    },
    { id: 'path', label_es: 'Progreso', icon: Layers, isActive: activeTab === 'path' || activeTab === 'planner' || activeTab === 'profile' }
  ];

  const streakDays = userProgress.streakDays || 0;
  const isDarkMode = userProgress.settings?.theme === 'dark';

  const handleNavClick = (tabId: string) => {
    soundEffects.playPop();
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
    setIsProfileDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleThemeToggle = () => {
    soundEffects.playPop();
    setUserProgress(prev => ({
      ...prev,
      settings: { ...prev.settings, theme: prev.settings?.theme === 'dark' ? 'light' : 'dark' }
    }));
  };

  const handleLanguageToggle = () => {
    soundEffects.playPop();
    setUserProgress(prev => {
      const nextLang = prev.settings?.nativeLanguage === 'bilingual' ? 'ar' : prev.settings?.nativeLanguage === 'ar' ? 'en' : 'bilingual';
      return { ...prev, settings: { ...prev.settings, nativeLanguage: nextLang } };
    });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FBF9F5]/95 dark:bg-[#121110]/95 backdrop-blur-xl border-b border-stone-200/80 dark:border-stone-800/80 text-stone-900 dark:text-stone-100 transition-all duration-200 pt-safe pl-safe pr-safe">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16 px-4 sm:px-6">
          
          {/* Logo & Level Tag (48px Touch Target Enforced) */}
          <button
            onClick={() => handleNavClick(authUser ? 'dashboard' : 'landing')}
            className="flex items-center gap-2 cursor-pointer select-none group focus:outline-none shrink-0 min-h-[48px] min-w-[48px] px-1 rounded-xl touch-expand-48"
            title="Iberio Dashboard"
          >
            <IberioLogo variant="full" showSubtitle={false} className="h-8" />
            <span className="hidden sm:inline-flex text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-md bg-[#C85A32]/10 text-[#C85A32] dark:text-[#E07A5F] border border-[#C85A32]/20 font-mono">
              {userProgress.currentLevel}
            </span>
          </button>

          {/* Desktop Navigation Tabs (Min 48px Height & Width Touch Target) */}
          <nav className="hidden md:flex items-center space-x-1.5" aria-label="Main Navigation">
            {primaryTabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleNavClick(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 min-h-[48px] min-w-[48px] text-xs font-bold transition-all duration-200 cursor-pointer rounded-xl select-none border ${
                    tab.isActive
                      ? 'text-[#C85A32] dark:text-[#E07A5F] bg-[#C85A32]/10 dark:bg-[#C85A32]/20 border-[#C85A32]/30 shadow-2xs'
                      : 'text-stone-600 dark:text-stone-400 border-transparent hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-200/60 dark:hover:bg-stone-800/50'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{tab.label_es}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action & Stat Items (Minimum 48px touch targets) */}
          <div className="flex items-center gap-2">
            {/* Streak Counter Badge */}
            <div className="flex items-center gap-1.5 px-3 py-2 min-h-[48px] rounded-xl bg-[#C85A32]/10 dark:bg-[#C85A32]/20 border border-[#C85A32]/30 text-[#C85A32] dark:text-[#E07A5F] text-xs font-bold cursor-default select-none">
              <Flame className="w-4 h-4 fill-current" />
              <span className="font-mono">{streakDays}d</span>
            </div>

            {/* Language Switcher (48px Touch Target) */}
            <button
              onClick={handleLanguageToggle}
              className="hidden sm:inline-flex items-center justify-center gap-1.5 min-h-[48px] min-w-[48px] px-3 rounded-xl bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs font-bold text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-800 transition cursor-pointer"
              title="Idioma"
            >
              <Globe className="w-4 h-4" />
              <span className="text-xs uppercase font-mono">
                {userProgress.settings?.nativeLanguage || 'EN'}
              </span>
            </button>

            {/* Theme Toggle Button (48px Touch Target) */}
            <button
              onClick={handleThemeToggle}
              className="hidden sm:inline-flex items-center justify-center min-h-[48px] min-w-[48px] rounded-xl bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-800 transition cursor-pointer"
              aria-label="Toggle Dark Mode"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-stone-600" />}
            </button>

            {/* Profile Dropdown or Sign In (48px Touch Target) */}
            <div className="relative" ref={profileDropdownRef}>
              {authUser ? (
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center justify-center min-h-[48px] min-w-[48px] p-1 rounded-xl transition cursor-pointer"
                  aria-label="User Account Options"
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
                  className="flex items-center gap-2 px-4 py-2.5 min-h-[48px] rounded-xl bg-[#C85A32] hover:bg-[#b34f2a] text-white text-xs font-black transition cursor-pointer shadow-xs disabled:opacity-50"
                >
                  <UserIcon className="w-4 h-4" />
                  <span>Ingresar</span>
                </button>
              )}

              {/* Profile Dropdown */}
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
                          {authUser.displayName || 'Learner'}
                        </p>
                        <p className="text-[10px] text-stone-500 dark:text-stone-400 truncate">
                          {authUser.email}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setIsProfileDropdownOpen(false);
                        handleNavClick('profile');
                      }}
                      className="w-full min-h-[48px] flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-[#C85A32] text-white text-xs font-black hover:bg-[#b34f2a] transition cursor-pointer shadow-xs"
                    >
                      <UserIcon className="w-4 h-4" />
                      <span>Ver Perfil y Configuración</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsProfileDropdownOpen(false);
                        onLogout();
                      }}
                      className="w-full min-h-[48px] flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-rose-500/10 hover:bg-rose-500 text-rose-600 hover:text-white text-xs font-black transition cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Cerrar Sesión</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Drawer Trigger (48px Touch Target Enforced) */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden flex items-center justify-center min-h-[48px] min-w-[48px] p-2.5 rounded-xl bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-200 transition cursor-pointer"
              aria-label="Toggle Mobile Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
