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
  Laptop,
  Type,
  Menu,
  X,
  User as UserIcon,
  LogOut,
  CheckCircle2,
  Bell,
  BookOpen,
  ChevronDown
} from 'lucide-react';
import { UserProgress } from '../../types';
import { IberioLogo } from '../IberacademyLogo';
import { AvatarDisplay } from '../AvatarDisplay';
import { User } from 'firebase/auth';
import { soundEffects } from '../../utils/audio';
import { useTheme, ThemeMode, ReaderFontFamily } from '../../context/ThemeContext';

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
  const {
    theme,
    resolvedTheme,
    isDark,
    setTheme,
    toggleTheme,
    readerSettings,
    setReaderFontSize,
    setReaderLineHeight,
    setReaderFontFamily,
    resetReaderTypography,
  } = useTheme();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isThemeDropdownOpen, setIsThemeDropdownOpen] = useState(false);
  const [isTypographyOpen, setIsTypographyOpen] = useState(false);

  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const themeDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(target)) {
        setIsProfileDropdownOpen(false);
      }
      if (themeDropdownRef.current && !themeDropdownRef.current.contains(target)) {
        setIsThemeDropdownOpen(false);
        setIsTypographyOpen(false);
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

  const handleNavClick = (tabId: string) => {
    soundEffects.playPop();
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
    setIsProfileDropdownOpen(false);
    setIsThemeDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTheme = (mode: ThemeMode) => {
    soundEffects.playPop();
    setTheme(mode);
    setUserProgress(prev => ({
      ...prev,
      settings: { ...prev.settings, theme: mode === 'dark' ? 'dark' : 'light' }
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
    <header className="sticky top-0 z-40 bg-[#FDFBF7]/95 dark:bg-[#0F172A]/95 backdrop-blur-xl border-b border-stone-200/80 dark:border-slate-800/80 text-[#1E293B] dark:text-[#F1F5F9] transition-colors duration-200 pt-safe pl-safe pr-safe">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16 px-4 sm:px-6">
          
          {/* Logo & Level Tag (48px Touch Target Enforced) */}
          <button
            onClick={() => handleNavClick(authUser ? 'dashboard' : 'landing')}
            className="flex items-center gap-2 cursor-pointer select-none group focus:outline-none shrink-0 min-h-[48px] min-w-[48px] px-1 rounded-xl touch-expand-48"
            title="Iberio Dashboard"
          >
            <IberioLogo variant="full" showSubtitle={false} className="h-8" />
            <span className="hidden sm:inline-flex text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-md bg-[#EA580C]/10 text-[#EA580C] dark:text-[#F97316] border border-[#EA580C]/20 font-mono">
              {userProgress.currentLevel}
            </span>
          </button>

          {/* Desktop Navigation Tabs (Min 48px Touch Target) */}
          <nav className="hidden md:flex items-center space-x-1.5" aria-label="Main Navigation">
            {primaryTabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleNavClick(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 min-h-[48px] min-w-[48px] text-xs font-bold transition-all duration-200 cursor-pointer rounded-xl select-none border ${
                    tab.isActive
                      ? 'text-[#EA580C] dark:text-[#10B981] bg-[#EA580C]/10 dark:bg-[#10B981]/15 border-[#EA580C]/30 dark:border-[#10B981]/30 shadow-2xs font-extrabold'
                      : 'text-[#334155] dark:text-[#CBD5E1] border-transparent hover:text-[#1E293B] dark:hover:text-[#F1F5F9] hover:bg-stone-200/60 dark:hover:bg-slate-800/60'
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
            <div className="flex items-center gap-1.5 px-3 py-2 min-h-[48px] rounded-xl bg-[#EA580C]/10 dark:bg-[#F59E0B]/15 border border-[#EA580C]/30 dark:border-[#F59E0B]/30 text-[#EA580C] dark:text-[#F59E0B] text-xs font-bold cursor-default select-none">
              <Flame className="w-4 h-4 fill-current" />
              <span className="font-mono">{streakDays}d</span>
            </div>

            {/* Language Switcher (48px Touch Target) */}
            <button
              onClick={handleLanguageToggle}
              className="hidden sm:inline-flex items-center justify-center gap-1.5 min-h-[48px] min-w-[48px] px-3 rounded-xl bg-[#FFFFFF] dark:bg-[#1E293B] border border-stone-200 dark:border-slate-700 text-xs font-bold text-[#1E293B] dark:text-[#F1F5F9] hover:bg-stone-100 dark:hover:bg-slate-800 transition cursor-pointer"
              title="Idioma de traducción"
              aria-label="Cambiar idioma de referencia"
            >
              <Globe className="w-4 h-4" />
              <span className="text-xs uppercase font-mono">
                {userProgress.settings?.nativeLanguage || 'EN'}
              </span>
            </button>

            {/* Dynamic Theme & Typography Popover (48px Touch Target) */}
            <div className="relative" ref={themeDropdownRef}>
              <button
                onClick={() => {
                  soundEffects.playPop();
                  setIsThemeDropdownOpen(!isThemeDropdownOpen);
                }}
                className="inline-flex items-center justify-center gap-1 min-h-[48px] min-w-[48px] px-2.5 rounded-xl bg-[#FFFFFF] dark:bg-[#1E293B] border border-stone-200 dark:border-slate-700 text-[#1E293B] dark:text-[#F1F5F9] hover:bg-stone-100 dark:hover:bg-slate-800 transition cursor-pointer"
                aria-label={`Tema: ${theme}. Pulsa para opciones de tema y tipografía`}
                title={`Tema actual: ${resolvedTheme === 'dark' ? 'Oscuro' : 'Claro'}`}
              >
                {resolvedTheme === 'dark' ? (
                  <Moon className="w-4 h-4 text-[#F59E0B]" />
                ) : (
                  <Sun className="w-4 h-4 text-[#EA580C]" />
                )}
                <ChevronDown className="w-3 h-3 opacity-60" />
              </button>

              <AnimatePresence>
                {isThemeDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -4 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -4 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-72 bg-[#FFFFFF] dark:bg-[#1E293B] border border-stone-200 dark:border-slate-700 rounded-2xl shadow-2xl p-3.5 z-50 space-y-3.5"
                  >
                    {/* Theme Mode Selector */}
                    <div>
                      <p className="text-[11px] font-bold text-[#475569] dark:text-[#94A3B8] uppercase tracking-wider mb-2">
                        Esquema de Color (WCAG AAA)
                      </p>
                      <div className="grid grid-cols-3 gap-1.5">
                        <button
                          onClick={() => handleSelectTheme('light')}
                          className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl text-xs font-bold transition border min-h-[48px] cursor-pointer ${
                            theme === 'light'
                              ? 'bg-[#EA580C]/15 border-[#EA580C] text-[#EA580C] font-extrabold'
                              : 'bg-stone-100 dark:bg-slate-800 border-transparent text-[#334155] dark:text-[#CBD5E1] hover:bg-stone-200 dark:hover:bg-slate-700'
                          }`}
                        >
                          <Sun className="w-4 h-4 mb-1 text-[#EA580C]" />
                          <span>Claro</span>
                        </button>

                        <button
                          onClick={() => handleSelectTheme('dark')}
                          className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl text-xs font-bold transition border min-h-[48px] cursor-pointer ${
                            theme === 'dark'
                              ? 'bg-[#10B981]/15 border-[#10B981] text-[#10B981] font-extrabold'
                              : 'bg-stone-100 dark:bg-slate-800 border-transparent text-[#334155] dark:text-[#CBD5E1] hover:bg-stone-200 dark:hover:bg-slate-700'
                          }`}
                        >
                          <Moon className="w-4 h-4 mb-1 text-[#F59E0B]" />
                          <span>Oscuro</span>
                        </button>

                        <button
                          onClick={() => handleSelectTheme('system')}
                          className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl text-xs font-bold transition border min-h-[48px] cursor-pointer ${
                            theme === 'system'
                              ? 'bg-[#3B82F6]/15 border-[#3B82F6] text-[#3B82F6] font-extrabold'
                              : 'bg-stone-100 dark:bg-slate-800 border-transparent text-[#334155] dark:text-[#CBD5E1] hover:bg-stone-200 dark:hover:bg-slate-700'
                          }`}
                        >
                          <Laptop className="w-4 h-4 mb-1 text-[#3B82F6]" />
                          <span>Auto</span>
                        </button>
                      </div>
                    </div>

                    {/* Reader Typography Controls Toggle */}
                    <div className="pt-2 border-t border-stone-200 dark:border-slate-700">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-bold text-[#475569] dark:text-[#94A3B8] uppercase tracking-wider flex items-center gap-1.5">
                          <Type className="w-3.5 h-3.5" />
                          Tipografía Lectura
                        </span>
                        <button
                          onClick={resetReaderTypography}
                          className="text-[10px] text-[#EA580C] dark:text-[#F97316] hover:underline font-bold"
                        >
                          Restablecer
                        </button>
                      </div>

                      {/* Font Family Choice */}
                      <div className="grid grid-cols-3 gap-1 mb-2.5">
                        {(['lora', 'merriweather', 'fraunces'] as ReaderFontFamily[]).map((f) => (
                          <button
                            key={f}
                            onClick={() => {
                              soundEffects.playPop();
                              setReaderFontFamily(f);
                            }}
                            className={`py-1.5 px-1 rounded-lg text-xs capitalize transition border ${
                              readerSettings.fontFamily === f
                                ? 'border-[#EA580C] dark:border-[#10B981] bg-[#EA580C]/10 dark:bg-[#10B981]/15 font-bold'
                                : 'border-stone-200 dark:border-slate-700 hover:bg-stone-100 dark:hover:bg-slate-800'
                            }`}
                            style={{
                              fontFamily: f === 'lora' ? 'Lora, serif' : f === 'merriweather' ? 'Merriweather, serif' : 'Fraunces, serif'
                            }}
                          >
                            {f === 'fraunces' ? 'Fraunces' : f === 'lora' ? 'Lora' : 'Merriw.'}
                          </button>
                        ))}
                      </div>

                      {/* Font Size Slider */}
                      <div className="space-y-1 mb-2">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-[#334155] dark:text-[#CBD5E1]">Tamaño</span>
                          <span className="font-mono text-[#1E293B] dark:text-[#F1F5F9]">{readerSettings.fontSize}px</span>
                        </div>
                        <input
                          type="range"
                          min="16"
                          max="28"
                          step="1"
                          value={readerSettings.fontSize}
                          onChange={(e) => setReaderFontSize(Number(e.target.value))}
                          className="w-full accent-[#EA580C] dark:accent-[#10B981] cursor-pointer"
                        />
                      </div>

                      {/* Line Height Slider */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs font-semibold">
                          <span className="text-[#334155] dark:text-[#CBD5E1]">Interlineado</span>
                          <span className="font-mono text-[#1E293B] dark:text-[#F1F5F9]">{readerSettings.lineHeight}x</span>
                        </div>
                        <input
                          type="range"
                          min="1.6"
                          max="2.0"
                          step="0.05"
                          value={readerSettings.lineHeight}
                          onChange={(e) => setReaderLineHeight(Number(e.target.value))}
                          className="w-full accent-[#EA580C] dark:accent-[#10B981] cursor-pointer"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Profile Dropdown or Sign In (48px Touch Target) */}
            <div className="relative" ref={profileDropdownRef}>
              {authUser ? (
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center justify-center min-h-[48px] min-w-[48px] p-1 rounded-xl transition cursor-pointer"
                  aria-label="Opciones de cuenta"
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
                  className="flex items-center gap-2 px-4 py-2.5 min-h-[48px] rounded-xl bg-[#EA580C] hover:bg-[#C2410C] text-white text-xs font-black transition cursor-pointer shadow-xs disabled:opacity-50"
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
                    className="absolute right-0 mt-2 w-64 bg-[#FFFFFF] dark:bg-[#1E293B] border border-stone-200 dark:border-slate-700 rounded-2xl shadow-2xl p-4 z-50 space-y-3"
                  >
                    <div className="flex items-center gap-3 pb-3 border-b border-stone-200 dark:border-slate-700">
                      <AvatarDisplay
                        photoURL={authUser.photoURL}
                        avatarId={userProgress.avatarId}
                        name={authUser.displayName}
                        email={authUser.email}
                        size="md"
                      />
                      <div className="overflow-hidden">
                        <p className="font-extrabold text-xs text-[#1E293B] dark:text-[#F1F5F9] truncate">
                          {authUser.displayName || 'Estudiante'}
                        </p>
                        <p className="text-[10px] text-[#475569] dark:text-[#94A3B8] truncate">
                          {authUser.email}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setIsProfileDropdownOpen(false);
                        handleNavClick('profile');
                      }}
                      className="w-full min-h-[48px] flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-[#EA580C] text-white text-xs font-black hover:bg-[#C2410C] transition cursor-pointer shadow-xs"
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
              className="md:hidden flex items-center justify-center min-h-[48px] min-w-[48px] p-2.5 rounded-xl bg-[#FFFFFF] dark:bg-[#1E293B] border border-stone-200 dark:border-slate-700 text-[#1E293B] dark:text-[#F1F5F9] transition cursor-pointer"
              aria-label="Abrir Menú de Navegación"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-stone-200 dark:border-slate-800 px-4 py-4 space-y-2 bg-[#FDFBF7] dark:bg-[#0F172A]"
            >
              <div className="grid grid-cols-2 gap-2">
                {primaryTabs.map(tab => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => handleNavClick(tab.id)}
                      className={`flex items-center gap-2 px-3 py-3 min-h-[48px] text-xs font-bold rounded-xl border ${
                        tab.isActive
                          ? 'text-[#EA580C] dark:text-[#10B981] bg-[#EA580C]/10 dark:bg-[#10B981]/15 border-[#EA580C]/30 dark:border-[#10B981]/30 font-black'
                          : 'text-[#334155] dark:text-[#CBD5E1] border-stone-200 dark:border-slate-800'
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{tab.label_es}</span>
                    </button>
                  );
                })}
              </div>

              {/* Mobile Quick Theme Switcher */}
              <div className="flex items-center justify-between pt-3 border-t border-stone-200 dark:border-slate-800">
                <span className="text-xs font-bold text-[#334155] dark:text-[#CBD5E1]">Tema Visual</span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleSelectTheme('light')}
                    className={`min-h-[48px] min-w-[48px] rounded-xl flex items-center justify-center border ${
                      theme === 'light' ? 'bg-[#EA580C]/15 border-[#EA580C] text-[#EA580C]' : 'border-stone-200 dark:border-slate-700'
                    }`}
                    aria-label="Tema Claro"
                  >
                    <Sun className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleSelectTheme('dark')}
                    className={`min-h-[48px] min-w-[48px] rounded-xl flex items-center justify-center border ${
                      theme === 'dark' ? 'bg-[#10B981]/15 border-[#10B981] text-[#10B981]' : 'border-stone-200 dark:border-slate-700'
                    }`}
                    aria-label="Tema Oscuro"
                  >
                    <Moon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleSelectTheme('system')}
                    className={`min-h-[48px] min-w-[48px] rounded-xl flex items-center justify-center border ${
                      theme === 'system' ? 'bg-[#3B82F6]/15 border-[#3B82F6] text-[#3B82F6]' : 'border-stone-200 dark:border-slate-700'
                    }`}
                    aria-label="Tema Sistema"
                  >
                    <Laptop className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};
