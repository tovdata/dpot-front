// Type
import type { JwtPayload } from 'jsonwebtoken';
import type { RequestDF, ResponseDF } from '@/models/queries/type';
// Util
import { decode } from 'jsonwebtoken';
import { getAccessToken, getUserId, setAccessToken } from '@/models/cookies';

/** API Server URL */
const SERVER_URL = 'https://api-dev.plip.kr:8081/api';
// API 응답 코드
export const RESPONSE_STATUS_OK = 'OK';
export const RESPONSE_STATUS_ERROR = 'ERROR';
export const RESPONSE_STATUS_NOT_FOUND = 'NOT_FOUND';
export const RESPONSE_STATUS_REQUEST_ERROR = 'REQUEST_ERROR';
export const RESPONSE_STATUS_UNKNOWN_ERROR = 'UNKNOWN_ERROR';
export const RESPONSE_STATUS_NOT_AUTHORIZED = 'NOT_AUTHORIZED';
export const RESPONSE_STATUS_TOKEN_EXPIRED = 'TOKEN_EXPIRED';
export const RESPONSE_STATUS_INVALID_TOKEN = 'INVALID_TOKEN';

/**
 * [Function] API 호출
 * @param path API 경로
 * @param method HTTP 메서드
 * @param data 요청할 데이터
 * @param isPublic 토큰을 이용한 인증 없이 사용 가능 여부
 * @returns 요청 결과
 */
export const sendRequest = async (path: string, method: string, data?: any, isPublic?: boolean): Promise<ResponseDF> => {
  try {
    // 토큰 만료일 비교
    let token: string | undefined = undefined;
    // 토큰을 이용한 인증 여부 확인 (기본 값은 인증)
    if (isPublic === undefined || isPublic === false) {
      token = getAccessToken();
      if (token === undefined || !validateExpires(token)) {
        // 토큰 갱신
        token = await updateToken();
        // 토큰 저장
        if (token) setAccessToken(token);
      }
      // 토큰이 없을 경우
      if (token === undefined) return { result: false };
    }

    // API 호출
    const response: any = await api(path, method, token, data);
    // 에러 검증
    if (!validateResponse(response)) {
      if (response.message && response.message.include('UserNotConfirmedException')) {
        return { result: false, data: { noConfirm: true } };
      } else {
        return { result: false };
      }
    }
    // 결과 반환
    return { result: true, data: response.data };
  } catch (err) {
    console.error(`[QUERY ERROR] ${err}`);
    return { result: false };
  }
}
/**
 * [Function] 액세스 토큰 갱신
 * @returns 액세스 토큰
 */
export const updateToken = async (): Promise<string | undefined> => {
  try {
    // 사용자 ID 추출
    const userId = getUserId();
    if (userId) {
      // API 호출
      const response: any = await api('/auth/silentrefresh', 'POST', undefined, { id: userId });
      // 에러 검증
      if (validateResponse(response)) {
        return response.data && response.data.AccessToken ? response.data.AccessToken : undefined;
      } else {
        return undefined;
      }
    } else {
      return undefined;
    }
  } catch (err) {
    console.error(`[I_FUNC ERROR] ${err}`);
    return undefined;
  }
}

/**
 * [Internal Function] API 호출 (Basis)
 * @param path API 경로
 * @param method HTTP 메서드
 * @param token 액세스 토큰
 * @param data 요청을 위한 데이터
 * @returns 응답 데이터
 */
const api = async (path: string, method: string, token?: string, data?: any): Promise<any> => {
  try {
    // 요청 객체 생성
    const request: RequestDF = createRequest(method, token, data);
    // API 호출
    const response: Response = await fetch(`${SERVER_URL}${path}`, request);
    // 데이터 변환 및 반환 (JSON)
    return await response.json();
  } catch (err) {
    console.error(`[QUERY ERROR] ${err}`);
    return undefined;
  }
}
/**
 * [Internal Function] 요청 객체 생성
 * @param method HTTP 메서드
 * @param token 액세스 토큰
 * @param data 요청을 위한 데이터
 * @returns 요청 객체
 */
const createRequest = (method: string, token?: string, data?: any) => {
  return {
    body: data ? JSON.stringify(data) : undefined,
    credentials: 'include',
    headers: {
      'Authorization': token ? token : undefined,
      'Content-Type': 'application/json'
    },
    method: method
  };
}
/**
 * [Internal Function] 만료일 검증
 * @param token 액세스 토큰
 * @returns 검증 결과
 */
const validateExpires = (token: string): boolean => {
  try {
    // 현재 시간
    const currentTime: number = Math.floor(new Date().getTime() / 1000);
    // 토큰 만료 시간
    const extracted = decode(token) as JwtPayload;
    // 결과
    return extracted && extracted.exp ? currentTime - extracted.exp < 0 ? true : false : false;
  } catch (err) {
    console.error(`[I_FUNC ERROR] ${err}`);
    return false;
  }
}
/**
 * [Internal Function] 응답에 대한 에러 검증
 * @param response 응답 데이터
 * @returns 검증 결과
 */
const validateResponse = (response: any): boolean => {
  try {
    if ('status' in response) {
      switch (response.status) {
        case RESPONSE_STATUS_ERROR:
          return printError('Internal server error', response.message);
        case RESPONSE_STATUS_REQUEST_ERROR:
          return printError('Request error', response.message);
        case RESPONSE_STATUS_UNKNOWN_ERROR:
          return printError('Unknown error', response.message);
        case RESPONSE_STATUS_NOT_FOUND:
          return printError('Not found', response.message);
        case RESPONSE_STATUS_NOT_AUTHORIZED:
          return printError('Not authorized', response.message);
        case RESPONSE_STATUS_TOKEN_EXPIRED:
          return printError('Token expired', response.message);
        case RESPONSE_STATUS_INVALID_TOKEN:
          return printError('Invalid token', response.message);
      }
      return true;
    } else {
      console.error(`[I_FUNC ERROR] Invaild a response data format`);
      return false;
    }
  } catch (err) {
    console.error(`[I_FUNC ERROR] ${err}`);
    return false;
  }
}
/**
 * [Internal Function] 에러 문구 출력
 * @param type 에러 유형
 * @param message 에러 메시지
 * @returns false
 */
const printError = (type: string, message?: string): boolean => {
  console.error(`[QUERY ERROR] ${type}`, message ? `: ${message}` : '');
  return false;
}