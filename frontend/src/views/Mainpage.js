import * as React from 'react';
import { useState, useEffect } from 'react';
import { Main, Contact, Input, Wrap, Button } from '../styles/Mainpage.style';
import { api } from '../utils/api';

export default function Mainpage() {
  const [email, setEmail] = useState("");
  useEffect();

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = api.checkemail();
    console.log(result);
  }

  return (
    <Main>
      <Contact>Contact</Contact>
      <Wrap>
        <Input/>
        <Button onClick={handleSubmit}>testbutton</Button>
      </Wrap>
    </Main>
  )
}
