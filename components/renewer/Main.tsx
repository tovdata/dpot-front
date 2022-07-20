import { StyledDescriptionCard, StyledDescriptionCardList, StyledMainContainer, StyledMainHeader, StyledMainSection } from '@/components/styled/Main';

export const Main: React.FC<any> = (): JSX.Element => {
  return (
    <StyledMainContainer>
      <MainHeader />
      <MainDescription />
      <Section0 />
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
    </StyledMainContainer>
  );
}

const MainHeader: React.FC<any> = (): JSX.Element => {
  return (
    <StyledMainHeader>성장하는<br/>스타트업을 위한<br/>가장 간편한<br/>개인정보 문서 관리<br/><br/>Plip!</StyledMainHeader>
  );
}
const MainDescription: React.FC<any> = (): JSX.Element => {
  return (
    <StyledDescriptionCardList>
      <StyledDescriptionCard>✔️ 개인정보 처리방침을 만들기 위해 경쟁사 홈페이지부터 찾아보는 당신,</StyledDescriptionCard>
      <StyledDescriptionCard>✔️ 변호사도 아닌데 개인정보 보호법을 공부하고 있는 당신</StyledDescriptionCard>
      <StyledDescriptionCard>✔️ 능력은 있지만 여력이 없었던 당신,</StyledDescriptionCard>
    </StyledDescriptionCardList>
  );
}

const Section0: React.FC<any> = () :JSX.Element => {
  return (
    <Section title={<>사업에 집중하세요.<br/>개인정보 관리는 플립이 도와드릴게요!</>} />
  );
}
const Section1: React.FC<any> = (): JSX.Element => {
  return (
    <Section imageRight imageUrl='/images/main/section1.png' text={<>법에 대한 전문 지식이 없어도,<br/>개인정보 필수문서를 만들수 있다면?!<br/><br/>플립에서는 법에서 요구하는 내용을 제대로 반영하여 만들 수 있습니다!</>} title='제대로 만들어 드립니다!' />
  );
}
const Section2: React.FC<any> = (): JSX.Element => {
  return (
    <Section imageUrl='/images/main/section2.png' text={<>개인정보 필수 문서,<br/>어디에 관리되고 있나요?<br/>폴더 여기저기? 버전관리는?<br/><br/>고민은 이제 그만!<br/>한 곳에서, 딱 필요한 문서들만 만들어 관리합니다!</>} title='흩어져 있던 문서를 한 곳에서 관리!' />
  );
}
const Section3: React.FC<any> = (): JSX.Element => {
  return (
    <Section imageRight imageUrl='/images/main/section3.png' text={<>담당자가 여러 명이어도!<br/>담당자가 바뀌어도!<br/>함께 관리 가능한 서비스!<br/><br/>업무 이력 확인을 통해<br/>나의 이전 업무 내용 확인과,<br/>여러 부서의 담당자들이 함께<br/>협업 가능합니다!</>} title='함께하는 개인정보 관리!' />
  );
}
const Section4: React.FC<any> = (): JSX.Element => {
  return (
    <Section imageUrl='/images/main/section4.png' text={<>수집되는 개인정보가 바뀔 때마다,<br/>서비스 내용이 변할 때마다,<br/>내부 조직 개편될 때마다,<br/>법이 개정될 때마다,<br/><br/>개인정보 수집·이용 현황을 수정하면<br/>문서에도 바로 반영이 가능합니다!</>} title='조직 내외부의 변화에 빠른 대응 가능!' />
  );
}

const Section: React.FC<any> = ({ imageRight, imageUrl, text, title }): JSX.Element => {
  return (
    <StyledMainSection>
      <h3 className='title'>{title}</h3>
      {text ? (
        <div className='content'>
          {imageUrl && (imageRight === undefined || imageRight === false) ? (
            <div className='image'>
              <img src={imageUrl} />
            </div>
          ) : (<></>)}
          <div className='text'>{text}</div>
          {imageUrl && imageRight ? (
            <div className='image'>
              <img src={imageUrl} />
            </div>
          ) : (<></>)}
        </div>
      ) : (<></>)}
    </StyledMainSection>
  );
}