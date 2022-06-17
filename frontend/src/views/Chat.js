import { useState, useEffect } from 'react';
import webSocket from 'socket.io-client';
import { useParams } from 'react-router-dom';
import { Main, Wrap, Board, Group, Name, Message, Time, Input, Button } from '../styles/Chat.style';

function Chatmessage(props) {
  const history = props.history;
  return (
    <Board>
      {
        history.map((item, index) => (
          <Group key={index}>
            <Name>{`${item.name}: `}</Name>
            <Message>{item.message}</Message>
            <Time>time</Time>
          </Group>
        ))
      }
    </Board>
  )
}

function Chatinput(props) {
  const role = props.role;
  const name = props.name;
  const chat = props.chat;
  const [message, setMessage] = useState('');
  let room;
  if (role === '1') {
    room = 'A1_fans_see';
  } else {
    room = 'A1_see';
  }
  
  return (
    <>
      <Input value={message} onChange={e => setMessage(e.target.value)} />
      <Button onClick={() => { chat(room, { name: name, message: message }) }}>Send</Button>
    </>
  )
}

function Rooms(props) {
  const rooms = props.rooms;
  const changeRoom = props.changeRoom;
  useEffect(() => {
    if(rooms[0]){
      changeRoom(rooms[0]);
    }
  }, [rooms]);

  /* TODO: real changeRoom */
  
  return (
    <div>
      <div>Rooms</div>
      {
        rooms.map((item, index) => (
          <>
          <div key={index}>
            {item}
          </div>
          </>
        ))
      }
    </div>
  )
}

export default function Chat() {
  // TODO: get from jwtToken
  const { role, name } = useParams();
  const [ws, setWs] = useState(null);
  const [history, setHistory] = useState([]);
  const [rooms, setRooms] = useState([]);

  const updateHistory = (message) => {
    setHistory(history => [...history, message]);
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
    // TODO: get the friend room from db
    if(role === '1') {
      setRooms(['A1_see']);
    } else {
      setRooms(['A1_fans_see']);
    }
  }, []);

  useEffect(() => {
    if (ws) {
      console.log('success connect!');
      initWebSocket();
    }
  }, [ws]);

  // const change = (event) => {
  //   let room = event.target.value
  //   if(room !== ''){
  //     ws.emit('changeRoom', room)
  //   }
  // }
  const changeRoom = (room) => {
    if(room !== ''){
      ws.emit('changeRoom', room);
    }
  }

  const chat = (room, message) => {
    ws.emit('chat', room, message);
  };

  return (
    <Main>
      {/* <select onChange={change}>
        <option value=''>請選擇房間</option>
        <option value='A1_see'>FANS to ARTIST1</option>
        <option value='A1_fans_see'>ARTIST1 to FANS</option>
      </select> */}
      <Wrap>
        <Rooms rooms={rooms} changeRoom={changeRoom} />
        <div>
          <Chatmessage history={history} />
          <Chatinput role={role} name={name} chat={chat} />
        </div>
      </Wrap>

    </Main>
  )
}
