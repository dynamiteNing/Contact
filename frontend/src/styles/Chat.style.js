import styled from 'styled-components';
import send from '../images/send.png';

export const Board = styled.div`
  height: 70vh;
  width: 60vw;
  overflow: auto;
  padding: 5vh 5vw 5vh 5vw;
  justify-content: center;
  @media (max-width: 700px) {
    width: 70vw;
  }
`;

export const Tuple = styled.div`
  width: 85%;
  margin-left: ${props => props.self ? 'auto' : '0'};
  margin-bottom: 10px;
  display: flex;
  @media (max-width: 700px) {

  }
`

export const Avatar = styled.img`
  width: 50px;
  height: fit-content;
  aspect-ratio: 1;
  border-radius: 25%;
  margin-right: 10px;
  align-self: center;
  display: ${props => props.self ? 'none' : ''};
  @media (max-width: 700px) {
    width: 30px;
  }
`;

export const Group = styled.div`
  max-width: ${props => props.self ? '100%' : '90%'};
  margin-left: ${props => props.self ? 'auto' : '0'};
  @media (max-width: 700px) {
    
  }
`;

// export const Title = styled.div`
//   background-color: linear-gradient(101deg, #38b8f2, #843cf6, #f030c1, #6094ea, #fd8041, #ff4ca1, #ffa7e7, #ea6362, #4dd0e1, #6078ea, #38b8f2, #843cf6);
  
// `

export const Name = styled.div`
  font-weight: bold;
  text-align: left;
  display: ${props => props.self ? 'none' : ''};
`;

export const Message = styled.div`
  word-wrap: normal;
  word-break: break-word;
  background-color: #e2d8ee;
  border-color: transparent; 
  border-radius: 5px;
  padding: 10px;
  @media (max-width: 700px) {
    
  }
`;

export const Time = styled.div`
  font-size: 8px;
  color: grey;
  align-self: flex-end;
  text-align: ${props => props.self ? 'left' : 'right'};
  @media (max-width: 700px) {
    
  }
`;

export const Input = styled.input`
  padding: 5px;
  font: inherit;
  font-size: large;
  border-radius: 10px;
  height: 25px;
  width: 60vw;
  align-self: center;
  &:focus {
    outline: none;
    border: solid transparent 2px;
    border-image: linear-gradient(101deg, #38b8f2, #843cf6, #f030c1, #6094ea, #fd8041, #ff4ca1, #ffa7e7, #ea6362, #4dd0e1, #6078ea, #38b8f2, #843cf6);
    border-image-slice: 1;
  }
  @media (max-width: 700px) {
    width: 50vw;
  }
`;

export const Button = styled.button`
  width: 30px;
  height: 30px;
  background-image: url(${send});
  background-size: contain;
  background-color: transparent;
  border: solid transparent 0px;
  position: relative;
  object-fit: contain;
  align-self: center;
  &:hover {
    opacity: 60%;
  }
`;

export const WrapInput = styled.div`
  display: flex;
  height: 10vh;
  justify-content: space-evenly;
`;
