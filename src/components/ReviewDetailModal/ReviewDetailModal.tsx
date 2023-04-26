import { useMutation } from '@apollo/client';
import { Button, Input, Modal, message, Popconfirm, Image, Rate } from 'antd';

import * as S from './style';
import TransformBox from '../TransformBox';
import { phoneFormat } from '../../utils/phoneFormat';
import moment from 'moment';
import { logo } from '../../assets/images';

type Props = {
  data?: any;
  open: boolean;
  handleCancel: () => void;
  refetch: () => void;
};

export function ReviewDetailModal({
  open,
  handleCancel,
  data,
  refetch,
}: Props) {
  return (
    <Modal
      title="상품 리뷰 상세정보"
      open={open}
      onCancel={handleCancel}
      centered
      width={800}
      footer={
        <TransformBox justifyContent="flex-end">
          <Button onClick={handleCancel}>취소</Button>
          <Popconfirm
            title="정말 삭제하시겠습니까?"
            placement="topRight"
            okText="삭제"
            onConfirm={() => {}}
          >
            <Button type="primary" loading={false} danger>
              삭제
            </Button>
          </Popconfirm>
        </TransformBox>
      }
    >
      <TransformBox alignItems="center" marginBottom="30px">
        <S.Label>별점</S.Label>
        <Rate count={5} value={data?.rate} disabled />
      </TransformBox>

      <TransformBox alignItems="center" marginBottom="30px">
        <S.Label>상품명</S.Label>
        <span>{data?.product.name}</span>
      </TransformBox>

      <TransformBox alignItems="center" marginBottom="30px">
        <S.Label>작성자</S.Label>
        <span>{data?.user.name}</span>
      </TransformBox>

      <TransformBox alignItems="center" marginBottom="30px">
        <S.Label>이메일</S.Label>
        <span>{data?.user.email}</span>
      </TransformBox>

      <TransformBox alignItems="center" marginBottom="30px">
        <S.Label>연락처</S.Label>
        <span>{phoneFormat(data?.user.phone ?? '')}</span>
      </TransformBox>

      <TransformBox alignItems="center" marginBottom="30px">
        <S.Label>작성일</S.Label>
        <span>{moment(data?.createdAt).format('YYYY-MM-DD HH:mm:ss')}</span>
      </TransformBox>
      <TransformBox flexDirection="column" marginBottom="30px">
        <S.Label
          style={{
            marginBottom: 10,
          }}
        >
          내용
        </S.Label>
        <Input.TextArea
          value={data?.content}
          style={{
            height: 200,
          }}
          readOnly
        />
      </TransformBox>

      <TransformBox flexDirection="column">
        <S.Label
          style={{
            marginBottom: 10,
          }}
        >
          이미지
        </S.Label>
        <TransformBox>
          <Image
            src={logo}
            width={150}
            wrapperStyle={{
              marginRight: 15,
              border: '1px solid #dcdcdc',
            }}
          />
        </TransformBox>
      </TransformBox>
    </Modal>
  );
}
