import React from 'react';
// Component
import { Radio } from 'antd';

// Type
import { RadioGroupButtonStyle } from 'antd/lib/radio';

/** [Interface] Radio option */
interface RadioOption {
  label: string;
  value: boolean|number|string;
}
/** [Interface] Radio button props */
interface RadioButtonProps {
  buttonStyle?: RadioGroupButtonStyle;
  onChange: any;
}

/** [Component] 라디오 버튼 (Yes or No) */
export const YesOrNoRadioButton: React.FC<any> = ({ buttonStyle, onChange }: RadioButtonProps): JSX.Element => {
  // 라디오 버튼에 대한 옵션 생성
  const options: RadioOption[] = [{ label: '예', value: true }, {label: '아니오', value: false }];
  // 옵션에 대한 라디오 그룹 생성 및 반환
  return (<Radio.Group buttonStyle={buttonStyle} onChange={onChange} options={options} optionType='button' />);
}