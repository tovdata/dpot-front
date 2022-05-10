import React from 'react';
import { useEffect, useState } from 'react';
// Component
import { Button, Col, Collapse, DatePicker, Form, Input, Modal, Radio, Row, Space, Table, Tooltip, TreeSelect } from 'antd';
import { DocumentProcessingStatusHeader, PageHeaderContainStep } from './common/Header';
import { DocumentTable, setDataSource, StyledTableForm, TableFormHeader } from './common/Table';
import { CollapseForPIPP, CollapsePanelHeaderData } from './common/Collapse';
import { createWarningMessage } from './common/Notification';
import { YesOrNoRadioButton } from './common/Radio';
import { AddableTagSelect, TagSelect } from './common/Select';
import { DDRow, DDRowContent, DDRowHeader, DDRowItemList, DDRowTableForm, DIRow, DIRowContent, DIRowDivider, DIRowHeader, DIRowSubject, DRLabelingContent, DRLabelingHeader, DRLabelingItem, DTCForm, DTCItem } from './pipp/Documentation';
// Data
import { statementForPIPP as stmt } from '../models/static';
import { certificationForPIP, methodOfConfirmConsentOfLegalRepresentative, periodOfRetentionAndUseOfPersonalInformation, personalInfoProcessingPolicyTableHeader } from '../models/data';
import { personalInfoProcessingPolicy } from '../models/temporary';
// Icon
import { AiOutlineMinusCircle } from 'react-icons/ai';
// Module
import moment from 'moment';

/** [Interface] Properties for PIPP table */
interface PIPPTableProps {
  onSelect: (value: any) => void;
}
/** [Interface] Properties for create a doucment form */
interface CreateDocumentFormProps {
  onBack: () => void;
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

  const [ref, setRef] = useState<any>({
    pi: [{
      basisOfCollection: ["통신비밀보호법", "전자금융거래법"],
      collectionMethod: ["정보주체의 동의", "고객 문의"],
      essentialItems: ["이름", "아이디", "비밀번호", "이메일주소", "CI(연계정보)"],
      isProcess: false,
      period: ["회원 탈퇴시까지", "재화 및 서비스 공급 완료시까지"],
      purpose: ["본인 식별 및 인증", "회원 자격 유지 및 관리"],
      retentionFormat: ["사내 DB"],
      selectionItems: ["휴대전화번호", "생년월일"],
      subject: "회원가입 및 관리",
      uuid: "1"
    }, {
      basisOfCollection: ["통신비밀보호법", "전자금융거래법"],
      collectionMethod: ["정보주체의 동의", "고객 문의"],
      essentialItems: ["아이핀 번호", "주민등록번호", "신용카드정보", "결제기록"],
      isProcess: false,
      period: ["재화 및 서비스 공급 완료시까지", "요금결제 및 정산 완료시까지"],
      purpose: ["이용자 식별", "본인 여부 및 연령 확인", "콘텐츠 제공", "구매 및 요금결제"],
      retentionFormat: ["사내 DB"],
      selectionItems: [],
      subject: "재화 및 서비스 제공",
      uuid: "2"
    }, {
      basisOfCollection: ["통신비밀보호법", "전자금융거래법"],
      collectionMethod: ["정보주체의 동의", "고객 문의"],
      essentialItems: ["방문 일시", "서비스 이용 기록", "IP Address"],
      isProcess: false,
      period: ["회원 탈퇴시까지"],
      purpose: ["서비스 연구", "서비스 웹/앱 버전 개발"],
      retentionFormat: ["사내 DB"],
      selectionItems: [],
      subject: "신규 서비스 개발",
      uuid: "3"
    }],
    ppi: [{
      uuid: "1",
      recipient: "금융결제원",
      purpose: ["출금이체 서비스 제공", "출금 동의 확인"],
      items: ["이름", "휴대전화번호", "CI(연계정보)"],
      period: ["출금이체 서비스 제공시까지", "출금동의 확인 목적 달성시까지"],
      isForeign: true,
      country: "미국",
      location: "○시 ○구 ○동 건물명",
      method: ["전용네트워크를 이용한 원격지로 수시 전송"],
      charger: ["aws-korea-privacy@amazon.com"],
    }, {
      uuid: "2",
      recipient: "한국SC은행",
      purpose: ["계좌 유효성 확인 및 송금"],
      items: ["아이핀 번호", "결제기록"],
      period: ["해당 송금 완료 시까지"],
      charger: "전수지(3667)",
      isForeign: false,
    }],
    cpi: [{
      uuid: "1",
      company: "나이스페이먼츠(주)",
      subject: "결제 및 요금 정산 처리",
      content: ["결제대행 서비스", "바로결제 서비스 정산"],
      charger: ["전수지(3667)"],
      isForeign: false,
      country: "미국",
      address: "○시 ○구 ○동 건물명",
      method: ["방법"],
      items: ["이름", "휴대전화번호"],
      period: ["해당 송금 완료 시까지"]
    }]
  });

