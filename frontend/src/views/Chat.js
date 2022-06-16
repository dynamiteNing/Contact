import { useState, useEffect } from 'react';
import webSocket from 'socket.io-client';
import { useParams } from 'react-router-dom';
import { Wrap, Board, Group, Name, Message, Time } from '../styles/Chat.style';

function Chatmessage(props) {
  const history = props.history;
  return (
    <Board>
      {
        history.map((item, index) => (
          <Group key={index}>
            <Name>{item.name}: </Name>
            <Message>{item.message}</Message>
            <Time>time</Time>
          </Group>
        ))
      }
    </Board>
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
  const { role } = useParams(); //name
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
    <main>
      {/* <select onChange={change}>
        <option value=''>請選擇房間</option>
        <option value='A1_see'>FANS to ARTIST1</option>
        <option value='A1_fans_see'>ARTIST1 to FANS</option>
      </select> */}
      <input type='button' value='chat_A1_see' onClick={() => chat('A1_see', { name: 'A1_fans', message: 'chat_A1_see'})} />
      <input type='button' value='chat_fans_see' onClick={() => chat('A1_fans_see', { name: 'A1', message: 'chat_fans_see'})} />

      <Wrap>
        <Rooms rooms={rooms} changeRoom={changeRoom} />
        <Chatmessage history={history} />
      </Wrap>

    </main>
  )
}
