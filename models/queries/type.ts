import { getAccessToken } from "../session";

/** 기본 Backend Server URL*/
export const SERVER_URL = 'https://api-dev.plip.kr:8081/api/';
/** API 응답 상태 */
export const RESPONSE_STATUS_OK = 'OK';
export const RESPONSE_STATUS_ERROR = 'ERROR';
export const RESPONSE_STATUS_NOT_FOUND = 'NOT_FOUND';
export const RESPONSE_STATUS_REQUEST_ERROR = 'REQUEST_ERROR';
export const RESPONSE_STATUS_UNKNOWN_ERROR = 'UNKNOWN_ERROR';
export const RESPONSE_STATUS_NOT_AUTHORIZED = 'NOT_AUTHORIZED';
/** API 서비스 경로 */
export const SERVICE_PI = 'pi';
export const SERVICE_FNI = 'fni';
export const SERVICE_PPI = 'ppi';
export const SERVICE_CPI = 'cpi';
export const SERVICE_DPI = 'dpi';
export const SERVICE_PFNI = 'pfni';
export const SERVICE_CFNI = 'cfni';
export const SERVICE_PIPP = 'pipp';
export const SERVICE_EPI = 'epi';
export const SERVICE_ESI = 'esi';
export const SERVICE_CONSENT = 'consent';
/** API 서비스 목록 */
export const SERVICE_LIST = [
  SERVICE_PI,
  SERVICE_FNI,
  SERVICE_PPI,
  SERVICE_CPI,
  SERVICE_DPI,
  SERVICE_PFNI,
  SERVICE_CFNI
];
/** API 응답 형태 */
export interface ResponseDF {
  result: boolean;
  data?: any;
}
/** API 반환 데이터 형태 (Map) */
export interface MapDF { M: any };
/** API 반환 데이터 형태 (List) */
export interface ListDF { L: any[] };
/** API 반환 데이터 형태 (String) */
export interface StringDF { S: string };
/** API 반환 데이터 형태 (List) */
export interface NumberDF { N: number };
/** API 반환 데이터 형태 (Boolean) */
export interface BooleanDF { BOOL: boolean };
/** API 요청 데이터 형태 */
export interface RequestDF {
  credentials?: any,
  body: any;
  headers: any;
  method: string;
}
/**
 * 기본적인 Request 생성 함수
 * @param method API Method
 * @param data 요청 데이터
 * @returns 요청 객체
 */
export const createRequest = async (method: string, data?: any): Promise<RequestDF> => {
  // 액세스 토큰 추출
  const accessToken: string = await getAccessToken();
  // 요청 객체 반환
  return {
    credentials: 'include',
    body: method === 'GET' ? undefined : data ? JSON.stringify(data) : undefined,
    headers: {
      'Authorization': accessToken,
      'Content-Type': 'application/json'
    },
    method: method
  };
}
/**
 * 기본적인 Request 생성 함수 (Not auth)
 * @param method API Method
 * @param data 요청 데이터
 * @returns 요청 객체
 */
 export const createRequestNotAuth = (method: string, data: any): RequestDF => {
  // 요청 객체 반환
  return {
    credentials: 'include',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
    method: method
  };
}

/** [Interface] 회사 */
export interface Company {
  companyName: string;
  createAt?: number;
  id?: string;
  manager: Manager;
  url?: string;
}
/** [Interface] 개인정보 책임자  */
export interface Manager {
  email: string;
  name: string;
  position: string;
}
/** [Interface] 서비스 */
export interface PLIPService {
  companyId?: string;
  createAt?: number;
  id?: string;
  serviceName: string;
  types: PLIPServiceType[];
  url?: string;
}
/** [Interface] 사용자 */
export interface PLIPUser {
  affiliations?: any[];
  contact?: string;
  createAt?: number;
  department?: string;
  email?: string;
  id?: string;
  position?: string;
  task?: string;
  userName: string;
}
/** [Type] 서비스 유형 */
export type PLIPServiceType = 'default' | 'web' | 'app';