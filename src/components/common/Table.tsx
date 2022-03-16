// import { useState } from 'react';
// import { useRecoilState, useRecoilValue } from 'recoil';

// import styled, { css } from 'styled-components';
// // Component
// import ViewSwitch from './ViewSwitch';
// // Color
// import { GRAYSCALE200, GRAYSCALE400, GRAYSCALE800, GRAYSCALE_D, PRIMARY200, PRIMARY600, PRIMARY_D, RED100, RED_D, WHITE, WHITE_B } from '../../static/Color';
// // Font
// import { FS_BS, FS_BXS, FS_BXXS, FS_HXXS, FS_HXXXXS, LH_BS, LH_BXS, LH_BXXS, LH_HXXS, LH_HXXXXS } from '../../static/Font';
// // Icon
// import { IoEllipsisHorizontal } from 'react-icons/io5';
// // State
// import { getPITableItemVisibleSelector, updatePITableItemVisibleSelector } from '../../models/State_h';
// // Type
// import { ContainerProps, TableFormHeaderProps, TableHeaderData, TableHeaderProps } from '../../models/Type';

// // Create a styled element (TableForm)
// const StyledTableForm = styled.div`
//   position: relative;
//   margin-bottom: 5.625rem;
// `;
// // Create a styled element (TableFormHeader)
// const StyledTableFormHeader = styled.div`
//   align-items: center;
//   display: flex;
//   justify-content: space-between;
//   margin-bottom: 1rem;
//   padding: 0.625rem;
//   user-select: none;
//   h2 {
//     color: ${GRAYSCALE_D};
//     font-size: ${FS_HXXS};
//     font-weight: 600;
//     line-height: ${LH_HXXS};
//     margin: 0;
//   }
// `;
// // Create a styled element (TableTools)
// const StyledTableTools = styled.div`
//   align-items: center;
//   display: flex;
//   justify-content: end;
//   position: relative;
// `;
// // Create a styled element (TableToolItem)
// const StyledTableToolItem = styled.div`
//   position: relative;
//   .icon {
//     cursor: pointer;
//   }
// `;
// const StyledTableViewMenu = styled.div<{visible: boolean}>`
//   background-color: ${WHITE};
//   border-radius: 0.25rem;
//   box-shadow: 1px 1px 6px rgba(195, 200, 229, 0.5);
//   display: none;
//   padding: 0.75rem 1rem;
//   position: absolute;
//   right: 0;
//   top: 1.375rem;
//   width: 180px;
//   z-index: 5;
//   h4 {
//     font-size: ${FS_BXXS};
//     font-weight: 600;
//     line-height: ${LH_BXXS};
//     margin: 0 0 0.375rem 0;
//   }
//   ${(props: any) => props.visible && css`
//     display: block;
//   `}
// `;
// const StyledTableViewMenuItem = styled.div`
//   align-items: center;
//   display: flex;
//   justify-content: space-between;
//   padding: 0.125rem 0;
//   position: relative;
//   p {
//     color: ${GRAYSCALE800};
//     font-size: ${FS_BXS};
//     font-weight: 500;
//     line-height: ${LH_BXS};
//     margin: 0;
//   }
// `;
// // Create a styled element (Table)
// export const StyledTable = styled.table`
//   border-collapse: collapse;
//   position: relative;
//   width: 100%;
//   td {
//     border-bottom: 1px solid ${GRAYSCALE200};
//     color: ${GRAYSCALE_D};
//     cursor: pointer;
//     font-size: ${FS_BS};
//     line-height: ${LH_BS};
//     margin: 0;
//     padding: 0.75rem 0;
//     text-align: center;
//     user-select: none;
//   }
//   th {
//     background-color: #F6F6F6;
//     border: none;
//     border-bottom: 1px solid ${GRAYSCALE400};
//     color: ${GRAYSCALE800};
//     font-size: ${FS_HXXXXS};
//     line-height: ${LH_HXXXXS};
//     margin: 0;
//     padding: 0.75rem 0;
//     user-select: none;
//     &:first-child {
//       border-top-left-radius: 0.5rem;
//     }
//     &:last-child {
//       border-top-right-radius: 0.5rem;
//     }
//   }
//   tr {
//     margin: 0;
//     padding: 0;
//   }
//   .item {
//     border-radius: 0.75rem;
//     border-none;
//     font-size: ${FS_BXS};
//     font-weight: 500;
//     line-height: ${LH_BXS};
//     margin-right: 0.375rem;
//     padding: 0.25rem 0.625rem;
//     &:last-child {
//       margin-right: 0;
//     }
//   }
//   .item.mr {
//     margin-right: 0.375rem;
//   }
//   .item.outline {
//     border: 1px solid ${PRIMARY200};
//     color: ${PRIMARY600};
//   }
//   .item.outline.sensitive {
//     border-color: ${RED100};
//     color: ${RED_D};
//   }
//   .item.inline {
//     background-color: ${PRIMARY_D};
//     color: ${WHITE_B};
//   }
// `;

// /**
//  * Create an element (for table form)
//  * @param children child elements
//  * @returns created element
//  */
// export const TableForm = ({ children }: ContainerProps): JSX.Element => {
//   return (
//     <StyledTableForm>{children}</StyledTableForm>
//   )
// }
// const TableViewMenu = ({ visible, options }: any): JSX.Element => {
//   console.log(options);
//   // Create the view menu item
//   const items: JSX.Element[] = options ? options.map((item: any, index: number): JSX.Element => <StyledTableViewMenuItem key={index}><p>{ item.name }</p><ViewSwitch id={'pi-view-option-'+index} name={item.name}></ViewSwitch></StyledTableViewMenuItem>) : [];
//   // Return an element
//   return (
//     <StyledTableViewMenu visible={visible}>
//       <h4>표에서 보기</h4>
//       <>{items}</>
//     </StyledTableViewMenu>
//   )
// }

// /**
//  * Create an element (for table form header)
//  * @param title table form title 
//  * @param options
//  * @returns created element
//  */
// export const TableFormHeader = ({ title, viewOptions }: TableFormHeaderProps): JSX.Element => {
//   // Set a local state
//   const [openMenu, setOpenMenu] = useState<boolean>(false);
//   // Create an event handler (onClick)
//   const onClick = () => setOpenMenu(!openMenu);

//   // Return an element
//   return (
//     <StyledTableFormHeader>
//       <h2>{title}</h2>
//       <StyledTableTools>
//         <StyledTableToolItem>
//           <a className='icon' onClick={onClick}><IoEllipsisHorizontal /></a>
//           <TableViewMenu visible={openMenu} options={options} />
//         </StyledTableToolItem>
//       </StyledTableTools>
//     </StyledTableFormHeader>
//   )
// }
// /**
//  * Create an element (for table header)
//  * @param param0 table header
//  * @returns created element
//  */
// export const TableHeader = ({ header }: TableHeaderProps): JSX.Element => {
//   // Get a state
//   const visible = useRecoilValue(getPITableItemVisibleSelector);
  
//   return (
//     <thead>
//       <tr>{header.map((header: TableHeaderData, index: number): JSX.Element => <th hidden={visible[header.name]} key={index}>{header.name}</th>)}</tr>
//     </thead>
//   )
// }

// export const TableBody = ({})

const none = () => {}
export default none;