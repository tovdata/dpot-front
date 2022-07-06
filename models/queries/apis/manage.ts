// Logging
import { writeActivityLog } from "utils/utils";
// Module
import { createRequest, createRequestForManage, extractData, processArrayResponse } from "@/models/queries/internal";
// Type
// import { User } from "@/models/session_old";
import { ResponseDF, RequestDF, SERVER_URL } from '@/models/queries/type';
import { SERVICE_PI, SERVICE_FNI, SERVICE_PPI, SERVICE_PFNI, SERVICE_CPI, SERVICE_CFNI, SERVICE_DPI } from '@/models/queries/type';

/**
 * [API Caller] 가명정보 위탁에 대한 데이터 조회
 * @param token 액세스 토큰
 * @param serviceId 서비스 ID
 * @returns 조회 결과
 */
export const getCFNIDatas = async (token: string, serviceId: string): Promise<any[]> => {
  try {
    // 요청 객체 생성
    const request: RequestDF = createRequest('GET', token);
    // API 호출
    const response: Response = await fetch(`${SERVER_URL}service/${serviceId}/cfnis`, request);
    // 응답 데이터 처리 및 반환
    return await processArrayResponse(response);
  } catch (err) {
    console.error(`[API ERROR] (GET /cfnis) ${err}`);
    return [];
  }
}
/**
 * [API Caller] 개인정보 위탁에 대한 데이터 조회
 * @param token 액세스 토큰
 * @param serviceId 서비스 ID
 * @returns 조회 결과
 */
export const getCPIDatas = async (token: string, serviceId: string): Promise<any[]> => {
  try {
    // 요청 객체 생성
    const request: RequestDF = createRequest('GET', token);
    // API 호출
    const response: Response = await fetch(`${SERVER_URL}service/${serviceId}/cpis`, request);
    // 응답 데이터 처리 및 반환
    return await processArrayResponse(response);
  } catch (err) {
    console.error(`[API ERROR] (GET /cpis) ${err}`);
    return [];
  }
}
/**
 * [API Caller] 테이블 유형에 따른 데이터 불러오기
 * @param token 액세스 토큰
 * @param serviceId 현재 서비스 ID
 * @param type 테이블 유형 [ pi | fni | ppi | pfni | cpi | cfni | dpi ]
 * @returns 결과 데이터
 */
export const getDatasByTableType = async (token: string, serviceId: string, type: string): Promise<any[]> => {
  try {
    switch (type) {
      case SERVICE_PI:
        return await getPIDatas(token, serviceId);
      case SERVICE_FNI:
        return await getFNIDatas(token, serviceId);
      case SERVICE_PPI:
        return await getPPIDatas(token, serviceId);
      case SERVICE_PFNI:
        return await getPFNIDatas(token, serviceId);
      case SERVICE_CPI:
        return await getCPIDatas(token, serviceId);
      case SERVICE_CFNI:
        return await getCFNIDatas(token, serviceId);
      case SERVICE_DPI:
        return await getDPIDatas(token, serviceId);
      default:
        return [];
    }
  } catch (err) {
    console.error(`[API ERROR] ${err}`);
    return [];
  }
}
/**
 * [API Caller] 개인정보 파기에 대한 데이터 조회
 * @param token 액세스 토큰
 * @param serviceId 서비스 ID
 * @returns 조회 결과
 */
export const getDPIDatas = async (token: string, serviceId: string): Promise<any[]> => {
  try {
    // 요청 객체 생성
    const request: RequestDF = createRequest('GET', token);
    // API 호출
    const response: Response = await fetch(`${SERVER_URL}service/${serviceId}/dpis`, request);
    // 응답 데이터 처리 및 반환
    return await processArrayResponse(response);
  } catch (err) {
    console.error(`[API ERROR] (GET /dpis) ${err}`);
    return [];
  }
}
/**
 * [API Caller] 가명정보 수집 및 이용에 대한 데이터 조회
 * @param token 액세스 토큰
 * @param serviceId 서비스 ID
 * @returns 조회 결과
 */
export const getFNIDatas = async (token: string, serviceId: string): Promise<any[]> => {
  try {
    // 요청 객체 생성
    const request: RequestDF = createRequest('GET', token);
    // API 호출
    const response: Response = await fetch(`${SERVER_URL}service/${serviceId}/fnis`, request);
    // 응답 데이터 처리 및 반환
    return await processArrayResponse(response);
  } catch (err) {
    console.error(`[API ERROR] (GET /fnis) ${err}`);
    return [];
  }
}
/**
 * [API Caller] 가명정보 제3자 제공에 대한 데이터 조회
 * @param token 액세스 토큰
 * @param serviceId 서비스 ID
 * @returns 조회 결과
 */
