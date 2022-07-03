import styled, { keyframes } from 'styled-components';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export const MySwal = withReactContent(Swal);

export const Main = styled.main`
  justify-content: center;
  text-align: center;
`;

export const Wrap = styled.div`
  justify-content: center;
  display: flex;
  flex-wrap: warp;
`;

export const SideBar = styled.div`
  width: 30vw;
  height: 80vh;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-track {
    border-radius: 2px;
    -webkit-box-shadow: inset 0 0 2px rgba(0,0,0,0.2); 
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 2px;
    -webkit-box-shadow: inset 0 0 2px rgba(0,0,0,0.4); 
  }

  padding: 5vh 0 5vh 0;
  background-color: #f3f3f3;
  @media (max-width: 700px) {
    width: 20vw;
    z-index: 99;
  }
`;

export const SmallTitle = styled.div`
  text-align: left;
  font-variant: small-caps;
  font-style: oblique;
  font-size: large;
  letter-spacing: 1px;
  font-weight: bold;
  padding: 0 3vw 1vh 3vw;
  margin-top: ${props => props.notfriend ? '5vh': 0};
  @media (max-width: 700px) {
    font-size: 12px;
  }
`;

export const SmallAvatar = styled.img`
  width: 70px;
  height: fit-content;
  aspect-ratio: 1;
  border-radius: 35px;
  align-self: center;
  margin-right: 10px;
  @media (max-width: 700px) {
    width: 75%;
    max-width: 50px;
    margin: auto;
  }
`;

export const SmallName = styled.div`
  font-style: oblique;
  letter-spacing: 1px;
  @media (max-width: 700px) {
    display: none;
  }
`;

export const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const WrapButton = styled.div`
  align-self: center;
  justify-content: center;
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  margin: 20px auto;
`;

/** 
  * PARTIAL 
  **/

export const Animation = keyframes`
  0% { opacity: 0.7; }
  50% { opacity: 1; }
  100% { opacity: 0.7; }
`;

export const Board = styled.div`
  height: 80vh;
  width: 60vw;
  overflow: auto;
  padding: 5vh 5vw 5vh 5vw;
  justify-content: center;
  align-items: center;
  display: flex;
  @media (max-width: 700px) {
    width: 70vw;
  }
`;

export const SideButton = styled.div`
  font: inherit;
  font-size: large;

  display: flex;
  background-color: ${props => props.active ? '#e2d8ee' : 'transparent'};
  padding: 0 3vw 0 3vw;
  height: 100px;
  line-height: 100px;
  &:hover {
    background-color: #e2d8ee;
    opacity: ${props => props.active ? '1' : '0.6'};
  }

  @media (max-width: 700px) {
    height: 60px;
    padding: 0 1vw 0 1vw;
  }
`;

export const Avatar = styled.img`
  width: 20vw;
  aspect-ratio: 1;
  border-radius: 25%;
  margin-bottom: 1vh;  
  @media (max-width: 700px) {
    width: 35vh;
  }
`;

export const Name = styled.div`
  font-weight: bold;
  letter-spacing: 1px;
  background-color: #e2d8ee;
  padding: 5px;
  border-radius: 3px;
`;