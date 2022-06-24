import styled from 'styled-components';

export const Main = styled.main`
  justify-content: center;
  text-align: center;
`;

export const Wrap = styled.div`
  ${'' /* justify-content: space-around; */}
  justify-content: center;
  display: flex;
  flex-wrap: warp;
`;

export const SideBar = styled.div`
  // width: 20vw;
  width: 30vw;
  height: 80vh;
  overflow: auto;
  padding: 5vh 0 5vh 0;
  // padding: 5vh 5vw 5vh 5vw;
  border-right: solid transparent 1px;
  border-image: linear-gradient(101deg, #38b8f2, #843cf6, #f030c1, #6094ea, #fd8041, #ff4ca1, #ffa7e7, #ea6362, #4dd0e1, #6078ea, #38b8f2, #843cf6);
  border-image-slice: 1;
`;

export const SmallTitle = styled.div`
  text-align: left;
  font-variant: small-caps;
  font-size: large;
  font-weight: bold;
  padding: 0 3vw 1vh 3vw;
`;

export const SmallAvatar = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 35px;
  align-self: center;
  padding-right: 10px;
`;

/** 
  * PARTIAL 
  **/

export const Board = styled.div`
  height: 80vh;
  width: 60vw;
  overflow: auto;
  padding: 5vh 5vw 5vh 5vw;
  justify-content: center;
  align-items: center;
  display: flex;
`;

export const SideButton = styled.div`
  // border: solid transparent 1px;
  // border-radius: 3px;
  // border-image: ${props => props.active ? 'linear-gradient(101deg, #38b8f2, #843cf6, #f030c1, #6094ea, #fd8041, #ff4ca1, #ffa7e7, #ea6362, #4dd0e1, #6078ea, #38b8f2, #843cf6)' : ''};
  // border-image-slice: 1;
  // background-color: #e2d8ee;
  font: inherit;
  font-size: large;
  // height: 40px;
  // line-height: 40px;
  // margin: 10px auto;
  // opacity: ${props => props.active ? 1 : 0.6 };

  display: flex;
  background-color: ${props => props.active ? '#e2d8ee' : 'transparent'};
  padding: 0 3vw 0 3vw;
  height: 100px;
  line-height: 100px;
  &:hover {
    background-color: #e2d8ee;
    opacity: ${props => props.active ? '1' : '0.6'};
  }
`;