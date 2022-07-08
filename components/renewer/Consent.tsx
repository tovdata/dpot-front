import dynamic from 'next/dynamic';
import Router from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';
// Component
import { Button, Input, Modal, Tooltip } from 'antd';
import { StyleCardContainer, StyleCardGrid, StyledAlert, StyledCardRightBtn, StyledHeaderQuestionItem, StyledJobSelection } from '@/components/styled/Consent';
import { EditableTableForm } from '@/components/common/Table';
import { PLIPLoadingContainer } from '@/components/renewer/Page';
import { ConsentEPITable, ConsentListTable } from '@/components/consent/Table';
import { AddEpiDataComponent, ConfirmCheckListComponent, DisadvantageComponent, SelectCompanyComponent, SelectPIComponent, SubjectComponent, TitleComponent } from '@/components/consent/Atom';
import { PageHeaderContainStep } from '@/components/common/Header';
// Data
import { staticConsentData } from '@/models/static/data';
// Icon
const AiOutlineQuestionCircle = dynamic(() => import('react-icons/ai').then((mod: any): any => mod.AiOutlineQuestionCircle));
const CheckCircleOutlined = dynamic(() => import('@ant-design/icons').then((mod: any): any => mod.CheckCircleOutlined));
const ExclamationCircleOutlined = dynamic(() => import('@ant-design/icons').then((mod: any): any => mod.ExclamationCircleOutlined));
// Util
import { copyTextToClipboard, transformToDatetime } from 'utils/utils';
import { filteredData } from 'utils/consent';

