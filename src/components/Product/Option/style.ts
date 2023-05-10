import styled from 'styled-components';

export const Container = styled.div``;

export const Wrap = styled.div`
  margin-top: 10px;
  flex-direction: column;
  display: grid;
  grid-template-columns: repeat(4, 25%);
`;

export const BtnWrap = styled.div`
  display: flex;
  margin-top: 10px;
  width: 100%;
  justify-content: center;
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
  margin: 10px 0;
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
  height: 50px;
  align-items: center;
  font-weight: bold;
  button {
    margin-left: 5px;
  }
`;

export const CategoryWrap = styled.div`
  overflow: scroll;
  height: 30vh;
  width: 100%;
`;

export const CategoryArrContainer = styled.div`
  display: flex;
  width: 818px;
  justify-content: space-between;
  padding: 5px 10px;
  align-items: center;
  font-weight: bold;
  cursor: pointer;
  border: solid 0.2px #f3f3f3;
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

export const AddTitleLine = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f3f3f3;
  border: solid 1px #1d171738;
  font-weight: bold;
`;

export const AddContent = styled.span`
  min-width: 130px;
  width: 7vw;
  overflow: scroll;
`;

export const Ex = styled.span`
  font-size: 11px;
  color: gray;
`;
