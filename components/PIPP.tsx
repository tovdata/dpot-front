import { useEffect, useState } from 'react';
import styled from 'styled-components';
// Component
import { Button, Collapse, CollapsePanelProps, Input, Modal, Popover, Radio, Space } from 'antd';
import { PageHeaderContainStep } from './common/Header';
import { DocumentTable, EditableTable, setDataSource, StyledTableForm, TableFormHeader } from './common/Table';
// Data
import { personalInfoProcessingPolicyTableHeader, personalInfoTableHeader } from '../models/data';
import { personalInfoProcessingPolicy } from '../models/temporary';
// Icon
import { PlusOutlined, QuestionCircleOutlined } from '@ant-design/icons'
// Module
import { createSimpleWarningNotification, createWarningMessage } from './common/Notification';

// Styled component
const StyledCollapse = styled(Collapse)`
  .ant-collapse-item > .ant-collapse-header {
    align-items: center;
    display: flex;
    user-select: none;
  }
`;

/** [Interface] Properties for PIPP table */
interface PIPPTableProps {
  onSelect: (value: any) => void;
}
/** [Interface] Properties for create a doucment form */
interface CreateDocumentFormProps {
  onBack: () => void;
}
/** [Interface] Properties for collapse status extra */
interface CollapseStatusExtraProps {
  children?: JSX.Element | JSX.Element[];
  disabled?: boolean;
  header: CollapseHeaderData;
  id: string;
  onChange: (active: boolean, target: string) => void;
}
/** [Interface] Collapse data */
interface CollapseData {
  header: CollapseHeaderData;
  content?: any;
}
/** [Interface] Collapse header data */
interface CollapseHeaderData {
  description?: string;
  title: string;
  precedence?: string|number;
  uuid: string|number;
}
/** [Interface] Radio option data */
interface RadioOptionData {
  label: string;
  value: string;
}

/**
 * [Component] Table for personal information processing policy
 */
