import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import { Container, Form, Button } from 'react-bootstrap';

// Utils
import { WEBSITE_NAME } from '../../utils/Data';

const Register = () => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
  });

  const { username, email, password, password2 } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    if (username === '' || email === '' || password === '') {
      // setAlert('Please enter all fields');
    } else {
      // login({ username, password });

      console.log(user);
    }
  };

  return (
    <>
      <Helmet>
        <title>{`${WEBSITE_NAME} | Register`}</title>
      </Helmet>
      <Container>
        <div className='container-inner px-3 mt-4'>
          <div className='form-container mx-auto'>
            <h4 className='mb-3'>
              <strong>Create your account!</strong>
            </h4>
            <Form className='form' onSubmit={onSubmit}>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Email'
                  name='email'
                  value={email}
                  onChange={onChange}
                />
                <Form.Text className='text-muted'>
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Username'
                  name='username'
                  value={username}
                  onChange={onChange}
                />
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

              <Form.Group>
                <Form.Label>Password confirmation</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Password confirmation'
                  name='password2'
                  value={password2}
                  onChange={onChange}
                />
              </Form.Group>

              <div className='d-flex align-items-center justify-content-between mt-4'>
                <span>
                  Have an account?{' '}
                  <Link className='link-secondary' to='/login'>
                    Sign in
                  </Link>
                </span>

                <Button variant='primary' type='submit'>
                  Create
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Register;
