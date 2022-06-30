import { atom, selector } from 'recoil';
import { refreshSignInProcess } from './queries/api';
// Keys
const KEY_COMPANY = 'plip-company';
const KEY_SERVICE = 'plip-service';
const KEY_USER = 'plip-user';

/** [Default] 기본 회사 정보 */
export const defaultCompany: Company = {
  id: '',
  companyName: '',
  manager: { 
    name: '',
    position: '',
    email: ''
  }
}
/** [Default] 기본 서비스 정보 */
export const defaultService: Service = {
  id: '',
  serviceName: ''
}
/** [Default] 기본 사용자 정보 */
export const defaultUser: User = {
  id: '',
  userName: ''
}

/** [Interface] 기본적인 데이터 구조 */
export interface Session {
  id: string;
}
/** [Interface] 회사 데이터 구조 */
export interface Company extends Session {
  companyName: string;
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
export interface Service extends Session {
  serviceName: string;
}
/** [Interface] 사용자 데이터 구조 */
export interface User extends Session {
  userName: string;
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

/** [Atom] 액세스 토큰 정보  */
const AccessTokenAtom = atom<any>({
  key: 'AccessTokenAtom',
  default: undefined
});
/** [Atom] 회사 정보 */
const companyAtom = atom<Company>({
  key: 'companyAtom',
  default: defaultCompany,
  effects: [localStorageEffects(KEY_COMPANY)],
});
/** [Atom] 서비스 정보 */
const serviceAtom = atom<Service>({
  key: 'serviceAtom',
  default: defaultService,
  effects: [localStorageEffects(KEY_SERVICE)],
});
/** [Atom] 사용자 정보 */
const userAtom = atom<User>({
  key: 'userAtom',
  default: defaultUser,
  effects: [localStorageEffects(KEY_USER)],
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
/** [Selector] 사용자 정보 */
export const userSelector = selector<User>({
  key: 'userSelector',
  get: ({ get }: any) => get(userAtom),
  set: ({ set }: any, newValue: any) => set(userAtom, newValue)
});
/** [Selector] 액세스 토큰 정보  */
export const accessTokenSelector = selector<string>({
  key: 'AccessTokenSelector',
  get: async ({ get }) => {
    const token = get(AccessTokenAtom);
    if (token) return token;
    if (typeof window !== 'undefined') {
      const user = window.localStorage.getItem('plip-user');
      if (user) {
        const transformed = JSON.parse(user);
        if ('id' in transformed) {
          const response = await refreshSignInProcess(transformed.id);
          const data = await response.json();
          return data.AccessToken;
        } else {
          return;
        }
      }
    }
  },
  set: ({ set }: any, newValue: any) => set(AccessTokenAtom, newValue)
});