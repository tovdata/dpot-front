// Component
import { Tabs } from "antd";
import { TOVLayoutPadding, TOVPageLayout, TOVSession } from '@/components/common/Layout';
import { CFNITableForm, CPITableForm, PFNITableForm, PPITableForm } from "@/components/PCTable";
// Style
import styled from "styled-components";

/** [Styled Component] 커스텀 탭 패널  */
const CustomTabPane = styled(Tabs.TabPane)`
  margin-top: 2rem;
`;

const Page = ({ expand, onExpand }: any) => {
  return (
    <TOVSession type='service'>
      <TOVPageLayout expand={expand} onExpand={onExpand} selectedKey='/pim/pc'>
          <TOVLayoutPadding style={{ paddingTop: 36 }}>
            <Tabs defaultActiveKey="1">
              <CustomTabPane tab="제공" key="1">
                <PPITableForm />
                <PFNITableForm />
              </CustomTabPane>
              <CustomTabPane tab="위탁" key="2">
                <CPITableForm />
                <CFNITableForm />
              </CustomTabPane>
            </Tabs>
          </TOVLayoutPadding>
        </TOVPageLayout>
    </TOVSession>
  );
}

export default Page;