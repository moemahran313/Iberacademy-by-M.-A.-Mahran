import { Unit } from '../types';
import { A1_CURRICULUM_UNITS, A2_CURRICULUM_UNITS, WORLD_RECYCLE_BANK } from './curriculum/generatedCurriculum';
import { B1_CURRICULUM_UNITS } from './curriculum/b1Units';
import { B2_CURRICULUM_UNITS } from './curriculum/b2Units';

export {
  A1_CURRICULUM_UNITS,
  A2_CURRICULUM_UNITS,
  B1_CURRICULUM_UNITS,
  B2_CURRICULUM_UNITS
};

const rawUnits: Unit[] = [
  ...A1_CURRICULUM_UNITS,
  ...A2_CURRICULUM_UNITS,
  ...B1_CURRICULUM_UNITS,
  ...B2_CURRICULUM_UNITS
];

// Ensure every lesson across all worlds has cross-world Review System items
export const CURRICULUM_UNITS: Unit[] = rawUnits.map((unit, uIdx) => ({
  ...unit,
  lessons: unit.lessons.map((lesson, lIdx) => {
    if (lesson.revisitedVocab && lesson.revisitedVocab.length > 0) return lesson;
    const rev1 = WORLD_RECYCLE_BANK[(uIdx + lIdx) % WORLD_RECYCLE_BANK.length];
    const rev2 = WORLD_RECYCLE_BANK[(uIdx + lIdx + 1) % WORLD_RECYCLE_BANK.length];
    return {
      ...lesson,
      revisitedVocab: [rev1, rev2]
    };
  })
}));

