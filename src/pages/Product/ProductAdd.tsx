import React, { useEffect, useState } from 'react';
import * as S from './style';
import { SearchDetailInput } from '../../components/Product/SearchDetailRow/SearchDetailInput';
import { ProductCategory } from './ProductCategory';
import { SearchDetailRow } from '../../components/Product';
import { Option } from '../../components/Product/Option/Option';
import { Button, Modal, Upload, UploadFile, message } from 'antd';
import { useLazyQuery, useMutation } from '@apollo/client';
import { CREATE_PRODUCT } from '../../graphql/mutation/createProduct';
import { useNavigate, useParams } from 'react-router-dom';
import { RcFile, UploadProps } from 'antd/lib/upload';
import { PlusOutlined } from '@ant-design/icons';
import { CREATE_PRODUCT_FILE_BY_ADMIN } from '../../graphql/mutation/createProductFileByAdmin';
import {
  createProductFileByAdmin,
  createProductFileByAdminVariables,
} from '../../graphql/generated/createProductFileByAdmin';
import Loader from '../../components/Loader';
import { FIND_PRODUCT_BY_ADMIN } from '../../graphql/query/findProductByAdmin';
import {
  findProductByAdmin,
  findProductByAdminVariables,
} from '../../graphql/generated/findProductByAdmin';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';

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
  const params = useParams();
  const navigate = useNavigate();
  const [productId, setProductId] = useState('');
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
    UploadFile[] | any[] //
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
    value:
      | string
      | number
      | boolean
      | UploadFile<any>[]
      | CheckboxValueType[]
      | undefined,
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
      const newSecondArr = secondOptionArr.filter(
        (arr) => arr.parent !== parentName && arr.name !== name,
      );
      setFirstOptionArr((prev) =>
        prev.filter((data) => data.children?.map((data) => data.name !== name)),
      );
      setSecondOptionArr(newSecondArr);
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

    if (projectImageFileList?.length < e.fileList?.length) {
      createProductFileByAdmin({
        variables: {
          file: newImage,
          productId,
        },
        onCompleted: (_data) => {
          projectimageChange(e);
        },
      });
    } else if (projectImageFileList.length > e.fileList.length) {
      // deleteProjectFileByAdmin({
      //   variables: {
      //     id: +e.file.uid,
      //   },
      //   onCompleted: (_data) => {
      //     projectimageChange(e);
      //   },
      // });
    }
  };

  const handleCancel = () => setPreviewOpen(false);

  const onClickEditProduct = () => {};

  const [findProductByAdmin] = useLazyQuery<
    findProductByAdmin,
    findProductByAdminVariables
  >(FIND_PRODUCT_BY_ADMIN, {
    onError: (e) => message.error(e.message ?? `${e}`),
    onCompleted(data) {
      setVariables(data.findProductByAdmin);
      data.findProductByAdmin.productFiles.map((data) =>
        setProjectImageFileList((prevImageFileList) => [
          ...prevImageFileList,
          {
            uid: data.id.toString(),
            name: '',
            thumbUrl: `${process.env.REACT_APP_SERVER_BASIC}/project-file?fileKind=IMAGE&name=${data.name}`,
            url: `${process.env.REACT_APP_SERVER_BASIC}/project-file?fileKind=IMAGE&name=${data.name}`,
          },
        ]),
      );

      const newHasTagsArr: string[] = [];
      data.findProductByAdmin.hashTags.map((arr) =>
        newHasTagsArr.push(arr.name),
      );
      const newHasTag = newHasTagsArr.join(',');
      handleChange('hashTagIds', newHasTag);
    },
  });

  const [createProduct] = useMutation(CREATE_PRODUCT, {
    onError: (e) => message.error(e.message ?? `${e}`),
    onCompleted(_data) {
      message.success('상품을 추가했습니다.');
      navigate('/product/list');
    },
  });

  const [createProductFileByAdmin, { loading }] = useMutation<
    createProductFileByAdmin,
    createProductFileByAdminVariables
  >(CREATE_PRODUCT_FILE_BY_ADMIN, {
    onError: (e) => message.error(e.message ?? `${e}`),
    onCompleted(_data) {
      message.success('이미지를 추가했습니다.');
    },
  });

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  useEffect(() => {
    setProjectImageFileList([]);
    if (isEdit && params.productId) {
      setProductId(params.productId);
      findProductByAdmin({
        variables: { findProductByAdminId: params.productId },
      });
    }

    setFirstOptionArr((prevArr) =>
      prevArr.map((firstOption) => {
        const children = secondOptionArr
          .filter((secondOption) => secondOption.parent === firstOption.name)
          .map((arr) => ({ ...arr, parent: undefined }));

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

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <S.Title>상품 상세</S.Title>
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
        productTag
        productTags={variables?.productTags}
        saveNames={[]}
        title="상품태그"
        changeHandle={handleChange}
      />
      <>
        {isEdit && (
          <>
            <S.PartTitle>상품 이미지</S.PartTitle>
            <Upload
              listType="picture-card"
              fileList={projectImageFileList}
              onPreview={handlePreview}
              onChange={handleProjectimageChange}
            >
              {projectImageFileList?.length >= 10 ? null : uploadButton}
            </Upload>
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
        categorys={variables?.productCategories}
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
        <Button
          type="primary"
          onClick={() =>
            isEdit ? onClickEditProduct() : onClickCreateProduct()
          }
        >
          {isEdit ? '상품수정' : '상품등록'}
        </Button>
      </S.AddBtnWrap>
    </div>
  );
}
