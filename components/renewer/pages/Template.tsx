import dynamic from 'next/dynamic';
// Component
const Templates = dynamic(() => import('@/components/renewer/Template').then((mod: any): any => mod.DefaultTemplates));
const Guidelines = dynamic(() => import('@/components/renewer/Template').then((mod: any): any => mod.Guidelines));

const TemplateMain: React.FC<any> = (): JSX.Element => {
  return (
    <>
      <Templates />
      <Guidelines />
    </>
  );
}

export default TemplateMain;