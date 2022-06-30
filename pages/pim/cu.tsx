import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
// Component
import { TOVLayoutPadding } from '@/components/common/Layout';
import { PLIPPageLayout } from '@/components/renewer/Layout';
const FNITableForm = dynamic(() => import('@/components/renewer/PI').then((module: any): any => module.FNITableForm), { ssr: false });
const PITableForm = dynamic(() => import('@/components/renewer/PI').then((module: any): any => module.PITableForm), { ssr: false });
const PLIPSession = dynamic(() => import('@/components/renewer/Session').then((module: any): any => module.PILPServiceSession), { ssr: false });

const Page: NextPage = ({ expand, onExpand }: any) => {
  // 컴포넌트 반환
  return (
    <PLIPSession>
      <PLIPPageLayout expand={expand} onExpand={onExpand} selectedKey='/pim/cu'>
        <TOVLayoutPadding>
          <PITableForm />
          <FNITableForm />
        </TOVLayoutPadding>
      </PLIPPageLayout>
      {/* <TOVPageLayout expand={expand} onExpand={onExpand} selectedKey='/pim/cu'> */}
        {/* <TOVLayoutPadding>
          <PITableForm />
          <FNITableForm />
        </TOVLayoutPadding> */}
      {/* </TOVPageLayout> */}
    </PLIPSession>
  )
}

export default Page;