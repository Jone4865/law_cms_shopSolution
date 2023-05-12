import React, { useState } from 'react';
import * as S from './style';
import { Checkbox } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import { DropdownSearchDetail } from '../../Dropdown/DropdownSearchDetail';

type Props = {
  title: string;
  saveNames: string[];
  changeHandle: (
    key: string,
    serchCategory: string | boolean | undefined,
  ) => void;
  dropdownArrs?: any[][];
  checkBoxArr?: string[];
  essential?: boolean;
};

export function SearchDetailRow({
  title,
  saveNames,
  changeHandle,
  dropdownArrs,
  checkBoxArr,
  essential,
}: Props) {
  const [checkBoxAble, setCheckBoxAble] = useState(
    checkBoxArr ? checkBoxArr[0] : '',
  );
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
              changeHandle={changeHandle}
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
      </S.BottomWrap>
    </S.Container>
  );
}
