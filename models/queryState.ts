import { QueryClient, UseMutateFunction } from "react-query";
import { setDataSource } from "../utils/table";

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
        queryClient.setQueryData(type, (oldData: any): any => updateURLData(oldData, uMode === 'add' ? { id: response?.id, url: record?.url } : record));
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

  // 활동 이력 기록을 위한 위치 추출
  // writeActivityLog('service', mode, type)
  // // 활동 이력 기록
  // if (location !== '') {
  //   switch (mode) {
  //     case 'add':
  //       setActivity('service', 'b7dc6570-4be9-4710-85c1-4c3788fcbd12', `OOO가 ${location}를 추가하였습니다.`);
  //       break;
  //     case 'delete':
  //       setActivity('service', 'b7dc6570-4be9-4710-85c1-4c3788fcbd12', `OOO가 ${location}를 삭제하였습니다.`);
  //       break;
  //     case 'save':
  //       setActivity('service', 'b7dc6570-4be9-4710-85c1-4c3788fcbd12', `OOO가 ${location}를 수정하였습니다.`);
  //       break;
  //   }
  // }
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
/**
 * [Internal Function] Query URL Data 업데이트 함수 (Front-end 내에서 처리)
 * @param datas 기존 데이터들
 * @param record 수정 또는 추가된 데이터
 * @returns 
 */
const updateURLData = (datas: any[], record: any): any[] => {
  const data = datas.filter((row: any) => row.url === undefined);
  return [...data, record];
}
/**
 * [Function] 활동 내역을 위한 UI상 위치 반환
 * @param type 활동 내역 기준 (표, 서비스 등)
 * @returns UI상 위치 데이터
 */
// export const getTableLocation = (type: string): string => {
//   switch (type) {
//     case SERVICE_PI:
//       return '‘수집・이용’ 탭의 ‘개인정보 수집・이용’ 표';
//     case SERVICE_FNI:
//       return '‘수집・이용’ 탭의 ‘가명정보 수집・이용’ 표';
//     case SERVICE_PPI:
//       return '‘제공・위탁’ 탭의 ‘개인정보 제3자 제공’ 표';
//     case SERVICE_CPI:
//       return '‘제공・위탁’ 탭의 ‘개인정보 위탁’ 표';
//     case SERVICE_PFNI:
//       return '‘제공・위탁’ 탭의 ‘가명정보 제3자 제공’ 표';
//     case SERVICE_CFNI:
//       return '‘제공・위탁’ 탭의 ‘가명정보 위탁’ 표';
//     case SERVICE_DPI:
//       return '‘파기’ 탭의 ‘개인정보 파기 관리대장’ 표';
//     case 'consent':  
//       return '동의서';
//     case SERVICE_PIPP:
//       return '개인정보 처리방침';
//     default:
//       return '';
//   }
// }