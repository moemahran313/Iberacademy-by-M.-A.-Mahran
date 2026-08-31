import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Mail,
  Lock,
  User,
  Sparkles,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  X,
  ShieldCheck,
  Zap,
  Image as ImageIcon,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { IberioLogo } from './IberacademyLogo';
import { soundEffects } from '../utils/audio';
import { useApp } from '../context/AppContext';
import { formatAuthErrorMessage } from '../lib/firebase';
import { AvatarDisplay } from './AvatarDisplay';
import { AvatarPicker } from './AvatarPicker';
import { CULTURAL_AVATARS } from '../data/avatars';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'signin' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'signin',
}) => {
  const { handleEmailSignIn, handleEmailSignUp, handleGuestSignIn, setActiveTab } = useApp();
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedAvatarId, setSelectedAvatarId] = useState('sun');
  const [photoURL, setPhotoURL] = useState('');
  const [isAvatarPickerOpen, setIsAvatarPickerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Sync mode with initialMode prop when modal opens
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setErrorMessage(null);
      setSuccessMessage(null);
      setIsAvatarPickerOpen(false);
    }
  }, [isOpen, initialMode]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    const cleanEmail = email.trim();
    const cleanPassword = password.trim();

    if (!cleanEmail) {
      setErrorMessage('Please enter your email address.');
      return;
    }
    if (!cleanPassword) {
      setErrorMessage('Please enter your password.');
      return;
    }

    if (mode === 'signup') {
      if (cleanPassword.length < 6) {
        setErrorMessage('Password must be at least 6 characters.');
        return;
      }
      if (cleanPassword !== confirmPassword.trim()) {
        setErrorMessage('Passwords do not match.');
        return;
      }
    }

    setIsLoading(true);

    try {
      if (mode === 'signup') {
        await handleEmailSignUp(
          cleanEmail,
          cleanPassword,
          name.trim() || undefined,
          selectedAvatarId,
          photoURL.trim() || undefined
        );
        soundEffects.playLevelUp();
        setSuccessMessage('Account created and registered in database!');
      } else {
        await handleEmailSignIn(cleanEmail, cleanPassword);
        soundEffects.playPop();
        setSuccessMessage('Signed in successfully!');
      }

      setActiveTab('dashboard');
      onClose();
    } catch (err: any) {
      setErrorMessage(formatAuthErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuestAccess = () => {
    soundEffects.playPop();
    handleGuestSignIn(
      name.trim() || 'Spanish Learner',
      undefined,
      selectedAvatarId,
      photoURL.trim() || undefined
    );
    setActiveTab('dashboard');
    onClose();
  };

  const currentAvatarMeta = CULTURAL_AVATARS.find(a => a.id === selectedAvatarId) || CULTURAL_AVATARS[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative w-full max-w-md bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
      >
        {/* Header Bar with Logo & Close button */}
        <div className="px-6 pt-6 pb-4 border-b border-stone-100 dark:border-stone-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <IberioLogo variant="compact" size={32} />
            <div>
              <h3 className="text-base font-black text-stone-900 dark:text-white">
                {mode === 'signin' ? 'Sign In to Iberio' : 'Create Free Account'}
              </h3>
              <p className="text-[11px] text-stone-500 dark:text-stone-400 font-medium">
                Email & Password Cloud Authentication
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Modal Body */}
        <div className="p-6 space-y-4 overflow-y-auto">
          {/* Tab Switcher: Sign In vs Sign Up */}
          <div className="flex rounded-2xl bg-stone-100 dark:bg-stone-800 p-1 border border-stone-200/60 dark:border-stone-700/60">
            <button
              type="button"
              onClick={() => {
                soundEffects.playPop();
                setMode('signin');
                setErrorMessage(null);
              }}
              className={`flex-1 py-2 text-xs font-black rounded-xl transition-all cursor-pointer ${
                mode === 'signin'
                  ? 'bg-amber-500 text-stone-950 shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                soundEffects.playPop();
                setMode('signup');
                setErrorMessage(null);
              }}
              className={`flex-1 py-2 text-xs font-black rounded-xl transition-all cursor-pointer ${
                mode === 'signup'
                  ? 'bg-amber-500 text-stone-950 shadow-xs'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Error & Success Alerts */}
          <AnimatePresence mode="wait">
            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="p-3.5 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/60 text-red-700 dark:text-red-300 text-xs flex flex-col gap-2"
              >
                <div className="flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span className="font-medium leading-relaxed">{errorMessage}</span>
                </div>
                {mode === 'signup' && errorMessage.includes('already exists') && (
                  <button
                    type="button"
                    onClick={() => {
                      soundEffects.playPop();
                      setMode('signin');
                      setErrorMessage(null);
                    }}
                    className="self-start text-[11px] font-black underline hover:text-red-900 dark:hover:text-red-100 cursor-pointer ml-6"
                  >
                    Switch to Sign In →
                  </button>
                )}
              </motion.div>
            )}

            {successMessage && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-300 text-xs flex items-start gap-2.5"
              >
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                <span className="font-medium leading-relaxed">{successMessage}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {mode === 'signup' && (
              <>
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-black uppercase tracking-wider text-stone-600 dark:text-stone-300 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-amber-500" />
                    <span>Display Name</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Carlos Rodriguez"
                    className="w-full px-4 py-2.5 rounded-2xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white placeholder:text-stone-400 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
                  />
                </div>

                {/* Optional Avatar & Profile Picture Selector */}
                <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-800/40 p-3 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AvatarDisplay
                        photoURL={photoURL}
                        avatarId={!photoURL ? selectedAvatarId : undefined}
                        name={name || 'Learner'}
                        size="sm"
                      />
                      <div>
                        <p className="text-xs font-black text-stone-800 dark:text-stone-200">
                          Profile Avatar (Optional)
                        </p>
                        <p className="text-[10px] text-stone-400">
                          {photoURL ? 'Custom image loaded' : currentAvatarMeta.name}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsAvatarPickerOpen(!isAvatarPickerOpen)}
                      className="px-2.5 py-1 text-xs font-bold rounded-xl bg-stone-100 dark:bg-stone-700 hover:bg-stone-200 dark:hover:bg-stone-600 text-stone-700 dark:text-stone-200 transition cursor-pointer flex items-center gap-1"
                    >
                      <span>{isAvatarPickerOpen ? 'Hide' : 'Choose'}</span>
                      {isAvatarPickerOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </button>
                  </div>

                  <AnimatePresence>
                    {isAvatarPickerOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pt-2 border-t border-stone-200/80 dark:border-stone-700/80 overflow-hidden"
                      >
                        <AvatarPicker
                          selectedAvatarId={selectedAvatarId}
                          photoURL={photoURL}
                          displayName={name || 'Learner'}
                          onSelectAvatar={(id) => setSelectedAvatarId(id)}
                          onUpdatePhotoURL={(url) => setPhotoURL(url)}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            )}

            {/* Email Address */}
            <div className="space-y-1.5">
              <label className="text-xs font-black uppercase tracking-wider text-stone-600 dark:text-stone-300 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-amber-500" />
                <span>Email Address</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
                autoComplete="email"
                className="w-full px-4 py-2.5 rounded-2xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white placeholder:text-stone-400 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-black uppercase tracking-wider text-stone-600 dark:text-stone-300 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-amber-500" />
                  <span>Password</span>
                </label>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                  className="w-full px-4 py-2.5 rounded-2xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white placeholder:text-stone-400 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 transition pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 cursor-pointer p-1"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {mode === 'signup' && (
                <p className="text-[10px] text-stone-400">At least 6 characters required</p>
              )}
            </div>

            {/* Confirm Password */}
            {mode === 'signup' && (
              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase tracking-wider text-stone-600 dark:text-stone-300 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                  <span>Confirm Password</span>
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  autoComplete="new-password"
                  className="w-full px-4 py-2.5 rounded-2xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-white placeholder:text-stone-400 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3 px-6 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <span>{mode === 'signin' ? 'Signing in...' : 'Creating account...'}</span>
              ) : (
                <>
                  <span>{mode === 'signin' ? 'Sign In & Launch Dashboard' : 'Create Account & Save Profile'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Database Info & Guest Option */}
          <div className="pt-3 border-t border-stone-100 dark:border-stone-800 space-y-3 text-center shrink-0">
            <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-500 dark:text-stone-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Real Firestore Database & Auth Integration</span>
            </div>

            <button
              type="button"
              onClick={handleGuestAccess}
              className="text-xs font-bold text-stone-600 dark:text-stone-400 hover:text-amber-600 dark:hover:text-amber-400 underline cursor-pointer"
            >
              ⚡ Explore with 1-Click Guest Mode
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
