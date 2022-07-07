import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { ComponentType } from 'react';
// Component
const PLIPPageLayout: ComponentType<any> = dynamic(() => import('@/components/renewer/Layout').then((mod: any): any => mod.PLIPPageLayout), { loading: () => (<></>), ssr: false });
const PLIPPreparing = dynamic(() => import('@/components/renewer/Page').then((module: any) => module.PLIPPreparing));
const PLIPSession = dynamic(() => import('@/components/renewer/Session').then((module: any): any => module.PLIPServiceSession), { loading: () => (<></>), ssr: false });
const PLIPUserSession = dynamic(() => import('@/components/renewer/Session').then((module: any): any => module.PLIPUserSession), { loading: () => (<></>), ssr: false });

const Page: NextPage = () => {
  return (
    <PLIPUserSession>
      <PLIPSession>
        <PLIPPageLayout selectedKey='/doc/imp'>
          <PLIPPreparing />
        </PLIPPageLayout>
      </PLIPSession>
    </PLIPUserSession>
  )
}

export default Page;