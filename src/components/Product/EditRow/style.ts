import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  font-size: 13px;
  font-weight: bold;
  align-items: center;
  border: solid 1px #8d86863a;
`;

export const TitleWrap = styled.div`
  display: flex;
  align-items: center;
  min-height: 45px;
  border-right: solid 1px #1d171738;
  background-color: #f3f3f3;
  padding: 0 10px;
  margin-right: 10px;
  min-width: 100px;
  span:first-child {
    margin-right: 5px;
  }
`;

export const BottomWrap = styled.div`
  display: flex;
  overflow: scroll;
  width: 100vw;
  div {
    white-space: nowrap;
    overflow: scroll;
  }
`;
