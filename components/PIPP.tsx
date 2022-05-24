import React, { useRef } from 'react';
import { useEffect, useState } from 'react';
// Component
import { Button, Col, Collapse, DatePicker, Input, Modal, Radio, Row, Space, Table, TreeSelect } from 'antd';
import { PageHeaderContainStep } from './common/Header';
import { StyledTableForm, TableFormHeader } from './common/Table';
import { CollapseForPIPP } from './common/Collapse';
import { createNotification, createSimpleWarningNotification, createWarningMessage } from './common/Notification';
import { YesOrNoRadioButton } from './common/Radio';
import { AddableTagSelect } from './common/Select';
import { DDRow, DDRowContent, DDRowHeader, DDRowItemList, DDRowTableForm, DIInputGroup, DIRow, DIRowContent, DIRowDivider, DIRowHeader, DIRowSubject, DRLabelingContent, DRLabelingHeader, DRLabelingItem, DRModal, DTCForm, DTCItem } from './pipp/Documentation';
// Data
import { certificationForPIP, methodOfConfirmConsentOfLegalRepresentative, periodOfRetentionAndUseOfPersonalInformation } from '../models/static/selectOption';
import { statementForPIPP as stmt } from '../models/static/statement';
import { defaultPIPPData } from '../models/static/data';
// Icon
import { EditOutlined, PlusOutlined, RedoOutlined } from '@ant-design/icons';
import { FiEdit } from 'react-icons/fi';
// Module
import { FNITable, PITable } from './PITable';
import { CFNITable, CPITableForm, PFNITable, PPITableForm } from './PCTable';
import { QueryClient, useQueries, useQuery } from 'react-query';
import { API_DT_CPI, API_DT_FNI, API_DT_LIST, API_DT_PPI, getDataForPIPP, getListForPIM, PIMType, saveDocumentationForPIPP } from '../models/queryState';
// Type
import { DocProgressStatus } from '../models/type';

/** [Interface] PIPP process */
interface PIPPProcess {
  onProcess: (process: DocProgressStatus) => void;
  status?: string;
}
/** [Type] Scroll position */
type ScrollPosition = 'start'|'end';

/**
 * [Component] 개인정보 처리방침 메인 페이지
 */
export const PIPPMain: React.FC<PIPPProcess> = ({ onProcess, status }: PIPPProcess): JSX.Element => {
  return (
    <>
      <MainPageHeader onProcess={onProcess} status={status} />
      <StyledTableForm>
        <TableFormHeader title='개인정보 처리방침 이력' />
        <Table columns={[
          { title: '목록', dataIndex: 'version', key: 'version' },
          { title: '구분', dataIndex: 'sortation', key: 'sortation' },
          { title: '최종 편집일', dataIndex: 'editedAt', key: 'editedAt' },
          { title: '적용 일자', dataIndex: 'applyAt', key: 'applyAt' }
        ]} dataSource={[]} />
      </StyledTableForm>
    </>
  );
}
/**
 * [Component] 개인정보 처리방침 생성 페이지
 */
