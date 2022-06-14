import type { NextPage } from 'next';
// Component
import { TOVLayoutPadding, TOVPageLayout } from '../../components/common/Layout';
import { FNITableForm, PITableForm } from '../../components/PITable';

const Page: NextPage = ({ expand, onExpand }: any) => {
  return (
    <TOVPageLayout expand={expand} onExpand={onExpand} selectedKey='/pim/cu'>
      <TOVLayoutPadding>
        <PITableForm />
        <FNITableForm />
      </TOVLayoutPadding>
    </TOVPageLayout>
  )
}

export default Page;