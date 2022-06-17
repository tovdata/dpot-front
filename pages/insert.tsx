import type { NextPage } from 'next';
import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
// State
import { companySelector, serviceSelector, userSelector } from '@/models/session';

/** 웹 스토리지 테스트 페이지 (세션 테스트) */
const Company: NextPage = () => {
  const [company, setCompany] = useRecoilState(companySelector);
  const [service, setService] = useRecoilState(serviceSelector);
  const [user, setUser] = useRecoilState(userSelector);

  /** [Event handler] 서비스 정보를 로컬 스토리지에 저장 */
  const onSaveForService = useCallback(() => setService({ id: 'b7dc6570-4be9-4710-85c1-4c3788fcbd12', name: '플립' }), []);
  /** [Event handler] 로컬 스토리지에서 서비스 정보 초기화 */
  const onClearForService = useCallback(() => setService({ id: '', name: '' }), []);
  /** [Event handler] 회사 정보를 로컬 스토리지에 저장 */
  const onSaveForCompany = useCallback(() => setCompany({ id: '0', name: '토브데이터', en: 'TOVDATA', manager: { name: '박효진', position: 'CEO', email: 'contact@tovdata.com' } }), []);
  /** [Event handler] 로컬 스토리지에서 회사 정보 초기화 */
  const onClearForCompany = useCallback(() => setCompany({ id: '', name: '', en: '', manager: { name: '', position: '', email: '' } }), []);
  /** [Event handler] 사용자 정보를 로컬 스토리지에 저장 */
  const onSaveForUser = useCallback(() => setUser({ id: '4', name: '홍길동' }), []);
  /** [Event handler] 로컬 스토리지에서 사용자 정보 초기화 */
  const onClearForUser = useCallback(() => setUser({ id: '', name: '' }), []);

  return (
    <div style={{ padding: '48px 64px' }}>
      <h2>Session Test</h2>
      <div style={{ marginBottom: 16 }}>
        <button onClick={onSaveForCompany} style={{ marginRight: 8 }}>회사 정보 저장</button>
        <button onClick={onClearForCompany}>회사 정보 초기화</button>
      </div>
      <div style={{ marginBottom: 16 }}>
        <button onClick={onSaveForService} style={{ marginRight: 8 }}>서비스 정보 저장</button>
        <button onClick={onClearForService}>서비스 정보 초기화</button>
      </div>
      <div style={{ marginBottom: 16 }}>
        <button onClick={onSaveForUser} style={{ marginRight: 8 }}>사용자 정보 저장</button>
        <button onClick={onClearForUser}>사용자 정보 초기화</button>
      </div>
      <div style={{ marginBottom: 16 }}>
        <button onClick={() => { onSaveForCompany(); onSaveForService(); onSaveForUser(); }} style={{ marginRight: 8 }}>모든 정보 저장</button>
        <button onClick={() => { onClearForCompany(); onClearForService(); onClearForUser(); }}>모든 정보 초기화</button>
      </div>
    </div>
  );
}

export default Company;