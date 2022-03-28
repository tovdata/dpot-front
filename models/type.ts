/** Props */
export interface CommonElementProps {
  children?: JSX.Element | JSX.Element[];
}
export interface TableProcessItemProps {
  intrinsic: boolean;
  name: string;
}
/** Data Type */
export interface EditableDrawerContent {
  data?: any;
  title: string;
  type: string;
}