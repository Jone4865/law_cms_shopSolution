import { EditRow } from '../../EditRow/EditRow';
import * as S from '../style';
import { Button } from 'antd';

type Props = {
  windowWidth: number;
  newOption:
    | {
        name: string;
        extraPrice: number;
        finalPrice: number;
        stock: number;
      }
    | undefined;
  onChangeHandle: (key: string, value: string | number | boolean) => void;
  handleClickAddOption: () => void;
};

export function AddOption({
  newOption,
  windowWidth,
  handleClickAddOption,
  onChangeHandle,
}: Props) {
  return (
    <S.Container>
      <S.Title>옵션 생성</S.Title>
      <div
        style={{
          display: windowWidth >= 1500 ? 'grid' : '',
          gridTemplateColumns: 'repeat(4, 25%)',
        }}
      >
        <EditRow
          changeHandle={onChangeHandle}
          saveName={'name'}
          title="옵션 명"
          type="input"
          inputValue={newOption && newOption.name}
        />
        <EditRow
          changeHandle={onChangeHandle}
          saveName={'extraPrice'}
          title="추가금"
          type="number"
          inputValue={newOption && newOption.extraPrice}
        />
        <EditRow
          changeHandle={onChangeHandle}
          saveName={'finalPrice'}
          title="가격"
          type="number"
          inputValue={newOption && newOption.finalPrice}
        />
        <EditRow
          changeHandle={onChangeHandle}
          saveName={'stock'}
          title="재고량"
          type="number"
          inputValue={newOption && newOption.stock}
        />
      </div>
      <S.BtnWrap>
        <Button type="primary" onClick={handleClickAddOption}>
          옵션 생성
        </Button>
      </S.BtnWrap>
    </S.Container>
  );
}
