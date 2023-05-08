import React, { useEffect, useState } from 'react';
import { SearchDetailInput } from '../../components/Product/SearchDetailRow/SearchDetailInput';
import { createProductVariables } from '../../graphql/generated/createProduct';
import { ProductCategory } from './ProductCategory';
import { SearchDetailRow } from '../../components/Product';

type Props = {
  isEdit?: boolean;
};

export function ProductAdd({ isEdit }: Props) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [variables, setVariables] = useState<createProductVariables>();
  const [hashTags, setHashTags] = useState<string[]>();

  const handleChange = (key: string, value: string | number) => {
    if (key !== 'hashTagIds') {
      if (key === 'productTags') {
        if (value === '선택안함') {
          setVariables((prev: any) => {
            let newVariables: any = { ...prev };
            newVariables[key] = undefined;
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
      <SearchDetailInput
        value={variables && variables.name}
        saveNames={['name']}
        title="이름"
        onChangeHandle={handleChange}
      />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 25%)' }}>
        <SearchDetailInput
          value={variables && variables.sellingPrice}
          saveNames={['sellingPrice']}
          title="판매가"
          onChangeHandle={handleChange}
          type={'number'}
          unitName={'원'}
        />
        <SearchDetailInput
          value={variables && variables.salePrice}
          saveNames={['salePrice']}
          title="할인가"
          onChangeHandle={handleChange}
          type={'number'}
          unitName={'원'}
        />
        <SearchDetailInput
          value={variables && variables.pointRate}
          saveNames={['pointRate']}
          title="적립률(%)"
          onChangeHandle={handleChange}
          type={'number'}
          unitName={'%'}
        />
        <SearchDetailInput
          value={variables && variables.stock}
          saveNames={['stock']}
          title="재고량"
          onChangeHandle={handleChange}
          type={'number'}
          unitName={'개'}
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
      {/* <SearchDetailInput
        value={variables.options}
        saveNames={['options']}
        title="상품 옵션"
        onChangeHandle={handleChange}
      /> */}
      {/* <SearchDetailInput
        value={variables.productTags}
        saveNames={['productTags']}
        title="상품 태그"
        onChangeHandle={handleChange}
      /> */}
      {/* <SearchDetailInput
        value={variables.hashTagIds}
        saveNames={['hashTagIds']}
        title="해시 태그 ID 배열"
        onChangeHandle={handleChange}
      /> */}
      <div>카테고리</div>
      <ProductCategory
        isAdd
        handleChange={handleChange}
        saveName="productCategoryId"
      />
    </div>
  );
}
