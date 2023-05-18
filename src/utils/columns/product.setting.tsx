import * as S from './style';
import { Button, Checkbox, Image, Input, Switch } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import moment from 'moment';
import { findManyProductOptionByAdmin } from '../../graphql/generated/findManyProductOptionByAdmin';

type Props = {
  checkedProduct: string[];
  allChecked: boolean;
  onChangeHandle: (id: string, key: string, value: number) => void;
  onChecked: (deleteProductId: string, all?: boolean) => void;
  onEditHandle: (id: string) => void;
  onDeleteHandle: (id: string) => void;
};

export const productSettingColumns = ({
  allChecked,
  checkedProduct,
  onChangeHandle,
  onChecked,
  onEditHandle,
  onDeleteHandle,
}: Props): ColumnsType<
  findManyProductOptionByAdmin['findManyProductOptionByAdmin']['productOptions'][0]
> => [
  {
    title: (
      <Checkbox
        checked={allChecked}
        onChange={(e) => onChecked('', e.target.checked)}
      />
    ),
    key: 'id',
    dataIndex: 'id',
    align: 'center',
    render(val) {
      return (
        <Checkbox
          onClick={(e) => e.stopPropagation()}
          checked={checkedProduct.includes(val) ? true : false}
          onChange={() => onChecked(val)}
        />
      );
    },
  },
  {
    title: 'No',
    key: 'id',
    dataIndex: 'id',
    align: 'center',
    render: (_val, _record, index) => index + 1,
  },
  {
    title: '상품이름',
    key: 'product',
    dataIndex: 'product',
    align: 'center',
    render(val, record) {
      return (
        <S.ProductListProductContainer>
          <div>
            <span>{val?.name}</span>
            <span>{record?.id}</span>
          </div>
        </S.ProductListProductContainer>
      );
    },
  },
  {
    title: '상품옵션',
    key: 'name',
    dataIndex: 'name',
    align: 'center',
    render(val) {
      return (
        <S.ProductListProductContainer>
          <div>
            <span>{val}</span>
          </div>
        </S.ProductListProductContainer>
      );
    },
  },
  {
    title: '추가금(원)',
    key: 'extraPrice',
    dataIndex: 'extraPrice',
    align: 'center',
    render(val, record) {
      return (
        <Input
          style={{ width: '150px' }}
          value={val}
          onChange={(e) =>
            onChangeHandle(
              record.id,
              'extraPrice',
              parseInt(e.target?.value.replace(/,/g, '')),
            )
          }
        />
      );
    },
  },
  {
    title: '판매금(원)',
    key: 'finalPrice',
    dataIndex: 'finalPrice',
    align: 'center',
    render(val, record) {
      return (
        <Input
          style={{ width: '150px' }}
          value={val}
          onChange={(e) =>
            onChangeHandle(
              record.id,
              'finalPrice',
              parseInt(e.target?.value.replace(/,/g, '')),
            )
          }
        />
      );
    },
  },
  {
    title: '재고량(개)',
    key: 'stock',
    dataIndex: 'stock',
    align: 'center',
    render(val, record) {
      return (
        <Input
          style={{ width: '150px' }}
          onChange={(e) =>
            onChangeHandle(
              record.id,
              'stock',
              parseInt(e.target?.value.replace(/,/g, '')),
            )
          }
          value={val?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        />
      );
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
      return (
        <S.ProductListMangementContainer>
          <Button type="primary" onClick={() => onEditHandle(val)}>
            수정
          </Button>
          <Button onClick={() => onDeleteHandle(val)}>삭제</Button>
        </S.ProductListMangementContainer>
      );
    },
  },
];
