import React, { useState } from 'react';
import * as S from './style';
import { DropdownComponent } from '../../Dropdown';
import { Button, Checkbox } from 'antd';

type Props = {
  title: string;
  saveNames: string[];
  changeHandle: (key: string, serchCategory: string) => void;
  dropdownArrs?: string[][];
  checkBoxArr?: string[];
};

export function SearchDetailRow({
  title,
  saveNames,
  changeHandle,
  dropdownArrs,
  checkBoxArr,
}: Props) {
  const [checkBoxAble, setCheckBoxAble] = useState('');
  const onChangeHandle = (checkBoxValue: string, idx: number) => {
    setCheckBoxAble(checkBoxValue);
    changeHandle(saveNames[idx], checkBoxValue);
  };
  return (
    <S.Container>
      <S.TitleWrap>{title}</S.TitleWrap>
      <S.BottomWrap>
        {dropdownArrs &&
          dropdownArrs.map((item, idx) => (
            <DropdownComponent
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
