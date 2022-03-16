import { atom, selector } from 'recoil';
// Type
import { PITableFieldVisible } from '../models/Type';

/** Default values */
export const defaultPITableFieldVisibleAtom: PITableFieldVisible = {
  items: true,
  period: true,
  purpose: true,
  subject: true
};

/** Atom */
const piTableFieldVisibleAtom = atom<PITableFieldVisible>({
  key: 'piTableFieldVisibleAtom',
  default: defaultPITableFieldVisibleAtom
});

/** Selector */
export const getPITableFieldVisibleSelector = selector<PITableFieldVisible>({
  key: 'getPITableFieldVisibleSelector',
  get: ({ get }) => get(piTableFieldVisibleAtom)
});
export const updatePITableFieldVisibleSelector = selector<PITableFieldVisible>({
  key: 'updatePITableFieldVisibleSelector',
  get: ({ get }) => get(piTableFieldVisibleAtom),
  set: ({ set }, value) => set(piTableFieldVisibleAtom, value)
});