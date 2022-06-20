import { Routes, Route } from 'react-router-dom';
import Mainpage from './views/Mainpage';
import Chat from './views/Chat';
import Directory from './views/Directory';

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Mainpage />} />
      <Route exact path='/chat' element={<Chat />} />
      <Route exact path='/directory' element={<Directory />} />
    </Routes>
  );
}

export default App;
