// Component
import { Popover } from 'antd';
// Icon
import { AiOutlineQuestionCircle } from 'react-icons/ai';

/** [Interface] Properties for TOVInputGroup */
interface TOVInputGroupProps {
  children?: JSX.Element | JSX.Element[];
  label?: string;
  required?: boolean;
  style?: React.CSSProperties;
  tooltip?: string;
}

/** [Component] 기본적인 Input group */
export const TOVInputGroup: React.FC<TOVInputGroupProps> = ({ children, label, required, style, tooltip }): JSX.Element => {
  return (
    <div style={{ marginBottom: 16, ...style }}>
      {label ? (
        <div style={{ alignItems: 'center', display: 'flex', fontSize: 14, fontWeight: '600', lineHeight: '22px', marginBottom: 6, userSelect: 'none' }}>
          <label style={{ color: '#000000', margin: 0 }}>{label}</label>
          {tooltip ? (
            <Popover content={tooltip}>
              <span style={{ alignItems: 'center', cursor: 'pointer', display: 'flex', marginLeft: 6 }}>
                <AiOutlineQuestionCircle />
              </span>
            </Popover>
          ) : (<></>)}
          {required ? (
            <label style={{ color: '#FF4D4F', marginLeft: 6 }}>*</label>
          ) : (<></>)}
        </div>
      ) : (<></>)}
      {children}
    </div>
  );
}