import styled, { keyframes } from 'styled-components';
import myprofile from '../images/profile.png';
import purchase from '../images/purchase.png';
import mypurchase from '../images/my_purchase.png';
import pay from '../images/pay.png';
import pay_hover from '../images/pay_hover.png';
import previous from '../images/return.png';
import previous_hover from '../images/return_hover.png';
import save from '../images/save.png';
import save_hover from '../images/save_hover.png';
import arrow from '../images/arrow.png';
import cursor from '../images/cursor.png';
{/* <a href="https://www.flaticon.com/free-icons/online-payment" title="online-payment icons">Online-payment icons created by Freepik - Flaticon</a> */ }
{/* <a href="https://www.flaticon.com/free-icons/login" title="login icons">Login icons created by Pixel perfect - Flaticon</a> */}
{/* <a href="https://www.flaticon.com/free-icons/ui" title="ui icons">Ui icons created by Ahmer - Flaticon</a> */}

export const FunctionButton = styled.div`
  font: inherit;
  font-size: large;
  font-variant: small-caps;
  font-weight: bold;
  height: 100px;
  line-height: 100px;
  padding: 0 3vw 0 3vw;
  display: ${props => props.dont ? 'none' : 'flex'};
  background-color: ${props => props.active ? '#e2d8ee' : 'transparent'};
  cursor: url(${cursor}), auto;
  &:hover {
    background-color: #e2d8ee;
    opacity: ${props => props.active ? 1 : 0.6};
  }
  @media (max-width: 700px) {
    height: 60px;
    padding: 0 1vw 0 1vw;
  }
`;

export const SingleProfile = styled.div`
`;

export const NameSmall = styled.div`
  font-weight: bold;
  letter-spacing: 1px;
  font-size: large;
  background-color: #e2d8ee;
  padding: 5px;
  border-radius: 3px;
  margin: 10px auto;
  align-self: center;
  @media (max-width: 700px) {
    font-size: medium;
    margin: 5px auto;
  }
`;

export const QuoteChange = styled.input`
  font: inherit;
  font-size: medium;
  padding: 5px;
  border-radius: 3px;
  border: solid #222222 1px;
  text-align: center;
  width: 82%;
  align-self: center;
  &:focus {
    outline: none;
    border: solid #622569 1px;
  }
`;

export const ChangeButton = styled.button`
  border: solid #f8f8f8 0px;
  background-color: transparent;
  width: 10%;
  height: fit-content;
  aspect-ratio: 1;
  align-self: center;
  background-image: url(${save});
  background-size: contain;
  cursor: url(${cursor}), auto;
  &:hover {
    background-image: url(${save_hover});
    background-size: contain;
  }
`;

export const Quote = styled.div`
  margin-top: 3vh;
  font-size: 12px;
`;

export const Profile = styled.div`
  width: 30%;
  max-height: 30%;
  margin: auto;
  cursor: url(${cursor}), auto;
  @media (max-width: 700px) {
    width: 40%;
    max-height: 35%;
  }
`;

export const Allsuggusted = styled.div`
  width: 100%;
  height: 100%;
  justify-content: space-evenly;
  display: flex;
  flex-wrap: wrap;
  @media (max-width: 700px) {
    height: 100%;
  }
`;

export const SmallAvatar = styled.img`
  width: 60%;
  height: 60%;
  border-radius: 25%;
  align-self: center;
`;

export const SingleArtist = styled.div`
`;

export const Tpfield = styled.div`
  height: 25px;
  width: 200px;
  border-radius: 10px;
  border: solid #222222 1px;
  padding: 3px;
  font: inherit;
  text-align: center;
  align-self: center;
  margin: 10px auto;
  &:focus {
    outline: none;
    border: solid #622569 1px;
  }
`;

export const Input = styled.input`
  height: 25px;
  width: 200px;
  border-radius: 10px;
  border: solid #222222 1px;
  background-color: transparent;
  padding: 3px;
  font: inherit;
  text-align: center;
  align-self: center;
  margin: 5px auto;
  &:focus {
    outline: none;
    border: solid #622569 1px;
  }
`;

const Animation = keyframes`
  0% { opacity: 0.2; }
  50% { opacity: 1; }
  100% { opacity: 0.2; }
`;

export const Arrow = styled.div`
  width: 25px;
  height: fit-content;
  aspect-ratio: 1;
  align-self: center;
  margin-right: 10px;
  background-image: url(${arrow});
  background-size: contain;
  background-color: transparent;
  border: solid #f8f8f8 0px;
  animation-name: ${Animation};
  animation-duration: 1.5s;
  animation-iteration-count: infinite;
`;

export const Pay = styled.button`
  width: 60px;
  height: fit-content;
  aspect-ratio: 1;
  align-self: center;
  background-image: url(${pay});
  background-size: contain;
  border: solid #f8f8f8 2px;
  background-color: transparent;
  cursor: url(${cursor}), auto;
  &:hover {
    background-image: url(${pay_hover});
    background-size: contain;
  }
`;

export const Seperate = styled.div`
  margin: 10px auto;
  width: 100%;
  border: 0;
  height: 1px;
  background: #333;
  /* background-image: linear-gradient(to right, #ccc, #333, #ccc); */
  background-image: linear-gradient(101deg, #e2d8ee, #d3b7d8, #622569, #6b5b95, #622569, #d3b7d8, #e2d8ee);
`;

export const Myprofile = styled.div`
  width: 30px;
  height: fit-content;
  aspect-ratio: 1;
  align-self: center;
  background-image: url(${myprofile});
  background-size: contain;
  margin-right: 10px;
  @media (max-width: 700px) {
    width: 50%;
    max-width: 50px;
    margin: auto;
  }
`;

export const Buy = styled.div`
  width: 30px;
  height: fit-content;
  aspect-ratio: 1;
  align-self: center;
  background-image: url(${purchase});
  background-size: contain;
  margin-right: 10px;
  @media (max-width: 700px) {
    width: 50%;
    max-width: 50px;
    margin: auto;
  }
`;

export const Mypurchase = styled.div`
  width: 30px;
  height: fit-content;
  aspect-ratio: 1;
  align-self: center;
  background-image: url(${mypurchase});
  background-size: contain;
  margin-right: 10px;
  @media (max-width: 700px) {
    width: 50%;
    max-width: 50px;
    margin: auto;
  }
`;

export const Previous = styled.div`
  width: 25px;
  height: fit-content;
  aspect-ratio: 1;
  align-self: center;
  background-image: url(${previous});
  background-size: contain;
  margin-bottom: 10px;
  cursor: url(${cursor}), auto;
  &:hover {
    background-image: url(${previous_hover});
    background-size: contain;
  }
`;

export const BuyList = styled.div`
  width: 65%;
  @media (max-width: 700px) {
    width: 75%;
  }
`;

export const SingleBuy = styled.div`
  justify-content: space-between;
  height: 50px;
  display: flex;
  margin-bottom: 10px;
  @media (max-width: 700px) {
    display: block;
  }
`;

export const Time = styled.div`
  align-self: center;
  @media (max-width: 700px) {
    font-size: 12px;
    padding: 5px;
  }
`;

export const BuyName = styled.div`
  font-weight: bold;
  letter-spacing: 1px;
  /* background-color: #e2d8ee; */
  padding: 5px;
  border-radius: 3px;
  align-self: center;
  margin-left: 3px;
`;