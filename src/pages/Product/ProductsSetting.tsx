import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Table } from 'antd';
import * as S from './style';
import { DropdownComponent } from '../../components/Dropdown';
import { SearchDetailRow } from '../../components/Product';
import { ProductSettingType, productSettingColumns } from '../../utils/columns';
import { SearchMore } from '../../components/Product/SearchMore/SearchMore';

export function ProductsSetting() {
  const [take, setTake] = useState(10);
  const [skip, setSkip] = useState(0);
  const [current, setCurrent] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [moreVisible, setMoreVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [checkedProduct, setCheckedProduct] = useState<number[]>([]);
  const [checkAllState, setCheckAllState] = useState(false);

  const [variables, setVariables] = useState<ProductSettingType[]>([]);
  const [data, setData] = useState<ProductSettingType[]>([]);

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
      variables.map((data) => setCheckedProduct((prev) => [...prev, data.id]));
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
    setCheckedProduct([]);
    setCheckAllState(false);
  };

  const onEditHandle = () => {
    //TODO: 수정요청 연결 id는 chececkedProduct에 있음
    setCheckedProduct([]);
    setCheckAllState(false);
  };

  const onToggleClick = (id: number) => {};

  const onChangeHandle = (id: number, key: string, value: number) => {
    const updatedTableData = [...data];
    const targetIndex = updatedTableData.findIndex(
      (product) => product.id === id,
    );
    if (targetIndex !== -1) {
      updatedTableData[targetIndex] = {
        ...updatedTableData[targetIndex],
        [key]: value,
      };
      setData(updatedTableData);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    setData([
      {
        id: 1,
        visible: true,
        name: 'string',
        imgUrl: 'https://danonline.kr/snoopym/images/redpop.png?crc=92367325',
        supplyPlice: 1000,
        originPrice: 1000,
        price: 1000,
        count: 1000,
        accumulationRate: 1000,
        firstCategory: 'string',
        secondCategory: 'string',
        code: 'dadwad-dwadwa-ddad',
        createdAt: new Date(),
      },
    ]);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
          <Button onClick={() => checkAll(!checkAllState)}>전체선택</Button>
          <Button onClick={onDeleteHandle}>선택삭제</Button>
        </S.FilterWrap>
        <S.Flex>
          <DropdownComponent
            menus={['20개', '50개', '100개']}
            saveName={'solt'}
            changeHandle={onChangeFilter}
          />
        </S.Flex>
      </S.FilterContainer>
      <Table
        columns={productSettingColumns({
          checkAllState,
          checkedProduct,
          checkAll,
          onCheckRow,
          onToggleClick,
          onChangeHandle,
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
