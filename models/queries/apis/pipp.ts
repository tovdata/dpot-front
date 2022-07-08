// API
import { sendRequest } from '@/models/queries/core';
// Type
import type { ResponseDF } from '@/models/queries/type';

/**
 * [API Caller] 개인정보 처리방침 임시 저장 데이터 불러오기
 * @param serviceId 서비스 ID
 * @returns 조회 결과
 */
export const getPIPPData = async (serviceId: string): Promise<any> => {
  try {
    // API 호출
    const response: ResponseDF = await sendRequest(`/pipp/${serviceId}`, 'GET');
    // 결과 반환
    return response.result && response.data ? response.data.data : undefined;
  } catch (err) {
    console.error(`[API ERROR] ${err}`);
    return undefined;
  }
}
/**
 * [API Caller] 개인정보 처리방침 목록
 * @param serviceId 서비스 ID
 * @returns 조회 결과
 */
export const getPIPPList = async (serviceId: string): Promise<any[]> => {
  try {
    // API 호출
    const response: ResponseDF = await sendRequest(`/pipp/${serviceId}/publishedlist`, 'GET');
    // 결과 처리
    const sorted: any[] = [];
    if (response.result && response.data && ('list' in response.data)) {
      // 데이터 정렬
      sorted.push(...response.data.list.sort((a: any, b: any): number => a.applyAt - b.applyAt).map((item: any, index: number): any => ({ ...item, key: index + 1, version: index === response.data.list.length - 1 ? 9999 : index + 1 })));
      // Prev가 있을 경우 추가
      response.data.prevUrl !== '' ? sorted.unshift({ createAt: 100, key: 0, version: 0, url: response.data.prevUrl }) : undefined;
    }
    // 결과 반환
    return sorted;
  } catch (err) {
    console.error(`[API ERROR] ${err}`);
    return [];
  }
}
/**
 * [API Caller] 개인정보 처리방침 진행 상태
 * @param serviceId 서비스 ID
 * @returns 조회 결과
 */
export const getPIPPStatus = async (serviceId: string): Promise<string> => {
  try {
    // API 호출
    const response: ResponseDF = await sendRequest(`/pipp/${serviceId}`, 'GET');
    // 결과 처리 및 반환
    if (response && ('publish' in response.data)) {
      return response.data.publish ? 'publish' : 'progress';
    } else {
      return 'none';
    }
  } catch (err) {
    console.error(`[API ERROR] ${err}`);
    return '';
  }
}
/**
 * [API Caller] 개인정보 처리방침에 대한 데이터 저장하기
 * @param serviceId 현재 서비스 ID
 * @param userId 사용자 ID
 * @param data 임시 저장을 위한 데이터
 * @param status 데이터 저장 상태 (생성 완료일 경우, status = 'publish')
 * @param html 최종 문서 HTML 코드
 * @returns API로부터 응답받은 데이터
 */
export const setPIPPData = async (serviceId: string, userId: string, data: any, status: string, html?: string): Promise<any> => {
  try {
    // 경로 정의
    const path: string = status === 'create' ? `/pipp/new` : `/pipp/${serviceId}`;
    // 메서드 정의
    const method: string = status === 'create' ? 'POST' : 'PUT';
    // 초기 저장 여부에 따라 요청 데이터 생성
    const body: any = status === 'create' ? {
      serviceId,
      userId,
      data: data,
      publish: false
    } : {
      userId,
      data: data,
      publish: status === 'publish' ? true : false,
      html: status === 'publish' ? html : undefined
    };

    // API 호출
    const response: ResponseDF = await sendRequest(path, method, body);
    // 결과 
    return response;
  } catch (err) {
    console.error(`[API ERROR] ${err}`);
    return { result: false };
  }
}