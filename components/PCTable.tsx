import { useState } from 'react';
import { consignmentTableHeader, expandConsignmentTableHeader, expandProvisionTableHeader, provisionTableHeader } from "../models/data";
import { consignmentPersonalInfo, provisionPersonalInfo } from "../models/temporary";
import { EditableTable, EditableTableForm, EditableURLTableForm, setDataSource } from "./common/TestTable";

// 개인정보 제공 테이블
export function PersonalProvisionTable() {
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
  return (<EditableURLTableForm dataSource={data} expandKey='isForeign' headers={provisionTableHeader} innerHeaders={expandProvisionTableHeader}
    onAdd={onAdd} onDelete={onDelete} onSave={onSave} tableName='personalProvision' title='개인정보 제공' emptyText='제공 추가하기' />);
};

// 가명정보 제공 테이블
export function FalseNameProvisionTable() {
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
  return (<EditableURLTableForm dataSource={data} expandKey='isForeign' headers={provisionTableHeader} innerHeaders={expandProvisionTableHeader}
    onAdd={onAdd} onDelete={onDelete} onSave={onSave} tableName='personalProvision' title='가명정보 제공' emptyText='제공 추가하기' />);
};

export function ConsignmentTable() {
  // Set a local state (for data)
  const [data, setData] = useState<any[]>(setDataSource(consignmentPersonalInfo));

  // Create an event handler (onAdd)
  const onAdd = (record: any): void => setData([...data, record]);
  // Create an event handler (onDelete)
  const onDelete = (index: number): void => data.length - 1 === index ? setData([...data.slice(0, index)]) : setData([...data.slice(0, index), ...data.slice(index + 1)]);
  // Create an event handler (onSave)
  const onSave = (index: number, record: any): boolean => {
    data.length - 1 === index ? setData([...data.slice(0, index), record]) : setData([...data.slice(0, index), record, ...data.slice(index + 1)]);
    return true;
  }; // Return an element
  return (<EditableURLTableForm dataSource={data} expandKey='isForeign' headers={consignmentTableHeader} innerHeaders={expandConsignmentTableHeader}
    onAdd={onAdd} onDelete={onDelete} onSave={onSave} tableName='provision' title='개인정보 위탁' emptyText='위탁 추가하기' />);
}