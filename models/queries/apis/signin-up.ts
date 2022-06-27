import { extractData } from '../internal';
import { RequestDF, ResponseDF, SERVER_URL } from '../type';

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
    // API 호출에 필요한 Request 생성
    const request: RequestDF = {
      body: JSON.stringify({ email: email }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    };
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
 * @returns 결과
 */
export const resendAuthMail = async (email: string): Promise<boolean> => {
  try {
    // API 호출에 필요한 Request 생성
    const request: RequestDF = {
      body: JSON.stringify({ email: email }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    };
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
 * [API Caller] 회원가입 (For Cognito)
 * @param data 회원가입 데이터
 * @returns 결과
 */
export const signup = async (data: SignupProps): Promise<ResponseDF> => {
  try {
    // API 호출에 필요한 Request 생성
    const request: RequestDF = {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    };
    // API 호출
    const response = await fetch(`${SERVER_URL}auth/signup`, request);
    // 결과 반환
    return await extractData(response);
  } catch (err) {
    console.error(`[ERROR] ${err}`);
    return { result: false };
  }
}
/**
 * [API Caller] 사용자 추가 (For Server)
 * @param id 사용자 ID (by Cognito)
 * @param name 사용자 이름
 * @param agreement 약관 동의 내역
 * @returns 결과
 */
export const addUser = async (id: string, name: string, agreement: AgreementProps): Promise<boolean> => {
  try {
    // API 호출에 필요한 Request 생성
    const request: RequestDF = {
      body: JSON.stringify({ userName: name, ...agreement }),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    };
    // API 호출
    const response = await fetch(`${SERVER_URL}user/new/${id}`, request);
    // 결과 반환
    return (await extractData(response)).result;
  } catch (err) {
    console.error(`[ERROR] ${err}`);
    return false;
  }
}