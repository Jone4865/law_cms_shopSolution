import * as S from './style';
import { Button, Checkbox, Image, Switch } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import moment from 'moment';

export type ProductListType = {
  id: number;
  visible: boolean;
  state: number;
  name: string;
  imgUrl: string;
  price: number;
  count: number;
  originPrice: number;
  createdAt: Date;
  code: string;
};

type Props = {
  checkAllState: boolean;
  checkedProduct: number[];
  checkAll: (state: boolean) => void;
  onCheckRow: (id: number) => void;
  onToggleClick: (id: number) => void;
};

export const productListColumns = ({
  checkAllState,
  checkedProduct,
  checkAll,
  onCheckRow,
  onToggleClick,
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
    title: '상품정보',
    key: 'imgUrl',
    dataIndex: 'imgUrl',
    align: 'center',
    render(val, record) {
      return (
        <S.ProductListProductContainer>
          <Image alt="상품 이미지" src={val} width={'60px'} height={'60px'} />
          <div>
            <span>{record?.name}</span>
            <span>{record?.code}</span>
          </div>
        </S.ProductListProductContainer>
      );
    },
  },
  {
    title: '노출',
    key: 'visible',
    dataIndex: 'visible',
    align: 'center',
    render(val, record) {
      return (
        <Switch
          defaultChecked={val ? true : false}
          onChange={() => onToggleClick(record?.id)}
        />
      );
    },
  },
  {
    title: '판매가/정상가',
    key: 'price',
    dataIndex: 'price',
    align: 'center',
    render(val, record) {
      return (
        val?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
        '/' +
        record?.originPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      );
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
