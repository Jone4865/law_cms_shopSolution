import React, { useState } from 'react';
import * as S from './style';
import { DropdownComponent } from '../../Dropdown';
import { Checkbox } from 'antd';
import { CheckboxValueType } from 'antd/es/checkbox/Group';

type Props = {
  title: string;
  saveNames: string[];
  changeHandle: (key: string, serchCategory: string) => void;
  dropdownArrs?: string[][];
  checkBoxArr?: string[];
};

export function SearchDetail({
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
    <div
      style={{
        display: 'flex',
        fontSize: '13px',
        fontWeight: 'bold',
        alignItems: 'center',
        border: 'solid 1px #8d86863a',
      }}
    >
      <div
        style={{
          marginRight: '10px',
          display: 'flex',
          alignItems: 'center',
          width: '180px',
          paddingLeft: '20px',
          height: '40px',
          borderRight: 'solid 1px #1d171738',
          backgroundColor: '#f3f3f3',
        }}
      >
        {title}
      </div>
      <div style={{ display: 'flex' }}>
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
      </div>
    </div>
  );
}
