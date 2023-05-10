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

export const ProductListProductContainer = styled.div`
  display: flex;
  white-space: nowrap;
  img {
    border-radius: 8px;
    min-width: 60px;
    min-height: 60px;
  }
  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin-right: 5px;
  }
  span:first-child {
    font-weight: bold;
  }
  span:last-child {
    color: gray;
  }
`;

export const CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: skyblue;
  white-space: nowrap;
  min-width: 60px;
  div {
    border: dashed 0.1px #281c1c1d;
    width: 100%;
    height: 0px;
    margin: 5px 0;
  }
`;

export const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

export const ProductGridWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  input {
    width: 100px;
    text-align: right;
  }
`;

export const ProductFlexWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  input {
    width: 100px;
    text-align: right;
  }
`;

export const WhiteSpaceNoWrap = styled.div`
  white-space: nowrap;
`;

export const ProductListStockContainer = styled.div`
  display: flex;
  justify-content: center;
  min-width: 100px;
`;
