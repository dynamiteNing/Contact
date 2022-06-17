import * as React from 'react';
import { useState } from 'react';
import { Main, Contact, Input, Wrap, Button } from '../styles/Mainpage.style';
import { api } from '../utils/api';
import { useNavigate } from 'react-router-dom';

function Signup(props) {
  const setType = props.setType;
  const setId = props.setId;
  const email = props.email;
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [password_check, setPwdcheck] = useState('');

  const signup = (e) => {
    e.preventDefault();
    api.signup({
      'email': email, 'name': name, 'password': password, 'password_check': password_check, 'join_date': new Date().toLocaleString(),
    }).then((response) => {
      if (response.status === 200) {
        return response.json();
      } else if (response.status === 400) {
        window.alert('password not match');
        return new Error();
      } else if (response.status === 404) {
        window.alert('password wrong');
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
    <>
    <form onSubmit={signup}>
        <Input type='text' className='name' value={name} onChange={e => setName(e.target.value)} placeholder="NAME" required/>
        <Input type='text' className='password' value={password} onChange={e => setPassword(e.target.value)} placeholder="PASSWORD" required/>
        <Input type='text' className='password_check' value={password_check} onChange={e => setPwdcheck(e.target.value)} placeholder="PASSWORD_CHECK" required/>
        <Button type='submit' />
    </form>
    </>
  )
}

function Signin(props) {
  const id = props.id;
  const navigate = props.navigate;
  const [password, setPassword] = useState('');

  const signin = (e) => {
    e.preventDefault();
    api.signin(id, password).then((response) => {
      if (response.status === 200) {
        return response.json();
      } else if (response.status === 404) {
        window.alert('password wrong');
        return new Error();
      } else {
        return new Error();
      }
    }).then((json) => {
      if (json.hasOwnProperty('message') && json.message === 'jwtToken') {
        window.alert('TODO: navigate to directory page');
      }
      return json.data
    })
    .then((data) => {
      if (data.hasOwnProperty('member')) {
        if (data.member.hasOwnProperty('role')) {
          window.localStorage.setItem('jwtToken', data.jwtToken);
          navigate(`./chat/${data.member.role}/${data.member.name}`);
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
        <Input type='text' className='password' value={password} onChange={e => setPassword(e.target.value)} placeholder="PASSWORD" required/>
        <Button type='submit' />
      </form>
    </>
  )
}

function Emailform(props) {
  const type = props.type;
  const setType = props.setType;
  const id = props.id;
  const setId = props.setId;
  const email = props.email;
  const navigate = props.navigate;

  return (
    <> 
      {type === 'signin' ? <Signin id={id} navigate={navigate} /> : type === 'signup' ? <Signup email={email} setType={setType} setId={setId} /> : null}
    </>
  )
}


export default function Mainpage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [type, setType] = useState('');
  const [id, setId] = useState('');

  const emailCheck = (e) => {
    e.preventDefault();
    const jwtToken = window.localStorage.getItem('jwtToken');
    api.checkemail(email, jwtToken).then((response) => {
      if (response.status === 200) {
        setType('signin');
        return response.json();
      } else if (response.status === 201) {
        return response.json();
      } else if (response.status === 404) {
        setType('signup');
        return {};
      } else {
        setType('');
        return new Error();
      }
    }).then((json) => {
      if (json.hasOwnProperty('message') && json.message === 'jwtToken') {
        window.alert('TODO: navigate to directory page');
        setType('');
      }
      return json.data
    })
    .then((data) => {
      if (data) {
        setId(data.member.id);
        if (data.member.hasOwnProperty('role')) {
          window.localStorage.setItem('jwtToken', data.jwtToken);
          navigate(`./chat/${data.member.role}/${data.member.name}`);
        }
      }
    }).catch((error) => {
      console.error(error);
    })
  }

  return (
    <Main>
      <Contact>Contact</Contact>
      <Wrap>
        <form onSubmit={emailCheck}>
          <Input type='text' className='email' value={email} onChange={e => setEmail(e.target.value)} placeholder="EMAIL" required/>
          <Button type='submit' />
        </form>
      </Wrap>
      <Emailform type={type} setType={setType} id={id} setId={setId} email={email} navigate={navigate} />
    </Main>
  )
}
