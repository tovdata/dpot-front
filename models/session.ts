// Keys
const KEY_COMPANY = 'company';
const KEY_PIMANAGER = 'piManager';
const KEY_SERVICE = 'service';
/** [Interface] 회사 데이터 구조 */
interface Company {
  id: string;
  name: string;
  en: string;
  url?: string;
  manager: PIManager;
}
/** [Interface] 회사의 개인정보보호 책임자 데이터 구조 */
interface PIManager {
  name: string;
  position: string;
  contact: string;
}
/** [Interface] 서비스 데이터 구조 */
interface Service {
  id: string;
  name: string;
}

/**
 * [Function] 회사 정보 조회
 * @returns 조회 결과
 */
export const getCompany = (): Company | undefined => {
  return getValue(KEY_COMPANY);
}
/**
 * [Function] 회사의 개인정보보호 책임자 정보 조회
 * @returns 조회 결과
 */
export const getPIManager = (): PIManager | undefined => {
  return getValue(KEY_PIMANAGER);
}
/**
 * [Function] 서비스 정보 조회
 * @returns 조회 결과
 */
export const getService = (): Service | undefined => {
  return getValue(KEY_SERVICE);
}
/**
 * [Function] 회사 정보 저장
 * @param company 저장하려는 회사 정보
 */
export const setCompany = (company: Company): void => {
  setValue(KEY_COMPANY, company);
}
/**
 * [Function] 회사의 개인정보보호 책임자 정보 저장
 * @param manager 저장하려는 개인정보보호 책임자 정보
 */
export const setPIManager = (manager: PIManager): void => {
  setValue(KEY_PIMANAGER, manager);
}
/**
 * [Function] 서비스 정보 저장
 * @param service 저장하려는 서비스 정보
 */
export const setService = (service: Service): void => {
  setValue(KEY_SERVICE, service);
}

/**
 * [Internal Function] 데이터 조회 함수
 * @param key 조회를 위한 키
 * @returns 조회 결과 데이터
 */
const getValue = (key: string): any => {
  if (typeof window !== 'undefined') {
    // 저장소로부터 데이터 추출
    const result = window.localStorage.getItem(key);
    // 데이터 반환
    return result !== null ? JSON.parse(result) : undefined;
  } else {
    return undefined;
  }
}
/**
 * [Internal Function] 데이터 저장/갱신/삭제 함수
 * @param key 저장을 위한 키
 * @param value 저장하기 위한 데이터 (없을 경우, 키에 대한 데이터 삭제)
 */
const setValue = (key: string, value?: any): void => {
  if (typeof window !== 'undefined') {
    value === undefined ? window.localStorage.removeItem(key) : window.localStorage.setItem(key, JSON.stringify(value));
  }
}