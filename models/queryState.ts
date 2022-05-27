import { QueryClient, UseMutateFunction } from "react-query";
import { setDataSource } from "../utils/table";
// 기본 Server URL (환경설정에 따라 다름)
const baseUrl: string = 'https://dpot-dev.tovdata.com:8081/api/';

/** API Response Status */
export const API_STATUS_OK = 'OK';
export const API_STATUS_ERROR = 'ERROR';
export const API_STATUS_NOT_FOUND = 'NOT_FOUND';
export const API_STATUS_REQUEST_ERROR = 'REQUEST_ERROR';
export const API_STATUS_UNKNOWN_ERROR = 'UNKNOWN_ERROR';
/** 테이블 유형 */
export type PIMType = 'pi' | 'fni' | 'ppi' | 'pfni' | 'cpi' | 'cfni' | 'dpi';
export const API_DT_PI: PIMType = 'pi';
export const API_DT_FNI: PIMType = 'fni';
export const API_DT_PPI: PIMType = 'ppi';
export const API_DT_CPI: PIMType = 'cpi';
export const API_DT_PFNI: PIMType = 'pfni';
export const API_DT_CFNI: PIMType = 'cfni';
export const API_DT_LIST: PIMType[] = [API_DT_PI, API_DT_FNI, API_DT_PPI, API_DT_CPI, API_DT_PFNI, API_DT_CFNI];

/** PIPP 진행 상태  */
type PIPPStatus = 'none'|'progress'|'publish';
/** API로 반환된 데이터 형태 (Map) */
interface MapDF {
  M: any;
}
/** API로 반환된 데이터 형태 (List) */
interface ListDF {
  L: StringDF[];
}
/** API로 반환된 데이터 형태 (String) */
interface StringDF {
  S: string;
}
/** API로 반환된 데이터 형태 (Boolean) */
interface BooleanDF {
  BOOL: boolean;
}
/** POST 요청 시, 필요한 데이터 형식 */
interface RequestDF {
  body: any;
  headers: any;
  method: string;
}

/**
 * [Internal Function] API로 반환된 데이터를 추출 및 가공하는 함수
 * @param rawData API를 통해 반환 받은 데이터
 * @returns 추출 및 가공된 데이터
 */
const processET = (rawData: any[]): any[] => {
  const row: any[] = [];
  for (const item of rawData) {
    // 행(Row)에 대한 식별 값(id) 추출
    const id: string = (item.id as StringDF).S;
    // 행(Row)에 대한 데이터 추출
    const extracted: any = {};
    for (const key of Object.keys((item.data as MapDF).M)) {
      // 키 값에 대한 데이터 JSON 추출
      const temp: any = item['data']['M'][key];
      // 형식에 따라 알맞은 데이터 추출
      if ('L' in temp) {
        extracted[key] = ((temp as ListDF).L).map((elem: StringDF): string => elem.S);
      } else if ('S' in temp) {
        extracted[key] = (temp as StringDF).S;
      } else if ('BOOL' in temp) {
        extracted[key] = (temp as BooleanDF).BOOL;
      }
    }
    // 추출 및 가공된 데이터 저장
    row.push({ id, ...extracted });
  }
  // 추출 및 가공된 데이터 반환
  return row;
}
/**
 * [Function] 개인정보 처리방침 상태에 대해 API 요청하는 함수 (임시저장)
 * @param serviceId 현재 서비스 ID
 * @returns 개인정보 처리방침 진행 상태 [none|processing|publish]
 */
export const getStatusForPIPP = async (serviceId: string): Promise<PIPPStatus> => {
  const response = await fetch(`${baseUrl}pipp/${serviceId}`);
  // 응답 데이터를 JSON 형태로 변환
  const json = await response.json();
  // 에러 확인
  if (catchAPIRequestError(json.status, json.message)) {
    return 'none';
  } else if ('id' in json.data) {
    if ('publish' in json.data) {
      return json.data.publish ? 'publish' : 'progress';
    } else {
      return 'none';
    }
  } else {
    return 'none';
  }
}
/**
 * [Function] 개인정보 처리방침 생성 과정에 필요한 데이터를 가져오는 함수 (임시저장된 데이터)
 * @param serviceId 해당 서비스 ID
 * @returns 개인정보 처리방침 생성 데이터
 */
