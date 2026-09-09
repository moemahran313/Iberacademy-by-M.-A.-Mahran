// Web Speech API and Synthesized Web Audio Sound Effects

let activeTimer: ReturnType<typeof setInterval> | null = null;
let currentUtterance: SpeechSynthesisUtterance | null = null;

export interface SpeechHighlightOptions {
  rate?: number;
  pitch?: number;
  onStart?: () => void;
  onWordBoundary?: (charIndex: number, charLength?: number, word?: string) => void;
  onSentenceBoundary?: (charIndex: number) => void;
  onEnd?: () => void;
  onError?: (err: any) => void;
}

export function cancelSpanishSpeech() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    if (activeTimer) {
      clearInterval(activeTimer);
      activeTimer = null;
    }
    window.speechSynthesis.cancel();
    currentUtterance = null;
  }
}

export function pauseSpanishSpeech() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.pause();
  }
}

export function resumeSpanishSpeech() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.resume();
  }
}

export type PersonaVoiceId =
  | 'juan'
  | 'sofia'
  | 'mateo'
  | 'camila'
  | 'elena'
  | 'teacher'
  | 'friend'
  | 'grammar_doctor'
  | 'dele_examiner'
  | string;

export interface VoiceResolutionResult {
  voice: SpeechSynthesisVoice | null;
  lang: string;
  effectivePitch: number;
  effectiveRate: number;
  targetGender: 'male' | 'female';
  matchedGender: 'male' | 'female';
  voiceName: string;
}

const MALE_NAMES = [
  'jorge', 'raul', 'raúl', 'gerardo', 'miguel', 'carlos', 'juan', 'angel', 'ángel',
  'alberto', 'diego', 'julio', 'david', 'enrique', 'pablo', 'hector', 'héctor',
  'fernando', 'andres', 'andrés', 'pedro', 'gonzalo', 'mateo', 'tomas', 'tomás',
  'rodrigo', 'ricardo', 'victor', 'víctor', 'ramon', 'ramón', 'felipe', 'luis',
  'arturo', 'alvaro', 'álvaro', 'javier', 'antonio', 'sergio', 'manuel', 'francisco',
  'jose', 'josé', 'ignacio', 'alejandro', 'guillermo', 'salvador', 'mario', 'rafael',
  'alonso', 'alfredo', 'hugo', 'eduardo', 'ramiro', 'santiago', 'emilio', 'sebastian',
  'sebastián', 'gabriel', 'lucas', 'paco', 'marcos', 'leonardo', 'cesar', 'césar',
  'male', 'hombre', 'masculino', 'guy', 'boy', 'man'
];

const FEMALE_NAMES = [
  'helena', 'elena', 'laura', 'monica', 'mónica', 'carmen', 'lucia', 'lucía',
  'elba', 'abril', 'paloma', 'victoria', 'sofia', 'sofía', 'irene', 'conchita',
  'maría', 'maria', 'paulina', 'salome', 'salomé', 'paola', 'soledad', 'camila',
  'marisol', 'yolanda', 'sabina', 'dalia', 'ximena', 'lupe', 'valeria', 'catalina',
  'isabella', 'mariana', 'daniela', 'lupita', 'amira', 'sabrina', 'zari', 'alicia',
  'rosa', 'teresa', 'claudia', 'beatriz', 'patricia', 'silvia', 'elvira', 'esperanza',
  'clara', 'raquel', 'natalia', 'andrea', 'camilla', 'female', 'mujer', 'femenino',
  'woman', 'girl'
];

// Helper to identify whether a SpeechSynthesisVoice is male or female
export function detectVoiceGender(v: SpeechSynthesisVoice): 'male' | 'female' {
  const name = v.name.toLowerCase();
  const uri = (v.voiceURI || '').toLowerCase();
  const combined = `${name} ${uri}`;

  const isMale = MALE_NAMES.some(kw => combined.includes(kw));
  const isFemale = FEMALE_NAMES.some(kw => combined.includes(kw));

  if (isMale && !isFemale) return 'male';
  if (isFemale && !isMale) return 'female';
  if (isMale && isFemale) {
    // If both matched (e.g. name has both), prioritize the primary keyword
    return name.includes('male') || name.includes('hombre') ? 'male' : 'female';
  }

  // Default fallback: most browser default Spanish voices (like 'Google español') are female
  return 'female';
}

