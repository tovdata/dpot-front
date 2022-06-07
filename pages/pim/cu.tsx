// Component
import { TOVPageLayout } from '../../components/common/Layout';
import { FNITableForm, PITableForm } from '../../components/PITable';

const Page = () => {
  return (
    <TOVPageLayout selected='/pim/cu'>
      <div style={{ paddingBottom: 74, paddingTop: 74 }}>
        <PITableForm />
        <FNITableForm />
      </div>
    </TOVPageLayout>
  )
}

export default Page;