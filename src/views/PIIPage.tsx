import { createGlobalStyle } from 'styled-components';
// Components
import Container from '../components/Container';
import Header from '../components/Header';
import PIITable from '../components/PIITable';
// Type
import { TableData } from '../models/Type';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }
  body * {
    box-sizing: border-box;
  }
`;

const piiTableData: TableData = {
  content: [
    {
      essentialItems: [
        { id: 0, name: '이름', sensitive: false },
        { id: 1, name: '전화번호', sensitive: false }
      ],
      period: '회원 탈퇴 시까지',
      purpose: [
        { id: 0, name: '회원 식별 및 확인' },
        { id: 1, name: '부정 이용 방지' }
      ],
      selectionItems: [
        { id: 0, name: '주소', sensitive: false },
        { id: 1, name: '출생년도', sensitive: false }
      ],
      subject: '회원 관리'
    }, {
      essentialItems: [
        { id: 0, name: '이메일', sensitive: false },
        { id: 1, name: '닉네임', sensitive: false }
      ],
      period: '회원 탈퇴 시까지',
      purpose: [
        { id: 0, name: '무료 및 유료 서비스 제공' }
      ],
      selectionItems: [],
      subject: '서비스 제공'
    }, {
      essentialItems: [],
      period: '회원 탈퇴 시까지',
      purpose: [
        { id: 0, name: '인공지능 학습을 통한 서비스 품질 개선 및 정확도 향상' }
      ],
      selectionItems: [
        { id: 0, name: '성별', sensitive: false },
        { id: 1, name: '방언정보', sensitive: true }
      ],
      subject: '서비스 품질 개선'
    }
  ],
  header: [
    { id: 0, name: '업무명', visible: true },
    { id: 1, name: '처리 목적', visible: true },
    { id: 2, name: '필수 항목', visible: true },
    { id: 3, name: '선택 항목', visible: true },
    { id: 4, name: '처리 및 보유 기간', visible: true }
  ],
  title: '개인정보 수집 및 이용 현황',
};

const aiTableData: TableData = {
  content: [
    {
      charger: '전수지',
      department: '부서부서',
      period: '회원 탈퇴 시까지',
      purpose: { id: 0, name: '상세 목적 기입', tag: '기타' },
      items: [
        { id: 0, name: '주소', sensitive: false },
        { id: 1, name: '출생년도', sensitive: false }
      ],
      subject: '회원 관리'
    }, {
      charger: '전수지',
      department: '부서부서',
      period: '회원 탈퇴 시까지',
      purpose: { id: 0, name: '상세 목적 기입', tag: '기타' },
      items: [],
      subject: '서비스 품질 개선'
    }
  ],
  header: [
    { id: 0, name: '업무명', visible: true },
    { id: 1, name: '가명정보 처리 근거 및 목적', visible: true },
    { id: 2, name: '처리 항목', visible: true },
    { id: 3, name: '처리 및 보유 기간', visible: true },
    { id: 4, name: '담당부서', visible: true },
    { id: 5, name: '담당자', visible: true }
  ],
  title: '가명정보 수집 및 이용 현황',
};

const PIIPage = (): JSX.Element => {
  // Return an element
  return (
    <>
      <GlobalStyle />
      <Header />
      <Container>
        <PIITable table={piiTableData} />
        <PIITable table={aiTableData} />
      </Container>
    </>
  )
}

export default PIIPage;