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
  GraduationCap,
  Mail,
  HeartHandshake,
  Star,
  Layers,
  Sparkle
} from 'lucide-react';
import { User } from 'firebase/auth';
import { soundEffects, speakSpanish } from '../utils/audio';
import { IberioLogo, AztecBirdMascot } from './IberacademyLogo';
import { HispanosphereGlobe } from './HispanosphereGlobe';
import { Footer } from './Footer';

interface LandingPageProps {
  onStartOnboarding: () => void;
  onOpenAuthModal?: (mode?: 'signin' | 'signup') => void;
  onExploreDemo: () => void;
  authUser?: User | null;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartOnboarding,
  onOpenAuthModal,
  onExploreDemo,
  authUser
}) => {
  const [demoMinutes, setDemoMinutes] = useState<number>(30);
  const [selectedWord, setSelectedWord] = useState<string | null>('mariposa');
  const [activeCefrLevel, setActiveCefrLevel] = useState<'A1' | 'A2' | 'B1' | 'B2'>('A1');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [mascotBubble, setMascotBubble] = useState<string>('¡Hola! Soy Cuauhtli, el ave solar de Iberio. ¡Aprende español sin memorizar!');

  const fluencyMonths = Math.max(3, Math.round(12 - demoMinutes * 0.15));

  // Physics animation configurations for world-class feel
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

  const mascotGreetings = [
    '¡Hola! Soy Cuauhtli, el ave solar azteca. ¡Toca mis plumas para escuchar el acento mexicano!',
    '¡Bienvenidos a Iberio! La plataforma nº 1 de Inmersión Natural en Español.',
    '¿Sabías que aprender español con historias activa el 90% más de memoria que las listas de vocabulario?',
    '¡Prueba la gastronomía mexicana! Tacos al pastor, mole poblano y pozole te esperan.'
  ];

  const handleMascotClick = () => {
    soundEffects.playPop();
    const nextGreeting = mascotGreetings[(mascotGreetings.indexOf(mascotBubble) + 1) % mascotGreetings.length];
    setMascotBubble(nextGreeting);
    speakSpanish('¡Hola! Bienvenidos a Iberio Natural Acquisition.');
  };

  const cefrLevels = {
    A1: {
      title: 'A1 • Elementary Foundations',
      subtitle: 'Acquire 300+ essential high-frequency words, basic present-tense verbs, and daily social greetings.',
      sampleText: 'Hola, me llamo Carlos. Vivo en la Ciudad de México y me gusta estudiar español todos los días.',
      translation: 'Hello, my name is Carlos. I live in Mexico City and I like studying Spanish every day.',
      skills: ['Self-introductions & Greetings', 'Essential Nouns & Verbs', 'Present Tense Conjugations', 'Numbers & Basic Questions']
    },
    A2: {
      title: 'A2 • Social Immersion',
      subtitle: 'Build to 600+ words, master basic past tenses (Preterite & Imperfect), and read travel & food dialogues.',
      sampleText: 'Ayer fui al mercado de Coyoacán y compré tacos al pastor y un vaso de agua de horchata helada.',
      translation: 'Yesterday I went to Coyoacán market and bought tacos al pastor and an ice-cold horchata water.',
      skills: ['Past Tense Storytelling', 'Mexican Gastronomy & Dining', 'Expressing Preferences', 'Connected Paragraph Reading']
    },
    B1: {
      title: 'B1 • Conversational Autonomy',
      subtitle: 'Master 900+ words, understand the subjunctive mood, express complex opinions, and read original stories.',
      sampleText: 'Espero que tengas un excelente viaje a Oaxaca y que disfrutes del mole negro tradicional.',
      translation: 'I hope you have an excellent trip to Oaxaca and that you enjoy the traditional black mole.',
      skills: ['Present Subjunctive Mood', 'Expressing Doubts & Hopes', 'Debating Cultural Topics', 'Unassisted Short Story Reading']
    },
    B2: {
      title: 'B2 • Fluent Professional Mastery',
      subtitle: 'Understand complex media syntax (1200+ words), native audio discussions, and carry spontaneous debate.',
      sampleText: 'A pesar de las diferencias regionales, el intercambio cultural en el mundo hispano fortalece nuestro entendimiento mutuo.',
      translation: 'Despite regional differences, cultural exchange in the Spanish-speaking world strengthens our mutual understanding.',
      skills: ['Advanced Subjunctive Tenses', 'Mexican Idioms & Slang', 'Native Podcast & Media Input', 'Effortless Spontaneous Speech']
    }
  };

  const faqs = [
    {
      q: 'How does Comprehensible Input work?',
      a: 'Based on Dr. Stephen Krashen\'s Input Hypothesis, language acquisition happens naturally when you read and listen to messages you understand (i+1). Instead of translating rigid grammar tables in your head, your brain absorbs real Spanish sentence patterns implicitly.'
    },
    {
      q: 'Is Iberio good for absolute beginners?',
      a: 'Yes! Iberio starts at the basic A1 level. Every story features instant word lookup, sentence translation, dual-language assistance, and native CDMX audio recordings so you never feel lost.'
    },
    {
      q: 'What makes the Mexican Accent & Culture integration special?',
      a: 'Mexico has the largest Spanish-speaking population on Earth (130M+ speakers). Iberio prioritizes authentic CDMX pronunciation, native idioms, and specialized vocabulary modules like Mexican Gastronomy, Frida Kahlo art history, and Tenochtitlan folklore.'
    },
    {
      q: 'How does the Spaced Repetition (SRS) system work?',
      a: 'When you tap and "mine" a word from a story or vocabulary deck, it enters your SRS Flashcard database. Iberio tracks memory decay with the SM-2 algorithm and prompts you to review words right before neural memory fading occurs.'
    },
    {
      q: 'Can I track my official CEFR progress?',
      a: 'Absolutely. Every level concludes with an official CEFR Assessment. Passing unlocks your verified digital CEFR Mastery Diploma and opens the next level.'
    }
  ];

  return (
    <div className="bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 min-h-screen font-sans selection:bg-orange-500 selection:text-white overflow-x-hidden flex flex-col antialiased">
      
      {/* ================= TOP ANNOUNCEMENT & DEV MODE HUMOR BANNER ================= */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-stone-950 px-4 py-2.5 text-center text-xs font-bold shadow-md z-50 flex items-center justify-center gap-2 flex-wrap border-b border-orange-400">
        <span className="px-2 py-0.5 rounded-full bg-stone-950 text-amber-400 font-mono text-[10px] uppercase font-black tracking-widest shrink-0 animate-pulse flex items-center gap-1">
          🚧 DEV MODE IN PROGRESS
        </span>
        <span className="font-medium text-stone-950">
          This site is actively being built. Honestly, half the features work by pure luck and magic 🪄 (and I have no idea why lol). Got feedback or ideas? Drop me a line!
        </span>
        <div className="flex items-center gap-1.5 ml-1">
          <a
            href="https://www.facebook.com/mhdmahran/"
            target="_blank"
            rel="noopener noreferrer"
            title="Message on Facebook"
            className="p-1.5 rounded-lg bg-stone-950 text-amber-400 hover:bg-stone-900 transition-all flex items-center justify-center shadow-xs hover:scale-105 active:scale-95"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
          <a
            href="mailto:moemahran@gmail.com"
            title="Send an Email"
            className="p-1.5 rounded-lg bg-stone-950 text-amber-400 hover:bg-stone-900 transition-all flex items-center justify-center shadow-xs hover:scale-105 active:scale-95"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* ================= IMPECCABLE AGENCY HEADER ================= */}
      <nav className="w-full bg-white/95 dark:bg-stone-950/95 border-b border-stone-200/80 dark:border-stone-800/80 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <button 
            onClick={() => onExploreDemo()}
            className="flex items-center gap-2 cursor-pointer group focus:outline-none"
          >
            <IberioLogo variant="full" className="h-9" />
          </button>

          {/* Quick Nav & Call to Actions */}
          <div className="flex items-center gap-3">
            {authUser ? (
              <button
                onClick={() => {
                  soundEffects.playPop();
                  onExploreDemo();
                }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-stone-950 text-xs font-black shadow-md cursor-pointer border border-orange-400/30 transition-transform active:scale-95"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Go to Workspace</span>
              </button>
            ) : (
              <>
                <button
                  onClick={() => {
                    soundEffects.playPop();
                    onExploreDemo();
                  }}
                  className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  <Compass className="w-4 h-4 text-orange-500" />
                  <span>Explore Features</span>
                </button>

                <button
                  onClick={() => {
                    soundEffects.playPop();
                    onOpenAuthModal?.('signin');
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-stone-950 dark:bg-white text-white dark:text-stone-950 hover:bg-stone-900 dark:hover:bg-stone-100 text-xs font-black transition-colors shadow-sm cursor-pointer active:scale-95"
                >
                  <Mail className="w-3.5 h-3.5 text-amber-400 dark:text-amber-600" />
                  <span>Sign In</span>
                </button>

                <button
                  onClick={() => {
                    soundEffects.playPop();
                    onStartOnboarding();
                  }}
                  className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-stone-950 text-xs font-black shadow-md cursor-pointer border border-orange-400/30 transition-transform active:scale-95"
                >
                  <span>Get Started Free</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* ================= HERO SECTION WITH PROMINENT AZTEC BIRD MASCOT ================= */}
      <section className="pt-10 sm:pt-16 pb-12 px-4 max-w-5xl mx-auto text-center space-y-7 relative">
        
        {/* Glow Background Gradient Ring (Optimized: No heavy blur filter) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-500/10 via-amber-500/5 to-transparent rounded-full pointer-events-none -z-10" />

        {/* CLEAN AZTEC MASCOT */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={springTransition}
          className="flex items-center justify-center cursor-pointer group hover:scale-105 transition-transform"
          onClick={handleMascotClick}
          title="Cuauhtli • Click to Listen"
        >
          <AztecBirdMascot size={72} interactive={true} showAura={false} />
        </motion.div>



        {/* Agency Typography Display Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...smoothEase, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-stone-900 dark:text-white leading-[1.05] font-header"
        >
          Acquire fluent Spanish.<br />
          <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 bg-clip-text text-transparent italic font-serif">
            Intuitively & Culturally.
          </span>
        </motion.h1>

        {/* Persuasive SEO Copy */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...smoothEase, delay: 0.2 }}
          className="text-base sm:text-xl text-stone-600 dark:text-stone-300 max-w-3xl mx-auto leading-relaxed font-normal"
        >
          Say goodbye to robotic flashcard grinding and dry grammar tables. Iberio combines <strong>Dr. Stephen Krashen’s SLA Comprehensible Input</strong> with rich Mexican stories, authentic CDMX audio, and an AI tutor to help your brain absorb natural Spanish sentence patterns effortlessly.
        </motion.p>

        {/* Dynamic CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...smoothEase, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
        >
          {authUser ? (
            <div className="flex flex-col items-center gap-4 w-full">
              <span className="text-xs text-stone-500 font-bold tracking-wide">
                Welcome Back, {authUser.displayName || authUser.email || 'Learner'}
              </span>
              <motion.button
                onClick={() => {
                  soundEffects.playPop();
                  onExploreDemo();
                }}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={springTransition}
                className="w-full sm:w-auto px-8 py-4.5 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 text-stone-950 font-black text-sm sm:text-base shadow-xl shadow-orange-500/25 transition-all flex items-center justify-center gap-2.5 cursor-pointer border border-orange-400/30"
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
                className="w-full sm:w-auto px-8 py-4.5 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 text-stone-950 font-black text-sm sm:text-base shadow-xl shadow-orange-500/25 transition-all flex items-center justify-center gap-2.5 cursor-pointer border border-orange-400/30"
              >
                <span>Start Free Assessment</span>
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
                className="w-full sm:w-auto px-8 py-4.5 rounded-2xl bg-white dark:bg-stone-900 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-800 dark:text-white border border-stone-200 dark:border-stone-800 shadow-sm font-black text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Play className="w-4 h-4 text-orange-500 fill-orange-500" />
                <span>Explore Live App Demo</span>
              </motion.button>
            </>
          )}
        </motion.div>

        {/* Trust Indicators */}
        <div className="flex items-center justify-center gap-6 text-xs text-stone-500 dark:text-stone-400 pt-3 font-semibold flex-wrap">
          <span className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-orange-500" /> Free CEFR Diagnostic Test
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-orange-500" /> CDMX Native Accent Audio
          </span>
          <span className="flex items-center gap-1.5 text-orange-600 dark:text-orange-400 font-extrabold">
            ★ Rated 4.9/5 by SLA Educators
          </span>
        </div>

        {/* ================= MISSION STATEMENT & CORE OBJECTIVE CARD (CRO ANCHOR) ================= */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={smoothEase}
          className="mt-10 max-w-5xl mx-auto bg-gradient-to-br from-stone-900 via-stone-950 to-stone-900 text-white rounded-3xl p-8 sm:p-10 border border-stone-800 shadow-2xl relative overflow-hidden text-left"
        >
          {/* Subtle Accent Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 rounded-full text-[10px] font-mono font-black uppercase tracking-widest bg-orange-500/20 text-orange-400 border border-orange-500/30">
              OUR MISSION STATEMENT & OBJECTIVE
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-black font-header text-white leading-tight">
                To transform Spanish learning into intuitive, natural acquisition.
              </h2>
              <p className="text-sm text-stone-300 leading-relaxed font-normal">
                <strong>Our Mission:</strong> We exist to eliminate language barriers by replacing dry grammar rules and repetitive drills with <strong>Dr. Stephen Krashen’s SLA Comprehensible Input ($i+1$)</strong>. Your brain naturally acquires language when you understand context-rich stories.
              </p>
              <p className="text-sm text-stone-300 leading-relaxed font-normal">
                <strong>Our Objective:</strong> Guide 100,000+ learners to <strong>conversational B2 fluency within 6 months</strong> by combining authentic Mexican cultural immersion, native CDMX audio, and adaptive AI conversation tutoring.
              </p>
            </div>

            {/* 3 Core Pillars */}
            <div className="space-y-3 bg-stone-900/80 p-5 rounded-2xl border border-stone-800">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-orange-500/20 text-orange-400 shrink-0 mt-0.5">
                  <Brain className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-white uppercase tracking-wider font-mono">Scientific SLA Engine</h4>
                  <p className="text-xs text-stone-400 mt-0.5">Comprehensible input ($i+1$) delivers 90% higher memory retention than traditional textbooks.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 border-t border-stone-800 pt-3">
                <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 shrink-0 mt-0.5">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-white uppercase tracking-wider font-mono">Mexican Cultural Immersion</h4>
                  <p className="text-xs text-stone-400 mt-0.5">Master authentic CDMX pronunciation, gastronomy, Frida Kahlo stories, and regional slang.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 border-t border-stone-800 pt-3">
                <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 shrink-0 mt-0.5">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-white uppercase tracking-wider font-mono">Adaptive AI & SRS Engine</h4>
                  <p className="text-xs text-stone-400 mt-0.5">AI Juan conversation partner & SM-2 Spaced Repetition flashcards practice right before memory fades.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ================= CLEAR CONVERSION INCENTIVES GRID (WHY TRY TODAY) ================= */}
        <div className="mt-8 max-w-5xl mx-auto space-y-4 text-left">
          <div className="text-center space-y-1">
            <span className="text-[11px] font-mono font-black uppercase text-orange-600 dark:text-orange-400 tracking-widest block">
              ⚡ RISK-FREE CRO INCENTIVES
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-stone-900 dark:text-white font-header">
              Why Try Iberio Today? (100% Free Risk-Free Guarantee)
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs space-y-2">
              <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-500 w-fit">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-black text-stone-900 dark:text-white">Free CEFR Assessment</h4>
              <p className="text-xs text-stone-500 dark:text-stone-400">Discover your exact level (A1–B2) in under 2 minutes. No credit card required.</p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs space-y-2">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500 w-fit">
                <BookOpenCheck className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-black text-stone-900 dark:text-white">Instant Story Library</h4>
              <p className="text-xs text-stone-500 dark:text-stone-400">Start reading 20+ graded Mexican stories with instant word lookups immediately.</p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs space-y-2">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-500 w-fit">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-black text-stone-900 dark:text-white">Live AI Tutor Demo</h4>
              <p className="text-xs text-stone-500 dark:text-stone-400">Roleplay real conversations in Spanish with our AI tutor Juan at your own pace.</p>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs space-y-2">
              <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-500 w-fit">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-black text-stone-900 dark:text-white">Certified Diploma</h4>
              <p className="text-xs text-stone-500 dark:text-stone-400">Earn official digital CEFR proficiency certificates upon completing each level.</p>
            </div>
          </div>
        </div>

        {/* ================= SHOWCASE 1: KRASHEN COMPREHENSIBLE READER ================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...smoothEase, delay: 0.4 }}
          className="mt-14 max-w-5xl mx-auto space-y-4 text-left"
        >
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-orange-500/10 text-orange-500">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black text-stone-900 dark:text-white tracking-tight">
                  Interactive LingQ-Style Reader Engine
                </h3>
                <p className="text-xs text-stone-500">
                  Tap any word for instant definitions, native CDMX pronunciation, and one-click SRS mining
                </p>
              </div>
            </div>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black bg-orange-100 dark:bg-orange-950/60 text-orange-950 dark:text-orange-300 border border-orange-200/60 dark:border-orange-800/40">
              <Sparkles className="w-3.5 h-3.5 text-orange-500" /> Live Interactive Demo
            </span>
          </div>

          <div className="bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 rounded-3xl p-6 sm:p-8 shadow-xl shadow-stone-200/40 dark:shadow-none space-y-5 relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-[2.5px] bg-gradient-to-r from-orange-500 via-amber-500 to-red-500" />
            
            <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-stone-300 dark:bg-stone-700" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-stone-500 ml-2">Story Excerpt: Coyoacán & Frida’s House</span>
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-orange-50 dark:bg-orange-950/40 text-orange-950 dark:text-orange-400 border border-orange-200/40 dark:border-orange-800/40">
                A2 Immersion
              </span>
            </div>

            <p className="text-lg sm:text-2xl font-serif leading-relaxed text-stone-800 dark:text-stone-100">
              &quot;En el corazón de Coyoacán, la{' '}
              <span
                onClick={() => {
                  speakSpanish('mariposa');
                  setSelectedWord('mariposa');
                }}
                className={`cursor-pointer px-1.5 py-0.5 rounded border transition-colors duration-200 ${
                  selectedWord === 'mariposa'
                    ? 'bg-orange-500 text-stone-950 font-black border-orange-600'
                    : 'bg-orange-100/60 dark:bg-orange-950/40 text-orange-950 dark:text-orange-300 border-orange-200 dark:border-orange-800/50 hover:bg-orange-200'
                }`}
              >
                mariposa
              </span>{' '}
              vuela sobre los murales. Nuestro deseo de tener hermosos{' '}
              <span
                onClick={() => {
                  speakSpanish('sueños');
                  setSelectedWord('sueños');
                }}
                className={`cursor-pointer px-1.5 py-0.5 rounded border transition-colors duration-200 ${
                  selectedWord === 'sueños'
                    ? 'bg-orange-500 text-stone-950 font-black border-orange-600'
                    : 'bg-orange-100/60 dark:bg-orange-950/40 text-orange-950 dark:text-orange-300 border-orange-200 dark:border-orange-800/50 hover:bg-orange-200'
                }`}
              >
                sueños
              </span>{' '}
              nos motiva a{' '}
              <span
                onClick={() => {
                  speakSpanish('lograr');
                  setSelectedWord('lograr');
                }}
                className={`cursor-pointer px-1.5 py-0.5 rounded border transition-colors duration-200 ${
                  selectedWord === 'lograr'
                    ? 'bg-orange-500 text-stone-950 font-black border-orange-600'
                    : 'bg-orange-100/60 dark:bg-orange-950/40 text-orange-950 dark:text-orange-300 border-orange-200 dark:border-orange-800/50 hover:bg-orange-200'
                }`}
              >
                lograr
              </span>{' '}
              la verdadera{' '}
              <span
                onClick={() => {
                  speakSpanish('fluidez');
                  setSelectedWord('fluidez');
                }}
                className={`cursor-pointer px-1.5 py-0.5 rounded border transition-colors duration-200 ${
                  selectedWord === 'fluidez'
                    ? 'bg-orange-500 text-stone-950 font-black border-orange-600'
                    : 'bg-orange-100/60 dark:bg-orange-950/40 text-orange-950 dark:text-orange-300 border-orange-200 dark:border-orange-800/50 hover:bg-orange-200'
                }`}
              >
                fluidez
              </span>
              .&quot;
            </p>

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
                  <div className="p-4 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <motion.button
                        onClick={() => speakSpanish(selectedWord)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-3 rounded-xl bg-orange-500 text-stone-950 hover:bg-orange-600 transition-colors cursor-pointer shrink-0 shadow-md"
                        title="Listen CDMX pronunciation"
                      >
                        <Volume2 className="w-4 h-4" />
                      </motion.button>
                      <div>
                        <span className="text-sm font-black text-stone-900 dark:text-white capitalize flex items-center gap-2">
                          {selectedWord}
                          <span className="text-[10px] bg-orange-500/20 text-orange-800 dark:text-orange-300 px-2 py-0.5 rounded font-mono font-bold">
                            {sampleWords.find((w) => w.es === selectedWord)?.level}
                          </span>
                        </span>
                        <span className="text-xs text-stone-600 dark:text-stone-300 block mt-1">
                          English: <span className="font-bold text-stone-900 dark:text-white">{sampleWords.find((w) => w.es === selectedWord)?.en}</span>
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
                      className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-stone-950 dark:bg-white text-white dark:text-stone-950 hover:bg-stone-900 dark:hover:bg-stone-100 text-xs font-black transition-colors cursor-pointer shrink-0 text-center shadow-md"
                    >
                      + Save to SRS Flashcards
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </section>

      {/* ================= 3D HISPANOSPHERE GLOBE SHOWCASE ================= */}
      <section className="py-20 px-4 sm:px-6 max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-stone-900 dark:text-white tracking-tight">
                Interactive 3D Hispanosphere Globe
              </h3>
              <p className="text-xs text-stone-500">
                500M+ Spanish speakers across 21 sovereign nations & 15 high-density US states
              </p>
            </div>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-black bg-amber-100 dark:bg-amber-950/50 text-amber-950 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800/40">
            21 Nations + US Regions
          </span>
        </div>

        <HispanosphereGlobe />
      </section>

      {/* ================= BENTO GRID: CORE ENGINE CAPABILITIES ================= */}
      <section className="py-20 px-4 sm:px-6 max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-orange-100 dark:bg-orange-950/60 text-orange-900 dark:text-orange-300 border border-orange-200/50">
            Engineered Pathway
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-stone-900 dark:text-white tracking-tight font-header">
            How Iberio Drives Fluency
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400">
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
            className="p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-xs hover:shadow-lg transition-all space-y-5"
          >
            <div className="p-3.5 rounded-2xl bg-orange-500/10 text-orange-500 w-fit">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-stone-900 dark:text-white tracking-tight font-header">Dual-Language Story Reader</h3>
            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed font-medium">
              Read carefully graded CEFR stories. Tap any word for instant definition lookup, listen to professional CDMX native voice recordings, and append hard words to your SRS.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-xs hover:shadow-lg transition-all space-y-5"
          >
            <div className="p-3.5 rounded-2xl bg-orange-500/10 text-orange-500 w-fit">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-stone-900 dark:text-white tracking-tight font-header">AI Juan Roleplay Dialogs</h3>
            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed font-medium">
              Speak with our conversational tutor Juan in Spanish. He adapts to your CEFR skill level, offers gentle in-context corrections, and speaks every sentence aloud.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className="p-8 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 shadow-xs hover:shadow-lg transition-all space-y-5"
          >
            <div className="p-3.5 rounded-2xl bg-orange-500/10 text-orange-500 w-fit">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-stone-900 dark:text-white tracking-tight font-header">Spaced Repetition (SRS) Engine</h3>
            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed font-medium">
              Every word you mine is stored with customized SM-2 decay values. The system automatically prompts you to practice right before neural forgetting occurs to cement long-term memory.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* ================= CEFR ROADWAY SHOWCASE ================= */}
      <section className="py-20 px-4 sm:px-6 max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-orange-100 dark:bg-orange-950/60 text-orange-900 dark:text-orange-300 border border-orange-200/50">
            Curriculum Roadmap
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-stone-900 dark:text-white tracking-tight font-header">
            The Graded CEFR Pathway
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            Advance seamlessly from ground-zero beginner basics to fluent professional competence.
          </p>
        </div>

        {/* Pathway Tabs */}
        <div className="flex items-center justify-center gap-2 p-1.5 rounded-2xl bg-stone-200/70 dark:bg-stone-900 max-w-sm mx-auto">
          {(['A1', 'A2', 'B1', 'B2'] as const).map((lvl) => (
            <button
              key={lvl}
              onClick={() => {
                soundEffects.playPop();
                setActiveCefrLevel(lvl);
              }}
              className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
                activeCefrLevel === lvl
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-stone-950 shadow-md'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              Level {lvl}
            </button>
          ))}
        </div>

        {/* Selected Level Showcase Card */}
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6 relative">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 dark:border-stone-800 pb-4">
            <div>
              <h3 className="text-xl font-black text-stone-900 dark:text-white font-header">
                {cefrLevels[activeCefrLevel].title}
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                {cefrLevels[activeCefrLevel].subtitle}
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-950/60 text-orange-900 dark:text-orange-300 border border-orange-200/50 text-xs font-mono font-bold shrink-0 w-fit">
              CEFR Framework Standard
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Story Excerpt */}
            <div className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-950/60 border border-stone-200 dark:border-stone-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase text-stone-500 font-mono tracking-wider">Story Excerpt</span>
                <button
                  onClick={() => speakSpanish(cefrLevels[activeCefrLevel].sampleText)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-500 text-stone-950 text-xs font-black hover:bg-orange-600 transition-colors cursor-pointer shadow-xs"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Listen</span>
                </button>
              </div>
              <p className="text-base sm:text-lg font-serif italic text-stone-800 dark:text-stone-200 leading-relaxed">
                &quot;{cefrLevels[activeCefrLevel].sampleText}&quot;
              </p>
              <div className="text-[11px] text-stone-500 border-t border-stone-200 dark:border-stone-800 pt-2.5">
                English: {cefrLevels[activeCefrLevel].translation}
              </div>
            </div>

            {/* Competency Goals */}
            <div className="space-y-4">
              <span className="text-[10px] font-black uppercase text-stone-500 font-mono tracking-wider block">Target Competencies</span>
              <ul className="space-y-2.5 text-xs font-medium text-stone-800 dark:text-stone-200">
                {cefrLevels[activeCefrLevel].skills.map((skill, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4.5 h-4.5 text-orange-500 shrink-0" />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ================= COMMITMENT TIMELINE CALCULATOR ================= */}
      <section className="py-16 px-4 sm:px-6 max-w-4xl mx-auto">
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-8 space-y-6 shadow-xs">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-white font-header">
              Commitment Timeline Calculation
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Interactive acquisition forecasting model based on daily exposure rates.
            </p>
          </div>

          <div className="space-y-6 max-w-md mx-auto">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-stone-500 dark:text-stone-400">Daily Immersion Target</span>
              <span className="text-orange-500 font-mono">{demoMinutes} minutes / day</span>
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

            <div className="p-6 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-center space-y-1">
              <span className="text-[10px] text-orange-800 dark:text-orange-300 uppercase font-black tracking-wider block">Estimated Resulting Timeline</span>
              <div className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-white font-serif">
                Conversational B1 in ~{fluencyMonths} Months
              </div>
              <p className="text-[11px] text-stone-500 dark:text-stone-400">
                Sustained daily input establishes direct neural mappings for effortless spontaneous speaking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FAQS SECTION ================= */}
      <section className="py-16 px-4 sm:px-6 max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-4xl font-black text-stone-900 dark:text-white font-header">
            Frequently Answered Questions
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Everything you need to know about comprehensible input systems and Iberio.
          </p>
        </div>

        <div className="space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl overflow-hidden transition-all duration-250"
              >
                <button
                  onClick={() => {
                    soundEffects.playPop();
                    setOpenFaqIndex(isOpen ? null : idx);
                  }}
                  className="w-full px-5 py-4.5 text-left flex items-center justify-between font-bold text-sm text-stone-900 dark:text-stone-100 hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-stone-400 transition-transform duration-250 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.25 }}
                    className="px-5 pb-5 text-xs text-stone-600 dark:text-stone-300 leading-relaxed border-t border-stone-100 dark:border-stone-800 pt-3.5"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= FINAL CTA CONVERSION BANNER ================= */}
      <section className="py-24 px-4 sm:px-6 max-w-4xl mx-auto text-center space-y-6">
        <div className="flex items-center justify-center mb-2">
          <AztecBirdMascot size={72} interactive={true} showAura={true} />
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-stone-900 dark:text-white leading-none font-header">
          Ready for Real Spanish Fluency?
        </h2>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 max-w-xl mx-auto font-medium">
          Create your free account today to launch your CEFR diagnostic assessment, mine your first story, and converse with Juan in native Spanish.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-3">
          <motion.button
            onClick={() => {
              soundEffects.playPop();
              onStartOnboarding();
            }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 text-stone-950 font-black text-base shadow-xl shadow-orange-500/20 transition-all cursor-pointer border border-orange-400/20"
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
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white dark:bg-stone-900 hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-800 dark:text-white font-bold text-base border border-stone-200 dark:border-stone-800 transition-colors cursor-pointer"
          >
            Preview Live Demo
          </motion.button>
        </div>
      </section>

      {/* ================= IMPECCABLE AGENCY FOOTER ================= */}
      <Footer 
        activeTab="landing"
        setActiveTab={(tab) => {
          if (tab === 'landing') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            onExploreDemo();
          }
        }}
        currentLevel="A1-B2"
        userEmail={authUser?.email}
        userName={authUser?.displayName}
      />
    </div>
  );
};
