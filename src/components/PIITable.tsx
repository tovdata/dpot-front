// import { useRecoilValue } from 'recoil';
// // Components
// import { TableForm, TableFormHeader, TableHeader } from './common/Table';
// // State
// import { getPITableItemVisibleSelector } from '../models/State_h';
// // Styled
// import { StyledTable } from './common/Table';
// // Type
// import { AIContentData, AIItem, BasicItem, PIContentVisible, PIIContentData, PIIItem, TableDataProps } from '../models/Type';

// /**
//  * Check an item type for pii
//  * @param data object
//  * @returns result
//  */
// const isPIIItem = (data: BasicItem|PIIItem|AIItem): data is PIIItem => {
//   return (data as PIIItem).sensitive !== undefined;
// }
// /**
//  * Check an item type for pii content
//  * @param data object
//  * @returns result
//  */
// const isPIIContentData = (data: AIContentData|PIIContentData): data is PIIContentData => {
//   return (data as PIIContentData).essentialItems !== undefined;
// }

// /**
//  * Create the items
//  * @param data obejct
//  * @returns item elements
//  */
// const createItems = (data: BasicItem[]|PIIItem[]): JSX.Element[] => {
//   return data.map((item: BasicItem|PIIItem, index: number): JSX.Element => isPIIItem(item) ? <span className={item.sensitive ? 'item outline sensitive' : 'item outline'} key={index}>{item.name}</span> : <span className='item outline' key={index}>{item.name}</span>);
// }
// /**
//  * Create a tag
//  * @param data object
//  * @returns content contain tag
//  */
// const createTag = (data: BasicItem): JSX.Element => {
//   return <>{data.tag ? <span className='item inline mr'>{data.tag}</span> : ''}{data.name}</>;
// }
// // /**
// //  * Create a content
// //  * @param data content data
// //  * @param index data index
// //  * @returns created element
// //  */
// // const createContent = (data: AIContentData|PIIContentData, index: number): JSX.Element => {
// //   if (isPIIContentData(data)) {
// //     return <tr key={index}><td>{data.subject}</td><td>{createItems(data.purpose)}</td><td>{createItems(data.essentialItems)}</td><td>{createItems(data.selectionItems)}</td><td>{data.period}</td></tr>;
// //   } else {
// //     return <tr key={index}><td>{data.subject}</td><td>{createTag(data.purpose)}</td><td>{createItems(data.items)}</td><td>{data.period}</td><td>{data.department}</td><td>{data.charger}</td></tr>;
// //   }
// // }
// /**
//  * Create a content
//  * @param data content data
//  * @param index data index
//  * @returns created element
//  */
// const createContent = (data: PIIContentData, index: number, viewOptions: PIContentVisible): JSX.Element => {
//   return <tr key={index}><td hidden={!viewOptions.subject}>{data.subject}</td><td hidden={!viewOptions.purpose}>{createItems(data.purpose)}</td><td hidden={!viewOptions.essentialItems}>{createItems(data.essentialItems)}</td><td hidden={!viewOptions.selectionItems}>{createItems(data.selectionItems)}</td><td hidden={!viewOptions.period}>{data.period}</td></tr>;
// }

// const PIITableContent = ({ content }: any): JSX.Element => {
//   // Get a state
//   const viewOptions = useRecoilValue(getPITableItemVisibleSelector);

//   // Create the rows
//   const rows: JSX.Element[] = content.map((data: PIIContentData, index: number): JSX.Element => {
//     return (
//       <tr key={index}>
//       </tr>
//     )
//   });

//   // Return an element
//   return (
//     <tbody></tbody>
//   )
// }

// const PIITable = ({ table }: TableDataProps): JSX.Element => {
//   // Get a state
//   const viewOptions = useRecoilValue(getPITableItemVisibleSelector);

//   // Create a table content
//   const tableContent: JSX.Element = <tbody>{table.content.map((data: PIIContentData, index: number): JSX.Element => createContent(data, index, viewOptions))}</tbody>;
//   // Return an element
//   return (
//     <TableForm>
//       <TableFormHeader viewOptions={table.header} title={table.title} />
//       <StyledTable>
//         <TableHeader header={table.header} />
//         {tableContent}
//       </StyledTable>
//     </TableForm>
//   )
// }

const none = () => {}
export default none;