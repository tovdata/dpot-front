// API
import { sendRequest } from '@/models/queries/core';
// Type
import type { ResponseDF } from '@/models/queries/type';
import { SERVICE_PI, SERVICE_FNI, SERVICE_PPI, SERVICE_PFNI, SERVICE_CPI, SERVICE_CFNI, SERVICE_DPI } from '@/models/queries/type';
// Util
import { writeActivityLog } from 'utils/utils';


/**
 * [API Caller] 가명정보 위탁에 대한 데이터 조회
 * @param serviceId 서비스 ID
 * @returns 조회 결과
 */
export const getCFNIDatas = async (serviceId: string): Promise<any[]> => {
  try {
    // API 호출
    const response: ResponseDF = await sendRequest(`/service/${serviceId}/cfnis`, 'GET');
    // 결과 반환
    return response.result && response.data ? extract(response.data) : []; 
  } catch (err) {
    console.error(`[API ERROR] (GET /cfnis) ${err}`);
    return [];
  }
}
/**
 * [API Caller] 개인정보 위탁에 대한 데이터 조회
 * @param serviceId 서비스 ID
 * @returns 조회 결과
 */
export const getCPIDatas = async (serviceId: string): Promise<any[]> => {
  try {
    // API 호출
    const response: ResponseDF = await sendRequest(`/service/${serviceId}/cpis`, 'GET');
    // 결과 반환
    return response.result && response.data ? extract(response.data) : []; 
  } catch (err) {
    console.error(`[API ERROR] (GET /cpis) ${err}`);
    return [];
  }
}
/**
 * [API Caller] 테이블 유형에 따른 데이터 불러오기
 * @param serviceId 현재 서비스 ID
 * @param type 테이블 유형 [ pi | fni | ppi | pfni | cpi | cfni | dpi ]
 * @returns 결과 데이터
 */
