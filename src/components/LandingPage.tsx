import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  ChevronDown,
  Compass,
  Check,
  ShieldCheck,
  Award,
  BookOpenCheck,
  Play,
  Activity,
  ChevronRight,
  Brain,
  Briefcase,
  GraduationCap
} from 'lucide-react';
import { User } from 'firebase/auth';
import { soundEffects, speakSpanish } from '../utils/audio';
import { IberioLogo } from './IberacademyLogo';
import { HispanosphereGlobe } from './HispanosphereGlobe';
import { FlagIcon } from './FlagIcon';

interface LandingPageProps {
  onStartOnboarding: () => void;
  onGoogleSignIn: () => void;
  onExploreDemo: () => void;
  authUser?: User | null;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartOnboarding,
  onGoogleSignIn,
  onExploreDemo,
  authUser
}) => {
  const [demoMinutes, setDemoMinutes] = useState<number>(30);
  const [selectedWord, setSelectedWord] = useState<string | null>('mariposa');
  const [activeCefrLevel, setActiveCefrLevel] = useState<'A1' | 'A2' | 'B1' | 'B2'>('A1');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const fluencyMonths = Math.max(3, Math.round(12 - demoMinutes * 0.15));

  // Premium animation configuration constants
  const springTransition = { type: "spring", stiffness: 380, damping: 20, mass: 0.8 };
  const smoothEase = { type: "tween", ease: [0.16, 1, 0.3, 1], duration: 0.8 };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: smoothEase }
  };

  const sampleWords = [
    { es: 'mariposa', en: 'butterfly', level: 'A2', sentence: 'La mariposa vuela sobre el jardín.' },
    { es: 'sueños', en: 'dreams', level: 'A1', sentence: 'Un mundo lleno de hermosos sueños.' },
    { es: 'lograr', en: 'to achieve', level: 'B1', sentence: 'Vas a lograr hablar español con fluidez.' },
    { es: 'fluidez', en: 'fluency', level: 'A2', sentence: 'La fluidez llega escuchando todos los días.' }
  ];

  const cefrLevels = {
    A1: {
      title: 'A1 • Elementary Foundations',
      subtitle: 'Acquire 300+ essential high-frequency words, basic present-tense verbs, and daily social greetings.',
      sampleText: 'Hola, me llamo Carlos. Vivo en Madrid y me gusta estudiar español todos los días.',
      translation: 'Hello, my name is Carlos. I live in Madrid and I like studying Spanish every day.',
      skills: ['Self-introductions & Greetings', 'Essential Nouns & Verbs', 'Present Tense Conjugations', 'Numbers & Basic Questions']
    },
    A2: {
      title: 'A2 • Social Immersion',
      subtitle: 'Build to 600+ words, master basic past tenses (Preterite & Imperfect), and read travel dialogues.',
      sampleText: 'Ayer fui al mercado y compré frutas frescas para preparar una cena especial.',
      translation: 'Yesterday I went to the market and bought fresh fruits to prepare a special dinner.',
      skills: ['Past Tense Storytelling', 'Restaurant & Travel Dialogues', 'Expressing Preferences', 'Connected Paragraph Reading']
    },
    B1: {
      title: 'B1 • Conversational Autonomy',
      subtitle: 'Master 900+ words, understand the subjunctive mood, express complex opinions, and read original stories.',
      sampleText: 'Espero que tengas un buen viaje y que podamos reunirnos cuando regreses a la ciudad.',
      translation: 'I hope you have a good trip and that we can meet up when you return to the city.',
      skills: ['Present Subjunctive Mood', 'Expressing Doubts & Hopes', 'Debating Topics & Opinions', 'Unassisted Short Story Reading']
    },
    B2: {
      title: 'B2 • Fluent Professional Mastery',
      subtitle: 'Understand complex media syntax (1200+ words), native audio discussions, and carry spontaneous debate.',
      sampleText: 'A pesar de los desafíos culturales, el intercambio de ideas fortalece nuestro entendimiento mutuo.',
      translation: 'Despite the cultural challenges, the exchange of ideas strengthens our mutual understanding.',
      skills: ['Advanced Subjunctive Tenses', 'Idiomatic Expressions & Slang', 'Native Podcast/Video Input', 'Effortless Conversational Flow']
    }
  };

  const faqs = [
    {
      q: 'How does Comprehensible Input work?',
      a: 'Based on Dr. Stephen Krashen\'s Input Hypothesis, language acquisition happens when you read and listen to messages you understand (i+1). Instead of translating grammar tables in your head, you naturally acquire the patterns of Spanish.'
    },
    {
      q: 'Is Iberio good for absolute beginners?',
      a: 'Yes. Iberio starts at the basic A1 foundation. Every text features instant interactive translations, dual-language assistance, and professional audio so you never feel lost.'
    },
    {
      q: 'How does the Spaced Repetition (SRS) system work?',
      a: 'When you tap and "mine" a word from a story, it automatically goes into your SRS Flashcard database. Iberio tracks your memory decay and prompts you to review words right before you are about to forget them.'
    },
    {
      q: 'Can I track my real-time CEFR progress?',
      a: 'Absolutely. Every level ends with an official CEFR Mastery Assessment. Once passed, you are awarded your digital CEFR Mastery Diploma and unlocked to progress to the next level.'
    }
  ];

  return (
    <div className="bg-stone-50 text-stone-900 min-h-screen font-sans selection:bg-orange-100 selection:text-orange-950 overflow-x-hidden flex flex-col antialiased">
      {/* Premium Top Announcement Bar */}
      <div className="bg-stone-950 text-stone-300 px-4 py-2.5 text-center text-[10px] font-black tracking-widest uppercase flex items-center justify-center gap-2 border-b border-stone-850">
        <Sparkles className="w-3.5 h-3.5 text-orange-500 animate-pulse" />
        <span>100% Comprehensible Input Method • Based on Dr. Krashen's SLA Hypotheses</span>
        <button
          onClick={() => {
            soundEffects.playPop();
            onStartOnboarding();
          }}
          className="ml-2 px-3 py-0.5 rounded bg-orange-500 hover:bg-orange-600 text-stone-950 text-[10px] font-black uppercase tracking-wider transition-colors cursor-pointer shadow-sm shadow-orange-500/10"
        >
          Free Evaluation
        </button>
      </div>

      {/* Premium Navigation Header */}
      <nav className="w-full bg-white/70 backdrop-blur-md border-b border-stone-250/60 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <IberioLogo variant="full" className="h-8" />

          {/* Navigation Action Buttons */}
          <div className="flex items-center gap-4">
            {authUser ? (
              <motion.button
                onClick={() => {
                  soundEffects.playPop();
                  onExploreDemo();
                }}
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                transition={springTransition}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-stone-950 text-xs font-black transition-colors shadow-sm shadow-orange-500/10 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Go to Workspace</span>
              </motion.button>
            ) : (
              <>
                <button
                  onClick={() => {
                    soundEffects.playPop();
                    onStartOnboarding();
                  }}
                  className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-xl text-stone-600 hover:text-stone-900 text-xs font-bold transition-colors cursor-pointer"
                >
                  <Compass className="w-4 h-4 text-orange-500" />
                  <span>Curriculum Pathway</span>
                </button>

                <motion.button
                  onClick={() => {
                    soundEffects.playPop();
                    onGoogleSignIn();
                  }}
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  transition={springTransition}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-950 hover:bg-stone-900 text-white text-xs font-black transition-colors shadow-md shadow-stone-950/10 cursor-pointer"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span>Sign In</span>
                </motion.button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Typography-First Premium Hero Section */}
      <section className="pt-16 sm:pt-24 pb-16 px-4 max-w-5xl mx-auto text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={springTransition}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-900 text-xs font-black tracking-wide uppercase"
        >
          <Flame className="w-4 h-4 text-orange-600 fill-orange-600" />
          <span>The Scientific Method for Spanish Acquisition</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...smoothEase, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-stone-900 leading-[1.05]"
        >
          Acquire fluent Spanish.<br />
          <span className="text-orange-500 bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">Intuitively.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...smoothEase, delay: 0.2 }}
          className="text-base sm:text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed font-normal"
        >
          No translation tables, no robotic quizzes, and zero mechanical memorization. Iberio uses structured comprehensible stories and responsive dialog flows to help your brain absorb Spanish sentence patterns naturally.
        </motion.p>

        {/* Dynamic High-End CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...smoothEase, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
        >
          {authUser ? (
            <div className="flex flex-col items-center gap-4 w-full">
              <span className="text-xs text-stone-500 font-bold tracking-wide">Welcome Back, {authUser.displayName || authUser.email || 'Learner'}</span>
              <motion.button
                onClick={() => {
                  soundEffects.playPop();
                  onExploreDemo();
                }}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={springTransition}
                className="w-full sm:w-auto px-8 py-4.5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-stone-950 font-black text-sm sm:text-base shadow-xl shadow-orange-500/20 transition-all flex items-center justify-center gap-2.5 cursor-pointer border border-orange-400/30"
              >
                <span>Enter Your Learning Space</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          ) : (
            <>
              <motion.button
                onClick={() => {
                  soundEffects.playPop();
                  onStartOnboarding();
                }}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={springTransition}
                className="w-full sm:w-auto px-8 py-4.5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-stone-950 font-black text-sm sm:text-base shadow-xl shadow-orange-500/20 transition-all flex items-center justify-center gap-2.5 cursor-pointer border border-orange-400/30"
              >
                <span>Create Your Free Account</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>

              <motion.button
                onClick={() => {
                  soundEffects.playPop();
                  onExploreDemo();
                }}
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                transition={springTransition}
                className="w-full sm:w-auto px-8 py-4.5 rounded-2xl bg-white hover:bg-stone-100 text-stone-800 border border-stone-200 shadow-sm font-black text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>Explore Live App Demo</span>
              </motion.button>
            </>
          )}
        </motion.div>

        {/* Premium Trust Badging */}
        <div className="flex items-center justify-center gap-6 text-xs text-stone-500 pt-3 font-semibold flex-wrap">
          <span className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-orange-600" /> Free Diagnostics & Evaluation
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-orange-600" /> Complete CEFR Roadmap Integration
          </span>
          <span className="flex items-center gap-1.5 text-orange-700 font-extrabold">
            ★ Rated 4.9/5 by SLA Educators
          </span>
        </div>

        {/* Interactive Showcases Section: Story Engine First, Then 3D Hispanosphere Globe */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...smoothEase, delay: 0.4 }}
          className="mt-14 max-w-5xl mx-auto space-y-12 text-left"
        >
          {/* 1. INTERACTIVE STORY ENGINE (Comprehensible Input Micro-Demo) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-orange-500/10 text-orange-600">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-black text-stone-900 tracking-tight">
                    Interactive Story Engine
                  </h3>
                  <p className="text-xs text-stone-500">
                    Live Comprehensible Input • Tap words for instant native audio & CEFR translation
                  </p>
                </div>
              </div>
              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black bg-orange-100 text-orange-950 border border-orange-200/60">
                <Sparkles className="w-3.5 h-3.5 text-orange-600" /> Interactive Reader
              </span>
            </div>

            {/* Interactive Micro-Demo Reader Card */}
            <div className="bg-white border border-stone-200/80 rounded-3xl p-6 sm:p-8 shadow-xl shadow-stone-200/40 space-y-5 text-left relative overflow-hidden group">
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-orange-400 via-orange-500 to-amber-500" />
              
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-stone-200" />
                  <span className="w-2.5 h-2.5 rounded-full bg-stone-300" />
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse" />
                  <span className="text-xs font-bold text-stone-500 ml-2">Interactive Preview: Comprehensible Input Engine</span>
                </div>
                <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-orange-50 text-orange-950 border border-orange-200/40">
                  Interactive Storyteller
                </span>
              </div>

              <div className="space-y-4">
                <p className="text-lg sm:text-2xl font-medium leading-relaxed text-stone-800 font-serif">
                  &quot;La{' '}
                  <span
                    onClick={() => {
                      speakSpanish('mariposa');
                      setSelectedWord('mariposa');
                    }}
                    className={`cursor-pointer px-1.5 py-0.5 rounded border transition-colors duration-200 ${
                      selectedWord === 'mariposa'
                        ? 'bg-orange-500 text-white font-black border-orange-600'
                        : 'bg-orange-50 text-orange-950 border-orange-200/50 hover:bg-orange-100'
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
                    className={`cursor-pointer px-1.5 py-0.5 rounded border transition-colors duration-200 ${
                      selectedWord === 'sueños'
                        ? 'bg-orange-500 text-white font-black border-orange-600'
                        : 'bg-orange-50 text-orange-950 border-orange-200/50 hover:bg-orange-100'
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
                    className={`cursor-pointer px-1.5 py-0.5 rounded border transition-colors duration-200 ${
                      selectedWord === 'lograr'
                        ? 'bg-orange-500 text-white font-black border-orange-600'
                        : 'bg-orange-50 text-orange-950 border-orange-200/50 hover:bg-orange-100'
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
                    className={`cursor-pointer px-1.5 py-0.5 rounded border transition-colors duration-200 ${
                      selectedWord === 'fluidez'
                        ? 'bg-orange-500 text-white font-black border-orange-600'
                        : 'bg-orange-50 text-orange-950 border-orange-200/50 hover:bg-orange-100'
                    }`}
                  >
                    fluidez
                  </span>
                  , escuchamos español todos los días.&quot;
                </p>

                {/* Instant Definition Popover with Smooth Height Animation */}
                <AnimatePresence mode="wait">
                  {selectedWord && (
                    <motion.div
                      key={selectedWord}
                      initial={{ opacity: 0, height: 0, y: 10 }}
                      animate={{ opacity: 1, height: "auto", y: 0 }}
                      exit={{ opacity: 0, height: 0, y: 10 }}
                      transition={springTransition}
                      className="overflow-hidden"
                    >
                      <div className="p-4 rounded-2xl bg-orange-50/50 border border-orange-200/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3.5">
                          <motion.button
                            onClick={() => speakSpanish(selectedWord)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-3 rounded-xl bg-orange-500 text-stone-950 hover:bg-orange-600 transition-colors cursor-pointer shrink-0 shadow-md shadow-orange-500/10"
                            title="Speak word"
                          >
                            <Volume2 className="w-4 h-4" />
                          </motion.button>
                          <div>
                            <span className="text-sm font-black text-stone-900 capitalize flex items-center gap-2">
                              {selectedWord}
                              <span className="text-[10px] bg-orange-150 text-orange-950 px-2 py-0.5 rounded font-mono font-bold">
                                {sampleWords.find((w) => w.es === selectedWord)?.level}
                              </span>
                            </span>
                            <span className="text-xs text-stone-600 block mt-1">
                              Definition: <span className="font-bold text-stone-900">{sampleWords.find((w) => w.es === selectedWord)?.en || 'word'}</span>
                            </span>
                          </div>
                        </div>

                        <motion.button
                          onClick={() => {
                            soundEffects.playPop();
                            onStartOnboarding();
                          }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-stone-950 text-white hover:bg-stone-900 text-xs font-black transition-colors cursor-pointer shrink-0 text-center shadow-md"
                        >
                          + Save to SRS Flashcards
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* 2. 3D HISPANOSPHERE GLOBE */}
          <div className="space-y-3 pt-4">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-black text-stone-900 tracking-tight">
                    3D Hispanosphere Globe
                  </h3>
                  <p className="text-xs text-stone-500">
                    500M+ Spanish speakers across 21 sovereign nations & US high-density Spanish states
                  </p>
                </div>
              </div>
              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-black bg-amber-100 text-amber-900 border border-amber-200/60">
                21 Nations + 15 US States
              </span>
            </div>

            <div className="w-full">
              <HispanosphereGlobe />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Modern Bento Grid - Visual Core Features */}
      <section className="py-20 px-4 sm:px-6 max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-900 border border-orange-200/50">
            Engineered Pathway
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
            How Iberio Drives Fluency
          </h2>
          <p className="text-sm text-stone-600">
            A unified suite of natural language tools crafted to optimize neural acquisition.
          </p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* Card 1 */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="p-8 rounded-3xl bg-white border border-stone-200/80 shadow-xs hover:shadow-lg transition-all space-y-5"
          >
            <div className="p-3.5 rounded-2xl bg-orange-500/10 text-orange-600 w-fit">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-stone-900 tracking-tight">Dual-Language Story Reader</h3>
            <p className="text-xs text-stone-600 leading-relaxed font-medium">
              Read carefully graded CEFR stories. Tap any word to reveal instant definition lookup, listen to professional native voice recordings, and append hard words to your SRS.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="p-8 rounded-3xl bg-white border border-stone-200/80 shadow-xs hover:shadow-lg transition-all space-y-5"
          >
            <div className="p-3.5 rounded-2xl bg-orange-500/10 text-orange-600 w-fit">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-stone-900 tracking-tight">AI Juan Roleplay Dialogs</h3>
            <p className="text-xs text-stone-600 leading-relaxed font-medium">
              Speak with our conversational tutor Juan in Spanish. He adapts to your CEFR skill level, offers gentle in-context corrections, and speaks every single sentence aloud.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="p-8 rounded-3xl bg-white border border-stone-200/80 shadow-xs hover:shadow-lg transition-all space-y-5"
          >
            <div className="p-3.5 rounded-2xl bg-orange-500/10 text-orange-600 w-fit">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-stone-900 tracking-tight">Spaced Repetition (SRS) Engine</h3>
            <p className="text-xs text-stone-600 leading-relaxed font-medium">
              Every word you mine is stored with customized decay values. The system automatically prompts you to practice right before neural forgetting occurs to cement long-term memory.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Dual Column SLA Science Contrast Section */}
      <section className="py-20 bg-white border-y border-stone-200/80">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="px-3.5 py-1 rounded-full text-xs font-black bg-stone-100 text-stone-600 font-mono uppercase tracking-wider">
              Language Acquisition Theory
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight leading-none">
              Natural Assimilation vs. Rigid Studying
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Dr. Krashen\'s core research reveals that language study focuses on theoretical structure, whereas <strong>acquisition</strong> happens implicitly. By reading content just above your comfort zone, you build direct vocabulary mappings without the cognitive drag of manual translating.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-black text-stone-900 block">Active i+1 Influx</span>
                  <span className="text-[11px] text-stone-500">Curriculums present text optimized to feature 90% comfortable words and 10% target vocabulary.</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-black text-stone-900 block">True Speech Emergence</span>
                  <span className="text-[11px] text-stone-500">Speaking emerges naturally once you’ve built enough comprehension. No forced conversations.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-stone-50 border border-stone-200/80 p-6 sm:p-8 rounded-3xl space-y-4">
            <div className="text-xs font-black text-stone-500 uppercase tracking-widest border-b border-stone-250 pb-3">Platform Comparison</div>
            
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-white border border-stone-150 space-y-2">
                <span className="text-stone-400 font-black block text-sm">Classroom Drill Apps</span>
                <span className="text-stone-500 text-[11px] block leading-relaxed">Isolate rules, force multiple choice translations, generate high stress.</span>
              </div>
              <div className="p-4 rounded-2xl bg-orange-500 text-stone-950 font-medium space-y-2">
                <span className="font-black block text-sm">Iberio Framework</span>
                <span className="text-stone-900 text-[11px] block leading-relaxed">Interactive reading, instant contextual mining, low affective filter.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Structured CEFR Milestones & Pathway */}
      <section className="py-20 px-4 sm:px-6 max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-900 border border-orange-200/50">
            Curriculum Roadmap
          </span>
          <h2 className="text-3xl font-black text-stone-900 tracking-tight">
            The Graded CEFR Pathway
          </h2>
          <p className="text-sm text-stone-600">
            Advance seamlessly from ground-zero beginner basics to fluent professional competence.
          </p>
        </div>

        {/* Pathway Tabs */}
        <div className="flex items-center justify-center gap-2 p-1.5 rounded-2xl bg-stone-200/60 max-w-sm mx-auto">
          {(['A1', 'A2', 'B1', 'B2'] as const).map((lvl) => (
            <button
              key={lvl}
              onClick={() => {
                soundEffects.playPop();
                setActiveCefrLevel(lvl);
              }}
              className={`flex-1 py-2 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
                activeCefrLevel === lvl
                  ? 'bg-orange-500 text-stone-950 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Level {lvl}
            </button>
          ))}
        </div>

        {/* Selected Roadmap Showcase Card */}
        <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6 relative">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
            <div>
              <h3 className="text-xl font-black text-stone-900">
                {cefrLevels[activeCefrLevel].title}
              </h3>
              <p className="text-xs text-stone-500 mt-1">
                {cefrLevels[activeCefrLevel].subtitle}
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-900 border border-orange-200/50 text-xs font-mono font-bold shrink-0 w-fit">
              CEFR Framework Standard
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Story Excerpt */}
            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase text-stone-500 font-mono tracking-wider">Story Preview Excerpt</span>
                <button
                  onClick={() => speakSpanish(cefrLevels[activeCefrLevel].sampleText)}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-orange-500 text-stone-950 text-xs font-black hover:bg-orange-600 transition-colors cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Listen</span>
                </button>
              </div>
              <p className="text-base sm:text-lg font-serif italic text-stone-800 leading-relaxed">
                &quot;{cefrLevels[activeCefrLevel].sampleText}&quot;
              </p>
              <div className="text-[11px] text-stone-500 border-t border-stone-200 pt-2.5">
                English: {cefrLevels[activeCefrLevel].translation}
              </div>
            </div>

            {/* Competency Goals */}
            <div className="space-y-4">
              <span className="text-[10px] font-black uppercase text-stone-500 font-mono tracking-wider block">Target Competencies</span>
              <ul className="space-y-2.5 text-xs font-medium text-stone-800">
                {cefrLevels[activeCefrLevel].skills.map((skill, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4.5 h-4.5 text-orange-600 shrink-0" />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION: CAREER & GROWTH BENTO GRID ================= */}
      <section className="py-24 bg-stone-50 dark:bg-stone-950 border-y border-stone-200/50 dark:border-stone-800/60 px-4 sm:px-6 relative overflow-hidden">
        {/* Subtle geometric grid background accent */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />
        
        <div className="max-w-6xl mx-auto space-y-16 relative z-10">
          
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="px-3.5 py-1 rounded-full text-[10px] font-black bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 uppercase tracking-widest font-mono">
              THE IBERIO ADVANTAGE
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-stone-900 dark:text-white tracking-tight leading-none font-header">
              Career & Cognitive Growth
            </h2>
            <p className="text-sm sm:text-base text-stone-500 dark:text-stone-400 font-medium max-w-2xl mx-auto">
              Unlock extraordinary opportunities. Spanish is not just a language—it is a premium tool for global careers, academic grants, and mental longevity.
            </p>
          </div>

          {/* Interactive Fast-Fact Keyword Tooltip Component Localized inside the Section */}
          {(() => {
            const InteractiveFactTooltip: React.FC<{
              keyword: string;
              fact: string;
              title?: string;
              icon?: React.ReactNode;
            }> = ({ keyword, fact, title = "Fast Fact", icon }) => {
              const [show, setShow] = useState(false);
              return (
                <span 
                  className="relative inline-block cursor-help group/tooltip"
                  onMouseEnter={() => setShow(true)}
                  onMouseLeave={() => setShow(false)}
                >
                  <span className="underline decoration-dashed decoration-amber-500/80 hover:decoration-amber-500 dark:hover:decoration-amber-400 cursor-help font-black text-stone-950 dark:text-stone-50 transition-colors bg-amber-500/5 dark:bg-amber-500/10 px-1.5 py-0.5 rounded-md">
                    {keyword}
                  </span>
                  <AnimatePresence>
                    {show && (
                      <motion.span
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ type: 'spring', damping: 15, stiffness: 220 }}
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 z-50 w-64 bg-stone-950 text-stone-100 p-4 rounded-2xl shadow-2xl border border-stone-800 text-xs text-left leading-relaxed pointer-events-none block font-sans"
                      >
                        <span className="flex items-center gap-1.5 font-black uppercase text-[9px] tracking-widest text-amber-400 mb-1.5">
                          {icon || <Sparkles className="w-3.5 h-3.5" />}
                          <span>{title}</span>
                        </span>
                        <span className="block text-[11px] text-stone-300 font-medium">{fact}</span>
                        <span className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-stone-950" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </span>
              );
            };

            const bentoContainerVariants = {
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.12 }
              }
            };

            const bentoItemVariants = {
              hidden: { opacity: 0, y: 20 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: { type: 'spring', damping: 22, stiffness: 150 }
              }
            };

            return (
              <motion.div 
                variants={bentoContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8"
              >
                {/* 1. The Cognitive Edge Card (Span 5 cols) */}
                <motion.div 
                  variants={bentoItemVariants}
                  whileHover={{ scale: 1.015, y: -4 }}
                  className="lg:col-span-5 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col justify-between space-y-6 hover:border-amber-400/40 transition-colors"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-rose-500/10 border border-rose-500/20 text-rose-500 dark:text-rose-400 rounded-2xl flex items-center justify-center shadow-inner">
                      <Brain className="w-6 h-6" />
                    </div>
                    
                    <div className="space-y-1">
                      <h3 className="text-xl font-black text-stone-950 dark:text-white font-header">
                        The Cognitive Edge
                      </h3>
                      <p className="text-[10px] text-stone-400 dark:text-stone-500 font-black uppercase tracking-widest font-mono">
                        Neuroplasticity & Brain Longevity
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-medium">
                      Acquiring Spanish activates and structurally expands gray matter density inside the{' '}
                      <InteractiveFactTooltip 
                        keyword="prefrontal cortex" 
                        fact="The brain's executive command center. Bilingual processing strengthens neural pathways here, boosting memory consolidation and logical problem-solving by up to 35%."
                        title="Neuroscience"
                        icon={<Activity className="w-3.5 h-3.5 text-rose-500" />}
                      />
                      , boosting cognitive reserves.
                      <span className="block mt-3 text-stone-800 dark:text-stone-200 font-bold bg-rose-500/5 dark:bg-rose-500/10 border border-rose-500/20 rounded-2xl p-3">
                        🧠 Scientific journals verify that mastering a second tongue delays the onset of severe{' '}
                        <InteractiveFactTooltip 
                          keyword="dementia symptoms" 
                          fact="Fluent bilingualism forces constant mental mapping, acting as a cognitive barrier that offsets neural pathways decay."
                          title="Medical Fact"
                          icon={<Brain className="w-3.5 h-3.5 text-rose-500" />}
                        />{' '}
                        by an average of <span className="text-rose-500 font-extrabold text-sm font-mono">4.5 years</span>—outperforming modern pharmaceuticals.
                      </span>
                    </p>
                  </div>

                  <div className="pt-3 border-t border-stone-100 dark:border-stone-800 text-[10px] font-mono font-bold text-rose-500">
                    PREVENT COGNITIVE DECLINE
                  </div>
                </motion.div>

                {/* 2. Career & Growth Card (Span 7 cols) */}
                <motion.div 
                  variants={bentoItemVariants}
                  whileHover={{ scale: 1.015, y: -4 }}
                  className="lg:col-span-7 bg-stone-950 dark:bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 shadow-md flex flex-col justify-between space-y-6 hover:border-amber-500/50 transition-colors"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-2xl flex items-center justify-center shadow-inner">
                      <Briefcase className="w-6 h-6" />
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-xl font-black text-white font-header">
                        Career & Growth
                      </h3>
                      <p className="text-[10px] text-amber-400 font-black uppercase tracking-widest font-mono">
                        Global Corporate Placements & Scholarships
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-medium">
                      Spanish is an elite skill with massive supply deficits. Multi-industry giants actively target bilingual talent for international accounts.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                      <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
                        <span className="text-[9px] uppercase tracking-widest text-amber-400 font-bold font-mono block">Corporate Pathways</span>
                        <p className="text-[11px] sm:text-xs text-stone-300 leading-relaxed font-medium">
                          Bilingual representatives in Egypt secure starting packages from{' '}
                          <InteractiveFactTooltip 
                            keyword="EGP 25K to 45K+" 
                            fact="Roughly 3.5x the average entry salary. Unlocks fast-track promotions in firms like Vodafone and Concentrix."
                            title="Local Salary Estimate"
                            icon={<Zap className="w-3.5 h-3.5 text-amber-400" />}
                          />{' '}
                          monthly, matching executive roles.
                        </p>
                      </div>

                      <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
                        <span className="text-[9px] uppercase tracking-widest text-sky-400 font-bold font-mono block">European Fellowships</span>
                        <p className="text-[11px] sm:text-xs text-stone-300 leading-relaxed font-medium">
                          Leverage proficiency to secure{' '}
                          <InteractiveFactTooltip 
                            keyword="fully-funded grants" 
                            fact="Opens direct pathways to Erasmus Mundus and Spanish Foreign Ministry (AECID) postgraduate entries with stipends."
                            title="Scholarship Access"
                            icon={<GraduationCap className="w-3.5 h-3.5 text-sky-400" />}
                          />{' '}
                          offering living stipends and waived tuitions.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-stone-800 text-[10px] font-mono font-bold text-amber-400">
                    EXCEPTIONAL RECRUITMENT & MOBILITY MULTIPLIERS
                  </div>
                </motion.div>

                {/* 3. Cultural Exchange Card (Span 12 cols) */}
                <motion.div 
                  variants={bentoItemVariants}
                  whileHover={{ scale: 1.01, y: -4 }}
                  className="lg:col-span-12 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-emerald-400/40 transition-colors"
                >
                  <div className="space-y-4 max-w-2xl">
                    <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-2xl flex items-center justify-center shadow-inner">
                      <Globe className="w-6 h-6" />
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-xl font-black text-stone-950 dark:text-white font-header">
                        Cultural Exchange
                      </h3>
                      <p className="text-[10px] text-stone-400 dark:text-stone-500 font-black uppercase tracking-widest font-mono">
                        Global Visa & Relocation Pathways
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed font-medium">
                      Secure streamlined visa pathways and work placements abroad. State cultural assistantship initiatives like{' '}
                      <InteractiveFactTooltip 
                        keyword="NALCAP" 
                        fact="North American Language and Culture Assistants Program. Provides official teaching assistantships directly in Spain for global candidates."
                        title="Program Info"
                        icon={<Sparkles className="w-3.5 h-3.5 text-emerald-500" />}
                      />{' '}
                      place you as language assistant within Spanish academic boards.
                    </p>
                  </div>

                  <div className="bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/15 rounded-2xl p-5 md:max-w-xs w-full space-y-3 shrink-0">
                    <span className="text-[10px] uppercase tracking-widest text-emerald-600 dark:text-emerald-400 font-black font-mono block">Exchange Benefits</span>
                    <ul className="text-xs text-stone-700 dark:text-stone-300 space-y-2 font-bold">
                      <li className="flex items-center gap-2">
                        <span className="text-emerald-500 font-black">✓</span> €700 to €1,000+ monthly stipends
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-emerald-500 font-black">✓</span> Full medical insurance coverage
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-emerald-500 font-black">✓</span> Official EU residence permits
                      </li>
                    </ul>
                  </div>
                </motion.div>
              </motion.div>
            );
          })()}

        </div>
      </section>


      {/* Dynamic Interactive Fluency Slider */}
      <section className="py-16 px-4 sm:px-6 max-w-4xl mx-auto">
        <div className="bg-white border border-stone-200 rounded-3xl p-8 space-y-6 shadow-xs">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-black text-stone-900 leading-none">
              Commitment Timeline Calculation
            </h3>
            <p className="text-xs text-stone-500">
              Interactive acquisition forecasting model based on average daily exposure rates.
            </p>
          </div>

          <div className="space-y-6 max-w-md mx-auto">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-stone-500">Daily SLA Immersion Target</span>
              <span className="text-orange-900 font-mono">{demoMinutes} minutes / day</span>
            </div>

            <input
              type="range"
              min="15"
              max="60"
              step="5"
              value={demoMinutes}
              onChange={(e) => setDemoMinutes(Number(e.target.value))}
              className="w-full accent-orange-500 cursor-pointer"
            />

            <div className="p-6 rounded-2xl bg-orange-50/50 border border-orange-200/40 text-center space-y-1">
              <span className="text-[10px] text-orange-800 uppercase font-black tracking-wider block">Estimated Resulting Timeline</span>
              <div className="text-2xl sm:text-3xl font-black text-orange-950 font-serif">
                Conversational B1 in ~{fluencyMonths} Months
              </div>
              <p className="text-[11px] text-stone-500">
                Sustained daily input establishes direct neural mappings for effortless spontaneous speaking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Expandable FAQs */}
      <section className="py-16 px-4 sm:px-6 max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900">
            Frequently Answered Questions
          </h2>
          <p className="text-xs text-stone-500">
            Answers to common questions about comprehensible input systems and Iberio.
          </p>
        </div>

        <div className="space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-stone-200 rounded-2xl overflow-hidden transition-all duration-250"
              >
                <button
                  onClick={() => {
                    soundEffects.playPop();
                    setOpenFaqIndex(isOpen ? null : idx);
                  }}
                  className="w-full px-5 py-4.5 text-left flex items-center justify-between font-bold text-sm text-stone-900 hover:bg-stone-50 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-stone-400 transition-transform duration-250 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.25 }}
                    className="px-5 pb-5 text-xs text-stone-600 leading-relaxed border-t border-stone-100 pt-3.5"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Clear Conversion CTA Banner */}
      <section className="py-24 px-4 sm:px-6 max-w-4xl mx-auto text-center space-y-6">
        <h2 className="text-3xl sm:text-5xl font-black text-stone-900 leading-none">
          Ready for Real Spanish Fluency?
        </h2>
        <p className="text-sm sm:text-base text-stone-600 max-w-xl mx-auto font-medium">
          Create your free profile today to launch your CEFR diagnostic assessment, mine your first stories, and converse with Juan.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-3">
          <motion.button
            onClick={() => {
              soundEffects.playPop();
              onStartOnboarding();
            }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-orange-500 hover:bg-orange-600 text-stone-950 font-black text-base shadow-lg shadow-orange-500/20 transition-all cursor-pointer border border-orange-400/20"
          >
            Start Free Assessment →
          </motion.button>
          
          <motion.button
            onClick={() => {
              soundEffects.playPop();
              onExploreDemo();
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white hover:bg-stone-50 text-stone-800 font-bold text-base border border-stone-200 transition-colors cursor-pointer"
          >
            Preview Demo Space
          </motion.button>
        </div>
      </section>

      {/* Minimalist Footnotes */}
      <footer className="py-8 border-t border-stone-200 text-center text-xs text-stone-400 font-mono">
        © {new Date().getFullYear()} Iberio Natural Acquisition. All Rights Reserved.
      </footer>
    </div>
  );
};
