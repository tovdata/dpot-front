import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
// Component
import { EditableTable, EditableTableForm, setDataSource } from './common/Table';
// Data
import { fniTableHeader, piTableHeader } from '../models/static/header';
// Module
import { createSimpleWarningNotification } from './common/Notification';
// State
import { GetPersonalInfoSelectOptionsSelector, GetPersonalInfoSelector } from '../models/state';
// Type
import { SelectOptionsByColumn } from '../models/type';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getPIDataFromAPI, postPIDataFromAPI } from '../models/queryState';
import { falseNameInfo, personalInfo } from '../models/temporary';

/**
 * [Component] 가명정보 수집 및 이용 테이블
 */
export const FNITable: React.FC<any> = (): JSX.Element => {
  // Set a local state
  const [data, setData] = useState<any[]>(setDataSource(falseNameInfo));
  // Get a state (for select options)
  const ref: any = useRecoilValue(GetPersonalInfoSelector);
  // 기본적인 셀렉트 옵션 데이터 (정적)
  const defaultSelectOptions: SelectOptionsByColumn = {
    basis: ['과학적 연구', '통계 작성', '공익적 기록 및 보존', '기타']
  };

  // [Event handler] 행(Row) 추가 이벤트
  const onAdd = (record: any): void => setData([...data, record]);
  // [Event handler] 행(Row) 삭제 이벤트
  const onDelete = (index: number): void => data.length - 1 === index ? setData([...data.slice(0, index)]) : setData([...data.slice(0, index), ...data.slice(index + 1)]);
  // [Event handler] 행(Row) 저장 이벤트
  const onSave = (index: number, record: any): boolean => {
    data.length - 1 === index ? setData([...data.slice(0, index), record]) : setData([...data.slice(0, index), record, ...data.slice(index + 1)]);
    return true;
  }

  // Return an element
  return (<EditableTable dataSource={data} defaultSelectOptions={defaultSelectOptions} headers={fniTableHeader} onAdd={onAdd} onDelete={onDelete} onSave={onSave} refData={ref} tableName='fni' />);
}
/**
 * [Component] 가명정보 수집 및 이용 테이블 Form
 */
export const FNITableForm: React.FC<any> = (): JSX.Element => {
  return (
    <EditableTableForm title='가명정보 수집・이용 현황'>
      <FNITable />
    </EditableTableForm>
  );
}
/**
 * [Component] 개인정보 수집 및 이용 테이블
 */
export const PITable: React.FC<any> = (): JSX.Element => {
  // 서버로부터 테이블 데이터 가져오기
  const { isLoading, error, data } = useQuery('piInfo', getPIDataFromAPI);
  // 셀렉트 옵션 데이터 가져오기 (Using recoil)
  const ref: any = useRecoilValue(GetPersonalInfoSelectOptionsSelector);
  // 기본적인 셀렉트 옵션 데이터 (정적)
  const defaultSelectOptions: SelectOptionsByColumn = {
    subject: ['회원가입 및 관리', '고객 상담 및 문의', '재화 및 서비스 이용', '요금 결제 및 환불', '상품 배송', '신규 서비스 개발', '홍보 및 마케팅', '인터넷 서비스 이용 과정에서 자동을 수집되는 정보']
  };

  const { mutate } = useMutation(postPIDataFromAPI);
  const queryClient = useQueryClient();
  // 서버로부터 데이터를 받아와서 동기화
  const setData = (mode: string, newData: any) => {
    // 화면 깜빡임을 방지하여, 서버에 데이터 동기화 전 newData setting
    queryClient.setQueryData('piInfo', setDataSource([newData]));
    mutate({ mode: mode, data: newData }, {
      // onSettled: () => queryClient.invalidateQueries('piInfo'), // 서버 데이터 동기화
      onSuccess: (response) => {
        if (response && response.status === 200) {
          queryClient.setQueryData('piInfo', setDataSource([newData]));
        } else {
          queryClient.setQueryData('piInfo', data);
        }
      },
      onError: (response) => {
        console.log('error', response)
        // 전체 리스트 받아오는 경우에는 수정 필요
        queryClient.setQueryData('piInfo', data);
      }
    });
  }

  // 테이블 이벤트 핸들러 및 테이블 생성
  if (data) {
    // [Event handler] 행(Row) 추가 이벤트
    const onAdd = (record: any): void => setData('add', record);
    // [Event handler] 행(Row) 삭제 이벤트
    const onDelete = (index: number): void => setData('delete', data[index].project_id);
    // [Event handler] 행(Row) 저장 이벤트
    const onSave = (index: number, record: any): boolean => {
      if (record.essentialItems.length === 0 && record.selectionItems.length === 0) {
        createSimpleWarningNotification('필수 항목과 선택 항목 중에서 하나의 항목을 필수로 입력해야 합니다.');
        return false;
      } else {
        setData('save', record);
        return true;
      }
    }
    // Return an element
    return (<EditableTable dataSource={data} defaultSelectOptions={defaultSelectOptions} headers={piTableHeader} onAdd={onAdd} onDelete={onDelete} onSave={onSave} refData={ref} tableName='pi' />);
  } else {
    return (<></>);
  }
}
/**
 * [Component] 개인정보 수집 및 이용 테이블 Form
 */
