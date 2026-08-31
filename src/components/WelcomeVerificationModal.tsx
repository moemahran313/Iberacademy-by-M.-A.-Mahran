import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Mail,
  CheckCircle2,
  ExternalLink,
  RefreshCw,
  Sparkles,
  ShieldCheck,
  Clock,
  ArrowRight,
  AlertCircle,
  Eye,
  X,
  Send
} from 'lucide-react';
import { User } from 'firebase/auth';
import { AvatarDisplay } from './AvatarDisplay';
import { CULTURAL_AVATARS } from '../data/avatars';
import { soundEffects } from '../utils/audio';
import { resendVerificationEmail, checkUserEmailVerified } from '../lib/firebase';
import { generateWelcomeEmailTemplate, WelcomeEmailRecord } from '../utils/welcomeEmail';

interface WelcomeVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  avatarId?: string;
  photoURL?: string;
  onVerifiedSuccess?: () => void;
  strictMode?: boolean; // if true, cannot dismiss until verified
}

export const WelcomeVerificationModal: React.FC<WelcomeVerificationModalProps> = ({
  isOpen,
  onClose,
  user,
  avatarId = 'sun',
  photoURL = '',
  onVerifiedSuccess,
  strictMode = false
}) => {
  const [isChecking, setIsChecking] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [isVerified, setIsVerified] = useState(user?.emailVerified || false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'info' | 'error'; text: string } | null>(null);
  const [showEmailPreview, setShowEmailPreview] = useState(false);

  const email = user?.email || 'learner@example.com';
  const displayName = user?.displayName || email.split('@')[0] || 'Spanish Learner';
  const avatarMeta = CULTURAL_AVATARS.find((a) => a.id === avatarId) || CULTURAL_AVATARS[0];

  // Resend cooldown countdown timer (60s)
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const interval = setInterval(() => {
      setResendCooldown((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [resendCooldown]);

  // Sync isVerified with authUser prop
  useEffect(() => {
    if (user) {
      setIsVerified(Boolean(user.emailVerified));
    }
  }, [user]);

  if (!isOpen || !user) return null;

  // Smart mail provider url detector
  const getMailProviderUrl = (emailAddress: string) => {
    const domain = emailAddress.toLowerCase().split('@')[1] || '';
    if (domain.includes('gmail.com') || domain.includes('googlemail.com')) {
      return { name: 'Open Gmail Inbox', url: 'https://mail.google.com' };
    }
    if (domain.includes('outlook.com') || domain.includes('hotmail.com') || domain.includes('live.com')) {
      return { name: 'Open Outlook Inbox', url: 'https://outlook.live.com' };
    }
    if (domain.includes('yahoo.com')) {
      return { name: 'Open Yahoo Mail', url: 'https://mail.yahoo.com' };
    }
    if (domain.includes('icloud.com')) {
      return { name: 'Open iCloud Mail', url: 'https://www.icloud.com/mail' };
    }
    return { name: 'Open Email Inbox', url: `mailto:${emailAddress}` };
  };

  const provider = getMailProviderUrl(email);

  const handleCheckStatus = async () => {
    setIsChecking(true);
    setStatusMessage(null);
    soundEffects.playPop();

    try {
      const verified = await checkUserEmailVerified(user);
      if (verified) {
        setIsVerified(true);
        soundEffects.playLevelUp();
        setStatusMessage({
          type: 'success',
          text: '🎉 Email verified successfully! All cloud features are now fully activated.'
        });
        if (onVerifiedSuccess) onVerifiedSuccess();
        setTimeout(() => {
          onClose();
        }, 1800);
      } else {
        setStatusMessage({
          type: 'info',
          text: 'Verification link not clicked yet. Please check your inbox and spam folder, then click the confirmation link.'
        });
      }
    } catch (err: any) {
      console.warn('Verification check notice:', err);
      setStatusMessage({
        type: 'info',
        text: 'Please click the link sent to your inbox, then press Check Status again.'
      });
    } finally {
      setIsChecking(false);
    }
  };

  const handleSimulateVerification = () => {
    // For seamless testing / preview
    setIsVerified(true);
    soundEffects.playLevelUp();
    try {
      localStorage.setItem('iberio_verified_' + user.uid, 'true');
    } catch {}
    setStatusMessage({
      type: 'success',
      text: '🎉 Verified! Full cloud synchronization and Global League unlocked.'
    });
    if (onVerifiedSuccess) onVerifiedSuccess();
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  const handleResend = async () => {
    if (resendCooldown > 0 || isResending) return;
    setIsResending(true);
    setStatusMessage(null);
    soundEffects.playPop();

    try {
      await resendVerificationEmail(user);
      setResendCooldown(60);
      setStatusMessage({
        type: 'success',
        text: `A fresh verification link has been dispatched to ${email}.`
      });
    } catch (err: any) {
      setStatusMessage({
        type: 'error',
        text: err?.message || 'Could not dispatch verification email. Please try again in 60 seconds.'
      });
      setResendCooldown(30);
    } finally {
      setIsResending(false);
    }
  };

  const welcomePreview = generateWelcomeEmailTemplate({
    email,
    displayName,
    avatarId,
    currentLevel: 'A1'
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/85 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative w-full max-w-lg bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
      >
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 p-6 text-stone-950 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-2xl bg-stone-950/10 backdrop-blur-xs">
              <Mail className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider bg-stone-950/15 px-2 py-0.5 rounded-full">
                Step 1 of 1 • Account Security
              </span>
              <h2 className="text-lg font-black leading-tight mt-0.5">
                {isVerified ? '¡Cuenta Verificada!' : 'Verify Your Email Address'}
              </h2>
            </div>
          </div>

          {!strictMode && (
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-stone-950/10 hover:bg-stone-950/20 text-stone-950 transition cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 overflow-y-auto">
          {/* Welcome User Banner */}
          <div className="flex items-center gap-4 p-4 rounded-3xl bg-amber-50 dark:bg-stone-800/80 border border-amber-200 dark:border-stone-700">
            <div className="relative shrink-0">
              <AvatarDisplay
                photoURL={photoURL}
                avatarId={!photoURL ? avatarId : undefined}
                name={displayName}
                size="lg"
              />
              <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-amber-500 text-stone-950 shadow-xs">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
            </div>

            <div className="space-y-1 min-w-0">
              <h3 className="text-sm font-black text-stone-900 dark:text-white truncate">
                ¡Bienvenido/a, {displayName}!
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-300 font-mono truncate">
                {email}
              </p>
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-700 dark:text-amber-400">
                <span>{avatarMeta.emoji} {avatarMeta.name}</span>
                <span>•</span>
                <span>0 XP (Fresh Path)</span>
              </div>
            </div>
          </div>

          {/* Verification Explanation */}
          <div className="space-y-2 text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
            <p>
              We’ve dispatched a <strong>verification confirmation link</strong> and an official <strong>welcome guide</strong> to your inbox.
            </p>
            <p className="text-[11px] text-stone-500 dark:text-stone-400">
              Confirming your email unlocks your <strong>Cloud Synchronization</strong>, <strong>Global League Ranking</strong>, and official <strong>CEFR Mastery Certificates</strong>.
            </p>
          </div>

          {/* Status Message Notification */}
          <AnimatePresence mode="wait">
            {statusMessage && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className={`p-3.5 rounded-2xl text-xs flex items-start gap-2.5 ${
                  statusMessage.type === 'success'
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
                    : statusMessage.type === 'error'
                    ? 'bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-300'
                    : 'bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300'
                }`}
              >
                {statusMessage.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                ) : statusMessage.type === 'error' ? (
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                ) : (
                  <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                )}
                <span className="leading-relaxed font-medium">{statusMessage.text}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Primary Action Buttons */}
          <div className="space-y-3">
            {/* 1-Click Inbox Shortcut */}
            <a
              href={provider.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition cursor-pointer"
            >
              <span>{provider.name}</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            {/* Check Verification Status */}
            <button
              type="button"
              onClick={handleCheckStatus}
              disabled={isChecking || isVerified}
              className="w-full py-3 px-5 rounded-2xl bg-stone-900 dark:bg-stone-800 hover:bg-stone-800 dark:hover:bg-stone-700 text-white font-black text-xs flex items-center justify-center gap-2 transition cursor-pointer disabled:opacity-50 border border-stone-700"
            >
              <RefreshCw className={`w-4 h-4 ${isChecking ? 'animate-spin' : ''}`} />
              <span>{isChecking ? 'Polling Firebase Cloud...' : 'Check Verification Status'}</span>
            </button>
          </div>

          {/* Resend Throttle & Preview */}
          <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between flex-wrap gap-2 text-xs">
            <button
              type="button"
              onClick={handleResend}
              disabled={resendCooldown > 0 || isResending || isVerified}
              className="text-stone-600 dark:text-stone-400 hover:text-amber-600 dark:hover:text-amber-400 font-bold transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-3.5 h-3.5" />
              <span>
                {resendCooldown > 0
                  ? `Resend in ${resendCooldown}s`
                  : isResending
                  ? 'Sending...'
                  : 'Resend Verification Email'}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setShowEmailPreview(!showEmailPreview)}
              className="text-stone-500 hover:text-stone-900 dark:hover:text-white underline font-medium flex items-center gap-1 cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{showEmailPreview ? 'Hide Welcome Email' : 'Preview Welcome Email'}</span>
            </button>
          </div>

          {/* Welcome Email Inspection Drawer */}
          <AnimatePresence>
            {showEmailPreview && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="p-4 rounded-2xl bg-stone-100 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 text-xs space-y-2 overflow-hidden"
              >
                <div className="flex items-center justify-between text-stone-500">
                  <span className="font-mono text-[10px]">Subject: {welcomePreview.subject}</span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded-full font-bold">
                    Dispatched
                  </span>
                </div>
                <div className="p-3 bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 text-[11px] font-mono whitespace-pre-line text-stone-700 dark:text-stone-300 max-h-40 overflow-y-auto">
                  {welcomePreview.textContent}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Quick Simulation / Dismiss for Dev */}
          <div className="pt-2 flex items-center justify-between text-[11px] text-stone-400">
            <button
              type="button"
              onClick={handleSimulateVerification}
              className="hover:text-amber-500 underline cursor-pointer"
              title="Click for immediate local verification confirmation"
            >
              ⚡ Instant 1-Click Verification (Demo)
            </button>

            {!strictMode && (
              <button
                type="button"
                onClick={onClose}
                className="hover:text-stone-900 dark:hover:text-white underline cursor-pointer"
              >
                Continue to Dashboard →
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
