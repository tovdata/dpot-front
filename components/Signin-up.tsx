// Component
import Link from 'next/link';
import { Button, Checkbox, Col, Divider, Form, Input, Modal, Radio, Row, Steps } from 'antd';
import { TOVInputGroup } from './common/Input';
// Icon
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
// Styled
import styled from 'styled-components';
import { useCallback, useEffect, useState } from 'react';
import { findCompany } from '@/models/queries/api';
import { StyledInputGroup, StyledInputGroupHeader, StyledInputGroupRequired, StyledInputGroupSubject, StyeldSignupHeader, StyledSignupTitle, StyledCompanyListItem, StyledCompanyListTitle, StyledCompanyListItemName, StyledCompanyListItemDescription } from './styled/Signup';
import { StyledCompanyList } from './styled/Signup';


// 페이지 레이아웃 스타일
export const PageLayout = styled.div`
  align-items: center;
  display: flex;
  height: 100vh;
  justify-content: center;
  width: 100vw;
`;
export const StyledDescription = styled.p`
  color: #8C8C8C;
  font-size: 12px;
  font-weight: 400;
  lineHeight: 20px;
  margin-bottom: 0;
  margin-top: 8px;
`;
export const StyleLink = styled.a`
  color: #00000073;
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
  text-decoration: underline;
`;
export const StyleButton = styled(Button)`
  width: 100%;
`;

/** [Interface] Properties for step */
interface StepProps {
  data: any;
  onMoveStep: (next: boolean) => void;
}
/** [Interface] Properties for step to input */
interface InputStepProps extends StepProps {
  onChange: (value: any, category: string, property: string, subProperty?: string) => void;
  search?: boolean;
}
/** [Interface] Properties for step to select */
interface SelectStepProps extends StepProps {
  onSelect: (value: boolean) => void;
  search?: boolean;
}
interface FinishStepProps extends StepProps {
  onChange: (value: any, category: string, property: string, subProperty?: string) => void;
  onFinish: (isNew: boolean) => void;
  search?: boolean;
}

