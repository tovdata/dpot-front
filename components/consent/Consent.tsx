import { getPIDatas, getPPIDatas } from "@/models/queries/api";
import { SERVICE_PI, SERVICE_PPI } from "@/models/queries/type";
import { consentList, defaultConsentData, staticConsentData } from "@/models/static/data";
import { consentEPIHeader } from '@/components/consent/Header';
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Alert, Button, Modal, Table, Tooltip } from "antd";
import Grid from "antd/lib/card/Grid";
import React, { useEffect, useState } from "react";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { VscChevronRight } from "react-icons/vsc";
import { useQuery } from "react-query";
import styled from "styled-components";
import { filteredData, nullCheckForNextStep } from "utils/consent";
import { PageHeaderContainStep } from "../common/Header";
import { EditableTableForm } from "../common/Table";
import { AddEpiDataComponent, ConfirmCheckListComponent, DisadvantageComponent, SelectCompanyComponent, SelectPIComponent, SubjectComponent, TitleComponent } from "./Atom";
import { ConfirmPage } from "./Documentation";
import { ConsentEPITable } from "./Table";

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
  // 0 : 개인정보 수집 및 이용 동의서
  // 1 : 민감정보 수집 및 이용 동의서
  // 2 : 고유식별정보 수집 및 이용 동의서
  // 3 : 마케팅 및 광고성 정보 수신 동의서
  // 4 : 제 3자 제공 동의서
  const [type, setType] = useState(0);
  // -1 <= step <= 3
  const [stepIndex, setStepIndex] = useState(-1);
  const [consentData, setConsentData] = useState(defaultConsentData);
  // 서버로부터 개인정보 수집 이용 데이블 데이터 가져오기
  const { data: PIData } = useQuery(SERVICE_PI, async () => await getPIDatas('b7dc6570-4be9-4710-85c1-4c3788fcbd12'));
  const { data: PPIData } = useQuery(SERVICE_PPI, async () => await getPPIDatas('b7dc6570-4be9-4710-85c1-4c3788fcbd12'));

  const saveData = (newData: any) => setConsentData({ ...consentData, ...newData });
  const stepHandler = (newStepIndex: number) => {
    if (nullCheckForNextStep(type, consentData, newStepIndex)) return;
    // 제일 첫 페이지로 돌아올 경우 작성하던 데이터 리셋
    if (newStepIndex === -1) setConsentData(defaultConsentData);
    setStepIndex(newStepIndex);
  }

  const FirstStepComponent = () => {
    // 제 3자 제공 동의서의 경우
    if (type === 4)
      return <InputInformationPage type={type} data={consentData} saveData={saveData} PPIData={PPIData} />
    else
      return <JobSelectionPage type={type} data={consentData} saveData={saveData} PIData={PIData} />
  };

  let component;
  switch (stepIndex) {
    case 0:
      component = FirstStepComponent();
      break;
    case 1:
      // 제 3자 제공 동의서의 경우
      if (type === 4) {
        component = <ConfirmPage type={type} consentData={consentData} />;
      } else {
        component = <EnterInformationPage type={type} ids={consentData.subjects} PIData={PIData} consentData={consentData} saveData={saveData} />;
      }
      break;
    case 2:
      component = <ConfirmPage type={type} consentData={consentData} />;
      break;
  }
  if (stepIndex === -1) return <ConsentHomePage setType={setType} stepHandler={stepHandler} />
  return (
    <>
      <StepInfoHeader type={type} stepIndex={stepIndex} stepHandler={stepHandler} />
      {component}
    </>
  );
};

const ConsentHomePage = ({ setType, stepHandler }: any): JSX.Element => {
  return (
    <>
      <CreateConsent setType={setType} stepHandler={stepHandler} />
      <ConsentList />
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

const CreateConsent = ({ setType, stepHandler }: any) => {
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
  const onClickCardHandler = (type: number, title: string, content: string) => {
    if (false)
      Modal.warning({
        title: title,
        icon: <ExclamationCircleOutlined />,
        content: content,
        okText: '입력하러가기'
      })
    setType(type);
    stepHandler(0);
  }
  return (
    <EditableTableForm title='동의서 생성' tools={header}>
      <StyleCardContainer>
        {consentList.map((info: any) => <div key={info.key} onClick={() => onClickCardHandler(info.key, info.emptyTitle, info.emptyMessage)}><ConsentCard title={info.name} description={info.description} /></div>)}
      </StyleCardContainer>
    </EditableTableForm>
  )
}

const ConsentList = () => {
  return (
    <EditableTableForm title='동의서 목록'>
      <Table columns={[
        { title: '구분', dataIndex: 'sortation', key: 'sortation' },
        { title: '목록', dataIndex: 'version', key: 'version' },
        { title: '최종 편집일', dataIndex: 'editedAt', key: 'editedAt' },
        { title: '작성자', dataIndex: 'creater', key: 'creater' }
      ]}
        dataSource={[]}
        pagination={{
          position: ['bottomRight'],
        }} />
    </EditableTableForm>
  )
}
const StepInfoHeader = ({ type, stepIndex, stepHandler }: any): JSX.Element => {
  const steps: string[] = type === 4 ? ['정보 입력', '최종 확인'] : ['업무 선택', '정보 입력', '최종 확인'];
  const onMoveStep = (mode: string): void => {
    if (mode === 'prev') {
      stepIndex - 1 >= 0 ? stepHandler(stepIndex - 1) : undefined;
    } else if (mode === 'next') {
      stepIndex + 1 <= steps.length ? stepHandler(stepIndex + 1) : undefined;
    } else {
    }
  }
  return (
    <PageHeaderContainStep current={stepIndex} goTo='/doc/consent' onBack={() => stepHandler(-1)} onMove={onMoveStep} onSave={() => { }} title={`${staticConsentData[type].name} 동의서 만들기`} steps={steps} canTemporarySave={false} />
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
  useEffect(() => saveData({ title, disadvantage }), [title, disadvantage]);
  return (
    <StyledJobSelection>
      <TitleComponent type={type} title={title} setTitle={setTitle} />
      <SelectCompanyComponent subjects={data.subjects} PPIData={PPIData} saveData={saveData} />
      <DisadvantageComponent type={type} disadvantage={disadvantage} setDisadvantage={setDisadvantage} />
      <AddEpiDataComponent type={type} onOpenModal={() => setVisible(!visible)} />
      <ConfirmCheckListComponent checked={data.checkList} type={type} saveData={saveData} />
      <EditableModal onClose={onClose} epiData={data.epiData} saveData={saveData} visible={visible} />
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
  useEffect(() => saveData({ title, disadvantage, subjects }), [title, disadvantage, subjects]);
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
      <SelectPIComponent originData={dataSource} data={filteredData(data, ids, type)} setData={setData} />
      <AddEpiDataComponent type={type} onOpenModal={() => setVisible(!visible)} />
      <ConfirmCheckListComponent checked={consentData.checkList} type={type} saveData={saveData} />
      <EditableModal onClose={onClose} epiData={consentData.epiData} saveData={saveData} visible={visible} />
    </>
  )
}
const EditableModal: React.FC<any> = ({ onClose, epiData, saveData, visible }: any): JSX.Element => {
  const content = <ConsentEPITable data={epiData} saveData={saveData} header={consentEPIHeader}></ConsentEPITable>;
  // 컴포넌트 반환
  return (
    <Modal centered footer={false} onCancel={onClose} maskClosable={false} style={{ fontFamily: 'Pretendard' }} title={''} visible={visible} width='80%'>{content}</Modal>
  );
}

