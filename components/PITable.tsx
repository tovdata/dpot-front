// Component
// import { EditableTable } from '../components/common/Table';
import { EditableTable } from '../components/common/TestTable';
// Data
import { personalInfoTableHeader, falseNameInfoTableHeader } from '../models/data';
import { personalInfo, falseNameInfo } from '../models/temporary';

// Component (personal info table)
export const PersonalInfoTable = (): JSX.Element => {
  // return (<EditableTable dataSource={personalInfo} headers={personalInfoTableHeader} title='개인정보 수집・이용 현황'/>);
  // { column key : default option values }
  const historyColumnInfos = {
    essentialItems: ['이름', '아이디', '비밀번호', '이메일주소', '실주소', 'aa', 'bb'],
    selectionItems: ['이름', '아이디', '비밀번호', '이메일주소', '실주소', 'aa', 'bb']
  }
  return (<EditableTable dataSource={personalInfo} headers={personalInfoTableHeader} title='개인정보 수집・이용 현황' historyColumnInfos={historyColumnInfos} />);
}
// // Component (pseudonym info table)
export const FalseNameInfoTable = (): JSX.Element => {
  return (<EditableTable dataSource={falseNameInfo} headers={falseNameInfoTableHeader} title='가명정보 수집・이용 현황' />);
}