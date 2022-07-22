import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { ComponentType } from 'react';
// Component
import { PLIPPageLayoutProps } from '@/components/renewer/Layout';
const PLIPLayoutPadding = dynamic(() => import('@/components/styled/Layout').then((mod: any): any => mod.PLIPLayoutPadding));
const PLIPPageLayout: ComponentType<PLIPPageLayoutProps> = dynamic(() => import('@/components/renewer/Layout').then((mod: any): any => mod.PLIPPageLayout), { loading: () => (<></>), ssr: false });
const PLIPSession = dynamic(() => import('@/components/renewer/Session').then((module: any): any => module.PLIPServiceSession), { loading: () => (<></>), ssr: false });
const PLIPUserSession = dynamic(() => import('@/components/renewer/Session').then((module: any): any => module.PLIPUserSession), { loading: () => (<></>), ssr: false });
const TemplateMain = dynamic(() => import('@/components/renewer/pages/Template'), { loading: () => (<></>) });

const Page: NextPage = () => {
  return (
    <PLIPUserSession>
      <PLIPSession>
        <PLIPPageLayout selectedKey='/doc/template'>
          <PLIPLayoutPadding>
            <TemplateMain />
          </PLIPLayoutPadding>
        </PLIPPageLayout>
      </PLIPSession>
    </PLIPUserSession>
  );
}

export default Page;