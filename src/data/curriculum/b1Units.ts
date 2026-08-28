import { Unit } from '../../types';
import { B1_UNITS_PART1 } from './b1UnitsPart1';
import { B1_UNITS_PART2 } from './b1UnitsPart2';
import { B1_UNITS_PART3 } from './b1UnitsPart3';

export const B1_CURRICULUM_UNITS: Unit[] = [
  ...B1_UNITS_PART1,
  ...B1_UNITS_PART2,
  ...B1_UNITS_PART3
];

export const B1_UNITS = B1_CURRICULUM_UNITS;
