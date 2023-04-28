import * as S from './style';
import { Button, Checkbox, Input } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { ColumnsType } from 'antd/lib/table';
import moment from 'moment';

export type ProductListType = {
  id: number;
  rank: number;
  visible: boolean;
  state: number;
  product: string[];
  price: number;
  count: number;
  createdAt: string;
};

type Props = {
  checkAllState: boolean;
  checkedProduct: number[];
  checkAll: (state: boolean) => void;
  onCheckRow: (id: number) => void;
};

export const productListColumns = ({
  checkAllState,
  checkedProduct,
  checkAll,
  onCheckRow,
}: Props): ColumnsType<ProductListType> => [
  {
    title: (
      <Checkbox
        checked={checkAllState}
        onChange={(e) => checkAll(e.target.checked)}
      />
    ),
    key: 'id',
    dataIndex: 'id',
    align: 'center',
    render(val) {
      return (
        <Checkbox
          checked={checkedProduct.includes(val) ? true : false}
          onChange={() => onCheckRow(val)}
        />
      );
    },
  },
  {
    title: 'No',
    key: 'id',
    dataIndex: 'id',
    align: 'center',
    render(val) {
      return val?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
  },
  {
    title: '순위',
    key: 'rank',
    dataIndex: 'rank',
    align: 'center',
    render(val) {
      return (
        <S.ProductListRankContainer>
          <Input
            value={val?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          />
          <Button>수정</Button>
        </S.ProductListRankContainer>
      );
    },
  },
  {
    title: '노출/판매',
    key: 'state',
    dataIndex: 'state',
    align: 'center',
    render(val, record) {
      return (
        <S.ProductListStateContainer>
          <div>{val}</div>
          <span>{record.visible ? '노출' : '숨김'}</span>
        </S.ProductListStateContainer>
      );
    },
  },
  {
    title: '상품정보',
    key: 'product',
    dataIndex: 'product',
    align: 'center',
    render(val) {
      return val;
    },
  },
  {
    title: '판매가',
    key: 'price',
    dataIndex: 'price',
    align: 'center',
    render(val) {
      return val?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
  },
  {
    title: '재고량',
    key: 'count',
    dataIndex: 'count',
    align: 'center',
    render(val) {
      return val?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
  },
  {
    title: '등록일',
    key: 'createdAt',
    dataIndex: 'createdAt',
    align: 'center',
    render(val) {
      return moment(val).format('YYYY-MM-DD hh:mm');
    },
  },
  {
    title: '관리',
    key: 'id',
    dataIndex: 'id',
    align: 'center',
    render(val) {
      return (
        <S.ProductListMangementContainer>
          <Button type="primary">수정</Button>
          <Button>삭제</Button>
        </S.ProductListMangementContainer>
      );
    },
  },
];
