import { Button, message } from 'antd';
import * as S from './style';
import { useEffect, useState } from 'react';
import { AddOption } from './OptionDetail/AddOption';
import { CheckOutlined } from '@ant-design/icons';
type Props = {
  windowWidth: number;
  secondOptionArr:
    | {
        id: string;
        name: string;
        extraPrice: number;
        finalPrice: number;
        stock: number;
        parent?: string;
      }[]
    | undefined;
  firstOptionArr: {
    id: string;
    name: string;
    extraPrice: number;
    finalPrice: number;
    stock: number;
    children?:
      | {
          name: string;
          extraPrice: number;
          finalPrice: number;
          stock: number;
        }[]
      | undefined;
  }[];
  parentOption: string;
  newOption:
    | {
        name: string;
        extraPrice: number;
        finalPrice: number;
        stock: number;
      }
    | undefined;
  onChangeHandle: (key: string, value: string | number | boolean) => void;
  handleClickAddOption: () => void;
  setParentOption: React.Dispatch<React.SetStateAction<string>>;
  setParentOptionId: React.Dispatch<React.SetStateAction<string>>;
  handleDeleteOption: (name: string, id: string, parentName?: string) => void;
  essential?: boolean;
};

export function Option({
  newOption,
  firstOptionArr,
  secondOptionArr,
  parentOption,
  windowWidth,
  handleClickAddOption,
  onChangeHandle,
  setParentOption,
  setParentOptionId,
  handleDeleteOption,
  essential,
}: Props) {
  const [ableParentOption, setAbleParentOption] = useState('');
  const [ableSecondOption, setAbleSecondOption] = useState('');
  const [optionMoreVisible, setOptionMoreVisible] = useState(false);

  const onAddClick = () => {
    setOptionMoreVisible(false);
    handleClickAddOption();
    setAbleParentOption('');
  };

  const onClickFirstRow = (name: string, id: string) => {
    setAbleParentOption(name);
    setParentOption(name);
    setParentOptionId(id);
    setAbleSecondOption('');
  };
  const onClickSecondRow = (name: string) => {
    setAbleSecondOption(name);
  };

  const onClickAdd = (parent: boolean) => {
    setOptionMoreVisible(!optionMoreVisible);
    if (parent) {
      setParentOption('');
    }
  };

  useEffect(() => {}, []);

  return (
    <>
      <S.AddTitleLine>
        {essential && (
          <CheckOutlined style={{ color: 'red', marginRight: '5px' }} />
        )}
        옵션 선택<S.Ex>(ex.사이즈, 컬러)</S.Ex>
      </S.AddTitleLine>
      <S.Flex>
        <S.CategoryContainer>
          <S.CategoryTitle>
            <span>1차 메뉴</span>
            <Button onClick={() => onClickAdd(true)}>추가</Button>
          </S.CategoryTitle>
          <S.CategoryWrap>
            {firstOptionArr &&
              firstOptionArr.map((arr, idx) => (
                <S.CategoryArrContainer
                  key={idx}
                  onClick={() => onClickFirstRow(arr.name, arr.id)}
                  style={{
                    backgroundColor:
                      ableParentOption === arr.name ? '#53dad129' : '',
                  }}
                >
                  <S.Flex>
                    <S.AddContent>{arr.name}</S.AddContent>
                    <S.AddContent>
                      추가금:{' '}
                      {arr.extraPrice
                        ?.toString()
                        .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
                      원
                    </S.AddContent>
                    <S.AddContent>
                      가격:{' '}
                      {arr.finalPrice
                        ?.toString()
                        .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
                      원
                    </S.AddContent>
                    <S.AddContent>
                      재고량:{' '}
                      {secondOptionArr?.filter(
                        (data) => data.parent === arr.name,
                      )?.length === 0
                        ? arr.stock
                            ?.toString()
                            .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
                        : secondOptionArr
                            ?.filter((data) => data.parent === arr.name)
                            .reduce((acc, data) => acc + Number(data.stock), 0)}
                      개
                    </S.AddContent>
                  </S.Flex>
                  <Button onClick={() => handleDeleteOption(arr.name, arr.id)}>
                    삭제
                  </Button>
                </S.CategoryArrContainer>
              ))}
          </S.CategoryWrap>
        </S.CategoryContainer>
        <S.CategoryContainer>
          <S.CategoryTitle>
            <span>2차 메뉴</span>
            <Button
              onClick={() =>
                ableParentOption
                  ? onClickAdd(false)
                  : message.warn('1차 카테고리를 선택해주세요.')
              }
            >
              추가
            </Button>
          </S.CategoryTitle>
          <S.CategoryWrap>
            {secondOptionArr &&
              secondOptionArr.map(
                (arr, idx) =>
                  arr.parent === parentOption && (
                    <S.CategoryArrContainer
                      style={{
                        backgroundColor:
                          ableSecondOption === arr.name ? '#53dad129' : '',
                      }}
                      onClick={() => onClickSecondRow(arr.name)}
                      key={idx}
                    >
                      <S.Flex>
                        <S.AddContent>{arr.name}</S.AddContent>
                        <S.AddContent>
                          추가금:{' '}
                          {arr.extraPrice
                            ?.toString()
                            .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
                          원
                        </S.AddContent>
                        <S.AddContent>
                          가격:{' '}
                          {arr.finalPrice
                            ?.toString()
                            .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
                          원
                        </S.AddContent>
                        <S.AddContent>
                          재고량:{' '}
                          {arr.stock
                            ?.toString()
                            .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
                          개
                        </S.AddContent>
                      </S.Flex>
                      <Button
                        onClick={() =>
                          handleDeleteOption(arr.name, arr.id, arr.parent)
                        }
                      >
                        삭제
                      </Button>
                    </S.CategoryArrContainer>
                  ),
              )}
          </S.CategoryWrap>
        </S.CategoryContainer>
      </S.Flex>
      {optionMoreVisible && (
        <AddOption
          windowWidth={windowWidth}
          onChangeHandle={onChangeHandle}
          newOption={newOption}
          handleClickAddOption={onAddClick}
        />
      )}
    </>
  );
}
