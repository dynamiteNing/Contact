import { useState, useEffect } from 'react';
import webSocket from 'socket.io-client';
import { useParams } from 'react-router-dom';
import { Wrap } from '../styles/Chat.style';

function Chatmessage(props) {
  const history = props.history;
  console.log('hist', history);
  return (
    <div>
    <div>Chatmessage</div>
    {
      history.map((item, index) => (
        <div key={index}>
          <div>name: {item.name}</div>
          <div>message: {item.message}</div>
        </div>
      ))
    }
    </div>
  )
}

function Rooms(props) {
  const rooms = props.rooms;
  const changeRoom = props.changeRoom;
  useEffect(() => {
    if(rooms[0]){
      changeRoom(rooms[0]);
    }
  }, []);

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
      setRooms(['A1']);
    } else {
      setRooms(['A1_fans']);
    }
  }, []);

  useEffect(() => {
    if (ws) {
      console.log('success connect!');
      initWebSocket();
      if (role === '1'){
        changeRoom(rooms[0]);
      }
    }
  }, [ws]);

  const change = (event) => {
    let room = event.target.value
    if(room !== ''){
      ws.emit('changeRoom', room)
    }
  }
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
      <select onChange={change}>
        <option value=''>請選擇房間</option>
        <option value='A1'>FANS to ARTIST1</option>
        <option value='A1_fans'>ARTIST1 to FANS</option>
      </select>
      <input type='button' value='chat' onClick={() => chat('A1', { name: 'test', message: 'test'})} />
      <input type='button' value='chat_fans' onClick={() => chat('A1_fans', { name: 'test_fans', message: 'test_fans'})} />

      <Wrap>
        <Rooms rooms={rooms} changeRoom={changeRoom} />
        <Chatmessage history={history} />
      </Wrap>

    </main>
  )
}
