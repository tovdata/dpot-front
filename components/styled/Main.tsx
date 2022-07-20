import styled from 'styled-components';

/** [Styled Component] 메인 컨테이너 */
export const StyledMainContainer = styled.div`
  color: #37352F;
  margin: 168px auto 96px auto;
  padding-bottom: 96px;
  padding-left: 96px;
  padding-right: 96px;
  width: 968px;
`;
/** [Styled Component] 메인 풋터 */
export const StyledMainFooter = styled.div`
  background-color: #F8F9FC;
  display: flex;
  justify-content: center;
  padding-bottom: 54px;
  padding-top: 54px;
  .container {
    color: #333333;
    font-size: 12px;
    font-weight: 400;
    line-height: 22px;
    width: 680px;
    .bottom {
      align-items: end;
      display: flex;
      justify-content: space-between;
      .company > label {
        border-right: 0.5px solid #B0B0B0;
        font-weight: 600;
        padding: 0 12px;
        &:first-child { 
          padding-left: 0;
        }
        &:last-child {
          border-right: none;
        }
      }
      .copyright {
        margin-bottom: 0;
      }
      .links > a {
        border-right: 0.5px solid #B0B0B0;
        color: #333333;
        padding: 0 16px;
        &:last-child {
          border-right: none;
        }
      }
    }
    .top {
      margin-bottom: 48px;
      user-select: none;
      .description {
        font-weight: 600;
        margin: 0;
      }
    }
  }
`;
/** [Styled Component] 메인 헤더 */
export const StyledMainHeader = styled.div`
  align-items: center;
  background-color: #FFFFFF;
  box-shadow: inset 0px -1px 0px #F0F0F0;
  display: flex;
  justify-content: space-between;
  height: 68px;
  padding-left: 58px;
  padding-right: 58px;
  position: fixed;
  top: 0;
  user-select: none;
  width: 100vw;
  z-index: 999;
  .logo {
    align-items: center;
    cursor: pointer;
    display: flex;
  }
  .tools {
    .btn {
      background-color: #4380F9;
      border-radius: 6px;
      box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.043);
      color: #FFF;
      cursor: pointer;
      font-size: 14px;
      font-weight: 400;
      height: 32px;
      line-height: 21px;
      padding: 6px 16px;
      user-select: none;
    }
  }
`;
/** [Styled Component] 메인 히어로 */
export const StyledMainHero = styled.h2`
  font-size: 40px;
  font-weight: 700;
  line-height: 48px;
  margin: 0;
  user-select: none;
`;
/** [Styled Component] 설명 카드 목록 */
export const StyledDescriptionCardList = styled.div`
  margin-top: 56px;
  position: relative;
`;
/** [Styled Component] 설명 카드 */
export const StyledDescriptionCard = styled.div`
  align-item: center;
  background-color: #F1F1EF;
  border-radius: 8px;
  display: flex;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
  padding: 16px;
  user-select: none;
  &:last-child {
    margin-bottom: 0;
  }
`;
/** [Styled Component] 메인 섹션 */
export const StyledMainSection = styled.div`
  margin-top: 92px;
  position: relative;
  user-select: none;
  .title {
    font-size: 30px;
    font-weight: 700;
    line-height: 1.3;
  }
  .content {
    display: flex;
    justify-content: space-between;
    margin-top: 16px;
    .text {
      flex-basis: 50%;
      font-size: 20px;
      font-weight: 600;
      line-height: 1.3;
      margin-top: 20px;
    }
    .image {
      flex-basis: calc(50% - 46px);
      height: 100%;
      img {
        object-fit: cover;
        width: 100%;
      }
    }
  }
`;