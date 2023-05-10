import React, { useEffect, useState } from 'react';
import * as S from './style';
import { SearchDetailInput } from '../../components/Product/SearchDetailRow/SearchDetailInput';

import { ProductCategory } from './ProductCategory';
import { SearchDetailRow } from '../../components/Product';
import { Option } from '../../components/Product/Option/Option';
import { Button, message } from 'antd';
import { useMutation } from '@apollo/client';
import { CREATE_PRODUCT } from '../../graphql/mutation/createProduct';
import { useNavigate } from 'react-router-dom';

type Props = {
  isEdit?: boolean;
};

export function ProductAdd({ isEdit }: Props) {
  const navigate = useNavigate();
  const [firstOptionArr, setFirstOptionArr] = useState<
    {
      name: string;
      extraPrice: number;
      finalPrice: number;
      stock: number;
      children?: {
        name: string;
        extraPrice: number;
        finalPrice: number;
        stock: number;
      }[];
    }[]
  >([]);

  const [secondOptionArr, setSecondOptionArr] = useState<
    {
      name: string;
      extraPrice: number;
      finalPrice: number;
      stock: number;
      parent: string;
    }[]
  >([]);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [variables, setVariables] = useState<any>();
  const [hashTags, setHashTags] = useState<string[]>();
  const [parentOption, setParentOption] = useState('');
  const [newOption, setNewOption] = useState<{
    name: string;
    extraPrice: number;
    finalPrice: number;
    stock: number;
    parent?: string;
  }>();

  const handleChangeOption = (
    key: string,
    value: string | number | boolean,
  ) => {
    setNewOption((prev: any) => {
      let newOption: any = { ...prev };
      newOption[key] = value;
      return newOption;
    });
  };

  const handleChange = (key: string, value: string | number) => {
    if (key !== 'hashTagIds') {
      if (key === 'productTags') {
        if (value === '선택안함') {
          setVariables((prev: any) => {
            let newVariables: any = { ...prev };
            newVariables[key] = [];
            return newVariables;
          });
        } else {
          setVariables((prev: any) => {
            let newVariables: any = { ...prev };
            newVariables[key] = value;
            return newVariables;
          });
        }
      } else {
        setVariables((prev: any) => {
          let newVariables: any = { ...prev };
          newVariables[key] = value;
          return newVariables;
        });
      }
    } else if (typeof value === 'string') {
      const newHashTags = value
        .replaceAll(' ,', ',')
        .replaceAll(', ', ',')
        .split(',');
      setHashTags(newHashTags);
      setVariables((prev: any) => {
        let newVariables: any = { ...prev };
        newVariables[key] = value;
        return newVariables;
      });
    }
  };

  const handleClickAddOption = () => {
    if (!newOption?.name) {
      return message.warn('옵션명을 입력해주세요.');
    } else if (!newOption.finalPrice) {
      return message.warn('가격을 입력해주세요.');
    } else if (!newOption.stock) {
      return message.warn('재고량을 입력해주세요.');
    } else {
      if (parentOption === '' && newOption) {
        const targetObj = firstOptionArr.find(
          (obj) => obj.name === newOption?.name,
        );
        if (!targetObj) {
          setFirstOptionArr((prev) =>
            prev !== undefined ? [...prev, newOption] : [],
          );
        } else {
          message.warn('이미 존재하는 옵션입니다.');
        }
      } else if (parentOption !== '' && newOption) {
        const targetObj = secondOptionArr.find(
          (obj) =>
            obj.name === newOption?.name && obj.parent === newOption.parent,
        );
        if (!targetObj) {
          setSecondOptionArr((prev) => [
            ...prev,
            { ...newOption, parent: parentOption },
          ]);
        } else {
          message.warn('이미 존재하는 옵션입니다.');
        }
      }
      setNewOption({ name: '', extraPrice: 0, finalPrice: 0, stock: 0 });
    }
  };

  const handleDeleteOption = (name: string, parentName?: string) => {
    if (!parentName) {
      setFirstOptionArr((arr) => arr.filter((arr) => arr.name !== name));
      setSecondOptionArr((arr) => arr.filter((arr) => arr.parent !== name));
    } else {
      setSecondOptionArr((arr) =>
        arr.filter((arr) => arr.parent === parentName && arr.name === name),
      );
    }
  };

  const onClickCreateProduct = () => {
    if (!variables?.name) {
      return message.warn('상품 이름을 입력해주세요.');
    } else if (!variables?.sellingPrice) {
      return message.warn('상품 판매가를 입력해주세요.');
    } else if (!variables?.salePrice) {
      return message.warn('상품 할인가를 입력해주세요.');
    } else if (!variables?.pointRate) {
      return message.warn('상품 적립률을 입력해주세요.');
    } else if (!variables?.pointRate) {
      return message.warn('상품 적립률을 입력해주세요.');
    } else if (!variables?.productCategoryId) {
      return message.warn('카테고리를 선택해주세요.');
    } else if (firstOptionArr?.length === 0) {
      return message.warn('옵션을 한가지 이상 추가해주세요.');
    } else {
      variables &&
        firstOptionArr?.length !== 0 &&
        createProduct({
          variables: {
            ...variables,
            salePrice: +variables.salePrice,
            sellingPrice: +variables.sellingPrice,
            pointRate: +variables.pointRate,
            options: firstOptionArr,
            productTags: variables.productTags ? variables.productTags : [],
            hashTagNames: hashTags ? hashTags : [],
          },
        });
    }
  };

  const [createProduct] = useMutation(CREATE_PRODUCT, {
    onError: (e) => message.error(e.message ?? `${e}`),
    onCompleted(_data) {
      message.success('상품을 추가했습니다.');
      navigate('/product/list');
    },
  });

  useEffect(() => {
    setFirstOptionArr((prevArr) =>
      prevArr.map((firstOption) => {
        const children = secondOptionArr.filter(
          (secondOption) => secondOption.parent === firstOption.name,
        );
        return {
          ...firstOption,
          children,
        };
      }),
    );

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [secondOptionArr]);

  return (
    <div>
      <SearchDetailInput
        value={variables && variables.name}
        saveNames={['name']}
        title="이름"
        onChangeHandle={handleChange}
        essential
      />
      <div
        style={{
          display: windowWidth >= 1000 ? 'grid' : 'block',
          gridTemplateColumns: 'repeat(3, 33.33%)',
        }}
      >
        <SearchDetailInput
          value={variables && variables.sellingPrice}
          saveNames={['sellingPrice']}
          title="판매가"
          onChangeHandle={handleChange}
          type={'number'}
          unitName={'원'}
          essential
        />
        <SearchDetailInput
          value={variables && variables.salePrice}
          saveNames={['salePrice']}
          title="할인가"
          onChangeHandle={handleChange}
          type={'number'}
          unitName={'원'}
          essential
        />
        <SearchDetailInput
          value={variables && variables.pointRate}
          saveNames={['pointRate']}
          title="적립률"
          onChangeHandle={handleChange}
          type={'number'}
          unitName={'%'}
          essential
        />
      </div>
      <SearchDetailInput
        value={variables && variables.hashTagIds}
        saveNames={['hashTagIds']}
        title="해시태그"
        onChangeHandle={handleChange}
      />
      <SearchDetailRow
        checkBoxArr={['선택안함', 'NEW', 'BEST']}
        saveNames={['productTags', 'productTags', 'productTags']}
        title="상품태그"
        changeHandle={handleChange}
      />
      <ProductCategory
        essential
        isAdd
        handleChange={handleChange}
        saveName="productCategoryId"
      />
      <Option
        essential
        windowWidth={windowWidth}
        handleDeleteOption={handleDeleteOption}
        parentOption={parentOption}
        setParentOption={setParentOption}
        onChangeHandle={handleChangeOption}
        newOption={newOption}
        handleClickAddOption={handleClickAddOption}
        firstOptionArr={firstOptionArr}
        secondOptionArr={secondOptionArr}
      />
      <S.AddBtnWrap>
        <Button type="primary" onClick={onClickCreateProduct}>
          상품등록
        </Button>
      </S.AddBtnWrap>
    </div>
  );
}
