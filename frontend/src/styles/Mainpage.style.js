import styled from 'styled-components';
import enter from '../images/enter.png';
{/* <a href="https://www.flaticon.com/authors/pixel-perfect" title="Pixel perfect"> Pixel perfect </a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com'</a> */}

export const Contact = styled.div`
  font-size: 4em;
  color: #d3b7d8;
  font-weight: bold;
  font-style: oblique;
  font-variant: small-caps;
  margin: auto;
`;

export const Main = styled.main`
  height: 75vh;
  padding-top: 25vh;
  justify-content: center;
  text-align: center;
  background: linear-gradient(to right, #444, #333, #222, #111, #000, #111, #222, #333, #444);
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

export const Type = styled.div`
  color: #d3b7d8;
  font-style: oblique;
  font-size: 18px;
  font-weight: bold;
  margin-right: 15px;
  padding-left: 10px;
`;

export const Button = styled.button`
  display: ${props => props.done ? 'none' : ''};
  height: 20px;
  width: 20px;
  margin-left: 10px;
  border-radius: 10px;
  background-image: url(${enter});
  background-size: contain;
  &:hover {
    opacity: 70%;
  }
`;

export const ButtonDown = styled.button`
  display: ${props => props.done ? 'none' : ''};
  height: 20px;
  width: 20px;
  border-radius: 10px;
  background-image: url(${enter});
  background-size: contain;
  align-self: center;
  &:hover {
    opacity: 70%;
  }
`;

export const Form = styled.form`
  display: inline-grid;
  align-content: center;
  justify-content: center;
  align-self: center;
`