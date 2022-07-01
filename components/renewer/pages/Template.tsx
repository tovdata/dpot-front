import dynamic from 'next/dynamic';
// Component
import { Tabs } from 'antd';
const TemplateList = dynamic(() => import('@/components/renewer/Template').then((mod: any): any => mod.TemplateList));
const GuideLine = dynamic(() => import('@/components/renewer/Template').then((mod: any): any => mod.GuideLine));

const TemplateMain: React.FC<any> = (): JSX.Element => {
  return (
    <Tabs>
      <Tabs.TabPane key='template' tab='템플릿'>
        <TemplateList />
      </Tabs.TabPane>
      <Tabs.TabPane key='guide' tab='가이드라인'>
        <GuideLine />
      </Tabs.TabPane>
    </Tabs>
  );
}

export default TemplateMain;