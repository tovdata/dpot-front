import styled, { createGlobalStyle } from "styled-components";
import { BorderSection } from "../components/common/BorderSection";
import { ContainerDiv } from "../components/common/Container";
import Header from "../components/common/Header";
import { PIIAddSection } from "../components/PIIAddSection";
import PIIAddTable from "../components/PIIAddTable";
import { PIIObject } from "../models/type2";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }
  body * {
    box-sizing: border-box;
  }
`;
// Create a styled element (TableScription)
const TableScription = styled.div`
  text-align:left;
  font-size: 0.75rem;
  color:#2A2751;
`;

const FlexRowContainer = styled(ContainerDiv)`
  display: flex;
`;

const PIIAddPage = (): JSX.Element => {

  // Test Information
  const initInformation: PIIObject = {
    name: '',
    pPurpose: [],
    required: [],
    optional: [],
    period: ''
  };
  const information: PIIObject = {
    name: '회원관리',
    pPurpose: ['회원 상담', '회원에 대한 고지·통지·공지사항 전달'],
    required: ['이름', '이름', '이름', '이름', '이름', '전화번호', '주소', '닉네임', '이메일', '출생년도'],
    optional: ['주소'],
    period: ''
  };
  const addSectionInformation = {
    title: '업무명',
    description: '업무명에 대한 설명 / 어떠한 내용이 주로 들어가는지(아래의 항목을 선택하거나 직접 입력, 택 1)',
    items: ['회원관리', '신규 서비스 개발', '마케팅', '요금정산']
  }
  return (
    <>
      <GlobalStyle />
      <Header />
      <FlexRowContainer>
        <BorderSection width="70%">
          <TableScription>* 필수입력</TableScription>
          <PIIAddTable information={information} />
          <PIIAddTable information={initInformation} />
        </BorderSection>
        <PIIAddSection information={addSectionInformation}></PIIAddSection>
      </FlexRowContainer>
    </>
  )
}

export default PIIAddPage;