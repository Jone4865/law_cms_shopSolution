import { CheckOutlined } from '@ant-design/icons';
import * as S from './style';
import { DropdownComponent } from '../../Dropdown';
import { Checkbox, Input, Switch } from 'antd';
import { useEffect, useState } from 'react';

type Props = {
  title: string;
  type: 'input' | 'toggle';
  saveName: string;
  visible?: boolean;
  essential?: boolean;
  inputValue?: string;
  chececkBoxValues?: string[];
  changeHandle: (key: string, value: string | boolean) => void;
};

export function EditRow({
  title,
  type,
  visible,
  inputValue,
  essential,
  saveName,
  chececkBoxValues,
  changeHandle,
}: Props) {
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
            value={inputValue}
          />
        )}
        {type === 'toggle' && (
          <Switch
            checked={visible}
            onChange={(e) => changeHandle(saveName, e)}
          />
        )}
      </S.BottomWrap>
    </S.Container>
  );
}
