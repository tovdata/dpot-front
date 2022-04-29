import React from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
// Component
import { Button, Col, Collapse, Divider, Input, Modal, Radio, Row, Space, TreeSelect } from 'antd';
import { DocumentProcessingStatusHeader, PageHeaderContainStep } from './common/Header';
import { DocumentTable, setDataSource, StyledTableForm, TableFormHeader } from './common/Table';
import { CollapseForPIPP, CollapsePanelHeaderData } from './common/Collapse';
import { createWarningMessage } from './common/Notification';
import { YesOrNoRadioButton } from './common/Radio';
import { TagSelect } from './common/Select';
// Data
import { ChildrenInfoProcessingByRelation, PeriodForPersonalInfoByRelation, personalInfoProcessingPolicyTableHeader } from '../models/data';
import { personalInfoProcessingPolicy } from '../models/temporary';
// Icon
import { PlusOutlined } from '@ant-design/icons'

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
  webLog: CollapsePanelHeaderData;
  advertising: CollapsePanelHeaderData;
  thirdParty: CollapsePanelHeaderData;
  additional: CollapsePanelHeaderData;
}

/**
 * [Component] Table for personal information processing policy
 */
export const PIPPTable = ({ onSelect }: PIPPTableProps): JSX.Element => {
  // Set a local state (for data)
  const [data, setData] = useState<any[]>(setDataSource(personalInfoProcessingPolicy));
  const [filter, setFilter] = useState<any[]>(data);
  // Set a local state (for control)
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [value, setValue] = useState<string>('');

  // Create an event handler (onCreate)
  const onCreate = (): void => {
    onSelect({ name: name, uuid: 'new' });
  }
  const onChangeFilterValue = (e: any): void => setValue(e.target.value);
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
  const tableTools: JSX.Element = (<Input.Search onChange={onChangeFilterValue} onSearch={onSearch} placeholder='문서 검색' style={{ minWidth: '266px' }} value={value} />);
  // Return an element
  return (
    <>
      <DocumentProcessingStatusHeader description='asdf' onClick={onCreate} status='processing' style={{ marginBottom: 90 }} title='개인정보 처리방침' />
      <StyledTableForm>
        <TableFormHeader title='개인정보 처리방침 이력' tools={tableTools} />
        <DocumentTable dataSource={filter} headers={personalInfoProcessingPolicyTableHeader} onDelete={onDelete} pagination={true} />
      </StyledTableForm>
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
    webLog: {
      description: 'a',
      title: '웹 로그 분석도구를 사용하시나요? (ex. 구글 애널리틱스)'
    },
    advertising: {
      description: 'b',
      title: '타겟 광고를 위하여 사용자의 행태정보를 사용하나요?'
    },
    thirdParty: {
      description: 'c',
      title: '사용자의 행태정보를 제3자(온라인 광고사업자 등)가 수집・처리할 수 있도록 허용한 경우가 있나요?'
    },
    additional: {
      description: 'd',
      title: '별도의 사용자 동의 없이, 개인정보를 추가 이용 및 제공하는 경우가 있나요?'
    }
  }

  // Set a local state
  const [data, setData] = useState<any>({
    additionalInfo: {
      cookie: {
        purpose: [],
        disadvantage: [],
        usage: undefined
      },
      webLog: {
        purpose: [],
        method: [],
        disadvantage: '서비스 이용에 불이익은 없습니다. 다만, 서비스 개선을 위한 통계 분석에 영향을 미칠 수 있습니다.',
        usage: undefined
      },
      advertising: {
        items: [],
        method: '이용자가 서비스 방문 및 실행 시 자동 수집',
        purpose: '이용자의 관심, 성향에 기반한 개인 맞춤형 상품추천 서비스(광고 포함)를 제공',
        period: '',
        usage: undefined
      },
      thirdParty: {
        company: [],
        items: [],
        method: '이용자가 당사 웹 사이트를 방문하거나 앱을 실행할 때, 자동 수집 및 전송',
        period: '',
        usage: undefined
      },
      additional: {
        items: [],
        purpose: [],
        period: '',
        usage: undefined
      }
    },
    doc: {
      name: '',
      period: [],
      children: {
        items: [],
        method: [],
        usage: undefined
      }
    }
  });

  const onChange = (step: string, category: string, property: string|undefined, value: any): void => {
    property !== undefined ? setData({ ...data, [step]: { ...data[step], [category]: { ...data[step][category], [property]: value } } }) : setData({ ...data, [step]: { ...data[step], [category]: value } });
  }
  // Create an event handler (onMoveStep)
  const onMoveStep = (type: string): void => {
    if (type === 'prev') {
      current - 1 >= 0 ? setCurrent(current - 1) : undefined;
    } else {
      // 스탭에 따라 내용 입력확인
      if (current === 0) {
        if (Object.keys(data.additionalInfo).some((key: string): boolean => data.additionalInfo[key].usage === undefined)) {
          createWarningMessage('모든 사항에 대해 입력해주세요', 2);
        } else {
          current + 1 <= steps.length ? setCurrent(current + 1) : undefined;
        }
      } else {
        current + 1 <= steps.length ? setCurrent(current + 1) : undefined;
      }
    }
  }

  // Set a hook
  useEffect(() => {
    if (current === 0) {
      setContent(<CollapseForPIPP collapseItems={collapseItems} data={data.additionalInfo} onChange={onChange} />);
    } else if (current === 1) {
      setContent(<CreatePIPP data={data.doc} onChange={onChange} />);
    } else if (current === 2) {
      setContent(<>Step 3</>);
    }
  }, [current, data]);

  // Return an element
  return (
    <>
      <PageHeaderContainStep current={current} goTo='/doc/pipp' onBack={onBack} onMove={onMoveStep} title='개인정보 처리방침 만들기' steps={steps} />
      <>{content}</>
    </>
  );
}

