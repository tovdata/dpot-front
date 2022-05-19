import { atom, selector } from 'recoil';
// Data
import { infoFromSubjectInCPI, personalInfoSelectOptions } from './static/selectOption';
import { personalInfo } from './temporary';

/**
 * [Internal Function] 테이블 데이터을 대상으로 행단위 key 데이터를 추가하는 함수
 * @param dataSource 테이블 데이터 소스
 * @returns key 데이터가 추가된 테이블 데이터 소스
 */
const setDataSource = (dataSource: any): any[] => {
  return dataSource.map((item: any): any => { return { ...item, key: item.uuid } });
}

/** [Atom] Personal information data */
const PersonalInfoAtom = atom<any[]>({
  key: 'PersonalInfoAtom',
  default: setDataSource(personalInfo)
});
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
export const UpdatePersonalInfoSelector = selector<any[]>({
  key: 'UpdatePersonalInfoSelector',
  get: ({ get }) => get(PersonalInfoAtom),
  set: ({ set }, value) => set(PersonalInfoAtom, value)
});
/** [Selector]  */
export const GetCPIDefaultSelector = selector<any[]>({
  key: 'GetCPIDefaultSelector',
  get: ({ get }) => get(DefaultCPIAtom)
})