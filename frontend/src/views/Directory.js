import { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
import { Main, Allartists, Wrap, ProfileButton, SmallTitle, Seperate, Board } from '../styles/Directory.style';
import { api } from '../utils/api';

function Artists(props) {
  const { friends, notfriends } = props;

  return (
    <Allartists>
      <SmallTitle>My Friends</SmallTitle>
       <>
        {
         friends.map((item, index) => (
           <ProfileButton key={index} onClick={() => console.log(index)}>
             {item}
           </ProfileButton>
         ))
        }</>
      <Seperate />
      <SmallTitle>Suggested Artists</SmallTitle>
      <>
        {
        notfriends.map((item, index) => (
          <ProfileButton key={index} onClick={() => console.log(index)}>
            {item}
          </ProfileButton>
        ))
        }</>
      
    </Allartists>
  )
}

export default function Directory() {
  // const { role, name, email } = useLocation().state;

  const [friends, setFriends] = useState([]);
  const [notfriends, setNotfriends] = useState([]);

  useEffect(() => {
    api.getFriends('bbb@gmail.com').then((response) => {
      if (response.status === 200) {
        return response.json();
      } else if (response.status === 404) {
        return {};
      }
    }).then((json) => {
      if (json.hasOwnProperty('data')){
        return json.data
      }
    }).then((data) => {
      if(data){
        data.friends.map((item, index) => {
          setFriends(friends => [...friends, item.artist]);
        });
      }
    }).catch((error) => {
      console.error(error);
    })

    api.getNotfriends('bbb@gmail.com').then((response) => {
      if (response.status === 200) {
        return response.json();
      } else if (response.status === 404) {
        return {};
      }
    }).then((json) => {
      if (json.hasOwnProperty('data')){
        return json.data
      }
    }).then((data) => {
      if(data){
        data.notfriends.map((item, index) => {
          setNotfriends(notfriends => [...notfriends, item.artist]);
        });
      }
    }).catch((error) => {
      console.error(error);
    })
  }, []);


  return (
    <Main>
      <Wrap>
        <Artists friends={friends} notfriends={notfriends} />
        <Board>
          <div>Profiles</div>
        </Board>
      </Wrap>
    </Main>
  )
}
