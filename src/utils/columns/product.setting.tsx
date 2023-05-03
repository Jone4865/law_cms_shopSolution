import * as S from './style';
import { Button, Checkbox, Image, Input, Switch } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import moment from 'moment';

export type ProductSettingType = {
  id: number;
  visible: boolean;
  name: string;
  imgUrl: string;
  supplyPlice: number;
  originPrice: number;
  price: number;
  count: number;
  code: string;
  accumulationRate: number;
  firstCategory: string;
  secondCategory: string;
  createdAt: Date;
};

type Props = {
  checkAllState: boolean;
  checkedProduct: number[];
  checkAll: (state: boolean) => void;
  onCheckRow: (id: number) => void;
  onToggleClick: (id: number) => void;
  onChangeHandle: (id: number, key: string, value: number) => void;
};

export const productSettingColumns = ({
  checkAllState,
  checkedProduct,
  checkAll,
  onCheckRow,
  onToggleClick,
  onChangeHandle,
}: Props): ColumnsType<ProductSettingType> => [
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
          onChange={() => onToggleClick(record.id)}
        />
      );
    },
  },
  {
    title: '가격정보',
    key: 'price',
    dataIndex: 'price',
    align: 'center',
    render(val, record) {
      return (
        <S.ProductGrid>
          <S.ProductGridWrap>
            <span>공급가(원)</span>
            <Input
              onChange={(e) =>
                onChangeHandle(
                  record.id,
                  'supplyPlice',
                  parseInt(e.target?.value.replace(/,/g, '')),
                )
              }
              value={record.supplyPlice
                ?.toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            />
          </S.ProductGridWrap>
          <S.ProductGridWrap>
            <span>정상가(원)</span>
            <Input
              onChange={(e) =>
                onChangeHandle(
                  record.id,
                  'originPrice',
                  parseInt(e.target?.value.replace(/,/g, '')),
                )
              }
              value={record.originPrice
                ?.toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            />
          </S.ProductGridWrap>
          <S.ProductGridWrap>
            <span>판매가(원)</span>
            <Input
              onChange={(e) =>
                onChangeHandle(
                  record.id,
                  'price',
                  parseInt(e.target?.value.replace(/,/g, '')),
                )
              }
              value={val?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            />
          </S.ProductGridWrap>
        </S.ProductGrid>
      );
    },
  },
  {
    title: '적립율',
    key: 'accumulationRate',
    dataIndex: 'accumulationRate',
    align: 'center',
    render(val, record) {
      return (
        <S.ProductFlexWrap>
          <span>적립율(%)</span>
          <Input
            onChange={(e) =>
              onChangeHandle(
                record.id,
                'accumulationRate',
                parseInt(e.target?.value.replace(/,/g, '')),
              )
            }
            value={val?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          />
        </S.ProductFlexWrap>
      );
    },
  },
  {
    title: '재고량',
    key: 'count',
    dataIndex: 'count',
    align: 'center',
    render(val, record) {
      return (
        <S.ProductFlexWrap>
          <span>재고량(개)</span>
          <Input
            onChange={(e) =>
              onChangeHandle(
                record.id,
                'count',
                parseInt(e.target?.value.replace(/,/g, '')),
              )
            }
            value={val?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          />
        </S.ProductFlexWrap>
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
    title: '카테고리',
    key: 'firstCategory',
    dataIndex: 'firstCategory',
    align: 'center',
    render(val, record) {
      return (
        <S.CategoryContainer>
          <span>{val}</span>
          <div />
          <span>{record.secondCategory}</span>
        </S.CategoryContainer>
      );
    },
  },
  {
    title: '관리',
    key: 'id',
    dataIndex: 'id',
    align: 'center',
    render(_val) {
      return (
        <S.ProductListMangementContainer>
          <Button type="primary">수정</Button>
          <Button>삭제</Button>
        </S.ProductListMangementContainer>
      );
    },
  },
];
