import dynamic from 'next/dynamic';
// Component
const Templates = dynamic(() => import('@/components/renewer/Template').then((mod: any): any => mod.DefaultTemplates));
const References = dynamic(() => import('@/components/renewer/Template').then((mod: any): any => mod.References));

const TemplateMain: React.FC<any> = (): JSX.Element => {
  return (
    <>
      <Templates />
      <References />
    </>
  );
}

export default TemplateMain;