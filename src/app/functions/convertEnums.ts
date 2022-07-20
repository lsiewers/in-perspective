import { Phases } from '../enums/phases';

export function getPhaseKeyText(phase: Phases): string | undefined {
  const entries = Object.entries(Phases).find(p => p[1]===phase);
  return entries !== undefined ? entries[0] : undefined;
}
