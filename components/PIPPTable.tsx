// Component
import { SearchableTable } from './common/Table';
// Data
import { personalInfoProcessingPolicyTableHeader } from '../models/data';
// Data (temporary)
import { personalInfoProcessingPolicy } from '../models/temporary';

// Component (personal information processing policy)
export const PersonalInfoProcessingPolicy = (): JSX.Element => {
  return (<SearchableTable dataSource={personalInfoProcessingPolicy} headers={personalInfoProcessingPolicyTableHeader} title='개인정보 처리방침' />);
}