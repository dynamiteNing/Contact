import styled from 'styled-components';
import directory from '../images/directory.png';
import chat from '../images/chat.png';
import more from '../images/more.png';
import logout from '../images/logout.png';
import cursor from '../images/cursor_light.png';
{/* <a href="https://www.flaticon.com/free-icons/directory" title="directory icons">Directory icons created by SumberRejeki - Flaticon</a> */ }
{/* <a href="https://www.flaticon.com/free-icons/chat" title="chat icons">Chat icons created by Kiranshastry - Flaticon</a> */}
{/* <a href="https://www.flaticon.com/free-icons/logout" title="logout icons">Logout icons created by SumberRejeki - Flaticon</a> */ }
{/* <a href="https://www.flaticon.com/free-icons/cursor" title="cursor icons">Cursor icons created by zky.icon - Flaticon</a> */}

export const Head = styled.div`
  width: 100%; 
  height: 10vh;
  max-height: 80px;
  text-align: center;
  display: flex;
  background-color: #222222;
  align-items: center;
  align-content: center;
`

export const Contact = styled.div`
  font-size: 2em;
  color: #d3b7d8;
  font-weight: bold;
  font-style: oblique;
  font-variant: small-caps;
  letter-spacing: 1px;
  margin-left: 5vw;
  margin-right: auto;
`;

export const Button = styled.div`
  width: 18vw;
  height: 100%;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  cursor: url(${cursor}), auto;
  &:hover{
    background-color: #444444;
  }
  @media (max-width: 700px) {
    margin-left: auto;
    width: 10vw;
  }
`;

export const Navigation = styled.div`
  color: #d3b7d8;
  font-weight: bold;
  font-style: oblique;
  font-variant: small-caps;
  margin-left: 1vw;
  letter-spacing: 1px;
  @media (max-width: 700px) {
    display: none;
  }
`;

export const Directory = styled.div`
  max-width: 40px;
  min-width: 20px;
  width: 18%;
  height: fit-content;
  aspect-ratio: 1;
  align-self: center;
  background-image: url(${directory});
  background-size: contain;
  border: solid #222222 0px;
  @media (max-width: 700px) {
    margin: auto;
    width: 4vw;
  }
`
export const Chat = styled.div`
  max-width: 40px;
  min-width: 20px;
  width: 18%;
  height: fit-content;
  aspect-ratio: 1;
  align-self: center;
  background-image: url(${chat});
  background-size: contain;
  border: solid #222222 0px;
  @media (max-width: 700px) {
    margin: auto;
    width: 4vw;
  }
`

export const More = styled.div`
  max-width: 40px;
  min-width: 20px;
  width: 18%;
  height: fit-content;
  aspect-ratio: 1;
  align-self: center;
  background-image: url(${more});
  background-size: contain;
  border: solid #222222 0px;
  @media (max-width: 700px) {
    margin: auto;
    width: 4vw;
  }
`

export const Logout = styled.div`
  max-width: 40px;
  min-width: 20px;
  width: 18%;
  height: fit-content;
  aspect-ratio: 1;
  align-self: center;
  background-image: url(${logout});
  background-size: contain;
  border: solid #222222 0px;
  @media (max-width: 700px) {
    margin: auto;
    width: 4vw;
  }
`
