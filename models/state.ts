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
});
/** [Atom] 사이드 메뉴 확장 여부 */
const expandSider = atom<boolean>({
  key: 'expandSider',
  default: false
});
/** [Atom] 사이드 메뉴 아이템 */
const activeKey = atom<string>({
  key: 'activeKey',
  default: '/'
});

/** [Selector] Personal information select options selector for reference */
export const GetPersonalInfoSelectOptionsSelector = selector<any[]>({
  key: 'GetPersonalInfoSelectOptionsSelector',
  get: ({ get }) => get(PersonalInfoSelectOptionsAtom)
});
/** [Selector]  */
export const GetCPIDefaultSelector = selector<any[]>({
  key: 'GetCPIDefaultSelector',
  get: ({ get }) => get(DefaultCPIAtom)
});
/** [Selector] 사이드 메뉴 확장 여부 */
export const expandSiderSelector = selector<boolean>({
  key: 'expandSiderSelector',
  get: ({ get }) => get(expandSider),
  set: ({ set }, newValue) => set(expandSider, newValue)
});
/** [Selector] 사이드 메뉴 아이템 */
export const activeKeySelector = selector<string>({
  key: 'activeKeySelector',
  get: ({ get }) => get(activeKey),
  set: ({ set }, newValue) => set(activeKey, newValue)
});