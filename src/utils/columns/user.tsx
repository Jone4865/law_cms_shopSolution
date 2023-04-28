import { ColumnsType } from 'antd/lib/table';
import moment from 'moment';
import { phoneFormat } from '../phoneFormat';

export type UserType = {
  nickname: string;
  email: string;
  name: string;
  createdAt: string;
  phone: string;
  shippingAddresses: {
    id: number;
    address: string;
    addressDetail: string;
    isDefault: boolean;
  }[];
};

export const userListColumns: ColumnsType<UserType> = [
  {
    title: '이메일',
    key: 'email',
    dataIndex: 'email',
    align: 'center',
  },

  {
    title: '이름',
    key: 'name',
    dataIndex: 'name',
    align: 'center',
  },
  {
    title: '전화번호',
    key: 'phone',
    dataIndex: 'phone',
    align: 'center',
    render: (val) => phoneFormat(val),
  },
  {
    title: '최근 접속일',
    key: 'latestLoginedAt',
    dataIndex: 'latestLoginedAt',
    align: 'center',
    render: (val: string) => {
      return moment(val).format('YYYY-MM-DD HH:mm:ss');
    },
  },
  {
    title: '생성일',
    key: 'createdAt',
    dataIndex: 'createdAt',
    align: 'center',
    render: (val: string) => {
      return moment(val).format('YYYY-MM-DD HH:mm:ss');
    },
  },
];
