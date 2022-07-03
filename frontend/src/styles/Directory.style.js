import styled from 'styled-components';
import subscribe from '../images/subscribe.png';
import subscribe_hover from '../images/subscribe_hover.png';
import chat from '../images/send.png';
import chat_hover from '../images/send_hover.png';
import purchase from '../images/purchase_.png';
import purchase_hover from '../images/purchase_hover.png';
{/* <a href="https://www.flaticon.com/free-icons/subscriber" title="subscriber icons">Subscriber icons created by Ferdinand - Flaticon</a> */}
{/* <a href="https://www.flaticon.com/free-icons/buy" title="buy icons">Buy icons created by Freepik - Flaticon</a> */}

export const Seperate = styled.div`
  margin-bottom: 3vh;
  width: 100%;
  border: 0;
  height: 1px;
  background: #333;
  background-image: linear-gradient(101deg, #38b8f2, #843cf6, #f030c1, #6094ea, #fd8041, #ff4ca1, #ffa7e7, #ea6362, #4dd0e1, #6078ea, #38b8f2, #843cf6);
`;

export const SingleProfile = styled.div`
  @media (max-width: 700px) {
    justify-connect: center;
  }
`;

export const Quote = styled.div`
  margin-bottom: 3vh;
  margin-top: 1vh;
  font-size: 12px;
`;

export const Subscribe = styled.button`
  max-width: 50px;
  width: 10vw;
  aspect-ratio: 1;
  align-self: center;
  margin-left: auto;
  background-image: url(${subscribe});
  background-size: contain;
  border: solid transparent 0px;
  background-color: transparent;
  &:hover {
    background-image: url(${subscribe_hover});
    background-size: contain;
  }
  display: ${props => (Object.entries(props.profile).length === 0 || (props.dont) || props.friend) ? 'none' : ''};
`

export const Chat = styled.button`
  max-width: 50px;
  width: 10vw;
  aspect-ratio: 1;
  align-self: center;
  margin-left: auto;
  background-image: url(${chat});
  background-size: contain;
  border: solid transparent 0px;
  background-color: transparent;
  &:hover {
    background-image: url(${chat_hover});
    background-size: contain;
  }
  display: ${props => (Object.entries(props.profile).length === 0 || (props.dont) || !props.friend) ? 'none' : ''};
`

export const Buy = styled.button`
  max-width: 60px;
  width: 15vw;
  aspect-ratio: 1;
  align-self: center;
  margin-left: auto;
  margin-top: 3vh;
  background-image: url(${purchase});
  background-size: contain;
  border: solid transparent 0px;
  background-color: transparent;
  &:hover {
    background-image: url(${purchase_hover});
    background-size: contain;
  }
`