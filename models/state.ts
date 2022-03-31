import { atom, selector } from 'recoil';
// Data
import { processingItems, purposes } from './temporary';
// Type
import { TableProcessItemData } from './type';

/** Atom */
const processingItemsForPimAtom = atom<TableProcessItemData[]>({
  key: 'processingItemsForPimAtom',
  default: processingItems
});
const purposesForPimAtom = atom<string[]>({
  key: 'purposesForPimAtom',
  default: purposes
});
const editLogAtom = atom<any>({
  key: 'editLogAtom',
  default: {}
});

/** Selector */
export const getProcessingItemsForPimSelector = selector<TableProcessItemData[]>({
  key: 'getProcessingItemsForPimSelector',
  get: ({ get }) => get(processingItemsForPimAtom)
});
export const updateProcessingItemsForPimSelector = selector<TableProcessItemData[]>({
  key: 'updateProcessingItemsForPimSelector',
  get: ({ get }) => get(processingItemsForPimAtom),
  set: ({ set }, value) => set(processingItemsForPimAtom, value)
});
export const getPurposeForPimSelector = selector<string[]>({
  key: 'getPurposeForPimSelector',
  get: ({ get }) => get(purposesForPimAtom)
});
export const updatePurposeForPimSelector = selector<string[]>({
  key: 'updatePurposeForPimSelector',
  get: ({ get }) => get(purposesForPimAtom),
  set: ({ set }, value) => set(purposesForPimAtom, value)
});
export const updateEditLogSelector = selector<any>({
  key: 'updateEditLogSelector',
  get: ({ get }) => get(editLogAtom),
  set: ({ set }, value) => set(editLogAtom, value)
});