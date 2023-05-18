import * as S from './style';
import { Image } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { findManyProductByAdmin } from '../../graphql/generated/findManyProductByAdmin';

export const productCategoryColumns = (): ColumnsType<
  findManyProductByAdmin['findManyProductByAdmin']['products'][0]
> => [
  {
    title: 'No',
    key: 'id',
    dataIndex: 'id',
    align: 'center',
    render(_value, _record, index) {
      return index + 1;
    },
  },
  {
    title: '순서',
    key: 'position',
    dataIndex: 'position',
    align: 'center',
    render(val) {
      return <S.Flex>{val}</S.Flex>;
    },
  },
  {
    title: '노출여부',
    key: 'visible',
    dataIndex: 'visible',
    align: 'center',
    render(val) {
      return (
        <S.ProductCategoryContainer>
          {val ? '노출' : '비노출'}
        </S.ProductCategoryContainer>
      );
    },
  },
  {
    title: '상품정보',
    key: 'productFiles',
    dataIndex: 'productFiles',
    align: 'center',
    render(val, record) {
      return (
        <S.ProductListProductContainer>
          <Image
            alt="상품 이미지"
            src={
              val[0]?.name
                ? `${process.env.REACT_APP_SERVER_BASIC}/project-file?fileKind=IMAGE&name=${val[0].name}`
                : '/img/defaultImg.png'
            }
            width={60}
            height={60}
          />
          <div>
            <span>{record?.name}</span>
            <span>{record?.id}</span>
          </div>
        </S.ProductListProductContainer>
      );
    },
  },
  {
    title: '상품가격(원)',
    key: 'sellingPrice',
    dataIndex: 'sellingPrice',
    align: 'center',
    render(val) {
      return (
        <S.ProductCategoryContainer>
          {val?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
        </S.ProductCategoryContainer>
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
        <S.ProductListStockContainer key={idx}>
          <div>{option.name} </div>
          {option.stock !== null && (
            <>
              <div>-</div>
              <div> {+option.stock >= 0 ? option.stock + '개' : '품절'}</div>
            </>
          )}
        </S.ProductListStockContainer>
      ));
    },
  },
];
