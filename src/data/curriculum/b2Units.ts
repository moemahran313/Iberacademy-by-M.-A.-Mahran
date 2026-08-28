import { Unit } from '../../types';
import { B2_UNITS_PART1 } from './b2UnitsPart1';
import { B2_UNITS_PART2 } from './b2UnitsPart2';
import { B2_UNITS_PART3 } from './b2UnitsPart3';

export const B2_CURRICULUM_UNITS: Unit[] = [
  ...B2_UNITS_PART1,
  ...B2_UNITS_PART2,
  ...B2_UNITS_PART3
];

export const B2_UNITS = B2_CURRICULUM_UNITS;
