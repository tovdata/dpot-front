// Style
import styled, { css } from 'styled-components';

/** [Interface] Menu open status */
interface MenuOpenStatus {
  open: boolean;
}
/** [Interface] Properties for SideMenuLayout */
interface SideMenuLayoutProps {
  expand: boolean;
}

// Styled component (sideMenuToggle)
export const StyledSideMenuToggle = styled.div<MenuOpenStatus>`
  align-items: center;
  background-color: ${({ open }) => open ? '#FFFFFF' : '#0050B3'};
  border: 1px solid #0050B3;
  border-radius: 4px;
  color: ${({ open }) => open ? '#0050B3' : '#FFFFFF'};
  cursor: pointer;
  display: flex;
  font-size: 12px;
  justify-content: center;
  height: 18px;
  position: absolute;
  right: ${({ open }) => open ? '18px' : '34px'};
  transition: transform 0.42s, background-color 0.29s, color: 0.29s;;
  top: 11px;
  width: 18px;
  z-index: 11;
  ${({ open }) => !open && css`
    svg {
      transform: rotate(180deg);
    }
  `}
`;
// Styled component (sideMenuProfile)
export const StyledSideMenuProfile = styled.li`
  align-items: center;
  cursor: default;
  display: flex;
  height: 40px;
  margin-bottom: 4px;
  overflow: hidden;
  padding-left: 33px;
  padding-right: 0;
  position: relative;
  width: 100%;
`;
// Styled component (sideMenuProfileIcon)
export const StyledSideMenuProfileIcon = styled.span<MenuOpenStatus>`
  align-items: center;
  background-color: #f0f5ff;
  border-radius: 0.25rem;
  display: flex;
  height: 1.75rem;
  justify-content: center;
  padding: 7px;
  transition: opacity 0.26s;
  user-select: none;
  ${(props: any) => !props.open && css`
    opacity: 0;
    transition-delay: 0.12s;
  `}
`;
// Styled component (sideMenuProfileContent)
export const StyledSideMenuProfileContent = styled.div<MenuOpenStatus>`
  color: #002766;
  cursor: pointer;
  display: block;
  flex: 1;
  font-size: 13px;
  line-height: 1.5715;
  margin-left: 12px;
  overflow: hidden;
  padding-right: 46px;
  text-overflow: ellipsis;
  transition: opacity 0.19s;
  white-space:nowrap;
  ${(props: any) => !props.open && css`
    opacity: 0;
  `}
`;
export const StyledServiceName = styled.p`
  cursor: pointer;
  margin: 0;
  width: 100%;
`;
/** [Component] 사이드 레이아웃 */
export const SideMenuLayout = styled.div<SideMenuLayoutProps>`
  background-color: #FFFFFF;
  position: relative;
  width: 100%;
  .ant-menu .ant-menu-item {
    margin-bottom: 2px;
    margin-top: 2px;
    padding-left: ${(props: any) => props.expand ? '40px !important' : '35px !important'};
  }
  .ant-menu .ant-menu-item-divider {
    margin: ${(props: any) => props.expand ? '16px 20px 8px 20px' : '16px 16px 8px 16px'};
  }
  .ant-menu .ant-menu-item-group {
    margin-bottom: 32px;
  }
  .ant-menu .ant-menu-item-group-title {
    color: #595959;
    font-size: 12px;
    font-weight: 400;
    line-height: 22px;
    padding-left: ${(props: any) => props.expand ? '40px !important' : '23px'};
    text-overflow: ellipsis;
    white-space: nowrap;
    ${(props: any) => props.expand && css`
      padding-right: 0 !important;
    `}
  }  
  .ant-menu-title-content {
    margin-left: 16px !important;
  }
`;