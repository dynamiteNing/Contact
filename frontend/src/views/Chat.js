import { useState, useEffect } from 'react';
import webSocket from 'socket.io-client';
import { useLocation } from 'react-router-dom';
import { Main, Wrap, SideBar, SmallTitle, SmallAvatar, SideButton } from '../styles/Common.style';
import { Board, Group, Name, Message, Time, Input, Button, WrapInput, Tuple, Avatar, Title } from '../styles/Chat.style';
import { api } from '../utils/api';
import Header from './components/Header';

function Chatmessage(props) {
  const { history, name, profile } = props;

  return (
    <Board>
      {
        history.map((item, index) => (
          <Tuple self={name === item.name}>
            <Avatar src={`../admin/images/${item.avatar}`} alt="img" self={name === item.name} /> 
            <Group key={index} self={name === item.name}>
              {/* <Title self={name === item.name}>title</Title> */}
              <Name self={name === item.name}>{item.name}</Name>
              <Message>{item.message}</Message>
              <Time self={name === item.name}>{item.time}</Time>
            </Group>
          </Tuple>
        ))
      }
    </Board>
  )
};

function Chatinput(props) {
  const { role, name, chat, rooms, fanrooms, roomto, setRoomto, chatroom, profile } = props;
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

  const send = (room, name, message, profile, time) => {
    if (message !== ''){
      chat(room, { name: name, message: message, time: time, avatar: profile.avatar }); 
      setMessage('');
    }
  };
  
  return (
    <WrapInput>
      <Input autoFocus value={message} onChange={e => setMessage(e.target.value)} />
      <Button onClick={() => { send(roomto, name, message, profile, new Date().toLocaleString()); }} />
    </WrapInput>
  )
};

function Rooms(props) {
  const { role, rooms, changeRoom, fanrooms, setRoomto, chatroom, roomin, roomto, friends } = props;

  useEffect(() => {
    if(rooms[0]){
      if (role === 1) {
        changeRoom(chatroom ? chatroom : rooms[0]);
      } else {
        changeRoom(chatroom ? fanrooms[rooms.indexOf(chatroom)] : fanrooms[0]);
      }
    }
  }, [rooms]);

  const changeFriend = (friend) => {
    if (friend > -1) {
      if (role === 1) {
        changeRoom(rooms[friend]);
        setRoomto(fanrooms[friend]);
      } else {
        changeRoom(fanrooms[friend]);
        setRoomto(rooms[friend]);
      }
    }
  }

  return (
      <SideBar>
      <SmallTitle>Chat Rooms</SmallTitle>
      {
        friends.map((item, index) => (
          <SideButton key={index} active={roomin === item.name || roomto === item.name} onClick={() => changeFriend(index)}>
            <SmallAvatar src={`../admin/images/${item.avatar}`} alt="img" /> 
            {item.name}
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
    // TODO: history from db
    setHistory([]);
  }

  const connectWS = () => {
    setWs(webSocket('http://localhost:3000'));
  }

  const initWebSocket = () => {
    ws.on('selfMessage', message => {
      updateHistory(message);
    })
    ws.on('changeRoom', message => {
      console.log(message)
    })
    ws.on('chat', message => {
      updateHistory(message);
    })
  }

  useEffect(() => {
    connectWS();


    // TODO: load the history from db

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
        return {};
      }
    }).then((json) => {
      if (json.hasOwnProperty('data')){
        return json.data
      }
    }).then((data) => {
      if(data){
        data.friends.map((item, index) => {
          setFriends(friends => [...friends, item]); // item.artist
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

  return (
    <Main>
      <Header role={role} name={name} email={email} />
      <Wrap>
        <Rooms role={role} rooms={rooms} changeRoom={changeRoom} fanrooms={fanrooms} email={email} setRoomto={setRoomto} chatroom={chatroom} roomin={roomin} roomto={roomto} friends={friends} />
        <div>
          <Chatmessage history={history} name={name} profile={profile} />
          <Chatinput role={role} name={name} chat={chat} rooms={rooms} fanrooms={fanrooms} roomto={roomto} setRoomto={setRoomto} chatroom={chatroom} profile={profile} />
        </div>
      </Wrap>
    </Main>
  )
};
