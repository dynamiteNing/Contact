import styled from 'styled-components';
import directory from '../images/directory.png';
import chat from '../images/chat.png';
import more from '../images/more.png';
import logout from '../images/logout.png';
{/* <a href="https://www.flaticon.com/free-icons/directory" title="directory icons">Directory icons created by SumberRejeki - Flaticon</a> */ }
{/* <a href="https://www.flaticon.com/free-icons/chat" title="chat icons">Chat icons created by Kiranshastry - Flaticon</a> */}
{/* <a href="https://www.flaticon.com/free-icons/logout" title="logout icons">Logout icons created by SumberRejeki - Flaticon</a> */}

export const Head = styled.div`
  width: 100%; 
  height: 10vh;
  min-height: 60px;
  max-height: 80px;
  text-align: center;
  display: flex;
  background: linear-gradient(to right, #444, #333, #222, #111, #000, #111, #222, #333, #444);
  align-items: center;
  align-content: center;
`

export const Contact = styled.div`
  font-size: 2em;
  color: #d3b7d8;
  font-weight: bold;
  font-style: oblique;
  font-variant: small-caps;
  margin-left: 5vw;
`;

export const Directory = styled.div`
  max-width: 40px;
  min-width: 20px;
  width: 5vw;
  height: fit-content;
  aspect-ratio: 1;
  align-self: center;
  margin-left: auto;
  background-image: url(${directory});
  background-size: contain;
  border: solid #222222 1px;
  &:hover {
    border-image: linear-gradient(101deg, #38b8f2, #843cf6, #f030c1, #6094ea, #fd8041, #ff4ca1, #ffa7e7, #ea6362, #4dd0e1, #6078ea, #38b8f2, #843cf6);
    border-image-slice: 1;
  }
`
export const Chat = styled.div`
  max-width: 40px;
  min-width: 20px;
  width: 5vw;
  height: fit-content;
  aspect-ratio: 1;
  align-self: center;
  margin-left: auto;
  background-image: url(${chat});
  background-size: contain;
  border: solid #222222 1px;
  &:hover {
    border-image: linear-gradient(101deg, #38b8f2, #843cf6, #f030c1, #6094ea, #fd8041, #ff4ca1, #ffa7e7, #ea6362, #4dd0e1, #6078ea, #38b8f2, #843cf6);
    border-image-slice: 1;
  }
`

export const More = styled.div`
  max-width: 40px;
  min-width: 20px;
  width: 5vw;
  height: fit-content;
  aspect-ratio: 1;
  align-self: center;
  margin-left: auto;
  background-image: url(${more});
  background-size: contain;
  border: solid #222222 1px;
  &:hover {
    border-image: linear-gradient(101deg, #38b8f2, #843cf6, #f030c1, #6094ea, #fd8041, #ff4ca1, #ffa7e7, #ea6362, #4dd0e1, #6078ea, #38b8f2, #843cf6);
    border-image-slice: 1;
  }
`

export const Logout = styled.div`
  max-width: 40px;
  min-width: 20px;
  width: 5vw;
  height: fit-content;
  aspect-ratio: 1;
  align-self: center;
  margin-left: auto;
  margin-right: 10vw;
  background-image: url(${logout});
  background-size: contain;
  border: solid #222222 1px;
  &:hover {
    border-image: linear-gradient(101deg, #38b8f2, #843cf6, #f030c1, #6094ea, #fd8041, #ff4ca1, #ffa7e7, #ea6362, #4dd0e1, #6078ea, #38b8f2, #843cf6);
    border-image-slice: 1;
  }
`
