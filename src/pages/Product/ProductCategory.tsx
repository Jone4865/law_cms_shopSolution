import { Button, message } from 'antd';
import * as S from './style';
import { useEffect, useState } from 'react';
import { CategoryDetail } from '../../components/Product';
import { FIND_MANY_PRODUCT_CATEGORY } from '../../graphql/query/findManyProductCategory';
import { useLazyQuery } from '@apollo/client';
import {
  findManyProductCategory,
  findManyProductCategoryVariables,
} from '../../graphql/generated/findManyProductCategory';

export function ProductCategory() {
  const [isEdit, setIsEdit] = useState(false);
  const [parentId, setParentId] = useState('');
  const [categoryMoreVisible, setCategoryMoreVisible] = useState(false);
  const [ableCategoryVariables, setAbleCategoryVariables] = useState<
    findManyProductCategory['findManyProductCategory']['productCategories'][0]
  >({
    isVisible: false,
    createdAt: new Date(),
    id: '',
    name: '',
    children: [],
  });
  const [firstCategoryArr, setFirstCategoryArr] = useState<
    findManyProductCategory['findManyProductCategory']['productCategories']
  >([]);
  const [secondCategoryArr, setSecondCategoryArr] = useState<
    findManyProductCategory['findManyProductCategory']['productCategories']
  >([]);

  const onClickRow = (id: string) => {
    setCategoryMoreVisible(false);
    setParentId(id);
    findManyProductCategory({
      variables: {
        take: 10,
        parentId: id,
      },
      onCompleted(data) {
        setSecondCategoryArr(data.findManyProductCategory.productCategories);
      },
    });
  };

  const onClickRowEdit = (
    arr: findManyProductCategory['findManyProductCategory']['productCategories'][0],
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    //TODO: 로우 수정 버튼 클릭시 해당 아이디로 수정 할 상품 아이디 세팅하기
    setAbleCategoryVariables(arr);
    setCategoryMoreVisible(true);
    setIsEdit(true);
    e.stopPropagation();
  };

  const onClickAddCategory = () => {
    setAbleCategoryVariables({
      isVisible: false,
      createdAt: new Date(),
      id: '',
      name: '',
      children: [],
    });
    setIsEdit(false);
    setCategoryMoreVisible(true);
  };

  const changeHandleCategoryVariables = (
    key: string,
    value: string | boolean,
  ) => {
    setAbleCategoryVariables((prev: any) => {
      let newVariables = { ...prev };
      newVariables[key] = value;
      return newVariables;
    });
  };

  const [findManyProductCategory] = useLazyQuery<
    findManyProductCategory,
    findManyProductCategoryVariables
  >(FIND_MANY_PRODUCT_CATEGORY, {
    onError: (e) => message.error(e.message ?? `${e}`),
  });

  useEffect(() => {
    findManyProductCategory({
      variables: {
        take: 10,
      },
      onCompleted(data) {
        setFirstCategoryArr(data.findManyProductCategory.productCategories);
      },
    });
  }, [isEdit]);

  return (
    <>
      <S.Title>상품 카테고리</S.Title>
      <S.Line />
      <S.Flex>
        <S.CategoryContainer>
          <S.CategoryTitle>
            <span>1차 메뉴</span>
            <Button onClick={() => onClickAddCategory()}>추가</Button>
          </S.CategoryTitle>
          <S.CategoryWrap>
            {firstCategoryArr &&
              firstCategoryArr.map((arr) => (
                <S.CategoryArrContainer
                  key={arr.id}
                  onClick={() => onClickRow(arr.id)}
                  style={{
                    backgroundColor: parentId === arr.id ? '#53dad129' : '',
                  }}
                >
                  <S.Flex>
                    {arr.isVisible ? (
                      <S.VisibleDiv>노출</S.VisibleDiv>
                    ) : (
                      <S.EnVisibleDiv>비노출</S.EnVisibleDiv>
                    )}
                    <span>{arr.name}</span>
                  </S.Flex>
                  <S.EditBtn
                    onClick={(e) => {
                      onClickRowEdit(arr, e);
                      setParentId(arr.id);
                    }}
                  >
                    수정
                  </S.EditBtn>
                </S.CategoryArrContainer>
              ))}
          </S.CategoryWrap>
        </S.CategoryContainer>
        <S.CategoryContainer onClick={() => setCategoryMoreVisible(false)}>
          <S.CategoryTitle>
            <span>2차 메뉴</span>
            <Button onClick={() => onClickAddCategory()}>추가</Button>
          </S.CategoryTitle>
          <S.CategoryWrap>
            {secondCategoryArr &&
              secondCategoryArr.map((arr) => (
                <S.CategoryArrContainer
                  style={{
                    backgroundColor:
                      ableCategoryVariables.id === arr.id ? '#53dad129' : '',
                  }}
                  onClick={() => setAbleCategoryVariables(arr)}
                  key={arr.id}
                >
                  <S.Flex>
                    {arr.isVisible ? (
                      <S.VisibleDiv>노출</S.VisibleDiv>
                    ) : (
                      <S.EnVisibleDiv>비노출</S.EnVisibleDiv>
                    )}
                    <span>{arr.name}</span>
                  </S.Flex>
                  <S.EditBtn
                    onClick={(e) => {
                      onClickRowEdit(arr, e);
                    }}
                  >
                    수정
                  </S.EditBtn>
                </S.CategoryArrContainer>
              ))}
          </S.CategoryWrap>
        </S.CategoryContainer>
      </S.Flex>
      {categoryMoreVisible && (
        <CategoryDetail
          id={parentId !== '' ? +parentId : undefined}
          isEdit={isEdit}
          onChangeHandleCategoryVariables={changeHandleCategoryVariables}
          name={ableCategoryVariables?.name}
          visible={ableCategoryVariables?.isVisible}
        />
      )}
    </>
  );
}
