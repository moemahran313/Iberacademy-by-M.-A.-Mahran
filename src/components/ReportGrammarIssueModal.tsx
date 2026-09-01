import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, AlertTriangle, CheckCircle, Send, HelpCircle } from 'lucide-react';
import { auth, db, handleFirestoreError, OperationType } from '../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { soundEffects } from '../utils/audio';

interface ReportGrammarIssueModalProps {
  isOpen: boolean;
  onClose: () => void;
  source: 'GrammarEncyclopediaView' | 'ReadingInterface';
  contextName: string; // Story title or Grammar Topic name
  selectedText?: string; // Preselected highlighted word or sentence
}

export const ReportGrammarIssueModal: React.FC<ReportGrammarIssueModalProps> = ({
  isOpen,
  onClose,
  source,
  contextName,
  selectedText = ''
}) => {
  const [email, setEmail] = useState('');
  const [issueType, setIssueType] = useState<'spelling' | 'grammar' | 'translation' | 'audio' | 'other'>('grammar');
  const [customText, setCustomText] = useState(selectedText);
  const [description, setDescription] = useState('');
  const [suggestedFix, setSuggestedFix] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Auto-fill email if user is logged in
  useEffect(() => {
    if (isOpen) {
      setIsSuccess(false);
      setErrorMessage(null);
      setDescription('');
      setSuggestedFix('');
      setCustomText(selectedText);
      
      const currentUser = auth.currentUser;
      if (currentUser?.email) {
        setEmail(currentUser.email);
      } else {
        // Try reading local storage user as fallback
        try {
          const stored = localStorage.getItem('iberio_fallback_user') || localStorage.getItem('iberacademy_fallback_user');
          if (stored) {
            const user = JSON.parse(stored);
            if (user?.email) {
              setEmail(user.email);
            }
          }
        } catch (e) {
          // ignore
        }
      }
    }
  }, [isOpen, selectedText]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    setIsSubmitting(true);
    setErrorMessage(null);
    soundEffects.playPop();

    const currentUser = auth.currentUser;
    const reportData = {
      userId: currentUser?.uid || 'guest_' + Math.random().toString(36).substring(2, 9),
      userEmail: email.trim() || 'guest@iberio.app',
      source,
      context: contextName,
      issueType,
      selectedText: customText.trim(),
      issueDescription: description.trim(),
      suggestedFix: suggestedFix.trim(),
      createdAt: new Date().toISOString()
    };

    const path = 'grammar_reports';
    try {
      await addDoc(collection(db, path), reportData);
      soundEffects.playLevelUp();
      setIsSuccess(true);
    } catch (err) {
      console.error('Error submitting grammar report to Firestore:', err);
      setErrorMessage('Could not submit feedback to database. Please check your internet connection or try again later.');
      try {
        handleFirestoreError(err, OperationType.WRITE, path);
      } catch (logErr) {
        // Logged correctly by handleFirestoreError
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm animate-fadeIn">
      <div 
        id="report-grammar-modal"
        className="relative w-full max-w-lg bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 shadow-2xl space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 dark:bg-rose-500/20 text-rose-500 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-stone-900 dark:text-white">
                Report Grammar Issue
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                Help us review and refine Hispanosphere content
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.form 
              key="form"
              onSubmit={handleSubmit} 
              className="space-y-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {/* Context display info */}
              <div className="p-3.5 bg-stone-50 dark:bg-stone-800/50 rounded-2xl border border-stone-100 dark:border-stone-800/60 text-xs text-stone-600 dark:text-stone-400">
                <span className="font-bold text-stone-400 block uppercase text-[10px] tracking-wider mb-1">
                  Reporting Context ({source === 'GrammarEncyclopediaView' ? 'Grammar Lesson' : 'Reading Story'})
                </span>
                <span className="font-extrabold text-stone-950 dark:text-stone-100 text-sm">
                  {contextName}
                </span>
              </div>

              {/* Submitter email */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700 dark:text-stone-300">
                  Your Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-sm font-semibold text-stone-900 dark:text-white focus:ring-2 focus:ring-rose-500 outline-none"
                />
              </div>

              {/* Problem/Issue type */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700 dark:text-stone-300">
                  Issue Category
                </label>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {(['grammar', 'spelling', 'translation', 'audio', 'other'] as const).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => {
                        soundEffects.playPop();
                        setIssueType(type);
                      }}
                      className={`px-3 py-2 rounded-xl text-xs font-bold border transition text-center capitalize ${
                        issueType === type
                          ? 'bg-rose-500 border-rose-500 text-white shadow-sm'
                          : 'bg-stone-50 dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Selected text being reported */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700 dark:text-stone-300">
                  Specific Spanish Word or Sentence
                </label>
                <input
                  type="text"
                  value={customText}
                  onChange={e => setCustomText(e.target.value)}
                  placeholder="e.g., andar a bicicleta / montar a bicicleta"
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-sm text-stone-950 dark:text-white focus:ring-2 focus:ring-rose-500 outline-none"
                />
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700 dark:text-stone-300">
                  Issue Description *
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Tell us what is wrong with the content..."
                  required
                  className="w-full p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-sm text-stone-950 dark:text-white focus:ring-2 focus:ring-rose-500 outline-none"
                />
              </div>

              {/* Suggested correction */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700 dark:text-stone-300">
                  Suggested Correction (Optional)
                </label>
                <input
                  type="text"
                  value={suggestedFix}
                  onChange={e => setSuggestedFix(e.target.value)}
                  placeholder="e.g., Use 'andar en bicicleta' in Mexico"
                  className="w-full px-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 text-sm text-stone-950 dark:text-white focus:ring-2 focus:ring-rose-500 outline-none"
                />
              </div>

              {errorMessage && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-500 text-xs font-bold">
                  {errorMessage}
                </div>
              )}

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-3 border-t border-stone-100 dark:border-stone-800">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl text-stone-500 hover:text-stone-900 dark:hover:text-white font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !description.trim()}
                  className="px-6 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-400 disabled:opacity-50 text-white font-black text-xs flex items-center gap-2 shadow-md hover:shadow-lg transition cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Submitting...' : 'Submit Report'}</span>
                </button>
              </div>
            </motion.form>
          ) : (
            <motion.div 
              key="success"
              className="text-center py-8 space-y-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle className="w-10 h-10" />
              </div>
              <div className="space-y-1">
                <h4 className="text-lg font-black text-stone-900 dark:text-white">
                  Thank you!
                </h4>
                <p className="text-xs text-stone-500 dark:text-stone-400 max-w-sm mx-auto">
                  Your report has been successfully submitted to our collection. We will review and refine this content promptly. ¡Gracias por ayudarnos!
                </p>
              </div>
              <div className="pt-4 flex justify-center">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2 rounded-xl bg-stone-900 dark:bg-stone-800 text-white text-xs font-black hover:opacity-90 transition"
                >
                  Close Modal
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
