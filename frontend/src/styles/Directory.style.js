import styled from 'styled-components';

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
  align-items: center;
  display: flex;
`;

export const Allartists = styled.div`
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

export const ProfileButton = styled.div`
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

export const SmallTitle = styled.div`
  text-align: left;
  font-variant: small-caps;
  font-size: large;
  font-weight: bold;
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

export const SingleProfile = styled.div`

`;

export const Name = styled.div`
  font-weight: bold;
  background-color: #e2d8ee;
  padding: 5px;
  border-radius: 3px;
  display: ${props => Object.entries(props.profile).length === 0 ? 'none' : ''};
`;

export const Quote = styled.div`
  margin-bottom: 3vh;
  margin-top: 1vh;
  font-size: 12px;
`;

export const Button = styled.button`
  width: 10vw;
  font: inherit;
  font-size: medium;
  font-variant: small-caps;
  font-weight: bold;
  height: 30px;
  text-align: center;
  border-color: transparent; 
  border-radius: 10px;
  align-self: center;
  background-color: #e2d8ee;
  &:hover {
    opacity: 70%;
  }
  display: ${props => (Object.entries(props.profile).length === 0 || (props.dont)) ? 'none' : ''};
`;

export const Avatar = styled.img`
  width: 16vw;
  border-radius: 8vw;
  aspect-ratio: 1/1;
  margin-bottom: 1vh;  
`;
