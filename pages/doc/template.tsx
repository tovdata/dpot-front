import type { NextPage } from 'next';
// Component
import { TOVPageLayout } from '../../components/common/Layout';

const Page: NextPage = ({ expand, onExpand }: any) => {
  return (
    <TOVPageLayout expand={expand} onExpand={onExpand} selectedKey='/doc/template'>
      <h2>Template page</h2>
    </TOVPageLayout>
  )
}

export default Page;