// API
import { sendRequest } from '@/models/queries/core';
// Type
import type { ResponseDF } from '@/models/queries/type';
// Util
import moment from 'moment';

/**
 * [API Caller] 활동 내역 가져오기
 * @param type 활동 기준 [service | user]
 * @param id 식별 아이디 (service_id or user_id)
 * @returns 가공 데이터 반환
 */
export const getActivity = async (type: string, id: string): Promise<any[]> => {
  try {
    // API 호출
    const response: ResponseDF = await sendRequest(`/activity/${type}/${id}`, 'GET');
    // 결과 반환
    return response.result ? response.data : [];
  } catch (err) {
    console.error('[API ERROR] ${err');
    return [];
  }
}
/**
 * [API Caller] 일주일 동안의 사용자 활동 내역 조회
 * @param userId 사용자 ID
 * @returns 조회 결과
 */
export const getUserActivityForWeek = async (userId: string): Promise<any[]> => {
  try {
    // 오늘 날짜
    const today = moment(moment().format('YYYY-MM-DD'));
    // 조회 시작 및 마지막 일에 대한 Unix 값 정의
    const start = today.add(-7, 'day').unix();
    // API 호출
    const response: ResponseDF = await sendRequest(`/activity/user/${userId}?start=${start}`, 'GET');
    // 결과 반환
    return response.result ? response.data : [];
  } catch (err) {
    console.error(`[API ERROR] ${err}`);
    return [];
  } 
}
/**
 * [API Caller] 활동 내역 저장
 * @param type 활동 기준 [service | user]
 * @param id 식별 아이디 (service_id or user_id)
 * @param data 활동 내역
 * @returns API로부터 응답받은 데이터
 */
export const setActivity = async (type: string, id: string, data: any): Promise<void> => {
  try {
    // API 호출
    await sendRequest(`/activity/${type}/${id}`, 'PUT', { text: data });
  } catch (err) {
    console.error(`[API ERROR] ${err}`);
  }
}