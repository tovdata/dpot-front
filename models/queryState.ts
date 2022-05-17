import { QueryClient, UseMutateFunction } from "react-query";
import { setDataSource } from "../components/common/Table";
import { API_STATUS_ERROR, API_STATUS_NOT_FOUND, API_STATUS_REQUEST_ERROR, API_STATUS_UNKNOWN_ERROR } from "./data";
// 기본 Server URL (환경설정에 따라 다름)
const baseUrl: string = 'https://dpot-dev.tovdata.com:8081/api/';

/** 테이블 유형 */
export type PIMType = 'pi' | 'fni' | 'ppi' | 'pfni' | 'cpi' | 'cfni' | 'dpi';
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
 * @param mode API 유형[add|create|delete|update]
 * @param record 수정 또는 추가된 데이터
 */
export const setQueryData = (queryClient: QueryClient, type: string, mutate: UseMutateFunction<any, unknown, any, unknown>, mode: string, record: any) => {
  if (mode === 'create') {
    queryClient.setQueryData(type, (oldData: any) => oldData ? setDataSource([...oldData, record]) : setDataSource([record]));
  } else if (mode === 'delete' && (new RegExp('^npc_').test(record.id))) {
    queryClient.setQueryData(type, (oldData: any) => updateData(mode, oldData, record.id, record));
  } else {
    mutate({ mode: mode, data: record }, {
      onSuccess: async (response) => {
        // 응답 데이터를 JSON으로 변환
        const json: any = await response.json();
        // 에러 처리
        if (!catchAPIRequestError(json.status, json.message)) {
          queryClient.setQueryData(type, (oldData: any): any => updateData(mode, oldData, mode === 'create' ? json.data.id : record.id, record));
        }
      },
      onError: (response) => {
        console.error('[ERROR]', response);
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