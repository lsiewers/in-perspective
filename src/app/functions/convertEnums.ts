import { Phases } from '../models/phases';

export function getPhaseKeyText(phase: Phases): string | undefined {
  const entries = Object.entries(Phases).find(p => p[1]===phase);
  return entries !== undefined ? entries[0] : undefined;
}

export function getPhaseValueByKey(phase: string): Phases {
  return (Object.values(Phases).indexOf(phase) as Phases)!;
}
