import { useEffect, useState } from 'react';
import styled from 'styled-components';
// Component
import { Button, Collapse, Input, Modal, Popover, Radio, Space } from 'antd';
import { PageHeaderContainStep } from './common/Header';
import { DocumentTable, setDataSource, StyledTableForm, TableFormHeader } from './common/Table';
import { CollapseContainToggle } from './common/Collapse';
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
/** [Interface] Properties for collapse status extra */
interface CollapseStatusExtraProps {
  children?: JSX.Element | JSX.Element[];
  collapsible?: any;
  disabled?: boolean;
  header: CollapseHeaderData;
  id: string;
  onChange: (active: boolean, target: string) => void;
}
/** [Interface] Collapse data */
interface CollapseData {
  content?: any;
  header: CollapseHeaderData;
}
/** [Interface] Collapse header data */
interface CollapseHeaderData {
  description?: string;
  id: number|string;
  precedence?: string|number;
  title: string;
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
  const panels: CollapseHeaderData[]  = [
    { description: 'a', id: 0, title: '쿠키(cookie)를 사용하나요?' },
    { description: 'b', id: 1, title: '타겟 광고를 위하여 사용자의 행태정보를 사용하나요?' },
    { description: 'c', id: 2, precedence: 1, title: '사용자의 행태정보를 제3자(온라인 광고사업자 등)가 수집・처리할 수 있도록 허용한 경우가 있나요?' },
    { description: 'd', id: 3, title: '별도의 사용자 동의 없이, 개인정보를 추가 이용 및 제공하는 경우가 있나요?' },
  ]
  // Set a local state (for open panel status)

  // Set a local state
  const [data, setData] = useState<any>({
    0: {
      0: {
        header: {
          description: 'a',
          title: '쿠키(cookie)를 사용하나요?',
        },
        open: undefined,
      },
      1: {
        content: <></>,
        header: {
          description: 'a',
          title: '타겟 광고를 위하여 사용자의 행태정보를 사용하나요?',
        },
        open: undefined,
      },
      2: {
        content: <></>,
        header: {
          description: 'a',
          title: '사용자의 행태정보를 제3자(온라인 광고사업자 등)가 수집・처리할 수 있도록 허용한 경우가 있나요?',
        },
        open: undefined,
        precedence: 1
      },
      3: {
        content: <></>,
        header: {
          description: 'a',
          title: '별도의 사용자 동의 없이, 개인정보를 추가 이용 및 제공하는 경우가 있나요?',
        },
        open: undefined,
      }
    },
    1: {}
  });

  const [activeKey, setActiveKey] = useState<any>({ 0: undefined, 1: undefined, 2: undefined, 3: undefined });
  const onActiveKey = (open: boolean, target: string): void => {
    setActiveKey({...activeKey, [target]: open});
  }

  // Create an event handler (onMoveStep)
  const onMoveStep = (type: string): void => {
    if (type === 'prev') {
      current - 1 >= 0 ? setCurrent(current - 1) : undefined;
    } else {
      // Step 내에 모든 입력 양식에 대해 입력 완료하였을 경우에만 다음 단계로 이동
      if (Object.keys(data[current]).some((id: string): boolean => data[current][id].open === undefined)) {
        createWarningMessage('모든 입력 양식에 대해 응답 및 작성을 해주세요.', 2)
      } else {
        current + 1 <= steps.length ? setCurrent(current + 1) : undefined;
      }
    }
  }
  const onChange = (step: string, panelKey: number, value: any): void => {
    setData({...data, [step]: {...data[step], [panelKey]: {...data[step][panelKey], ...value}}});
  }

  // Set a hook
  useEffect(() => {
    if (current === 0) {
      setContent(<CollapseContainToggle activeKey={activeKey} panels={panels} onActiveKey={onActiveKey} />);
    } else if (current === 1) {
      setContent(<>Step 2</>);
    } else if (current === 2) {
      setContent(<>Step 3</>);
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
 * [Inner Component] Create a custom collapse
 */
// const CustomCollapse = ({ data, onChange, step }: any): JSX.Element => {
//   // Set a local state
//   const [activeKey, setActiveKey] = useState<string[]>([]);
//   // Create an event handler (onChange)
//   const onChangeStep = (active: boolean, target: string) => {
//     const index: number = activeKey.findIndex((key: string): boolean => key === target);
//     if (active) {
//       if (index === -1) {
//         setActiveKey([...activeKey, target]);
//         onChange(step, target, { open: true });
//       }
//     } else {
//       if (index > -1) {
//         index === activeKey.length -1 ? setActiveKey([...activeKey.slice(0, index)]) : setActiveKey([...activeKey.slice(0, index), ...activeKey.slice(index + 1)]);
//         onChange(step, target, { open: false });
//       }
//     }
//   }

//   // Create the collapse panels
//   const panels: JSX.Element[] = Object.keys(data).map((key: string, index: number): JSX.Element => (<CollapsePanel children={data[key].content} collapsible={data[key].precedence && !data[data[key].precedence].open ? 'disabled' : undefined} header={data[key].header} key={index} id={index.toString()} onChange={onChangeStep}></CollapsePanel>));
//   // Return an element
//   return (
//     <StyledCollapse activeKey={activeKey}>{panels}</StyledCollapse>
//   );
// }
/**
 * [Inner Component] Collapse panel
 */
const CollapsePanel = ({ children, collapsible, header, id, onChange, ...props }: CollapseStatusExtraProps): JSX.Element => {
  // Set a radio option data
  const options: RadioOptionData[] = [{ label: '예', value: 'yes' }, { label: '아니요', value: 'no' }];

  // Create an extra element
  const extraElement: JSX.Element = (
    <Radio.Group disabled={collapsible ? true : undefined} buttonStyle='outline' onChange={(e: any): void => onChange(e.target.value === 'yes' ? true : false, id)} options={options} optionType='button' />
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
  return (<Collapse.Panel collapsible={collapsible} extra={extraElement} header={headerElement} key={id} {...props}>{children}</Collapse.Panel>);
}