import React, { useState, useRef } from 'react';
import api from '../../services/api';
import { Container, Button, Form, FormGroup, Input } from 'reactstrap';
import { Link } from 'react-router-dom';

import '../Login/login.css';

const Register = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [code, setCode] = useState('');
  const [userNameError, setUserNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [codeError, setCodeError] = useState('');
  const [isReveal, setIsReveal] = useState(false);

  const passwordRef = useRef();
  const iconRevealRef = useRef();

  let response = [];

  const validate = async () => {
    const strongRegex = new RegExp(
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    );

    const isCode = await api.get('/checkcode', { code });
    

    if (!strongRegex.test(email)) {
      setEmailError('invalid email address');
      return false;
    } else {
      setEmailError('');
    }

    if (userName === '') {
      setUserNameError('Username cannot be blank');
      return false;
    } else {
      setUserNameError('');
    }

    if (password === '') {
      setPasswordError('Password cannot be blank');
      return false;
    } else {
      setPasswordError('');
    }

    if (code === '') {
      setCodeError('Code cannot be blank');
      return false;
    } else if (isCode) {
      console.log(isCode);
      console.log(code);
      return true;
    } else {
      setCodeError('Enter a valid code');
    }

    return true;
  };

  const togglePassword = (e) => {
    setIsReveal(!isReveal);
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const isValid = validate();

    if (isValid) {
      response = await api.post('/user/register', {
        email,
        password,
        userName,
      });
      console.log(response);
    }

    const user_id = response.data._id || false;
    const user = response.data.user || false;

    console.log(user_id);

    if (user_id) {
      localStorage.setItem('user', user);
      localStorage.setItem('user_id', user_id);
      history.push('/dashboard');
    } else {
      const { message } = response.data;
    }
  };

  return (
    <Container>
      <div className="main-form ">
        <div className="head">
          <h2 className="company">Welcome </h2>
          <p className="msg">Please Register Below </p>
        </div>
        <Form onSubmit={handleSubmit} className="forrm">
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0 mb-md-4">
            <Input
              type="text"
              name="userName"
              id="exampleuserName"
              placeholder="Your user name"
              onChange={(evt) => setUserName(evt.target.value)}
            />
            <div className="error"> {userNameError}</div>
          </FormGroup>

          <FormGroup className="mb-2 mr-sm-2 mb-sm-0 mb-md-4">
            <Input
              type="email"
              name="email"
              id="exampleEmail"
              placeholder="Your Email"
              onChange={(evt) => setEmail(evt.target.value)}
            />
            <div className="error"> {emailError}</div>
          </FormGroup>
          <div style={{ position: 'relative' }}>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0 mb-md-4">
              <Input
                type={isReveal ? 'text' : 'password'}
                name="password"
                id="examplePassword"
                placeholder="Your Password"
                ref={passwordRef}
                onChange={(evt) => setPassword(evt.target.value)}
              />
              <span
                onClick={() => {
                  togglePassword();
                }}
                ref={iconRevealRef}
              >
                <span>
                  {isReveal ? (
                    <i className="fas fa-eye-slash custom-eye"></i>
                  ) : (
                    <i className="fas fa-eye custom-eye"></i>
                  )}
                </span>
              </span>
              <div className="error"> {passwordError}</div>
            </FormGroup>
          </div>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0 mb-md-4">
            <Input
              type="text"
              name="code"
              id="examplecode"
              placeholder="Your Code"
              onChange={(evt) => setCode(evt.target.value)}
            />
            <div className="error"> {codeError}</div>
          </FormGroup>
          <Button className="form-btnn">Submit</Button>
          <p className="message">
            Already registered? <Link to="/login">Log In</Link>
          </p>
        </Form>
      </div>
    </Container>
  );
};

export default Register;
