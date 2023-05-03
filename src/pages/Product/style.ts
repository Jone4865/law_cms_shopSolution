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
  min-width: 100px;
`;

export const AddBtn = styled.div`
  border: solid 1px red;
  color: red;
  min-width: 100px;
`;

export const SearchTitle = styled.p`
  font-size: 20px;
  font-weight: bold;
  margin-top: 30px;
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
  overflow: scroll;
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

export const Line = styled.hr`
  margin-bottom: 30px;
`;

export const CategoryContainer = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  border: solid 1px gray;
`;

export const CategoryTitle = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: solid 2px gray;
  width: 100%;
  font-weight: bold;
`;

export const CategoryWrap = styled.div`
  overflow: scroll;
  height: 30vh;
  width: 100%;
`;

export const CategoryArrContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 5px 10px;
  align-items: center;
  font-weight: bold;
  cursor: pointer;
  border: solid 0.2px #f3f3f3;
  span {
    margin-right: 10px;
  }
`;

export const VisibleDiv = styled.div`
  width: 50px;
  border: solid 1px skyblue;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  font-weight: bold;
  align-items: center;
  margin-right: 5px;
  height: 25px;
  color: skyblue;
`;

export const EnVisibleDiv = styled.div`
  width: 50px;
  border: solid 1px orangered;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  font-weight: bold;
  align-items: center;
  height: 25px;
  margin-right: 5px;
  color: orangered;
`;

export const EditBtn = styled.button`
  border: none;
  border-radius: 8px;
  min-width: 50px;
  cursor: pointer;
`;
