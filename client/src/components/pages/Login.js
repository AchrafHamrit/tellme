import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Container, Form, Button } from 'react-bootstrap';

// Actions
import { login, clearErrors } from '../../redux/actions/authActions';
import { setAlert } from '../../redux/actions/alertActions';

// App layout components
import Spinner from '../layout/Spinner';

// Utils
import { WEBSITE_NAME } from '../../utils/Data';

const Login = (props) => {
  const {
    isAuthenticated,
    error,
    loading,
    login,
    clearErrors,
    setAlert,
  } = props;

  const [user, setUser] = useState({
    username: '',
    password: '',
  });

  const { username, password } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }

    // eslint-disable-next-line
  }, [isAuthenticated, props.history]);

  useEffect(() => {
    if (error && error.length) {
      if (typeof error === 'object') {
        error.forEach((err) => {
          setAlert(err.msg, 'danger');
        });
      } else {
        setAlert(error, 'danger');
      }

      clearErrors();
    }

    // eslint-disable-next-line
  }, [error]);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (username === '' || password === '') {
      setAlert('Please fill all fields', 'danger');
    } else {
      await login({ username, password });
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

              <div className='links d-flex align-items-center justify-content-between mt-4'>
                <span>
                  New member?{' '}
                  <Link className='link-secondary' to='/register'>
                    Sign up
                  </Link>
                </span>

                {loading ? (
                  <Spinner />
                ) : (
                  <Button variant='primary' type='submit'>
                    Sign in
                  </Button>
                )}
              </div>
            </Form>
          </div>
        </div>
      </Container>
    </>
  );
};

const mapSateToProps = (state) => ({
  error: state.auth.error,
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
});

export default connect(mapSateToProps, { login, clearErrors, setAlert })(Login);
