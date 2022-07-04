// Component
import { Popover } from 'antd';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { StyledInputGroup } from '../styled/Input';

/** [Interface] Properties for PLIPInputGroup */
interface PLIPInputGroupProps {
  children?: JSX.Element | JSX.Element[];
  label?: string;
  required?: boolean;
  style?: React.CSSProperties;
  tooltip?: string;
}

/** [Component] 입력 그룹 */
export const PLIPInputGroup: React.FC<PLIPInputGroupProps> = ({ children, label, required, style, tooltip }): JSX.Element => {
  return (
    <StyledInputGroup style={style}>
      {label ? (
        <div className='plip-header'>
          <label className='plip-title'>{label}</label>
          {tooltip ? (
            <Popover content={tooltip}>
              <span className='plip-tooltip'>
                <AiOutlineQuestionCircle />
              </span>
            </Popover>
          ) : (<></>)}
          {required ? (
            <label className='plip-required'>*</label>
          ) : (<></>)}
        </div>
      ) : (<></>)}
      <>{children}</>
    </StyledInputGroup>
  );
}