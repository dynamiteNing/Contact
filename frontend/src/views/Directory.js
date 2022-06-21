import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Main, Allartists, Wrap, ProfileButton, SmallTitle, Seperate, Board, Name, Button, SingleProfile, Quote } from '../styles/Directory.style';
import { api } from '../utils/api';

function Profile(props) {
  const { role, name, profile, friends, toChat } = props;
  const text = { true: 'Chat', false: 'Subscribe'};

  const buttonFunction = (subscribed, artist) => {
    subscribed ? toChat(artist) : window.alert('to More, subscribe page');
  }

  return (
    <SingleProfile>
      <Name profile={profile}>{profile.name}</Name>
      <Quote>{profile.quote}</Quote>
      <Button profile={profile} dont={(role === 1) && (profile.name !== name)} onClick={() => buttonFunction(friends.includes(profile.name), profile.name)}>{text[friends.includes(profile.name)]}</Button>
    </SingleProfile>
  );
};

function Artists(props) {
  const { friends, notfriends, setProfile } = props;

  const getProfile = (artist) => {
    api.getProfile(artist).then((response) => {
      if (response.status === 200) {
        return response.json();
      }
    }).then((json) => {
      if (json.hasOwnProperty('data')){
        return json.data
      }
    }).then((data) => {
      if(data){
        setProfile(data.profile);
      }
    }).catch((error) => {
      console.error(error);
    })
  };

  return (
    <Allartists>
      <SmallTitle>My Friends</SmallTitle>
       <>
        {
         friends.map((item, index) => (
           <ProfileButton key={index} onClick={() => getProfile(item)}>
            {item}
           </ProfileButton>
         ))
        }</>
      <Seperate />
      <SmallTitle>Suggested Artists</SmallTitle>
      <>
        {
        notfriends.map((item, index) => (
          <ProfileButton key={index} onClick={() => getProfile(item)}>
            {item}
          </ProfileButton>
        ))
        }</>
      
    </Allartists>
  )
};

export default function Directory() {
  const navigate = useNavigate();
  const { role, name, email } = useLocation().state;

  const [friends, setFriends] = useState([]);
  const [notfriends, setNotfriends] = useState([]);
  const [profile, setProfile] = useState({});

  const toChat = (chatroom) => {
    navigate(`../chat`, {state: {role: role, name: name, email: email, chatroom: chatroom}});
  };

  useEffect(() => {
    api.getFriends(email).then((response) => {
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

    api.getNotfriends(email).then((response) => {
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
        <Artists friends={friends} notfriends={notfriends} setProfile={setProfile} />
        <Board>
          <Profile role={role} name={name} profile={profile} friends={friends} toChat={toChat}/>
        </Board>
      </Wrap>
    </Main>
  )
};
