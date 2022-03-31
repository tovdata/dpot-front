/** Props */
export interface CommonElementProps {
  children?: JSX.Element | JSX.Element[];
}
/** Data Type */
export interface TableHeaderData {
  description?: string;
  display: string;
  name: string;
}
export interface TableHeadersData {
  [key: string]: TableHeaderData;
}
export interface EditableDrawerContent {
  data?: any;
  title: string;
  type: string;
}
export interface TableProcessItemData {
  intrinsic: boolean;
  name: string;
}