export const getDatasByTableType = async (serviceId: string, type: string): Promise<any[]> => {
  try {
    switch (type) {
      case SERVICE_PI:
        return await getPIDatas(serviceId);
      case SERVICE_FNI:
        return await getFNIDatas(serviceId);
      case SERVICE_PPI:
        return await getPPIDatas(serviceId);
      case SERVICE_PFNI:
        return await getPFNIDatas(serviceId);
      case SERVICE_CPI:
        return await getCPIDatas(serviceId);
      case SERVICE_CFNI:
        return await getCFNIDatas(serviceId);
      case SERVICE_DPI:
        return await getDPIDatas(serviceId);
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
 * @param serviceId 서비스 ID
 * @returns 조회 결과
 */
export const getDPIDatas = async (serviceId: string): Promise<any[]> => {
  try {
    // API 호출
    const response: ResponseDF = await sendRequest(`/service/${serviceId}/dpis`, 'GET');
    // 결과 반환
    return response.result && response.data ? extract(response.data) : []; 
  } catch (err) {
    console.error(`[API ERROR] (GET /dpis) ${err}`);
    return [];
  }
}
/**
 * [API Caller] 가명정보 수집 및 이용에 대한 데이터 조회
 * @param serviceId 서비스 ID
 * @returns 조회 결과
 */
export const getFNIDatas = async (serviceId: string): Promise<any[]> => {
  try {
    // API 호출
    const response: ResponseDF = await sendRequest(`/service/${serviceId}/fnis`, 'GET');
    // 결과 반환
    return response.result && response.data ? extract(response.data) : [];
  } catch (err) {
    console.error(`[API ERROR] (GET /fnis) ${err}`);
    return [];
  }
}
/**
 * [API Caller] 가명정보 제3자 제공에 대한 데이터 조회
 * @param serviceId 서비스 ID
 * @returns 조회 결과
 */
export const getPFNIDatas = async (serviceId: string): Promise<any[]> => {
  try {
    // API 호출
    const response: ResponseDF = await sendRequest(`/service/${serviceId}/pfnis`, 'GET');
    // 결과 반환
    return response.result && response.data ? extract(response.data) : []; 
  } catch (err) {
    console.error(`[API ERROR] (GET /pfnis) ${err}`);
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
    // API 호출
    const response: ResponseDF = await sendRequest(`/service/${serviceId}/pis`, 'GET');
    // 결과 반환
    return response.result && response.data ? extract(response.data) : []; 
  } catch (err) {
    console.error(`[API ERROR] (GET /pis) ${err}`);
    return [];
  }
}
/**
 * [API Caller] 개인정보 수집 및 이용 내 필수/선택 항목 데이터 조회
 * @param serviceId 서비스 ID
 * @returns 조회 결과
 */
export const getPIItems = async (serviceId: string): Promise<any[]> => {
  try {
    // API 호출
    const response: ResponseDF = await sendRequest(`/service/${serviceId}/cfni`, 'GET');
    // 결과 반환
    return response.result && response.data && response.data.allItems ? response.data.allItems.sort() : [];
  } catch (err) {
    console.error(`[API ERROR] (GET /pi/allitems) ${err}`);
    return [];
  }
}
/**
 * [API Caller] 개인정보 수집 및 이용 내 필수/선택 항목 데이터 조회
 * @param serviceId 서비스 ID
 * @returns 조회 결과
 */
export const getPIItemsByType = async (serviceId: string): Promise<any[]> => {
  try {
    // API 호출
    const response: ResponseDF = await sendRequest(`/service/${serviceId}/pi/allitems`, 'GET');
    // 결과 반환
    return response.result && response.data ? response.data : { allItems: [], essentialItemsOnly: [], selectionItemsOnly: [] };
  } catch (err) {
    console.error(`[API ERROR] (GET /pi/allitems) ${err}`);
    return [];
  }
}
/**
 * [API Caller] 개인정보 제3자 제공에 대한 데이터 조회
 * @param serviceId 서비스 ID
 * @returns 조회 결과
 */
export const getPPIDatas = async (serviceId: string): Promise<any[]> => {
  try {
    // API 호출
    const response: ResponseDF = await sendRequest(`/service/${serviceId}/ppis`, 'GET');
    // 결과 반환
    return response.result && response.data ? extract(response.data) : []; 
  } catch (err) {
    console.error(`[API ERROR] (GET /ppis) ${err}`);
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
export const setDataByTableType = async (user: any, serviceId: string, type: string, mode: string, data: any): Promise<any> => {
  try {
    // 경로 정의
    const path: string = mode === 'add' ? `/${type}/new` : `/${type}/${data.id}`;
    // API 호출
    const response: ResponseDF = await sendRequest(path, requestMethod(mode), requestBody(serviceId, user.id, mode, data));
    // 에러 확인 및 로그 작성
    if (response.result) {
      // 서비스 로그
      writeActivityLog(mode, type, serviceId, user.userName);
      // 사용자 로그
      writeActivityLog(mode, type, user.id);
    }
    return response;
  } catch (err) {
    console.error(`[API ERROR] ${err}`);
    return { result: false };
  }
}

/**
 * [Internal Function] 요청 데이터
 * @param serviceId 서비스 ID
 * @param userId 사용자 ID
 * @param mode 요청 모드
 * @param data 데이터
 * @returns 처리 결과
 */
const requestBody = (serviceId: string, userId: string, mode: string, data: any): any => {
  // 데이터 복사 (깊은 복사)
  const copy: any = JSON.parse(JSON.stringify(data));
  // Timestamp 추출
  const createAt: number|undefined = data.createAt;
  // id, key, unix 속성 삭제
  delete copy.id;
  delete copy.key;
  delete copy.createAt;
  // 기본 데이터 형식
  const basis: any = { serviceId, userId };
  // 요청 메서드 및 Body 정의
  switch (mode) {
    case 'add':
      return { ...basis, data: copy };
    case 'delete':
      return { ...basis };
    case 'save':
      return { ...basis, createAt: Number(createAt), data: copy };
  }
  return { ...basis };
}
/**
 * [Internal Funcion] 요청 메서드
 * @param mode 요청 모드
 * @returns HTTP 메서드
 */
const requestMethod = (mode: string): string => {
  switch (mode) {
    case 'add':
      return 'POST';
    case 'delete':
      return 'DELETE';
    case 'save':
      return 'PUT';
  }
  return 'GET';
}

const extract = (data: any): any[] => {
  try {
    return data.map((item: any): any => ({
      createAt: item.createAt,
      id: item.id,
      key: item.id,
      ...item.data
    })).sort((a: any, b: any): number => a.createAt - b.createAt);
  } catch (err) {
    return [];
  }
}