export const CreatePIPPForm: React.FC<any> = ({ onBack, progress }: any): JSX.Element => {
  const { isLoading, data: loadData } = useQuery('pipp', async () => await getDataForPIPP('b7dc6570-4be9-4710-85c1-4c3788fcbd12'));

  // 단계에 대한 Title
  const steps: string[] = ['입력사항 확인', '처리방침 편집', '최종 확인'];
  // 현재 Step, 쿼리 상태, 참조 데이터에 대한 상태 생성
  const [initQuery, setInitQuery] = useState<boolean>(false);
  const [stepIndex, setStepIndex] = useState<number>(0);
  const [ref, setRef] = useState<any>({
    pi: [],
    ppi: [],
    cpi: [],
    fni: [],
    pfni: [],
    cfni: []
  });
  // Focus에 따른 스크롤 이동을 위한 엘리멘트 참조 객체
  const refs: any = {
    input: useRef([]),
    preview: useRef([])
    // index
    // 0 : name
    // 1 : pi
    // 2 : child
    // 3 : ppi
    // 4 : cpi
    // 5 : destructionUnused
    // 6 : safety
    // 7 : fni
    // 8 : manager
  };
  // 최종 문서 확인 모달을 위한 visible 상태
  const [visible, setVisible] = useState<boolean>(false);
  // 처리방침 생성 과정에서 사용될 데이터 구조
  const [data, setData] = useState<any>(defaultPIPPData);

  useEffect(() => {
    if (progress === 'update' && loadData) {
      setData(loadData);
    }
  }, [isLoading]);

  /** [Event handler] 데이터 변경 이벤트 */
  const onChange = (step: string, value: any, category: string, property?: string, subProperty?: string): void => {
    if (property!== undefined && subProperty !== undefined) {
      setData({ ...data, [step]: { ...data[step], [category]: { ...data[step][category], [property]: { ...data[step][category][property], [subProperty]: value } } } });
    } else if (property !== undefined) {
      setData({ ...data, [step]: { ...data[step], [category]: { ...data[step][category], [property]: value } } });
    } else {
      setData({ ...data, [step]: { ...data[step], [category]: value } });
    }
  }
  /** [Event handler] 포커스에 따라 스코롤 이동 이벤트 (Prview part) */
  const onFocus = (type: string, index: number, pos?: ScrollPosition) => { refs[type].current[index] ? refs[type].current[index].scrollIntoView((type === 'preview' && (index === 1 || index === 3 || index === 4 || index === 7)) ? { block: pos ? pos : 'start' } : { behavior: 'smooth' , block: pos ? pos : 'start' }) : undefined };
  /** [Event handler] 단계 이동 이벤트 */
  const onMoveStep = (type: string): void => {
    if (type === 'prev') {
      stepIndex - 1 >= 0 ? setStepIndex(stepIndex - 1) : undefined;
    } else if (type === 'next') {
      if (stepIndex === 0) {
        const aInfo: any = data.aInfo;
        // 모든 질문에 대한 응답 확인
        if (Object.keys(aInfo).some((key: string): boolean => aInfo[key].usage === undefined)) {
          createSimpleWarningNotification('모든 사항에 대해 입력해주세요', 2, 'bottomRight');
        } else if (aInfo.cookie.usage && (aInfo.cookie.purpose.length === 0 || aInfo.cookie.disadvantage.length === 0)) {
          createWarningMessage('쿠키 사용 질의에 대한 응답을 입력해주세요', 2);
        } else if (aInfo.webLog.usage && (aInfo.webLog.purpose.length === 0 || aInfo.webLog.method.length === 0 || blankCheck(data.aInfo.webLog.disadvantage))) {
          createWarningMessage('웹 로그 분석도구 사용 질의에 대한 응답을 입력해주세요', 2);
        } else if (aInfo.advertising.usage && (aInfo.advertising.items.length === 0 || blankCheck(aInfo.advertising.method) || blankCheck(aInfo.advertising.purpose) || blankCheck(aInfo.advertising.period))) {
          createWarningMessage('타겟 광고 질의에 대한 응답을 입력해주세요', 2);
        } else if (aInfo.thirdParty.usage && (aInfo.thirdParty.company.length === 0 || aInfo.thirdParty.items.length === 0 || blankCheck(aInfo.thirdParty.method) || blankCheck(aInfo.thirdParty.period))) {
          createWarningMessage('제 3자 허용 질의에 대한 응답을 입력해주세요', 2);
        } else if (aInfo.additional.usage && (aInfo.additional.items.length === 0 || aInfo.additional.purpose.length === 0 || blankCheck(aInfo.additional.period))) {
          createSimpleWarningNotification('추가 이용 및 제공 질의에 대한 응답을 입력해주세요', 2);
        } else {
          stepIndex + 1 <= steps.length ? setStepIndex(stepIndex + 1) : undefined;
        }
      } else if (stepIndex === 1) {
        const dInfo: any = data.dInfo;
        if (blankCheck(dInfo.name)) {
          createWarningMessage('개인정보 처리자명 또는 서비스명을 입력해주세요', 2);
          onFocus('input', 0);
        } else if (dInfo.period.length === 0) {
          createWarningMessage('관계 법령에 따른 개인정보의 보유 및 이용기간에 대한 응답을 해주세요', 2);
          onFocus('input', 1);
        } else if (dInfo.child.usage === undefined) {
          createWarningMessage('만 14세 미만 아동의 개인정보 처리 사항에 대해 응답해주세요', 2);
          onFocus('input', 2);
        } else if (dInfo.child.usage && dInfo.child.method.length === 0) {
          createWarningMessage('법정대리인의 동의 확인 방법을 지정해주세요', 2);
          onFocus('input', 2);
        } else if (dInfo.provision.usage === undefined) {
          createWarningMessage('개인정보 제공 여부에 대해 응답해주세요', 2);
          onFocus('input', 3);
        } else if (dInfo.consignment.usage && ref.ppi.length === 0) {
          createWarningMessage('개인정보 제공에 대한 데이터가 없습니다', 2);
          onFocus('input', 3);
        } else if (dInfo.consignment.usage === undefined) {
          createWarningMessage('개인정보 위탁 여부에 대해 응답해주세요', 2);
          onFocus('input', 4);
        } else if (dInfo.consignment.usage && ref.cpi.length === 0) {
          createWarningMessage('개인정보 위탁에 대한 데이터가 없습니다', 2);
          onFocus('input', 4);
        } else if (dInfo.destructionUnused.type === undefined) {
          createWarningMessage('미이용자의 개인정보 파기 등에 관한 조치에 대해 응답해주세요', 2);
          onFocus('input', 5);
        } else if (dInfo.safety.usage && (blankCheck(dInfo.safety.activity) || dInfo.safety.certification.length === 0)) {
          createWarningMessage('개인정보보호 활동 내역 또는 국내외 개인정보보호 인증에 대한 입력을 해주세요', 2);
          onFocus('input', 6);
        } else if (dInfo.fni.usage === undefined) {
          createWarningMessage('가명정보 처리 여부에 대해 응답해주세요', 2);
          onFocus('input', 7);
        } else if (blankCheck(dInfo.manager.charger.name) || blankCheck(dInfo.manager.charger.position)) {
          createWarningMessage('개인정보보호 책임자에 대한 정보를 입력해주세요', 2);
          onFocus('input', 8);
        } else if (blankCheck(dInfo.manager.request.department) || blankCheck(dInfo.manager.request.charger) || blankCheck(dInfo.manager.request.contact)) {
          createWarningMessage('개인벙보 열람청구에 대한 정보를 입력해주세요', 2);
          onFocus('input', 8);
        }
        else {
          stepIndex + 1 <= steps.length ? setStepIndex(stepIndex + 1) : undefined;
        }
      }
    } else if (type === 'complete') {
      const cInfo: any = data.cInfo;
      if (blankCheck(cInfo.applyAt)) {
        createWarningMessage('개인정보 처리방침 최종 게제일에 대해 응답해주세요', 2);
      } else {
        onOpen();
      }
    }
  }
  /** [Event handler] 임시 저장 이벤트 */
  const onSave = async (): Promise<void> => {
    const response = await saveDocumentationForPIPP('b7dc6570-4be9-4710-85c1-4c3788fcbd12', data, progress);
    if (response) {
      const result = await response.json();
      if (result.status === "OK") {
        createNotification('임시 저장 완료');
      } else {
        createSimpleWarningNotification('임시 저장 실패');
      }
    }
  };
  /** [Event handler] 모달 열기 */
  const onOpen = (): void => setVisible(true);
   /** [Event handler] 모달 닫기 */
  const onClose = (): void => setVisible(false);
  /** [Query handler] API를 요청하여 데이터를 갱신하기 위해 호출되는 함수 */
  const onRefresh = (): void => setInitQuery(false);

  // 데이터 쿼리 (API 호출)
  const results = useQueries(API_DT_LIST.map((type: string): any => ({ queryKey: type, queryFn: async () => await getListForPIM('b7dc6570-4be9-4710-85c1-4c3788fcbd12', type as PIMType) })));
  // 요청으로 응답된 데이터 가공 및 처리
  if (results.every((result: any): boolean => !result.isLoading)) {
    if (!initQuery) {
      setInitQuery(true);
      // 가공을 위한 임시 데이터 셋 정의
      const tempRef: any = {};
      const tempData: any = JSON.parse(JSON.stringify(data.dInfo));
      // 데이터 가공 및 처리
      API_DT_LIST.forEach((type: string, index: number): any => {
        tempRef[type] = results[index].isSuccess ? results[index].data ? results[index].data : [] : [];
        if (type === API_DT_PPI && tempRef[type].length > 0) {
          tempData.provision.usage = true;
        } else if (type === API_DT_CPI && tempRef[type].length > 0) {
          tempData.consignment.usage = true;
        } else if (type === API_DT_FNI && tempRef[type].length > 0) {
          tempData.fni.usage = true;
        }
      });
      // 참조 데이터 갱신
      setRef(tempRef);
      // 상태 데이터 갱신
      setData({ ...data, dInfo: { ...tempData } });
    }
  }

  // 개인정보 수집 및 이용 데이터 및 라벨링을 위한 데이터 가공 (개인정보 수집 항목)
  const itemForPI: string[] = [];
  ref.pi.forEach((row: any): void => {
    if ('essentialItems' in row) {
      row['essentialItems'].forEach((item: string): number => !itemForPI.includes(item) ? itemForPI.push(item) : 0);
    }
    if ('selectionItems' in row) {
      row['selectionItems'].forEach((item: string): number => !itemForPI.includes(item) ? itemForPI.push(item) : 0);
    }
  });
  // 컴포넌트 반환
  return (
    <>
      <PageHeaderContainStep current={stepIndex} goTo='/doc/pipp' onBack={onBack} onMove={onMoveStep} onSave={onSave} title='개인정보 처리방침 만들기' steps={steps} />
      <div style={{ display: stepIndex === 0 ? 'block' : 'none', marginBottom: '3rem' }}>
        <CollapseForPIPP data={data.aInfo} items={itemForPI} onChange={onChange} />
      </div>
      <div style={{ display: stepIndex === 1 ? 'block' : 'none' }}>
        <CreatePIPP data={data} onChange={onChange} onFocus={onFocus} onRefresh={onRefresh} refElements={refs} refTable={ref} />
      </div>
      <div style={{ display: stepIndex === 2 ? 'block' : 'none' }}>
        <ConfirmForDocumentation data={data} onChange={onChange} refTable={ref} />
      </div>
      <DRModal centered onCancel={onClose} visible={visible} style={{ paddingBottom: 56, top: 56 }} width='80%'>
        <PreviewDocumentForPIPP data={data} preview={false} refTable={ref} stmt={stmt(data.dInfo.name)} />
      </DRModal>
    </>
  );
}
/**
 * [Internal Component] 개인정보 처리방침 메인 페이지 Header (현재 문서 작성에 대한 상태에 따라 내용 변경)
 */
