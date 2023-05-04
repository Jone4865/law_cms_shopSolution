import * as S from './style';
import { Button, Checkbox, Image, Input, Switch } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import moment from 'moment';
import { findManyProduct } from '../../graphql/generated/findManyProduct';

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
  number: number;
};

type Props = {
  checkAllState: boolean;
  checkedProduct: string[];
  checkAll: (state: boolean) => void;
  onCheckRow: (id: string) => void;
  onToggleClick: (id: string) => void;
  onEditHandle: (id: string, number: number) => void;
  onDeleteHandle: (id: string) => void;
  onChangeNumberHandle: (id: string, position: number) => void;
};

export const productListColumns = ({
  checkAllState,
  checkedProduct,
  checkAll,
  onCheckRow,
  onToggleClick,
  onEditHandle,
  onDeleteHandle,
  onChangeNumberHandle,
}: Props): ColumnsType<findManyProduct['findManyProduct']['products'][0]> => [
  {
    title: (
      <Checkbox
        checked={checkAllState}
        onChange={(e) => checkAll(e.target.checked)}
      />
    ),
    key: 'code',
    dataIndex: 'code',
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
    key: 'code',
    dataIndex: 'code',
    align: 'center',
    render(val) {
      return val?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
  },
  {
    title: '순위',
    key: 'position',
    dataIndex: 'position',
    align: 'center',
    render(val, record) {
      return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Input
            style={{ width: '100px', marginRight: '5px' }}
            value={val?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            onChange={(e) =>
              onChangeNumberHandle(
                record.id,
                parseInt(e.target?.value?.replace(/,/g, '')),
              )
            }
          />
          <Button onClick={() => onEditHandle(record.id, val)}>수정</Button>
        </div>
      );
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
    key: 'salePrice',
    dataIndex: 'salePrice',
    align: 'center',
    render(val, record) {
      return (
        val?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') +
        '/' +
        record?.sellingPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      );
    },
  },
  {
    title: '재고량',
    key: 'productOptions',
    dataIndex: 'productOptions',
    align: 'center',
    render(val) {
      return val?.map((option: any, idx: number) => (
        <div key={idx} style={{ display: 'flex' }}>
          <div>{option.name} </div>-<div> {option.stock}개</div>
        </div>
      ));
    },
  },
  {
    title: '등록일',
    key: 'createdAt',
    dataIndex: 'createdAt',
    align: 'center',
    render(val) {
      return (
        <S.WhiteSpaceNoWrap>
          {moment(val).format('YYYY-MM-DD hh:mm')}
        </S.WhiteSpaceNoWrap>
      );
    },
  },
  {
    title: '관리',
    key: 'id',
    dataIndex: 'id',
    align: 'center',
    render(val) {
      return <Button onClick={() => onDeleteHandle(val)}>삭제</Button>;
    },
  },
];
