// Type
import { getAccessToken } from "../session_old";
import { RESPONSE_STATUS_ERROR, RESPONSE_STATUS_NOT_AUTHORIZED, RESPONSE_STATUS_NOT_FOUND, RESPONSE_STATUS_REQUEST_ERROR, RESPONSE_STATUS_UNKNOWN_ERROR, SERVER_URL } from "./type";
import { RequestDF, ResponseDF } from "./type";
import { BooleanDF, MapDF, ListDF, NumberDF, StringDF } from './type';

/**
 * 응답 데이터 처리 및 반환 (Object)
 * @param response 응답 데이터
 * @returns 결과 데이터
 */
export const processResponse = async (response: Response, mode?: string): Promise<any> => {
  const result: ResponseDF = await extractData(response, mode);
  // Mode 가 add일 경우, id 추출
  if (mode === 'add') {
    return result.result ? ('id' in result.data) ? result.data : undefined : undefined;
  } else {
    return result.result ? result.data : undefined;
  }
}
/**
 * 응답 데이터 처리 및 반환 (Array)
 * @param response 응답 데이터
 * @returns 결과 데이터
 */
export const processArrayResponse = async (response: Response): Promise<any[]> => {
  const result: ResponseDF = await transformData(response);
  // 데이터 정렬
  if (result.data.length > 0 && 'createAt' in result.data[0]) {
    result.data.sort((a: any, b: any): number => a.createAt - b.createAt);
  }
  // 데이터 반환
  return result.result ? result.data.map((elem: any): any => ({ ...elem, key: elem.id })) : [];
}
/**
 * 요청 객체 생성
 * @param method HTTP 메서드
 * @param token 액세스 토큰
 * @param data 데이터
 * @returns 요청 객체
 */
export const createRequest = (method: string, token?: string, data?: any): RequestDF => {
  return {
    body: data ? JSON.stringify(data) : undefined,
    credentials: 'include',
    headers: {
      'Authorization': token ? token : undefined,
      'Content-Type': 'application/json'
    },
    method: method
  };
}
/**
 * 요청을 위한 Request 객체 정의
 * @param serviceId 서비스 ID
 * @param userId 사용자 ID
 * @param mode 요청을 위한 유형 [ add | delete | save ]
 * @param data 요청에 필요한 데이터
 * @returns 정의된 Request 객체
 */
 export const createRequestForManage = async (serviceId: string, userId: string, mode: string, token: string, data: any): Promise<RequestDF> => {
  // 데이터 복사 (깊은 복사)
  const copy: any = JSON.parse(JSON.stringify(data));
  // Timestamp 추출
  const createAt: number|undefined = data.createAt;
  // id, key, unix 속성 삭제
  delete copy.id;
  delete copy.key;
  delete copy.createAt;
  // Request 정의
  const request: RequestDF = {
    body: '',
    headers: {
      'Authorization': token ? token : undefined,
      'Content-Type': 'application/json'
    },
    method: ''
  };
  // 요청 메서드 및 Body 정의
  switch (mode) {
    case 'add':
      request.body = JSON.stringify({ serviceId, userId, data: copy });
      request.method = 'POST';
      break;
    case 'delete':
      request.body = JSON.stringify({ serviceId, userId });
      request.method = 'DELETE';
      break;
    case 'save':
      request.body = JSON.stringify({ serviceId, userId, createAt: Number(createAt), data: copy });
      request.method = 'PUT';
      break;
  }
  // 정의된 Request 반환
  return request;
}
/**
 * 응답에서 요청에 대한 데이터 추출
 * @param response 응답 데이터
 * @returns 추출된 데이터 결과
 */
export const extractData = async (response: Response, mode?: string): Promise<ResponseDF> => {
  // 응답 데이터를 JSON 형태로 변환
  const json: any = await response.json();
  // 에러 확인
  if (catchAPIRequestError(json)) {
    if (json.message && json.message.includes('UserNotConfirmedException')) {
      return { result: false, data: { noConfirm: true } };
    } else {
      return { result: false };
    }
  }
  // 결과 반환
  if (mode === undefined || mode === 'add') {
    return !('data' in json) ? { result: false } : { result: true, data: json.data };
  } else {
    return { result: true, data: json.data };
  }
}
/**
 * 응답 데이터 가공 (JSON)
 * @param response 응답 데이터
 * @returns 응답 결과
 */
const transformData = async (response: Response): Promise<ResponseDF> => {
  // 응답 데이터 추출
  const result: ResponseDF = await extractData(response);
  // 데이터 가공
  const transformed: any[] = [];
  for (const item of result.data) {
    // 데이터에 ID 값이 없는 경우, 데이터를 추출하지 않음
    if (!('id' in item)) continue;
    // ID 값 추출
    const id: string = (item.id as StringDF).S;
    // 생성일 추출
    const createAt: number|undefined = ('createAt' in item) ? (item.createAt as NumberDF).N : undefined;
    // Data 속성이 없는 경우, 데이터를 추출하지 않음
    const data: any = ('data' in item) ? {} : undefined;
    // 행(Row)에 대한 데이터 추출
    for (const key of Object.keys((item.data as MapDF).M)) {
      // 키 값에 대한 데이터 추출 (JSON)
      const temp: any = item.data.M[key];
      // 형식에 따라 알맞은 데이터 추출
      if ('L' in temp) {
        data[key] = ((temp as ListDF).L).map((elem: StringDF): string => elem.S);
      } else if ('S' in temp) {
        data[key] = (temp as StringDF).S;
      } else if ('BOOL' in temp) {
        data[key] = (temp as BooleanDF).BOOL;
      }
    }
    // 추출된 데이터 저장
    transformed.push({ id, createAt, ...data });
  }
  // 결과 반환
  return { result: result.result, data: transformed };
}
/**
 * 응답에 대한 에러 확인 함수
 * @param response 응답 데이터
 * @returns 에러 결과
 */
export const catchAPIRequestError = (response: any): boolean => {
  // 상태 확인
  if ('status' in response) {
    // 상태별 구문 정의
    let stmt: string|undefined = undefined;
    switch (response.status) {
      case RESPONSE_STATUS_ERROR:
        stmt = 'Internal server error'
        break;
      case RESPONSE_STATUS_REQUEST_ERROR:
        stmt = 'Request error';
        break;
      case RESPONSE_STATUS_UNKNOWN_ERROR:
        stmt = 'Unknown error';
        break;
      case RESPONSE_STATUS_NOT_FOUND:
        stmt = 'Not found';
      case RESPONSE_STATUS_NOT_AUTHORIZED:
        stmt = 'Not authorized';
        break;
    }
    // 에러 메시지 출력 및 결과 반환
    if (stmt) {
      console.error('[Query Error]', stmt, ':', response.message ? response.message : '');
      return true;
    } else {
      return false;
    }
  } else {
    console.error('[QUERY ERROR] Failed to transform a response data');
    return true;
  }
}