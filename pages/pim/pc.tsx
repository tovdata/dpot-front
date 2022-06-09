// Component
import { Tabs } from "antd";
import { TOVPageLayout } from '../../components/common/Layout';
import { CFNITableForm, CPITableForm, PFNITableForm, PPITableForm } from "../../components/PCTable";
// Style
import styled from "styled-components";

const { TabPane } = Tabs;

const CustomTabPane = styled(TabPane)`
  margin-top: 2rem;
`;
const Page = ({ expand, onExpand }: any) => {
  return (
    <TOVPageLayout expand={expand} onExpand={onExpand} selectedKey='/pim/pc'>
      <div style={{ paddingBottom: 74, paddingTop: 36 }}>
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
      </div>
    </TOVPageLayout>
  )
}

export default Page;