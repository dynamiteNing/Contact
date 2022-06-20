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
  height: 65vh;
  width: 60vw;
  overflow: auto;
  padding: 3vw;
  background-color: #f8f8f8;
  justify-content: center;
`;

export const Group = styled.div`
  width: 60%;
  margin-left: ${props => props.self ? 'auto' : '0'};
  margin-bottom: 10px;
`;

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
  width: 45vw;
  &:focus {
    outline: none;
    border: solid #d3b7d8 3px;
  }
`;

export const Button = styled.button`
  width: 10vw;
  font: inherit;
  font-size: large;
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
  background-color: #e2d8ee;
  font: inherit;
  font-size: large;
  height: 40px;
  line-height: 40px;
  margin-bottom: 20px
`;

export const Friends = styled.div`
  width: 23vw;
  height: 65vh;
  overflow: auto;
  background-color: #f8f8f8;
  padding: 3vw;
`;