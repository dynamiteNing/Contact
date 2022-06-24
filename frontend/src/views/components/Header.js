import { useNavigate } from 'react-router-dom';
import { Head, Contact, Directory, Chat, More, Logout } from '../../styles/Header.style';

export default function Header(props) {
  const navigate = useNavigate();
  const { role, name, email } = props;

  const logout = () => {
    window.localStorage.removeItem('jwtToken');
    window.localStorage.removeItem('timestamp');
    navigate('/');
  }

  const chat = () => {
    navigate(`/chat`, {state: {role: role, name: name, email: email}});
  }

  const directory = () => {
    navigate(`/directory`, {state: {role: role, name: name, email: email}});
  }

  const more = () => {
    navigate(`/more`, {state: {role: role, name: name, email: email}});
  }

  return (
    <Head>
      <Contact>Contact</Contact>
      <Directory onClick={directory}/>
      <Chat onClick={chat}/>
      <More onClick={more}/>
      <Logout onClick={logout}/>
    </Head>
  );
}