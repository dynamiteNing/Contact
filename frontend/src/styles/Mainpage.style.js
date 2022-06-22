import styled from 'styled-components';

export const Contact = styled.div`
  font-size: 75px;
  color: #d3b7d8;
  font-weight: bold;
  font-style: oblique;
  font-variant: small-caps;
  margin: auto;
`;

export const Main = styled.main`
  height: 70vh;
  padding-top: 30vh;
  justify-content: center;
  text-align: center;
  background-color: #222222;
`;

export const Input = styled.input`
  padding: 3px;
  margin-top: 20px;
  margin-left: ${props => props.done ? '0' : '30px'};
  font: inherit;
  font-size: large;
  border-radius: 3px;
  text-align: center;
  &:focus {
    outline: none;
    border: solid transparent 2px;
    border-image: linear-gradient(101deg, #38b8f2, #843cf6, #f030c1, #6094ea, #fd8041, #ff4ca1, #ffa7e7, #ea6362, #4dd0e1, #6078ea, #38b8f2, #843cf6);
    border-image-slice: 1;
  }
`;

export const Wrap = styled.div`
  justify-content: center;
  text-align: center;
  display: flex;
  flex-warp: wrap;
`;

export const Button = styled.button`
  display: ${props => props.done ? 'none' : ''};
  height: 20px;
  width: 20px;
  margin-left: 10px;
  border-radius: 10px;
  background-color: #d3b7d8;
`;