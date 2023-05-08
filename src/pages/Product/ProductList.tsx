import React, { useEffect, useState } from 'react';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import { Navigate, useNavigate } from 'react-router-dom';
import { Button, Form, Input, Table, message } from 'antd';
import * as S from './style';
import { DropdownComponent } from '../../components/Dropdown';
import { ProductListType, productListColumns } from '../../utils/columns';
import { SearchMore } from '../../components/Product/SearchMore/SearchMore';
import { useLazyQuery } from '@apollo/client';
import { FIND_MANY_PRODUCT } from '../../graphql/query/findManyProduct';
import {
  findManyProduct,
  findManyProductVariables,
} from '../../graphql/generated/findManyProduct';

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
  const [checkAllState, setCheckAllState] = useState(false);

  const [variables, setVariables] = useState<ProductListType[]>([]);
  const [tableData, setTableData] = useState<
    findManyProduct['findManyProduct']['products']
  >([]);

  const dropdownArrs = [
    ['1차분류선택', '1', '2', '3'],
    ['2차분류선택', '5', '6'],
  ];

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

  const onCheckRow = (id: string) => {
    if (checkedProduct.includes(id)) {
      setCheckedProduct((prev) => prev.filter((v) => v !== id));
    } else {
      setCheckedProduct((prev) => [...prev, id]);
    }
    setCheckAllState(false);
  };

  const checkAll = (state: boolean) => {
    setCheckAllState(state);
    if (state) {
      setCheckedProduct(tableData.map((v) => v.id));
    } else {
      setCheckedProduct([]);
    }
  };

  const onChangeFilter = (key: string, serchCategory: string) => {
    //TODO: 필터링 기능 적용
    setCurrent(1);
    setSkip(0);
    setSearchText('');
  };

  const onDeleteHandle = (id: string | undefined) => {
    if (id === undefined) {
      //TODO: 선택 삭제요청 연결 id는 chececkedProduct에 있음 map으로 요청
    } else {
      //한개 삭제요청 연결
    }
    setCheckedProduct([]);
    setCheckAllState(false);
  };

  const onEditHandle = (id: string, number: number) => {
    //TODO: 수정요청 연결
    console.log(id, number);
    setCheckedProduct([]);
    setCheckAllState(false);
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
      console.log(data.findManyProduct.products);
      setTableData(data.findManyProduct.products);
      setTotalCount(data.findManyProduct.totalCount);
    },
  });

  useEffect(() => {
    findManyProduct({
      variables: {
        take: 10,
      },
    });

    setCheckAllState(
      checkedProduct?.length === tableData?.length ? true : false,
    );
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [checkedProduct, tableData]);

  return (
    <div>
      <S.Title style={{ fontSize: '20px', fontWeight: 'bold' }}>
        상품관리
      </S.Title>
      <S.Line />
      <S.Container
        style={{ flexDirection: windowWidth < 850 ? 'column' : 'row' }}
      >
        <S.Wrap>
          <DropdownComponent
            saveName={'serchFilter'}
            menus={['전체', '상품명', '상품코드']}
            changeHandle={changeHandle}
          />
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
          checkAllState,
          checkedProduct,
          checkAll,
          onCheckRow,
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
