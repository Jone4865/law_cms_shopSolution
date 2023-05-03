import * as S from './style';
import { Button, Checkbox, Image, Input } from 'antd';
import { ColumnsType } from 'antd/lib/table';

export type ProductCategoryType = {
  id: number;
  number: number;
  visible: boolean;
  name: string;
  code: string;
  imgUrl: string;
  price: number;
  count: number;
};

type Props = {
  checkAllState: boolean;
  checkedProduct: number[];
  checkAll: (state: boolean) => void;
  onCheckRow: (id: number) => void;
  changeHandle: (key: string, value: string) => void;
  onChangeNumberHandle: (id: number, number: number) => void;
  onEditHandle: (id: number, number: number) => void;
};

export const productCategoryColumns = ({
  checkAllState,
  checkedProduct,
  checkAll,
  onCheckRow,
  changeHandle,
  onChangeNumberHandle,
  onEditHandle,
}: Props): ColumnsType<ProductCategoryType> => [
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
  },
  {
    title: '순서',
    key: 'number',
    dataIndex: 'number',
    align: 'center',
    render(val, record) {
      return (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Input
            value={val?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            style={{ width: '100px', marginRight: '5px' }}
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
    title: '노출',
    key: 'visible',
    dataIndex: 'visible',
    align: 'center',
    render(val) {
      return val ? '노출' : '비노출';
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
    title: '상품가격',
    key: 'price',
    dataIndex: 'price',
    align: 'center',
    render(val) {
      return val?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '원';
    },
  },
  {
    title: '재고량',
    key: 'count',
    dataIndex: 'count',
    align: 'center',
    render(val) {
      return val > 0
        ? val?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '개'
        : '품절';
    },
  },
];
