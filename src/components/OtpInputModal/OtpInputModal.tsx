import { Modal } from 'antd';
import React, { useEffect, useRef } from 'react';
import Loader from '../Loader';
import * as S from './style';

type Props = {
  open: boolean;
  handleCancel: () => void;
  otp: string[];
  loading: boolean;
  setOtp: React.Dispatch<React.SetStateAction<string[]>>;
  handleFinish: () => void;
  inputRef: React.MutableRefObject<HTMLInputElement[]>;
  handleFocus: (idx: number) => void;
};

export function OtpInputModal({
  open,
  setOtp,
  otp,
  loading,
  handleCancel,
  inputRef,
  handleFocus,
  handleFinish,
}: Props) {
  const ref = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (otp[5].length) {
      handleFinish();
    }
  }, [otp]);

  useEffect(() => {
    if (inputRef.current[0]) {
      setTimeout(() => {
        inputRef.current[0].focus();
      }, 100);
    }
  }, [open]);

  return (
    <Modal
      open={open}
      onCancel={handleCancel}
      footer={false}
      centered
      closable={false}
      width={800}
      destroyOnClose
      focusTriggerAfterClose={false}
      forceRender
    >
      <S.ModalTitle>OTP 인증번호</S.ModalTitle>

      {loading && <Loader />}
      <S.OtpWrap>
        {otp.map((v, i) => {
          return (
            <S.OtpInput
              ref={(elem) => {
                if (elem && !inputRef.current[i]) {
                  inputRef.current[i] = elem;
                }
              }}
              key={i}
              maxLength={1}
              value={v}
              autoFocus={true}
              onChange={(e) => {
                setOtp((prev) => {
                  prev[i] = e.target.value.replace(/\D/g, '');
                  return [...prev];
                });
                if (e.target.value.replace(/\D/g, '').length > 0) {
                  if (i === 5) {
                    return;
                  }
                  handleFocus(i + 1);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Backspace' && i !== 0 && !otp[i].length) {
                  handleFocus(i - 1);
                }
                setOtp((prev) => {
                  prev[i] = '';
                  return [...prev];
                });
              }}
            />
          );
        })}
      </S.OtpWrap>
    </Modal>
  );
}
