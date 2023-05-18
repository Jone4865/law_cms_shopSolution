import React, { useEffect, useState } from 'react';
import * as S from './style';
import { Checkbox, UploadFile } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import { DropdownSearchDetail } from '../../Dropdown/DropdownSearchDetail';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';

type Props = {
  title: string;
  saveNames: string[];
  changeHandle: (
    key: string,
    serchCategory:
      | string
      | number
      | boolean
      | UploadFile<any>[]
      | CheckboxValueType[]
      | undefined,
    first?: boolean,
  ) => void;
  dropdownArrs?: any[][];
  checkBoxArr?: string[];
  essential?: boolean;
  productTag?: boolean;
  productTags?: [];
};

const plainOptions = ['NEW', 'BEST'];

export function SearchDetailRow({
  title,
  saveNames,
  changeHandle,
  dropdownArrs,
  checkBoxArr,
  essential,
  productTag,
  productTags,
}: Props) {
  const [checkBoxAble, setCheckBoxAble] = useState(
    checkBoxArr ? checkBoxArr[0] : '',
  );

  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>([]);
  const [checkAll, setCheckAll] = useState<boolean>();

  const onChange = (list: CheckboxValueType[]) => {
    setCheckedList(list);
    changeHandle('productTags', list);
  };

  const onCheckAllChange = (e: CheckboxChangeEvent) => {
    setCheckedList([]);
    if (e.target.checked) {
      setCheckAll(true);
    }
    changeHandle('productTags', []);
  };

  const onChangeHandle = (checkBoxValue: string, idx: number) => {
    setCheckBoxAble(checkBoxValue);
    changeHandle(
      saveNames[idx],
      checkBoxValue === '전체'
        ? undefined
        : checkBoxValue === '노출'
        ? true
        : false,
    );
  };

  const onChangeDropDownOne = (key: string, value: string) => {
    changeHandle(key, value, true);
  };

  const onChangeDropDownTwo = (key: string, value: string) => {
    changeHandle(key, value, false);
  };

  useEffect(() => {
    if (productTags) {
      setCheckedList(productTags);
    }
    if (checkedList.length > 0) {
      setCheckAll(false);
    } else {
      setCheckAll(true);
    }
  }, [productTags, checkedList]);

  return (
    <S.Container>
      <S.TitleWrap>
        <span>{title}</span>
        {essential && <CheckOutlined style={{ color: 'red' }} />}
      </S.TitleWrap>
      <S.BottomWrap>
        {dropdownArrs &&
          dropdownArrs.map((item, idx) => (
            <DropdownSearchDetail
              saveName={saveNames[idx]}
              key={idx}
              menus={item}
              changeHandle={
                idx === 0 ? onChangeDropDownOne : onChangeDropDownTwo
              }
            />
          ))}
        {checkBoxArr && (
          <Checkbox.Group value={[checkBoxAble]}>
            {checkBoxArr.map((item, idx) => (
              <Checkbox
                key={idx}
                value={item}
                onChange={() => onChangeHandle(item, idx)}
              >
                {item}
              </Checkbox>
            ))}
          </Checkbox.Group>
        )}
        {productTag && (
          <>
            <Checkbox onChange={onCheckAllChange} checked={checkAll}>
              선택안함
            </Checkbox>
            <Checkbox.Group
              options={plainOptions}
              value={checkedList}
              onChange={onChange}
            />
          </>
        )}
      </S.BottomWrap>
    </S.Container>
  );
}
