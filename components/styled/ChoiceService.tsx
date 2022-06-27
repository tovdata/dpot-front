// Style
import styled from 'styled-components';

export const StyledAddButton = styled.div`
  align-items: center;
  background-color: #FFFFFFCC;
  border: 1px dashed #D8DFED;
  border-radius: 12px;
  color: #0050B3;
  cursor: pointer;
  display: flex;
  padding: 56px 60px;
  user-select: none;
  width: 100%;
  .icon {
    align-items: center;
    display: flex;
    font-size: 24px;
    margin-right: 26px;
  }
  .name {
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
    margin: 0;
  }
`;
export const StyledServiceCard = styled.div`
  align-items: center;
  background-color: #FFFFFF;
  border: 1px solid #D8DFED;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  padding: 56px 60px;
  user-select: none;
  width: 100%;
  .content {
    align-items: center;
    display: flex;
    .icons {
      align-items: center;
      color: #0050B3;
      display: flex;
      font-size: 24px;
      justify-content: center;
      margin-right: 26px;
    }
    .icon {
      align-items: center;
      display: flex;
      margin-left: 16px;
      &:first-child {
        margin-left: 0;
      }
    }
    .name {
      color: #2F2E41;
      cursor: pointer;
      font-size: 20px;
      font-weight: 500;
      line-height: 28px;
      margin: 0;
    }
  }
  .setting {
    align-items: center;
    color: #8C8C8C;
    cursor: pointer;
    display: flex;
    font-size: 18px;
  }
`;