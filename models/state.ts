import { atom, selector } from 'recoil';
// Data
import { personalInfo } from './temporary';
// Module
import { setDataSource } from '../components/common/Table';

/** [Atom] Personal information data */
const PersonalInfoAtom = atom<any[]>({
  key: 'PersonalInfoAtom',
  default: personalInfo
});

/** [Selector] Personal information selector for update */
export const UpdatePersonalInfoSelector = selector<any[]>({
  key: 'UpdatePersonalInfoSelector',
  get: ({ get }) => get(PersonalInfoAtom),
  set: ({ set }, value) => set(PersonalInfoAtom, value)
});