const MainPageHeader: React.FC<PIPPProcess> = ({ onProcess, status }: PIPPProcess): JSX.Element => {
  return (
    <div style={{ marginBottom: 84, userSelect: 'none' }}>
      <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between', marginBottom: 36 }}>
        <h2 style={{ color: '#000000D9', fontSize: 20, fontWeight: '600', lineHeight: '24px' }}>개인정보 처리방침 생성</h2>
        <Button type='default'>처리방침 생성 가이드</Button>
      </div>
      <div style={{ alignItems: 'center', backgroundColor: '#FAFAFA', border: '1px dashed #8C8C8C', borderRadius: 8, display: 'flex', justifyContent: 'space-between', padding: '42px 34px' }}>
        <span style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}>
          <FiEdit style={{ color: '#8C8C8C', fontSize: 20, marginRight: 24 }} />
          <p style={{ color: '#434343', fontSize: 14, fontWeight: '600', lineHeight: '22px', marginBottom: 0 }}>
            {status === undefined || status === 'none' ? (
              <>개인정보 관리 탭에서 입력한 내용을 기반으로, 개인정보 처리방침을 만들어보세요!</>
            ) : status === 'progress' ? (
              <>현재 작성 중인 개인정보 처리방침이 있어요.<br/>계속해서 작성하기를 원하시는 경우 ‘이어 만들기’ 버튼을<br/>처음부터 새로 만들기 원하신다면 ‘문서 생성하기’ 버튼을 눌러주세요.</>
            ) : (
              <>처리하는 개인정보에 대한 내용이 변경되면, 개인정보 처리방침을 업데이트해야 됩니다.<br/>‘문서 업데이트’ 기능으로 간단히 수정해보세요!</>
            )}
          </p>
        </span>
        {status === undefined || status === 'none' ? (
          <Button icon={<PlusOutlined />} onClick={() => onProcess('create')} type='primary'>문서 생성하기</Button>
        ) : status === 'progress' ? (
          <span>
            <Button icon={<EditOutlined />} onClick={() => onProcess('update')} type='primary' style={{ marginRight: 16 }}>이어 만들기</Button>
            <Button icon={<PlusOutlined />} onClick={() => onProcess('create')} type='default'>문서 생성하기</Button>
          </span>
        ) : (
          <Button icon={<RedoOutlined />} onClick={() => onProcess('update')} type='primary'>문서 업데이트</Button>
        )}
        </div>
    </div>
  );
}
/**
 * [Internal Component] 개인정보 관리 테이블에 대한 수정을 위한 팝업
 */
export const EditableModal: React.FC<any> = ({ onClose, type, visible }: any): JSX.Element => {
  // 팝업 제목, 내용에 대한 상태 정의
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<JSX.Element>(<></>);
  // 유형에 따라 제목 및 내용 변경
  useEffect(() => {
    switch (type) {
      case 'pi':
        setTitle('개인정보 수집 및 이용');
        setContent(<PITable />);
        break;
      case 'ppi':
        setTitle('개인정보 제공');
        setContent(<PPITableForm modal={true} />);
        break;
      case 'cpi':
        setTitle('개인정보 위탁');
        setContent(<CPITableForm modal={true} />);
        break;
      case 'fni':
        setTitle('가명정보');
        setContent(
          <>
            <h2 style={{ fontSize: 15, fontWeight: '500', marginBottom: 4 }}>가명정보 수집 및 이용</h2>
            <FNITable modal={true} />
            <h2 style={{ fontSize: 15, fontWeight: '500', marginBottom: 4, marginTop: 20 }}>가명정보 제공</h2>
            <PFNITable modal={true} />
            <h2 style={{ fontSize: 15, fontWeight: '500', marginBottom: 4, marginTop: 20 }}>가명정보 위탁</h2>
            <CFNITable modal={true} />
          </>
        );
        break;
      default:
        setTitle('');
        setContent(<></>);
        break;
    }
  }, [type]);
  // 컴포넌트 반환
  return (
    <Modal centered footer={false} onCancel={onClose} style={{ fontFamily: 'Pretendard' }} title={title} visible={visible} width='80%'>{content}</Modal>
  );
}

const CreatePIPP: React.FC<any> = ({ onChange, data, onFocus, onRefresh, refElements, refTable }: any): JSX.Element => {
  const queryClient = new QueryClient();

  const [open, setOpen] = useState<boolean>(false);
  const [refType, setRefType] = useState<string>('');

  const onOpen = (type: string): void => {
    setRefType(type);
    setOpen(true);
  }
  const onClose = (): void => {
    setOpen(false);
    queryClient.invalidateQueries(refType);
    onRefresh();
  }

  // Return an element
  return (
    <>
      <Row gutter={74} style={{ height: 'calc(100vh - 324px)' }}>
        <Col span={12} style={{ height: '100%', overflowY: 'auto' }}>
          <InputFormToCreateDocumentation data={data.dInfo} onChange={onChange} onFocus={onFocus} openModal={onOpen} refElements={refElements.input} refTable={refTable} />
        </Col>
        <Col span={12} style={{ borderLeft: '1px solid rgba(156, 156, 156, 0.3)', height: '100%', overflowY: 'auto' }}>
          <PreviewDocumentForPIPP data={data} preview={true} refElements={refElements.preview} refTable={refTable} stmt={stmt(data.dInfo.name)} />
        </Col>
      </Row>
      <EditableModal onClose={onClose} type={refType} visible={open} />
    </>
  );
}

