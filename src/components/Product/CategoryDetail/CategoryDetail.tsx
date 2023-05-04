import { useEffect, useState } from 'react';
import { EditRow } from '../EditRow/EditRow';
import * as S from './style';
import * as A from '../../../pages/Product/style';
import { Button, Table, message } from 'antd';
import { productCategoryColumns } from '../../../utils/columns';
import { useLazyQuery } from '@apollo/client';

type Props = {
  id: number | undefined;
  isEdit: boolean;
  name: string;
  visible: boolean;
  onChangeHandleCategoryVariables: (
    key: string,
    value: string | boolean,
  ) => void;
};

export function CategoryDetail({
  id,
  name,
  visible,
  isEdit,
  onChangeHandleCategoryVariables,
}: Props) {
  const [take, setTake] = useState(10);
  const [skip, setSkip] = useState(0);
  const [current, setCurrent] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [detailData, setDetailData] = useState([
    {
      id: 1,
      number: 1000,
      visible: true,
      name: 'dawda',
      code: 'dawdaw-dwad-dawd',
      imgUrl: 'https://danonline.kr/snoopym/images/redpop.png?crc=92367325',
      price: 1000,
      count: 1000,
    },
  ]);
  const [variables, setVariables] = useState({
    id: 1,
    categoryName: 'dwadwa',
    categoryVisible: true,
  });
  const [checkAllState, setCheckAllState] = useState(false);
  const [checkedProduct, setCheckedProduct] = useState<number[]>([]);

  const onChangeHandle = (key: string, value: string) => {
    setVariables((prev: any) => {
      let newVariables = { ...prev };
      newVariables[key] = value;
      return newVariables;
    });
  };

  const handlePagination = () => {};

  const checkAll = (state: boolean) => {
    setCheckAllState(state);
    if (state) {
      setCheckedProduct(detailData.map((v) => v.id));
    } else {
      setCheckedProduct([]);
    }
  };

  const onDeleteHandle = (id: number | undefined) => {
    if (id === undefined) {
      //TODO: 선택 삭제요청 연결 id는 chececkedProduct에 있음 map으로 요청
    } else {
      //한개 삭제요청 연결
    }
    setCheckedProduct([]);
    setCheckAllState(false);
  };

  const changeHandle = (key: string, serchCategory: string) => {
    //TODO: 검색 variables에 세팅
  };

  const onCheckRow = (id: number) => {
    if (checkedProduct.includes(id)) {
      setCheckedProduct((prev) => prev.filter((v) => v !== id));
    } else {
      setCheckedProduct((prev) => [...prev, id]);
    }
    setCheckAllState(false);
  };

  const onChangeNumberHandle = (id: number, number: number) => {
    const updatedTableData = [...detailData];
    const targetIndex = updatedTableData.findIndex(
      (product) => product.id === id,
    );
    if (targetIndex !== -1) {
      updatedTableData[targetIndex] = {
        ...updatedTableData[targetIndex],
        number: number,
      };
      setDetailData(updatedTableData);
    }
  };

  const onEditHandle = (id: number, number: number) => {
    //TODO: 수정요청 연결
    setCheckedProduct([]);
    setCheckAllState(false);
  };

  const onEditCategory = () => {};
  const onDeleteCategory = () => {};

  useEffect(() => {
    setCheckAllState(
      checkedProduct?.length === detailData?.length ? true : false,
    );

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [checkedProduct, detailData]);

  return (
    <>
      <S.Container>
        <S.Wrap>
          <S.Title>{isEdit ? '선택 카테고리 설정' : '카테고리 생성'}</S.Title>
          <EditRow
            changeHandle={onChangeHandleCategoryVariables}
            saveName={'name'}
            title="카테고리 명"
            type="input"
            inputValue={name}
          />
          <EditRow
            changeHandle={onChangeHandleCategoryVariables}
            saveName={'isVisible'}
            title="카테고리 노출"
            type="toggle"
            chececkBoxValues={['노출', '숨김']}
            visible={visible}
          />
          <S.BtnWrap>
            <Button onClick={onEditCategory} type="primary">
              {isEdit ? '카테고리 수정' : '카테고리 생성'}
            </Button>
            <Button onClick={onDeleteCategory}>
              {isEdit ? '취소' : '카테고리 삭제'}
            </Button>
          </S.BtnWrap>
        </S.Wrap>
        {isEdit && (
          <>
            <A.FilterContainer
              style={{
                flexDirection: windowWidth > 600 ? 'row' : 'column',
              }}
            >
              <A.FilterWrap>
                <Button onClick={() => onDeleteHandle(undefined)}>
                  선택삭제
                </Button>
              </A.FilterWrap>
              <Button type="primary">상품추가</Button>
            </A.FilterContainer>
            <Table
              columns={productCategoryColumns({
                checkAllState,
                checkedProduct,
                checkAll,
                onCheckRow,
                changeHandle,
                onChangeNumberHandle,
                onEditHandle,
              })}
              dataSource={detailData}
              pagination={{
                position: ['bottomCenter'],
                showSizeChanger: true,
                onChange: handlePagination,
                onShowSizeChange: (_current, size) => setTake(size),
                total: totalCount,
                current: current,
              }}
              style={{
                marginTop: 30,
              }}
              rowKey={(rec) => rec.id}
              scroll={{ x: 800 }}
            />
          </>
        )}
      </S.Container>
    </>
  );
}
