import dynamic from 'next/dynamic';
// Component
const MainBody = dynamic(() => import('@/components/renewer/Main').then((mod: any): any => mod.MainBody));
const MainFooter = dynamic(() => import('@/components/renewer/Main').then((mod: any): any => mod.MainFooter));
const MainHeader = dynamic(() => import('@/components/renewer/Main').then((mod: any): any => mod.MainHeader));

/** [Component] 메인 페이지 */
const Main: React.FC<any> = (): JSX.Element => {
  return (
    <>
      <MainHeader />
      <MainBody />
      <MainFooter />
    </>
  );
}

export default Main;