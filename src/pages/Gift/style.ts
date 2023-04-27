import styled from 'styled-components';

export const Wrap = styled.div`
  display: flex;
  input {
    width: 60vw;
  }
  span {
    margin-right: 10px;
  }
`;

export const Btn = styled.div`
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid 1px skyblue;
  border-radius: 5px;
  color: skyblue;
  font-weight: bold;
  align-content: center;
  cursor: pointer;
  height: 33px;
  svg {
    font-size: 16.5px;
  }
`;
