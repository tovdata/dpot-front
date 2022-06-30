// Logging
import { writeActivityLog } from "utils/utils";
// Module
import { createRequest as createRequestObj } from "../type";
import { createRequest, extractData, processArrayResponse } from "../internal";
// Type
import { User } from "@/models/session";
import { RequestDF, SERVER_URL } from "../type";

/**
 * [API Caller] 가명정보 수집 및 이용에 대한 데이터 조회
 * @param serviceId 서비스 ID
 * @returns 조회 결과
 */
export const getFNIDatas = async (serviceId: string): Promise<any[]> => {
  try {
    // 요청 객체 생성
    const request: RequestDF = await createRequestObj('GET');
    // API 호출
    const response: Response = await fetch(`${SERVER_URL}service/${serviceId}/fnis`, request);
    // 응답 데이터 처리 및 반환
    return await processArrayResponse(response);
  } catch (err) {
    console.error(`[API ERROR] ${err}`);
    return [];
  }
}
/**
 * [API Caller] 개인정보 수집 및 이용에 대한 데이터 조회
 * @param serviceId 서비스 ID
 * @returns 조회 결과
 */
export const getPIDatas = async (serviceId: string): Promise<any[]> => {
  try {
    // 요청 객체 생성
    const request: RequestDF = await createRequestObj('GET');
    // API 호출
    const response: Response = await fetch(`${SERVER_URL}service/${serviceId}/pis`, request);
    // 응답 데이터 처리 및 반환
    return await processArrayResponse(response);
  } catch (err) {
    console.error(`[API ERROR] ${err}`);
    return [];
  }
}
/**
 * [API Caller] 테이블 유형에 따라 데이터 처리
 * @param user 사용자 정보
 * @param serviceId 현재 서비스 ID
 * @param type 테이블 유형 [ pi | fni | ppi | pfni | cpi | cfni | dpi ]
 * @param mode 처리 유형 [ add | delete | save ]
 * @param data 처리하고자는 데이터
 * @returns 결과 데이터
 */
export const setDataByTableType = async (user: User, serviceId: string, type: string, mode: string, data: any): Promise<any> => {
  // URL 및 Request 정의
  const url: string = mode === 'add' ? `${SERVER_URL}${type}/new` : `${SERVER_URL}${type}/${data.id}`;
  // 요청 객체 생성
  const request: RequestDF = createRequest(serviceId, mode, data);
  // API 요청
  const response: Response = await fetch(url, request);
  // 데이터 변환
  const result = await extractData(response, mode);
  // 에러 확인 및 로그 작성
  if (result) {
    // 서비스 로그
    writeActivityLog(mode, type, serviceId, user.userName);
    // 사용자 로그
    writeActivityLog(mode, type, user.id);
  }
  return result;
}