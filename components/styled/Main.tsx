import styled from 'styled-components';

/** [Styled Component] 메인 컨테이너 */
export const StyledMainContainer = styled.div`
  color: #37352F;
  margin: 102px auto 96px auto;
  padding-bottom: 96px;
  padding-left: 96px;
  padding-right: 96px;
  width: 968px;
`;
/** [Styled Component] 메인 헤더 */
export const StyledMainHeader = styled.h2`
  font-size: 40px;
  font-weight: 700;
  line-height: 1.2;
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