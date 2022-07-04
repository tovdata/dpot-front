import { extractData } from '../internal';
// Type
import { Company, createRequest, PLIPService, RequestDF, ResponseDF, SERVER_URL } from '../type';

/**
 * [API Caller] 회사 검색
 * @param name 검색할 이름
 * @returns 검색 결과
 */
export const findCompanies = async (name: string): Promise<Company[]> => {
  try {
    // 요청 객체 생성
    const request: RequestDF = await createRequest('GET');
    // API 호출
    const response = await fetch(`${SERVER_URL}company/find?name=${encodeURIComponent(name)}`, request);
    // 응답 결과 추출
    const result = await extractData(response);
    // 결과 반환
    return result.result ? result.data.list : [];
  } catch (err) {
    console.error(`[API ERROR] ${err}`);
    return [];
  }
}
/**
 * [API Caller] 사용자를 회사에 등록
 * @param companyId 회사 ID
 * @param userId 사용자 ID
 * @param accessLevel 등급
 * @returns 요청 결과
 */
export const registerUser = async (companyId: string, userId: string, accessLevel: number = 0): Promise<boolean> => {
  try {
    // 요청 객체 생성
    const request: RequestDF = await createRequest('PUT', { userId, accessLevel });
    // API 호출
    const response: any = await fetch(`${SERVER_URL}company/${companyId}/registration`, request);
    // 결과 반환
    return (await extractData(response, 'join')).result;
  } catch (err) {
    console.error(`[API ERROR] ${err}`);
    return false;
  }
}
/**
 * [API Caller] 회사 정보 조회
 * @param companyId 회사 ID
 * @returns 조회 결과
 */
export const getCompany = async (companyId: string): Promise<Company|undefined> => {
  try {
    // 요청 객체 생성
    const request: RequestDF = await createRequest('GET');
    // API 호출
    const response: any = await fetch(`${SERVER_URL}company/${companyId}`, request);
    // 데이터 추출
    const result = await extractData(response);
    // 결과 반환
    return result.result && result.data ? result.data : undefined;
  } catch (err) {
    console.error(`[API ERROR] ${err}`);
    return undefined;
  }
}
/**
 * [API Caller] 회사 생성/수정
 * @param data 회사 데이터
 * @param id 회사 ID
 * @returns 요청 결과
 */
export const setCompany = async (data: Company, id?: string): Promise<ResponseDF> => {
  try {
    // URL 정의
    const url: string = id ? `${SERVER_URL}company/${id}` : `${SERVER_URL}company/new`;
    // 데이터 복사
    const copy: Company = JSON.parse(JSON.stringify(data));
    // 파라미터 데이터 가공 (id 속성이 있을 경우 제거)
    if ('id' in copy) delete copy.id;
    // 요청 객체 생성
    const request: RequestDF = await createRequest(id ? 'PUT' : 'POST', copy);
    // API 호출
    const response: any = await fetch(url, request);
    // 데이터 추출 및 반환
    return await extractData(response);
  } catch (err) {
    console.error(`[API ERROR] ${err}`);
    return { result: false };
  }
}
/**
 * [API Caller] 서비스 생성
 * @param companyId 회사 ID
 * @param data 서비스 데이터
 * @returns 요청 결과
 */
export const createService = async (companyId: string, data: PLIPService): Promise<ResponseDF> => {
  try {
    // 요청 객체 생성
    const request: RequestDF = await createRequest('POST', { companyId, ...data });
    console.log(request)
    // API 호출
    const response: any = await fetch(`${SERVER_URL}service/new`, request);
    // 데이터 추출 및 반환
    return await extractData(response);
  } catch (err) {
    console.error(`[API ERROR] ${err}`);
    return { result: false };
  }
}
/**
 * [API Caller] 서비스 삭제
 * @param serviceId 서비스 ID
 * @returns 요청 결과
 */
export const deleteService = async (serviceId: string): Promise<boolean> => {
  try {
    // 요청 객체 생성
    const request: RequestDF = await createRequest('DELETE', {});
    // API 호출
    const response: any = await fetch(`${SERVER_URL}service/${serviceId}`, request);
    // 결과 반환
    return (await extractData(response, 'delete')).result;
  } catch (err) {
    console.error(`[API ERROR] ${err}`);
    return false;
  }
}
/**
 * [API Caller] 회사 내 서비스 목록 조회
 * @param companyId 회사 ID
 * @returns 조회 결과
 */
export const getServiceList = async (companyId: string): Promise<PLIPService[]> => {
  try {
    // 요청 객체 생성
    const request: RequestDF = await createRequest('GET');
    // API 요청
    const response: any = await fetch(`${SERVER_URL}company/${companyId}/details`, request);
    // 응답 데이터 추출
    const result: ResponseDF = await extractData(response);
    // 데이터 가공 및 반환
    if (result.result && result.data && result.data.services) {
      return result.data.services.map((elem: any): PLIPService => ({ id: elem.id, serviceName: elem.serviceName, types: elem.types, url: elem.url })); 
    } else {
      return [];
    }
  } catch (err) {
    console.error(`[API ERROR] ${err}`);
    return [];
  }
}
/**
 * [API Caller] 서비스 수정
 * @param companyId 회사 ID
 * @param serviceId 서비스 ID
 * @param data 서비스 데이터
 * @returns 요청 결과
 */
export const updateService = async (companyId: string, serviceId: string, data: PLIPService): Promise<ResponseDF> => {
  try {
    // 데이터 복사
    const copy: PLIPService = JSON.parse(JSON.stringify(data));
    // 파라미터 데이터 가공 (id 속성이 있을 경우 제거)
    if ('id' in copy) delete copy.id;
    // 회사 ID 추가
    copy.companyId = companyId;
    // 요청 객체 생성
    const request: RequestDF = await createRequest('PATCH', copy);
    // API 호출
    const response: any = await fetch(`${SERVER_URL}service/${serviceId}`, request);
    // 데이터 추출 및 반환
    return await extractData(response, 'update');
  } catch (err) {
    console.error(`[API ERROR] ${err}`);
    return { result: false };
  }
}
// /**
//  * [Internal API Caller] 서비스를 회사 등록 (서비스 생성 과정에서 자동 호출)
//  * @param companyId 회사 ID
//  * @param serviceId 서비스 ID
//  * @returns 요청 결과
//  */
// const registerService = async (companyId: string, serviceId: string): Promise<boolean> => {
//   try {
//     // 요청 객체 생성
//     const request: RequestDF = createRequest('PUT', { serviceId });
//     // API 호출
//     const response: any = await fetch(`${SERVER_URL}company/${companyId}/registration`, request);
//     // 결과 반환
//     return (await extractData(response, 'register')).result;
//   } catch (err) {
//     console.error(`[API ERROR] ${err}`);
//     return false;
//   }
// }