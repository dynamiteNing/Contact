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
  padding: 5vh 0 5vh 0;
  border-right: solid transparent 1px;
  border-image: linear-gradient(101deg, #38b8f2, #843cf6, #f030c1, #6094ea, #fd8041, #ff4ca1, #ffa7e7, #ea6362, #4dd0e1, #6078ea, #38b8f2, #843cf6);
  border-image-slice: 1;
  @media (max-width: 700px) {
    background-color: #f8f8f8;
    width: 20vw;
    z-index: 99;
  }
`;

export const SmallTitle = styled.div`
  text-align: left;
  font-variant: small-caps;
  font-size: large;
  font-weight: bold;
  padding: 0 3vw 1vh 3vw;
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
  background-color: #e2d8ee;
  padding: 5px;
  border-radius: 3px;
  ${'' /* display: ${props => Object.entries(props.profile).length === 0 ? 'none' : ''}; */}
`;