import styled from 'styled-components';

export const Main = styled.main`
  margin-top: 10vh;
  justify-content: center;
  text-align: center;
`;

export const Wrap = styled.div`
  justify-content: space-around;
  display: flex;
  flex-wrap: warp;
`;

export const Board = styled.div`
  height: 60vh;
  width: 60vw;
  overflow: auto;
  padding: 3vw;
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
  width: 47vw;
  &:focus {
    outline: none;
    border: solid transparent 2px;
    border-image: linear-gradient(101deg, #38b8f2, #843cf6, #f030c1, #6094ea, #fd8041, #ff4ca1, #ffa7e7, #ea6362, #4dd0e1, #6078ea, #38b8f2, #843cf6);
    border-image-slice: 1;
  }
`;

export const Button = styled.button`
  width: 9vw;
  background-color: #e2d8ee;
  font: inherit;
  font-size: large;
  font-variant: small-caps;
  font-weight: bold;
  height: 40px;
  padding: 5px;
  border-color: transparent; 
  border-radius: 10px;
  align-self: center;
  &:hover {
    opacity: 70%;
  }
`;

export const WrapInput = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 1vw
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
  padding: 2vw;
`;

export const SmallTitle = styled.div`
  text-align: left;
  font-variant: small-caps;
  font-size: large;
  font-weight: bold;
`;