/** [Component] 동의서 초기 페이지 */
export const ConsentHome: React.FC<any> = ({ data, onChangeType, onEmptyCheck, onMoveStep, onRemove }): JSX.Element => {
  return (
    <>
      <CreateConsent onChangeType={onChangeType} onEmptyCheck={onEmptyCheck} onMoveStep={onMoveStep} />
      <ConsentList data={data} onRemove={onRemove}/>
    </>
  );
}
/** [Component] 동의서 메인 페이지 헤더 */
export const StepInfoHeader: React.FC<any> = ({ onFinish, onMoveStep, stepIndex, steps, type }): JSX.Element => {
  // 제목
  const title: string = useMemo(() => `${staticConsentData('')[type].name} 동의서 만들기`, [type]);
  // 모달 상태
  const [successModal, setSuccessModal] = useState<boolean>(false);
  // URL
  const [url, setUrl] = useState<string>('');

  /** [Event handler] 뒤로 가기 */
  const onBack = useCallback(() => onMoveStep(-1), [onMoveStep]);
  /** [Event handler] 모달 닫기 */
  const onCancel = useCallback(() => {
    setSuccessModal(false);
    onMoveStep(-1);
  }, [onMoveStep]);
  /** [Event handler] URL 복사 */
  const onCopyUrl = useCallback(() => copyTextToClipboard(url), [url]);
  /** [Event handler] 단계 이동 */
  const onMove = useCallback((mode: string): void => {
    if (mode === 'prev') stepIndex - 1 >= 0 ? onMoveStep(stepIndex - 1) : undefined;
    else if (mode === 'next') stepIndex + 1 <= steps.length ? onMoveStep(stepIndex + 1) : undefined;
    else onFinish(setUrl, setSuccessModal);
  }, [onMoveStep, stepIndex]);
 

  // 컴포넌트 반환
  return (
    <>
      <PageHeaderContainStep current={stepIndex} goTo='/doc/consent' onBack={onBack} onMove={onMove} onSave={() => {}} title={title} steps={steps} canTemporarySave={false} />
      <Modal centered footer={false} onCancel={onCancel} visible={successModal} width={420}>
        <div style={{ textAlign: 'center' }}>
          <span style={{ color: '#52C41A', display: 'block', fontSize: 46, marginBottom: 16, marginTop: 8 }}>
            <CheckCircleOutlined />
          </span>
          <h3 style={{ fontSize: 16, fontWeight: '600', lineHeight: '24px', marginBottom: 16 }}>동의서 생성 완료</h3>
          <Input.Group compact style={{ display: 'flex' }}>
            <Input value={url} style={{ flex: 1 }} />
            <Button onClick={onCopyUrl} type='primary'>복사</Button>
          </Input.Group>
        </div>
      </Modal>
    </>
  );
}
/** [Component] 정보 입력 단계 (개인정보 제3자 제공 동의서에만 해당) */
export const InputInformationPage: React.FC<any> = ({ accessToken, data, onSave, ppi, serviceId, type }): JSX.Element => {
  // 데이터 목록
  const filtered: any[] = useMemo(() => ppi.filter((item: any): boolean => item.url === undefined), [data]);
  // 동의서 제목
  const [title, setTitle] = useState<string>(data.title);
  // 불이익 상태
  const [disadvantage, setDisadvantage] = useState(data.disadvantage || staticConsentData('')[type].disadvantage.example);
  // 모달 상태
  const [visible, setVisible] = useState<boolean>(false);
  
  /** [Event handler] 모달 닫기 */
  const onClose = useCallback(() => setVisible(false), []);
  // 데이터 갱신
  useEffect(() => onSave({ type, title, disadvantage }), [type, title, disadvantage]);

  // 컴포넌트 반환
  return (
    <StyledJobSelection>
      <TitleComponent type={type} title={title} setTitle={setTitle} />
      <SelectCompanyComponent type={type} subjects={data.subjects} PPIData={filtered} saveData={onSave} />
      <DisadvantageComponent type={type} disadvantage={disadvantage} setDisadvantage={setDisadvantage} />
      <AddEpiDataComponent type={type} onOpenModal={() => setVisible(!visible)} />
      <ConfirmCheckListComponent checked={data.checkList} type={type} saveData={onSave} />
      <EditableModal accessToken={accessToken} epiData={data.epiData} onClose={onClose} onSave={onSave} serviceId={serviceId} type={type} visible={visible} />
    </StyledJobSelection>
  );
}
/** [Internal Component] 업무 선택 페이지 */
export const JobSelectionPage: React.FC<any> = ({ data, onSave, pi, type }): JSX.Element => {
  // 동의서 제목
  const [title, setTitle] = useState<string>(data.title);
  // 구분 (업무명)
  const [subjects, setSubjects] = useState(data.subjects);
  // 불이익
  const [disadvantage, setDisadvantage] = useState(data.disadvantage || staticConsentData('')[type].disadvantage.example);
  
  // 데이터 갱신
  useEffect(() => onSave({ type, title, disadvantage, subjects }), [type, title, disadvantage, subjects]);
  // 데이터
  const staticData: any = useMemo(() => staticConsentData('')[type], [type]);

  // 컴포넌트 반환
  return (
    <StyledJobSelection>
      {staticData.information && <StyledAlert message={staticData.information} type="info" showIcon />}
      <TitleComponent type={type} title={title} setTitle={setTitle} />
      <SubjectComponent type={type} subjects={subjects} setSubjects={setSubjects} PIData={pi} />
      <DisadvantageComponent type={type} disadvantage={disadvantage} setDisadvantage={setDisadvantage} />
    </StyledJobSelection>
  );
}
/** [Component] 정보 페이지 */
export const EnterInformationPage: React.FC<any> = ({ accessToken, consentData, ids, onSave, pi, serviceId, type }): JSX.Element => {
  // 가공된 데이터 (PI)
  const dataSource = useMemo(() => filteredData(pi, ids, type), [ids, pi, type]);
  // 데이터
  // const [data, setData] = useState(consentData.pData || dataSource);
  const [data, setData] = useState(dataSource);
  // 모달 상태
  const [visible, setVisible] = useState<boolean>(false);
  // 가공된 데이터
  const filtered = useMemo(() => filteredData(data, ids, type), [data, ids, type]);

  /** [Event handler] 모달 닫기 */
  const onClose = useCallback(() => setVisible(false), []);
  /** [Event handler] 모달 열기/닫기 */
  const onOpenModal = useCallback(() => setVisible(!visible), [visible]);
  // 데이터 갱신
  useEffect(() => onSave({ pData: filtered }), [data]);

  // 컴포넌트 반환
  return (
    <>
      <SelectPIComponent type={type} originData={dataSource} data={filtered} onSave={setData} />
      <AddEpiDataComponent type={type} onOpenModal={onOpenModal} />
      <ConfirmCheckListComponent checked={consentData.checkList} type={type} saveData={onSave} />
      <EditableModal accessToken={accessToken} epiData={consentData.epiData} onClose={onClose} onSave={onSave} serviceId={serviceId} type={type} visible={visible} />
    </>
  );
}

