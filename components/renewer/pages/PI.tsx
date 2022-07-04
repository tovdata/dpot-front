import dynamic from 'next/dynamic';
// Component
const FNITableForm = dynamic(() => import('@/components/renewer/PI').then((module: any): any => module.FNITableForm), { ssr: false });
const PITableForm = dynamic(() => import('@/components/renewer/PI').then((module: any): any => module.PITableForm), { ssr: false });

const PIMain: React.FC<any> = (): JSX.Element => {
  return (
    <>
      <PITableForm />
      <FNITableForm />
    </>
  );
}

export default PIMain;