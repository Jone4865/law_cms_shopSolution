import { Button, Popconfirm, Tag } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import moment from 'moment';

export const productInquiryColumns: ColumnsType<any> = [
  {
    title: 'no',
    key: 'id',
    dataIndex: 'id',
    align: 'center',
  },
  {
    title: '상품명',
    key: 'product',
    dataIndex: 'product',
    align: 'center',
    render: (val) => {
      return val.name;
    },
  },
  {
    title: '회원명',
    key: 'user',
    dataIndex: 'user',
    render: (val) => {
      return val.name;
    },
    align: 'center',
  },
  {
    title: '문의 내용',
    key: 'content',
    dataIndex: 'content',
    align: 'center',
  },
  {
    title: '문의 날짜',
    key: 'createdAt',
    dataIndex: 'createdAt',
    align: 'center',
    render: (val) => {
      return moment(val).format('YYYY-MM-DD HH:mm:ss');
    },
  },
  {
    title: '상태',
    key: 'isReply',
    dataIndex: 'reply',
    align: 'center',
    render: (val) => {
      return val ? (
        <Tag color="blue">완료</Tag>
      ) : (
        <Tag color="error">미처리</Tag>
      );
    },
  },
  {
    title: '관리',
    key: 'delete',
    dataIndex: 'id',
    align: 'center',
    render: (val) => (
      <Popconfirm title="정말 삭제하시겠습니까?">
        <Button type="primary" danger>
          삭제
        </Button>
      </Popconfirm>
    ),
  },
];
