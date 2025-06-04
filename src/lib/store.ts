import { atom } from 'jotai';
import { nanoid } from 'nanoid';

export interface ComponentState {
  id: string;
  name: string;
  code: string;
  preview: string;
  context: Record<string, unknown>;
  timestamp: number;
}

export const componentStateAtom = atom<ComponentState[]>([]);
export const activeComponentAtom = atom<string | null>(null);
export const contextHistoryAtom = atom<Record<string, unknown>[]>([]);

export const createComponent = (
  name: string,
  code: string,
  preview: string,
  context: Record<string, unknown> = {}
): ComponentState => ({
  id: nanoid(),
  name,
  code,
  preview,
  context,
  timestamp: Date.now(),
});