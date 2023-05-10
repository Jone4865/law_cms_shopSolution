import React, { useEffect, useState } from 'react';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import { Navigate, useNavigate } from 'react-router-dom';
import { Button, Form, Input, Table, message } from 'antd';
import * as S from './style';
import { DropdownComponent } from '../../components/Dropdown';
import { productListColumns } from '../../utils/columns';
import { SearchMore } from '../../components/Product/SearchMore/SearchMore';
import { useLazyQuery, useMutation } from '@apollo/client';
import { FIND_MANY_PRODUCT } from '../../graphql/query/findManyProduct';
import {
  findManyProduct,
  findManyProductVariables,
} from '../../graphql/generated/findManyProduct';
import { DELETE_PRODUCT } from '../../graphql/mutation/deleteProduct';

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
  const [variables, setVariables] = useState<[]>([]);
  const [tableData, setTableData] = useState<
    findManyProduct['findManyProduct']['products']
  >([]);

  const onChecked = (productId?: string, all?: boolean) => {
    if (!all && productId) {
      setCheckedProduct((prev) =>
        prev.includes(productId)
          ? prev.filter((id) => id !== productId)
          : [...prev, productId],
      );
    } else {
      tableData.map((data) =>
        setCheckedProduct((prev) => (all ? [...prev, data.id] : [])),
      );
    }
  };

  const onSubmitHandle = (values: { searchText?: string }) => {
    //TODO: 검색요청
    setCurrent(1);
    setSkip(0);
    setSearchText(values.searchText ?? '');
  };

  const changeHandle = (key: string, serchCategory: string) => {
    //TODO: 검색 variables에 세팅
  };

  const handlePagination = (e: number) => {
    setCurrent(e);
    setSkip((e - 1) * take);
  };

  const onChangeFilter = (key: string, serchCategory: string) => {
    //TODO: 필터링 기능 적용
    setCurrent(1);
    setSkip(0);
    setSearchText('');
  };

  const onDeleteHandle = (id: string | undefined) => {
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

  const onEditHandle = (id: string, number: number) => {
    //TODO: 수정요청 연결
    setCheckedProduct([]);
  };

  const onToggleClick = (id: string) => {
    console.log(id);
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

  const [findManyProduct] = useLazyQuery<
    findManyProduct,
    findManyProductVariables
  >(FIND_MANY_PRODUCT, {
    onError: (e) => message.error(e.message ?? `${e}`),
    onCompleted(data) {
      setTableData(data.findManyProduct.products);
      setTotalCount(data.findManyProduct.totalCount);
    },
  });

  const [deleteProduct] = useMutation(DELETE_PRODUCT, {
    onError: (e) => message.error(e.message ?? `${e}`),
    onCompleted(_data) {
      message.success('상품을 삭제했습니다.');
      findManyProduct({
        variables: {
          take: 10,
        },
        fetchPolicy: 'no-cache',
      });
    },
  });

  useEffect(() => {
    setAllChecked(
      checkedProduct?.length !== 0 &&
        tableData?.length === checkedProduct?.length,
    );
    findManyProduct({
      variables: {
        take,
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
  }, [checkedProduct, allChecked]);

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

      {moreVisible && <SearchMore changeHandle={changeHandle} />}

      <S.Dashed />
      <S.FilterContainer
        style={{
          flexDirection: windowWidth > 600 ? 'row' : 'column',
        }}
      >
        <S.FilterWrap>
          <Button onClick={() => onDeleteHandle(undefined)}>선택삭제</Button>
        </S.FilterWrap>
        <S.Flex>
          <DropdownComponent
            menus={[
              '등록일 ▼',
              '등록일 ▲',
              '순위순 ▼',
              '순위순 ▲',
              '상품명 ▼',
              '상품명 ▲',
              '판매가 ▼',
              '판매가 ▲',
              '재고량 ▼',
              '재고량 ▲',
              '판매량 ▼',
              '판매량 ▲',
            ]}
            saveName={'solt'}
            changeHandle={onChangeFilter}
          />
          <DropdownComponent
            menus={['20개', '50개', '100개']}
            saveName={'solt2'}
            changeHandle={onChangeFilter}
          />
        </S.Flex>
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
        rowKey={(rec) => rec.id}
        scroll={{ x: 800 }}
      />
    </div>
  );
}
