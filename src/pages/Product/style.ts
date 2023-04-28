import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  overflow: scroll;

  span {
    display: flex;
  }
`;

export const Wrap = styled.div`
  display: flex;
  margin-top: 10px;
`;

export const BtnWrap = styled.div`
  display: flex;
  margin-left: 35px;
  margin-top: 10px;
  div {
    width: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    font-weight: bold;
    align-content: center;
    cursor: pointer;
    height: 34px;
    margin-right: 10px;
    span {
      margin: 0;
    }
    svg {
      font-size: 16.5px;
    }
    p {
      margin: auto 5px;
    }
  }
`;

export const MoreBtn = styled.div`
  border: solid 1px skyblue;
  color: skyblue;
`;

export const AddBtn = styled.div`
  border: solid 1px red;
  color: red;
`;

export const SearchTitle = styled.p`
  font-size: 20px;
  font-weight: bold;
`;

export const Grid = styled.div`
  display: grid;
`;

export const BottomBtnWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

export const Dashed = styled.div`
  border: dashed 1px #201c1c33;
  margin: 20px;
`;

export const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const FilterWrap = styled.div`
  display: flex;
  button {
    margin: 5px 5px 5px 0;
  }
`;

export const Flex = styled.div`
  display: flex;
`;

export const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

export const Line = styled.hr``;
