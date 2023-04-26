import { Button, Popconfirm, Rate, Tag } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import moment from 'moment';

export const reviewColumns: ColumnsType<any> = [
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
    title: '작성자',
    key: 'user',
    dataIndex: 'user',
    render: (val) => {
      return val.name;
    },
    align: 'center',
  },
  {
    title: '별점',
    key: 'rate',
    dataIndex: 'rate',
    align: 'center',
    render: (val) => <Rate count={5} value={val} disabled />,
  },
  {
    title: '내용',
    key: 'content',
    dataIndex: 'content',
    align: 'center',
  },
  {
    title: '등록일',
    key: 'reportingDate',
    dataIndex: 'reportingDate',
    align: 'center',
    render: (val) => {
      return moment(val).format('YYYY-MM-DD HH:mm:ss');
    },
  },
  {
    title: '관리',
    key: 'delete',
    dataIndex: 'id',
    align: 'center',
    render: (val) => (
      <Popconfirm title="정말 삭제하시겠습니까?">
        <Button type="primary" danger onClick={(e) => e.stopPropagation()}>
          삭제
        </Button>
      </Popconfirm>
    ),
  },
];
