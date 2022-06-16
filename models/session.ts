import { atom, selector } from 'recoil';
// Keys
const KEY_COMPANY = 'plip-company';
const KEY_SERVICE = 'plip-service';
/** [Interface] 회사 데이터 구조 */
export interface Company {
  id: string;
  name: string;
  en: string;
  url?: string;
  manager: PIManager;
}
/** [Interface] 회사의 개인정보보호 책임자 데이터 구조 */
export interface PIManager {
  name: string;
  position: string;
  email: string;
}
/** [Interface] 서비스 데이터 구조 */
export interface Service {
  id: string;
  name: string;
}

/**
 * [Internal Function] 로컬 스토리지에 대한 데이터 동기 (조회/저장)
 * @param key 데이터 키
 * @returns 조회 시, 데이터 조회 결과
 */
const localStorageEffects = (key: string) => ({ setSelf, onSet }: any): any => {
  if (typeof window !== 'undefined') {
    // Get
    const value: string|null = window.localStorage.getItem(key);
    if (value !== null) {
      setSelf(JSON.parse(value));
    }
    // Set
    onSet((newValue: any) => {
      // ID 속성에 대한 값이 공백이 아닌 경우에는 Add/Update, 공백인 경우에는 Delete
      if (newValue.id !== '') {
        window.localStorage.setItem(key, JSON.stringify(newValue));
      } else {
        window.localStorage.removeItem(key);
      }
    });
  }
}

/** [Atom] 회사 정보 */
const companyAtom = atom<Company>({
  key: 'companyAtom',
  default: { id: '', name: '', en: '', manager: { name: '', position: '', email: '' } },
  effects: [localStorageEffects(KEY_COMPANY)],
});
/** [Atom] 서비스 정보 */
const serviceAtom = atom<Service>({
  key: 'serviceAtom',
  default: { id: '', name: '' },
  effects: [localStorageEffects(KEY_SERVICE)],
});

/** [Selector] 회사 정보 */
export const companySelector = selector<Company>({
  key: 'companySelector',
  get: ({ get }: any) => get(companyAtom),
  set: ({ set }: any, newValue: any) => set(companyAtom, newValue)
});
/** [Selector] 서비스 정보 */
export const serviceSelector = selector<Service>({
  key: 'serviceSelector',
  get: ({ get }: any) => get(serviceAtom),
  set: ({ set }: any, newValue: any) => set(serviceAtom, newValue)
});