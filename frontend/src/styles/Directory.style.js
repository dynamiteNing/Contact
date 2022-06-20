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
  width: 55vw;
  overflow: auto;
  padding: 3vw;
  background-color: #f8f8f8;
  justify-content: center;
`;

export const ProfileButton = styled.div`
  border: solid transparent 1px;
  background-color: #e2d8ee;
  font: inherit;
  font-size: large;
  height: 40px;
  line-height: 40px;
  margin: 10px auto;
`;

export const Allartists = styled.div`
  width: 25vw;
  height: 65vh;
  overflow: auto;
  background-color: #f8f8f8;
  padding: 2vw;
`;

export const SmallTitle = styled.div`
  color: grey;
  text-align: left;
`;

export const Seperate = styled.div`
  margin-top: 30px;
  margin-bottom: 10px;
  width: 100%;
  border: 0;
  height: 1px;
  background: #333;
  background-image: linear-gradient(to right, #ccc, #333, #ccc);
`;