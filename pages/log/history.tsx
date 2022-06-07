import type { NextPage } from 'next';
// Component
import { TOVPageLayout } from '../../components/common/Layout';

const Page: NextPage = ({ expand, onExpand }: any) => {
  return (
    <TOVPageLayout expand={expand} onExpand={onExpand} selectedKey='/log/history'>
      <h2>History page</h2>
    </TOVPageLayout>
  )
}

export default Page;