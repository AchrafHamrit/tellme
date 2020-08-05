import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import { Container, Form, Button } from 'react-bootstrap';

// Utils
import { WEBSITE_NAME } from '../../utils/Data';

const Login = () => {
  const [user, setUser] = useState({
    username: '',
    password: '',
  });

  const { username, password } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    if (username === '' || password === '') {
      // setAlert('Please enter all fields');
    } else {
      // login({ username, password });

      console.log(user);
    }
  };

  return (
    <>
      <Helmet>
        <title>{`${WEBSITE_NAME} | Login`}</title>
      </Helmet>
      <Container>
        <div className='container-inner px-3 mt-4'>
          <div className='form-container mx-auto'>
            <h4 className='mb-3'>
              <strong>Welcome back!</strong>
            </h4>
            <Form className='form' onSubmit={onSubmit}>
              <Form.Group>
                <Form.Label>Email or username</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Email or username'
                  name='username'
                  value={username}
                  onChange={onChange}
                />
                <Form.Text className='text-muted'>
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Password'
                  name='password'
                  value={password}
                  onChange={onChange}
                />
              </Form.Group>

              <div className='d-flex align-items-center justify-content-between mt-4'>
                <span>
                  New member?{' '}
                  <Link className='link-secondary' to='/register'>
                    Sign up
                  </Link>
                </span>

                <Button variant='primary' type='submit'>
                  Sign in
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Login;
