/** Props */
export interface CommonElementProps {
  children?: JSX.Element | JSX.Element[];
}
/** Data Type */
export interface TableHeaderData {
  description?: string;
  display: string;
  name: string;
  required: boolean;
}
export interface TableHeadersData {
  [key: string]: TableHeaderData;
}
export interface EditableDrawerContent {
  data?: any;
  title: string;
  type: string;
}

/** Data format (for processing item) */
export interface ProcessingItemDF {
  intrinsic: boolean;
  name: string;
}
/** Data format (for personal information table columns) */
export interface PersonalInfoTableDF {
  essentialItems: ProcessingItemDF[];
  period: string[];
  purpose: string[];
  selectionItems: ProcessingItemDF[];
  subject: string;
}
/** Data format (for personal information table columns / extend) */
export interface ExtendPersonalInfoTableDF extends PersonalInfoTableDF {
  key: string;
}
/** Data format (for false name information table columns) */
export interface DF_FalseNameInfoTableDF {

}