// Data
import { SERVER_URL, RequestDF, SERVICE_PI, SERVICE_FNI, SERVICE_PPI, SERVICE_PFNI, SERVICE_CPI, SERVICE_CFNI, SERVICE_DPI, ResponseDF, RESPONSE_STATUS_OK } from './type';
// Module
import { catchAPIRequestError, createRequest, extractData, processArrayResponse, processResponse } from './internal';
import { writeActivityLog } from 'utils/utils';
import { User } from '../session';

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
  return result.result ? result.data.allItems.sort() : [];
}
/**
 * [API Caller] 개인정보 수집 및 이용 내 필수/선택 항목 데이터 불러오기
 * @param serviceId 현재 서비스 ID
 * @returns 결과 데이터
 */
export const getPIItemsByType = async (serviceId: string): Promise<any[]> => {
  // API 호출
  const response: Response = await fetch(`${SERVER_URL}service/${serviceId}/pi/allitems`);
  // 응답 데이터 추출
  const result = await extractData(response);  
  // 결과 반환
  return result.result ? result.data : { allItems: [], essentialItemsOnly: [], selectionItemsOnly: [] };
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
  const request: RequestDF = createRequest(serviceId, mode, data);
  // API 요청
  const response: Response = await fetch(url, request);
  // 데이터 변환
  const result = await processResponse(response, mode);
  // 에러 확인 및 로그 작성
  if (result) {
    // 서비스 로그
    writeActivityLog(mode, type, serviceId, user.name);
    // 사용자 로그
    writeActivityLog(mode, type, user.id);
  }
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
/**
 * [API Caller] 활동 내역 저장
 * @param type 활동 기준 [service | user]
 * @param id 식별 아이디 (service_id or user_id)
 * @param data 활동 내역
 * @returns API로부터 응답받은 데이터
 */
export const setActivity = async (type: string, id: string, data: any): Promise<void> => {
  // 활동 내용 기준에 따라 URL 정의 (서비스 or 사용자)
  const url: string = `${SERVER_URL}activity/${type}/${id}`;
  // API 호출에 필요한 Request 생성
  const request: RequestDF = {
    body: JSON.stringify({ text: data }),
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'PUT'
  };
  // API 호출 및 데이터 반환
  await fetch(url, request);
}
/**
 * [API Caller] 활동 내역 가져오기
 * @param type 활동 기준 [service | user]
 * @param id 식별 아이디 (service_id or user_id)
 * @returns 가공 데이터 반환
 */
export const getActivity = async (type: string, id: string): Promise<any> => {
  // 활동 내역 기준에 따라 API 호출 (서비스 or 사용자)
  const response: any = await fetch(`${SERVER_URL}activity/${type}/${id}`);
  // 응답 데이터 추출
  const result: ResponseDF = await extractData(response);
  // 데이터 반환
  return result.result ? result.data : [];
}
/**
 * [API Caller] 회원가입 (사용자 데이터 저장)
 * @param id AWS Cognito로부터 부여받은 id
 * @param data 사용자 정보
 */
export const addUser = async (id: string, companyId: string, data: any): Promise<ResponseDF> => {
  // API 호출에 필요한 Request 생성
  const request: RequestDF = {
    body: JSON.stringify({
      companyId: companyId,
      email: data.email,
      name: data.name,
      contact: data.tel,
      agree: {
        service: data.esa1,
        pi: data.esa2,
        marketing: data.ssa1
      }
    }),
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST'
  };
  // API 호출
  const response = await fetch(`${SERVER_URL}user/new/${id}`, request);
  // 응답 데이터 추출 및 반환
  return await extractData(response);
}
/**
 * [API Caller] 사용자 조회
 * @param id 사용자 ID
 * @returns 조회 결과
 */
export const getUser = async (id: string): Promise<any> => {
  const response = await fetch(`${SERVER_URL}user/${id}`);
  // 응답 데이터 추출 및 반환
  return await processResponse(response);
}
/**
 * [API Caller] 사용자 정보 갱신
 * @param data 사용자 정보
 * @returns 결과 데이터
 */
export const updateUser = async (data: any): Promise<boolean> => {
  // API 호출에 필요한 Request 생성
  const request: RequestDF = {
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'PUT'
  };
  // API 호출
  const response = await fetch(`${SERVER_URL}user/${data.id}`, request);
  // 결과 반환
  return !catchAPIRequestError(await response.json());
}
/**
 * [API Caller] 회사 검색
 * @param name 검색할 값
 * @returns 검색 결과
 */
export const findCompany = async (name: string): Promise<any[]> => {
  const response = await fetch(`${SERVER_URL}company/find?name=${encodeURIComponent(name)}`);
  // 응답 데이터 추출
  const result = await extractData(response);
  // 데이터 반환
  return result.result ? result.data.list : [];
}
/**
 * [API Caller] 회사 생성/수정
 * @param data 회사 정보 데이터
 * @param id 회사 ID
 * @returns 응답 결과
 */
export const setCompany = async (data: any, id?: string): Promise<ResponseDF> => {
  // API 호출을 위한 URL 정의
  const url: string = id ? `${SERVER_URL}/${id}` : `${SERVER_URL}company/new`;
  // API 호출에 필요한 Request 생성
  const request: RequestDF = {
    body: JSON.stringify({
      companyName: data.name,
      en: data.en,
      manager: data.manager,
      url: data.url
    }),
    headers: {
      'Content-Type': 'application/json'
    },
    method: id ? 'PUT' : 'POST'
  };
  // API 호출
  const response = await fetch(url, request);
  // 응답 데이터 추출 및 반환
  return await extractData(response);
}

export const setConsentData = async (serviceId: string, data: any, html?: string): Promise<any> => {
  // 초기 저장인지 아닌지를 확인하여 API 호출을 위한 URL 정의
  const url: string = `${SERVER_URL}consent/publish`;
  // 초기 저장 여부에 따라 요청 데이터 생성
  const body: any = {
    serviceId: serviceId,
    data: data,
    htmlBody: html
  };
  // API 호출에 필요한 Request 생성
  const request: RequestDF = {
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST'
  };
  // 응답 데이터 반환
  return await fetch(url, request);
}
export const getConsentList = async (serviceId: string): Promise<any[]> => {
  // API 호출
  const response: Response = await fetch(`${SERVER_URL}consent/${serviceId}`);
  // 응답 데이터 추출
  const result: ResponseDF = await extractData(response);
  return result.data.consentList;
  // // 데이터 가공
  // let sorted: any[] = [];
  // if (result.result) {
  //   // 데이터 정렬
  //   sorted.push(...result.data.list.sort((a: any, b: any): number => a.createAt > b.createAt ? 1 : a.createAt < b.createAt ? -1 : 0));
  //   // 데이터 가공
  //   sorted = sorted.map((item: any, index: number) => ({ ...item, key: index + 1, prev: false, version: index + 1 }));
  //   // Prev가 있을 경우 추가
  //   result.data.prevUrl !== '' ? sorted.unshift({ createAt: 100, key: 0, prev: true, url: result.data.prevUrl }) : undefined;
  // }
  // // 데이터 가공 및 반환
  // return sorted;
}

/**
 * [API Calller] 로그인
 * @param email 이메일
 * @param password 비밀번호
 * @returns 로그인 결과
 */
export const signInProcess = async (email:string, password:string):Promise<ResponseDF> => {
  // API 호출에 필요한 Request 생성
  const request: RequestDF = {
    body: JSON.stringify({
      email: email,
      password: password
    }),
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST'
  };
  // API 호출
  const response = await fetch(`${SERVER_URL}auth/signin`, request);
  // 에러 확인 및 반환
  return await extractData(response);
}
/**
 * [API Caller] 로그인 (Refresh)
 * @param id 사용자 ID
 * @returns 액세스 토큰
 */
export const refreshSignInProcess = async (id: string) : Promise<any> => {
  // API 호출에 필요한 Request 생성
  const request: RequestDF = {
    body: JSON.stringify({ id }),
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST'
  };  
  // 응답 데이터
  const response = await fetch(`${SERVER_URL}auth/silentrefresh`, request);
  return response;
}