import { atom, selector } from 'recoil';
// Key
const KEY_SESSION = 'plip-session';
const KEY_SIDEMENU = 'plip-sm';
const KEY_USER = 'plip-user';
// Util
import { getAccessToken, removeAccessToken, setAccessToken } from '@/models/cookies';
import { updateToken } from '@/models/queries/core';

/** [Interface] 회사 및 서비스 세션 구조 */
export interface Session {
  companyId: string;
  serviceId: string;
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
 * [Internal Function] 현재 시간 (Milliseconds)
 * @returns milliseconds
 */
const getUnixTimestamp = (): number => {
  return Math.floor(new Date().getTime() / 1000);
}
/**
 * [Internal Function] 액세스 토큰 대한 데이터 동기 (조회/저장)
 * @returns 조회 시, 데이터 조회 결과
 */
const tokenEffects = () => ({ setSelf, onSet }: any): any => {
  // Get
  const value: string | undefined = getAccessToken();
  if (value) setSelf(value);
  // Set
  onSet((newValue: any) => {
    if (newValue !== '') {
      setAccessToken(newValue)
    } else {
      removeAccessToken();
    }
  });
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
      // 변환
      const data: any = JSON.parse(value);
      // 반환
      setSelf(key === KEY_USER ? (data as string).replace(/"/g, '') : data);
    }
    // Set
    onSet((newValue: any) => {
      // ID 속성에 대한 값이 공백이 아닌 경우에는 Add/Update, 공백인 경우에는 Delete
      if (newValue.companyId !== '') {
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

/** [Atom] 액세스 토큰 정보  */
const accessTokenAtom = atom<any>({
  key: `AccessTokenAtom_${getUnixTimestamp()}`,
  default: '',
  effects: [tokenEffects()]
});
/** [Atom] 사이드 메뉴 확장 여부  */
const expandSideAtom = atom<boolean>({
  key: `expandSideAtom_${getUnixTimestamp()}`,
  default: true,
  effects: [sessionStorageEffects(KEY_SIDEMENU)],
});
/** [Atom] 세션 */
const sessionAtom = atom<Session>({
  key: `sessionAtom_${getUnixTimestamp()}`,
  default: { companyId: '', serviceId: '' },
  effects: [localStorageEffects(KEY_SESSION)]
});

/** [Selector] 액세스 토큰  */
export const accessTokenSelector = selector<string>({
  key: `AccessTokenSelector_${getUnixTimestamp()}`,
  get: async ({ get }) => {
    // 기존 액세스 토큰 값이 있을 경우, 해당 토큰 값 반환
    const token = get(accessTokenAtom);
    if (token) return token;
    // 토큰 값이 없을 경우, 리프레시 토큰을 이용하여 액세스 토큰 생성
    return await updateToken();
  },
  set: ({ set }: any, newValue: any) => {
    set(accessTokenAtom, newValue);
    // 값이 공백인 경우, 로컬 스토리지 초기화
    if (newValue === '') clearLocalStorage();
  }
});
/** [Selector] 사이드 메뉴 확장 */
export const expandSideSelector = selector<boolean>({
  key: `expandSideSelector_${getUnixTimestamp()}`,
  get: ({ get }: any) => get(expandSideAtom),
  set: ({ set }: any, newValue: any) => set(expandSideAtom, newValue)
});
/** [Selector] 세션 */
export const sessionSelector = selector<Session>({
  key: `sessionSelector_${getUnixTimestamp()}`,
  get: ({ get }: any) => get(sessionAtom),
  set: ({ set }: any, newValue: any) => set(sessionAtom, newValue)
});