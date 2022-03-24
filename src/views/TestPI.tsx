// Component
import Page from '../components/common/Page';
import { PersonalInfoTable, PseudonymInfoTable } from '../components/PITable';

const TestPI = (): JSX.Element => {
  return (
    <Page>
      <PersonalInfoTable />
      <PseudonymInfoTable />
    </Page>
  )
}

export default TestPI;