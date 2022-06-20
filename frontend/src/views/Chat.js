import { useState, useEffect } from 'react';
import webSocket from 'socket.io-client';
import { useLocation } from 'react-router-dom';
import { Main, Wrap, Board, Group, Name, Message, Time, Input, Button, WrapInput, ChatButton, Friends } from '../styles/Chat.style';
import { api } from '../utils/api';

function Chatmessage(props) {
  const { history, name } = props;

  return (
    <Board>
      {
        history.map((item, index) => (
          <Group key={index} self={name === item.name}>
            <Name self={name === item.name}>{item.name}</Name>
            <Message>{item.message}</Message>
            <Time self={name === item.name}>{item.time}</Time>
          </Group>
        ))
      }
    </Board>
  )
}

function Chatinput(props) {
  const { role, name, chat, rooms, fanrooms, roomto, setRoomto } = props;
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (role === 1) {
      setRoomto(fanrooms[0]);
    } else {
      setRoomto(rooms[0]);
    }
  }, [fanrooms]);

  const send = (room, name, message, time) => {
    if (message !== ''){
      chat(room, { name: name, message: message, time: time }); 
      setMessage('');
    }
  };
  
  return (
    <WrapInput>
      <Input autoFocus value={message} onChange={e => setMessage(e.target.value)} />
      <Button onClick={() => { send(roomto, name, message, new Date().toLocaleString()); }}>Send</Button>
    </WrapInput>
  )
}

function Rooms(props) {
  const { role, rooms, changeRoom, fanrooms, setRoomto } = props;

  useEffect(() => {
    if(rooms[0]){
      if (role === 1) {
        changeRoom(rooms[0]);
      } else {
        changeRoom(fanrooms[0]);
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
      <Friends>
      {
        rooms.map((item, index) => (
          <ChatButton key={index} onClick={() => changeFriend(index)}>
            {item}
          </ChatButton>
        ))
      }
      </Friends>
  )
}

export default function Chat() {
  const { role, name, email } = useLocation().state;
  const [ws, setWs] = useState(null);
  const [history, setHistory] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [fanrooms, setFanrooms] = useState([]);
  const [roomto, setRoomto] = useState('');
  const [roomin, setRoomin] = useState('');

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
      <Wrap>
        <Rooms role={role} rooms={rooms} changeRoom={changeRoom} fanrooms={fanrooms} email={email} setRoomto={setRoomto} />
        <div>
          <Chatmessage history={history} name={name}/>
          <Chatinput role={role} name={name} chat={chat} rooms={rooms} fanrooms={fanrooms} roomto={roomto} setRoomto={setRoomto} />
        </div>
      </Wrap>
    </Main>
  )
}
