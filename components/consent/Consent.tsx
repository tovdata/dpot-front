import { getPIDatas } from "@/models/queries/api";
import { SERVICE_FNI, SERVICE_PI } from "@/models/queries/type";
import { consentList, defaultConsentData, staticConsentData } from "@/models/static/data";
import { consentEditHeader } from "@/models/static/header";
import { TableHeaderData } from "@/models/type";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Alert, Button, Checkbox, Collapse, Input, Modal, Select, Table, TableColumnProps, Tooltip } from "antd";
import Grid from "antd/lib/card/Grid";
import TextArea from "antd/lib/input/TextArea";
import React, { useEffect, useState } from "react";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { VscChevronRight } from "react-icons/vsc";
import { useQuery } from "react-query";
import styled from "styled-components";
import { PageHeaderContainStep } from "../common/Header";
import { AddableTagSelect, TagSelect } from "../common/Select";
import { createTableColumnProps, EditableTableForm, TableContentForList } from "../common/Table";
import { DIRow, DIRowContent, DIRowHeader, StyledDIRowPadding } from "../pipp/Documentation";
import { ConfirmPage } from "./Documentation";

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
// Styled component(Select Div)
const StyledSelectDiv = styled.div`
  display: flex;
`;
// Styled component(Check List Container)
const StyledCheckListContainer = styled.div`
  padding: 12px 24px;
  display: flex;
  span{
    white-space: pre-line;
  }
  .text{
    display: flex;
    flex-direction: column;
    flex: 1 1;
    .title{
      font-weight: 500;
      font-size: 14px;
      color:rgba(0, 0, 0, 0.85);
    }
    .description{
      font-weight: 400;
      font-size: 12px;
      line-height: 20px;
      color: rgba(0, 0, 0, 0.45);
    }
  }
`;
const StyledJobSelection = styled.div`
  span, p, div{
    white-space: pre-line;
  }
`
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
  const { isLoading: PIIsLoading, data: PIData } = useQuery(SERVICE_PI, async () => await getPIDatas('b7dc6570-4be9-4710-85c1-4c3788fcbd12'));
  const saveData = (newData: any) => setConsentData({ ...consentData, ...newData });

  const stepHandler = (newStepIndex: number) => {
    // 제일 첫 페이지로 돌아올 경우 작성하던 데이터 리셋
    if (newStepIndex === -1) setConsentData(defaultConsentData);
    setStepIndex(newStepIndex);
  }
  useEffect(() => {
    console.log('consentData', consentData)
  }, [consentData]);

  const step0Component = () => {
    // 제 3자 제공 동의서의 경우 화면이 다름
    if (type === 4)
      return <></>
    else
      return <JobSelectionPage type={type} data={consentData} saveData={saveData} PIData={PIData} />
  };

  if (stepIndex === -1) {
    return <>
      <CreateConsent setType={setType} stepHandler={stepHandler} />
      <ConsentList />
    </>;
  } else {
    const component = stepIndex === 0 ? step0Component() : stepIndex === 1 ? <EnterInformationPage type={type} ids={consentData.subject} dataSource={PIData} saveData={saveData} /> : <ConfirmPage type={type} consentData={consentData} />
    return <>
      <StepInfoHeader type={type} stepIndex={stepIndex} stepHandler={stepHandler} />
      {component}
    </>
  };
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
const SelectContainer = ({ items, setSubject }: any) => {
  const [values, setValues] = useState<any>(items);
  useEffect(() => setSubject(Object.keys(values).filter(key => values[key].value)), [values]);
  const onChangeHandler = (e: any) => {
    let copyValue = JSON.parse(JSON.stringify(items[e.target.name]));
    copyValue.value = e.target.checked;
    setValues({ ...values, [e.target.name]: copyValue });
  }
  return (
    <StyledSelectDiv>
      {Object.keys(values).map((key: string) =>
        <Checkbox key={key} name={key} checked={values[key].value} onChange={onChangeHandler}>{values[key].subject}</Checkbox>
      )}
    </StyledSelectDiv>
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
  const [subject, setSubject] = useState(data.subject);
  // 불이익
  const [disadvantage, setDisadvantage] = useState(data.disadvantage || staticConsentData[type].disadvantage.example);
  useEffect(() => saveData({ title, disadvantage, subject }), [title, disadvantage, subject]);

  const filteredPiSubjects = () => {
    switch (type) {
      case 0:
      case 1:
        const subjects: any = {};
        PIData.forEach((data: any) => {
          const newData: any = {};
          newData.subject = data.subject;
          newData.value = subject?.includes(data.id);
          subjects[data.id] = newData;
        });
        return subjects;
      case 2:
        return [];
      default:
        return [];
    }
  }
  const staticData = staticConsentData[type];
  return (
    <StyledJobSelection>
      {staticData.information && <StyledAlert message={staticData.information} type="info" showIcon />}
      <DIRow>
        <DIRowHeader title='동의서 제목' description='동의서의 목적과 내용을 쉽게 이해할 수 있도록 예시와 같이 동의서 제목을 작성해주세요.' />
        <DIRowContent>
          <Input placeholder={staticData.titlePlaceHolder} value={title} onChange={(e) => setTitle(e.target.value)} />
        </DIRowContent>
      </DIRow>
      <StyledDIRowPadding />
      <DIRow>
        <DIRowHeader title='동의를 받고자 하는 업무를 선택해주세요.' description='개인정보 처리방침을 업데이트 하면, 이전 개인정보 처리방침도 반드시 확인할 수 있어야 합니다.\n본 개인정보 처리방침 이전에 게재한 개인정보 처리방침의 URL을 입력해주세요.' />
        <DIRowContent>
          <SelectContainer items={filteredPiSubjects()} setSubject={setSubject} />
        </DIRowContent>
      </DIRow>
      <StyledDIRowPadding />
      <DIRow>
        <DIRowHeader title='동의 거부 시 이용자가 받을 수 있는 불이익을 작성하세요.' description={staticData.disadvantage.description} />
        <DIRowContent>
          <TextArea autoSize={{ minRows: 3, maxRows: 6 }} placeholder={staticData.disadvantage.example} value={disadvantage} onChange={(e) => setDisadvantage(e.target.value)}>
          </TextArea>
        </DIRowContent>
      </DIRow>
    </StyledJobSelection>
  )
}
const EnterInformationPage = ({ ids, type, dataSource, saveData }: any) => {
  const [data, setData] = useState(dataSource);
  const piData = data.filter((item: any) => ids.includes(item.id));
  useEffect(() => saveData({ piData }), [piData]);
  return (
    <>
      <DIRow>
        <DIRowHeader title='동의를 받고자 하는 목적과 항목을 선택해주세요.' description="동의를 거부할 권리가 있다는 사실 및 동의 거부에 따른 불이익의 내용이 반드시 포함되어야 합니다.\n단, '정보통신서비스 제공자'는 개인정보 보호법 제39조의3에 따라, 동의 거부 시 불이익에 대한 내용은 기재하지 않아도 됩니다." />
        <DIRowContent>
          <ConsentEditTable orignData={dataSource} data={piData} setData={setData} headers={consentEditHeader} />
        </DIRowContent>
      </DIRow>
      <StyledDIRowPadding />
      {staticConsentData[type].isEvidence &&
        <>
          <DIRow>
            <DIRowHeader title={`(해당시 기재) 법령에 근거하여 정보주체의 동의없이 ${staticConsentData[type].word}를 수집 및 이용하는 경우가 있나요?`} tools={<Button onClick={(): void => console.log('ㅇㅇㅇ')} type='default' size='small' style={{ fontSize: 12, padding: '0 12px' }}>입력하기</Button>} />
            <DIRowContent>
            </DIRowContent>
          </DIRow>
          <StyledDIRowPadding />
        </>
      }
      <DIRow>
        <DIRowHeader title='아래의 사항을 확인해주세요' required={true} />
        <DIRowContent>
          <CheckListComponent type={type} />
        </DIRowContent>
      </DIRow>

    </>
  )
}
const CheckListComponent = ({ type }: any): JSX.Element =>
  <div>{staticConsentData[type].checkList?.map((item: any) => <CheckListItem title={item.title} description={item.description} />)}</div>

const CheckListItem = ({ title, description }: any): JSX.Element => {
  return (
    <StyledCheckListContainer>
      <div className="text">
        <span className="title">{title}</span>
        <span className="description">{description}</span>
      </div>
      <Checkbox></Checkbox>
    </StyledCheckListContainer>
  );
}
const ConsentEditTable = ({ headers, orignData, data, setData }: any): JSX.Element => {
  const onChangeHandler = (index: number, key: React.Key | undefined, items: string | string[]): void => {
    const newData = JSON.parse(JSON.stringify(data));
    newData[index][key as string] = items;
    setData(newData);
  }
  const columns: TableColumnProps<any>[] = Object.keys(headers).map((key: string): TableColumnProps<any> => {
    // Extract a header data
    const header: TableHeaderData = headers[key];
    // Create a column
    const column: TableColumnProps<any> = createTableColumnProps(key, header.name, header.description, header.width);
    column.render = (item: any, record: any, index: number): JSX.Element => {
      if (header.editable) {
        return <TagSelect onChange={(items: string | string[]): void => onChangeHandler(index, column.key, items)} value={item} options={orignData[index][column.key as string]} />
      }
      switch (header.display) {
        case 'string':
          return <>{item}</>
        case 'list':
          return <TableContentForList items={item} key={index} />
        default:
          return <>{item}</>
      }
    };
    return column;
  });
  return <Table columns={columns} dataSource={data} pagination={false} />
}

