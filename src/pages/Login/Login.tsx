import { useState } from 'react';
import { Form, Input, notification } from 'antd';
import { useForm } from 'antd/lib/form/Form';

import { OtpInputModal } from '../../components/OtpInputModal';

import * as S from './style';
import { logo, logoB } from '../../assets/images';

type SubmitType = {
  email: string;
  password: string;
};

export function Login() {
  const [open, setOpen] = useState(false);

  const [form] = useForm<SubmitType>();

  const emailReg =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

  const handleCancel = () => {
    setOpen(false);
  };

  const handleSubmit = (values: SubmitType) => {
    if (!values.email?.trim().length) {
      return notification.error({ message: '이메일을 입력해주세요' });
    }
    if (!emailReg.test(values.email)) {
      return notification.error({ message: '이메일 형식을 맞춰주세요' });
    }
    if (!values.password?.trim().length) {
      return notification.error({ message: '비밀번호를 입력해주세요' });
    }
    setOpen(true);
  };

  const handleFinish = (otp: string[]) => {
    const userInfo: SubmitType = {
      email: form.getFieldValue('email'),
      password: form.getFieldValue('password'),
    };
    const code = otp.concat().join().replaceAll(',', '');

    // TODO: 로그인 로직 구현
    localStorage.setItem('accessToken', 'sdfjklasdjfkldsjf;aklsdjfkal');
    return (window.location.href = '/');
  };

  return (
    <S.Container>
      <OtpInputModal
        loading={false}
        open={open}
        handleFinish={handleFinish}
        onCancel={handleCancel}
      />
      <S.Wrapper>
        <S.FormWrap>
          <Form layout="vertical" onFinish={handleSubmit} form={form}>
            <S.ImageWrap>
              <S.Image src={logo} alt="logo" />
            </S.ImageWrap>
            <Form.Item label="이메일" name="email">
              <Input />
            </Form.Item>
            <Form.Item label="비밀번호" name="password">
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <S.Button type="submit">로그인</S.Button>
            </Form.Item>
          </Form>
        </S.FormWrap>
      </S.Wrapper>
    </S.Container>
  );
}
