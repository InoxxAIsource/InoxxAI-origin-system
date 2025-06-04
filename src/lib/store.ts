import { atom } from 'jotai';

export interface ComponentState {
  id: string;
  code: string;
  preview: string;
  context: Record<string, unknown>;
}

export const componentStateAtom = atom<ComponentState[]>([]);

export const activeComponentAtom = atom<string | null>(null);

export const contextHistoryAtom = atom<Record<string, unknown>[]>([]);