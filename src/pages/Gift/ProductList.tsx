import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import * as S from './style';
import { DropdownComponent } from '../../components/Dropdown';
import { SearchDetail } from '../../components/Product';

export function ProductList() {
  const serchMenu = ['전체', '1', '2', '3'];

  const dropdownArrs = [
    ['전체', '1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
  ];

  const dropSaveNames = ['d', 'r', 'o', 'p'];

  const checkBoxArr = ['a', 'b', 'c'];

  const onSubmitHandle = (serchText: string) => {
    // 검색요청 넣기
    console.log(serchText);
  };

  const changeHandle = (key: string, serchCategory: string) => {
    // 검색 variables에 세팅
    console.log(key, serchCategory);
  };

  return (
    <div>
      <S.Wrap>
        <DropdownComponent
          saveName={'serchFilter'}
          menus={serchMenu}
          changeHandle={changeHandle}
        />
        <Input.Search onSearch={onSubmitHandle} />
        <S.Btn>
          <PlusOutlined />
          <p>상세검색</p>
        </S.Btn>
      </S.Wrap>
      <p style={{ fontSize: '15px', fontWeight: 'bold' }}>Search</p>
      <SearchDetail
        title={'카테고리'}
        dropdownArrs={dropdownArrs}
        saveNames={dropSaveNames}
        changeHandle={changeHandle}
      />
      <SearchDetail
        title={'상품타입'}
        checkBoxArr={checkBoxArr}
        changeHandle={changeHandle}
        saveNames={dropSaveNames}
      />
    </div>
  );
}
