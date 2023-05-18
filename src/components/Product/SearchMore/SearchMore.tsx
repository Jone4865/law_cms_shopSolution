import React, { useEffect, useState } from 'react';
import { Button, UploadFile, message } from 'antd';
import * as S from '../../../pages/Product/style';
import { SearchDetailRow } from '../';
import { SearchDetailInput } from '../SearchDetailRow/SearchDetailInput';
import {
  findManyProductCategory,
  findManyProductCategoryVariables,
} from '../../../graphql/generated/findManyProductCategory';
import { useLazyQuery } from '@apollo/client';
import { FIND_MANY_PRODUCT_CATEGORY } from '../../../graphql/query/findManyProductCategory';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';

type Props = {
  searchHandle: () => void;
  changeHandle: (
    key: string,
    value:
      | string
      | number
      | boolean
      | UploadFile<any>[]
      | CheckboxValueType[]
      | undefined,
  ) => void;
  stock?: boolean;
};

export function SearchMore({
  searchHandle,
  changeHandle,
  stock = true,
}: Props) {
  const defaltArr: any[] = [{ name: '선택안함' }];
  const [firstCategoryArr, setFirstCategoryArr] = useState<
    findManyProductCategory['findManyProductCategory']['productCategories']
  >([]);
  const [secondCategoryArr, setSecondCategoryArr] =
    useState<
      findManyProductCategory['findManyProductCategory']['productCategories']
    >();

  const [value, setValue] = useState<number>();

  const onChangeHandle = (
    key: string,
    value:
      | string
      | number
      | boolean
      | UploadFile<any>[]
      | CheckboxValueType[]
      | undefined,
    first?: boolean,
  ) => {
    if (first) {
      const newFirstArrName = firstCategoryArr.find(
        (arr) => arr.name === value,
      );
      changeHandle(key, newFirstArrName ? newFirstArrName?.id : '');
      findManyProductCategory({
        variables: { parentId: newFirstArrName ? newFirstArrName.id : '' },
        onCompleted(data) {
          setSecondCategoryArr(data.findManyProductCategory.productCategories);
        },
      });
    } else if (secondCategoryArr) {
      const newSecondArrName = secondCategoryArr.find(
        (arr) => arr.name === value,
      );
      changeHandle(key, newSecondArrName ? newSecondArrName?.id : '');
    }
  };

  const onChangeInput = (key: string, value: string | number) => {
    setValue(+value);
  };

  const [findManyProductCategory] = useLazyQuery<
    findManyProductCategory,
    findManyProductCategoryVariables
  >(FIND_MANY_PRODUCT_CATEGORY, {
    onError: (e) => message.error(e.message ?? `${e}`),
  });

  useEffect(() => {
    findManyProductCategory({
      variables: {},
      onCompleted(data) {
        const newFirstCategoryArr = defaltArr.concat(
          data.findManyProductCategory.productCategories,
        );
        setFirstCategoryArr(newFirstCategoryArr);
      },
      fetchPolicy: 'no-cache',
    });
  }, []);

  return (
    <div>
      <>
        <S.SearchTitle>Search</S.SearchTitle>
        <SearchDetailRow
          title={'카테고리'}
          dropdownArrs={
            secondCategoryArr
              ? [firstCategoryArr, secondCategoryArr]
              : [firstCategoryArr]
          }
          saveNames={['productCategoryId', 'productCategoryId']}
          changeHandle={onChangeHandle}
        />
        <SearchDetailRow
          title={'노출여부'}
          checkBoxArr={['전체', '노출', '숨김']}
          changeHandle={changeHandle}
          saveNames={['isVisible', 'isVisible', 'isVisible']}
        />
        {stock && (
          <SearchDetailInput
            saveNames={['stock']}
            title="재고량"
            value={value}
            onChangeHandle={onChangeInput}
            type={'number'}
            unitName={'개'}
          />
        )}
        <S.BottomBtnWrap>
          <Button onClick={searchHandle}>검색</Button>
        </S.BottomBtnWrap>
      </>
    </div>
  );
}
