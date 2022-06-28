import { extractData } from '../internal';
import { createRequest, PLIPUser, RequestDF, ResponseDF, SERVER_URL } from '../type';

/** [Interface] 회원가입에 필요한 데이터 */
export interface SignupProps {
  email: string;
  password: string;
  name: string;
  phone_number: string;
}
/** [Interface] 사용자 약관 동의 데이터 */
export interface AgreementProps {
  esa1: boolean;
  esa2: boolean;
  ssa1: boolean;
}

/**
 * [API Caller] 이메일 중복 확인
 * @param email 이메일
 * @returns 결과
 */
export const checkDuplicate = async (email: string): Promise<boolean> => {
  try {
    // 요청 객체 생성
    const request: RequestDF = createRequest('POST', { email });
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
    const request: RequestDF = createRequest('POST', { email });
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
    const request: RequestDF = createRequest('POST', { email, password });
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
 * [API Caller] 회원가입 (For Cognito)
 * @param data 회원가입 데이터
 * @returns 요청 결과
 */
export const signup = async (data: SignupProps): Promise<ResponseDF> => {
  try {
    // 요청 객체 생성
    const request: RequestDF = createRequest('POST', data);
    // API 호출
    const response = await fetch(`${SERVER_URL}auth/signup`, request);
    // 데이터 추출 및 반환
    return await extractData(response);
  } catch (err) {
    console.error(`[ERROR] ${err}`);
    return { result: false };
  }
}
/**
 * [API Caller] 사용자 추가 (For Server)
 * @param userId 사용자 ID (by Cognito)
 * @param user 사용자 데이터
 * @param agreement 약관 동의 내역
 * @returns 요청 결과
 */
export const addUser = async (userId: string, user: PLIPUser, agreement: AgreementProps): Promise<boolean> => {
  try {
    // 요청 객체 생성
    const request: RequestDF = createRequest('POST', { ...user, ...agreement });
    // API 호출
    const response = await fetch(`${SERVER_URL}user/new/${userId}`, request);
    // 데이터 추출 및 반환
    return (await extractData(response)).result;
  } catch (err) {
    console.error(`[ERROR] ${err}`);
    return false;
  }
}