import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Table, UploadFile } from 'antd';
import * as S from './style';
import { productSettingColumns } from '../../utils/columns';
import { SearchMore } from '../../components/Product/SearchMore/SearchMore';
import { useLazyQuery, useMutation } from '@apollo/client';
import {
  findManyProductOptionByAdmin,
  findManyProductOptionByAdminVariables,
} from '../../graphql/generated/findManyProductOptionByAdmin';
import { FIND_MANY_PRODUCT_OPTION_BY_ADMIN } from '../../graphql/query/findManyProductOptionByAdmin';
import {
  updateProductOption,
  updateProductOptionVariables,
} from '../../graphql/generated/updateProductOption';
import { UPDATE_PRODUCT_OPTION } from '../../graphql/mutation/updateProductOption';
import {
  deleteProductOption,
  deleteProductOptionVariables,
} from '../../graphql/generated/deleteProductOption';
import { DELETE_PRODUCT_OPTION } from '../../graphql/mutation/deleteProductOption';

import { message } from 'antd';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';

let isMessageVisible = false;

const showSuccessMessage = (msg: string) => {
  if (isMessageVisible) {
    return;
  }

  isMessageVisible = true;

  const hide = message.success(msg);
  hide.then(() => {
    isMessageVisible = false;
  });
};

export function ProductsSetting() {
  const [take, setTake] = useState(10);
  const [skip, setSkip] = useState(0);
  const [current, setCurrent] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [moreVisible, setMoreVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [checkedProduct, setCheckedProduct] = useState<string[]>([]);
  const [allChecked, setAllChecked] = useState(false);
  const [variables, setVariables] =
    useState<findManyProductOptionByAdminVariables>();

  const [data, setData] = useState<
    findManyProductOptionByAdmin['findManyProductOptionByAdmin']['productOptions']
  >([]);

  const onChecked = (productId?: string, all?: boolean) => {
    if (!all && productId) {
      setCheckedProduct((prev) =>
        prev.includes(productId)
          ? prev.filter((id) => id !== productId)
          : [...prev, productId],
      );
    } else {
      data.map((data: any) =>
        setCheckedProduct((prev) => (all ? [...prev, data.id] : [])),
      );
    }
  };

  const onSubmitHandle = (values: { searchText?: string }) => {
    setCurrent(1);
    if (searchText === '') {
      findManyProductOptionByAdmin({ variables: { take, skip } });
    } else {
      setSearchText(values.searchText ?? '');
      findManyProductOptionByAdmin({
        variables: { take, searchText, skip },
      });
    }
  };

  const changeHandle = (
    key: string,
    value:
      | string
      | number
      | boolean
      | UploadFile<any>[]
      | CheckboxValueType[]
      | undefined,
  ) => {
    if (value === '선택안함') {
      setVariables((prev: any) => {
        let newVariables: any = { ...prev };
        newVariables[key] = undefined;
        return newVariables;
      });
    } else {
      setVariables((prev: any) => {
        let newVariables: any = { ...prev };
        newVariables[key] = value;
        return newVariables;
      });
    }
  };

  const onEditHandle = (id: string) => {
    const newVariables = data.find((arr) => arr.id === id);
    if (newVariables) {
      updateProductOption({
        variables: { ...newVariables, updateProductOptionId: id },
      });
    }
  };

  const handlePagination = (e: number) => {
    setSkip((e - 1) * take);
    setCurrent(e);
  };

  const onDeleteHandle = (deleteProductOptionId?: string) => {
    if (deleteProductOptionId) {
      deleteProductOption({ variables: { deleteProductOptionId } });
    } else {
      checkedProduct.map((product) =>
        deleteProductOption({ variables: { deleteProductOptionId: product } }),
      );
    }
    setCheckedProduct([]);
    setAllChecked(false);
  };

  const onSearchHandle = () => {
    findManyProductOptionByAdmin({ variables: { ...variables, take, skip } });
  };

  const onChangeHandle = (id: string, key: string, value: number) => {
    const updatedTableData = [...data];
    const targetIndex = updatedTableData.findIndex(
      (product) => product.id === id,
    );
    updatedTableData[targetIndex] = {
      ...updatedTableData[targetIndex],
      [key]: value,
    };
    setData(updatedTableData);
  };

  const [findManyProductOptionByAdmin] = useLazyQuery<
    findManyProductOptionByAdmin,
    findManyProductOptionByAdminVariables
  >(FIND_MANY_PRODUCT_OPTION_BY_ADMIN, {
    onError: (e) => message.error(e.message ?? `${e}`),
    onCompleted(data) {
      setTotalCount(data.findManyProductOptionByAdmin.totalCount);
      setData(data.findManyProductOptionByAdmin.productOptions);
    },
  });

  const [updateProductOption] = useMutation<
    updateProductOption,
    updateProductOptionVariables
  >(UPDATE_PRODUCT_OPTION, {
    onError: (e) => message.error(e.message ?? `${e}`),
    onCompleted(_data) {
      message.success('옵션정보를 수정했습니다.');
    },
  });

  const [deleteProductOption] = useMutation<
    deleteProductOption,
    deleteProductOptionVariables
  >(DELETE_PRODUCT_OPTION, {
    onError: (e) => message.error(e.message ?? `${e}`),
    onCompleted(_data) {
      showSuccessMessage('해당옵션을 삭제했습니다.');
      findManyProductOptionByAdmin({
        variables: { skip, take },
        fetchPolicy: 'no-cache',
      });
    },
  });

  useEffect(() => {
    findManyProductOptionByAdmin({
      variables: { skip, take },
      fetchPolicy: 'no-cache',
    });

    setAllChecked(
      checkedProduct?.length !== 0 && data?.length <= checkedProduct?.length,
    );
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [checkedProduct, take, skip]);

  return (
    <div>
      <S.Title style={{ fontSize: '20px', fontWeight: 'bold' }}>
        상품 일괄 설정
      </S.Title>
      <S.Line />
      <S.Container
        style={{ flexDirection: windowWidth < 850 ? 'column' : 'row' }}
      >
        <S.Wrap>
          <Form layout="inline">
            <Form.Item name="searchText">
              <Input.Search
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                enterButton
                placeholder="검색어(상품명, 상품코드)"
                onSearch={() => onSubmitHandle({ searchText: searchText })}
              />
            </Form.Item>
          </Form>
        </S.Wrap>
        <S.BtnWrap style={{ margin: windowWidth < 850 ? '10px 0' : '' }}>
          <S.MoreBtn onClick={() => setMoreVisible(!moreVisible)}>
            <PlusOutlined />
            <p>상세검색</p>
          </S.MoreBtn>
        </S.BtnWrap>
      </S.Container>

      {moreVisible && (
        <SearchMore changeHandle={changeHandle} searchHandle={onSearchHandle} />
      )}

      <S.Dashed />
      <S.FilterContainer
        style={{
          flexDirection: windowWidth > 600 ? 'row' : 'column',
        }}
      >
        <S.FilterWrap>
          <Button onClick={() => onDeleteHandle()}>선택삭제</Button>
        </S.FilterWrap>
      </S.FilterContainer>
      <Table
        columns={productSettingColumns({
          checkedProduct,
          allChecked,
          onChangeHandle,
          onChecked,
          onEditHandle,
          onDeleteHandle,
        })}
        dataSource={data}
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
    </div>
  );
}
