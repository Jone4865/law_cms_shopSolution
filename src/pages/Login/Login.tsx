import { useEffect, useRef, useState } from 'react';
import { Form, Input, message, notification } from 'antd';
import { useForm } from 'antd/lib/form/Form';

import { OtpInputModal } from '../../components/OtpInputModal';

import * as S from './style';
import { logo } from '../../assets/images';
import { useLazyQuery } from '@apollo/client';
import { SIGN_IN_BY_ADMIN } from '../../graphql/query/signInByAdmin';
import {
  signInByAdmin,
  signInByAdminVariables,
} from '../../graphql/generated/signInByAdmin';
import { useRecoilState } from 'recoil';
import { userTokenState } from '../../recoil/atoms/userToken';

type SubmitType = {
  email: string;
  password: string;
};

export function Login() {
  const [open, setOpen] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const [, setTokenInfo] = useRecoilState(userTokenState);
  const inputRef = useRef<HTMLInputElement[]>([]);
  const [form] = useForm<SubmitType>();

  const emailReg =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

  const handleCancel = () => {
    setOtp(['', '', '', '', '', '']);
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

    // handleFocus(0);

    setOpen(true);
  };

  const handleFinish = () => {
    const userInfo: SubmitType = {
      email: form.getFieldValue('email'),
      password: form.getFieldValue('password'),
    };
    const code = otp.concat().join().replaceAll(',', '');

    signInByAdmin({
      variables: {
        code,
        ...userInfo,
      },
    });
  };

  const handleFocus = (idx: number) => {
    inputRef.current[idx]!.focus();
  };

  const [signInByAdmin, { loading }] = useLazyQuery<
    signInByAdmin,
    signInByAdminVariables
  >(SIGN_IN_BY_ADMIN, {
    onCompleted: () => {
      setTokenInfo({
        hasToken: true,
      });
    },
    onError: (e) => {
      message.error(e.message ?? `${e}`);
      handleCancel();
    },
    fetchPolicy: 'no-cache',
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    return () => {
      setOpen(false);
    };
  }, []);

  return (
    <S.Container>
      <OtpInputModal
        loading={loading}
        open={open}
        handleFinish={handleFinish}
        handleCancel={handleCancel}
        handleFocus={handleFocus}
        inputRef={inputRef}
        otp={otp}
        setOtp={setOtp}
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
