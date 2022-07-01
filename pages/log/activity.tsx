import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { ComponentType } from 'react';
// Component
import { PLIPPageLayoutProps } from '@/components/renewer/Layout';
const PLIPActivity = dynamic(() => import('@/components/renewer/Activity'), { loading: () => (<></>), ssr: false });
const PLIPLayoutPaddingST = dynamic(() => import('@/components/styled/Layout').then((mod: any): any => mod.PLIPLayoutPaddingST));
const PLIPPageLayout: ComponentType<PLIPPageLayoutProps> = dynamic(() => import('@/components/renewer/Layout').then((mod: any): any => mod.PLIPPageLayout), { loading: () => (<></>), ssr: false });
const PLIPSession = dynamic(() => import('@/components/renewer/Session').then((module: any): any => module.PLIPServiceSession), { loading: () => (<></>), ssr: false });
const PLIPUserSession = dynamic(() => import('@/components/renewer/Session').then((module: any): any => module.PLIPUserSession), { loading: () => (<></>), ssr: false });

/** [Component] 활동 내역 페이지 */
const Page: NextPage = () => {
  return (
    <PLIPUserSession>
      <PLIPSession>
        <PLIPPageLayout selectedKey='/log/activity'>
          <PLIPLayoutPaddingST>
            <PLIPActivity />      
          </PLIPLayoutPaddingST>
        </PLIPPageLayout>
      </PLIPSession>
    </PLIPUserSession>
  );
}

export default Page;