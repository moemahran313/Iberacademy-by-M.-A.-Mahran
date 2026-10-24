/**
 * Haptics and Synthesized Web Audio Tactile Feedback Engine
 * Ultra-lightweight, 0 external dependencies, 60 FPS guaranteed.
 */

export type HapticPreset =
  | 'light'
  | 'medium'
  | 'heavy'
  | 'selection'
  | 'success'
  | 'warning'
  | 'error';

// Mobile Haptic Vibrations API helper
export function triggerHaptic(pattern: number | number[] | HapticPreset = 15): void {
  if (typeof window === 'undefined') return;
  try {
    if ('vibrate' in navigator && typeof navigator.vibrate === 'function') {
      let vibrationPattern: number | number[];
      if (typeof pattern === 'string') {
        switch (pattern) {
          case 'light':
          case 'selection':
            vibrationPattern = [15];
            break;
          case 'medium':
            vibrationPattern = [25];
            break;
          case 'heavy':
            vibrationPattern = [40];
            break;
          case 'success':
            vibrationPattern = [30, 50, 30];
            break;
          case 'warning':
            vibrationPattern = [25, 40];
            break;
          case 'error':
            vibrationPattern = [40, 60, 40];
            break;
          default:
            vibrationPattern = [15];
        }
      } else {
        vibrationPattern = pattern;
      }
      navigator.vibrate(vibrationPattern);
    }
  } catch {
    // Graceful fallback on restricted iframes or unsupported devices
  }
}

// 1. Tactile tap / correct card drop (15ms crisp vibration)
export function hapticTap(): void {
  triggerHaptic([15]);
}

// 2. Milestone level-up / lesson completion vibration ([30, 50, 30])
export function hapticLevelUp(): void {
  triggerHaptic([30, 50, 30]);
}

// 3. Error / friction buzz
export function hapticError(): void {
  triggerHaptic([40, 60, 40]);
}

// 4. Subtle selection tick (8ms)
export function hapticTick(): void {
  triggerHaptic([8]);
}

// Web Audio API Synthesizer (Instant acoustic micro-clicks without external MP3 assets)
let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

/**
 * High-precision synthesized mechanical micro-click.
 * Mimics tactile physical switch activation with logarithmic downward frequency chirp.
 */
export function playTactileClick(): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    const now = ctx.currentTime;
    // Rapid pitch drop 650Hz -> 180Hz in 25ms gives snappy mechanical key click
    osc.type = 'sine';
    osc.frequency.setValueAtTime(650, now);
    osc.frequency.exponentialRampToValueAtTime(180, now + 0.025);

    // Exponential volume envelope with instant attack and sharp decay
    gain.gain.setValueAtTime(0.09, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.028);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.03);
  } catch {
    // Ignore audio policies
  }
}

/**
 * Synthesized pleasant pop for successful answers / card placements
 */
export function playSuccessPop(): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    const now = ctx.currentTime;
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.1);
  } catch {}
}

/**
 * Synthesized triumphant harmonic chime for milestone level-up
 */
export function playLevelUpFanfare(): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    // Major triad arpeggio: C5 (523Hz), E5 (659Hz), G5 (784Hz), C6 (1046Hz)
    const notes = [523.25, 659.25, 783.99, 1046.5];

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      const startTime = now + idx * 0.06;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.1, startTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.28);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.3);
    });
  } catch {}
}
