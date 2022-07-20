// API
import { sendRequest } from '@/models/queries/core';
// Type
import type { Company, PLIPService, ResponseDF } from '@/models/queries/type';

/**
 * [API Caller] 회사 가입 승인
 * @param code UUID
 * @returns 요청 결과
 */
export const approval = async (code: string): Promise<ResponseDF> => {
  try {
    // API 호출
    const response: ResponseDF = await sendRequest(`/auth/code/confirmation?code=${code}`, 'GET', undefined, true);
    // 결과 반환
    return response;
  } catch (err) {
    console.error(`[API ERROR] ${err}`);
    return { result: false };
  }
}
/**
 * [API Caller] 서비스 생성
 * @param companyId 회사 ID
 * @param data 서비스 데이터
 * @returns 요청 결과
 */
export const createService = async (companyId: string, data: PLIPService): Promise<ResponseDF> => {
  try {
    // API 호출
    const response: ResponseDF = await sendRequest('/service/new', 'POST', { companyId, ...data });
    // 결과 반환
    return response;
  } catch (err) {
    console.error(`[API ERROR] ${err}`);
    return { result: false };
  }
}
/**
 * [API Caller] 서비스 삭제
 * @param serviceId 서비스 ID
 * @returns 요청 결과
 */
export const deleteService = async (serviceId: string): Promise<boolean> => {
  try {
    // API 호출
    const response: ResponseDF = await sendRequest(`/service/${serviceId}`, 'DELETE');
    // 결과 반환
    return response.result;
  } catch (err) {
    console.error(`[API ERROR] ${err}`);
    return false;
  }
}
/**
 * [API Caller] 사용자 소속 제거
 * @param companyId 회사 ID
 * @param userId 사용자 ID
 * @returns 요청 결과
 */
export const deregisterUser = async (companyId: string, userId: string): Promise<boolean> => {
  try {
    // API 호출
    const response: ResponseDF = await sendRequest(`/company/${companyId}/deregistration`, 'POST', { userId });
    // 결과 반환
    return response.result;
  } catch (err) {
    console.error(`[API ERROR] ${err}`);
    return false;
  }
}
/**
 * [API Caller] 회사 검색
 * @param name 검색할 이름
 * @returns 검색 결과
 */
export const findCompanies = async (name: string): Promise<Company[]> => {
  try {
    // API 호출
    const response: ResponseDF = await sendRequest(`/company/find?name=${encodeURIComponent(name)}`, 'GET');
    // 결과 반환
    return response.result && response.data && response.data.list ? response.data.list : [];
  } catch (err) {
    console.error(`[API ERROR] ${err}`);
    return [];
  }
}
/**
 * [API Caller] 회사 정보 조회
 * @param companyId 회사 ID
 * @returns 조회 결과
 */
export const getCompany = async (companyId: string): Promise<Company | undefined> => {
  try {
    // API 요청
    const response: ResponseDF = await sendRequest(`/company/${companyId}`, 'GET');
    // 결과 반환
    return response.result && response.data ? response.data : undefined;
  } catch (err) {
    console.error(`[API ERROR] ${err}`);
    return undefined;
  }
}
/**
 * [API Caller] 서비스 조회
 * @param serviceId 서비스 ID
 * @returns 조회 결과
 */
export const getService = async (serviceId: string): Promise<PLIPService | undefined> => {
  try {
    // API 호출
    const response: ResponseDF = await sendRequest(`/service/${serviceId}`, 'GET');
    // 결과 반환
    return response.result && response.data ? response.data : undefined;
  } catch (err) {
    console.error(`[API ERROR] ${err}`);
    return undefined;
  }
}
/**
 * [API Caller] 회사 내 서비스 목록 조회
 * @param companyId 회사 ID
 * @returns 조회 결과
 */
