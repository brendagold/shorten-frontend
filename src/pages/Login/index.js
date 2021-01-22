import React, { useState, useRef } from 'react';
import api from '../../services/api';
import { Container, Button, Form, FormGroup, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import { authentication } from '../../securedroutes';
import './login.css';

const Login = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isReveal, setIsReveal] = useState(false);

  const passwordRef = useRef();
  const iconRevealRef = useRef();

  const togglePassword = (e) => {
    setIsReveal(!isReveal);
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    const response = await api.post('/login', { email, password });
    const user_id = response.data.user_id || false;
    const user = response.data.user || false;

    if (user && user_id) {
      localStorage.setItem('user', user);
      localStorage.setItem('user_id', user_id);
      authentication.onAuthentication();
      history.push('/dashboard');
    } else {
      const { message } = response.data;
    }
  };

  return (
    <Container>
      <div className="main-form ">
        <div className="head">
          <h2 className="company">Welcome Back</h2>
          <p className="msg">Please Login </p>
        </div>
        <Form onSubmit={handleSubmit} className="forrm">
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0 mb-md-4">
            <Input
              type="email"
              name="email"
              id="exampleEmail"
              placeholder="Your Email"
              onChange={(evt) => setEmail(evt.target.value)}
            />
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
            </FormGroup>
          </div>
          <p className="forgot">
            {' '}
            <Link to="" className="forgot-pass">
              Forgot Password?
            </Link>
          </p>
          <Button className="form-btnn">Submit</Button>

          <p class="message">
            Not registered? <Link to="/register">Create an Account</Link>
          </p>
        </Form>
      </div>
    </Container>
  );
};

export default Login;
