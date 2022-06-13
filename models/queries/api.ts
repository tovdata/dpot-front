// Data
import { SERVER_URL, RequestDF, SERVICE_PI, SERVICE_FNI, SERVICE_PPI, SERVICE_PFNI, SERVICE_CPI, SERVICE_CFNI, SERVICE_DPI, ResponseDF } from './type';
// Module
import { createRequest, extractData, processArrayResponse, processResponse } from './internal';

/**
 * [API Caller] 개인정보 수집 및 이용에 대한 데이터 불러오기
 * @param serviceId 현재 서비스 ID
 * @returns 결과 데이터
 */
export const getPIDatas = async (serviceId: string): Promise<any[]> => {
  // API 호출
  const response: Response = await fetch(`${SERVER_URL}service/${serviceId}/pis`);
  // 응답 데이터 처리 및 반환
  return await processArrayResponse(response);
}
/**
 * [API Caller] 가명정보 수집 및 이용에 대한 데이터 불러오기
 * @param serviceId 현재 서비스 ID
 * @returns 결과 데이터
 */
export const getFNIDatas = async (serviceId: string): Promise<any[]> => {
  // API 호출
  const response: Response = await fetch(`${SERVER_URL}service/${serviceId}/fnis`);
  // 응답 데이터 처리 및 반환
  return await processArrayResponse(response);
}
/**
 * [API Caller] 개인정보 제3자 제공에 대한 데이터 불러오기
 * @param serviceId 현재 서비스 ID
 * @returns 결과 데이터
 */
export const getPPIDatas = async (serviceId: string): Promise<any[]> => {
  // API 호출
  const response: Response = await fetch(`${SERVER_URL}service/${serviceId}/ppis`);
  // 응답 데이터 처리 및 반환
  return await processArrayResponse(response);
}
/**
 * [API Caller] 가명정보 제3자 제공에 대한 데이터 불러오기
 * @param serviceId 현재 서비스 ID
 * @returns 결과 데이터
 */
export const getPFNIDatas = async (serviceId: string): Promise<any[]> => {
  // API 호출
  const response: Response = await fetch(`${SERVER_URL}service/${serviceId}/pfnis`);
  // 응답 데이터 처리 및 반환
  return await processArrayResponse(response);
}
/**
 * [API Caller] 개인정보 위탁에 대한 데이터 불러오기
 * @param serviceId 현재 서비스 ID
 * @returns 결과 데이터
 */
export const getCPIDatas = async (serviceId: string): Promise<any[]> => {
  // API 호출
  const response: Response = await fetch(`${SERVER_URL}service/${serviceId}/cpis`);
  // 응답 데이터 처리 및 반환
  return await processArrayResponse(response);
}
/**
 * [API Caller] 가명정보 위탁에 대한 데이터 불러오기
 * @param serviceId 현재 서비스 ID
 * @returns 결과 데이터
 */
export const getCFNIDatas = async (serviceId: string): Promise<any[]> => {
  // API 호출
  const response: Response = await fetch(`${SERVER_URL}service/${serviceId}/cfnis`);
  // 응답 데이터 처리 및 반환
  return await processArrayResponse(response);
}
/**
 * [API Caller] 개인정보 파기에 대한 데이터 불러오기
 * @param serviceId 현재 서비스 ID
 * @returns 결과 데이터
 */
export const getDPIDatas = async (serviceId: string): Promise<any[]> => {
  // API 호출
  const response: Response = await fetch(`${SERVER_URL}service/${serviceId}/dpis`);
  // 응답 데이터 처리 및 반환
  return await processArrayResponse(response);
}
/**
 * [API Caller] 개인정보 수집 및 이용 내 필수/선택 항목 데이터 불러오기
 * @param serviceId 현재 서비스 ID
 * @returns 결과 데이터
 */
export const getPIItems = async (serviceId: string): Promise<any[]> => {
  // API 호출
  const response: Response = await fetch(`${SERVER_URL}service/${serviceId}/pi/allitems`);
  // 응답 데이터 추출
  const result = await extractData(response);
  // 결과 반환
  return result.result ? result.data.sort() : [];
}
/**
 * [API Caller] 테이블 유형에 따른 데이터 불러오기
 * @param serviceId 현재 서비스 ID
 * @param type 테이블 유형 [ pi | fni | ppi | pfni | cpi | cfni | dpi ]
 * @returns 결과 데이터
 */
