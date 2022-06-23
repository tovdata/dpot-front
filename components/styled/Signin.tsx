// Component
import { Button } from 'antd';
import Link from 'next/link';
// Styled
import styled from 'styled-components';

/** [Styled Component] 메일 재전송 모달 내용 */
export const StyledResendMailModalContent = styled.div`
  position: relative;
  p {
    margin-bottom: 8px;
  }
  a {
    color: #0050B3;
    cursor: pointer;
    font-size: 12px;
    font-weight: 400;
    line-height: 20px;
    text-decoration: underline;
  }
`;
/** [Styled Component] 로그인 컨테이너 */
export const StyledSigninContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  min-height: 100vh;
  position: relative;
  width: 100vw;
`;
/** [Styled Component] 로그인 폼 */
export const StyledSigninForm = styled.div`
  position: relative;
  width: 300px;
`;
/** [Styled Component] 로그인 폼 헤더 */
export const StyledSigninHeader = styled.div`
  margin-bottom: 48px;
  position: relative;
  text-align: center;
  user-select: none;
  h2 {
    font-size: 24px;
    font-weight: 500;
    line-height: 32px;
    margin: 0;
  }
`;
/** [Styled Component] 로그인 폼 풋터 */
export const StyledSigninFooter = styled.div`
  align-items: center;
  display: flex;
  margin-top: 8px;
  position: relative;
  .description {
    color: #8C8C8C;
    font-size: 12px;
    font-weight: 400;
    lineHeight: 20px;
    margin: 0;
  }
  .link {
    color: #00000073;
    cursor: pointer;
    font-size: 12px;
    font-weight: 400;
    margin-left: 6px;
    line-height: 20px;
    text-decoration: underline;
  }
`;
/** [Styled Component] 로그인 완료 버튼 */
export const StyledFinishButton = styled(Button)`
  width: 100%;
`;