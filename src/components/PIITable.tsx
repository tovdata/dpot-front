import { useRecoilState } from 'recoil';
// Components
import { TableForm, TableFormHeader, TableHeader } from './Table';
// State
import { updateAITableItemVisibleSelector } from '../models/State_h';
// Styled
import { StyledTable } from './Table';
// Type
import { AIContentData, AIItem, BasicItem, PIIContentData, PIIItem, TableDataProps, TableHeaderData } from '../models/Type';

/**
 * Check an item type for pii
 * @param data object
 * @returns result
 */
const isPIIItem = (data: BasicItem|PIIItem|AIItem): data is PIIItem => {
  return (data as PIIItem).sensitive !== undefined;
}
/**
 * Check an item type for pii content
 * @param data object
 * @returns result
 */
const isPIIContentData = (data: AIContentData|PIIContentData): data is PIIContentData => {
  return (data as PIIContentData).essentialItems !== undefined;
}

/**
 * Create the items
 * @param data obejct
 * @returns item elements
 */
const createItems = (data: BasicItem[]|PIIItem[]): JSX.Element[] => {
  return data.map((item: BasicItem|PIIItem, index: number): JSX.Element => isPIIItem(item) ? <span className={item.sensitive ? 'item outline sensitive' : 'item outline'} key={index}>{item.name}</span> : <span className='item outline' key={index}>{item.name}</span>);
}
/**
 * Create a tag
 * @param data object
 * @returns content contain tag
 */
const createTag = (data: BasicItem): JSX.Element => {
  return <>{data.tag ? <span className='item inline mr'>{data.tag}</span> : ''}{data.name}</>;
}
/**
 * Create a content
 * @param data content data
 * @param index data index
 * @returns created element
 */
const createContent = (data: AIContentData|PIIContentData, index: number): JSX.Element => {
  if (isPIIContentData(data)) {
    return <tr key={index}><td>{data.subject}</td><td>{createItems(data.purpose)}</td><td>{createItems(data.essentialItems)}</td><td>{createItems(data.selectionItems)}</td><td>{data.period}</td></tr>;
  } else {
    return <tr key={index}><td>{data.subject}</td><td>{createTag(data.purpose)}</td><td>{createItems(data.items)}</td><td>{data.period}</td><td>{data.department}</td><td>{data.charger}</td></tr>;
  }
}

const PIITable = ({ table }: TableDataProps): JSX.Element => {
  // Create a table content
  const tableContent: JSX.Element = <tbody>{table.content.map((data: AIContentData|PIIContentData, index: number): JSX.Element => createContent(data, index))}</tbody>;
  // Return an element
  return (
    <TableForm>
      <TableFormHeader title={table.title} />
      <StyledTable>
        <TableHeader header={table.header} />
        {tableContent}
      </StyledTable>
    </TableForm>
  )
}

export default PIITable;