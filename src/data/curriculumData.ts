import { Lesson } from '../types';
import { CURRICULUM_UNITS } from './curriculum';
export * from './curriculum';
export {
  NATURAL_ORDER_TENSE_MILESTONES,
  getTenseMilestoneById,
  isTenseUnlocked,
  validateTenseProgression,
  recordTenseMilestoneMastery,
  canBypassPrerequisitesViaPlacement
} from '../utils/tenseSequenceValidator';
export type {
  TenseMilestone,
  TenseUnlockEvaluation,
  TenseProgressionReport
} from '../utils/tenseSequenceValidator';

export {
  AUTHENTIC_DIALOGUES,
  AUTHENTIC_DIALOGUES_MAP,
  getAuthenticDialogueForTopic
} from './dialoguesData';
export type { AuthenticDialogue, AuthenticDialogueTurn } from './dialoguesData';

export {
  SAMPLE_AUTHENTIC_LESSONS,
  SAMPLE_AUTHENTIC_LESSONS_MAP
} from './sampleLessons';

// Forbidden Artificial Slop & Sterile Textbook Tropes
export const BANNED_TEXTBOOK_TROPES: string[] = [
  'manzana roja',
  'el niño come manzana',
  'el coche está en el garaje',
  'el coche azul está averiado',
  'la biblioteca cierra a las',
  'ayer fui al cine solo',
  'necesito saber cómo hacer para',
  'muy bien, gracias. ¿y tú? excelente. me llamo mateo'
];

// Required / Commendable Authentic Discourse Markers & Modern Cultural Topics
export const AUTHENTIC_DISCOURSE_MARKERS: string[] = [
  'a ver',
  'pues la verdad',
  'fíjate',
  'oye',
  'hombre',
  'total',
  'ni hablar',
  'ni de coña',
  'por si las moscas',
  'che',
  'mirá',
  'de una',
  'bochorno',
  'bizum',
  'tardeo',
  'casero',
  'fianza',
  'nie',
  'padrón',
  'asado',
  'cercanías'
];

export interface AuthenticityAuditResult {
  lessonId: string;
  isAuthentic: boolean;
  violations: string[];
  discourseScore: number;
}

/**
 * Validates any lesson against CEFR authenticity guidelines.
 * Flags artificial textbook tropes and confirms natural discourse markers.
 */
export function auditLessonAuthenticity(lesson: Lesson): AuthenticityAuditResult {
  const violations: string[] = [];

  const dialogueText = (lesson.dialogue || []).map(t => `${t.speaker}: ${t.es}`).join(' ').toLowerCase();
  const exerciseOptions = (lesson.exercises || []).flatMap(ex => ex.options).join(' ').toLowerCase();
  const sampleTarget = (lesson.productionPrompt?.sampleTarget || '').toLowerCase();

  const combinedContent = `${dialogueText} ${exerciseOptions} ${sampleTarget}`;

  // Check for banned artificial slop
  BANNED_TEXTBOOK_TROPES.forEach(trope => {
    if (combinedContent.includes(trope.toLowerCase())) {
      violations.push(`Contiene cliché artificial prohibido: "${trope}"`);
    }
  });

  // Check for presence of natural discourse markers
  let markerHits = 0;
  AUTHENTIC_DISCOURSE_MARKERS.forEach(marker => {
    if (combinedContent.includes(marker.toLowerCase())) {
      markerHits++;
    }
  });

  const isAuthentic = violations.length === 0;

  return {
    lessonId: lesson.id,
    isAuthentic,
    violations,
    discourseScore: Math.min(100, Math.round((markerHits / 2) * 50) + (isAuthentic ? 50 : 0))
  };
}

/**
 * Runs an exhaustive authenticity audit across all curriculum units.
 */
export function performFullCurriculumAudit(): {
  totalLessonsAudited: number;
  passedCount: number;
  failedCount: number;
  passPercentage: number;
  auditPassed: boolean;
} {
  const allLessons = CURRICULUM_UNITS.flatMap(u => u.lessons);
  let passed = 0;

  allLessons.forEach(l => {
    const res = auditLessonAuthenticity(l);
    if (res.isAuthentic) passed++;
  });

  return {
    totalLessonsAudited: allLessons.length,
    passedCount: passed,
    failedCount: allLessons.length - passed,
    passPercentage: Math.round((passed / allLessons.length) * 100),
    auditPassed: passed === allLessons.length
  };
}
