import { useNavigate } from 'react-router-dom';
import { Head, Contact, Directory, Chat, More, Logout } from '../../styles/Header.style';

export default function Header(props) {
  const navigate = useNavigate();
  const { role, name, email } = props;
  return (
    <Head>
      <Contact>Contact</Contact>
      <Directory />
      <Chat />
      <More />
      <Logout />
    </Head>
  );
}