import { extractData } from '../internal';
import { createRequest, createRequestNotAuth, PLIPUser, RequestDF, SERVER_URL } from '../type';

/** [Interface] 사용자 약관 동의 데이터 */
export interface AgreementProps {
  esa1: boolean;
  esa2: boolean;
  ssa1: boolean;
}

/**
 * [API Caller] 사용자 추가 (For Server)
 * @param userId 사용자 ID (by Cognito)
 * @param accessToken 액세스 토큰
 * @param user 사용자 데이터
 * @param agreement 약관 동의 내역
 * @returns 요청 결과
 */
 export const addUser = async (userId: string, accessToken: string, user: PLIPUser, agreement: AgreementProps): Promise<boolean> => {
  try {
    // 요청 객체 생성
    const request: RequestDF = {
      credentials: 'include',
      body: JSON.stringify({ ...user, ...agreement }),
      headers: {
        'Authorization': accessToken,
        'Content-Type': 'application/json'
      },
      method: 'POST'
    };
    // API 호출
    const response = await fetch(`${SERVER_URL}user/new/${userId}`, request);
    // 데이터 추출 및 반환
    return (await extractData(response)).result;
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
    // 요청 객체 생성
    const request: RequestDF = await createRequest('GET');
    // API 호출
    const response = await fetch(`${SERVER_URL}user/${userId}`, request);
    // 데이터 추출
    const result = await extractData(response);
    // 데이터 반환
    return result.result && result.data ? result.data as PLIPUser : undefined;
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
export const getUserList = async (companyId: string): Promise<PLIPUser[]> => {
  try {
    // 요청 객체 생성
    const request: RequestDF = await createRequest('GET');
    // API 호출
    const response = await fetch(`${SERVER_URL}company/${companyId}/details`, request);
    // 데이터 추출
    const result = await extractData(response);
    // 데이터 가공
    if (result.result && result.data && result.data.employees) {
      return result.data.employees.map((elem: any): PLIPUser => ({ id: elem.id, contact: elem.contact, createAt: elem.createAt, department: elem.department, email: elem.email, position: elem.position, task: elem.task, userName: elem.userName }));
    } else {
      return [];
    }
  } catch (err) {
    console.error(`[API ERROR] ${err}`);
    return [];
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
    // 요청 객체 생성
    const request = await createRequest('PUT', copy);
    // API 호출
    const response = await fetch(`${SERVER_URL}user/${userId}`, request);
    // 데이터 추출 및 결과 반환
    return (await extractData(response)).result;
  } catch (err) {
    console.error(`[API ERROR] ${err}`);
    return false;
  }
}