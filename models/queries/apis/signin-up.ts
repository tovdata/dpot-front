
// API
import { sendRequest } from '@/models/queries/core';
// Type
import type { ResponseDF } from '@/models/queries/type';
// Util
import { decode } from 'jsonwebtoken';

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
    // API 호출
    const response: ResponseDF = await sendRequest('/auth/signup/availability', 'POST', { email }, true);
    // 결과 반환
    return response.result;
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
    // API 호출
    const response: ResponseDF = await sendRequest('/auth/signup/resend', 'POST', { email }, true);
    // 결과 반환
    return response.result;
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
    // API 호출
    const response: ResponseDF = await sendRequest('/auth/signin', 'POST', { email, password }, true);
    // 결과 처리 및 반환
    if (response.result) {
      const extracted: any = decode(response.data.AccessToken);
      if (response.data.AccessToken) {
        return { result: true, data: { accessToken: response.data.AccessToken, userId: extracted.sub } };
      } else {
        return { result: false };
      }
    } else {
      return response;
    }
  } catch (err) {
    console.error(`[API ERROR] ${err}`);
    return { result: false };
  }
}
/**
 * [API Caller] 로그아웃
 * @returns 요청 결과
 */
export const signout = async (token: string): Promise<boolean> => {
  try {
    // API 호출
    const response: ResponseDF = await sendRequest('/auth/signout', 'POST', token);
    // 결과 반환
    return response.result;
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
    // API 호출
    const response: ResponseDF = await sendRequest('/auth/signup', 'POST', data, true);
    // 결과 반환
    return response;
  } catch (err) {
    console.error(`[ERROR] ${err}`);
    return { result: false };
  }
}