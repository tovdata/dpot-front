import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { consignmentTableHeader, expandConsignmentTableHeader, expandProvisionTableHeader, provisionTableHeader } from "../models/data";
import { GetPersonalInfoSelectOptionsSelector, GetPersonalInfoSelector } from '../models/state';
import { consignmentPersonalInfo, provisionPersonalInfo } from "../models/temporary";
import { SelectOptionsByColumn } from '../models/type';
import { ModalToInputURL } from './common/TestModal';
import { EditableURLTableForm, setDataSource } from "./common/TestTable";


// 개인정보 제공 테이블
export const PersonalProvisionTable = () => {
  // Set a local state (for data)
  const [data, setData] = useState<any[]>(setDataSource(provisionPersonalInfo));
  // Set a URL modal open state
  const [isModalOpen, setIseModalOpen] = useState<boolean>(false);
  // Set a url value
  const [url, setUrl] = useState<string>('');
  // Get a state (for select options)
  const ref: any = useRecoilValue(GetPersonalInfoSelector);
  // Create an event handler (onAdd)
  const onAdd = (record: any): void => setData([...data, record]);
  // Create an event handler (onDelete)
  const onDelete = (index: number): void => data.length - 1 === index ? setData([...data.slice(0, index)]) : setData([...data.slice(0, index), ...data.slice(index + 1)]);
  // Create an event handler (onSave)
  const onSave = (index: number, record: any): boolean => {
    data.length - 1 === index ? setData([...data.slice(0, index), record]) : setData([...data.slice(0, index), record, ...data.slice(index + 1)]);
    return true;
  };
  // Set a default select options
  const defaultSelectOptions: SelectOptionsByColumn = {
    subject: ["회원가입 및 관리", "고객 상담 및 문의", "재화 및 서비스 이용", "요금 결제 및 환불", "상품 배송"]
  };

  // Return an element
  return (
    <>
      {isModalOpen &&
        <ModalToInputURL
          defaultValue={url}
          open={isModalOpen}
          onClose={() => { setIseModalOpen(false) }}
          onSave={setUrl}
          discription={'제공 내용이 링크로 존재하는 경우 아래에 URL 주소를 입력해주세요.'} />
      }
      <EditableURLTableForm
        dataSource={data}
        url={url}
        defaultSelectOptions={defaultSelectOptions}
        headers={provisionTableHeader}
        onAdd={onAdd}
        onDelete={onDelete}
        onSave={onSave}
        onClickURL={() => setIseModalOpen(true)}
        refData={ref}
        tableName='ppi'
        title='개인정보 제공'
        expandKey='isForeign'
        innerHeaders={expandProvisionTableHeader} />
    </>
  );

};

// 가명정보 제공 테이블
export const FalseNameProvisionTable = () => {
  // Set a local state (for data)
  const [data, setData] = useState<any[]>(setDataSource(provisionPersonalInfo));
  // Set a URL modal open state
  const [isModalOpen, setIseModalOpen] = useState<boolean>(false);
  // Set a url value
  const [url, setUrl] = useState<string>('');
  // Get a state (for select options)
  const ref: any = useRecoilValue(GetPersonalInfoSelector);

  // Create an event handler (onAdd)
  const onAdd = (record: any): void => setData([...data, record]);
  // Create an event handler (onDelete)
  const onDelete = (index: number): void => data.length - 1 === index ? setData([...data.slice(0, index)]) : setData([...data.slice(0, index), ...data.slice(index + 1)]);
  // Create an event handler (onSave)
  const onSave = (index: number, record: any): boolean => {
    data.length - 1 === index ? setData([...data.slice(0, index), record]) : setData([...data.slice(0, index), record, ...data.slice(index + 1)]);
    return true;
  };

  // Return an element
  return (
    <>
      {isModalOpen &&
        <ModalToInputURL
          defaultValue={url}
          open={isModalOpen}
          onClose={() => { setIseModalOpen(false) }}
          onSave={setUrl}
          discription={'제공 내용이 링크로 존재하는 경우 아래에 URL 주소를 입력해주세요.'}
        />
      }
      <EditableURLTableForm
        dataSource={data}
        url={url}
        expandKey='isForeign'
        headers={provisionTableHeader}
        innerHeaders={expandProvisionTableHeader}
        onAdd={onAdd}
        onDelete={onDelete}
        onSave={onSave}
        onClickURL={() => setIseModalOpen(true)}
        tableName='fpni'
        title='가명정보 제공'
        refData={ref} />
    </>
  );
};
export const ConsignmentTable = () => {
  // Set a local state (for data)
  const [data, setData] = useState<any[]>(setDataSource(consignmentPersonalInfo));
  // Set a URL modal open state
  const [isModalOpen, setIseModalOpen] = useState<boolean>(false);
  // Set a url value
  const [url, setUrl] = useState<string>('');
  // Get a state (for select options)
  const ref: any = useRecoilValue(GetPersonalInfoSelectOptionsSelector);

  // Create an event handler (onAdd)
  const onAdd = (record: any): void => setData([...data, record]);
  // Create an event handler (onDelete)
  const onDelete = (index: number): void => data.length - 1 === index ? setData([...data.slice(0, index)]) : setData([...data.slice(0, index), ...data.slice(index + 1)]);
  // Create an event handler (onSave)
  const onSave = (index: number, record: any): boolean => {
    data.length - 1 === index ? setData([...data.slice(0, index), record]) : setData([...data.slice(0, index), record, ...data.slice(index + 1)]);
    return true;
  }; // Return an element
  return (
    <>
      {isModalOpen &&
        <ModalToInputURL
          defaultValue={url}
          open={isModalOpen}
          onClose={() => { setIseModalOpen(false) }}
          onSave={setUrl}
          discription={'위탁 내용이 링크로 존재하는 경우 아래에 URL 주소를 입력해주세요.'}
        />
      }
      <EditableURLTableForm
        dataSource={data}
        url={url}
        expandKey='isForeign'
        headers={consignmentTableHeader}
        innerHeaders={expandConsignmentTableHeader}
        onAdd={onAdd}
        onDelete={onDelete}
        onSave={onSave}
        onClickURL={() => setIseModalOpen(true)}
        tableName='provision'
        title='개인정보 위탁'
        refData={ref} />
    </>);
}