export const getPFNIDatas = async (token: string, serviceId: string): Promise<any[]> => {
  try {
    // 요청 객체 생성
    const request: RequestDF = createRequest('GET', token);
    // API 호출
    const response: Response = await fetch(`${SERVER_URL}service/${serviceId}/pfnis`, request);
    // 응답 데이터 처리 및 반환
    return await processArrayResponse(response);
  } catch (err) {
    console.error(`[API ERROR] (GET /pfnis) ${err}`);
    return [];
  }
}
/**
 * [API Caller] 개인정보 수집 및 이용에 대한 데이터 조회
 * @param token 액세스 토큰
 * @param serviceId 서비스 ID
 * @returns 조회 결과
 */
export const getPIDatas = async (token: string, serviceId: string): Promise<any[]> => {
  try {
    // 요청 객체 생성
    const request: RequestDF = createRequest('GET', token);
    // API 호출
    const response: Response = await fetch(`${SERVER_URL}service/${serviceId}/pis`, request);
    // 응답 데이터 처리 및 반환
    return await processArrayResponse(response);
  } catch (err) {
    console.error(`[API ERROR] (GET /pis) ${err}`);
    return [];
  }
}
/**
 * [API Caller] 개인정보 수집 및 이용 내 필수/선택 항목 데이터 조회
 * @param token 액세스 토큰
 * @param serviceId 서비스 ID
 * @returns 조회 결과
 */
export const getPIItems = async (token: string, serviceId: string): Promise<any[]> => {
  try {
    // 요청 객체 생성
    const request: RequestDF = createRequest('GET', token);
    // API 호출
    const response: Response = await fetch(`${SERVER_URL}service/${serviceId}/pi/allitems`, request);
    // 응답 데이터 추출
    const result = await extractData(response); 
    // 결과 반환
    return result.result ? result.data.allItems ? result.data.allItems.sort() : [] : [];
  } catch (err) {
    console.error(`[API ERROR] (GET /pi/allitems) ${err}`);
    return [];
  }
}
/**
 * [API Caller] 개인정보 수집 및 이용 내 필수/선택 항목 데이터 조회
 * @param token 액세스 토큰
 * @param serviceId 서비스 ID
 * @returns 조회 결과
 */
export const getPIItemsByType = async (token: string, serviceId: string): Promise<any[]> => {
  try {
    // 요청 객체 생성
    const request: RequestDF = createRequest('GET', token);
    // API 호출
    const response: Response = await fetch(`${SERVER_URL}service/${serviceId}/pi/allitems`, request);
    // 응답 데이터 추출
    const result = await extractData(response); 
    // 결과 반환
    return result.result ? result.data : { allItems: [], essentialItemsOnly: [], selectionItemsOnly: [] };
  } catch (err) {
    console.error(`[API ERROR] (GET /pi/allitems) ${err}`);
    return [];
  }
}
/**
 * [API Caller] 개인정보 제3자 제공에 대한 데이터 조회
 * @param token 액세스 토큰
 * @param serviceId 서비스 ID
 * @returns 조회 결과
 */
export const getPPIDatas = async (token: string, serviceId: string): Promise<any[]> => {
  try {
    // 요청 객체 생성
    const request: RequestDF = createRequest('GET', token);
    // API 호출
    const response: Response = await fetch(`${SERVER_URL}service/${serviceId}/ppis`, request);
    // 응답 데이터 처리 및 반환
    return await processArrayResponse(response);
  } catch (err) {
    console.error(`[API ERROR] (GET /ppis) ${err}`);
    return [];
  }
}

/**
 * [API Caller] 테이블 유형에 따라 데이터 처리
 * @param token 액세스 토큰
 * @param user 사용자 정보
 * @param serviceId 현재 서비스 ID
 * @param type 테이블 유형 [ pi | fni | ppi | pfni | cpi | cfni | dpi ]
 * @param mode 처리 유형 [ add | delete | save ]
 * @param data 처리하고자는 데이터
 * @returns 결과 데이터
 */
export const setDataByTableType = async (token: string, user: any, serviceId: string, type: string, mode: string, data: any): Promise<any> => {
  // URL 및 Request 정의
  const url: string = mode === 'add' ? `${SERVER_URL}${type}/new` : `${SERVER_URL}${type}/${data.id}`;
  // 요청 객체 생성
  const request: RequestDF = await createRequestForManage(serviceId, user.id, mode, token, data);
  console.log(request);
  // API 요청
  const response: Response = await fetch(url, request);
  // 데이터 변환
  const result: ResponseDF = await extractData(response, mode);
  // 에러 확인 및 로그 작성
  if (result) {
    // 서비스 로그
    writeActivityLog(token, mode, type, serviceId, user.userName);
    // 사용자 로그
    writeActivityLog(token, mode, type, user.id);
  }
  return result;
}