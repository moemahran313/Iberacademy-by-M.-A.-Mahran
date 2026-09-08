import React, { useState, useRef, useEffect } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll
} from 'motion/react';
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
  Mail,
  Star,
  Layers,
  RotateCw,
  Mic,
  MicOff,
  Headphones,
  Sliders,
  TrendingUp,
  VolumeX,
  Languages,
  CheckCheck,
  Sparkle
} from 'lucide-react';
import { User } from 'firebase/auth';
import { soundEffects, speakSpanish, speakSpanishWithHighlight, cancelSpanishSpeech } from '../utils/audio';
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
  // Navigation & Interactive states
  const [demoMinutes, setDemoMinutes] = useState<number>(25);
  const [selectedWord, setSelectedWord] = useState<string>('mariposa');
  const [activeCefrLevel, setActiveCefrLevel] = useState<'A1' | 'A2' | 'B1' | 'B2'>('A1');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [mascotBubble, setMascotBubble] = useState<string>('¡Hola! Soy Cuauhtli. ¡Toca mis plumas para escuchar español auténtico!');
  const [isPlayingHeroAudio, setIsPlayingHeroAudio] = useState(false);

  // SRS Interactive Card state
  const [srsIndex, setSrsIndex] = useState(0);
  const [isSrsFlipped, setIsSrsFlipped] = useState(false);
  const [srsRated, setSrsRated] = useState<'hard' | 'good' | 'easy' | null>(null);

  // Oral Shadowing interactive state
  const [isRecordingShadow, setIsRecordingShadow] = useState(false);
  const [shadowScore, setShadowScore] = useState<number | null>(null);

  // Scroll dynamics
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

  // 3D Tilt Card physics for Hero
  const cardX = useMotionValue(0);
  const cardY = useMotionValue(0);
  const springX = useSpring(cardX, { stiffness: 260, damping: 20 });
  const springY = useSpring(cardY, { stiffness: 260, damping: 20 });
  const rotateX = useTransform(springY, [-0.5, 0.5], ['10deg', '-10deg']);
  const rotateY = useTransform(springX, [-0.5, 0.5], ['-10deg', '10deg']);

  const handleHeroCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    cardX.set(xPct);
    cardY.set(yPct);
  };

  const handleHeroCardMouseLeave = () => {
    cardX.set(0);
    cardY.set(0);
  };

  // Sample SRS cards for interactive demo
  const srsDeck = [
    {
      es: 'la mariposa',
      en: 'the butterfly',
      ipa: '/la ma.ɾiˈpo.sa/',
      level: 'A1',
      context: 'La mariposa naranja vuela sobre las flores de Coyoacán.',
      mnemonic: 'Think of "maritime" fluttering over petals.'
    },
    {
      es: 'el corazón',
      en: 'the heart',
      ipa: '/el ko.ɾaˈson/',
      level: 'A1',
      context: 'El arte mexicano expresa la pasión desde el corazón.',
      mnemonic: 'Courage and heart stem from the Latin cor.'
    },
    {
      es: 'la madrugada',
      en: 'early morning / dawn',
      ipa: '/la ma.ðɾuˈɣa.ða/',
      level: 'B1',
      context: 'Salimos a caminar por la avenida Reforma en la madrugada.',
      mnemonic: 'From madrugar (to rise early).'
    }
  ];

  const sampleWords = [
    { es: 'mariposa', en: 'butterfly', level: 'A2', sentence: 'La mariposa vuela sobre el jardín.' },
    { es: 'sueños', en: 'dreams', level: 'A1', sentence: 'Un mundo lleno de hermosos sueños.' },
    { es: 'lograr', en: 'to achieve', level: 'B1', sentence: 'Vas a lograr hablar español con fluidez.' },
    { es: 'fluidez', en: 'fluency', level: 'A2', sentence: 'La fluidez llega escuchando todos los días.' }
  ];

  const mascotGreetings = [
    '¡Hola! Soy Cuauhtli, el ave solar de Iberio. ¡Toca mis plumas para escuchar español mexicano!',
    '¡Bienvenidos a Iberio! La plataforma de Inmersión Natural basada en Comprehensible Input.',
    '¿Sabías que aprender con historias activa 90% más memoria que memorizar listas de verbos?',
    '¡Prueba la gastronomía de México! Tacos al pastor, mole poblano y pozole te esperan.'
  ];

  const handleMascotClick = () => {
    soundEffects.playPop();
    const nextGreeting = mascotGreetings[(mascotGreetings.indexOf(mascotBubble) + 1) % mascotGreetings.length];
    setMascotBubble(nextGreeting);
    speakSpanish('¡Hola! Bienvenidos a Iberio. Aprende español de manera natural y divertida.');
  };

  const handlePlayHeroSentence = () => {
    soundEffects.playPop();
    setIsPlayingHeroAudio(true);
    speakSpanishWithHighlight('El viaje de mil millas comienza con una sola palabra hermosa.', {
      onEnd: () => setIsPlayingHeroAudio(false),
      onError: () => setIsPlayingHeroAudio(false)
    });
    // Fallback timer if speech synthesis finishes without event
    setTimeout(() => setIsPlayingHeroAudio(false), 3800);
  };

  const handleShadowSimulation = () => {
    soundEffects.playPop();
    setIsRecordingShadow(true);
    setShadowScore(null);
    speakSpanish('Me gustaría ordenar unos tacos al pastor, por favor.');
    setTimeout(() => {
      setIsRecordingShadow(false);
      setShadowScore(97);
      soundEffects.playCorrect();
    }, 2800);
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

  // Trajectory dynamic formulas
  const fluencyMonths = Math.max(2, Math.round(14 - (demoMinutes / 60) * 10));
  const estimatedWords = Math.round(demoMinutes * 28);
  const milestoneBadge =
    demoMinutes >= 45
      ? '🏆 Bilingual Diplomat'
      : demoMinutes >= 30
      ? '⚡ Fluent Storyteller'
      : demoMinutes >= 20
      ? '🌟 Social Navigator'
      : '🌱 Agile Beginner';

  const faqs = [
    {
      q: 'How does Comprehensible Input ($i+1$) work?',
      a: 'Pioneered by Dr. Stephen Krashen, the Input Hypothesis proves that human brains acquire language naturally when exposed to interesting messages just slightly beyond our current level ($i+1$). Instead of translating rigid grammar tables in your head, your neural pathways absorb sentence syntax intuitively.'
    },
    {
      q: 'Is Iberio designed for absolute beginners (A0/A1)?',
      a: 'Yes, absolutely! Iberio features dedicated A0 Foundation modules and graded A1 stories. Every word features instant popover definitions, sentence translation, synchronized native audio playback, and one-click flashcard mining so you are never overwhelmed.'
    },
    {
      q: 'What makes the Mexican Accent & Culture focus unique?',
      a: 'With over 130 million native speakers, Mexico is the largest Spanish-speaking nation in the world. Iberio prioritizes authentic CDMX pronunciation, vibrant Mexican cultural folklore (Frida Kahlo, Día de los Muertos, Tenochtitlan), and rich gastronomy vocabulary alongside a Pan-Hispanic 21-nation overview.'
    },
    {
      q: 'How does the Spaced Repetition (SRS) Flashcard system function?',
      a: 'Whenever you mine an unfamiliar word from an immersion story or video, it is placed into an SM-2 algorithmic Spaced Repetition deck. Iberio schedules reviews right at the brink of neural decay, ensuring near-permanent long-term memory retention.'
    },
    {
      q: 'Can I earn verifiable CEFR proficiency credentials?',
      a: 'Yes. Completing each CEFR tier unlocks comprehensive diagnostic assessments testing reading comprehension, oral shadowing, and vocabulary mastery, granting a verified digital Iberio CEFR Diploma.'
    }
  ];

  return (
    <div className="bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 min-h-screen font-sans selection:bg-orange-500 selection:text-white overflow-x-hidden flex flex-col antialiased relative">
      
      {/* ================= KINETIC BACKGROUND AMBIENT GRADIENT MESH ================= */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <motion.div
          animate={{
            x: ['-5%', '5%', '-5%'],
            y: ['-5%', '8%', '-5%'],
            scale: [1, 1.08, 1]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-32 -left-32 w-[600px] sm:w-[850px] h-[600px] sm:h-[850px] bg-gradient-to-br from-orange-500/15 via-amber-500/10 to-transparent rounded-full blur-3xl opacity-75"
        />
        <motion.div
          animate={{
            x: ['5%', '-5%', '5%'],
            y: ['5%', '-8%', '5%'],
            scale: [1.05, 1, 1.05]
          }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/3 -right-32 w-[550px] sm:w-[750px] h-[550px] sm:h-[750px] bg-gradient-to-bl from-amber-500/12 via-rose-500/8 to-transparent rounded-full blur-3xl opacity-60"
        />
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#262626_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />
      </div>

      {/* ================= TOP ANNOUNCEMENT BANNER ================= */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-stone-950 px-4 py-2 text-center text-xs font-bold shadow-md z-50 flex items-center justify-center gap-2 flex-wrap border-b border-orange-400">
        <span className="px-2 py-0.5 rounded-full bg-stone-950 text-amber-400 font-mono text-[10px] uppercase font-black tracking-widest shrink-0 animate-pulse flex items-center gap-1">
          ✨ CEFR 2026 EDITION
        </span>
        <span className="font-semibold text-stone-950">
          Natural Comprehensible Input Spanish System • Graded A1–B2 Stories, Native CDMX Audio & AI Tutor.
        </span>
        <div className="flex items-center gap-1.5 ml-2">
          <a
            href="https://www.facebook.com/mhdmahran/"
            target="_blank"
            rel="noopener noreferrer"
            title="Message on Facebook"
            className="p-1 rounded-lg bg-stone-950/90 text-amber-400 hover:bg-stone-900 transition flex items-center justify-center hover:scale-105"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
          <a
            href="mailto:moemahran@gmail.com"
            title="Send an Email"
            className="p-1 rounded-lg bg-stone-950/90 text-amber-400 hover:bg-stone-900 transition flex items-center justify-center hover:scale-105"
          >
            <Mail className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* ================= IMPECCABLE GLASS NAVIGATION ================= */}
      <nav className="w-full bg-white/80 dark:bg-stone-950/80 backdrop-blur-xl border-b border-stone-200/80 dark:border-stone-800/80 sticky top-0 z-40 shadow-xs transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <button 
            onClick={() => onExploreDemo()}
            className="flex items-center gap-2 cursor-pointer group focus:outline-none"
          >
            <IberioLogo variant="full" className="h-9" />
          </button>

          {/* Quick Nav Links */}
          <div className="hidden lg:flex items-center gap-6 text-xs font-bold text-stone-600 dark:text-stone-300">
            <a href="#hero" className="hover:text-orange-500 transition-colors">Methodology</a>
            <a href="#interactive-suite" className="hover:text-orange-500 transition-colors">Interactive Suite</a>
            <a href="#hispanosphere" className="hover:text-orange-500 transition-colors">Hispanosphere</a>
            <a href="#curriculum" className="hover:text-orange-500 transition-colors">CEFR Pathway</a>
            <a href="#calculator" className="hover:text-orange-500 transition-colors">Fluency Forecast</a>
            <a href="#faq" className="hover:text-orange-500 transition-colors">FAQ</a>
          </div>

          {/* Call to Actions */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {authUser ? (
              <motion.button
                onClick={() => {
                  soundEffects.playPop();
                  onExploreDemo();
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-5 py-2 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-stone-950 text-xs font-black shadow-md cursor-pointer border border-orange-400/30 transition-transform"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Go to Workspace</span>
              </motion.button>
            ) : (
              <>
                <button
                  onClick={() => {
                    soundEffects.playPop();
                    onExploreDemo();
                  }}
                  className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white text-xs font-bold transition-colors cursor-pointer"
                >
                  <Compass className="w-4 h-4 text-orange-500" />
                  <span>Explore Demo</span>
                </button>

                <button
                  onClick={() => {
                    soundEffects.playPop();
                    onOpenAuthModal?.('signin');
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-stone-100 hover:bg-stone-200 dark:hover:bg-stone-800 text-xs font-bold transition-colors cursor-pointer"
                >
                  <span>Sign In</span>
                </button>

                <motion.button
                  onClick={() => {
                    soundEffects.playPop();
                    onStartOnboarding();
                  }}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-stone-950 text-xs font-black shadow-md cursor-pointer border border-orange-400/30 transition-transform"
                >
                  <span>Start Free</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </motion.button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* ================= KINETIC HERO STAGE ================= */}
      <section id="hero" className="pt-12 sm:pt-20 pb-16 px-4 max-w-7xl mx-auto w-full relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Column: Staggered Typography & CTAs */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            {/* Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 dark:bg-orange-500/15 border border-orange-500/30 text-orange-600 dark:text-orange-400 text-xs font-black tracking-wide"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin" />
              <span>SLA Natural Immersion Engine • CEFR Aligned</span>
            </motion.div>

            {/* Kinetic Title */}
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black tracking-tight text-stone-950 dark:text-white leading-[1.04]">
              Acquire fluent Spanish.{' '}
              <span className="block mt-1 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 bg-clip-text text-transparent italic font-serif">
                Intuitively & Culturally.
              </span>
            </h1>

            {/* Sub-Copy */}
            <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Say goodbye to robotic flashcard grinding and dry grammar tables. Iberio combines{' '}
              <strong className="text-stone-900 dark:text-white font-semibold">
                Dr. Stephen Krashen’s SLA Comprehensible Input
              </strong>{' '}
              with graded Mexican stories, native CDMX audio, Spaced Repetition (SRS), and an adaptive AI tutor.
            </p>

            {/* Action CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <motion.button
                onClick={() => {
                  soundEffects.playPop();
                  onStartOnboarding();
                }}
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-600 hover:to-amber-600 text-stone-950 font-black text-sm sm:text-base shadow-xl shadow-orange-500/25 transition-all flex items-center justify-center gap-2.5 cursor-pointer border border-orange-400/30"
              >
                <span>Start Free Assessment</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>

              <motion.button
                onClick={() => {
                  soundEffects.playPop();
                  onExploreDemo();
                }}
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white dark:bg-stone-900 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-800 dark:text-white border border-stone-200 dark:border-stone-800 shadow-sm font-bold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Play className="w-4 h-4 text-orange-500 fill-orange-500" />
                <span>Explore Interactive Demo</span>
              </motion.button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center justify-center lg:justify-start gap-5 text-xs text-stone-500 dark:text-stone-400 pt-2 font-medium flex-wrap">
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-orange-500" /> 2-Min CEFR Diagnostic
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-orange-500" /> Authentic CDMX Native Audio
              </span>
              <span className="flex items-center gap-1.5 text-orange-600 dark:text-orange-400 font-bold">
                ★ Rated 4.9/5 by SLA Educators
              </span>
            </div>
          </motion.div>

          {/* Right Hero Column: Interactive 3D Magnetic Tilt Card + Mascot */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            
            {/* Aztec Mascot (Cuauhtli) Floating Banner */}
            <motion.div
              animate={{ y: [-4, 4, -4] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="w-full max-w-md mb-4 flex items-center gap-3 bg-white/80 dark:bg-stone-900/80 backdrop-blur-md p-3.5 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-lg cursor-pointer group"
              onClick={handleMascotClick}
              title="Click Cuauhtli to hear Spanish voice"
            >
              <div className="shrink-0 relative">
                <AztecBirdMascot size={46} interactive={true} showAura={false} />
                <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white dark:border-stone-900 rounded-full animate-ping" />
                <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white dark:border-stone-900 rounded-full" />
              </div>
              <div className="flex-1 text-left">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black text-orange-600 dark:text-orange-400 font-mono uppercase">
                    Cuauhtli • Mascot Guide
                  </span>
                  <span className="text-[10px] text-stone-400 flex items-center gap-1">
                    <Volume2 className="w-3 h-3 text-amber-500" /> Tap to listen
                  </span>
                </div>
                <p className="text-xs text-stone-700 dark:text-stone-300 line-clamp-2 mt-0.5 leading-snug">
                  {mascotBubble}
                </p>
              </div>
            </motion.div>

            {/* 3D Tilt Card Component */}
            <motion.div
              style={{
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d'
              }}
              onMouseMove={handleHeroCardMouseMove}
              onMouseLeave={handleHeroCardMouseLeave}
              className="w-full max-w-md rounded-3xl p-7 bg-gradient-to-br from-white via-white to-stone-100/90 dark:from-stone-900 dark:via-stone-900 dark:to-stone-950 border border-stone-200/90 dark:border-stone-800/90 shadow-2xl relative cursor-default select-none overflow-hidden"
            >
              {/* Top Card Tags */}
              <div className="flex items-center justify-between gap-2 mb-5">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-600 dark:text-orange-400 text-[10px] font-mono font-black">
                    CEFR LEVEL A1
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-mono font-black">
                    TOP 98% FREQUENCY
                  </span>
                </div>
                <span className="text-[10px] text-stone-400 font-mono">CDMX DIALECT</span>
              </div>

              {/* Spanish Target Phrase */}
              <div className="space-y-3 mb-6">
                <h3 className="text-xl sm:text-2xl font-serif italic font-bold text-stone-900 dark:text-white leading-snug">
                  &quot;El viaje de mil millas comienza con una sola palabra.&quot;
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  The journey of a thousand miles begins with a single word.
                </p>
              </div>

              {/* Waveform Equalizer & Audio Playback Trigger */}
              <div className="pt-4 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between gap-3">
                <motion.button
                  onClick={handlePlayHeroSentence}
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.94 }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer shadow-md ${
                    isPlayingHeroAudio
                      ? 'bg-amber-500 text-stone-950 animate-pulse'
                      : 'bg-gradient-to-r from-orange-500 to-amber-500 text-stone-950 hover:brightness-105'
                  }`}
                >
                  <Volume2 className="w-4 h-4" />
                  <span>{isPlayingHeroAudio ? 'Listening...' : 'Listen Pronunciation'}</span>
                </motion.button>

                {/* Animated Waveform Bars */}
                <div className="flex items-center gap-1 h-7 px-3 bg-stone-100 dark:bg-stone-800/80 rounded-xl">
                  {[0.4, 0.9, 0.6, 1, 0.7, 0.3, 0.8, 0.5].map((factor, i) => (
                    <motion.span
                      key={i}
                      animate={{
                        height: isPlayingHeroAudio
                          ? [`${factor * 6}px`, `${factor * 22}px`, `${factor * 8}px`]
                          : '5px'
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 0.6 + i * 0.08,
                        ease: 'easeInOut'
                      }}
                      className={`w-1 rounded-full ${
                        isPlayingHeroAudio ? 'bg-orange-500' : 'bg-stone-300 dark:bg-stone-600'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Floating Pill Badges */}
              <div className="mt-5 flex items-center justify-between text-[11px] text-stone-500 dark:text-stone-400 pt-3 border-t border-stone-100 dark:border-stone-800/60 font-medium">
                <span className="flex items-center gap-1">
                  <CheckCheck className="w-3.5 h-3.5 text-emerald-500" /> Authentic Syntax
                </span>
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Neural Recall Ready
                </span>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* ================= STATS & SCIENTIFIC SLA PROOF TICKER ================= */}
      <section className="py-12 border-y border-stone-200/80 dark:border-stone-800/80 bg-white/60 dark:bg-stone-900/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-black text-stone-900 dark:text-white font-serif">
              500M+
            </div>
            <div className="text-xs text-stone-500 font-semibold tracking-wide">
              Global Spanish Speakers
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-black text-orange-500 font-serif">
              21 Nations
            </div>
            <div className="text-xs text-stone-500 font-semibold tracking-wide">
              Dialects & US Regions Covered
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-black text-stone-900 dark:text-white font-serif">
              90% Higher
            </div>
            <div className="text-xs text-stone-500 font-semibold tracking-wide">
              Retention vs. Grammar Drills
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-black text-amber-500 font-serif">
              100% Free
            </div>
            <div className="text-xs text-stone-500 font-semibold tracking-wide">
              Diagnostic & Story Library
            </div>
          </div>
        </div>
      </section>

      {/* ================= INTERACTIVE BENTO GRID SUITE ================= */}
      <section id="interactive-suite" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="px-3.5 py-1 rounded-full text-xs font-mono font-black uppercase tracking-wider bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20">
            Interactive Learning Studio
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-stone-950 dark:text-white tracking-tight">
            Everything Your Brain Needs to Acquire Spanish
          </h2>
          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400">
            Four interconnected engines designed to guide you from absolute beginner to conversational B2 fluency.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          
          {/* Card 1: Live Interactive SRS Flashcard Deck (Col 6) */}
          <div className="lg:col-span-6 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 sm:p-8 shadow-lg flex flex-col justify-between space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-500">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-stone-900 dark:text-white">
                    Interactive 3D SRS Flashcard Deck
                  </h3>
                  <p className="text-xs text-stone-500">SM-2 Spaced Repetition memory engine</p>
                </div>
              </div>
              <span className="text-[10px] font-mono font-black px-2.5 py-1 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400">
                Card {srsIndex + 1} of {srsDeck.length}
              </span>
            </div>

            {/* 3D Flippable Card Frame */}
            <div
              onClick={() => {
                soundEffects.playFlip();
                setIsSrsFlipped(!isSrsFlipped);
              }}
              className="w-full min-h-[200px] rounded-2xl p-6 bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-transparent border-2 border-orange-500/20 hover:border-orange-500/40 transition-all cursor-pointer flex flex-col justify-between select-none relative"
            >
              <div className="flex items-center justify-between text-xs text-stone-500">
                <span className="font-mono text-[10px] uppercase font-bold text-orange-500">
                  {isSrsFlipped ? 'BACK • TRANSLATION' : 'FRONT • SPANISH TARGET'}
                </span>
                <span className="flex items-center gap-1 text-[11px] text-stone-400">
                  <RotateCw className="w-3 h-3 text-orange-500" /> Tap anywhere to flip
                </span>
              </div>

              <div className="my-auto text-center py-4">
                {!isSrsFlipped ? (
                  <div className="space-y-2">
                    <div className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-white">
                      {srsDeck[srsIndex].es}
                    </div>
                    <div className="text-xs text-stone-500 font-mono">
                      {srsDeck[srsIndex].ipa}
                    </div>
                    <p className="text-xs text-stone-600 dark:text-stone-400 italic mt-2">
                      &quot;{srsDeck[srsIndex].context}&quot;
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="text-2xl sm:text-3xl font-black text-orange-600 dark:text-orange-400">
                      {srsDeck[srsIndex].en}
                    </div>
                    <p className="text-xs text-stone-600 dark:text-stone-300 max-w-xs mx-auto">
                      💡 <strong>Mnemonic:</strong> {srsDeck[srsIndex].mnemonic}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-orange-500/15">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    speakSpanish(srsDeck[srsIndex].es);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-500 text-stone-950 text-xs font-black hover:bg-orange-600 transition"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Audio</span>
                </button>
                <span className="text-[10px] text-stone-400 font-mono">Level {srsDeck[srsIndex].level}</span>
              </div>
            </div>

            {/* SRS Recall Rating Buttons */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-stone-500 block">Rate Your Recall:</span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => {
                    soundEffects.playIncorrect();
                    setSrsRated('hard');
                    setTimeout(() => {
                      setIsSrsFlipped(false);
                      setSrsIndex((srsIndex + 1) % srsDeck.length);
                      setSrsRated(null);
                    }, 400);
                  }}
                  className="py-2.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 text-xs font-black transition cursor-pointer"
                >
                  Hard (1d)
                </button>
                <button
                  onClick={() => {
                    soundEffects.playCorrect();
                    setSrsRated('good');
                    setTimeout(() => {
                      setIsSrsFlipped(false);
                      setSrsIndex((srsIndex + 1) % srsDeck.length);
                      setSrsRated(null);
                    }, 400);
                  }}
                  className="py-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-black transition cursor-pointer"
                >
                  Good (3d)
                </button>
                <button
                  onClick={() => {
                    soundEffects.playCorrect();
                    setSrsRated('easy');
                    setTimeout(() => {
                      setIsSrsFlipped(false);
                      setSrsIndex((srsIndex + 1) % srsDeck.length);
                      setSrsRated(null);
                    }, 400);
                  }}
                  className="py-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-black transition cursor-pointer"
                >
                  Easy (7d)
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: Live Oral Shadowing Studio (Col 6) */}
          <div className="lg:col-span-6 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 sm:p-8 shadow-lg flex flex-col justify-between space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500">
                  <Mic className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-stone-900 dark:text-white">
                    Oral Shadowing Studio
                  </h3>
                  <p className="text-xs text-stone-500">Native CDMX speech cadence & pitch matching</p>
                </div>
              </div>
              <span className="text-[10px] font-mono font-black px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400">
                PRO SPEECH AI
              </span>
            </div>

            {/* Simulated Audio Visualizer Canvas */}
            <div className="w-full min-h-[200px] rounded-2xl p-6 bg-stone-950 text-white flex flex-col items-center justify-center text-center space-y-4 relative overflow-hidden">
              <div className="text-xs font-mono text-stone-400">Target Native Sentence:</div>
              <div className="text-lg sm:text-xl font-serif italic text-amber-400 font-bold max-w-md">
                &quot;Me gustaría ordenar unos tacos al pastor, por favor.&quot;
              </div>

              {/* Dynamic Mic Pulser / Waveform */}
              <div className="flex items-center justify-center gap-1.5 h-10 w-full">
                {[0.2, 0.5, 0.8, 1, 0.6, 0.9, 0.4, 0.7, 0.3, 0.9, 0.5].map((f, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      height: isRecordingShadow ? [`${f * 8}px`, `${f * 36}px`, `${f * 10}px`] : '6px'
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 0.5 + i * 0.05,
                      ease: 'easeInOut'
                    }}
                    className={`w-1.5 rounded-full ${
                      isRecordingShadow ? 'bg-amber-400' : 'bg-stone-700'
                    }`}
                  />
                ))}
              </div>

              {shadowScore && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-mono font-black flex items-center gap-1.5"
                >
                  <Trophy className="w-3.5 h-3.5" />
                  <span>{shadowScore}% Pronunciation Accuracy • Excellent CDMX Rhythm!</span>
                </motion.div>
              )}
            </div>

            {/* Action Trigger */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleShadowSimulation}
                disabled={isRecordingShadow}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 text-xs font-black shadow-md hover:brightness-105 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Mic className="w-4 h-4" />
                <span>{isRecordingShadow ? 'Listening & Analyzing...' : 'Simulate Oral Shadowing'}</span>
              </button>
            </div>
          </div>

          {/* Card 3: Interactive Dual-Language Reader Preview (Col 12) */}
          <div className="lg:col-span-12 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 sm:p-8 shadow-lg space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100 dark:border-stone-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-orange-500/10 text-orange-500">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-stone-900 dark:text-white">
                    LingQ-Style Graded Reader Engine
                  </h3>
                  <p className="text-xs text-stone-500">Tap any word for live lookup, pronunciation, and 1-click SRS card mining</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-orange-100 dark:bg-orange-950/60 text-orange-900 dark:text-orange-300 border border-orange-200/50 w-fit">
                Live Interactive Excerpt
              </span>
            </div>

            {/* Dual Language Interactive Text */}
            <div className="p-6 rounded-2xl bg-stone-50 dark:bg-stone-950/60 border border-stone-200 dark:border-stone-800 space-y-4">
              <p className="text-lg sm:text-2xl font-serif leading-relaxed text-stone-800 dark:text-stone-100">
                &quot;En el corazón de Coyoacán, la{' '}
                <span
                  onClick={() => {
                    speakSpanish('mariposa');
                    setSelectedWord('mariposa');
                  }}
                  className={`cursor-pointer px-1.5 py-0.5 rounded border transition-all ${
                    selectedWord === 'mariposa'
                      ? 'bg-orange-500 text-stone-950 font-black border-orange-600'
                      : 'bg-orange-100/70 dark:bg-orange-950/40 text-orange-950 dark:text-orange-300 border-orange-200 dark:border-orange-800/50 hover:bg-orange-200'
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
                  className={`cursor-pointer px-1.5 py-0.5 rounded border transition-all ${
                    selectedWord === 'sueños'
                      ? 'bg-orange-500 text-stone-950 font-black border-orange-600'
                      : 'bg-orange-100/70 dark:bg-orange-950/40 text-orange-950 dark:text-orange-300 border-orange-200 dark:border-orange-800/50 hover:bg-orange-200'
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
                  className={`cursor-pointer px-1.5 py-0.5 rounded border transition-all ${
                    selectedWord === 'lograr'
                      ? 'bg-orange-500 text-stone-950 font-black border-orange-600'
                      : 'bg-orange-100/70 dark:bg-orange-950/40 text-orange-950 dark:text-orange-300 border-orange-200 dark:border-orange-800/50 hover:bg-orange-200'
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
                  className={`cursor-pointer px-1.5 py-0.5 rounded border transition-all ${
                    selectedWord === 'fluidez'
                      ? 'bg-orange-500 text-stone-950 font-black border-orange-600'
                      : 'bg-orange-100/70 dark:bg-orange-950/40 text-orange-950 dark:text-orange-300 border-orange-200 dark:border-orange-800/50 hover:bg-orange-200'
                  }`}
                >
                  fluidez
                </span>
                .&quot;
              </p>

              {/* Selected Word Popover Inspector */}
              <AnimatePresence mode="wait">
                {selectedWord && (
                  <motion.div
                    key={selectedWord}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/25 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => speakSpanish(selectedWord)}
                        className="p-2.5 rounded-xl bg-orange-500 text-stone-950 hover:bg-orange-600 transition shadow-xs cursor-pointer"
                        title="Pronounce Word"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-base font-black text-stone-900 dark:text-white capitalize">
                            {selectedWord}
                          </span>
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-orange-500/20 text-orange-800 dark:text-orange-300">
                            {sampleWords.find((w) => w.es === selectedWord)?.level}
                          </span>
                        </div>
                        <div className="text-xs text-stone-600 dark:text-stone-300 mt-0.5">
                          Translation: <strong>{sampleWords.find((w) => w.es === selectedWord)?.en}</strong>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        soundEffects.playPop();
                        onStartOnboarding();
                      }}
                      className="w-full sm:w-auto px-4 py-2 rounded-xl bg-stone-950 dark:bg-white text-white dark:text-stone-950 text-xs font-black hover:bg-stone-900 dark:hover:bg-stone-100 transition cursor-pointer"
                    >
                      + Save to SRS Flashcards
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </section>

      {/* ================= 3D HISPANOSPHERE GLOBE SHOWCASE ================= */}
      <section id="hispanosphere" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-stone-900 dark:text-white tracking-tight">
                Interactive 3D Hispanosphere Globe
              </h3>
              <p className="text-xs sm:text-sm text-stone-500">
                Explore 500M+ Spanish speakers across 21 sovereign nations & 15 high-density US territories
              </p>
            </div>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-black bg-amber-100 dark:bg-amber-950/50 text-amber-950 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800/40">
            21 Sovereign Nations + US States
          </span>
        </div>

        <HispanosphereGlobe />
      </section>

      {/* ================= CEFR ROADWAY SHOWCASE ================= */}
      <section id="curriculum" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-orange-100 dark:bg-orange-950/60 text-orange-900 dark:text-orange-300 border border-orange-200/50">
            Curriculum Roadmap
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-stone-900 dark:text-white tracking-tight">
            The Graded CEFR Pathway
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            Advance seamlessly from ground-zero beginner basics to fluent professional competence.
          </p>
        </div>

        {/* Pathway Tabs */}
        <div className="flex items-center justify-center gap-2 p-1.5 rounded-2xl bg-stone-200/70 dark:bg-stone-900 max-w-sm mx-auto shadow-inner">
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
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 relative">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 dark:border-stone-800 pb-4">
            <div>
              <h3 className="text-xl font-black text-stone-900 dark:text-white">
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
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-500 text-stone-950 text-xs font-black hover:bg-orange-600 transition cursor-pointer shadow-xs"
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
                    <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0" />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ================= COMMITMENT FLUENCY CALCULATOR ================= */}
      <section id="calculator" className="py-16 px-4 sm:px-6 max-w-4xl mx-auto w-full">
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-8 space-y-8 shadow-xl">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-black uppercase tracking-wider bg-orange-500/10 text-orange-600 dark:text-orange-400">
              Personalized Trajectory Model
            </span>
            <h3 className="text-2xl sm:text-4xl font-black text-stone-900 dark:text-white">
              Calculate Your Spanish Fluency Timeline
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
              Adjust your daily immersion minutes to calculate your projected path to conversational B2 fluency.
            </p>
          </div>

          <div className="space-y-6 max-w-md mx-auto">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-stone-600 dark:text-stone-400">Daily Immersion Target</span>
              <span className="text-base text-orange-500 font-mono font-black">{demoMinutes} minutes / day</span>
            </div>

            <input
              type="range"
              min="5"
              max="60"
              step="5"
              value={demoMinutes}
              onChange={(e) => setDemoMinutes(Number(e.target.value))}
              className="w-full h-2.5 bg-stone-200 dark:bg-stone-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
            />

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-4 rounded-2xl bg-stone-100 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 text-center">
                <span className="text-[10px] text-stone-400 uppercase font-mono font-bold block">Vocabulary In 90 Days</span>
                <span className="text-xl font-black text-stone-900 dark:text-white font-serif">~{estimatedWords} Words</span>
              </div>
              <div className="p-4 rounded-2xl bg-stone-100 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 text-center">
                <span className="text-[10px] text-stone-400 uppercase font-mono font-bold block">Milestone Status</span>
                <span className="text-xs font-black text-orange-600 dark:text-orange-400 font-mono">{milestoneBadge}</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-orange-500/15 via-amber-500/10 to-transparent border border-orange-500/30 text-center space-y-1">
              <span className="text-[10px] text-orange-800 dark:text-orange-300 uppercase font-mono font-black tracking-wider block">
                Estimated Resulting Timeline
              </span>
              <div className="text-2xl sm:text-3xl font-black text-stone-900 dark:text-white font-serif">
                Conversational B2 in ~{fluencyMonths} Months
              </div>
              <p className="text-[11px] text-stone-500 dark:text-stone-400 pt-1">
                Consistent daily exposure activates effortless sub-conscious retrieval without internal translation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= INTERACTIVE SPRING-LOADED FAQ ACCORDION ================= */}
      <section id="faq" className="py-20 px-4 sm:px-6 max-w-4xl mx-auto space-y-8 w-full">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-4xl font-black text-stone-900 dark:text-white">
            Frequently Answered Questions
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
            Everything you need to know about Comprehensible Input ($i+1$) and Iberio.
          </p>
        </div>

        <div className="space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className={`bg-white dark:bg-stone-900 border rounded-2xl overflow-hidden transition-all duration-250 ${
                  isOpen ? 'border-orange-500/50 shadow-md' : 'border-stone-200 dark:border-stone-800'
                }`}
              >
                <button
                  onClick={() => {
                    soundEffects.playPop();
                    setOpenFaqIndex(isOpen ? null : idx);
                  }}
                  className="w-full px-5 py-4 text-left flex items-center justify-between font-bold text-sm text-stone-900 dark:text-stone-100 hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors cursor-pointer"
                >
                  <span className="pr-4">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-stone-400 shrink-0 transition-transform duration-250 ${isOpen ? 'rotate-180 text-orange-500' : ''}`} />
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="px-5 pb-5 text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed border-t border-stone-100 dark:border-stone-800 pt-3.5"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= FINAL CTA CONVERSION BANNER ================= */}
      <section className="py-24 px-4 sm:px-6 max-w-4xl mx-auto text-center space-y-6">
        <motion.div 
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          className="flex items-center justify-center mb-2"
        >
          <AztecBirdMascot size={80} interactive={true} showAura={true} />
        </motion.div>
        <h2 className="text-3xl sm:text-5xl font-black text-stone-900 dark:text-white leading-tight font-serif">
          Ready to Speak Spanish Naturally?
        </h2>
        <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 max-w-xl mx-auto font-medium">
          Start your free diagnostic assessment today, read your first graded Mexican story, and start speaking with AI tutor Juan.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-3">
          <motion.button
            onClick={() => {
              soundEffects.playPop();
              onStartOnboarding();
            }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
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

      {/* ================= FOOTER ================= */}
      <Footer 
        activeTab="landing"
        setActiveTab={(tab) => {
          if (tab === 'landing') {
            window.scrollTo(0, 0);
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
