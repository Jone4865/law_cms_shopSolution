import * as S from './style';
import { CheckOutlined } from '@ant-design/icons';
import { Input } from 'antd';

type Props = {
  value: string | number | undefined | null | string[];
  title: string;
  saveNames: string[];
  onChangeHandle: (key: string, value: string | number) => void;
  type?: string;
  essential?: boolean;
  unitName?: string;
};

export function SearchDetailInput({
  title,
  value,
  saveNames,
  onChangeHandle,
  essential,
  unitName,
  type = 'string',
}: Props) {
  return (
    <S.Container>
      <S.TitleWrap>
        <span>{title}</span>
        {essential && <CheckOutlined style={{ color: 'red' }} />}
      </S.TitleWrap>
      <S.BottomWrap>
        <Input
          type={type}
          value={
            typeof value === 'string' || typeof value === 'number' ? value : ''
          }
          onChange={(e) => onChangeHandle(saveNames[0], e.target.value)}
          placeholder={
            title === '해시태그'
              ? '사용하실 해시태그를 쉼표(,)로 구분하여 작성해주세요.'
              : title
          }
          style={{ marginRight: '5px' }}
        />
        {unitName && (
          <span style={{ margin: 'auto 15px auto 3px' }}>{unitName}</span>
        )}
      </S.BottomWrap>
    </S.Container>
  );
}
