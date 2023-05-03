import { CheckOutlined } from '@ant-design/icons';
import * as S from './style';
import { DropdownComponent } from '../../Dropdown';
import { Checkbox, Input } from 'antd';
import { useState } from 'react';

type Props = {
  title: string;
  type: 'input' | 'checkbox';
  saveName: string;
  essential?: boolean;
  inputValue?: string;
  chececkBoxValues?: string[];
  changeHandle: (key: string, value: string) => void;
};

export function EditRow({
  title,
  type,
  inputValue,
  essential,
  saveName,
  chececkBoxValues,
  changeHandle,
}: Props) {
  const [checkBoxAble, setCheckBoxAble] = useState('');
  const onChangeHandle = (checkBoxValue: string, idx: number) => {
    setCheckBoxAble(checkBoxValue);
    changeHandle(saveName, checkBoxValue);
  };
  return (
    <S.Container>
      <S.TitleWrap>
        <span>{title}</span>
        {essential && <CheckOutlined style={{ color: 'red' }} />}
      </S.TitleWrap>
      <S.BottomWrap>
        {type === 'input' && (
          <Input
            onChange={(e) => changeHandle(saveName, e.target.value)}
            defaultValue={inputValue}
          />
        )}
        {type === 'checkbox' && (
          <Checkbox.Group value={[checkBoxAble]}>
            {chececkBoxValues &&
              chececkBoxValues.map((item, idx) => (
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
