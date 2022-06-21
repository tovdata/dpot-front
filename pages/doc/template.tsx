import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
// Component
import { TOVLayoutPadding, TOVPageLayout } from '@/components/common/Layout';
import { TemplateMain } from '@/components/Template';
const PILPSession = dynamic(() => import('@/components/renewer/ServiceSession'), { ssr: false });

const Page: NextPage = ({ expand, onExpand }: any) => {
  return (
    <PILPSession>
      <TOVPageLayout expand={expand} onExpand={onExpand} selectedKey='/doc/template'>
        <TOVLayoutPadding style={{ paddingTop: 42 }}>
          <TemplateMain />
        </TOVLayoutPadding>
      </TOVPageLayout>
    </PILPSession>
  )
}

export default Page;