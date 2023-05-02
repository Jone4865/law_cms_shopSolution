import { ColumnsType } from 'antd/lib/table';
import moment from 'moment';
import { phoneFormat } from '../phoneFormat';
import { Button } from 'antd';

export const userSleepColumns: ColumnsType<any> = [
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
    title: '휴면 전환일',
    key: 'sleepedAt',
    dataIndex: 'sleepedAt',
    align: 'center',
    render: (val: string) => {
      return moment(val).format('YYYY-MM-DD');
    },
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
  {
    title: '관리',
    key: 'change',
    dataIndex: 'email',
    align: 'center',
    render: (val) => <Button>휴면해제</Button>,
  },
];
