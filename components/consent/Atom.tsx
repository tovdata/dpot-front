import { staticConsentData } from "@/models/static/data";
import { consentEditHeader, consentPPIEditHeader } from '@/components/consent/Header';
import { Button, Checkbox, Input } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { addSelectedOption, filteredPISubjects, getSelectedPPIData } from "utils/consent";
import { DIRowContent, DIRowHeader } from "../pipp/Documentation";
import { ConsentEditPITable, ConsentEditPPITable } from "./Table";

// Styled component(Select Div)
const StyledSelectDiv = styled.div`
  display: flex;
`;
// Styled component(Consent Row)
const CSRow = styled.div`
  margin-bottom: 60px !important;
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


/**
 * [Component] 동의서 제목
 */
interface TitleProps {
  type: number,
  title: string,
  setTitle: (title: string) => void
}
export const TitleComponent = ({ type, title, setTitle }: TitleProps): JSX.Element => {
  return (
    <CSRow>
      <DIRowHeader title='동의서 제목' description='동의서의 목적과 내용을 쉽게 이해할 수 있도록 예시와 같이 동의서 제목을 작성해주세요.' />
      <DIRowContent>
        <Input placeholder={staticConsentData[type].titlePlaceHolder} value={title} onChange={(e) => setTitle(e.target.value)} />
      </DIRowContent>
    </CSRow>
  );
}
/**
 * 동의를 받고자하는 업무 리스트
 */
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
 * [Component] 동의를 받고자하는 업무를 선택
 */
interface SubjectProps {
  type: number,
  subjects: string[],
  setSubjects: (subjects: string[]) => void,
  PIData: any
}
export const SubjectComponent = ({ type, subjects, setSubjects, PIData }: SubjectProps): JSX.Element => {
  return (
    <CSRow>
      <DIRowHeader title='동의를 받고자 하는 업무를 선택해주세요.' description='개인정보 처리방침을 업데이트 하면, 이전 개인정보 처리방침도 반드시 확인할 수 있어야 합니다.\n본 개인정보 처리방침 이전에 게재한 개인정보 처리방침의 URL을 입력해주세요.' />
      <DIRowContent>
        <SelectContainer items={filteredPISubjects(type, subjects, PIData)} setSubject={setSubjects} />
      </DIRowContent>
    </CSRow>
  )
}

/**
 * [Component] 불이익
 */
interface DisadvantageProps {
  type: number,
  disadvantage: string,
  setDisadvantage: (title: string) => void
}
export const DisadvantageComponent = ({ type, disadvantage, setDisadvantage }: DisadvantageProps): JSX.Element => {
  const staticData = staticConsentData[type];
  return (
    <CSRow>
      <DIRowHeader title='동의 거부 시 이용자가 받을 수 있는 불이익을 작성하세요.' description={staticData.disadvantage.description} />
      <DIRowContent>
        <TextArea autoSize={{ minRows: 3, maxRows: 6 }} placeholder={staticData.disadvantage.example} value={disadvantage} onChange={(e) => setDisadvantage(e.target.value)}>
        </TextArea>
      </DIRowContent>
    </CSRow>
  )
}
/**
 * [Component] 동의 받고자 하는 목적과 항목 선택
 */
interface SelectPIProps {
  type: number,
  originData: any,
  data: any,
  setData: (data: any) => void
}
export const SelectPIComponent = ({ type, originData, data, setData }: SelectPIProps): JSX.Element => {
  return (
    <CSRow>
      <DIRowHeader title='동의를 받고자 하는 목적과 항목을 선택해주세요.' description={staticConsentData[type].pData?.description} />
      <DIRowContent>
        <ConsentEditPITable orignData={originData} data={data} setData={setData} headers={consentEditHeader} />
      </DIRowContent>
    </CSRow>
  )
}
interface SelectCompanyProps {
  type: number,
  subjects: string[],
  PPIData: any,
  saveData: (data: any) => void
}
export const SelectCompanyComponent = ({ type, subjects, PPIData, saveData }: SelectCompanyProps): JSX.Element => {
  const [ids, setIds] = useState(subjects || []);
  const data = addSelectedOption(PPIData, ids);
  useEffect(() => { saveData({ subjects: ids, pData: getSelectedPPIData(data, ids) }) }, [ids])
  return (
    <CSRow>
      <DIRowHeader title='동의를 받고자 하는 업체(제공받는 자)를 선택해주세요.' description={staticConsentData[type].pData?.description} />
      <DIRowContent>
        <ConsentEditPPITable headers={consentPPIEditHeader} data={data} ids={ids} setIds={setIds} />
      </DIRowContent>
    </CSRow>
  )
}
/**
 * [Component] 법령에 근거하여 동의 없이 수집하는 정보 입력
 */
interface AddEpiDataProps {
  type: number,
  onOpenModal: () => void
}
export const AddEpiDataComponent = ({ type, onOpenModal }: AddEpiDataProps): JSX.Element => {
  if (!staticConsentData[type].isEvidence) return <></>
  return (
    <CSRow>
      <DIRowHeader title={`(해당시 기재) 법령에 근거하여 정보주체의 동의없이 ${staticConsentData[type].word}를 수집 및 이용하는 경우가 있나요?`} tools={<Button onClick={onOpenModal} type='default' size='small' style={{ fontSize: 12, padding: '0 12px' }}>입력하기</Button>} />
      <DIRowContent>
      </DIRowContent>
    </CSRow>
  )
}

// [Component] 확인해야할 사항 체크리스트
const CheckListComponent = ({ checkList, checked, saveData }: any): JSX.Element => {
  const [checkState, setCheckState] = useState(checkList?.map(() => checked));
  // check state 업데이트
  const onChange = (index: number) => {
    const newState = [...checkState];
    newState[index] = !newState[index];
    const preCheck = checkOK(checkState);
    const newCheck = checkOK(newState);
    if (preCheck !== newCheck) saveData({ checkList: newCheck });
    setCheckState(newState);
  }
  // 모든 사항에 동의했는지 체크
  const checkOK = (list: boolean[]) => list.reduce((pre: boolean, cur: boolean) => pre && cur);
  return (
    checkList?.map((item: any, index: number) =>
      <StyledCheckListContainer key={index}>
        <div className="text">
          <span className="title">{item.title}</span>
          <span className="description">{item.description}</span>
        </div>
        <Checkbox checked={checkState[index]} onChange={() => onChange(index)}></Checkbox>
      </StyledCheckListContainer>
    )
  )
};
/**
 * [Component] 확인 사항 컴포넌트
 */
interface ConfirmCheckListProps {
  type: number,
  checked: boolean,
  saveData: (data: any) => void
}
export const ConfirmCheckListComponent = ({ type, checked, saveData }: ConfirmCheckListProps): JSX.Element => {
  return (
    <CSRow>
      <DIRowHeader title='아래의 사항을 확인해주세요' required={true} />
      <DIRowContent>
        <CheckListComponent checkList={staticConsentData[type].checkList} checked={checked} saveData={saveData} />
      </DIRowContent>
    </CSRow>
  )
}
/**
 * [Component] 최종 확인 페이지 컴포넌트
 */
interface ConfirmItemProps {
  title?: string,
  children?: any,
  headerText?: string,
  footerText?: string
}

export const ConfirmItemComponent = ({ title, children, headerText, footerText }: ConfirmItemProps): JSX.Element => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginTop: '2rem' }}>
      {title && <h2 style={{ whiteSpace: 'pre-line', display: 'flex', flexDirection: 'row', fontWeight: 600, fontSize: '16px', textAlign: 'left' }} >
        <span style={{ marginTop: '0.1rem', marginRight: '0.5rem' }}>◾️</span><span>{title}</span></h2>}
      {headerText && <span>{headerText}</span>}
      {children}
      {footerText && <span style={{ whiteSpace: 'pre-line', marginTop: '16px' }}>{footerText}</span>}
    </div>
  )
}