export const PIPPTable = ({ onSelect }: PIPPTableProps): JSX.Element => {
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
      onSelect({ name: name, uuid: 'new' });
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
/**
 * [Component] Create a document form (for pipp)
 */
export const CreateDocumentForm = ({ onBack }: CreateDocumentFormProps): JSX.Element => {
  // Set the steps
  const steps: string[] = ["기본정보 입력", "제공/위탁", "해당사항 입력", "가명처리사항", "편집하기", "검토"];
  // Set a local state
  const [current, setCurrent] = useState<number>(1);
  const [content, setContent] = useState<JSX.Element>(<></>);
  // Set a local state
  const [open, setOpen] = useState<any>({
    2: {
      1: false,
      2: false
    },
    3: {
      1: false,
      2: false,
      3: false,
      4: false
    },
    4: {
      1: false,
      2: false
    }
  });

  // Create an event handler (onMoveStep)
  const onMoveStep = (type: string): void => {
    if (type === 'prev') {
      current - 1 >= 1 ? setCurrent(current - 1) : undefined;
    } else {
      current + 1 <= steps.length ? setCurrent(current + 1) : undefined;
    }
  }

  // Set a hook
  useEffect(() => {
    if (current === 1) {
      setContent(<CreateDocumentFormContent01 />);
    } else if (current === 2) {
      setContent(<CreateDocumentFormContent02 />);
    } else if (current === 3) {
      setContent(<CreateDocumentFormContent03 />);
    } else if (current === 4) {
      setContent(<CreateDocumentFormContent04 />);
    } else if (current === 5) {
      setContent(<>4</>);
    } else if (current === 6) {
      setContent(<>5</>);
    }
  }, [current]);

  // Return an element
  return (
    <>
      <PageHeaderContainStep current={current} goTo='/doc/pipp' onBack={onBack} onMove={onMoveStep} title='개인정보 처리방침 만들기' steps={steps} />
      <>{content}</>
    </>
  );
}
/**
 * [Inner Component] Create a document content (step1)
 */
const CreateDocumentFormContent01 = (): JSX.Element => {
  // Set a local state (for data)
  const [data, setData] = useState<any[]>([]);

  // Create an event handler (onAdd)
  const onAdd = (record: any): void => setData([...data, record]);
  // Create an event handler (onDelete)
  const onDelete = (index: number): void => data.length - 1 === index ? setData([...data.slice(0, index)]) : setData([...data.slice(0, index), ...data.slice(index + 1)]);
  // Create an event handler (onSave)
  const onSave = (index: number, record: any): boolean => {
    if (record.essentialItems.length === 0 && record.selectionItems.length === 0) {
      createSimpleWarningNotification('필수 항목과 선택 항목 중에서 하나의 항목을 필수로 입력해야 합니다.');
      return false;
    } else {
      data.length - 1 === index ? setData([...data.slice(0, index), record]) : setData([...data.slice(0, index), record, ...data.slice(index + 1)]);
      return true;
    }
  };

  // Return an element
  return (<EditableTable dataSource={data} headers={personalInfoTableHeader} onAdd={onAdd} onDelete={onDelete} onSave={onSave} selectOptions={{}} />);
}
/**
 * [Inner Component] Create a document content (step2)
 */
const CreateDocumentFormContent02 = ({ state }: any): JSX.Element => {
  const content: CollapseData[] = [
    { header: { title: '제3자에게 제공하는 개인정보가 있나요?', uuid: 1 } },
    { header: { title: '위탁하는 개인정보가 있나요?', uuid: 2 } }
  ];

  // Return an element
  return (
    <CustomCollapse content={content} />
  );
}
/**
 * [Inner Component] Create a document content (step3)
 */
const CreateDocumentFormContent03 = (): JSX.Element => {
  const content: CollapseData[] = [
    { header: { title: '쿠키(cookie)를 사용하나요?', description: 'a', uuid: 1 } },
    { header: { title: '타겟 광고를 위하여 사용자의 행태정보를 사용하나요?', description: 'b', uuid: 2 } },
    { header: { title: '사용자의 행태정보를 제3자(온라인 광고사업자 등)가 수집・처리할 수 있도록 허용한 경우가 있나요?', description: 'c', precedence: 2, uuid: 3 } },
    { header: { title :'별도의 사용자 동의 없이, 개인정보를 추가 이용 및 제공하는 경우가 있나요?', description: 'd', uuid: 4 } }
  ];

  // Return an element
  return (
    <CustomCollapse content={content} />
  );
}
/**
 * [Inner Component] Create a document content (step4)
 */
 const CreateDocumentFormContent04 = (): JSX.Element => {
  const content: CollapseData[] = [
    { header: { title: '가명정보를 처리하나요?', description: 'a', uuid: 1 } },
    { header: { title: '제3자에게 제공하는 가명정보가 있나요?', description: 'b', uuid: 2 } },
    { header: { title: '위탁하는 가명정보가 있나요?', description: 'c', uuid: 3 } },
  ];

  // Return an element
  return (
    <CustomCollapse content={content} />
  );
}
/**
 * [Inner Component] Create a custom collapse
 */
const CustomCollapse = ({ content }: any): JSX.Element => {
  // Set a local state
  const [activeKey, setActiveKey] = useState<string[]>([]);
  // Create an event handler (onChange)
  const onChange = (active: boolean, target: string) => {
    const index: number = activeKey.findIndex((key: string): boolean => key === target);
    if (active) {
      index === -1 ? setActiveKey([...activeKey, target]) : undefined;
    } else {
      index > -1 ? index === activeKey.length -1 ? setActiveKey([...activeKey.slice(0, index)]) : setActiveKey([...activeKey.slice(0, index), ...activeKey.slice(index + 1)]) : undefined;
    }
  }

  // Create the collapse panels
  const panels: JSX.Element[] = content.map((item: CollapseData, index: number): JSX.Element => (<CollapsePanel children={item.content} header={item.header} key={index} id={index.toString()} onChange={onChange}></CollapsePanel>));
  // Return an element
  return (
    <StyledCollapse activeKey={activeKey}>{panels}</StyledCollapse>
  );
}
/**
 * [Inner Component] Collapse panel
 */
const CollapsePanel = ({ children, header, id, onChange, ...props }: CollapseStatusExtraProps): JSX.Element => {
  // Set a radio option data
  const options: RadioOptionData[] = [{ label: '예', value: 'yes' }, { label: '아니요', value: 'no' }];

  // Create an extra element
  const extraElement: JSX.Element = (
    <Radio.Group buttonStyle='outline' defaultValue='no' onChange={(e: any): void => onChange(e.target.value === 'yes' ? true : false, id)} options={options} optionType='button' />
  );
  // Create a header element
  const headerElement: JSX.Element = (
    <Space align='center'>
      <>{header.title}</>
      {header.description && header.description !== '' ? (
        <Popover content={header.description}>
          <span style={{ alignItems: 'center', color: '#949593', display: 'flex', fontSize: '14px', marginLeft: '0.25rem' }}>
            <QuestionCircleOutlined />
          </span>
        </Popover>
      ) : (<></>)}
    </Space>
  );

  // Return an element
  return (<Collapse.Panel extra={extraElement} header={headerElement} key={id} {...props}>{children}</Collapse.Panel>);
}