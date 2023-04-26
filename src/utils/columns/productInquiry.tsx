import { Tag } from 'antd';
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
    key: 'inquiryKind',
    dataIndex: 'inquiryKind',
    align: 'center',
    render: (val) => {
      return val.name;
    },
  },
  {
    title: '작성자',
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
    key: 'reportingDate',
    dataIndex: 'reportingDate',
    align: 'center',
    render: (val) => {
      return moment(val).format('YYYY-MM-DD HH:mm:ss');
    },
  },
  {
    title: '처리 날짜',
    key: 'processingDate',
    dataIndex: 'processingDate',
    align: 'center',
    render: (val) => {
      return val ? moment(val).format('YYYY-MM-DD HH:mm:ss') : '-';
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
];
