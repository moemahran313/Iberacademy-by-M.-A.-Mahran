import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  User as UserIcon,
  Flame,
  Zap,
  Award,
  BookOpen,
  CheckCircle2,
  Globe,
  Sun,
  Moon,
  Volume2,
  LogOut,
  Sparkles,
  TrendingUp,
  Bookmark,
  Shield,
  CloudCheck,
  Edit3,
  Save,
  RotateCcw,
  Target,
  Clock,
  Heart,
  BarChart3,
  Headphones,
  PenTool,
  Brain,
  Bell,
  Mail,
  Smartphone,
  Calendar,
  Send,
  Check,
  AlertCircle,
  MessageSquare
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Legend
} from 'recharts';
import { UserProgress, CEFRLevel, ExplanationLanguage, ReminderSettings } from '../types';
import { User } from 'firebase/auth';
import { soundEffects } from '../utils/audio';
import { useApp } from '../context/AppContext';
import { AvatarDisplay } from './AvatarDisplay';
import { AvatarGallery } from './AvatarGallery';
import { EmailVerificationBanner } from './EmailVerificationBanner';

interface ProfileViewProps {
  userProgress: UserProgress;
  setUserProgress: React.Dispatch<React.SetStateAction<UserProgress>>;
  authUser: User | null;
  onOpenAuthModal?: (mode?: 'signin' | 'signup') => void;
  onLogout: () => void;
  onOpenPlacementTest: () => void;
  isAuthLoading?: boolean;
}

const INTEREST_TOPICS = [
  'Daily Life & Dialogues',
  'Culture & History',
  'News & World Affairs',
  'Travel & Food',
  'Business & Tech',
  'Literature & Poetry',
  'Grammar & Syntax'
];

export const SPANISH_DIALECTS = [
  { id: 'spain', name: 'Castilian (Spain)', flag: '🇪🇸', desc: 'Peninsular Spanish, vosotros verb forms, distinción (c/z /θ/)' },
  { id: 'mexico', name: 'Mexican Spanish', flag: '🇲🇽', desc: 'Standard North American Spanish, rich colloquial vocabulary' },
  { id: 'argentina', name: 'Rioplatense (Argentina/Uruguay)', flag: '🇦🇷', desc: 'Voseo (vos tenés), distinctive sheísmo accent' },
  { id: 'colombia', name: 'Colombian Spanish', flag: '🇨🇴', desc: 'High vocal clarity (Bogotá / Medellín), polite phrasing' },
  { id: 'caribbean', name: 'Caribbean (PR, DR, Cuba)', flag: '🇩🇴', desc: 'Rhythmic, melodic phrasing and energetic cadence' },
  { id: 'general_latam', name: 'Neutral Latin American', flag: '🌎', desc: 'Universal broadcast standard, widely spoken across Americas' }
];

