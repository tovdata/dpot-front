import { useCallback, useMemo } from 'react';
import { useRecoilValue } from 'recoil';
// Component
import { Button, Modal, Table, Tag } from 'antd';
import { StyledTitleHeader } from '../common/Header';
import { StyledButtonForm } from '../styled/Button';
// State
import { sessionSelector } from '@/models/session';
// Util
import { transformToDate } from 'utils/utils';
import { useQuery } from 'react-query';

const KEY_USERS_REQUEST = 'plip-users-request';

/** [Component] 승인 요청 테이블 */
export const ApprovalRequestTable = (): JSX.Element => {
  // 섹션 조회
  const session = useRecoilValue(sessionSelector);

  // 테이블 헤더
  const headers: any[] = useMemo(() => [
    { dataIndex: 'userName', key: 'userName', title: '이름' },
    { dataIndex: 'email', key: 'email', title: '이메일 주소' },
    { dataIndex: 'reqAt', key: 'reqAt', title: '요청 일자', render: (value: number): string => transformToDate(value), sorter: (a: any, b: any): number => a.reqAt - b.reqAt },
    { dataIndex: 'id', key: 'id', title: '', render: (value: string) => (<ApprovalButtonForm onApproval={() => onOpenForApprovalModal(value)} onReject={() => onOpenForRejectModal(value)} />), width: '12%' }
  ], []);
  
  /** [Event handler] 승인 */
  const onApproval = useCallback((userId: string) => console.log('approval', session.companyId, userId), [session.companyId]);
  /** [Event handler] 거절 */
  const onReject = useCallback((userId: string) => console.log('reject', session.companyId, userId), [session.companyId]);
  /** [Event handler] 승인 모달 */
  const onOpenForApprovalModal = useCallback((userId: string) => Modal.confirm({
    cancelText: '취소',
    centered: true,
    content: (<>승인 시, 데이터 편집 권한이 부여됩니다.<br/>사내 개인정보 담당자가 아니라면 거절해주세요.</>),
    onOk: () => onApproval(userId),
    okText: '승인',
    title: '회사 가입을 승인하시겠습니까?'
  }), [onApproval]);
  /** [Event handler] 거절 모달 열기 */
  const onOpenForRejectModal = useCallback((userId: string) => Modal.confirm({
    cancelText: '취소',
    centered: true,
    onOk: () => onReject(userId),
    okText: '거절',
    title: '회사 가입을 거절하시겠습니까?'
  }), [onReject]);

  // 컴포넌트 반환
  return (
    <div style={{ marginTop: 46 }}>
      <StyledTitleHeader>회사 가입 승인 요청</StyledTitleHeader>
      <Table columns={headers} dataSource={[
        { userName: '최이사', email: 'choi@tovdata.com', reqAt: 1657590336, id: 'a' },
        { userName: '최이사', email: 'choi@tovdata.com', reqAt: 1657590336, id: 'a' },
        { userName: '최이사', email: 'choi@tovdata.com', reqAt: 1657590336, id: 'a' }
      ]}></Table>
    </div>
  );
}
/** [Component] 승인 결과 테이블 */
export const ApprovalResultTable = (): JSX.Element => {
  // 테이블 헤더
  const headers: any[] = useMemo(() => [
    { dataIndex: 'userName', key: 'userName', title: '이름' },
    { dataIndex: 'email', key: 'email', title: '이메일 주소' },
    { dataIndex: 'processAt', key: 'processAt', title: '승인/거절 일자', render: (value: number): string => transformToDate(value), sorter: (a: any, b: any): number => a.processAt - b.processAt },
    { dataIndex: 'status', key: 'status', title: '', render: (value: string) => (<StatusTag status={value} />), width: '12%' },
  ], []);

  // 컴포넌트 반환
  return (
    <div style={{ marginTop: 46 }}>
      <StyledTitleHeader>회사 가입 승인 결과</StyledTitleHeader>
      <Table columns={headers} dataSource={[
        { userName: '최이사', email: 'choi@tovdata.com', processAt: 1657590336, status: 'approval' },
        { userName: '최이사', email: 'choi@tovdata.com', processAt: 1657590336, status: 'approval' },
        { userName: '최이사', email: 'choi@tovdata.com', processAt: 1657590336, status: 'reject' }
      ]}></Table>
    </div>
  );
}

/** [Internal Component] 승인 버튼 폼 */
const ApprovalButtonForm: React.FC<any> = ({ onApproval, onReject }): JSX.Element => {
  return (
    <StyledButtonForm center>
      <Button size='small' type='primary' onClick={onApproval}>승인</Button>
      <Button size='small' type='default' onClick={onReject}>거절</Button>
    </StyledButtonForm>
  );
}
/** [Internal Component] 상태 태그 */
const StatusTag: React.FC<any> = ({ status }): JSX.Element => {
  return status === 'approval' ? (<Tag color='geekblue'>승인</Tag>) : (<Tag color='default'>거절</Tag>);
}