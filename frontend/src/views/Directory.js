import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Main, Wrap, Board, SideBar, SmallTitle, SmallAvatar, SideButton, Avatar, Name, SmallName } from '../styles/Common.style';
import { Seperate, Subscribe, Chat, SingleProfile, Quote, Buy } from '../styles/Directory.style';
import { api } from '../utils/api';
import Header from './components/Header';

function Profile(props) {
  const { role, name, profile, friends, toChat, toMore } = props;

  const buttonFunction = (subscribed, artist) => {
    subscribed ? toChat(artist) : toMore(artist);
  }

  const Check = (friends, profile) => {
    let result = false;
    friends.map((item, index) => {
      if (item.name === profile.name) {
        result = true;
      }
    });
    return result;
  }

  return (
  <>
    { profile.name ? 
      <SingleProfile>
        <Avatar src={`../admin/images/${profile.avatar}`} alt="img" /> 
        <Name profile={profile}>{profile.name}</Name>
        <Quote>{profile.quote}</Quote>
        <Subscribe profile={profile} dont={(role === 1) && (profile.name !== name)} friend={Check(friends, profile)} onClick={() => buttonFunction(Check(friends, profile), profile.name)} />
        <Chat profile={profile} dont={(role === 1) && (profile.name !== name)} friend={Check(friends, profile)} onClick={() => buttonFunction(Check(friends, profile), profile.name)} />
      </SingleProfile>
      :
      <SingleProfile>
        <Name>You have not subscribed any artist!</Name>    
        <Buy onClick={ () => toMore(' ') }/>
      </SingleProfile>
    }
  </>
  );
};

function Artists(props) {
  const { role, friends, notfriends, setProfile, profile } = props;
  const text = { 0: 'My Friends', 1: 'Fans', 2: 'Advised Artists', 3: 'Other Artists' };
  
  useEffect(() => {
    if (friends[0]) {
      getProfile(friends[0].name);
    }
    else if (notfriends[0]) {
      getProfile(notfriends[0].name);
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
    <SideBar>
      <SmallTitle>{text[role % 2]}</SmallTitle>
       <>
        { friends ? 
         friends.map((item, index) => (
           <SideButton key={index} active={profile.name === item.name} onClick={() => getProfile(item.name)}>
            <SmallAvatar src={`../admin/images/${item.avatar}`} alt="img" /> 
            <SmallName>{item.name}</SmallName>
           </SideButton>
         )) : <></>
        }</>
      <Seperate />
      <SmallTitle>{text[role % 2 + 2]}</SmallTitle>
      <>
        { notfriends ? 
        notfriends.map((item, index) => (
          <SideButton key={index} active={profile.name === item.name} onClick={() => getProfile(item.name)}>
            <SmallAvatar src={`../admin/images/${item.avatar}`} alt="img" /> 
            <SmallName>{item.name}</SmallName>
          </SideButton>
        )) : <></>
        }</>
    </SideBar>
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
        return {
          data: {
              friends: [],
          },
        };
      }
    }).then((json) => {
      if (json.hasOwnProperty('data')){
        return json.data
      }
    }).then((data) => {
      if(data){
        data.friends.map((item, index) => {
          setFriends(friends => [...friends, item]); 
        });
      }
    }).catch((error) => {
      console.error(error);
    })

    api.getNotfriends(email).then((response) => {
      if (response.status === 200) {
        return response.json();
      } else if (response.status === 404) {
        return {
          data: {
              notfriends: [],
          },
        };
      }
    }).then((json) => {
      if (json.hasOwnProperty('data')){
        return json.data
      }
    }).then((data) => {
      if(data){
        data.notfriends.map((item, index) => {
          setNotfriends(notfriends => [...notfriends, item]); 
        });
      }
    }).catch((error) => {
      console.error(error);
    })
  }, []);


  return (
    <Main>
      <Header role={role} name={name} email={email} type={'directory'} />
      <Wrap>
        <Artists role={role} friends={friends} notfriends={notfriends} setProfile={setProfile} profile={profile} />
        <Board>
          <Profile role={role} name={name} profile={profile} friends={friends} toChat={toChat} toMore={toMore} />
        </Board>
      </Wrap>
    </Main>
  )
};
