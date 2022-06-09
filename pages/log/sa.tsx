import type { NextPage } from 'next';
// Component
import { TOVPageLayout } from '../../components/common/Layout';

const Page: NextPage = ({ expand, onExpand }: any) => {
  return (
    <TOVPageLayout expand={expand} onExpand={onExpand} selectedKey='/log/sa'>
      <h2>SA page</h2>
    </TOVPageLayout>
  )
}

export default Page;