export const getDataForPIPP = async (serviceId: string): Promise<any> => {
  const response = await fetch(`${baseUrl}pipp/${serviceId}`);
  // 응답 데이터를 JSON 형태로 변환
  const json = await response.json();
  // 에러 확인
  if (catchAPIRequestError(json.status, json.message)) {
    return {};
  } else if ('id' in json.data) {
    return json.data.data;
  } else {
    return {};
  }
}
/**
 * [Function] 개인정보 처리방침에 대한 임시 저장을 위해 API 요청하는 함수
 * @param serviceId 현재 서비스 ID
 * @param data 임시 저장을 위한 데이터
 * @param status 데이터 저장 상태 (생성 완료일 경우, status = 'publish')
 * @returns API로부터 응답받은 데이터
 */
export const saveDocumentationForPIPP = async (serviceId: string, data: any, status: string): Promise<any> => {
  // 초기 저장인지 아닌지를 확인하여 API 호출을 위한 URL 정의
  const url: string = status === 'create' ? `${baseUrl}pipp/new` : `${baseUrl}pipp/${serviceId}`;
  // 초기 저장 여부에 따라 요청 데이터 생성
  const body: any = status === 'create' ? {
    serviceId: serviceId,
    data: data,
    publish: false
  } : {
    data: data,
    publish: status === 'publish' ? true : false
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
 * [Function] 개인정보 관리 탭 내에 존재하는 테이블 데이터 목록에 대해 API 요청하는 함수
 * @param serviceId 현재 서비스 ID
 * @param type 개인정보 관리 내 테이블 유형
 * @returns API로부터 응답받은 데이터
 */
export const getListForPIM = async (serviceId: string, type: PIMType): Promise<any[]> => {
  const response = await fetch(`${baseUrl}service/${serviceId}/${type}s`);
  // 응답 데이터를 JSON 형태로 변환
  const json = await response.json();
  // 에러 확인
  if (catchAPIRequestError(json.status, json.message)) {
    return [];
  } else {
    return setDataSource(processET(json.data));
  }
}
/**
 * [Function] 개인정보 관리 탭 내에 존재하는 테이블 데이터에 대한 API 요청 함수 (Delete or Post or Put)
 * @param serviceId 현재 서비스 ID
 * @param type 개인정보 관리 내 테이블 유형
 * @param mode API 요청 유형
 * @param data 요청에 필요한 파라미터 데이터
 * @returns 요청 응답 데이터
 */
export const processPIMData = async (serviceId: string, type: PIMType, mode: string, data: any): Promise<any> => {
  // 식별 값(id) 추출
  const id: string = data['id'];
  // Mode에 따라 요청을 위한 URL 및 데이터 정의
  const api: string = mode === 'add' ? `${baseUrl}${type}/new` : `${baseUrl}${type}/${id}`;
  const request: RequestDF = transformForRequest(serviceId, mode, data);
  // Mode에 따라 요청 처리 및 반환
  return await fetch(api, request);
}
/**
 * [Internal Function] API 요청에 필요한 데이터 형식을 생성하는 함수
 * @param serviceId 현재 서비스 ID
 * @param mode API 요청 유형
 * @param data 요청에 필요한 파라미터 데이터
 * @returns API 요청 데이터
 */
export const transformForRequest = (serviceId: string, mode: string, data: any): RequestDF => {
  // 데이터 복사
  const copy: any = JSON.parse(JSON.stringify(data));
  // 식별 값(id)와 테이블에서 사용하였던 key 속성 삭제
  delete copy['id'];
  delete copy['key'];
  // Request 정의
  const request: RequestDF = {
    body: JSON.stringify({ serviceId, data: copy }),
    headers: {
      'Content-Type': 'application/json'
    },
    method: ''
  };
  // Mode에 따라 요청 처리
  switch (mode) {
    case 'add':
      request.method = 'POST';
      break;
    case 'delete':
      request.method = 'DELETE';
      break;
    case 'save':
      request.method = 'PUT';
      break;
  }
  // 반환
  return request;
}

/**
 * [Function] API 요청에 따라 데이터를 업데이트하는 함수
 * @param queryClient QueryClient 객체
 * @param type 데이터 유형 [pi|fni|ppi|pfni|cpi|cfni|dpi]
 * @param mutate 데이터 동기화를 위한 Mutation 객체
 * @param mode API 유형[add|create|delete|save|'url/add'|'url/delete'|'url/save']
 * @param record 수정 또는 추가된 데이터
 */
export const setQueryData = (queryClient: QueryClient, type: string, mutate: UseMutateFunction<any, unknown, any, unknown>, mode: string, record: any) => {
  if (mode === 'create') {
    queryClient.setQueryData(type, (oldData: any) => oldData ? setDataSource([...oldData, record]) : setDataSource([record]));
  } else if (mode === 'delete' && (new RegExp('^npc_').test(record.id))) {
    queryClient.setQueryData(type, (oldData: any) => updateData(mode, oldData, record.id, record));
  } else if (mode.includes('url')) {
    const uMode = mode.split('/')[1];
    mutate({ mode: uMode, data: record }, {
      onSuccess: async (response) => {
        console.log('tth', response, record);
        queryClient.setQueryData(type, (oldData: any): any => updateData(mode, oldData, uMode === 'add' ? response.id : record.id, record));
      },
      onError: () => {
        queryClient.invalidateQueries(type);
      }
    });
  } else {
    mutate({ mode: mode, data: record }, {
      onSuccess: async (response) => {
        queryClient.setQueryData(type, (oldData: any): any => updateData(mode, oldData, mode === 'add' ? response.id : record.id, record));
      },
      onError: () => {
        queryClient.invalidateQueries(type);
      }
    });
  }
}
/**
 * [Internal Function] API 요청 응답에 대한 에러 확인 함수
 * @param status 요청의 응답 상태
 * @returns 에러 확인 결과
 */
const catchAPIRequestError = (status: string, message?: string): boolean => {
  // 에러 확인
  if (status === API_STATUS_ERROR) {
    console.error('Internal server error', message);
    return true;
  } else if (status === API_STATUS_REQUEST_ERROR) {
    console.error('Request error', message);
    return true;
  } else if (status === API_STATUS_UNKNOWN_ERROR) {
    console.error('Unknown error', message);
    return true;
  } else if (status === API_STATUS_NOT_FOUND) {
    console.error('Not found', message);
    return true;
  } else {
    return false;
  }
}
/**
 * [Internal Function] Query Data 업데이트 함수 (Front-end 내에서 처리)
 * @param mode 쿼리 유형 [add|delete|update]
 * @param datas 기존 데이터들
 * @param id 현재 수정 또는 추가되는 행(Row)에 대한 식별 값
 * @param record 수정 또는 추가된 데이터
 * @returns 업데이트된 데이터
 */
const updateData = (mode: string, datas: any[], id: string, record: any): any[] => {
  // 유형에 따라 처리
  if (mode === 'delete') {
    // UI를 위해 임의로 생성한 행(Row)에 대한 인덱스 추출
    const index: number = datas.findIndex((elem: any): boolean => elem.id === id);
    // 추출된 인덱스에 위치한 데이터를 제외한 데이터로 새로운 배열 생성
    const extracted: any[] = index === datas.length - 1 ? datas.slice(0, index) : [...datas.slice(0, index), ...datas.slice(index + 1, datas.length)];
    // 새로운 데이터를 추가하여 반환
    return setDataSource(extracted);
  } else {
    // 유형에 따라 추가 또는 수정하려는 데이터의 인덱스 추출
    const index: number = mode === 'add' ? datas.findIndex((elem: any): boolean => (new RegExp('^npc_').test(elem.id))) : datas.findIndex((elem: any): boolean => elem.id === id);
    // 추출된 인덱스에 위치한 데이터를 제외한 데이터로 새로운 배열 생성 및 반환
    return index === datas.length - 1 ? [...datas.slice(0, index), { ...record, id }] : [...datas.slice(0, index), { ...record, id }, ...datas.slice(index + 1, datas.length)];
  }
}