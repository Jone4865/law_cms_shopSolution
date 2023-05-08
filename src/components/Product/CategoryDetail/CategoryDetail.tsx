import { useEffect, useState } from 'react';
import { EditRow } from '../EditRow/EditRow';
import * as S from './style';
import * as A from '../../../pages/Product/style';
import { Button, Table, message } from 'antd';
import { productCategoryColumns } from '../../../utils/columns';
import { useMutation } from '@apollo/client';
import { CREATE_PRODUCT_CATEGORY } from '../../../graphql/mutation/createProductCategory';
import {
  createProductCategory,
  createProductCategoryVariables,
} from '../../../graphql/generated/createProductCategory';
import {
  updateProductCategory,
  updateProductCategoryVariables,
} from '../../../graphql/generated/updateProductCategory';
import { UPDATE_PRODUCT_CATEGORY } from '../../../graphql/mutation/updateProductCategory';
import {
  deleteProductCategory,
  deleteProductCategoryVariables,
} from '../../../graphql/generated/deleteProductCategory';
import { DELETE_PRODUCT_CATEGORY } from '../../../graphql/mutation/deleteProductCategory';
import { findManyProductCategory_findManyProductCategory_productCategories } from '../../../graphql/generated/findManyProductCategory';

type Props = {
  data: findManyProductCategory_findManyProductCategory_productCategories;
  isEdit: boolean;
  name: string;
  visible: boolean;
  parentId: string;
  handleRefetch: () => void;
  onChangeHandleCategoryVariables: (
    key: string,
    value: string | boolean,
  ) => void;
};

export function CategoryDetail({
  data,
  name,
  visible,
  isEdit,
  parentId,
  handleRefetch,
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

  const [checkAllState, setCheckAllState] = useState(false);
  const [checkedProduct, setCheckedProduct] = useState<number[]>([]);

  const handlePagination = () => {};

  const checkAll = (state: boolean) => {
    setCheckAllState(state);
    if (state) {
      setCheckedProduct(detailData.map((v) => v.id));
    } else {
      setCheckedProduct([]);
    }
  };

  const onDeleteHandle = () => {
    deleteProductCategory({
      variables: { deleteProductCategoryId: data.id },
    });
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
    //TODO: 로우 순서 수정요청 연결
    setCheckedProduct([]);
    setCheckAllState(false);
  };

  const onClickAddCategory = () => {
    createProductCategory({
      variables: {
        isVisible: data.isVisible,
        name: data.name,
        parentId: parentId ? parentId : '',
      },
    });
  };

  const onClickUpdateCategory = () => {
    updateProductCategory({
      variables: {
        isVisible: data.isVisible,
        name: data.name,
        updateProductCategoryId: data.id,
      },
    });
  };

  const onEditOrCreateCategory = () => {
    if (isEdit) {
      onClickUpdateCategory();
    } else {
      onClickAddCategory();
    }
  };

  const [createProductCategory] = useMutation<
    createProductCategory,
    createProductCategoryVariables
  >(CREATE_PRODUCT_CATEGORY, {
    onError: (e) => message.error(e.message ?? `${e}`),
    onCompleted() {
      message.success('카테고리를 생성했습니다.');
      handleRefetch();
    },
  });

  const [updateProductCategory] = useMutation<
    updateProductCategory,
    updateProductCategoryVariables
  >(UPDATE_PRODUCT_CATEGORY, {
    onError: (e) => message.error(e.message ?? `${e}`),
    onCompleted() {
      message.success('카테고리를 수정했습니다.');
      handleRefetch();
    },
  });

  const [deleteProductCategory] = useMutation<
    deleteProductCategory,
    deleteProductCategoryVariables
  >(DELETE_PRODUCT_CATEGORY, {
    onError: (e) => message.error(e.message ?? `${e}`),
    onCompleted() {
      message.success('카테고리를 삭제했습니다.');
      handleRefetch();
    },
  });

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
            <Button onClick={onEditOrCreateCategory} type="primary">
              {isEdit ? '카테고리 수정' : '카테고리 생성'}
            </Button>
            {isEdit && <Button onClick={onDeleteHandle}>카테고리 삭제</Button>}
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
                <Button onClick={() => ''}>선택삭제</Button>
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
