import { NextPage } from "next";
// Component
import { TOVLayoutPadding, TOVPageLayout, TOVSession } from "@/components/common/Layout";
import { ConsentMain } from "@/components/Consent";

const Page: NextPage = ({ expand, onExpand }: any) => {
  return (
    <TOVSession type='service'>
      <TOVPageLayout expand={expand} onExpand={onExpand} selectedKey='/doc/consent'>
        <TOVLayoutPadding>
          <ConsentMain />
        </TOVLayoutPadding>
      </TOVPageLayout>
    </TOVSession>
  );
}

export default Page;