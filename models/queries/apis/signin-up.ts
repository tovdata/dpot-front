import { extractData } from '../internal';
import { createRequest, createRequestNotAuth, RequestDF, ResponseDF, SERVER_URL } from '../type';

/** [Interface] 회원가입에 필요한 데이터 */
export interface SignupProps {
  email: string;
  password: string;
  name: string;
  phone_number: string;
}

/**
 * [API Caller] 이메일 중복 확인
 * @param email 이메일
 * @returns 결과
 */
export const checkDuplicate = async (email: string): Promise<boolean> => {
  try {
    // 요청 객체 생성
    const request: RequestDF = await createRequest('POST', { email });
    // API 호출
    const response = await fetch(`${SERVER_URL}auth/signup/availability`, request);
    // 결과 추출 및 반환
    return (await extractData(response, 'duplicate')).result;
  } catch (err) {
    console.error(`[ERROR] ${err}`);
    return false;
  }
}
/**
 * [API Caller] 이메일 중복 확인
 * @param email 이메일
 * @returns 요청 결과
 */
export const resendAuthMail = async (email: string): Promise<boolean> => {
  try {
    // 요청 객체 생성
    const request: RequestDF = await createRequest('POST', { email });
    // API 호출
    const response = await fetch(`${SERVER_URL}auth/signup/resend`, request);
    // 결과 추출 및 반환
    return (await extractData(response, 'resend')).result;
  } catch (err) {
    console.error(`[ERROR] ${err}`);
    return false;
  }
}
/**
 * [API Caller] 로그인
 * @param email 사용자 이메일
 * @param password 비밀번호
 * @returns 요청 결과
 */
export const signin = async (email: string, password: string): Promise<ResponseDF> => {
  try {
    // 요청 객체 생성
    const request: RequestDF = await createRequest('POST', { email, password });
    // API 호출
    const response: any = await fetch(`${SERVER_URL}auth/signin`, request);
    // 데이터 추출 및 반환
    return await extractData(response);
  } catch (err) {
    console.error(`[API ERROR] ${err}`);
    return { result: false };
  }
}
/**
 * [API Caller] 로그아웃
 * @returns 요청 결과
 */
export const signout = async (): Promise<boolean> => {
  try {
    // 요청 객체 생성
    const request: RequestDF = await createRequest('POST', {});
    // API 호출
    const response: any = await fetch(`${SERVER_URL}auth/signout`, request);
    // 데이터 추출 및 반환
    return (await extractData(response, 'signout')).result;
  } catch (err) {
    console.error(`[API ERROR] ${err}`);
    return false;
  }
}
/**
 * [API Caller] 회원가입 (For Cognito)
 * @param data 회원가입 데이터
 * @returns 요청 결과
 */
export const signup = async (data: SignupProps): Promise<ResponseDF> => {
  try {
    // 요청 객체 생성
    const request: RequestDF = createRequestNotAuth('POST', data);
    // API 호출
    const response: any = await fetch(`${SERVER_URL}auth/signup`, request);
    // 데이터 추출 및 반환
    return await extractData(response);
  } catch (err) {
    console.error(`[ERROR] ${err}`);
    return { result: false };
  }
}
/**
 * [API Caller] Access Token 갱신
 * @param userId 사용자 ID
 * @returns access token
 */
export const updateToken = async (userId: string): Promise<string> => {
  try {
    // 요청 객체 생성
    const request: RequestDF = createRequestNotAuth('POST', { id: userId });
    // API 호출
    const response: any = await fetch(`${SERVER_URL}auth/silentrefresh`, request);
    // 데이터 추출
    const result: any = await response.json();
    // 데이터 반환
    return ('AccessToken' in result) ? result.AccessToken : '';
  } catch (err) {
    console.error(`[ERROR] ${err}`);
    return '';
  }
}