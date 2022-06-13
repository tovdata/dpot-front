import React, { useCallback, useMemo, useRef } from 'react';
import { useEffect, useState } from 'react';
// Component
import { Button, Col, Input, Modal, Popover, Result, Row, Table, Tag } from 'antd';
import { PageHeaderContainStep } from './common/Header';
import { StyledTableForm, TableFormHeader } from './common/Table';
import { CollapseForPIPP } from './pipp/Collapse';
import { successNotification, warningNotification } from './common/Notification';
// Data
import { statementForPIPP as stmt } from '../models/static/statement';
import { defaultPIPPData } from '../models/static/data';
// Icon
import { CheckCircleOutlined, EditOutlined, LinkOutlined, PlusOutlined, RedoOutlined } from '@ant-design/icons';
import { FiEdit } from 'react-icons/fi';
// Modulex
import moment from 'moment';
import { FNITable, PITable } from './PITable';
import { CFNITableForm, CPITableForm, PFNITableForm, PPITableForm } from './PCTable';
import { useQueries, useQuery, useQueryClient } from 'react-query';
import { getListForPIM, PIMType } from '../models/queryState';
// Type
import { DocProgressStatus } from '../models/type';
import { InputSection, PreviewSection } from './pipp/EditForm';
import { DRModal } from './pipp/Documentation';
import { ConfirmSection } from './pipp/ConfirmForm';
import { SERVICE_CFNI, SERVICE_CPI, SERVICE_FNI, SERVICE_LIST, SERVICE_PFNI, SERVICE_PI, SERVICE_PIPP, SERVICE_PPI } from '../models/queries/type';
import { BasicPageLoading } from './common/Loading';
import { getPIPPData, setPIPPData } from '../models/queries/api';

/** [Interface] PIPP process */
interface PIPPProcess {
  list?: any[];
  onProcess: (process: DocProgressStatus) => void;
  status?: string;
}
/** [Type] Scroll position */
type ScrollPosition = 'start'|'end';

/**
 * [Component] 개인정보 처리방침 메인 페이지
 */
export const PIPPMain: React.FC<PIPPProcess> = ({ list, onProcess, status }: PIPPProcess): JSX.Element => {
  return (
    <>
      <MainPageHeader onProcess={onProcess} status={status} />
      <StyledTableForm>
        <TableFormHeader title='개인정보 처리방침 이력' />
        <Table columns={[
          { title: '목록', dataIndex: 'version', key: 'version', render: (value: number, record: any): string => record.version === 0 ? '이전 개인정보 처리방침' : `개인정보 처리방침 (ver. ${value === 9999 ? 'latest' : value})`, sorter: (a: any, b: any): number => a.version - b.version },
          { title: '구분', dataIndex: 'sortation', key: 'sortation', render: (_: string, record: any): JSX.Element => list ? record.version === 0 ? (<Tag color='default'>외부링크</Tag>) : record.version === 9999 ? (<Tag color='geekblue'>현재</Tag>) : (<Tag color='green'>이전</Tag>) : (<></>) },
          { title: '최종 편집일', dataIndex: 'createAt', key: 'createAt', render: (value: number, record: any): string => record.version === 0 ? '-' : moment.unix(value / 1000).format('YYYY-MM-DD HH:mm'), sorter: (a: any, b: any): number => a.createAt - b.createAt },
          { title: '적용 일자', dataIndex: 'applyAt', key: 'applyAt', render: (value: number, record: any): string => record.version === 0 ? '-' : moment.unix(value).format('YYYY-MM-DD'), sorter: (a: any, b: any): number => a.applyAt - b.applyAt },
          { title: '링크', dataIndex: 'url', key: 'url', render: (value: string) => <a href={value} style={{ color: '#000000D9', cursor: 'pointer' }} target='_blank' rel='noreferrer'><LinkOutlined /></a> }
        ]} dataSource={list} showSorterTooltip={false} />
      </StyledTableForm>
    </>
  );
}
/**
 * [Component] 개인정보 처리방침 생성 페이지
 */
