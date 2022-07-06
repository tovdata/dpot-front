import { createRequest, extractData } from '@/models/queries/internal';
// Type
import { RequestDF, ResponseDF, SERVER_URL } from '@/models/queries/type';

/**
 * [API Caller] 개인정보 처리방침 임시 저장 데이터 불러오기
 * @param token 액세스 토큰
 * @param serviceId 서비스 ID
 * @returns 조회 결과
 */
export const getPIPPData = async (token: string, serviceId: string): Promise<any> => {
  try {
      // 요청 객체 생성
    const request: RequestDF = createRequest('GET', token);
    // API 호출
    const response: Response = await fetch(`${SERVER_URL}pipp/${serviceId}`, request);
    // 응답 데이터 처리
    const result: any = await extractData(response);
    // 데이터 반환
    return result.result ? result.data ? result.data.data : undefined : undefined;
  } catch (err) {
    console.error(`[API ERROR] ${err}`);
    return undefined;
  }
}
/**
 * [API Caller] 개인정보 처리방침 목록
 * @param token 액세스 토큰
 * @param serviceId 서비스 ID
 * @returns 조회 결과
 */
export const getPIPPList = async (token: string, serviceId: string): Promise<any[]> => {
  try {
    // 요청 객체 생성
    const request: RequestDF = createRequest('GET', token);
    // API 호출
    const response: Response = await fetch(`${SERVER_URL}pipp/${serviceId}/publishedlist`, request);
    // 데이터 추출
    const result: ResponseDF = await extractData(response);
    // 결과 처리
    const sorted: any[] = [];
    if (result.result && result.data && ('list' in result.data)) {
      // 데이터 정렬
      sorted.push(...result.data.list.sort((a: any, b: any): number => a.applyAt - b.applyAt).map((item: any, index: number): any => ({ ...item, key: index + 1, version: index === result.data.list.length - 1 ? 9999 : index + 1 })));
      // Prev가 있을 경우 추가
      result.data.prevUrl !== '' ? sorted.unshift({ createAt: 100, key: 0, version: 0, url: result.data.prevUrl }) : undefined;
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
 * @param token 액세스 토큰
 * @param serviceId 서비스 ID
 * @returns 조회 결과
 */
export const getPIPPStatus = async (token: string, serviceId: string): Promise<string> => {
  try {
    // 요청 객체 생성
    const request: RequestDF = createRequest('GET', token);
    // API 호출
    const response: Response = await fetch(`${SERVER_URL}pipp/${serviceId}`, request);
    // 데이터 추출
    const result: ResponseDF = await extractData(response);
    // 결과 처리 및 반환
    if (result && ('publish' in result.data)) {
      return result.data.publish ? 'publish' : 'progress';
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
 * @param token 액세스 토큰
 * @param serviceId 현재 서비스 ID
 * @param data 임시 저장을 위한 데이터
 * @param status 데이터 저장 상태 (생성 완료일 경우, status = 'publish')
 * @param html 최종 문서 HTML 코드
 * @returns API로부터 응답받은 데이터
 */
export const setPIPPData = async (token: string, serviceId: string, data: any, status: string, html?: string): Promise<any> => {
  try {
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
    // 요청 객체 생성
    const request: RequestDF = createRequest(status === 'create' ? 'POST' : 'PUT', token, body);
    // 응답 데이터 반환
    const response: Response = await fetch(url, request);
    // 결과 
    return await extractData(response, 'set');
  } catch (err) {
    console.error(`[API ERROR] ${err}`);
    return { result: false };
  }
}