const voiceCache = new Map<string, VoiceResolutionResult>();

export function clearVoiceCache() {
  voiceCache.clear();
}

/**
 * Resolves the optimal voice and acoustic profile for a specific tutor persona:
 * - Juan: Male (Mexican / Latin American)
 * - Sofía: Female (Spain / Madrid)
 * - Mateo: Male (Spain / Castilian Academic)
 * - Camila / Elena: Female (Colombian / Latin American)
 */
export function getPersonaVoiceProfile(personaId: PersonaVoiceId = 'juan'): VoiceResolutionResult {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return {
      voice: null,
      lang: 'es-MX',
      effectivePitch: 1.0,
      effectiveRate: 0.92,
      targetGender: 'male',
      matchedGender: 'male',
      voiceName: 'Fallback'
    };
  }

  const normId = (personaId || 'juan').toLowerCase();
  const cacheKey = normId;
  if (voiceCache.has(cacheKey)) {
    return voiceCache.get(cacheKey)!;
  }

  const voices = window.speechSynthesis.getVoices();
  const spanishVoices = voices.filter(v => {
    const lang = v.lang.toLowerCase().replace('_', '-');
    return lang.startsWith('es');
  });

  // Persona Target Specifications
  let targetGender: 'male' | 'female' = 'male';
  let targetLang = 'es-MX';
  let preferredDialects: string[] = ['es-mx', 'mex'];
  let regionalBackup: string[] = ['es-419', 'es-us', 'es-co', 'es-ar'];
  let basePitch = 0.90;
  let baseRate = 0.92;
  let fallbackPitchIfOpposite = 0.80; // Used to shift female voices into masculine register if no male voice exists

  if (normId === 'juan') {
    targetGender = 'male';
    targetLang = 'es-MX';
    preferredDialects = ['es-mx', 'mex'];
    regionalBackup = ['es-419', 'es-us', 'es-co', 'es-ar'];
    basePitch = 0.90; // Natural warm Mexican male pitch
    baseRate = 0.92;
    fallbackPitchIfOpposite = 0.80; // Deep resonant male drop
  } else if (normId === 'mateo' || normId === 'teacher' || normId === 'grammar_doctor' || normId === 'dele_examiner') {
    targetGender = 'male';
    targetLang = 'es-ES';
    preferredDialects = ['es-es', 'spain'];
    regionalBackup = ['es-419', 'es-mx'];
    basePitch = 0.82; // Deep, professorial, authoritative male voice
    baseRate = 0.88; // Deliberate pedagogical pace
    fallbackPitchIfOpposite = 0.74; // Deep masculine baritone shift
  } else if (normId === 'sofia' || normId === 'friend') {
    targetGender = 'female';
    targetLang = 'es-ES';
    preferredDialects = ['es-es', 'spain'];
    regionalBackup = ['es-419', 'es-mx'];
    basePitch = 1.08; // Bright, natural conversational Madrid female
    baseRate = 0.98; // Natural, lively pace
    fallbackPitchIfOpposite = 1.15; // Feminine pitch shift
  } else if (normId === 'camila' || normId === 'elena') {
    targetGender = 'female';
    targetLang = 'es-CO';
    preferredDialects = ['es-co', 'colombia'];
    regionalBackup = ['es-419', 'es-us', 'es-mx'];
    basePitch = 1.16; // Sweet, warm, melodious Paisa/Colombian female tone
    baseRate = 0.94;
    fallbackPitchIfOpposite = 1.18; // Melodious feminine pitch shift
  }

  // 1. Search for Spanish voices of the exact TARGET GENDER
  const genderMatchedVoices = spanishVoices.filter(v => detectVoiceGender(v) === targetGender);

  let chosenVoice: SpeechSynthesisVoice | null = null;
  let matchedGender: 'male' | 'female' = targetGender;

  if (genderMatchedVoices.length > 0) {
    // 1a. Try preferred dialects first (e.g. Mexico for Juan, Spain for Mateo, Colombia for Camila)
    chosenVoice = genderMatchedVoices.find(v => {
      const lang = v.lang.toLowerCase().replace('_', '-');
      const name = v.name.toLowerCase();
      return preferredDialects.some(d => lang.includes(d) || name.includes(d));
    }) || null;

    // 1b. Try regional backups (e.g. Latin American voices for Juan/Camila)
    if (!chosenVoice && regionalBackup.length > 0) {
      chosenVoice = genderMatchedVoices.find(v => {
        const lang = v.lang.toLowerCase().replace('_', '-');
        const name = v.name.toLowerCase();
        return regionalBackup.some(b => lang.includes(b) || name.includes(b));
      }) || null;
    }

    // 1c. Pick any voice that matches the target gender
    if (!chosenVoice) {
      chosenVoice = genderMatchedVoices[0];
    }
  }

  // 2. If the user's device has NO voice of the target gender (e.g. only 1 generic female voice installed):
  // We fall back to the available Spanish voice and apply pitch shifting so it sounds like the requested gender!
  if (!chosenVoice && spanishVoices.length > 0) {
    // Try preferred dialect in available voices
    chosenVoice = spanishVoices.find(v => {
      const lang = v.lang.toLowerCase().replace('_', '-');
      const name = v.name.toLowerCase();
      return preferredDialects.some(d => lang.includes(d) || name.includes(d));
    }) || spanishVoices[0];

    matchedGender = detectVoiceGender(chosenVoice);
  }

  // Determine effective pitch
  const effectivePitch = chosenVoice && matchedGender === targetGender
    ? basePitch
    : fallbackPitchIfOpposite;

  const result: VoiceResolutionResult = {
    voice: chosenVoice,
    lang: chosenVoice ? chosenVoice.lang : targetLang,
    effectivePitch,
    effectiveRate: baseRate,
    targetGender,
    matchedGender,
    voiceName: chosenVoice ? chosenVoice.name : 'Default Spanish'
  };

  if (chosenVoice) {
    voiceCache.set(cacheKey, result);
  }

  return result;
}

