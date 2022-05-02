import React from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
// Component
import { Button, Col, Collapse, Divider, Form, Input, Modal, Radio, Row, Space, Table, TreeSelect } from 'antd';
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
      },
      provision: {
        data: [],
        usage: undefined
      },
      consignment: {
        data: [],
        usage: undefined
      },
      destruction: {},
      destructionUnused: {
        type: undefined
      },
      safety: {
        physical: undefined,
        activity: '',
        certification: [],
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

  // Return an element
  return (
    <>
      <PageHeaderContainStep current={current} goTo='/doc/pipp' onBack={onBack} onMove={onMoveStep} title='개인정보 처리방침 만들기' steps={steps} />
      <>
        <div style={{ display: current === 0 ? 'block' : 'none' }}>
          <CollapseForPIPP collapseItems={collapseItems} data={data.additionalInfo} onChange={onChange} />
        </div>
        <div style={{ display: current === 1 ? 'block' : 'none' }}>
          <CreatePIPP data={data} onChange={onChange} />
        </div>
        <div style={{ display: current === 2 ? 'block' : 'none' }}>
          <PreviewDocumentForPIPP data={data} />
        </div>
      </>
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
 * [Internal Component] 개인정보 처리방침 편집 부분 Row subject
 */
const CISubject: React.FC<any> = ({ style, subject, tools }: any): JSX.Element => {
  return (
    <div className='subject' style={{ marginBottom: 8, width: '100%', ...style  }}>
      <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between'}}>
        <h2 style={{ color: '#000000', fontSize: 14, fontWeight: '500', lineHeight: '22px', marginBottom: 0 }}>{subject}</h2>
        <>{tools}</>
      </div>
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
            <Input allowClear onChange={(e: any) => onChange('doc', 'name', undefined, e.target.value)} placeholder='개인정보 처리자명 또는 서비스명' value={data.doc.name} />
          </CIRowContent>
        </CIRow>
        <Divider dashed style={{ marginBottom: 30, marginTop: 30 }} />
        <CIRow>
          <CIRowHeader description='해당 서비스에서 개인정보를 수집・이용하는 모든 내용이 작성되어야 합니다. 수정을 원하시는 경우, "수정하기" 버튼을 눌러주세요.' title='개인정보의 처리목적, 수집 항목, 보유 및 이용기간' tools={<Button type='default' size='small' style={{ fontSize: 12 }}>수정하기</Button>} />
          <CIRowContent>
            <CISubject>관계 법령에 따른 개인정보의 보유 및 이용기간</CISubject>
            <TreeSelect treeData={PeriodForPersonalInfoByRelation} treeCheckable={true} showCheckedStrategy={TreeSelect.SHOW_PARENT} onChange={(value: string[]): void => onChange(THIS_STEP, 'period', undefined, value)} placeholder='예시에서 선택' style={{ width: '100%' }} value={data.doc.period} />
          </CIRowContent>
        </CIRow>
        <Divider dashed style={{ marginBottom: 30, marginTop: 30 }} />
        <CIRow>
          <Collapse activeKey={data.doc.children.usage ? ['1'] : []} ghost>
            <Collapse.Panel header={<CIRowHeader style={{ marginBottom: 0 }} title='만 14세 미만 아동의 개인정보를 처리하나요?' tools={<YesOrNoRadioButton onChange={(e: any): void => onChange(THIS_STEP, 'children', 'usage', e.target.value)} size='small' value={data.doc.children.usage} />} />} key='1' showArrow={false}>
              <div style={{ marginBottom: 8 }}>
                <CISubject subject='만 14세 미만 아동 회원 가입 시, 수집하는 법정대리인 필수 항목' />
                <TagSelect onChange={(value: string|string[]): void => onChange(THIS_STEP, 'children', 'items', value)} options={['aaaa', 'bbbb', 'cccc']} value={data.doc.children.items} />
              </div>
              <div>
                <CISubject subject='법정대리인의 동의 확인 방법' />
                <TreeSelect treeData={ChildrenInfoProcessingByRelation.map((item: string): any => ({ label: item, title: item, value: item }))} onChange={(value: string[]): void => onChange(THIS_STEP, 'children', 'method', value)} treeCheckable={true} placeholder='예시에서 선택' style={{ width: '100%' }} showArrow={false} value={data.doc.children.method} />
              </div>
            </Collapse.Panel>
          </Collapse>          
        </CIRow>
        <Divider dashed style={{ marginBottom: 30, marginTop: 30 }} />
        <CIRow>
          <Collapse activeKey={data.doc.provision.usage ? ['1'] : []} ghost>
            <Collapse.Panel header={<CIRowHeader description='해당 서비스에서 개인정보를 제3자에게 제공하는 모든 내용이 작성되어야 합니다. 수정을 원하시는 경우, "수정하기" 버튼을 눌러주세요.' title='개인정보를 제3자에게 제공하나요?' tools={<YesOrNoRadioButton onChange={(e: any): void => onChange(THIS_STEP, 'provision', 'usage', e.target.value)} size='small' value={data.doc.provision.usage} />} />} key='1' showArrow={false} >
              <Button type='default' size='small' style={{ fontSize: 12 }}>수정하기</Button>
            </Collapse.Panel>
          </Collapse>
        </CIRow>
        <Divider dashed style={{ marginBottom: 30, marginTop: 30 }} />
        <CIRow>
          <Collapse activeKey={data.doc.consignment.usage ? ['1'] : []} ghost>
            <Collapse.Panel header={<CIRowHeader description='해당 서비스에서 개인정보를 제3자에게 위탁하는 모든 내용이 작성되어야 합니다. 수정을 원하시는 경우, "수정하기" 버튼을 눌러주세요.' title='위탁하는 개인정보가 있나요?' tools={<YesOrNoRadioButton onChange={(e: any): void => onChange(THIS_STEP, 'consignment', 'usage', e.target.value)} size='small' value={data.doc.consignment.usage} />} />} key='1' showArrow={false} >
              <Button type='default' size='small' style={{ fontSize: 12 }}>수정하기</Button>
            </Collapse.Panel>
          </Collapse>
        </CIRow>
        <Divider dashed style={{ marginBottom: 30, marginTop: 30 }} />
        <CIRow>
          <CIRowHeader description='본 내용은 필수 항목으로 반드시 들어가야합니다.' title='개인정보의 파기' />
        </CIRow>
        <Divider dashed style={{ marginBottom: 30, marginTop :30 }} />
        <CIRow>
          <CIRowHeader description='개인정보 보호법에 따라, 서비스를 1년간 이용하지 않은 이용자의 정보는 파기하거나 분리보관해야합니다. 개인정보보호위원회에서는 이에 대한 조치 사항을 처리방침에 기재할 것을 권고하고 있으며, 필수 기재항목은 아닙니다.' title='미이용자의 개인정보 파기 등에 관한 조치' />
          <Radio.Group onChange={(e: any): void => onChange(THIS_STEP, 'destructionUnused', 'type', e.target.value)}>
            <Space direction='vertical'>
              <Radio value='파기'>장기 미접속자의 개인정보를 파기합니다.</Radio>
              <Radio value='분리보관'>장기 미접속자의 개인정보를 분리보관합니다.</Radio>
              <Radio value='기재안함'>기재안함</Radio>
            </Space>
          </Radio.Group>
        </CIRow>
        <Divider dashed style={{ marginBottom: 30, marginTop: 30 }} />
        <CIRow>
          <CIRowHeader description='본 내용은 필수 항목으로 반드시 들어가야합니다.' title='개인정보의 안전성 확보조치' />
        </CIRow>
        <Divider dashed style={{ marginBottom: 30, marginTop: 30 }} />
        <CIRow>
          <CIRowHeader description='본 내용은 필수 항목으로 반드시 들어가야합니다.' title='정보주체와 법정대리인의 권리·의무 및 행사방법' />
          <CIRowContent>
            <CISubject subject='개인정보를 저장하는 물리적인 공간(전산실, 자료보관실 등)이 있나요?' tools={<YesOrNoRadioButton onChange={(e: any): void => onChange(THIS_STEP, 'safety', 'physical', e.target.value)} size='small' value={data.doc.safety.physical} />} />
          </CIRowContent>
          <CIRowContent>
            <Collapse activeKey={data.doc.safety.usage ? ['1'] : []} ghost>
              <Collapse.Panel header={<CISubject subject='개인정보보호 활동을 하거나 국내외 개인정보보호 인증을 보유하고 있나요?' tools={<YesOrNoRadioButton onChange={(e: any): void => onChange(THIS_STEP, 'safety', 'usage', e.target.value)} size='small' value={data.doc.safety.usage} />} />} key='1' showArrow={false}>
                <Form layout='vertical'>
                  <Form.Item label='개인정보보호 활동'>
                    <Input onChange={(e: any): void => onChange(THIS_STEP, 'safety', 'activity', e.target.value)} value={data.doc.safety.activity} />
                  </Form.Item>
                  <Form.Item label='국내외 개인정보보호 인증 획득'>
                    <TagSelect onChange={(value: string|string[]): void => onChange(THIS_STEP, 'safety', 'certification', value)} options={['ISO/IEC 27701', 'ISMS-P', 'ABCDE']} value={data.doc.safety.certification} />
                  </Form.Item>
                </Form>
              </Collapse.Panel>
            </Collapse>
          </CIRowContent> 
        </CIRow>
        <Divider dashed style={{ marginBottom: 30, marginTop: 30 }} />
        <CIRow>
          <CIRowHeader description='쿠키 등 자동 수집 장치를 사용하는 경우, 그에 대한 모든 내용이 작성되어야 합니다.' title='개인정보 자동 수집 장치의 설치·운영 및 거부에 관한 사항' />
        </CIRow>
        <Divider dashed style={{ marginBottom: 30, marginTop: 30 }} />
        <CIRow>
          <CIRowHeader description='행태정보를 사용하는 경우, 그에 대한 모든 내용이 작성되어야 합니다.' title='행태정보의 수집·이용 및 거부 등에 관한 사항' />
        </CIRow>
      </Col>
      <Col span={12} style={{ borderLeft: '1px solid rgba(156, 156, 156, 0.3)', height: '100%', overflowY: 'auto' }}>
        <PreviewDocumentForPIPP data={data} />
      </Col>
    </Row>
  );
}

const PreviewDocumentForPIPP: React.FC<any> = ({ data }: any): JSX.Element => {
  return (
    <>
      <StyledCDTitle>{data.doc.name} 개인정보 처리방침</StyledCDTitle>
      <StyledCDForm>
        <StyledCDText>{data.doc.name}은(는) 정보주체의 자유와 권리 보호를 위해 「개인정보 보호법」 및 관계 법령이 정한 바를 준수하여, 적법하게 개인정보를 처리하고 안전하게 관리하고 있습니다. 이에 「개인정보 보호법」 제30조에 따라 정보주체에게 개인정보 처리에 관한 절차 및 기준을 안내하고, 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리방침을 수립·공개합니다.</StyledCDText>
      </StyledCDForm>
      {data.doc.children.usage ? (
        <StyledCDForm>
          <CDRowHeader title='◾️ 만 14세 미만 아동의 개인정보 처리에 관한 사항' />
          <StyledCDText>
            ① 회사는 만 14세 미만 아동에 대해 개인정보를 수집할 때 법정대리인의 동의를 얻어 해당 서비스 수행에 필요한 최소한의 개인정보를 수집합니다.<br/>
            <ul style={{ marginBottom: 0, paddingLeft: 18 }}><li>필수항목 : {data.doc.children.items.join(', ')}</li></ul>
            ② 또한, 회사는 아동의 개인정보를 추가로 수집하거나 홍보 및 마케팅을 위하여 처리할 경우에는 법정대리인으로부터 별도의 동의를 얻습니다.<br/>
            ③ 회사는 만 14세 미만 아동의 개인정보를 수집할 때에는 아동에게 법정대리인의 성명, 연락처와 같이 최소한의 정보를 요구할 수 있으며, 다음 중 하나의 방법으로 적법한 법정대리인이 동의하였는지를 확인합니다.<br/>
            <ul style={{ marginBottom: 0, paddingLeft: 18 }}>{data.doc.children.method.map((item: string, index: number): JSX.Element => <li key={index}>{item}</li>)}</ul>
          </StyledCDText>
        </StyledCDForm>
      ) : (<></>)}
      {data.doc.provision.usage ? (
        <StyledCDForm>
          <CDRowHeader title='◾️ 개인정보의 제3자 제공' />
          <StyledCDText>
            ① 회사는 정보주체의 개인정보를 개인정보의 처리 목적에서 명시한 범위 내에서만 처리하며, 정보주체의 동의, 법률의 특별한 규정 등 「개인정보 보호법」 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공하고 그 이외에는 정보주체의 개인정보를 제3자에게 제공하지 않습니다.<br/>
            ② 회사는 원활한 서비스 제공을 위해 다음의 경우 정보주체의 동의를 얻어 필요 최소한의 범위로만 제공합니다.
          </StyledCDText>
          <Table />
          <StyledCDText>
            ③ 회사는 다음과 같이 재난, 감염병, 급박한 생명·신체 위험을 초래하는 사건·사고, 급박한 재산 손실 등의 긴급상황이 발생하는 경우 정보주체의 동의 없이 관계기관에 개인정보를 제공할 수 있습니다. 보기<br/>
            이 경우 회사는 근거법령에 의거하여 필요한 최소한의 개인정보만을 제공하며, 목적과 다르게 제공하지 않겠습니다.
          </StyledCDText>
        </StyledCDForm>
      ) : (<></>)}
      {data.doc.consignment.usage ? (
        <StyledCDForm>
          <CDRowHeader title='◾️ 개인정보의 위탁' />
          <StyledCDText>
            ① 회사는 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다. 보기
          </StyledCDText>
          <Table />
          <StyledCDText>
            ② 회사는 위탁계약 체결 시 「개인정보 보호법」 제26조에 따라 위탁업무 수행목적 외 개인정보 처리금지, 기술적·관리적 보호조치, 재위탁 제한, 수탁자에 대한 관리·감독, 손해배상 등 책임에 관한 사항을 계약서 등 문서에 명시하고, 수탁자가 개인정보를 안전하게 처리하는지를 감독하고 있습니다.<br/>
            ③ 위탁업무의 내용이나 수탁자가 변경될 경우에는 지체없이 본 개인정보 처리방침을 통하여 공개하도록 하겠습니다.
          </StyledCDText>
        </StyledCDForm>
      ) : (<></>)}
      <StyledCDForm>
        <CDRowHeader title='◾️ 개인정보의 파기 및 절차' />
        <StyledCDText>
          ① 회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.<br/>
          ② 정보주체로부터 동의받은 개인정보 보유기간이 경과하거나 처리목적이 달성 되었음에도 불구하고 다른 법령에 따라 개인정보를 계속 보존하여야 하는 경우에는, 해당 개인정보를 별도의 데이터베이스(DB)로 옮기거나 보관장소를 달리하여 보존합니다.<br/>
          ③ 개인정보 파기의 절차 및 방법은 다음과 같습니다.
        </StyledCDText>
        <StyledCDText>
          <ul style={{ marginBottom: 0, paddingLeft: 18 }}>
            <li>파기절차 : 파기 사유가 발생한 개인정보를 선정하고 개인정보 보호책임자의 승인을 받아 개인정보를 파기합니다.</li>
            <li>파기방법 : 전자적 파일 형태로 기록·저장된 개인정보는 기록을 재생할 수 없도록 파기하며, 종이 문서에 기록·저장된 개인정보는 분쇄기로 분쇄하거나 소각하여 파기합니다.</li>
          </ul>
        </StyledCDText>
      </StyledCDForm>
      {data.doc.destructionUnused.type && data.doc.destructionUnused.type !== '기재안함' ? (
        <StyledCDForm>
          <CDRowHeader title='◾️ 미이용자의 개인정보 파기 등에 관한 조치'/>
          <StyledCDText>
            {data.doc.destructionUnused.type === '파기' ? (
              <>
                ① 회사는 1년간 서비스를 이용하지 않은 이용자의 정보를 파기하고 있습니다. 다만, 다른 법령에서 정한 보존기간이 경과할 때까지 다른 이용자의 개인정보와 분리하여 별도로 저장·관리할 수 있습니다.<br/>
                ② 회사는 개인정보의 파기 30일 전까지 개인정보가 파기되는 사실, 기간 만료일 및 파기되는 개인정보의 항목을 이메일, 문자 등 이용자에게 통지 가능한 방법으로 알리고 있습니다.<br/>
                ③ 개인정보의 파기를 원하지 않으시는 경우, 기간 만료 전 서비스 로그인을 하시면 됩니다.
              </>
            ) : (
              <>
                ① 회사는 1년간 서비스를 이용하지 않은 이용자는 휴면계정으로 전환하고, 개인정보를 별도로 분리하여 보관합니다. 분리 보관된 개인정보는 1년간 보관 후 지체없이 파기합니다.<br/>
                ② 회사는 휴면전환 30일 전까지 휴면예정 회원에게 별도 분리 보관되는 사실 및 휴면 예정일, 별도 분리 보관하는 개인정보 항목을 이메일, 문자 등 이용자에게 통지 가능한 방법으로 알리고 있습니다.<br/>
                ③ 휴면계정으로 전환을 원하지 않으시는 경우, 휴면계정 전환 전 서비스 로그인을 하시면 됩니다. 또한, 휴면계정으로 전환되었더라도 로그인을 하는 경우 이용자의 동의에 따라 휴면계정을 복원하여 정상적인 서비스를 이용할 수 있습니다.
              </>
            )}
          </StyledCDText>
        </StyledCDForm>
      ) : (<></>)}
      <StyledCDForm>
        <CDRowHeader title='◾️ 정보주체와 법정대리인의 권리·의무 및 행사방법' />
        <StyledCDText>
          ① 정보주체는 회사에 대해 언제든지 개인정보 열람·정정·삭제·처리정지 요구 등의 권리를 행사할 수 있습니다.<br/>
          ② 권리 행사는 회사에 대해 「개인정보 보호법」 시행령 제41조 제1항에 따라 서면, 전자우편, 모사전송(FAX) 등을 통하여 하실 수 있으며, 회사는 이에 대해 지체없이 조치하겠습니다.<br/>
          ③ 권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을 통하여 하실 수도 있습니다. 이 경우 “개인정보 처리 방법에 관한 고시(제2020-7호)” 별지 제11호 서식에 따른 위임장을 제출하셔야 합니다.<br/>
          ④ 개인정보 열람 및 처리정지 요구는 「개인정보 보호법」 제35조 제4항, 제37조 제2항에 의하여 정보주체의 권리가 제한 될 수 있습니다.<br/>
          ⑤ 개인정보의 정정 및 삭제 요구는 다른 법령에서 그 개인정보가 수집 대상으로 명시되어 있는 경우에는 그 삭제를 요구할 수 없습니다.<br/>
          ⑥ 회사는 정보주체 권리에 따른 열람의 요구, 정정·삭제의 요구, 처리 정지의 요구 시 열람 등 요구를 한 자가 본인이거나 정당한 대리인인지를 확인합니다.
        </StyledCDText>
      </StyledCDForm>
      <StyledCDForm>
        <CDRowHeader title='◾️ 개인정보의 안전성 확보조치' />
        <StyledCDText>
          회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.<br/>
          1) 관리적 조치 : 내부관리계획 수립·시행, 전담조직 운영, 정기적 직원 교육<br/>
          2) 기술적 조치 : 개인정보처리시스템 등의 접근권한 관리, 접근통제시스템 설치, 개인정보의 암호화, 보안프로그램 설치 및 갱신<br/>
          {data.doc.safety.physical ? <>3) 물리적 조치 : 전산실, 자료보관실 등의 접근통제</> : <></>}
          {data.doc.safety.usage ? (
            <>
              회사는 개인정보의 안전성을 확보하기 위하여 법령에서 규정하고 있는 사항 이외에도 다음과 같은 활동을 시행하고 있습니다.
              <ul style={{ marginBottom: 0, paddingLeft: 18 }}>
                {data.doc.safety.activity !== '' ? (
                  <li>개인정보보호 활동: {data.doc.safety.activity}</li>
                ) : (<></>)}
                {data.doc.safety.certification.length > 0 ? (
                  <li>국내외 개인정보보호 인증 획득: {data.doc.safety.certification.join(',')}</li>
                ) : (<></>)}
              </ul>
            </>
          ) : (<></>)}
        </StyledCDText>
      </StyledCDForm>
      <StyledCDForm>
        <CDRowHeader title='◾️ 개인정보의 자동 수집 장치의 설치·운영 및 거부에 관한 사항' />
        {data.additionalInfo.cookie.usage ? (
          <StyledCDText>
            ① 회사는 이용자에게 개별적인 맞춤서비스를 제공하기 위해 이용정보를 저장하고 수시로 불러오는 ‘쿠키(cookie)’를 사용합니다.<br/>
            ② 쿠키는 웹사이트를 운영하는데 이용되는 서버(http)가 이용자의 컴퓨터 브라우저 또는 모바일 어플리케이션에게 보내는 소량의 정보이며 이용자들의 PC 컴퓨터내의 하드디스크에 또는 모바일 기기내에 저장되기도 합니다.<br/>
            {data.additionalInfo.cookie.purpose.length > 0 ? (<>1) 쿠키의 사용 목적: {data.additionalInfo.cookie.purpose.join(',')}<br/></>) : (<></>)}
            2) 쿠키의 설치·운영 및 거부: 웹브라우저 상단의 도구{'>'}인터넷 옵션{'>'}개인정보 메뉴의 옵션 설정을 통해 쿠키 저장을 거부 할 수 있습니다.<br/>
            <ul style={{ marginBottom: 0, paddingLeft: 18 }}>
              <li>Internet Explorer를 사용하는 경우 쿠키 설정 방법  보기</li>
              <li>Safari를 사용하는 경우 쿠키 설정 방법  보기</li>
              <li>FireFox를 사용하는 경우 쿠키 설정 방법  보기</li>
              <li>Chrome 브라우저를 사용하는 경우 쿠키 설정 방법  보기</li>
            </ul>
            {data.additionalInfo.cookie.disadvantage.length> 0 ? (
              <>
                3) 쿠키 저장을 거부할 경우 맞춤형 서비스 이용에 어려움이 발생할 수 있습니다.
              </>
            ) : (<></>)}
          </StyledCDText>
        ) : (
          <StyledCDText>회사는 정보주체의 이용정보를 저장하고 수시로 불러오는 ‘쿠키(cookie)’를 사용하지 않습니다.</StyledCDText>
        )}
      </StyledCDForm>
      <StyledCDForm>
        <CDRowHeader title='◾️ 행태정보의 수집·이용 및 거부 등에 관한 사항' />
        {data.additionalInfo.advertising.usage && data.additionalInfo.thirdParty.usage ? (
          <>
            <StyledCDText>
              ① 회사는 서비스 이용과정에서 정보주체에게 최적화된 맞춤형 서비스 및 혜택, 온라인 맞춤형 광고 등을 제공하기 위하여 행태정보를 수집·이용하고 있습니다.<br/>
              ② 회사는 다음과 같이 행태정보를 수집합니다.
            </StyledCDText>
            <Table pagination={false}
              columns={[
                { title: '행태정보 수집 항목', dataIndex: 'items', key: 'items' },
                { title: '수집 방법', dataIndex: 'method', key: 'method' },
                { title: '수집 목적', dataIndex: 'purpose', key: 'purpose' },
                { title: '보유 및 이용기간', dataIndex: 'period', key: 'period' }]}
              dataSource={[
                { 
                  key: '1',
                  items: data.additionalInfo.advertising.items.join(', '),
                  method: data.additionalInfo.advertising.method,
                  purpose: data.additionalInfo.advertising.purpose,
                  period: data.additionalInfo.advertising.period
                }]}
            />
            <StyledCDText>
              ③ 회사는 다음과 같이 온라인 맞춤형 광고 사업자가 행태정보를 수집∙처리하도록 허용하고 있습니다.
              <ul style={{ marginBottom: 0, paddingLeft: 18 }}>
                <li>행태정보를 수집 및 처리하려는 광고 사업자: {data.additionalInfo.thirdParty.company.join(', ')}</li>
                <li>형태 정보 수집 방법: {data.additionalInfo.thirdParty.method}</li>
                <li>수집∙처리되는 행태정보 항목: {data.additionalInfo.thirdParty.items.join(', ')}</li>
                <li>보유 및 이용기간: {data.additionalInfo.thirdParty.period}</li>
              </ul>
              ④ 회사는 온라인 맞춤형 광고 등에 필요한 최소한의 행태정보만을 수집하며, 사상, 신념, 가족 및 친인척관계, 학력·병력, 기타 사회활동 경력 등 개인의 권리·이익이나 사생활을 뚜렷하게 침해할 우려가 있는 민감한 행태정보를 수집하지 않습니다.<br/>
              ⑤ 회사는 만 14세 미만임을 알고 있는 아동이나 만14세 미만의 아동을 주 이용자로 하는 온라인 서비스로부터 맞춤형 광고 목적의 행태정보를 수집하지 않고, 만 14세 미만임을 알고 있는 아동에게는 맞춤형 광고를 제공하지 않습니다.<br/>
              ⑥ 회사는 모바일 앱에서 온라인 맞춤형 광고를 위하여 광고식별자를 수집·이용합니다. 정보주체는 모바일 단말기의 설정 변경을 통해 앱의 맞춤형 광고를 차단·허용할 수 있습니다.<br/>
              ‣ 스마트폰의 광고식별자 차단/허용<br/>
              (1) (안드로이드) ① 설정 → ② 개인정보보호 → ③ 광고 → ③ 광고 ID 재설정 또는 광고ID 삭제<br/>
              (2) (아이폰) ① 설정 → ② 개인정보보호 → ③ 추적 → ④ 앱이 추적을 요청하도록 허용 끔<br/>
              ※ 모바일 OS 버전에 따라 메뉴 및 방법이 다소 상이할 수 있습니다.<br/>
              ⑦ 정보주체는 웹브라우저의 쿠키 설정 변경 등을 통해 온라인 맞춤형 광고를 일괄적으로 차단·허용할 수 있습니다. 다만, 쿠키 설정 변경은 웹사이트 자동로그인 등 일부 서비스의 이용에 영향을 미칠 수 있습니다.<br/>
              ‣ 웹브라우저를 통한 맞춤형 광고 차단/허용<br/>
              (1) 인터넷 익스플로러(Windows 10용 Internet Explorer 11)<br/>
              - Internet Explorer에서 도구 버튼을 선택한 다음 인터넷 옵션을 선택<br/>
              - 개인정보 탭을 선택하고 설정에서 고급을 선택한 다음 쿠키의 차단 또는 허용을 선택<br/>
              (2) Microsoft Edge<br/>
              - Edge에서 오른쪽 상단 ‘…’ 표시를 클릭한 후, 설정을 클릭합니다.<br/>
              - 설정 페이지 좌측의 ‘개인정보, 검색 및 서비스’를 클릭 후 「추적방지」 섹션에서 ‘추적방지’ 여부 및 수준을 선택합니다.<br/>
              - ‘InPrivate를 검색할 때 항상 “엄격” 추적 방지 사용’ 여부를 선택합니다.<br/>
              - 아래 「개인정보」 섹션에서 ‘추적 안함 요청보내기’ 여부를 선택합니다.<br/>
              (3) 크롬 브라우저<br/>
              - Chrome에서 오른쪽 상단 ‘…’ 표시(chrome 맞춤설정 및 제어)를 클릭한 후, 설정 표시를 클릭합니다.<br/>
              - 설정 페이지 하단에 ‘고급 설정 표시’를 클릭하고 「개인정보」 섹션에서 콘텐츠 설정을 클릭합니다.<br/>
              - 쿠키 섹션에서 ‘타사 쿠키 및 사이트 데이터 차단’의 체크박스를 선택합니다.<br/>
            </StyledCDText>
          </>
        ) : data.additionalInfo.advertising.usage ? (
          <>
            <StyledCDText>
              ① 회사는 서비스 이용과정에서 정보주체에게 최적화된 맞춤형 서비스 및 혜택, 온라인 맞춤형 광고 등을 제공하기 위하여 행태정보를 수집·이용하고 있습니다.<br/>
              ② 회사는 온라인 맞춤형 광고를 위해 사용자의 행태정보를 수집∙처리 하고 있지 않습니다.<br/>
              ③ 회사는 다음과 같이 온라인 맞춤형 광고 사업자가 행태정보를 수집∙처리하도록 허용하고 있습니다.
              <ul style={{ marginBottom: 0, paddingLeft: 18 }}>
                <li>행태정보를 수집 및 처리하려는 광고 사업자: {data.additionalInfo.thirdParty.company.join(', ')}</li>
                <li>형태 정보 수집 방법: {data.additionalInfo.thirdParty.method}</li>
                <li>수집∙처리되는 행태정보 항목: {data.additionalInfo.thirdParty.items.join(', ')}</li>
                <li>보유 및 이용기간: {data.additionalInfo.thirdParty.period}</li>
              </ul>
              ④ 회사는 온라인 맞춤형 광고 등에 필요한 최소한의 행태정보만을 수집하며, 사상, 신념, 가족 및 친인척관계, 학력·병력, 기타 사회활동 경력 등 개인의 권리·이익이나 사생활을 뚜렷하게 침해할 우려가 있는 민감한 행태정보를 수집하지 않습니다.<br/>
              ⑤ 회사는 만 14세 미만임을 알고 있는 아동이나 만14세 미만의 아동을 주 이용자로 하는 온라인 서비스로부터 맞춤형 광고 목적의 행태정보를 수집하지 않고, 만 14세 미만임을 알고 있는 아동에게는 맞춤형 광고를 제공하지 않습니다.<br/>
              ⑥ 회사는 모바일 앱에서 온라인 맞춤형 광고를 위하여 광고식별자를 수집·이용합니다. 정보주체는 모바일 단말기의 설정 변경을 통해 앱의 맞춤형 광고를 차단·허용할 수 있습니다.<br/>
              ‣ 스마트폰의 광고식별자 차단/허용<br/>
              (1) (안드로이드) ① 설정 → ② 개인정보보호 → ③ 광고 → ③ 광고 ID 재설정 또는 광고ID 삭제<br/>
              (2) (아이폰) ① 설정 → ② 개인정보보호 → ③ 추적 → ④ 앱이 추적을 요청하도록 허용 끔<br/>
              ※ 모바일 OS 버전에 따라 메뉴 및 방법이 다소 상이할 수 있습니다.<br/>
              ⑦ 정보주체는 웹브라우저의 쿠키 설정 변경 등을 통해 온라인 맞춤형 광고를 일괄적으로 차단·허용할 수 있습니다. 다만, 쿠키 설정 변경은 웹사이트 자동로그인 등 일부 서비스의 이용에 영향을 미칠 수 있습니다.<br/>
              ‣ 웹브라우저를 통한 맞춤형 광고 차단/허용<br/>
              (1) 인터넷 익스플로러(Windows 10용 Internet Explorer 11)<br/>
              - Internet Explorer에서 도구 버튼을 선택한 다음 인터넷 옵션을 선택<br/>
              - 개인정보 탭을 선택하고 설정에서 고급을 선택한 다음 쿠키의 차단 또는 허용을 선택<br/>
              (2) Microsoft Edge<br/>
              - Edge에서 오른쪽 상단 ‘…’ 표시를 클릭한 후, 설정을 클릭합니다.<br/>
              - 설정 페이지 좌측의 ‘개인정보, 검색 및 서비스’를 클릭 후 「추적방지」 섹션에서 ‘추적방지’ 여부 및 수준을 선택합니다.<br/>
              - ‘InPrivate를 검색할 때 항상 “엄격” 추적 방지 사용’ 여부를 선택합니다.<br/>
              - 아래 「개인정보」 섹션에서 ‘추적 안함 요청보내기’ 여부를 선택합니다.<br/>
              (3) 크롬 브라우저<br/>
              - Chrome에서 오른쪽 상단 ‘…’ 표시(chrome 맞춤설정 및 제어)를 클릭한 후, 설정 표시를 클릭합니다.<br/>
              - 설정 페이지 하단에 ‘고급 설정 표시’를 클릭하고 「개인정보」 섹션에서 콘텐츠 설정을 클릭합니다.<br/>
              - 쿠키 섹션에서 ‘타사 쿠키 및 사이트 데이터 차단’의 체크박스를 선택합니다.<br/>
            </StyledCDText>
          </>
        ) : data.additionalInfo.thirdParty.usage ? (
          <>
            <StyledCDText>
              ① 회사는 서비스 이용과정에서 정보주체에게 최적화된 맞춤형 서비스 및 혜택, 온라인 맞춤형 광고 등을 제공하기 위하여 행태정보를 수집·이용하고 있습니다.<br/>
              ② 회사는 다음과 같이 행태정보를 수집합니다.<br/>
            </StyledCDText>
            <Table pagination={false}
              columns={[
                { title: '행태정보 수집 항목', dataIndex: 'items', key: 'items' },
                { title: '수집 방법', dataIndex: 'method', key: 'method' },
                { title: '수집 목적', dataIndex: 'purpose', key: 'purpose' },
                { title: '보유 및 이용기간', dataIndex: 'period', key: 'period' }]}
              dataSource={[
                { 
                  key: '1',
                  items: data.additionalInfo.advertising.items.join(', '),
                  method: data.additionalInfo.advertising.method,
                  purpose: data.additionalInfo.advertising.purpose,
                  period: data.additionalInfo.advertising.period
                }]}
            />
            <StyledCDText>
              ③ 회사는 온라인 맞춤형 광고 사업자가 행태정보를 수집∙처리하도록 허용하고 있지 않습니다.<br/>
              ④ 회사는 온라인 맞춤형 광고 등에 필요한 최소한의 행태정보만을 수집하며, 사상, 신념, 가족 및 친인척관계, 학력·병력, 기타 사회활동 경력 등 개인의 권리·이익이나 사생활을 뚜렷하게 침해할 우려가 있는 민감한 행태정보를 수집하지 않습니다.<br/>
              ⑤ 회사는 만 14세 미만임을 알고 있는 아동이나 만14세 미만의 아동을 주 이용자로 하는 온라인 서비스로부터 맞춤형 광고 목적의 행태정보를 수집하지 않고, 만 14세 미만임을 알고 있는 아동에게는 맞춤형 광고를 제공하지 않습니다.<br/>
              ⑥ 회사는 모바일 앱에서 온라인 맞춤형 광고를 위하여 광고식별자를 수집·이용합니다. 정보주체는 모바일 단말기의 설정 변경을 통해 앱의 맞춤형 광고를 차단·허용할 수 있습니다.<br/>
              ‣ 스마트폰의 광고식별자 차단/허용<br/>
              (1) (안드로이드) ① 설정 → ② 개인정보보호 → ③ 광고 → ③ 광고 ID 재설정 또는 광고ID 삭제<br/>
              (2) (아이폰) ① 설정 → ② 개인정보보호 → ③ 추적 → ④ 앱이 추적을 요청하도록 허용 끔<br/>
              ※ 모바일 OS 버전에 따라 메뉴 및 방법이 다소 상이할 수 있습니다.<br/>
              ⑦ 정보주체는 웹브라우저의 쿠키 설정 변경 등을 통해 온라인 맞춤형 광고를 일괄적으로 차단·허용할 수 있습니다. 다만, 쿠키 설정 변경은 웹사이트 자동로그인 등 일부 서비스의 이용에 영향을 미칠 수 있습니다.<br/>
              ‣ 웹브라우저를 통한 맞춤형 광고 차단/허용<br/>
              (1) 인터넷 익스플로러(Windows 10용 Internet Explorer 11)<br/>
              - Internet Explorer에서 도구 버튼을 선택한 다음 인터넷 옵션을 선택<br/>
              - 개인정보 탭을 선택하고 설정에서 고급을 선택한 다음 쿠키의 차단 또는 허용을 선택<br/>
              (2) Microsoft Edge<br/>
              - Edge에서 오른쪽 상단 ‘…’ 표시를 클릭한 후, 설정을 클릭합니다.<br/>
              - 설정 페이지 좌측의 ‘개인정보, 검색 및 서비스’를 클릭 후 「추적방지」 섹션에서 ‘추적방지’ 여부 및 수준을 선택합니다.<br/>
              - ‘InPrivate를 검색할 때 항상 “엄격” 추적 방지 사용’ 여부를 선택합니다.<br/>
              - 아래 「개인정보」 섹션에서 ‘추적 안함 요청보내기’ 여부를 선택합니다.<br/>
              (3) 크롬 브라우저<br/>
              - Chrome에서 오른쪽 상단 ‘…’ 표시(chrome 맞춤설정 및 제어)를 클릭한 후, 설정 표시를 클릭합니다.<br/>
              - 설정 페이지 하단에 ‘고급 설정 표시’를 클릭하고 「개인정보」 섹션에서 콘텐츠 설정을 클릭합니다.<br/>
              - 쿠키 섹션에서 ‘타사 쿠키 및 사이트 데이터 차단’의 체크박스를 선택합니다.<br/>
            </StyledCDText>
          </>
        ) : (
          <StyledCDText>회사는 온라인 맞춤형 광고 등을 위한 행태정보를 수집∙이용∙제공하지 않습니다.</StyledCDText>
        )}
      </StyledCDForm>
    </>
  );
}