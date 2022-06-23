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

export const FunctionBar = styled.div`
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

export const FunctionButton = styled.div`
  border: solid transparent 1px;
  border-radius: 3px;
  border-image: ${props => props.active ? 'linear-gradient(101deg, #38b8f2, #843cf6, #f030c1, #6094ea, #fd8041, #ff4ca1, #ffa7e7, #ea6362, #4dd0e1, #6078ea, #38b8f2, #843cf6)' : ''};
  border-image-slice: 1;
  background-color: #e2d8ee;
  font: inherit;
  font-size: large;
  font-variant: small-caps;
  font-weight: bold;
  height: 40px;
  line-height: 40px;
  margin: 20px auto;
  opacity: ${props => props.active ? 1 : 0.6 };
`;

export const SingleProfile = styled.div`
  
`;

export const Name = styled.div`
  font-weight: bold;
  background-color: #e2d8ee;
  padding: 5px;
  border-radius: 3px;
  ${'' /* display: flex; */}
`;

export const Quote = styled.div`
  margin-top: 3vh;
  font-size: 12px;
`;

export const Profile = styled.div`

`;

export const Avatar = styled.img`
  width: 16vw;
  border-radius: 8vw;
  aspect-ratio: 1/1;  
  margin-bottom: 1vh;
`;

export const SingleArtist = styled.div`

`;

export const Tpfield = styled.div`
  height: 30px;
  width: 200px;
  border: 1px solid gray;
  border-radius: 8px;
  margin: 20px 0;
  padding: 3px auto;
  text-align: center;
`
