import React, { useEffect, useState } from 'react';
import * as S from './style';
import { SearchDetailInput } from '../../components/Product/SearchDetailRow/SearchDetailInput';
import { ProductCategory } from './ProductCategory';
import { SearchDetailRow } from '../../components/Product';
import { Option } from '../../components/Product/Option/Option';
import { Button, Modal, Upload, UploadFile, message } from 'antd';
import { useMutation } from '@apollo/client';
import { CREATE_PRODUCT } from '../../graphql/mutation/createProduct';
import { useNavigate } from 'react-router-dom';
import { RcFile, UploadProps } from 'antd/lib/upload';
import { PlusOutlined } from '@ant-design/icons';
import { CREATE_PRODUCT_FILE_BY_ADMIN } from '../../graphql/mutation/createProductFileByAdmin';

type Props = {
  isEdit?: boolean;
};

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

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
  const [projectImageFileList, setProjectImageFileList] = useState<
    UploadFile[]
  >([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');

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

  const handleChange = (
    key: string,
    value: string | number | UploadFile<any>[] | boolean | undefined,
  ) => {
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

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1),
    );
  };

  const projectimageChange: UploadProps['onChange'] = ({
    fileList: newFileList,
  }) => {
    setProjectImageFileList(newFileList);
    handleChange('images', newFileList);
  };

  const handleProjectimageChange = (e: any) => {
    const newImage: UploadFile = e?.file?.originFileObj;
    projectimageChange(e);
  };
  const handleCancel = () => setPreviewOpen(false);

  const [createProduct] = useMutation(CREATE_PRODUCT, {
    onError: (e) => message.error(e.message ?? `${e}`),
    onCompleted(_data) {
      message.success('상품을 추가했습니다.');
      navigate('/product/list');
    },
  });

  const [createProductFileByAdmin] = useMutation(CREATE_PRODUCT_FILE_BY_ADMIN, {
    onError: (e) => message.error(e.message ?? `${e}`),
    onCompleted(data) {},
  });

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

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
        essential={isEdit ? false : true}
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
          essential={isEdit ? false : true}
        />
        <SearchDetailInput
          value={variables && variables.salePrice}
          saveNames={['salePrice']}
          title="할인가"
          onChangeHandle={handleChange}
          type={'number'}
          unitName={'원'}
          essential={isEdit ? false : true}
        />
        <SearchDetailInput
          value={variables && variables.pointRate}
          saveNames={['pointRate']}
          title="적립률"
          onChangeHandle={handleChange}
          type={'number'}
          unitName={'%'}
          essential={isEdit ? false : true}
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
      <>
        {isEdit && (
          <>
            <S.AddTitleLine>상품 이미지</S.AddTitleLine>

            <Upload
              listType="picture-card"
              fileList={projectImageFileList}
              onPreview={handlePreview}
              onChange={handleProjectimageChange}
            >
              {projectImageFileList?.length >= 10 ? null : uploadButton}
            </Upload>
          </>
        )}
        <Modal
          open={previewOpen}
          title={previewTitle}
          footer={null}
          onCancel={handleCancel}
        >
          <img
            alt="프로젝트 이미지"
            style={{ width: '100%' }}
            src={previewImage}
          />
        </Modal>
      </>
      <ProductCategory
        essential={isEdit ? false : true}
        isAdd
        handleChange={handleChange}
        saveName="productCategoryId"
      />
      <Option
        essential={isEdit ? false : true}
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
