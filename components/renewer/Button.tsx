import dynamic from 'next/dynamic';
import { useCallback } from 'react';
// Component
import { StyledButton, StyledButtonForm } from '@/components/styled/Button';
// Icon
const DeleteOutlined = dynamic(() => import('@ant-design/icons').then((mod: any): any => mod.DeleteOutlined));
const LinkOutlined = dynamic(() => import('@ant-design/icons').then((mod: any): any => mod.LinkOutlined));
// Util
import { copyTextToClipboard } from 'utils/utils';
import { Popconfirm } from 'antd';

/** [Component] 아이콘 버튼 리스트 */
export const IconButtonList: React.FC<any> = ({ children }): JSX.Element => {
  return (
    <StyledButtonForm>{children}</StyledButtonForm>
  );
}
/** [Component] 테이블 행 내 링크 버튼 */
export const LinkButtonInTable: React.FC<any> = ({ url }): JSX.Element => {
  /** [Event handler] 링크 복사 */
  const onCopy = useCallback(() => copyTextToClipboard(url), [url]);
  // 컴포넌트 반환
  return (
    <StyledButton className='icon' onClick={onCopy}>
      <LinkOutlined />
    </StyledButton>
  );
}
/** [Component] 테이블 행 내 삭제 버튼 */
export const RemoveButtonInTable: React.FC<any> = ({ onConfirm }): JSX.Element => {
  return (
    <Popconfirm cancelText='아니오' placement='topRight' title='현재 행을 삭제하시겠습니까?' okText='예' onConfirm={onConfirm}>
      <StyledButton className='icon'>
        <DeleteOutlined />
      </StyledButton>
    </Popconfirm>
  );
}