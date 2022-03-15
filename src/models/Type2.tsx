export interface PIIObject {
  name: string, // 업무명
  pPurpose: string[], // 처리목적
  required: string[], // 필수항목
  optional: string[], // 선택항목
  period: string //  처리 및 보유기간
};

export interface PIIAddTableProps {
  information: PIIObject
}
export interface InputDivElementProps {
  data: string | string[]
}