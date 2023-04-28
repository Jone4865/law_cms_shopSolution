import React, { useEffect, useState } from 'react';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Form, Input, Table } from 'antd';
import * as S from './style';
import { DropdownComponent } from '../../components/Dropdown';
import { SearchDetailRow } from '../../components/Product';
import { ProductListType, productListColumns } from '../../utils/columns';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

export function ProductList() {
  const [take, setTake] = useState(10);
  const [skip, setSkip] = useState(0);
  const [current, setCurrent] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [moreVisible, setMoreVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [checkedProduct, setCheckedProduct] = useState<number[]>([]);
  const [checkAllState, setCheckAllState] = useState(false);

  const [productData, setProductData] = useState<ProductListType[]>([
    {
      id: 0,
      count: 1000,
      createdAt: 'dd',
      price: 1000,
      product: ['dadaw', 'dadaw'],
      rank: 1000,
      state: 1,
      visible: true,
    },
  ]);

  const dropdownArrs = [
    ['1차분류선택', '1', '2', '3'],
    ['2차분류선택', '5', '6'],
    ['3차분류선택', '8', '9'],
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

  const onCheckRow = (id: number) => {
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
      productData.map((data) =>
        setCheckedProduct((prev) => [...prev, data.id]),
      );
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

  const onDeleteHandle = () => {
    //TODO: 삭제요청 연결 id는 chececkedProduct에 있음
  };

  const onEditHandle = () => {
    //TODO: 수정요청 연결 id는 chececkedProduct에 있음
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
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
        <S.BtnWrap>
          <S.MoreBtn onClick={() => setMoreVisible(!moreVisible)}>
            <PlusOutlined />
            <p>상세검색</p>
          </S.MoreBtn>
          <S.AddBtn onClick={() => ''}>
            <EditOutlined />
            <p>상품등록</p>
          </S.AddBtn>
        </S.BtnWrap>
      </S.Container>

      {moreVisible && (
        <>
          <S.SearchTitle>Search</S.SearchTitle>
          <SearchDetailRow
            title={'카테고리'}
            dropdownArrs={dropdownArrs}
            saveNames={['d', 'r', 'o', 'p']}
            changeHandle={changeHandle}
          />
          <S.Grid
            style={{
              gridTemplateColumns:
                windowWidth > 600 ? 'repeat(2, 50%)' : 'repeat(1, 100%)',
            }}
          >
            <SearchDetailRow
              title={'노출여부'}
              checkBoxArr={['전체', '노출', '숨김']}
              changeHandle={changeHandle}
              saveNames={['d', 'r', 'o', 'p']}
            />
            <SearchDetailRow
              title={'판매기간'}
              checkBoxArr={['전체', '상시판매', '판매전', '판매중', '판매종료']}
              changeHandle={changeHandle}
              saveNames={['d', 'r', 'o', 'p']}
            />
          </S.Grid>
          <S.Grid
            style={{
              gridTemplateColumns:
                windowWidth > 600 ? 'repeat(2, 50%)' : 'repeat(1, 100%)',
            }}
          >
            <SearchDetailRow
              title={'재고검색'}
              checkBoxArr={[
                '전체',
                '품절',
                '1개~50개',
                '50개~100개',
                '100개 초과',
              ]}
              changeHandle={changeHandle}
              saveNames={['d', 'r', 'o', 'p']}
            />
            <SearchDetailRow
              title={'과세여부'}
              checkBoxArr={['전체', '과세', '면세']}
              changeHandle={changeHandle}
              saveNames={['d', 'r', 'o', 'p']}
            />
          </S.Grid>
          <S.BottomBtnWrap>
            <Button type="primary">검색</Button>
          </S.BottomBtnWrap>
        </>
      )}
      <S.Dashed />
      <S.FilterContainer
        style={{
          flexDirection: windowWidth > 600 ? 'row' : 'column',
        }}
      >
        <S.FilterWrap>
          <Button onClick={() => checkAll(!checkAllState)}>전체선택</Button>
          <Button onClick={onDeleteHandle}>선택삭제</Button>
          <Button onClick={onEditHandle} type="primary">
            선택순위수정
          </Button>
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
            saveName={'solt'}
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
        })}
        dataSource={productData}
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
        // loading={loading}
        scroll={{ x: 800 }}
      />
    </div>
  );
}
