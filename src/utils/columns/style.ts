import styled from 'styled-components';

export const AuthWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const ProductListRankContainer = styled.div`
  display: flex;
  justify-content: center;
  input {
    width: 100px;
    margin-right: 2px;
  }
`;

export const ProductListStateContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    width: 50px;
    height: 30px;
    border-radius: 8px;
    border: solid 1px blue;
    color: blue;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 3px;
  }
  span {
    width: 50px;
    height: 30px;
    border-radius: 8px;
    border: solid 1px orange;
    color: orange;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const ProductListMangementContainer = styled.div`
  display: flex;
  justify-content: center;
  button {
    margin-right: 3px;
  }
`;
