import { ListeningTask } from '../data/listeningTasksData';

export interface AudioPlaybackState {
  isPlaying: boolean;
  isPaused: boolean;
  currentTime: number;
  duration: number;
  playCount: number;
  maxPlays: number;
  isLocked: boolean;
  playbackRate: number;
  ambientEnabled: boolean;
}

export type PlaybackCallback = (state: AudioPlaybackState) => void;

class AudioPlayerService {
  private audioCtx: AudioContext | null = null;
  private analyserNode: AnalyserNode | null = null;
  private ambientGainNode: GainNode | null = null;
  private ambientSourceNode: AudioBufferSourceNode | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;

  private playCountMap: Map<string, number> = new Map();
  private isExamModeMap: Map<string, boolean> = new Map();

  private activeTaskId: string | null = null;
  private isPlaying: boolean = false;
  private isPaused: boolean = false;
  private currentTime: number = 0;
  private duration: number = 0;
  private playbackRate: number = 1.0;
  private ambientEnabled: boolean = true;
  private timerInterval: number | null = null;
  private callback: PlaybackCallback | null = null;

  constructor() {
    // Lazy initialize AudioContext on first user interaction
  }

  private initAudioContext() {
    if (!this.audioCtx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        this.audioCtx = new AudioCtxClass();
        this.analyserNode = this.audioCtx.createAnalyser();
        this.analyserNode.fftSize = 64;
        this.analyserNode.smoothingTimeConstant = 0.8;
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  public getPlayCount(taskId: string): number {
    return this.playCountMap.get(taskId) || 0;
  }

  public canPlay(taskId: string, isExamMode: boolean): boolean {
    const plays = this.getPlayCount(taskId);
    if (!isExamMode) return true;
    return plays < 2;
  }

  public resetTaskSession(taskId: string) {
    this.playCountMap.set(taskId, 0);
    this.stopAudio();
  }

  public setCallback(cb: PlaybackCallback | null) {
    this.callback = cb;
  }

  private emitState() {
    if (this.callback && this.activeTaskId) {
      const plays = this.getPlayCount(this.activeTaskId);
      const isExamMode = this.isExamModeMap.get(this.activeTaskId) ?? true;
      const isLocked = isExamMode && plays >= 2 && !this.isPlaying;

      this.callback({
        isPlaying: this.isPlaying,
        isPaused: this.isPaused,
        currentTime: this.currentTime,
        duration: this.duration,
        playCount: plays,
        maxPlays: 2,
        isLocked,
        playbackRate: this.playbackRate,
        ambientEnabled: this.ambientEnabled
      });
    }
  }

  public getWaveformData(dataArray: Uint8Array): void {
    if (this.analyserNode && this.isPlaying) {
      this.analyserNode.getByteFrequencyData(dataArray);
    } else {
      // Simulate slight idle noise or zeros
      for (let i = 0; i < dataArray.length; i++) {
        dataArray[i] = 0;
      }
    }
  }

  private startProceduralAmbient(ambientType: ListeningTask['ambientType']) {
    this.stopProceduralAmbient();
    if (!this.ambientEnabled || !this.audioCtx) return;

    try {
      const bufferSize = this.audioCtx.sampleRate * 2; // 2 seconds loop
      const buffer = this.audioCtx.createBuffer(1, bufferSize, this.audioCtx.sampleRate);
      const output = buffer.getChannelData(0);

      // Generate procedural acoustic texture based on ambientType
      for (let i = 0; i < bufferSize; i++) {
        const whiteNoise = Math.random() * 2 - 1;
        if (ambientType === 'phone_cafeteria') {
          // Phone line crackle + ambient room noise
          output[i] = whiteNoise * 0.015 + Math.sin(i / 20) * 0.005;
        } else if (ambientType === 'radio_studio') {
          // Warm broadcast studio room hiss
          output[i] = whiteNoise * 0.008;
        } else {
          // Lecture hall subtle air conditioning hum
          output[i] = whiteNoise * 0.006 + Math.sin(i / 100) * 0.008;
        }
      }

      this.ambientSourceNode = this.audioCtx.createBufferSource();
      this.ambientSourceNode.buffer = buffer;
      this.ambientSourceNode.loop = true;

      this.ambientGainNode = this.audioCtx.createGain();
      this.ambientGainNode.gain.value = 0.15; // Low ambient backdrop

      if (ambientType === 'phone_cafeteria') {
        // Apply bandpass telephone filter (300Hz to 3400Hz)
        const filter = this.audioCtx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.value = 1200;
        filter.Q.value = 1.2;

        this.ambientSourceNode.connect(filter);
        filter.connect(this.ambientGainNode);
      } else {
        this.ambientSourceNode.connect(this.ambientGainNode);
      }

      if (this.analyserNode) {
        this.ambientGainNode.connect(this.analyserNode);
        this.analyserNode.connect(this.audioCtx.destination);
      } else {
        this.ambientGainNode.connect(this.audioCtx.destination);
      }

      this.ambientSourceNode.start();
    } catch (e) {
      console.warn('Ambient audio error:', e);
    }
  }

  private stopProceduralAmbient() {
    if (this.ambientSourceNode) {
      try {
        this.ambientSourceNode.stop();
        this.ambientSourceNode.disconnect();
      } catch {}
      this.ambientSourceNode = null;
    }
    if (this.ambientGainNode) {
      try {
        this.ambientGainNode.disconnect();
      } catch {}
      this.ambientGainNode = null;
    }
  }

  public playTaskAudio(
    task: ListeningTask,
    isExamMode: boolean = true,
    rate: number = 1.0,
    enableAmbient: boolean = true
  ): boolean {
    this.initAudioContext();
    this.activeTaskId = task.id;
    this.isExamModeMap.set(task.id, isExamMode);
    this.playbackRate = rate;
    this.ambientEnabled = enableAmbient;

    const currentPlays = this.getPlayCount(task.id);

    // Check DELE Exam Mode Play Lock
    if (isExamMode && currentPlays >= 2) {
      this.emitState();
      return false; // Can't play anymore
    }

    // Stop existing playback
    this.stopAudio(false);

    // Increment play count
    this.playCountMap.set(task.id, currentPlays + 1);

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Clear queue

      const utterance = new SpeechSynthesisUtterance(task.transcript);
      utterance.lang = 'es-ES';
      utterance.rate = this.playbackRate;

      // Select regional voice if available
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        if (task.region.includes('México')) {
          const mxVoice = voices.find(v => v.lang.includes('es-MX') || v.lang.includes('es_MX'));
          if (mxVoice) utterance.voice = mxVoice;
        } else if (task.region.includes('Andalucía') || task.region.includes('Caribe')) {
          const esVoice = voices.find(v => v.lang.includes('es-ES') || v.lang.includes('es-US'));
          if (esVoice) utterance.voice = esVoice;
          utterance.pitch = 1.05; // Slightly higher pitch for conversational speed
        } else {
          const esVoice = voices.find(v => v.lang.includes('es-ES'));
          if (esVoice) utterance.voice = esVoice;
        }
      }

      this.currentUtterance = utterance;
      this.duration = task.durationSeconds;
      this.currentTime = 0;
      this.isPlaying = true;
      this.isPaused = false;

      // Start ambient environment simulation
      this.startProceduralAmbient(task.ambientType);

      // Timer simulation for UI progress bar
      if (this.timerInterval) clearInterval(this.timerInterval);
      this.timerInterval = window.setInterval(() => {
        if (this.isPlaying && !this.isPaused) {
          this.currentTime += 0.5;
          if (this.currentTime >= this.duration) {
            this.handlePlaybackEnded();
          } else {
            this.emitState();
          }
        }
      }, 500);

      utterance.onend = () => {
        this.handlePlaybackEnded();
      };

      utterance.onerror = (e) => {
        console.warn('SpeechSynthesis error:', e);
        this.handlePlaybackEnded();
      };

      window.speechSynthesis.speak(utterance);
      this.emitState();
      return true;
    } else {
      console.warn('SpeechSynthesis API not supported');
      return false;
    }
  }

  private handlePlaybackEnded() {
    this.isPlaying = false;
    this.isPaused = false;
    this.currentTime = this.duration;
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
    this.stopProceduralAmbient();
    this.emitState();
  }

  public pauseAudio() {
    if (this.isPlaying && !this.isPaused) {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.pause();
      }
      this.isPaused = true;
      this.stopProceduralAmbient();
      this.emitState();
    }
  }

  public resumeAudio() {
    if (this.isPlaying && this.isPaused) {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.resume();
      }
      this.isPaused = false;
      this.emitState();
    }
  }

  public stopAudio(resetCurrentTime: boolean = true) {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.isPlaying = false;
    this.isPaused = false;
    if (resetCurrentTime) {
      this.currentTime = 0;
    }
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
    this.stopProceduralAmbient();
    this.emitState();
  }

  public toggleAmbient(enable: boolean, ambientType?: ListeningTask['ambientType']) {
    this.ambientEnabled = enable;
    if (!enable) {
      this.stopProceduralAmbient();
    } else if (this.isPlaying && ambientType) {
      this.startProceduralAmbient(ambientType);
    }
    this.emitState();
  }
}

export const audioPlayerService = new AudioPlayerService();
