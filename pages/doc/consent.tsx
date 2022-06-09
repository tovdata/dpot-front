import { NextPage } from "next";
// Component
import { TOVPageLayout } from "@/components/common/Layout";
import { ConsentMain } from "@/components/consent/Consent";

const Page: NextPage = ({ expand, onExpand }: any) => {
  return (
    <TOVPageLayout expand={expand} onExpand={onExpand} selectedKey='/doc/consent'>
      <div style={{ paddingBottom: 74, paddingTop: 36 }}>
        <ConsentMain />
      </div>
    </TOVPageLayout>
  );
}

export default Page;