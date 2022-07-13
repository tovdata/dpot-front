// API
import { sendRequest } from '@/models/queries/core';
// Type
import type { ResponseDF } from '@/models/queries/type';

/**
 * [API Caller] 동의서 삭제
 * @param serviceId 서비스 ID
 * @param consentId 동의서 ID
 * @returns 요청 결과
 */
export const deleteConsent = async (serviceId: string, consentId: string): Promise<boolean> => {
  try {
    // API 호출
    const response: ResponseDF = await sendRequest(`/consent/${serviceId}?target=${consentId}`, 'DELETE');
    // 결과 반환
    return response.result;
  } catch (err) {
    console.error(`[API ERROR] ${err}`);
    return false;
  }
}
/**
 * [API Caller] 동의서 목록 조회
 * @param serviceId 서비스 ID
 * @returns 조회 결과
 */
export const getConsentList = async (serviceId: string): Promise<any[]> => {
  try {
    // API 호출
    const response: ResponseDF = await sendRequest(`/consent/${serviceId}`, 'GET');
    // 결과 반환
    return response.result && response.data ? response.data.consentList : [];
  } catch (err) {
    console.error(`[API ERROR] ${err}`);
    return [];
  }
}
/**
 * [API Caller] 동의서 생성 및 수정
 * @param serviceId 서비스 ID
 * @param userId 사용자 ID
 * @param data 동의서 데이터
 * @param htmlBody 동의서 문서
 * @returns 요청 결과
 */
export const setConsent = async (serviceId: string, userId: string, data: any, htmlBody?: string): Promise<any> => {
  try {
    // API 호출
    const response: ResponseDF = await sendRequest(`/consent/publish`, 'POST', { serviceId, userId, data, htmlBody });
    // 결과 반환
    return response;
  } catch (err) {
    console.error(`[API ERROR] ${err}`);
    return false;
  }
}