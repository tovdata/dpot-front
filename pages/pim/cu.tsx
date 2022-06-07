import type { NextPage } from 'next';
// Component
import { TOVPageLayout } from '../../components/common/Layout';
import { FNITableForm, PITableForm } from '../../components/PITable';

const Page: NextPage = ({ expand, onExpand }: any) => {
  return (
    <TOVPageLayout expand={expand} onExpand={onExpand} selectedKey='/pim/cu'>
      <div style={{ paddingBottom: 74, paddingTop: 74 }}>
        <PITableForm />
        <FNITableForm />
      </div>
    </TOVPageLayout>
  )
}

export default Page;