import { useState } from 'react';
import { useRecoilState } from 'recoil';

import styled, { css } from 'styled-components';
// Components
import Switch from '../pim/Switch';
// Color
import { GRAYSCALE100, GRAYSCALE200, GRAYSCALE400, GRAYSCALE800, GRAYSCALE_D, PRIMARY200, PRIMARY_D, WHITE } from '../../static/color';
// Font
import { FS_BS, FS_BXS, FS_BXXS, FS_HXXS, FS_HXXXXS, LH_BS, LH_BXS, LH_BXXS, LH_HXXS, LH_HXXXXS } from '../../static/font';
// Icon
import { IoEllipsisHorizontal } from 'react-icons/io5';
// State
import { updatePITableHeaderSelector } from '../../models/state_h';
// Type
import { CommonProps, TableFormHeaderProps, TableHeaderData, TableViewMenuProps } from '../../models/type';

// Styled element (TableForm)
const StyledTableForm = styled.div`
  position: relative;
`;
// Styled element (TableFormHeader)
const StyledTableFormHeader = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding: 0.625rem;
  user-select: none;
`;
// Styled element (TableTitle)
const StyledTableTitle = styled.h2`
  color: ${GRAYSCALE_D};
  font-size: ${FS_HXXS};
  font-weight: 600;
  line-height: ${LH_HXXS};
  margin: 0;
`;
// Styled element (TableTool)
const StyledTableTool = styled.div`
  align-items: center;
  display: flex;
  justify-content: end;
  position: relative;
`;
// Styled element (TableToolItem)
const StyledTableToolItem = styled.div`
  position: relative;
  .icon {
    cursor: pointer;
  }
`;
// Styled element (Table)
export const StyledTable = styled.table`
  border-collapse: collapse;
  position: relative;
  width: 100%;
  td {
    border-bottom: 1px solid ${GRAYSCALE200};
    color: ${GRAYSCALE_D};
    cursor: pointer;
    font-size: ${FS_BS};
    font-weight: 500;
    line-height: ${LH_BS};
    margin: 0;
    padding: 0.75rem 0;
    text-align: center;
    user-select: none;
  }
  th {
    background-color: ${GRAYSCALE100};
    border: none;
    border-bottom: 1px solid ${GRAYSCALE400};
    color: ${GRAYSCALE800};
    font-size: ${FS_HXXXXS};
    font-weight: 700;
    line-height: ${LH_HXXXXS};
    margin: 0;
    padding: 0.75rem 0;
    text-align: center;
    user-select: none;
    &:first-child {
      border-top-left-radius: 0.5rem;
    }
    &:last-child {
      border-top-right-radius: 0.5rem;
    }
  }
  tr {
    margin: 0;
    padding: 0;
  }
`;
// Styled element (Item)
export const StyledItem = styled.span`
  border: 1px solid ${PRIMARY200};
  border-radius: 0.75rem;
  color: ${PRIMARY_D};
  font-size: ${FS_BXS};
  font-weight: 500;
  line-height: ${LH_BXS};
  margin-right: 0.375rem;
  padding: 0.125rem 0.625rem;
  &:last-child {
    margin-right: 0;
  }
`;
// Styled element (List)
export const StyledList = styled.ul`
  margin: 0;
  li {
    text-align: left;
  }
`;
// Styled element (TableViewMenu)
export const StyledTableViewMenu = styled.div<{visible: boolean}>`
  background-color: ${WHITE};
  border-radius: 0.25rem;
  box-shadow: 1px 1px 6px rgba(195, 200, 229, 0.5);
  display: none;
  min-width: 11.25rem;
  padding: 0.75rem 1rem;
  position: absolute;
  right: 0;
  z-index: 6;
  h4 {
    font-size: ${FS_BXXS};
    font-weight: 600;
    line-height: ${LH_BXXS};
    margin: 0 0 0.375rem 0;
  }
  ${(props: any) => props.visible && css`
    display: block;
  `}
`;
// Styled element (TableViewMenuItem)
export const StyledTableViewMenuItem = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.25rem;
  position: relative;
  &:last-child {
    margin-bottom: 0;
  }
  p {
    color: ${GRAYSCALE800};
    font-size: ${FS_BXS};
    font-weight: 500;
    line-height: ${LH_BXS};
    margin: 0;
  }
`;

export const TableForm = ({ children }: CommonProps): JSX.Element => {
  return (
    <StyledTableForm>{children}</StyledTableForm>
  )
}

export const TableFormHeader = ({ title, type }: TableFormHeaderProps): JSX.Element => {
  // Set a local state
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  // Create an event handler (onClick)
  const onClick = (): void => setOpenMenu(!openMenu);

  // Return an element
  return (
    <StyledTableFormHeader>
      <StyledTableTitle>{title}</StyledTableTitle>
      <StyledTableTool>
        <StyledTableToolItem>
          <a className='icon' onClick={onClick}><IoEllipsisHorizontal /></a>
          {type ? <TableFieldViewMenuForPI visible={openMenu} /> : <TableFieldViewMenuForPI visible={openMenu} />}
        </StyledTableToolItem>
      </StyledTableTool>
    </StyledTableFormHeader>
  )
}

/**
 * [Internel component] Create an element for view menu (PI)
 * @param param0 
 * @returns created element
 */
const TableFieldViewMenuForPI = ({ visible }: TableViewMenuProps): JSX.Element => {
  // Get a state
  const [viewOptions, setViewOptions] = useRecoilState(updatePITableHeaderSelector);

  // Create the items
  const items: JSX.Element[] = Object.keys(viewOptions).map((key: string, index: number): JSX.Element => {
    if (key !== 'subject') {
      // Create an event handler (onChange)
      const onChange = (e: any) => {
        // Extract a data for key
        const elem: TableHeaderData = viewOptions[key];
        // Update a view option
        setViewOptions({...viewOptions, [key]: { key: elem.key, name: elem.name, visible: e.target.checked }});
      }
      // Return an element
      return (
        <StyledTableViewMenuItem key={index}>
          <p>{viewOptions[key].name}</p>
          <Switch id={`pi-view-option-${index}`} status={viewOptions[key].visible} onChange={onChange} />
        </StyledTableViewMenuItem>
      )
    } else {
      return (
        <StyledTableViewMenuItem key={index}>
          <p>{viewOptions[key].name}</p>
        </StyledTableViewMenuItem>
      )
    }
  });

  // Return an element
  return (
    <StyledTableViewMenu visible={visible}>
      <h4>표에서 보기</h4>
      <>{items}</>
    </StyledTableViewMenu>
  )
}