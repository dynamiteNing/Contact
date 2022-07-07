import { useState, useEffect } from 'react';
import webSocket from 'socket.io-client';
import { useLocation } from 'react-router-dom';
import { MySwal, Main, Wrap, SideBar, SmallTitle, SmallAvatar, SideButton, SmallName, NotFlex, ArtistTitle } from '../styles/Common.style';
import { Board, Group, Name, Message, Time, Input, Button, WrapInput, Tuple, Avatar, WrapTitle } from '../styles/Chat.style';
import { api } from '../utils/api';
import { options } from '../utils/date';
import Header from './components/Header';

function Chatmessage(props) {
  const { history, name } = props;

  return (
    <Board>
      {
        history.map((item, index) => (
          <Tuple key={index} self={name === item.name}>
            <Avatar src={`../admin/images/${item.avatar}`} alt="img" self={name === item.name} /> 
            <Group key={index} self={name === item.name}>
              <WrapTitle>
                <ArtistTitle role={item.role} self={name === item.name} type={'rwd'}>artist</ArtistTitle>
                <Name self={name === item.name}>{item.name}</Name>
              </WrapTitle>
              <Message>{item.message}</Message>
              <Time self={name === item.name}>{new Date(item.time).toLocaleString('en-US', options)}</Time>
            </Group>
          </Tuple>
        ))
      }
    </Board>
  )
};

function Chatinput(props) {
  const { role, name, chat, rooms, fanrooms, roomto, setRoomto, chatroom, profile, email } = props;
  const [message, setMessage] = useState('');

  useEffect(() => {
    if(rooms[0]){
      if (role === 1) {
        setRoomto(chatroom ? fanrooms[rooms.indexOf(chatroom)] : fanrooms[0]);
      } else {
        setRoomto(chatroom ? chatroom : rooms[0]);
      }
    }
  }, [rooms]);

  const send = (room, name, message, profile, time, role, email) => {
    if (message !== '' && room !== ''){
      chat(room, { name: name, message: message, time: time, avatar: profile.avatar, email: email, room: room, role: role }); 
      api.lastreadTime(email, room, new Date()).then((response) => {
        console.log(response);
      })
      api.postChatMessage(email, role, room, time, message).then((response) => {
        console.log(response);
      }).catch((error) => {
        console.error(error);
      });
      setMessage('');
    } else if (room === '') {
      setMessage('');  
      MySwal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You have not subscribed any artist!',
        showConfirmButton: false,
        timer: 1000
      });
    }
  };
  
  return (
    <WrapInput>
      <Input autoFocus value={message} onChange={e => setMessage(e.target.value)} />
      <Button onClick={() => { send(roomto, name, message, profile, new Date(), role, email); }} /> 
    </WrapInput>
  )
};

function Rooms(props) {
  const { role, rooms, changeRoom, fanrooms, email, setRoomto, chatroom, roomin, roomto, friends } = props;

  useEffect(() => {
    if (rooms[0]) {
      if (role === 1) {
        changeRoom(chatroom ? chatroom : rooms[0]);
      } else {
        changeRoom(chatroom ? fanrooms[rooms.indexOf(chatroom)] : fanrooms[0]);
      }
      api.lastreadTime(email, chatroom ? chatroom : rooms[0], new Date());
    }
  }, [rooms]);

  const changeFriend = (friend) => {
    if (friend) {
      if (role === 1) {
        changeRoom(friend);
        setRoomto(fanrooms[friend]);
      } else {
        changeRoom(fanrooms[rooms.indexOf(friend)]);
        setRoomto(friend);
      }
      api.lastreadTime(email, friend, new Date());
    }
  }

  return (
      <SideBar>
        <SmallTitle>Chat Rooms</SmallTitle>
        {
          friends.map((item, index) => (
            <SideButton key={index} active={roomin === item.name || roomto === item.name} onClick={() => { changeFriend(item.name); }}>
              <SmallAvatar src={`../admin/images/${item.avatar}`} alt="img" /> 
              <NotFlex>
                <ArtistTitle>artist</ArtistTitle>
                <SmallName>{item.name}</SmallName>
              </NotFlex>
            </SideButton>
          ))
        }
      </SideBar>
  )
};

export default function Chat() {
  const { role, name, email, chatroom } = useLocation().state;
  const [ws, setWs] = useState(null);
  const [history, setHistory] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [fanrooms, setFanrooms] = useState([]);
  const [roomto, setRoomto] = useState('');
  const [roomin, setRoomin] = useState('');
  const [profile, setProfile] = useState({});
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    getProfile(name);
  }, []);

  const getProfile = (name) => {
    api.getProfile(name).then((response) => {
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

  const updateHistory = (message) => {
    setHistory(history => [...history, message]);
  }

  const resetHistory = (friend) => {
    api.getChatMessage(email, role, friend).then((response) => {
      if (response.status === 200) {
        return response.json();
      } if (response.status === 404 ){
        return {
          data: {
              history: [],
          },
        }
      }
    }).then((json) => {
      if (json.hasOwnProperty('data')){
        return json.data
      }
    }).then((data) => {
      if(data){
        setHistory(data.history);
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  const connectWS = () => {
    setWs(webSocket('http://localhost:3000', {transports: ['websocket', 'polling', 'flashsocket']}));
  }

  const initWebSocket = () => {
    ws.on('selfMessage', message => {
      updateHistory(message);
    })
    ws.on('changeRoom', message => {
      console.log(message);
    })
    ws.on('chat', message => {
      api.lastreadTime(email, message.room, new Date());
      updateHistory(message);
    })
    ws.on('disConnect', () => {
      ws.close();
    })
  }

  useEffect(() => {
    connectWS();

    api.getRooms(email).then((response) => {
      if (response.status === 200) {
        return response.json();
      }
    }).then((json) => {
      if (json.hasOwnProperty('data')){
        return json.data
      }
    }).then((data) => {
      if(data){
        data.rooms.map((item, index) => {
          setRooms(rooms => [...rooms, item.artist]);
          setFanrooms(fanrooms => [...fanrooms, item.fanclub]);
        });
      }
    }).catch((error) => {
      console.error(error);
    })
    
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

  }, []);

  useEffect(() => {
    if (ws) {
      console.log('success connect!');
      initWebSocket();
    }
  }, [ws]);

  const changeRoom = (room) => {
    if (room !== '' && room !== roomin) {
      setRoomin(room);
      resetHistory(room);
      ws.emit('changeRoom', room);
    }
  }

  const chat = (room, message) => {
    ws.emit('chat', room, message);
  };

  const disConnect = () => {
    ws.emit('disConnect');
  }

  return (
    <Main>
      <Header role={role} name={name} email={email} type={'chat'} disConnect={disConnect} />
      <Wrap>
        <Rooms role={role} rooms={rooms} changeRoom={changeRoom} fanrooms={fanrooms} email={email} setRoomto={setRoomto} chatroom={chatroom} roomin={roomin} roomto={roomto} friends={friends} />
        <div>
          <Chatmessage history={history} name={name} />
          <Chatinput role={role} name={name} chat={chat} rooms={rooms} fanrooms={fanrooms} roomto={roomto} setRoomto={setRoomto} chatroom={chatroom} profile={profile} email={email} />
        </div>
      </Wrap>
    </Main>
  )
};