// Hook into speech synthesis voice loading
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  window.speechSynthesis.onvoiceschanged = () => {
    clearVoiceCache();
  };
}

/**
 * Speaks Spanish with persona-specific voice selection and acoustic profiling:
 * - Juan: Male Mexican Spanish
 * - Sofía: Female Spain Spanish
 * - Mateo: Male Castilian Spanish (Professor)
 * - Camila: Female Colombian Spanish
 */
export function speakSpanishPersona(
  text: string,
  personaId: PersonaVoiceId = 'juan',
  speedModifier: number = 1.0
) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported in this browser.');
    return;
  }

  cancelSpanishSpeech();

  const cleanText = text.replace(/[*_#`~]/g, '');
  const utterance = new SpeechSynthesisUtterance(cleanText);
  const profile = getPersonaVoiceProfile(personaId);

  utterance.lang = profile.lang;
  utterance.pitch = profile.effectivePitch;
  utterance.rate = Math.max(0.6, Math.min(1.4, profile.effectiveRate * speedModifier));

  if (profile.voice) {
    utterance.voice = profile.voice;
  }

  currentUtterance = utterance;
  window.speechSynthesis.speak(utterance);
}

/**
 * Backwards-compatible speakSpanish function supporting optional personaId
 */
export function speakSpanish(
  text: string,
  rate: number = 0.9,
  pitch?: number,
  personaId: PersonaVoiceId = 'juan'
) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported in this browser.');
    return;
  }

  cancelSpanishSpeech();

  const cleanText = text.replace(/[*_#`~]/g, '');
  const utterance = new SpeechSynthesisUtterance(cleanText);
  const profile = getPersonaVoiceProfile(personaId);

  utterance.lang = profile.lang;
  utterance.rate = rate;
  utterance.pitch = pitch !== undefined ? pitch : profile.effectivePitch;

  if (profile.voice) {
    utterance.voice = profile.voice;
  }

  currentUtterance = utterance;
  window.speechSynthesis.speak(utterance);
}

/**
 * Enhanced Real-Time Read-Along TTS with native boundary events + smooth timer fallback
 */
export function speakSpanishWithHighlight(
  text: string,
  options: SpeechHighlightOptions = {},
  personaId: PersonaVoiceId = 'juan'
) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported in this browser.');
    options.onEnd?.();
    return;
  }

  cancelSpanishSpeech();

  const profile = getPersonaVoiceProfile(personaId);
  const rate = options.rate ?? profile.effectiveRate;
  const pitch = options.pitch ?? profile.effectivePitch;
  const cleanText = text.replace(/[*_#`~]/g, '');

  const utterance = new SpeechSynthesisUtterance(cleanText);

  utterance.lang = profile.lang;
  utterance.rate = rate;
  utterance.pitch = pitch;

  if (profile.voice) {
    utterance.voice = profile.voice;
  }

  let receivedNativeBoundary = false;

  // Words breakdown for fallback animation
  const wordTokens = cleanText.split(/(\s+)/);
  let totalChars = 0;
  const wordCharIndices: { start: number; length: number; word: string }[] = [];

  for (const token of wordTokens) {
    if (token.trim().length > 0) {
      wordCharIndices.push({
        start: totalChars,
        length: token.length,
        word: token
      });
    }
    totalChars += token.length;
  }

  utterance.onstart = () => {
    options.onStart?.();

    // Fallback timer if browser doesn't trigger boundary events reliably
    const avgWordMs = Math.max(160, Math.round((280 / rate)));
    let wordIdx = 0;

    activeTimer = setInterval(() => {
      if (receivedNativeBoundary) {
        if (activeTimer) clearInterval(activeTimer);
        return;
      }
      if (wordIdx < wordCharIndices.length) {
        const item = wordCharIndices[wordIdx];
        options.onWordBoundary?.(item.start, item.length, item.word);
        wordIdx++;
      }
    }, avgWordMs);
  };

  utterance.onboundary = (event: SpeechSynthesisEvent) => {
    receivedNativeBoundary = true;
    if (activeTimer) {
      clearInterval(activeTimer);
      activeTimer = null;
    }

    if (event.name === 'word') {
      const charIndex = event.charIndex;
      const charLength = (event as any).charLength || 4;
      const word = cleanText.substring(charIndex, charIndex + charLength);
      options.onWordBoundary?.(charIndex, charLength, word);
    } else if (event.name === 'sentence') {
      options.onSentenceBoundary?.(event.charIndex);
    }
  };

  utterance.onend = () => {
    if (activeTimer) {
      clearInterval(activeTimer);
      activeTimer = null;
    }
    currentUtterance = null;
    options.onEnd?.();
  };

  utterance.onerror = (err) => {
    if (activeTimer) {
      clearInterval(activeTimer);
      activeTimer = null;
    }
    currentUtterance = null;
    options.onError?.(err);
    options.onEnd?.();
  };

  currentUtterance = utterance;
  window.speechSynthesis.speak(utterance);
}

// Synthesized Sound Effects via Web Audio API (zero external network dependency)
class SoundEngine {
  private ctx: AudioContext | null = null;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  playCorrect() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(523.25, now); // C5
    osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.08); // E5
    osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.16); // G5

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.36);
  }

  playIncorrect() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(250, now);
    osc.frequency.exponentialRampToValueAtTime(180, now + 0.2);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.3);
  }

  playFlip() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.exponentialRampToValueAtTime(600, now + 0.05);

    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.09);
  }

  playPop() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(300, now + 0.05);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.07);
  }

  playLevelUp() {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const notes = [440, 554.37, 659.25, 880]; // A4, C#5, E5, A5
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.1);

      gain.gain.setValueAtTime(0, now + i * 0.1);
      gain.gain.linearRampToValueAtTime(0.15, now + i * 0.1 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + i * 0.1);
      osc.stop(now + i * 0.1 + 0.36);
    });
  }
}

export const soundEffects = new SoundEngine();
