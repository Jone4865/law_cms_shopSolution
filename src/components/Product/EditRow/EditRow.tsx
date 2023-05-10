import { CheckOutlined } from '@ant-design/icons';
import * as S from './style';
import { Input, Switch } from 'antd';

type Props = {
  title: string;
  type: 'input' | 'toggle' | 'number';
  saveName: string;
  visible?: boolean;
  essential?: boolean;
  inputValue?: string | number;
  chececkBoxValues?: string[];
  changeHandle: (key: string, value: string | boolean | number) => void;
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
        {type !== 'toggle' && (
          <Input
            type={type === 'number' ? 'number' : ''}
            onChange={(e) =>
              changeHandle(
                saveName,
                type === 'number'
                  ? +e.target.value.replaceAll('-', '').replace(/(^0+)/, '')
                  : e.target.value,
              )
            }
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
