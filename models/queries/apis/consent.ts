import { createRequest, extractData } from '@/models/queries/internal';
// Type
import { RequestDF, ResponseDF, SERVER_URL } from '@/models/queries/type';

/**
 * [API Caller] 동의서 삭제
 * @param token 액세스 토큰
 * @param serviceId 서비스 ID
 * @param consentId 동의서 ID
 * @returns 요청 결과
 */
export const deleteConsent = async (token: string, serviceId: string, consentId: string): Promise<boolean> => {
  try {
    // 요청 객체 생성
    const request: RequestDF = createRequest('DELETE', token);
    // API 호출
    const response: Response = await fetch(`${SERVER_URL}consent/${serviceId}?target=${consentId}`, request);
    // 결과 반환
    return (await extractData(response)).result;
  } catch (err) {
    console.error(`[API ERROR] ${err}`);
    return false;
  }
}
/**
 * [API Caller] 동의서 목록 조회
 * @param token 액세스 토큰
 * @param serviceId 서비스 ID
 * @returns 조회 결과
 */
export const getConsentList = async (token: string, serviceId: string): Promise<any[]> => {
  try {
    // 요청 객체 생성
    const request: RequestDF = createRequest('GET', token);
    // API 호출
    const response: Response = await fetch(`${SERVER_URL}consent/${serviceId}`, request);
    // 데이터 추출
    const result: ResponseDF = await extractData(response);
    // 결과 반환
    return result.result && result.data ? result.data.consentList : [];
  } catch (err) {
    console.error(`[API ERROR] ${err}`);
    return [];
  }
}
/**
 * [API Caller] 동의서 생성 및 수정
 * @param token 액세스 토큰
 * @param serviceId 서비스 ID
 * @param data 동의서 데이터
 * @param html 동의서 문서
 * @returns 요청 결과
 */
export const setConsent = async (token: string, serviceId: string, data: any, html?: string): Promise<any> => {
  try {
    // 요청 객체 생성
    const request: RequestDF = createRequest('POST', token, { serviceId: serviceId, data: data, htmlBody: html });
    // API 호출
    const response: Response = await fetch(`${SERVER_URL}consent/publish`, request);
    // 결과 반환
    return await extractData(response);
  } catch (err) {
    console.error(`[API ERROR] ${err}`);
    return false;
  }
}