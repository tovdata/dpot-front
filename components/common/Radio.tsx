import React from 'react';
// Component
import { Radio } from 'antd';
// Style
import styled, { css } from 'styled-components';
// Type
import { RadioGroupButtonStyle } from 'antd/lib/radio';
import { SizeType } from 'antd/lib/config-provider/SizeContext';

/** [Styled component] Radio group */
const RadioGroup = styled(Radio.Group)<{fontSize: SizeType}>`
  ${(props: any) => {
    if (props.size) {
      if (props.size === 'small') {
        return css`
          .ant-radio-button-wrapper {
            font-size: 12px;
            padding: 0 12px;
          }
        `;
      }
    }
  }}
`;

/** [Interface] Radio option */
interface RadioOption {
  label: string;
  value: boolean|number|string;
}
/** [Interface] Radio button props */
interface RadioButtonProps {
  buttonStyle?: RadioGroupButtonStyle;
  disabled?: boolean;
  onChange: any;
  size?: SizeType;
  value: boolean|undefined;
}

/** [Component] 라디오 버튼 (Yes or No) */
export const YesOrNoRadioButton: React.FC<any> = ({ buttonStyle, disabled, onChange, size, value }: RadioButtonProps): JSX.Element => {
  // 라디오 버튼에 대한 옵션 생성
  const options: RadioOption[] = [{ label: '예', value: true }, {label: '아니오', value: false }];
  // 옵션에 대한 라디오 그룹 생성 및 반환
  return (<RadioGroup buttonStyle={buttonStyle} disabled={disabled} onChange={onChange} options={options} optionType='button' size={size} fontSize={size} value={value} />);
}