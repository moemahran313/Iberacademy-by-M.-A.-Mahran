import { Unit } from '../types';
import { A1_CURRICULUM_UNITS } from './curriculum/a1Units';
import { A2_CURRICULUM_UNITS } from './curriculum/a2Units';
import { B1_CURRICULUM_UNITS } from './curriculum/b1Units';
import { B2_CURRICULUM_UNITS } from './curriculum/b2Units';

export const CURRICULUM_UNITS: Unit[] = [
  ...A1_CURRICULUM_UNITS,
  ...A2_CURRICULUM_UNITS,
  ...B1_CURRICULUM_UNITS,
  ...B2_CURRICULUM_UNITS
];

export {
  A1_CURRICULUM_UNITS,
  A2_CURRICULUM_UNITS,
  B1_CURRICULUM_UNITS,
  B2_CURRICULUM_UNITS
};
