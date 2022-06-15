import { useState, useEffect } from 'react'
import webSocket from 'socket.io-client'

export default function Chat() {
  const [ws, setWs] = useState(null);

  const connectWS = () => {
    setWs(webSocket('http://localhost:3000'));
  }

  const initWebSocket = () => {
    ws.on('selfMessage', message => {
      console.log(message);
    })
    ws.on('addRoom', message => {
        console.log(message)
    })
    ws.on('chat', message => {
        console.log(message)
    })
  }

  useEffect(() => {
    connectWS();
  }, []);

  useEffect(() => {
    if (ws) {
      console.log('success connect!');
      initWebSocket();
    }
  }, [ws])

  const changeRoom = (event) => {
    let room = event.target.value
    if(room !== ''){
        ws.emit('addRoom', room)
    }
  }

  const chat = (room, message) => {
    ws.emit('chat', room, message);
  };

  return (
    <main>
      <select onChange={changeRoom}>
        <option value=''>請選擇房間</option>
        <option value='A1'>FANS to ARTIST1</option>
        <option value='A1_fans'>ARTIST1 to FANS</option>
      </select>

      <input type='button' value='chat' onClick={() => chat('A1', 'test')} />
      <input type='button' value='chat_fans' onClick={() => chat('A1_fans', 'test_fans')} />
    
    </main>
  )
}