export const getDatasByTableType = async (serviceId: string, type: string): Promise<any[]> => {
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
}
/**
 * [API Caller] 테이블 유형에 따라 데이터 처리
 * @param serviceId 현재 서비스 ID
 * @param type 테이블 유형 [ pi | fni | ppi | pfni | cpi | cfni | dpi ]
 * @param mode 처리 유형 [ add | delete | save ]
 * @param data 처리하고자는 데이터
 * @returns 결과 데이터
 */
export const setDataByTableType = async (serviceId: string, type: string, mode: string, data: any): Promise<any> => {
  // URL 및 Request 정의
  const url: string = mode === 'add' ? `${SERVER_URL}${type}/new` : `${SERVER_URL}${type}/${data.id}`;
  const request: RequestDF = createRequest(serviceId, mode, data);
  // API 요청
  const response: Response = await fetch(url, request);
  // 에러 처리
  return await processResponse(response, mode);
}
/**
 * [API Caller] 개인정보 처리방침을 생성하기 위한 데이터 불러오기
 * @param serviceId 현재 서비스 ID
 * @returns 결과 데이터
 */
export const getPIPPData = async (serviceId: string): Promise<any> => {
  // API 호출
  const response: Response = await fetch(`${SERVER_URL}pipp/${serviceId}`);
  // 응답 데이터 처리
  const result: any = await processResponse(response);
  // 데이터 반환
  return result ? result.data : undefined;
}
/**
 * [API Caller] 개인정보 처리방침에 대한 진행 상태 불러오기
 * @param serviceId 현재 서비스 ID
 * @returns 결과 데이터
 */
export const getPIPPStatus = async (serviceId: string): Promise<string> => {
  // API 호출
  const response: Response = await fetch(`${SERVER_URL}pipp/${serviceId}`);
  // 응답 데이터 추출
  const result: ResponseDF = await extractData(response);
  // 결과 데이터 처리 및 반환
  if (result && ('publish' in result.data)) {
    return result.data.publish ? 'publish' : 'progress';
  } else {
    return 'none';
  }
}
export const getPIPPList = async (serviceId: string): Promise<any[]> => {
  // API 호출
  const response: Response = await fetch(`${SERVER_URL}pipp/${serviceId}/publishedlist`);
  // 응답 데이터 추출
  const result: ResponseDF = await extractData(response);
  // 데이터 가공
  const sorted: any[] = [];
  if (result.result) {
    // 데이터 정렬
    sorted.push(...result.data.list.sort((a: any, b: any): number => a.applyAt - b.applyAt).map((item: any, index: number): any => ({ ...item, key: index + 1, version: index === result.data.list.length - 1 ? 9999 : index + 1 })));
    // Prev가 있을 경우 추가
    result.data.prevUrl !== '' ? sorted.unshift({ createAt: 100, key: 0, version: 0, url: result.data.prevUrl }) : undefined;
  }
  // 데이터 가공 및 반환
  return sorted;
}
/**
 * [API Caller] 개인정보 처리방침에 대한 데이터 저장하기
 * @param serviceId 현재 서비스 ID
 * @param data 임시 저장을 위한 데이터
 * @param status 데이터 저장 상태 (생성 완료일 경우, status = 'publish')
 * @param html 최종 문서 HTML 코드
 * @returns API로부터 응답받은 데이터
 */
export const setPIPPData = async (serviceId: string, data: any, status: string, html?: string): Promise<any> => {
  // 초기 저장인지 아닌지를 확인하여 API 호출을 위한 URL 정의
  const url: string = status === 'create' ? `${SERVER_URL}pipp/new` : `${SERVER_URL}pipp/${serviceId}`;
  // 초기 저장 여부에 따라 요청 데이터 생성
  const body: any = status === 'create' ? {
    serviceId: serviceId,
    data: data,
    publish: false
  } : {
    data: data,
    publish: status === 'publish' ? true : false,
    html: status === 'publish' ? html : undefined
  };
  // API 호출에 필요한 Request 생성
  const request: RequestDF = {
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    },
    method: status === 'create' ? 'POST' : 'PUT'
  };
  // 응답 데이터 반환
  return await fetch(url, request);
}