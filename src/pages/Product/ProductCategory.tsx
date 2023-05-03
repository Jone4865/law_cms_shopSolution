import { Button } from 'antd';
import * as S from './style';
import { useEffect, useState } from 'react';
import { CategoryDetail } from '../../components/Product';

export function ProductCategory() {
  const [firstCategoryArr, setFirstCategoryArr] = useState<
    { id: number; name: string; visible: boolean }[]
  >([]);
  const [secondCategoryArr, setSecondCategoryArr] = useState<
    { id: number; name: string; visible: boolean }[]
  >([]);
  const [visible, setVisible] = useState(false);
  const [variables, setVariables] = useState([]);
  const [id, setId] = useState<number>(0);

  const onClickRow = (id: number) => {
    //TODO: 1차 카테고리 클릭시 해당 아이디로 2차 카테고리 받아서 세팅 해주기
    setId(id);
  };

  const onClickEdit = (id: number) => {
    //TODO: 로우 수정 버튼 클릭시 해당 아이디로 수정 할 상품 아이디 세팅하기
    // 수정 페이지로 이동
    setVisible(true);
  };

  useEffect(() => {
    //TODO: 1차 카테고리 받아서 세팅해주기
    setFirstCategoryArr([
      { id: 1, name: 'dadwa', visible: true },
      { id: 2, name: 'dadwa', visible: true },
      { id: 3, name: 'dadwa', visible: true },
      { id: 4, name: 'dadwa', visible: false },
      { id: 5, name: 'dadwa', visible: true },
      { id: 6, name: 'dadwa', visible: true },
      { id: 7, name: 'dadwa', visible: true },
      { id: 8, name: 'dadwa', visible: true },
    ]);
  }, [secondCategoryArr]);

  return (
    <>
      <S.Title>상품 카테고리</S.Title>
      <S.Line />
      <S.Flex>
        <S.CategoryContainer>
          <S.CategoryTitle>1차 메뉴</S.CategoryTitle>
          <S.CategoryWrap>
            {firstCategoryArr &&
              firstCategoryArr.map((arr) => (
                <S.CategoryArrContainer
                  key={arr.id}
                  onClick={() => onClickRow(arr.id)}
                >
                  <S.Flex>
                    {arr.visible ? (
                      <S.VisibleDiv>노출</S.VisibleDiv>
                    ) : (
                      <S.EnVisibleDiv>비노출</S.EnVisibleDiv>
                    )}
                    <span>{arr.name}</span>
                  </S.Flex>
                  <S.EditBtn onClick={() => onClickEdit(arr.id)}>
                    수정
                  </S.EditBtn>
                </S.CategoryArrContainer>
              ))}
          </S.CategoryWrap>
        </S.CategoryContainer>
        <S.CategoryContainer>
          <S.CategoryTitle>2차 메뉴</S.CategoryTitle>
          <S.CategoryWrap>
            {secondCategoryArr &&
              secondCategoryArr.map((arr) => (
                <S.CategoryArrContainer key={arr.id}>
                  <S.Flex>
                    {arr.visible ? (
                      <S.VisibleDiv>노출</S.VisibleDiv>
                    ) : (
                      <S.EnVisibleDiv>비노출</S.EnVisibleDiv>
                    )}
                    <span>{arr.name}</span>
                  </S.Flex>
                  <S.EditBtn onClick={() => onClickEdit(arr.id)}>
                    수정
                  </S.EditBtn>
                </S.CategoryArrContainer>
              ))}
          </S.CategoryWrap>
        </S.CategoryContainer>
      </S.Flex>
      {visible && <CategoryDetail id={id !== 0 ? id : undefined} />}
    </>
  );
}
