import { Input } from 'antd';
import styled from 'styled-components';
import { PRIMARY } from '../../styles/colors';

export const Container = styled.main`
  min-height: 100vh;
  max-height: 100vh;

  background: ${PRIMARY};
  display: flex;
  justify-content: center;
  @media ${(props) => props.theme.mobile} {
    background: #fff;
    padding: 20px;
  }
`;

export const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  @media ${(props) => props.theme.mobile} {
  }
`;

export const Button = styled.button`
  width: 100%;
  background-color: ${PRIMARY};
  font-size: 18px;
  border: 0;
  height: 3.25rem;
  cursor: pointer;
  color: #fff;
  font-weight: bold;
  border-radius: 6px;
  @media ${(props) => props.theme.mobile} {
    border: 0;
  }
`;

export const ImageWrap = styled.div`
  width: 100%;
  margin-bottom: 2em;
  text-align: center;
`;

export const Image = styled.img`
  width: 60%;
  height: 60%;
  object-fit: contain;
  max-width: 30vw;
  @media ${(props) => props.theme.mobile} {
    width: 70%;
    height: 70%;
    max-width: 75vw;
  }
`;

export const CustomInput = styled(Input)`
  @media ${(props) => props.theme.mobile} {
    width: 50%;
    height: 50%;
  }
`;

export const FormWrap = styled.div`
  background: #fff;
  padding: 40px;
  border: 1px solid #efefef;
  border-radius: 10px;
`;