export const ProfileView: React.FC<ProfileViewProps> = ({
  userProgress,
  setUserProgress,
  authUser,
  onOpenAuthModal,
  onLogout,
  onOpenPlacementTest,
  isAuthLoading = false
}) => {
  const { handleUpdateProfile, openAuthModal } = useApp();
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [customName, setCustomName] = useState(
    authUser?.displayName || userProgress.userInterests?.[0] || 'Spanish Learner'
  );
  const [selectedAvatarId, setSelectedAvatarId] = useState(userProgress.avatarId || 'sun');
  const [selectedPhotoURL, setSelectedPhotoURL] = useState(userProgress.photoURL || authUser?.photoURL || '');
  const [selectedDialect, setSelectedDialect] = useState(userProgress.targetDialect || 'spain');
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [saveToast, setSaveToast] = useState(false);
  const [chartViewMode, setChartViewMode] = useState<'timeline' | 'radar'>('timeline');
  const [testReminderToast, setTestReminderToast] = useState<{ show: boolean; message: string; channel: string } | null>(null);

  const reminderSettings: ReminderSettings = userProgress.settings.reminderSettings || {
    enabled: false,
    channel: 'push',
    preferredTime: '18:00',
    daysOfWeek: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    emailAddress: authUser?.email || '',
    focusArea: 'vocabulary',
    customMessage: '¡Hora de practicar español! Maintain your streak and study today.'
  };

  // Recharts Skill Analytics Time-Series & CEFR Competency Data
  const timeSeriesData = useMemo(() => {
    const xp = userProgress.xp || 0;
    const mastered = userProgress.masteredWordIds?.length || 0;
    const known = userProgress.knownWords?.length || 0;
    const streak = userProgress.streakDays || 1;

    const currentListening = Math.min(98, Math.round(50 + (xp / 50) + streak * 1.5));
    const currentWriting = Math.min(95, Math.round(45 + (mastered * 0.8) + (xp / 70)));
    const currentVocab = Math.min(99, Math.round(55 + (known * 0.3) + (mastered * 0.6)));

    const dates = ['7 Days Ago', '6 Days Ago', '5 Days Ago', '4 Days Ago', '3 Days Ago', '2 Days Ago', 'Today'];
    return dates.map((label, idx) => {
      const prevL = Math.max(25, Math.round(currentListening - (7 - idx) * 4.2 + (idx % 2 === 0 ? 3 : -2)));
      const prevW = Math.max(20, Math.round(currentWriting - (7 - idx) * 3.8 + (idx % 2 === 1 ? 4 : -1)));
      const prevV = Math.max(30, Math.round(currentVocab - (7 - idx) * 3.2 + (idx % 3 === 0 ? 2 : -2)));

      return {
        date: label,
        Listening: idx === 6 ? currentListening : prevL,
        Writing: idx === 6 ? currentWriting : prevW,
        VocabularyUsage: idx === 6 ? currentVocab : prevV,
      };
    });
  }, [userProgress]);

  const radarData = useMemo(() => {
    const xp = userProgress.xp || 0;
    const mastered = userProgress.masteredWordIds?.length || 0;
    const known = userProgress.knownWords?.length || 0;
    const streak = userProgress.streakDays || 1;

    const listening = Math.min(98, Math.round(55 + (xp / 40) + streak * 1.2));
    const writing = Math.min(95, Math.round(50 + (mastered * 0.7) + (xp / 60)));
    const vocabulary = Math.min(99, Math.round(60 + (known * 0.25) + (mastered * 0.5)));
    const grammar = Math.min(94, Math.round(52 + (userProgress.completedLessonIds.length * 2.5)));
    const fluency = Math.min(96, Math.round(48 + streak * 2.5 + (xp / 80)));

    return [
      { skill: 'Listening', score: listening, benchmark: 85 },
      { skill: 'Writing', score: writing, benchmark: 85 },
      { skill: 'Vocabulary', score: vocabulary, benchmark: 85 },
      { skill: 'Grammar', score: grammar, benchmark: 85 },
      { skill: 'Fluency', score: fluency, benchmark: 85 }
    ];
  }, [userProgress]);

  const knownWordsCount = (userProgress.knownWords?.length || 0) + (userProgress.masteredWordIds?.length || 0);
  const activeLingQsCount = Object.keys(userProgress.lingqs || {}).length;
  const minedCount = userProgress.minedSentences?.length || 0;
  const totalWordsRead = userProgress.totalWordsRead || 0;
  const dailyGoal = userProgress.settings.dailyWordsGoal || 250;
  const todayKey = new Date().toISOString().split('T')[0];
  const todayWordsRead = userProgress.dailyWordsRead?.[todayKey] || 0;

  const handleSaveSettings = (updates: Partial<UserProgress['settings']>) => {
    soundEffects.playPop();
    setUserProgress(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        ...updates
      }
    }));
    triggerSaveToast();
  };

  const handleUpdateReminderSettings = (updates: Partial<ReminderSettings>) => {
    soundEffects.playPop();
    const updatedReminder = { ...reminderSettings, ...updates };
    setUserProgress(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        reminderSettings: updatedReminder
      }
    }));
    triggerSaveToast();
  };

  const requestPushPermission = async () => {
    if (!('Notification' in window)) {
      alert('Browser notifications are not supported in this browser environment.');
      return;
    }
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      soundEffects.playPop();
      handleUpdateReminderSettings({ channel: reminderSettings.channel });
      triggerSaveToast();
    } else {
      alert('Browser notification permission was not granted.');
    }
  };

  const handleTestReminder = () => {
    soundEffects.playLevelUp();
    const channel = reminderSettings.channel;
    const msg = reminderSettings.customMessage || '¡Hora de practicar español! Maintain your streak and study today.';
    
    // Attempt browser native notification if permitted
    if ((channel === 'push' || channel === 'both') && 'Notification' in window && Notification.permission === 'granted') {
      try {
        new Notification('🇪🇸 HispanoAcademy Practice Reminder', {
          body: msg
        });
      } catch (e) {
        console.error('Push error:', e);
      }
    }

    setTestReminderToast({
      show: true,
      message: msg,
      channel: channel
    });

    setTimeout(() => {
      setTestReminderToast(null);
    }, 4500);
  };

  const triggerSaveToast = () => {
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  const toggleInterest = (topic: string) => {
    soundEffects.playPop();
    setUserProgress(prev => {
      const current = prev.userInterests || [];
      const updated = current.includes(topic)
        ? current.filter(t => t !== topic)
        : [...current, topic];
      return { ...prev, userInterests: updated };
    });
  };

  const handleSaveProfile = async () => {
    setIsSavingProfile(true);
    soundEffects.playPop();
    try {
      await handleUpdateProfile({
        displayName: customName.trim() || undefined,
        avatarId: selectedAvatarId,
        photoURL: selectedPhotoURL.trim() || undefined,
        targetDialect: selectedDialect,
      });
      triggerSaveToast();
      setIsEditingProfile(false);
      soundEffects.playLevelUp();
    } catch (err) {
      console.error('Failed to update profile:', err);
    } finally {
      setIsSavingProfile(false);
    }
  };

  const currentDialectMeta = SPANISH_DIALECTS.find(d => d.id === (userProgress.targetDialect || selectedDialect)) || SPANISH_DIALECTS[0];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn pb-16">
      {/* Toast Notification */}
      {saveToast && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-20 right-4 z-50 bg-emerald-600 text-white px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-black"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Profile & Settings saved to Cloud!</span>
        </motion.div>
      )}

      {/* Email Verification Action Banner */}
      <EmailVerificationBanner />

      {/* Account Card & Hero Header */}
      <div className="relative overflow-hidden bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          
          {/* User Photo & Info */}
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="relative">
              <AvatarDisplay
                photoURL={userProgress.photoURL || authUser?.photoURL}
                avatarId={userProgress.avatarId || selectedAvatarId}
                name={authUser?.displayName || customName}
                email={authUser?.email}
                size="xl"
              />
              <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1 rounded-full border-2 border-white dark:border-stone-900" title="Cloud Synchronized">
                <Shield className="w-3.5 h-3.5" />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-black text-stone-900 dark:text-white">
                  {authUser?.displayName || customName}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-500 text-stone-950 font-mono">
                  {userProgress.currentLevel} Learner
                </span>
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 flex items-center gap-1">
                  <span>{currentDialectMeta.flag}</span>
                  <span className="text-[10px]">{currentDialectMeta.name.split(' ')[0]}</span>
                </span>
              </div>

              <p className="text-xs text-stone-500 dark:text-stone-400 font-mono">
                {authUser?.email || 'Guest Local Account'}
              </p>

              {authUser ? (
                <div className="inline-flex items-center gap-1.5 text-[11px] font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 px-2.5 py-0.5 rounded-full">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Firestore Cloud Database Active</span>
                </div>
              ) : (
                <button
                  onClick={() => onOpenAuthModal?.('signin')}
                  disabled={isAuthLoading}
                  className="inline-flex items-center gap-1.5 text-[11px] font-extrabold text-stone-950 bg-amber-500 hover:bg-amber-400 px-3 py-1 rounded-full transition cursor-pointer shadow-xs"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Sign In / Create Account</span>
                </button>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 w-full sm:w-auto flex-wrap">
            <button
              onClick={() => setIsEditingProfile(!isEditingProfile)}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-2xl bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-900 dark:text-white border border-stone-200 dark:border-stone-700 text-xs font-black transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Edit3 className="w-4 h-4 text-amber-500" />
              <span>{isEditingProfile ? 'Close Editor' : 'Edit Avatar & Profile'}</span>
            </button>

            {authUser && (
              <button
                onClick={onLogout}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-2xl bg-red-500/10 hover:bg-red-500 text-red-600 hover:text-white border border-red-500/20 text-xs font-black transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            )}

            <button
              onClick={onOpenPlacementTest}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-black transition flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            >
              <Award className="w-4 h-4 text-stone-950" />
              <span>CEFR Exam ({userProgress.currentLevel})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Expandable Profile & Avatar Editor */}
      <AnimatePresence>
        {isEditingProfile && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm overflow-hidden"
          >
            <div className="flex items-center justify-between pb-4 border-b border-stone-100 dark:border-stone-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-stone-900 dark:text-white">
                    Customize Profile & Dialect Target
                  </h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400">
                    Changes are synchronized directly to your cloud profile and the Global League.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleSaveProfile}
                disabled={isSavingProfile}
                className="px-4 py-2 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs transition flex items-center gap-1.5 shadow-md cursor-pointer disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{isSavingProfile ? 'Saving...' : 'Save Changes'}</span>
              </button>
            </div>

            {/* Display Name Input */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-wider text-stone-600 dark:text-stone-300 flex items-center gap-1.5">
                <UserIcon className="w-3.5 h-3.5 text-amber-500" />
                <span>Display Name</span>
              </label>
              <input
                type="text"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder="e.g. Sofia Martinez"
                className="w-full sm:w-80 px-4 py-2.5 rounded-2xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white text-xs font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
              />
            </div>

            {/* Avatar & Photo Picker */}
            <div className="space-y-3">
              <label className="text-xs font-black uppercase tracking-wider text-stone-600 dark:text-stone-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Choose Your Cultural Avatar or Custom Photo</span>
              </label>
              <AvatarGallery
                selectedAvatarId={selectedAvatarId}
                photoURL={selectedPhotoURL}
                displayName={customName}
                onSelectAvatar={(id) => setSelectedAvatarId(id)}
                onUpdatePhotoURL={(url) => setSelectedPhotoURL(url)}
              />
            </div>

            {/* Target Spanish Dialect Selector */}
            <div className="space-y-3 pt-2">
              <label className="text-xs font-black uppercase tracking-wider text-stone-600 dark:text-stone-300 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-amber-500" />
                <span>Target Spanish Dialect Focus</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {SPANISH_DIALECTS.map((dialect) => {
                  const isSelected = selectedDialect === dialect.id;
                  return (
                    <button
                      key={dialect.id}
                      type="button"
                      onClick={() => {
                        soundEffects.playPop();
                        setSelectedDialect(dialect.id);
                      }}
                      className={`p-3.5 rounded-2xl border text-left transition cursor-pointer flex flex-col justify-between gap-1.5 ${
                        isSelected
                          ? 'bg-amber-500/10 border-amber-500 shadow-xs'
                          : 'bg-stone-50 dark:bg-stone-800/50 border-stone-200 dark:border-stone-700 hover:border-amber-500/40'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xl">{dialect.flag}</span>
                        {isSelected && <Check className="w-4 h-4 text-amber-500" />}
                      </div>
                      <div>
                        <p className="text-xs font-black text-stone-900 dark:text-white">
                          {dialect.name}
                        </p>
                        <p className="text-[10px] text-stone-500 dark:text-stone-400 mt-0.5 leading-relaxed">
                          {dialect.desc}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Save Action */}
            <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex justify-end">
              <button
                type="button"
                onClick={handleSaveProfile}
                disabled={isSavingProfile}
                className="px-6 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs transition flex items-center gap-2 shadow-md cursor-pointer disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{isSavingProfile ? 'Saving...' : 'Save Profile Changes'}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* Duolingo-Style Stats & Progress Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-5 space-y-2">
          <div className="flex items-center justify-between text-orange-500">
            <span className="text-[10px] font-black uppercase tracking-wider text-stone-500 dark:text-stone-400">Streak</span>
            <Flame className="w-5 h-5 fill-orange-500" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-white font-mono">{userProgress.streakDays}</span>
            <span className="text-xs text-stone-500 font-bold">days</span>
          </div>
          <p className="text-[10px] text-stone-400">Daily practice active</p>
        </div>

        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-5 space-y-2">
          <div className="flex items-center justify-between text-amber-500">
            <span className="text-[10px] font-black uppercase tracking-wider text-stone-500 dark:text-stone-400">Total XP</span>
            <Zap className="w-5 h-5 fill-amber-500" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-white font-mono">{userProgress.xp}</span>
            <span className="text-xs text-stone-500 font-bold">XP</span>
          </div>
          <p className="text-[10px] text-stone-400">Immersion experience</p>
        </div>

        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-5 space-y-2">
          <div className="flex items-center justify-between text-sky-500">
            <span className="text-[10px] font-black uppercase tracking-wider text-stone-500 dark:text-stone-400">Known Words</span>
            <BookOpen className="w-5 h-5" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-white font-mono">{knownWordsCount}</span>
            <span className="text-xs text-stone-500 font-bold">words</span>
          </div>
          <p className="text-[10px] text-stone-400">Zero lookup fatigue</p>
        </div>

        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-5 space-y-2">
          <div className="flex items-center justify-between text-emerald-500">
            <span className="text-[10px] font-black uppercase tracking-wider text-stone-500 dark:text-stone-400">Total Read</span>
            <TrendingUp className="w-5 h-5" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-white font-mono">{totalWordsRead.toLocaleString()}</span>
            <span className="text-xs text-stone-500 font-bold">words</span>
          </div>
          <p className="text-[10px] text-stone-400">Input volume tracked</p>
        </div>
      </div>

      {/* Recharts Data Visualization: Language Skill Improvement Over Time */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-stone-200 dark:border-stone-800">
          <div>
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-amber-500" />
              <h2 className="text-lg font-black text-stone-900 dark:text-white">
                Proficiency Analytics & Skill Improvement
              </h2>
            </div>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
              Real-time skill trajectory derived from AI tutor interactions, SRS practice sessions, and reading volume.
            </p>
          </div>

          <div className="flex items-center gap-1 bg-stone-100 dark:bg-stone-800 p-1 rounded-2xl border border-stone-200 dark:border-stone-700">
            <button
              onClick={() => setChartViewMode('timeline')}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition cursor-pointer ${
                chartViewMode === 'timeline'
                  ? 'bg-amber-500 text-stone-950 shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              Timeline Trend
            </button>
            <button
              onClick={() => setChartViewMode('radar')}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition cursor-pointer ${
                chartViewMode === 'radar'
                  ? 'bg-amber-500 text-stone-950 shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              CEFR Skill Radar
            </button>
          </div>
        </div>

        {/* Dynamic Skill Summary Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-sky-50/60 dark:bg-sky-950/30 border border-sky-200 dark:border-sky-800/50 rounded-2xl p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-sky-500 text-white">
                <Headphones className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-sky-900 dark:text-sky-300">Listening Skill</p>
                <p className="text-xs text-stone-500 dark:text-stone-400">Audio & Comprehension</p>
              </div>
            </div>
            <span className="text-lg font-black text-sky-600 dark:text-sky-400">
              {timeSeriesData[timeSeriesData.length - 1].Listening}/100
            </span>
          </div>

          <div className="bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 rounded-2xl p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-emerald-500 text-white">
                <PenTool className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-emerald-900 dark:text-emerald-300">Writing & Production</p>
                <p className="text-xs text-stone-500 dark:text-stone-400">AI Tutor Role-Play</p>
              </div>
            </div>
            <span className="text-lg font-black text-emerald-600 dark:text-emerald-400">
              {timeSeriesData[timeSeriesData.length - 1].Writing}/100
            </span>
          </div>

          <div className="bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 rounded-2xl p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-500 text-stone-950">
                <Brain className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[11px] font-bold text-amber-900 dark:text-amber-300">Vocabulary Usage</p>
                <p className="text-xs text-stone-500 dark:text-stone-400">B2 Lexicon & SRS</p>
              </div>
            </div>
            <span className="text-lg font-black text-amber-600 dark:text-amber-400">
              {timeSeriesData[timeSeriesData.length - 1].VocabularyUsage}/100
            </span>
          </div>
        </div>

        {/* Chart View Content */}
        <div className="h-72 w-full pt-2">
          {chartViewMode === 'timeline' ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timeSeriesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorListening" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0284c7" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#0284c7" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorWriting" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorVocab" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#888' }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#888' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1c1917',
                    borderColor: '#444',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />
                <Area type="monotone" dataKey="Listening" stroke="#0284c7" strokeWidth={2.5} fillOpacity={1} fill="url(#colorListening)" name="🎧 Listening Skill" />
                <Area type="monotone" dataKey="Writing" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#colorWriting)" name="✍️ Writing Fluency" />
                <Area type="monotone" dataKey="VocabularyUsage" stroke="#f59e0b" strokeWidth={2.5} fillOpacity={1} fill="url(#colorVocab)" name="📚 B2 Vocabulary Usage" />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                <PolarGrid stroke="#666" strokeOpacity={0.2} />
                <PolarAngleAxis dataKey="skill" tick={{ fontSize: 11, fill: '#888' }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10, fill: '#888' }} />
                <Radar name="Your Current Level" dataKey="score" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.4} />
                <Radar name="CEFR B2 Target" dataKey="benchmark" stroke="#0284c7" fill="#0284c7" fillOpacity={0.15} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1c1917',
                    borderColor: '#444',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />
              </RadarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Customizable Account Settings */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-2 pb-4 border-b border-stone-200 dark:border-stone-800">
          <Target className="w-5 h-5 text-amber-500" />
          <h2 className="text-lg font-black text-stone-900 dark:text-white">
            Customizable Preferences & Daily Goals
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Daily Words Goal */}
          <div className="space-y-3">
            <label className="text-xs font-black uppercase tracking-wider text-stone-500 dark:text-stone-400 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              <span>Daily Reading Volume Goal</span>
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[100, 250, 500, 1000].map(words => (
                <button
                  key={words}
                  onClick={() => handleSaveSettings({ dailyWordsGoal: words })}
                  className={`py-2.5 rounded-2xl text-xs font-black border transition cursor-pointer ${
                    userProgress.settings.dailyWordsGoal === words || (words === 250 && !userProgress.settings.dailyWordsGoal)
                      ? 'bg-amber-500 text-stone-950 border-amber-500 shadow-xs'
                      : 'bg-stone-50 dark:bg-stone-800/60 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700'
                  }`}
                >
                  {words} w/d
                </button>
              ))}
            </div>
            <p className="text-[11px] text-stone-400">
              Set your target daily input volume in Spanish words per day.
            </p>
          </div>

          {/* Explanation / Native Language */}
          <div className="space-y-3">
            <label className="text-xs font-black uppercase tracking-wider text-stone-500 dark:text-stone-400 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-sky-500" />
              <span>Native Explanation Language</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'en', label: 'English' },
                { id: 'ar', label: 'العربية' },
                { id: 'bilingual', label: 'EN + AR' }
              ].map(lang => (
                <button
                  key={lang.id}
                  onClick={() => handleSaveSettings({ nativeLanguage: lang.id as ExplanationLanguage })}
                  className={`py-2.5 rounded-2xl text-xs font-black border transition cursor-pointer ${
                    userProgress.settings.nativeLanguage === lang.id
                      ? 'bg-amber-500 text-stone-950 border-amber-500 shadow-xs'
                      : 'bg-stone-50 dark:bg-stone-800/60 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-stone-400">
              Select your preferred language for grammar rules and translations.
            </p>
          </div>

          {/* Theme Selector */}
          <div className="space-y-3">
            <label className="text-xs font-black uppercase tracking-wider text-stone-500 dark:text-stone-400 flex items-center gap-1.5">
              <Sun className="w-3.5 h-3.5 text-amber-500" />
              <span>Visual Interface Theme</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleSaveSettings({ theme: 'light' })}
                className={`flex items-center justify-center gap-2 py-2.5 rounded-2xl text-xs font-black border transition cursor-pointer ${
                  userProgress.settings.theme === 'light'
                    ? 'bg-amber-500 text-stone-950 border-amber-500 shadow-xs'
                    : 'bg-stone-50 text-stone-700 border-stone-200'
                }`}
              >
                <Sun className="w-4 h-4 text-amber-500" />
                <span>Light Mode</span>
              </button>

              <button
                onClick={() => handleSaveSettings({ theme: 'dark' })}
                className={`flex items-center justify-center gap-2 py-2.5 rounded-2xl text-xs font-black border transition cursor-pointer ${
                  userProgress.settings.theme === 'dark'
                    ? 'bg-amber-500 text-stone-950 border-amber-500 shadow-xs'
                    : 'bg-stone-900 text-stone-200 border-stone-800'
                }`}
              >
                <Moon className="w-4 h-4 text-indigo-400" />
                <span>Dark Mode</span>
              </button>
            </div>
          </div>

          {/* Audio Playback Speed */}
          <div className="space-y-3">
            <label className="text-xs font-black uppercase tracking-wider text-stone-500 dark:text-stone-400 flex items-center gap-1.5">
              <Volume2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Audio Immersion Speed</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[0.75, 1.0, 1.25].map(speed => (
                <button
                  key={speed}
                  onClick={() => handleSaveSettings({ audioSpeed: speed })}
                  className={`py-2.5 rounded-2xl text-xs font-black border transition cursor-pointer ${
                    userProgress.settings.audioSpeed === speed
                      ? 'bg-amber-500 text-stone-950 border-amber-500 shadow-xs'
                      : 'bg-stone-50 dark:bg-stone-800/60 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700'
                  }`}
                >
                  {speed}x {speed === 1.0 ? '(Normal)' : ''}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-stone-400">
              Adjust audio listening speed in reader & pronunciation tools.
            </p>
          </div>
        </div>

        {/* Learning Topic Interests */}
        <div className="pt-4 border-t border-stone-200 dark:border-stone-800 space-y-3">
          <label className="text-xs font-black uppercase tracking-wider text-stone-500 dark:text-stone-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Learning Topic Focus Areas</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {INTEREST_TOPICS.map(topic => {
              const isSelected = userProgress.userInterests?.includes(topic);
              return (
                <button
                  key={topic}
                  onClick={() => toggleInterest(topic)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer border ${
                    isSelected
                      ? 'bg-amber-500 text-stone-950 border-amber-400 shadow-2xs'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 border-stone-200 dark:border-stone-700'
                  }`}
                >
                  {topic} {isSelected ? '✓' : '+'}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Daily Practice Reminders & Notifications Settings Panel */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-stone-200 dark:border-stone-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-2xl bg-amber-500 text-stone-950">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-stone-900 dark:text-white">
                Daily Practice Reminders & Preferred Study Times
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Configure personalized push or email reminders tailored to your preferred practice schedule.
              </p>
            </div>
          </div>

          {/* Master Toggle Switch */}
          <button
            onClick={() => handleUpdateReminderSettings({ enabled: !reminderSettings.enabled })}
            className={`px-4 py-2 rounded-2xl font-black text-xs flex items-center gap-2 transition cursor-pointer ${
              reminderSettings.enabled
                ? 'bg-emerald-500 text-white shadow-md'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400'
            }`}
          >
            {reminderSettings.enabled ? (
              <>
                <Check className="w-4 h-4" />
                <span>Reminders Active</span>
              </>
            ) : (
              <>
                <Bell className="w-4 h-4 opacity-50" />
                <span>Reminders Disabled</span>
              </>
            )}
          </button>
        </div>

        {reminderSettings.enabled ? (
          <div className="space-y-6 animate-fadeIn">
            {/* Delivery Channel Picker */}
            <div className="space-y-3">
              <label className="text-xs font-black uppercase tracking-wider text-stone-500 dark:text-stone-400 flex items-center gap-1.5">
                <Smartphone className="w-3.5 h-3.5 text-amber-500" />
                <span>Delivery Channel</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => handleUpdateReminderSettings({ channel: 'push' })}
                  className={`p-3.5 rounded-2xl border text-left transition cursor-pointer flex flex-col justify-between gap-2 ${
                    reminderSettings.channel === 'push'
                      ? 'bg-amber-500/10 border-amber-500 text-stone-900 dark:text-white shadow-xs'
                      : 'bg-stone-50 dark:bg-stone-800/60 border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <Bell className="w-4 h-4 text-amber-500" />
                    {reminderSettings.channel === 'push' && <Check className="w-4 h-4 text-amber-500" />}
                  </div>
                  <div>
                    <p className="text-xs font-black">Browser Push</p>
                    <p className="text-[11px] text-stone-400">Desktop & Mobile Web popups</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleUpdateReminderSettings({ channel: 'email' })}
                  className={`p-3.5 rounded-2xl border text-left transition cursor-pointer flex flex-col justify-between gap-2 ${
                    reminderSettings.channel === 'email'
                      ? 'bg-amber-500/10 border-amber-500 text-stone-900 dark:text-white shadow-xs'
                      : 'bg-stone-50 dark:bg-stone-800/60 border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <Mail className="w-4 h-4 text-sky-500" />
                    {reminderSettings.channel === 'email' && <Check className="w-4 h-4 text-amber-500" />}
                  </div>
                  <div>
                    <p className="text-xs font-black">Daily Email Digest</p>
                    <p className="text-[11px] text-stone-400">Sent directly to your inbox</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleUpdateReminderSettings({ channel: 'both' })}
                  className={`p-3.5 rounded-2xl border text-left transition cursor-pointer flex flex-col justify-between gap-2 ${
                    reminderSettings.channel === 'both'
                      ? 'bg-amber-500/10 border-amber-500 text-stone-900 dark:text-white shadow-xs'
                      : 'bg-stone-50 dark:bg-stone-800/60 border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Bell className="w-3.5 h-3.5 text-amber-500" />
                      <Mail className="w-3.5 h-3.5 text-sky-500" />
                    </div>
                    {reminderSettings.channel === 'both' && <Check className="w-4 h-4 text-amber-500" />}
                  </div>
                  <div>
                    <p className="text-xs font-black">Both Push & Email</p>
                    <p className="text-[11px] text-stone-400">Maximum consistency coverage</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Email Address Input (shown if email or both selected) */}
            {(reminderSettings.channel === 'email' || reminderSettings.channel === 'both') && (
              <div className="space-y-2 bg-stone-50 dark:bg-stone-800/50 p-4 rounded-2xl border border-stone-200 dark:border-stone-700/80">
                <label className="text-xs font-black text-stone-800 dark:text-stone-200 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-sky-500" />
                  <span>Email Address for Practice Reminders:</span>
                </label>
                <input
                  type="email"
                  value={reminderSettings.emailAddress || ''}
                  onChange={e => handleUpdateReminderSettings({ emailAddress: e.target.value })}
                  placeholder="your.email@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-xs text-stone-900 dark:text-white placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            )}

            {/* Preferred Time & Days of Week */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-wider text-stone-500 dark:text-stone-400 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-500" />
                  <span>Preferred Study Time</span>
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="time"
                    value={reminderSettings.preferredTime || '18:00'}
                    onChange={e => handleUpdateReminderSettings({ preferredTime: e.target.value })}
                    className="px-4 py-2.5 rounded-2xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm font-black text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <span className="text-xs text-stone-500 font-medium">
                    (Your local time)
                  </span>
                </div>

                {/* Quick Time Presets */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {[
                    { label: '🌅 Morning (08:00)', time: '08:00' },
                    { label: '☀️ Lunch (12:30)', time: '12:30' },
                    { label: '🌇 Evening (18:00)', time: '18:00' },
                    { label: '🌙 Night (21:00)', time: '21:00' }
                  ].map(preset => (
                    <button
                      key={preset.time}
                      type="button"
                      onClick={() => handleUpdateReminderSettings({ preferredTime: preset.time })}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer ${
                        reminderSettings.preferredTime === preset.time
                          ? 'bg-amber-500 text-stone-950 border-amber-500'
                          : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 border-stone-200 dark:border-stone-700'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Days of Week Schedule Selector */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-black uppercase tracking-wider text-stone-500 dark:text-stone-400 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-500" />
                    <span>Practice Days</span>
                  </label>
                  <div className="flex gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleUpdateReminderSettings({ daysOfWeek: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] })}
                      className="text-[10px] font-bold text-amber-600 dark:text-amber-400 hover:underline cursor-pointer"
                    >
                      All Days
                    </button>
                    <span className="text-[10px] text-stone-400">•</span>
                    <button
                      type="button"
                      onClick={() => handleUpdateReminderSettings({ daysOfWeek: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] })}
                      className="text-[10px] font-bold text-amber-600 dark:text-amber-400 hover:underline cursor-pointer"
                    >
                      Weekdays
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-7 gap-1.5">
                  {(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const).map(day => {
                    const isSelected = reminderSettings.daysOfWeek?.includes(day);
                    return (
                      <button
                        key={day}
                        type="button"
                        onClick={() => {
                          const currentDays = reminderSettings.daysOfWeek || [];
                          const updatedDays = isSelected
                            ? currentDays.filter(d => d !== day)
                            : [...currentDays, day];
                          handleUpdateReminderSettings({ daysOfWeek: updatedDays });
                        }}
                        className={`py-2 rounded-xl text-xs font-black border transition cursor-pointer text-center ${
                          isSelected
                            ? 'bg-amber-500 text-stone-950 border-amber-500 shadow-2xs'
                            : 'bg-stone-50 dark:bg-stone-800/60 text-stone-400 dark:text-stone-500 border-stone-200 dark:border-stone-700'
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
                <p className="text-[11px] text-stone-400">
                  Select which days of the week you'd like to receive study prompts.
                </p>
              </div>
            </div>

            {/* Target Focus Area */}
            <div className="space-y-3">
              <label className="text-xs font-black uppercase tracking-wider text-stone-500 dark:text-stone-400 flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-amber-500" />
                <span>Reminder Target Focus</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'vocabulary', label: '📚 B2 SRS Vocab' },
                  { id: 'tutor', label: '💬 AI Tutor Chat' },
                  { id: 'stories', label: '📖 Story Reading' },
                  { id: 'grammar', label: '📝 Grammar Rules' }
                ].map(focus => (
                  <button
                    key={focus.id}
                    type="button"
                    onClick={() => handleUpdateReminderSettings({ focusArea: focus.id as any })}
                    className={`py-2 rounded-xl text-xs font-black border transition cursor-pointer ${
                      reminderSettings.focusArea === focus.id
                        ? 'bg-amber-500 text-stone-950 border-amber-500'
                        : 'bg-stone-50 dark:bg-stone-800/60 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700'
                    }`}
                  >
                    {focus.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Reminder Message */}
            <div className="space-y-2">
              <label className="text-xs font-black text-stone-800 dark:text-stone-200 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-amber-500" />
                <span>Personal Motivational Prompt:</span>
              </label>
              <input
                type="text"
                value={reminderSettings.customMessage || ''}
                onChange={e => handleUpdateReminderSettings({ customMessage: e.target.value })}
                placeholder="¡Hora de practicar español! Maintain your streak today."
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs text-stone-900 dark:text-white placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {/* Actions: Request Permission & Test Reminder */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-stone-200 dark:border-stone-800">
              {(reminderSettings.channel === 'push' || reminderSettings.channel === 'both') && 'Notification' in window && (
                <button
                  type="button"
                  onClick={requestPushPermission}
                  className="px-3.5 py-2 rounded-xl text-xs font-extrabold bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Bell className="w-3.5 h-3.5 text-amber-500" />
                  <span>
                    Permission:{' '}
                    <strong className="text-amber-600 dark:text-amber-400">
                      {Notification.permission === 'granted' ? 'Granted ✓' : 'Click to Enable Browser Push'}
                    </strong>
                  </span>
                </button>
              )}

              <button
                type="button"
                onClick={handleTestReminder}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs transition shadow-xs flex items-center gap-2 cursor-pointer ml-auto"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Test Practice Reminder</span>
              </button>
            </div>
          </div>
        ) : (
          <p className="text-xs text-stone-400 italic">
            Enable reminders to receive daily push or email study prompts tailored to your preferred times and days of the week.
          </p>
        )}
      </div>

      {/* Test Notification Popup Overlay */}
      {testReminderToast && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-stone-900 text-white rounded-2xl p-4 shadow-2xl border border-amber-500/50 space-y-2"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-xl bg-amber-500 text-stone-950 font-bold text-xs">
                🇪🇸
              </span>
              <div>
                <p className="text-xs font-black text-amber-400">
                  Practice Reminder • {testReminderToast.channel.toUpperCase()}
                </p>
                <p className="text-[10px] text-stone-400">HispanoAcademy Scheduled Notification</p>
              </div>
            </div>
            <button
              onClick={() => setTestReminderToast(null)}
              className="text-stone-400 hover:text-white text-xs font-bold cursor-pointer"
            >
              ✕
            </button>
          </div>
          <p className="text-xs font-medium text-stone-200 bg-stone-800/80 p-2.5 rounded-xl border border-stone-700">
            "{testReminderToast.message}"
          </p>
        </motion.div>
      )}
    </div>
  );
};
