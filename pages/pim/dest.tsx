
import dynamic from 'next/dynamic';
import { ComponentType } from 'react';
// Component
const DPIMain: ComponentType<{}> = dynamic(() => import('@/components/renewer/pages/DPI'), { ssr: false });
const PLIPPageLayout: ComponentType<{expand: boolean, onExpand: any, selectedKey: string}> = dynamic(() => import('@/components/renewer/Layout').then((module: any): any => module.PLIPPageLayout), { ssr: false });
const PLIPPagePadding: ComponentType<{}> = dynamic(() => import('@/components/styled/Layout').then((module: any): any => module.PLIPLayoutPadding));
const PLIPSession: ComponentType<{}> = dynamic(() => import('@/components/renewer/Session').then((module: any): any => module.PILPServiceSession), { ssr: false });

const Page = ({ expand, onExpand }: any) => {
  return (
    <PLIPSession>
      <PLIPPageLayout expand={expand} onExpand={onExpand} selectedKey='/pim/dest'>
        <PLIPPagePadding>
          <DPIMain />
        </PLIPPagePadding>
      </PLIPPageLayout>
    </PLIPSession>
  )
}

export default Page;