import styled from 'styled-components';
import directory from '../images/directory.png';
import chat from '../images/chat.png';
import more from '../images/more.png';
import logout from '../images/logout.png';
{/* <a href="https://www.flaticon.com/free-icons/directory" title="directory icons">Directory icons created by SumberRejeki - Flaticon</a> */ }
{/* <a href="https://www.flaticon.com/free-icons/chat" title="chat icons">Chat icons created by Kiranshastry - Flaticon</a> */}
{/* <a href="https://www.flaticon.com/free-icons/more" title="more icons">More icons created by Kirill Kazachek - Flaticon</a> */}
{/* <a href="https://www.flaticon.com/free-icons/logout" title="logout icons">Logout icons created by SumberRejeki - Flaticon</a> */}

export const Head = styled.div`
  width: 100%; 
  height: 10vh;
  min-height: 60px;
  max-height: 80px;
  text-align: center;
  display: flex;
  background: radial-gradient(#000000 10%, #111111 30%, #222222 50%);
  align-items: center;
`

export const Contact = styled.div`
  font-size: 45px;
  color: #d3b7d8;
  font-weight: bold;
  font-style: oblique;
  font-variant: small-caps;
  margin-left: 5vw;
`;

export const Directory = styled.img`
  width: 40px;
  height: 40px;
  align-self: center;
  margin-left: auto;
  background-image: url(${directory});
  background-size: contain;
  border: solid transparent 0px;
`
export const Chat = styled.img`
  width: 40px;
  height: 40px;
  align-self: center;
  margin-left: auto;
  background-image: url(${chat});
  background-size: contain;
  border: solid transparent 0px;
`

export const More = styled.img`
  width: 40px;
  height: 40px;
  align-self: center;
  margin-left: auto;
  background-image: url(${more});
  background-size: contain;
  border: solid transparent 0px;
`

export const Logout = styled.img`
  width: 40px;
  height: 40px;
  align-self: center;
  margin-left: auto;
  background-image: url(${logout});
  background-size: contain;
  border: solid transparent 0px;
`

// .header__logo {
//   width: 258px;
//   height: 48px;
//   background-image: url(/images/logo.png);
//   background-size: contain;
// }

// .header__categories {
//   margin-top: 16px;
//   margin-left: 57px;
// }

// .header__category {
//   font-size: 20px;
//   letter-spacing: 30px;
//   padding-left: 39px;
//   padding-right: 11px;
//   position: relative;
//   text-decoration: none;
//   color: #3f3a3a;
// }

// .header__category--active {
//   color: #8b572a;
// }

// .header__category:hover {
//   color: #8b572a;
// }

// .header__category + .header__category::before {
//   content: '|';
//   position: absolute;
//   left: 0;
//   color: #3f3a3a;
// }

// .header__search-input {
//   height: 40px;
//   width: 214px;
//   border: none;
//   outline: none;
//   margin-left: auto;
//   border-radius: 20px;
//   padding: 6px 45px 6px 20px;
//   border: solid 1px #979797;
//   background-image: url(/images/search.png);
//   background-size: 44px;
//   background-position: 160px center;
//   background-repeat: no-repeat;
//   font-size: 20px;
//   line-height: 24px;
//   color: #8b572a;
// }

// .header__search-icon {
//   position: absolute;
//   top: 2px;
//   right: 8px;
// }

// .header__links {
//   margin-left: 42px;
//   display: flex;
// }

// .header__link + .header__link {
//   margin-left: 42px;
// }

// .header__link-icon-cart,
// .header__link-icon-profile,
// .header__link-icon-forum {
//   width: 44px;
//   height: 44px;
//   cursor: pointer;
// }

// .header__link-icon-forum {
//   height: 52px;
//   background-image: url(/images/forum.png);
//   background-size: contain;
//   position: relative;
//   object-fit: contain;
// }

// .header__link-icon-cart {
//   background-image: url(/images/cart.png);
//   background-size: contain;
//   position: relative;
// }

// .header__link-icon-cart-number {
//   position: absolute;
//   bottom: 0;
//   right: 0;
//   width: 24px;
//   height: 24px;
//   background-color: #8b572a;
//   color: white;
//   border-radius: 50%;
//   text-align: center;
// }

// .header__link-icon-profile {
//   background-image: url(/images/profile.png);
//   background-size: contain;
// }

// .header__link-text {
//   display: none;
// }

// @media screen and (max-width: 1279px) {
//   .header {
//     height: 52px;
//     padding: 0;
//     padding-right: 0;
//     border: none;

//     justify-content: center;
//   }

//   .header__logo {
//     width: 129px;
//     height: 24px;
//   }

//   .header__categories {
//     margin-top: 0;
//     margin-left: 0;

//     position: fixed;
//     top: 52px;
//     left: 0;
//     width: 100%;
//     height: 50px;
//     display: flex;
//     background-color: #313538;
//   }

//   .header__category {
//     font-size: 16px;
//     letter-spacing: normal;
//     padding: 0;
//     text-align: center;
//     color: #828282;
//     line-height: 50px;
//     flex-grow: 1;
//   }

//   .header__category--active {
//     color: white;
//   }

//   .header__category:hover {
//     color: white;
//   }

//   .header__category + .header__category::before {
//     color: #828282;
//   }

//   .header__search-input {
//     width: 0;
//     border: none;
//     position: fixed;
//     right: 16px;
//     background-size: 32px;
//     background-position: right center;
//   }

//   .header__search-input:focus {
//     width: calc(100% - 20px);
//     border: solid 1px #979797;
//   }

//   .header__links {
//     width: 100%;
//     margin-left: 0;
//     height: 60px;
//     position: fixed;
//     left: 0;
//     bottom: 0;
//     background-color: #313538;
//   }

//   .header__link {
//     width: 50%;
//     position: relative;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     cursor: pointer;
//   }

//   .header__link + .header__link {
//     margin-left: 0;
//   }

//   .header__link + .header__link::before {
//     content: '';
//     position: absolute;
//     left: 0;
//     width: 1px;
//     height: 24px;
//     margin: 10px 51px 10px 0;
//     background-color: #828282;
//   }

//   .header__link-icon-forum {
//     background-image: url(/images/forum-mobile.png);
//     height: 52px;
//     margin-right: 5px;
//   }

//   .header__link-icon-cart {
//     background-image: url(/images/cart-mobile.png);
//   }

//   .header__link-icon-profile {
//     background-image: url(/images/profile-mobile.png);
//   }

//   .header__link-text {
//     display: block;
//     color: white;
//   }
// }
