/** Props */
export interface CommonElementProps {
  children?: JSX.Element | JSX.Element[];
}
/** [Interface] Table header */
export interface TableHeaderData {
  description?: string;
  display: string;
  name: string;
  required: boolean;
  uuid: string;
}
/** [Interface] Table headers */
export interface TableHeadersData {
  [key: string]: TableHeaderData;
}
/** [Interface] Processing item */
export interface ProcessingItemDF {
  intrinsic: boolean;
  name: string;
}
/** [Interface] Select options */
export interface SelectOptionsByColumn {
  [key: string]: string[];
}