import { NextPage } from "next";
// Component
import { TOVLayoutPadding, TOVPageLayout } from "@/components/common/Layout";
import { ConsentMain } from "@/components/Consent";

const Page: NextPage = ({ expand, onExpand }: any) => {
  return (
    <TOVPageLayout expand={expand} onExpand={onExpand} selectedKey='/doc/consent'>
      <TOVLayoutPadding>
        <ConsentMain />
      </TOVLayoutPadding>
    </TOVPageLayout>
  );
}

export default Page;