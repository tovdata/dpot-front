import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { ComponentType } from 'react';
// Component
import { PLIPPageLayoutProps } from '@/components/renewer/Layout';
const PLIPPageLayout: ComponentType<PLIPPageLayoutProps> = dynamic(() => import('@/components/renewer/Layout').then((mod: any): any => mod.PLIPPageLayout), { loading: () => (<></>), ssr: false });
const PLIPPagePadding = dynamic(() => import('@/components/styled/Layout').then((mod: any): any => mod.PLIPPagePadding));
const PLIPSession = dynamic(() => import('@/components/renewer/Session').then((module: any): any => module.PLIPServiceSession), { loading: () => (<></>), ssr: false });
const PLIPUserSession = dynamic(() => import('@/components/renewer/Session').then((module: any): any => module.PLIPUserSession), { loading: () => (<></>), ssr: false });

import { ConsentMain } from "@/components/Consent";

const Page: NextPage = () => {
  return (
    <PLIPUserSession>
      <PLIPSession>
        <PLIPPageLayout selectedKey='/doc/consent'>
          <PLIPPagePadding>
            <ConsentMain />
          </PLIPPagePadding>
        </PLIPPageLayout>
      </PLIPSession>
    </PLIPUserSession>
  );
}

export default Page;