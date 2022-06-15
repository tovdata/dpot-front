import Router from 'next/router';
import type { NextPage } from 'next'
import { useState } from 'react';
// Component
import { Modal } from 'antd';
import { Header, PageLayout, Step1, Step2, Step3, Step4 } from '../components/Signin-up';
import { warningNotification } from '../components/common/Notification';
import { setCompany } from '@/models/queries/api';

/** [Component] 회원가입 페이지 */
const Signup: NextPage = () => {
  const [step, setStep] = useState<number>(0);
  const [search, setSearch] = useState<boolean|undefined>(undefined);
  const [data, setData] = useState<any>({
    identity: {
      email: '',
      password: '',
      confirmPassword: ''
    },
    user: {
      name: '',
      tel: '',
      esa1: false,
      esa2: false,
      ssa1: false
    },
    company: {
      id: '',
      name: '',
      en: undefined,
      charger: {
        position: '',
        name: '',
        email: ''
      }
    }
  });

  const onChange = (value: any, category: string, property: string, subProperty?: string) => {
    subProperty ? setData({ ...data, [category]: { ...data[category], [property]: { ...data[category][property], [subProperty]: value } } }) : setData({ ...data, [category]: { ...data[category], [property]: value } }) ;
  }
  const onSelect = (value: boolean) => { console.log('sr', value); setSearch(value) };
  const onMoveStep = (next: boolean = true) => {
    if (next) {
      if (step + 1 === 2) {
        if (!data.user.esa1) {
          warningNotification('서비스 이용약관 동의는 필수입니다.');
        } else if (!data.user.esa2) {
          warningNotification('개인정보 수집 및 이용 동의는 필수입니다.');
        } else {
          setStep(step + 1);
        }
      } else if (step + 1 < 4) {
        setStep(step + 1);
      } else {

        // Modal.success({
        //   title: search ? '가입 승인을 요청하였습니다.' : '회사가 생성되었습니다 !',
        //   content: search ? '승인이 완료되면, 알려주신 이메일로 연락드릴게요 :)' : '디팟과 함께 개인정보를 관리해보아요 :)',
        //   okText: search ? '확인' : '시작하기',
        //   onOk: () => Router.push('/'),
        //   centered: true
        // });
      }
    } else {
      step - 1 < 0 ? undefined : setStep(step - 1);
    }
  }
  //
  const onFinish = async (isNew: boolean) => {
    if (isNew) {
      data.company.id = await setCompany(data.company);
    }
  }

  return (
    <PageLayout>
      <div>
        <Header step={step} style={{ width: 320 }} />
        {step === 0 ? (
          <Step1 data={data.identity} onChange={onChange} onMoveStep={onMoveStep} />
        ) : step === 1 ? (
          <Step2 data={data.user} onChange={onChange} onMoveStep={onMoveStep} />
        ) : step === 2 ? (
          <Step3 data={data} onMoveStep={onMoveStep} onSelect={onSelect} search={search} />
        ) : step === 3 ? (
          <Step4 data={data.company} onChange={onChange} onMoveStep={onMoveStep} onFinish={onFinish} search={search} />
        ) : (<></>)}
      </div>
    </PageLayout>
  );
}

export default Signup;
