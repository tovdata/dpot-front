import { sendRequest } from '@/models/queries/core';
// Type
import type { ResponseDF } from '@/models/queries/type';

/**
 * [API Caller] 뉴스 목록 조회
 * @returns 조회 결과
 */
export const getNews = async (): Promise<any[]> => {
  try {
    // API 호출
    const response = await sendRequest('/article/all', 'GET');
    // 결과 반환
    return response.result && response.data ? response.data : [];
  } catch (err) {
    console.error(`[API ERROR] ${err}`);
    return [];
  }
}
/**
 * [API Caller] 뉴스 목록 조회
 * @returns 조회 결과
 */
export const getTemplates = async (): Promise<any[]> => {
  try {
    // API 호출
    const response = await sendRequest('/template/all', 'GET');
    // 결과 반환
    return response.result && response.data ? response.data.filter((item: any): boolean => item.category !== 'default').sort((a: any, b: any): number => b.createAt - a.createAt) : [];
  } catch (err) {
    console.error(`[API ERROR] ${err}`);
    return [];
  }
}