export const CreatePIPPForm: React.FC<any> = ({ list, onBack, onUpdateStatus, progress, status }: any): JSX.Element => {
  // 데이터 불러오기에 대한 상태
  const [loading, setLoading] = useState<boolean>(true);
  // 개인정보 처리방침에 대한 임시 저장 데이터 불러오기
  const { isLoading: isLoadingForData, data: loadData } = useQuery(SERVICE_PIPP, async () => await getPIPPData('b7dc6570-4be9-4710-85c1-4c3788fcbd12'));
  // 테이블 데이터 쿼리 (API 호출)
  const results = useQueries(SERVICE_LIST.map((type: string): any => ({ queryKey: type, queryFn: async () => await getListForPIM('b7dc6570-4be9-4710-85c1-4c3788fcbd12', type as PIMType) })));
  // 로딩 데이터 Hook
  useEffect(() => setLoading(isLoadingForData || results.some((result: any): boolean => result.isLoading)), [isLoadingForData, results]);
  // 임시 저장 데이터가 있을 경우, 데이터 갱신
  useEffect(() => (progress === 'update' && !isLoadingForData && loadData !== undefined) ? setData({ ...loadData, dInfo: { ...loadData.dInfo, cpi: data.dInfo.cpi, fni: data.dInfo.fni, ppi: data.dInfo.ppi } }) : undefined, [isLoadingForData]);

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
  const [visible2, setVisible2] = useState<boolean>(false);
  // 처리방침 생성 과정에서 사용될 데이터 구조
  const [data, setData] = useState<any>(defaultPIPPData);
  // 생성된 URL
  const [url, setUrl] = useState<string>('');

  // 요청으로 응답된 데이터 가공 및 처리
  if (results.every((result: any): boolean => !result.isLoading)) {
    if (!initQuery) {
      setInitQuery(true);
      // 가공을 위한 임시 데이터 셋 정의
      const tempRef: any = {};
      const tempData: any = JSON.parse(JSON.stringify(data.dInfo));
      // 데이터 가공 및 처리
      SERVICE_LIST.forEach((type: string, index: number): any => {
        tempRef[type] = results[index].isSuccess ? results[index].data ? results[index].data : [] : [];
        // URL filter
        if ((type === SERVICE_PI || type === SERVICE_PPI || type === SERVICE_CPI || type === SERVICE_FNI || type === SERVICE_CFNI || type === SERVICE_PFNI) && tempRef[type].length > 0) {
          if (type in tempData) {
            tempData[type].usage = true;
          }
          // Extract a url
          if (type === SERVICE_PPI || type === SERVICE_PFNI || type === SERVICE_CPI || type === SERVICE_CFNI) {
            let isUrl: boolean = false;
            tempRef[type] = tempRef[type].filter((row: any): boolean => {
              if (row['url'] === undefined) {
                return true;
              } else {
                isUrl = true;
                tempData[type] !== undefined ? tempData[type].url = row['url'] : undefined;
                return false;
              }
            });
            if (!isUrl) {
              tempData[type].url = undefined;
            }
          }
        }
      });
      // 참조 데이터 갱신
      setRef(tempRef);
      // 상태 데이터 갱신
      setData({ ...data, dInfo: { ...tempData } });
    }
  }

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
          warningNotification('모든 내용을 작성해주세요.');
        } else if (aInfo.cookie.usage && (aInfo.cookie.purpose.length === 0 || aInfo.cookie.disadvantage.length === 0)) {
          warningNotification('첫 번째 질문에 대한 내용을 빠짐없이 작성해주세요.');
        } else if (aInfo.webLog.usage && (aInfo.webLog.purpose.length === 0 || aInfo.webLog.method.length === 0 || blankCheck(data.aInfo.webLog.disadvantage))) {
          warningNotification('두 번째 질문에 대한 내용을 빠짐없이 작성해주세요.');
        } else if (aInfo.advertising.usage && (aInfo.advertising.items.length === 0 || blankCheck(aInfo.advertising.method) || blankCheck(aInfo.advertising.purpose) || blankCheck(aInfo.advertising.period))) {
          warningNotification('세 번째 질문에 대한 내용을 빠짐없이 작성해주세요.');
        } else if (aInfo.thirdParty.usage && (aInfo.thirdParty.company.length === 0 || aInfo.thirdParty.items.length === 0 || blankCheck(aInfo.thirdParty.method) || blankCheck(aInfo.thirdParty.period))) {
          warningNotification('네 번째 질문에 대한 내용을 빠짐없이 작성해주세요.');
        } else if (aInfo.additional.usage && (aInfo.additional.items.length === 0 || aInfo.additional.purpose.length === 0 || blankCheck(aInfo.additional.period))) {
          warningNotification('다섯 번째 질문에 대한 내용을 빠짐없이 작성해주세요.');
        } else {
          stepIndex + 1 <= steps.length ? setStepIndex(stepIndex + 1) : undefined;
        }
      } else if (stepIndex === 1) {
        const dInfo: any = data.dInfo;
        if (blankCheck(dInfo.name)) {
          warningNotification('개인정보 처리자명/서비스명을 입력해주세요.');
          onFocus('input', 0);
        } else if (dInfo.period.length === 0) {
          warningNotification('관계 법령을 입력해 주세요.');
          onFocus('input', 1);
        } else if (dInfo.child.usage === undefined) {
          warningNotification('만 14세 미만 아동의 개인정보 처리 여부를 선택해주세요.');
          onFocus('input', 2);
        } else if (dInfo.child.usage && dInfo.child.method.length === 0) {
          warningNotification('법정대리인의 동의 확인 방법을 선택해주세요.');
          onFocus('input', 2);
        } else if (dInfo.ppi.usage === undefined) {
          warningNotification('제3자 제공 여부를 선택해주세요.');
          onFocus('input', 3);
        } else if (dInfo.ppi.usage && ref.ppi.length === 0) {
          warningNotification('개인정보 제공에 대한 정보를 입력해주세요.');
          onFocus('input', 3);
        } else if (dInfo.cpi.usage === undefined) {
          warningNotification('위탁 여부를 선택해주세요.');
          onFocus('input', 4);
        } else if (dInfo.cpi.usage && ref.cpi.length === 0) {
          warningNotification('개인정보 위탁에 대한 정보를 입력해주세요.');
          onFocus('input', 4);
        } else if (dInfo.destructionUnused.type === undefined) {
          warningNotification('미이용자의 개인정보 파기 등에 관한 조치를 선택해주세요.');
          onFocus('input', 5);
        } else if (dInfo.safety.physical === undefined) {
          warningNotification('안전성 확보조치 여부를 선택해주세요.');
          onFocus('input', 6);
        } else if (dInfo.safety.usage === undefined) {
          warningNotification('안전성 확보조치 여부를 선택해주세요.');
          onFocus('input', 6);
        } else if (dInfo.safety.usage && (blankCheck(dInfo.safety.activity) && dInfo.safety.certification.length === 0)) {
          warningNotification('안전성 확보조치에 관한 사항을 입력해주세요.');
          onFocus('input', 6);
        } else if (dInfo.fni.usage === undefined) {
          warningNotification('가명정보 처리 여부를 선택해주세요.');
          onFocus('input', 7);
        } else if (dInfo.fni.usage && ref.fni.length === 0) {
          warningNotification('가명정보 처리에 대한 정보를 입력해주세요.');
          onFocus('input', 7);
        } else if (blankCheck(dInfo.manager.charger.name) || blankCheck(dInfo.manager.charger.position)) {
          warningNotification('개인정보보호 책임자에 대한 정보를 입력해주세요.');
          onFocus('input', 8);
        } else if (blankCheck(dInfo.manager.request.department) || blankCheck(dInfo.manager.request.charger) || blankCheck(dInfo.manager.request.contact)) {
          warningNotification('개인정보 열람 청구 부서에 대한 정보를 입력해주세요.');
          onFocus('input', 8);
        }
        else {
          stepIndex + 1 <= steps.length ? setStepIndex(stepIndex + 1) : undefined;
        }
      }
    } else if (type === 'complete') {
      const cInfo: any = data.cInfo;
      if (cInfo.applyAt === undefined) {
        warningNotification('개인정보 처리방침 최종 게재일을 선택해주세요.');
      } else if (cInfo.previous.usage === undefined) {
        warningNotification('이전 처리방침 여부를 선택 해주세요.');
      } else if (cInfo.previous.usage && blankCheck(cInfo.previous.url)) {
        warningNotification('이전 처리방침에 대한 정보를 입력해주세요.');
      } else {
        onOpen();
      }
    }
  }
  /** [Event handler] 저장 이벤트 */
  const onSave = async (temp: boolean = true): Promise<void> => {
    // 미리보기 모달 닫기
    onClose();
    // 처리 상태 정의
    const apiStatus: string = status === 'none' ? 'create' : temp ? 'update' : 'publish';
    // API 호출
    const response = await setPIPPData('b7dc6570-4be9-4710-85c1-4c3788fcbd12', data, apiStatus, apiStatus ? document.getElementById('report')?.outerHTML : undefined);
    if (response) {
      const result = await response.json();
      if (result.status === "OK") {
        if (temp) {
          successNotification('임시 저장 완료');
        } else {
          setUrl(result.data.url);
          setVisible2(true);
          onUpdateStatus();
        }
      } else {
        temp ? warningNotification('임시 저장 실패') : warningNotification('최종 저장 실패');
      }
    }
  };
  /** [Event handler] 모달 열기 */
  const onOpen = (): void => setVisible(true);
   /** [Event handler] 모달 닫기 */
  const onClose = (): void => setVisible(false);
  /** [Query handler] API를 요청하여 데이터를 갱신하기 위해 호출되는 함수 */
  const onRefresh = (): void => setInitQuery(false);

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
      {loading ? (
        <BasicPageLoading />
      ) : (
        <>
          <PageHeaderContainStep current={stepIndex} goTo='/doc/pipp' onBack={onBack} onMove={onMoveStep} onSave={onSave} title='개인정보 처리방침 만들기' steps={steps} />
          {stepIndex === 0 ? (
            <div style={{ marginBottom: '3rem' }}>
              <CollapseForPIPP data={data.aInfo} items={itemForPI} onChange={onChange} />
            </div>
          ) : stepIndex === 1 ? (
            <CreatePIPP data={data} onChange={onChange} onFocus={onFocus} onRefresh={onRefresh} refElements={refs} refTable={ref} />
          ) : stepIndex === 2 ? (
            <ConfirmSection data={data.cInfo} onChange={onChange} prevList={list.filter((item: any): boolean => item.version !== 0)} sectionType='cInfo' />
          ) : (<></>)}
          <DRModal centered onCancel={onClose} onOk={() => onSave(false)} visible={visible} style={{ paddingBottom: 56, top: 56 }} width='80%'>
            <PreviewSection data={data} preview={false} prevList={list.filter((item: any): boolean => item.version !== 0)} refTables={ref} stmt={stmt(data.dInfo.name)} />
          </DRModal>
          <Modal centered footer={false} onCancel={() => {setVisible2(false); onBack()}} visible={visible2} width={420}>
            <div style={{ textAlign: 'center' }}>
              <span style={{ color: '#52C41A', display: 'block', fontSize: 46, marginBottom: 16, marginTop: 8 }}>
                <CheckCircleOutlined />
              </span>
              <h3 style={{ fontSize: 16, fontWeight: '600', lineHeight: '24px', marginBottom: 16 }}>개인정보 처리방침 작성 완료</h3>
              <Input.Group compact style={{ display: 'flex' }}>
                <Input value={url} style={{ flex: 1 }} />
                <Button onClick={() => {navigator.clipboard.writeText(url)}} type='primary'>복사</Button>
              </Input.Group>
            </div>            
          </Modal>
        </>
      )}
    </>
  );
}
/**
 * [Internal Component] 개인정보 처리방침 메인 페이지 Header (현재 문서 작성에 대한 상태에 따라 내용 변경)
 */
