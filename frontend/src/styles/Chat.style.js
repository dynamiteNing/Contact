import styled from 'styled-components';

export const Contact = styled.div`
  font-size: 30px;
`;

export const Main = styled.main`
  margin-top: 50px;
  justify-content: center;
  text-align: center;
`;

export const Wrap = styled.div`
  justify-content: space-around;
  text-align: center;
  display: flex;
  flex-wrap: warp;
`;

export const Board = styled.div`
  height: 70vh;
  width: 60vw;
  overflow-y: scroll;
  padding: 3%;
  background-color: whitesmoke;
  text-align: center;
  justify-content: center;
`;

export const Group = styled.div`
  max-width: 80%;
  display: flex;
`;

export const Name = styled.div`
  font-weight: bold;
`;

export const Message = styled.div`
  word-wrap: normal;
`;

export const Time = styled.div`
  font-size: 8px;
  color: grey;
  align-self: flex-end;
`;

export const Input = styled.input`
  padding: 5px;
  font: inherit;
  font-size: large;
  border-radius: 10px;
  height: 30px;
  width: 80%;
`;

export const Button = styled.button`
  width: 15%;
  font: inherit;
  font-size: large;
  height: 40px;
  padding: 5px;
  border-radius: 10px;
  align-self: center;
  margin-left: 1%;
  &:hover {
    opacity: 70%;
  }
`;