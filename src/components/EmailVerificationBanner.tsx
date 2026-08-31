import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Mail,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Send,
  ShieldCheck,
  X
} from 'lucide-react';
import { User } from 'firebase/auth';
import { checkUserEmailVerified, resendVerificationEmail } from '../lib/firebase';
import { soundEffects } from '../utils/audio';

interface EmailVerificationBannerProps {
  authUser: User | null;
  onVerificationSuccess?: () => void;
}

export const EmailVerificationBanner: React.FC<EmailVerificationBannerProps> = ({
  authUser,
  onVerificationSuccess
}) => {
  const [isChecking, setIsChecking] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isDismissed, setIsDismissed] = useState(false);

  // If user is guest / anonymous or has no email, or is already verified, do not show banner
  if (!authUser || !authUser.email || authUser.isAnonymous || authUser.emailVerified || isDismissed) {
    return null;
  }

  const handleCheckStatus = async () => {
    setIsChecking(true);
    setFeedbackMessage(null);
    try {
      const isVerified = await checkUserEmailVerified(authUser);
      if (isVerified) {
        soundEffects.playLevelUp();
        setFeedbackMessage({
          type: 'success',
          text: 'Email verified successfully! All cloud features are now fully enabled.'
        });
        onVerificationSuccess?.();
      } else {
        soundEffects.playPop();
        setFeedbackMessage({
          type: 'error',
          text: 'Email not verified yet. Please check your inbox (and spam folder) for the verification link, then click Check Status.'
        });
      }
    } catch (e: any) {
      setFeedbackMessage({
        type: 'error',
        text: e?.message || 'Could not verify status. Please try again in a moment.'
      });
    } finally {
      setIsChecking(false);
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    setFeedbackMessage(null);
    try {
      await resendVerificationEmail(authUser);
      soundEffects.playPop();
      setFeedbackMessage({
        type: 'success',
        text: `A new verification email was sent to ${authUser.email}. Please check your inbox.`
      });
    } catch (e: any) {
      setFeedbackMessage({
        type: 'error',
        text: e?.message || 'Failed to resend verification email. Please wait a minute before trying again.'
      });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="bg-amber-500/10 dark:bg-amber-950/40 border-b border-amber-500/30 px-4 py-3 text-stone-900 dark:text-stone-100">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div className="flex items-start gap-2.5">
          <div className="p-1.5 rounded-xl bg-amber-500 text-stone-950 shrink-0 mt-0.5">
            <Mail className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-black flex items-center gap-1.5">
              <span>Verify Your Email Address</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300">
                Action Required
              </span>
            </p>
            <p className="text-[11px] text-stone-600 dark:text-stone-300 font-medium">
              We sent a verification link to <strong className="font-mono">{authUser.email}</strong>. Verify to ensure account recovery and unrestricted cloud backup.
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 self-end md:self-auto flex-wrap">
          <button
            type="button"
            onClick={handleCheckStatus}
            disabled={isChecking}
            className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-black transition flex items-center gap-1.5 shadow-2xs cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isChecking ? 'animate-spin' : ''}`} />
            <span>{isChecking ? 'Checking...' : "I've Verified (Check Status)"}</span>
          </button>

          <button
            type="button"
            onClick={handleResend}
            disabled={isResending}
            className="px-3 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 text-xs font-black transition flex items-center gap-1.5 border border-stone-200 dark:border-stone-700 cursor-pointer disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5 text-amber-500" />
            <span>{isResending ? 'Sending...' : 'Resend Email'}</span>
          </button>

          <button
            type="button"
            onClick={() => setIsDismissed(true)}
            className="p-1.5 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 rounded-lg transition cursor-pointer"
            title="Dismiss temporarily"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Feedback Toast Banner */}
      <AnimatePresence>
        {feedbackMessage && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`mt-2 p-2.5 rounded-xl text-xs flex items-center gap-2 max-w-7xl mx-auto ${
              feedbackMessage.type === 'success'
                ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800'
                : 'bg-red-50 dark:bg-red-950/60 text-red-800 dark:text-red-200 border border-red-200 dark:border-red-800'
            }`}
          >
            {feedbackMessage.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600 dark:text-red-400" />
            )}
            <span>{feedbackMessage.text}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
