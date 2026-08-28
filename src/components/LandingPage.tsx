import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  Zap,
  Globe,
  Trophy,
  CheckCircle2,
  ArrowRight,
  Flame,
  Volume2,
  BookOpen,
  MessageSquare,
  GraduationCap,
  Star,
  ShieldCheck,
  Award,
  Users,
  TrendingUp,
  Layers,
  Play,
  Check,
  LogIn
} from 'lucide-react';
import { soundEffects, speakSpanish } from '../utils/audio';
import { IberacademyLogo } from './IberacademyLogo';

interface LandingPageProps {
  onStartOnboarding: () => void;
  onGoogleSignIn: () => void;
  onExploreDemo: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartOnboarding,
  onGoogleSignIn,
  onExploreDemo
}) => {
  const [activeTab, setActiveTab] = useState<'reader' | 'ai' | 'league' | 'grammar'>('reader');
  const [demoMinutes, setDemoMinutes] = useState<number>(20);
  const [selectedWord, setSelectedWord] = useState<string | null>('mariposa');

  const fluencyMonths = Math.max(3, Math.round(12 - demoMinutes * 0.25));

  const sampleWords = [
    { es: 'mariposa', en: 'butterfly', level: 'A2' },
    { es: 'sueños', en: 'dreams', level: 'A1' },
    { es: 'lograr', en: 'to achieve', level: 'B1' },
    { es: 'fluidez', en: 'fluency', level: 'A2' }
  ];

  return (
    <div className="bg-stone-950 text-white min-h-screen font-sans selection:bg-amber-500 selection:text-stone-950 overflow-x-hidden flex flex-col">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-amber-600 via-orange-500 to-amber-600 text-stone-950 px-4 py-2 text-center text-xs font-black tracking-wide flex items-center justify-center gap-2 shadow-sm">
        <Sparkles className="w-4 h-4 fill-stone-950" />
        <span>IBERACADEMY Immersion Method • 100% Krashen SLA Natural Acquisition</span>
        <button
          onClick={() => {
            soundEffects.playPop();
            onStartOnboarding();
          }}
          className="ml-2 px-2.5 py-0.5 rounded-md bg-stone-950 text-white hover:bg-stone-900 text-[10px] font-mono uppercase font-bold transition cursor-pointer"
        >
          Claim Free Account
        </button>
      </div>

      {/* Dedicated Standalone Landing Page Header */}
      <nav className="w-full bg-stone-950/90 backdrop-blur-md border-b border-stone-800/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo & Branding */}
          <div className="flex items-center gap-3">
            <IberacademyLogo variant="icon" className="w-9 h-9" />
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-wider text-amber-400 leading-none">
                IBERACADEMY
              </span>
              <span className="text-[10px] font-mono font-bold text-stone-400 uppercase tracking-widest">
                Aprende Español
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                soundEffects.playPop();
                onStartOnboarding();
              }}
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-900 border border-stone-700 hover:border-stone-500 text-stone-200 text-xs font-bold transition cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Placement Test</span>
            </button>

            <button
              onClick={() => {
                soundEffects.playPop();
                onGoogleSignIn();
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-stone-950 text-xs font-black hover:brightness-110 transition shadow-lg shadow-amber-500/20 cursor-pointer"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Sign In</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Hero Section */}
      <section className="relative pt-12 sm:pt-20 pb-16 px-4 sm:px-6 max-w-7xl mx-auto">
        {/* Background Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center space-y-6 relative z-10 max-w-4xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-900 border border-amber-500/30 text-amber-400 text-xs font-mono font-black uppercase shadow-inner"
          >
            <Flame className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span>Duolingo & LingQ Hybrid Platform</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-stone-100"
          >
            Achieve Fluent Spanish <br />
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-200 bg-clip-text text-transparent">
              Without Endless Rote Memorization
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-stone-300 max-w-2xl mx-auto leading-relaxed font-normal"
          >
            Read interactive dual-language stories, chat with AI native tutors, mine sentences, and compete on the Global Leaderboard — built on Stephen Krashen&apos;s Comprehensible Input.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2"
          >
            <button
              onClick={() => {
                soundEffects.playPop();
                onStartOnboarding();
              }}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 hover:from-amber-600 hover:to-orange-600 text-stone-950 font-black text-sm sm:text-base shadow-xl shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Get Started • 100% Free</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => {
                soundEffects.playPop();
                onGoogleSignIn();
              }}
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white border border-stone-800 font-bold text-sm flex items-center justify-center gap-2 transition cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Quick Sign in with Google</span>
            </button>
          </motion.div>

          {/* Social Proof Line */}
          <div className="flex items-center justify-center gap-4 text-xs text-stone-400 pt-2 flex-wrap">
            <span className="flex items-center gap-1">
              <Check className="w-4 h-4 text-emerald-400" /> No Credit Card Required
            </span>
            <span className="flex items-center gap-1">
              <Check className="w-4 h-4 text-emerald-400" /> Instant Access
            </span>
            <span className="flex items-center gap-1 text-amber-400 font-bold">
              ★ 4.9/5 Student Rating
            </span>
          </div>
        </div>

        {/* Interactive Reader Live Demo Widget */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 max-w-4xl mx-auto bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden"
        >
          <div className="flex items-center justify-between border-b border-stone-800 pb-4 mb-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500" />
              <span className="w-3 h-3 rounded-full bg-amber-500" />
              <span className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-xs font-mono text-stone-400 ml-2">Live Interactive Reader Demo</span>
            </div>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
              Click any word below!
            </span>
          </div>

          <div className="space-y-4">
            <p className="text-lg sm:text-xl font-medium leading-relaxed text-stone-200">
              &quot;La{' '}
              <span
                onClick={() => {
                  speakSpanish('mariposa');
                  setSelectedWord('mariposa');
                }}
                className={`cursor-pointer px-1.5 py-0.5 rounded border transition ${
                  selectedWord === 'mariposa'
                    ? 'bg-amber-500 text-stone-950 font-bold border-amber-400'
                    : 'bg-amber-500/20 text-amber-300 border-amber-500/30 hover:bg-amber-500/40'
                }`}
              >
                mariposa
              </span>{' '}
              vuela sobre el jardín lleno de{' '}
              <span
                onClick={() => {
                  speakSpanish('sueños');
                  setSelectedWord('sueños');
                }}
                className={`cursor-pointer px-1.5 py-0.5 rounded border transition ${
                  selectedWord === 'sueños'
                    ? 'bg-amber-500 text-stone-950 font-bold border-amber-400'
                    : 'bg-amber-500/20 text-amber-300 border-amber-500/30 hover:bg-amber-500/40'
                }`}
              >
                sueños
              </span>
              . Para{' '}
              <span
                onClick={() => {
                  speakSpanish('lograr');
                  setSelectedWord('lograr');
                }}
                className={`cursor-pointer px-1.5 py-0.5 rounded border transition ${
                  selectedWord === 'lograr'
                    ? 'bg-amber-500 text-stone-950 font-bold border-amber-400'
                    : 'bg-amber-500/20 text-amber-300 border-amber-500/30 hover:bg-amber-500/40'
                }`}
              >
                lograr
              </span>{' '}
              la{' '}
              <span
                onClick={() => {
                  speakSpanish('fluidez');
                  setSelectedWord('fluidez');
                }}
                className={`cursor-pointer px-1.5 py-0.5 rounded border transition ${
                  selectedWord === 'fluidez'
                    ? 'bg-amber-500 text-stone-950 font-bold border-amber-400'
                    : 'bg-amber-500/20 text-amber-300 border-amber-500/30 hover:bg-amber-500/40'
                }`}
              >
                fluidez
              </span>
              , escuchamos español todos los días.&quot;
            </p>

            {/* Instant Definition Popover */}
            {selectedWord && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 rounded-2xl bg-stone-950 border border-amber-500/30 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => speakSpanish(selectedWord)}
                    className="p-2.5 rounded-xl bg-amber-500 text-stone-950 hover:bg-amber-400 transition cursor-pointer shrink-0"
                    title="Pronounce"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                  <div>
                    <span className="text-sm font-black text-amber-400 capitalize">
                      {selectedWord}
                    </span>
                    <span className="text-xs text-stone-400 block font-mono">
                      Translation: {sampleWords.find((w) => w.es === selectedWord)?.en || 'word'}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    soundEffects.playPop();
                    onStartOnboarding();
                  }}
                  className="px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30 transition cursor-pointer shrink-0"
                >
                  + Add to SRS Vocabulary
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </section>

      {/* Social Proof Numbers */}
      <section className="py-10 border-y border-stone-800 bg-stone-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl sm:text-4xl font-black text-amber-400 font-mono">50,000+</div>
            <div className="text-xs text-stone-400 mt-1 uppercase font-mono font-bold">Words Mastered</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-orange-400 font-mono">100%</div>
            <div className="text-xs text-stone-400 mt-1 uppercase font-mono font-bold">Krashen Input Method</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono">A1 to C2</div>
            <div className="text-xs text-stone-400 mt-1 uppercase font-mono font-bold">CEFR Curriculum</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-amber-400 font-mono">24/7</div>
            <div className="text-xs text-stone-400 mt-1 uppercase font-mono font-bold">AI Hispanohablante Tutor</div>
          </div>
        </div>
      </section>

      {/* Feature Showcase Grid */}
      <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
            Pillars of Natural Fluency
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-white">
            Everything You Need to Speak Spanish Natural & Free
          </h2>
          <p className="text-sm text-stone-400">
            Designed for adult learners, polyglots, and beginners seeking meaningful comprehension over mechanical drills.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="p-6 rounded-3xl bg-stone-900 border border-stone-800 space-y-4 hover:border-amber-500/40 transition">
            <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400 w-fit">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">LingQ-Style Dual Reader</h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              Read authentic Spanish literature and news. Click any unknown word for audio, grammar context, and instant flashcard creation.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6 rounded-3xl bg-stone-900 border border-stone-800 space-y-4 hover:border-amber-500/40 transition">
            <div className="p-3 rounded-2xl bg-orange-500/10 text-orange-400 w-fit">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">24/7 AI Hispanohablante Tutor</h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              Practice real-world conversations in a safe, judgment-free space with immediate grammar corrections and voice audio responses.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-6 rounded-3xl bg-stone-900 border border-stone-800 space-y-4 hover:border-amber-500/40 transition">
            <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 w-fit">
              <Trophy className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Real-time Global League</h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              Compete with active Spanish learners around the world, earn XP points, level up your CEFR tier, and maintain daily streaks.
            </p>
          </div>
        </div>
      </section>

      {/* Fluency Timeline Estimator */}
      <section className="py-16 px-4 sm:px-6 max-w-5xl mx-auto bg-gradient-to-br from-stone-900 to-stone-950 border border-stone-800 rounded-3xl p-8 space-y-6">
        <div className="text-center space-y-2">
          <h3 className="text-xl sm:text-2xl font-black text-white">
            Calculate Your Path to Conversational Spanish
          </h3>
          <p className="text-xs text-stone-400">
            Adjust your daily study commitment to see your estimated timeline to B1 fluency.
          </p>
        </div>

        <div className="space-y-4 max-w-md mx-auto">
          <div className="flex justify-between text-xs font-mono font-bold">
            <span className="text-stone-400">Daily Study Time</span>
            <span className="text-amber-400">{demoMinutes} minutes / day</span>
          </div>

          <input
            type="range"
            min="10"
            max="60"
            step="5"
            value={demoMinutes}
            onChange={(e) => setDemoMinutes(Number(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer"
          />

          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-center space-y-1">
            <span className="text-[10px] font-mono text-amber-400 uppercase font-black">Estimated Timeline</span>
            <div className="text-2xl font-black text-amber-300">
              Conversational B1 in ~{fluencyMonths} Months
            </div>
            <p className="text-[11px] text-stone-400">
              Based on Stephen Krashen&apos;s natural input efficiency rate.
            </p>
          </div>
        </div>
      </section>

      {/* High-Converting Final CTA Section */}
      <section className="py-20 px-4 sm:px-6 max-w-4xl mx-auto text-center space-y-6">
        <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-400 w-fit mx-auto border border-amber-500/20">
          <Sparkles className="w-8 h-8" />
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white">
          Ready to Start Your Spanish Journey Today?
        </h2>
        <p className="text-sm sm:text-base text-stone-300 max-w-xl mx-auto">
          Join thousands of learners mastering real conversational Spanish with comprehensible input.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <button
            onClick={() => {
              soundEffects.playPop();
              onStartOnboarding();
            }}
            className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-amber-500 hover:bg-amber-600 text-stone-950 font-black text-base shadow-xl shadow-amber-500/20 transition cursor-pointer"
          >
            Start Personal Goal Setup →
          </button>
          <button
            onClick={() => {
              soundEffects.playPop();
              onExploreDemo();
            }}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-stone-900 hover:bg-stone-800 text-stone-300 font-bold text-base border border-stone-800 transition cursor-pointer"
          >
            Preview App Demo
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-stone-800 text-center text-xs text-stone-500 font-mono">
        © {new Date().getFullYear()} Iberacademy Hispanohablante Immersion System. All Rights Reserved.
      </footer>
    </div>
  );
};
