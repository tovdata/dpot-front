import Router from 'next/router';
import { useCallback, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
// Component
import { Button, Form, Input, Modal } from 'antd';
import { StyledJoinCompanyTypeCard, StyledPageBackground, StyledPageLayout } from '../styled/JoinCompany';
import { StyledChoiceCompanyForm, StyledCompanyList, StyledCompanyItem } from '../styled/JoinCompany';
import { PLIPInputGroup } from './Input';
import { errorNotification } from '../common/Notification';
import { PLIP401Page } from './Page';
// Icon
import { PlusCircleOutlined, SearchOutlined } from '@ant-design/icons';
// State
import { companySelector, userSelector } from '@/models/session';
// Query
import { createService, findCompanies, registerUser, setCompany } from '@/models/queries/apis/company';
import { Company } from '@/models/queries/type';

/** [Component] 초기 회사 참여 (생성 또는 참여) */
const JoinCompany: React.FC<any> = (): JSX.Element => {
  // 회사 정보 조회
  const company = useRecoilValue(companySelector);
  // 회사 검색 여부
  const [search, setSearch] = useState<boolean|undefined>(undefined);
  /** [Event handler] 이전 단계로 이동 */
  const onBack = () => setSearch(undefined);
  /** [Event handler] 회사 참여를 위한 유형 선택 */
  const onChoice = (search: boolean) => setSearch(search);

  return (
    <>
      {company && company.id !== '' ? (
        <PLIP401Page />
      ) : (
        <StyledPageBackground>
          {search === undefined ? (
            <JoinCompanyType onChoice={onChoice} />
          ) : (
            <ChoiceCompanyForm onBack={onBack} search={search} />
          )}
        </StyledPageBackground>
      )}
    </>
  );
}

/** [Internal Component] 초기 회사에 참여하기 위한 유형 선택 (생성 or 검색) */
const JoinCompanyType: React.FC<any> = ({ onChoice }): JSX.Element => {
  // 사용자 정보 조회
  const user = useRecoilValue(userSelector);

  // 컴포넌트 반환
  return (
    <StyledPageLayout>
      <h2 className='title'>{user.name} 님 안녕하세요 😊</h2>
      <JoinCompanyTypeCard content='회사 구성원이 이미 서비스를 이용하고 있는 경우, 검색을 통해 회사를 찾아보세요!' icon={<SearchOutlined />} onChoice={() => onChoice(true)} subject='회사 찾기' />
      <JoinCompanyTypeCard content='Plip을 처음 이용하시는 경우, 회사를 먼저 생성해주세요!' icon={<PlusCircleOutlined />} onChoice={() => onChoice(false)} subject='회사 생성하기' />
    </StyledPageLayout>
  );
}
/** [Internal Component] 회사 참여를 위한 유형 카드 */
const JoinCompanyTypeCard: React.FC<any> = ({ content, icon, onChoice, subject }): JSX.Element => {
  return (
    <StyledJoinCompanyTypeCard onClick={onChoice}>
      <div className='header'>
        <i>{icon}</i>
        <h4>{subject}</h4>
      </div>
      <p className='content'>{content}</p>
    </StyledJoinCompanyTypeCard>
  );
}
/** [Intetnal Component] 회사 선택 폼 */
const ChoiceCompanyForm: React.FC<any> = ({ onBack, search }): JSX.Element => {
  // 폼(Form) 객체
  const [form] = Form.useForm();
  // 검색 모달 상태
  const [visible, setVisible] = useState<boolean>(false);
  // 회사 정보
  const [companyId, setCompanyId] = useState<string>('');

  // 사용자 정보 조회
  const user = useRecoilValue(userSelector);
  // 회사 정보 저장을 위한 setter
  const setCompany = useSetRecoilState(companySelector);

  /** [Event handler] 검색 모달 열기 */
  const onClose = useCallback(() => setVisible(false), []);
  /** [Event handler] 회사 선택 */
  const onChoice = useCallback((value: any) => {
    // 폼 데이터 설정
    form.setFieldsValue({ name: value.companyName, position: value.manager.position, manager: value.manager.name, email: value.manager.email });
    // 회사 정보 변경
    setCompanyId(value.id);
    // 검색 모달 종료
    setVisible(false);
  }, []);
  /** [Event handler] Submit */
  const onFinish = useCallback(async () => {
    if (search) {
      createFinishModal('가입 승인을 요청하였습니다.', '승인이 완료되면, 알려주신 이메일로 연락드릴게요 👍');
    } else {
      // 폼 데이터 가져오기
      const formData: any = form.getFieldsValue();
      // 생성할 회사 정보 정의
      const company: Company = {
        companyName: formData.name,
        manager: {
          position: formData.position,
          name: formData.manager,
          email: formData.email
        }
      };
      // 회사 생성 API 호출
      const response = await createCompany(company);
      if (response.result) {
        // 회사에 사용자를 등록
        if (await joinCompany(response.data.id, user.id)) {
          // 서비스 생성
          if (await createServiceInCompany(response.data.id, company.companyName)) {
            setCompany({ id: response.data.id, name: company.companyName, manager: company.manager });
            return createFinishModal('회사가 생성되었습니다 !', '플립(Plip)과 함께 개인정보를 관리해보아요 :)', '시작하기');
          }
        }
      }
      // 에러 처리
      errorNotification('회사 생성 과정에서 문제가 발생하였습니다. 플립(Plip)으로 문의주세요.');
    }
  }, [companyId, search]);
  /** [Event handler] 검색 모달 열기 */
  const onOpen = useCallback(() => setVisible(true), []);

  // 컴포넌트 반환
  return (
    <StyledChoiceCompanyForm>
      <h3>회사 {search ? '찾기' : '생성'}</h3>
      <Form form={form} labelCol={{ span: 5 }} onFinish={onFinish}>
        <PLIPInputGroup label='회사명' required>
          <Form.Item name='name' rules={[{ required: true, message: '회사명을 입력해주세요.' }]}>
            {search ? (
              <Input.Search autoComplete='off' onClick={onOpen} onSearch={onOpen} placeholder='회사명 검색' readOnly />
            ) : (
              <Input />
            )}
          </Form.Item>
        </PLIPInputGroup>
        <PLIPInputGroup label='개인정보 보호책임자' required tooltip='개인정보 보호책임자 설명'>
          <Form.Item colon={false} label='직책/직위' labelAlign='left' name='position' required={false} rules={[{ required: true, message: '직책 또는 직위를 입력해주세요.' }]} style={{ marginBottom: 8 }} >
            <Input disabled={search} />
          </Form.Item>
          <Form.Item colon={false} label='이름' labelAlign='left' name='manager' required={false} rules={[{ required: true, message: '이름을 입력해주세요.' }]} style={{ marginBottom: 8 }}>
            <Input disabled={search} />
          </Form.Item>
          <Form.Item colon={false} label='이메일' labelAlign='left' name='email' required={false} rules={[{ required: true, message: '이메일을 입력해주세요.' }, { type: 'email', message: '이메일 형식을 확인해주세요.' }]}>
            <Input disabled={search} />
          </Form.Item>
        </PLIPInputGroup>
        {search ? (
          <p className='info'>위의 정보가 맞다면, 기존 가입자에게 승인을 요청하세요!</p>
        ) : (<></>)}
        <div className='footer'>
          <Button htmlType='submit' type='primary'>{search ? '가입 승인 요청' : '회사 생성'}</Button>
          <Button onClick={onBack} type='default'>이전</Button>
        </div>
      </Form>
      <SearchCompanyModal onChoice={onChoice} onClose={onClose} visible={visible} />
    </StyledChoiceCompanyForm>
  );
}
/** [Internal Component] 회사 검색 모달 */
const SearchCompanyModal: React.FC<any> = ({ onChoice, onClose, visible }): JSX.Element => {
  // 회사 목록
  const [list, setList] = useState<any[]>([]);

  /** [Event handler] 회사 검색 */
  const onSearch = useCallback(async (value: string) => setList(await findCompanies(value.trim())), []);

  // 컴포넌트 반환
  return (
    <Modal footer={false} onCancel={onClose} title='회사 검색' visible={visible}>
      <Input.Search autoComplete='off' onSearch={onSearch} placeholder='회사명 검색' />
      <StyledCompanyList>
        <h5 className='subject'>검색 결과 ({list.length})</h5>
        {list.length > 0 ? (
          list.map((item: any): JSX.Element => (
            <StyledCompanyItem key={item.id} onClick={() => onChoice(item)}>
              <h5>{item.companyName}</h5>
              <p>개인정보보호 책임자: {item.manager ? item.manager.name : ''} ({item.manager ? item.manager.email : ''})</p>
            </StyledCompanyItem>
          ))
        ) : (
          <p className='empty'>검색된 회사가 없습니다.</p>
        )}
      </StyledCompanyList>
    </Modal>
  );
}

/**
 * [Internal Function] 가입 확인 및 승인 모달 생성
 * @param title 모달 제목
 * @param content 모달 내용
 * @param okText 버튼 내용
 * @returns 모달
 */
const createFinishModal = (title: string, content: string, okText?: string) => Modal.success({
  centered: true,
  content,
  okText: okText ? okText : '확인',
  onOk: () => Router.push('/company/services'),
  title,
});
/**
 * [Internal Function] 회사 생성 함수
 * @param company 회사 데이터
 * @returns 생성 결과
 */
const createCompany = async (company: any): Promise<any> => {
  return await setCompany(company);
}
/**
 * [Internal Function] 서비스 생성 함수
 * @param companyName 회사 이름
 * @returns 생성 결과
 */
const createServiceInCompany = async (companyId: string, companyName: string): Promise<boolean> => {
  return (await createService(companyId, { serviceName: companyName, types: ['default'] })).result;
};
/**
 * [Internal Function] 사용자를 회사에 등록하는 함수
 * @param companyId 회사 ID
 * @param userId 사용자 ID
 * @returns 처리 결과
 */
const joinCompany = async (companyId: string, userId: string): Promise<boolean> => {
  return await registerUser(companyId, userId, 4);
};

export default JoinCompany;