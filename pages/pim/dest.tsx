
import dynamic from 'next/dynamic';
import { ComponentType } from 'react';
// Component
import { PLIPPageLayoutProps } from '@/components/renewer/Layout';
const DPIMain = dynamic(() => import('@/components/renewer/pages/DPI'), { loading: () => (<></>), ssr: false });
const PLIPPageLayout: ComponentType<PLIPPageLayoutProps> = dynamic(() => import('@/components/renewer/Layout').then((module: any): any => module.PLIPPageLayout), { loading: () => (<></>), ssr: false });
const PLIPPagePadding = dynamic(() => import('@/components/styled/Layout').then((module: any): any => module.PLIPLayoutPadding));
const PLIPSession = dynamic(() => import('@/components/renewer/Session').then((module: any): any => module.PLIPServiceSession), { loading: () => (<></>), ssr: false });
const PLIPUserSession = dynamic(() => import('@/components/renewer/Session').then((module: any): any => module.PLIPUserSession), { loading: () => (<></>), ssr: false });

const Page = () => {
  return (
    <PLIPUserSession>
      <PLIPSession>
        <PLIPPageLayout selectedKey='/pim/dest'>
          <PLIPPagePadding>
            <DPIMain />
          </PLIPPagePadding>
        </PLIPPageLayout>
      </PLIPSession>
    </PLIPUserSession>
  )
}

export default Page;