/** [Internal Component] 동의서 선택을 위한 카드 */
const ConsentCard = ({ title, description }: any): JSX.Element => {
  return (
    <StyleCardGrid>
      <div className="info">
        <span className="title">{title}</span>
        <Tooltip title={description} trigger='hover'>
          <StyledHeaderQuestionItem>
            <AiOutlineQuestionCircle />
          </StyledHeaderQuestionItem>
        </Tooltip>
      </div>
      <StyledCardRightBtn />
    </StyleCardGrid>
  )
}
/** [Internal Component] 동의서 생성 폼 */
const CreateConsent: React.FC<any> = ({ onChangeType, onEmptyCheck, onMoveStep }): JSX.Element => {
  // 헤더 정의
  const header: JSX.Element = useMemo(() => (
    <div>
      <Button style={{ marginRight: 8 }} type='default'>동의서 생성 가이드</Button>
    </div>
  ), []);

  // 컴포넌트
  const [component, setComponent] = useState<JSX.Element>(<PLIPLoadingContainer />);
  // 렌더링
  useEffect(() => {
    (async () => {
      const text: any = (await import('@/models/static/data')).staticConsentTexts;
      setComponent(text.map((item: any): JSX.Element => (
        <div key={item.key} onClick={() => onSelect(item.key, item.emptyTitle, item.emptyMessage, item.goto)}>
          <ConsentCard title={item.name} description={item.description} />
        </div>
      )));
    })();
  }, []);
  /** [Event handler] 동의서 선택 */
  const onSelect = useCallback((type: number, title: string, content: string, goTo: string) => {
    if (onEmptyCheck(type)) {
      Modal.warning({
        title: title,
        icon: <ExclamationCircleOutlined />,
        content: content,
        okText: '입력하러가기',
        onOk: () => {
          Router.push(goTo);
        }
      });
    } else {
      onChangeType(type);
      onMoveStep(0);
    }
  }, []);

  // 컴포넌트 반환
  return (
    <EditableTableForm title='동의서 생성' tools={header} description={'이용자의 개인정보를 수집 및 이용하기 위해서는 각각의 처리 목적과 이용되는 항목 및 보유 기간을 안내하고 동의를 받아야 해요.\\n만약, 수집 및 이용하려는 개인정보 항목에 민감정보나 고유식별정보가 포함되어 있거나 홍보 또는 제3자 제공을 위한 경우에는 별도로 동의를 받아야 합니다.\\n필요한 동의서를 선택하면 개인정보 관리 메뉴에서 입력한 내용을 기반으로 간편하게 동의서를 만들 수 있습니다.'}>
      <StyleCardContainer>
        {component}
      </StyleCardContainer>
    </EditableTableForm>
  );
}
/** [Internal Component] 동의서 목록 */
const ConsentList: React.FC<any> = ({ data, onRemove }): JSX.Element => {
  // 목록 정의  
  const list: any[] = useMemo(() => data.map((item: any): any => ({
    key: item.id,
    id: item.id,
    type: item.data.type,
    title: item.data.title,
    editedAt: transformToDatetime(item.publishedAt),
    creater: item.data.creater,
    url: item.url
  })), [data]);

  // 컴포넌트 반환
  return (
    <EditableTableForm title='동의서 목록'>
      <ConsentListTable data={list} onRemove={onRemove}/>
    </EditableTableForm>
  );
}
/** [Internal Componenet] 편집 가능한 모달 */
const EditableModal: React.FC<any> = ({ accessToken, epiData, onClose, onSave, serviceId, type, visible }): JSX.Element => {
  // 키워드
  const keyword: string = useMemo(() => type === 4 ? '개인정보' : staticConsentData('')[type].word, [type]);
  // 헤더
  const [header, setHeader] = useState<any>({});
  // 헤더 초기화
  useEffect(() => {
    (async () => {
      const rawHeader: any = (await import('@/components/consent/Header')).consentEPIHeader;
      rawHeader.purpose.name = `${keyword} 수집·이용 목적`;
      rawHeader.items.name = `${keyword} 항목`;
      setHeader(rawHeader);
    })();
  }, [keyword]);

  // 컴포넌트 반환
  return (
    <Modal title={`법령에 근거한 ${keyword} 수집·이용`} centered footer={false} onCancel={onClose} maskClosable={false} style={{ fontFamily: 'Pretendard' }} visible={visible} width='80%'>
      <ConsentEPITable accessToken={accessToken} type={type} description={`이용자의 동의 없이, 법령에 의거하여 수집 및 이용하고 있는 ${keyword}가 있다면 동의서에 함께 안내될 수 있도록 아래에 입력해 주세요.\\n‘${keyword} 항목’은 개인정보 수집·이용 현황표에 입력된 항목에서 선택 가능합니다.`} data={epiData} saveData={onSave} header={header} serviceId={serviceId} />
    </Modal>
  );
}