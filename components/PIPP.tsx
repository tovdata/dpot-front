import { useEffect, useState } from 'react';
// Component
import { Button, Input, Modal } from 'antd';
import { DocumentTable, setDataSource, StyledTableForm, TableFormHeader } from './common/Table';
// Data
import { personalInfoProcessingPolicyTableHeader } from '../models/data';
import { personalInfoProcessingPolicy } from '../models/temporary';
// Icon
import { PlusOutlined } from '@ant-design/icons'
// Module
import { createWarningMessage } from './common/Notification';

/** [Component] Table for personal information processing policy */
export const PIPPTable = (): JSX.Element => {
  // Set a local state (for data)
  const [data, setData] = useState<any[]>(setDataSource(personalInfoProcessingPolicy));
  const [filter, setFilter] = useState<any[]>(data);
  // Set a local state (for control)
  const [focus, setFocus] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [value, setValue] = useState<string>('');

  // Create an event handler (onCreate)
  const onCreate = (): void => {
    if (name === '') {
      createWarningMessage('개인정보 처리방침명을 입력해주세요', 1.6);
      setFocus(true);
    } else {
      setFocus(false);
      setName('');
    }
  }
  // Create an event handler (onChange)
  const onChangeName = (e: any): void => {
    setFocus(false);
    setName(e.target.value);
  }
  const onChangeFilterValue = (e: any): void => setValue(e.target.value);
  // Create an event handler (onClose)
  const onClose = (): void => {
    setOpenModal(false);
    setFocus(false);
    setName('');
  }
  // Create an event handler (onDelete)
  const onDelete = (record: any): void => {
    const index: number = data.findIndex((item: any): boolean => item.uuid === record.uuid);
    if (index > -1) {
      data.length - 1 === index ? setData([...data.slice(0, index)]) : setData([...data.slice(0, index), ...data.slice(index + 1)]);
    }
  }
  // Create an event handler (onSearch)
  const onSearch = (): void => setFilter(setDataSource(data.filter((row: any): boolean => row.name.includes(value))));
  // Create an event handler (onShow)
  const onShow = (): void => setOpenModal(true);
  // Set a hook
  useEffect(() => setFilter(data.filter((row: any): boolean => row.name.includes(value))), [data]);

  // Create a table tools (for search)
  const tableTools: JSX.Element = (
    <div style={{ display: 'flex' }}>
      <Input.Search onChange={onChangeFilterValue} onSearch={onSearch} placeholder='문서 검색' style={{ marginRight: '16px', minWidth: '266px' }} value={value} />
      <Button icon={<PlusOutlined />} onClick={onShow} type='primary'>문서 만들기</Button>
    </div>
  );
  // Return an element
  return (
    <>
      <StyledTableForm>
        <TableFormHeader title='개인정보 처리방침' tools={tableTools} />
        <DocumentTable dataSource={filter} headers={personalInfoProcessingPolicyTableHeader} onDelete={onDelete} pagination={true} />
      </StyledTableForm>
      <Modal cancelText='취소' centered onCancel={onClose} onOk={onCreate} okText='완료' title='개인정보 처리방침명 입력' visible={openModal}>
        <Input allowClear onChange={onChangeName} placeholder='주식회사 OOOO 개인정보 처리방침' status={focus ? 'error' : undefined} type='text' value={name} />
      </Modal>
    </>
  );
}