import { Routes, Route } from 'react-router-dom';
import Mainpage from './views/Mainpage';
// import Member from './views/members/Member';
// import SignUp from './views/members/SignUp';
// import SignIn from './views/members/SignIn';

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Mainpage />} />
      {/* <Route exact path="/members" element={<Member />} /> */}
      {/* <Route exact path="/members/signup" element={<SignUp />} /> */}
      {/* <Route exact path="/members/signin" element={<SignIn />} /> */}
      {/* get others should lead to page not found */}
    </Routes>
  );
}

export default App;
