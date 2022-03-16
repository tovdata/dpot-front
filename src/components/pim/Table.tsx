import { useState } from 'react';
import { useRecoilState } from 'recoil';

import styled, { css } from 'styled-components';
// Components
import Switch from '../pim/Switch';
// Color
import { GRAYSCALE100, GRAYSCALE200, GRAYSCALE400, GRAYSCALE800, GRAYSCALE_D, PRIMARY200, PRIMARY_D, WHITE } from '../../static/Color';
// Font
import { FS_BS, FS_BXS, FS_BXXS, FS_HXXS, FS_HXXXXS, LH_BS, LH_BXS, LH_BXXS, LH_HXXS, LH_HXXXXS } from '../../static/Font';
// Icon
import { IoEllipsisHorizontal } from 'react-icons/io5';
// State
import { updatePITableFieldVisibleSelector } from '../../models/State_h';
// Type
import { CommonProps } from '../../models/Type';

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
// Styled element ()
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

export const TableFormHeader = ({ title, type }: any): JSX.Element => {
  const options = [
    { id: 1, key: 'purpose', name: '처리 목적', visible: true },
    { id: 2, key: 'items', name: '처리 항목', visible: true },
    { id: 3, key: 'period', name: '처리 및 보유 기간', visible: true }
  ];

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
          {type ? <TableViewMenuForPI options={options} visible={openMenu} /> : <TableViewMenuForPI options={options} visible={openMenu} />}
        </StyledTableToolItem>
      </StyledTableTool>
    </StyledTableFormHeader>
  )
}

const TableViewMenuForPI = ({ options, visible }: any): JSX.Element => {
  // Get a state
  const [viewOptions, setViewOptions] = useRecoilState(updatePITableFieldVisibleSelector);

  // Create the items
  const items: JSX.Element[] = options.map((elem: any, index: number): JSX.Element => {
    // Create an event handler (onChange)
    const onChange = (e: any) => setViewOptions({...viewOptions, [elem.key]: e.target.checked});
    // Return an element
    return (
      <StyledTableViewMenuItem key={index}>
        <p>{elem.name}</p>
        <Switch id={`pi-view-option-${index}`} status={viewOptions[elem.key]} onChange={onChange} />
      </StyledTableViewMenuItem>
    )
  });
  // Return an element
  return (
    <StyledTableViewMenu visible={visible}>
      <h4>표에서 보기</h4>
      <>{items}</>
    </StyledTableViewMenu>
  )
}