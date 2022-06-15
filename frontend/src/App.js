import { Routes, Route } from 'react-router-dom';
import Mainpage from './views/Mainpage';
import Chat from './views/Chat';

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Mainpage />} />
      <Route exact path='/chat' element={<Chat />} />
    </Routes>
  );
}

export default App;
