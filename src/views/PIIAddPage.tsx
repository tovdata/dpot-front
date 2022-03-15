import styled, { createGlobalStyle } from "styled-components";
import Container from "../components/Container";
import Header from "../components/Header";
import PIIAddTable from "../components/PIIAddTable";
import { PIIObject } from "../models/Type2";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }
  body * {
    box-sizing: border-box;
  }
`;

const Width60 = styled.div`
  width: 60%;
`;

// Create a styled element (TableScription)
const TableScription = styled.div`
  padding-left: 1rem;
  text-align:left;
  font-size: 0.75rem;
  color:#2A2751;
`;

const PIIAddPage = (): JSX.Element => {
  // Return an element

  // Test Information
  const initInformation: PIIObject = {
    name: '회원관리',
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
  return (
    <>
      <GlobalStyle />
      <Header />
      <Container>
        <>
          <TableScription>* 필수입력</TableScription>
          <Width60>
            <PIIAddTable information={initInformation} />
          </Width60>
          <Width60>
            <PIIAddTable information={information} />
          </Width60>
        </>
      </Container>
    </>
  )
}

export default PIIAddPage;