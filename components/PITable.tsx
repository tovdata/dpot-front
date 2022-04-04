// Component
import { EditableTable } from './common/Table';
// Data
import { personalInfoTableHeader, falseNameInfoTableHeader } from '../models/data';
import { personalInfo, falseNameInfo } from '../models/temporary';

// Component (personal info table)
export const PersonalInfoTable = (): JSX.Element => {
  return (<EditableTable dataSource={personalInfo} headers={personalInfoTableHeader} title='개인정보 수집・이용 현황' />);
}
// // Component (pseudonym info table)
export const FalseNameInfoTable = (): JSX.Element => {
  return (<EditableTable dataSource={falseNameInfo} headers={falseNameInfoTableHeader} title='가명정보 수집・이용 현황' />);
}