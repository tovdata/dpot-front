import React from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
// Component
import { Button, Col, Collapse, Divider, Input, Modal, Radio, Row, Space, TreeSelect } from 'antd';
import { PageHeaderContainStep } from './common/Header';
import { DocumentTable, setDataSource, StyledTableForm, TableFormHeader } from './common/Table';
import { CollapseForPIPP, CollapsePanelHeaderData } from './common/Collapse';
// Data
import { personalInfoProcessingPolicyTableHeader } from '../models/data';
import { personalInfoProcessingPolicy } from '../models/temporary';
// Icon
import { PlusOutlined } from '@ant-design/icons'
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
  webLog: CollapsePanelHeaderData;
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
  const tableTools: JSX.Element = (
    <div style={{ display: 'flex' }}>
      <Input.Search onChange={onChangeFilterValue} onSearch={onSearch} placeholder='문서 검색' style={{ marginRight: '16px', minWidth: '266px' }} value={value} />
      <Button icon={<PlusOutlined />} onClick={onCreate} type='primary'>문서 만들기</Button>
    </div>
  );
  // Return an element
  return (
    <>
      <StyledTableForm>
        <TableFormHeader title='개인정보 처리방침' tools={tableTools} />
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
    etc: {
      description: 'd',
      title: '별도의 사용자 동의 없이, 개인정보를 추가 이용 및 제공하는 경우가 있나요?'
    }
  }

  // Set a local state
  const [data, setData] = useState<any>({
    cookie: {
      purpose: [],
      method: [],
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
    etc: {
      items: [],
      purpose: [],
      period: '',
      usage: undefined
    }
  });

  // Create an event handler
  const onOpenPanel = (target: string, status: boolean): void => {
    setData({ ...data, [target]: { ...data[target], usage: status } });
  }
  const onChange = (category: string, property: string, value: string|string[]): void => {
    setData({ ...data, [category]: { ...data[category], [property]: value } });
  }
  // Create an event handler (onMoveStep)
  const onMoveStep = (type: string): void => {
    if (type === 'prev') {
      current - 1 >= 0 ? setCurrent(current - 1) : undefined;
    } else {
      current + 1 <= steps.length ? setCurrent(current + 1) : undefined;
    }
  }

  // Set a hook
  useEffect(() => {
    if (current === 0) {
      setContent(<CollapseForPIPP collapseItems={collapseItems} data={data} onChange={onChange} onOpenPanel={onOpenPanel} />);
    } else if (current === 1) {
      setContent(<CreatePIPP />);
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

const StyledCIForm = styled.div``;
const StyledCIFormHeader = styled.div`
  margin-bottom: 8px;
`;
const StyledCITitle = styled.h2`
  color: #002766;
  font-size: 14px;
  font-weight: 600;
  line-height: 22px;
  margin-bottom: 10px;
`;
const StyledCISubject = styled.h3`
  color: #000000;
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
  margin-bottom: 8px;
`;
const StyledCIDescription = styled.p`
  color: rgba(0, 0, 0, 0.45);
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
  margin-bottom: 0;
`;
//
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
const CreatePIPP: React.FC = (): JSX.Element => {
  const [data, setData] = useState<string[]>([]);
  const treeData = [{
    title: '통신비밀보호법',
    value: 'a',
    key: 'a',
    children: [{
      title: 'a1',
      value: 'a1',
      key: 'a1'
    }]
  }, {
    title: '전자상거래법',
    value: 'b',
    key: 'b',
    children: [{
      title: '대금결제 및 재화 등의 공급에 관한 기록 (5년)',
      value: 'b1',
      key: 'b1'
    }, {
      title: '계약 또는 청약철회 등에 관한 기록 (5년)',
      value: 'b2',
      key: 'b2'
    }, {
      title: '소비자의 불만 또는 분쟁처리에 관한 기록 (3년)',
      value: 'b3',
      key: 'b3'
    }, {
      title: '표시 광고에 관한 기록 (9개월)',
      value: 'b4',
      key: 'b4'
    }]
  }, {
    title: '전자금융거래법',
    value: 'c',
    key: 'c',
    children: [{
      title: 'c1',
      value: 'c1',
      key: 'c1'
    }]
  }, {
    title: '신용정보법',
    value: 'd',
    key: 'd',
    children: [{
      title: '신용정보의 수집・처리 및 이용에 관한 기록(3년)',
      value: 'd1',
      key: 'd1'
    }]
  }];
  const onChange = (value: string[]) => {
    setData(value);
  }

  const [doc, setDoc] = useState<any>({
    name: '',
    processChildInfo: {
      enable: false,
      items: [],
      confirmMethod: []
    }
  });

  return (
    <Row gutter={74} style={{ height: 'calc(100vh - 398px)' }}>
      <Col span={12} style={{ height: '100%', overflowY: 'auto' }}>
        <StyledCIForm>
          <StyledCIFormHeader>
            <StyledCITitle>개인정보 처리자명 또는 서비스명</StyledCITitle>
            <StyledCIDescription>개인정보 처리방침에 사용될 개인정보처리자명 또는 서비스명을 입력해주세요.</StyledCIDescription>
          </StyledCIFormHeader>
          <div>
            <Input allowClear placeholder='개인정보 처리자명 또는 서비스명' />
          </div>
        </StyledCIForm>
        <Divider dashed style={{ marginBottom: 30, marginTop: 30 }} />
        <StyledCIForm>
          <StyledCIFormHeader>
            <StyledCITitle>개인정보의 처리목적, 수집 항목, 보유 및 이용기간</StyledCITitle>
            <StyledCIDescription>해당 서비스에서 개인정보를 수집・이용하는 모든 내용이 작성되어야 합니다.<br/>수정을 원하시는 경우, ‘수정하기' 버튼을 눌러주세요.</StyledCIDescription>
          </StyledCIFormHeader>
          <div>
            <StyledCISubject>관계 법령에 따른 개인정보의 보유 및 이용기간</StyledCISubject>
            <TreeSelect treeData={treeData} treeCheckable={true} showCheckedStrategy={TreeSelect.SHOW_PARENT} onChange={onChange} placeholder='예시에서 선택' style={{ width: '100%' }} value={data} />
          </div>
        </StyledCIForm>
        <Divider dashed style={{ marginBottom: 30, marginTop: 30 }} />
        <StyledCIForm>
          <StyledCIFormHeader>
            <StyledCITitle>만 14세 미만 아동의 개인정보를 처리하나요?</StyledCITitle>
          </StyledCIFormHeader>
          <div style={{ marginBottom: 8 }}>
            <StyledCISubject>만 14세 미만 아동 회원 가입 시, 수집하는 법정대리인 필수 항목</StyledCISubject>
            <Input />
          </div>
          <div>
            <StyledCISubject>법정대리인의 동의 확인 방법</StyledCISubject>
            <Input />
          </div>
        </StyledCIForm>
        <Divider dashed style={{ marginBottom: 30, marginTop: 30 }} />
        <StyledCIForm>
          <StyledCIFormHeader>
            <StyledCITitle>개인정보의 제3자 제공</StyledCITitle>
            <StyledCIDescription>해당 서비스에서 개인정보를 수집・이용하는 모든 내용이 작성되어야 합니다.<br/>수정을 원하시는 경우, ‘수정하기' 버튼을 눌러주세요.</StyledCIDescription>
          </StyledCIFormHeader>
        </StyledCIForm>
        <Divider dashed style={{ marginBottom: 30, marginTop: 30 }} />
        <StyledCIForm>
          <StyledCIFormHeader>
            <StyledCITitle>개인정보의 위탁</StyledCITitle>
            <StyledCIDescription>해당 서비스에서 개인정보를 수집・이용하는 모든 내용이 작성되어야 합니다.<br/>수정을 원하시는 경우, ‘수정하기' 버튼을 눌러주세요.</StyledCIDescription>
          </StyledCIFormHeader>
        </StyledCIForm>
        <Divider dashed style={{ marginBottom: 30, marginTop: 30 }} />
        <StyledCIForm>
          <StyledCIFormHeader>
            <StyledCITitle>개인정보의 파기</StyledCITitle>
            <StyledCIDescription>본 내용은 필수 항목으로 반드시 들어가야합니다.</StyledCIDescription>
          </StyledCIFormHeader>
        </StyledCIForm>
        <Divider dashed style={{ marginBottom: 30, marginTop: 30 }} />
        <StyledCIForm>
          <StyledCIFormHeader>
            <StyledCITitle>미이용자의 개인정보 파기 등에 관한 조치</StyledCITitle>
            <StyledCIDescription>개인정보 보호법에 따라, 서비스를 1년간 이용하지 않은 이용자의 정보는 파기하거나 분리보관해야합니다.<br/>개인정보보호위원회에서는 이에 대한 조치 사항을 처리방침에 기재할 것을 권고하고 있으며, 필수 기재항목은 아닙니다.</StyledCIDescription>
          </StyledCIFormHeader>
          <div>
            <Radio.Group>
              <Space direction='vertical'>
                <Radio value={1}>장기 미접속자의 개인정보를 파기합니다.</Radio>
                <Radio value={2}>장기 미접속자의 개인정보를 분리보관합니다.</Radio>
                <Radio value={3}>기재안함</Radio>
              </Space>
            </Radio.Group>
          </div>
        </StyledCIForm>
        <Divider dashed style={{ marginBottom: 30, marginTop: 30 }} />
        <StyledCIForm>
          <StyledCIFormHeader>
            <StyledCITitle>정보주체와 법정대리인의 권리·의무 및 행사방법</StyledCITitle>
            <StyledCIDescription>본 내용은 필수 항목으로 반드시 들어가야합니다.</StyledCIDescription>
          </StyledCIFormHeader>
        </StyledCIForm>
        <Divider dashed style={{ marginBottom: 30, marginTop: 30 }} />
        <StyledCIForm>
          <StyledCIFormHeader>
            <StyledCITitle>개인정보의 안전성 확보조치</StyledCITitle>
            <StyledCIDescription>본 내용은 필수 항목으로 반드시 들어가야합니다.</StyledCIDescription>
          </StyledCIFormHeader>
          <div>
            <StyledCISubject>개인정보를 저장하는 물리적인 공간(전산실, 자료보관실 등)이 있나요?</StyledCISubject>
            <Radio.Group optionType='button' buttonStyle='solid' options={[{ label: '예', value: 'yes' }, { label: '아니오', value: 'no' }]} />
          </div>
          <div>
            <StyledCISubject>개인정보보호 활동을 하거나 국내외 개인정보보호 인증을 보유하고 있나요?</StyledCISubject>
            <Radio.Group optionType='button' buttonStyle='solid' options={[{ label: '예', value: 'yes' }, { label: '아니오', value: 'no' }]} />
          </div>
          <div>
            <StyledCISubject>개인정보보호 활동</StyledCISubject>
            <Input allowClear placeholder='(직접입력) 소셜미디어 운영, 투명성 보고서 발간 등'/>
          </div>
          <div>
            <StyledCISubject>국내외 개인정보보호 인증 획득</StyledCISubject>
            <Input />
          </div>
        </StyledCIForm>
        <Divider dashed style={{ marginBottom: 30, marginTop: 30 }} />
        <StyledCIForm>
          <StyledCIFormHeader>
            <StyledCITitle>개인정보 자동 수집 장치의 설치·운영 및 거부에 관한 사항</StyledCITitle>
            <StyledCIDescription>쿠키 등 자동 수집 장치를 사용하는 경우, 그에 대한 모든 내용이 작성되어야 합니다.<br/>수정을 원하시는 경우, ‘수정하기' 버튼을 눌러주세요.</StyledCIDescription>
          </StyledCIFormHeader>
        </StyledCIForm>
        <Divider dashed style={{ marginBottom: 30, marginTop: 30 }} />
        <StyledCIForm>
          <StyledCIFormHeader>
            <StyledCITitle>행태정보의 수집·이용 및 거부 등에 관한 사항</StyledCITitle>
            <StyledCIDescription>행태정보를 사용하는 경우, 그에 대한 모든 내용이 작성되어야 합니다.<br/>수정을 원하시는 경우, ‘수정하기' 버튼을 눌러주세요.</StyledCIDescription>
          </StyledCIFormHeader>
        </StyledCIForm>
        <Divider dashed style={{ marginBottom: 30, marginTop: 30 }} />
        <StyledCIForm>
          <StyledCIFormHeader>
            <StyledCITitle>추가적인 이용·제공 판단기준</StyledCITitle>
            <StyledCIDescription>사용자의 동의 없이 추가 이용하는 경우, 그에 대한 모든 내용이 작성되어야 합니다.<br/>수정을 원하시는 경우, ‘수정하기' 버튼을 눌러주세요.</StyledCIDescription>
          </StyledCIFormHeader>
        </StyledCIForm>
        <Divider dashed style={{ marginBottom: 30, marginTop: 30 }} />
        <StyledCIForm>
          <StyledCIFormHeader>
            <StyledCITitle>가명정보의 처리</StyledCITitle>
            <StyledCIDescription>가명정보를 사용하는 경우, 그에 대한 모든 내용이 작성되어야 합니다.<br/>수정을 원하시는 경우, ‘수정하기' 버튼을 눌러주세요.</StyledCIDescription>
          </StyledCIFormHeader>
        </StyledCIForm>
        <Divider dashed style={{ marginBottom: 30, marginTop: 30 }} />
        <StyledCIForm>
          <StyledCIFormHeader>
            <StyledCITitle>개인정보보호책임자 및 개인정보 열람청구</StyledCITitle>
            <StyledCIDescription>쿠키 등 자동 수집 장치를 사용하는 경우, 그에 대한 모든 내용이 작성되어야 합니다.<br/>수정을 원하시는 경우, ‘수정하기' 버튼을 눌러주세요.</StyledCIDescription>
          </StyledCIFormHeader>
        </StyledCIForm>
        <Divider dashed style={{ marginBottom: 30, marginTop: 30 }} />
        <StyledCIForm>
          <StyledCIFormHeader>
            <StyledCITitle>권익침해 구제방법</StyledCITitle>
            <StyledCIDescription>본 내용은 필수 항목으로 반드시 들어가야합니다.</StyledCIDescription>
          </StyledCIFormHeader>
        </StyledCIForm>
        <Divider dashed style={{ marginBottom: 30, marginTop: 30 }} />
        <StyledCIForm>
          <StyledCIFormHeader>
            <StyledCITitle>영상정보처리기기(CCTV)를 운영하나요?</StyledCITitle>
            <StyledCIDescription>쿠키 등 자동 수집 장치를 사용하는 경우, 그에 대한 모든 내용이 작성되어야 합니다.<br/>수정을 원하시는 경우, ‘수정하기' 버튼을 눌러주세요.</StyledCIDescription>
          </StyledCIFormHeader>
        </StyledCIForm>
      </Col>
      <Col span={12} style={{ borderLeft: '1px solid rgba(156, 156, 156, 0.3)', height: '100%', overflowY: 'auto' }}>
        <StyledCDTitle>{} 개인정보 처리방침</StyledCDTitle>
        <StyledCDForm>
          <StyledCDText>{}은(는) 정보주체의 자유와 권리 보호를 위해 「개인정보 보호법」 및 관계 법령이 정한 바를 준수하여, 적법하게 개인정보를 처리하고 안전하게 관리하고 있습니다. 이에 「개인정보 보호법」 제30조에 따라 정보주체에게 개인정보 처리에 관한 절차 및 기준을 안내하고, 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리방침을 수립·공개합니다.</StyledCDText>
        </StyledCDForm>
      </Col>
    </Row>
  );
}