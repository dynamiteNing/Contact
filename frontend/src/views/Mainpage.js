import { useState } from 'react';
import { Main, Contact, Input, Button, ButtonDown, Form, Type } from '../styles/Mainpage.style';
import { api } from '../utils/api';
import { options } from '../utils/date';
import { useNavigate } from 'react-router-dom';
import { MySwal, WrapButton } from '../styles/Common.style';

function Signup(props) {
  const { setType, setId, email } = props;
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [password_check, setPwdcheck] = useState('');

  const signup = (e) => {
    e.preventDefault();
    api.signup({
      'email': email, 'name': name, 'password': password, 'password_check': password_check, 'join_date': new Date().toLocaleString('en-US', options),
    }).then((response) => {
      if (response.status === 200) {
        MySwal.fire({
          icon: 'success',
          title: `Sign up success!`,
          showConfirmButton: false,
          timer: 1000
        });
        return response.json();
      } else if (response.status === 400) {
        MySwal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Password not match!',
        });
        return new Error();
      } else if (response.status === 404) {
        MySwal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Wrong password!',
        });
        return new Error();
      } else {
        return new Error();
      }
    }).then((json) => {
      if (json.hasOwnProperty('data')){
        return json.data
      }
    }).then((data) => {
      if(data){
        setId(data.member.id);
        setType('signin');
      }
    })
    .catch((error) => {
      console.error(error);
    })
  }

  return (
    <Form onSubmit={signup}>
      <Input autoFocus type='text' className='name' done={true} value={name} onChange={e => setName(e.target.value)} placeholder="NAME" required />
      <Input type='text' className='password' done={true} value={password} onChange={e => setPassword(e.target.value)} placeholder="PASSWORD" required/>
      <Input type='text' className='password_check' done={true} value={password_check} onChange={e => setPwdcheck(e.target.value)} placeholder="PASSWORD_CHECK" required />
      <WrapButton>
        <Type>SIGN UP</Type>
        <ButtonDown type='submit' /> 
      </WrapButton>
    </Form>
  )
};

function Signin(props) {
  const { id, navigate } = props;
  const [password, setPassword] = useState('');

  const signin = (e) => {
    e.preventDefault();
    api.signin(id, password).then((response) => {
      if (response.status === 200) {
        MySwal.fire({
          icon: 'success',
          title: `Login success!`,
          showConfirmButton: false,
          timer: 1000
        });
        return response.json();
      } else if (response.status === 404) {
        MySwal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Wrong password!',
        });
        return new Error();
      } else {
        return new Error();
      }
    }).then((json) => {
      if (json.hasOwnProperty('message') && json.message === 'jwtToken') {
        return json.data
      }
    })
    .then((data) => {
      if (data.hasOwnProperty('member')) {
        if (data.member.hasOwnProperty('role')) {
          window.localStorage.setItem('jwtToken', data.jwtToken);
          window.localStorage.setItem('timestamp', new Date().getTime());
          navigate(`../directory`, {state: {role: data.member.role, name: data.member.name, email: data.member.email}});
        }
      }
    })
    .catch((error) => {
      console.error(error);
    })
  }

  return (
    <>
      <form onSubmit={signin}>
        <Input autoFocus type='text' className='password' value={password} done={true} onChange={e => setPassword(e.target.value)} placeholder="PASSWORD" required/>
        <WrapButton>
        <Type>LOG IN</Type>
          <ButtonDown type='submit' /> 
        </WrapButton>
      </form>
    </>
  )
};

function Emailform(props) {
  const { type, setType, id, setId, email, navigate} = props;

  return (
    <> 
      {type === 'signin' ? <Signin id={id} navigate={navigate} /> : type === 'signup' ? <Signup email={email} setType={setType} setId={setId} /> : null}
    </>
  )
};


export default function Mainpage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [type, setType] = useState('');
  const [id, setId] = useState('');

  const emailCheck = (e) => {
    e.preventDefault();
    const timestamp = window.localStorage.getItem('timestamp');
    api.checkjwtexpire(timestamp).then((response) => {
      if (response.status === 200) {
        return response.json();
      }
    }).then((json) => {
      if (json.hasOwnProperty('message') && json.message) {
        window.localStorage.removeItem('jwtToken');
        window.localStorage.removeItem('timestamp');
      }
    }).catch((error) => {
      console.error(error);
    });
    let jwtToken = window.localStorage.getItem('jwtToken');
    api.checkemail(email, jwtToken).then((response) => {
      if (response.status === 200) {
        setType('signin');
        return response.json();
      } else if (response.status === 201) {
        MySwal.fire({
          icon: 'success',
          title: `Login success!`,
          showConfirmButton: false,
          timer: 1000
        });
        return response.json();
      } else if (response.status === 400) {
        MySwal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Invalid email!',
        });
        return new Error();
      } else if (response.status === 404) {
        setType('signup');
        return {};
      } else {
        setType('');
        return new Error();
      }
    }).then((json) => {
      if (json.hasOwnProperty('message') && json.message === 'jwtToken') {
        setType('');
      }
      return json.data
    })
    .then((data) => {
      if (data) {
        setId(data.member.id);
        if (data.member.hasOwnProperty('role')) {
          window.localStorage.setItem('jwtToken', data.jwtToken);
          window.localStorage.setItem('timestamp', new Date().getTime());
          navigate(`../directory`, {state: {role: data.member.role, name: data.member.name, email: email}});
        }
      }
    }).catch((error) => {
      console.error(error);
    })
  }

  return (
    <Main>
      <Contact>Contact</Contact>
      <form onSubmit={emailCheck}>
        <Input autoFocus type='email' className='email' value={email} done={type !== ''} onChange={e => setEmail(e.target.value)} placeholder="EMAIL" required/>
        <Button type='submit' done={type !== ''} />
      </form>
      <Emailform type={type} setType={setType} id={id} setId={setId} email={email} navigate={navigate} />
    </Main>
  )
};