const InputFormToCreateDocumentation: React.FC<any> = ({ data, onChange, onFocus, openModal, refElements, refTable }: any): JSX.Element => {
  const THIS_STEP: string = 'dInfo';
  // 예시 데이터 가공 (관계 법령에 따른 개인정보 보유 및 이용기간)
  const exampleForPeriodPI: string[] = [];
  Object.keys(periodOfRetentionAndUseOfPersonalInformation).forEach((law: string): number => exampleForPeriodPI.push(...periodOfRetentionAndUseOfPersonalInformation[law].map((item: string): string => `${law} : ${item}`)));
  // 예시 데이터 가공 (법정대리인의 동의 확인 방법)
  const exampleForMethodConsent: any[] = methodOfConfirmConsentOfLegalRepresentative.map((item: string): any => ({ title: item, value: item }));
  // Return an element
  return (
    <>
      <DIRow self={refElements ? (el: any) => (refElements.current[0] = el) : undefined}>
        <DIRowHeader description='개인정보 처리방침에 기재될 개인정보처리자명 또는 서비스명을 입력해주세요.\n작성된 명칭은 제목 및 본문에 기재되어 본 개인정보 처리방침의 적용 범위를 알려줍니다.' required title='개인정보 처리자명 또는 서비스명' />
        <DIRowContent>
          <Input allowClear onChange={(e: any) => onChange(THIS_STEP, e.target.value, 'name')} onClick={() => onFocus('preview', 0)} placeholder='개인정보 처리자명 또는 서비스명' value={data.name} />
        </DIRowContent>
      </DIRow>
      <DIRowDivider />
      <DIRow self={refElements ? (el: any) => (refElements.current[1] = el) : undefined}>
        <DIRowHeader description='이 부분은 개인정보 처리방침에서 가장 중요한 내용입니다.\n각 업무 안에서 처리하는 목적을 모두 나열하고, 필수항목과 선택항목을 나누어 기재해야 합니다. 보유 및 이용기간은 업무별로 필요한 기간을 정하여 작성해주시면 됩니다.(항목들을 이용하는 기간 뿐만 아니라 저장·보관하는 기간이 모두 포함됩니다.)' required title='개인정보의 처리목적, 수집 항목, 보유 및 이용기간' tools={<Button onClick={(): void => { openModal('pi'); onFocus('preview', 1); }} size='small' style={{ fontSize: 12, padding: '0 12px' }} type='default'>수정하기</Button>} />
        <DIRowContent>
          <DIRowSubject description='위에서 정한 기간과 별도로, 관련 법령에 따라 개인정보를 보유해야 하는 경우에는 해당되는 법령을 모두 기재해야 합니다. 아래 보기에서 선택하거나 형식에 맞춰 입력해주세요.' required title='관계 법령에 따른 개인정보의 보유 및 이용기간' />
          <AddableTagSelect onChange={(value: string|string[]): void => onChange(THIS_STEP, value, 'period')} onClick={() => onFocus('preview', 1, 'end')} options={exampleForPeriodPI} value={data.period} />
        </DIRowContent>
      </DIRow>
      <DIRowDivider />
      <DIRow self={refElements ? (el: any) => (refElements.current[2] = el) : undefined}>
        <Collapse activeKey={data.child.usage ? ['1'] : []} ghost>
          <Collapse.Panel header={<DIRowHeader description='만 14세 미만 아동의 개인정보를 처리하고 있다면 그에 관한 안내를 기재할 것을 권고하고 있습니다. 현재 법정대리인의 동의를 확인하기 위해 사용하는 방법을 아래에서 선택하면, 개인정보보호위원회에서 권장하는 안내 사항과 함께 입력됩니다.' required style={{ marginBottom: 0 }} title='만 14세 미만 아동의 개인정보를 처리하나요?' tools={<YesOrNoRadioButton onChange={(e: any): void => { onChange(THIS_STEP, e.target.value, 'child', 'usage'); e.target.value ? onFocus('preview', 2) : undefined }} size='small' value={data.child.usage} />} />} key='1' showArrow={false}>
            <DIRowSubject required title='법정대리인의 동의 확인 방법' />
            <TreeSelect showArrow={false} treeData={exampleForMethodConsent} treeCheckable={true} onChange={(value: string[]): void => onChange(THIS_STEP, value, 'child', 'method')} placeholder='예시에서 선택' style={{ width: '100%' }} value={data.child.method} />
          </Collapse.Panel>
        </Collapse>
      </DIRow>
      <DIRowDivider />
      <DIRow self={refElements ? (el: any) => (refElements.current[3] = el) : undefined}>
        <Collapse activeKey={data.provision.usage ? ['1'] : []} ghost>
          <Collapse.Panel header={<DIRowHeader description='제3자의 목적을 위해 개인정보를 제공하면 그에 관한 사항을 반드시 안내해야 합니다. \n개인정보를 제공한 건 중 아직 ‘제공받은 자의 보유 및 이용 기간’이 남아있는 건은 해당 내용을 모두 기재해야 합니다. 만약 제공된 개인정보가 국외에서 처리되고 있다면, 그에 관한 내용도 추가로 작성되어야 합니다.\n※ 제공받는 자에 관한 내용은 별도의 페이지로 만들어 링크를 통해 확인하게 할 수도 있습니다.' required style={{ marginBottom: 0 }} title='개인정보를 제3자에게 제공하나요?' tools={<YesOrNoRadioButton disabled={refTable.ppi.length !== 0} onChange={(e: any): void => { onFocus('preview', 3); onChange(THIS_STEP,  e.target.value, 'provision', 'usage') }} size='small' value={data.provision.usage === undefined ? undefined : data.provision.usage} />} />} key='1' showArrow={false}>
            <Button onClick={(): void => { openModal('ppi'); onFocus('preview', 3); }} size='small' style={{ fontSize: 12, padding: '0 12px' }} type='default'>수정하기</Button>
          </Collapse.Panel>
        </Collapse>
      </DIRow>
      <DIRowDivider />
      <DIRow self={refElements ? (el: any) => (refElements.current[4] = el) : undefined}>
        <Collapse activeKey={data.consignment.usage ? ['1'] : []} ghost>
          <Collapse.Panel header={<DIRowHeader description='개인정보 처리를 위탁하고 있다면, 그에 관한 사항을 반드시 안내해야 합니다(예: AWS, 채널톡, Google Analytics 등). 만약 위탁한 개인정보가 국외에서 처리되고 있다면, 그에 관한 내용도 추가로 작성되어야 합니다.\n개인정보 처리 업무를 위해 이용하고 있는 업체명과 위탁 업무 내용이 모두 기재되어있는지 확인해주세요.' required style={{ marginBottom: 0 }} title='위탁하는 개인정보가 있나요?' tools={<YesOrNoRadioButton disabled={refTable.cpi.length !== 0} onChange={(e: any): void => { onFocus('preview', 4); onChange(THIS_STEP, e.target.value, 'consignment', 'usage') }} size='small' value={data.consignment.usage === undefined ? undefined : data.consignment.usage} />} />} key='1' showArrow={false} >
            <Button onClick={(): void => { openModal('cpi'); onFocus('preview', 4); }} size='small' style={{ fontSize: 12, padding: '0 12px' }} type='default'>수정하기</Button>
          </Collapse.Panel>
        </Collapse>
      </DIRow>
      <DIRowDivider />
      <DIRow>
        <DIRowHeader description='보유 및 이용기간이 끝난 개인정보의 파기에 관한 안내는 필수 기재사항입니다. 이에 관하여 ‘개인정보 보호법령에서 권장하는 파기방법과 절차를 준수하고 있다’는 내용을 자동으로 입력해드립니다.' style={{ marginBottom: 0 }} title='개인정보의 파기' />
      </DIRow>
      <DIRowDivider />
      <DIRow self={refElements ? (el: any) => (refElements.current[5] = el) : undefined}>
        <DIRowHeader description='개인정보 보호법에 따라, 서비스를 1년간 이용하지 않은 이용자의 정보는 파기하거나 분리보관해야 합니다. 개인정보보호위원회에서는 이에 대한 조치 사항을 기재할 것을 권고하고 있으며, 필수 기재항목은 아닙니다.\n현재 1년간 이용하지 않은 이용자의 정보에 대해 어떤 조치를 취하고 계신지 아래에서 선택하시면, 그에 맞는 내용이 삽입되거나 삭제됩니다.' required title='미이용자의 개인정보 파기 등에 관한 조치' />
        <Radio.Group onChange={(e: any): void => { onFocus('preview', 5); onChange(THIS_STEP, e.target.value, 'destructionUnused', 'type') }} value={data.destructionUnused.type}>
          <Space direction='vertical'>
            <Radio key='1' value='destruction'>장기 미접속자의 개인정보를 파기합니다.</Radio>
            <Radio key='2' value='separation'>장기 미접속자의 개인정보를 분리보관합니다.</Radio>
            <Radio key='3' value='none'>기재안함</Radio>
          </Space>
        </Radio.Group>
      </DIRow>
      <DIRowDivider />
      <DIRow>
        <DIRowHeader description='이용자들이 본인의 개인정보를 열람·수정·파기 등을 요청할 수 있는 권리를 보장하는 방법에 관한 안내는 필수 기재사항입니다. 이에 관하여 ‘개인정보 보호법령에서 권장하는 방법을 준수하고 있다’는 내용을 자동으로 입력해드립니다.' title='정보주체와 법정대리인의 권리·의무 및 행사방법' />
      </DIRow>
      <DIRowDivider />
      <DIRow self={refElements ? (el: any) => (refElements.current[6] = el) : undefined}>
        <DIRowHeader description='회사가 개인정보의 안전을 위해 취하고 있는 조치는 필수 기재사항입니다. \n개인정보가 보관되는 물리적 공간(개인정보 처리시스템이 있는 전산실 또는 하드카피가 보관된 캐비넷 등)이 있는 경우, ‘예’를 선택하시면 이에 관한 내용도 입력됩니다. 추가로, 개인정보 보호에 관한 활동이나 인증을 받은 내용이 있다면 함께 기재해주세요.' title='개인정보의 안전성 확보조치' />
        <DIRowContent>
          <DIRowSubject title='개인정보를 저장하는 물리적인 공간(전산실, 자료보관실 등)이 있나요?' tools={<YesOrNoRadioButton onChange={(e: any): void => { onChange(THIS_STEP, e.target.value, 'safety', 'physical'); e.target.value ? onFocus('preview', 6) : undefined }} size='small' value={data.safety.physical} />} />
        </DIRowContent>
        <DIRowContent>
          <Collapse activeKey={data.safety.usage ? ['1'] : []} ghost>
            <Collapse.Panel header={<DIRowSubject style={{ marginBottom: 0 }} title='개인정보보호 활동을 하거나 국내외 개인정보보호 인증을 보유하고 있나요?' tools={<YesOrNoRadioButton onChange={(e: any): void =>  { onChange(THIS_STEP, e.target.value, 'safety', 'usage'); e.target.value ? onFocus('preview', 6) : undefined }} size='small' value={data.safety.usage} />} />} key='1' showArrow={false}>
              <DIInputGroup label='개인정보보호 활동' style={{ marginBottom: 8 }}>
                <Input onChange={(e: any): void => onChange(THIS_STEP, e.target.value, 'safety', 'activity')} placeholder='개인정보보호 관련 SNS 운영, 투명성 보고서 발간, 자율규제단체 활동 등' value={data.safety.activity} />
              </DIInputGroup>
              <DIInputGroup label='국내외 개인정보보호 인증 획득'>
                <AddableTagSelect onChange={(value: string|string[]): void => onChange(THIS_STEP, value, 'safety', 'certification')} options={certificationForPIP} value={data.safety.certification} />
              </DIInputGroup>
            </Collapse.Panel>
          </Collapse>
        </DIRowContent> 
      </DIRow>
      <DIRowDivider />
      <DIRow>
        <DIRowHeader description='쿠키(cookie)나 트래픽 분석도구(e.g., Google Analytics, Naver Analytics) 등과 같이 개인정보를 자동으로 수집하는 장치를 사용하는 경우, 설치·운영 및 그 거부에 관한 사항을 기재해야 합니다.\n수정이 필요한 경우, 이전 단계로 이동하여 내용을 변경하시면 자동으로 반영됩니다.' style={{ marginBottom: 0 }} title='개인정보 자동 수집 장치의 설치·운영 및 거부에 관한 사항' />
      </DIRow>
      <DIRowDivider />
      <DIRow>
        <DIRowHeader description='이용자의 온라인 행태정보를 처리하고 이를 기반으로 ‘온라인 맞춤형 광고’ 등을 제공하는 경우, 그에 관한 사항을 기재하여야 합니다. 수정이 필요한 경우, 이전 단계로 이동하여 내용을 변경하시면 자동으로 반영됩니다.' style={{ marginBottom: 0 }} title='행태정보의 수집·이용 및 거부 등에 관한 사항' />
      </DIRow>
      <DIRowDivider />
      <DIRow>
        <DIRowHeader description='정보주체의 동의 없이 개인정보를 추가적으로 이용·제공하는 경우, 개인정보 보호법령에 명시된 고려사항에 대해 이용이 가능하다고 판단한 기준을 기재해야 합니다.\n수정이 필요한 경우, 이전 단계로 이동하여 내용을 변경하시면 자동으로 반영됩니다.' style={{ marginBottom: 0 }} title='추가적인 이용·제공 판단기준' />
      </DIRow>
      <DIRowDivider />
      <DIRow self={refElements ? (el: any) => (refElements.current[7] = el) : undefined}>
        <Collapse activeKey={data.fni.usage ? ['1'] : []} ghost>
          <Collapse.Panel header={<DIRowHeader description='개인정보처리자는 개인정보 보호법 제28조의2에 따라 개인정보를 가명처리 하거나 가명처리된 정보를 처리하는 경우, 이에 관한 내용을 개인정보 처리방침에 기재해야 합니다.\n‘수정하기’ 버튼을 눌러 내용을 변경하시면 자동으로 저장 및 반영됩니다.' required style={{ marginBottom: 0 }} title='가명정보를 처리하나요?' tools={<YesOrNoRadioButton disabled={refTable.fni.length !== 0} onChange={(e: any): void => { onChange(THIS_STEP, e.target.value, 'fni', 'usage'); e.target.value ? onFocus('preview', 7) : undefined }} size='small' value={data.fni.usage} />} />} key='1' showArrow={false} >
            <Button onClick={(): void => { openModal('fni'); onFocus('preview', 7); }} type='default' size='small' style={{ fontSize: 12, padding: '0 12px' }}>수정하기</Button>
          </Collapse.Panel>
        </Collapse>
      </DIRow>
      <DIRowDivider />
      <DIRow self={refElements ? (el: any) => (refElements.current[8] = el) : undefined}>
        <DIRowHeader title='개인정보보호책임자 및 개인정보 열람청구' />
        <DIRowSubject description='개인정보 보호책임자의 성명, 부서의 명칭과 연락처에 관한 안내는 필수 기재사항입니다. 연락처의 경우 직통 연락처가 아닌, 정보주체의 개인정보 관련 문의나 고충처리를 담당하는 개인정보 보호책임자의 소속 부서 연락처 등을 기재해도 됩니다.' required title='개인정보보호 책임자' />
        <Row gutter={8} style={{ marginBottom: 24 }}>
          <Col span={7}>
            <DIInputGroup label='직책'>
              <Input allowClear onChange={(e: any) => onChange(THIS_STEP, e.target.value, 'manager', 'charger', 'position')} onClick={() => onFocus('preview', 8)} value={data.manager.charger.position} />
            </DIInputGroup>
          </Col>
          <Col span={7}>
            <DIInputGroup label='성명'>
              <Input allowClear onChange={(e: any) => onChange(THIS_STEP, e.target.value, 'manager', 'charger', 'name')} onClick={() => onFocus('preview', 8)} value={data.manager.charger.name} />
            </DIInputGroup>
          </Col>
          <Col span={10}>
            <DIInputGroup label='연락처'>
              <Input allowClear onChange={(e: any) => onChange(THIS_STEP, e.target.value, 'manager', 'charger', 'contact')} onClick={() => onFocus('preview', 8)} placeholder='예 : privacy@company.com' value={data.manager.charger.contact} />
            </DIInputGroup>
          </Col>
        </Row>
        {/* <Button size='small' style={{ fontSize: 12, marginBottom: 24, padding: '0 12px' }} type='default'>수정하기</Button> */}
        <DIRowSubject description='필요에 따라 개인정보보호 담당부서와 연락처 정보도 함께 안내하는 것을 권장합니다.' title='개인정보보호 담당부서' />
        <Row gutter={8} style={{ marginBottom: 24 }}>
          <Col span={10}>
            <DIInputGroup label='부서명'>
              <Input allowClear onChange={(e: any) => onChange(THIS_STEP, e.target.value, 'manager', 'department', 'name')} onClick={() => onFocus('preview', 8)} placeholder='예 : 정보보안팀' value={data.manager.department.name} />
            </DIInputGroup>
          </Col>
          <Col span={14}>
            <DIInputGroup label='연락처'>
              <Input allowClear onChange={(e: any) => onChange(THIS_STEP, e.target.value, 'manager', 'department', 'contact')} onClick={() => onFocus('preview', 8)} placeholder='예 : privacy@company.com' value={data.manager.department.contact} />
            </DIInputGroup>
          </Col>
        </Row>
        <DIRowSubject description='이용자들이 개인정보 열람청구를 신청할 수 있는 부서명과 담당자 및 연락처에 관한 안내는 필수 기재사항입니다.' required title='개인정보 열람청구' />
        <Row gutter={8}>
          <Col span={7}>
            <DIInputGroup label='부서명'>
              <Input allowClear onChange={(e: any) => onChange(THIS_STEP, e.target.value, 'manager', 'request', 'department')} onClick={() => onFocus('preview', 8)} placeholder='예 : 정보보안팀' value={data.manager.request.department} />
            </DIInputGroup>
          </Col>
          <Col span={7}>
            <DIInputGroup label='담당자명'>
              <Input allowClear onChange={(e: any) => onChange(THIS_STEP, e.target.value, 'manager', 'request', 'charger')} onClick={() => onFocus('preview', 8)} placeholder='예 : 김OO' value={data.manager.request.charger} />
            </DIInputGroup>
          </Col>
          <Col span={10}>
            <DIInputGroup label='연락처'>
              <Input allowClear onChange={(e: any) => onChange(THIS_STEP, e.target.value, 'manager', 'request', 'contact')} onClick={() => onFocus('preview', 8)} placeholder='예 : privacy@company.com' value={data.manager.request.contact} />
            </DIInputGroup>
          </Col>
        </Row>
      </DIRow>
      <DIRowDivider />
      <DIRow>
        <DIRowHeader description='이용자가 개인정보 침해에 대한 구제를 받을 수 있도록 법에 따른 전문기관 및 수사기관 등을 안내해야 합니다. 개인정보처리자를 통한 피해구제가 원만하게 이뤄지지 않을 경우, 정보주체가 추가적으로 피해 구제를 요청할 수 있는 방법에 관한 안내 또한 필수 기재사항입니다. 이에 관하여 개인정보보호위원회에서 권장하는 안내문을 자동으로 입력해드립니다.' style={{ marginBottom: 0 }} title='권익침해 구제방법' />
      </DIRow>
      <DIRowDivider />
      <DIRow style={{ marginBottom: 80 }}>
        <DIRowHeader description='CCTV 운영자는 ‘영상정보처리기기 운영·관리 방침’을 별도로 정하여 공개해야 합니다. 개인정보 보호법 표준지침에 따라 개인정보 처리방침에 포함시켜 정할 수도 있으나, 가독성을 높이기 위해 별도의 문서로 마련할 것을 권장드립니다.\n‘영상정보처리기기 운영·관리 방침’ 작성 템플릿은 추후 서비스 제공 예정입니다.' style={{ marginBottom: 0 }} title='영상정보처리기기(CCTV)를 운영하나요?' />
      </DIRow>
    </>
  );
} 

