import type { NextPage } from 'next';
// Component
import { TOVLayoutHorizontalPadding, TOVLayoutPadding, TOVLayoutVerticalPadding, TOVPageLayout, TOVSession } from '@/components/common/Layout';
import { TemplateMain } from '@/components/Template';


const Page: NextPage = ({ expand, onExpand }: any) => {
  return (
    <TOVSession type='service'>
      <TOVPageLayout expand={expand} onExpand={onExpand} selectedKey='/doc/template'>
        <TOVLayoutPadding style={{ paddingTop: 42 }}>
          <TemplateMain />
        </TOVLayoutPadding>
      </TOVPageLayout>
    </TOVSession>
  )
}

export default Page;