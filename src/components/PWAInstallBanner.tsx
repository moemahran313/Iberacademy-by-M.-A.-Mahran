import React, { useState } from 'react';
import { Download, Share, X, Smartphone, Check, Sparkles } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { triggerHaptic } from '../utils/haptics';

export const PWAInstallBanner: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  // If already running as installed app or dismissed by user
  if (isInstalled || isDismissed) {
    return null;
  }

  // Only show if browser supports prompt or is iOS
  if (!isInstallable && !isIOS) {
    return null;
  }

  const handleInstallClick = async () => {
    triggerHaptic('medium');
    if (isInstallable) {
      await install();
    } else if (isIOS) {
      setShowIOSGuide(true);
    }
  };

  const handleDismiss = () => {
    triggerHaptic('light');
    setIsDismissed(true);
  };

  return (
    <>
      {/* Floating In-App Install Banner */}
      <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-40 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border border-orange-200 dark:border-stone-700 p-3.5 rounded-2xl shadow-xl transition-all animate-in fade-in slide-in-from-bottom-4">
        <div className="flex items-center justify-between gap-3">
          {/* App Icon / Mascot */}
          <div className="relative shrink-0">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white shadow-md shadow-orange-500/20 overflow-hidden">
              <img src="/icon.svg" alt="Iberio Mascot App Icon" className="w-10 h-10 object-contain" />
            </div>
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white dark:border-stone-900 rounded-full" />
          </div>

          {/* App Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <h4 className="text-sm font-bold text-stone-900 dark:text-white truncate">Iberio Mobile App</h4>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-orange-100 text-orange-700 dark:bg-orange-950/60 dark:text-orange-400">
                <Sparkles className="w-2.5 h-2.5 mr-0.5 inline" /> PWA
              </span>
            </div>
            <p className="text-xs text-stone-500 dark:text-stone-400 truncate">
              {isIOS ? 'Install on iPhone home screen' : 'Instant offline access & natural immersion'}
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleInstallClick}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white text-xs font-semibold shadow-md active:scale-95 transition min-h-[44px] min-w-[44px]"
              aria-label="Install App"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Install</span>
            </button>

            <button
              onClick={handleDismiss}
              className="p-2 rounded-xl text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Dismiss banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* iOS Safari Installation Modal */}
      {showIOSGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="w-full max-w-sm rounded-3xl bg-white dark:bg-stone-900 p-6 shadow-2xl border border-stone-200 dark:border-stone-800 text-center">
            <div className="w-16 h-16 rounded-2xl bg-orange-500/10 text-orange-600 mx-auto mb-4 flex items-center justify-center">
              <Smartphone className="w-8 h-8" />
            </div>

            <h3 className="text-lg font-bold text-stone-900 dark:text-white">Install Iberio on iOS</h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 mb-5">
              Add Iberio to your iPhone or iPad home screen for a full native app experience.
            </p>

            <div className="space-y-3 text-left bg-stone-50 dark:bg-stone-800/50 p-4 rounded-2xl text-xs text-stone-700 dark:text-stone-300 border border-stone-100 dark:border-stone-700/50 mb-5">
              <div className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-orange-500 text-white font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">1</span>
                <div>
                  Tap the <strong className="text-stone-900 dark:text-white font-semibold">Share <Share className="w-3 h-3 inline mx-0.5 text-orange-500" /></strong> button in Safari's bottom toolbar.
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-orange-500 text-white font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">2</span>
                <div>
                  Scroll down the action menu and select <strong className="text-stone-900 dark:text-white font-semibold">Add to Home Screen</strong>.
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-orange-500 text-white font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">3</span>
                <div>
                  Tap <strong className="text-stone-900 dark:text-white font-semibold">Add</strong> in the top right corner.
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                triggerHaptic('light');
                setShowIOSGuide(false);
              }}
              className="w-full py-3 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 font-semibold text-xs hover:opacity-90 transition active:scale-95 min-h-[44px]"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
};
