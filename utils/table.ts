import { TableHeadersData, SelectOptionsByColumn } from '../models/type';
import {SERVICE_PI, SERVICE_FNI, SERVICE_PPI, SERVICE_PFNI, SERVICE_CPI, SERVICE_CFNI} from '../models/queries/type';

/**
 * [Function] Set a data source 
 * @param dataSource raw data source
 * @returns data source
 */
 export const setDataSource = (dataSource: any): any[] => {
  return dataSource.map((item: any): any => { return { ...item, key: item.id } });
}
/**
 * [Internal Function] 특정 컬럼(Column)의 Select Option 선택에 따라 다른 컬럼(Column)에 대한 Select Options을 변경하는 함수
 * @param key 컬럼 구분을 위한 이름
 * @param onUpdate Select Option 갱신을 위한 Hanlder
 * @param ref 참조 데이터
 * @param tableName 테이블 구분을 위한 이름
 * @param value 현재 선택된 Select Option 값 (= 선택한 칼럼의 값)
 * @param row 현재 테이블 row 값
 * @param isInit 처음 onEdit 시 초기화를 위한 호출인지
 */
export const changeSelectOptions = (key: string, onUpdate: (value: any) => void, ref: any, tableName: string, value?: string | string[], row?: any, isInit :boolean = false): void => {
  // 테이블 이름에 따른 처리
  switch (tableName) {
    case SERVICE_PI:
      // "업무명"이 변경된 경우, "업무명"에 따라 "목적"과 "항목(필수 및 선택)"에 대한 Select Options을 변경
      if (key === 'subject') {
        value && ref[value as string] ? onUpdate({ purpose: ref[value as string].purpose, items: ref[value as string].items, period: ref[value as string].period }) : onUpdate({ purpose: [], items: [], period: [] });
      }
      break;
    case SERVICE_FNI:
      // "업무명"이 변경된 경우, "업무명"에 따라 "목적"과 "처리항목"에 대한 Select Options을 변경
      if (key === 'subject') {
        if (value) {
          const [refRow] = Array.isArray(value) ? ref.filter((elem: any): boolean => value.includes(elem[key])) : ref.filter((elem: any): boolean => elem[key] === value);
          refRow ? onUpdate({ ['items']: refRow['essentialItems'].concat(refRow['selectionItems']) }) : onUpdate({ ['items']: [] });
        }
      }
      break;
    case SERVICE_CPI:
      const cpiRef = ref['cpi'];
      // "업무명"이 변경된 경우, 
      // "업무명"에 따라 "수탁자" Select Options를 변경
      let _contents:string[] = [];
      if (key === 'subject') {
        // 초기화 호출 시
        if(isInit && Object.keys(row).length>0){
          const _companys = cpiRef[row?.subject];
          _contents= _companys ? _companys[row?.company].content :[];
        }
        if (value && typeof value === "string") {
          cpiRef[value] ? onUpdate({ ['company']: Object.keys(cpiRef[value]), ['content']: _contents }) : onUpdate({ ['company']: [] , ['content']: _contents});
        }
      }
      // "수탁자"가 변경될 경우,
      // "수탁자"에 따라 "위탁 업무" Select Options를 변경
      if (key === 'company') {
        if (value && typeof value === "string" && cpiRef[row.subject]) {
          const infos = cpiRef[row.subject][value];
          infos?.content ? onUpdate({ ['content']: infos.content, ['period']: infos.period, ['method']: infos.method }) : onUpdate({ ['content']: [], ['charger']: [] });
        }
      }
      break;
    default:
      break;
  }
}
/**
 * [Internal Function] 테이블 데이터로부터 필수항목 및 선택항목을 추출하는 함수 (개인정보 수집 및 이용 테이블에서만 사용)
 * @param dataSource 테이블 데이터 소스
 * @returns 추출된 항목 데이터
 */
 export const extractProcessingItems = (dataSource: any[]): string[] => {
  const options: SelectOptionsByColumn = {};
  for (const row of dataSource) {
    // 테이블 데이터 소스로부터 필수항목(essentialItems)과 선택항목(selectionItems) 데이터 추출 (중복 제거)
    if (('essentialItems' in row) || ('selectionItems' in row)) {
      if (('items' in options) === false) options['items'] = [];
      // 필수항목(essentialItems) 데이터 추출 (중복 제거)
      if ('essentialItems' in row) {
        options['items'].push(...row['essentialItems'].filter((item: string): boolean => !options['items'].includes(item)));
      }
      // 선택항목(selectionItems) 데이터 추출 (중복 제거)
      if ('selectionItems' in row) {
        options['items'].push(...row['selectionItems'].filter((item: string): boolean => !options['items'].includes(item)));
      }
    }
  }
  // 반환
  return options['items'];
}

/**
 * [Internal Function] 테이블 칼럼(Column)별 Select 옵션 초기화 함수
 * @param dataSource 테이블 데이터 소스
 * @param headers 테이블 헤더 데이터
 * @param tableName 테이블 구분을 위한 이름
 * @param ref 참조 데이터
 * @param defaultSelectOptions 기본으로 제공될 각 칼럼(Column)별 Select 옵션 데이터
 * @returns 각 칼럼(Column)별 Select 옵션 데이터
 */
 export const resetSelectOptions = (dataSource: any, headers: TableHeadersData, tableName: string, ref: any, defaultSelectOptions?: SelectOptionsByColumn): SelectOptionsByColumn => {
    const options: SelectOptionsByColumn = {};
    // 각 컬럼(Column)에 따라 부모 컴포넌트로부터 받은 기본 옵션을 포함한 Select 옵션 설정
    Object.keys(headers).forEach((key: string): string[] => defaultSelectOptions && defaultSelectOptions[key] ? options[key] = [...defaultSelectOptions[key]] : []);
    let items: any = [];
    // 테이블에 따라 초기 각각의 컬럼(Column)의 Select 옵션 설정
    switch (tableName) {
      case SERVICE_PI:
        options['items'] = defaultSelectOptions && defaultSelectOptions['items'] ? defaultSelectOptions['items'] : [];
        options['items'] = extractProcessingItems(dataSource)?.filter((item: string): boolean => !options['items'].includes(item)).concat(options['items']);
        break;
      case SERVICE_FNI:
        const subjectOptions: string[] = ref.map((elem: any): string => elem.subject).filter((item: string): boolean => options['subject'] ? !options['subject'].includes(item) : true)
        options['subject'] ? options['subject'].push(...subjectOptions) : options['subject'] = [...subjectOptions];
        // options['items'] = [];
        // options['items'] = extractProcessingItems(ref)?.filter((item: string): boolean => !options['items'].includes(item)).concat(options['items']);
        break;
      case SERVICE_PPI:
        options['items'] = extractProcessingItems(ref);
        break;
      case SERVICE_PFNI:
        const pfniItems = ref?.filter((fni:any)=> fni.url===undefined)?.map((fni: any) => fni.items);
        pfniItems.forEach((pfniArr: any) => pfniArr.forEach((pfniItem: any) => !items.includes(pfniItem) && items.push(pfniItem)));
        options['items'] = items;
        break;
      case SERVICE_CPI:
        options['items'] = extractProcessingItems(ref[SERVICE_PI]);
        break;
      case SERVICE_CFNI:
        const fniItems = ref?.filter((ppi:any)=> ppi.url===undefined)?.map((ppi: any) => ppi.items);
        fniItems.forEach((fniArr: any) => fniArr.forEach((fniItem: any) => !items.includes(fniItem) && items.push(fniItem)));
        options['items'] = items;
        break;
      default:
        break;
    }
    // 반환
    return options;
  }