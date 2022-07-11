// API
import { sendRequest } from '@/models/queries/core';
// Type
import type { PLIPUser, ResponseDF } from '@/models/queries/type';

/** [Interface] 사용자 약관 동의 데이터 */
export interface AgreementProps {
  esa1: boolean;
  esa2: boolean;
  ssa1: boolean;
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
    // 요청 데이터 정의
    const data: any = { ...user, agreement };
    // API 호출
    const response: ResponseDF = await sendRequest(`/user/new/${userId}`, 'POST', data, true);
    // 결과 반환
    return response.result;
  } catch (err) {
    console.error(`[ERROR] ${err}`);
    return false;
  }
}
/**
 * [API Caller] 사용자 조회
 * @param userId 사용자 ID
 * @returns 조회 결과
 */
export const getUser = async (userId: string): Promise<PLIPUser|undefined> => {
  try {
    // API 호출
    const response: ResponseDF = await sendRequest(`/user/${userId}`, 'GET');
    // 결과 반환
    return response.result && response.data ? response.data as PLIPUser : undefined;
  } catch (err) {
    console.error(`[API ERROR] ${err}`);
    return undefined;
  }
}
/**
 * [API Caller] 회사에 소속된 사용자 목록
 * @param companyId 회사 ID
 * @returns 조회 결과
 */
export const getUsers = async (companyId: string): Promise<PLIPUser[]> => {
  try {
    // API 호출
    const response: ResponseDF = await sendRequest(`/company/${companyId}/details`, 'GET');
    // 데이터 가공
    if (response.result && response.data && response.data.employees) {
      return response.data.employees.map((elem: any): PLIPUser => ({ id: elem.id, contact: elem.contact, createAt: elem.createAt, department: elem.department, email: elem.email, position: elem.position, task: elem.task, userName: elem.userName }));
    } else {
      return [];
    }
  } catch (err) {
    console.error(`[API ERROR] ${err}`);
    return [];
  }
}
/**
 * [API Caller] 비밀번호 변경
 * @param userName 사용자 이름
 * @param prevPassword 이전 비밀번호
 * @param newPassword 새로운 비밀번호
 * @returns 요청 결과
 */
export const updatePassword = async (userName: string, prevPassword: string, newPassword: string): Promise<boolean> => {
  try {
    // Body
    const body = { username: userName, prevpassword: prevPassword, newpassword: newPassword };
    // API 호출
    const response: ResponseDF = await sendRequest(`/auth/password`, 'POST', body);
    // 결과 반환
    return response.result;
  } catch (err) {
    console.error(`[API ERROR] ${err}`);
    return false;
  }
}
/**
 * [API Caller] 사용자 정보 갱신
 * @param userId 사용자 ID
 * @param data 사용자 정보
 * @returns 요청 결과
 */
export const updateUser = async (userId: string, data: PLIPUser): Promise<boolean> => {
  try {
    // 데이터 복사
    const copy: PLIPUser = JSON.parse(JSON.stringify(data));
    // ID 속성이 있을 경우, 삭제
    if ('id' in copy) delete copy.id;
    if ('createAt' in copy) delete copy.createAt;
    // API 호출
    const response: ResponseDF = await sendRequest(`/user/${userId}`, 'PATCH', copy);
    // 결과 반환
    return response.result;
  } catch (err) {
    console.error(`[API ERROR] ${err}`);
    return false;
  }
}