export interface PIIObject {
  name: string, // 업무명
  pPurpose: string[], // 처리목적
  required: string[], // 필수항목
  optional: string[], // 선택항목
  period: string //  처리 및 보유기간
};
export interface BorderSectionProps {
  width?: string
  children?: JSX.Element | JSX.Element[];
}
export interface PIIAddTableProps {
  information: PIIObject
}
export interface InputDivElementProps {
  data: string | string[]
}
export interface PIIAddInforamtion {
  title: string,
  description: string,
  items: string[]
}
export interface PIIAddSectionProps {
  information: PIIAddInforamtion
}
export interface ItemListComponentProps {
  items: string[],
  selectedItems: string[],
  setSelectedItems: (selectedItems: string[]) => void
}
export interface InputDivProps {
  type?: string,
  title?: string,
  afterSearchHandler: (text: string) => void; // search 이후 처리할 함수
}
export interface InputDropDownProps {
  items: string[]
}