import { atom, selector } from 'recoil';
// Data
import { personalInfoSelectOptions } from './data';
import { personalInfo } from './temporary';

/** [Atom] Personal information data */
const PersonalInfoAtom = atom<any[]>({
  key: 'PersonalInfoAtom',
  default: personalInfo
});
/** [Atom] Personal information select options */
const PersonalInfoSelectOptionsAtom = atom<any>({
  key: 'PersonalInfoSelectOptionsAtom',
  default: personalInfoSelectOptions
});

/** [Selector] Personal information selector for reference */
export const GetPersonalInfoSelector = selector<any[]>({
  key: 'GetPersonalInfoSelector',
  get: ({ get }) => get(PersonalInfoAtom)
});
/** [Selector] Personal information select options selector for reference */
export const GetPersonalInfoSelectOptionsSelector = selector<any[]>({
  key: 'GetPersonalInfoSelectOptionsSelector',
  get: ({ get }) => get(PersonalInfoSelectOptionsAtom)
});
/** [Selector] Personal information selector for update */
// export const UpdatePersonalInfoSelector = selector<any[]>({
//   key: 'UpdatePersonalInfoSelector',
//   get: ({ get }) => get(PersonalInfoAtom),
//   set: ({ set }, value) => set(PersonalInfoAtom, value)
// });