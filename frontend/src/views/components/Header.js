import { useNavigate } from 'react-router-dom';
import { Head, Contact, Directory, Chat, More, Logout, Button, Navigation } from '../../styles/Header.style';
import { MySwal } from '../../styles/Common.style';

export default function Header(props) {
  const navigate = useNavigate();
  const { role, name, email, type, disConnect } = props;

  const logout = () => {
    if (type === 'chat') {
      disConnect();
    }
    window.localStorage.removeItem('jwtToken');
    window.localStorage.removeItem('timestamp');
    MySwal.fire({
      icon: 'success',
      title: `Successfully logout!`,
      showConfirmButton: false,
      timer: 1000
    });
    navigate('/');
  }

  const chat = () => {
    navigate(`/chat`, {state: {role: role, name: name, email: email}});
  }

  const directory = () => {
    if (type === 'chat') {
      disConnect();
    }
    navigate(`/directory`, {state: {role: role, name: name, email: email}});
  }

  const more = () => {
    if (type === 'chat') {
      disConnect();
    }
    navigate(`/more`, {state: {role: role, name: name, email: email}});
  }

  return (
    <Head>
      <Contact>Contact</Contact>
      <Button onClick={directory} >
        <Directory />
        <Navigation>Directory</Navigation>
      </Button>
      <Button onClick={chat} >
        <Chat />
        <Navigation>Chat</Navigation>
      </Button>
      <Button onClick={more} >
        <More />
        <Navigation>More</Navigation>
      </Button>
      <Button onClick={logout} >
        <Logout />
        <Navigation>Logout</Navigation>
      </Button>
    </Head>
  );
}