export const PITableForm: React.FC<any> = (): JSX.Element => {
  return (
    <EditableTableForm title='개인정보 수집・이용 현황'>
      <PITable />
    </EditableTableForm>
  );
}

/**
 * [Component] Personal information table
 */
// export const PersonalInfoTable = (): JSX.Element => {
//   // Set a servr state (for data)
//   const { isLoading, error, data } = useQuery('piInfo', getPIDataFromAPI);
//   // Get a state (for select options)
//   const ref: any = useRecoilValue(GetPersonalInfoSelectOptionsSelector);
//   // Set a default select options
//   const defaultSelectOptions: SelectOptionsByColumn = {
//     subject: ["회원가입 및 관리", "고객 상담 및 문의", "재화 및 서비스 이용", "요금 결제 및 환불", "상품 배송"]
//   };
//   const { mutate } = useMutation(postPIDataFromAPI);
//   const queryClient = useQueryClient();
//   const setData = (mode: string, newData: any) => {
//     // 화면 깜빡임을 방지하여, 서버에 데이터 동기화 전 newData setting
//     queryClient.setQueryData('piInfo', setDataSource([newData]));
//     mutate({ mode: mode, data: newData }, {
//       // onSettled: () => queryClient.invalidateQueries('piInfo'), // 서버 데이터 동기화
//       onSuccess: (response) => {
//         if (response && response.status === 200) {
//           queryClient.setQueryData('piInfo', setDataSource([newData]));
//         } else {
//           queryClient.setQueryData('piInfo', data);
//         }
//       },
//       onError: (response) => {
//         console.log('error', response)
//         // 전체 리스트 받아오는 경우에는 수정 필요
//         queryClient.setQueryData('piInfo', data);
//       }
//     })
//   };
//   if (data) {
//     // Create an event handler (onAdd)
//     const onAdd = (record: any): void => setData('add', record);
//     // Create an event handler (onDelete)
//     const onDelete = (index: number): void => setData('delete', data[index].project_id);
//     // Create an event handler (onSave)
//     const onSave = (index: number, record: any): boolean => {
//       if (record.essentialItems.length === 0 && record.selectionItems.length === 0) {
//         createSimpleWarningNotification('필수 항목과 선택 항목 중에서 하나의 항목을 필수로 입력해야 합니다.');
//         return false;
//       } else {
//         setData('save', record);
//         return true;
//       }
//     };
//     // Return an element
//     return (<EditableTableForm dataSource={data} defaultSelectOptions={defaultSelectOptions} headers={personalInfoTableHeader} onAdd={onAdd} onDelete={onDelete} onSave={onSave} refData={ref} tableName='pi' title='개인정보 수집・이용 현황' />);
//   }
//   else {
//     return <></>
//   }
// }
/**
 * [Component] False name information table
 */
// export const FalseNameInfoTable = (): JSX.Element => {
//   // Set a local state
//   const [data, setData] = useState<any[]>(setDataSource(falseNameInfo));
//   // Get a state (for select options)
//   const ref: any = useRecoilValue(GetPersonalInfoSelector);
//   // Set a default select options
//   const defaultSelectOptions: SelectOptionsByColumn = {
//     basis: ['과학적 연구', '통계 작성', '공익적 기록 및 보존', '기타']
//   }
//   // Create an event handler (onAdd)
//   const onAdd = (record: any): void => setData([...data, record]);
//   // Create an event handler (onDelete)
//   const onDelete = (index: number): void => data.length - 1 === index ? setData([...data.slice(0, index)]) : setData([...data.slice(0, index), ...data.slice(index + 1)]);
//   // Create an event handler (onSave)
//   const onSave = (index: number, record: any): boolean => {
//     data.length - 1 === index ? setData([...data.slice(0, index), record]) : setData([...data.slice(0, index), record, ...data.slice(index + 1)]);
//     return true;
//   }

//   // Return an element
//   return (<EditableTableForm dataSource={data} defaultSelectOptions={defaultSelectOptions} headers={falseNameInfoTableHeader} onAdd={onAdd} onDelete={onDelete} onSave={onSave} refData={ref} tableName='fni' title='가명정보 수집・이용 현황' />);
// }