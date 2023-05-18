import React, { useEffect, useState } from 'react';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, Table, UploadFile, message } from 'antd';
import * as S from './style';
import { productListColumns } from '../../utils/columns';
import { SearchMore } from '../../components/Product/SearchMore/SearchMore';
import { useLazyQuery, useMutation } from '@apollo/client';
import { FIND_MANY_PRODUCT_BY_ADMIN } from '../../graphql/query/findManyProductByAdmin';
import {
  findManyProductByAdmin,
  findManyProductByAdminVariables,
} from '../../graphql/generated/findManyProductByAdmin';
import { DELETE_PRODUCT } from '../../graphql/mutation/deleteProduct';
import { UPDATE_PRODUCT_POSITION } from '../../graphql/mutation/updateProductPosition';
import { PRODUCT_IS_VISIBLE_TOGGLE } from '../../graphql/mutation/productIsVisibleToggle';
import {
  productIsVisibleToggle,
  productIsVisibleToggleVariables,
} from '../../graphql/generated/productIsVisibleToggle';
import {
  updateProductPosition,
  updateProductPositionVariables,
} from '../../graphql/generated/updateProductPosition';
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

export function ProductList() {
  const navigate = useNavigate();
  const [take, setTake] = useState(10);
  const [skip, setSkip] = useState(0);
  const [current, setCurrent] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [moreVisible, setMoreVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [checkedProduct, setCheckedProduct] = useState<string[]>([]);
  const [allChecked, setAllChecked] = useState(false);
  const [variables, setVariables] = useState<findManyProductByAdminVariables>();
  const [tableData, setTableData] = useState<
    findManyProductByAdmin['findManyProductByAdmin']['products']
  >([]);

  const onChecked = (productId?: string, all?: boolean) => {
    if (!all && productId) {
      setCheckedProduct((prev) =>
        prev.includes(productId)
          ? prev.filter((id) => id !== productId)
          : [...prev, productId],
      );
    } else {
      tableData.map((data: any) =>
        setCheckedProduct((prev) => (all ? [...prev, data.id] : [])),
      );
    }
  };

  const onSubmitHandle = (values: { searchText?: string }) => {
    if (searchText === '') {
      findManyProductByAdmin({ variables: { take, skip } });
    } else {
      setSearchText(values.searchText ?? '');
      findManyProductByAdmin({ variables: { take, searchText, skip } });
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

  const handlePagination = (e: number) => {
    setSkip((e - 1) * take);
    setCurrent(e);
  };

  const onSearchHandle = () => {
    findManyProductByAdmin({
      variables: {
        ...variables,
        skip: 0,
        take: 10,
      },
    });
    setCurrent(1);
  };

  const onDeleteHandle = (
    id: string | undefined,
    e: React.MouseEvent<HTMLElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    if (id === undefined) {
      checkedProduct.map((data) =>
        deleteProduct({
          variables: {
            deleteProductId: data,
          },
        }),
      );
    } else {
      deleteProduct({
        variables: {
          deleteProductId: id,
        },
      });
    }
    setCheckedProduct([]);
  };

  const onEditHandle = (
    id: string,
    number: number,
    e: React.MouseEvent<HTMLElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    updateProductPosition({
      variables: {
        position: number,
        updateProductPositionId: id,
      },
    });
    setCheckedProduct([]);
  };

  const onToggleClick = (
    id: string,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    productIsVisibleToggle({ variables: { productIsVisibleToggleId: id } });
  };

  const onChangeNumberHandle = (id: string, position: number) => {
    const updatedTableData = [...tableData];
    const targetIndex = updatedTableData.findIndex(
      (product) => product.id === id,
    );
    if (targetIndex !== -1) {
      updatedTableData[targetIndex] = {
        ...updatedTableData[targetIndex],
        position: position,
      };
      setTableData(updatedTableData);
    }
  };

  const [findManyProductByAdmin] = useLazyQuery<
    findManyProductByAdmin,
    findManyProductByAdminVariables
  >(FIND_MANY_PRODUCT_BY_ADMIN, {
    onError: (e) => message.error(e.message ?? `${e}`),
    onCompleted(data) {
      setTableData(data.findManyProductByAdmin.products);
      setTotalCount(data.findManyProductByAdmin.totalCount);
    },
  });

  const [deleteProduct] = useMutation(DELETE_PRODUCT, {
    onError: (e) => message.error(e.message ?? `${e}`),
    onCompleted(_data) {
      findManyProductByAdmin({
        variables: {
          take,
          skip,
        },
        fetchPolicy: 'no-cache',
      });
      showSuccessMessage('상품을 삭제했습니다.');
    },
  });

  const [productIsVisibleToggle] = useMutation<
    productIsVisibleToggle,
    productIsVisibleToggleVariables
  >(PRODUCT_IS_VISIBLE_TOGGLE, {
    onError: (e) => message.error(e.message ?? `${e}`),
    onCompleted(_data) {
      message.success('상품의 노출여부를 수정했습니다.');
    },
  });

  const [updateProductPosition] = useMutation<
    updateProductPosition,
    updateProductPositionVariables
  >(UPDATE_PRODUCT_POSITION, {
    onError: (e) => message.error(e.message ?? `${e}`),
    onCompleted(_data) {
      message.success('상품의 노출순위를 수정했습니다.');
    },
  });

  useEffect(() => {
    setAllChecked(
      checkedProduct?.length !== 0 &&
        tableData?.length <= checkedProduct?.length,
    );
    findManyProductByAdmin({
      variables: { take, skip },
      fetchPolicy: 'no-cache',
    });

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [skip, take, checkedProduct]);

  return (
    <div>
      <S.Title style={{ fontSize: '20px', fontWeight: 'bold' }}>
        상품목록
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
          <S.AddBtn onClick={() => navigate('/product/add')}>
            <EditOutlined />
            <p>상품등록</p>
          </S.AddBtn>
        </S.BtnWrap>
      </S.Container>

      {moreVisible && (
        <SearchMore
          stock={false}
          changeHandle={changeHandle}
          searchHandle={onSearchHandle}
        />
      )}

      <S.Dashed />
      <S.FilterContainer
        style={{
          flexDirection: windowWidth > 600 ? 'row' : 'column',
        }}
      >
        <S.FilterWrap>
          <Button onClick={(e) => onDeleteHandle(undefined, e)}>
            선택삭제
          </Button>
        </S.FilterWrap>
      </S.FilterContainer>
      <Table
        columns={productListColumns({
          checkedProduct,
          allChecked,
          onChecked,
          onToggleClick,
          onEditHandle,
          onDeleteHandle,
          onChangeNumberHandle,
        })}
        dataSource={tableData}
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
        onRow={(rec) => {
          return {
            onClick: () => navigate(`/product/add/${rec.id}`),
          };
        }}
        rowKey={(rec) => rec.id}
        scroll={{ x: 800 }}
      />
    </div>
  );
}
