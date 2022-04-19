import { useEffect, useState } from 'react';
import styled from 'styled-components';
// Component
import { Button, Collapse, Input, Modal, Popover, Radio, Space } from 'antd';
import { PageHeaderContainStep } from './common/Header';
import { DocumentTable, setDataSource, StyledTableForm, TableFormHeader } from './common/Table';
import { CollapseForPIPP, CollapsePanelHeaderData } from './common/Collapse';
// Data
import { personalInfoProcessingPolicyTableHeader } from '../models/data';
import { personalInfoProcessingPolicy } from '../models/temporary';
// Icon
import { PlusOutlined, QuestionCircleOutlined } from '@ant-design/icons'
// Module
import { createWarningMessage } from './common/Notification';

// Styled element
const StyledCollapse = styled(Collapse)`
  .ant-collapse-item > .ant-collapse-header {
    align-items: center;
    display: flex;
    user-select: none;
  }
`;
// Styled element (modal)
const StyledCreateModal = styled(Modal)`
  .ant-modal-body {
    padding: 0 1.5rem 1rem 1.5rem;
  }
  .ant-modal-footer {
    border-top: none;
    padding: 0.75rem 1.5rem 1rem 1.5rem;
  }
  .ant-modal-header {
    border-bottom: none;
    padding: 1.5rem 1.5rem 0.5rem 1.5rem;
  }
  .description {
    font-size: 12px;
    font-weight: 400;
    line-height: 20px;
    margin-bottom: 1.5rem;
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
/** [Interface] Collapse headers data */
interface PIPPBasicInfo {
  cookie: CollapsePanelHeaderData;
  advertising: CollapsePanelHeaderData;
  thirdParty: CollapsePanelHeaderData;
  etc: CollapsePanelHeaderData;
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
      <StyledCreateModal cancelText='취소' centered onCancel={onClose} onOk={onCreate} okText='완료' title='개인정보 처리방침명 입력' visible={openModal}>
        <p className='description'>개인정보 처리방침을 생성하는 동안, 다른 탭에서는 내용을 수정할 수 없으며,<br/>문서 저장 시, 문서에서 입력된 데이터로 변경됩니다.</p>
        <Input allowClear onChange={onChangeName} placeholder='주식회사 OOOO 개인정보 처리방침' status={focus ? 'error' : undefined} type='text' value={name} />
      </StyledCreateModal>
    </>
  );
}
/**
 * [Component] Create a document form (for pipp)
 */
export const CreateDocumentForm = ({ onBack }: CreateDocumentFormProps): JSX.Element => {
  // Set a local state
  const [current, setCurrent] = useState<number>(0);
  const [content, setContent] = useState<JSX.Element>(<></>);
  
  // Step data
  const steps: string[] = ["내용 입력", "처리방침 편집", "검토"];
  // Collapse content data
  const collapseItems: PIPPBasicInfo = {
    cookie: {
      description: 'a',
      title: '쿠키(cookie)를 사용하나요?'
    },
    advertising: {
      description: 'b',
      title: '타겟 광고를 위하여 사용자의 행태정보를 사용하나요?'
    },
    thirdParty: {
      description: 'c',
      precedence: 'advertising',
      title: '사용자의 행태정보를 제3자(온라인 광고사업자 등)가 수집・처리할 수 있도록 허용한 경우가 있나요?'
    },
    etc: {
      description: 'd',
      title: '별도의 사용자 동의 없이, 개인정보를 추가 이용 및 제공하는 경우가 있나요?'
    }
  }

  // Set a local state (for open panel status)
  const [openPanel, setOpenPanel] = useState<any>({ cookie: undefined, advertising: undefined, thirdParty: undefined, etc: undefined });
  // Set a local state
  const [data, setData] = useState<any>({
    cookie: {
      purpose: [],
      method: [],
      disadvantage: ''
    },
    advertising: {
      items: [],
      method: '',
      purpose: [],
      period: ''
    },
    thirdParty: {
      company: [],
      items: [],
      method: '',
      period: ''
    },
    etc: {
      items: [],
      purpose: [],
      period: ''
    }
  });

  // Create an event handler
  const onOpenPanel = (target: string, status: boolean): void => {
    if (target === 'advertising' && !status) {
      setOpenPanel({...openPanel, [target]: status, 'thirdParty': undefined});
    } else {
      setOpenPanel({...openPanel, [target]: status});
    }
  }

  // Create an event handler (onMoveStep)
  const onMoveStep = (type: string): void => {
    if (type === 'prev') {
      current - 1 >= 0 ? setCurrent(current - 1) : undefined;
    } else {
      if (current === 0 && Object.keys(openPanel).some((key: string): boolean => key === 'thirdParty' && openPanel.advertising === false ? false : openPanel[key] === undefined)) {
        createWarningMessage('모든 입력 양식에 대해 응답 및 작성을 해주세요.', 2)
      } else {
        current + 1 <= steps.length ? setCurrent(current + 1) : undefined;
      }
    }
  }

  // Set a hook
  useEffect(() => {
    if (current === 0) {
      setContent(<CollapseForPIPP collapseItems={collapseItems} openPanel={openPanel} onOpenPanel={onOpenPanel} />);
    } else if (current === 1) {
      setContent(<>Step 2</>);
    } else if (current === 2) {
      setContent(<>Step 3</>);
    }
  }, [current, openPanel]);

  // Return an element
  return (
    <>
      <PageHeaderContainStep current={current} goTo='/doc/pipp' onBack={onBack} onMove={onMoveStep} title='개인정보 처리방침 만들기' steps={steps} />
      <>{content}</>
    </>
  );
}