import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Main, Allartists, Wrap, ProfileButton, SmallTitle, Seperate, Board, Name, Button, SingleProfile, Quote, Avatar } from '../styles/Directory.style';
import { api } from '../utils/api';
import Header from './components/Header';

function Profile(props) {
  const { role, name, profile, friends, toChat, toMore } = props;
  const text = { true: 'Chat', false: 'Subscribe'};

  const buttonFunction = (subscribed, artist) => {
    subscribed ? toChat(artist) : toMore(artist);
  }

  return (
    <SingleProfile>
      <Avatar src={`../admin/images/${profile.avatar}`} alt="img" /> 
      <Name profile={profile}>{profile.name}</Name>
      <Quote>{profile.quote}</Quote>
      <Button profile={profile} dont={(role === 1) && (profile.name !== name)} onClick={() => buttonFunction(friends.includes(profile.name), profile.name)}>{text[friends.includes(profile.name)]}</Button>
    </SingleProfile>
  );
};

function Artists(props) {
  const { role, friends, notfriends, setProfile, profile } = props;
  const text = { 0: 'My Friends', 1: 'Fans', 2: 'Suggested Artists', 3: 'Other Artists' };
  
  useEffect(() => {
    if (friends[0]) {
      getProfile(friends[0]);
    } else if (notfriends[0]) {
      getProfile(notfriends[0]);
    }
  }, [friends]);

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
      <SmallTitle>{text[role % 2]}</SmallTitle>
       <>
        {
         friends.map((item, index) => (
           <ProfileButton key={index} active={profile.name === item} onClick={() => getProfile(item)}>
            {item}
           </ProfileButton>
         ))
        }</>
      <Seperate />
      <SmallTitle>{text[role % 2 + 2]}</SmallTitle>
      <>
        {
        notfriends.map((item, index) => (
          <ProfileButton key={index} active={profile.name === item} onClick={() => getProfile(item)}>
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

  const toMore = (artist) => {
    navigate(`../more`, {state: {role: role, name: name, email: email, artistPre: artist}});
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
      <Header role={role} name={name} email={email} />
      <Wrap>
        <Artists role={role} friends={friends} notfriends={notfriends} setProfile={setProfile} profile={profile} />
        <Board>
          <Profile role={role} name={name} profile={profile} friends={friends} toChat={toChat} toMore={toMore} />
        </Board>
      </Wrap>
    </Main>
  )
};
