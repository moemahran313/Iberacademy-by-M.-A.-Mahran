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

let cachedJuanVoice: SpeechSynthesisVoice | null = null;

function resolveAndCacheVoice(): { voice: SpeechSynthesisVoice | null; isMexican: boolean } {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return { voice: null, isMexican: false };
  }
  
  const voices = window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) {
    return { voice: cachedJuanVoice, isMexican: cachedJuanVoice?.lang.toLowerCase().replace('_', '-').includes('mx') || false };
  }

  const spanishVoices = voices.filter(v => {
    const lang = v.lang.toLowerCase().replace('_', '-');
    return lang.startsWith('es');
  });

  const maleKeywords = [
    'jorge', 'julio', 'david', 'pablo', 'enrique', 'angel', 'daniel', 'javier', 
    'jesus', 'jésus', 'diego', 'alejandro', 'carlos', 'miguel', 'juan', 
    'manuel', 'pedro', 'alberto', 'francisco', 'jose', 'josé', 'male', 'guy', 'boy', 'man', 'masculino'
  ];

  const femaleKeywords = [
    'monica', 'paulina', 'helena', 'sabina', 'laura', 'carmen', 'lucia', 'lucía',
    'maria', 'maría', 'marisol', 'sofia', 'sofía', 'paola', 'yolanda', 'amira', 
    'dalia', 'sabrina', 'zari', 'lupita', 'ximena', 'female', 'woman', 'girl', 'femenino'
  ];

  // 1. Search for Mexican Spanish (es-MX) that is explicitly male
  let match = spanishVoices.find(v => {
    const lang = v.lang.toLowerCase().replace('_', '-');
    const name = v.name.toLowerCase();
    const isMx = lang === 'es-mx' || lang.includes('mex');
    const isMale = maleKeywords.some(kw => name.includes(kw)) || (!femaleKeywords.some(kw => name.includes(kw)) && name.includes('male'));
    return isMx && isMale;
  });

  // 2. Search for Mexican Spanish (es-MX) that is NOT female
  if (!match) {
    match = spanishVoices.find(v => {
      const lang = v.lang.toLowerCase().replace('_', '-');
      const name = v.name.toLowerCase();
      const isMx = lang === 'es-mx' || lang.includes('mex');
      const isNotFemale = !femaleKeywords.some(kw => name.includes(kw));
      return isMx && isNotFemale;
    });
  }

  // 3. Search for any Latin American Spanish (es-419, es-US, es-AR, etc.) that is explicitly male
  if (!match) {
    match = spanishVoices.find(v => {
      const lang = v.lang.toLowerCase().replace('_', '-');
      const name = v.name.toLowerCase();
      const isLatam = !lang.includes('es-es');
      const isMale = maleKeywords.some(kw => name.includes(kw));
      return isLatam && isMale;
    });
  }

  // 4. Search for any Spanish (es-ES, etc.) that is explicitly male
  if (!match) {
    match = spanishVoices.find(v => {
      const name = v.name.toLowerCase();
      return maleKeywords.some(kw => name.includes(kw));
    });
  }

  // 5. Search for any Spanish voice that is NOT female
  if (!match) {
    match = spanishVoices.find(v => {
      const name = v.name.toLowerCase();
      return !femaleKeywords.some(kw => name.includes(kw));
    });
  }

  // 6. Extreme fallback: any Mexican Spanish
  if (!match) {
    match = spanishVoices.find(v => {
      const lang = v.lang.toLowerCase().replace('_', '-');
      return lang === 'es-mx' || lang.includes('mex');
    });
  }

  // 7. Ultimate fallback
  if (!match && spanishVoices.length > 0) {
    match = spanishVoices[0];
  }

  if (match) {
    cachedJuanVoice = match;
  }

  const isMexican = match ? (match.lang.toLowerCase().replace('_', '-').includes('mx')) : false;
  return { voice: match || null, isMexican };
}

// Initialize onvoiceschanged hook for persistence
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  window.speechSynthesis.onvoiceschanged = () => {
    resolveAndCacheVoice();
  };
  resolveAndCacheVoice();
}

function getJuanSpanishVoice(voices: SpeechSynthesisVoice[]): { voice: SpeechSynthesisVoice | null; isMexican: boolean } {
  return resolveAndCacheVoice();
}

export function speakSpanish(text: string, rate: number = 0.9, pitch: number = 1.0) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported in this browser.');
    return;
  }

  cancelSpanishSpeech();

  const cleanText = text.replace(/[*_#`~]/g, '');
  const utterance = new SpeechSynthesisUtterance(cleanText);
  
  const voices = window.speechSynthesis.getVoices();
  const { voice: esVoice, isMexican } = getJuanSpanishVoice(voices);

  // Default to Mexican Spanish language tag
  utterance.lang = isMexican ? 'es-MX' : (esVoice ? esVoice.lang : 'es-MX');
  utterance.rate = rate;
  utterance.pitch = pitch; // Clean, natural male pitch

  if (esVoice) {
    utterance.voice = esVoice;
  }

  currentUtterance = utterance;
  window.speechSynthesis.speak(utterance);
}

/**
 * Enhanced Real-Time Read-Along TTS with native boundary events + smooth timer fallback
 */
export function speakSpanishWithHighlight(
  text: string,
  options: SpeechHighlightOptions = {}
) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('Speech synthesis not supported in this browser.');
    options.onEnd?.();
    return;
  }

  cancelSpanishSpeech();

  const rate = options.rate ?? 0.9;
  const pitch = options.pitch ?? 1.0;
  const cleanText = text.replace(/[*_#`~]/g, '');

  const utterance = new SpeechSynthesisUtterance(cleanText);
  
  const voices = window.speechSynthesis.getVoices();
  const { voice: esVoice, isMexican } = getJuanSpanishVoice(voices);

  // Default to Mexican Spanish language tag
  utterance.lang = isMexican ? 'es-MX' : (esVoice ? esVoice.lang : 'es-MX');
  utterance.rate = rate;
  utterance.pitch = pitch;

  if (esVoice) {
    utterance.voice = esVoice;
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
