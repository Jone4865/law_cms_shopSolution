import { Button, Input, Modal, notification, Image } from 'antd';
import React, { useEffect, useState } from 'react';
import * as S from './style';

import moment from 'moment';

import { useMutation } from '@apollo/client';
import { InquiryType } from '../../utils/columns';
import TransformBox from '../TransformBox';

type Props = {
  handleCancel: () => void;
  open: boolean;
  data: any | undefined;
  refetch: () => void;
};

export function ProductInquiryDetailModal({
  open,
  handleCancel,
  data,
  refetch,
}: Props) {
  const [reply, setReply] = useState('');

  const handleReply = () => {
    if (data?.reply) {
      return handleCancel();
    }
    if (!reply.length) {
      return notification.error({ message: '답변을 입력해주세요.' });
    }
    // updateInquiryReply({
    //   variables: {
    //     id: Number(data?.id ?? 0),
    //     reply,
    //   },
    // });
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReply(e.target.value);
  };

  // reply to user's inquiry
  // const [updateInquiryReply] = useMutation<
  //   ReplyInquiryByAdminResponse,
  //   ReplyInquiryByAdminParams
  // >(REPLY_INQUIRY_BY_ADMIN, {
  //   onCompleted: () => {
  //     notification.success({ message: '답변을 등록했습니다.' });
  //     handleCancel();
  //     refetch();
  //   },
  //   onError: (e) => {
  //     notification.error({ message: e.message });
  //   },
  // });

  useEffect(() => {
    if (data?.reply) {
      setReply(data.reply);
    } else {
      setReply('');
    }
  }, [open]);

  return (
    <Modal
      open={open}
      onCancel={handleCancel}
      footer={false}
      centered
      width={1000}
      bodyStyle={{
        maxHeight: '90vh',
        overflow: 'auto',
      }}
    >
      <S.Wrap>
        <S.Label>상품명</S.Label>
        {data?.product.name}
      </S.Wrap>
      <S.Wrap>
        <S.Label>회원명</S.Label>
        {data?.user?.name}
      </S.Wrap>
      <S.Wrap>
        <S.Label>문의 날짜</S.Label>
        {moment(data?.createdAt).format('YYYY-MM-DD HH:mm:ss')}
      </S.Wrap>
      {data && data.inquiryImages && data.inquiryImages.length > 0 && (
        <>
          <h3>첨부 사진</h3>
          <TransformBox
            marginBottom={'30px'}
            width={'100%'}
            justifyContent="space-between"
          >
            {data.inquiryImages.map((v: any) => {
              return (
                <Image
                  src={`${process.env.REACT_APP_INQUIRY_IMAGE_URL}/${v.name}`}
                  alt="image"
                  key={v.id}
                  height={200}
                  style={{
                    marginRight: '30px',
                  }}
                />
              );
            })}
          </TransformBox>
        </>
      )}
      <h3>문의내용</h3>
      <Input.TextArea
        value={data?.content}
        readOnly
        style={{
          marginBottom: 30,
          height: 100,
        }}
      />

      <h3>문의답변</h3>
      <Input.TextArea
        value={reply}
        readOnly={(data?.reply?.length ?? -1) > 0}
        style={{
          height: 100,
        }}
        onChange={handleChange}
      />

      <TransformBox justifyContent="center" marginTop="30px">
        <Button
          type="primary"
          style={{
            width: 150,
          }}
          onClick={handleReply}
        >
          {data?.reply ? '확인' : '답변 작성'}
        </Button>
      </TransformBox>
    </Modal>
  );
}
