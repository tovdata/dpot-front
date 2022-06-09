/** 기본 Backend Server URL*/
export const SERVER_URL = 'https://dpot-dev.tovdata.com:8081/api/';
/** API 응답 상태 */
export const RESPONSE_STATUS_OK = 'OK';
export const RESPONSE_STATUS_ERROR = 'ERROR';
export const RESPONSE_STATUS_NOT_FOUND = 'NOT_FOUND';
export const RESPONSE_STATUS_REQUEST_ERROR = 'REQUEST_ERROR';
export const RESPONSE_STATUS_UNKNOWN_ERROR = 'UNKNOWN_ERROR';
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
/** API 반환 데이터 형태 (List) */
export interface StringDF { S: string };
/** API 반환 데이터 형태 (List) */
export interface BooleanDF { BOOL: boolean };
/** API 요청 데이터 형태 */
export interface RequestDF {
  body: any;
  headers: any;
  method: string;
}