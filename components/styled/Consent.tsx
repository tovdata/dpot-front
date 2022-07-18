// Component
import { Alert } from 'antd';
import Grid from 'antd/lib/card/Grid';
// Icon
import { VscChevronRight } from 'react-icons/vsc';
// Style
import styled from 'styled-components';

// Styled component(Card Container)
export const StyleCardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;
// Styled component(Card Grid)
export const StyleCardGrid = styled(Grid)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: 'center';
  min-width: -moz-available;
  min-width: -webkit-fill-available;
  min-width: fill-available;
  margin: 0.5rem;
  padding: 2rem;
  cursor: pointer;
  border-radius:8px;
  .info{
    display: flex;
  };
  &:hover{
    transform:scale(1.01);  
  };
`;
// Styled component(Header Question Item)
export const StyledHeaderQuestionItem = styled.span`
  align-items: center;
  cursor: pointer;
  display: flex;
  margin-left: 0.5rem;
`;
// Styled component(Card Right Button)
export const StyledCardRightBtn = styled(VscChevronRight)`
  font-size: 1.25rem;
  color:rgba(0, 0, 0, 0.45);
`;
// Styled component(Alert)
export const StyledAlert = styled(Alert)`
  margin-bottom: 2rem;
  border-color:#BFBFBF;
  background-color: #F5F5F5;
  svg{
    color:rgba(0, 0, 0, 0.85);
  }
`;
export const StyledJobSelection = styled.div`
  span, p, div{
    white-space: pre-line;
  }
`;