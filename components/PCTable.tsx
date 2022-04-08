import { useState } from 'react';
import { consignmentTableHeader, expandProvisionTableHeader, provisionTableHeader } from "../models/data";
import { consignmentPersonalInfo, provisionPersonalInfo } from "../models/temporary";
import { EditableTable, EditableTableForm, setDataSource } from "./common/RenewerTable";
// Module
import { createSimpleWarningNotification } from './common/Notification';

// 개인정보 제공 테이블
export function ProvisionTable() {
  // Set a local state (for data)
  const [data, setData] = useState<any[]>(setDataSource(provisionPersonalInfo));

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
  return (<EditableTableForm dataSource={data} expandKey='isForeign' headers={provisionTableHeader} innerHeaders={expandProvisionTableHeader} onAdd={onAdd} onDelete={onDelete} onSave={onSave} title='개인정보 제공'  />);
};

export function ConsignmentTable() {
  return (<EditableTable dataSource={consignmentPersonalInfo} headers={consignmentTableHeader} title='개인정보 위탁' />)
}