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

const table: TableData = {
  title: '개인정보 수집 및 이용 현황',
  header: ['업무명', '처리 목적', '필수 항목', '선택 항목', '처리 및 보유 기간']
  // [
  //   { key: 0, name: '업무명' },
  //   { key: 1, name: '처리 목적' },
  //   { key: 2, name: '필수 항목' },
  //   { key: 3, name: '선택 항목' },
  //   { key: 4, name: '처리 및 보유 기간' }
  // ]
};

const PIIPage = (): JSX.Element => {
  // Return an element
  return (
    <>
      <GlobalStyle />
      <Header />
      <Container>
        <PIITable table={table} />
      </Container>
    </>
  )
}

export default PIIPage;