/** [Component] 회원가입 페이지 Header */
export const Header: React.FC<any> = ({ step, style }): JSX.Element => {
  return (
    <div style={{ margin: 'auto auto 80px auto', ...style }}>
      <Title title='회원가입' />
      <Steps current={step}>
        <Steps.Step />
        <Steps.Step />
        <Steps.Step />
        <Steps.Step />
      </Steps>
    </div>
  );
}
/** [Component] 회원가입 1단계 */
export const Step1: React.FC<InputStepProps> = ({ data, onChange, onMoveStep }): JSX.Element => {
  // 현재 스탭 정의
  const CURRENT_STEP: string = 'identity';
  // Form 객체 생성
  const [form] = Form.useForm();
  // 비밀번호 확인 함수
  const confirmPassword = ({ getFieldValue }: any) => ({ validator(_: any, value: string) {
    return !value || getFieldValue('password') === value ? Promise.resolve() : Promise.reject(new Error('비밀번호가 일치하지 않습니다.'));
  } });

  // 컴포넌트 반환
  return (
    <Form form={form} onFinish={onMoveStep} style={{ width: 320 }}>
      <TOVInputGroup label='이메일' required >
        <Form.Item name='email' rules={[{ required: true, message: '이메일을 입력해주세요.' }, { type: 'email', message: '이메일 형식을 확인해주세요.' }]}>
          <Input onChange={(e: any): void => onChange(e.target.value, CURRENT_STEP, 'email')} placeholder='nickname@company.com' value={data.email} />
        </Form.Item>
      </TOVInputGroup>
      <TOVInputGroup label='비밀번호' required>
        <Form.Item extra='영문, 숫자, 특수문자 조합 최소 8자리 이상' hasFeedback name='password' rules={[{ required: true, message: '비밀번호를 입력해주세요.' }, { pattern: new RegExp('^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$'), message: '비밀번호 형식이 올바르지 않습니다.' }]}>
          <Input.Password onChange={(e: any): void => onChange(e.target.value, CURRENT_STEP, 'password')} value={data.password}  />
        </Form.Item>
      </TOVInputGroup>
      <TOVInputGroup label='비밀번호 확인' required>
        <Form.Item dependencies={['password']} hasFeedback name='confirmPassword' rules={[{ required: true, message: '비밀번호를 확인해주세요.' }, confirmPassword, { pattern: new RegExp('^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$'), message: '' }]}>
          <Input.Password onChange={(e: any): void => onChange(e.target.value, CURRENT_STEP, 'confirmPassword')} value={data.confirmPassword} />
        </Form.Item>
      </TOVInputGroup>
      <Divider dashed />
      <Form.Item style={{ marginTop: 8 }}>
        <StyleButton htmlType='submit' type='primary'>다음</StyleButton>
        <StyledDescription>
          <>이미 회원이신가요?</>
          <Link href='/login'>
            <label style={{ cursor: 'pointer', fontSize: 12, fontWeight: '400', lineHeight: '20px', marginBottom: 0, marginLeft: 6, textDecoration: 'underline' }}>로그인</label>
          </Link>
        </StyledDescription>
      </Form.Item>
    </Form>
  );
}
/** [Component] 회원가입 2단계 */
export const Step2: React.FC<InputStepProps> = ({ data, onChange, onMoveStep }): JSX.Element => {
  // 현재 스탭 정의
  const CURRENT_STEP: string = 'user';
  // Form 객체 생성
  const [form] = Form.useForm();

  // 컴포넌트 반환
  return (
    <Form form={form} onFinish={onMoveStep} style={{ width: 320 }}>
      <TOVInputGroup label='이름' required>
        <Form.Item name='name' rules={[{ required: true, message: '이름을 입력해주세요.' }]}>
          <Input onChange={(e: any): void => onChange(e.target.value, CURRENT_STEP, 'name')} placeholder='김OO' value={data.name} />
        </Form.Item>
      </TOVInputGroup>
      <TOVInputGroup label='휴대전화번호' required>
        <Form.Item name='tel' rules={[{ required: true, message: '휴대전화번호를 입력해주세요.' }, { pattern: new RegExp('^01([0|1|6|7|8|9])-?([0-9]{4})-?([0-9]{4})$'), message: '휴대전화번호 형식이 올바르지 않습니다.' }]}>
          <Input onChange={(e: any): void => onChange(e.target.value, CURRENT_STEP, 'tel')} placeholder='010-0000-0000' value={data.tel} />
        </Form.Item>
      </TOVInputGroup>
      <Divider />
      <div style={{ marginBottom: 28 }}>
        <div style={{ alignItems: 'center', display: 'flex', marginBottom: 6 }}>
          <Checkbox onChange={(e: any): void => onChange(e.target.checked, CURRENT_STEP, 'esa1')} checked={data.esa1}>(필수) 서비스 이용약관 동의</Checkbox>
          <StyleLink style={{ marginLeft: 6 }}>약관 보기</StyleLink>
        </div>
        <div style={{ alignItems: 'center', display: 'flex', marginBottom: 6 }}>
          <Checkbox onChange={(e: any): void => onChange(e.target.checked, CURRENT_STEP, 'esa2')} checked={data.esa2}>(필수) 개인정보 수집 및 이용 동의</Checkbox>
          <StyleLink style={{ marginLeft: 6 }}>동의서 보기</StyleLink>
        </div>
        <div style={{ alignItems: 'center', display: 'flex' }}>
          <Checkbox onChange={(e: any): void => onChange(e.target.checked, CURRENT_STEP, 'ssa1')} checked={data.ssa1}>(선택) 마케팅 및 광고성 정보 수신 동의</Checkbox>
          <StyleLink style={{ marginLeft: 6 }}>동의서 보기</StyleLink>
        </div>
      </div>
      <Form.Item>
        <StyleButton htmlType='submit' type='primary'>다음</StyleButton>
      </Form.Item>
    </Form>
  );
}
/** [Component] 회원가입 3단계 */
export const Step3: React.FC<SelectStepProps> = ({ onMoveStep, onSelect, search }): JSX.Element => {
  return (
    <>
      <div style={{ alignItems: 'center', display: 'flex', width: 480 }}>
        <div style={{ flex: 1 }}>
          <CustomCard onClick={() => onSelect(true)} description='회사 구성원이 이미 서비스를 이용하고 있는 경우, 회사를 찾아보세요!' icon={<SearchOutlined />} select={search === undefined ? undefined : search ? true : false} title='회사 검색' />
        </div>
        <div style={{ flex: 1, marginLeft: 24 }}>
          <CustomCard onClick={() => onSelect(false)} description='디팟 서비스를 처음 이용하시는 경우, 회사를 먼저 생성해주세요!' icon={<PlusOutlined />} select={search === undefined ? undefined : search ? false : true} title='회사 생성' />
        </div>
      </div>
      <Form.Item style={{ margin: '34px auto 0 auto', width: 320 }}>
        <StyleButton onClick={() => onMoveStep(true)} type='primary'>다음</StyleButton>
      </Form.Item>
    </>
  );
}
/** [Component] 회원가입 4단계 */
export const Step4: React.FC<FinishStepProps> = ({ data, onChange, onMoveStep, onFinish, search }): JSX.Element => {
  // 현재 스탭 정의
  const CURRENT_STEP: string = 'company';
  // Form 객체 생성
  const [form] = Form.useForm();

  // 검색 모달 상태
  const [visible, setVisible] = useState<boolean>(false);
  // 회사 목록
  const [list, setList] = useState<any[]>([]);

  /** [Event handler] 검색 모달 닫기 */
  const onClose = useCallback(() => setVisible(false), []);
  /** [Event handler] 검색 모달 열기 */
  const onOpen = useCallback(() => setVisible(true), []);
  /** [Event handler] 검색 */
  const onSearch = async (value: string) => setList(await findCompany(value.trim()));
  /** [Event handler] 회사 선택 */
  const onSelect = useCallback((company: any) => {
    onChange(company.id, CURRENT_STEP, 'id');
    // Form 변경
    form.setFieldsValue({ ...form.getFieldValue, name: company.companyName, position: company.inCharge.position ? company.inCharge.position : '', manager: company.inCharge.name, email: company.inCharge.email });
    // 모달 닫기
    onClose();
  }, [data]);

  useEffect(() => console.log(data), [data]);


  // 컴포넌트 반환
  return (
    <>
      <Form form={form} onFinish={() => onFinish(!search)} style={{ width: 320 }}>
        <div>
          {search ? (
            <TOVInputGroup label='회사명' required>
              <Form.Item name='name' rules={[{ required: true, message: '회사명을 입력해주세요.' }]}>
                <Input autoComplete='off' onClick={onOpen} placeholder='회사명 검색' />
              </Form.Item>
            </TOVInputGroup>
          ) : (
            <>
              <TOVInputGroup label='회사명' required>
                <Form.Item name='name' rules={[{ required: true, message: '회사명을 입력해주세요.' }]}>
                  <Input onChange={(e: any): void => onChange(e.target.value, CURRENT_STEP, 'name')} placeholder='주식회사 토브데이터' />
                </Form.Item>
              </TOVInputGroup>
              <TOVInputGroup label='회사명(영문)' required>
                <Form.Item name='en' rules={[{ required: true, message: '회사명(영문)을 입력해주세요.' }, { pattern: new RegExp('^[a-zA-Z0-9]*$'), message: '영문만 입력해주세요.' }]}>
                  <Input onChange={(e: any): void => onChange(e.target.value, CURRENT_STEP, 'en')} placeholder='TOVDATA' value={data.en} />
                </Form.Item>
              </TOVInputGroup>
            </>
          )}
        </div>
        <TOVInputGroup label='개인정보 보호책임자' required tooltip='개인정보 보호책임자 설명'>
          <Row gutter={[8, 8]}>
            <Col span={5} style={{ alignItems: 'start', display: 'flex', marginTop: 5 }}>직책/직위</Col>
            <Col span={19}>
              <Form.Item name='position' rules={[{ required: true, message: '직책 또는 직위를 입력해주세요.' }]} style={{ marginBottom: 0 }}>
                <Input disabled={search ? true : false} onChange={(e: any): void => onChange(e.target.value, CURRENT_STEP, 'manager', 'position')} placeholder='예) CPO, 대표이사 등' value={data.manager.position} />
              </Form.Item>
            </Col>
            <Col span={5} style={{ alignItems: 'start', display: 'flex', marginTop: 5 }}>이름</Col>
            <Col span={19}>
              <Form.Item name='manager' rules={[{ required: true, message: '이름을 입력해주세요.' }]} style={{ marginBottom: 0 }}>
                <Input disabled={search ? true : false} onChange={(e: any): void => onChange(e.target.value, CURRENT_STEP, 'manager', 'name')} placeholder='김OO' value={data.manager.name} />
              </Form.Item>
            </Col>
            <Col span={5} style={{ alignItems: 'start', display: 'flex', marginTop: 5 }}>이메일</Col>
            <Col span={19}>
              <Form.Item name='email' rules={[{ required: true, message: '이메일을 입력해주세요.' }, { type: 'email', message: '' }]} style={{ marginBottom: 0 }}>
                <Input disabled={search ? true : false} onChange={(e: any): void => onChange(e.target.value, CURRENT_STEP, 'manager', 'email')} placeholder='nickname@company.com' value={data.manager.email} />
              </Form.Item>
            </Col>
          </Row>
        </TOVInputGroup>
        <Divider dashed />
        <Form.Item>
          {search ? (
            <p style={{ color: '#0050B3', fontSize: 14, fontWeight: '500', lineHeight: '22px', marginBottom: 24, textAlign: 'center' }}>위의 정보가 맞다면, 기존 가입자에게 승인을 요청하세요!</p>
          ) : (<></>)}
          <Button htmlType='submit' style={{ width: '100%' }} type='primary'>회원 가입 및 회사 생성</Button>
          <Button onClick={() => onMoveStep(false)} style={{ marginTop: 12, width: '100%' }} type='default'>이전</Button>
        </Form.Item>
      </Form>
      <Modal onCancel={onClose} title='회사 검색' visible={visible}>
        <Input.Search autoComplete='off' onSearch={onSearch} />
        <Divider dashed />
        <StyledCompanyListTitle>검색 결과 ({list.length}개)</StyledCompanyListTitle>
        <StyledCompanyList>
          {list.map((item: any): JSX.Element => (
            <StyledCompanyListItem key={item.id} onClick={() => onSelect(item)}>
              <StyledCompanyListItemName>{item.companyName}</StyledCompanyListItemName>
              <StyledCompanyListItemDescription>개인정보보호 책임자: {item.inCharge ? item.inCharge.name : ''} ({item.inCharge ? item.inCharge.email : ''})</StyledCompanyListItemDescription>
            </StyledCompanyListItem>
          ))}
        </StyledCompanyList>
      </Modal>
    </>
  );
}
/** [Component] 회원가입 제목 */
export const Title: React.FC<any> = ({ title }): JSX.Element => {
  return (
    <StyeldSignupHeader>
      <StyledSignupTitle>{title}</StyledSignupTitle>
    </StyeldSignupHeader>
  );
}
/** [Component] 회원가입에서 사용할 Input group */
export const InputGroup: React.FC<any> = ({ children, label, required }): JSX.Element => {
  return (
    <StyledInputGroup>
      <StyledInputGroupHeader>
        <StyledInputGroupSubject>{label}</StyledInputGroupSubject>
        {required ? (
          <StyledInputGroupRequired>*</StyledInputGroupRequired>
        ) : (<></>)}
      </StyledInputGroupHeader>
      <>{children}</>
    </StyledInputGroup>
  );
}
/** [Internal Component] 회원가입에서 회사 생성 및 검색을 선택하기 위한 Card */
const CustomCard: React.FC<any> = ({ description, icon, onClick, select, title }): JSX.Element => {
  return (
    <div onClick={onClick} style={{ borderColor: select ? '#1890ff' : '#FAFAFA', borderStyle: 'solid', borderWidth: '1px', borderRadius: 8, boxShadow: '0px 2px 8px rgba(0, 68, 204, 0.15)', cursor: 'pointer', padding: '48px 32px' }}>
      <span style={{ marginBottom: 16 }}>{icon}</span>
      <h4 style={{ fontSize: 20, fontWeight: '600', lineHeight: '28px', marginBottom: 8 }}>{title}</h4>
      <p style={{ fontSize: 16, fontWeight: '400', lineHeight: '24px', margin: 0 }}>{description}</p>
    </div>
  );
}