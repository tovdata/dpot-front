import { getConsentList, getPIDatas, getPPIDatas, setConsentData, setDataByTableType } from "@/models/queries/api";
import { SERVICE_CONSENT, SERVICE_PI, SERVICE_PPI } from "@/models/queries/type";
import { staticConsentTexts, defaultConsentData, staticConsentData } from "@/models/static/data";
import { consentEPIHeader } from '@/components/consent/Header';
import { CheckCircleOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { Alert, Button, Input, Modal, Table, Tooltip } from "antd";
import Grid from "antd/lib/card/Grid";
import React, { useEffect, useState } from "react";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { VscChevronRight } from "react-icons/vsc";
import { useQuery, useQueryClient } from "react-query";
import styled from "styled-components";
import { filteredData, filteredNotUniqueData, nullCheckForNextStep, returnUniqueInfo } from "utils/consent";
import { PageHeaderContainStep } from "./common/Header";
import { EditableTableForm } from "./common/Table";
import { AddEpiDataComponent, ConfirmCheckListComponent, DisadvantageComponent, SelectCompanyComponent, SelectPIComponent, SubjectComponent, TitleComponent } from "./consent/Atom";
import { ConfirmPage } from "./consent/Documentation";
import { ConsentEPITable, ConsentListTable } from "./consent/Table";
import { copyTextToClipboard, unixTimeToTimeStamp } from "utils/utils";
import Router from "next/router";

// Styled component(Card Container)
const StyleCardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;
// Styled component(Card Grid)
const StyleCardGrid = styled(Grid)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: 'center';
  min-width: -moz-available;
  min-width: -webkit-fill-available;
  min-width: fill-available;
  margin: 0.5rem;
  cursor: pointer;
  .info{
    display: flex;
  }
`;
// Styled component(Header Question Item)
const StyledHeaderQuestionItem = styled.span`
  align-items: center;
  cursor: pointer;
  display: flex;
  margin-left: 0.5rem;
`;
// Styled component(Card Right Button)
const StyledCardRightBtn = styled(VscChevronRight)`
  font-size: 1.25rem;
  color:rgba(0, 0, 0, 0.45);
`;
// Styled component(Alert)
const StyledAlert = styled(Alert)`
  margin-bottom: 2rem;
  border-color:#BFBFBF;
  background-color: #F5F5F5;
  svg{
    color:rgba(0, 0, 0, 0.85);
  }
`;
const StyledJobSelection = styled.div`
  span, p, div{
    white-space: pre-line;
  }
`;

export const ConsentMain = () => {
  // [수정] 동의서 Type
  // 0, pi : 개인정보 수집 및 이용 동의서
  // 1, si : 민감정보 수집 및 이용 동의서
  // 2, uii : 고유식별정보 수집 및 이용 동의서
  // 3, mai : 마케팅 및 광고성 정보 수신 동의서
  // 4 : 제 3자 제공 동의서
  const DOC_TYPE = ['pi', 'si', 'uii', 'mai', 'tpp'];
  const [type, setType] = useState(0);
  const steps: string[] = type === 4 ? ['정보 입력', '최종 확인'] : ['업무 선택', '정보 입력', '최종 확인'];
  const [stepIndex, setStepIndex] = useState(-1);
  const [data, setData] = useState(defaultConsentData);
  // 생성된 개인정보 처리방침 목록 조회 API
  const { isLoading: isLoadingForList, data: consentList } = useQuery(SERVICE_CONSENT, async () => await getConsentList('b7dc6570-4be9-4710-85c1-4c3788fcbd12'));
  // 서버로부터 개인정보 수집 이용 데이블 데이터 가져오기
  const { data: PIData } = useQuery(SERVICE_PI, async () => await getPIDatas('b7dc6570-4be9-4710-85c1-4c3788fcbd12'));
  const { data: PPIData } = useQuery(SERVICE_PPI, async () => await getPPIDatas('b7dc6570-4be9-4710-85c1-4c3788fcbd12'));
  // 데이터 동기를 위한 객체 생성
  const queryClient = useQueryClient();
  const saveData = (newData: any) => setData({ ...data, ...newData });
  const stepHandler = (newStepIndex: number) => {
    if (nullCheckForNextStep(type, data, newStepIndex)) return;
    // 제일 첫 페이지로 돌아올 경우 작성하던 데이터 리셋
    if (newStepIndex === -1) setData(defaultConsentData);
    setStepIndex(newStepIndex);
  }
  // [Handler] 완료 단계에서 동의서를 저장
  const completeHander = async (setUrl: any, setSuccessModal: any) => {
    try {
      const rData = JSON.parse(JSON.stringify(data));
      rData.type = DOC_TYPE[data.type];
      rData.creater = '김토브'; // [임시]
      const response = await setConsentData('b7dc6570-4be9-4710-85c1-4c3788fcbd12', rData, document.getElementById('report')?.outerHTML);
      queryClient.invalidateQueries(SERVICE_CONSENT);
      const json = await response.json();
      setUrl(json.data.url);
      setSuccessModal(true);
    } catch (e) {
      console.log('[Error]:', e);
    }
  }
  // useEffect(() => {
  //   console.log('consentList', consentList)
  // }, [consentList])
  const FirstStepComponent = () => {
    // 제 3자 제공 동의서의 경우
    if (type === 4)
      return <InputInformationPage type={type} data={data} saveData={saveData} PPIData={PPIData} />
    else
      return <JobSelectionPage type={type} data={data} saveData={saveData} PIData={PIData} />
  };
  // 사전에 있어야할 정보가 있는지 체크
  const emptyCheckHandler = (type: number): boolean => {
    // 개인정보 수집 및 이용 동의서, 
    // 민감정보 수집 및 이용 동의서, 
    // 마케팅 및 광고성 정보 수신 동의서 
    // > 개인정보 수집 이용 표 정보의 유무 확인
    if ([0, 1, 3].includes(type) && PIData?.length === 0) return true;
    // 고유식별정보 수집 및 이용 동의서 > 개인정보 수집 이용 표 내 고유식별정보의 유무
    const filtered = filteredNotUniqueData(PIData);
    if (type === 2 && filtered?.length === 0) return true;
    // 제3자 제공 동의서 > 개인정보 제공 표 정보의 유무
    if (type === 4 && PPIData?.length === 0) return true;

    return false;
  }

  let component;
  switch (stepIndex) {
    case 0:
      component = FirstStepComponent();
      break;
    case 1:
      // 제 3자 제공 동의서의 경우
      if (type === 4) {
        component = <ConfirmPage type={type} consentData={data} />;
      } else {
        component = <EnterInformationPage type={type} ids={data.subjects} PIData={PIData} consentData={data} saveData={saveData} />;
      }
      break;
    case 2:
      component = <ConfirmPage type={type} consentData={data} />;
      break;
  }
  if (stepIndex === -1) return <ConsentHomePage data={consentList} setType={setType} stepHandler={stepHandler} emptyCheck={emptyCheckHandler} />
  return (
    <>
      <StepInfoHeader steps={steps} type={type} stepIndex={stepIndex} stepHandler={stepHandler} completeHander={completeHander} />
      {component}
    </>
  );
};

const ConsentHomePage = ({ data, setType, stepHandler, emptyCheck }: any): JSX.Element => {
  return (
    <>
      <CreateConsent setType={setType} stepHandler={stepHandler} emptyCheck={emptyCheck} />
      <ConsentList data={data} />
    </>
  );
}

/**
 * [Component] 동의서 Card View
 * @param {string} title 동의서 이름
 * @param {string} description 동의서에 대한 설명
 * @returns 
 */
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

const CreateConsent = ({ setType, stepHandler, emptyCheck }: any) => {
  const header: JSX.Element = (
    <div>
      <Button style={{ marginRight: 8 }} type='default'>동의서 생성 가이드</Button>
    </div>
  );
  /**
   * [Handler] Card Click 시 동작하는 Handler
   * @param type 동의서 타입
   * @param title Modal title
   * @param content Modal message
   */
  const onClickCardHandler = (type: number, title: string, content: string, goTo: string) => {
    if (emptyCheck(type)) {
      Modal.warning({
        title: title,
        icon: <ExclamationCircleOutlined />,
        content: content,
        okText: '입력하러가기',
        onOk: () => {
          Router.push(goTo);
        }
      })
    }
    else {
      setType(type);
      stepHandler(0);
    }
  }
  return (
    <EditableTableForm title='동의서 생성' tools={header} description={'이용자의 개인정보를 수집 및 이용하기 위해서는 각각의 처리 목적과 이용되는 항목 및 보유 기간을 안내하고 동의를 받아야 해요.\\n만약, 수집 및 이용하려는 개인정보 항목에 민감정보나 고유식별정보가 포함되어 있거나 홍보 또는 제3자 제공을 위한 경우에는 별도로 동의를 받아야 합니다.\\n필요한 동의서를 선택하면 개인정보 관리 메뉴에서 입력한 내용을 기반으로 간편하게 동의서를 만들 수 있습니다.'}>
      <StyleCardContainer>
        {staticConsentTexts.map((info: any) => <div key={info.key} onClick={() => onClickCardHandler(info.key, info.emptyTitle, info.emptyMessage, info.goto)}><ConsentCard title={info.name} description={info.description} /></div>)}
      </StyleCardContainer>
    </EditableTableForm>
  )
}

const ConsentList = ({ data }: any): JSX.Element => {
  const filteredList = data?.map((item: any) => {
    const result: any = {};
    result.key = item.id;
    result.id = item.id;
    result.type = item.data.type;
    result.title = item.data.title;
    result.editedAt = unixTimeToTimeStamp(item.publishedAt);
    result.creater = item.data.creater;
    result.url = item.url;
    return result;
  })
  return (
    <EditableTableForm title='동의서 목록'>
      <ConsentListTable data={filteredList} />
    </EditableTableForm>
  )
}
const StepInfoHeader = ({ type, steps, stepIndex, stepHandler, completeHander }: any): JSX.Element => {
  const [successModal, setSuccessModal] = useState(false);
  const [url, setUrl] = useState('');
  const onMoveStep = (mode: string): void => {
    if (mode === 'prev') {
      stepIndex - 1 >= 0 ? stepHandler(stepIndex - 1) : undefined;
    } else if (mode === 'next') {
      stepIndex + 1 <= steps.length ? stepHandler(stepIndex + 1) : undefined;
    } else {
      completeHander(setUrl, setSuccessModal);
    }
  }
  return (
    <>
      <PageHeaderContainStep current={stepIndex} goTo='/doc/consent' onBack={() => stepHandler(-1)} onMove={onMoveStep} onSave={() => { }} title={`${staticConsentData[type].name} 동의서 만들기`} steps={steps} canTemporarySave={false} />
      <Modal centered footer={false} onCancel={() => { setSuccessModal(false); stepHandler(-1) }} visible={successModal} width={420}>
        <div style={{ textAlign: 'center' }}>
          <span style={{ color: '#52C41A', display: 'block', fontSize: 46, marginBottom: 16, marginTop: 8 }}>
            <CheckCircleOutlined />
          </span>
          <h3 style={{ fontSize: 16, fontWeight: '600', lineHeight: '24px', marginBottom: 16 }}>동의서 생성 완료</h3>
          <Input.Group compact style={{ display: 'flex' }}>
            <Input value={url} style={{ flex: 1 }} />
            <Button onClick={() => { copyTextToClipboard(url) }} type='primary'>복사</Button>
          </Input.Group>
        </div>
      </Modal></>

  );
}
/**
 * 정보 입력 Step (개인정보 제 3자 제공 동의서에만 해당)
 */
const InputInformationPage = ({ data, type, saveData, PPIData }: any): JSX.Element => {
  // 동의서 제목
  const [title, setTitle] = useState(data.title);
  // 불이익
  const [disadvantage, setDisadvantage] = useState(data.disadvantage || staticConsentData[type].disadvantage.example);
  const [visible, setVisible] = useState(false);
  const onClose = (): void => setVisible(false);
  useEffect(() => saveData({ type, title, disadvantage }), [type, title, disadvantage]);
  return (
    <StyledJobSelection>
      <TitleComponent type={type} title={title} setTitle={setTitle} />
      <SelectCompanyComponent type={type} subjects={data.subjects} PPIData={PPIData} saveData={saveData} />
      <DisadvantageComponent type={type} disadvantage={disadvantage} setDisadvantage={setDisadvantage} />
      <AddEpiDataComponent type={type} onOpenModal={() => setVisible(!visible)} />
      <ConfirmCheckListComponent checked={data.checkList} type={type} saveData={saveData} />
      <EditableModal type={type} onClose={onClose} epiData={data.epiData} saveData={saveData} visible={visible} />
    </StyledJobSelection>
  );
}
/**
 * 업무선택 Step
 * @param {string} type 동의서 타입
 * @param {any} data 동의서 데이터
 * @param {void} saveData 동의서 데이터 저장 함수
 * @returns 
 */
const JobSelectionPage = ({ type, data, saveData, PIData }: any): JSX.Element => {
  // 동의서 제목
  const [title, setTitle] = useState(data.title);
  // 구분(업무명)
  const [subjects, setSubjects] = useState(data.subjects);
  // 불이익
  const [disadvantage, setDisadvantage] = useState(data.disadvantage || staticConsentData[type].disadvantage.example);
  useEffect(() => saveData({ type, title, disadvantage, subjects }), [type, title, disadvantage, subjects]);
  const staticData = staticConsentData[type];
  return (
    <StyledJobSelection>
      {staticData.information && <StyledAlert message={staticData.information} type="info" showIcon />}
      <TitleComponent type={type} title={title} setTitle={setTitle} />
      <SubjectComponent type={type} subjects={subjects} setSubjects={setSubjects} PIData={PIData} />
      <DisadvantageComponent type={type} disadvantage={disadvantage} setDisadvantage={setDisadvantage} />
    </StyledJobSelection>
  )
}

const EnterInformationPage = ({ ids, type, PIData, consentData, saveData }: any) => {
  const dataSource = filteredData(PIData, ids, type);
  const [data, setData] = useState(consentData.pData || dataSource);
  const [visible, setVisible] = useState(false);
  useEffect(() => saveData({ pData: filteredData(data, ids, type) }), [data]);
  const onClose = (): void => setVisible(false);

  return (
    <>
      <SelectPIComponent type={type} originData={dataSource} data={filteredData(data, ids, type)} setData={setData} />
      <AddEpiDataComponent type={type} onOpenModal={() => setVisible(!visible)} />
      <ConfirmCheckListComponent checked={consentData.checkList} type={type} saveData={saveData} />
      <EditableModal type={type} onClose={onClose} epiData={consentData.epiData} saveData={saveData} visible={visible} />
    </>
  )
}
const EditableModal: React.FC<any> = ({ type, onClose, epiData, saveData, visible }: any): JSX.Element => {
  const word = type === 4 ? '개인정보' : staticConsentData[type].word;
  const header = consentEPIHeader;
  header.purpose.name = `${word} 수집·이용 목적`;
  header.items.name = `${word} 항목`;
  const content = <ConsentEPITable type={type} description={`이용자의 동의 없이, 법령에 의거하여 수집 및 이용하고 있는 ${word}가 있다면 동의서에 함께 안내될 수 있도록 아래에 입력해 주세요.\\n‘${word} 항목’은 개인정보 수집·이용 현황표에 입력된 항목에서 선택 가능합니다.`} data={epiData} saveData={saveData} header={header}></ConsentEPITable>;
  // 컴포넌트 반환
  return (
    <Modal title={`법령에 근거한 ${word} 수집·이용`} centered footer={false} onCancel={onClose} maskClosable={false} style={{ fontFamily: 'Pretendard' }} visible={visible} width='80%'>{content}</Modal>
  );
}

