import { extractData } from '../internal';
// Type
import { Company, createRequest, PLIPService, RequestDF, ResponseDF, SERVER_URL } from '../type';

/**
 * [API Caller] 회사 검색
 * @param name 검색할 이름
 * @returns 검색 결과
 */
export const findCompanies = async (name: string): Promise<Company[]> => {
  try {
    const response = await fetch(`${SERVER_URL}company/find?name=${encodeURIComponent(name)}`);
    // 응답 결과 추출
    const result = await extractData(response);
    // 결과 반환
    return result.result ? result.data.list : [];
  } catch (err) {
    console.error(`[API ERROR] ${err}`);
    return [];
  }
}
/**
 * [API Caller] 사용자를 회사에 등록
 * @param companyId 회사 ID
 * @param userId 사용자 ID
 * @param accessLevel 등급
 * @returns 응답 결과
 */
export const registerCompany = async (companyId: string, userId: string, accessLevel: number = 0): Promise<boolean> => {
  try {
    // 요청 객체 생성
    const request: RequestDF = createRequest('PUT', { userId, accessLevel });
    // API 호출
    const response: any = await fetch(`${SERVER_URL}company/${companyId}/registration`, request);
    // 결과 반환
    return (await extractData(response, 'join')).result;
  } catch (err) {
    console.error(`[API ERROR] ${err}`);
    return false;
  }
}
/**
 * [API Caller] 회사 생성/수정
 * @param data 회사 데이터
 * @param id 회사 ID
 * @returns 응답 결과
 */
export const setCompany = async (data: Company, id?: string): Promise<ResponseDF> => {
  try {
    // URL 정의
    const url: string = id ? `${SERVER_URL}company/${id}` : `${SERVER_URL}company/new`;
    // 파라미터 데이터 가공 (id 속성이 있을 경우 제거)
    if ('id' in data) delete data.id;
    // 요청 객체 생성
    const request: RequestDF = createRequest(id ? 'PUT' : 'POST', data);
    // API 호출
    const response: any = await fetch(url, request);
    // 데이터 추출 및 반환
    return await extractData(response);
  } catch (err) {
    console.error(`[API ERROR] ${err}`);
    return { result: false };
  }
}
/**
 * [API Caller] 서비스 생성/수정
 * @param data 서비스 데이터
 * @param id 서비스 ID
 * @returns 응답 결과
 */
export const setService = async (data: PLIPService, id?: string): Promise<ResponseDF> => {
  try {
    // URL 정의
    const url: string = id ? `${SERVER_URL}service/${id}` : `${SERVER_URL}service/new`;
    // 파라미터 데이터 가공 (id 속성이 있을 경우 제거)
    if ('id' in data) delete data.id;
    // 요청 객체 생성
    const request: RequestDF = createRequest(id ? 'PUT' : 'POST', data);
    // API 호출
    const response: any = await fetch(url, request);
    // 데이터 추출 및 반환
    return await extractData(response);
  } catch (err) {
    console.error(`[API ERROR] ${err}`);
    return { result: false };
  }
}