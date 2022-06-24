import styled from 'styled-components';

export const Seperate = styled.div`
  // margin-top: 30px;
  margin-bottom: 3vh;
  width: 100%;
  border: 0;
  height: 1px;
  background: #333;
  // background-image: linear-gradient(to right, #ccc, #333, #ccc);
  background-image: linear-gradient(101deg, #38b8f2, #843cf6, #f030c1, #6094ea, #fd8041, #ff4ca1, #ffa7e7, #ea6362, #4dd0e1, #6078ea, #38b8f2, #843cf6)
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