const MainPageHeader: React.FC<PIPPProcess> = ({ onProcess, status }: PIPPProcess): JSX.Element => {
  // 확인 모달 생성
  const confirm = () => Modal.confirm({
    cancelText: '아니오',
    centered: true,
    content: '이전에 입력되어있던 내용은 삭제됩니다.',
    okText: '예',
    onOk: () => onProcess('create'),
    title: '처음부터 다시 만드시겠습니까?',
  });

  // 컴포넌트 반환
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
            <Button icon={<PlusOutlined />} onClick={confirm} type='default'>문서 생성하기</Button>
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
            <h2 style={{ fontSize: 15, fontWeight: '500', marginBottom: 16 }}>가명정보 수집 및 이용</h2>
            <FNITable modal={true} />
            <div style={{ marginTop: 48 }}></div>
            <PFNITableForm modal={true} style={{ marginBottom: 48 }} />
            <CFNITableForm modal={true} style={{ marginBottom: 0 }} />
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
    <Modal centered footer={false} maskClosable={false} onCancel={onClose} style={{ fontFamily: 'Pretendard' }} title={title} visible={visible} width='80%'>{content}</Modal>
  );
}

const CreatePIPP: React.FC<any> = ({ onChange, data, onFocus, onRefresh, refElements, refTable }: any): JSX.Element => {
  const queryClient = useQueryClient();

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
          <InputSection data={data.dInfo} onChange={onChange} onFocus={onFocus} onOpenModal={onOpen} refElements={refElements.input} refTables={refTable} sectionType='dInfo' />
        </Col>
        <Col span={12} style={{ borderLeft: '1px solid rgba(156, 156, 156, 0.3)', height: '100%', overflowY: 'auto' }}>
          <PreviewSection data={data} preview={true} refElements={refElements.preview} refTables={refTable} stmt={stmt(data.dInfo.name)} />
        </Col>
      </Row>
      <EditableModal onClose={onClose} type={refType} visible={open} />
    </>
  );
}

const blankCheck = (value: string): boolean => {
  const blankPattern: RegExp = /^\s+|\s+$/g;
  return value.trim().replace(blankPattern, '') === '';
}