const StyledCDTitle = styled.h2`
  font-size: 16px;
  font-weight: 700;
  line-weight: 22px;
  margin-bottom: 30px;
  text-align: center;
`;
const StyledCDForm = styled.div`
  font-size: 13px;
  font-weight: 400;
  line-height: 22px;
  margin-bottom: 40px;
`;
const StyledCDText = styled.p`
  margin-bottom: 0;
`;

/** [Styled component] 개인정보 처리방침 편집 부분 Row */
const CIRow = styled.div`
  .ant-collapse-content-box,
  .ant-collapse-header {
    padding: 0 !important;
  }
  .ant-collapse-header > .row-header {
    margin-bottom: 0;
  }
`;
/** [Styled component] 개인정보 처리방침 편집 부분 Subject */
const CISubject = styled.h4`
  color: #000000;
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
  margin-bottom: 8px;
`;
/**
 * [Internal Component] 개인정보 처리방침 편집 부분 Row header
 */
const CIRowHeader: React.FC<any> = ({ description, style, title, tools }: any): JSX.Element => {
  return (
    <div className='row-header' style={{ marginBottom: 8, width: '100%', ...style  }}>
      <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between'}}>
        <h2 style={{ color: '#002766', fontSize: 14, fontWeight: '600', lineHeight: '22px', marginBottom: 0 }}>{title}</h2>
        <>{tools}</>
      </div>
      {description ? (
        <p style={{ color: 'rgba(0, 0, 0, 0.45)', fontSize: 12, fontWeight: 400, lineHeight: '20px', marginBottom: 0, marginTop: 10 }}>{description}</p>
      ) : (<></>)}
    </div>
  );
}
/**
 * [Internal Component] 개인정보 처리방침 편집 부분 Row content
 */
const CIRowContent: React.FC<any> = ({ children }: any): JSX.Element => {
  return (<div style={{ position: 'relative' }}>{children}</div>);
}
/**
 * [Internal Component] 개인정보 처리방침 미리보기 부분 Row header
 */
const CDRowHeader: React.FC<any> = ({ title }: any): JSX.Element => {
  return (<h2 style={{ color: '#000000', fontSize: 14, fontWeight: '600', lineHeight: '22px', marginBottom: 8 }}>{title}</h2>);
}

