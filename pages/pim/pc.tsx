import dynamic from 'next/dynamic';
import { ComponentType } from 'react';
// Component
import { PLIPPageLayoutProps } from '@/components/renewer/Layout';
const PCMain = dynamic(() => import('@/components/renewer/pages/PC'), { loading: () => (<></>), ssr: false });
const PLIPPageLayout: ComponentType<PLIPPageLayoutProps> = dynamic(() => import('@/components/renewer/Layout').then((mod: any): any => mod.PLIPPageLayout), { loading: () => (<></>), ssr: false });
const PLIPLayoutPaddingST = dynamic(() => import('@/components/styled/Layout').then((mod: any): any => mod.PLIPLayoutPaddingST));
const PLIPSession = dynamic(() => import('@/components/renewer/Session').then((module: any): any => module.PLIPServiceSession), { loading: () => (<></>), ssr: false });
const PLIPUserSession = dynamic(() => import('@/components/renewer/Session').then((module: any): any => module.PLIPUserSession), { loading: () => (<></>), ssr: false });

const Page = () => {
  return (
    <PLIPUserSession>
      <PLIPSession>
        <PLIPPageLayout selectedKey='/pim/pc'>
          <PLIPLayoutPaddingST>
            <PCMain />
          </PLIPLayoutPaddingST>
        </PLIPPageLayout>
      </PLIPSession>
    </PLIPUserSession>
  );
}

export default Page;