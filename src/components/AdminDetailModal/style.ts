import styled from 'styled-components';

export const Label = styled.label`
  width: 120px;
  @media ${(props) => props.theme.mobile} {
    width: 100px;
  }
`;

export const FormWrap = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  @media ${(props) => props.theme.mobile} {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const TableWrap = styled.div`
  display: flex;
  margin-bottom: 20px;
  flex-direction: column;
`;

export const Input = styled.input`
  width: 500px;
`;