const CreatePIPP: React.FC<any> = ({ onChange, data }: any): JSX.Element => {
  const THIS_STEP: string = 'doc';

  return (
    <Row gutter={74} style={{ height: 'calc(100vh - 398px)' }}>
      <Col span={12} style={{ height: '100%', overflowY: 'auto' }}>
        <CIRow>
          <CIRowHeader description='개인정보 처리방침에 사용될 개인정보처리자명 또는 서비스명을 입력해주세요.' title='개인정보 처리자명 또는 서비스명' />
          <CIRowContent>
            <Input allowClear onChange={(e: any) => onChange('doc', 'name', undefined, e.target.value)} placeholder='개인정보 처리자명 또는 서비스명' />
          </CIRowContent>
        </CIRow>
        <Divider dashed style={{ marginBottom: 30, marginTop: 30 }} />
        <CIRow>
          <CIRowHeader description='해당 서비스에서 개인정보를 수집・이용하는 모든 내용이 작성되어야 합니다. 수정을 원하시는 경우, "수정하기" 버튼을 눌러주세요.' title='개인정보의 처리목적, 수집 항목, 보유 및 이용기간' />
          <CIRowContent>
            <CISubject>관계 법령에 따른 개인정보의 보유 및 이용기간</CISubject>
            <TreeSelect treeData={PeriodForPersonalInfoByRelation} treeCheckable={true} showCheckedStrategy={TreeSelect.SHOW_PARENT} onChange={(value: string[]): void => onChange(THIS_STEP, 'period', undefined, value)} placeholder='예시에서 선택' style={{ width: '100%' }} value={data.period} />
          </CIRowContent>
        </CIRow>
        <Divider dashed style={{ marginBottom: 30, marginTop: 30 }} />
        <CIRow>
          <Collapse activeKey={data.children.usage ? ['1'] : []} ghost>
            <Collapse.Panel header={<CIRowHeader style={{ marginBottom: 0 }} title='만 14세 미만 아동의 개인정보를 처리하나요?' tools={<YesOrNoRadioButton onChange={(e: any) => onChange(THIS_STEP, 'children', 'usage', e.target.value)} />} />} key='1' showArrow={false}>
              <div style={{ marginBottom: 8 }}>
                <CISubject>만 14세 미만 아동 회원 가입 시, 수집하는 법정대리인 필수 항목</CISubject>
                <TagSelect onChange={(value: string|string[]): void => onChange(THIS_STEP, 'children', 'items', value)} options={['aaaa', 'bbbb', 'cccc']} value={data.children.items} />
              </div>
              <div>
                <CISubject>법정대리인의 동의 확인 방법</CISubject>
                <TreeSelect treeData={ChildrenInfoProcessingByRelation.map((item: string): any => ({ label: item, title: item, value: item }))} onChange={(value: string[]): void => onChange(THIS_STEP, 'children', 'method', value)} treeCheckable={true} placeholder='예시에서 선택' style={{ width: '100%' }} value={data.children.method} />
              </div>
            </Collapse.Panel>
          </Collapse>          
        </CIRow>
        <Divider dashed style={{ marginBottom: 30, marginTop: 30 }} />
        <CIRow>
          <CIRowHeader description='개인정보 처리방침에 사용될 개인정보처리자명 또는 서비스명을 입력해주세요.' title='개인정보를 제3자에게 제공하나요?' />
        </CIRow>
      </Col>
      <Col span={12} style={{ borderLeft: '1px solid rgba(156, 156, 156, 0.3)', height: '100%', overflowY: 'auto' }}>
        <StyledCDTitle>{data.name} 개인정보 처리방침</StyledCDTitle>
        <StyledCDForm>
          <StyledCDText>{data.name}은(는) 정보주체의 자유와 권리 보호를 위해 「개인정보 보호법」 및 관계 법령이 정한 바를 준수하여, 적법하게 개인정보를 처리하고 안전하게 관리하고 있습니다. 이에 「개인정보 보호법」 제30조에 따라 정보주체에게 개인정보 처리에 관한 절차 및 기준을 안내하고, 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리방침을 수립·공개합니다.</StyledCDText>
        </StyledCDForm>
        {data.children.usage ? (
          <StyledCDForm>
            <CDRowHeader title='◾️ 만 14세 미만 아동의 개인정보 처리에 관한 사항' />
            <StyledCDText>
              ① 회사는 만 14세 미만 아동에 대해 개인정보를 수집할 때 법정대리인의 동의를 얻어 해당 서비스 수행에 필요한 최소한의 개인정보를 수집합니다.<br/>
              <ul style={{ marginBottom: 0, paddingLeft: 18 }}><li>필수항목 : {data.children.items.join(', ')}</li></ul>
              ② 또한, 회사는 아동의 개인정보를 추가로 수집하거나 홍보 및 마케팅을 위하여 처리할 경우에는 법정대리인으로부터 별도의 동의를 얻습니다.<br/>
              ③ 회사는 만 14세 미만 아동의 개인정보를 수집할 때에는 아동에게 법정대리인의 성명, 연락처와 같이 최소한의 정보를 요구할 수 있으며, 다음 중 하나의 방법으로 적법한 법정대리인이 동의하였는지를 확인합니다.<br/>
              <ul style={{ marginBottom: 0, paddingLeft: 18 }}>{data.children.method.map((item: string, index: number): JSX.Element => <li key={index}>{item}</li>)}</ul>
            </StyledCDText>
          </StyledCDForm>
        ) : (<></>)}
      </Col>
    </Row>
  );
}