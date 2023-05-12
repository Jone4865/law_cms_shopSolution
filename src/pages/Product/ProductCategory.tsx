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
import { CheckOutlined } from '@ant-design/icons';

type Props = {
  isAdd?: boolean;
  saveName?: string;
  essential?: boolean;
  handleChange?: (key: string, value: string) => void;
};

export function ProductCategory({
  isAdd,
  saveName,
  essential,
  handleChange,
}: Props) {
  const [isEdit, setIsEdit] = useState(false);
  const [parentId, setParentId] = useState('');
  const [categoryMoreVisible, setCategoryMoreVisible] = useState(false);
  const [ableCategoryId, setAbleCategoryId] = useState<string>();
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

  const changeHandleCategoryVariables = (
    key: string,
    value: string | boolean | number,
  ) => {
    setAbleCategoryVariables((prev: any) => {
      let newVariables = { ...prev };
      newVariables[key] = value;
      return newVariables;
    });
  };

  const handleRefetch = () => {
    findManyProductCategory({
      variables: {},
      onCompleted(data) {
        setFirstCategoryArr(data.findManyProductCategory.productCategories);
      },
      fetchPolicy: 'no-cache',
    });
    setParentId('');
    setSecondCategoryArr([]);
    setCategoryMoreVisible(false);
  };

  const onClickRow = (
    id: string,
    arr: findManyProductCategory['findManyProductCategory']['productCategories'][0],
    parent?: boolean,
  ) => {
    setAbleCategoryId(id);
    if (handleChange) {
      handleChange(saveName ? saveName : '', id);
    }
    if (!isAdd) {
      setCategoryMoreVisible(true);
      setIsEdit(true);
    } else {
      setCategoryMoreVisible(false);
    }
    if (parent) {
      setParentId(id);
      findManyProductCategory({
        variables: {
          parentId: id,
        },
        onCompleted(data) {
          setSecondCategoryArr(data.findManyProductCategory.productCategories);
        },
        fetchPolicy: 'no-cache',
      });
    }
    setAbleCategoryVariables(arr);
  };

  const onClickAddBtn = (children?: boolean) => {
    setCategoryMoreVisible(true);
    setAbleCategoryVariables({
      isVisible: false,
      createdAt: new Date(),
      id: '',
      name: '',
      children: [],
    });
    setIsEdit(false);
    if (!children) {
      setParentId('');
      setSecondCategoryArr([]);
    }
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
        setFirstCategoryArr(data.findManyProductCategory.productCategories);
      },
      fetchPolicy: 'no-cache',
    });
  }, []);

  return (
    <>
      {!isAdd ? (
        <>
          <S.Title>상품 카테고리</S.Title>
          <S.Line />
        </>
      ) : (
        <S.AddTitleLine>
          {essential && (
            <CheckOutlined style={{ color: 'red', marginRight: '5px' }} />
          )}
          카테고리 선택
        </S.AddTitleLine>
      )}
      <S.Flex>
        <S.CategoryContainer>
          <S.CategoryTitle>
            <span>1차 메뉴</span>
            <Button onClick={() => onClickAddBtn()}>추가</Button>
          </S.CategoryTitle>
          <S.CategoryWrap>
            {firstCategoryArr &&
              firstCategoryArr.map((arr) => (
                <S.CategoryArrContainer
                  key={arr.id}
                  onClick={() => onClickRow(arr.id, arr, true)}
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
                </S.CategoryArrContainer>
              ))}
          </S.CategoryWrap>
        </S.CategoryContainer>
        <S.CategoryContainer>
          <S.CategoryTitle>
            <span>2차 메뉴</span>
            <Button
              onClick={() =>
                parentId
                  ? onClickAddBtn(true)
                  : message.warn('1차 카테고리를 선택해주세요.')
              }
            >
              추가
            </Button>
          </S.CategoryTitle>
          <S.CategoryWrap>
            {secondCategoryArr &&
              secondCategoryArr.map((arr) => (
                <S.CategoryArrContainer
                  style={{
                    backgroundColor:
                      ableCategoryVariables.id === arr.id ? '#53dad129' : '',
                  }}
                  onClick={() => onClickRow(arr.id, arr)}
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
                </S.CategoryArrContainer>
              ))}
          </S.CategoryWrap>
        </S.CategoryContainer>
      </S.Flex>
      {categoryMoreVisible && (
        <CategoryDetail
          ableCategoryId={ableCategoryId}
          isAdd={isAdd ? true : false}
          data={ableCategoryVariables}
          isEdit={isEdit}
          onChangeHandleCategoryVariables={changeHandleCategoryVariables}
          name={ableCategoryVariables?.name}
          visible={ableCategoryVariables?.isVisible}
          handleRefetch={handleRefetch}
          parentId={parentId}
        />
      )}
    </>
  );
}