export const getServices = async (companyId: string): Promise<PLIPService[]> => {
  try {
    // API 호출
    const response: ResponseDF = await sendRequest(`/company/${companyId}/details`, 'GET');
    // 데이터 가공 및 반환
    if (response.result && response.data && response.data.services) {
      return response.data.services.map((elem: any): PLIPService => ({ id: elem.id, serviceName: elem.serviceName, types: elem.types, url: elem.url })); 
    } else {
      return [];
    }
  } catch (err) {
    console.error(`[API ERROR] ${err}`);
    return [];
  }
}
/**
 * [API Caller] 서비스 내 마지막 수정일 조회
 * @param serviceId 서비스 ID
 * @returns 조회 결과
 */
export const getServiceModifiedTime = async (serviceId: string): Promise<any> => {
  try {
    // API 호출
    const response: ResponseDF = await sendRequest(`/service/${serviceId}/modifiedtime`, 'GET');
    // 결과 반환
    return response.result ? response.data : undefined;
  } catch (err) {
    console.error(`[API ERROR] ${err}`);
    return undefined
  }
}
/**
 * [API Caller] 사용자를 회사에 등록
 * @param companyId 회사 ID
 * @param userId 사용자 ID
 * @param accessLevel 등급
 * @returns 요청 결과
 */
export const registerUser = async (companyId: string, userId: string, accessLevel: number = 0): Promise<boolean> => {
  try {
    // API 호출
    const response: ResponseDF = await sendRequest(`/company/${companyId}/registration`, 'POST', { userId, accessLevel });
    // 결과 반환
    return response.result;
  } catch (err) {
    console.error(`[API ERROR] ${err}`);
    return false;
  }
}
/**
 * [API Caller] 회사 생성/수정
 * @param data 회사 데이터
 * @param id 회사 ID
 * @returns 요청 결과
 */
export const setCompany = async (data: Company, id?: string): Promise<ResponseDF> => {
  try {
    // 경로 정의
    const path: string = id ? `/company/${id}` : `/company/new`;
    // 메서드 정의
    const method: string = id ? 'PUT' : 'POST';
    // 데이터 복사
    const copy: Company = JSON.parse(JSON.stringify(data));
    // 파라미터 데이터 가공 (id 속성이 있을 경우 제거)
    if ('id' in copy) delete copy.id;
    // API 호출
    const response: ResponseDF = await sendRequest(path, method, copy);
    // 결과 반환
    return response;
  } catch (err) {
    console.error(`[API ERROR] ${err}`);
    return { result: false };
  }
}
/**
 * [API Caller] 회사 수정
 * @param companyId 회사 ID
 * @param data 회사 데이터
 * @returns 요청 결과
 */
export const updateCompany = async (companyId: string, data: Company): Promise<ResponseDF> => {
  try {
    // ID 추출 및 제거
    delete data.id;
    // API 호출
    const response: ResponseDF = await sendRequest(`/company/${companyId}`, 'PATCH', data);
    // 결과 반환
    return response;
  } catch (err) {
    console.error(`[API ERROR] ${err}`);
    return { result: false };
  }
}
/**
 * [API Caller] 서비스 수정
 * @param companyId 회사 ID
 * @param serviceId 서비스 ID
 * @param data 서비스 데이터
 * @returns 요청 결과
 */
export const updateService = async (companyId: string, serviceId: string, data: PLIPService): Promise<ResponseDF> => {
  try {
    // 데이터 복사
    const copy: PLIPService = JSON.parse(JSON.stringify(data));
    // 파라미터 데이터 가공 (id 속성이 있을 경우 제거)
    if ('id' in copy) delete copy.id;
    // 회사 ID 추가
    copy.companyId = companyId;
    // API 호출
    const resopnse: ResponseDF = await sendRequest(`/service/${serviceId}`, 'PATCH', copy);
    // 결과 반환
    return resopnse;
  } catch (err) {
    console.error(`[API ERROR] ${err}`);
    return { result: false };
  }
}