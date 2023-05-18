import { useEffect, useState } from 'react';
import { EditRow } from '../EditRow/EditRow';
import * as S from './style';
import * as A from '../../../pages/Product/style';
import { Button, Table, message } from 'antd';
import { productCategoryColumns } from '../../../utils/columns';
import { useLazyQuery, useMutation } from '@apollo/client';
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

import {
  findManyProductByAdmin,
  findManyProductByAdminVariables,
} from '../../../graphql/generated/findManyProductByAdmin';
import { FIND_MANY_PRODUCT_BY_ADMIN } from '../../../graphql/query/findManyProductByAdmin';

type Props = {
  data: findManyProductCategory_findManyProductCategory_productCategories;
  isEdit: boolean;
  name: string;
  visible: boolean;
  parentId: string;
  ableCategoryId: string | undefined;
  handleRefetch: () => void;
  onChangeHandleCategoryVariables: (
    key: string,
    value: string | boolean | number,
  ) => void;
  isAdd?: boolean;
};

export function CategoryDetail({
  data,
  name,
  visible,
  isEdit,
  parentId,
  ableCategoryId,
  handleRefetch,
  onChangeHandleCategoryVariables,
  isAdd,
}: Props) {
  const [take, setTake] = useState(10);
  const [skip, setSkip] = useState(0);
  const [current, setCurrent] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [detailData, setDetailData] = useState<
    findManyProductByAdmin['findManyProductByAdmin']['products']
  >([]);

  const handlePagination = (e: number) => {
    setSkip((e - 1) * take);
    setCurrent(e);
  };

  const onDeleteHandle = () => {
    deleteProductCategory({
      variables: { deleteProductCategoryId: data.id },
    });
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

  const [findManyProductByAdmin] = useLazyQuery<
    findManyProductByAdmin,
    findManyProductByAdminVariables
  >(FIND_MANY_PRODUCT_BY_ADMIN, {
    onError: (e) => message.error(e.message ?? `${e}`),
    onCompleted(data) {
      setTotalCount(data.findManyProductByAdmin.totalCount);
      setDetailData(data.findManyProductByAdmin.products);
    },
  });

  useEffect(() => {
    findManyProductByAdmin({
      variables: {
        take,
        skip,
        productCategoryId: ableCategoryId,
      },
      fetchPolicy: 'no-cache',
    });

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [data, take, skip]);

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
          <Table
            columns={productCategoryColumns()}
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
        )}
      </S.Container>
    </>
  );
}
