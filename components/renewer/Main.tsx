import { animated, easings, useSpring } from 'react-spring';
// Component
import { StyledDescriptionCard, StyledDescriptionCardList, StyledMainContainer, StyledMainFooter, StyledMainHeader, StyledMainHero, StyledMainIntro, StyledMainSection } from '@/components/styled/Main';
import { useCallback, useEffect, useRef, useState } from 'react';

/** [Component] 메인 페이지 풋터 */
export const MainFooter: React.FC<any> = (): JSX.Element => {
  return (
    <StyledMainFooter>
      <div className='container'>
        <div className='top'>
          <svg width="75" height="26" viewBox="0 0 58 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.4723 6.25548C18.7243 4.44421 17.5531 2.97813 15.9548 1.84336C15.0384 1.19265 14.0297 0.718511 12.9367 0.40506C12.1747 0.188818 11.4006 0.0499475 10.6145 0.012254C9.1987 -0.0551974 7.81899 0.155092 6.48742 0.660978C5.09368 1.19067 3.87641 1.97827 2.83561 3.02972C1.76674 4.10894 1.00069 5.37663 0.509368 6.80303C0.232625 7.60848 0.0340915 8.43774 0.0200538 9.28683C-0.00802154 11.0009 0.0120323 12.715 0.0120323 14.429H0.00601615C0.00601615 16.1828 0.0100269 17.9345 0 19.6882C0 19.9204 0.0441185 20.0057 0.300808 19.9997C1.03478 19.9819 1.77075 19.9938 2.50673 19.9938C2.76208 19.9938 2.88976 19.8688 2.88976 19.6188C2.88976 16.403 2.88976 13.1891 2.88976 9.97325C2.88976 8.75515 3.19859 7.61245 3.81424 6.561C5.05758 4.43628 6.90454 3.20231 9.3872 2.89283C10.2696 2.78173 11.1299 2.87696 11.9681 3.10113C13.4341 3.49394 14.6694 4.2736 15.64 5.44408C17.1541 7.26725 17.6353 9.35032 17.124 11.6298C16.9315 12.4888 16.5845 13.2724 16.0972 13.9747C15.7663 14.4528 15.3713 14.8932 14.914 15.294C13.5604 16.4803 11.9762 17.0854 10.1733 17.1231C9.30298 17.141 8.65724 16.4942 8.65724 15.6352C8.65724 13.7763 8.65724 11.9155 8.65524 10.0566C8.65524 9.86017 8.68732 9.67964 8.75952 9.49315C9.01821 8.82261 9.65592 8.4913 10.44 8.61033C10.9674 8.68969 11.551 9.36023 11.539 9.97325C11.5129 11.231 11.535 12.4908 11.5269 13.7505C11.5269 13.9886 11.6192 14.0184 11.8037 13.935C13.2335 13.2823 14.1199 12.1892 14.3806 10.6597C14.521 9.83636 14.4207 9.00711 14.0517 8.22745C13.2716 6.57489 11.7175 5.69008 10.0149 5.70794C9.11447 5.71785 8.27822 6.00155 7.54626 6.55703C6.43127 7.40216 5.80559 8.51907 5.78152 9.89191C5.7374 12.3896 5.76748 14.8893 5.76548 17.387C5.76548 18.1805 5.76949 18.976 5.76147 19.7696C5.76147 19.9461 5.8096 20.0057 5.99409 19.9977C6.38514 19.9838 6.7782 20.0017 7.17125 19.9918C8.4928 19.96 9.81435 20.0553 11.1359 19.9164C12.1807 19.8073 13.1894 19.5692 14.14 19.1526C15.7463 18.4503 17.0959 17.4068 18.1628 16.0181C18.1788 15.9983 18.1948 15.9784 18.2109 15.9566C19.2898 14.5282 19.9455 12.9233 20.1381 11.1636C20.3206 9.4872 20.13 7.84456 19.4743 6.25548H19.4723Z" fill="#4380F9"/>
            <path d="M38.9867 0.343842C39.6505 0.343842 40.19 0.877502 40.19 1.53416V14.8261H37.7835V1.53416C37.7835 0.877502 38.323 0.343842 38.9867 0.343842Z" fill="#4380F9"/>
            <path d="M43.1979 4.31165C43.8617 4.31165 44.4011 4.84531 44.4011 5.50197V14.8261H41.9947V5.50197C41.9947 4.84531 42.5341 4.31165 43.1979 4.31165Z" fill="#4380F9"/>
            <path d="M43.599 0.145416C44.4854 0.145416 45.2033 0.855641 45.2033 1.73251C45.2033 2.60938 44.4854 3.31961 43.599 3.31961H41.9947V1.73251C41.9947 0.855641 42.7126 0.145416 43.599 0.145416Z" fill="#4380F9"/>
            <path d="M30.4638 4.90692C27.4176 4.90692 24.949 7.34906 24.949 10.3626V19.3892H27.3554V15.8182H30.4638C33.5099 15.8182 35.9786 13.3761 35.9786 10.3626C35.9786 7.34906 33.5099 4.90692 30.4638 4.90692ZM33.5721 10.3626C33.5721 12.0607 32.1804 13.4376 30.4638 13.4376H27.3554V10.3626C27.3554 8.66437 28.7472 7.28756 30.4638 7.28756C32.1804 7.28756 33.5721 8.66437 33.5721 10.3626Z" fill="#4380F9"/>
            <path d="M51.6206 4.90692C48.5745 4.90692 46.1058 7.34906 46.1058 10.3626V19.3892H48.5123V15.8182H51.6206C54.6668 15.8182 57.1354 13.3761 57.1354 10.3626C57.1354 7.34906 54.6668 4.90692 51.6206 4.90692ZM54.729 10.3626C54.729 12.0607 53.3372 13.4376 51.6206 13.4376H48.5123V10.3626C48.5123 8.66437 49.904 7.28756 51.6206 7.28756C53.3372 7.28756 54.729 8.66437 54.729 10.3626Z" fill="#4380F9"/>
          </svg>
          <p className='description'>Privacy Clip, Plip !</p>
        </div>
        <div className='bottom'>
          <div>
            <div className='company'>
              <label>주식회사 토브데이터</label>
              <label>plip@tovdata.com</label>
            </div>
            <p className='copyright'>© 2022 TOVDATA INC. All Rights Reserved</p>
          </div>
          <div className='links'>
            <a href='https://tovdata.notion.site/4ba3e66ff6b84db78dcabae071eeca3c' rel="noopener noreferrer" target='_blank'>이용약관</a>
            <a><b>개인정보 처리방침</b></a>
          </div>
        </div>
      </div>
    </StyledMainFooter>
  );
}
/** [Component] 메인 페이지 헤더 */
export const MainHeader: React.FC<any> = (): JSX.Element => {
  return (
    <StyledMainHeader>
      <span className='logo'>
        <svg width="58" height="20" viewBox="0 0 58 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19.4723 6.25548C18.7243 4.44421 17.5531 2.97813 15.9548 1.84336C15.0384 1.19265 14.0297 0.718511 12.9367 0.40506C12.1747 0.188818 11.4006 0.0499475 10.6145 0.012254C9.1987 -0.0551974 7.81899 0.155092 6.48742 0.660978C5.09368 1.19067 3.87641 1.97827 2.83561 3.02972C1.76674 4.10894 1.00069 5.37663 0.509368 6.80303C0.232625 7.60848 0.0340915 8.43774 0.0200538 9.28683C-0.00802154 11.0009 0.0120323 12.715 0.0120323 14.429H0.00601615C0.00601615 16.1828 0.0100269 17.9345 0 19.6882C0 19.9204 0.0441185 20.0057 0.300808 19.9997C1.03478 19.9819 1.77075 19.9938 2.50673 19.9938C2.76208 19.9938 2.88976 19.8688 2.88976 19.6188C2.88976 16.403 2.88976 13.1891 2.88976 9.97325C2.88976 8.75515 3.19859 7.61245 3.81424 6.561C5.05758 4.43628 6.90454 3.20231 9.3872 2.89283C10.2696 2.78173 11.1299 2.87696 11.9681 3.10113C13.4341 3.49394 14.6694 4.2736 15.64 5.44408C17.1541 7.26725 17.6353 9.35032 17.124 11.6298C16.9315 12.4888 16.5845 13.2724 16.0972 13.9747C15.7663 14.4528 15.3713 14.8932 14.914 15.294C13.5604 16.4803 11.9762 17.0854 10.1733 17.1231C9.30298 17.141 8.65724 16.4942 8.65724 15.6352C8.65724 13.7763 8.65724 11.9155 8.65524 10.0566C8.65524 9.86017 8.68732 9.67964 8.75952 9.49315C9.01821 8.82261 9.65592 8.4913 10.44 8.61033C10.9674 8.68969 11.551 9.36023 11.539 9.97325C11.5129 11.231 11.535 12.4908 11.5269 13.7505C11.5269 13.9886 11.6192 14.0184 11.8037 13.935C13.2335 13.2823 14.1199 12.1892 14.3806 10.6597C14.521 9.83636 14.4207 9.00711 14.0517 8.22745C13.2716 6.57489 11.7175 5.69008 10.0149 5.70794C9.11447 5.71785 8.27822 6.00155 7.54626 6.55703C6.43127 7.40216 5.80559 8.51907 5.78152 9.89191C5.7374 12.3896 5.76748 14.8893 5.76548 17.387C5.76548 18.1805 5.76949 18.976 5.76147 19.7696C5.76147 19.9461 5.8096 20.0057 5.99409 19.9977C6.38514 19.9838 6.7782 20.0017 7.17125 19.9918C8.4928 19.96 9.81435 20.0553 11.1359 19.9164C12.1807 19.8073 13.1894 19.5692 14.14 19.1526C15.7463 18.4503 17.0959 17.4068 18.1628 16.0181C18.1788 15.9983 18.1948 15.9784 18.2109 15.9566C19.2898 14.5282 19.9455 12.9233 20.1381 11.1636C20.3206 9.4872 20.13 7.84456 19.4743 6.25548H19.4723Z" fill="#4380F9"/>
          <path d="M38.9867 0.343842C39.6505 0.343842 40.19 0.877502 40.19 1.53416V14.8261H37.7835V1.53416C37.7835 0.877502 38.323 0.343842 38.9867 0.343842Z" fill="#4380F9"/>
          <path d="M43.1979 4.31165C43.8617 4.31165 44.4011 4.84531 44.4011 5.50197V14.8261H41.9947V5.50197C41.9947 4.84531 42.5341 4.31165 43.1979 4.31165Z" fill="#4380F9"/>
          <path d="M43.599 0.145416C44.4854 0.145416 45.2033 0.855641 45.2033 1.73251C45.2033 2.60938 44.4854 3.31961 43.599 3.31961H41.9947V1.73251C41.9947 0.855641 42.7126 0.145416 43.599 0.145416Z" fill="#4380F9"/>
          <path d="M30.4638 4.90692C27.4176 4.90692 24.949 7.34906 24.949 10.3626V19.3892H27.3554V15.8182H30.4638C33.5099 15.8182 35.9786 13.3761 35.9786 10.3626C35.9786 7.34906 33.5099 4.90692 30.4638 4.90692ZM33.5721 10.3626C33.5721 12.0607 32.1804 13.4376 30.4638 13.4376H27.3554V10.3626C27.3554 8.66437 28.7472 7.28756 30.4638 7.28756C32.1804 7.28756 33.5721 8.66437 33.5721 10.3626Z" fill="#4380F9"/>
          <path d="M51.6206 4.90692C48.5745 4.90692 46.1058 7.34906 46.1058 10.3626V19.3892H48.5123V15.8182H51.6206C54.6668 15.8182 57.1354 13.3761 57.1354 10.3626C57.1354 7.34906 54.6668 4.90692 51.6206 4.90692ZM54.729 10.3626C54.729 12.0607 53.3372 13.4376 51.6206 13.4376H48.5123V10.3626C48.5123 8.66437 49.904 7.28756 51.6206 7.28756C53.3372 7.28756 54.729 8.66437 54.729 10.3626Z" fill="#4380F9"/>
        </svg>
      </span>
      <div className='tools'>
        <a className='btn' href='https://forms.gle/vMZDnaxXXAYL81Jd8' rel="noopener noreferrer" target='_blank'>지금 사전예약하기</a>
      </div>
    </StyledMainHeader>
  );
}
/** [Component] 메인 페이지 바디 */
export const MainBody: React.FC<any> = (): JSX.Element => {
  // 스크롤 및 브라우저 크기 상태
  const [pos, setPos] = useState<number>(0);
  const [scroll, setScroll] = useState<number>(0);
  const [win, setWin] = useState<number>(window.innerHeight);
  /** [Event handler] 브라우저 크기 갱신 */
  const updateWin = useCallback(() => setWin(window.innerHeight), []);
  /** [Event handler] 스크롤 갱신 */
  const updateScroll = useCallback(() => setScroll(window.scrollY), []);
  // 윈도우 이벤트 설정
  useEffect(() => {
    window.addEventListener('resize', updateWin);
    window.addEventListener('scroll', updateScroll);
    // 이벤트 제거
    return () => {
      window.removeEventListener('resize', updateWin);
      window.removeEventListener('scroll', updateScroll);
    };
  }, []);
  // 현재 스크롤 값 계산
  useEffect(() => setPos(win + scroll), [scroll, win]);

  // 컴포넌트 반환
  return (
    <StyledMainContainer>
      <MainHero />
      <Intro1 pos={pos} />
      <Intro2 pos={pos} />
      <MainDescription />
      <Section0 />
      <Section1 pos={pos} />
      <Section2 pos={pos} />
      <Section3 pos={pos} />
      <Section4 pos={pos} />
      <Section5 pos={pos} />
    </StyledMainContainer>
  );
}

