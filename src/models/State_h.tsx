import { atom, selector } from 'recoil';
// Type
import { AIContentVisible } from '../models/Type';

export const defaultAITableItemVisible: AIContentVisible = {
  charger: true,
  department: true,
  items: true,
  period: true,
  purpose: true,
  subject: true
};

const aiTableItemVisibleAtom = atom({
  key: 'piiTableItemVisibleAtom',
  default: defaultAITableItemVisible
});

export const getAITableItemVisibleSelector = selector<AIContentVisible>({
  key: 'getAITableItemVisibleSelector',
  get: ({ get }) => get(aiTableItemVisibleAtom)
});

export const updateAITableItemVisibleSelector = selector<AIContentVisible>({
  key: 'updateAITableItemVisibleSelector',
  get: ({ get }) => get(aiTableItemVisibleAtom),
  set: ({ set }, data) => set(aiTableItemVisibleAtom, data)
});