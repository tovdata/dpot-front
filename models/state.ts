import { atom, selector } from 'recoil';
// Data
import { infoFromSubjectInCPI, personalInfoSelectOptions } from './static/selectOption';

/** [Atom] Personal information select options */
const PersonalInfoSelectOptionsAtom = atom<any>({
  key: 'PersonalInfoSelectOptionsAtom',
  default: personalInfoSelectOptions
});
/** 위탁 테이블에 관련된 기본 정보*/
const DefaultCPIAtom = atom<any>({
  key: 'DefaultCPIAtom',
  default: infoFromSubjectInCPI
})

/** [Selector] Personal information select options selector for reference */
export const GetPersonalInfoSelectOptionsSelector = selector<any[]>({
  key: 'GetPersonalInfoSelectOptionsSelector',
  get: ({ get }) => get(PersonalInfoSelectOptionsAtom)
});
/** [Selector]  */
export const GetCPIDefaultSelector = selector<any[]>({
  key: 'GetCPIDefaultSelector',
  get: ({ get }) => get(DefaultCPIAtom)
})