const PreviewDocumentForPIPP: React.FC<any> = ({ data, preview, refElements, refTable, stmt }: any): JSX.Element => {
  const managerTableData: any[] = [];
  if (!blankCheck(data.dInfo.manager.charger.name) || !blankCheck(data.dInfo.manager.charger.position) || !blankCheck(data.dInfo.manager.charger.contact)) {
    managerTableData.push({ identity: '개인정보보호책임자', charger: !blankCheck(data.dInfo.manager.charger.name) && !blankCheck(data.dInfo.manager.charger.position) ? [`직책 : ${data.dInfo.manager.charger.position}`, `성명 : ${data.dInfo.manager.charger.name}`] : !blankCheck(data.dInfo.manager.charger.position) ? [`직책 : ${data.dInfo.manager.charger.position}`] : !blankCheck(data.dInfo.manager.charger.name) ? [`성명 : ${data.dInfo.manager.charger.name}`] : [], contact: !blankCheck(data.dInfo.manager.charger.contact) ? data.dInfo.manager.charger.contact : '' });
  }
  if (!blankCheck(data.dInfo.manager.department.name) || !blankCheck(data.dInfo.manager.department.contact)) {
    managerTableData.push({ identity: '개인정보 담당부서', charger: !blankCheck(data.dInfo.manager.department.name) ? [`부서명 : ${data.dInfo.manager.department.name}`] : [], contact: !blankCheck(data.dInfo.manager.department.contact) ? data.dInfo.manager.department.contact : '' });
  }
  if (!blankCheck(data.dInfo.manager.request.department) || !blankCheck(data.dInfo.manager.request.charger) || !blankCheck(data.dInfo.manager.request.contact)) {
    managerTableData.push({ identity: '개인정보 열람청구', charger: !blankCheck(data.dInfo.manager.request.department) && !blankCheck(data.dInfo.manager.request.charger) ? [`부서명 : ${data.dInfo.manager.request.department}`, `담당자 성명 : ${data.dInfo.manager.request.charger}`] : !blankCheck(data.dInfo.manager.request.department) ? [`부서명 : ${data.dInfo.manager.request.department}`] : !blankCheck(data.dInfo.manager.request.charger) ? [`담당자 성명 : ${data.dInfo.manager.request.charger}`] : [], contact: !blankCheck(data.dInfo.manager.request.contact) ? data.dInfo.manager.request.contact : '' });
  }
  // 개인정보 수집 및 이용 데이터 및 라벨링을 위한 데이터 가공 (개인정보 수집 항목)
  const itemForPI: string[] = [];
  const pi: any[] = refTable.pi ? refTable.pi.map((row: any): void => {
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
  }) : [];
  // 라벨링을 위한 데이터 가공 (개인정보 처리목적)
  const purposeForPI: string[] = [];
  refTable.pi ? refTable.pi.forEach((row: any): void => row.purpose.forEach((item: string): number => !purposeForPI.includes(item) ? purposeForPI.push(item) : 0)) : undefined;
  // 라벨링을 위한 데이터 가공 (개인정보 보유기간)
  const periodForPI: string[] = [];
  refTable.pi ? refTable.pi.forEach((row: any): void => row.period.forEach((item: string): number => !periodForPI.includes(item) ? periodForPI.push(item) : 0)) : undefined;
  // 라벨링을 위한 데이터 가공 (개인정보의 제공)
  const provision: string[] = refTable.ppi ? refTable.ppi.map((row: any): string => row.recipient) : [];
  // 라벨링을 위한 데이터 가공 (처리 위탁)
  const consignment: string[] = refTable.cpi ? refTable.cpi.map((row: any): string => row.subject) : [];
  // 컴포넌트 반환
  return (
    <>
      <h2 ref={refElements ? (el: any) => (refElements.current[0] = el) : undefined} style={{ fontSize: preview ? 18 : 24, fontWeight: '700', lineHeight: '22px', marginBottom: 30, textAlign: 'center' }}>{stmt.title}</h2>
      {!preview ? (
        <p style={{ color: '#262626', fontSize: 14, fontWeight: '500', lineHeight: '22px', marginBottom: 32, textAlign: 'right' }}>{data.cInfo.applyAt}</p>
      ) : (<></>)}
      <DDRow>
        <DDRowContent items={[`${stmt.introduction}`]} />
      </DDRow>
      {!preview ? (
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
            <DRLabelingItem type='complaint' tooltip={`담당부서명 : ${data.dInfo.manager.request.department}, 연락처 : ${data.dInfo.manager.request.contact}`} />
          </DRLabelingContent>
        </>
      ) : (<></>)}
      {!preview ? (
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
          {data.dInfo.destructionUnused.type && data.dInfo.destructionUnused.type !== 'none'  ? (
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
        <DDRowHeader self={refElements ? (el: any) => (refElements.current[1] = el) : undefined} title={stmt.pi.title} />
        <DDRowContent items={stmt.pi.content.common[1]} />
        <ReadableTable columns={[
          { title: '구분(업무명)', dataIndex: 'subject', key: 'subject', width: '16%' },
          { title: '처리 목적', dataIndex: 'purpose', key: 'purpose', render: (value: string[]) => (<ListInTable items={value} />), width: '24%' },
          { title: '수집 항목', dataIndex: 'item', key: 'item', render: (value: string[]) => value.map((item: string, index: number): JSX.Element => <div key={index}>{item}</div>), width: '36%' },
          { title: '보유 및 이용기간', dataIndex: 'period', key: 'period', render: (value: string[]) => (<ListInTable items={value} />), width: '24%' },
        ]} dataSource={pi} />
        <DDRowContent items={stmt.pi.content.common[2]} style={{ marginBottom: 0 }} />
        <DDRowItemList items={data.dInfo.period} />
      </DDRow>
      <DDRow self={refElements ? (el: any) => (refElements.current[2] = el) : undefined}>
        {data.dInfo.child.usage ? (
          <>
            <DDRowHeader title={stmt.child.title} />
            <DDRowContent items={stmt.child.content.common[1]} style={{ marginBottom: 0 }} />
            <DDRowItemList items={data.dInfo.child.method} />
          </>
        ) : (<></>)}
      </DDRow>
      <DDRow self={refElements ? (el: any) => (refElements.current[3] = el) : undefined}>
        {data.dInfo.provision.usage ? (
          <>
            <DDRowHeader title={stmt.ppi.title} />
            <DDRowContent items={stmt.ppi.content.common[1]} />
            <ReadableTable columns={[
              { title: '제공받는 자', dataIndex: 'recipient', key: 'recipient', width: '16%' },
              { title: '제공받는 자의 목적', dataIndex: 'purpose', key: 'purpose', render: (value: string[]) => (<ListInTable items={value} />), width: '24%' },
              { title: '제공 항목', dataIndex: 'items', key: 'items', render: (value: string[]) => (<>{value.join(', ')}</>), width: '36%' },
              { title: '보유 및 이용기간', dataIndex: 'period', key: 'period', render: (value: string[]) => (<ListInTable items={value} />), width: '24%' },
            ]} dataSource={refTable.ppi} />
            {refTable.ppi ? refTable.ppi.some((item: any): boolean => item.isForeign) ? (
              <>
                <DDRowContent items={stmt.ppi.content.foreign[1]} />
                <ReadableTable columns={[
                  { title: '업체명', dataIndex: 'recipient', key: 'recipient', width: '15%', },
                  { title: '국가', dataIndex: 'country', key: 'country', width: '11%' },
                  { title: '위치', dataIndex: 'location', key: 'location', width: '22%' },
                  { title: '일시 및 방법', dataIndex: 'method', key: 'method', render: (value: string[]) => (<ListInTable items={value} />), width: '30%' },
                  { title: '관리책임자의 연락처', dataIndex: 'charger', key: 'charger', width: '22%' }
                ]} dataSource={refTable.ppi ? refTable.ppi.filter((item: any): boolean => item.isForeign) : []} />
              </>
            ) : (<></>) : (<></>)}
            <DDRowContent items={stmt.ppi.content.common[2]} links={stmt.ppi.content.common.link} />
          </>
        ) : (<></>)}
      </DDRow>
      <DDRow self={refElements ? (el: any) => (refElements.current[4] = el) : undefined}>
        {data.dInfo.consignment.usage ? (
          <>
            <DDRowHeader title={stmt.cpi.title} />
            <DDRowContent items={stmt.cpi.content.common[1]} />
            <ReadableTable columns={[
              { title: '위탁받는 자(수탁자)', dataIndex: 'company', key: 'company', width: '42%' },
              { title: '위탁업무', dataIndex: 'content', key: 'content', render: (value: string[]) => (<ListInTable items={value} />), width: '58%' },
            ]} dataSource={refTable.cpi} />
            {refTable.cpi ? refTable.cpi.some((item: any): boolean => item.isForeign) ? (
              <>
                <DDRowContent items={stmt.cpi.content.foreign[1]} />
                <ReadableTable columns={[
                  { title: '업체명', dataIndex: 'company', key: 'company' },
                  { title: '국가', dataIndex: 'country', key: 'country' },
                  { title: '위치', dataIndex: 'address', key: 'address' },
                  { title: '일시 및 방법', dataIndex: 'method', key: 'method', render: (value: string[]) => (<ListInTable items={value} />) },
                  { title: '이전 항목', dataIndex: 'items', key: 'items', render: (value: string[]) => (<ListInTable items={value} />) },
                  { title: '보유 및 이용기간', dataIndex: 'period', key: 'period', render: (value: string[]) => (<ListInTable items={value} />) },
                  { title: '관리책임자의 연락처', dataIndex: 'charger', key: 'charger', render: (value: string[]) => (<ListInTable items={value} />) }
                ]} dataSource={refTable.cpi ? refTable.cpi.filter((item: any): boolean => item.isForeign) : []} />
              </>
            ) : (<></>) : (<></>)}
            <DDRowContent items={stmt.cpi.content.common[2]} />
          </>
        ) : (<></>)}
      </DDRow>
      <DDRow>
        <DDRowHeader title={stmt.dpi.title} />
        <DDRowContent items={stmt.dpi.content.common[1]} style={{ marginBottom: 0 }} />
        <DDRowItemList items={stmt.dpi.content.common[2]} />
      </DDRow>
      <DDRow self={refElements ? (el: any) => (refElements.current[5] = el) : undefined}>
        {data.dInfo.destructionUnused.type !== undefined && data.dInfo.destructionUnused.type !== 'none' ? (
          <>
            <DDRowHeader title={stmt.dpiUnused.title} />
            {data.dInfo.destructionUnused.type === 'destruction' ? (
              <DDRowContent items={stmt.dpiUnused.content.common[1]} />
            ) : (
              <DDRowContent items={stmt.dpiUnused.content.separation[1]} />
            )}
          </>
        ) : (<></>)}
      </DDRow>
      <DDRow>
        <DDRowHeader title={stmt.agent.title} />
        <DDRowContent items={stmt.agent.content.common[1]} />
      </DDRow>
      <DDRow self={refElements ? (el: any) => (refElements.current[6] = el) : undefined}>
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
        {data.aInfo.cookie.usage && data.aInfo.webLog.usage ? (
          <>
            <DDRowContent items={stmt.auto.content.cookie[1]} style={{ marginBottom: 0 }} />
            <DDRowContent items={[
              `1) 쿠키의 사용 목적 : ${data.aInfo.cookie.purpose.join(', ')}`,
              `2) 쿠키 저장 거부 시 불이익 : ${data.aInfo.cookie.disadvantage.join(', ')}`,
              '3) 쿠키의 설치·운영 및 거부 : 브라우저나 앱의 종류에 따라 아래의 방법으로 쿠키의 저장을 거부할 수 있습니다.'
            ]} style={{ marginBottom: 0 }} />
            <DDRowItemList items={stmt.auto.content.web[1].concat(stmt.auto.content.app[1])} links={stmt.auto.content.web.link} />
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
        ) : data.aInfo.cookie.usage ? (
          <>
            <DDRowContent items={stmt.auto.content.cookie[1]} style={{ marginBottom: 0 }} />
            <DDRowContent items={[
              `1) 쿠키의 사용 목적 : ${data.aInfo.cookie.purpose.join(', ')}`,
              `2) 쿠키 저장 거부 시 불이익 : ${data.aInfo.cookie.disadvantage.join(', ')}`,
              '3) 쿠키의 설치·운영 및 거부 : 브라우저나 앱의 종류에 따라 아래의 방법으로 쿠키의 저장을 거부할 수 있습니다.'
            ]} style={{ marginBottom: 0 }} />
            <DDRowItemList items={stmt.auto.content.web[1].concat(stmt.auto.content.app[1])} links={stmt.auto.content.web.link} />
          </>
        ) : data.aInfo.webLog.usage ? (
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
        ) : (<DDRowContent items={stmt.auto.content.none[1]} />)}
      </DDRow>
      <DDRow>
        <DDRowHeader title={stmt.shape.title} />
        {data.aInfo.advertising.usage && data.aInfo.thirdParty.usage ? (
          <>
            <DDRowContent items={stmt.shape.content.common[1]} style={{ marginBottom: 0 }} />
            <DDRowContent items={stmt.shape.content.advertising.common[1]} />
            <ReadableTable
              columns={[
                { title: '행태정보 수집 항목', dataIndex: 'items', key: 'items', width: '24%' },
                { title: '수집 방법', dataIndex: 'method', key: 'method', width: '26%' },
                { title: '수집 목적', dataIndex: 'purpose', key: 'purpose', width: '26%' },
                { title: '보유 및 이용기간', dataIndex: 'period', key: 'period', width: '24%' }]}
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
                { title: '행태정보 수집 항목', dataIndex: 'items', key: 'items', width: '24%' },
                { title: '수집 방법', dataIndex: 'method', key: 'method', width: '26%' },
                { title: '수집 목적', dataIndex: 'purpose', key: 'purpose', width: '26%' },
                { title: '보유 및 이용기간', dataIndex: 'period', key: 'period', width: '24%' }]}
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
        {data.aInfo.additional.usage ? (
          <>
            <DDRowHeader title={stmt.additional.title} />
            <DDRowContent items={stmt.additional.content.common[1]} />
            <ReadableTable
              columns={[
                { title: '항목', dataIndex: 'items', key: 'items', width: '24%' },
                { title: '이용·제공 목적', dataIndex: 'purpose', key: 'purpose', width: '38%' },
                { title: '보유 및 이용기간', dataIndex: 'period', key: 'period', width: '38%' }]}
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
          <></>
        )}
      </DDRow>
      <DDRow self={refElements ? (el: any) => (refElements.current[7] = el) : undefined}>
        {data.dInfo.fni.usage ? (
          <>
            <DDRowHeader title={stmt.fni.title} />
            <DDRowContent items={stmt.fni.content.common[1]} />
            {refTable.fni && refTable.fni.length > 0 ? (
              <>
                <DDRowItemList items={['가명정보의 처리에 관한 사항']} style={{ marginBottom: 4 }} />
                <ReadableTable columns={[
                  { title: '구분', dataIndex: 'subject', key: 'subject', width: '20%' },
                  { title: '처리 목적', dataIndex: 'purpose', key: 'purpose', width: '30%' },
                  { title: '처리 항목', dataIndex: 'items', key: 'items', render: (value: string[]): JSX.Element => (<>{value.join(', ')}</>), width: '24%' },
                  { title: '보유 및 이용기간', dataIndex: 'period', key: 'period', render: (value: string[]): JSX.Element => (<ListInTable items={value} />), width: '26%' }
                ]} dataSource={refTable.fni} />
              </>
            ) : (<></>)}
            {refTable.pfni && refTable.pfni.length > 0 ? (
              <>
                <DDRowItemList items={['가명정보의 제3자 제공에 관한 사항']} style={{ marginBottom: 4 }} />
                <ReadableTable columns={[
                  { title: '제공받는 자', dataIndex: 'recipient', key: 'recipent', width: '20%' },
                  { title: '제공 목적', dataIndex: 'purpose', key: 'purpose', render: (value: string[]): JSX.Element => (<ListInTable items={value} />), width: '30%' },
                  { title: '제공 항목', dataIndex: 'items', key: 'items', render: (value: string[]): JSX.Element => (<>{value.join(', ')}</>), width: '24%' },
                  { title: '보유 및 이용기간', dataIndex: 'period', key: 'period', render: (value: string[]): JSX.Element => (<ListInTable items={value} />), width: '26%' }
                ]} dataSource={refTable.pfni} />
              </>
            ) : (<></>)}
            {refTable.cfni && refTable.cfni.length > 0 ? (
              <>
                <DDRowItemList items={['가명정보 처리의 위탁에 관한 사항']} style={{ marginBottom: 4 }} />
                <ReadableTable columns={[
                  { title: '위탁받는 자(수탁자)', dataIndex: 'company', key: 'company', width: '42%' },
                  { title: '위탁 업무', dataIndex: 'content', key: 'content', width: '58%' }
                ]} dataSource={refTable.cfni} />
              </>
            ) : (<></>)}
            <DDRowContent items={stmt.fni.content.common[2]} style={{ marginBottom: 0 }} />
            {data.dInfo.safety.physical === 'active' ? (
              <DDRowContent items={stmt.fni.content.common[3]} style={{ marginBottom: 0 }} />
            ) : (<></>)}  
          </>
        ) : (<></>)}
      </DDRow>
      <DDRow self={refElements ? (el: any) => (refElements.current[8] = el) : undefined}>
        <DDRowHeader title={stmt.manager.title} />
        <DDRowContent items={stmt.manager.content.common[1]} />
        <ReadableTable columns={[
          { title: '구분', dataIndex: 'identity', key: 'identity', width: '26%' },
          { title: '담당자', dataIndex: 'charger', key: 'charger', render: (value: string[]) => value.map((item: string, index: number): JSX.Element => (<p key={index} style={{ margin: 0 }}>{item}</p>)), width: '40%' },
          { title: '연락처', dataIndex: 'contact', key: 'contact', width: '34%' }
        ]} dataSource={managerTableData} />
        <DDRowContent items={stmt.manager.content.common[2]} />
      </DDRow>
      <DDRow style={preview ? { marginBottom: 80 } : undefined}>
        <DDRowHeader title={stmt.help.title} />
        <DDRowContent items={stmt.help.content.common[1]} style={{ marginBottom: 0 }} />
        <DDRowItemList items={stmt.help.content.common[2]} />
        <DDRowContent items={stmt.help.content.common[3]} style={{ marginBottom: 0 }} />
        <DDRowItemList items={stmt.help.content.common[4]} />
      </DDRow>
      {preview ? (<></>) : (
        <DDRow>
          <DDRowHeader title='이전 개인정보 처리 방침' />
          <DDRowItemList items={[]} />
        </DDRow>
      )}
    </>
  );
}

const ConfirmForDocumentation: React.FC<any> = ({ data, onChange, refTable }: any): JSX.Element => {
  const THIS_STEP: string = 'cInfo';
  // 컴포넌트 반환
  return (
    <>
      <DIRow>
        <DIRowHeader description='개인정보 처리방침이 적용될 날짜를 선택하여 주세요.' required title='개인정보 처리방침 최종 게재일' />
        <DIRowContent>
          <Row gutter={16}>
            <Col span={8}>
              <DatePicker allowClear format='YYYY-MM-DD' mode='date' onChange={(value: any): void => onChange(THIS_STEP, value.format('YYYY-MM-DD'), 'applyAt')} style={{ width: '100%' }} />
            </Col>
          </Row>
        </DIRowContent>
      </DIRow>
      <DIRowDivider />
      <DIRow>
        <Collapse activeKey={data[THIS_STEP].previous.usage ? ['1'] : []} ghost>
          <Collapse.Panel header={<DIRowHeader description='개인정보 처리방침 갱신 시, 이전 처리방침도 반드시 확인할 수 있어야 합니다.\n따라서, 본 처리방침 이전에 게재되어 있는 처리방침의 URL을 입력하여 주세요.' style={{ marginBottom: 0 }} title='디팟에서 생성하지 않은 다른 개인정보 처리방침이 있나요?' tools={<YesOrNoRadioButton onChange={(e: any): void => onChange(THIS_STEP, e.target.value, 'previous', 'usage')} size='small' value={data[THIS_STEP].previous.usage} />} />} key='1' showArrow={false} >
            <h4 style={{ color: '#000000D9', fontSize: 14, fontWeight: '500', lineHeight: '22px', marginBottom: 8 }}>이전 개인정보 처리방침 URL</h4>
            <Input allowClear onChange={(e: any) => onChange(THIS_STEP, e.target.value, 'previous', 'url')} placeholder='https://' value={data[THIS_STEP].previous.url} />
          </Collapse.Panel>
        </Collapse>
      </DIRow>
    </>
  );
}

// const PrevDocInfoItem: React.FC<any> = ({ date, disabled, id, index, last, onAdd, onChange, onDelete, url }: any): JSX.Element => {
//   return (
//     <div style={{ display: 'flex', marginBottom: last ? 0 : 8 }}>
//       <Row gutter={16} style={{ flex: 1 }}>
//         <Col span={8}>
//           <DatePicker allowClear disabled={disabled} format='YYYY-MM-DD' mode='date' onChange={(value: any): void => onChange(index, 'applyAt', value.format('YYYY-MM-DD'))} style={{ width: '100%' }} value={date !== '' ? moment(date, 'YYYY-MM-DD') : undefined} />
//         </Col>
//         <Col span={12}>
//           <Input allowClear disabled={disabled} onChange={(e: any): void => onChange(index, 'url', e.target.value)} placeholder='https://' value={url} />
//         </Col>
//         <Col span={4} style={{ alignItems: 'center', display: 'flex', fontSize: 18, paddingLeft: 16 }}>
//           <AiOutlineMinusCircle onClick={() => onDelete(id)} style={{ color: '#8C8C8C', cursor: 'pointer' }} />
//           {last ? (
//             <AiOutlinePlusCircle onClick={() => onAdd()} style={{ color: '#096DD9', cursor: 'pointer', marginLeft: 12 }} />
//           ) : (<></>)}
//         </Col>
//       </Row>
//     </div>
//   );
// }

const ReadableTable: React.FC<any> = ({ columns, dataSource }: any): JSX.Element => {
  return (
    <DDRowTableForm>
      <Table columns={columns} dataSource={dataSource} pagination={false} size='small' />
    </DDRowTableForm>
  );
}
const ListInTable: React.FC<any> = ({ items }: any): JSX.Element => {
  return (
    <>
      {items ? (
        <ul style={{ margin: 0, paddingLeft: 14 }}>
          {items.map((item: string, index: number): JSX.Element => <li key={index}>{item}</li>)}
        </ul>
      ) : (<></>)}
    </>
  );
}

const blankCheck = (value: string): boolean => {
  const blankPattern: RegExp = /^\s+|\s+$/g;
  return value.trim().replace(blankPattern, '') === '';
}