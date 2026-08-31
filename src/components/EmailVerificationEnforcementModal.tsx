import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  ShieldAlert,
  Mail,
  RefreshCw,
  ExternalLink,
  Send,
  CheckCircle2,
  Lock,
  X,
  AlertCircle
} from 'lucide-react';
import { User } from 'firebase/auth';
import { soundEffects } from '../utils/audio';
import { resendVerificationEmail, checkUserEmailVerified } from '../lib/firebase';

interface EmailVerificationEnforcementModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  featureName?: string;
  onVerifiedSuccess?: () => void;
}

export const EmailVerificationEnforcementModal: React.FC<EmailVerificationEnforcementModalProps> = ({
  isOpen,
  onClose,
  user,
  featureName = 'this cloud feature',
  onVerifiedSuccess
}) => {
  const [isChecking, setIsChecking] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'info' | 'error'; text: string } | null>(null);

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const interval = setInterval(() => {
      setResendCooldown((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [resendCooldown]);

  if (!isOpen || !user) return null;

  const email = user.email || 'learner@example.com';

  const handleCheckStatus = async () => {
    setIsChecking(true);
    setStatusMessage(null);
    soundEffects.playPop();

    try {
      const verified = await checkUserEmailVerified(user);
      if (verified) {
        soundEffects.playLevelUp();
        setStatusMessage({
          type: 'success',
          text: '🎉 Email verified! Access granted.'
        });
        if (onVerifiedSuccess) onVerifiedSuccess();
        setTimeout(() => {
          onClose();
        }, 1200);
      } else {
        setStatusMessage({
          type: 'info',
          text: 'Email not verified yet. Please check your inbox and click the verification link.'
        });
      }
    } catch {
      setStatusMessage({
        type: 'info',
        text: 'Please confirm the verification email in your inbox, then click check status.'
      });
    } finally {
      setIsChecking(false);
    }
  };

  const handleSimulate = () => {
    soundEffects.playLevelUp();
    try {
      localStorage.setItem('iberio_verified_' + user.uid, 'true');
    } catch {}
    setStatusMessage({
      type: 'success',
      text: '🎉 Instant verification confirmed!'
    });
    if (onVerifiedSuccess) onVerifiedSuccess();
    setTimeout(() => {
      onClose();
    }, 1000);
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
        text: `Verification link resent to ${email}.`
      });
    } catch (err: any) {
      setStatusMessage({
        type: 'error',
        text: err?.message || 'Could not resend email. Please try again shortly.'
      });
      setResendCooldown(30);
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-md bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 shadow-2xl space-y-5"
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-500 border border-amber-500/20">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-black text-stone-900 dark:text-white">
                Email Verification Required
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                To unlock {featureName}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700/60 text-xs space-y-2">
          <p className="text-stone-700 dark:text-stone-300 font-medium">
            Please verify your email address (<strong>{email}</strong>) to protect student progress and enable cloud features.
          </p>
        </div>

        {statusMessage && (
          <div
            className={`p-3 rounded-2xl text-xs flex items-start gap-2 ${
              statusMessage.type === 'success'
                ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                : statusMessage.type === 'error'
                ? 'bg-red-50 dark:bg-red-950/40 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-800'
                : 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
            }`}
          >
            {statusMessage.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            )}
            <span className="font-medium leading-relaxed">{statusMessage.text}</span>
          </div>
        )}

        <div className="space-y-2.5">
          <button
            type="button"
            onClick={handleCheckStatus}
            disabled={isChecking}
            className="w-full py-3 px-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs flex items-center justify-center gap-2 shadow-md transition cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isChecking ? 'animate-spin' : ''}`} />
            <span>{isChecking ? 'Checking status...' : 'Check Verification Status'}</span>
          </button>

          <button
            type="button"
            onClick={handleResend}
            disabled={resendCooldown > 0 || isResending}
            className="w-full py-2.5 px-4 rounded-2xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-900 dark:text-white font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer disabled:opacity-50"
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
        </div>

        <div className="pt-2 flex items-center justify-between text-[11px] text-stone-400">
          <button
            type="button"
            onClick={handleSimulate}
            className="hover:text-amber-500 underline cursor-pointer"
          >
            ⚡ Instant Verify (Demo)
          </button>

          <button
            type="button"
            onClick={onClose}
            className="hover:text-stone-700 dark:hover:text-stone-300 underline cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </div>
  );
};
