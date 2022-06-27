import { NextPage } from "next";
import dynamic from "next/dynamic";
// Component
import { TOVLayoutPadding, TOVPageLayout } from "@/components/common/Layout";
import { ConsentMain } from "@/components/Consent";
const PILPSession = dynamic(() => import('@/components/renewer/ServiceSession'), { ssr: false });

const Page: NextPage = ({ expand, onExpand }: any) => {
  return (
    <PILPSession>
      <TOVPageLayout expand={expand} onExpand={onExpand} selectedKey='/doc/consent'>
        <TOVLayoutPadding>
          <ConsentMain />
        </TOVLayoutPadding>
      </TOVPageLayout>
    </PILPSession>
  );
}

export default Page;