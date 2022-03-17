import { atom, selector } from 'recoil';
// Data
import { PIHeaderData } from '../static/data';
// Type
import { TableFieldVisible, TableHeaderDataKV } from './type';

/** Default values */
export const defatulPITableHeader: TableHeaderDataKV = {};
export const defaultPITableFieldVisible: TableFieldVisible = {};

/** Set a default data */
for (const elem of PIHeaderData) {
  defatulPITableHeader[elem.key] = elem;
  defaultPITableFieldVisible[elem.key] = elem.visible;
}

/** Atom */
const piTableHeaderAtom = atom<TableHeaderDataKV>({
  key: 'piTableHeaderAtom',
  default: defatulPITableHeader
});
const piTableFieldVisibleAtom = atom<TableFieldVisible>({
  key: 'piTableFieldVisibleAtom',
  default: defaultPITableFieldVisible
});

/** Selector */
export const getPITableHeaderSelector = selector<TableHeaderDataKV>({
  key: 'getPITableHeaderSelector',
  get: ({ get }) => get(piTableHeaderAtom)
});
export const getPITableFieldVisibleSelector = selector<TableFieldVisible>({
  key: 'getPITableFieldVisibleSelector',
  get: ({ get }) => get(piTableFieldVisibleAtom)
});
export const updatePITableHeaderSelector = selector<TableHeaderDataKV>({
  key: 'updatePITableHeaderSelector',
  get: ({ get }) => get(piTableHeaderAtom),
  set: ({ set }, value) => set(piTableHeaderAtom, value)
});
export const updatePITableFieldVisibleSelector = selector<TableFieldVisible>({
  key: 'updatePITableFieldVisibleSelector',
  get: ({ get }) => get(piTableFieldVisibleAtom),
  set: ({ set }, value) => set(piTableFieldVisibleAtom, value)
});