/** [Internal Component] 메인페이지 히어로 */
const MainHero: React.FC<any> = (): JSX.Element => {
  return (
    <StyledMainHero>성장하는<br/>스타트업을 위한<br/>가장 간편한<br/>개인정보 문서 관리<br/><br/>Plip!</StyledMainHero>
  );
}
/** [Internal Component] 메인 페이지 바디 내 설명 */
const MainDescription: React.FC<any> = (): JSX.Element => {
  return (
    <StyledDescriptionCardList>
      <StyledDescriptionCard>✔️ 개인정보 처리방침을 만들기 위해 경쟁사 홈페이지부터 찾아보는 당신,</StyledDescriptionCard>
      <StyledDescriptionCard>✔️ 변호사도 아닌데 개인정보 보호법을 공부하고 있는 당신</StyledDescriptionCard>
      <StyledDescriptionCard>✔️ 능력은 있지만 여력이 없었던 당신,</StyledDescriptionCard>
    </StyledDescriptionCardList>
  );
}
/** [Internal Component] 인트로 1 */
const Intro1: React.FC<any> = ({ pos }): JSX.Element => {
  return (
    <Intro imageUrl='/images/main/intro1.png' pos={pos} text={<>개발빼고<br/>다 하고 계신가요?<br/><br/>개인정보는<br/>플립-하세요!</>} />
  );
}
/** [Internal Component] 인트로 2 */
const Intro2: React.FC<any> = ({ pos }): JSX.Element => {
  return (
    <Intro imageUrl='/images/main/intro2.png' pos={pos} text={<>풀잎씨, 오늘도<br/>야근하시나요?<br/><br/>개인정보는<br/>플립-하세요!</>} />
  );
}
/** [Internal Component] 섹션 0 */
const Section0: React.FC<any> = () :JSX.Element => {
  return (
    <Section title={<>사업에 집중하세요.<br/><label style={{ backgroundColor: '#E7F3F8' }}>개인정보 관리는 플립이 도와드릴게요!</label></>} />
  );
}
/** [Internal Component] 섹션 1 */
const Section1: React.FC<any> = ({ pos }): JSX.Element => {
  return (
    <Section imageRight imageUrl='/images/main/section1.png' pos={pos} text={<>법에 대한 전문 지식이 없어도,<br/>개인정보 필수문서를 만들수 있다면?!<br/><br/>플립에서는 법에서 요구하는 내용을 제대로 반영하여 만들 수 있습니다!</>} title='제대로 만들어 드립니다!' />
  );
}
/** [Internal Component] 섹션 2 */
const Section2: React.FC<any> = ({ pos }): JSX.Element => {
  return (
    <Section imageUrl='/images/main/section2.png' pos={pos} text={<>개인정보 필수 문서,<br/>어디에 관리되고 있나요?<br/>폴더 여기저기? 버전관리는?<br/><br/>고민은 이제 그만!<br/>한 곳에서, 딱 필요한 문서들만 만들어 관리합니다!</>} title='흩어져 있던 문서를 한 곳에서 관리!' />
  );
}
/** [Internal Component] 섹션 3 */
const Section3: React.FC<any> = ({ pos }): JSX.Element => {
  return (
    <Section imageRight imageUrl='/images/main/section3.png' pos={pos} text={<>담당자가 여러 명이어도!<br/>담당자가 바뀌어도!<br/>함께 관리 가능한 서비스!<br/><br/>업무 이력 확인을 통해<br/>나의 이전 업무 내용 확인과,<br/>여러 부서의 담당자들이 함께<br/>협업 가능합니다!</>} title='함께하는 개인정보 관리!' />
  );
}
/** [Internal Component] 섹션 4 */
const Section4: React.FC<any> = ({ pos }): JSX.Element => {
  return (
    <Section imageUrl='/images/main/section4.png' pos={pos} text={<>수집되는 개인정보가 바뀔 때마다,<br/>서비스 내용이 변할 때마다,<br/>내부 조직 개편될 때마다,<br/>법이 개정될 때마다,<br/><br/>개인정보 수집·이용 현황을 수정하면<br/>문서에도 바로 반영이 가능합니다!</>} title='조직 내외부의 변화에 빠른 대응 가능!' />
  );
}
/** [Internal Component] 섹션 5 */
const Section5: React.FC<any> = () :JSX.Element => {
  return (
    <Section title={<label style={{ color: '#0B6E99' }}>개인정보 관리<br/>새로운 패러다임 시작,<br/>플립.</label>} style={{ marginTop: 160 }} />
  );
}
/** [Internal Component] 섹션 */
const Intro: React.FC<any> = ({ imageUrl, pos, text }): JSX.Element => {
  // 참조 객체
  const ref = useRef<any>();
  // 애니메이션
  const [style, animate] = useSpring(() => ({
    config: {
      duration: 900,
      easing: easings.easeInOutSine
    },
    opacity: 0,
    transform: "translate3d(0, 40px, 0)"
  }));
  // 애니메이션 발동 조건
  useEffect(() => {
    const { clientHeight, offsetTop } = ref.current;
    if (pos > offsetTop + Math.floor(clientHeight / 3 * 2)) {
      animate.start({
        opacity: 1,
        transform: "translate3d(0, 0, 0)"
      });
    }
  }, [pos]);

  // 컴포넌트 반환
  return (
    <animated.div ref={ref} style={style}>
      <StyledMainIntro>
        <div className='image'>
          <img src={imageUrl} />
        </div>
        <div className='text'>{text}</div>
      </StyledMainIntro>
    </animated.div>
  );
}
/** [Internal Component] 섹션 */
const Section: React.FC<any> = ({ imageRight, imageUrl, pos, text, title, style }): JSX.Element => {
  // 참조 객체
  const ref = useRef<any>();
  // 애니메이션
  const [aStyle, animate] = useSpring(() => ({
    config: {
      duration: 900,
      easing: easings.easeInOutSine
    },
    opacity: pos === undefined ? 1 : 0,
    transform: pos === undefined ? "translate3d(0, 0, 0)" : "translate3d(0, 40px, 0)"
  }));
  // 애니메이션 발동 조건
  useEffect(() => {
    if (pos) {
      const { clientHeight, offsetTop } = ref.current;
      if (pos > offsetTop + Math.floor(clientHeight / 3 * 2)) {
        animate.start({
          opacity: 1,
          transform: "translate3d(0, 0, 0)"
        });
      }
    }
  }, [pos]);

  return (
    <animated.div ref={ref} style={aStyle}>
      <StyledMainSection style={style}>
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
    </animated.div>
  );
}