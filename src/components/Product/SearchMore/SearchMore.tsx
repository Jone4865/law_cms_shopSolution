import React, { useState } from 'react';
import { Button } from 'antd';
import * as S from '../../../pages/Product/style';
import { SearchDetailRow } from '../';

type Props = {
  changeHandle: (key: string, serchCategory: string) => void;
};

export function SearchMore({ changeHandle }: Props) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  return (
    <div>
      <>
        <S.SearchTitle>Search</S.SearchTitle>
        <S.Grid
          style={{
            gridTemplateColumns:
              windowWidth > 600 ? 'repeat(2, 50%)' : 'repeat(1, 100%)',
          }}
        >
          <SearchDetailRow
            title={'카테고리'}
            dropdownArrs={[
              ['1차분류선택', '1', '2', '3'],
              ['2차분류선택', '5', '6'],
            ]}
            saveNames={['d', 'r', 'o', 'p']}
            changeHandle={changeHandle}
          />
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
        </S.Grid>
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
        <S.BottomBtnWrap>
          <Button type="primary">검색</Button>
        </S.BottomBtnWrap>
      </>
    </div>
  );
}
