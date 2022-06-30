// Module
import { extractData } from '../internal';
import moment from 'moment';
// Type
import { createRequest, RequestDF, ResponseDF, SERVER_URL } from '../type';

/**
 * [API Caller] 활동 내역 가져오기
 * @param type 활동 기준 [service | user]
 * @param id 식별 아이디 (service_id or user_id)
 * @returns 가공 데이터 반환
 */
export const getActivity = async (type: string, id: string): Promise<any[]> => {
  try {
    // 요청 객체 생성
    const request: RequestDF = await createRequest('GET');
    // 활동 내역 기준에 따라 API 호출 (서비스 or 사용자)
    const response: any = await fetch(`${SERVER_URL}activity/${type}/${id}`, request);
    // 응답 데이터 추출
    const result: ResponseDF = await extractData(response);
    // 데이터 반환
    return result.result ? result.data : [];
  } catch (err) {
    console.error('[API ERROR] ${err');
    return [];
  }
}
/**
 * [API Caller] 일주일 동안의 사용자 활동 내역 조회
 * @param id 사용자 ID
 * @returns 조회 결과
 */
export const getUserActivityForWeek = async (id: string): Promise<any[]> => {
  try {
    // 오늘 날짜
    const today = moment(moment().format('YYYY-MM-DD'));
    // 조회 시작 및 마지막 일에 대한 Unix 값 정의
    const start = today.add(-7, 'day').unix();
    // 요청 객체 생성
    const request: RequestDF = await createRequest('GET');
    // API 호출
    const response = await fetch(`${SERVER_URL}activity/user/${id}?start=${start}`, request);
    // 데이터 추출
    const result: ResponseDF = await extractData(response);
    // 데이터 반환
    return result.result ? result.data : [];
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
  // 요청 객체 생성
  const request: RequestDF = await createRequest('PUT', { text: data });
  // API 호출 및 데이터 반환
  await fetch(`${SERVER_URL}activity/${type}/${id}`, request);
}