  // Set a local state
  const [data, setData] = useState<any>({
    aInfo: {
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
    dInfo: {
      name: '',
      period: [],
      child: {
        method: [],
        usage: undefined
      },
      provision: {
        usage: undefined
      },
      consignment: {
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
      },
      fni: {
        usage: undefined
      },
      cctv: {
        usage: undefined
      }
    },
    cInfo: {
      applyAt: '',
      previous: {
        data: [],
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
        const aInfo: any = data.aInfo;
        // 모든 질문에 대한 응답 확인
        if (Object.keys(aInfo).some((key: string): boolean => aInfo[key].usage === undefined)) {
          createWarningMessage('모든 사항에 대해 입력해주세요', 2);
        } else if (aInfo.cookie.usage && (aInfo.cookie.purpose.length === 0 || aInfo.cookie.disadvantage.length === 0)) {
          createWarningMessage('쿠키 사용 질의에 대한 응답을 입력해주세요', 2);
        } else if (aInfo.webLog.usage && (aInfo.webLog.purpose.length === 0 || aInfo.webLog.method.length === 0 || data.aInfo.webLog.disadvantage === '')) {
          createWarningMessage('웹 로그 분석도구 사용 질의에 대한 응답을 입력해주세요', 2);
        } else if (aInfo.advertising.usage && (aInfo.advertising.items.length === 0 || aInfo.advertising.method === '' || aInfo.advertising.purpose === '' || aInfo.advertising.period === '')) {
          createWarningMessage('타겟 광고 질의에 대한 응답을 입력해주세요', 2);
        } else if (aInfo.thirdParty.usage && (aInfo.thirdParty.company.length === 0 || aInfo.thirdParty.items.length === 0 || aInfo.thirdParty.method === '' || aInfo.thirdParty.period === '')) {
          createWarningMessage('제 3자 허용 질의에 대한 응답을 입력해주세요', 2);
        } else if (aInfo.additional.usage && (aInfo.additional.items.length === 0 || aInfo.additional.purpose.length === 0 || aInfo.additional.period === '')) {
          createWarningMessage('추가 이용 및 제공 질의에 대한 응답을 입력해주세요', 2);
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
        <div style={{ display: current === 0 ? 'block' : 'none', marginBottom: '3rem' }}>
          <CollapseForPIPP data={data.aInfo} onChange={onChange} />
        </div>
        <div style={{ display: current === 1 ? 'block' : 'none' }}>
          <CreatePIPP data={data} onChange={onChange} refTable={ref} />
        </div>
        <div style={{ display: current === 2 ? 'block' : 'none' }}>
          <ConfirmForDocumentation data={data} onChange={onChange} refTable={ref} />
        </div>
      </>
    </>
  );
}

const CreatePIPP: React.FC<any> = ({ onChange, data, refTable }: any): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false);
  const [refType, setRefType] = useState<string>('');

  const modalTitles: any = {
    pi: "개인정보 수집 및 이용",
    ppi: "개인정보 제공",
    cpi: "개인정보 위탁"
  }

  const onOpen = (type: string): void => {
    setRefType(type);
    setOpen(true);
  }
  const onClose = (): void => {
    setOpen(false);
  }

  // Return an element
  return (
    <>
      <Row gutter={74} style={{ height: 'calc(100vh - 324px)' }}>
        <Col span={12} style={{ height: '100%', overflowY: 'auto' }}>
          <InputFormToCreateDocumentation data={data.dInfo} onChange={onChange} />
        </Col>
        <Col span={12} style={{ borderLeft: '1px solid rgba(156, 156, 156, 0.3)', height: '100%', overflowY: 'auto' }}>
          <PreviewDocumentForPIPP data={data} refTable={refTable} stmt={stmt(data.dInfo.name)} />
        </Col>
      </Row>
      <Modal centered onCancel={onClose} onOk={onClose} title={modalTitles[refType]} visible={open} width='80%'>
        <ReadableTable dataSource={refTable[refType]} />
      </Modal>
    </>
  );
}

const InputFormToCreateDocumentation: React.FC<any> = ({ data, onChange }: any): JSX.Element => {
  const THIS_STEP: string = 'dInfo';
  // 예시 데이터 가공 (관계 법령에 따른 개인정보 보유 및 이용기간)
  const exampleForPeriodPI: string[] = [];
  Object.keys(periodOfRetentionAndUseOfPersonalInformation).forEach((law: string): number => exampleForPeriodPI.push(...periodOfRetentionAndUseOfPersonalInformation[law].map((item: string): string => `${law} : ${item}`)));
  // 예시 데이터 가공 (법정대리인의 동의 확인 방법)
  const exampleForMethodConsent: any[] = methodOfConfirmConsentOfLegalRepresentative.map((item: string): any => ({ title: item, value: item }));

  // Return an element
  return (
    <>
      <DIRow>
        <DIRowHeader description='개인정보 처리방침에 사용될 개인정보처리자명 또는 서비스명을 입력해주세요.' title='개인정보 처리자명 또는 서비스명' />
        <DIRowContent>
          <Input allowClear onChange={(e: any) => onChange(THIS_STEP, 'name', undefined, e.target.value)} placeholder='개인정보 처리자명 또는 서비스명' value={data.name} />
        </DIRowContent>
      </DIRow>
      <DIRowDivider />
      <DIRow>
        <DIRowHeader description='해당 서비스에서 개인정보를 수집・이용하는 모든 내용이 작성되어야 합니다. 수정을 원하시는 경우, "수정하기" 버튼을 눌러주세요.' title='개인정보의 처리목적, 수집 항목, 보유 및 이용기간' tools={<Button size='small' style={{ fontSize: 12 }} type='default'>수정하기</Button>} />
        <DIRowContent>
          <DIRowSubject title='관계 법령에 따른 개인정보의 보유 및 이용기간' />
          <AddableTagSelect onChange={(value: string|string[]): void => onChange(THIS_STEP, 'period', undefined, value)} options={exampleForPeriodPI} value={data.period} />
        </DIRowContent>
      </DIRow>
      <DIRowDivider />
      <DIRow>
        <Collapse activeKey={data.child.usage ? ['1'] : []} ghost>
          <Collapse.Panel header={<DIRowHeader style={{ marginBottom: 0 }} title='만 14세 미만 아동의 개인정보를 처리하나요?' tools={<YesOrNoRadioButton onChange={(e: any): void => onChange(THIS_STEP, 'child', 'usage', e.target.value)} size='small' value={data.child.usage} />} />} key='1' showArrow={false}>
            <DIRowSubject title='법정대리인의 동의 확인 방법' />
            <TreeSelect showArrow={false} treeData={exampleForMethodConsent} treeCheckable={true} onChange={(value: string[]): void => onChange(THIS_STEP, 'child', 'method', value)} placeholder='예시에서 선택' style={{ width: '100%' }} value={data.child.method} />
          </Collapse.Panel>
        </Collapse>
      </DIRow>
      <DIRowDivider />
      <DIRow>
        <Collapse activeKey={data.provision.usage ? ['1'] : []} ghost>
          <Collapse.Panel header={<DIRowHeader description='해당 서비스에서 개인정보를 제3자에게 제공하는 모든 내용이 작성되어야 합니다. 수정을 원하시는 경우, "수정하기" 버튼을 눌러주세요.' title='개인정보를 제3자에게 제공하나요?' tools={<YesOrNoRadioButton onChange={(e: any): void => onChange(THIS_STEP, 'provision', 'usage', e.target.value)} size='small' value={data.provision.usage} />} />} key='1' showArrow={false}>
            <Button size='small' style={{ fontSize: 12 }} type='default'>수정하기</Button>
          </Collapse.Panel>
        </Collapse>
      </DIRow>
      <DIRowDivider />
      <DIRow>
        <Collapse activeKey={data.consignment.usage ? ['1'] : []} ghost>
          <Collapse.Panel header={<DIRowHeader description='해당 서비스에서 개인정보를 제3자에게 위탁하는 모든 내용이 작성되어야 합니다. 수정을 원하시는 경우, "수정하기" 버튼을 눌러주세요.' title='위탁하는 개인정보가 있나요?' tools={<YesOrNoRadioButton onChange={(e: any): void => onChange(THIS_STEP, 'consignment', 'usage', e.target.value)} size='small' value={data.consignment.usage} />} />} key='1' showArrow={false} >
            <Button size='small' style={{ fontSize: 12 }} type='default'>수정하기</Button>
          </Collapse.Panel>
        </Collapse>
      </DIRow>
      <DIRowDivider />
      <DIRow>
        <DIRowHeader description='본 내용은 필수 항목으로 반드시 들어가야합니다.' title='개인정보의 파기' />
      </DIRow>
      <DIRowDivider />
      <DIRow>
        <DIRowHeader description='개인정보 보호법에 따라, 서비스를 1년간 이용하지 않은 이용자의 정보는 파기하거나 분리보관해야합니다. 개인정보보호위원회에서는 이에 대한 조치 사항을 처리방침에 기재할 것을 권고하고 있으며, 필수 기재항목은 아닙니다.' title='미이용자의 개인정보 파기 등에 관한 조치' />
        <Radio.Group onChange={(e: any): void => onChange(THIS_STEP, 'destructionUnused', 'type', e.target.value)}>
          <Space direction='vertical'>
            <Radio key='1' value='파기'>장기 미접속자의 개인정보를 파기합니다.</Radio>
            <Radio key='2' value='분리보관'>장기 미접속자의 개인정보를 분리보관합니다.</Radio>
            <Radio key='3' value='기재안함'>기재안함</Radio>
          </Space>
        </Radio.Group>
      </DIRow>
      <DIRowDivider />
      <DIRow>
        <DIRowHeader description='본 내용은 필수 항목으로 반드시 들어가야합니다.' title='정보주체와 법정대리인의 권리·의무 및 행사방법' />
      </DIRow>
      <DIRowDivider />
      <DIRow>
        <DIRowHeader description='본 내용은 필수 항목으로 반드시 들어가야합니다.' title='개인정보의 안전성 확보조치' />
        <DIRowContent>
          <DIRowSubject title='개인정보를 저장하는 물리적인 공간(전산실, 자료보관실 등)이 있나요?' tools={<YesOrNoRadioButton onChange={(e: any): void => onChange(THIS_STEP, 'safety', 'physical', e.target.value)} size='small' value={data.safety.physical} />} />
        </DIRowContent>
        <DIRowContent>
          <Collapse activeKey={data.safety.usage ? ['1'] : []} ghost>
            <Collapse.Panel header={<DIRowSubject title='개인정보보호 활동을 하거나 국내외 개인정보보호 인증을 보유하고 있나요?' tools={<YesOrNoRadioButton onChange={(e: any): void => onChange(THIS_STEP, 'safety', 'usage', e.target.value)} size='small' value={data.safety.usage} />} />} key='1' showArrow={false}>
              <Form layout='vertical'>
                <Form.Item label='개인정보보호 활동'>
                  <Input onChange={(e: any): void => onChange(THIS_STEP, 'safety', 'activity', e.target.value)} placeholder='개인정보보호 관련 SNS 운영, 투명성 보고서 발간, 자율규제단체 활동 등' value={data.safety.activity} />
                </Form.Item>
                <Form.Item label='국내외 개인정보보호 인증 획득'>
                  <TagSelect onChange={(value: string|string[]): void => onChange(THIS_STEP, 'safety', 'certification', value)} options={certificationForPIP} value={data.safety.certification} />
                </Form.Item>
              </Form>
            </Collapse.Panel>
          </Collapse>
        </DIRowContent> 
      </DIRow>
      <DIRowDivider />
      <DIRow>
        <DIRowHeader description='쿠키 등 자동 수집 장치를 사용하는 경우, 그에 대한 모든 내용이 작성되어야 합니다.' title='개인정보 자동 수집 장치의 설치·운영 및 거부에 관한 사항' />
      </DIRow>
      <DIRowDivider />
      <DIRow>
        <DIRowHeader description='행태정보를 사용하는 경우, 그에 대한 모든 내용이 작성되어야 합니다.' title='행태정보의 수집·이용 및 거부 등에 관한 사항' />
      </DIRow>
      <DIRowDivider />
      <DIRow>
        <DIRowHeader description='사용자의 동의 없이 추가 이용하는 경우, 그에 대한 모든 내용이 작성되어야 합니다.' title='추가적인 이용·제공 판단기준' />
      </DIRow>
      <DIRowDivider />
      <DIRow>
        <Collapse activeKey={data.fni.usage ? ['1'] : []} ghost>
          <Collapse.Panel header={<DIRowHeader description='가명정보를 사용하는 경우, 그에 대한 모든 내용이 작성되어야 합니다. 수정을 원하시는 경우, "수정하기" 버튼을 눌러주세요.' title='가명정보를 처리하나요?' tools={<YesOrNoRadioButton onChange={(e: any): void => onChange(THIS_STEP, 'fni', 'usage', e.target.value)} size='small' value={data.fni.usage} />} />} key='1' showArrow={false} >
            <Button type='default' size='small' style={{ fontSize: 12 }}>수정하기</Button>
          </Collapse.Panel>
        </Collapse>
      </DIRow>
      <DIRowDivider />
      <DIRow>
        <DIRowHeader title='개인정보보호책임자 및 개인정보 열람청구' tools={<Button type='default' size='small' style={{ fontSize: 12 }}>수정하기</Button>} />
      </DIRow>
      <DIRowDivider />
      <DIRow>
        <DIRowHeader description='본 내용은 필수 항목으로 반드시 들어가야합니다.' title='권익침해 구제방법' />
      </DIRow>
      <DIRowDivider />
      <DIRow style={{ marginBottom: 40 }}>
        <DIRowHeader description='영상저보처리기기 운영에 관한 설명 영상저보처리기기 운영에 관한 설명' title='영상정보처리기기(CCTV)를 운영하나요?' tools={<YesOrNoRadioButton onChange={(e: any): void => onChange(THIS_STEP, 'cctv', 'usage', e.target.value)} size='small' value={data.fni.usage} />} />
      </DIRow>
    </>
  );
} 

const PreviewDocumentForPIPP: React.FC<any> = ({ data, mode, refTable, stmt }: any): JSX.Element => {
  // 개인정보 수집 및 이용 데이터 및 라벨링을 위한 데이터 가공 (개인정보 수집 항목)
  const itemForPI: string[] = [];
  const pi: any[] = refTable.pi.map((row: any): void => {
    const edited: any = {};
    Object.keys(row).forEach((key: string): void => {
      if (key === 'essentialItems' && row[key].length > 0) {
        if (edited.item === undefined) {
          edited.item = [];
        }
        edited.item.push(`필수 : ${row[key].join(', ')}`);
        row[key].forEach((item: string): number => !itemForPI.includes(item) ? itemForPI.push(item) : 0);
      } else if (key === 'selectionItems' && row[key].length > 0) {
        if (edited.item === undefined) {
          edited.item = [];
        }
        edited.item.push(`선택 : ${row[key].join(', ')}`);
        row[key].forEach((item: string): number => !itemForPI.includes(item) ? itemForPI.push(item) : 0);
      } else {
        edited[key] = row[key];
      }
    });
    return edited;
  });
  // 라벨링을 위한 데이터 가공 (개인정보 처리목적)
  const purposeForPI: string[] = [];
  refTable.pi.forEach((row: any): void => row.purpose.forEach((item: string): number => !purposeForPI.includes(item) ? purposeForPI.push(item) : 0));
  // 라벨링을 위한 데이터 가공 (개인정보 보유기간)
  const periodForPI: string[] = [];
  refTable.pi.forEach((row: any): void => row.period.forEach((item: string): number => !periodForPI.includes(item) ? periodForPI.push(item) : 0));
  // 라벨링을 위한 데이터 가공 (개인정보의 제공)
  const provision: string[] = refTable.ppi.map((row: any): string => row.recipient);
  // 라벨링을 위한 데이터 가공 (처리 위탁)
  const consignment: string[] = refTable.cpi.map((row: any): string => row.subject);

  return (
    <>
      <h2 style={{ fontSize: 24, fontWeight: '700', lineHeight: '22px', marginBottom: 30, textAlign: 'center' }}>{stmt.title}</h2>
      {mode && mode === 'review' ? (
        <p style={{ color: '#262626', fontSize: 14, fontWeight: '500', lineHeight: '22px', marginBottom: 32, textAlign: 'right' }}>{data.cInfo.applyAt}</p>
      ) : (<></>)}
      <DDRow>
        <DDRowContent items={[`${stmt.introduction}`]} />
      </DDRow>
      {mode && mode === 'review' ? (
        <>
          <DRLabelingHeader description='세부항목은 개인정보 처리방침 본문 확인' title='주요 개인정보 처리 표시' />
          <DRLabelingContent>
            {itemForPI.length > 0 ? (
              <DRLabelingItem type='item' tooltip={itemForPI.length > 5 ? `${itemForPI.slice(0, 5).join(', ')} 등` : itemForPI.join(', ')} />
            ) : (<></>)}
            {purposeForPI.length > 0 ? (
              <DRLabelingItem type='purpose' tooltip={purposeForPI.length > 3 ? `${purposeForPI.slice(0, 3).join(', ')} 등` : purposeForPI.join(', ')} />
            ) : (<></>)}
            {periodForPI.length > 0 ? (
              <DRLabelingItem type='period' tooltip={periodForPI.length > 2 ? `${periodForPI.slice(0, 2).join(', ')} 등` : periodForPI.join(', ')} />
            ) : (<></>)}
            {provision.length > 0 ? (
              <DRLabelingItem type='provision' tooltip={provision.length > 2 ? `${provision.slice(0, 2).join(', ')} 등` : provision.join(', ')} />
            ) : (<></>)}
            {consignment.length > 0 ? (
              <DRLabelingItem type='consignment' tooltip={consignment.length > 3 ? `${consignment.slice(0, 3).join(', ')} 등` : consignment.join(', ')} />
            ) : (<></>)}
            <DRLabelingItem type='complaint' tooltip='담당부서명, 연락처' />
          </DRLabelingContent>
        </>
      ) : (<></>)}
      {mode && mode === 'review' ? (
        <DTCForm>
          <DTCItem content='개인정보의 처리목적, 수집 항목, 보유 및 이용기간' />
          {data.dInfo.child.usage ? (
            <DTCItem content='만 14세 미만 아동의 개인정보 처리에 관한 사항' />
          ) : (<></>)}
          {data.dInfo.provision.usage ? (
            <DTCItem content='개인정보의 제3자 제공' />
          ) : (<></>)}
          {data.dInfo.consignment.usage ? (
            <DTCItem content='개인정보처리의 위탁' />
          ) : (<></>)}
          <DTCItem content='개인정보의 파기 및 절차' />
          {data.dInfo.destructionUnused.type !== undefined && data.dInfo.destructionUnused.type !== 'none'  ? (
            <DTCItem content='미이용자의 개인정보 파기 등에 관한 조치' />
          ) : (<></>)}
          <DTCItem content='정보주체와 법정대리인의 권리·의무 및 행사방법' />
          {data.dInfo.safety.usage ? (
            <DTCItem content='개인정보의 안전성 확보조치' />
          ) : (<></>)}
          <DTCItem content='개인정보의 자동 수집 장치의 설치·운영 및 거부에 관한 사항' />
          <DTCItem content='행태정보의 수집·이용 및 거부 등에 관한 사항' />
          <DTCItem content='추가적인 이용·제공 판단기준' />
          {data.dInfo.fni.usage ? (
            <DTCItem content='가명정보의 처리' />
          ) : (<></>)}
          <DTCItem content='개인정보보호책임자 및 개인정보 열람청구' />
          <DTCItem content='권익침해 구제 방법' />
        </DTCForm>
      ) : (<></>)}
      <DDRow>
        <DDRowHeader title={stmt.pi.title} />
        <DDRowContent items={stmt.pi.content.common[1]} />
        <ReadableTable columns={[
          { title: '구분(업무명)', dataIndex: 'subject', key: 'subject' },
          { title: '처리 목적', dataIndex: 'purpose', key: 'purpose', render: (value: string[]) => (<ListInTable items={value} />) },
          { title: '수집 항목', dataIndex: 'item', key: 'item', render: (value: string[]) => value.map((item: string, index: number): JSX.Element => <div key={index}>{item}</div>) },
          { title: '보유 및 이용기간', dataIndex: 'period', key: 'period', render: (value: string[]) => (<ListInTable items={value} />) },
        ]} dataSource={pi} />
        <DDRowContent items={stmt.pi.content.common[2]} style={{ marginBottom: 0 }} />
        <DDRowItemList items={data.dInfo.period} />
      </DDRow>
      {data.dInfo.child.usage ? (
        <DDRow>
          <DDRowHeader title={stmt.child.title} />
          <DDRowContent items={stmt.child.content.common[1]} style={{ marginBottom: 0 }} />
          <DDRowItemList items={data.dInfo.child.method} />
        </DDRow>
      ) : (<></>)}
      {data.dInfo.provision.usage ? (
        <DDRow>
          <DDRowHeader title={stmt.ppi.title} />
          <DDRowContent items={stmt.ppi.content.common[1]} />
          <ReadableTable columns={[
            { title: '제공받는 자', dataIndex: 'recipient', key: 'recipient' },
            { title: '제공 목적', dataIndex: 'purpose', key: 'purpose', render: (value: string[]) => (<ListInTable items={value} />) },
            { title: '제공 항목', dataIndex: 'items', key: 'items', render: (value: string[]) => (<>{value.join(', ')}</>) },
            { title: '보유 및 이용기간', dataIndex: 'period', key: 'period', render: (value: string[]) => (<ListInTable items={value} />) },
          ]} dataSource={refTable.ppi.filter((item: any): any => !item.isForeign)} />
          {refTable.ppi.some((item: any): boolean => item.isForeign) ? (
            <>
              <DDRowContent items={stmt.ppi.content.foreign[1]} />
              <ReadableTable columns={[
                { title: '업체명', dataIndex: 'recipient', key: 'recipient' },
                { title: '국가', dataIndex: 'country', key: 'country' },
                { title: '위치', dataIndex: 'location', key: 'location' },
                { title: '일시 및 방법', dataIndex: 'method', key: 'method', render: (value: string[]) => (<ListInTable items={value} />) },
                { title: '관리책임자의 연락처', dataIndex: 'charger', key: 'charger' }
              ]} dataSource={refTable.ppi.filter((item: any): boolean => item.isForeign)} />
            </>
          ) : (<></>)}
          <DDRowContent items={stmt.ppi.content.common[2]} />
        </DDRow>
      ) : (<></>)}
      {data.dInfo.consignment.usage ? (
        <DDRow>
          <DDRowHeader title={stmt.cpi.title} />
          <DDRowContent items={stmt.cpi.content.common[1]} />
          <ReadableTable columns={[
            { title: '위탁받는 자(수탁자)', dataIndex: 'company', key: 'company' },
            { title: '위탁업무', dataIndex: 'content', key: 'content', render: (value: string[]) => (<ListInTable items={value} />) },
          ]} dataSource={refTable.cpi.filter((item: any): any => !item.isForeign)} />
          {refTable.cpi.some((item: any): boolean => item.isForeign) ? (
            <>
              <DDRowContent items={stmt.cpi.content.foreign[1]} />
              <ReadableTable columns={[
                { title: '업체명', dataIndex: 'company', key: 'company' },
                { title: '국가', dataIndex: 'country', key: 'country' },
                { title: '위치', dataIndex: 'location', key: 'location' },
                { title: '일시 및 방법', dataIndex: 'method', key: 'method', render: (value: string[]) => (<ListInTable items={value} />) },
                { title: '이전 항목', dataIndex: 'items', key: 'items', render: (value: string[]) => (<ListInTable items={value} />) },
                { title: '보유 및 이용기간', dataIndex: 'period', key: 'period', render: (value: string[]) => (<ListInTable items={value} />) },
                { title: '관리책임자의 연락처', dataIndex: 'charger', key: 'charger' }
              ]} dataSource={refTable.ppi.filter((item: any): boolean => item.isForeign)} />
            </>
          ) : (<></>)}
          <DDRowContent items={stmt.cpi.content.common[2]} />
        </DDRow>
      ) : (<></>)}
      <DDRow>
        <DDRowHeader title={stmt.dpi.title} />
        <DDRowContent items={stmt.dpi.content.common[1]} style={{ marginBottom: 0 }} />
        <DDRowItemList items={stmt.dpi.content.common[2]} />
      </DDRow>
      {data.dInfo.destructionUnused.type && data.dInfo.destructionUnused.type !== '기재안함' ? (
        <DDRow>
          <DDRowHeader title={stmt.dpiUnused.title} />
          {data.dInfo.destructionUnused.type === '파기' ? (
            <DDRowContent items={stmt.dpiUnused.content.common[1]} />
          ) : (
            <DDRowContent items={stmt.dpiUnused.content.separation[1]} />
          )}
        </DDRow>
      ) : (<></>)}
      <DDRow>
        <DDRowHeader title={stmt.agent.title} />
        <DDRowContent items={stmt.agent.content.common[1]} />
      </DDRow>
      <DDRow>
        <DDRowHeader title={stmt.safety.title} />
        <DDRowContent items={stmt.safety.content.common[1]} style={{ marginBottom: 0 }} />
        {data.dInfo.safety.physical ? (
          <DDRowContent items={stmt.safety.content.physical[1]} />
        ) : (<></>)}
        {data.dInfo.safety.usage ? (
          <>
            <DDRowContent items={stmt.safety.content.common[2]} style={{ marginBottom: 0 }} />
            {data.dInfo.safety.activity !== '' && data.dInfo.safety.certification.length > 0 ? (
              <DDRowItemList items={[`개인정보보호 활동 : ${data.dInfo.safety.activity}`, `국내외 개인정보보호 인증 획득: ${data.dInfo.safety.certification.join(', ')}`]} />
            ) : data.dInfo.safety.activity !== '' ? (
              <DDRowItemList items={[`개인정보보호 활동 : ${data.dInfo.safety.activity}`]} />
            ) : data.dInfo.safety.certification.length > 0 ? (
              <DDRowItemList items={[`국내외 개인정보보호 인증 획득: ${data.dInfo.safety.certification.join(', ')}`]} />
            ) : (<></>)}
          </>
        ) : (<></>)}
      </DDRow>
      <DDRow>
        <DDRowHeader title={stmt.auto.title} />
        {data.aInfo.cookie.usage ? (
          <>
            <DDRowContent items={stmt.auto.content.cookie[1]} style={{ marginBottom: 0 }} />
            <DDRowContent items={[
              `1) 쿠키의 사용 목적 : ${data.aInfo.cookie.purpose.join(', ')}`,
              `2) 쿠키 저장 거부 시 불이익 : ${data.aInfo.cookie.disadvantage.join(', ')}`,
              '3) 쿠키의 설치·운영 및 거부 : 웹브라우저 상단의 도구 > 인터넷 옵션 > 개인정보 메뉴의 옵션 설정을 통해 쿠키 저장을 거부 할 수 있습니다.'
            ]} style={{ marginBottom: 0 }} />
            <DDRowItemList items={stmt.auto.content.web[1].concat(stmt.auto.content.app[1])} />
          </>
        ) : (
          <DDRowContent items={stmt.auto.content.common[1]} />
        )}
        {data.aInfo.webLog.usage ? (
          <>
            <DDRowContent items={stmt.auto.content.webLog[1]} style={{ marginBottom: 0 }} />
            <DDRowContent items={[
              `1) 웹 로그 분석 도구의 사용 목적 : ${data.aInfo.webLog.purpose.join(', ')}`,
              '2) 웹 로그 분석 도구의 거부∙차단 방법 :'
            ]} style={{ marginBottom: 0 }} />
            <DDRowItemList items={data.aInfo.webLog.method} />
            <DDRowContent items={[
              `3) 거부 시 불이익 : ${data.aInfo.webLog.disadvantage}`
            ]} />
          </>
        ) : (<></>)}
      </DDRow>
      <DDRow>
        <DDRowHeader title={stmt.shape.title} />
        {data.aInfo.advertising.usage && data.aInfo.thirdParty.usage ? (
          <>
            <DDRowContent items={stmt.shape.content.common[1]} style={{ marginBottom: 0 }} />
            <DDRowContent items={stmt.shape.content.advertising.common[1]} />
            <ReadableTable
              columns={[
                { title: '행태정보 수집 항목', dataIndex: 'items', key: 'items' },
                { title: '수집 방법', dataIndex: 'method', key: 'method' },
                { title: '수집 목적', dataIndex: 'purpose', key: 'purpose' },
                { title: '보유 및 이용기간', dataIndex: 'period', key: 'period' }]}
              dataSource={[
                { 
                  key: '1',
                  items: data.aInfo.advertising.items.join(', '),
                  method: data.aInfo.advertising.method,
                  purpose: data.aInfo.advertising.purpose,
                  period: data.aInfo.advertising.period
                }]}
            />
            <DDRowContent items={stmt.shape.content.thirdParty.common[1]}/>
            <DDRowItemList items={[
              `행태정보를 수집 및 처리하려는 광고 사업자: ${data.aInfo.thirdParty.company.join(', ')}`,
              `형태 정보 수집 방법: ${data.aInfo.thirdParty.method}`,
              `수집∙처리되는 행태정보 항목: ${data.aInfo.thirdParty.items.join(', ')}`,
              `보유 및 이용기간: ${data.aInfo.thirdParty.period}`
            ]} />
            <DDRowContent items={stmt.shape.content.common[2]} style={{ marginBottom: 0 }} />
            <DDRowContent items={stmt.shape.content.app[1].concat(stmt.shape.content.web[1])} style={{ marginBottom: 0 }} />
            <DDRowContent items={stmt.shape.content.common[3]} />
          </>
        ) : data.aInfo.advertising.usage ? (
          <>
            <DDRowContent items={stmt.shape.content.common[1]} style={{ marginBottom: 0 }} />
            <DDRowContent items={stmt.shape.content.advertising.common[1]} />
            <ReadableTable
              columns={[
                { title: '행태정보 수집 항목', dataIndex: 'items', key: 'items' },
                { title: '수집 방법', dataIndex: 'method', key: 'method' },
                { title: '수집 목적', dataIndex: 'purpose', key: 'purpose' },
                { title: '보유 및 이용기간', dataIndex: 'period', key: 'period' }]}
              dataSource={[
                {
                  key: '1',
                  items: data.aInfo.advertising.items.join(', '),
                  method: data.aInfo.advertising.method,
                  purpose: data.aInfo.advertising.purpose,
                  period: data.aInfo.advertising.period
                }]}
            />
            <DDRowContent items={stmt.shape.content.thirdParty.none[1]} style={{ marginBottom: 0 }} />
            <DDRowContent items={stmt.shape.content.common[2]} style={{ marginBottom: 0 }} />
            <DDRowContent items={stmt.shape.content.app[1].concat(stmt.shape.content.web[1])} style={{ marginBottom: 0 }} />
            <DDRowContent items={stmt.shape.content.common[3]} />
          </>
        ) : data.aInfo.thirdParty.usage ? (
          <>
            <DDRowContent items={stmt.shape.content.common[1]} style={{ marginBottom: 0 }} />
            <DDRowContent items={stmt.shape.content.advertising.none[1]} style={{ marginBottom: 0 }} />
            <DDRowContent items={stmt.shape.content.thirdParty.common[1]} style={{ marginBottom: 0 }} />
            <DDRowItemList items={[
              `행태정보를 수집 및 처리하려는 광고 사업자 : ${data.aInfo.thirdParty.company.join(', ')}`,
              `형태 정보 수집 방법 : ${data.aInfo.thirdParty.method}`,
              `수집∙처리되는 행태정보 항목 : ${data.aInfo.thirdParty.items.join(', ')}`,
              `보유 및 이용기간 : ${data.aInfo.thirdParty.period}`
            ]} />
            <DDRowContent items={stmt.shape.content.common[2]} style={{ marginBottom: 0}} />
            <DDRowContent items={stmt.shape.content.app[1].concat(stmt.shape.content.web[1])} style={{ marginBottom: 0 }} />
            <DDRowContent items={stmt.shape.content.common[3]} />
          </>
        ) : (
          <DDRowContent items={stmt.shape.content.none[1]} />
        )}
      </DDRow>
      <DDRow>
        <DDRowHeader title={stmt.additional.title} />
        {data.aInfo.additional.usage ? (
          <>
            <DDRowContent items={stmt.additional.content.common[1]} />
            <ReadableTable
              columns={[
                { title: '항목', dataIndex: 'items', key: 'items' },
                { title: '이용·제공 목적', dataIndex: 'purpose', key: 'purpose' },
                { title: '보유 및 이용기간', dataIndex: 'period', key: 'period' }]}
              dataSource={[
                { 
                  key: '1',
                  items: data.aInfo.additional.items.join(', '),
                  purpose: data.aInfo.additional.purpose,
                  period: data.aInfo.additional.period
                }]}
            />
            <DDRowContent items={stmt.additional.content.common[2]} style={{ marginBottom: 0 }} />
            <DDRowItemList items={stmt.additional.content.common[3]} />
          </>
        ) : (
          <DDRowContent items={stmt.additional.content.none[1]}></DDRowContent>
        )}
      </DDRow>
      {data.dInfo.fni.usage ? (
        <DDRow>
          <DDRowHeader title={stmt.fni.title} />
          <DDRowContent items={stmt.fni.content.common[1]} />
          <DDRowContent items={stmt.fni.content.common[2]} style={{ marginBottom: 0 }} />
          {data.dInfo.safety.physical ? (
            <DDRowContent items={stmt.fni.content.common[3]} style={{ marginBottom: 0 }} />
          ) : (<></>)}  
        </DDRow>
      ) : (<></>)}
      <DDRow>
        <DDRowHeader title={stmt.charger.title} />
        <DDRowContent items={stmt.charger.content.common[1]} />
        <ReadableTable columns={[
          { title: '구분', dataIndex: 'identity', key: 'identity' },
          { title: '담당자', dataIndex: 'charger', key: 'charger' },
          { title: '연락처', dataIndex: 'contact', key: 'contact' }
        ]} />
        <DDRowContent items={stmt.charger.content.common[2]} />
      </DDRow>
      <DDRow>
        <DDRowHeader title={stmt.help.title} />
        <DDRowContent items={stmt.help.content.common[1]} style={{ marginBottom: 0 }} />
        <DDRowItemList items={stmt.help.content.common[2]} />
        <DDRowContent items={stmt.help.content.common[3]} style={{ marginBottom: 0 }} />
        <DDRowItemList items={stmt.help.content.common[4]} />
      </DDRow>
    </>
  );
}

const ConfirmForDocumentation: React.FC<any> = ({ data, onChange, refTable }: any): JSX.Element => {
  const THIS_STEP: string = 'cInfo';

  const [visible, setVisible] = useState<boolean>(false);
  const onOpen = (): void => setVisible(true);
  const onClose = (): void => setVisible(false);

  return (
    <>
      <DIRow>
        <DIRowHeader description='개인정보 처리방침이 적용될 날짜를 선택하여 주세요.' title='개인정보 처리방침 최종 게재일' />
        <DIRowContent>
          <DatePicker allowClear disabledDate={(current: moment.Moment) => current && current < moment().endOf('day').days(0) } format='YYYY-MM-DD' mode='date' onChange={(value: any): void => onChange(THIS_STEP, 'applyAt', undefined, value.format('YYYY-MM-DD'))} style={{ width: '30%' }} />
        </DIRowContent>
      </DIRow>
      <DIRowDivider />
      <DIRow>
        <Collapse activeKey={data[THIS_STEP].previous.usage ? ['1'] : []} ghost>
          <Collapse.Panel header={<DIRowHeader description='개인정보 처리방침 갱신 시, 이전 처리방침도 반드시 확인할 수 있어야합니다. 따라서, 본 처리방침 이전에 게재되어 있는 처리방침의 URL을 입력하여 주세요.' title='이전 개인정보 처리방침이 있나요?' tools={<YesOrNoRadioButton onChange={(e: any): void => onChange(THIS_STEP, 'previous', 'usage', e.target.value)} size='small' value={data[THIS_STEP].previous.usage} />} />} key='1' showArrow={false} >
            <Row gutter={16}>
              <Col span={8}>
                <DIRowSubject title='적용일자' />
              </Col>
              <Col span={16}>
                <DIRowSubject title='개인정보 처리방침 URL' />
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={8}>
                <DatePicker allowClear format='YYYY-MM-DD' mode='date' style={{ width: '100%' }} />
              </Col>
              <Col span={12}>
                <Input placeholder='http|https://' />
              </Col>
              <Col span={4}>
                <div style={{ alignItems: 'center', display: 'flex', fontSize: 18, lineHeight: '16px', height: '100%' }}>
                  <span style={{ color: '#8C8C8C', cursor: 'pointer' }}>
                    <AiOutlineMinusCircle />
                  </span>
                </div>
              </Col>
            </Row>
          </Collapse.Panel>
        </Collapse>
      </DIRow>
      <DIRowDivider />
      <DIRow>
        <DIRowHeader description='최종 단계 완료시, 다음과 같이 개인정보처리방침이 생성됩니다. 게재 후에는 수정 및 삭제가 불가능합니다.' title='개인정보 처리방침 미리보기' />
        <Button type='primary' onClick={onOpen}>작성정보 확인</Button>
      </DIRow>
      <Modal centered onCancel={onClose} visible={visible} style={{ paddingBottom: 56, top: 56 }} width='80%'>
        <PreviewDocumentForPIPP data={data} mode='review' refTable={refTable} stmt={stmt(data.dInfo.name)} />
      </Modal>
    </>
  );
}

const ReadableTable: React.FC<any> = ({ columns, dataSource }: any): JSX.Element => {
  return (
    <DDRowTableForm>
      <Table columns={columns} dataSource={dataSource} pagination={false} size='small' />
    </DDRowTableForm>
  );
}
const ListInTable: React.FC<any> = ({ items }: any): JSX.Element => {
  return (
    <ul style={{ margin: 0, paddingLeft: 14 }}>
      {items.map((item: string, index: number): JSX.Element => <li key={index}>{item}</li>)}
    </ul>
  );
}