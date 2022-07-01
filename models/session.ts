import { atom, selector } from 'recoil';
import { updateToken } from './queries/apis/signin-up';
// Keys
const KEY_SIDEMENU = 'plip-sm';
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
 * [Internal Function] 로컬 스토리지 초기화
 */
 const clearLocalStorage = (): void => {
  if (typeof window !== 'undefined') {
    window.localStorage.clear();
  }
}
/**
 * [Internal Function] 액세스 토큰 불러오기
 * @returns 액세스 토큰
 */
export const getAccessToken = async (): Promise<string> => {
  if (typeof window !== 'undefined') {
    const user = window.localStorage.getItem('plip-user');
    if (user) {
      const transformed = JSON.parse(user);
      if ('id' in transformed) {
        return await updateToken(transformed.id);
      } else {
        return '';
      }
    } else {
      return '';
    }
  } else {
    return '';
  }
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
/**
 * [Internal Function] 세션 스토리지에 대한 데이터 동기 (조회/저장)
 * @param key 데이터 키
 * @returns 조회 시, 데이터 조회 결과
 */
 const sessionStorageEffects = (key: string) => ({ setSelf, onSet }: any): any => {
  if (typeof window !== 'undefined') {
    // Get
    const value: string|null = window.sessionStorage.getItem(key);
    if (value !== null) {
      setSelf(JSON.parse(value));
    }
    // Set
    onSet((newValue: any) => {
      // ID 속성에 대한 값이 공백이 아닌 경우에는 Add/Update, 공백인 경우에는 Delete
      if (newValue.id !== '') {
        window.sessionStorage.setItem(key, JSON.stringify(newValue));
      } else {
        window.sessionStorage.removeItem(key);
      }
    });
  }
}
/**
 * [Internal Function] 현재 시간 (Milliseconds)
 * @returns milliseconds
 */
const unixTimestamp = (): number => {
  return Math.floor(new Date().getTime() / 1000);
}

/** [Atom] 액세스 토큰 정보  */
const accessTokenAtom = atom<any>({
  key: `AccessTokenAtom${unixTimestamp()}`,
  default: undefined
});
/** [Atom] 회사 정보 */
const companyAtom = atom<Company>({
  key: `companyAtom${unixTimestamp()}`,
  default: defaultCompany,
  effects: [localStorageEffects(KEY_COMPANY)],
});
/** [Atom] 사이드 메뉴 확장 여부  */
const expandSideAtom = atom<boolean>({
  key: `expandSideAtom${unixTimestamp()}`,
  default: true,
  effects: [sessionStorageEffects(KEY_SIDEMENU)],
});
/** [Atom] 서비스 정보 */
const serviceAtom = atom<Service>({
  key: `serviceAtom${unixTimestamp()}`,
  default: defaultService,
  effects: [localStorageEffects(KEY_SERVICE)],
});
/** [Atom] 사용자 정보 */
const userAtom = atom<User>({
  key: `userAtom${unixTimestamp()}`,
  default: defaultUser,
  effects: [localStorageEffects(KEY_USER)],
});

/** [Selector] 액세스 토큰 정보  */
export const accessTokenSelector = selector<string>({
  key: `AccessTokenSelector${unixTimestamp()}`,
  get: async ({ get }) => {
    // 기존 액세스 토큰 값이 있을 경우, 해당 토큰 값 반환
    const token = get(accessTokenAtom);
    if (token) return token;
    // 토큰 값이 없을 경우, 리프레시 토큰을 이용하여 액세스 토큰 생성
    return await getAccessToken();
  },
  set: ({ set }: any, newValue: any) => {
    set(accessTokenAtom, newValue);
    // 값이 공백인 경우, 로컬 스토리지 초기화
    if (newValue === '') clearLocalStorage();
  }
});
/** [Selector] 회사 정보 */
export const companySelector = selector<Company>({
  key: `companySelector${unixTimestamp()}`,
  get: ({ get }: any) => get(companyAtom),
  set: ({ set }: any, newValue: any) => set(companyAtom, newValue)
});
/** [Selector] 사이드 메뉴 확장 정보 */
export const expandSideSelector = selector<boolean>({
  key: `expandSideSelector${unixTimestamp()}`,
  get: ({ get }: any) => get(expandSideAtom),
  set: ({ set }: any, newValue: any) => set(expandSideAtom, newValue)
});
/** [Selector] 서비스 정보 */
export const serviceSelector = selector<Service>({
  key: `serviceSelector${unixTimestamp()}`,
  get: ({ get }: any) => get(serviceAtom),
  set: ({ set }: any, newValue: any) => set(serviceAtom, newValue)
});
/** [Selector] 사용자 정보 */
export const userSelector = selector<User>({
  key: `userSelector${unixTimestamp()}`,
  get: ({ get }: any) => get(userAtom),
  set: ({ set }: any, newValue: any) => set(userAtom, newValue)
});