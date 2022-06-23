import styled from 'styled-components';
import send from '../images/send.png';

export const Main = styled.main`
  margin-top: 10vh;
  justify-content: center;
  text-align: center;
`;

export const Wrap = styled.div`
  // justify-content: space-around;
  justify-content: center;
  display: flex;
  flex-wrap: warp;
`;

export const Board = styled.div`
  height: 60vh;
  width: 60vw;
  overflow: auto;
  // padding: 3vw;
  padding: 5vw;
  background-color: #f8f8f8;
  justify-content: center;
`;

export const Tuple = styled.div`
  width: 85%;
  margin-left: ${props => props.self ? 'auto' : '0'};
  margin-bottom: 10px;
  display: flex;
`

export const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin-right: 10px;
  align-self: center;
  display: ${props => props.self ? 'none' : ''};
`;

export const Group = styled.div`
  max-width: ${props => props.self ? '100%' : '90%'};
  margin-left: ${props => props.self ? 'auto' : '0'};
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
`;

export const Time = styled.div`
  font-size: 8px;
  color: grey;
  align-self: flex-end;
  text-align: ${props => props.self ? 'left' : 'right'};
`;

export const Input = styled.input`
  padding: 5px;
  font: inherit;
  font-size: large;
  border-radius: 10px;
  height: 30px;
  width: 60vw;
  &:focus {
    outline: none;
    border: solid transparent 2px;
    border-image: linear-gradient(101deg, #38b8f2, #843cf6, #f030c1, #6094ea, #fd8041, #ff4ca1, #ffa7e7, #ea6362, #4dd0e1, #6078ea, #38b8f2, #843cf6);
    border-image-slice: 1;
  }
`;

export const Button = styled.button`
  width: 35px;
  height: 35px;
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

{/* <a href="https://www.flaticon.com/free-icons/send" title="send icons">Send icons created by Gregor Cresnar - Flaticon</a> */}

export const WrapInput = styled.div`
  display: flex;
  // justify-content: space-around;
  justify-content: space-evenly;
  margin-top: 1vh;
`;

export const ChatButton = styled.div`
  border: solid transparent 1px;
  border-radius: 3px;
  border-image: ${props => props.active ? 'linear-gradient(101deg, #38b8f2, #843cf6, #f030c1, #6094ea, #fd8041, #ff4ca1, #ffa7e7, #ea6362, #4dd0e1, #6078ea, #38b8f2, #843cf6)' : ''};
  border-image-slice: 1;
  background-color: #e2d8ee;
  font: inherit;
  font-size: large;
  height: 40px;
  line-height: 40px;
  margin: 10px auto;
  opacity: ${props => props.active ? 1 : 0.6 };
`;

export const Friends = styled.div`
  width: 20vw;
  height: 60vh;
  overflow: auto;
  background-color: #f8f8f8;
  // padding: 2vw;
  padding: 5vw;
  border-right: solid transparent 1px;
  border-image: linear-gradient(101deg, #38b8f2, #843cf6, #f030c1, #6094ea, #fd8041, #ff4ca1, #ffa7e7, #ea6362, #4dd0e1, #6078ea, #38b8f2, #843cf6);
  border-image-slice: 1;
`;

export const SmallTitle = styled.div`
  text-align: left;
  font-variant: small-caps;
  font-size: large;
  font-weight: bold;
`;