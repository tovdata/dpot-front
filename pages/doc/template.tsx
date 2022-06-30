import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
// Component
import { TOVLayoutPadding, TOVPageLayout } from '@/components/common/Layout';
import { TemplateMain } from '@/components/Template';
const PLIPSession = dynamic(() => import('@/components/renewer/Session').then((module: any): any => module.PILPServiceSession), { ssr: false });

const Page: NextPage = ({ expand, onExpand }: any) => {
  return (
    <PLIPSession>
      <TOVPageLayout expand={expand} onExpand={onExpand} selectedKey='/doc/template'>
        <TOVLayoutPadding style={{ paddingTop: 42 }}>
          <TemplateMain />
        </TOVLayoutPadding>
      </TOVPageLayout>
    </PLIPSession>
  )
}

export default Page;