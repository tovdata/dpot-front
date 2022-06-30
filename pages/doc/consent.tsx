import { NextPage } from "next";
import dynamic from "next/dynamic";
// Component
import { TOVLayoutPadding, TOVPageLayout } from "@/components/common/Layout";
import { ConsentMain } from "@/components/Consent";
const PLIPSession = dynamic(() => import('@/components/renewer/Session').then((module: any): any => module.PILPServiceSession), { ssr: false });

const Page: NextPage = ({ expand, onExpand }: any) => {
  return (
    <PLIPSession>
      <TOVPageLayout expand={expand} onExpand={onExpand} selectedKey='/doc/consent'>
        <TOVLayoutPadding>
          <ConsentMain />
        </TOVLayoutPadding>
      </TOVPageLayout>
    </PLIPSession>
  );
}

export default Page;